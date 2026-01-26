import useSWR, { SWRConfiguration, mutate } from "swr";
import { get, post, patch, del } from "@/lib/api/client";
import { ApiError } from "@/lib/api/client";

const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 2000,
  shouldRetryOnError: false,
};

export function useGet<T>(
  endpoint: string | null,
  params?: Record<string, string | number | boolean>,
  config?: SWRConfiguration
) {
  const key = endpoint ? (params ? [endpoint, params] : endpoint) : null;

  const {
    data,
    error,
    isLoading,
    mutate: localMutate,
  } = useSWR<T>(key, endpoint ? () => get<T>(endpoint, params) : null, {
    ...defaultConfig,
    ...config,
  });

  return {
    data,
    error: error as ApiError | undefined,
    isLoading,
    isError: !!error,
    mutate: localMutate,
  };
}

export async function apiCreate<T>(
  endpoint: string,
  data: unknown,
  invalidateKeys?: string[]
): Promise<T> {
  const result = await post<T>(endpoint, data);

  if (invalidateKeys) {
    invalidateKeys.forEach((key) => mutate(key));
  } else {
    mutate(endpoint);
  }

  return result;
}

export async function apiUpdate<T>(
  endpoint: string,
  data: unknown,
  invalidateKeys?: string[]
): Promise<T> {
  const result = await patch<T>(endpoint, data);

  if (invalidateKeys) {
    invalidateKeys.forEach((key) => mutate(key));
  } else {
    mutate(endpoint);
  }

  return result;
}

export async function apiDelete<T = void>(
  endpoint: string,
  invalidateKeys?: string[]
): Promise<T> {
  const result = await del<T>(endpoint);

  if (invalidateKeys) {
    invalidateKeys.forEach((key) => mutate(key));
  } else {
    mutate(endpoint);
  }

  return result;
}

export async function apiCreateOptimistic<T>(
  endpoint: string,
  data: unknown,
  optimisticData: T
): Promise<T> {
  mutate(endpoint, optimisticData, false);

  try {
    const result = await post<T>(endpoint, data);
    mutate(endpoint, result);
    return result;
  } catch (error) {
    mutate(endpoint);
    throw error;
  }
}
