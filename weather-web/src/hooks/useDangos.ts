import useSWR from "swr";
import { dangoRepository } from "@/repositories/dango.repository";
import type { Dango } from "@/types/dango";

export const useDangos = () => {
  const { data, isLoading, mutate } = useSWR<Dango[]>(
    '/api/v1/dangos/me',
    dangoRepository.getDangos,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  return {
    dangos: data,
    isLoadingDangos: isLoading,
    mutateDangos: mutate,
  };
};

export const useBestDango = () => {
  const { data, isLoading, mutate } = useSWR<Dango, "id">(
    '/api/v1/dangos/me/best',
    dangoRepository.getBestDango,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  )  
  
  return {
    bestDango: data,
    isLoadingBestDango: isLoading,
    mutateBestDango: mutate,
  };
};

export const useDango = () => {
  const { data, mutate } = useSWR<Pick<Dango, 'id' | 'damageLevel' | 'growthStage' | 'headSkin' | 'bodySkin' | 'baseSkin'>>(
    '/api/v1/dangos/me/now',
    dangoRepository.getNowDango,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  )

  return {
    dango: data,
    mutateDango: mutate,
  };
}




