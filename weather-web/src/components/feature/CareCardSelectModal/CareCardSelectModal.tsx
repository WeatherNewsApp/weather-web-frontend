"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";

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
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const cards = [
    { id: 1, value: "sunny", name: "お水をあげる" },
    { id: 2, value: "cloudy", name: "拭いてあげる" },
    { id: 3, value: "rainy", name: "傘を刺してあげる" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
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
            className="relative z-10 w-full max-w-[460px] mx-auto"
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
            <Swiper
              modules={[EffectCoverflow]}
              effect="coverflow"
              centeredSlides={true}
              slidesPerView="auto"
              initialSlide={initialIndex}
              spaceBetween={40}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
              className="w-full px-6"
            >
              {cards.map((card) => (
                <SwiperSlide key={card.id} className="!w-auto">
                  <div className="bg-radial flex p-6 w-fit flex-col items-center justify-center rounded-lg gap-20 h-[400px]">
                    <div className="flex flex-col p-2 border-4 border-border-main rounded-full items-center justify-center">
                      <div className="rounded-full bg-white w-[200px] h-[200px] flex items-center justify-center">
                        <Image
                          src={`/images/${card.value}-trace.png`}
                          alt={card.name}
                          width={150}
                          height={200}
                          className="h-auto"
                        />
                      </div>
                    </div>
                    <p className="text-lg ">{card.name}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              onClick={() => {
                const selectedValue = cards[activeIndex].value as
                  | "sunny"
                  | "cloudy"
                  | "rainy";
                onSelect(selectedValue);
              }}
              className="mt-8 w-full h-[57px] relative text-white py-3 rounded-full flex items-center justify-center"
            >
              <div className="bg-accent w-fit rounded-full py-4 px-10 flex items-center jusitfy-center text-white text-sm relative z-10">
                このケアをしてあげる
              </div>
              <span className="bg-accent-dark rounded-full w-[220px] h-[53px] absolute bottom-0 z-0" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
