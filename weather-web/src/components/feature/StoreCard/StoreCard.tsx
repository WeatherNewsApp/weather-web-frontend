"use client";
import { useState } from "react";

import {Icons} from "@/components/shea/icon";
import Image from "next/image";
import { SelectModal } from "@/components/shea/SelectModal/SelectModal";
import { PrimaryButton } from "@/components/shea/PrimaryButton/PrimaryButton";

export interface StoreCardProps {
  title: string;
  price: number;
  image: string;
  onClick: () => void;
  currentPoint: number;
  isOwned: boolean;
}

export const StoreCard = ({
  title,
  price,
  image,
  currentPoint,
  isOwned,
}: StoreCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // 一旦ここまで
  // const { data: user } = useGet<UserResponse>()

  return (
    <>
      <div className="bg-radial rounded-md py-3 px-1 flex flex-col justify-center items-center">
        {/* ダミー  API疎通後に変更 */}
        <Image
          src="/images/dummy-image.png"
          alt="dummy"
          width={80}
          height={80}
        />
        <p className="text-xs mt-5 mb-2">{title}</p>
        <PrimaryButton
          label={isOwned ? "所持済み" : `${price}P`}
          onClick={() => setIsOpen(true)}
          // isOwendがtrueの場合はiconを表示しない
          icon={ isOwned ? undefined : (
            <div className="h-4 w-[15px] relative">
              <div className="bg-points rounded-full flex items-center justify-center p-1 h-[15px] w-full relative z-10">
                <Image
                  src="/images/dummy-image.png"
                  alt="dummy"
                  width={8}
                  height={8}
                />
              </div>
              <span className="bg-points-dark rounded-full absolute bottom-0 right-0 h-[15px] w-full z-0" />
            </div>
          )}
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
          label: "OK",
          onClick: () => {
            //TODO: 購入処理を追加
          },
          shadow: true,
          variant: "accent",
        }}
        title="本当に購入しますか？"
      >
        <div className="bg-white rounded-sm py-10 px-11 flex items-center gap-6">
          <div className="h-19 w-18 relative">
            <div className="bg-points rounded-full flex items-center jusitfy-items-center p-[10px] h-18 w-full relative z-10">
              <Image
                src="/images/dummy-image.png"
                alt="dummy"
                width={52}
                height={52}
              />
            </div>
            <span className="bg-points-dark rounded-full absolute bottom-0 right-0 h-18 w-full z-0" />
            <p className="text-lg translate-x-1/2 text-black absolute bottom-0 right-0 font-sen z-20">{currentPoint}</p>
          </div>
          <Icons.ArrowRight className="w-10 text-2xl"/>
          <div className="h-19 w-18 relative">
            <div className="bg-points rounded-full flex items-center jusitfy-items-center p-[10px] h-18 w-full relative z-10">
              <Image
                src="/images/dummy-image.png"
                alt="dummy"
                width={52}
                height={52}
              />
            </div>
            <span className="bg-points-dark rounded-full absolute bottom-0 right-0 h-18 w-full z-0" />
            <p className="text-lg translate-x-1/2 text-black absolute bottom-0 right-0 font-sen z-20">{price}</p>
          </div>
        </div>
      </SelectModal>
    </>
  );
};
