"use client";

import { motion, AnimatePresence } from "framer-motion"

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const ProfileModal = ({
  isOpen,
  onClose,
  children,
  title,
}: ProfileModalProps) => {
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
            className="absolute inset-0 bg-black"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* モーダル本体 */}
          <motion.div 
            className="relative bg-radial-close rounded-lg flex flex-col items-center justify-center text-center max-w-[360px] w-full overflow-hidden"
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
            <div className="bg-main text-white text-lg py-4 w-full text-center">
              {title}
            </div>
            <div className="pt-7 p-3 flex flex-col gap-7 w-full ">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};