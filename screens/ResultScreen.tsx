import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
  const { pill } = route.params;
  const { theme } = useTheme();
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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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

            {pill.color || pill.shape || pill.dosage ? (
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
                      Color:
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
                      Shape:
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
                      Dosage:
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
            ) : null}
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(500).delay(100)}>
          <PillInfoSection title="How it's usually used">
            {pill.usage.map((item, index) => (
              <View key={index} style={styles.usageItem}>
                <Text
                  style={[
                    styles.bullet,
                    {
                      color: theme.colors.primary,
                    },
                  ]}
                >
                  •
                </Text>
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
              style={[
                styles.warningCard,
                {
                  backgroundColor: `${theme.colors.warning}15`,
                  borderColor: theme.colors.warning,
                },
              ] as any}
            >
              <Text
                style={[
                  styles.warningTitle,
                  {
                    color: theme.colors.warning,
                  },
                ]}
              >
                Important
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

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
          },
        ]}
      >
        <PrimaryButton
          title={saved ? 'Saved!' : 'Save to history'}
          onPress={handleSave}
          disabled={saved}
          variant="secondary"
          style={[styles.footerButton, saved ? { opacity: 0.6 } : {}] as any}
        />
        <PrimaryButton
          title="Scan another pill"
          onPress={handleScanAnother}
          style={styles.footerButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
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
  },
  bullet: {
    fontSize: 20,
    marginRight: 12,
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
    paddingBottom: 48,
    borderTopWidth: 1,
    gap: 12,
  },
  footerButton: {
    width: '100%',
  },
});

