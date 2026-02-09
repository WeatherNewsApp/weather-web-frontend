"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { SelectModal } from "@/components/shea/SelectModal/SelectModal";
import type { Mission } from "@/types/mission";
import type { Achievement } from "@/types/achievement";

type MissionItemProps = (
  | (Mission & {
      skin: null;
    })
  | Achievement
) & {
  onClaim: () => void;
};

export const MissionItem = ({ ...props }: MissionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const MissionIcons = {
    care: "/images/care-type.svg",
    consecutive: "/images/consecutive-type.svg",
    total_alive: "/images/alive-type.svg",
    login: "/images/consecutive-type.svg",
  };

  const progressRatio =
    props.progress > 0 ? Math.min(props.progress / props.requiredCount, 1) : 0;

  return (
    <>
      <div className="flex justify-between gap-5 px-2 py-5 rounded-md bg-radial shadow-md h-fit">
        <div className="flex gap-2 h-full w-full">
          <div className="flex items-center justify-center px-1 py-3 bg-white border border-border-main rounded-full relative min-w-15  min-h-15 max-w-15 max-h-15">
            {props.type === "consecutive" || props.type === "login" ? (
              <span className="absolute top-[60%] left-1/2 -translate-1/2 text-center text-lg font-sen">
                {props.requiredCount}
              </span>
            ) : (
              <span className="absolute top-2 left-[6px] text-lg font-sen">
                {props.requiredCount}
              </span>
            )}
            <Image
              src={MissionIcons[props.type]}
              alt={props.type}
              width={60}
              height={60}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-between w-full">
            <p className="text-sm">{props.title}</p>
            <div className="flex justify-center items-center bg-white p-[2px] rounded-sm w-full">
              <div className="flex w-full h-5 bg-gray items-center justify-center rounded-xs relative overflow-hidden">
                <p className="relative z-20 text-sm">{`${props.progress} / ${props.requiredCount}`}</p>
                <div
                  className="absolute left-0 top-0 z-10 h-full bg-points-dark"
                  style={{
                    width: `${progressRatio * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "w-[66px] h-15 relative",
            props.isCompleted ? "opacity-100" : "opacity-40"
          )}
        >
          <div
            className={cn(
              "w-[66px] relative z-10 h-14 rounded-sm flex items-center justify-center",
              props.isClaimed ? "bg-main" : "bg-accent"
            )}
          >
            <p className="text-white text-sm">
              {props.isClaimed ? "表示" : "獲得"}
            </p>
          </div>
          <span
            className={cn(
              "absolute bottom-0 right-0 w-full h-14 rounded-sm z-0",
              props.isClaimed ? "bg-main-dark" : "bg-accent-dark"
            )}
          />
        </button>
      </div>
      <SelectModal
        title="獲得"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonProps={{
          label: props.isCompleted && !props.isClaimed ? "獲得" : "閉じる",
          onClick: () => {
            if (props.isCompleted && !props.isClaimed) {
              props.onClaim();
            }
            setIsOpen(false);
          },
          type: "button",
          shadow: true,
          variant: props.isCompleted ? "accent" : "secondary",
          disabled: false,
        }}
      >
        <div className="flex justify-center items-center gap-5 bg-white rounded-sm w-full py-10">
          <div className="flex items-end">
            <div className="pb-1 w-18 flex relative">
              <div className="w-18 h-18 bg-points rounded-full flex items-center justify-center relative z-10">
                <Image
                  src="/images/coin.svg"
                  alt="points"
                  width={60}
                  height={60}
                  className="w-full max-w-15 max-h-15 h-full object-contain"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-18 h-18 rounded-full bg-points-dark z-0" />
            </div>
            <p className="text-sm font-sen">×{props.point}</p>
          </div>
          {props.skin && (
            <div className="flex flex-col items-center gap-1">
              <Image
                src={props.skin.image}
                alt={props.skin.name}
                width={80}
                height={80}
              />
              <p className="text-xs">{props.skin.name}</p>
            </div>
          )}
        </div>
      </SelectModal>
    </>
  );
};
