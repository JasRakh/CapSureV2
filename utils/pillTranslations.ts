import i18n from '../i18n/config';
import { Pill } from '../types';

// Маппинг тегов на ключи переводов
const tagTranslations: { [key: string]: string } = {
  'Pain relief': 'pills.tags.painRelief',
  'Anti-inflammatory': 'pills.tags.antiInflammatory',
  'Fever reducer': 'pills.tags.feverReducer',
  Headache: 'pills.tags.headache',
  Strong: 'pills.tags.strong',
  'Extra strength': 'pills.tags.extraStrength',
  'Blood thinner': 'pills.tags.bloodThinner',
  'Heart protection': 'pills.tags.heartProtection',
  Cardiovascular: 'pills.tags.cardiovascular',
  Arthritis: 'pills.tags.arthritis',
  'Muscle pain': 'pills.tags.musclePain',
  Antibiotic: 'pills.tags.antibiotic',
  'Infection treatment': 'pills.tags.infectionTreatment',
  Bacterial: 'pills.tags.bacterial',
  'Broad spectrum': 'pills.tags.broadSpectrum',
  Respiratory: 'pills.tags.respiratory',
  'UTI treatment': 'pills.tags.utiTreatment',
  'Acne treatment': 'pills.tags.acneTreatment',
  'Lyme disease': 'pills.tags.lymeDisease',
  Diabetes: 'pills.tags.diabetes',
  'Blood sugar control': 'pills.tags.bloodSugarControl',
  'Type 2': 'pills.tags.type2',
  'Insulin stimulator': 'pills.tags.insulinStimulator',
  'Blood pressure': 'pills.tags.bloodPressure',
  Hypertension: 'pills.tags.hypertension',
  Heart: 'pills.tags.heart',
  'ACE inhibitor': 'pills.tags.aceInhibitor',
  'Heart failure': 'pills.tags.heartFailure',
  'Beta-blocker': 'pills.tags.betaBlocker',
  'Heart rhythm': 'pills.tags.heartRhythm',
  Cholesterol: 'pills.tags.cholesterol',
  Statin: 'pills.tags.statin',
  'Acid reflux': 'pills.tags.acidReflux',
  GERD: 'pills.tags.gerd',
  Stomach: 'pills.tags.stomach',
  'Acid reducer': 'pills.tags.acidReducer',
  Nausea: 'pills.tags.nausea',
  Vomiting: 'pills.tags.vomiting',
  Digestive: 'pills.tags.digestive',
  Allergy: 'pills.tags.allergy',
  Antihistamine: 'pills.tags.antihistamine',
  'Hay fever': 'pills.tags.hayFever',
  'Non-drowsy': 'pills.tags.nonDrowsy',
  'Long-acting': 'pills.tags.longActing',
  Antidepressant: 'pills.tags.antidepressant',
  SSRI: 'pills.tags.ssri',
  Anxiety: 'pills.tags.anxiety',
  OCD: 'pills.tags.ocd',
  Vitamin: 'pills.tags.vitamin',
  'Bone health': 'pills.tags.boneHealth',
  'Immune system': 'pills.tags.immuneSystem',
  Calcium: 'pills.tags.calcium',
  Supplement: 'pills.tags.supplement',
  'General health': 'pills.tags.generalHealth',
  Antifungal: 'pills.tags.antifungal',
  'Yeast infection': 'pills.tags.yeastInfection',
  Fungal: 'pills.tags.fungal',
  Topical: 'pills.tags.topical',
  Skin: 'pills.tags.skin',
  Antiviral: 'pills.tags.antiviral',
  Herpes: 'pills.tags.herpes',
  Shingles: 'pills.tags.shingles',
  Asthma: 'pills.tags.asthma',
  Bronchodilator: 'pills.tags.bronchodilator',
  'Rescue inhaler': 'pills.tags.rescueInhaler',
  Corticosteroid: 'pills.tags.corticosteroid',
  Prevention: 'pills.tags.prevention',
  Chemotherapy: 'pills.tags.chemotherapy',
  'Sleep aid': 'pills.tags.sleepAid',
  Melatonin: 'pills.tags.melatonin',
  Insomnia: 'pills.tags.insomnia',
  'Nerve pain': 'pills.tags.nervePain',
  Seizures: 'pills.tags.seizures',
  Neuropathic: 'pills.tags.neuropathic',
  Migraine: 'pills.tags.migraine',
  Triptan: 'pills.tags.triptan',
  Osteoporosis: 'pills.tags.osteoporosis',
  Bisphosphonate: 'pills.tags.bisphosphonate',
  Thyroid: 'pills.tags.thyroid',
  'Hormone replacement': 'pills.tags.hormoneReplacement',
  Hypothyroidism: 'pills.tags.hypothyroidism',
  'Birth control': 'pills.tags.birthControl',
  Contraceptive: 'pills.tags.contraceptive',
  Hormonal: 'pills.tags.hormonal',
  Diarrhea: 'pills.tags.diarrhea',
  'Anti-diarrheal': 'pills.tags.antiDiarrheal',
  Constipation: 'pills.tags.constipation',
  Laxative: 'pills.tags.laxative',
  Anthelmintic: 'pills.tags.anthelmintic',
  Worms: 'pills.tags.worms',
  Parasite: 'pills.tags.parasite',
  Error: 'pills.tags.error',
};

// Функция для перевода тегов
export const translateTags = (tags: string[]): string[] => {
  return tags.map((tag) => {
    const translationKey = tagTranslations[tag];
    if (translationKey) {
      try {
        const translated = i18n.t(translationKey);
        // Если перевод не найден, возвращаем оригинал
        return translated !== translationKey ? translated : tag;
      } catch {
        return tag;
      }
    }
    return tag;
  });
};

// Функция для перевода общих фраз в описаниях и инструкциях
const translateCommonPhrases = (text: string): string => {
  if (!text) return text;

  const phrases: { [key: string]: string } = {
    'Take with food': 'pills.common.takeWithFood',
    'Take with water': 'pills.common.takeWithWater',
    'Do not exceed': 'pills.common.doNotExceed',
    Wait: 'pills.common.wait',
    'hours between doses': 'pills.common.hoursBetweenDoses',
    'per day': 'pills.common.perDay',
    'Consult a doctor': 'pills.common.consultDoctor',
    'Do not use': 'pills.common.doNotUse',
    'May cause': 'pills.common.mayCause',
    Avoid: 'pills.common.avoid',
  };

  let translated = text;
  for (const [phrase, key] of Object.entries(phrases)) {
    if (translated.includes(phrase)) {
      try {
        const translation = i18n.t(key);
        if (translation !== key) {
          translated = translated.replace(phrase, translation);
        }
      } catch {
        // Если перевод не найден, оставляем оригинал
      }
    }
  }

  return translated;
};

// Функция для перевода данных таблетки
export const translatePill = (pill: Partial<Pill>): Partial<Pill> => {
  const translatedTags = translateTags(pill.tags || []);

  // Переводим инструкции по применению
  const translatedUsage = (pill.usage || []).map((item) => translateCommonPhrases(item));

  return {
    ...pill,
    tags: translatedTags,
    usage: translatedUsage,
    // Описания и важные предупреждения остаются на английском
    // так как они специфичны для каждой таблетки
    // В будущем можно добавить полные переводы для каждой таблетки
  };
};
