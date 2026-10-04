"use client";

import { motion, type Easing } from "framer-motion";

const easeOutExpo: Easing = [0.22, 1, 0.36, 1];
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-20 sm:py-28 lg:py-32", className)}
    >
      {children}
    </section>
  );
}

/**
 * Animated section header. Fades + slides up when scrolled into view.
 * Framer Motion classes used: `whileInView` + `viewport once`.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className={cn(
        "mb-12 sm:mb-16",
        centered && "text-center mx-auto max-w-3xl"
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-[#4a4a55] mb-4">
          <span className="size-1.5 rounded-full bg-gradient-to-r from-[#1b3e8f] to-[#f97316]" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#16161d]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#4a4a55] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
