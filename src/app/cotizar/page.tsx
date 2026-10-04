import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm/QuoteForm";
import { Container } from "@/components/ui/Container";
import { AuroraBackdrop } from "@/components/ui/GradientBlob";

export const metadata: Metadata = {
  title: "Cotizar",
  description:
    "Cotiza tu proyecto en minutos. Recibe respuesta personalizada por WhatsApp con precio y tiempo de entrega.",
  openGraph: { title: "Cotizar · DECORA TEXTIL" },
};

export default function CotizarPage() {
  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <AuroraBackdrop />
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-[#4a4a55] mb-4">
              Cotización rápida
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-[#16161d]">
              Cuéntanos tu <span className="text-gradient">proyecto</span>
            </h1>
            <p className="mt-5 text-lg text-[#4a4a55] leading-relaxed">
              4 pasos cortos. Al terminar abrimos WhatsApp con todos tus datos
              listos para enviar.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative pb-24">
        <Container>
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}
