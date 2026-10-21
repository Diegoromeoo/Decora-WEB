/* =====================================================================
   DECORA TEXTILES · Datos del catálogo 2026
   Fuente única de productos, claves (SKU), variantes y precios.
   Se carga en todas las páginas porque "Mi cotización" vive en el
   encabezado del sitio. Para actualizar precios o productos, edita
   SOLO este archivo; el HTML no contiene datos de producto.
   (Contenido tomado tal cual del catálogo digital 2026.)
   ===================================================================== */
window.DECORA = (() => {
const WA = '523337238350';          // WhatsApp de Decora (formato internacional, sin +)
const TEL_LOCAL = '3322247418';   // teléfono para llamadas (enlace tel:)
const PHOTO = new Set(['p3','p5','p32','n8','n10','n14','n19']);

const COLORS = {
  'Rosa':'#F2A3BD','Verde':'#2E8B57','Tinto':'#6E1A2A','Azul':'#1F5FBF','Gris':'#9EA3AA','Navy':'#1B2745','Rojo':'#D0302F','Cian':'#00B2D6',
  'Morado':'#6B3FA0','Naranja':'#F27A12','Lima':'#A9D63B','Amarillo':'#F6D23A','Negro':'#121316','Blanco':'#FFFFFF','Arena':'#D9C8A7',
  'Lila':'#BBA6DA','Fucsia':'#D6247B','Cielo':'#8CC8EE','Gris jaspe':'#BCC0C5','Amarillo pálido':'#F5EAA8','Rosa pastel':'#F8D4DF'
};

const CATS = [
  {id:'ropa', name:'Ropa', title:'Prendas de uso diario, listas para <em>tu marca.</em>', note:'Uniformes, eventos y marcas de ropa. Impresión y personalización sobre prenda.'},
  {id:'ninos', name:'Niños y mascotas', title:'Para los más pequeños, y los de <em>cuatro patas.</em>', note:'Telas suaves con la piel y diseños con tu logo o una frase.'},
  {id:'marca', name:'Gorras y etiquetas', title:'La marca, en cada <em>detalle.</em>', note:'Para marcas de ropa que van a salir: cotiza etiquetas, gorras y empaque en un solo pedido.'},
  {id:'papeleria', name:'Papelería y empaque', title:'Lo que tu cliente <em>toca primero.</em>', note:'Tarjetas, bolsas y empaque con tu identidad a la vista.'},
  {id:'promo', name:'Promocionales', title:'Pequeño formato, <em>gran presencia.</em>', note:'Stickers, posavasos y artículos para regalo corporativo y eventos.'},
  {id:'diario', name:'Termos, tazas y cuadros', title:'Lo que se usa todos los días, <em>con tu marca.</em>', note:'Regalo de equipo, recuerdo de evento o pieza para casa.'},
  {id:'vinil', name:'Vinil y DTF', title:'Rotula, decora y <em>transfiere.</em>', note:'Precio según medida, diseño y cantidad.'},
  {id:'gran', name:'Gran formato', title:'Tu marca, a la altura <em>de la fachada.</em>', note:'Lonas, banners e impresión para punto de venta.'}
];

const P = [
  // ROPA
  {id:'playera', cat:'ropa', name:'Playera caballero y dama', imgs:['p12'],
   desc:'Ligera y funcional, con gramaje de 150 g. Ideal para uso diario, uniformes y eventos.',
   v:[{k:'PLY-001',l:'Tallas CH a XL',p:260},{k:'PLY-002',l:'Talla 2XL'},{k:'PLY-003',l:'Talla 3XL'}],
   colors:['Rosa','Verde','Tinto','Azul','Gris','Navy','Rojo','Cian','Morado','Naranja','Lima','Amarillo'],
   specs:[['Gramaje','150 g'],['Tallas','CH a 3XL']], tags:'camiseta tshirt uniforme'},
  {id:'polo', cat:'ropa', name:'Polo dama y caballero', imgs:['p11'],
   desc:'Mezcla de 50% algodón y 50% poliéster: la suavidad del algodón con la resistencia del poliéster.',
   v:[{k:'CAM-002',l:'Camisa polo personalizada',p:399}], colors:['Gris','Navy','Tinto','Negro'],
   specs:[['Tela','50% algodón · 50% poliéster'],['Uso','Uniforme corporativo']], tags:'uniforme playera polo'},
  {id:'camisa', cat:'ropa', name:'Camisa formal dama', imgs:['p10'],
   desc:'Corte femenino que se adapta a la silueta, en mezcla de 50% algodón y 50% poliéster.',
   v:[{k:'CAM-001',l:'Colores rosa, navy, gris o blanco',p:339},{k:'CAM-001',l:'Color negro',p:409}],
   colors:['Rosa','Navy','Gris','Blanco','Negro'], specs:[['Tela','50% algodón · 50% poliéster'],['Corte','Femenino']], tags:'uniforme oficina blusa'},
  {id:'hoodie', cat:'ropa', name:'Sudadera y hoodie', imgs:['p1'],
   desc:'Con gorro (hoodie) o sin gorro (sudadera). Interior suave y confección duradera para cualquier temporada.',
   v:[{k:'HOD-001',l:'Tallas CH a XL',p:470},{k:'HOD-002',l:'Talla 2XL'}],
   colors:['Arena','Rojo','Lila','Negro','Verde','Azul','Gris','Navy','Tinto'], specs:[['Modelos','Con o sin gorro'],['Tallas','CH a 2XL']], tags:'sudadera suéter merch'},
  // NIÑOS
  {id:'perrito', cat:'ninos', name:'Playera para perrito', imgs:['n1','p23'],
   desc:'Con tu logo o una frase que identifique a tu mascota. Cotiza según talla y cantidad.',
   v:[{k:'PLY-005',l:'Playera para perro personalizada'}], specs:[['Tallas','Según raza'],['Diseño','Logo, nombre o frase']], tags:'mascota perro'},
  {id:'panalero', cat:'ninos', name:'Pañalero personalizado', imgs:['p27'],
   desc:'Suave con la piel sensible. Diseño cómodo para vestir y cambiar con facilidad.',
   v:[{k:'PAN-001',l:'Body blanco · 3 a 12 meses',p:220},{k:'PAN-001',l:'Body a color · 3 a 12 meses',p:260},{k:'PAN-001',l:'Body blanco · 18 meses',p:240},{k:'PAN-001',l:'Body a color · 18 meses',p:280}],
   colors:['Blanco','Negro','Amarillo pálido','Rojo','Rosa','Rosa pastel','Azul','Navy'], specs:[['Tallas','3 a 18 meses'],['Ideal para','Baby shower y regalo']], tags:'bebé body mameluco'},
  {id:'playera-nino', cat:'ninos', name:'Playera niño y bebé', imgs:['p12'],
   desc:'Playera infantil para cumpleaños, escuelas y equipos, con tu diseño a todo color.',
   v:[{k:'PLY-004',l:'Infantil · CH, M, G, EG',p:169}],
   colors:['Rojo','Gris','Azul','Verde','Negro','Navy','Cian','Naranja','Fucsia','Morado','Lima','Amarillo','Rosa','Cielo','Gris jaspe','Blanco'],
   specs:[['Tallas','CH · M · G · EG'],['Ideal para','Cumpleaños y escuelas']], tags:'niños infantil'},
  // MARCA
  {id:'gorra', cat:'marca', name:'Gorra personalizada', imgs:['p34','p33'],
   desc:'Para equipos, eventos y marcas de ropa. Tu logo en el modelo y la ubicación que prefieras.',
   v:[{k:'GOR-001',l:'Gorra personalizada'}], specs:[['Modelos','Varios modelos y colores'],['Pedido mínimo','Según cantidad']], tags:'cap merch'},
  {id:'etiquetas', cat:'marca', name:'Etiquetas de ropa', imgs:['p31','p32'],
   desc:'Etiqueta principal, de cuidado y colgante para tu marca de ropa, en el formato que tu prenda necesita.',
   v:[{k:'ETR 1LB',l:'Millar · 9 × 5 cm · opción 1LB'},{k:'ETR 2LB',l:'Millar · 9 × 5 cm · opción 2LB'},{k:'ETR 2LM',l:'Millar · 9 × 5 cm · opción 2LM'}],
   unit:'millar', specs:[['Medida','9 × 5 cm'],['Presentación','Millar (1,000 pzas)']], extras:['Etiqueta de marca','Instrucciones de cuidado','Colgantes de temporada','Diseño y pre-prensa'], tags:'hang tag colgante marbete'},
  // PAPELERÍA
  {id:'tarjetas', cat:'papeleria', name:'Tarjetas de presentación', imgs:['p25','p24'],
   desc:'Con tu diseño, tus datos de contacto y, si lo quieres, un código QR a tu WhatsApp o a tu sitio.',
   v:[{k:'TAR-001',l:'Un lado'},{k:'TAR-002',l:'Dos lados'},{k:'TAR-003',l:'Dos lados · acabado mate'}],
   unit:'millar', specs:[['Presentación','Millar (1,000 pzas)'],['Diseño','Pre-prensa incluida según pedido']], tags:'business cards papelería'},
  {id:'zipper', cat:'papeleria', name:'Bolsa zipper esmerilada', imgs:['p15','p14','p16'],
   desc:'Bolsa con cierre y acabado esmerilado con tu logo. Para empacar ropa, producto y regalos con la marca a la vista.',
   v:[{k:'BOL-001',l:'Bolsa zipper esmerilada para ropa'}], specs:[['Cierre','Zipper'],['Cotización','Según cantidad y medida']], tags:'empaque packaging ropa'},
  {id:'eco', cat:'papeleria', name:'Bolsa de papel ecológica negra', imgs:['n5','n4'],
   desc:'Bolsa de papel en color negro para tiendas, boutiques y regalos, personalizada con tu logo.',
   v:[{k:'BOL-002',l:'Bolsa de papel ecológica negra'}], specs:[['Material','Papel'],['Color','Negro']], tags:'empaque shopping bag'},
  {id:'tote', cat:'papeleria', name:'Tote bag personalizada', imgs:['n18','n15'],
   desc:'Bolsa de tela reutilizable para eventos, tiendas y regalos corporativos.',
   v:[{k:'TOT-001',l:'Tote bag personalizada'}], specs:[['Material','Tela'],['Uso','Eventos y regalo']], tags:'bolsa tela'},
  {id:'pajita', cat:'papeleria', name:'Bolsa de pajita para eventos', imgs:['n16','n2'],
   desc:'Bolsa resellable con popote para bebidas en fiestas, bodas y eventos, personalizada con tu diseño.',
   v:[{k:'BOL-003',l:'Bolsa de pajita para eventos'}], specs:[['Uso','Bebidas en eventos'],['Incluye','Popote y cierre']], tags:'evento boda xv bebida popote drink pouch'},
  // PROMO
  {id:'stickers', cat:'promo', name:'Stickers personalizados', imgs:['p6','p2','p5','p7'],
   desc:'Troquelados en la forma de tu diseño. Ejemplos de tamaño: 3, 4, 5 y 6 cm.',
   v:[{l:'Stickers troquelados'}], specs:[['Corte','Troquelado a la forma'],['Tamaños','3, 4, 5 y 6 cm']], tags:'calcomanías etiquetas adhesivas'},
  {id:'posavasos', cat:'promo', name:'Posavasos acrílico', imgs:['p37','p38'],
   desc:'Para cafeterías, restaurantes y eventos. Tu logo o un mensaje de agradecimiento en cada mesa.',
   v:[{k:'PVA-001',l:'Portavasos acrílico personalizado'}], specs:[['Material','Acrílico'],['Formato','Circular']], tags:'portavasos coaster cafetería'},
  {id:'llavero', cat:'promo', name:'Llavero personalizado', imgs:['n13','n12'],
   desc:'Llavero acrílico con tu foto, logo o diseño. Detalle de bolsillo para clientes, eventos y equipos.',
   v:[{k:'LLA-001',l:'Llavero personalizado'}], specs:[['Uso','Regalo y evento'],['Cotización','Según cantidad']], tags:'promocional'},
  {id:'mousepad', cat:'promo', name:'Mouse pad personalizado', imgs:['n11','n6'],
   desc:'Formato amplio para escritorio, con tu marca o tu diseño a todo color.',
   v:[{k:'MOP-001',l:'60 × 35 cm'}], specs:[['Medida','60 × 35 cm'],['Impresión','A todo color']], tags:'oficina gamer desk pad'},
  // DIARIO
  {id:'termos', cat:'diario', name:'Termos y vasos', imgs:['p28','p29','p30'],
   desc:'Tres formatos para regalo corporativo, eventos y uso diario, con tu logo o diseño grabado.',
   v:[{k:'TER-001',l:'Vaso con popote'},{k:'TER-001',l:'Vaso con tapa'},{k:'TER-001',l:'Termo con asa'}],
   specs:[['Personalización','Grabado láser'],['Formatos','3 modelos']], tags:'termo vaso tumbler cervecero'},
  {id:'taza', cat:'diario', name:'Taza personalizada', imgs:['p13','n3'],
   desc:'Taza blanca para personalizar con tu logo, frase o diseño. Ideal para regalo de equipo.',
   v:[{k:'TAZ-001',l:'Taza blanca personalizada'}], specs:[['Color','Blanca'],['Ideal para','Regalo de equipo']], tags:'mug café'},
  {id:'cuadro', cat:'diario', name:'Cuadro personalizado', imgs:['p26','n17'],
   desc:'Desde tu foto, tu mascota o un diseño único. Impreso en papel couché y enmarcado en negro.',
   v:[{k:'CDR-001',l:'11 × 14 pulgadas (28 × 35.56 cm)',p:259}], specs:[['Medida','11 × 14 in'],['Marco','Negro · couché incluido']], tags:'foto marco decoración'},
  // VINIL
  {id:'vinil-pared', cat:'vinil', name:'Vinil decorativo de pared', imgs:['p35','p36'],
   desc:'Letras, logotipos y figuras recortadas en la forma de tu diseño, listas para muro, vidrio o rótulo.',
   v:[{k:'VIN-001',l:'Vinil decorativo de pared'}], specs:[['Precio','Según tamaño y diseño'],['Superficies','Muro, vidrio, rótulo']], tags:'recorte rotulación oficina'},
  {id:'vinil-rollo', cat:'vinil', name:'Vinil adhesivo', imgs:['p19','p20','p21'],
   desc:'Viniles decorativos y automotrices en rollo: colores sólidos y metálicos para rotulación y decoración.',
   v:[{l:'Vinil adhesivo para rotulación'}], specs:[['Acabados','Sólidos y metálicos'],['Uso','Rotulación y automotriz']], tags:'automotriz rotulación corte'},
  {id:'esmerilado', cat:'vinil', name:'Vinil esmerilado', imgs:['n8','n14','n10'],
   desc:'Acabado esmerilado para vidrios y canceles: privacidad sin perder la luz, con o sin tu logo.',
   v:[{k:'VIN-002',l:'Tira de vinil esmerilizado'}], unit:'metro lineal', specs:[['Unidad','Metro lineal'],['Uso','Vidrios y canceles']], tags:'esmerilizado vidrio privacidad'},
  {id:'dtf', cat:'vinil', name:'Impresión DTF', imgs:['p3'],
   desc:'Tu diseño a todo color sobre film, listo para aplicar en playeras, sudaderas y otras prendas.',
   v:[{l:'Transferencias DTF para tela'}], specs:[['Color','Full color'],['Aplicación','Playeras, sudaderas y más']], tags:'transfer textil'},
  // GRAN FORMATO
  {id:'lona', cat:'gran', name:'Lona publicitaria', imgs:['p8','p4'],
   desc:'Impresión de gran formato para fachadas, eventos y publicidad. Con ojillos para colgar o instalar.',
   v:[{k:'LON-001',l:'Lona publicitaria'}], unit:'m²', specs:[['Unidad','Metro cuadrado'],['Acabado','Con ojillos']], tags:'fachada gran formato'},
  {id:'banner', cat:'gran', name:'Banner araña', imgs:['p9','n19'],
   desc:'Lona impresa sobre estructura tipo araña para exhibir tu marca en tiendas, eventos y ferias.',
   v:[{k:'BANN-01',l:'1.80 × 0.80 m'},{k:'BANN-02',l:'1.60 × 0.60 m'}], specs:[['Estructura','Tipo araña (X-banner)'],['Medidas','2 formatos']], tags:'x-banner exhibidor feria'},
  {id:'impresion', cat:'gran', name:'Impresión digital por hoja', imgs:['n9','n7'],
   desc:'Pósters, flyers y etiquetas para tu punto de venta, en papel couché mate o papel adherible.',
   v:[{k:'IMP-001',l:'Papel couché mate'},{k:'IMP-002',l:'Papel adherible'}], unit:'hoja', specs:[['Unidad','Hoja'],['Papeles','Couché mate · adherible']], tags:'poster flyer volante etiqueta'}
];
/* Fotos que representan cada categoría en la portada (principal y la que aparece al pasar el cursor) */
const CAT_IMGS = {
  ropa:['p12','p1'], ninos:['p27','n1'], marca:['p34','p31'], papeleria:['p25','p15'],
  promo:['p37','p6'], diario:['p28','p13'], vinil:['p35','p19'], gran:['p8','p9']
};

return { WA, TEL_LOCAL, PHOTO, COLORS, CATS, CAT_IMGS, P };
})();
