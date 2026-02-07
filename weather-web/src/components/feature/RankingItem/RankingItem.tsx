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
}

export const RankingItem = ({
  rank,
  name,
  days,
  dango,
}: RankingUser) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        key={rank}
        className="flex items-center justify-between shadow-md rounded-md p-2 bg-radial"
      >
        <div className="flex gap-3">
          {/* <Image
            src="/images/dummy-image.png"
            alt="dummy-avatar"
            width={52}
            height={52}
          /> */}
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
          <div className="w-full flex items-center justify-center bg-white py-5 rounded-sm">
            <Image
              src="/images/dummy-image.png"
              alt="dummy-image"
              width={120}
              height={120}
            />
          </div>
        </div>
      </ProfileModal>
    </>
  );
};