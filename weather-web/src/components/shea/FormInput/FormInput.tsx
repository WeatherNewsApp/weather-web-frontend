"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Icons } from "../icon";

interface FormInputProps {
  placeholder: string;
  type: "text" | "email" | "password";
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  register: UseFormRegisterReturn;
  ariaLabel: string;
}

export const FormInput = ({
  placeholder,
  type,
  icon: Icon,
  error,
  register,
  ariaLabel,
}: FormInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType =
    type === "password" ? (isPasswordVisible ? "text" : "password") : type;
  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          aria-label={ariaLabel}
          type={inputType}
          placeholder={placeholder}
          {...register}
          className={cn(
            "w-full p-4 pl-12 font-sen font-medium bg-white rounded-full placeholder:text-gray placeholder:font-m-plus outline-none border-[1.8px] border-white focus:border-accent",
            error && "border-error"
          )}
        />
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray" />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <Icons.eye className="w-6 h-6" />
            ) : (
              <Icons.eyeOff className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
};
