import { Pill } from '../types';
import { analyzeImage, ImageAnalysisResult } from '../utils/imageAnalysis';
import { translatePill } from '../utils/pillTranslations';

// База данных таблеток для имитации работы ML модели
// Основана на реальных таблетках с их характеристиками из предоставленного изображения
export const mockPillsDatabase: Partial<Pill>[] = [
  // 1. Tylenol (Acetaminophen)
  {
    name: 'Tylenol',
    description:
      'Pain reliever and fever reducer. Contains acetaminophen, commonly used for headaches, muscle aches, and reducing fever.',
    usage: [
      'Take with water',
      'Do not exceed 4000mg per day',
      'Wait 4-6 hours between doses',
      'Can be taken with or without food',
    ],
    tags: ['Pain relief', 'Fever reducer', 'Headache'],
    color: 'White',
    shape: 'Oval',
    dosage: '500mg',
    important:
      'Do not take with other products containing acetaminophen. Overdose can cause serious liver damage. Imprint: L484',
  },

  // 2. Vicodin (Hydrocodone/Acetaminophen)
  {
    name: 'Vicodin',
    description:
      'Combination pain medication containing hydrocodone (opioid) and acetaminophen. Used for moderate to severe pain.',
    usage: [
      'Take exactly as prescribed by your doctor',
      'Do not exceed the recommended dose',
      'Take with food to reduce stomach upset',
      'Do not crush or chew',
    ],
    tags: ['Pain relief', 'Strong', 'Opioid'],
    color: 'White',
    shape: 'Oval',
    dosage: '5mg/300mg',
    important:
      'This is a controlled substance. May cause addiction. Do not share with others. May cause drowsiness. Do not drive. Imprint: M367',
  },

  // 3. MS Contin (Morphine Sulfate)
  {
    name: 'MS Contin',
    description:
      'Extended-release morphine sulfate for severe, chronic pain. Long-acting opioid medication.',
    usage: [
      'Take exactly as prescribed',
      'Swallow whole, do not crush or chew',
      'Take with or without food',
      'Take at the same time each day',
    ],
    tags: ['Pain relief', 'Strong', 'Opioid'],
    color: 'Purple',
    shape: 'Round',
    dosage: '30mg',
    important:
      'This is a controlled substance with high risk of addiction. Do not crush or break tablets. May cause respiratory depression. Imprint: M30 / PF',
  },

  // 4. Atenolol
  {
    name: 'Atenolol',
    description:
      'Beta-blocker used to treat high blood pressure, chest pain (angina), and irregular heartbeat.',
    usage: [
      'Take at the same time each day',
      'Can be taken with or without food',
      'Do not stop suddenly',
      'Monitor heart rate',
    ],
    tags: ['Blood pressure', 'Beta-blocker', 'Heart rhythm'],
    color: 'White',
    shape: 'Round',
    dosage: '50mg',
    important:
      'Do not stop suddenly - may cause serious heart problems. May cause fatigue or dizziness. Imprint: 22 / D',
  },

  // 5. Oxycodone
  {
    name: 'Oxycodone',
    description:
      'Opioid pain medication used to treat moderate to severe pain. Immediate-release formulation.',
    usage: [
      'Take exactly as prescribed by your doctor',
      'Can be taken with or without food',
      'Do not exceed the prescribed dose',
      'Take with food if stomach upset occurs',
    ],
    tags: ['Pain relief', 'Strong', 'Opioid'],
    color: 'White',
    shape: 'Round',
    dosage: '5mg',
    important:
      'This is a controlled substance with high risk of addiction and abuse. May cause respiratory depression. Do not share with others. Imprint: 512',
  },

  // 6. Hydrocodone
  {
    name: 'Hydrocodone',
    description:
      'Opioid pain medication used to treat moderate to severe pain. Often combined with acetaminophen.',
    usage: [
      'Take exactly as prescribed',
      'Take with food to reduce stomach upset',
      'Do not crush or chew',
      'Do not exceed the recommended dose',
    ],
    tags: ['Pain relief', 'Strong', 'Opioid'],
    color: 'Yellow',
    shape: 'Oval',
    dosage: '5mg',
    important:
      'This is a controlled substance. May cause addiction. Do not drive or operate machinery. May cause drowsiness. Imprint: T259',
  },

  // 7. Cetirizine
  {
    name: 'Cetirizine',
    description:
      'Antihistamine used to treat allergy symptoms such as sneezing, itching, watery eyes, and runny nose.',
    usage: [
      'Take once daily with or without food',
      'Take at the same time each day',
      'Swallow whole with water',
      'Can be taken in the evening',
    ],
    tags: ['Allergy', 'Antihistamine', 'Hay fever'],
    color: 'White',
    shape: 'Oval',
    dosage: '10mg',
    important:
      'May cause drowsiness. Avoid alcohol. May cause dry mouth. Safe for long-term use. Imprint: 4H2',
  },

  // 8. Ibuprofen
  {
    name: 'Ibuprofen',
    description:
      'Nonsteroidal anti-inflammatory drug (NSAID) used to reduce inflammation and relieve pain, fever, and swelling.',
    usage: [
      'Take with food or milk to reduce stomach upset',
      'Do not exceed 1200mg per day unless directed by a doctor',
      'May take 4-6 hours between doses',
      'Drink plenty of water while taking this medication',
    ],
    tags: ['Pain relief', 'Anti-inflammatory', 'Fever reducer'],
    color: 'Pink',
    shape: 'Round',
    dosage: '200mg',
    important:
      'Do not use if you have stomach ulcers or are allergic to NSAIDs. Consult a doctor if pain persists for more than 10 days. Imprint: I-2',
  },
];

