import React from "react";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import { cn } from "@/lib/utils";
import type { Dango } from "@/types/dango";

interface MuddyDisplayProps {
  dango: Pick<
    Dango,
    "headSkin" | "bodySkin" | "baseSkin" | "growthStage" | "damageLevel"
  >;
  isCountdownActive: boolean;
  onDangoClick: () => void;
  onCareClick: () => void;
  currentCare: "sunny" | "cloudy" | "rainy" | null;
}

export const MuddyDisplay = React.memo(
  ({
    dango,
    onDangoClick,
    onCareClick,
    isCountdownActive,
    currentCare,
  }: MuddyDisplayProps) => {
    return (
      <div className="w-full flex flex-col items-center mt-10">
        <div className="w-[200px] h-[200px]" onClick={onDangoClick}>
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
            !isCountdownActive ? "opacity-50 cursor-not-allowed" : ""
          )}
          disabled={!isCountdownActive}
          onClick={onCareClick}
        >
          <div className="absolute top-0 left-0 w-full h-[66px] flex items-center justify-center bg-accent rounded-full z-30">
            <p className="text-white text-center text-lg">
              {currentCare ? "別のケアをしてあげる?" : "今日のケアはどうする？"}
            </p>
          </div>
          <span className="absolute bottom-0 left-0 w-full h-[66px] bg-accent-dark rounded-full z-20" />
        </button>
      </div>
    );
  }
);

MuddyDisplay.displayName = "MuddyDisplay";
