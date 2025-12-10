import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
          height: 65,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' size={size || 24} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name='History'
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='list' size={size || 24} color={color} />
          ),
          tabBarLabel: 'History',
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings-outline' size={size || 24} color={color} />
          ),
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
      <>
        <StatusBar hidden={true} />
        <View
          style={[
            loadingStyles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <SafeAreaView
            style={loadingStyles.safeArea}
            edges={['top', 'bottom', 'left', 'right']}
          >
            <View style={loadingStyles.content}>
              <ActivityIndicator size='large' color={theme.colors.primary} />
              <Text
                style={[
                  loadingStyles.text,
                  {
                    color: theme.colors.textSecondary,
                  },
                ]}
              >
                CapSure
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </>
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
          component={ResultScreen as React.ComponentType<any>}
          options={{
            presentation: 'card',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const loadingStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT + 200,
    zIndex: 9999,
    elevation: 9999,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
});
