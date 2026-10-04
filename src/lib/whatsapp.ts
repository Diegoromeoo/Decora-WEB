import { site, waLink } from "@/data/site";

export type QuotePayload = {
  service?: string;
  quantity?: string;
  size?: string;
  color?: string;
  deadline?: string;
  details?: string;
  name?: string;
  phone?: string;
  email?: string;
};

export function buildWhatsAppUrl(data: QuotePayload): string {
  const lines: string[] = [
    `¡Hola ${site.name}! Quiero una cotización:`,
    "",
  ];
  if (data.service) lines.push(`• Servicio: ${data.service}`);
  if (data.quantity) lines.push(`• Cantidad: ${data.quantity}`);
  if (data.size) lines.push(`• Tallas / medidas: ${data.size}`);
  if (data.color) lines.push(`• Colores: ${data.color}`);
  if (data.deadline) lines.push(`• Fecha que la necesito: ${data.deadline}`);
  if (data.details) lines.push(`• Detalles: ${data.details}`);
  lines.push("");
  if (data.name) lines.push(`Nombre: ${data.name}`);
  if (data.phone) lines.push(`Teléfono: ${data.phone}`);
  if (data.email) lines.push(`Email: ${data.email}`);
  lines.push("");
  lines.push("¡Gracias!");

  return waLink(lines.join("\n"));
}
