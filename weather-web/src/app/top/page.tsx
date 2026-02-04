import Image from "next/image";
import Link from "next/link";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import { PrimaryButton } from "@/components/shea/PrimaryButton/PrimaryButton";

export default function Top() {
  return (
    <main className="bg-radial-close flex flex-col items-center justify-center h-screen w-full mx-auto px-4">
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg text-[#91542E]">毎日のケアを積み重ねる育成型習慣アプリ</p>
        <Image src={"/images/logo.png"} width={260} height={260} alt="logo" className="w-full h-auto" />
      </div>
      <div className="mt-15">
        <Muddy face="normal" growthLevel="1" damageLevel="1" scale="scale-[1.25]" width="w-[200px]" height="h-[200px]" />
      </div>
      <div className="mt-20 flex flex-col items-center gap-6 w-full">
        <Link href="/signup" className="bg-accent text-white text-lg font-medium rounded-full py-5 w-full text-center">
          <p>新規登録</p>
        </Link>
        <Link href="/login" className="bg-white text-lg font-medium rounded-full py-5 w-full text-center">
          <p>ログイン
          </p>
        </Link>
      </div>
    </main>
  );
}
