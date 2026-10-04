import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Layers,
  Printer,
  Scissors,
  Image as ImageIcon,
  Sticker,
  CreditCard,
  ShoppingBag,
  Flag,
  Frame,
  Car,
  Shirt,
} from "lucide-react";

export type Service = {
  id: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  image: string;
  highlights: string[];
};

// Unsplash placeholders — replace with real product photography.
export const services: Service[] = [
  {
    id: "sublimacion",
    name: "Sublimación",
    short: "Color vivo y duradero en poliéster.",
    description:
      "Transferimos diseños a tazas, playeras y artículos promocionales con detalle y colores que no se decoloran.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Tazas", "Playeras poliéster", "Promocionales"],
  },
  {
    id: "serigrafia",
    name: "Serigrafía",
    short: "Ideal para tirajes grandes con tintas opacas.",
    description:
      "Estampado profesional pieza por pieza, perfecto para uniformes, eventos y empresas que necesitan volumen.",
    icon: Layers,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Uniformes", "Eventos", "Marcas"],
  },
  {
    id: "dtf-vinil",
    name: "DTF / Vinil Textil",
    short: "Detalle fotográfico en cualquier tela.",
    description:
      "Transferencias DTF y vinil de corte para playeras, sudaderas y prendas oscuras con tacto suave.",
    icon: Shirt,
    image:
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Full color", "Prendas oscuras", "Tirajes cortos"],
  },
  {
    id: "bordado",
    name: "Bordado Computarizado",
    short: "Acabado premium con hilos de alta densidad.",
    description:
      "Bordado profesional para logos corporativos, gorras y prendas que requieren textura y durabilidad.",
    icon: Scissors,
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Logos", "Gorras", "Uniformes"],
  },
  {
    id: "lona",
    name: "Impresión en Lona",
    short: "Anuncios y publicidad en gran formato.",
    description:
      "Lonas resistentes a la intemperie, con ojillos y refuerzo. Ideal para anuncios, fachadas y eventos.",
    icon: Printer,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Gran formato", "Resistente al sol", "Con ojillos"],
  },
  {
    id: "viniles",
    name: "Viniles",
    short: "De corte y decorativos para cualquier superficie.",
    description:
      "Viniles para escaparates, vidrios, cristales, paredes y rotulación de negocios.",
    icon: ImageIcon,
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Escaparates", "Decorativo", "Rotulación"],
  },
  {
    id: "tarjetas",
    name: "Tarjetas de Presentación",
    short: "Diseño + impresión premium.",
    description:
      "Tarjetas con acabados mate, brillante, UV selectivo y papeles especiales para que tu marca destaque.",
    icon: CreditCard,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Premium", "UV selectivo", "Diseño incluido"],
  },
  {
    id: "bolsas-esmeriladas",
    name: "Bolsas Esmeriladas",
    short: "Empaque personalizado con tu marca.",
    description:
      "Bolsas esmeriladas con tu logotipo, perfectas para boutiques, regalos corporativos y eventos.",
    icon: ShoppingBag,
    image:
      "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Boutiques", "Eventos", "Regalo corporativo"],
  },
  {
    id: "banners",
    name: "Banners Publicitarios",
    short: "Promoción visible y profesional.",
    description:
      "Banners roll-up, banners de evento y publicidad exterior con instalación opcional.",
    icon: Flag,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Roll-up", "Exteriores", "Eventos"],
  },
  {
    id: "stickers",
    name: "Stickers",
    short: "Holográficos, troquelados o transparentes.",
    description:
      "Stickers en vinil de alta resistencia, troquelados a la forma que quieras, en cualquier tamaño y acabado.",
    icon: Sticker,
    image:
      "https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Troquelados", "Holográficos", "Resistentes"],
  },
  {
    id: "cuadros",
    name: "Cuadros Personalizados",
    short: "Regalos memorables con tus fotos.",
    description:
      "Cuadros impresos en alta calidad sobre canvas o foam, perfectos para regalo o decoración personal.",
    icon: Frame,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Canvas", "Foam", "Cualquier medida"],
  },
  {
    id: "vinil-automotriz",
    name: "Vinil Automotriz",
    short: "Rotulación y wraps para vehículos.",
    description:
      "Rotulación de unidades comerciales, wraps decorativos y publicidad móvil con vinil de exterior.",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&auto=format&fit=crop",
    highlights: ["Flotillas", "Wraps", "Publicidad móvil"],
  },
];

export const serviceById = (id: string) => services.find((s) => s.id === id);
