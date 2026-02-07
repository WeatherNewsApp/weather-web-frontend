"use client";
import { useState } from "react";

import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { Icons } from "@/components/shea/icon";
import { MissionItem } from "@/components/shea/MissonItem/MissionItem";
import { missionRepository } from "@/repositories/mission.repository";
import { achievementRepository } from "@/repositories/achievement.repository";
import { useMissions } from "@/hooks/useMissions";
import { useAchievements } from "@/hooks/useAchievement";
import { useUserStore } from "@/store/user.store";

export default function Missions() {
  const [activeTabId, setActiveTabId] = useState("mission");

  const { user, fetchUser } = useUserStore();
  const { missions, isLoadingMissions, refetchMissions } = useMissions();
  console.log(missions);
  const { achievements, isLoadingAchievements ,refetchAchievements} = useAchievements();
  console.log(achievements);


  // ミッションの報酬の受け取り
  const handleClaimMission = async (missionId: number) => {
    try {
      await missionRepository.claimMission(missionId);
      await refetchMissions();
      await fetchUser();
    } catch (error) {
      console.error("報酬の受け取りに失敗しました:", error);
    }
  };

  // アチーブメントの取得
  const handleClaimAchievement = async (achievementId: number) => {
    try {
      await achievementRepository.claimAchievement(achievementId);
      await refetchAchievements();
      await fetchUser();
    } catch (error) {
      console.error("報酬の受け取りに失敗しました:", error);
    }
  }

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
        onTabChange={(tabId) => {
          setActiveTabId(tabId);
        }}
      />
      <main className="flex-1 bg-white overflow-y-auto py-7 px-4 pt-[201px]">
        {isLoadingMissions || isLoadingAchievements ? (
          <></>
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