import React from "react";
import Image from "next/image";

interface CareMessageProps {
  currentCare: "sunny" | "cloudy" | "rainy" | null;
}

export const CareMessage = React.memo(({ currentCare }: CareMessageProps) => {
  return (
    <div className="flex flex-col gap-2 w-fit bg-[#fff] rounded-sm shadow-speech py-3 px-6 speech-bubble relative z-10">
      {currentCare === "sunny" ? (
        <div className="flex gap-3 items-center justify-center">
          <Image
            src="/images/sunny-trace.png"
            alt="sunny"
            width={32}
            height={32}
          />
          <p>水をかけてもらったよ</p>
        </div>
      ) : currentCare === "cloudy" ? (
        <div className="flex gap-3 items-center justify-center">
          <Image
            src="/images/cloudy-trace.png"
            alt="cloudy"
            width={32}
            height={32}
          />
          <p>拭いてもらったよ</p>
        </div>
      ) : currentCare === "rainy" ? (
        <div className="flex gap-3 items-center justify-center">
          <Image
            src="/images/rainy-trace.png"
            alt="rainy"
            width={32}
            height={32}
          />
          <p>傘をさしてもらったよ</p>
        </div>
      ) : (
        <p>今日もいい天気だね</p>
      )}
    </div>
  );
});

CareMessage.displayName = "CareMessage";
