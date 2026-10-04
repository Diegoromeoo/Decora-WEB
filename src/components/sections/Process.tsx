"use client";

import { motion } from "framer-motion";
import { MousePointerClick, FileText, MessageCircle, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";

const steps = [
  { icon: MousePointerClick, title: "Elige tu servicio", desc: "Cuéntanos qué quieres personalizar." },
  { icon: FileText, title: "Especifica el detalle", desc: "Cantidad, medidas, archivos y fecha." },
  { icon: MessageCircle, title: "Cotización por WhatsApp", desc: "Respondemos en minutos con precio y tiempo." },
  { icon: Truck, title: "Producimos y entregamos", desc: "Entrega en Guadalajara o envío foráneo." },
];

export function Process() {
  return (
    <Section className="relative">
      <Container>
        <SectionHeader
          eyebrow="Proceso"
          title="De la idea a la entrega en 4 pasos"
          description="Cotizar con nosotros es rápido y transparente. Sin formularios eternos."
        />

        <div className="relative">
          {/* horizontal gradient line, desktop only */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-10 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #1b3e8f 15%, #f97316 50%, #fbbf24 85%, transparent)",
              opacity: 0.5,
            }}
          />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="text-center relative"
                >
                  <div className="mb-5">
                    <div className="relative mx-auto size-20 inline-flex items-center justify-center">
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, #fbbf24, #f97316 50%, #1b3e8f)",
                          filter: "blur(14px)",
                          opacity: 0.45,
                        }}
                      />
                      <div className="relative size-20 rounded-full bg-white border border-black/[0.08] inline-flex items-center justify-center shadow-[0_8px_24px_-12px_rgba(22,22,29,0.18)]">
                        <Icon className="size-7 text-[#1b3e8f]" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#4a4a55] mb-2">
                    Paso {i + 1}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#16161d]">{s.title}</h3>
                  <p className="mt-2 text-sm text-[#4a4a55] leading-relaxed">
                    {s.desc}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
