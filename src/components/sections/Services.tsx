"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { services } from "@/data/services";

export function Services({
  showAll = false,
  title = "Lo que hacemos",
  description = "Catálogo completo para personalizar tu marca: textil, gran formato, papel y promocionales.",
}: {
  showAll?: boolean;
  title?: string;
  description?: string;
}) {
  const list = showAll ? services : services.slice(0, 6);

  return (
    <Section id="servicios" className="relative">
      <Container>
        <SectionHeader
          eyebrow="Servicios"
          title={title}
          description={description}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {list.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl glass gradient-stroke hover:glow-warm transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center justify-center size-10 rounded-xl bg-white/90 backdrop-blur border border-black/[0.06]">
                    <Icon className="size-5 text-[#1b3e8f]" />
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-[#16161d]">
                      {s.name}
                    </h3>
                    <ArrowUpRight className="size-5 text-black/30 group-hover:text-[#f97316] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="mt-2 text-sm text-[#4a4a55] leading-relaxed">
                    {s.short}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-black/[0.04] text-[#4a4a55] border border-black/[0.05]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {!showAll && (
          <div className="mt-12 text-center">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm text-[#1b3e8f] hover:text-[#f97316] transition-colors"
            >
              Ver todos los servicios
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
