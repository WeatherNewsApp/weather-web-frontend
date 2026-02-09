"use client";
import Link from "next/link";
import { UseFormRegisterReturn } from "react-hook-form";

import { ToggleSwitch } from "@/components/shea/ToggleSwitch/ToggleSwitch";

interface TermsAgreementProps {
  register?: UseFormRegisterReturn;
  error?: string;
}

export const TermsAgreement = ({ register, error }: TermsAgreementProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex pt-5 items-center justify-between">
        <Link href="/privacy" className="text-sm underline">
          プライバシーポリシーに同意する
        </Link>
        <ToggleSwitch register={register} />
      </div>
      {error && <p className="text-sm text-error mt-px">{error}</p>}
    </div>
  );
};
