"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareModal = ({
  isOpen,
  onClose,
}: CareModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
        </motion.div>
      )}
    </AnimatePresence>
  )
}