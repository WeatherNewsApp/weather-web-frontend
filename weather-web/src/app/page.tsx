"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user.store";
import { SideMenu } from "@/components/feature/SideMenu/SideMenu";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import { SkeletonHome } from "@/components/shea/Skeleton";
import { useOwnedSkinsHead, useOwnedSkinsBody, useOwnedSkinsBase } from "@/hooks/useSkins";
import { useDango, useDangos } from "@/hooks/useDangos";
import { CountdownTimer } from "@/components/feature/CountdownTimer/CountdownTimer"
import { careRepository } from "@/repositories/care.repository";
import { useCare, useUnconfirmCare } from "@/hooks/useCare";
import { dangoRepository } from "@/repositories/dango.repository";
import { useWeather } from "@/hooks/usWeather";

const CustomModal = dynamic(() => import("@/components/feature/CustomModal/CustomModal").then(mod => ({ default: mod.CustomModal })), {
  ssr: false,
});

const CareCardSelectModal = dynamic(() => import("@/components/feature/CareCardSelectModal/CareCardSelectModal").then(mod => ({ default: mod.CareCardSelectModal })), {
  ssr: false,
});

const CareAnimationModal = dynamic(() => import("@/components/shea/CareAnimationModal/CareAnimationModal").then(mod => ({ default: mod.CareAnimationModal })), {
  ssr: false,
});

const SelectModal = dynamic(() => import("@/components/shea/SelectModal/SelectModal").then(mod => ({ default: mod.SelectModal })), {
  ssr: false,
});

