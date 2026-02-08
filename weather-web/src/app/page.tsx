"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user.store";
import { SideMenu } from "@/components/feature/SideMenu/SideMenu";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import { useOwnedSkinsHead, useOwnedSkinsBody, useOwnedSkinsBase } from "@/hooks/useSkins";
import { useDangos } from "@/hooks/useDangos";
import { CustomModal } from "@/components/feature/CustomModal/CustomModal";
import { CareCardSelectModal } from "@/components/feature/CareCardSelectModal/CareCardSelectModal";
import { CountdownTimer } from "@/components/feature/CountdownTimer/CountdownTimer"
import { careRepository } from "@/repositories/care.repository";
import { CareAnimationModal } from "@/components/shea/CareAnimationModal/CareAnimationModal";
import { useCare } from "@/hooks/useCare";

type Care = "cloudy" | "rainy" | "sunny";

export default function Home() {

  const { user } = useUserStore();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("bg-home-morning");
  const [care, setCare] = useState<Care>("cloudy");

  // ステート
  const [selectedSkinHeadId, setSelectedSkinHeadId] = useState<number | null>(null);
  const [selectedSkinBodyId, setSelectedSkinBodyId] = useState<number | null>(null);
  const [selectedSkinBaseId, setSelectedSkinBaseId] = useState<number | null>(null);
  const [customModalTabId, setCustomModalTabId] = useState<"normal"| "favorite">("normal");

  // モーダル
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showCareModal, setShowCareModal] = useState(false);
  const [showCareMovieModal, setShowCareMovieModal] = useState(false);

  const { ownedSkinsHead, isLoadingOwnedSkinsHead, mutateOwnedSkinsHead } = useOwnedSkinsHead(showCustomModal);
  const { ownedSkinsBody, isLoadingOwnedSkinsBody, mutateOwnedSkinsBody } = useOwnedSkinsBody(showCustomModal);
  const { ownedSkinsBase, isLoadingOwnedSkinsBase, mutateOwnedSkinsBase } = useOwnedSkinsBase(showCustomModal);


  const { currentCare, careLoading, mutateCurrentCare } = useCare();
  console.log(currentCare);
  const { mutateDangos } = useDangos();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setBackgroundColor("bg-home-evening");
    } else {
      setBackgroundColor("bg-home-morning");
    }
  }, []);

  const getTargetDate = (): Date | null => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 11 ) {
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
  }

  const targetTime = getTargetDate();

  const isCountdownActive = () => {
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 11) || (hour >= 18 && hour < 24);
  }
  
  const countdownActive = isCountdownActive();

  const handleCareSelect = async (value: "sunny" | "cloudy" | "rainy" ) => {
    setCare(value);
    setShowCareModal(false);
    setTimeout(() => {
      setShowCareMovieModal(true);
    }, 400);

    try {
      await careRepository.executeCare(value);
      console.log("ケア実行に成功しました");
    } catch (error) {
      console.error("ケア実行に失敗しました:", error);
    } finally {
      mutateCurrentCare();
    }

  }
  
  return (
    <main className={`${backgroundColor} w-full h-screen relative overflow-hidden`}>
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
      <div className="absolute -bottom-[970px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-radial"></div>
      <div className="w-full px-4 pt-7 pb-10 h-screen flex flex-col justify-between">
        <div className="w-full flex flex-col items-end gap-4 relative ">
          <div className="flex items-center justify-between gap-1 pr-3 bg-white rounded-full shadow-md w-25">
            <div className="pb-[2px] w-8 flex relative">
              <div className="w-8 h-8 bg-points rounded-full relative z-10 p-1">
                <Image
                  src="/images/coin.svg"
                  alt="points"
                  width={32}
                  height={32}
                />
              </div>
              <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-points-dark z-0" />
            </div>
            <p className="text-accent font-sen">{user?.point}</p>
          </div>
          {/* ここにくもここは実際の天気を取得するAPIを元に画像を変更
           */}
          <div className="absolute bottom-0 right-[165px] ">
            <Image
              src="/images/sunny-morning.png"
              alt="cloud"
              width={320}
              height={240}
              className="min-w-[320px] h-[240px]"
            />
          </div>
          <div 
            className="w-16 h-[66px] relative"
            onClick={ () => setIsSideMenuOpen(true)}
          >
            <div className="w-16 h-16 bg-main rounded-full flex flex-col gap-2 items-center justify-center relative z-20">
              <span className="w-8 h-[2px] bg-white rounded-[2px]"></span>
              <span className="w-8 h-[2px] bg-white rounded-[2px]"></span>
              <span className="w-8 h-[2px] bg-white rounded-[2px]"></span>
            </div>
            <span className="absolute bottom-0 left-0 w-16 h-16 bg-main-dark rounded-full z-10"/>
          </div>
        </div>
        <div className={cn(
          "pt-7 flex flex-col items-center h-full",
          countdownActive ? "justify-between" : "justify-end"
        )}>
        
          {countdownActive && targetTime && (
            <CountdownTimer
            targetDate={targetTime}
            backgroundColor={backgroundColor}
            />
          )}
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 w-fit bg-[#fff] rounded-sm shadow-speech py-3 px-6 speech-bubble relative z-10">
              {currentCare === "sunny" ? (
                <div className="flex gap-3 items-center justify-center">
                  <Image src="/images/sunny-trace.png" alt="sunny" width={32} height={32} />
                  <p>水をかけてもらったよ</p>
                </div>
              ) : currentCare === "cloudy" ? (
                <div className="flex gap-3 items-center justify-center">
                  <Image src="/images/cloudy-trace.png" alt="cloudy" width={32} height={32} />
                  <p>拭いてもらったよ</p>
                </div>
              ) : currentCare === "rainy" ? (
                <div className="flex gap-3 items-center justify-center">
                  <Image src="/images/rainy-trace.png" alt="rainy" width={32} height={32} />
                  <p>傘をさしてもらったよ</p>
                </div>
              ) : (
                <p>今日もいい天気だね</p>
              )}
            </div>
            <div className="w-full flex flex-col items-center">
              <div 
                className="w-[200px] h-[200px] mt-5"
                onClick={() => setShowCustomModal(true)}
              >
                <Muddy 
                  face="happy"
                  growthStage="1"
                  damageLevel="1"
                />
              </div>
              <button
                className={cn(
                  "relative h-[70px] w-full mt-15",
                  // !isCountdownActive() ? "opacity-50 cursor-not-allowed" : ""
                )}
                // 一旦true
                // disabled={!isCountdownActive()}
                onClick={() => setShowCareModal(true)}
              >
                <div className="absolute top-0 left-0 w-full h-[66px] flex items-center justify-center bg-accent rounded-full z-30">
                  <p className="text-white text-center text-lg">今日のケアはどうする？</p>
                </div>
                <span className="absolute bottom-0 left-0 w-full h-[66px] bg-accent-dark rounded-full z-20"/>
              </button>
            </div>
          </div>
        </div>
      </div>  
      <CustomModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        tabId={customModalTabId}
        onTabChange={(tabId: "normal"| "favorite") => setCustomModalTabId(tabId)}
        selectedSkinHeadId={selectedSkinHeadId}
        selectedSkinBodyId={selectedSkinBodyId}
        selectedSkinBaseId={selectedSkinBaseId}
        onSkinSelectHead={(skinId: number | null) => setSelectedSkinHeadId(skinId)}
        onSkinSelectBody={(skinId: number | null) => setSelectedSkinBodyId(skinId)}
        onSkinSelectBase={(skinId: number | null) => setSelectedSkinBaseId(skinId)}
        ownedSkinsHead={ownedSkinsHead || []}
        ownedSkinsBody={ownedSkinsBody || []}
        ownedSkinsBase={ownedSkinsBase || []}
        isLoadingOwnedSkinsHead={isLoadingOwnedSkinsHead}
        isLoadingOwnedSkinsBody={isLoadingOwnedSkinsBody}
        isLoadingOwnedSkinsBase={isLoadingOwnedSkinsBase}
        mutateOwnedSkinsHead={mutateOwnedSkinsHead}
        mutateOwnedSkinsBody={mutateOwnedSkinsBody}
        mutateOwnedSkinsBase={mutateOwnedSkinsBase}
        mutateDangos={mutateDangos}
      />
      <CareCardSelectModal
        isOpen={showCareModal}
        onClose={() => setShowCareModal(false)}
        onSelect={handleCareSelect}
        initialIndex={care === "sunny" ? 1 : care === "cloudy" ? 2 : 3}
      />
      <CareAnimationModal
        isOpen={showCareMovieModal}
        onClose={() => setShowCareMovieModal(false)}
        careType={care}
        title="ケア中"
      />
    </main>
  );
}
