import useSWR from "swr";
import { areaRepository } from "@/repositories/area.repository";
import type { Area } from "@/types/area";

export const useAreas = () => {
  const { data, isLoading } = useSWR<Area[]>(
    "/api/v1/areas",
    areaRepository.getAreas,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,
    }
  );

  return {
    areas: data,
    isLoadingAreas: isLoading,
  };
};
