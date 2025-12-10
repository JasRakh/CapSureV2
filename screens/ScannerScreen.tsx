import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useTheme } from '../theme/ThemeContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { identifyPill } from '../data/mockPills';

const { width, height } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

interface ScannerScreenProps {
  navigation: any;
}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const [scanning, setScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScan = async () => {
    if (scanning) return;

    setScanning(true);
    try {
      // Simulate pill identification
      const pill = await identifyPill();
      navigation.navigate('Result', { pill });
    } catch (error) {
      console.error('Error identifying pill:', error);
    } finally {
      setScanning(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Camera permission is required to scan pills.
        </Text>
        <PrimaryButton
          title="Grant Permission"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
          style={styles.button}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={'back' as any}
        onCameraReady={() => setCameraReady(true)}
      >
        <View style={styles.overlay}>
          {/* Top overlay */}
          <View
            style={[
              styles.overlaySection,
              {
                backgroundColor: theme.colors.overlay,
              },
            ]}
          />

          {/* Middle section with scan area */}
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

          {/* Bottom overlay */}
          <View
            style={[
              styles.overlaySection,
              {
                backgroundColor: theme.colors.overlay,
              },
            ]}
          />
        </View>
      </Camera>

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
          Place the pill inside the frame
        </Text>

        {scanning ? (
          <View style={styles.scanningContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text
              style={[
                styles.scanningText,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              Identifying pill...
            </Text>
          </View>
        ) : (
          <PrimaryButton
            title="Scan"
            onPress={handleScan}
            disabled={!cameraReady}
            style={styles.scanButton}
          />
        )}

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Text
            style={[
              styles.cancelText,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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

