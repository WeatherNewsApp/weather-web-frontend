import type { Dango } from "./dango";

export type RankingDango = Pick<
  Dango,
  "id" | "damageLevel" | "growthStage" | "headSkin" | "bodySkin" | "baseSkin"
>;

export interface RankingUser {
  id: number;
  name: string;
  areaName: string | null;
  morningPrediction: string | null;
  eveningPrediction: string | null;
}

export type Ranking = {
  rank: number;
  rankingTotalDaysAlive: number;
  dango: RankingDango;
  user: RankingUser;
};

export interface MyRanking {
  rank: number;
  rankingTotalDaysAlive: number;
  dango: RankingDango;
}

export type RankingResponse = {
  rankings: Ranking[];
  myRanking: MyRanking;
};
