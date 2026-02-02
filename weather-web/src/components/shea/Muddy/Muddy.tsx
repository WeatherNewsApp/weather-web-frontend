import styles from "./Muddy.module.css";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MuddyProps {
  face: "normal" | "happy" | "sad";
  headSkin?: string;
  bodySkin?: string;
  baseSkin?: string;
  growthLevel: "1" | "2" | "3" | "4" | "5";
  damageLevel: "1" | "2" | "3" | "4" | "5";
  scale: string;
  width: string;
  height: string;
}

export const Muddy = ({
  face,
  headSkin,
  bodySkin,
  baseSkin,
  growthLevel,
  damageLevel,
  scale,
  width,
  height,
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
    "1": "/images/dummy-image.png",
    "2": "/images/dummy-image.png",
    "3": "/images/dummy-image.png",
    "4": "/images/dummy-image.png",
    "5": "/images/dummy-image.png",
  }

  const damageLevelContent = {
    1: (
      <></>
    ),
    2: (
      <div className="inset-0">
        <div className="absolute top-0 left-0">
          <Image src="/images/dummy-image.png" alt="damage-level" width={20} height={20} />
        </div>
      </div>
    ),
    3: (
      <div className="absolute top-0 left-0">
        <Image src="/images/dummy-image.png" alt="damage-level" width={20} height={20} />
        <Image src="/images/dummy-image.png" alt="damage-level" width={20} height={20} />
      </div>
    ),
    4: (
      <div className="absolute top-0 left-0">
      <Image src="/images/dummy-image.png" alt="damage-level" width={20} height={20} />
      <Image src="/images/dummy-image.png" alt="damage-level" width={20} height={20} />
      <Image src="/images/dummy-image.png" alt="damage-level" width={20} height={20} />
    </div>
    ),
    5: (
      <div className="absolute top-0 left-0">
      <Image src="/images/dummy-image.png" alt="damage-level" width={20} height={20} />
      <Image src="/images/dummy-image.png" alt="damage-level" width={20} height={20} />
      <Image src="/images/dummy-image.png" alt="damage-level" width={20} height={20} />
      <Image src="/images/dummy-image.png" alt="damage-level" width={20} height={20} />
    </div>
    )
  }

  const widthPx = `w-[${width}px]`;
  const heightPx = `h-[${height}px]`;

  return (
    <div className={cn(
      styles.muddyContainer,
      scale,
      widthPx,
      heightPx,
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
        <div className={styles.muddyBodyAffer}></div>
        <div className={styles.muddyBodyShine}>
          <div className={styles.muddyBodyShineLeft}></div>
          <div className={styles.muddyBodyShineRight}></div>
          <div className={styles.muddyBodyShineSmall1}></div>
          <div className={styles.muddyBodyShineSmall2}></div>
        </div>
        <div className={styles.muddyBodySprout}>
          <Image src={sproutContent[growthLevel]} alt="sprout" width={20} height={20} />
        </div>
        {faceContent[face]}
      </div>
    </div>
  );
};
