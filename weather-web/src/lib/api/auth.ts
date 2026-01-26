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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  success: true;
  token: string;
}

export type LoginResponse = LoginSuccessResponse | ApiErrorResponse;

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  return post("/api/v1/auth/register", data);
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return post("/api/v1/auth/login", data);
}
