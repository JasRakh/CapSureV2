export interface Pill {
  id: string;
  name: string;
  description: string;
  usage: string[];
  tags: string[];
  color?: string;
  shape?: string;
  dosage?: string;
  confidence: number;
  scannedAt: Date;
  important?: string;
}

export interface ScanResult {
  pill: Pill;
  imageUri?: string;
}
