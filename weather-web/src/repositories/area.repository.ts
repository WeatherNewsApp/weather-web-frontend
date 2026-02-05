import { apiClient } from "@/lib/api/client";
import type { Area } from "@/types/area";

export const areaRepository = {
  getAreas: async () => {
    const response = await apiClient.get<{ areas: Area[] }>('/api/v1/areas');
    return response.areas;
  }
}