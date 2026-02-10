import React from "react";
import { CareMessage } from "@/components/feature/CareMessage/CareMessage";
import { MuddyDisplay } from "@/components/feature/MuddyDisplay/MuddyDisplay";
import type { Dango } from "@/types/dango";
import type { CareType } from "@/types/care";

interface MainContentProps {
  dango: Pick<
    Dango,
    "headSkin" | "bodySkin" | "baseSkin" | "growthStage" | "damageLevel"
  >;
  isCountdownActive: boolean;
  currentCare: CareType | null;
  onDangoClick: () => void;
  onCareClick: () => void;
}

export const MainContent = React.memo(
  ({
    dango,
    isCountdownActive,
    currentCare,
    onDangoClick,
    onCareClick,
  }: MainContentProps) => {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        {/* sppech bubble */}
        <CareMessage currentCare={currentCare} />
        {/* Dango Display */}
        <MuddyDisplay
          dango={dango}
          isCountdownActive={isCountdownActive}
          onDangoClick={onDangoClick}
          onCareClick={onCareClick}
          currentCare={currentCare ?? "cloudy"}
        />
      </div>
    );
  }
);

MainContent.displayName = "MainContent";
