"use client";
import { useState, useCallback } from "react";

import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { Icons } from "@/components/shea/icon";
import { MissionItem } from "@/components/shea/MissonItem/MissionItem";
import { SkeletonMissionItem } from "@/components/shea/Skeleton";
import { missionRepository } from "@/repositories/mission.repository";
import { achievementRepository } from "@/repositories/achievement.repository";
import { useMissions } from "@/hooks/useMissions";
import { useAchievements } from "@/hooks/useAchievement";
import { useUserStore } from "@/store/user.store";

export default function Missions() {
  const [activeTabId, setActiveTabId] = useState("mission");

  const { user, refreshUser } = useUserStore();
  const { missions, isLoadingMissions, refetchMissions } = useMissions();
  const { achievements, isLoadingAchievements, refetchAchievements } =
    useAchievements();

  // ミッションの報酬の受け取り
  const handleClaimMission = useCallback(
    async (missionId: number) => {
      try {
        await missionRepository.claimMission(missionId);
        await refetchMissions();
        await refreshUser();
      } catch (error) {
        console.error("報酬の受け取りに失敗しました:", error);
      }
    },
    [refetchMissions, refreshUser]
  );

  // アチーブメントの取得
  const handleClaimAchievement = useCallback(
    async (achievementId: number) => {
      try {
        await achievementRepository.claimAchievement(achievementId);
        await refetchAchievements();
        await refreshUser();
      } catch (error) {
        console.error("報酬の受け取りに失敗しました:", error);
      }
    },
    [refetchAchievements, refreshUser]
  );

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title="ミッション"
        href="/"
        showPoints={true}
        points={user?.point ?? 0}
        tabs={[
          {
            id: "mission",
            label: "デイリーミッション",
            icon: <Icons.mission />,
          },
          {
            id: "achievement",
            label: "アチーブメント",
            icon: <Icons.achievement />,
          },
        ]}
        activeTabId={activeTabId}
        onTabChange={handleTabChange}
      />
      <main className="flex-1 bg-white overflow-y-auto py-7 px-4 pt-[201px]">
        {isLoadingMissions || isLoadingAchievements ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonMissionItem key={i} />
            ))}
          </div>
        ) : activeTabId === "mission" ? (
          <div className="flex flex-col gap-3">
            {missions?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>ミッションがありません</p>
              </div>
            ) : (
              missions?.map((mission) => (
                <MissionItem
                  key={mission.id}
                  {...mission}
                  skin={null}
                  onClaim={() => handleClaimMission(mission.id)}
                />
              ))
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {achievements?.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>アチーブメントがありません</p>
              </div>
            ) : (
              achievements?.map((achievement) => (
                <MissionItem
                  key={achievement.id}
                  {...achievement}
                  skin={achievement.skin}
                  onClaim={() => handleClaimAchievement(achievement.id)}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
