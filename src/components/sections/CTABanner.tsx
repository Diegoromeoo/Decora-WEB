"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AuraVibrant } from "@/components/ui/AuraVibrant";
import { site, waLink } from "@/data/site";

export function CTABanner() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass gradient-stroke p-8 sm:p-14 text-center"
        >
          <AuraVibrant
            size={680}
            variant="vibrant"
            className="absolute -top-40 -right-32"
          />
          <AuraVibrant
            size={520}
            variant="soft"
            className="absolute -bottom-40 -left-32"
          />

          <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#16161d]">
            ¿Listo para tu <span className="text-gradient">próximo proyecto</span>?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[#4a4a55]">
            Mándanos los detalles y te respondemos en minutos con tu cotización.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button href="/cotizar" size="lg">
              Cotizar mi proyecto <ArrowRight className="size-4" />
            </Button>
            <Button
              href={waLink(`Hola ${site.name}, quisiera cotizar un proyecto`)}
              variant="whatsapp"
              size="lg"
            >
              <MessageCircle className="size-4" />
              WhatsApp directo
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
