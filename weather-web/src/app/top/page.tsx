import Image from "next/image";
import Link from "next/link";

export default function Top() {
  return (
    <main className="bg-[#E5D2A1] flex flex-col items-center justify-center h-screen w-full mx-auto">
      <Image
        src={"/images/dummy-image.png"}
        alt="dummy"
        width={260}
        height={260}
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
