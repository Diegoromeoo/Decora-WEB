import type { Metadata } from "next";
import { Gallery } from "@/components/sections/Gallery";
import { CTABanner } from "@/components/sections/CTABanner";
import { Container } from "@/components/ui/Container";
import { AuroraBackdrop } from "@/components/ui/GradientBlob";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Fotografías de trabajos personalizados entregados a clientes en Guadalajara y foráneo: textiles, lonas, stickers, bordados y más.",
  openGraph: { title: "Galería · DECORA TEXTIL" },
};

export default function GaleriaPage() {
  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <AuroraBackdrop />
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-[#4a4a55] mb-4">
              Trabajos
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-[#16161d]">
              Nuestra <span className="text-gradient">galería</span>
            </h1>
            <p className="mt-5 text-lg text-[#4a4a55] leading-relaxed">
              Una selección de proyectos personalizados que hemos producido
              para emprendedores, marcas y empresas.
            </p>
          </div>
        </Container>
      </section>

      <Gallery full />
      <CTABanner />
    </>
  );
}
