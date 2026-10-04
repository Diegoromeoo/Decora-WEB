"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { AuraVibrant } from "./AuraVibrant";

type BlobColor = "amber" | "orange" | "navy";

export function GradientBlob({
  color = "amber",
  className,
  size = 500,
  style,
}: {
  color?: BlobColor;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{ width: size, height: size, ...style }}
      className={cn(`aurora aurora-${color}`, className)}
    />
  );
}

/**
 * Hero/CTA backdrop: a large vibrant aura (orange-pink-yellow) with parallax
 * on scroll, plus a smaller soft companion blob for depth. Uses Framer
 * Motion's useScroll + useTransform for the parallax translation.
 */
export function AuroraBackdrop({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const mainSize = compact ? 720 : 980;
  const softSize = compact ? 480 : 620;

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 overflow-hidden -z-10 pointer-events-none"
    >
      <motion.div
        style={{ y: y1 }}
        className="absolute left-1/2 top-[-15%] -translate-x-1/2"
      >
        <AuraVibrant size={mainSize} variant="vibrant" />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute -right-32 top-1/3"
      >
        <AuraVibrant size={softSize} variant="soft" />
      </motion.div>
    </div>
  );
}
