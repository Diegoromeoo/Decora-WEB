import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { AuroraBackdrop } from "@/components/ui/GradientBlob";
import { Button } from "@/components/ui/Button";
import { site, waLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Visítanos en Guadalajara o escríbenos. WhatsApp, teléfono, email y redes sociales de DECORA TEXTIL.",
  openGraph: { title: "Contacto · DECORA TEXTIL" },
};

export default function ContactoPage() {
  const items = [
    {
      icon: Phone,
      title: "Teléfono",
      value: site.phoneDisplay,
      href: `tel:${site.phoneDisplay.replace(/\s/g, "")}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: site.phoneDisplay,
      href: waLink(`Hola ${site.name}, quisiera información`),
    },
    {
      icon: Mail,
      title: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: MapPin,
      title: "Ubicación",
      value: site.address.full,
      href: site.mapsLink,
    },
  ];

  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <AuroraBackdrop />
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-[#4a4a55] mb-4">
              Estamos para ti
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-[#16161d]">
              <span className="text-gradient">Contáctanos</span>
            </h1>
            <p className="mt-5 text-lg text-[#4a4a55] leading-relaxed">
              La forma más rápida es WhatsApp. También puedes llamarnos,
              escribir un email o visitarnos.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative pb-12">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((it) => {
              const Icon = it.icon;
              const external = it.href.startsWith("http");
              return (
                <a
                  key={it.title}
                  href={it.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group block rounded-2xl glass gradient-stroke p-6 hover:glow-warm transition-shadow"
                >
                  <div className="size-12 rounded-xl bg-white border border-black/[0.06] inline-flex items-center justify-center mb-4">
                    <Icon className="size-5 text-[#1b3e8f]" />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#4a4a55]">
                    {it.title}
                  </div>
                  <div className="mt-1 text-sm sm:text-base font-medium text-[#16161d] group-hover:text-[#1b3e8f] transition-colors">
                    {it.value}
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative pb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl glass gradient-stroke p-6 lg:col-span-1">
              <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2 text-[#16161d]">
                <Clock className="size-5 text-[#f97316]" /> Horario
              </h3>
              <p className="text-[#16161d]/85 leading-relaxed">
                {site.hours.weekdays}
                <br />
                <span className="text-[#4a4a55]">{site.hours.sunday}</span>
              </p>

              <h3 className="font-display text-xl font-semibold mt-8 mb-4 text-[#16161d]">
                Redes sociales
              </h3>
              <div className="flex gap-3">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="size-11 rounded-full bg-white border border-black/[0.08] inline-flex items-center justify-center text-[#1b3e8f] hover:text-[#f97316] hover:border-[#f97316]/30 transition"
                >
                  <InstagramIcon className="size-5" />
                </a>
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="size-11 rounded-full bg-white border border-black/[0.08] inline-flex items-center justify-center text-[#1b3e8f] hover:text-[#f97316] hover:border-[#f97316]/30 transition"
                >
                  <FacebookIcon className="size-5" />
                </a>
              </div>

              <div className="mt-8">
                <Button
                  href={waLink(`Hola ${site.name}, quisiera información`)}
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle className="size-5" />
                  Escribir por WhatsApp
                </Button>
              </div>
            </div>

            <div className="rounded-2xl glass gradient-stroke overflow-hidden lg:col-span-2 min-h-[380px] relative">
              <iframe
                title="Ubicación DECORA TEXTIL"
                src={site.mapsEmbedSrc}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
