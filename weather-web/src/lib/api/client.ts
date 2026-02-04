/**
 * 共通APIクライアント
 * fetchをラップしたHTTPクライアント
 */
import { ApiErrorResponse } from "@/types/api";
import { cookieManager } from "../cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3022";

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public messages: string[],
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

/**
 * @param endpoint
 * @param config
 * @returns
 */
async function apiRequest<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { params, ...fetchConfig } = config;
  let url = `${API_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    );
    url += `?${searchParams.toString()}`;
  }

  const res = await fetch(url, {
    ...fetchConfig,
    headers: {
      "Content-Type": "application/json",
      ...fetchConfig.headers,
    },
  });

  if (!res.ok) {
    const contentType = res.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      try {
        const errorData: ApiErrorResponse = await res.json();

        if ("success" in errorData && "messages" in errorData) {
          throw new ApiError(
            res.status,
            res.statusText,
            errorData.messages,
            errorData.messages[0] || "Unknown error"
          );
        }

        throw new ApiError(
          res.status,
          res.statusText,
          ["Unexpected error response"],
          "Unexpected error response"
        );
      } catch (parseError) {
        if (parseError instanceof ApiError) {
          throw parseError;
        }
      }
    }

    const errorText = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, res.statusText, [errorText], errorText);
  }

  return res.json();
}

export async function get<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  return apiRequest<T>(endpoint, { 
    params,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookieManager.getToken() || ""}`,
    }
  });
}

export async function post<T>(endpoint: string, data?: unknown): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function patch<T>(endpoint: string, data?: unknown): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function del<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: "DELETE" });
}
