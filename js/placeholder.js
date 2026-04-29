// ===== PUSAKA BANTEN — SVG PLACEHOLDER GENERATOR =====
// Menghasilkan placeholder SVG artistik (motif geometrik islami) 
// untuk situs yang belum memiliki foto asli.

const REGION_STYLES = {
    'Kota Serang':              { g1:'#3A070E', g2:'#6B1020', accent:'#D4AF37', icon:'⛪' },
    'Kabupaten Serang':         { g1:'#4A1508', g2:'#7A2810', accent:'#C9A84C', icon:'⚓' },
    'Kota Cilegon':             { g1:'#071525', g2:'#102540', accent:'#E8906C', icon:'⚙' },
    'Kabupaten Pandeglang':     { g1:'#072010', g2:'#103520', accent:'#90D84C', icon:'🌿' },
    'Kabupaten Lebak':          { g1:'#1E0E03', g2:'#3A1E06', accent:'#C9A020', icon:'🪨' },
    'Kota Tangerang':           { g1:'#071020', g2:'#102035', accent:'#D4AF37', icon:'🏛' },
    'Kabupaten Tangerang':      { g1:'#071A12', g2:'#10281C', accent:'#C0C84C', icon:'🌊' },
    'Kota Tangerang Selatan':   { g1:'#140728', g2:'#220A40', accent:'#D4AF37', icon:'🏙' },
};

/**
 * Membuat SVG motif geometrik islami sebagai placeholder foto.
 * @param {string} id       - ID situs (mis. "ks-1")
 * @param {string} nama     - Nama situs
 * @param {string} wilayah  - Nama wilayah
 * @param {boolean} isHero  - true = ukuran besar (detail page), false = kartu
 * @returns {string} Data URL SVG
 */
window.generatePlaceholder = function(id, nama, wilayah, isHero) {
    const s = REGION_STYLES[wilayah] || { g1:'#2C0A0F', g2:'#5E0B15', accent:'#D4AF37', icon:'🏛' };
    const W = isHero ? 1200 : 400;
    const H = isHero ? 500 : 280;
    const cx = W / 2, cy = H / 2;
    const uid = (id + Math.random()).replace(/[^a-z0-9]/gi, '');
    const R = Math.min(W, H) * 0.20;
    const nameSize = isHero ? 24 : 14;
    const subSize  = isHero ? 12 : 9;
    const iconSize = isHero ? 60 : 38;

    const shortNama = nama.length > 32 ? nama.substring(0, 30) + '…' : nama;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bg${uid}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${s.g1}"/>
    <stop offset="100%" stop-color="${s.g2}"/>
  </linearGradient>
  <linearGradient id="vgn${uid}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${s.g1}" stop-opacity="0"/>
    <stop offset="65%" stop-color="${s.g1}" stop-opacity="0.75"/>
    <stop offset="100%" stop-color="${s.g1}" stop-opacity="0.97"/>
  </linearGradient>
  <pattern id="pt${uid}" width="50" height="50" patternUnits="userSpaceOnUse">
    <polygon points="25,2 48,25 25,48 2,25" fill="none" stroke="${s.accent}" stroke-width="0.7" opacity="0.18"/>
    <polygon points="25,10 40,25 25,40 10,25" fill="none" stroke="${s.accent}" stroke-width="0.4" opacity="0.12"/>
    <circle cx="25" cy="25" r="1.8" fill="${s.accent}" opacity="0.18"/>
    <circle cx="0"  cy="0"  r="1.4" fill="${s.accent}" opacity="0.14"/>
    <circle cx="50" cy="0"  r="1.4" fill="${s.accent}" opacity="0.14"/>
    <circle cx="0"  cy="50" r="1.4" fill="${s.accent}" opacity="0.14"/>
    <circle cx="50" cy="50" r="1.4" fill="${s.accent}" opacity="0.14"/>
    <line x1="0" y1="0" x2="50" y2="50" stroke="${s.accent}" stroke-width="0.3" opacity="0.06"/>
    <line x1="50" y1="0" x2="0" y2="50" stroke="${s.accent}" stroke-width="0.3" opacity="0.06"/>
  </pattern>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg${uid})"/>
<rect width="${W}" height="${H}" fill="url(#pt${uid})"/>

<!-- Outer rings -->
<circle cx="${cx}" cy="${cy}" r="${R*1.45}" fill="none" stroke="${s.accent}" stroke-width="0.8" opacity="0.18"/>
<circle cx="${cx}" cy="${cy}" r="${R*1.12}" fill="none" stroke="${s.accent}" stroke-width="1.0" stroke-dasharray="5 4" opacity="0.22"/>
<circle cx="${cx}" cy="${cy}" r="${R*0.78}" fill="none" stroke="${s.accent}" stroke-width="0.6" opacity="0.18"/>

