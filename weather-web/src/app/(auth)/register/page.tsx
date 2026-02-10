"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import { Icons } from "@/components/shea/icon";
import { signupSchema, type SignupSchema } from "@/schemas/auth";
import { SignupForm } from "@/components/feature/SignupForm/SignupForm";
import { useUserStore } from "@/store/user.store";
import { Loading } from "@/components/shea/Loading/Loading";

export default function Register() {
  const router = useRouter();
  const registerUser = useUserStore((state) => state.registerUser);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        areaId: data.areaId,
      });
      setIsRedirecting(true);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to sign in:", error);
      } else {
        console.error("Failed to sign in:", error);
      }
      setIsRedirecting(false);
    }
  };

  if (isRedirecting) {
    return <Loading />;
  }

  return (
    <main className="bg-white h-screen flex flex-col items-center justify-between relative overflow-hidden">
      <div className="pt-6 px-4 pb-3 w-full relative z-10">
        <Link href="/top" className="w-10 h-10">
          <Icons.chevronLeft className="w-10 h-10 text-white" strokeWidth={1} />
        </Link>
      </div>
      <Image
        src="/images/design-asset2.png"
        alt="design-asset2"
        width={520}
        height={520}
        className="absolute -top-[426px] -left-[238px] w-[520px] h-[520px] z-0"
      />
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
      <div className="max-h-[82vh] h-full w-full rounded-t-xl absolute z-30 bottom-0 left-0 overflow-hidden pointer-events-none">
        <span className="bg-home-layer absolute top-0 left-0 w-full h-full z-10" />
      </div>
      <div className="max-h-[82vh] h-full w-full mx-auto px-4 py-10 rounded-t-xl overflow-y-auto z-20 relative">
        <div className="flex flex-col gap-3">
          <h1 className="font-medium text-2xl">新規アカウント作成</h1>
          <p className="text-sm text-gray-500">
            アカウントを作成してどろ団子を誕生させよう！
          </p>
        </div>
        <SignupForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          isValid={isValid}
          apiError={error ?? undefined}
        />
        <Link
          href="/login"
          className="text-sm underline w-full text-center mt-4 block"
        >
          すでにアカウントをお持ちの方はこちら
        </Link>
        {/* <div className="flex gap-10 items-center justify-center pt-15">
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
        </div> */}
      </div>
    </main>
  );
}