const DangoDeathModal = dynamic(() => import("@/components/feature/DangoDeathModal/DangoDeathModal").then(mod => ({ default: mod.DangoDeathModal })), {
  ssr: false,
});

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
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const [deadDangoData, setDeadDangoData] = useState<any>(null);

  // モーダル
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showCareModal, setShowCareModal] = useState(false);
  const [showCareMovieModal, setShowCareMovieModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showDangoDeathModal, setShowDangoDeathModal] = useState(false);

  const { ownedSkinsHead, isLoadingOwnedSkinsHead, mutateOwnedSkinsHead } = useOwnedSkinsHead(showCustomModal);
  const { ownedSkinsBody, isLoadingOwnedSkinsBody, mutateOwnedSkinsBody } = useOwnedSkinsBody(showCustomModal);
  const { ownedSkinsBase, isLoadingOwnedSkinsBase, mutateOwnedSkinsBase } = useOwnedSkinsBase(showCustomModal);


  const { currentCare, careLoading, mutateCurrentCare } = useCare();
  const { unconfirmCares, unconfirmCareLoading, mutateUnconfirmCare } = useUnconfirmCare();
  const { dango, mutateDango } = useDango();
  const {mutateDangos} = useDangos();

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
      const headSkin = ownedSkinsHead?.find(skin => skin.imageKey === dango.headSkin);
      if (headSkin) {
        setSelectedSkinHeadId(headSkin.id);
      }

      const bodySkin = ownedSkinsBody?.find(skin => skin.imageKey === dango.bodySkin);
      if (bodySkin) {
        setSelectedSkinBodyId(bodySkin.id);
      }

      const baseSkin = ownedSkinsBase?.find(skin => skin.imageKey === dango.baseSkin);
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
        console.log("バッチ処理完了時刻：未確認ケアを再取得");
        mutateUnconfirmCare();
        mutateDango();
      }
    };
    
    const interval = setInterval(checkBatchCompletion, 60000);
    
    checkBatchCompletion();
    
    return () => clearInterval(interval);
  }, [mutateUnconfirmCare, mutateDango]);

  const handleNextResult =  async() => {
    if (!unconfirmCares || unconfirmCares.length === 0) return;
    const currentCare = unconfirmCares[currentResultIndex];
    
    try {
      await careRepository.confirmCare(currentCare.id);
    } catch (error) {
      console.error("ケア確認に失敗しました:", error);
    } 

    // 団子が壊れた場合は、残りの未確認ケアも全て確認済みにする
    if (String(currentCare.dango.damageLevel) === "4") {
      try {
        // 死亡した団子のデータを保存
        setDeadDangoData({
          damageLevel: currentCare.dango.damageLevel,
          growthStage: currentCare.dango.growthStage,
          headSkin: currentCare.dango.headSkin,
          bodySkin: currentCare.dango.bodySkin,
          baseSkin: currentCare.dango.baseSkin,
          totalDaysAlive: currentCare.dango.totalDaysAlive,
        });
        
        // 残りの未確認ケアを全て確認
        for (let i = currentResultIndex + 1; i < unconfirmCares.length; i++) {
          await careRepository.confirmCare(unconfirmCares[i].id);
        }
        // 結果モーダルを閉じて、死亡モーダルを表示
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
  }

  const handleNewDango = async () => {
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
  }

  const currentResult = unconfirmCares?.[currentResultIndex];

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
    } catch (error) {
      console.error("ケア実行に失敗しました:", error);
    } finally {
      mutateCurrentCare();
    }
  }

  const { weather, weatherLoading } = useWeather();
  const weatherType = (weather as any)?.weather;

  // 初回データ取得中はスケルトンを表示
  if (!dango || weatherLoading) {
    return <SkeletonHome />;
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
          <div className="absolute bottom-0 right-[165px] ">
            {weatherType === "sunny" ? (
                <Image
                src="/images/sunny-morning.png"
                alt="cloud"
                width={320}
                height={240}
                className="min-w-[320px] h-auto w-full object-cover"
              />
            ) : weatherType === "rainy" ? (
              <Image
                src="/images/rainy.png"
                alt="rainy"
                width={320}
                height={240}
                className="min-w-[320px] h-auto w-full object-cover"
              />
            ) : (
              <Image
                src="/images/cloudy.png"
                alt="cloudy"
                width={320}
                height={240}
                className="min-w-[320px] h-auto w-full object-cover"
              />
            )}
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
            <div className="w-full flex flex-col items-center mt-10">
              <div 
                className="w-[200px] h-[200px] mt-5"
                onClick={() => setShowCustomModal(true)}
              >
                <Muddy 
                  face="normal"
                  headSkin={dango?.headSkin ?? undefined}
                  bodySkin={dango?.bodySkin ?? undefined}
                  baseSkin={dango?.baseSkin ?? undefined}
                  growthStage={dango?.growthStage ?? "1"}
                  damageLevel={dango?.damageLevel ?? "1"}
                />
              </div>
              <button
                className={cn(
                  "relative h-[70px] w-full mt-15",
                  // !isCountdownActive() ? "opacity-50 cursor-not-allowed" : ""
                )}
                // disabled={!isCountdownActive()}
                onClick={() => setShowCareModal(true)}
              >
                <div className="absolute top-0 left-0 w-full h-[66px] flex items-center justify-center bg-accent rounded-full z-30">
                  <p className="text-white text-center text-lg">
                    {currentCare ? "別のケアをしてあげる？" : "今日のケアはどうする？"}
                  </p>
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
        mutateDango={mutateDango}
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
      <SelectModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title="ケア結果"
        buttonProps={{
          label: String(currentResult?.dango.damageLevel) === "4" ? "新しい団子を作る" : "閉じる",
          onClick:  () => {
            handleNextResult();
          },
          shadow: true,
        }}
      >
        {currentResult && (
          <div className="flex flex-col gap-6 items-center justify-center w-full">
            <div className="w-full flex-col gap-5 bg-white rounded-sm flex items-center justify-center pt-10 pb-5">
              <div className="w-[140px] h-[140px] flex justify-center items-center">
                <Muddy
                  face={currentResult.isCorrect ? "happy" : "sad"}
                  growthStage={currentResult.dango.growthStage}
                  damageLevel={currentResult.dango.damageLevel}
                  headSkin={dango?.headSkin ?? undefined}
                  bodySkin={dango?.bodySkin ?? undefined}
                  baseSkin={dango?.baseSkin ?? undefined}
                  scale="scale-[0.6]"
                />
              </div>
              {String(currentResult.dango.damageLevel) === "4" ? (<p className="text-lg text-center">今までありがとう...</p>)
              : (currentResult.isCorrect ? <p className="text-lg text-center">無事だったよー！</p> : <p className="text-lg text-center">ちょっと溶けちゃったよ</p>)}
            </div>
            {currentResult.isCorrect && (
              <div className="flex gap-3 items-center">
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
                <p>{currentResult.pointsEarned}</p>
              </div>
            )}
          </div>
        )}
      </SelectModal>
      
      {/* 団子死亡モーダル */}
      {showDangoDeathModal && deadDangoData && (
        <DangoDeathModal
          isOpen={showDangoDeathModal}
          onClose={() => setShowDangoDeathModal(false)}
          onCreateNewDango={handleNewDango}
          dango={deadDangoData}
        />
      )}
    </main>
  );
}
