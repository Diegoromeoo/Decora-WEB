/* Marca "js" para el menú móvil y, si venimos de una transición, deja la cortina cerrada hasta que cargue la página.
   El respaldo por tiempo garantiza que el contenido nunca quede tapado si algo falla.
   Va en un archivo propio (no en línea) para poder usar una política de seguridad de contenido estricta. */
document.documentElement.classList.add('js');
try { if (sessionStorage.getItem('decora-t')) { document.documentElement.classList.add('is-cover'); setTimeout(function () { document.documentElement.classList.remove('is-cover'); }, 2500); } } catch (e) {}
