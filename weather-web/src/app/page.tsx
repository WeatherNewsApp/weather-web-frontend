import Image from "next/image";
import Link from "next/link";
import { Muddy } from "@/components/shea/Muddy/Muddy";

export default function Home() {
  return (
    <main className="bg-[#E5D2A1] flex flex-col items-center justify-center h-screen w-full mx-auto">
      <Muddy
        face="normal"
        headSkin="https://placehold.co/400x400.png?text=head-skin"
        bodySkin="https://placehold.co/400x400.png?text=body-skin"
        baseSkin="https://placehold.co/400x400.png?text=base-skin"
        growthLevel="1"
        damageLevel="5"
        scale="scale-[1]"
        width="w-[260px]"
        height="h-[260px]"
      />
      <div className="flex gap-2 flex-col mt-10">
        <Link
          href="/login"
          className="text-white bg-accent rounded-full px-8 py-3 text-sm font-medium"
        >
          <p>ログイン</p>
        </Link>
        <Link
          href="/signup"
          className="text-white bg-accent rounded-full px-8 py-3 text-sm font-medium"
        >
          <p>新規登録</p>
        </Link>
      </div>
    </main>
  );
}
