/* =====================================================================
   DECORA TEXTILES · Mi cotización (se carga en TODAS las páginas)
   - Estado de la cotización (localStorage: "decora-cotizacion")
   - Panel "Mi cotización" (se inyecta aquí para no duplicar HTML)
   - Mensaje de WhatsApp al 523337238350
   - Menú móvil, copiar teléfono, aviso (toast) y botón flotante
   Expone window.Cotizacion para que el catálogo agregue productos.
   Eventos que emite para las animaciones:
     decora:add         -> { origen: DOMRect del botón que agregó }
     decora:sheet-open  -> { el: <dialog> }
   ===================================================================== */
(() => {
const { WA, TEL_LOCAL, P } = window.DECORA;
const byId = Object.fromEntries(P.map(p => [p.id, p]));
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => '$' + n.toLocaleString('es-MX');
const unitOf = p => p.unit || 'pieza';
const waLink = t => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t);

/* ---------- Marcado del panel y utilidades (inyectado) ---------- */
document.body.insertAdjacentHTML('beforeend', `
<button class="fab" id="fab" type="button">Mi cotización <span class="count" data-qcount>0</span></button>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<dialog class="sheet" id="quote" aria-labelledby="qTitle">
  <div class="sheet-in">
    <div class="sheet-head"><span class="eyebrow" id="qTitle">Mi cotización</span><button class="x" type="button" data-close aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
    <div class="sheet-scroll" id="qScroll">
      <ul class="q-list" id="qList"></ul>
      <div class="q-empty" id="qEmpty">
        <h3>Tu cotización está <em>vacía.</em></h3>
        <p>Agrega productos con el botón + y aquí verás la lista con sus claves, lista para enviar.</p>
        <a class="btn btn-noche" href="catalogo.html" id="qGo">Ver productos</a>
      </div>
      <div class="q-form" id="qForm">
        <div class="ref"><span>Referencia con precios publicados. El total final se confirma al cotizar.</span><b id="qRef">$0</b></div>
        <div class="field"><label for="qName">Tu nombre o empresa</label><input id="qName" type="text" maxlength="120" autocomplete="organization" placeholder="Ej. Cafetería Andares"></div>
        <div class="field"><label for="qNotes">Detalles (fecha, diseño, medidas)</label><textarea id="qNotes" rows="3" maxlength="600" placeholder="Ej. Logo al frente, entrega el 15 de noviembre"></textarea></div>
        <div><p class="lbl">Mensaje que se enviará</p><pre class="preview" id="qPreview"></pre></div>
        <p class="fine">Si WhatsApp no se abre, copia el mensaje y envíalo al 33 3723 8350.</p>
      </div>
    </div>
    <div class="sheet-foot" id="qFoot">
      <button class="btn btn-linea" id="qCopy" type="button">Copiar</button>
      <a class="btn btn-azul" id="qSend" href="#" target="_blank" rel="noopener">Enviar por WhatsApp</a>
    </div>
  </div>
</dialog>`);

const quote = $('#quote');

/* ---------- Aviso ---------- */
let tt;
function toast(html){ const t = $('#toast'); t.innerHTML = html; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2200); }

/* ---------- Estado ---------- */
let cart = [];
// Lo guardado en el navegador no es de fiar (puede estar viejo o manipulado): se valida cada línea y solo se conservan datos conocidos.
const limpiarLinea = i => {
  const p = i && byId[i.id]; if (!p) return null;
  const vi = Number.isInteger(i.vi) && p.v[i.vi] ? i.vi : null; if (vi === null) return null;
  const qty = Math.min(9999, Math.max(1, parseInt(i.qty, 10) || 1));
  const color = typeof i.color === 'string' && i.color.length <= 40 ? i.color : '';
  return { id: p.id, vi, qty, color };
};
let crudo = null;
try { crudo = localStorage.getItem('decora-cotizacion'); const g = JSON.parse(crudo || '[]'); cart = Array.isArray(g) ? g.slice(0, 100).map(limpiarLinea).filter(Boolean) : []; } catch(e) { cart = []; }
const save = () => { try { localStorage.setItem('decora-cotizacion', JSON.stringify(cart)); } catch(e) {} };
if (crudo !== null && crudo !== JSON.stringify(cart)) save();   // si lo guardado no era válido, se reemplaza por la versión limpia
const cartKey = i => [i.id, i.vi, i.color||''].join('|');

