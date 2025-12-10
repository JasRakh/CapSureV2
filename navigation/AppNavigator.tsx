import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getOnboardingCompleted } from '../utils/storage';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ScannerScreen } from '../screens/ScannerScreen';
import { ResultScreen } from '../screens/ResultScreen';
import { RootStackParamList, MainTabParamList } from './types';
import { useTheme } from '../theme/ThemeContext';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name='History'
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📋</Text>,
          tabBarLabel: 'History',
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⚙️</Text>,
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);
  const { theme, isDark } = useTheme();

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await getOnboardingCompleted();
      setIsOnboardingComplete(completed);
    };
    checkOnboarding();
  }, []);

  if (isOnboardingComplete === null) {
    return (
      <View
        style={[
          loadingStyles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size='large' color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.primary,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {!isOnboardingComplete ? (
          <Stack.Screen name='Onboarding' component={OnboardingScreen} />
        ) : null}
        <Stack.Screen name='Main' component={MainTabs} />
        <Stack.Screen
          name='Scanner'
          component={ScannerScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name='Result'
          component={ResultScreen as any}
          options={{
            presentation: 'card',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
