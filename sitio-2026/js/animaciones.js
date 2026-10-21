/* =====================================================================
   DECORA TEXTILES · Animaciones (un solo archivo, GSAP 3.12.5 + ScrollTrigger)

   REGLAS DE MOVIMIENTO
   - Todo el contenido está en el HTML y es visible sin este archivo. Los estados
     iniciales ("escondido") los pone GSAP al arrancar; si GSAP no carga, no pasa nada.
   - prefers-reduced-motion: este archivo no arranca ninguna animación (solo limpia).
   - Solo se animan transform y opacity (x, y, scale, rotation, opacity, skew).
     Excepción deliberada: el texto de los contadores.
   - Una animación grande por sección; el resto es discreto:
       Portada ........ titular por líneas + itálica azul al final + logotipo "entrando en registro"
                        (+ aura azul con parallax y luz que sigue al cursor, heredadas del sitio anterior)
       Quiénes somos .. revelado escalonado de las 3 tarjetas
       Qué hacemos .... revelado escalonado
       Catálogo ....... contadores + carrusel compacto de categorías en bucle (CSS)
       Con quién ya trabajamos: cifras que cuentan al entrar + cinta de servicios en bucle (CSS)
       Cómo pedir ..... GRAN ANIMACIÓN: la línea se dibuja con el scroll y activa cada paso
       Clientes ....... revelado escalonado
       Historia ....... revelado escalonado
       Catálogo (pág.)  tarjetas por categoría escalonadas
       Cambio de página: cortina diagonal con la trama
   ===================================================================== */
(() => {
const root = document.documentElement;
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const curtain = $('#curtain');
const llegada = root.classList.contains('is-cover');

/* ---- Sin GSAP o con movimiento reducido: nada se anima y nada queda tapado ---- */
const limpiarCortina = () => { root.classList.remove('is-cover'); try { sessionStorage.removeItem('decora-t'); } catch(e) {} };
if (reduce || !window.gsap) { limpiarCortina(); return; }

const gsap = window.gsap;
const ST = window.ScrollTrigger;
gsap.config({ nullTargetWarn: false });
gsap.defaults({ ease: 'power3.out' });
const hayST = !!ST;
if (hayST) { gsap.registerPlugin(ST); ST.config({ ignoreMobileResize: true }); }

/* =====================================================================
   1. CORTINA DE TRANSICIÓN (la trama como cortina diagonal)
   Diez franjas alternadas Noche/Grafito, giradas 43° para quedar paralelas
   a las líneas del logotipo (47°). Cubren con scaleY y descubren con scaleY.
   ===================================================================== */
const barras = $$('.curtain-rot i', curtain);
const logoCortina = $('.curtain-logo', curtain);

function cubrir(alTerminar) {
  curtain.classList.add('on');
  gsap.set(barras, { scaleY: 0, transformOrigin: '50% 0%' });
  gsap.set(logoCortina, { opacity: 0, scale: .9 });
  gsap.timeline({ onComplete: alTerminar })
    .to(barras, { scaleY: 1, duration: .45, ease: 'power3.inOut', stagger: { each: .04 } }, 0)
    .to(logoCortina, { opacity: 1, scale: 1, duration: .3 }, .25);
}
function descubrir() {
  curtain.classList.add('on');
  gsap.set(barras, { scaleY: 1, transformOrigin: '50% 100%' });
  gsap.set(logoCortina, { opacity: 1, scale: 1 });
  limpiarCortina();                       // quita .is-cover; la cortina sigue cerrada por .on
  gsap.timeline({ onComplete: () => curtain.classList.remove('on') })
    .to(logoCortina, { opacity: 0, scale: 1.08, duration: .25 }, 0)
    .to(barras, { scaleY: 0, duration: .5, ease: 'power3.inOut', stagger: { each: .04 } }, .08);
}
const norm = p => p.replace(/index\.html$/, '').replace(/\/$/, '');

document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
  let url; try { url = new URL(a.href, location.href); } catch(err) { return; }
  if (url.origin !== location.origin || !/^https?:|^file:/.test(url.protocol)) return;
  if (norm(url.pathname) === norm(location.pathname)) {
    // Misma página: scroll suave nativo; el logo sin hash sube al inicio
    if (!url.hash) { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); }
    return;
  }
  e.preventDefault();
  $$('dialog[open]').forEach(d => d.close());
  let ido = false;
  const ir = () => { if (ido) return; ido = true; try { sessionStorage.setItem('decora-t', '1'); } catch(err) {} location.href = a.href; };
  cubrir(ir);
  setTimeout(ir, 1200);                    // respaldo: si algo falla, igual navega
});
addEventListener('pageshow', ev => {        // volver con "atrás": la página no debe quedar tapada
  if (ev.persisted) { curtain.classList.remove('on'); gsap.set(barras, { scaleY: 0 }); limpiarCortina(); }
});

