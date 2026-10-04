"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { AuroraBackdrop } from "@/components/ui/GradientBlob";
import { site, waLink } from "@/data/site";

/**
 * Hero with staggered children: each block fades + slides up in sequence.
 * Uses framer-motion's `variants` API for orchestrated entry animations.
 */
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-24 overflow-hidden">
      <AuroraBackdrop />

      <Container>
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <Logo size={96} priority />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm text-[#4a4a55]"
          >
            <MapPin className="size-3.5 text-[#f97316]" />
            Entrega rápida en {site.city}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display mt-6 text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-[#16161d]"
          >
            Personalizamos{" "}
            <span className="text-gradient">lo que imaginas</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base sm:text-lg text-[#4a4a55] leading-relaxed"
          >
            Imprenta y personalización textil en Guadalajara. Sublimación,
            DTF, serigrafía, bordado, lonas, viniles y más — con la calidad
            que tu marca merece.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          >
            <Button href="/cotizar" size="lg">
              Cotizar mi proyecto
              <ArrowRight className="size-4" />
            </Button>
            <Button
              href={waLink(`Hola ${site.name}, quisiera cotizar un proyecto`)}
              variant="whatsapp"
              size="lg"
            >
              <MessageCircle className="size-4" />
              WhatsApp directo
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex items-center gap-6 text-xs sm:text-sm text-[#4a4a55]"
          >
            <Link href="/servicios" className="hover:text-[#16161d] transition-colors">
              Ver servicios →
            </Link>
            <span className="size-1 rounded-full bg-black/15" />
            <Link href="/galeria" className="hover:text-[#16161d] transition-colors">
              Ver galería →
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
