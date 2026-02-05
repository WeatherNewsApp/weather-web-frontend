import { apiClient } from "@/lib/api/client";
import type { User, UpdateBestDangoRequest } from "@/types/user";
import type { ApiResponse } from "@/types/api";

export const userRepository = {
  // ユーザー情報を取得
  getMe: () => apiClient.get<User>('/api/v1/users/me'),

  // 自身のベスト団子を更新
  updateBestDango: (data: UpdateBestDangoRequest) => apiClient.patch<Pick<ApiResponse, "success">>(
    '/api/v1/users/me/best-dango',
    data
  ),

  // 自身のユーザー情報を更新
  updateUser: (data: Pick<User, "email" | "name">) => apiClient.patch<Pick<ApiResponse, "success">>(
    '/api/v1/users/me/information',
    data
  ),

  // 自身の所在地変更
  updateArea: (data: Pick<User, "area">) => apiClient.patch<Pick<ApiResponse, "success">>(
    '/api/v1/users/me/area',
    data
  )
}