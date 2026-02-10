"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback, useMemo } from "react";

import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user.store";
import { SkeletonHome } from "@/components/shea/Skeleton";
import {
  useOwnedSkinsHead,
  useOwnedSkinsBody,
  useOwnedSkinsBase,
} from "@/hooks/useSkins";
import { useDango } from "@/hooks/useDangos";
import { careRepository } from "@/repositories/care.repository";
import { useCare, useUnconfirmCare } from "@/hooks/useCare";
import { dangoRepository } from "@/repositories/dango.repository";
import { useWeather } from "@/hooks/usWeather";
import { HomeHeader } from "@/components/feature/HomeHeader/HomeHeader";
import { CreateDangoScreen } from "@/components/feature/CreateDangoScreen/CreateDangoScreen";
import { CareResultContent } from "@/components/feature/CareResultContent/CareResultContent";
import { MainContent } from "@/components/feature/MainContent/MainContent";
import type { Dango } from "@/types/dango";

const CustomModal = dynamic(
  () =>
    import("@/components/feature/CustomModal/CustomModal").then((mod) => ({
      default: mod.CustomModal,
    })),
  {
    ssr: false,
  }
);

const CareCardSelectModal = dynamic(
  () =>
    import("@/components/feature/CareCardSelectModal/CareCardSelectModal").then(
      (mod) => ({ default: mod.CareCardSelectModal })
    ),
  {
    ssr: false,
  }
);

const CareAnimationModal = dynamic(
  () =>
    import("@/components/shea/CareAnimationModal/CareAnimationModal").then(
      (mod) => ({ default: mod.CareAnimationModal })
    ),
  {
    ssr: false,
  }
);

const SelectModal = dynamic(
  () =>
    import("@/components/shea/SelectModal/SelectModal").then((mod) => ({
      default: mod.SelectModal,
    })),
  {
    ssr: false,
  }
);

const DangoDeathModal = dynamic(
  () =>
    import("@/components/feature/DangoDeathModal/DangoDeathModal").then(
      (mod) => ({ default: mod.DangoDeathModal })
    ),
  {
    ssr: false,
  }
);

const SideMenu = dynamic(
  () =>
    import("@/components/feature/SideMenu/SideMenu").then((mod) => ({
      default: mod.SideMenu,
    })),
  {
    ssr: false,
  }
);

const CountdownTimer = dynamic(
  () =>
    import("@/components/feature/CountdownTimer/CountdownTimer").then(
      (mod) => ({ default: mod.CountdownTimer })
    ),
  {
    ssr: false,
  }
);

type Care = "cloudy" | "rainy" | "sunny";