/* =====================================================================
   2. PORTADA: titular por líneas, itálica azul al final, logotipo en registro
   ===================================================================== */
const delayPortada = llegada ? .55 : .1;
if (llegada) descubrir();

const lineas = $$('[data-hero="ln"], [data-hero="ln-em"]');
if (lineas.length) {
  const eyebrow = $('[data-hero="eyebrow"]');
  const enfasis = $$('[data-hero="ln-em"] em');
  const resto = $$('[data-hero="resto"]');
  const spin = $('[data-hero="spin"]'), logo = $('[data-hero="logo"]'), eco = $('[data-hero="eco"]');
  const nota = $('[data-hero="nota"]'), disco = $('.seal .disc');

  const tl = gsap.timeline({ delay: delayPortada });
  if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 10, duration: .6 }, 0);
  tl.from(lineas.map(l => l), { yPercent: 115, duration: 1, ease: 'expo.out', stagger: .14 }, .05);
  if (enfasis.length) tl.from(enfasis, { opacity: 0, x: -28, duration: .9, ease: 'power3.out' }, 1.0);   // la itálica azul llega al final
  if (resto.length) tl.from(resto, { opacity: 0, y: 16, duration: .7, stagger: .09 }, .55);

  if (logo) {
    // El logotipo entra girando suavemente y su "eco" azul llega a registro, como una impresión que se alinea.
    if (disco) tl.from(disco, { opacity: 0, scale: .8, duration: 1.4 }, 0);
    tl.from(logo, { opacity: 0, scale: .88, rotation: -16, duration: 1.5, ease: 'expo.out' }, .1);
    if (eco) tl.fromTo(eco, { opacity: .85, x: -22, y: 16, rotation: -5 }, { opacity: 0, x: 0, y: 0, rotation: 0, duration: 1.7, ease: 'power3.out', immediateRender: true }, .1);
    if (nota) tl.from(nota, { opacity: 0, y: 22, duration: .8 }, 1.1);
    // Al bajar, el logotipo gira un poco más (ligado al scroll)
    if (hayST && spin) gsap.to(spin, { rotation: 9, ease: 'none', scrollTrigger: { trigger: spin.closest('.hero'), start: 'top top', end: 'bottom top', scrub: true } });
  }
}

/* Aura de la portada: entra suave y se desplaza con el scroll a distinta velocidad que el contenido */
$$('.hero').forEach(h => {
  const p1 = $('.aura .p1', h), p2 = $('.aura .p2', h);
  if (!p1) return;
  gsap.from([p1, p2], { opacity: 0, scale: .85, duration: 1.4, ease: 'power2.out', delay: delayPortada });
  if (hayST) {
    gsap.to(p1, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: h, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to(p2, { yPercent: 12,  ease: 'none', scrollTrigger: { trigger: h, start: 'top top', end: 'bottom top', scrub: true } });
  }
});

/* =====================================================================
   3. CONTADORES (productos, claves, días de entrega)
   ===================================================================== */
if (hayST) $$('[data-counters]').forEach(caja => {
  const els = $$('[data-count]', caja);
  const enPortada = !!caja.closest('.hero');
  ST.create({
    trigger: caja, start: 'top 92%', once: true,
    onEnter: () => els.forEach(el => {
      const to = +(el.dataset.to || el.textContent) || 0, o = { v: 0 };
      el.textContent = '0';
      gsap.to(o, { v: to, duration: 1.6, ease: 'power2.out', delay: enPortada ? delayPortada + .8 : 0, onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('es-MX'); }, onComplete: () => { el.textContent = to.toLocaleString('es-MX'); } });
    })
  });
});

/* =====================================================================
   4. REVELADO ESCALONADO (discreto: 22 px y opacidad)
   Tarjetas de Quiénes somos, Qué hacemos, categorías, clientes, historia, compromisos.
   ===================================================================== */
