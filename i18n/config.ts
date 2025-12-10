import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import uz from '../locales/uz.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_STORAGE_KEY = '@capsure_language';

// Определяем язык устройства
const getDeviceLanguage = (): string => {
  const locale = Localization.getLocales()[0].languageCode || 'en';
  switch (locale) {
    case 'ru':
      return 'ru';
    case 'uz':
      return 'uz';
    default:
      return 'en';
  }
};

// Загружаем сохраненный язык или используем язык устройства
const loadLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && ['en', 'ru', 'uz'].includes(savedLanguage)) {
      return savedLanguage;
    }
    return getDeviceLanguage();
  } catch (error) {
    console.error('Error loading language:', error);
    return getDeviceLanguage();
  }
};

// Инициализация i18n
const initI18n = async () => {
  const language = await loadLanguage();

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      uz: { translation: uz },
    },
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

// Сохранение языка
export const saveLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

// Получение текущего языка
export const getCurrentLanguage = (): string => {
  return i18n.language || 'en';
};

// Инициализируем i18n синхронно с дефолтным языком
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    uz: { translation: uz },
  },
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Загружаем сохраненный язык после инициализации
loadLanguage().then((language) => {
  i18n.changeLanguage(language);
});

export default i18n;
