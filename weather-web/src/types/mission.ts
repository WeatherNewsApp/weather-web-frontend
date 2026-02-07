export interface Mission {
  id: number;
  title: string;
  type: "prediction" | "care";
  requiredCount: number;
  point: number;
  progress: number;
  isCompleted: boolean;
  isClaimed: boolean;
}