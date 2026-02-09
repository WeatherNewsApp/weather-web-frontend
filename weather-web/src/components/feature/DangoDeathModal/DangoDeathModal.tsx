"use client";

import { SelectModal } from "@/components/shea/SelectModal/SelectModal";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import type { Dango } from "@/types/dango";

interface DangoDeathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNewDango: () => void;
  dango: Pick<Dango, 'damageLevel' | 'growthStage' | 'headSkin' | 'bodySkin' | 'baseSkin' | 'totalDaysAlive'>;
}

export const DangoDeathModal = ({
  isOpen,
  onClose,
  onCreateNewDango,
  dango,
}: DangoDeathModalProps) => {
  return (
    <SelectModal
      isOpen={isOpen}
      onClose={onClose}
      title="どろ団子が..."
      buttonProps={{
        label: "新しい団子を育てる",
        onClick: onCreateNewDango,
        shadow: true,
        variant: "accent",
        py: "py-4",
      }}
    >
      <div className="flex flex-col gap-6 items-center justify-center w-full">
        <div className="w-full flex-col gap-5 bg-white rounded-sm flex items-center justify-center py-6">
          <div className="w-[140px] h-[140px] flex justify-center items-center">
            <Muddy
              face="sad"
              growthStage={dango.growthStage}
              damageLevel="5"
              headSkin={dango.headSkin}
              bodySkin={dango.bodySkin}
              baseSkin={dango.baseSkin}
              scale="scale-[0.6]"
            />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <p className="text-lg text-center">今までありがとう...</p>
            <div className="flex gap-2 items-end">
              <p className="text-2xl font-sen">{dango.totalDaysAlive}</p>
              <span className="text-md pb-1">日間一緒だったね</span>
            </div>
          </div>
        </div>
      </div>
    </SelectModal>
  );
};
