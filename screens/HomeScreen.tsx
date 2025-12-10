import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { CapSureLogo } from '../components/CapSureLogo';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => navigation.navigate('About')}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.infoButtonContainer,
            {
              backgroundColor: `${theme.colors.primary}15`,
            },
          ]}
        >
          <Ionicons name='information-circle' size={24} color={theme.colors.primary} />
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <CapSureLogo size={100} color={theme.colors.primary} />
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
              },
            ]}
          >
            {t('home.title')}
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            {t('home.subtitle')}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={t('home.scanButton')}
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
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: `${theme.colors.primary}15`,
                },
              ]}
            >
              <Ionicons name='list-outline' size={24} color={theme.colors.primary} />
            </View>
            <Text
              style={[
                styles.quickActionText,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              {t('common.history')}
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
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: `${theme.colors.primary}15`,
                },
              ]}
            >
              <Ionicons name='settings-outline' size={24} color={theme.colors.primary} />
            </View>
            <Text
              style={[
                styles.quickActionText,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              {t('common.settings')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    marginTop: 16,
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
    gap: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    zIndex: 10,
  },
  infoButtonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
