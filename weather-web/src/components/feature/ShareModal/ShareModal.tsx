"use client";

import { motion, AnimatePresence } from "framer-motion";

import { HistoryDango } from "@/components/feature/HistoryDango/HistoryDango";
import { Icons } from "@/components/shea/icon";

import type { Dango } from "@/types/dango";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >

          {/* オーバーレイ */}
          <motion.div
            className="absolute inset-0 bg-black opacity-60 "
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* モーダル本体 */}
          <motion.div 
            className="relative z-40 w-full max-w-[360px]" 
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
            <HistoryDango
              {...bestDango as Dango}
            />
          </motion.div>
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}