import Image from "next/image";
import Link from "next/link";
import { Muddy } from "@/components/shea/Muddy/Muddy";

export default function Top() {
  return (
    <main className="bg-radial-close flex flex-col items-center justify-center h-screen w-full mx-auto px-4">
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg text-[#91542E] text-center">
          毎日のケアを積み重ねる育成型習慣アプリ
        </p>
        <Image
          src={"/images/logo.png"}
          width={260}
          height={260}
          alt="logo"
          className="w-full h-auto"
        />
      </div>
      <div className="mt-15">
        <Muddy face="happy" growthStage="1" damageLevel="1" scale="scale-[1]" />
      </div>
      <div className="mt-20 flex flex-col items-center gap-6 w-full">
        <Link href="/register" className="relative w-full">
          <div className="bg-accent font-medium w-full relative z-20 text-white text-lg py-4 text-center rounded-full">
            新規登録
          </div>
          <span className="absolute w-full h-full rounded-full top-1 left-0 z-10 bg-accent-dark" />
        </Link>
        <Link href="/login" className="relative w-full">
          <div className="bg-white font-medium rounded-full w-full relative z-20 text-black text-lg py-4 text-center">
            ログイン
          </div>
          <span className="absolute w-full h-full rounded-sm top-1 left-0 z-10 bg-gray-200" />
        </Link>
      </div>
    </main>
  );
}
