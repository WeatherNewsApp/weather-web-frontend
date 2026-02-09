import type { Dango } from "./dango";


export type CareType = "sunny" | "cloudy" | "rainy";

export type WeatherType = "sunny" | "cloudy" | "rainy" | null;

export interface CurrentCareResponse {
  weatherPrediction: CareType;
}

export interface StoreRequest {
  dangoId: number;
  careType: CareType;
}

export interface UnConfirmResponse {
  id: number;
  actualWeather: WeatherType;
  isCorrect: boolean;
  pointsEarned: number;
  dango: Pick<Dango, "damageLevel" | "growthStage" | "headSkin" | "bodySkin" | "baseSkin" | "totalDaysAlive">;
}