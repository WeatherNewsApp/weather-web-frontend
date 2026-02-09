import useSWR from "swr";
import { achievementRepository } from "@/repositories/achievement.repository";
import type { Achievement } from "@/types/achievement";

export const useAchievements = () => {
  const { data, isLoading, mutate } = useSWR<Achievement[]>(
    "/api/v1/achievements",
    achievementRepository.getAchievements,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    achievements: data,
    isLoadingAchievements: isLoading,
    refetchAchievements: mutate,
  };
};
