import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';

interface AboutScreenProps {
  navigation: any;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  const openGitHub = () => {
    Linking.openURL('https://github.com/JasRakh/CapSure');
  };

  const openEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name='close' size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            {
              color: theme.colors.text,
            },
          ]}
        >
          CapSure
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.section}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
              },
            ]}
          >
            CapSure: A Computer Vision-Based Pill Detection and Identification System
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            Team Members
          </Text>
          <View style={styles.teamList}>
            <Text style={[styles.teamItem, { color: theme.colors.text }]}>
              220257 Jasur Rakhmanov (Coordinator)
            </Text>
            <Text style={[styles.teamItem, { color: theme.colors.text }]}>
              220901 Akbar Juraboev
            </Text>
            <Text style={[styles.teamItem, { color: theme.colors.text }]}>
              220980 Feruz Mirxodjaev
            </Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            Contact Information
          </Text>
          <TouchableOpacity
            onPress={() => openEmail('220980@centralasian.uz')}
            style={styles.linkContainer}
          >
            <Ionicons name='mail-outline' size={18} color={theme.colors.primary} />
            <Text style={[styles.link, { color: theme.colors.primary }]}>
              220980@centralasian.uz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openEmail('220901@centralasian.uz')}
            style={styles.linkContainer}
          >
            <Ionicons name='mail-outline' size={18} color={theme.colors.primary} />
            <Text style={[styles.link, { color: theme.colors.primary }]}>
              220901@centralasian.uz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openEmail('220257@centralasian.uz')}
            style={styles.linkContainer}
          >
            <Ionicons name='mail-outline' size={18} color={theme.colors.primary} />
            <Text style={[styles.link, { color: theme.colors.primary }]}>
              220257@centralasian.uz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGitHub} style={styles.linkContainer}>
            <Ionicons name='logo-github' size={18} color={theme.colors.primary} />
            <Text style={[styles.link, { color: theme.colors.primary }]}>
              https://github.com/JasRakh/CapSure
            </Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            1. Abstract
          </Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Accurate identification of medication is a critical challenge in healthcare, especially
            when pills are removed from their original packaging or when patients are required to
            take multiple prescriptions. Visual similarities between medications often lead to
            confusion, medication errors, or even severe health consequences.
          </Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            This project proposes CapSure, an intelligent computer vision system designed to detect,
            recognize, and identify pharmaceutical pills using a live camera feed or uploaded
            images. Our approach combines object detection (YOLO-based), OCR for imprint extraction,
            and visual feature embedding with similarity search. The system retrieves the closest
            matches from a pill database containing metadata (name, dosage, shape, manufacturer).
          </Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            The expected outcome is a robust, real-time application with high accuracy, deployable
            on mobile and web platforms, providing interpretable predictions. CapSure aims to reduce
            medication-related risks and improve treatment safety.
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            2. Problem & Motivation
          </Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Medication errors cause significant preventable harm globally. Pills are often dispensed
            without packaging, making visual identification difficult. Manual identification is slow
            and error-prone; existing online tools require manual input and are limited.
          </Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            CapSure uses modern CV techniques to automate pill identification. Beneficiaries include
            pharmacists, hospitals, clinics, and patients.
          </Text>
          <View style={styles.goalsContainer}>
            <Text
              style={[
                styles.goalsTitle,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              Measurable goals:
            </Text>
            <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
              • ≥90% Top-1 accuracy
            </Text>
            <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
              • ≥95% Top-3 accuracy
            </Text>
            <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
              • {'<'}200 ms latency per frame
            </Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            3. Related Work
          </Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Overview of previous research:
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • PillIDNet (2017): CNN classifier (~80%)
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Kang et al. (2020): OCR + CNN for imprints (~88%)
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • US FDA Pill Image Dataset
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • DeepPill (2021): Multimodal embedding (~90%)
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            4. Data & Resources
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • 100–200+ pill images
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Hardware: MacBook Pro M2 Pro
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Frameworks: PyTorch, YOLOv8, OpenCV, EasyOCR, FAISS
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • No personal or sensitive data used.
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            5. Method
          </Text>
          <Text
            style={[
              styles.subsectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            5.1 Baseline
          </Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Reproduce CNN classifier similar to PillIDNet.
          </Text>
          <Text
            style={[
              styles.subsectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            5.2 Proposed Pipeline
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Detection: YOLOv8
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • OCR: CRNN or TrOCR
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Embedding: CLIP or MobileNet
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Retrieval: FAISS index
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Ranking: Fusion of OCR, embedding, metadata
          </Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
                marginTop: 8,
              },
            ]}
          >
            Ablation studies will measure each component's contribution.
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            6. Experiments & Metrics
          </Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Measured metrics:
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Top-1 / Top-3 accuracy
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • mAP for detection
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>• OCR CER</Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>• Latency</Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
                marginTop: 12,
              },
            ]}
          >
            Success thresholds:
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>• mAP {'>'} 0.90</Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Top-1 {'>'} 0.90
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • OCR CER {'<'} 0.15
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Latency {'<'} 200 ms
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            7. Risks & Mitigations
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Data scarcity: augmentations
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Domain shift: diverse lighting
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Model collapse: LR scheduling, early stopping
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Compute limits: quantization, pruning
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            8. Timeline & Roles
          </Text>
          <Text
            style={[
              styles.paragraph,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Timeline (16 weeks)
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Week 1–5: Literature review, data collection
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Week 5–8: Detection model training
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Week 8–10: OCR + embedding integration
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Week 11–14: Retrieval + ranking
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Week 14–15: Evaluation
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Week 16: Final report + demo
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            9. Expected Outcomes
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Full pill detection + identification system
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Documentation + final report
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>• Poster + video</Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Stretch goals: multilingual OCR, 3D recognition, public API
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            10. Ethics & Compliance
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • No human subjects
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • All datasets publicly licensed
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • System not for clinical decisions; requires disclaimers
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Bias testing across pill types, colors, lighting
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            11. References
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Rajpurkar et al. (2017)
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Kang et al. (2020)
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • FDA Pill Image dataset
          </Text>
          <Text style={[styles.goal, { color: theme.colors.textSecondary }]}>
            • Xu et al. (2021)
          </Text>
        </Card>

        <View style={styles.footer}>
          <Text
            style={[
              styles.footerText,
              {
                color: theme.colors.textTertiary,
              },
            ]}
          >
            October 20, 2025
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  teamList: {
    gap: 8,
  },
  teamItem: {
    fontSize: 14,
    lineHeight: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  link: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  goalsContainer: {
    marginTop: 8,
  },
  goalsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  goal: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 12,
  },
});
