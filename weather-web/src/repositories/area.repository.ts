import { apiClient } from "@/lib/api/client";
import type { Area } from "@/types/area";

export const areaRepository = {
  getAreas: () => apiClient.get<Area[]>('/api/v1/areas'),
}