<!-- Rotated square frame -->
<polygon points="${cx},${cy-R} ${cx+R},${cy} ${cx},${cy+R} ${cx-R},${cy}"
         fill="none" stroke="${s.accent}" stroke-width="1.4" opacity="0.38"/>
<polygon points="${cx},${cy-R*0.62} ${cx+R*0.62},${cy} ${cx},${cy+R*0.62} ${cx-R*0.62},${cy}"
         fill="none" stroke="${s.accent}" stroke-width="0.7" opacity="0.22"/>

<!-- Axis arms -->
<line x1="${cx-R*1.45}" y1="${cy}" x2="${cx-R}" y2="${cy}" stroke="${s.accent}" stroke-width="0.9" opacity="0.22"/>
<line x1="${cx+R}" y1="${cy}" x2="${cx+R*1.45}" y2="${cy}" stroke="${s.accent}" stroke-width="0.9" opacity="0.22"/>
<line x1="${cx}" y1="${cy-R*1.45}" x2="${cx}" y2="${cy-R}" stroke="${s.accent}" stroke-width="0.9" opacity="0.22"/>
<line x1="${cx}" y1="${cy+R}" x2="${cx}" y2="${cy+R*1.45}" stroke="${s.accent}" stroke-width="0.9" opacity="0.22"/>

<!-- Corner dots -->
<circle cx="${cx-R*1.45}" cy="${cy}" r="3" fill="${s.accent}" opacity="0.28"/>
<circle cx="${cx+R*1.45}" cy="${cy}" r="3" fill="${s.accent}" opacity="0.28"/>
<circle cx="${cx}" cy="${cy-R*1.45}" r="3" fill="${s.accent}" opacity="0.28"/>
<circle cx="${cx}" cy="${cy+R*1.45}" r="3" fill="${s.accent}" opacity="0.28"/>

<!-- Center fill -->
<circle cx="${cx}" cy="${cy}" r="${R*0.35}" fill="${s.accent}" opacity="0.08"/>

<!-- Icon emoji -->
<text x="${cx}" y="${cy + iconSize*0.38}" text-anchor="middle" font-size="${iconSize}" opacity="0.50">${s.icon}</text>

<!-- Bottom gradient -->
<rect width="${W}" height="${H}" fill="url(#vgn${uid})"/>

<!-- Divider line -->
<line x1="${cx-55}" y1="${H - nameSize*3.1}" x2="${cx+55}" y2="${H - nameSize*3.1}"
      stroke="${s.accent}" stroke-width="0.8" opacity="0.45"/>

<!-- Site name -->
<text x="${cx}" y="${H - nameSize*1.9}"
      text-anchor="middle" font-family="Georgia,serif"
      font-size="${nameSize}" font-weight="bold"
      fill="${s.accent}" opacity="0.95">${shortNama}</text>

<!-- Region label -->
<text x="${cx}" y="${H - subSize*1.4}"
      text-anchor="middle" font-family="Arial,sans-serif"
      font-size="${subSize}" letter-spacing="3"
      fill="white" opacity="0.50">${wilayah.toUpperCase()}</text>
</svg>`;

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

/**
 * Handler untuk onerror pada <img> di etalase (kartu gallery)
 */
window.onCardImgError = function(el, id, namaB64, wilayah) {
    el.onerror = null;
    try {
        const nama = decodeURIComponent(atob(namaB64));
        el.src = generatePlaceholder(id, nama, wilayah, false);
        el.style.objectFit = 'cover';
        el.style.mixBlendMode = 'normal';
        el.style.opacity = '1';
    } catch(e) {
        el.src = generatePlaceholder(id, '—', wilayah, false);
        el.style.mixBlendMode = 'normal';
        el.style.opacity = '1';
    }
};

/**
 * Handler untuk onerror pada <img> di halaman detail (hero)
 */
window.onHeroImgError = function(el, id, namaB64, wilayah) {
    el.onerror = null;
    try {
        const nama = decodeURIComponent(atob(namaB64));
        el.src = generatePlaceholder(id, nama, wilayah, true);
        el.style.objectFit = 'cover';
        el.style.mixBlendMode = 'normal';
        el.style.opacity = '1';
    } catch(e) {
        el.src = generatePlaceholder(id, '—', wilayah, true);
    }
};
