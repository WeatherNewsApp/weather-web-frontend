"use client";

import { Muddy } from "../Muddy/Muddy";
import { motion } from "framer-motion";
import { Icons } from "../icon";

export const Loading = () => {
  return (
    <main className="bg-radial-close flex flex-col items-center justify-center h-screen w-full mx-auto ">
      <div className="relative flex items-center justify-center w-30 h-30">
        <motion.div 
          className="absolute inset-0" 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Icons.loader />
        </motion.div>
        <Muddy  
          face="happy"
          scale="scale-[0.4]"
          growthStage="5"
          damageLevel="4"
        />
      </div>

      

      <div className="flex gap-2 text-xl font-sen mt-5">
        <p>Loading</p>
        <p>...</p>
      </div>
    </main>
  );
};
