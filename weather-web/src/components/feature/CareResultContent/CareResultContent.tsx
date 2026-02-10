import React from "react";
import Image from "next/image";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import type { UnConfirmResponse } from "@/types/care";
import type { Dango } from "@/types/dango";

interface CareResultContentProps {
  currentResult: UnConfirmResponse;
  dango: Pick<Dango, "headSkin" | "bodySkin" | "baseSkin"> | null;
}

export const CareResultContent = React.memo(
  ({ currentResult, dango }: CareResultContentProps) => {
    const isDead = String(currentResult.dango.damageLevel) === "4";

    return (
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
          {isDead ? (
            <p className="text-lg text-center">今までありがとう...</p>
          ) : currentResult.isCorrect ? (
            <p className="text-lg text-center">無事だったよー！</p>
          ) : (
            <p className="text-lg text-center">ちょっと溶けちゃったよ</p>
          )}
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
    );
  }
);

CareResultContent.displayName = "CareResultContent";
