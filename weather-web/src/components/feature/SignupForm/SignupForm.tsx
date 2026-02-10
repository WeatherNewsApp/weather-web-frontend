"use client";

import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
  Controller,
  Control,
} from "react-hook-form";

import { type SignupSchema } from "@/schemas/auth";
import { Icons } from "@/components/shea/icon";
import { TermsAgreement } from "@/components/feature/TermsAgreement/TermsAgreement";
import { FormInput } from "@/components/shea/FormInput/FormInput";
import { PrimaryButton } from "@/components/shea/PrimaryButton/PrimaryButton";
import { AreaComboBox } from "@/components/shea/AreaComboBox/AreaComboBox";

interface SignupFormProps {
  onSubmit: (data: SignupSchema) => void;
  isLoading: boolean;
  errors: FieldErrors<SignupSchema>;
  register: UseFormRegister<SignupSchema>;
  handleSubmit: UseFormHandleSubmit<SignupSchema>;
  control: Control<SignupSchema>;
  isValid: boolean;
  apiError?: string;
}

export const SignupForm = ({
  onSubmit,
  isLoading,
  errors,
  register,
  handleSubmit,
  control,
  isValid,
  apiError,
}: SignupFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="flex flex-col gap-7">
        <FormInput
          ariaLabel="ユーザーネーム"
          placeholder="ユーザーネーム"
          type="text"
          icon={Icons.user}
          register={register("name")}
          error={errors.name?.message}
        />
        <FormInput
          ariaLabel="メールアドレス"
          placeholder="メールアドレス"
          type="email"
          icon={Icons.mail}
          register={register("email")}
          error={errors.email?.message}
        />
        <FormInput
          ariaLabel="パスワード"
          placeholder="パスワード"
          type="password"
          icon={Icons.lock}
          register={register("password")}
          error={errors.password?.message}
        />
        <FormInput
          ariaLabel="パスワード確認"
          placeholder="パスワード確認"
          type="password"
          icon={Icons.lock}
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <div>
          <Controller
            name="areaId"
            control={control}
            render={({ field }) => (
              <AreaComboBox
                selectedAreaId={field.value}
                onChangeSelectedAreaId={field.onChange}
                hasIcon={true}
              />
            )}
          />
          {errors.areaId && (
            <p className="text-error text-sm mt-1">{errors.areaId.message}</p>
          )}
        </div>
      </div>
      <TermsAgreement
        register={register("isTermsAccepted")}
        error={errors.isTermsAccepted?.message}
      />
      <div>
        {apiError && <p className="text-error text-sm mb-2">{apiError}</p>}
        <PrimaryButton
          variant="accent"
          label="新規登録"
          type="submit"
          isLoading={isLoading}
          disabled={!isValid}
          py="py-[18px]"
        />
      </div>
    </form>
  );
};
