"use client";

import { UseFormRegister, UseFormHandleSubmit } from "react-hook-form";

import { type UpdateUserSchema } from "@/schemas/user";

interface UpdateUserFormProps {
  onSubmit: (data: UpdateUserSchema) => void;
  register: UseFormRegister<UpdateUserSchema>;
  handleSubmit: UseFormHandleSubmit<UpdateUserSchema>;
  apiError?: string;
}

export const UpdateUserForm = ({
  onSubmit,
  register,
  handleSubmit,
  apiError,
}: UpdateUserFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-1 flex-col">
          <p className="text-sm">ユーザーネーム</p>
          <input
            type="text"
            className="rounded-md bg-white py-4 px-3 w-full font-sen"
            placeholder="ユーザーネーム"
            {...register("name")}
            aria-label="ユーザーネーム"
            required
          />
        </div>
        <div className="flex items-start gap-1 flex-col ">
          <p className="test-sm">メールアドレス</p>
          <input
            type="email"
            className="rounded-md bg-white py-4 px-3 w-full font-sen"
            placeholder="example@example.com"
            {...register("email")}
            aria-label="メールアドレス"
            required
          />
        </div>
      </div>
      {apiError && <p className="text-error text-sm mt-2">{apiError}</p>}
      <button type="submit" className="relative w-full mt-10">
        <div className="font-medium rounded-sm w-full relative z-20 text-white bg-accent py-4">
          変更を保存する
        </div>
        <span className="absolute w-full h-full rounded-sm top-1 left-0 z-10 bg-accent-dark py-4" />
      </button>
    </form>
  );
};