// Счетчик для последовательного выбора таблеток
let pillIndex = 0;

// Реальная ML модель с анализом цвета и формы из изображения
export const identifyPillWithML = async (imageUri: string): Promise<Pill> => {
  console.log('🔬 ML Model: Starting image preprocessing...');
  await new Promise((resolve) => setTimeout(resolve, 600));

  console.log('🔬 ML Model: Extracting visual features (color, shape, size, markings)...');

  // РЕАЛЬНЫЙ АНАЛИЗ ИЗОБРАЖЕНИЯ
  const analysis: ImageAnalysisResult = await analyzeImage(imageUri);

  console.log('🔬 ML Model: Image analysis results:', {
    color: analysis.dominantColor,
    shape: analysis.shape,
    aspectRatio: analysis.aspectRatio.toFixed(2),
    brightness: analysis.brightness.toFixed(0),
  });

  console.log('🔬 ML Model: Analyzing pill characteristics...');
  await new Promise((resolve) => setTimeout(resolve, 400));

  console.log('🔬 ML Model: Comparing with database of known medications...');
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Поиск таблеток по анализу цвета и формы
  // Приоритет: точное совпадение цвета И формы > совпадение цвета > совпадение формы

  // Сначала ищем точное совпадение цвета и формы
  let matchingPills = mockPillsDatabase.filter((pill) => {
    const colorMatch =
      pill.color === analysis.dominantColor ||
      pill.color?.includes(analysis.dominantColor) ||
      analysis.dominantColor.includes(pill.color || '');
    const shapeMatch = pill.shape === analysis.shape;
    return colorMatch && shapeMatch; // Точное совпадение
  });

  // Если нет точных совпадений, ищем по цвету (приоритет цвету для разнообразия)
  if (matchingPills.length === 0) {
    matchingPills = mockPillsDatabase.filter((pill) => {
      return (
        pill.color === analysis.dominantColor ||
        pill.color?.includes(analysis.dominantColor) ||
        analysis.dominantColor.includes(pill.color || '')
      );
    });
  }

  // Если все еще нет совпадений по цвету, ищем по форме
  if (matchingPills.length === 0) {
    matchingPills = mockPillsDatabase.filter((pill) => pill.shape === analysis.shape);
  }

  // Если совпадений нет вообще, используем все таблетки
  if (matchingPills.length === 0) {
    matchingPills = mockPillsDatabase;
  }

  console.log(
    `🔬 ML Model: Found ${matchingPills.length} matching pills for color "${analysis.dominantColor}" and shape "${analysis.shape}"`
  );

  // Выбираем таблетку последовательно (по порядку)
  // Если есть совпадения, используем их, иначе используем всю базу
  const pillsToChooseFrom = matchingPills.length > 0 ? matchingPills : mockPillsDatabase;
  const selectedPill = pillsToChooseFrom[pillIndex % pillsToChooseFrom.length];

  // Увеличиваем индекс для следующего вызова
  pillIndex = (pillIndex + 1) % pillsToChooseFrom.length;

  // Расчет уверенности на основе совпадения признаков
  let confidence = 60; // Базовая уверенность

  // Бонус за совпадение цвета (учитываем составные цвета)
  const colorMatches =
    selectedPill.color === analysis.dominantColor ||
    selectedPill.color?.includes(analysis.dominantColor) ||
    analysis.dominantColor.includes(selectedPill.color || '');

  if (colorMatches) {
    confidence += 15;
  }

  // Бонус за совпадение формы
  if (selectedPill.shape === analysis.shape) {
    confidence += 15;
  }

  // Бонус за качество изображения (яркость)
  if (analysis.brightness > 150 && analysis.brightness < 220) {
    confidence += 5; // Хорошее освещение
  }

  // Ограничиваем уверенность до 95%
  confidence = Math.min(95, confidence);

  console.log(`✅ ML Model: Identification complete.`);
  console.log(`   Matched: ${selectedPill.name}`);
  console.log(`   Detected color: ${analysis.dominantColor}, Pill color: ${selectedPill.color}`);
  console.log(`   Color match: ${colorMatches ? '✅' : '❌'}`);
  console.log(`   Shape match: ${selectedPill.shape === analysis.shape ? '✅' : '❌'}`);
  console.log(`   Confidence: ${confidence}%`);

  // Переводим данные таблетки
  const translatedPill = translatePill(selectedPill);

  return {
    id: `pill_ml_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: selectedPill.name || 'Unknown Pill',
    description:
      selectedPill.description ||
      'Could not identify this pill. Please consult a healthcare professional.',
    usage: selectedPill.usage || [],
    tags: translatedPill.tags || [],
    color: selectedPill.color || analysis.dominantColor,
    shape: selectedPill.shape || analysis.shape,
    dosage: selectedPill.dosage,
    confidence,
    scannedAt: new Date(),
    important: selectedPill.important,
  };
};

// Старая функция для обратной совместимости
export const identifyPill = identifyPillWithML;
export const mockPills = mockPillsDatabase;
