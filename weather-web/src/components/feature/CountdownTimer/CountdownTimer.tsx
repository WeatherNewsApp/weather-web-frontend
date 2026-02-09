"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  backgroundColor: string;
}

export const CountdownTimer = ({
  targetDate,
  backgroundColor,
}: CountdownTimerProps) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const totalSeconds = Math.max(0, Math.floor((target - now) / 1000));

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return { hours, minutes, seconds: secs };
  };

  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>(() => calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div
      className={cn(
        "mt-7 flex flex-col gap-2 mx-auto",
        backgroundColor === "bg-home-morning" ? "text-black" : "text-white"
      )}
    >
      {/* ターゲットデータによってテキストを変更したい。朝か夜かで */}
      {backgroundColor === "bg-home-morning" ? (
        <p className="text-center">朝のお世話をしよう！</p>
      ) : (
        <p className="text-center">夜のお世話をしよう！</p>
      )}
      <div className="flex items-center gap-2">
        <p>あと</p>
        <div className="flex items-center gap-3 text-lg font-sen">
          <span>{formatNumber(timeLeft.hours)}</span>
          <span>：</span>
          <span>{formatNumber(timeLeft.minutes)}</span>
          <span>：</span>
          <span>{formatNumber(timeLeft.seconds)}</span>
        </div>
      </div>
    </div>
  );
};
