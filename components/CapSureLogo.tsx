import React from 'react';
import { View, StyleSheet } from 'react-native';
import PillMarkSvg from './pill-mark.svg';

interface CapSureLogoProps {
  size?: number;
  color?: string;
}

export const CapSureLogo: React.FC<CapSureLogoProps> = ({ size = 120 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <PillMarkSvg width={size} height={size} viewBox='0 0 640 640' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
