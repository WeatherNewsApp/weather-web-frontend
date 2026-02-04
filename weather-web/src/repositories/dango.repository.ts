import { apiClient } from "@/lib/api/client";
import type { Dango, BestDango } from "@/types/dango";

export const dangoRepository = {
  // 団子一覧取得
  getDangos: () => apiClient.get<Dango[]>('/api/v1/dangos'),

  // mybest団子
  getBestDango: () => apiClient.get<BestDango>(
    '/api/v1/dangos/me/best'
  ),

  // 団子追加
  // API書き直すかも

  // now団子
  // api書き直す
  getNowDango: () => apiClient.get<BestDango>(
    '/api/v1/dangos/me/now'
  ),
}