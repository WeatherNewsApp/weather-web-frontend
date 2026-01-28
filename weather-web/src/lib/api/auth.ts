import { post, del } from "./client";
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

export interface LogoutResponse {
  success: boolean;
  messages?: string[];
}

export interface DeleteAccountResponse {
  success: boolean;
  messages?: string[];
}

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  return post("/api/v1/auth/register", data);
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return post("/api/v1/auth/login", data);
}

export async function logout(): Promise<LogoutResponse> {
  return post("/api/v1/auth/logout");
}

export async function deleteAccount(): Promise<DeleteAccountResponse> {
  return del("/api/v1/auth/account");
}
