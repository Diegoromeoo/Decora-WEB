"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { site, waLink } from "@/data/site";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/galeria", label: "Galería" },
  { href: "/cotizar", label: "Cotizar" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[#f9f6ee]/80 border-b border-black/[0.06] shadow-[0_4px_24px_-12px_rgba(22,22,29,0.12)]"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo size={40} priority />
            <span className="font-display font-semibold tracking-tight text-base sm:text-lg text-[#16161d]">
              {site.name}
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "px-4 py-2 text-sm rounded-full transition-colors",
                      active
                        ? "text-[#16161d] bg-black/[0.05]"
                        : "text-[#4a4a55] hover:text-[#16161d] hover:bg-black/[0.04]"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              href={waLink(`Hola ${site.name}, quisiera una cotización`)}
              variant="primary"
              size="md"
            >
              <MessageCircle className="size-4" />
              Cotizar
            </Button>
          </div>

          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="lg:hidden p-2 -mr-2 rounded-full hover:bg-black/[0.05] text-[#16161d]"
            onClick={() => setOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="size-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="m"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="size-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="lg:hidden overflow-hidden border-t border-black/[0.06] backdrop-blur-xl bg-[#f9f6ee]/95"
          >
            <Container>
              <ul className="py-4 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block px-3 py-3 rounded-xl text-[#4a4a55] hover:text-[#16161d] hover:bg-black/[0.04]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Button
                    href={waLink(`Hola ${site.name}, quisiera una cotización`)}
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    <MessageCircle className="size-4" />
                    Cotizar por WhatsApp
                  </Button>
                </li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