export default function Home() {
  const { user } = useUserStore();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("bg-home-morning");
  const [care, setCare] = useState<Care>("cloudy");

  // ステート
  const [selectedSkinHeadId, setSelectedSkinHeadId] = useState<number | null>(
    null
  );
  const [selectedSkinBodyId, setSelectedSkinBodyId] = useState<number | null>(
    null
  );
  const [selectedSkinBaseId, setSelectedSkinBaseId] = useState<number | null>(
    null
  );
  const [customModalTabId, setCustomModalTabId] = useState<
    "normal" | "favorite"
  >("normal");
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const [deadDangoData, setDeadDangoData] = useState<Pick<
    Dango,
    | "damageLevel"
    | "growthStage"
    | "headSkin"
    | "bodySkin"
    | "baseSkin"
    | "totalDaysAlive"
  > | null>(null);

  // モーダル
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showCareModal, setShowCareModal] = useState(false);
  const [showCareMovieModal, setShowCareMovieModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showDangoDeathModal, setShowDangoDeathModal] = useState(false);

  const { ownedSkinsHead, isLoadingOwnedSkinsHead, mutateOwnedSkinsHead } =
    useOwnedSkinsHead(showCustomModal);
  const { ownedSkinsBody, isLoadingOwnedSkinsBody, mutateOwnedSkinsBody } =
    useOwnedSkinsBody(showCustomModal);
  const { ownedSkinsBase, isLoadingOwnedSkinsBase, mutateOwnedSkinsBase } =
    useOwnedSkinsBase(showCustomModal);

  const { currentCare, mutateCurrentCare } = useCare();
  const { unconfirmCares, mutateUnconfirmCare } = useUnconfirmCare();
  const { dango, isLoadingDango, mutateDango } = useDango();

  useEffect(() => {
    if (unconfirmCares && unconfirmCares.length > 0) {
      setCurrentResultIndex(0);
      setShowResultModal(true);
    }
  }, [unconfirmCares]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setBackgroundColor("bg-home-evening");
    } else {
      setBackgroundColor("bg-home-morning");
    }
  }, []);

  useEffect(() => {
    if (showCustomModal && dango) {
      const headSkin = ownedSkinsHead?.find(
        (skin) => skin.imageKey === dango.headSkin
      );
      if (headSkin) {
        setSelectedSkinHeadId(headSkin.id);
      }

      const bodySkin = ownedSkinsBody?.find(
        (skin) => skin.imageKey === dango.bodySkin
      );
      if (bodySkin) {
        setSelectedSkinBodyId(bodySkin.id);
      }

      const baseSkin = ownedSkinsBase?.find(
        (skin) => skin.imageKey === dango.baseSkin
      );
      if (baseSkin) {
        setSelectedSkinBaseId(baseSkin.id);
      }
    }
  }, [showCustomModal, dango, ownedSkinsHead, ownedSkinsBody, ownedSkinsBase]);

  useEffect(() => {
    const checkBatchCompletion = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      if ((hour === 6 || hour === 18) && minute >= 1 && minute <= 5) {
        mutateUnconfirmCare();
        mutateDango();
      }
    };

    const interval = setInterval(checkBatchCompletion, 60000);

    checkBatchCompletion();

    return () => clearInterval(interval);
  }, [mutateUnconfirmCare, mutateDango]);

  const handleNextResult = useCallback(async () => {
    if (!unconfirmCares || unconfirmCares.length === 0) return;
    const currentCare = unconfirmCares[currentResultIndex];

    try {
      await careRepository.confirmCare(currentCare.id);
    } catch (error) {
      console.error("ケア確認に失敗しました:", error);
    }

    if (String(currentCare.dango.damageLevel) === "4") {
      try {
        setDeadDangoData({
          damageLevel: currentCare.dango.damageLevel,
          growthStage: currentCare.dango.growthStage,
          headSkin: currentCare.dango.headSkin,
          bodySkin: currentCare.dango.bodySkin,
          baseSkin: currentCare.dango.baseSkin,
          totalDaysAlive: currentCare.dango.totalDaysAlive,
        });

        for (let i = currentResultIndex + 1; i < unconfirmCares.length; i++) {
          await careRepository.confirmCare(unconfirmCares[i].id);
        }
        setShowResultModal(false);
        setShowDangoDeathModal(true);
      } catch (error) {
        console.error("残りのケア確認に失敗しました:", error);
      }
      return;
    }

    if (currentResultIndex < unconfirmCares.length - 1) {
      setCurrentResultIndex(currentResultIndex + 1);
    } else {
      setShowResultModal(false);
      setCurrentResultIndex(0);
      mutateUnconfirmCare();
      mutateDango();
    }
  }, [unconfirmCares, currentResultIndex, mutateUnconfirmCare, mutateDango]);

  const handleNewDango = useCallback(async () => {
    try {
      await dangoRepository.newDango();
    } catch (error) {
      console.error("団子新規作成に失敗しました:", error);
    } finally {
      setShowDangoDeathModal(false);
      setShowResultModal(false);
      setCurrentResultIndex(0);
      setDeadDangoData(null);
      mutateUnconfirmCare();
      mutateDango();
      mutateCurrentCare();
    }
  }, [mutateUnconfirmCare, mutateDango, mutateCurrentCare]);

  const currentResult = unconfirmCares?.[currentResultIndex];

  // 目標時刻の計算をメモ化
  const targetTime = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 11) {
      const target = new Date(now);
      target.setHours(11, 0, 0, 0);
      return target;
    }

    if (hour >= 18 && hour < 24) {
      const target = new Date(now);
      target.setHours(23, 0, 0, 0);
      return target;
    }

    return null;
  }, []);

  // カウントダウンが有効かどうかをメモ化
  const countdownActive = useMemo(() => {
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 11) || (hour >= 18 && hour < 24);
  }, []);

  // イベントハンドラーをメモ化
  const handleMenuClick = useCallback(() => {
    setIsSideMenuOpen(true);
  }, []);

  const handleDangoClick = useCallback(() => {
    setShowCustomModal(true);
  }, []);

  const handleCareButtonClick = useCallback(() => {
    setShowCareModal(true);
  }, []);

  // モーダルのcloseハンドラーをメモ化
  const handleCloseSideMenu = useCallback(() => {
    setIsSideMenuOpen(false);
  }, []);

  const handleCloseCustomModal = useCallback(() => {
    setShowCustomModal(false);
  }, []);

  const handleCloseCareModal = useCallback(() => {
    setShowCareModal(false);
  }, []);

  const handleCloseCareMovieModal = useCallback(() => {
    setShowCareMovieModal(false);
  }, []);

  const handleCloseResultModal = useCallback(() => {
    setShowResultModal(false);
  }, []);

  const handleCloseDangoDeathModal = useCallback(() => {
    setShowDangoDeathModal(false);
  }, []);

  // CustomModalのハンドラーをメモ化
  const handleTabChange = useCallback(
    (tabId: "normal" | "favorite") => {
      setCustomModalTabId(tabId);
    },
    []
  );

  const handleSkinSelectHead = useCallback((skinId: number | null) => {
    setSelectedSkinHeadId(skinId);
  }, []);

  const handleSkinSelectBody = useCallback((skinId: number | null) => {
    setSelectedSkinBodyId(skinId);
  }, []);

  const handleSkinSelectBase = useCallback((skinId: number | null) => {
    setSelectedSkinBaseId(skinId);
  }, []);

  // CareCardSelectModalのinitialIndexをメモ化
  const careModalInitialIndex = useMemo(() => {
    return care === "sunny" ? 1 : care === "cloudy" ? 2 : 3;
  }, [care]);

  const handleCareSelect = useCallback(
    async (value: "sunny" | "cloudy" | "rainy") => {
      setCare(value);
      setShowCareModal(false);
      setTimeout(() => {
        setShowCareMovieModal(true);
      }, 400);

      try {
        await careRepository.executeCare(value);
      } catch (error) {
        console.error("ケア実行に失敗しました:", error);
      } finally {
        mutateCurrentCare();
      }
    },
    [mutateCurrentCare]
  );

  const { weather, weatherLoading } = useWeather();
  const weatherType = (weather as { weather?: "sunny" | "cloudy" | "rainy" })
    ?.weather;

  // 初回データ取得中はスケルトンを表示
  if (isLoadingDango || weatherLoading) {
    return <SkeletonHome />;
  }

  // 団子がない場合
  if (!dango) {
    return <CreateDangoScreen onCreateDango={handleNewDango} />;
  }

  return (
    <main
      className={`${backgroundColor} w-full h-screen relative overflow-hidden`}
    >
      <SideMenu isOpen={isSideMenuOpen} onClose={handleCloseSideMenu} />
      <div className="absolute -bottom-[970px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-radial"></div>
      <div className="w-full px-4 pt-7 pb-10 h-screen flex flex-col justify-between">
        <HomeHeader
          userPoint={user?.point ?? 0}
          weatherType={weatherType ?? "cloudy"}
          onMenuClick={handleMenuClick}
        />
        <div
          className={cn(
            "pt-7 flex flex-col items-center h-full",
            countdownActive ? "justify-between" : "justify-end"
          )}
        >
          {countdownActive && targetTime && (
            <CountdownTimer
              targetDate={targetTime}
              backgroundColor={backgroundColor}
            />
          )}
          <MainContent
            dango={dango}
            isCountdownActive={countdownActive}
            currentCare={currentCare}
            onDangoClick={handleDangoClick}
            onCareClick={handleCareButtonClick}
          />
        </div>
      </div>
      <CustomModal
        isOpen={showCustomModal}
        onClose={handleCloseCustomModal}
        tabId={customModalTabId}
        onTabChange={handleTabChange}
        selectedSkinHeadId={selectedSkinHeadId}
        selectedSkinBodyId={selectedSkinBodyId}
        selectedSkinBaseId={selectedSkinBaseId}
        onSkinSelectHead={handleSkinSelectHead}
        onSkinSelectBody={handleSkinSelectBody}
        onSkinSelectBase={handleSkinSelectBase}
        ownedSkinsHead={ownedSkinsHead || []}
        ownedSkinsBody={ownedSkinsBody || []}
        ownedSkinsBase={ownedSkinsBase || []}
        isLoadingOwnedSkinsHead={isLoadingOwnedSkinsHead}
        isLoadingOwnedSkinsBody={isLoadingOwnedSkinsBody}
        isLoadingOwnedSkinsBase={isLoadingOwnedSkinsBase}
        mutateOwnedSkinsHead={mutateOwnedSkinsHead}
        mutateOwnedSkinsBody={mutateOwnedSkinsBody}
        mutateOwnedSkinsBase={mutateOwnedSkinsBase}
        mutateDango={mutateDango}
      />
      <CareCardSelectModal
        isOpen={showCareModal}
        onClose={handleCloseCareModal}
        onSelect={handleCareSelect}
        initialIndex={careModalInitialIndex}
      />
      <CareAnimationModal
        isOpen={showCareMovieModal}
        onClose={handleCloseCareMovieModal}
        careType={care}
        title="ケア中"
      />
      <SelectModal
        isOpen={showResultModal}
        onClose={handleCloseResultModal}
        title="ケア結果"
        buttonProps={{
          label:
            String(currentResult?.dango.damageLevel) === "4"
              ? "新しい団子を作る"
              : "閉じる",
          onClick: () => {
            handleNextResult();
          },
          shadow: true,
        }}
      >
        {currentResult && (
          <CareResultContent currentResult={currentResult} dango={dango} />
        )}
      </SelectModal>


      {/* 団子死亡モーダル */}
      {showDangoDeathModal && deadDangoData && (
        <DangoDeathModal
          isOpen={showDangoDeathModal}
          onClose={handleCloseDangoDeathModal}
          onCreateNewDango={handleNewDango}
          dango={deadDangoData}
        />
      )}
    </main>
  );
}
