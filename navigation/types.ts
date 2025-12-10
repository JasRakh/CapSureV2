import { NavigatorScreenParams } from '@react-navigation/native';
import { Pill } from '../types';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  Scanner: undefined;
  Result: { pill: Pill };
};

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};

