import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";
import { services } from "@/data/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-20 border-t border-black/[0.06] bg-[#f3efe4]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo size={64} />
            </Link>
            <p className="mt-4 text-sm text-[#4a4a55] leading-relaxed max-w-xs">
              {site.tagline}. Imprenta y personalización en {site.city},{" "}
              {site.state}.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="size-10 rounded-full bg-white border border-black/[0.06] inline-flex items-center justify-center text-[#1b3e8f] hover:text-[#f97316] hover:border-[#f97316]/30 transition"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="size-10 rounded-full bg-white border border-black/[0.06] inline-flex items-center justify-center text-[#1b3e8f] hover:text-[#f97316] hover:border-[#f97316]/30 transition"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-[#16161d]">Navegación</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/", label: "Inicio" },
                { href: "/servicios", label: "Servicios" },
                { href: "/galeria", label: "Galería" },
                { href: "/cotizar", label: "Cotizar" },
                { href: "/contacto", label: "Contacto" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#4a4a55] hover:text-[#1b3e8f] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-[#16161d]">Servicios</h4>
            <ul className="space-y-2.5 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    href="/servicios"
                    className="text-[#4a4a55] hover:text-[#1b3e8f] transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-[#16161d]">Contacto</h4>
            <ul className="space-y-3 text-sm text-[#4a4a55]">
              <li className="flex items-start gap-2.5">
                <Phone className="size-4 shrink-0 mt-0.5 text-[#1b3e8f]" />
                <a
                  href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`}
                  className="hover:text-[#1b3e8f]"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="size-4 shrink-0 mt-0.5 text-[#f97316]" />
                <a href={`mailto:${site.email}`} className="hover:text-[#1b3e8f]">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 shrink-0 mt-0.5 text-[#1b3e8f]" />
                {site.address.full}
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 shrink-0 mt-0.5 text-[#f97316]" />
                <span>
                  {site.hours.weekdays}
                  <br />
                  {site.hours.sunday}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/[0.06] py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#4a4a55]">
          <div>
            © {year} {site.name}. Todos los derechos reservados.
          </div>
          <div>Hecho con cariño en Guadalajara.</div>
        </div>
      </Container>
    </footer>
  );
}
