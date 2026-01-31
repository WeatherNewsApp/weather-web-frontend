"use client";
import { useState } from "react";
import Image from "next/image";

import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { Icons } from "@/components/shea/icon";
import { Loading } from "@/components/shea/Loading/Loading";
import { RankingUser } from "@/components/feature/RankingItem/RankingItem";
import { RankingItem } from "@/components/feature/RankingItem/RankingItem";

// 地域ランキングのダミーデータ
const localRankingData: RankingUser[] = [
  { rank: 1, name: "ryota", days: 100 },
  { rank: 2, name: "takeshi", days: 85 },
  { rank: 3, name: "yuki", days: 72 },
  { rank: 4, name: "haruka", days: 65 },
  { rank: 5, name: "kenji", days: 58 },
  { rank: 6, name: "sakura", days: 51 },
  { rank: 7, name: "daiki", days: 47 },
  { rank: 8, name: "mika", days: 42 },
  { rank: 9, name: "taro", days: 38 },
  { rank: 10, name: "hanako", days: 35 },
];

// 全国ランキングのダミーデータ
const globalRankingData: RankingUser[] = [
  { rank: 1, name: "champion", days: 365 },
  { rank: 2, name: "master", days: 320 },
  { rank: 3, name: "legend", days: 285 },
  { rank: 4, name: "hero", days: 250 },
  { rank: 5, name: "warrior", days: 215 },
  { rank: 6, name: "knight", days: 180 },
  { rank: 7, name: "fighter", days: 155 },
  { rank: 8, name: "brave", days: 130 },
  { rank: 9, name: "ryota", days: 100 },
  { rank: 10, name: "rookie", days: 85 },
];

/**
 * Render the Ranking page that displays regional and national leaderboards with a footer summary.
 *
 * The component shows a header with two tabs ("地域ランキング" and "全国ランキング"), switches the displayed ranking dataset based on the active tab, renders the list of users as ranking items, and includes a static footer panel with user summary and metrics.
 *
 * @returns The JSX element for the Ranking page containing the header, ranking list, and footer summary.
 */
export default function Ranking() {
  const [activeTabId, setActiveTabId] = useState<string>("local");

  // アクティブなタブに応じてデータを切り替え devのみ
  const currentRankingData =
    activeTabId === "local" ? localRankingData : globalRankingData;

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title="ランキング"
        href="/"
        showPoints={true}
        // TODO: ポイントを取得する
        points={0}
        tabs={[
          {
            id: "local",
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
        onTabChange={(tabId) => {
          setActiveTabId(tabId);
        }}
      />
      <main className="flex-1 bg-white overflow-y-auto py-7 px-4">
        <div className="flex flex-col gap-5">
          {currentRankingData.map((user) => (
            <RankingItem
              key={user.rank}
              rank={user.rank}
              name={user.name}
              days={user.days}
            />
          ))}
        </div>
      </main>
      <div className="bg-main text-white rounded-t-xs py-4 px-4 flex items-center justify-between shadow-t">
        <div className="flex gap-3 items-center justify-center">
          <Image
            src="/images/dummy-image.png"
            alt="dummy-image"
            width={60}
            height={60}
            className="h-15"
          />
          <div className="flex flex-col gap-3">
            <p className=" font-sen">Ryouta</p>
            <div className="flex gap-2 items-end justify-center">
              <p className=" text-xl font-sen leading-4">1000000</p>
              <p className="text-sm leading-4">日</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-xl font-sen">1000</p>
        </div>
      </div>
    </div>
  );
}