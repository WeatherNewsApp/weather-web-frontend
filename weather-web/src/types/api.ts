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

export interface User {
  id: number;
  email: string;
  name: string;
  point: number;
  prefecture: Pick<Prefecture, "id" | "name"> | null;
  icon: string | null;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
