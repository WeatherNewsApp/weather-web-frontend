import useSWR from "swr";
import { weatherRepository } from "@/repositories/weather.repository";
import type { Weather } from "@/types/weather";

export const useWeather = () => {
  const { data, isLoading } = useSWR<Weather>(
    "/api/v1/weather/me",
    weatherRepository.getWeather,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 1000 * 60 * 60 * 6,
    }
  );

  return {
    weather: data,
    weatherLoading: isLoading,
  };
};
