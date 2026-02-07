import { apiClient } from "@/lib/api/client";
import type { Dango } from "@/types/dango";
import type { ApiResponse } from "@/types/api";

export const dangoRepository = {
  // 団子一覧取得
  getDangos: () => apiClient.get<Dango[]>('/api/v1/dangos/me'),

  // mybest団子
  getBestDango: () => apiClient.get<Dango>(
    '/api/v1/dangos/me/best'
  ),

  // 団子追加
  // API書き直すかも

  // now団子
  // api書き直す
  getNowDango: () => apiClient.get<Dango>(
    '/api/v1/dangos/me/now'
  ),

  // 団子スキン変更
  changeDangoSkin: (head_skin_id: number | null, body_skin_id: number | null, base_skin_id: number | null) => apiClient.patch<ApiResponse>(
    '/api/v1/dangos/me/skins',
    {
      head_skin_id,
      body_skin_id,
      base_skin_id,
    }
  ),
}