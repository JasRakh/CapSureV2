import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ConfidenceBadgeProps {
  confidence: number;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence }) => {
  const { theme } = useTheme();

  const getConfidenceColor = () => {
    if (confidence >= 90) return theme.colors.success;
    if (confidence >= 75) return theme.colors.info;
    return theme.colors.warning;
  };

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            {
              width: `${confidence}%`,
              backgroundColor: getConfidenceColor(),
            },
          ]}
        />
      </View>
      <Text
        style={[
          styles.text,
          {
            color: theme.colors.textSecondary,
          },
        ]}
      >
        {confidence}% confidence
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  barContainer: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});
