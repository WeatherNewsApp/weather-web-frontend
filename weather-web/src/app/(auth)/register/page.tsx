"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import { Icons } from "@/components/shea/icon";
import { signupSchema, type SignupSchema } from "@/schemas/auth";
import { SignupForm } from "@/components/feature/SignupForm/SignupForm";
import { useUserStore } from "@/store/user.store";

export default function Register() {
  const router = useRouter();
  const registerUser = useUserStore((state) => state.registerUser);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
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
      });
      router.push("/home");
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to sign in:', error);
      } else {
        console.error('Failed to sign in:', error);
      }
    }
  };

  return (
    <main className="bg-main h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <Image
        src={"/images/design-asset2.svg"}
        alt="design-asset2"
        width={400}
        height={427}
        className="absolute top-5 -translate-y-1/2  right-11 translate-x-1/2 z-40"
      />
      <div className="p-4 w-full rounded-xl h-full absolute z-10">
        <div className="bg-radial w-full rounded-xl h-full"></div>
      </div>
      <div className="h-full w-full rounded-xl py-5 flex flex-col between px-3 overflow-y-auto relative z-30">
        <div className="sticky top-5 left-0 h-fit">
          <Link href="/" className="pl-3 flex items-center justify-start w-fit">
            <Icons.chevronLeft className="w-10 h-10" strokeWidth={1} />
          </Link>
        </div>

        <div className="flex flex-col gap-3 mt-13">
          <h1 className="font-medium text-2xl">新規アカウント作成</h1>
          <p className="text-sm">
            アカウントを作成してどろ団子を誕生させよう！
          </p>
        </div>
        <SignupForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          isValid={isValid}
          apiError={error ?? undefined}
        />
        <Link href="/login" className="text-sm text-center underline pt-4">
          すでにアカウントをお持ちの方はこちら
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
        {/* <Image src={"/images/design-asset.svg"} alt="design-asset" width={240} height={240} className="absolute top-[48vh] -translate-y-1/2 right-[-27vw]  "/> */}
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
    </main>
  );
}
