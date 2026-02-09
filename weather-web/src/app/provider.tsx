// app/providers.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SWRConfig } from "swr";
import { useUserStore } from "@/store/user.store";
import { Loading } from "@/components/shea/Loading/Loading";
import { cookieManager } from "@/lib/cookies";

// SWR Provider
function SwrProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        errorRetryCount: 1,
      }}
    >
      {children}
    </SWRConfig>
  );
}

// Auth Provider
function AuthProvider({ children }: { children: ReactNode }) {
  const { fetchUser, isInitialized, isLoading, error } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) {
      fetchUser();
    }
  }, [fetchUser, isInitialized]);

  useEffect(() => {
    // トークンはあるのにユーザー取得失敗 = 認証エラー
    if (error && cookieManager.getToken()) {
      cookieManager.removeToken();
      router.push("/login");
    }
  }, [error, router]);

  if (isLoading || !isInitialized) {
    return <Loading />;
  }

  return <>{children}</>;
}

// 全Provider統合
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SwrProvider>
      <AuthProvider>{children}</AuthProvider>
    </SwrProvider>
  );
}
