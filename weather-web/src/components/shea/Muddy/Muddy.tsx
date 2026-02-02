import styles from "./Muddy.module.css";
import Image from "next/image";

interface MuddyProps {
  face: "normal" | "happy" | "sad";
  headSkin?: "string";
  bodySkin?: "string";
  baseSkin?: "string";
  growthLevel: "1" | "2" | "3" | "4" | "5";
  damageLevel: "1" | "2" | "3" | "4" | "5";
  scale: "1" | "2" | "3" | "4" | "5";
  width: number;
  height: number;
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
    normal: {

    },
    happy: {

    },
    sad: {  

    },
  };

  const sproutContent = {
    "1": "/images/dummy-image.png",
    "2": "/images/dummy-image.png",
    "3": "/images/dummy-image.png",
    "4": "/images/dummy-image.png",
    "5": "/images/dummy-image.png",
  }

  

  return (
    <div className={styles.muddyContainer}>
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
          {/* <div className={styles.muddyBodySproutStem}></div>
          <div className={styles.muddyBodySproutLeafLeft}></div>
          <div className={styles.muddyBodySproutLeafRight}></div> */}
          <Image src={sproutContent[growthLevel]} alt="sprout" width={20} height={20} />
        </div>
        <div className={styles.muddyBodyEyeLeft}></div>
        <div className={styles.muddyBodyEyeRight}></div>
        <div className={styles.muddyBodyMouth}></div>
      </div>
      <div className={styles.muddyBodyCheekLeft}></div>
      <div className={styles.muddyBodyCheekRight}></div>
    </div>
  );
};
