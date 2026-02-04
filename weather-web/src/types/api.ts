// 将来的にレスポンスの統一形式として使用予定
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  messages: string[];
}

export interface Prefecture {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

export interface Area {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  point: number;
  prefecture: Pick<Prefecture, "id" | "name"> | null;
  icon: string | null;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Mission types
export type MissionType = "dummy1" | "dummy2" | "dummy3";

export type MissionRewardType = { type: "points"; points: number };

export interface Mission {
  id: number;
  title: string;
  type: MissionType;
  reward: MissionRewardType;
  progress: number;
  requiredCount: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

export interface MissionsResponse {
  missions: Mission[];
}

export interface ClaimMissionSuccessResponse {
  success: true;
  pointEarned: number;
  totalPoint: number;
}

export type ClaimMissionResponse =
  | ClaimMissionSuccessResponse
  | ApiErrorResponse;

// Achievement types
export type AchievementType = "dummy1" | "dummy2" | "dummy3";

export type AchievementRewardType =
  | { type: "points"; points: number }
  | {
      type: "pointsAndSkin";
      points: number;
      skinId: string;
      skinName: string;
      skinImage: string;
    };

export interface Achievement {
  id: number;
  title: string;
  type: AchievementType;
  reward: AchievementRewardType;
  isClaimed: boolean;
  isCompleted: boolean;
  progress: number;
  requiredCount: number;
}

export interface AchievementsResponse {
  achievements: Achievement[];
}

export interface ClaimAchievementSuccessResponse {
  success: true;
  pointEarned: number;
  totalPoint: number;
}

export type ClaimAchievementResponse =
  | ClaimAchievementSuccessResponse
  | ApiErrorResponse;

// Ranking typs
export interface RankingData {
  rank: number;
  name: string;
  days: number;
}


// History types
export interface HistoryDangoResponse {
  id: number,
  headSkin: string,
  bodySkin: string,
  baseSkin: string,
  damageLevel: "1" | "2" | "3" | "4" | "5",
  growthLevel: "1" | "2" | "3" | "4" | "5",
  totalDaysAlive: number,
  caredAt: string,
  diedAt: string | null,
  successCareCount: number,
  point: number,
  maxConsecutive: number,
}