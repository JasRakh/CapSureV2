import { lightColors, darkColors, ColorScheme } from './colors';
import { spacing, Spacing } from './spacing';
import { typography, Typography } from './typography';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  colors: ColorScheme;
  spacing: Spacing;
  typography: Typography;
  mode: ThemeMode;
}

export const createTheme = (mode: 'light' | 'dark'): Theme => ({
  colors: mode === 'light' ? lightColors : darkColors,
  spacing,
  typography,
  mode,
});

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');
