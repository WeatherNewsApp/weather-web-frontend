"use client";
import { useState, useCallback, useMemo } from "react";

import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { Icons } from "@/components/shea/icon";
import { RankingItem } from "@/components/feature/RankingItem/RankingItem";
import { SkeletonRankingItem } from "@/components/shea/Skeleton";
import { useRankings } from "@/hooks/useRankings";
import { useUserStore } from "@/store/user.store";
import { Muddy } from "@/components/shea/Muddy/Muddy";

export default function Ranking() {
  const [activeTabId, setActiveTabId] = useState<"area" | "global">("area");

  const { user } = useUserStore();
  const { rankings, myRanking, isLoading } = useRankings(activeTabId);
  console.log(rankings);

  const currentTimeSlot = useMemo(() => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "morning" : "evening";
  }, []);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTabId(tabId as "area" | "global");
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title="ランキング"
        href="/"
        showPoints={true}
        // TODO: ポイントを取得する
        points={user?.point}
        tabs={[
          {
            id: "area",
            label: "地域ランキング",
            icon: <Icons.local />,
          },
          {
            id: "global",
            label: "全国ランキング",
            icon: <Icons.global />,
          },
        ]}
        activeTabId={activeTabId}
        onTabChange={handleTabChange}
      />
      <main className="flex-1 bg-white overflow-y-auto py-7 px-4 pt-[201px]">
        <div className="flex flex-col gap-5">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <SkeletonRankingItem key={i} />
              ))
            : rankings?.map((ranking) => (
                <RankingItem
                  key={ranking.rank}
                  rank={ranking.rank}
                  name={ranking.user.name}
                  days={ranking.rankingTotalDaysAlive}
                  dango={ranking.dango}
                  prediction={
                    currentTimeSlot === "evening"
                      ? ranking.user.morningPrediction
                      : ranking.user.eveningPrediction
                  }
                />
              ))}
        </div>
      </main>
      <div className="bg-main text-white rounded-t-sm py-4 px-4 flex items-center justify-between shadow-t">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-15 h-15  flex items-center justify-center">
            <Muddy
              damageLevel={
                myRanking?.dango?.damageLevel as "1" | "2" | "3" | "4" | "5"
              }
              growthStage={
                myRanking?.dango?.growthStage as "1" | "2" | "3" | "4" | "5"
              }
              headSkin={myRanking?.dango?.headSkin}
              bodySkin={myRanking?.dango?.bodySkin}
              baseSkin={myRanking?.dango?.baseSkin}
              face="normal"
              scale="scale-[0.3]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className=" font-sen">{user?.name}</p>
            <div className="flex gap-2 items-end justify-center">
              <p className=" text-xl font-sen leading-4">
                {myRanking?.rankingTotalDaysAlive}
              </p>
              <p className="text-sm leading-4">日</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-15 h-15 bg-white rounded-sm text-black">
          <p className="text-xl font-sen">{myRanking?.rank}</p>
        </div>
      </div>
    </div>
  );
}
