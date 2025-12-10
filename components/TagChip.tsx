import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface TagChipProps {
  label: string;
}

export const TagChip: React.FC<TagChipProps> = ({ label }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.text,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});

