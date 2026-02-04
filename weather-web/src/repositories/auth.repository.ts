import { apiClient } from "@/lib/api/client";
import type { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from "@/types/auth";
import type { ApiResponse } from "@/types/api";

export const authRepository = {
  // 新規登録
  register: (data: RegisterRequest) => apiClient.post<RegisterResponse>(
    '/api/v1/auth/register',
    data
  ),
  // ログイン
  login: (data: LoginRequest) => apiClient.post<LoginResponse>(
    '/api/v1/auth/login',
    data
  ),
  // ログアウト
  logout: ()  => apiClient.post<ApiResponse>('/api/v1/auth/logout'),

  //アカウント削除
  deleteAccount: () => apiClient.delete<ApiResponse>('/api/v1/auth/delete'),
}