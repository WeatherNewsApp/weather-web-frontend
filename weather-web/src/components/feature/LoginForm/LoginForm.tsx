"use client";

import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";

import { type LoginSchema } from "@/schemas/auth";
import { Icons } from "@/components/shea/icon";
import { FormInput } from "@/components/shea/FormInput/FormInput";
import { PrimaryButton } from "@/components/shea/PrimaryButton/PrimaryButton";

interface LoginFormProps {
  onSubmit: (data: LoginSchema) => void;
  isLoading: boolean;
  errors: FieldErrors<LoginSchema>;
  register: UseFormRegister<LoginSchema>;
  handleSubmit: UseFormHandleSubmit<LoginSchema>;
  isValid: boolean;
  apiError?: string;
}

export const LoginForm = ({
  onSubmit,
  isLoading,
  errors,
  register,
  handleSubmit,
  isValid,
  apiError,
}: LoginFormProps) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex flex-col justify-between"
    >
      <div className="flex flex-col gap-7">
        <FormInput
          placeholder="メールアドレス"
          type="email"
          icon={Icons.mail}
          register={register("email")}
          error={errors.email?.message}
          ariaLabel="メールアドレス"
        />
        <FormInput
          placeholder="パスワード"
          type="password"
          icon={Icons.lock}
          register={register("password")}
          error={errors.password?.message}
          ariaLabel="パスワード"
        />
      </div>
      <div>
        {apiError && <p className="text-error text-sm my-2">{apiError}</p>}
        <PrimaryButton
          variant="accent"
          label="ログイン"
          type="submit"
          isLoading={isLoading}
          disabled={!isValid}
          py="py-[18px]"
        />
      </div>
    </form>
  );
};
