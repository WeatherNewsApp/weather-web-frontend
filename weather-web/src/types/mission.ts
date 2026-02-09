export interface Mission {
  id: number;
  title: string;
  type: "login" | "care";
  requiredCount: number;
  point: number;
  progress: number;
  isCompleted: boolean;
  isClaimed: boolean;
}
