import { post } from "./client";
import { ApiErrorResponse } from "@/types/api";

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface SignupSuccessResponse {
  success: true;
  token: string;
}

export type SignupResponse = SignupSuccessResponse | ApiErrorResponse;

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  return post("/api/v1/auth/register", data);
}
