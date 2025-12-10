import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pill } from '../types';

const HISTORY_STORAGE_KEY = '@pillscan_history';
const ONBOARDING_KEY = '@pillscan_onboarding_completed';

export const savePillToHistory = async (pill: Pill): Promise<void> => {
  try {
    const history = await getPillHistory();
    const updatedHistory = [pill, ...history];
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving pill to history:', error);
  }
};

export const getPillHistory = async (): Promise<Pill[]> => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
    if (data) {
      const pills = JSON.parse(data);
      // Convert scannedAt strings back to Date objects
      return pills.map((pill: Pill) => ({
        ...pill,
        scannedAt: new Date(pill.scannedAt),
      }));
    }
    return [];
  } catch (error) {
    console.error('Error getting pill history:', error);
    return [];
  }
};

export const clearPillHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

export const getOnboardingCompleted = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error getting onboarding status:', error);
    return false;
  }
};

export const setOnboardingCompleted = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (error) {
    console.error('Error setting onboarding status:', error);
  }
};

