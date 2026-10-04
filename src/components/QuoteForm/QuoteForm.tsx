"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { services } from "@/data/services";
import { buildWhatsAppUrl, type QuotePayload } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

type StepKey = "service" | "specs" | "contact" | "summary";

const steps: { key: StepKey; label: string }[] = [
  { key: "service", label: "Servicio" },
  { key: "specs", label: "Especificaciones" },
  { key: "contact", label: "Contacto" },
  { key: "summary", label: "Resumen" },
];

export function QuoteForm({
  defaultService,
}: {
  defaultService?: string;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuotePayload>({
    service: defaultService,
  });

  const update = <K extends keyof QuotePayload>(k: K, v: QuotePayload[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const canNext = useMemo(() => {
    if (step === 0) return Boolean(data.service);
    if (step === 1) return Boolean(data.quantity || data.details);
    if (step === 2) return Boolean(data.name && data.phone);
    return true;
  }, [step, data]);

  const next = () => canNext && setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const waUrl = buildWhatsAppUrl(data);

  return (
    <div className="relative">
      {/* Stepper */}
      <ol className="flex items-center justify-between mb-10 max-w-2xl mx-auto">
        {steps.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={s.key} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`size-9 rounded-full inline-flex items-center justify-center text-sm font-semibold transition-all ${
                    active
                      ? "bg-[linear-gradient(120deg,#1b3e8f,#3b5fb8)] text-white glow-warm"
                      : done
                      ? "bg-[#1b3e8f] text-white"
                      : "bg-black/[0.06] text-[#4a4a55]"
                  }`}
                >
                  {done ? <Check className="size-4" /> : i + 1}
                </div>
                <span
                  className={`mt-2 text-[11px] sm:text-xs uppercase tracking-wider ${
                    active ? "text-[#16161d]" : "text-[#4a4a55]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="h-px flex-1 bg-black/10 mx-1 mb-5" />
              )}
            </li>
          );
        })}
      </ol>

      <div className="rounded-3xl glass gradient-stroke p-6 sm:p-10 max-w-2xl mx-auto min-h-[380px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-display text-2xl font-semibold mb-1 text-[#16161d]">
                ¿Qué quieres personalizar?
              </h3>
              <p className="text-sm text-[#4a4a55] mb-6">
                Elige el servicio que más se acerque.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {services.map((s) => {
                  const Icon = s.icon;
                  const selected = data.service === s.name;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => update("service", s.name)}
                      className={`p-4 rounded-xl text-left transition-all border ${
                        selected
                          ? "border-[#1b3e8f] bg-white glow-warm"
                          : "border-black/[0.08] bg-white/60 hover:border-[#1b3e8f]/40 hover:bg-white"
                      }`}
                    >
                      <Icon
                        className={`size-5 mb-2 ${
                          selected ? "text-[#f97316]" : "text-[#1b3e8f]"
                        }`}
                      />
                      <div className="text-sm font-medium text-[#16161d]">
                        {s.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold mb-1 text-[#16161d]">
                  Cuéntanos el detalle
                </h3>
                <p className="text-sm text-[#4a4a55] mb-6">
                  Mientras más sepamos, más rápida será tu cotización.
                </p>
              </div>

              <Field label="Cantidad">
                <input
                  type="text"
                  placeholder="Ej. 50 playeras"
                  value={data.quantity ?? ""}
                  onChange={(e) => update("quantity", e.target.value)}
                  className={inputClasses}
                />
              </Field>
              <Field label="Tallas / medidas (opcional)">
                <input
                  type="text"
                  placeholder="Ej. 20S, 20M, 10L"
                  value={data.size ?? ""}
                  onChange={(e) => update("size", e.target.value)}
                  className={inputClasses}
                />
              </Field>
              <Field label="Colores (opcional)">
                <input
                  type="text"
                  placeholder="Ej. Negro, blanco"
                  value={data.color ?? ""}
                  onChange={(e) => update("color", e.target.value)}
                  className={inputClasses}
                />
              </Field>
              <Field label="Fecha que la necesitas (opcional)">
                <input
                  type="text"
                  placeholder="Ej. 15 de junio"
                  value={data.deadline ?? ""}
                  onChange={(e) => update("deadline", e.target.value)}
                  className={inputClasses}
                />
              </Field>
              <Field label="Detalles adicionales">
                <textarea
                  rows={4}
                  placeholder="Describe tu proyecto, archivos, referencias…"
                  value={data.details ?? ""}
                  onChange={(e) => update("details", e.target.value)}
                  className={inputClasses}
                />
              </Field>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold mb-1 text-[#16161d]">
                  ¿Cómo te contactamos?
                </h3>
                <p className="text-sm text-[#4a4a55] mb-6">
                  Solo nombre y WhatsApp es suficiente.
                </p>
              </div>
              <Field label="Nombre">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={data.name ?? ""}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClasses}
                />
              </Field>
              <Field label="WhatsApp / Teléfono">
                <input
                  type="tel"
                  placeholder="Ej. 33 1234 5678"
                  value={data.phone ?? ""}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClasses}
                />
              </Field>
              <Field label="Email (opcional)">
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={data.email ?? ""}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClasses}
                />
              </Field>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-display text-2xl font-semibold mb-1 text-[#16161d]">
                Revisa tu cotización
              </h3>
              <p className="text-sm text-[#4a4a55] mb-6">
                Al enviar, abriremos WhatsApp con tus datos.
              </p>
              <dl className="space-y-3 text-sm">
                <Row label="Servicio" value={data.service} />
                <Row label="Cantidad" value={data.quantity} />
                <Row label="Tallas" value={data.size} />
                <Row label="Colores" value={data.color} />
                <Row label="Fecha" value={data.deadline} />
                <Row label="Detalles" value={data.details} />
                <Row label="Nombre" value={data.name} />
                <Row label="Teléfono" value={data.phone} />
                <Row label="Email" value={data.email} />
              </dl>

              <div className="mt-8">
                <Button
                  href={waUrl}
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle className="size-5" />
                  Enviar por WhatsApp
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/[0.06]">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm text-[#4a4a55] hover:text-[#16161d] disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="size-4" /> Atrás
          </button>

          {step < steps.length - 1 ? (
            <Button
              onClick={next}
              variant={canNext ? "primary" : "secondary"}
              className={!canNext ? "opacity-50 pointer-events-none" : ""}
            >
              Siguiente <ArrowRight className="size-4" />
            </Button>
          ) : (
            <span className="text-xs text-[#4a4a55]">Paso final</span>
          )}
        </div>
      </div>
    </div>
  );
}

const inputClasses =
  "w-full bg-white border border-black/[0.08] rounded-xl px-4 py-3 text-sm text-[#16161d] placeholder:text-[#a0a0a8] focus:outline-none focus:border-[#1b3e8f] focus:ring-2 focus:ring-[#1b3e8f]/15 transition";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-[#4a4a55] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-4 py-2 border-b border-black/[0.06]">
      <dt className="w-28 shrink-0 text-[#4a4a55]">{label}</dt>
      <dd className="text-[#16161d]">{value}</dd>
    </div>
  );
}
