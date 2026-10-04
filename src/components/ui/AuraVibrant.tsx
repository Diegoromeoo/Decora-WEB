"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

/**
 * Vibrant multi-color aura blob — orange core, hot pink halo, warm yellow
 * inner, fading into transparency. Inspired by soft painterly auras.
 *
 * Renders as a fixed-size absolutely-positioned element. Wrap it in a
 * relative container; the parent should clip overflow.
 */
export function AuraVibrant({
  size = 720,
  className,
  style,
  variant = "vibrant",
  animate = true,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
  variant?: "vibrant" | "soft";
  animate?: boolean;
}) {
  const base = variant === "soft" ? "aura-vibrant-soft" : "aura-vibrant";
  const morph =
    variant === "soft" ? "aura-morph-slow" : "aura-morph";

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      style={{ width: size, height: size, ...style }}
      className={cn(base, animate && morph, className)}
    />
  );
}
