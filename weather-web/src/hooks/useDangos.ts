import useSWR from "swr";
import { dangoRepository } from "@/repositories/dango.repository";
import type { Dango } from "@/types/dango";

export const useDangos = () => {
  const { data, isLoading } = useSWR<Dango[]>(
    '/api/v1/dangos/me',
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
  const { data, isLoading, mutate } = useSWR<Dango, "id">(
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
    mutateBestDango: mutate,
  };
};




