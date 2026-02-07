"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shea/icon";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideMenu = ({
  isOpen,
  onClose
}: SideMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose} 
          className="fixed inset-0 z-50 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
      >
          <motion.div className="max-w-[460px] mx-auto"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-[200px] h-screen bg-main px-6 py-20">
              <ul className="flex flex-col gap-10 text-white">
                <li>
                  <Link href="/missions" className="flex items-center gap-3">
                    <Icons.missionBook  className="w-6 h-6"/>
                    <p>ミッション</p>
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="flex items-center gap-3">
                    <Icons.shop className="w-6 h-6"/>
                    <p>ストア</p>
                  </Link>
                </li>
                <li>
                  <Link href="/ranking" className="flex items-center gap-3">
                    <Icons.ranking className="w-6 h-6" />
                    <p>ランキング</p>
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="flex items-center gap-3">
                    <Icons.settings className="w-6 h-6"/>
                    <p>設定</p>
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}