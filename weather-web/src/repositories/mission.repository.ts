import { apiClient } from "@/lib/api/client";
import type { Mission } from "@/types/mission";

export const missionRepository = {
  // ミッション一覧取得
  getMissions: async () => {
    const response = await apiClient.get<{ missions: Mission[] }>(
      "/api/v1/missions"
    );
    return response.missions;
  },

  // ミッション報酬受け取り
  claimMission: (missionId: number) =>
    apiClient.post<void>(`/api/v1/missions/${missionId}/claim`),
};
