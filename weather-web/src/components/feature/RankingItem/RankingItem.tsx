"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProfileModal } from "@/components/shea/ProfileModal/ProfileModal";
import type { Dango } from "@/types/dango";
import { Muddy } from "@/components/shea/Muddy/Muddy";

export interface RankingUser {
  rank: number;
  name: string;
  days: number;
  dango: Pick<Dango, 'damageLevel' | 'growthStage' | 'headSkin' | 'bodySkin' | 'baseSkin'>;
  prediction: string | null;
}

export const RankingItem = ({
  rank,
  name,
  days,
  dango,
  prediction
}: RankingUser) => {
  const [isOpen, setIsOpen] = useState(false);

  // ケアアイコンのマッピング
  const getCareIcon = (prediction: string | null) => {
    if (!prediction) return null;
    
    switch (prediction) {
      case 'sunny':
        return '/images/sunny-trace.png';
      case 'cloudy':
        return '/images/cloudy-trace.png';
      case 'rainy':
        return '/images/rainy-trace.png';
      default:
        return null;
    }
  };  

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        key={rank}
        className="flex items-center justify-between shadow-md rounded-md p-2 bg-radial"
      >
        <div className="flex gap-3">
          <div className="w-13 h-13 flex items-center justify-center">
            <Muddy
              {...dango}
              face="normal"
              scale="scale-[0.25]"
            />
          </div>
          <div className="flex flex-col ">
            <p className="text-sm font-sen">{name}</p>
            <p className="text-lg font-sen">
              {days} <span className="text-xs">日</span>
            </p>
          </div>
        </div>
        <div
          className={cn(
            "flex justify-center items-center text-2xl font-sen rounded-sm w-13 h-13",
            (rank === 1 || rank === 2 || rank === 3) && "bg-accent text-white"
          )}
        >
          <p>{rank}</p>
        </div>
      </div>
      <ProfileModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="プロフィール"
      >
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="w-20 h-20 flex items-center justify-center">
            <Muddy 
              {...dango}
              face="normal"
              scale="scale-[0.4]"
            />
          </div>
          <p className="text-lg font-sen">{name}</p>
          <div className="flex gap-2 items-end justify-center">
            <p className="text-2xl font-sen ">{days}</p>
            <span className="text-md pb-1">日</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full items-center justify-center">
          <p className="text-sm text-left w-full">ユーザーが選んだケア</p>
          <div className="w-full flex items-center justify-center gap-4 bg-white py-5 rounded-sm">

            <div className="flex flex-col items-center gap-2">
              {prediction ? (
                <div className="w-30 h-30 relative">
                  <Image
                    src={getCareIcon(prediction) || '/images/dummy-image.png'}
                    alt={`${prediction}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-30 h-30 flex items-center justify-center">
                </div>
              )}
            </div>
          </div>
        </div>
      </ProfileModal>
    </>
  );
};