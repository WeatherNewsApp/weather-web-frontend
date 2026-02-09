"use client";

import styles from "./Muddy.module.css";
import { getSkinImagePath } from "@/lib/imageMapping";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface MuddyProps {
  face: "normal" | "happy" | "sad";
  headSkin?: string;
  bodySkin?: string;
  baseSkin?: string;
  growthStage: "1" | "2" | "3" | "4" | "5";
  damageLevel: "1" | "2" | "3" | "4" | "5";
  scale?: string;
  enableAnimation?: boolean;
}

export const Muddy = ({
  face,
  headSkin,
  bodySkin,
  baseSkin,
  growthStage,
  damageLevel,
  scale = "scale-[0.9]",
  enableAnimation = true,
}: MuddyProps) => {
  const [isJumping, setIsJumping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [dragDirection, setDragDirection] = useState({ x: 0, y: 0 });

  const handleClick = () => {
    if (enableAnimation && !isDragging) {
      setIsJumping(true);
    }
  };

  // 引っ張られた距離に応じて表情を決定
  const getCurrentFace = (): "normal" | "happy" | "sad" => {
    if (!isDragging) return face;
    if (dragDistance > 80) return "sad"; // 驚き顔（sadを使用）
    if (dragDistance > 40) return "sad"; // 困り顔
    return "normal";
  };

  // 目線の移動量を計算（引っ張る方向に目が動く）
  const getEyeOffset = () => {
    if (!isDragging) return { x: 0, y: 0 };
    const maxOffset = 3; // 最大移動量（px）
    const normalizedX = (dragDirection.x / 100) * maxOffset;
    const normalizedY = (dragDirection.y / 100) * maxOffset;
    return { x: normalizedX, y: normalizedY };
  };

  const eyeOffset = getEyeOffset();
  const currentFace = getCurrentFace();
  const faceContent = {
    normal: (
      <>
        <div
          className={styles.muddyBodyEyeLeftContainerNormal}
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          <div className={styles.muddyBodyEyeLeftNormal}>
            <span className={styles.muddyBodyEyeLeftHighlightBigNormal}></span>
            <span
              className={styles.muddyBodyEyeLeftHighlightSmallNormal}
            ></span>
          </div>
        </div>
        <div
          className={styles.muddyBodyEyeRightContainerNormal}
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          <div className={styles.muddyBodyEyeRightNormal}>
            <span className={styles.muddyBodyEyeRightHighlightBigNormal}></span>
            <span
              className={styles.muddyBodyEyeRightHighlightSmallNormal}
            ></span>
          </div>
        </div>
        <div className={styles.muddyBodyMouthNormal}></div>
        <div className={styles.muddyBodyCheekNormal}>
          <div className={styles.muddyBodyCheekLeftNormal}></div>
          <div className={styles.muddyBodyCheekRightNormal}></div>
        </div>
      </>
    ),
    happy: (
      <>
        <div
          className={styles.muddyBodyEyeLeftHappy}
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        ></div>
        <div
          className={styles.muddyBodyEyeRightHappy}
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        ></div>
        <div className={styles.muddyBodyMouthHappy}></div>
        <div className={styles.muddyBodyCheekLeftHappy}></div>
        <div className={styles.muddyBodyCheekRightHappy}></div>
      </>
    ),
    sad: (
      <>
        <div
          className={styles.muddyBodyEyeLeftContainerSad}
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          <div className={styles.muddyBodyEyeLeftSad}></div>
          <div className={styles.muddyBodyEyeLeftTearsSad}></div>
        </div>
        <div
          className={styles.muddyBodyEyeRightContainerSad}
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          <div className={styles.muddyBodyEyeRightSad}></div>
          <div className={styles.muddyBodyEyeRightTearsSad}></div>
        </div>
        <div className={styles.muddyBodyMouthSad}>
          <div className={styles.muddyBodyMouthBlackSad}></div>
          <div className={styles.muddyBodyMouthPinkSad}></div>
        </div>
      </>
    ),
  };

  const sproutContent = {
    1: <></>,
    2: (
      <div className={styles.muddyBodySprout}>
        <Image src="/images/sprout-1.svg" alt="sprout" width={25} height={40} />
      </div>
    ),
    3: (
      <div className={styles.muddyBodySprout}>
        <Image src="/images/sprout-2.svg" alt="sprout" width={68} height={56} />
      </div>
    ),
    4: (
      <div className={styles.muddyBodySprout}>
        <Image
          src="/images/sprout-3.svg"
          alt="sprout"
          width={124}
          height={80}
        />
      </div>
    ),
    5: (
      <div className={styles.muddyBodySprout}>
        <Image
          src="/images/sprout-4.svg"
          alt="sprout"
          width={110}
          height={90}
        />
      </div>
    ),
  };

  const damageLevelContent = {
    1: <></>,
    2: (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full justify-center items-center flex z-14">
        <Image
          src="/images/damage-2.svg"
          alt="damage-level"
          width={164}
          height={137}
          className="w-[90%]"
        />
      </div>
    ),
    3: (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full justify-center items-center flex z-14">
        <Image
          src="/images/damage-2.svg"
          alt="damage-level"
          width={182}
          height={163}
          className="w-[90%]"
        />
      </div>
    ),
    4: (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full justify-center items-center flex z-14 ">
        <Image
          src="/images/damage-3.svg"
          alt="damage-level"
          width={182}
          height={180}
          className="w-[90%]"
        />
      </div>
    ),
    5: <></>,
  };

  return (
    <motion.div
      className={cn(
        styles.muddyContainer,
        scale,
        "cursor-grab active:cursor-grabbing"
      )}
      onClick={handleClick}
      drag={enableAnimation}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={() => {
        if (enableAnimation) {
          setIsDragging(true);
        }
      }}
      onDrag={(event, info) => {
        if (enableAnimation) {
          const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
          setDragDistance(distance);
          setDragDirection({ x: info.offset.x, y: info.offset.y });
        }
      }}
      onDragEnd={() => {
        if (enableAnimation) {
          setIsDragging(false);
          setDragDistance(0);
          setDragDirection({ x: 0, y: 0 });
        }
      }}
      animate={
        isJumping
          ? {
              x: [0, -3, 3, -3, 3, -2, 2, -1, 1, 0],
              transition: { duration: 0.5 },
            }
          : enableAnimation && !isDragging
            ? {
                y: [0, -8, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : {}
      }
      onAnimationComplete={() => {
        if (isJumping) {
          setIsJumping(false);
        }
      }}
      whileHover={
        enableAnimation && !isDragging
          ? {
              scale: 1.05,
              transition: { duration: 0.2 },
            }
          : {}
      }
    >
      {/* ダメージ */}
      {damageLevelContent[damageLevel]}

      {/* スキン画像 */}
      <div className="absolute top-0 left-0 w-full h-full z-[15] pointer-events-none flex items-center justify-center">
        {headSkin && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={getSkinImagePath(headSkin)}
              alt="head"
              width={200}
              height={200}
              className="object-contain"
              unoptimized
            />
          </div>
        )}

        {bodySkin && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={getSkinImagePath(bodySkin)}
              alt="body"
              width={200}
              height={200}
              className="object-contain"
              unoptimized
            />
          </div>
        )}

        {baseSkin && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={getSkinImagePath(baseSkin)}
              alt="base"
              width={200}
              height={200}
              className="object-contain"
              unoptimized
            />
          </div>
        )}
      </div>
      <div className={styles.muddyContainerBackground}></div>
      <div className={styles.aura}></div>
      <div className={styles.muddyBody}>
        <div className={styles.muddyBodyBefore}></div>
        <div className={styles.muddyBodyAfter}></div>
        <div className={styles.muddyBodyShine}>
          <div className={styles.muddyBodyShineLeft}></div>
          <div className={styles.muddyBodyShineRight}></div>
          <div className={styles.muddyBodyShineSmall1}></div>
          <div className={styles.muddyBodyShineSmall2}></div>
        </div>
        {sproutContent[growthStage]}
        {faceContent[currentFace]}
      </div>
    </motion.div>
  );
};
