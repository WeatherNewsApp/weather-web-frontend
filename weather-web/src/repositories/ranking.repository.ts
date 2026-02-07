import { apiClient } from "@/lib/api/client";
import type { RankingResponse } from "@/types/ranking";

export const rankingRepository = {
  getLocalRankings: async (): Promise<RankingResponse> => {
    const res = await apiClient.get<RankingResponse>('/api/v1/rankings?scope=area');
    return res;
  },

  getGlobalRankings: async (): Promise<RankingResponse> => {
    const res = await apiClient.get<RankingResponse>('/api/v1/rankings?scope=global');
    return res;
  }
}