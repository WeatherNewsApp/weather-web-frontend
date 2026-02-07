"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareModal = ({
  isOpen,
  onClose,
}: CareModalProps) => {
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
              duration: 0.4,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
          >
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}