// app/providers.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { SWRConfig } from 'swr';
import { useUserStore } from '@/store/user.store';
import { Loading } from '@/components/shea/Loading/Loading';
import { cookieManager } from '@/lib/cookies';

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

  useEffect(() => {
    if (!isInitialized) {
      fetchUser();
    }
  }, [fetchUser, isInitialized]);

  if (isLoading || !isInitialized) {
    return <Loading />;
  }

  // トークンはあるのにユーザー取得失敗 = 認証エラー
  if (error && cookieManager.getToken()) {
    cookieManager.removeToken();
    window.location.href = '/login';
    return null;
  }

  return <>{children}</>;
}

// 全Provider統合
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SwrProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SwrProvider>
  );
}