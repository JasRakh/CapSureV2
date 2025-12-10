import axios, { AxiosResponse } from 'axios';
import { Pill } from '../types';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

// Get API key from environment variable
// Option 1: Set it in .env file: EXPO_PUBLIC_OPENAI_API_KEY=your_key_here
// Option 2: Set it directly here (replace empty string with your actual key):
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';

// Validate API key format (OpenAI keys start with 'sk-')
const isValidApiKey =
  OPENAI_API_KEY.startsWith('sk-') && OPENAI_API_KEY.length > 20;

if (!OPENAI_API_KEY) {
  console.warn(
    '⚠️ OpenAI API key not found! Please set EXPO_PUBLIC_OPENAI_API_KEY in your .env file or directly in services/openaiService.ts'
  );
} else if (!isValidApiKey) {
  console.warn(
    '⚠️ OpenAI API key format appears invalid! Keys should start with "sk-" and be at least 20 characters long.'
  );
}

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Model configuration - you can change this to use different models
// Available models:
// - 'gpt-5' or 'gpt-5-turbo' - Latest GPT-5 model (if available)
// - 'gpt-4o' - GPT-4 Optimized (current best for vision)
// - 'gpt-4o-mini' - Faster and cheaper alternative
// - 'gpt-4-turbo' - GPT-4 Turbo
// - 'gpt-4' - Standard GPT-4
// Change this to 'gpt-5' or 'gpt-5-turbo' if GPT-5 is available in your OpenAI account
const OPENAI_MODEL = process.env.EXPO_PUBLIC_OPENAI_MODEL || 'gpt-4o';

// Fallback models to try if primary model fails
// Using cheaper models first for better rate limits
const FALLBACK_MODELS = ['gpt-4o-mini', 'gpt-4-turbo', 'gpt-4'];

// Cache configuration
const CACHE_STORAGE_KEY = '@capsure_pill_cache';
const CACHE_EXPIRY_DAYS = 30; // Cache results for 30 days

// Rate limit handling
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 1000; // 1 second
const MAX_RETRY_DELAY = 60000; // 60 seconds

// Helper function to generate hash from base64 image
const generateImageHash = (base64Image: string): string => {
  // Use first 1000 chars for faster hashing
  const sample = base64Image.substring(0, 1000);
  return CryptoJS.SHA256(sample).toString();
};

// Helper function to get cached result
const getCachedResult = async (imageHash: string): Promise<Pill | null> => {
  try {
    const cacheData = await AsyncStorage.getItem(CACHE_STORAGE_KEY);
    if (!cacheData) return null;

    const cache = JSON.parse(cacheData);
    const cached = cache[imageHash];

    if (cached) {
      const cacheAge = Date.now() - cached.timestamp;
      const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

      if (cacheAge < expiryTime) {
        console.log('✅ Using cached result');
        return {
          ...cached.pill,
          scannedAt: new Date(cached.pill.scannedAt),
        };
      } else {
        // Remove expired cache
        delete cache[imageHash];
        await AsyncStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cache));
      }
    }
    return null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

