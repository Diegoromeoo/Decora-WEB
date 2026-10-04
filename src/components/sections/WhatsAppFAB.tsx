"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { site, waLink } from "@/data/site";

export function WhatsAppFAB() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={waLink(`Hola ${site.name}, quisiera información`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 inline-flex items-center justify-center size-14 sm:size-16 rounded-full bg-[#25D366] text-white pulse-glow transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } hover:scale-110`}
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
