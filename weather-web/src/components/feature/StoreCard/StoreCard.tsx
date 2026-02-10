"use client";

import { useState } from "react";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import { Icons } from "@/components/shea/icon";
import Image from "next/image";
import { SelectModal } from "@/components/shea/SelectModal/SelectModal";
import { PrimaryButton } from "@/components/shea/PrimaryButton/PrimaryButton";

export interface StoreCardProps {
  title: string;
  price: number;
  onClick: () => void;
  currentPoint: number;
  isOwned: boolean;
  imageKey: string;
  category: "head" | "body" | "base";
}

export const StoreCard = ({
  title,
  price,
  currentPoint,
  isOwned,
  onClick,
  imageKey,
  category,
}: StoreCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePurchase = () => {
    if (currentPoint - price > 0) {
      onClick();
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="bg-radial rounded-md py-3 px-1 flex flex-col justify-center items-center">
        <div className="flex items-center justify-center w-20 h-20 relative">
          <Muddy
            face="normal"
            growthStage="1"
            damageLevel="1"
            scale="scale-[0.4]"
            headSkin={category === "head" ? imageKey : undefined}
            bodySkin={category === "body" ? imageKey : undefined}
            baseSkin={category === "base" ? imageKey : undefined}
          />
        </div>
        <p className="text-xs mt-5 mb-2">{title}</p>
        <PrimaryButton
          label={isOwned ? "所持済み" : `${price}P`}
          onClick={() => setIsOpen(true)}
          icon={
            isOwned ? undefined : (
              <div className="h-4 w-[15px] relative">
                <div className="bg-points rounded-full flex items-center justify-center p-[1.5px] h-[15px] w-full relative z-10">
                  <Image
                    src="/images/coin.svg"
                    alt="coin"
                    width={12}
                    height={12}
                  />
                </div>
                <span className="bg-points-dark rounded-full absolute bottom-0 right-0 h-[15px] w-full z-0" />
              </div>
            )
          }
          shadow={true}
          py="py-2"
          variant={isOwned ? "secondary" : "accent"}
          fontSize="text-xs"
          fontFamily="font-sen"
        />
      </div>
      <SelectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonProps={{
          disabled: currentPoint - price <= 0,
          label: "OK",
          onClick: () => {
            handlePurchase();
          },
          shadow: true,
          variant: "accent",
        }}
        title="本当に購入しますか？"
      >
        <div className="bg-white rounded-sm py-10 px-11 flex items-center gap-6">
          <div className="h-19 w-18 relative">
            <div className="bg-points rounded-full flex items-center justify-items-center p-[10px] h-18 w-full relative z-10">
              <Image src="/images/coin.svg" alt="coin" width={52} height={52} />
            </div>
            <span className="bg-points-dark rounded-full absolute bottom-0 right-0 h-18 w-full z-0" />
            <p className="text-lg translate-x-1/2 text-black absolute bottom-0 right-0 font-sen z-20">
              {currentPoint}
            </p>
          </div>
          <Icons.ArrowRight className="w-10 text-2xl" />
          <div className="h-19 w-18 relative">
            <div className="bg-points rounded-full flex items-center justify-items-center p-[10px] h-18 w-full relative z-10">
              <Image src="/images/coin.svg" alt="coin" width={52} height={52} />
            </div>
            <span className="bg-points-dark rounded-full absolute bottom-0 right-0 h-18 w-full z-0" />
            <p className="text-lg translate-x-1/2 text-black absolute bottom-0 right-0 font-sen z-20">
              {currentPoint - price > 0 ? currentPoint - price : 0}
            </p>
          </div>
        </div>
      </SelectModal>
    </>
  );
};
