// Single source of truth for business data.
// Update here and it flows everywhere in the site.

export const site = {
  name: "DECORA TEXTIL",
  tagline: "Personalizamos lo que imaginas",
  description:
    "Imprenta y personalización textil en Guadalajara. Sublimación, serigrafía, DTF, bordado, vinil, lonas, stickers y más. Cotización rápida por WhatsApp.",
  url: "https://decoratextil.mx",
  locale: "es-MX",
  city: "Guadalajara",
  state: "Jalisco",
  country: "México",

  // Contact
  whatsapp: "523337238350", // wa.me format, no + or spaces
  phoneDisplay: "+52 33 3723 8350",
  email: "decora.personalizadoo@gmail.com",

  // Hours
  hours: {
    weekdays: "Lunes a Sábado · 7:00 am – 9:00 pm",
    sunday: "Domingo cerrado",
  },

  // Address — TODO: replace with exact street address when provided
  address: {
    street: "Guadalajara, Jalisco",
    city: "Guadalajara",
    state: "Jalisco",
    zip: "44100",
    country: "MX",
    full: "Guadalajara, Jalisco, México",
  },

  // Google Maps embed — using a Guadalajara-centered placeholder.
  // Replace `mapsEmbedSrc` with the exact business address embed when available.
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Guadalajara,Jalisco,Mexico&output=embed",
  mapsLink: "https://maps.google.com/?q=Guadalajara,Jalisco,Mexico",

  // Socials
  socials: {
    instagram: "https://www.instagram.com/decora.textiles/",
    instagramHandle: "@decora.textiles",
    facebook: "https://www.facebook.com/profile.php?id=100063502991183",
    facebookName: "Playeras y tazas personalizadas Guadalajara",
  },
} as const;

export const waLink = (text?: string) => {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
};
