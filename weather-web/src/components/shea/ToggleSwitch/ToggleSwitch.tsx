"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UseFormRegisterReturn } from "react-hook-form";

interface ToggleSwitchProps {
  register?: UseFormRegisterReturn;
}

export const ToggleSwitch = ({ register }: ToggleSwitchProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        {...register}
        className="sr-only peer"
        onChange={(e) => {
          setIsChecked(e.target.checked);
          register?.onChange?.(e);
        }}
      />

      <div className="relative w-18 h-8 bg-gray rounded-full peer-checked:bg-accent transition-colors duration-300">
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-px w-[30px] h-[30px] bg-white rounded-full shadow-sm"
          animate={{
            x: isChecked ? 40 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>
    </label>
  );
};
