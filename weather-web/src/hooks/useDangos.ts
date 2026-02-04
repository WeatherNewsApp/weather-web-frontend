import useSWR from "swr";
import { dangoRepository } from "@/repositories/dango.repository";
import type { Dango, BestDango } from "@/types/dango";

export const useDangos = () => {
  const { data, isLoading, error } = useSWR<Dango[]>(
    '/api/v1/dangos',
    dangoRepository.getDangos,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    dangos: data,
    isLoadingDangos: isLoading,
  };
};

export const useBestDango = () => {
  const { data, isLoading, error } = useSWR<BestDango>(
    '/api/v1/dangos/me/best',
    dangoRepository.getBestDango,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )  
  
  return {
    bestDango: data,
    isLoadingBestDango: isLoading,
  };
};




