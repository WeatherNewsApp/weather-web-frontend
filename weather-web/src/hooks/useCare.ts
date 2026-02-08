import useSWR from "swr";
import { careRepository } from "@/repositories/care.repository";

export const useCare = () => {
  const { data, isLoading, mutate } = useSWR(
    '/api/v1/cares/current',
    careRepository.getCurrentCare
  );

  return { 
    currentCare: data?.weatherPrediction ?? null,
    careLoading: isLoading,
    mutateCurrentCare: mutate,
  };
}