function renderCount(bump){
  const n = cart.reduce((a,i) => a + i.qty, 0);
  document.querySelectorAll('[data-qcount]').forEach(el => {
    el.textContent = n;
    if (bump){ el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
  });
  $('#fab').classList.toggle('show', cart.length > 0 && window.innerWidth <= 720);
}

function addItem(id, vi = 0, qty = 1, color = null, origen = null){
  const item = {id, vi, qty, color};
  const ex = cart.find(i => cartKey(i) === cartKey(item));
  if (ex) ex.qty += qty; else cart.push(item);
  save(); renderCount(true);
  const p = byId[id], v = p.v[vi];
  toast(`Agregado: ${esc(p.name)}${v.k?` · <b>${esc(v.k)}</b>`:''}`);
  document.dispatchEvent(new CustomEvent('decora:add', {detail:{origen}}));
}

/* ---------- Mensaje ---------- */
function buildMessage(){
  const name = $('#qName').value.trim(), notes = $('#qNotes').value.trim();
  const lines = ['Hola, Decora Textiles. Quiero cotizar:', ''];
  cart.forEach(i => {
    const p = byId[i.id], v = p.v[i.vi];
    let l = `• ${i.qty} × ${p.name}`;
    const det = [v.k, v.l !== p.name ? v.l : null, i.color ? 'color ' + i.color : null].filter(Boolean);
    if (det.length) l += ' — ' + det.join(' · ');
    lines.push(l);
  });
  if (name) lines.push('', 'Nombre / empresa: ' + name);
  if (notes) lines.push((name?'':'\n') + 'Detalles: ' + notes);
  lines.push('', 'Enviado desde el catálogo digital 2026.');
  return lines.join('\n');
}
function updateMsg(){ const m = buildMessage(); $('#qPreview').textContent = m; $('#qSend').href = waLink(m); }

function renderQuote(nuevo = false){
  const list = $('#qList');
  const has = cart.length > 0;
  $('#qEmpty').hidden = has; $('#qForm').hidden = !has; $('#qFoot').hidden = !has;
  list.innerHTML = cart.map((i, idx) => {
    const p = byId[i.id], v = p.v[i.vi];
    const th = p.imgs.length ? `<img src="img/${p.imgs[0]}.webp" alt="">` : `<div class="ph"><b>${esc(p.name.split(' ')[0])}</b></div>`;
    const each = v.p ? `${money(v.p)} c/u` : `Cotiza por ${unitOf(p)}`;
    return `<li class="q-item${nuevo && idx === cart.length-1 ? ' nuevo' : ''}"><div class="q-thumb">${th}</div>
      <div class="q-info"><b>${esc(p.name)}</b><span>${v.k?`<span class="k">${esc(v.k)}</span> · `:''}${esc(v.l)}${i.color?` · ${esc(i.color)}`:''}</span><span>${each}</span></div>
      <div class="q-side"><div class="stepper sm" role="group" aria-label="Cantidad"><button type="button" data-qs="${idx}" data-d="-1" aria-label="Menos de ${esc(p.name)}">−</button><input type="number" min="1" value="${i.qty}" data-qi="${idx}" aria-label="Cantidad de ${esc(p.name)}"><button type="button" data-qs="${idx}" data-d="1" aria-label="Más de ${esc(p.name)}">+</button></div><button class="rm" type="button" data-rm="${idx}" aria-label="Quitar ${esc(p.name)}">Quitar</button></div></li>`;
  }).join('');
  const ref = cart.reduce((a,i) => a + (byId[i.id].v[i.vi].p || 0) * i.qty, 0);
  $('#qRef').textContent = money(ref) + ' MXN';
  updateMsg();
}
$('#qList').addEventListener('click', e => {
  const s = e.target.closest('[data-qs]'), r = e.target.closest('[data-rm]');
  if (s){ const i = cart[+s.dataset.qs]; i.qty = Math.max(1, i.qty + +s.dataset.d); }
  else if (r){ cart.splice(+r.dataset.rm, 1); }
  else return;
  save(); renderCount(); renderQuote();
});
$('#qList').addEventListener('change', e => {
  const inp = e.target.closest('[data-qi]'); if (!inp) return;
  cart[+inp.dataset.qi].qty = Math.max(1, parseInt(inp.value,10) || 1); save(); renderCount(); renderQuote();
});
['#qName','#qNotes'].forEach(s => $(s).addEventListener('input', updateMsg));

async function copyText(text, okMsg){
  try { await navigator.clipboard.writeText(text); toast(okMsg); }
  catch(e){ const r = document.createRange(); r.selectNodeContents($('#qPreview')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); toast('Selecciona y copia el mensaje'); }
}
$('#qCopy').addEventListener('click', () => copyText(buildMessage(), 'Mensaje copiado'));

/* ---------- Paneles (dialog nativo: foco atrapado y Escape incluidos) ---------- */
function openDlg(d){
  if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open','');
  document.body.classList.add('lock');
  document.dispatchEvent(new CustomEvent('decora:sheet-open', {detail:{el:d}}));
}
function closeDlg(d){ if (d.open) d.close(); }
function wireDialog(d){
  d.addEventListener('close', () => { if (!document.querySelector('dialog[open]')) document.body.classList.remove('lock'); });
  d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) closeDlg(d); });
}
wireDialog(quote);
const openQuote = () => { renderQuote(); openDlg(quote); };
document.querySelectorAll('[data-open-quote]').forEach(b => b.addEventListener('click', openQuote));
$('#fab').addEventListener('click', openQuote);
$('#qGo').addEventListener('click', e => {           // si ya estás en el catálogo, solo cierra el panel
  closeDlg(quote);
  if (/catalogo(\.html)?\/?$/.test(location.pathname)) e.preventDefault();
});

/* ---------- Menú móvil ---------- */
const top = $('.top'), menuBtn = $('.menu-btn');
if (menuBtn){
  const setMenu = on => { top.classList.toggle('open', on); menuBtn.setAttribute('aria-expanded', on); menuBtn.setAttribute('aria-label', on ? 'Cerrar menú' : 'Abrir menú'); };
  menuBtn.addEventListener('click', () => setMenu(!top.classList.contains('open')));
  top.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
}

/* ---------- Copiar teléfono (sección de contacto) ---------- */
const copyPhone = $('#copyPhone');
if (copyPhone) copyPhone.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(TEL_LOCAL); toast('Número copiado'); }
  catch(e){ const r = document.createRange(); r.selectNodeContents($('#phone')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
});

window.addEventListener('resize', () => renderCount());
renderCount();

window.Cotizacion = { addItem, openDlg, closeDlg, wireDialog, toast, waLink, openQuote };
})();
