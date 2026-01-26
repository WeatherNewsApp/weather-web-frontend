"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import { Icons } from "@/components/shea/icon";
import { cookieManager } from "@/lib/cookies";
import { loginSchema, type LoginSchema} from "@/schemas/auth"
import { login, type LoginResponse } from "@/lib/api/auth";
import { LoginForm } from "@/components/feature/LoginForm/LoginForm";

export default function Login() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

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
    setApiError(undefined);
    setIsLoading(true);
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      });
      if (res.success) {
        cookieManager.setToken(res.token);
        router.push("/home");
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else if (typeof error === "string") {
        setApiError(error);
      } else {
        setApiError("予期しないエラーが発生しました");
      }
      console.error("APIエラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-main h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <Image
        src={"/images/design-asset2.svg"}
        alt="design-asset2"
        width={400}
        height={427}
        className="absolute top-5 -translate-y-1/2  right-11 translate-x-1/2 z-20"
      />
      <div className="bg-base h-full w-full rounded-xl py-5 flex flex-col between px-3 overflow-y-auto relative">
        <div className="sticky top-5 left-0 h-fit">
          <Link href="/" className="pl-3 flex items-center justify-start w-fit">
            <Icons.chevronLeft className="w-10 h-10" strokeWidth={1} />
          </Link>
        </div>
        <div className="flex flex-col gap-3 mt-13">
          <h1 className="font-medium text-2xl">ログイン</h1>
          <p className="text-sm">
            ログインしてどろ団子の様子を確認しよう！
          </p>
        </div>
        <LoginForm 
          onSubmit={onSubmit}
          isLoading={isLoading}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          isValid={isValid}
          apiError={apiError}
        />
        <Link href="/signup" className="text-sm text-center underline pt-4">
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
        {/* <Image src={"/images/design-asset.svg"} alt="design-asset" width={240} height={240} className="absolute top-[48vh] -translate-y-1/2 right-[-27vw]  "/> */}
      </div>
    </main>
  );
}
