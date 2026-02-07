"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

interface CareCardSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: "sunny" | "cloudy" | "rainy") => void;
  initialIndex?: number;
}

export const CareCardSelectModal = ({
  isOpen,
  onClose,
  onSelect,
  initialIndex = 1,
}: CareCardSelectModalProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const cards = [
    {id: 1, value: "sunny"},
    {id: 2, value: "cloudy"},
    {id: 3, value: "rainy"},
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: [0.5],
      }
    );

    const cards = container.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [isOpen]);

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
          className="absolute inset-0 bg-black opacity-60"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* モーダル */}
        <motion.div 
          className="relative z-10 w-full"
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
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide"
            >
              {cards.map((card, index) => (
                <motion.div 
                  key={card.id}
                  data-index={index}
                  className={cn(
                    "snap-center min-w-[80%] bg-radial flex p-6 flex-col items-center justify-center rounded-lg gap-20 h-[400px]",
                    activeIndex !== index && "scale-[0.9]",
                  )}
                >
                  <div className="flex flex-col p-2 border-4 border-border-main rounded-full items-center justify-center">
                    <Image 
                      src="/images/dummy-image.png"
                      alt="dummy-iamge"
                      width={200}
                      height={200}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => {
              const selectedValue = cards[activeIndex].value as "sunny" | "cloudy" | "rainy";
              onSelect(selectedValue);
            }}
            className="mt-8 w-full h-[57px] relative text-white py-3 rounded-full flex items-center justify-center"
          >
            <div className="bg-accent w-fit rounded-full py-4 px-10 flex items-center jusitfy-center text-white text-sm relative z-10">
              このケアをしてあげる
            </div>
            <span className="bg-accent-dark rounded-full w-[220px] h-[53px] absolute bottom-0 z-0"/>
          </button>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
