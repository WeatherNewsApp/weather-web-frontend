import { get, patch } from "./client";
import { User } from "@/types/api";
import { ApiErrorResponse } from "@/types/api";

export type UserResponse = User;

export interface UpdatePrefectureRequest {
  prefecture_id: number;
}

export interface UpdatePrefectureSuccessResponse {
  success: true;
  prefecture: {
    id: number;
    name: string;
  };
}

type UpdatePrefectureResponse =
  | ApiErrorResponse
  | UpdatePrefectureSuccessResponse;

export async function getUser(): Promise<UserResponse> {
  return await get<UserResponse>("/api/v1/users/me");
}

export async function updatePrefecture(
  data: UpdatePrefectureRequest
): Promise<UpdatePrefectureResponse> {
  return await patch<UpdatePrefectureResponse>(
    "/api/v1/users/me/prefectures",
    data
  );
}
