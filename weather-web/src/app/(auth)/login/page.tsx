"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Icons } from "@/components/shea/icon";
import { loginSchema, type LoginSchema } from "@/schemas/auth";
import { LoginForm } from "@/components/feature/LoginForm/LoginForm";
import { useUserStore } from "@/store/user.store";

export default function Login() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      router.push("/home");
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to login:', error);
      } else {
        console.error('Failed to login:', error);
      }
    }
  };

  return (
    // <main className="bg-main h-screen flex items-center justify-center p-4 relative overflow-hidden">
    //   <Image
    //     src={"/images/design-asset2.svg"}
    //     alt="design-asset2"
    //     width={400}
    //     height={427}
    //     className="absolute top-5 -translate-y-1/2  right-11 translate-x-1/2 z-40"
    //   />
    //   <div className="p-4 w-full rounded-xl h-full absolute z-10">
    //     <div className="bg-radial w-full rounded-xl h-full"></div>
    //   </div>
    //   <div className="h-full w-full rounded-xl py-5 flex flex-col between px-3 overflow-y-auto relative z-30">
    //     <div className="sticky top-5 left-0 h-fit">
    //       <Link href="/" className="pl-3 flex items-center justify-start w-fit">
    //         <Icons.chevronLeft className="w-10 h-10" strokeWidth={1} />
    //       </Link>
    //     </div>
    //     <div className="flex flex-col gap-3 mt-13">
    //       <h1 className="font-medium text-2xl">ログイン</h1>
    //       <p className="text-sm">ログインしてどろ団子の様子を確認しよう！</p>
    //     </div>
    //     <LoginForm
    //       onSubmit={onSubmit}
    //       isLoading={isLoading}
    //       errors={errors}
    //       register={register}
    //       handleSubmit={handleSubmit}
    //       isValid={isValid}
    //       apiError={error ?? undefined}
    //     />
    //     <Link href="/signup" className="text-sm text-center underline pt-4">
    //       アカウントをお持ちでない方はこちら
    //     </Link>
    //     <div className="flex gap-10 items-center justify-center pt-15">
    //       <button
    //         type="button"
    //         className="flex items-center justify-center w-15 h-15 border border-accent rounded-full"
    //       >
    //         <Icons.google />
    //       </button>
    //       <button
    //         type="button"
    //         className="flex items-center justify-center w-15 h-15 border border-accent rounded-full"
    //       >
    //         <Icons.apple />
    //       </button>
    //     </div>
    //   </div>
    //   <div className="p-4 w-full rounded-xl h-full absolute z-20">
    //     <div className="overflow-x-hidden h-full w-full relative z-20 rounded-xl">
    //       <Image
    //         src={"/images/design-asset.svg"}
    //         alt="design-asset"
    //         width={240}
    //         height={240}
    //         className="right-[-171px] absolute top-[260px]"
    //       />
    //       <Image
    //         src={"/images/design-asset.svg"}
    //         alt="design-asset"
    //         width={240}
    //         height={240}
    //         className="left-[-207px] absolute top-[109px]"
    //       />
    //       <Image
    //         src={"/images/design-asset.svg"}
    //         alt="design-asset"
    //         width={240}
    //         height={240}
    //         className="left-[-109px] absolute bottom-[-191px]"
    //       />
    //     </div>
    //   </div>
    // </main>
    <main className="bg-white h-screen flex flex-col items-center justify-between relative overflow-hidden">
      <div className="pt-6 px-4 pb-3 w-full relative z-10">
        <Link href="/top" className="w-10 h-10">
          <Icons.chevronLeft className="w-10 h-10 text-white" strokeWidth={1} />
        </Link>
      </div>
      <Image src="/images/design-asset2.png" alt="design-asset2" width={520} height={520} className="absolute -top-[426px] -left-[238px] w-[520px] h-[520px] z-0"/>
      <div className="max-h-[82vh] h-full w-full bg-radial rounded-t-xl shadow-tl absolute z-0 bottom-0 left-0 overflow-y-hidden">
        <Image
          src={"/images/design-asset.svg"}
          alt="design-asset"
          width={240}
          height={240}
          className="right-[-171px] absolute top-[260px]"
        />
        <Image
          src={"/images/design-asset.svg"}
          alt="design-asset"
          width={240}
          height={240}
          className="left-[-207px] absolute top-[109px]"
        />
        <Image
          src={"/images/design-asset.svg"}
          alt="design-asset"
          width={240}
          height={240}
          className="left-[-109px] absolute bottom-[-191px]"
        />
      </div>
      <div className="max-h-[82vh] h-full w-full mx-auto px-4 py-10 rounded-t-xl overflow-y-auto z-20">
        <div className="flex flex-col gap-3">
          <h1 className="font-medium text-2xl">新規アカウント作成</h1>
          <p className="text-sm text-gray-500">
            アカウントを作成してどろ団子を誕生させよう！
          </p>
        </div>
        <LoginForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          isValid={isValid}
          apiError={error ?? undefined}
        />
        <Link href="/register" className="text-sm underline w-full text-center mt-4 block">
          アカウントをお持ちでない方はこちら
        </Link>
        <div className="flex gap-10 items-center justify-center pt-15">
          <button
            type="button"
            className="flex items-center justify-center w-15 h-15 border border-accent rounded-full"
          >
            <Icons.google />
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-15 h-15 border border-accent rounded-full"
          >
            <Icons.apple />
          </button>
        </div>
        <div className="p-4 w-full rounded-xl h-full absolute z-20">
          <div className="overflow-x-hidden h-full w-full relative z-20 rounded-xl">
            <Image
              src={"/images/design-asset.svg"}
              alt="design-asset"
              width={240}
              height={240}
              className="right-[-171px] absolute top-[260px]"
            />
            <Image
              src={"/images/design-asset.svg"}
              alt="design-asset"
              width={240}
              height={240}
              className="left-[-207px] absolute top-[109px]"
            />
            <Image
              src={"/images/design-asset.svg"}
              alt="design-asset"
              width={240}
              height={240}
              className="left-[-109px] absolute bottom-[-191px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
