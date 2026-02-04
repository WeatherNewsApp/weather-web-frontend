"use client";
import type { BestDango } from "@/types/dango";
import { Muddy } from "@/components/shea/Muddy/Muddy";

interface ConfirmModalProps {
  dango: Omit<BestDango, "id">;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: React.ReactNode;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  componentId?: string;
}

export const ConfirmModal = ({
  dango,
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "確認",
  cancelText = "キャンセル",
  componentId = "default",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black opacity-80"
        onClick={onClose}
      ></div>

      <div className="relative bg-radial-close rounded-lg pt-10 px-3 pb-4 flex flex-col items-center justify-center text-center max-w-[360px] w-full">
        {/* ここに本当はコンポーネント団子が入る予定 */}
        <Muddy 
          face="sad"
          scale="scale-[0.9]"
          {...dango}
        />
        <h3 className="text-lg text-center mt-6">{title}</h3>
        <p className="mt-3">{message}</p>
        <div className="flex gap-2 w-full mt-6">
          <button className="relative w-full" onClick={onClose}>
            <div className="text-black bg-white rounded-sm w-full py-3 relative z-20">
              {cancelText}
            </div>
            <span className="absolute w-full h-full bg-white-dark rounded-sm top-1 left-0 z-10" />
          </button>
          <button className="relative w-full" onClick={onConfirm}>
            <div className="text-white bg-error rounded-sm w-full py-3 relative z-20">
              {confirmText}
            </div>
            <span className="absolute w-full h-full bg-error-dark rounded-sm top-1 left-0 z-10" />
          </button>
        </div>
      </div>
    </div>
  );
};
