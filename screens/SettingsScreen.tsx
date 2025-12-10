import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { ThemeMode } from '../theme';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {
  const { theme, themeMode, setThemeMode, isDark } = useTheme();

  const themeOptions: { label: string; value: ThemeMode }[] = [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            Appearance
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Choose your preferred theme
          </Text>

          <View style={styles.themeOptions}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor:
                      themeMode === option.value
                        ? `${theme.colors.primary}20`
                        : 'transparent',
                    borderColor:
                      themeMode === option.value
                        ? theme.colors.primary
                        : theme.colors.border,
                  },
                ]}
                onPress={() => setThemeMode(option.value)}
              >
                <Text
                  style={[
                    styles.themeOptionText,
                    {
                      color:
                        themeMode === option.value
                          ? theme.colors.primary
                          : theme.colors.text,
                      fontWeight: themeMode === option.value ? '600' : '400',
                    },
                  ]}
                >
                  {option.label}
                </Text>
                {themeMode === option.value && (
                  <Ionicons
                    name='checkmark'
                    size={20}
                    color={theme.colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            Language
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Coming soon
          </Text>
        </Card>

        <Card
          style={
            [
              styles.disclaimerCard,
              {
                backgroundColor: `${theme.colors.warning}15`,
                borderColor: theme.colors.warning,
              },
            ] as any
          }
        >
          <View style={styles.disclaimerHeader}>
            <Ionicons
              name='warning-outline'
              size={24}
              color={theme.colors.warning}
            />
            <Text
              style={[
                styles.disclaimerTitle,
                {
                  color: theme.colors.warning,
                },
              ]}
            >
              Medical Disclaimer
            </Text>
          </View>
          <Text
            style={[
              styles.disclaimerText,
              {
                color: theme.colors.text,
              },
            ]}
          >
            This app does not replace professional medical advice. Always
            consult a healthcare professional before taking any medication. The
            information provided is for educational purposes only and should not
            be used as a substitute for professional medical consultation,
            diagnosis, or treatment.
          </Text>
        </Card>

        <View style={styles.versionContainer}>
          <Text
            style={[
              styles.versionText,
              {
                color: theme.colors.textTertiary,
              },
            ]}
          >
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  themeOptions: {
    gap: 8,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  themeOptionText: {
    fontSize: 16,
  },
  checkmark: {
    fontSize: 18,
    fontWeight: '600',
  },
  disclaimerCard: {
    borderWidth: 1,
    marginTop: 8,
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  versionText: {
    fontSize: 12,
  },
});
