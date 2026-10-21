/* =====================================================================
   DECORA TEXTILES · Portada (solo index.html)
   Dibuja las categorías y calcula las cifras desde js/productos.js,
   para que el catálogo tenga una sola fuente de datos.
   ===================================================================== */
(() => {
const { CATS, CAT_IMGS, P, PHOTO } = window.DECORA;
const fotos = new Set(PHOTO);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const keys = new Set(P.flatMap(p => p.v.map(v => v.k).filter(Boolean)));

document.querySelectorAll('[data-stat="productos"]').forEach(el => { el.textContent = P.length; el.dataset.to = P.length; });
document.querySelectorAll('[data-stat="claves"]').forEach(el => { el.textContent = keys.size; el.dataset.to = keys.size; });

const tiles = document.getElementById('tiles');
if (tiles) {
  // Carrusel compacto: las 8 categorías en una cinta que corre sola y se arrastra. Los demás juegos (aria-hidden, sin foco)
  // solo cierran el bucle; con movimiento reducido no se crean y la cinta se desplaza a mano.
  const tarjeta = (c, copia) => {
    const n = P.filter(p => p.cat === c.id).length;
    const [a, b] = CAT_IMGS[c.id];
    return `<a class="tile" href="catalogo.html#${c.id}"${copia ? ' aria-hidden="true" tabindex="-1"' : ''}>
    <span class="tile-img"><span class="par"><img class="main${fotos.has(a)?' photo':''}" src="img/${a}.webp" alt="" loading="lazy" decoding="async" width="800" height="1000"><img class="alt${fotos.has(b)?' photo':''}" src="img/${b}.webp" alt="" loading="lazy" decoding="async" width="800" height="1000"></span></span>
    <span class="tile-body"><b>${esc(c.name)}</b><span>${n} ${n === 1 ? 'producto' : 'productos'}</span></span></a>`;
  };
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Sin movimiento reducido: 2 + n juegos (el del centro es el real, los demás solo cierran el bucle por ambos lados).
  const juegos = reducido ? 1 : 2 + Math.ceil(Math.max(innerWidth, screen.width || 0) / 1200);
  const REAL = reducido ? 0 : 1;
  tiles.innerHTML = `<div class="tiles-pista">${Array.from({ length: juegos }, (_, k) => CATS.map(c => tarjeta(c, k !== REAL)).join('')).join('')}</div>`;
  tiles.querySelectorAll('.tile').forEach(a => { a.draggable = false; });

  // ---- Movimiento: bucle automático + arrastre con mouse + trackpad/dedo (scroll nativo) + inercia ----
  // El carrusel es un contenedor con scroll horizontal. El bucle suma píxeles a scrollLeft; al llegar a un borde del juego
  // central salta un periodo (idéntico a la vista), así que nunca hay corte. Solo se detiene mientras el usuario lo manipula
  // (arrastre, dedo, rueda/trackpad, foco de teclado) y vuelve al instante en cuanto termina; el cursor encima no lo frena.
  const N = CATS.length, VEL = 24;                // px/s del bucle
  const tarjetas = tiles.querySelectorAll('.tile');
  let periodo = 0, x = 0, puesto = 0, pausaHasta = 0, encima = false, tocando = false, arrastrando = false, inercia = 0;
  let visible = true, raf = 0, ultimo = 0, suprimir = false;
  const medir = () => { periodo = reducido ? 0 : tarjetas[N].offsetLeft - tarjetas[0].offsetLeft; };
  const envolver = v => {
    if (!periodo) return v;
    if (v >= 2 * periodo) return v - periodo;
    if (v < periodo) return v + periodo;
    return v;
  };
  const fijar = v => { tiles.scrollLeft = v; puesto = tiles.scrollLeft; x = v; };
  const iniciar = () => { medir(); if (periodo) fijar(periodo); };
  iniciar();
  addEventListener('load', iniciar, { once: true });
  addEventListener('resize', () => { const f = periodo ? (tiles.scrollLeft - periodo) / periodo : 0; medir(); if (periodo) fijar(periodo + f * periodo); });

  const pausar = ms => { pausaHasta = Math.max(pausaHasta, performance.now() + ms); };
  tiles.addEventListener('focusin', e => { if (e.target.matches && e.target.matches(':focus-visible')) encima = true; });   // solo foco de teclado: el clic del mouse no debe frenar el bucle
  tiles.addEventListener('focusout', () => { encima = false; });
  tiles.addEventListener('touchstart', () => { tocando = true; }, { passive: true });
  tiles.addEventListener('touchend', () => { tocando = false; }, { passive: true });
  tiles.addEventListener('touchcancel', () => { tocando = false; }, { passive: true });
  tiles.addEventListener('wheel', () => pausar(120), { passive: true });   // trackpad / rueda: el bucle vuelve en cuanto dejan de llegar eventos
  tiles.addEventListener('dragstart', e => e.preventDefault());

  // Scroll nativo (trackpad de dos dedos, dedo, teclado): el salto del bucle se hace aquí también.
  tiles.addEventListener('scroll', () => {
    if (!periodo || arrastrando) return;
    const v = tiles.scrollLeft, w = envolver(v);
    if (w !== v) { tiles.scrollLeft = w; puesto = tiles.scrollLeft; x = w; }
  }, { passive: true });

  // Arrastre con mouse (mantener pulsado y mover / aventar).
  let d = null;
  tiles.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    d = { x0: e.clientX, sl0: tiles.scrollLeft, id: e.pointerId, mov: false, m: [[performance.now(), e.clientX]] };
    inercia = 0;
  });
  tiles.addEventListener('pointermove', e => {
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x0;
    if (!d.mov && Math.abs(dx) > 4) {
      d.mov = true; arrastrando = true; tiles.classList.add('arrastrando');
      try { tiles.setPointerCapture(d.id); } catch (_) {}
    }
    if (!d.mov) return;
    const ahora = performance.now();
    d.m.push([ahora, e.clientX]);
    while (d.m.length > 2 && ahora - d.m[0][0] > 120) d.m.shift();
    fijar(envolver(d.sl0 - dx));
    if (periodo) { const w = envolver(tiles.scrollLeft); if (w !== tiles.scrollLeft) { d.sl0 += w - tiles.scrollLeft; fijar(w); } }
  });
  const soltar = e => {
    if (!d || e.pointerId !== d.id) return;
    const hubo = d.mov, m = d.m;
    d = null;
    if (!hubo) return;
    arrastrando = false; tiles.classList.remove('arrastrando');
    try { tiles.releasePointerCapture(e.pointerId); } catch (_) {}
    suprimir = true; setTimeout(() => { suprimir = false; }, 60);   // el click que sigue al arrastre no abre la tarjeta
    const a = m[0], b = m[m.length - 1], dt = b[0] - a[0];
    if (!reducido && dt > 0 && performance.now() - b[0] < 140) {
      inercia = Math.max(-3, Math.min(3, -(b[1] - a[1]) / dt)); // px/ms (hacia donde se mueve el contenido)
      if (Math.abs(inercia) < 0.15) inercia = 0;
    }
    arrancar();   // sin esperas: el bucle vuelve en cuanto se suelta (tras la inercia, si la hay)
  };
  tiles.addEventListener('pointerup', soltar);
  tiles.addEventListener('pointercancel', soltar);
  tiles.addEventListener('click', e => { if (suprimir) { e.preventDefault(); e.stopPropagation(); } }, true);

  // Bucle de animación (solo mientras el carrusel está a la vista).
  function paso(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(250, t - (ultimo || t)); ultimo = t;   // independiente de los cuadros por segundo
    if (!arrastrando && Math.abs(tiles.scrollLeft - puesto) > 2) { const w = envolver(tiles.scrollLeft); if (w !== tiles.scrollLeft) tiles.scrollLeft = w; x = w; puesto = tiles.scrollLeft; pausar(100); }   // lo movió el usuario (rueda, dedo, teclado)
    if (!arrastrando && !reducido) {
      if (inercia) {
        x += inercia * dt;
        inercia *= Math.pow(0.94, dt / 16.7);
        if (Math.abs(inercia) < 0.03) inercia = 0;
        x = envolver(x); tiles.scrollLeft = x; puesto = tiles.scrollLeft;
      } else if (!encima && !tocando && t >= pausaHasta) {
        x += VEL * dt / 1000;
        x = envolver(x); tiles.scrollLeft = x; puesto = tiles.scrollLeft;
      }
    }
    arrancar();
  }
  function arrancar() { if (!raf && visible && !reducido) { raf = requestAnimationFrame(paso); } }
  if (!reducido) {
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) { ultimo = 0; arrancar(); } }, { rootMargin: '120px' }).observe(tiles);
    document.addEventListener('visibilitychange', () => { visible = !document.hidden; if (visible) { ultimo = 0; arrancar(); } });
    arrancar();
  }
}
})();
