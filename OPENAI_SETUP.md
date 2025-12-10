# OpenAI API Setup Guide

This app uses OpenAI's GPT-4 Vision API to identify pills from photos. Follow these steps to set it up:

## Step 1: Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy your API key (you won't be able to see it again!)

## Step 2: Configure API Key

### Option A: Using Environment Variables (Recommended)

1. Create a `.env` file in the root directory of your project:

```bash
EXPO_PUBLIC_OPENAI_API_KEY=your_api_key_here
```

2. Install `dotenv` if needed:

```bash
npm install dotenv
```

3. Make sure `.env` is in your `.gitignore` file to keep your key secure!

### Option B: Direct Configuration (Not Recommended for Production)

You can temporarily hardcode your API key in `services/openaiService.ts`:

```typescript
const OPENAI_API_KEY = 'your_api_key_here';
```

⚠️ **Warning**: Never commit your API key to version control!

## Step 3: Test the Integration

1. Start your Expo app:

```bash
npm start
```

2. Open the app and navigate to the Scanner screen
3. Take a photo of a pill
4. The app will send the image to ChatGPT and display the results

## Troubleshooting

### Error: "Unable to identify the pill"

- Check that your API key is correctly set
- Ensure you have credits in your OpenAI account
- Verify your internet connection
- Check the console logs for detailed error messages

### Error: "Failed to capture image"

- Grant camera permissions to the app
- Ensure the camera is working properly
- Try restarting the app

### API Rate Limits

OpenAI has rate limits based on your subscription tier. If you hit rate limits:

- Wait a few minutes before trying again
- Consider upgrading your OpenAI plan
- Implement request caching for better performance

## Cost Considerations

- GPT-4 Vision API charges per image analyzed
- Each pill identification uses approximately 1,000 tokens
- Check [OpenAI Pricing](https://openai.com/pricing) for current rates
- Consider implementing caching to reduce API calls

## Security Best Practices

1. **Never commit API keys** to version control
2. Use environment variables for API keys
3. Consider using a backend proxy for production apps
4. Monitor your API usage regularly
5. Set up usage alerts in OpenAI dashboard

## Alternative: Using a Backend Proxy

For production apps, it's recommended to use a backend server as a proxy:

1. Create a backend API endpoint
2. Store API key securely on the server
3. Send images to your backend
4. Backend forwards requests to OpenAI
5. Backend returns results to the app

This approach:

- Keeps API keys secure
- Allows for request caching
- Provides better error handling
- Enables usage analytics
