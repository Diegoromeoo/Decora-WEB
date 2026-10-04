"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { faqs } from "@/data/faq";

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="relative">
      <Container>
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Todo lo que necesitas saber"
          description="¿Aún tienes dudas? Escríbenos por WhatsApp y resolvemos al instante."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={f.q}
                className="rounded-2xl glass gradient-stroke overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-base sm:text-lg text-[#16161d]">
                    {f.q}
                  </span>
                  <span
                    className={`size-8 shrink-0 inline-flex items-center justify-center rounded-full bg-black/[0.04] text-[#1b3e8f] transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-[#f97316]/10 text-[#f97316]" : ""
                    }`}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-[#4a4a55] leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
