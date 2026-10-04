// DEMO testimonials — replace with real reviews when available.
export type Review = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    name: "Mariana López",
    role: "Boutique 'Lúa Studio'",
    text: "Pedí 80 playeras DTF para un lanzamiento y quedaron impecables. Entregaron antes de la fecha prometida.",
    rating: 5,
  },
  {
    name: "Carlos Ramírez",
    role: "Gimnasio CrossFit GDL",
    text: "Llevamos 2 años haciéndoles uniformes. Bordado de altísima calidad y trato siempre rápido por WhatsApp.",
    rating: 5,
  },
  {
    name: "Sofía Vega",
    role: "Organizadora de eventos",
    text: "Las bolsas esmeriladas con mi logo fueron el detalle perfecto para mis invitadas. Mil gracias DECORA.",
    rating: 5,
  },
  {
    name: "Andrés Murillo",
    role: "Fundador, Café Norte",
    text: "Hicieron la rotulación completa del local y las tazas sublimadas. Profesionales de principio a fin.",
    rating: 5,
  },
  {
    name: "Patricia Núñez",
    role: "Despacho contable",
    text: "Tarjetas de presentación con acabado UV: se ven y se sienten premium. Cotización en menos de 10 minutos.",
    rating: 5,
  },
  {
    name: "Diego Hernández",
    role: "Equipo deportivo amateur",
    text: "Serigrafía perfecta en 24 jerseys con dorsales personalizados. Precio honesto y entrega puntual.",
    rating: 5,
  },
];
