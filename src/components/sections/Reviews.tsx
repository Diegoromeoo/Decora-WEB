"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { reviews } from "@/data/reviews";

export function Reviews() {
  const [i, setI] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setI((v) => (v + 1) % reviews.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    setI((v) => (v + dir + reviews.length) % reviews.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const review = reviews[i];

  return (
    <Section className="relative">
      <Container>
        <SectionHeader
          eyebrow="Testimonios"
          title="Lo que dicen nuestros clientes"
          description="Marcas, emprendedores y empresas en Guadalajara confían en nosotros."
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="relative rounded-3xl glass gradient-stroke p-8 sm:p-12 min-h-[280px]">
            <Quote className="absolute top-6 left-6 size-8 text-[#1b3e8f]/15" />

            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-5">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="size-5 text-[#f97316] fill-[#fbbf24]" />
                  ))}
                </div>
                <p className="text-lg sm:text-xl text-[#16161d]/90 leading-relaxed italic">
                  “{review.text}”
                </p>
                <div className="mt-6">
                  <div className="font-display font-semibold text-[#16161d]">{review.name}</div>
                  <div className="text-sm text-[#4a4a55]">{review.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="size-10 rounded-full glass gradient-stroke flex items-center justify-center hover:bg-white transition text-[#16161d]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setI(idx);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                  }}
                  aria-label={`Ir al testimonio ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i
                      ? "w-8 bg-gradient-to-r from-[#1b3e8f] to-[#f97316]"
                      : "w-1.5 bg-black/15"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="size-10 rounded-full glass gradient-stroke flex items-center justify-center hover:bg-white transition text-[#16161d]"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
