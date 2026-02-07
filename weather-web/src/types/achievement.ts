export interface Achievement {
  id: number;
  type: "consecutive" | "care" | "prediction";
  title: string;
  requiredCount: number;
  point: number;
  skin: {
    id: number;
    name: string;
    image: string;
  } | null;
  progress: number;
  isCompleted: boolean;
  isClaimed: boolean;
}