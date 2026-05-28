// src/types.ts

export type CargoCategory = 'infusion' | 'calculator' | 'score' | 'reference';

export interface DrugConfig {
  id: string;
  name: string;
  chemicalName?: string;
  category: 'vasoactive' | 'sedative' | 'inotope' | 'antihypertensive' | 'other' | 'neuroblocker';
  ampoules: number;
  mgPerAmpoule: number; // e.g. 4 for Noradrenaline
  mlPerAmpoule: number; // e.g. 4 for Noradrenaline
  diluentVolume: number; // e.g. 234 for SG5%
  totalVolume: number; // ampoules * mlPerAmpoule + diluentVolume (e.g. 250)
  totalDrugMg: number; // ampoules * mgPerAmpoule (e.g. 16)
  concentrationMcgMl: number; // (totalDrugMg * 1000) / totalVolume
  defaultDoseUnit: 'mcg/kg/min' | 'mcg/kg/h' | 'mcg/min' | 'mg/h' | 'UI/h' | 'mg/kg/h' | 'U/min';
  minStandardDose: number;
  maxStandardDose: number;
  standardRecipies: Array<{
    name: string;
    ampoules: number;
    mgPerAmpoule: number;
    mlPerAmpoule: number;
    diluentVolume: number;
    totalVolume: number;
  }>;
  note: string;
  pharmacology: string;
}

export interface ScoreQuestion {
  id: string;
  text: string;
  points: number;
  value?: string | boolean;
}

export interface ScoreCategory {
  title: string;
  questions: ScoreQuestion[];
}

export interface ScoreConfig {
  id: string;
  name: string;
  description: string;
  categories: ScoreCategory[];
  interpretations: Array<{
    min: number;
    max: number;
    title: string;
    class: 'low' | 'medium' | 'high' | 'critical';
    action: string;
  }>;
  reference: string;
}

export interface ReferenceArticle {
  id: string;
  category: 'antibioticos' | 'ventilacao' | 'eletrolitos' | 'cardiaco' | 'pediatria';
  title: string;
  subtitle: string;
  lastUpdated: string;
  tags: string[];
  sections: Array<{
    title: string;
    content: string; // Markdown supported
    table?: {
      headers: string[];
      rows: string[][];
    };
  }>;
}

export interface CalculationHistoryItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  inputs: Record<string, string | number>;
  outputs: Record<string, string | number>;
}
