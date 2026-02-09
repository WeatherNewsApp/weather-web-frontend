import useSWR from "swr";
import { careRepository } from "@/repositories/care.repository";

export const useCare = () => {
  const { data, isLoading, mutate } = useSWR(
    "/api/v1/cares/current",
    careRepository.getCurrentCare,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 30000, // ケアは30秒間隔で十分
    }
  );

  return {
    currentCare: data?.weatherPrediction ?? null,
    careLoading: isLoading,
    mutateCurrentCare: mutate,
  };
};

export const useUnconfirmCare = () => {
  const { data, isLoading, mutate } = useSWR(
    "/api/v1/cares/unconfirmed",
    careRepository.getUnConfirmCare,
    {
      revalidateIfStale: false,
      revalidateOnFocus: true, // フォーカス時は再検証
      revalidateOnReconnect: true, // 再接続時は再検証
      dedupingInterval: 30000,
      refreshInterval: 5 * 60 * 1000, // 5分ごとに自動更新
    }
  );

  return {
    unconfirmCares: data,
    unconfirmCareLoading: isLoading,
    mutateUnconfirmCare: mutate,
  };
};
