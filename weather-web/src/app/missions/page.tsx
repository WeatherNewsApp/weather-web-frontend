"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { Icons } from "@/components/shea/icon";
import { MissionItem } from "@/components/shea/MissonItem/MissionItem";
import { Loading } from "@/components/shea/Loading/Loading";
import { useGet, apiCreate } from "@/hooks/useApi";
import {
  Mission,
  MissionsResponse,
  ClaimMissionResponse,
  Achievement,
  AchievementsResponse,
  ClaimAchievementResponse,
} from "@/types/api";
import { UserResponse } from "@/lib/api/user";

// ダミーデータ（開発用 - 本番では削除）
const DUMMY_MISSIONS: Mission[] = [
  {
    id: 1,
    title: "ログインボーナス",
    type: "dummy1",
    reward: { type: "points", points: 10 },
    progress: 1,
    requiredCount: 1,
    isCompleted: true,
    isClaimed: false,
  },
  {
    id: 2,
    title: "どろ団子を3回磨く",
    type: "dummy2",
    reward: { type: "points", points: 50 },
    progress: 2,
    requiredCount: 3,
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 3,
    title: "天気予報を5回確認",
    type: "dummy3",
    reward: { type: "points", points: 100 },
    progress: 5,
    requiredCount: 5,
    isCompleted: true,
    isClaimed: false,
  },
  {
    id: 4,
    title: "友達を1人招待",
    type: "dummy1",
    reward: { type: "points", points: 200 },
    progress: 0,
    requiredCount: 1,
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 5,
    title: "連続ログイン7日達成",
    type: "dummy2",
    reward: { type: "points", points: 300 },
    progress: 4,
    requiredCount: 7,
    isCompleted: false,
    isClaimed: false,
  },
];

const DUMMY_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "初めてのどろ団子",
    type: "dummy1",
    reward: { type: "points", points: 50 },
    progress: 1,
    requiredCount: 1,
    isCompleted: true,
    isClaimed: true,
  },
  {
    id: 2,
    title: "どろ団子マスター",
    type: "dummy2",
    reward: {
      type: "pointsAndSkin",
      points: 500,
      skinId: "skin_003",
      skinName: "ゴールドスキン",
      skinImage: "/images/dummy-image.png",
    },
    progress: 45,
    requiredCount: 100,
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 3,
    title: "天気予報マニア",
    type: "dummy3",
    reward: { type: "points", points: 300 },
    progress: 50,
    requiredCount: 50,
    isCompleted: true,
    isClaimed: false,
  },
  {
    id: 4,
    title: "コレクター",
    type: "dummy1",
    reward: {
      type: "pointsAndSkin",
      points: 1000,
      skinId: "skin_004",
      skinName: "プラチナスキン",
      skinImage: "/images/dummy-image.png",
    },
    progress: 8,
    requiredCount: 20,
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 5,
    title: "ソーシャルマスター",
    type: "dummy2",
    reward: { type: "points", points: 800 },
    progress: 3,
    requiredCount: 10,
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 6,
    title: "継続は力なり",
    type: "dummy3",
    reward: {
      type: "pointsAndSkin",
      points: 2000,
      skinId: "skin_005",
      skinName: "レジェンドスキン",
      skinImage: "/images/dummy-image.png",
    },
    progress: 15,
    requiredCount: 30,
    isCompleted: false,
    isClaimed: false,
  },
];

export default function Missions() {
  const router = useRouter();
  const [activeTabId, setActiveTabId] = useState("mission");

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useGet<UserResponse>("/api/v1/user/me");

  // 開発用: ダミーデータを使用
  // 本番用: 以下のコメントを解除してダミーデータを削除
  // const { data: missionsData, isLoading: isLoadingMissions, error: missionsError } = useGet<MissionsResponse>("/api/v1/missions");
  // const { data: achievementsData, isLoading: isLoadingAchievements, error: achievementsError } = useGet<AchievementsResponse>("/api/v1/achievements");
  const missionsData: MissionsResponse = { missions: DUMMY_MISSIONS };
  const achievementsData: AchievementsResponse = {
    achievements: DUMMY_ACHIEVEMENTS,
  };
  const isLoadingMissions = false;
  const isLoadingAchievements = false;

  // 認証エラー時はログイン画面にリダイレクト
  useEffect(() => {
    if (userError && userError.status === 401) {
      router.push("/login");
    }
  }, [userError, router]);

  const isLoading =
    isLoadingUser ||
    (activeTabId === "mission" ? isLoadingMissions : isLoadingAchievements);

  // データがない場合は空のリストとして扱う
  const missions = missionsData?.missions ?? [];
  const achievements = achievementsData?.achievements ?? [];

  const handleClaimMission = async (missionId: number) => {
    try {
      const result = await apiCreate<ClaimMissionResponse>(
        `/api/v1/missions/${missionId}/claim`,
        {},
        ["/api/v1/missions", "/api/v1/users/me"]
      );
      if (result.success) {
        console.log("ミッション報酬を受け取りました");
      } else {
        console.error(result.messages.join(" / "));
      }
    } catch (error) {
      console.error("ミッション報酬の受け取りに失敗しました", error);
    }
  };

  const handleClaimAchievement = async (achievementId: number) => {
    try {
      const result = await apiCreate<ClaimAchievementResponse>(
        `/api/v1/achievements/${achievementId}/claim`,
        {},
        ["/api/v1/achievements", "/api/v1/users/me"]
      );
      if (result.success) {
        console.log("アチーブメント報酬を受け取りました");
      } else {
        console.error(result.messages.join(" / "));
      }
    } catch (error) {
      console.error("アチーブメント報酬の受け取りに失敗しました", error);
    }
  };

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
      <main className="flex-1 bg-white overflow-y-auto py-7 px-4">
        {isLoading ? (
          <Loading />
        ) : activeTabId === "mission" ? (
          <div className="flex flex-col gap-3">
            {missions.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>ミッションがありません</p>
              </div>
            ) : (
              missions.map((mission) => (
                <MissionItem
                  key={mission.id}
                  label={mission.title}
                  reward={mission.reward}
                  type={mission.type}
                  progress={mission.progress}
                  maxProgress={mission.requiredCount}
                  isCompleted={mission.isCompleted}
                  isClaimed={mission.isClaimed}
                  onClaim={() => handleClaimMission(mission.id)}
                />
              ))
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {achievements.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>アチーブメントがありません</p>
              </div>
            ) : (
              achievements.map((achievement) => (
                <MissionItem
                  key={achievement.id}
                  label={achievement.title}
                  reward={achievement.reward}
                  type={achievement.type}
                  progress={achievement.progress}
                  maxProgress={achievement.requiredCount}
                  isCompleted={achievement.isCompleted}
                  isClaimed={achievement.isClaimed}
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
