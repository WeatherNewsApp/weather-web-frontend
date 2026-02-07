import styles from "./Muddy.module.css";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MuddyProps {
  face: "normal" | "happy" | "sad";
  headSkin?: string;
  bodySkin?: string;
  baseSkin?: string;
  growthStage: "1" | "2" | "3" | "4" | "5";
  damageLevel: "1" | "2" | "3" | "4" | "5";
  scale?: string;
}

export const Muddy = ({
  face,
  headSkin,
  bodySkin,
  baseSkin,
  growthStage,
  damageLevel,
  scale = "scale-[0.9]",
}: MuddyProps) => {
  const faceContent = {
    normal: (
      <>
        <div className={styles.muddyBodyEyeLeftContainerNormal}>
          <div className={styles.muddyBodyEyeLeftNormal}>
            <span className={styles.muddyBodyEyeLeftHighlightBigNormal}></span>
            <span className={styles.muddyBodyEyeLeftHighlightSmallNormal}></span>
          </div>
        </div>
        <div className={styles.muddyBodyEyeRightContainerNormal}>
          <div className={styles.muddyBodyEyeRightNormal}>
            <span className={styles.muddyBodyEyeRightHighlightBigNormal}></span>
            <span className={styles.muddyBodyEyeRightHighlightSmallNormal}></span>
          </div>
        </div>
        <div className={styles.muddyBodyMouthNormal}>
        </div>
        <div className={styles.muddyBodyCheekNormal}>
          <div className={styles.muddyBodyCheekLeftNormal}></div>
          <div className={styles.muddyBodyCheekRightNormal}></div>
        </div>
      </>
    ),
    happy: (
      <>
        <div className={styles.muddyBodyEyeLeftHappy}></div>
        <div className={styles.muddyBodyEyeRightHappy}></div>
        <div className={styles.muddyBodyMouthHappy}></div>
        <div className={styles.muddyBodyCheekLeftHappy}></div>
        <div className={styles.muddyBodyCheekRightHappy}></div>
      </>
    ),
    sad: (  
      <>
        <div className={styles.muddyBodyEyeLeftContainerSad}>
          <div className={styles.muddyBodyEyeLeftSad}></div>
          <div className={styles.muddyBodyEyeLeftTearsSad}></div>
        </div>
        <div className={styles.muddyBodyEyeRightContainerSad}>
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

  const scaleValue = scale.toString();

  const sproutContent = {
    1: (
      <></>
    ),
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
        <Image src="/images/sprout-3.svg" alt="sprout" width={124} height={80} />
      </div>
    ),
    5: (
      <div className={styles.muddyBodySprout}>
        <Image src="/images/sprout-4.svg" alt="sprout" width={110} height={90} />
      </div>
    )
  }

  const damageLevelContent = {
    1: (
      <></>
    ),
    2: (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full justify-center items-center flex z-20">
        <Image src="/images/damage-2.svg" alt="damage-level" width={164} height={137} />
      </div>
    ),
    3: (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full justify-center items-center flex z-20">
        <Image src="/images/damage-2.svg" alt="damage-level" width={182} height={163} />
      </div>
    ),
    4: (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full justify-center items-center flex z-20 ">
        <Image src="/images/damage-3.svg" alt="damage-level" width={182} height={180} />
      </div>
    ),
    5: (
      <></>
    )
  }

  return (
    <div className={cn(
      styles.muddyContainer,
      scale,
    )}>
      {/* ダメージ */}
      {damageLevelContent[damageLevel]}
      <div className="absolute top-0 right-0">
        <Image src={headSkin || ""} alt="head-skin" width={20} height={20} />
        <Image src={bodySkin || ""} alt="body-skin" width={20} height={20} />
        <Image src={baseSkin || ""} alt="base-skin" width={20} height={20} />
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
        {faceContent[face]}
      </div>
    </div>
  );
};
