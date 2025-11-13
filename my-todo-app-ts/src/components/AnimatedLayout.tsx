"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
}
