import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CTABanner } from "@/components/sections/CTABanner";
import { Container } from "@/components/ui/Container";
import { AuroraBackdrop } from "@/components/ui/GradientBlob";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Catálogo completo: sublimación, serigrafía, DTF, bordado, lonas, viniles, stickers, banners, tarjetas y vinil automotriz en Guadalajara.",
  openGraph: { title: "Servicios · DECORA TEXTIL" },
};

export default function ServiciosPage() {
  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <AuroraBackdrop />
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-[#4a4a55] mb-4">
              Catálogo
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-[#16161d]">
              Todo lo que <span className="text-gradient">podemos personalizar</span>
            </h1>
            <p className="mt-5 text-lg text-[#4a4a55] leading-relaxed">
              12 servicios bajo el mismo techo, con la calidad que tu marca
              merece. Mismo tiempo de respuesta, mismo cuidado en el detalle.
            </p>
          </div>
        </Container>
      </section>

      <Services showAll title="Nuestro catálogo completo" description="Toca cualquier servicio para conocer más o pasa directo a cotizar." />
      <Process />
      <CTABanner />
    </>
  );
}
