import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { Card } from '../components/Card';
import { TagChip } from '../components/TagChip';
import { PillInfoSection } from '../components/PillInfoSection';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { savePillToHistory } from '../utils/storage';
import { Pill } from '../types';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';

interface ResultScreenProps {
  navigation: any;
  route: {
    params: {
      pill: Pill;
    };
  };
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ navigation, route }) => {
  // Convert ISO string back to Date if needed
  const pillData = route.params.pill;
  const pill = {
    ...pillData,
    scannedAt:
      pillData.scannedAt instanceof Date ? pillData.scannedAt : new Date(pillData.scannedAt),
  };
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [saved, setSaved] = React.useState(false);

  const handleSave = async () => {
    await savePillToHistory(pill);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleScanAnother = () => {
    navigation.navigate('Scanner');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <TouchableOpacity
        style={[
          styles.closeButton,
          {
            backgroundColor: theme.colors.surface,
          },
        ]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name='close' size={24} color={theme.colors.text} />
      </TouchableOpacity>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(400)}>
          <Card style={styles.card}>
            <Text
              style={[
                styles.pillName,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              {pill.name}
            </Text>

            <Text
              style={[
                styles.description,
                {
                  color: theme.colors.textSecondary,
                },
              ]}
            >
              {pill.description}
            </Text>

            <ConfidenceBadge confidence={pill.confidence} />

            <View style={styles.tagsContainer}>
              {pill.tags.map((tag, index) => (
                <TagChip key={index} label={tag} />
              ))}
            </View>

            {(pill.color || pill.shape || pill.dosage) && (
              <View style={styles.detailsContainer}>
                {pill.color && (
                  <View style={styles.detailItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        {
                          color: theme.colors.textSecondary,
                        },
                      ]}
                    >
                      {t('result.color')}:
                    </Text>
                    <Text
                      style={[
                        styles.detailValue,
                        {
                          color: theme.colors.text,
                        },
                      ]}
                    >
                      {pill.color}
                    </Text>
                  </View>
                )}
                {pill.shape && (
                  <View style={styles.detailItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        {
                          color: theme.colors.textSecondary,
                        },
                      ]}
                    >
                      {t('result.shape')}:
                    </Text>
                    <Text
                      style={[
                        styles.detailValue,
                        {
                          color: theme.colors.text,
                        },
                      ]}
                    >
                      {pill.shape}
                    </Text>
                  </View>
                )}
                {pill.dosage && (
                  <View style={styles.detailItem}>
                    <Text
                      style={[
                        styles.detailLabel,
                        {
                          color: theme.colors.textSecondary,
                        },
                      ]}
                    >
                      {t('result.dosage')}:
                    </Text>
                    <Text
                      style={[
                        styles.detailValue,
                        {
                          color: theme.colors.text,
                        },
                      ]}
                    >
                      {pill.dosage}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(500).delay(100)}>
          <PillInfoSection title={t('result.usage')}>
            {pill.usage.map((item, index) => (
              <View key={index} style={styles.usageItem}>
                <View
                  style={[
                    styles.bulletContainer,
                    {
                      backgroundColor: `${theme.colors.primary}15`,
                    },
                  ]}
                >
                  <Ionicons name='checkmark-circle' size={16} color={theme.colors.primary} />
                </View>
                <Text
                  style={[
                    styles.usageText,
                    {
                      color: theme.colors.text,
                    },
                  ]}
                >
                  {item}
                </Text>
              </View>
            ))}
          </PillInfoSection>
        </Animated.View>

        {pill.important && (
          <Animated.View entering={FadeInUp.duration(500).delay(200)}>
            <Card
              style={
                [
                  styles.warningCard,
                  {
                    backgroundColor: `${theme.colors.warning}15`,
                    borderColor: theme.colors.warning,
                  },
                ] as any
              }
            >
              <Text
                style={[
                  styles.warningTitle,
                  {
                    color: theme.colors.warning,
                  },
                ]}
              >
                {t('result.important')}
              </Text>
              <Text
                style={[
                  styles.warningText,
                  {
                    color: theme.colors.text,
                  },
                ]}
              >
                {pill.important}
              </Text>
            </Card>
          </Animated.View>
        )}
      </ScrollView>

      <SafeAreaView
        style={[
          styles.footer,
          {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
          },
        ]}
        edges={['bottom']}
      >
        <PrimaryButton
          title={saved ? t('result.saved') : t('result.saveToHistory')}
          onPress={handleSave}
          disabled={saved}
          variant='secondary'
          style={styles.footerButton}
        />
        <PrimaryButton
          title={t('result.scanAnother')}
          onPress={handleScanAnother}
          style={styles.footerButton}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 64,
    paddingBottom: 120,
  },
  card: {
    marginBottom: 24,
  },
  pillName: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  detailsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
    minWidth: 60,
  },
  detailValue: {
    fontSize: 14,
    flex: 1,
  },
  usageItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
    gap: 12,
  },
  bulletContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  usageText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  warningCard: {
    borderWidth: 1,
    marginTop: 8,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    paddingBottom: 0,
    borderTopWidth: 1,
    gap: 12,
  },
  footerButton: {
    width: '100%',
  },
});
