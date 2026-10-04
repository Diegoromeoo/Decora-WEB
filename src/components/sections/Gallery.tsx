"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { gallery } from "@/data/gallery";

export function Gallery({
  full = false,
}: {
  full?: boolean;
}) {
  const items = full ? gallery : gallery.slice(0, 6);

  return (
    <Section className="relative">
      <Container>
        <SectionHeader
          eyebrow="Galería"
          title={full ? "Trabajos que ya entregamos" : "Algunos trabajos recientes"}
          description="Fotografías reales de proyectos para nuestros clientes en Guadalajara y foráneos."
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden glass gradient-stroke"
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(251,191,36,0.55), rgba(249,115,22,0.45), rgba(27,62,143,0.45))",
                  mixBlendMode: "multiply",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-xs uppercase tracking-widest text-[#fbbf24]">
                  {it.category}
                </div>
                <div className="text-sm sm:text-base font-medium text-white">
                  {it.alt}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!full && (
          <div className="mt-12 text-center">
            <Link
              href="/galeria"
              className="inline-flex items-center gap-2 text-sm text-[#1b3e8f] hover:text-[#f97316] transition-colors"
            >
              Ver galería completa →
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
