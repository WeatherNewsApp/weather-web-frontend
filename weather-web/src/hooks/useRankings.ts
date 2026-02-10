import useSWR from "swr";
import { rankingRepository } from "@/repositories/ranking.repository";
import type { RankingResponse } from "@/types/ranking";

export const useRankings = (scope: "area" | "global") => {
  const { data, isLoading } = useSWR<RankingResponse>(
    `/api/v1/rankings?scope=${scope}`,
    scope === "area"
      ? rankingRepository.getLocalRankings
      : rankingRepository.getGlobalRankings,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,
    }
  );

  return {
    rankings: data?.rankings,
    myRanking: data?.myRanking,
    isLoading,
  };
};
