import{ Muddy } from "@/components/shea/Muddy/Muddy";
import type { Dango } from "@/types/dango";
import { HistoryDango } from "@/components/feature/HistoryDango/HistoryDango";
import { Icons } from "@/components/shea/icon";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  bestDango?: Omit<Dango, "id">;
}

export const ShareModal = ({
  isOpen,
  onClose,
  bestDango
}: ShareModalProps) => {
  if (!isOpen || !bestDango) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black opacity-60 "
        onClick={onClose}
      ></div>
      <div className="relative z-40 w-full">
        <HistoryDango
          {...bestDango}
        />
      </div>
      <button
        className="rounded-full h-15 text-white relative mt-8"
        onClick={onClose}
      >
        <span className="py-4 px-10 flex bg-accent items-center jusitfy-center gap-[10px] rounded-full relative z-10">
          <Icons.sns className="w-6 h-6 text-white" strokeWidth={1.2} />
          <p className="text-sm">みんなと共有する</p>
        </span>
        <span className="bg-accent-dark rounded-full absolute bottom-0 left-0 w-full h-14" />
      </button>
    </div>
  )
}