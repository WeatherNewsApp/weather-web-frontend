export interface Dango {
  id: number;
  headSkin: string;
  bodySkin: string;
  baseSkin: string;
  damageLevel: "1" | "2" | "3" | "4" | "5";
  growthStage: "1" | "2" | "3" | "4" | "5";
  totalDaysAlive: number;
  caredAt: string;
  diedAt: string | null;
  successCareCount: number;
  point: number;
  maxConsecutive: number;
  createdAt: string;
}
