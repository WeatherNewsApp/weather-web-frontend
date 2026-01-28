import { get } from "./client";
import { Prefecture } from "@/types/api";

export type PrefecturesResponse = Prefecture[];

export async function getPrefectures(): Promise<PrefecturesResponse> {
  return await get<PrefecturesResponse>("/api/v1/prefectures");
}