if (hayST) $$('[data-stagger]').forEach(caja => {
  let items = $$('[data-item]', caja);
  if (!items.length) items = [...caja.children].filter(n => n.tagName !== 'NOSCRIPT');
  if (!items.length) return;
  gsap.from(items, { y: 22, opacity: 0, duration: .8, stagger: .1, clearProps: 'transform,opacity',
    scrollTrigger: { trigger: caja, start: 'top 86%', once: true } });
});

/* Encabezados de sección: entran en cadena (eyebrow, título, texto) */
if (hayST) $$('.sec-head, .promesas-head').forEach(h => {
  gsap.from([...h.children], { y: 24, opacity: 0, duration: .8, ease: 'expo.out', stagger: .08, clearProps: 'transform,opacity',
    scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
});

/* Bloques que entran enteros (el carrusel compacto del catálogo en la portada) */
if (hayST) $$('[data-reveal]').forEach(el => {
  gsap.from(el, { y: 22, opacity: 0, duration: .8, clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
});

/* Cierre "¿Listo para cotizar?": una sola secuencia al llegar (título que sube, canales con su icono, botones) */
if (hayST) {
  const cierre = $('.cierre');
  if (cierre) {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: { trigger: cierre, start: 'top 68%', once: true } });
    tl.from($('.eyebrow', cierre), { y: 16, opacity: 0, duration: .7, clearProps: 'transform,opacity' })
      .from($$('h2 .ln > span', cierre), { yPercent: 115, duration: 1.15, stagger: .14, clearProps: 'transform' }, '<.05')
      .from($('.lead', cierre), { y: 18, opacity: 0, duration: .8, clearProps: 'transform,opacity' }, '<.35')
      .from($('.costura', cierre), { scaleX: 0, transformOrigin: 'left center', duration: 1, ease: 'power3.inOut', clearProps: 'transform' }, '<.1')
      .from($$('.canal', cierre), { y: 34, opacity: 0, duration: .8, stagger: .09, clearProps: 'transform,opacity' }, '<.15')
      .from($$('.canal .ico-wrap', cierre), { scale: .3, rotate: -35, opacity: 0, duration: .7, stagger: .09, ease: 'back.out(2.2)', clearProps: 'transform,opacity' }, '<.12')
      .from($$('.cta-row .btn', cierre), { y: 20, opacity: 0, duration: .7, stagger: .08, clearProps: 'transform,opacity' }, '<.3');
    // El anillo grande se desplaza un poco más lento que la página: da profundidad sin pesar.
    const anillo = $('.anillo-grande', cierre);
    if (anillo) gsap.fromTo(anillo, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: cierre, start: 'top bottom', end: 'bottom top', scrub: .6 } });
  }
}

/* Tarjetas del catálogo: revelado escalonado por categoría */
let triggersCatalogo = [];
if (hayST) $$('.cat').forEach(sec => {
  const cards = $$('.card', sec);
  if (!cards.length) return;
  gsap.set(cards, { opacity: 0, y: 26, scale: .97 });
  triggersCatalogo.push(...ST.batch(cards, {
    start: 'top 92%', once: true,
    onEnter: lote => gsap.to(lote, { opacity: 1, y: 0, scale: 1, duration: .75, stagger: .07, overwrite: true, clearProps: 'transform,opacity' })
  }));
});
// Al buscar, las tarjetas aparecen y desaparecen al instante: se apaga el revelado para no dejar nada oculto.
document.addEventListener('decora:filter', ev => {
  if (!ev.detail.activo || !triggersCatalogo.length) return;
  triggersCatalogo.forEach(t => t.kill()); triggersCatalogo = [];
  gsap.killTweensOf('.card');
  gsap.set('.card', { clearProps: 'opacity,transform' });
});

/* Footer: firma de marca */
const firma = $('.footer .sign');
if (firma && hayST) gsap.from(firma, { y: 24, opacity: 0, duration: .9, clearProps: 'transform,opacity', scrollTrigger: { trigger: firma, start: 'top 92%', once: true } });

/* =====================================================================
   5. CÓMO PEDIR: la línea se dibuja con el scroll y activa cada paso
   Azul = pasos de sistemas (1 a 4); grafito = producción y logística (5 y 6).
   ===================================================================== */