// Helper function to save result to cache
const saveToCache = async (imageHash: string, pill: Pill): Promise<void> => {
  try {
    const cacheData = await AsyncStorage.getItem(CACHE_STORAGE_KEY);
    const cache = cacheData ? JSON.parse(cacheData) : {};

    cache[imageHash] = {
      pill,
      timestamp: Date.now(),
    };

    // Limit cache size to prevent storage issues (keep last 1000 entries)
    const entries = Object.keys(cache);
    if (entries.length > 1000) {
      // Remove oldest entries
      const sorted = entries.sort(
        (a, b) => cache[a].timestamp - cache[b].timestamp
      );
      sorted
        .slice(0, entries.length - 1000)
        .forEach((key) => delete cache[key]);
    }

    await AsyncStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

// Helper function to wait with exponential backoff
const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Helper function to make API request with retry logic
const makeAPIRequestWithRetry = async (
  base64Image: string,
  model: string,
  retryCount = 0
): Promise<AxiosResponse<OpenAIResponse>> => {
  try {
    return await axios.post<OpenAIResponse>(
      OPENAI_API_URL,
      {
        model: model,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this pill image and provide detailed information in JSON format. Include:
- name: Full name of the medication
- description: Brief description of what it's used for
- usage: Array of 3-5 usage instructions
- tags: Array of relevant tags (e.g., ["Pain relief", "Anti-inflammatory"])
- color: Color of the pill
- shape: Shape of the pill (Round, Capsule, Oval, etc.)
- dosage: Dosage information if visible
- important: Important warnings or precautions

Return ONLY valid JSON without markdown formatting. Example format:
{
  "name": "Ibuprofen 200mg",
  "description": "Nonsteroidal anti-inflammatory drug used for pain relief",
  "usage": ["Take with food", "Do not exceed 1200mg per day", "Wait 4-6 hours between doses"],
  "tags": ["Pain relief", "Anti-inflammatory"],
  "color": "White",
  "shape": "Round",
  "dosage": "200mg",
  "important": "Do not use if you have stomach ulcers"
}

If you cannot identify the pill clearly, provide your best estimate based on visual characteristics.`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
  } catch (error: any) {
    // Handle rate limit with exponential backoff retry
    if (error.response?.status === 429 && retryCount < MAX_RETRIES) {
      const retryAfter = error.response.headers['retry-after'];
      const delay = retryAfter
        ? parseInt(retryAfter) * 1000
        : Math.min(
            INITIAL_RETRY_DELAY * Math.pow(2, retryCount),
            MAX_RETRY_DELAY
          );

      console.log(
        `⏳ Rate limit hit. Retrying in ${delay / 1000} seconds... (attempt ${
          retryCount + 1
        }/${MAX_RETRIES})`
      );
      await wait(delay);
      return makeAPIRequestWithRetry(base64Image, model, retryCount + 1);
    }
    throw error;
  }
};

export const identifyPillWithGPT = async (imageUri: string): Promise<Pill> => {
  if (!OPENAI_API_KEY) {
    return {
      id: `pill_error_${Date.now()}`,
      name: 'API Key Missing',
      description:
        'Please configure your OpenAI API key. See OPENAI_SETUP.md for instructions.',
      usage: [],
      tags: ['Error'],
      confidence: 0,
      scannedAt: new Date(),
      important:
        'Set EXPO_PUBLIC_OPENAI_API_KEY in your .env file or configure it directly in services/openaiService.ts',
    };
  }

  if (!isValidApiKey) {
    return {
      id: `pill_error_${Date.now()}`,
      name: 'Invalid API Key Format',
      description:
        'Your OpenAI API key format appears to be invalid. Keys should start with "sk-" and be at least 20 characters long.',
      usage: [],
      tags: ['Error'],
      confidence: 0,
      scannedAt: new Date(),
      important:
        'Please check your API key. Get a valid key from https://platform.openai.com/api-keys',
    };
  }

  try {
    // Read image as base64 using fetch
    // Convert file URI to a format that can be read
    const imageResponse = await fetch(imageUri);
    const blob = await imageResponse.blob();
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix if present
        const base64 = base64String.includes(',')
          ? base64String.split(',')[1]
          : base64String;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    // Check cache first to avoid unnecessary API calls
    const imageHash = generateImageHash(base64Image);
    const cachedResult = await getCachedResult(imageHash);
    if (cachedResult) {
      return cachedResult;
    }

    // Try primary model first, then fallback models if it fails
    // Start with cheaper models for better rate limits
    const modelsToTry = [
      ...FALLBACK_MODELS.filter((m) => m !== OPENAI_MODEL),
      OPENAI_MODEL, // Try preferred model last
    ];
    let response: AxiosResponse<OpenAIResponse> | null = null;
    let lastError: any = null;
    let usedModel = OPENAI_MODEL;

    for (const model of modelsToTry) {
      try {
        console.log(`🔄 Trying model: ${model}`);
        response = await makeAPIRequestWithRetry(base64Image, model);
        usedModel = model;
        console.log(`✅ Success with model: ${model}`);
        break; // Success, exit loop
      } catch (error: any) {
        lastError = error;
        // If it's a model-specific error (like model not found), try next model
        if (error.response?.status === 404 || error.response?.status === 400) {
          console.warn(`⚠️ Model ${model} not available, trying next...`);
          continue;
        }
        // For rate limit errors, retry logic is handled in makeAPIRequestWithRetry
        // For other errors (401, 402, etc.), break and handle below
        if (error.response?.status !== 429) {
          break;
        }
        // If 429 and all retries exhausted, try next model
        if (error.response?.status === 429) {
          console.warn(`⚠️ Rate limit on ${model}, trying next model...`);
          continue;
        }
      }
    }

    if (!response || !response.data) {
      throw lastError || new Error('All models failed');
    }

    // Parse the OpenAI API response
    const content = response.data.choices[0]?.message?.content || '{}';

    // Remove markdown code blocks if present
    const cleanedContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const pillData = JSON.parse(cleanedContent);

    // Calculate confidence based on response quality and model used
    let confidence = pillData.name && pillData.description ? 85 : 60;
    // Boost confidence if using GPT-5 or GPT-4o
    if (usedModel.includes('gpt-5') || usedModel.includes('gpt-4o')) {
      confidence = Math.min(confidence + 5, 95);
    }

    const pill: Pill = {
      id: `pill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: pillData.name || 'Unknown Pill',
      description:
        pillData.description ||
        'Could not identify this pill. Please consult a healthcare professional.',
      usage: Array.isArray(pillData.usage) ? pillData.usage : [],
      tags: Array.isArray(pillData.tags) ? pillData.tags : [],
      color: pillData.color,
      shape: pillData.shape,
      dosage: pillData.dosage,
      confidence,
      scannedAt: new Date(),
      important: pillData.important,
    };

    // Save to cache for future use (reduces API calls)
    await saveToCache(imageHash, pill);

    return pill;
  } catch (error: any) {
    console.error('Error identifying pill with GPT:', error);

    let errorMessage = 'Unable to identify the pill.';
    let importantMessage = 'Please try again later.';

    // Handle specific error cases
    if (error.response) {
      const status = error.response.status;
      const statusText = error.response.statusText;

      if (status === 401) {
        errorMessage = 'Invalid API Key';
        importantMessage =
          'Please check your OpenAI API key. It may be incorrect or expired.';
      } else if (status === 429) {
        errorMessage = 'Rate Limit Exceeded';
        importantMessage =
          'You have exceeded your API rate limit. Please wait a few minutes and try again, or check your OpenAI account for usage limits.';
      } else if (status === 402) {
        errorMessage = 'Payment Required';
        importantMessage =
          'Your OpenAI account has insufficient credits. Please add credits to your account.';
      } else if (status === 403) {
        errorMessage = 'Access Forbidden';
        importantMessage =
          'Your API key does not have permission to access this endpoint. Please check your OpenAI account settings.';
      } else {
        errorMessage = `API Error (${status})`;
        importantMessage = `OpenAI API returned: ${statusText}. Please check your API key and account status.`;
      }
    } else if (error.request) {
      errorMessage = 'Network Error';
      importantMessage =
        'Could not reach OpenAI API. Please check your internet connection.';
    } else if (!OPENAI_API_KEY || OPENAI_API_KEY === 'YOUR_API_KEY_HERE') {
      errorMessage = 'API Key Not Configured';
      importantMessage =
        'Please set your OpenAI API key in services/openaiService.ts or in .env file as EXPO_PUBLIC_OPENAI_API_KEY';
    }

    // Return error pill with helpful message
    return {
      id: `pill_error_${Date.now()}`,
      name: errorMessage,
      description: importantMessage,
      usage: [],
      tags: ['Error'],
      confidence: 0,
      scannedAt: new Date(),
      important: `Error details: ${error.message || 'Unknown error'}`,
    };
  }
};

// Export function to clear cache
export const clearPillCache = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CACHE_STORAGE_KEY);
    console.log('✅ Cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Export function to get cache stats
export const getCacheStats = async (): Promise<{
  size: number;
  entries: number;
}> => {
  try {
    const cacheData = await AsyncStorage.getItem(CACHE_STORAGE_KEY);
    if (!cacheData) {
      return { size: 0, entries: 0 };
    }

    const cache = JSON.parse(cacheData);
    const entries = Object.keys(cache).length;
    const size = new Blob([cacheData]).size;

    return {
      size,
      entries,
    };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return { size: 0, entries: 0 };
  }
};
