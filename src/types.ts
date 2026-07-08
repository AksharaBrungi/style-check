export interface ClothingItem {
  category: string;
  color: string;
  style: string;
  confidence: number;
}

export interface AnalysisReport {
  id: string;
  imageUrl: string;
  createdAt: string;
  styleScore: number;
  confidence: number;
  occasion: string;
  styleCategory: string;
  clothingItems: ClothingItem[];
  dominantColors: string[];
  strengths: string[];
  weaknesses: string[];
  accessories: string[];
  footwear: string[];
  recommendations: string[];
  summary: string;
}
