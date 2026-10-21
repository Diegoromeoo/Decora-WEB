/* =====================================================================
   DECORA TEXTILES · Catálogo digital 2026 (solo catalogo.html)
   Funciones conservadas del catálogo original:
   - Filtro por categoría (chips con seguimiento de scroll)
   - Buscador por nombre, clave, color o descripción
   - Ficha de producto con variantes, color y cantidad
   - Agregar a "Mi cotización" (lógica en cotizacion.js)
   ===================================================================== */
(() => {
const { PHOTO: PHOTO_LIST, COLORS, CATS, P, WA } = window.DECORA;
const PHOTO = new Set(PHOTO_LIST);
const Cot = window.Cotizacion;

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => '$' + n.toLocaleString('es-MX');
const strip = s => s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const byId = Object.fromEntries(P.map(p => [p.id, p]));
const unitOf = p => p.unit || 'pieza';
const minPrice = p => { const ps = p.v.map(v => v.p).filter(Boolean); return ps.length ? Math.min(...ps) : null; };
const keysOf = p => [...new Set(p.v.map(v => v.k).filter(Boolean))];

/* Cifras de la portada (se calculan de los datos) */
const setNum = (sel, n) => { document.querySelectorAll(sel).forEach(el => { el.textContent = n; el.dataset.to = n; }); };
setNum('[data-stat="productos"]', P.length);
setNum('[data-stat="claves"]', new Set(P.flatMap(keysOf)).size);

const imgTag = (id, cls='', alt='') => `<img class="${PHOTO.has(id)?'photo':'cut'} ${cls}" src="img/${id}.webp" alt="${esc(alt)}" loading="lazy" decoding="async" width="800" height="1000">`;
const placeholder = p => `<div class="ph"><div><img src="img/logo-grafito.png" alt=""><b>${esc(p.name)}</b><small>Foto de muestra por WhatsApp</small></div></div>`;

function skuBadge(p){
  const ks = keysOf(p);
  if (!ks.length) return `<span class="sku svc">Servicio a medida</span>`;
  return `<span class="sku">${esc(ks[0])}${ks.length>1?` <em>+${ks.length-1}</em>`:''}</span>`;
}
function priceBlock(p){
  const m = minPrice(p);
  if (m == null) return `<div class="price"><small>Por ${esc(unitOf(p))}</small><b class="q">Cotiza</b></div>`;
  const label = p.v.length > 1 ? 'Desde' : 'Precio';
  return `<div class="price"><small>${label}</small><b>${money(m)}<sup>MXN</sup></b></div>`;
}
function card(p){
  const imgs = p.imgs;
  const well = imgs.length
    ? `<div class="well${imgs.length>1?' has-alt':''}">${imgTag(imgs[0],'main',p.name)}${imgs[1]?imgTag(imgs[1],'alt'):''}${imgs.length>1?`<div class="dots" aria-hidden="true">${imgs.map(()=>'<span></span>').join('')}</div>`:''}</div>`
    : `<div class="well">${placeholder(p)}</div>`;
  return `<article class="card" data-id="${p.id}">
    ${skuBadge(p)}${well}
    <div class="body"><h3><button class="card-open" type="button" data-open="${p.id}" aria-haspopup="dialog">${esc(p.name)}</button></h3><p>${esc(p.desc)}</p>
      <ul class="mini">${p.v.slice(0,4).map(v => `<li><span class="k">${esc(v.k||'A medida')}</span><span class="l">${esc(v.l)}</span><span class="p${v.p?'':' q'}">${v.p?money(v.p):'Cotiza'}</span></li>`).join('')}</ul>
      <div class="foot">${priceBlock(p)}<button class="add" type="button" data-add="${p.id}" aria-label="Agregar ${esc(p.name)} a la cotización"><svg class="plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><svg class="ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></button></div>
    </div></article>`;
}

/* ---- Render ---- */
const sections = $('#sections'), chips = $('#chips');
sections.innerHTML = CATS.map(c => {
  const items = P.filter(p => p.cat === c.id);
  return `<section class="cat" id="${c.id}" data-cat="${c.id}" aria-labelledby="h-${c.id}">
    <div class="cat-head"><div><p class="eyebrow"><span>${esc(c.name)} · <span data-n>${items.length}</span> productos</span></p><h2 id="h-${c.id}">${c.title}</h2></div><p>${esc(c.note)}</p></div>
    <div class="grid">${items.map(card).join('')}</div></section>`;
}).join('');
chips.innerHTML = CATS.map(c => `<a class="chip" href="#${c.id}" data-chip="${c.id}">${esc(c.name)} <i data-c>${P.filter(p=>p.cat===c.id).length}</i></a>`).join('');

/* ---- Altura de la barra (para que los anclas no queden tapados) ---- */
const bar = $('.bar');
const setBar = () => document.documentElement.style.setProperty('--bar-h', bar.offsetHeight + 'px');
setBar(); window.addEventListener('resize', setBar);

/* ---- Scroll spy ---- */
let spyLock = false;
const setChip = id => {
  chips.querySelectorAll('.chip').forEach(ch => {
    const on = ch.dataset.chip === id; ch.classList.toggle('on', on);
    if (on){ ch.setAttribute('aria-current','true'); const r = ch.offsetLeft - chips.clientWidth/2 + ch.offsetWidth/2; chips.scrollTo({left:r, behavior:'smooth'}); }
    else ch.removeAttribute('aria-current');
  });
};
const io = new IntersectionObserver(ents => {
  if (spyLock) return;
  ents.forEach(e => { if (e.isIntersecting) setChip(e.target.dataset.cat); });
}, {rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('.cat').forEach(s => io.observe(s));
chips.addEventListener('click', e => {
  const a = e.target.closest('.chip'); if (!a) return;
  setChip(a.dataset.chip); spyLock = true; setTimeout(() => spyLock = false, 900);
});

/* ---- Ritmo de la rejilla: llena cada fila (4 columnas en escritorio, 2 abajo) ---- */
function layout(sec){
  const vis = [...sec.querySelectorAll('.card')].filter(c => !c.hidden);
  vis.forEach(c => c.classList.remove('wide','feat'));
  const n = vis.length, r = n % 4;
  if (n === 1 || r === 3) vis[0].classList.add('wide');
  else if (r === 2) { vis[0].classList.add('wide'); vis[1].classList.add('wide'); }
  else if (r === 1) vis[0].classList.add('feat');
}

/* ---- Buscador ---- */
const q = $('#q'), qClear = $('#qClear');
P.forEach(p => p._hay = strip([p.name, p.desc, p.tags||'', CATS.find(c=>c.id===p.cat).name, ...p.v.map(v=>(v.k||'')+' '+v.l), ...(p.colors||[])].join(' ')));
function filter(){
  const terms = strip(q.value.trim()).split(/\s+/).filter(Boolean);
  qClear.hidden = !terms.length;
  let total = 0;
  document.querySelectorAll('.cat').forEach(sec => {
    let n = 0;
    sec.querySelectorAll('.card').forEach(c => {
      const hit = terms.every(t => byId[c.dataset.id]._hay.includes(t));
      c.hidden = !hit; if (hit) n++;
    });
    layout(sec);
    sec.hidden = n === 0; sec.querySelector('[data-n]').textContent = n; total += n;
    const chip = chips.querySelector(`[data-chip="${sec.dataset.cat}"]`);
    chip.hidden = n === 0; chip.querySelector('[data-c]').textContent = n;
  });
  $('#empty').classList.toggle('show', total === 0);
  $('#emptyAsk').href = Cot.waLink(`Hola, Decora Textiles. Busqué "${q.value.trim()}" en el catálogo y no lo encontré. ¿Lo manejan?`);
  document.dispatchEvent(new CustomEvent('decora:filter', {detail:{activo: terms.length > 0}}));
}
q.addEventListener('input', () => {
  filter();
  const sec = $('#sections'), offset = $('.top').offsetHeight + bar.offsetHeight + 8;
  const top = sec.getBoundingClientRect().top + scrollY - offset;
  if (scrollY > top + 4) scrollTo({top, behavior:'auto'});
});
qClear.addEventListener('click', () => { q.value=''; filter(); q.focus(); });

/* ---- Ficha de producto ---- */
const detail = $('#detail');
Cot.wireDialog(detail);
let cur = null;
function openDetail(id){
  const p = byId[id]; cur = p;
  const cat = CATS.find(c => c.id === p.cat);
  $('#dCat').textContent = cat.name;
  const slides = p.imgs.length ? p.imgs.map((i,n) => `<figure>${imgTag(i,'',`${p.name}, foto ${n+1}`)}</figure>`).join('') : `<figure>${placeholder(p)}</figure>`;
  const thumbs = p.imgs.length > 1 ? `<div class="thumbs">${p.imgs.map((i,n) => `<button type="button" data-th="${n}" class="${n?'':'on'}" aria-label="Ver foto ${n+1}"><img src="img/${i}.webp" alt=""></button>`).join('')}</div>` : '';
  const variants = `<div><p class="lbl">${p.v.length>1?'Elige variante':'Clave y precio'}</p><div class="variants">${p.v.map((v,n) => `
    <label class="variant"><input type="radio" name="dv" value="${n}" ${n?'':'checked'}>
      <span class="k">${esc(v.k || 'A medida')}</span><span class="v">${esc(v.l)}</span>
      <span class="p${v.p?'':' q'}">${v.p ? money(v.p) : 'Cotiza'}</span></label>`).join('')}</div></div>`;
  const colors = p.colors ? `<div><p class="lbl">Color <span id="dColorName" style="letter-spacing:0;text-transform:none;font-weight:500;color:var(--grafito)"></span></p><div class="swatches">${p.colors.map(c => `
    <label class="sw"><input type="radio" name="dc" value="${esc(c)}"><i style="background:${COLORS[c]||'#ccc'}"></i>${esc(c)}</label>`).join('')}</div></div>` : '';
  const extras = p.extras ? `<div><p class="lbl">Incluye opciones de</p><div class="chipset">${p.extras.map(x=>`<span>${esc(x)}</span>`).join('')}</div></div>` : '';
  const specs = `<dl class="specs">${p.specs.map(([a,b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}<div><dt>Unidad</dt><dd>${esc(unitOf(p)[0].toUpperCase()+unitOf(p).slice(1))}</dd></div><div><dt>Entrega</dt><dd>2 a 3 días hábiles</dd></div></dl>`;
  const ask = Cot.waLink(`Hola, Decora Textiles. Tengo una pregunta sobre ${p.name}${keysOf(p).length?' ('+keysOf(p).join(', ')+')':''}.`);
  $('#dScroll').innerHTML = `<div class="gal"><div class="slides" id="dSlides">${slides}</div>${thumbs}</div>
    <div class="d-body"><div><p class="eyebrow">${esc(keysOf(p).join(' · ') || 'Servicio a medida')}</p><h2 id="dTitle">${esc(p.name)}</h2><p class="desc">${esc(p.desc)}</p></div>
    ${variants}${colors}${extras}${specs}<a class="ask-link" href="${ask}" target="_blank" rel="noopener">Preguntar por este producto en WhatsApp</a></div>`;
  $('#dQty').value = 1;
  $('#dScroll').scrollTop = 0;
  const sl = $('#dSlides');
  if (thumbs){
    $('#dScroll').querySelectorAll('[data-th]').forEach(b => b.addEventListener('click', () => sl.scrollTo({left: sl.clientWidth * +b.dataset.th, behavior:'smooth'})));
    sl.addEventListener('scroll', () => { const n = Math.round(sl.scrollLeft / sl.clientWidth); $('#dScroll').querySelectorAll('[data-th]').forEach((b,i) => b.classList.toggle('on', i===n)); }, {passive:true});
  }
  $('#dScroll').querySelectorAll('input[name=dc]').forEach(r => r.addEventListener('change', () => $('#dColorName').textContent = '· ' + r.value));
  Cot.openDlg(detail);
}
document.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => { const i = $('#dQty'); i.value = Math.max(1, (parseInt(i.value,10)||1) + +b.dataset.step); }));
$('#dAdd').addEventListener('click', () => {
  if (!cur) return;
  const vi = +(detail.querySelector('input[name=dv]:checked')?.value || 0);
  const c = detail.querySelector('input[name=dc]:checked')?.value || null;
  Cot.addItem(cur.id, vi, Math.max(1, parseInt($('#dQty').value,10) || 1), c, $('#dAdd').getBoundingClientRect());
  Cot.closeDlg(detail);
});

sections.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add){ Cot.addItem(add.dataset.add, 0, 1, null, add.getBoundingClientRect()); add.classList.add('done'); setTimeout(() => add.classList.remove('done'), 1100); return; }
  const o = e.target.closest('[data-open]');
  if (o) openDetail(o.dataset.open);
});

filter(); setChip(CATS[0].id);

/* Si llegas desde la portada con #categoria, baja a esa categoría una vez que existe en el DOM */
if (location.hash && document.getElementById(location.hash.slice(1))) {
  requestAnimationFrame(() => document.getElementById(location.hash.slice(1)).scrollIntoView());
}
})();
