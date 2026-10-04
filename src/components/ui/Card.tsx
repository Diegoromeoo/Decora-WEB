"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "relative rounded-2xl glass gradient-stroke p-6 transition-shadow duration-300",
        hover && "hover:glow-warm",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
