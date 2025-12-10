import { Pill } from '../types';

export const mockPills: Partial<Pill>[] = [
  {
    name: 'Ibuprofen 200mg',
    description: 'Nonsteroidal anti-inflammatory drug (NSAID) used to reduce inflammation and relieve pain.',
    usage: [
      'Take with food or milk to reduce stomach upset',
      'Do not exceed 1200mg per day unless directed by a doctor',
      'May take 4-6 hours between doses'
    ],
    tags: ['Pain relief', 'Anti-inflammatory', 'Fever reducer'],
    color: 'White',
    shape: 'Round',
    dosage: '200mg',
    important: 'Do not use if you have stomach ulcers or are allergic to NSAIDs. Consult a doctor if pain persists for more than 10 days.',
  },
  {
    name: 'Amoxicillin 500mg',
    description: 'Antibiotic used to treat bacterial infections such as respiratory infections, ear infections, and urinary tract infections.',
    usage: [
      'Take exactly as prescribed by your doctor',
      'Complete the full course even if you feel better',
      'Take with or without food, but take consistently'
    ],
    tags: ['Antibiotic', 'Infection treatment'],
    color: 'White/Blue',
    shape: 'Capsule',
    dosage: '500mg',
    important: 'Finish all medication as prescribed. Do not share antibiotics with others. May cause allergic reactions in some people.',
  },
  {
    name: 'Paracetamol 500mg',
    description: 'Pain reliever and fever reducer. Commonly used for headaches, muscle aches, and reducing fever.',
    usage: [
      'Take with water',
      'Do not exceed 4000mg per day',
      'Wait 4-6 hours between doses'
    ],
    tags: ['Pain relief', 'Fever reducer'],
    color: 'White',
    shape: 'Round',
    dosage: '500mg',
    important: 'Do not take with other products containing paracetamol. Overdose can cause serious liver damage.',
  },
  {
    name: 'Aspirin 100mg',
    description: 'Used for pain relief, reducing inflammation, and as a blood thinner to prevent heart attacks and strokes.',
    usage: [
      'Take with food to reduce stomach irritation',
      'Do not crush or chew enteric-coated tablets',
      'Follow doctor\'s instructions for heart protection'
    ],
    tags: ['Pain relief', 'Blood thinner', 'Heart protection'],
    color: 'White',
    shape: 'Round',
    dosage: '100mg',
    important: 'Do not give to children or teenagers with viral infections. May increase bleeding risk. Consult doctor before use.',
  },
  {
    name: 'Metformin 500mg',
    description: 'Oral medication used to treat type 2 diabetes by helping control blood sugar levels.',
    usage: [
      'Take with meals to reduce stomach upset',
      'Start with lower dose and gradually increase',
      'Monitor blood sugar levels regularly'
    ],
    tags: ['Diabetes', 'Blood sugar control'],
    color: 'White',
    shape: 'Round',
    dosage: '500mg',
    important: 'May cause lactic acidosis in rare cases. Avoid excessive alcohol. Regular blood tests may be required.',
  },
];

export const identifyPill = async (): Promise<Pill> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const randomPill = mockPills[Math.floor(Math.random() * mockPills.length)];
  const confidence = 85 + Math.floor(Math.random() * 15);
  
  return {
    id: `pill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: randomPill.name || 'Unknown Pill',
    description: randomPill.description || 'No description available',
    usage: randomPill.usage || [],
    tags: randomPill.tags || [],
    color: randomPill.color,
    shape: randomPill.shape,
    dosage: randomPill.dosage,
    confidence,
    scannedAt: new Date(),
    important: randomPill.important,
  };
};
