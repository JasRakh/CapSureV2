import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { PrimaryButton } from '../components/PrimaryButton';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
              },
            ]}
          >
            PillScan
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Point your camera at a pill to identify it.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Scan a pill"
            onPress={() => navigation.navigate('Scanner')}
            style={styles.scanButton}
          />
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[
              styles.quickActionButton,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => navigation.navigate('History')}
          >
            <Text style={styles.quickActionIcon}>📋</Text>
            <Text
              style={[
                styles.quickActionText,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickActionButton,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.quickActionIcon}>⚙️</Text>
            <Text
              style={[
                styles.quickActionText,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 32,
  },
  scanButton: {
    width: '100%',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

