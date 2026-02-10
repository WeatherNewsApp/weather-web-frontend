import React from "react";
import Image from "next/image";

interface HomeHeaderProps {
  userPoint: number;
  weatherType: "sunny" | "rainy" | "cloudy";
  onMenuClick: () => void;
}

export const HomeHeader = React.memo(
  ({ userPoint, weatherType, onMenuClick }: HomeHeaderProps) => {
    return (
      <div className="w-full flex flex-col items-end gap-4 relative ">
        <div className="flex items-center justify-between gap-1 pr-3 bg-white rounded-full shadow-md w-25">
          <div className="pb-[2px] w-8 flex relative">
            <div className="w-8 h-8 bg-points rounded-full relative z-10 p-1">
              <Image
                src="/images/coin.svg"
                alt="points"
                width={32}
                height={32}
                priority
              />
            </div>
            <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-points-dark z-0" />
          </div>
          <p className="text-accent font-sen">{userPoint}</p>
        </div>
        <div className="absolute bottom-0 right-[165px] w-[80vw] max-w-[320px]">
          {weatherType === "sunny" ? (
            <Image
              src="/images/sunny-morning.png"
              alt="cloud"
              width={320}
              height={240}
              className="max-w-[320px] h-auto w-full object-cover w-[80vw]"
              priority
            />
          ) : weatherType === "rainy" ? (
            <Image
              src="/images/rainy.png"
              alt="rainy"
              width={320}
              height={240}
              className="max-w-[320px] h-auto w-full object-cover w-[80vw]"
              priority
            />
          ) : (
            <Image
              src="/images/cloudy.png"
              alt="cloudy"
              width={320}
              height={240}
              className="max-w-[320px] h-auto w-full object-cover w-[80vw]"
              priority
            />
          )}
        </div>
        <div className="w-16 h-[66px] relative" onClick={onMenuClick}>
          <div className="w-16 h-16 bg-main rounded-full flex flex-col gap-2 items-center justify-center relative z-20">
            <span className="w-8 h-[2px] bg-white rounded-[2px]"></span>
            <span className="w-8 h-[2px] bg-white rounded-[2px]"></span>
            <span className="w-8 h-[2px] bg-white rounded-[2px]"></span>
          </div>
          <span className="absolute bottom-0 left-0 w-16 h-16 bg-main-dark rounded-full z-10" />
        </div>
      </div>
    );
  }
);

HomeHeader.displayName = "HomeHeader";
