import useSWR from "swr";
import { missionRepository } from "@/repositories/mission.repository";
import type { Mission } from "@/types/mission";

export const useMissions = () => {
  const { data, isLoading, mutate } = useSWR<Mission[]>(
    "/api/v1/missions",
    missionRepository.getMissions,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    missions: data,
    isLoadingMissions: isLoading,
    refetchMissions: mutate,
  };
};
