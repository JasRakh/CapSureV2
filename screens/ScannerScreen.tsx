import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { identifyPillWithML } from '../data/mockPills';

const { width } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

interface ScannerScreenProps {
  navigation: any;
}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  const handleScan = async () => {
    if (scanning || !cameraRef.current) return;

    setScanning(true);
    try {
      // Take a photo using takePictureAsync method from CameraView
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      if (!photo?.uri) {
        throw new Error('Failed to capture image');
      }

      // Optimize image for ML model processing (resize if too large)
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 1024 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      // Identify pill using ML model
      const pill = await identifyPillWithML(manipulatedImage.uri);

      // Convert Date to ISO string for navigation params (fixes serialization warning)
      const pillForNavigation = {
        ...pill,
        scannedAt: pill.scannedAt.toISOString(),
      };

      navigation.navigate('Result', { pill: pillForNavigation });
    } catch (error: any) {
      console.error('Error identifying pill:', error);
      Alert.alert(t('scanner.error'), error.message || t('scanner.failedToIdentify'), [
        { text: t('common.close') },
      ]);
    } finally {
      setScanning(false);
    }
  };

  if (!permission) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        edges={['top', 'bottom']}
      >
        <ActivityIndicator size='large' color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          styles.centerContent,
          { backgroundColor: theme.colors.background },
        ]}
        edges={['top', 'bottom']}
      >
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          {t('scanner.cameraPermission')}
        </Text>
        <PrimaryButton
          title={t('scanner.grantPermission')}
          onPress={requestPermission}
          style={styles.button}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing='back'
        onCameraReady={() => setCameraReady(true)}
      >
        <View style={styles.overlay}>
          <View
            style={[
              styles.overlaySection,
              {
                backgroundColor: theme.colors.overlay,
              },
            ]}
          />
          <View style={styles.middleSection}>
            <View
              style={[
                styles.overlaySection,
                {
                  backgroundColor: theme.colors.overlay,
                },
              ]}
            />
            <View style={styles.scanAreaContainer}>
              <View
                style={[
                  styles.scanArea,
                  {
                    borderColor: theme.colors.primary,
                  },
                ]}
              >
                <View
                  style={[
                    styles.corner,
                    styles.topLeft,
                    {
                      borderColor: theme.colors.primary,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.corner,
                    styles.topRight,
                    {
                      borderColor: theme.colors.primary,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.corner,
                    styles.bottomLeft,
                    {
                      borderColor: theme.colors.primary,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.corner,
                    styles.bottomRight,
                    {
                      borderColor: theme.colors.primary,
                    },
                  ]}
                />
              </View>
            </View>
            <View
              style={[
                styles.overlaySection,
                {
                  backgroundColor: theme.colors.overlay,
                },
              ]}
            />
          </View>
          <View
            style={[
              styles.overlaySection,
              {
                backgroundColor: theme.colors.overlay,
              },
            ]}
          />
        </View>
      </CameraView>

      <View
        style={[
          styles.controls,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.helperText,
            {
              color: theme.colors.textSecondary,
            },
          ]}
        >
          {t('scanner.placePill')}
        </Text>

        {scanning ? (
          <View style={styles.scanningContainer}>
            <ActivityIndicator size='large' color={theme.colors.primary} />
            <Text
              style={[
                styles.scanningText,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              {t('scanner.analyzing')}
            </Text>
          </View>
        ) : (
          <PrimaryButton
            title={t('scanner.scan')}
            onPress={handleScan}
            disabled={!cameraReady}
            style={styles.scanButton}
          />
        )}

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Text
            style={[
              styles.cancelText,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            {t('common.cancel')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlaySection: {
    flex: 1,
  },
  middleSection: {
    flexDirection: 'row',
    height: SCAN_AREA_SIZE,
  },
  scanAreaContainer: {
    width: SCAN_AREA_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    borderRadius: 20,
    borderWidth: 3,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderWidth: 3,
  },
  topLeft: {
    top: -3,
    left: -3,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: -3,
    right: -3,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: -3,
    left: -3,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: -3,
    right: -3,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 20,
  },
  controls: {
    padding: 24,
    paddingBottom: 48,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  helperText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  scanningContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  scanningText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  scanButton: {
    width: '100%',
    marginBottom: 12,
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    width: '100%',
  },
});
