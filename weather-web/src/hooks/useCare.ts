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
      dedupingInterval: 300000,
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
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 300000,
      refreshInterval: 5 * 60 * 1000,
    }
  );

  return {
    unconfirmCares: data,
    unconfirmCareLoading: isLoading,
    mutateUnconfirmCare: mutate,
  };
};
