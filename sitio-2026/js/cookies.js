/* =====================================================================
   DECORA TEXTILES · Aviso de cookies (Aceptar / Declinar)
   - La elección se guarda en localStorage ("decora-cookies": "all" | "necessary").
   - Declinar deja solo lo necesario (por ejemplo, recordar tu cotización).
   - Cuando se agregue analítica o publicidad, que escuche el evento
       document.addEventListener('decora:cookies', e => { if (e.detail.consent === 'all') { ... } })
     y no cargue nada antes de recibir "all".
   ===================================================================== */
(() => {
const KEY = 'decora-cookies';
const root = document.documentElement;
let previa = null;
try { previa = localStorage.getItem(KEY); } catch (e) {}

const avisar = v => document.dispatchEvent(new CustomEvent('decora:cookies', { detail: { consent: v } }));
window.DECORA_COOKIES = { get: () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } } };

if (previa === 'all' || previa === 'necessary') { avisar(previa); return; }

const caja = document.createElement('div');
caja.className = 'cookies';
caja.setAttribute('role', 'dialog');
caja.setAttribute('aria-modal', 'false');
caja.setAttribute('aria-labelledby', 'ck-t');
caja.setAttribute('aria-describedby', 'ck-d');
caja.innerHTML = `
  <h2 id="ck-t">Cookies</h2>
  <p id="ck-d">Usamos cookies para que el sitio funcione y, si aceptas, para medir su uso y mejorarlo.</p>
  <div class="row">
    <button type="button" class="btn btn-cristal" data-ck="necessary">Declinar</button>
    <button type="button" class="btn btn-azul" data-ck="all">Aceptar</button>
  </div>`;
document.body.appendChild(caja);

const medir = () => root.style.setProperty('--cookie-h', caja.offsetHeight + 'px');
const cerrar = valor => {
  try { localStorage.setItem(KEY, valor); } catch (e) {}
  caja.classList.remove('show');
  root.classList.remove('cookies-open');
  setTimeout(() => caja.remove(), 600);
  avisar(valor);
};
caja.addEventListener('click', e => { const b = e.target.closest('[data-ck]'); if (b) cerrar(b.dataset.ck); });

setTimeout(() => { medir(); root.classList.add('cookies-open'); caja.classList.add('show'); }, 900);
addEventListener('resize', medir);
})();
