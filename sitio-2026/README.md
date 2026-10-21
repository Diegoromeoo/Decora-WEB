# Decora Textiles · sitio 2026 (estático)

Rediseño de la portada y del catálogo digital 2026. HTML, CSS y JavaScript sin paso de compilación.

- `index.html` portada · `catalogo.html` catálogo + cotizador por WhatsApp
- `js/vendor/` GSAP 3.12.5 propio (sin CDN)
- `vercel.json` cabeceras de seguridad (CSP estricta, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy)

## Despliegue en Vercel
Proyecto nuevo con **Root Directory = `sitio-2026`**, **Framework Preset = Other**, sin comando de build ni directorio de salida.

## Probar en local con las mismas cabeceras
`python3 -m http.server` sirve el sitio, pero sin cabeceras; para validar la CSP use un servidor que lea `vercel.json`.
