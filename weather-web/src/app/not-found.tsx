import Link from "next/link";

import { Muddy } from "@/components/shea/Muddy/Muddy";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-radial px-4">
      <div className="flex flex-col gap-2 w-fit bg-[#fff] rounded-sm shadow-speech py-3 px-6 speech-bubble relative z-10">
        <p>ページが見つからなかったよ</p>
      </div>
      <div className="flex items-center justify-center mt-5">
        <Muddy face="sad" scale="scale-[0.8]" growthStage="1" damageLevel="1" />
      </div>
      <div className="flex gap-2 items-end justify-center">
        <p className="text-[40px] font-sen">404</p>
        <p className="pb-3 font-sen">Not Found</p>
      </div>
      <Link href="/" className="h-[70px] w-full relative mt-15">
        <div className="top-0 left-0 w-full h-[66px] bg-accent rounded-full flex items-center justify-center relative z-10">
          <p className="text-white text-lg font-sen font-medium">
            ケアをしに戻ろう！
          </p>
        </div>
        <span className="absolute bottom-0 left-0 rounded-full w-full h-[66px] bg-accent-dark z-0" />
      </Link>
    </main>
  );
}
