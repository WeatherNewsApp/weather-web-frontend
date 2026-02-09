import { apiClient } from "@/lib/api/client";
import type { UnConfirmResponse, CareType, CurrentCareResponse } from "@/types/care";
import type { ApiResponse} from "@/types/api";

export const careRepository = {

  // 現在のケア取得
  getCurrentCare: async () => {
    const res = await apiClient.get<CurrentCareResponse | null>('/api/v1/cares/current');
    return res;
  },

  // 未確認のリザルト取得
  getUnConfirmCare: async () => {
    const res = await apiClient.get<UnConfirmResponse[]>('/api/v1/cares/unconfirmed');
    return res
  },

  // ケア実行
  executeCare: async (weatherPrediction: CareType) => {
    await apiClient.post<ApiResponse>('/api/v1/cares', {
      weatherPrediction,
    });
  },

  // ケア確認
  confirmCare: async (careId: number,) => {
    await apiClient.post<ApiResponse>(`/api/v1/cares/${careId}/confirm`);
  }
}