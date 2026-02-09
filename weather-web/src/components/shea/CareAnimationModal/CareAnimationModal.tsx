"use client";

import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect } from "react";

import sunny from "../../../../public/animations/sunny.json";
import rainy from "../../../../public/animations/rainy.json";
import cloudy from "../../../../public/animations/cloudy.json";

interface CareAnimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  careType: "sunny" | "cloudy" | "rainy";
  title: string;
}

export const CareAnimationModal = ({
  isOpen,
  onClose,
  careType,
  title,
}: CareAnimationModalProps) => {
  const animationMap = {
    sunny: sunny,
    cloudy: cloudy,
    rainy: rainy,
  };

  const selectedAnimation = animationMap[careType];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

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
              duration: 0.4,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-main text-white text-lg py-4 w-full text-center">
              {title}
            </div>
            <div className="py-10 bg-white w-full h-[280px]">
              <Lottie
                animationData={selectedAnimation}
                loop={false}
                autoplay={true}
                style={{ width: "auto", height: "100%" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
