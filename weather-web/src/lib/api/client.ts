import { cookieManager } from "@/lib/cookies";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // クライアントサイドのみでトークン取得
    const token =
      typeof window !== "undefined" ? cookieManager.getToken() : null;

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  // 共通クエと
  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options?.headers,
      },
    };

    const res = await fetch(url, config);

    if (!res.ok) {
      // エラーハンドリング
      const errorBody = await res.text();
      console.error("API Error:", {
        url,
        status: res.status,
        statusText: res.statusText,
        body: errorBody,
      });

      let error;
      try {
        error = JSON.parse(errorBody);
      } catch {
        error = { message: errorBody || "An error occurred" };
      }

      // バックエンドからのエラーメッセージを優先
      const errorMessage =
        error.messages?.[0] || error.message || `HTTP Error: ${res.status}`;
      throw new Error(errorMessage);
    }

    return res.json();
  }

  // GET
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  // POST
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // PATCH
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // DELETE
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8022"
);