const ol = $('#steps'), relleno = $('#steps-wrap .rail-fill');
if (ol && relleno) {
  const pasos = $$('li', ol);
  const ajustarFinal = () => {                 // en vertical, el riel termina en el centro del último círculo
    const ult = pasos[pasos.length - 1];
    $('#steps-wrap').style.setProperty('--last', (ult.offsetHeight - 24) + 'px');
  };
  ajustarFinal(); addEventListener('resize', ajustarFinal);

  if (hayST) {
    const mm = gsap.matchMedia();
    const montar = eje => () => {
      ol.classList.add('is-anim');
      gsap.set(relleno, eje === 'x' ? { scaleX: 0 } : { scaleY: 0 });
      const fracciones = () => eje === 'x'
        ? pasos.map((_, i) => i / (pasos.length - 1))
        : pasos.map(li => (li.offsetTop - pasos[0].offsetTop) / (pasos[pasos.length - 1].offsetTop - pasos[0].offsetTop));
      let fr = fracciones();
      const alRefrescar = () => { fr = fracciones(); };
      ST.addEventListener('refresh', alRefrescar);
      const marcar = p => pasos.forEach((li, i) => li.classList.toggle('on', p >= fr[i] - .02));
      marcar(0);
      gsap.to(relleno, { [eje === 'x' ? 'scaleX' : 'scaleY']: 1, ease: 'none',
        scrollTrigger: { trigger: ol, start: 'top 68%', end: 'bottom 72%', scrub: .35, onUpdate: s => marcar(s.progress) } });
      return () => {
        ST.removeEventListener('refresh', alRefrescar);
        ol.classList.remove('is-anim'); pasos.forEach(li => li.classList.remove('on'));
        gsap.set(relleno, { clearProps: 'transform' });
      };
    };
    mm.add('(min-width: 961px)', montar('x'));
    mm.add('(max-width: 960px)', montar('y'));
  }
}

/* =====================================================================
   6. MICROINTERACCIONES
   ===================================================================== */
// Al agregar un producto, un punto azul viaja del botón "+" al contador de "Mi cotización".
document.addEventListener('decora:add', ev => {
  const o = ev.detail && ev.detail.origen; if (!o) return;
  const destino = $('.quote-btn .count'); if (!destino) return;
  const d = destino.getBoundingClientRect();
  const punto = document.createElement('div'); punto.className = 'fly'; document.body.appendChild(punto);
  const x0 = o.left + o.width / 2, y0 = o.top + o.height / 2, x1 = d.left + d.width / 2, y1 = d.top + d.height / 2;
  gsap.set(punto, { x: x0, y: y0, scale: 1 });
  gsap.to(punto, { x: x1, duration: .65, ease: 'power2.in' });
  gsap.to(punto, { y: y1, duration: .65, ease: 'power2.out' });
  gsap.to(punto, { scale: .35, opacity: .2, duration: .25, delay: .45, onComplete: () => punto.remove() });
});

// Al abrir una ficha o el panel de cotización, su contenido entra escalonado.
document.addEventListener('decora:sheet-open', ev => {
  const d = ev.detail.el;
  const items = $$('.d-body > *, .q-item, .q-form > *, .q-empty > *', d).filter(n => !n.hidden && !n.closest('[hidden]'));
  if (items.length) gsap.from(items, { y: 14, opacity: 0, duration: .5, stagger: .045, delay: .14, clearProps: 'transform,opacity' });
  const foto = $('.gal .slides figure:first-child img', d);
  if (foto) gsap.from(foto, { scale: 1.07, duration: .9, ease: 'power2.out', clearProps: 'transform' });
});

/* Luz que sigue al cursor (solo escritorio con puntero fino). Suavizado tipo "lerp" como en el sitio anterior;
   el bucle se detiene solo cuando la luz alcanza al cursor. */
if (matchMedia('(hover:hover)').matches && matchMedia('(min-width: 861px)').matches) {
  const luz = document.createElement('div'); luz.className = 'luz'; luz.setAttribute('aria-hidden', 'true'); document.body.appendChild(luz);
  let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf = 0, antes = 0;
  const tick = t => {
    const k = 1 - Math.pow(1 - .12, Math.min(250, t - (antes || t - 16.7)) / 16.7);   // mismo suavizado a cualquier tasa de cuadros
    antes = t;
    x += (tx - x) * k; y += (ty - y) * k;
    luz.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = (Math.abs(tx - x) > .3 || Math.abs(ty - y) > .3) ? requestAnimationFrame(tick) : (antes = 0);
  };
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; luz.classList.add('on'); if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => luz.classList.remove('on'));
}

/* =====================================================================
   7. AJUSTES FINALES
   ===================================================================== */
if (hayST) {
  const refrescar = () => ST.refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refrescar);
  addEventListener('load', refrescar);
}
})();
