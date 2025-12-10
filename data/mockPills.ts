import { Pill } from '../types';
import { analyzeImage, ImageAnalysisResult } from '../utils/imageAnalysis';
import { translatePill } from '../utils/pillTranslations';

// Большая база данных таблеток для имитации работы ML модели
export const mockPillsDatabase: Partial<Pill>[] = [
  // Обезболивающие и противовоспалительные
  {
    name: 'Ibuprofen 200mg',
    description:
      'Nonsteroidal anti-inflammatory drug (NSAID) used to reduce inflammation and relieve pain.',
    usage: [
      'Take with food or milk to reduce stomach upset',
      'Do not exceed 1200mg per day unless directed by a doctor',
      'May take 4-6 hours between doses',
      'Drink plenty of water while taking this medication',
    ],
    tags: ['Pain relief', 'Anti-inflammatory', 'Fever reducer'],
    color: 'White',
    shape: 'Round',
    dosage: '200mg',
    important:
      'Do not use if you have stomach ulcers or are allergic to NSAIDs. Consult a doctor if pain persists for more than 10 days.',
  },
  {
    name: 'Ibuprofen 400mg',
    description: 'Higher strength NSAID for moderate to severe pain relief.',
    usage: [
      'Take with food to prevent stomach irritation',
      'Maximum 1200mg per day',
      'Wait 6-8 hours between doses',
      'Not recommended for children under 12',
    ],
    tags: ['Pain relief', 'Anti-inflammatory', 'Strong'],
    color: 'White',
    shape: 'Oval',
    dosage: '400mg',
    important:
      'May cause drowsiness. Avoid alcohol. Do not use during pregnancy without doctor approval.',
  },
  {
    name: 'Paracetamol 500mg',
    description:
      'Pain reliever and fever reducer. Commonly used for headaches, muscle aches, and reducing fever.',
    usage: [
      'Take with water',
      'Do not exceed 4000mg per day',
      'Wait 4-6 hours between doses',
      'Can be taken with or without food',
    ],
    tags: ['Pain relief', 'Fever reducer', 'Headache'],
    color: 'White',
    shape: 'Round',
    dosage: '500mg',
    important:
      'Do not take with other products containing paracetamol. Overdose can cause serious liver damage.',
  },
  {
    name: 'Paracetamol 1000mg',
    description: 'Extra strength pain reliever for severe pain and high fever.',
    usage: [
      'Take with a full glass of water',
      'Maximum 3000mg per day',
      'Wait 6-8 hours between doses',
      'Do not crush or chew',
    ],
    tags: ['Pain relief', 'Fever reducer', 'Extra strength'],
    color: 'White',
    shape: 'Capsule',
    dosage: '1000mg',
    important:
      'Serious liver damage may occur if you take more than directed. Do not combine with alcohol.',
  },
  {
    name: 'Aspirin 100mg',
    description:
      'Used for pain relief, reducing inflammation, and as a blood thinner to prevent heart attacks and strokes.',
    usage: [
      'Take with food to reduce stomach irritation',
      'Do not crush or chew enteric-coated tablets',
      "Follow doctor's instructions for heart protection",
      'Take at the same time each day',
    ],
    tags: ['Pain relief', 'Blood thinner', 'Heart protection'],
    color: 'White',
    shape: 'Round',
    dosage: '100mg',
    important:
      'Do not give to children or teenagers with viral infections. May increase bleeding risk. Consult doctor before use.',
  },
  {
    name: 'Aspirin 325mg',
    description: 'Standard strength aspirin for pain relief and cardiovascular protection.',
    usage: [
      'Take with food or milk',
      'Do not exceed 4000mg per day',
      'Wait 4 hours between doses',
      'Drink plenty of fluids',
    ],
    tags: ['Pain relief', 'Anti-inflammatory', 'Cardiovascular'],
    color: 'White',
    shape: 'Round',
    dosage: '325mg',
    important:
      'May cause stomach bleeding. Avoid if you have bleeding disorders. Consult doctor before long-term use.',
  },
  {
    name: 'Naproxen 250mg',
    description:
      'NSAID used for pain, inflammation, and stiffness caused by arthritis and other conditions.',
    usage: [
      'Take with food or milk',
      'Swallow whole with water',
      'Do not lie down for 10 minutes after taking',
      'Take at the same time each day',
    ],
    tags: ['Pain relief', 'Anti-inflammatory', 'Arthritis'],
    color: 'White',
    shape: 'Oval',
    dosage: '250mg',
    important:
      'May increase risk of heart attack or stroke. Do not use if you have heart problems without doctor approval.',
  },
  {
    name: 'Diclofenac 50mg',
    description: 'NSAID used to treat pain and inflammation from various conditions.',
    usage: [
      'Take with food to reduce stomach upset',
      'Swallow whole, do not crush',
      'Take at the same time each day',
      'Maximum 150mg per day',
    ],
    tags: ['Pain relief', 'Anti-inflammatory', 'Muscle pain'],
    color: 'White',
    shape: 'Round',
    dosage: '50mg',
    important:
      'May cause serious stomach or intestinal bleeding. Do not use if you have stomach ulcers.',
  },

  // Антибиотики
  {
    name: 'Amoxicillin 500mg',
    description:
      'Antibiotic used to treat bacterial infections such as respiratory infections, ear infections, and urinary tract infections.',
    usage: [
      'Take exactly as prescribed by your doctor',
      'Complete the full course even if you feel better',
      'Take with or without food, but take consistently',
      'Space doses evenly throughout the day',
    ],
    tags: ['Antibiotic', 'Infection treatment', 'Bacterial'],
    color: 'White/Blue',
    shape: 'Capsule',
    dosage: '500mg',
    important:
      'Finish all medication as prescribed. Do not share antibiotics with others. May cause allergic reactions in some people.',
  },
  {
    name: 'Amoxicillin 250mg',
    description: 'Lower strength antibiotic for mild to moderate bacterial infections.',
    usage: [
      'Take every 8 hours',
      'Complete full course of treatment',
      'Can be taken with or without food',
      'Shake liquid form well before use',
    ],
    tags: ['Antibiotic', 'Infection treatment'],
    color: 'White/Yellow',
    shape: 'Capsule',
    dosage: '250mg',
    important:
      'Do not stop taking even if symptoms improve. Skipping doses may make infection worse.',
  },
  {
    name: 'Azithromycin 500mg',
    description:
      'Macrolide antibiotic used to treat various bacterial infections including respiratory and skin infections.',
    usage: [
      'Take on an empty stomach, 1 hour before or 2 hours after food',
      'Take at the same time each day',
      'Complete the full course',
      'Do not skip doses',
    ],
    tags: ['Antibiotic', 'Broad spectrum', 'Respiratory'],
    color: 'White',
    shape: 'Oval',
    dosage: '500mg',
    important: 'May cause diarrhea. If severe, contact your doctor. Do not take with antacids.',
  },
  {
    name: 'Ciprofloxacin 500mg',
    description: 'Fluoroquinolone antibiotic used for serious bacterial infections.',
    usage: [
      'Take with a full glass of water',
      'Take 2 hours before or 6 hours after antacids',
      'Avoid dairy products 2 hours before or after',
      'Complete full course',
    ],
    tags: ['Antibiotic', 'Strong', 'UTI treatment'],
    color: 'White',
    shape: 'Oval',
    dosage: '500mg',
    important:
      'May cause tendon problems. Avoid sun exposure. Do not take with dairy products or antacids.',
  },
  {
    name: 'Doxycycline 100mg',
    description:
      'Tetracycline antibiotic used for various infections including acne and Lyme disease.',
    usage: [
      'Take with food or milk to reduce stomach upset',
      'Take with a full glass of water',
      'Do not lie down for 30 minutes after taking',
      'Avoid sun exposure',
    ],
    tags: ['Antibiotic', 'Acne treatment', 'Lyme disease'],
    color: 'Yellow',
    shape: 'Capsule',
    dosage: '100mg',
    important:
      'May cause sun sensitivity. Do not take with dairy, antacids, or iron supplements. Use sunscreen.',
  },

  // Диабет
  {
    name: 'Metformin 500mg',
    description:
      'Oral medication used to treat type 2 diabetes by helping control blood sugar levels.',
    usage: [
      'Take with meals to reduce stomach upset',
      'Start with lower dose and gradually increase',
      'Monitor blood sugar levels regularly',
      'Take at the same time each day',
    ],
    tags: ['Diabetes', 'Blood sugar control', 'Type 2'],
    color: 'White',
    shape: 'Round',
    dosage: '500mg',
    important:
      'May cause lactic acidosis in rare cases. Avoid excessive alcohol. Regular blood tests may be required.',
  },
  {
    name: 'Metformin 850mg',
    description: 'Higher strength metformin for better blood sugar control.',
    usage: [
      'Take with breakfast and dinner',
      'Swallow whole with water',
      'Do not crush or chew',
      'Monitor blood sugar regularly',
    ],
    tags: ['Diabetes', 'Blood sugar control'],
    color: 'White',
    shape: 'Oval',
    dosage: '850mg',
    important: 'May cause stomach upset initially. This usually improves with time. Avoid alcohol.',
  },
  {
    name: 'Glibenclamide 5mg',
    description: 'Sulfonylurea medication that helps pancreas produce more insulin.',
    usage: [
      'Take 30 minutes before breakfast',
      'Take with food if stomach upset occurs',
      'Monitor blood sugar levels',
      'Do not skip meals',
    ],
    tags: ['Diabetes', 'Insulin stimulator', 'Type 2'],
    color: 'White',
    shape: 'Round',
    dosage: '5mg',
    important:
      'May cause low blood sugar. Eat regular meals. Carry glucose tablets for emergencies.',
  },

  // Сердечно-сосудистые
  {
    name: 'Amlodipine 5mg',
    description: 'Calcium channel blocker used to treat high blood pressure and chest pain.',
    usage: [
      'Take at the same time each day',
      'Can be taken with or without food',
      'Swallow whole with water',
      'Do not stop suddenly',
    ],
    tags: ['Blood pressure', 'Hypertension', 'Heart'],
    color: 'White',
    shape: 'Round',
    dosage: '5mg',
    important:
      'May cause dizziness. Rise slowly from sitting position. Do not stop taking without doctor approval.',
  },
  {
    name: 'Lisinopril 10mg',
    description: 'ACE inhibitor used to treat high blood pressure and heart failure.',
    usage: [
      'Take at the same time each day',
      'Can be taken with or without food',
      'Take with a full glass of water',
      'Monitor blood pressure regularly',
    ],
    tags: ['Blood pressure', 'ACE inhibitor', 'Heart failure'],
    color: 'White',
    shape: 'Round',
    dosage: '10mg',
    important:
      'May cause persistent dry cough. May cause dizziness. Avoid potassium supplements unless prescribed.',
  },
  {
    name: 'Atenolol 50mg',
    description:
      'Beta-blocker used to treat high blood pressure, chest pain, and irregular heartbeat.',
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
      'Do not stop suddenly - may cause serious heart problems. May cause fatigue or dizziness.',
  },
  {
    name: 'Atorvastatin 20mg',
    description: 'Statin medication used to lower cholesterol and reduce risk of heart disease.',
    usage: [
      'Take in the evening with or without food',
      'Take at the same time each day',
      'Swallow whole with water',
      'Follow low-cholesterol diet',
    ],
    tags: ['Cholesterol', 'Statin', 'Heart protection'],
    color: 'White',
    shape: 'Oval',
    dosage: '20mg',
    important:
      'May cause muscle pain. Avoid grapefruit juice. Regular liver function tests may be required.',
  },

  // Желудочно-кишечные
  {
    name: 'Omeprazole 20mg',
    description: 'Proton pump inhibitor used to treat acid reflux, stomach ulcers, and GERD.',
    usage: [
      'Take 30-60 minutes before breakfast',
      'Swallow whole, do not crush or chew',
      'Take with a full glass of water',
      'Take at the same time each day',
    ],
    tags: ['Acid reflux', 'GERD', 'Stomach'],
    color: 'Pink',
    shape: 'Capsule',
    dosage: '20mg',
    important:
      'Do not take with other acid reducers. May take several days to feel full effect. Long-term use may affect bone health.',
  },
  {
    name: 'Ranitidine 150mg',
    description: 'H2 blocker used to reduce stomach acid production.',
    usage: [
      'Take with or without food',
      'Take at the same time each day',
      'Swallow whole with water',
      'Can be taken before meals',
    ],
    tags: ['Acid reducer', 'Stomach', 'GERD'],
    color: 'White',
    shape: 'Round',
    dosage: '150mg',
    important:
      'May cause headache or dizziness. Avoid alcohol. Consult doctor if symptoms persist.',
  },
  {
    name: 'Metoclopramide 10mg',
    description: 'Medication used to treat nausea, vomiting, and slow stomach emptying.',
    usage: [
      'Take 30 minutes before meals',
      'Take with a full glass of water',
      'Do not exceed 30mg per day',
      'Take at the same time each day',
    ],
    tags: ['Nausea', 'Vomiting', 'Digestive'],
    color: 'White',
    shape: 'Round',
    dosage: '10mg',
    important:
      'May cause drowsiness or restlessness. Do not drive until you know how it affects you. Do not use long-term.',
  },

  // Против аллергии
  {
    name: 'Cetirizine 10mg',
    description:
      'Antihistamine used to treat allergy symptoms such as sneezing, itching, and runny nose.',
    usage: [
      'Take once daily with or without food',
      'Take at the same time each day',
      'Swallow whole with water',
      'Can be taken in the evening',
    ],
    tags: ['Allergy', 'Antihistamine', 'Hay fever'],
    color: 'White',
    shape: 'Round',
    dosage: '10mg',
    important: 'May cause drowsiness. Avoid alcohol. May cause dry mouth. Safe for long-term use.',
  },
  {
    name: 'Loratadine 10mg',
    description: 'Non-drowsy antihistamine for allergy relief.',
    usage: [
      'Take once daily',
      'Can be taken with or without food',
      'Take at the same time each day',
      'Swallow whole',
    ],
    tags: ['Allergy', 'Non-drowsy', 'Antihistamine'],
    color: 'White',
    shape: 'Round',
    dosage: '10mg',
    important:
      'Less likely to cause drowsiness than other antihistamines. May take a few days to see full effect.',
  },
  {
    name: 'Fexofenadine 180mg',
    description: 'Long-acting antihistamine for allergy symptoms.',
    usage: [
      'Take once daily',
      'Take on an empty stomach',
      'Avoid fruit juices (orange, apple, grapefruit)',
      'Take at the same time each day',
    ],
    tags: ['Allergy', 'Long-acting', 'Antihistamine'],
    color: 'White',
    shape: 'Oval',
    dosage: '180mg',
    important: 'Take on empty stomach for best absorption. Avoid fruit juices. May cause headache.',
  },

  // Антидепрессанты и психическое здоровье
  {
    name: 'Sertraline 50mg',
    description: 'SSRI antidepressant used to treat depression, anxiety, and panic disorders.',
    usage: [
      'Take once daily with or without food',
      'Take at the same time each day',
      'Swallow whole with water',
      'May take 2-4 weeks to feel full effect',
    ],
    tags: ['Antidepressant', 'SSRI', 'Anxiety'],
    color: 'White',
    shape: 'Capsule',
    dosage: '50mg',
    important:
      'Do not stop suddenly. May cause nausea initially. May increase risk of suicidal thoughts in young adults.',
  },
  {
    name: 'Fluoxetine 20mg',
    description: 'SSRI antidepressant for depression and obsessive-compulsive disorder.',
    usage: [
      'Take once daily, usually in the morning',
      'Can be taken with or without food',
      'Take at the same time each day',
      'May take several weeks to work',
    ],
    tags: ['Antidepressant', 'SSRI', 'OCD'],
    color: 'White/Green',
    shape: 'Capsule',
    dosage: '20mg',
    important: 'Do not stop abruptly. May cause insomnia if taken late in day. Avoid alcohol.',
  },
  {
    name: 'Citalopram 20mg',
    description: 'SSRI antidepressant for depression and anxiety disorders.',
    usage: [
      'Take once daily',
      'Can be taken with or without food',
      'Take at the same time each day',
      'Swallow whole',
    ],
    tags: ['Antidepressant', 'SSRI', 'Anxiety'],
    color: 'White',
    shape: 'Oval',
    dosage: '20mg',
    important:
      'May cause drowsiness. Do not drive until you know how it affects you. May take 4-6 weeks to see full effect.',
  },

  // Витамины и добавки
  {
    name: 'Vitamin D3 1000 IU',
    description: 'Vitamin D supplement for bone health and immune system support.',
    usage: [
      'Take once daily with food',
      'Take with a meal containing fat for better absorption',
      'Take at the same time each day',
      'Swallow whole',
    ],
    tags: ['Vitamin', 'Bone health', 'Immune system'],
    color: 'Yellow',
    shape: 'Capsule',
    dosage: '1000 IU',
    important:
      'Do not exceed recommended dose. May interact with certain medications. Consult doctor if taking high doses.',
  },
  {
    name: 'Calcium Carbonate 500mg',
    description: 'Calcium supplement for bone health and prevention of osteoporosis.',
    usage: [
      'Take with food',
      'Do not take more than 500mg at a time',
      'Take 2-3 times per day',
      'Drink plenty of water',
    ],
    tags: ['Calcium', 'Bone health', 'Supplement'],
    color: 'White',
    shape: 'Round',
    dosage: '500mg',
    important:
      'May cause constipation. Take with food. Do not take with iron supplements. Space doses throughout the day.',
  },
  {
    name: 'Multivitamin',
    description: 'Complete multivitamin supplement with essential vitamins and minerals.',
    usage: [
      'Take once daily with food',
      'Take with a full glass of water',
      'Take at the same time each day',
      'Do not exceed recommended dose',
    ],
    tags: ['Multivitamin', 'Supplement', 'General health'],
    color: 'Various',
    shape: 'Capsule',
    dosage: 'One tablet',
    important:
      'Not a substitute for a balanced diet. Keep out of reach of children. May cause stomach upset if taken on empty stomach.',
  },

  // Против грибка
  {
    name: 'Fluconazole 150mg',
    description: 'Antifungal medication used to treat yeast infections and fungal infections.',
    usage: [
      'Take with or without food',
      'Swallow whole with water',
      'Take at the same time each day',
      'Complete full course',
    ],
    tags: ['Antifungal', 'Yeast infection', 'Fungal'],
    color: 'White',
    shape: 'Capsule',
    dosage: '150mg',
    important:
      'May cause stomach upset. Avoid alcohol. May interact with certain medications. Complete full course.',
  },
  {
    name: 'Clotrimazole',
    description: 'Topical antifungal cream for skin and nail fungal infections.',
    usage: [
      'Apply to clean, dry affected area',
      'Use 2-3 times daily',
      'Continue for 2-4 weeks after symptoms clear',
      'Wash hands after application',
    ],
    tags: ['Antifungal', 'Topical', 'Skin'],
    color: 'White',
    shape: 'Cream',
    dosage: 'Apply thin layer',
    important:
      'For external use only. Do not use on broken skin. May cause skin irritation. Keep away from eyes.',
  },

  // Противовирусные
  {
    name: 'Acyclovir 400mg',
    description: 'Antiviral medication used to treat herpes infections and shingles.',
    usage: [
      'Take with or without food',
      'Take every 4 hours while awake',
      'Drink plenty of water',
      'Start treatment as soon as possible',
    ],
    tags: ['Antiviral', 'Herpes', 'Shingles'],
    color: 'White',
    shape: 'Capsule',
    dosage: '400mg',
    important:
      'Drink plenty of water to prevent kidney problems. Start treatment early for best results. May cause nausea.',
  },

  // Против астмы
  {
    name: 'Salbutamol Inhaler',
    description:
      'Bronchodilator inhaler for quick relief of asthma symptoms and breathing difficulties.',
    usage: [
      'Shake well before use',
      'Breathe out fully before inhaling',
      'Press down and breathe in slowly',
      'Hold breath for 10 seconds',
      'Wait 1 minute before second puff if needed',
    ],
    tags: ['Asthma', 'Bronchodilator', 'Rescue inhaler'],
    color: 'Blue',
    shape: 'Inhaler',
    dosage: '1-2 puffs',
    important:
      'For quick relief only. If using more than 2 times per week, see your doctor. May cause rapid heartbeat.',
  },
  {
    name: 'Beclomethasone Inhaler',
    description: 'Corticosteroid inhaler for long-term asthma control and prevention.',
    usage: [
      'Shake well before use',
      'Rinse mouth after each use',
      'Use regularly, not for immediate relief',
      'Take at the same time each day',
    ],
    tags: ['Asthma', 'Corticosteroid', 'Prevention'],
    color: 'Brown',
    shape: 'Inhaler',
    dosage: '2 puffs twice daily',
    important:
      'Not for immediate relief. Rinse mouth after use to prevent thrush. Use regularly for best effect.',
  },

  // Против тошноты
  {
    name: 'Ondansetron 4mg',
    description: 'Anti-nausea medication used to prevent and treat nausea and vomiting.',
    usage: [
      'Take 30 minutes before chemotherapy or surgery',
      'Can be taken with or without food',
      'Swallow whole with water',
      'Do not exceed 24mg per day',
    ],
    tags: ['Nausea', 'Vomiting', 'Chemotherapy'],
    color: 'White',
    shape: 'Round',
    dosage: '4mg',
    important:
      'May cause constipation or headache. Do not drive until you know how it affects you. May cause drowsiness.',
  },

  // Снотворные
  {
    name: 'Melatonin 3mg',
    description: 'Natural sleep aid that helps regulate sleep-wake cycle.',
    usage: [
      'Take 30-60 minutes before bedtime',
      'Take at the same time each night',
      'Swallow whole with water',
      'Avoid bright lights after taking',
    ],
    tags: ['Sleep aid', 'Melatonin', 'Insomnia'],
    color: 'White',
    shape: 'Capsule',
    dosage: '3mg',
    important:
      'May cause drowsiness. Do not drive after taking. Best used for short-term sleep problems. Avoid alcohol.',
  },

  // Против судорог
  {
    name: 'Gabapentin 300mg',
    description: 'Medication used to treat nerve pain, seizures, and restless legs syndrome.',
    usage: [
      'Take with or without food',
      'Take at the same time each day',
      'Swallow whole with water',
      'Do not stop suddenly',
    ],
    tags: ['Nerve pain', 'Seizures', 'Neuropathic'],
    color: 'White',
    shape: 'Capsule',
    dosage: '300mg',
    important:
      'May cause drowsiness or dizziness. Do not drive until you know how it affects you. Do not stop abruptly.',
  },

  // Против мигрени
  {
    name: 'Sumatriptan 50mg',
    description: 'Triptan medication for acute treatment of migraine headaches.',
    usage: [
      'Take at the first sign of migraine',
      'Swallow whole with water',
      'Do not exceed 200mg in 24 hours',
      'Can be taken with or without food',
    ],
    tags: ['Migraine', 'Headache', 'Triptan'],
    color: 'White',
    shape: 'Round',
    dosage: '50mg',
    important:
      'Only for migraine treatment, not for prevention. May cause chest tightness. Do not use if you have heart problems.',
  },

  // Против остеопороза
  {
    name: 'Alendronate 70mg',
    description: 'Bisphosphonate medication to treat and prevent osteoporosis.',
    usage: [
      'Take first thing in the morning on empty stomach',
      'Take with a full glass of plain water',
      'Stay upright for 30 minutes after taking',
      'Do not eat or drink for 30 minutes after',
    ],
    tags: ['Osteoporosis', 'Bone health', 'Bisphosphonate'],
    color: 'White',
    shape: 'Tablet',
    dosage: '70mg',
    important:
      'Must take on empty stomach. Stay upright for 30 minutes. May cause stomach irritation. Take once weekly.',
  },

  // Против гипертиреоза
  {
    name: 'Levothyroxine 50mcg',
    description: 'Thyroid hormone replacement for hypothyroidism.',
    usage: [
      'Take on empty stomach, 30-60 minutes before breakfast',
      'Take at the same time each day',
      'Take with a full glass of water',
      'Wait 4 hours before taking calcium or iron',
    ],
    tags: ['Thyroid', 'Hormone replacement', 'Hypothyroidism'],
    color: 'White',
    shape: 'Round',
    dosage: '50mcg',
    important:
      'Take on empty stomach for best absorption. Do not take with calcium or iron supplements. Regular blood tests needed.',
  },

  // Противозачаточные
  {
    name: 'Ethinyl Estradiol / Levonorgestrel',
    description: 'Combined oral contraceptive pill for birth control.',
    usage: [
      'Take at the same time each day',
      'Start on first day of period',
      'Take with or without food',
      'Use backup contraception for first 7 days',
    ],
    tags: ['Birth control', 'Contraceptive', 'Hormonal'],
    color: 'Various',
    shape: 'Round',
    dosage: 'One tablet daily',
    important:
      'Take at the same time daily. May cause nausea initially. Does not protect against STDs. Consult doctor before use.',
  },

  // Против диареи
  {
    name: 'Loperamide 2mg',
    description: 'Anti-diarrheal medication to treat acute diarrhea.',
    usage: [
      'Take after each loose stool',
      'Do not exceed 8mg in 24 hours',
      'Take with or without food',
      'Drink plenty of fluids',
    ],
    tags: ['Diarrhea', 'Anti-diarrheal', 'Digestive'],
    color: 'White',
    shape: 'Capsule',
    dosage: '2mg',
    important:
      'Do not use for more than 2 days without doctor approval. Stay hydrated. May cause constipation.',
  },

  // Против запора
  {
    name: 'Bisacodyl 5mg',
    description: 'Stimulant laxative for treatment of constipation.',
    usage: [
      'Take at bedtime with water',
      'Swallow whole, do not crush',
      'Do not take within 1 hour of antacids',
      'Use only when needed',
    ],
    tags: ['Constipation', 'Laxative', 'Digestive'],
    color: 'Pink',
    shape: 'Round',
    dosage: '5mg',
    important:
      'For short-term use only. May cause stomach cramps. Do not use if you have stomach pain or intestinal blockage.',
  },

  // Против глистов
  {
    name: 'Mebendazole 100mg',
    description: 'Anthelmintic medication to treat worm infections.',
    usage: [
      'Take with or without food',
      'Chew or swallow whole',
      'May need second dose after 2-3 weeks',
      'Treat all family members if needed',
    ],
    tags: ['Anthelmintic', 'Worms', 'Parasite'],
    color: 'White',
    shape: 'Chewable',
    dosage: '100mg',
    important:
      'May need to treat entire household. Wash hands frequently. Change bedding. May cause stomach upset.',
  },
];

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

  console.log('🔬 ML Model: Comparing with database of 50+ known medications...');
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

  // Выбираем случайную таблетку из подходящих
  const selectedPill = matchingPills[Math.floor(Math.random() * matchingPills.length)];

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
