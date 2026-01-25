// 将来的にレスポンスの統一形式として使用予定
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  messages: string[];
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;