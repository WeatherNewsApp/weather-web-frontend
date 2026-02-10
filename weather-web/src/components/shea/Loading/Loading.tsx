"use client";

import { Muddy } from "../Muddy/Muddy";
import { Icons } from "../icon";
import { motion, AnimatePresence } from "framer-motion";

export const Loading = () => {
  return (
    <main className="bg-radial-close flex flex-col items-center justify-center h-screen w-full mx-auto ">
      <div className="relative flex items-center justify-center w-30 h-30">
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 animate-spin"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "linear", repeat: Infinity }}
          >
            <Icons.loader />
          </motion.div>
        </AnimatePresence>
        <Muddy
          face="happy"
          scale="scale-[0.4]"
          growthStage="1"
          damageLevel="1"
        />
      </div>
      <div className="flex gap-2 text-xl font-sen mt-5">
        <p>Loading</p>
        <p className="animate-pulse">...</p>
      </div>
    </main>
  );
};
