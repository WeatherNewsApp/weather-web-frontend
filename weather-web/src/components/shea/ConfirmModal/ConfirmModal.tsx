"use client";

import { motion, AnimatePresence } from "framer-motion";

import type { Dango } from "@/types/dango";
import { Muddy } from "@/components/shea/Muddy/Muddy";

interface ConfirmModalProps {
  dango: Omit<Dango, "id">;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: React.ReactNode;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
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
}: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* オーバーレイ */}
          <motion.div
            className="absolute inset-0 bg-black opacity-80"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* モーダル本体 */}
          <motion.div 
            className="relative bg-radial-close rounded-lg pt-10 px-3 pb-4 flex flex-col items-center justify-center text-center max-w-[360px] w-full"
            initial={{ opacity: 0, scale: 0.9, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
          >
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
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
  );
};
