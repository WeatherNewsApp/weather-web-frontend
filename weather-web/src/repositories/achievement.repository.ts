import { apiClient } from "@/lib/api/client";
import type { Achievement } from "@/types/achievement";

export const achievementRepository = {
  // アチーブメント一覧取得
  getAchievements: async () => {
    const res = await apiClient.get<{ achievements: Achievement[]}>('/api/v1/achievements');
    return res.achievements;
  },

  // アチーブメント報酬受け取り
  claimAchievement: (achievementId: number) => apiClient.post<void>(
    `/api/v1/achievements/${achievementId}/claim`
  ),
}