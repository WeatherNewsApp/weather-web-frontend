import { apiClient } from "@/lib/api/client";
import type { Weather } from "@/types/weather";

export const weatherRepository = {
  getWeather: () => apiClient.get<Weather>("/api/v1/weather/me"),
};