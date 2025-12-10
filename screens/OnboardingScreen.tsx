import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { setOnboardingCompleted } from '../utils/storage';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

const onboardingData = [
  {
    title: 'Scan pills with your camera',
    description: 'Point your camera at any pill or capsule to instantly identify it.',
    icon: '📷',
  },
  {
    title: 'Get quick information',
    description: 'Learn about usage, dosage, and important safety information.',
    icon: '💊',
  },
  {
    title: 'Not medical advice',
    description: 'This app is for informational purposes only. Always consult a healthcare professional.',
    icon: '⚠️',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / width);
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentPage + 1) * width,
        animated: true,
      });
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    await setOnboardingCompleted();
    navigation.replace('Main');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {onboardingData.map((item, index) => (
          <View key={index} style={[styles.page, { width }]}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.description,
                {
                  color: theme.colors.textSecondary,
                },
              ]}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentPage ? theme.colors.primary : theme.colors.border,
                },
              ]}
            />
          ))}
        </View>
        <PrimaryButton
          title={currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  icon: {
    fontSize: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    width: '100%',
  },
});

