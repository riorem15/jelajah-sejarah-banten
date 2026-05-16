// Pusaka Banten SVG placeholder generator.
// Used when a site does not have a real photo yet.

const REGION_STYLES = {
    'Kota Serang':            { g1:'#3A070E', g2:'#6B1020', accent:'#D4AF37', icon:'KS' },
    'Kabupaten Serang':       { g1:'#4A1508', g2:'#7A2810', accent:'#C9A84C', icon:'SR' },
    'Kota Cilegon':           { g1:'#071525', g2:'#102540', accent:'#E8906C', icon:'CL' },
    'Kabupaten Pandeglang':   { g1:'#072010', g2:'#103520', accent:'#90D84C', icon:'PD' },
    'Kabupaten Lebak':        { g1:'#1E0E03', g2:'#3A1E06', accent:'#C9A020', icon:'LB' },
    'Kota Tangerang':         { g1:'#071020', g2:'#102035', accent:'#D4AF37', icon:'KT' },
    'Kabupaten Tangerang':    { g1:'#071A12', g2:'#10281C', accent:'#C0C84C', icon:'KB' },
    'Kota Tangerang Selatan': { g1:'#140728', g2:'#220A40', accent:'#D4AF37', icon:'TS' },
};

function escapeSvgText(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

window.generatePlaceholder = function(id, nama, wilayah, isHero) {
    const s = REGION_STYLES[wilayah] || { g1:'#2C0A0F', g2:'#5E0B15', accent:'#D4AF37', icon:'PB' };
    const W = isHero ? 1200 : 400;
    const H = isHero ? 500 : 280;
    const cx = W / 2;
    const cy = H / 2;
    const uid = (id + Math.random()).replace(/[^a-z0-9]/gi, '');
    const R = Math.min(W, H) * 0.20;
    const nameSize = isHero ? 24 : 14;
    const subSize = isHero ? 12 : 9;
    const iconSize = isHero ? 54 : 32;
    const shortNama = nama.length > 34 ? nama.substring(0, 31) + '...' : nama;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bg${uid}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${s.g1}"/>
    <stop offset="100%" stop-color="${s.g2}"/>
  </linearGradient>
  <linearGradient id="vgn${uid}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${s.g1}" stop-opacity="0"/>
    <stop offset="65%" stop-color="${s.g1}" stop-opacity="0.76"/>
    <stop offset="100%" stop-color="${s.g1}" stop-opacity="0.98"/>
  </linearGradient>
  <pattern id="pt${uid}" width="50" height="50" patternUnits="userSpaceOnUse">
    <polygon points="25,2 48,25 25,48 2,25" fill="none" stroke="${s.accent}" stroke-width="0.7" opacity="0.18"/>
    <polygon points="25,10 40,25 25,40 10,25" fill="none" stroke="${s.accent}" stroke-width="0.4" opacity="0.12"/>
    <circle cx="25" cy="25" r="1.8" fill="${s.accent}" opacity="0.18"/>
    <line x1="0" y1="0" x2="50" y2="50" stroke="${s.accent}" stroke-width="0.3" opacity="0.06"/>
    <line x1="50" y1="0" x2="0" y2="50" stroke="${s.accent}" stroke-width="0.3" opacity="0.06"/>
  </pattern>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg${uid})"/>
<rect width="${W}" height="${H}" fill="url(#pt${uid})"/>
<circle cx="${cx}" cy="${cy}" r="${R*1.45}" fill="none" stroke="${s.accent}" stroke-width="0.8" opacity="0.18"/>
<circle cx="${cx}" cy="${cy}" r="${R*1.12}" fill="none" stroke="${s.accent}" stroke-width="1.0" stroke-dasharray="5 4" opacity="0.22"/>
<polygon points="${cx},${cy-R} ${cx+R},${cy} ${cx},${cy+R} ${cx-R},${cy}" fill="none" stroke="${s.accent}" stroke-width="1.4" opacity="0.38"/>
<polygon points="${cx},${cy-R*0.62} ${cx+R*0.62},${cy} ${cx},${cy+R*0.62} ${cx-R*0.62},${cy}" fill="none" stroke="${s.accent}" stroke-width="0.7" opacity="0.22"/>
<circle cx="${cx}" cy="${cy}" r="${R*0.35}" fill="${s.accent}" opacity="0.08"/>
<text x="${cx}" y="${cy + iconSize*0.34}" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="${iconSize}" font-weight="800" letter-spacing="3" fill="${s.accent}" opacity="0.58">${s.icon}</text>
<rect width="${W}" height="${H}" fill="url(#vgn${uid})"/>
<line x1="${cx-55}" y1="${H - nameSize*3.1}" x2="${cx+55}" y2="${H - nameSize*3.1}" stroke="${s.accent}" stroke-width="0.8" opacity="0.45"/>
<text x="${cx}" y="${H - nameSize*1.9}" text-anchor="middle" font-family="Georgia,serif" font-size="${nameSize}" font-weight="bold" fill="${s.accent}" opacity="0.95">${escapeSvgText(shortNama)}</text>
<text x="${cx}" y="${H - subSize*1.4}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${subSize}" letter-spacing="3" fill="white" opacity="0.55">${escapeSvgText(wilayah.toUpperCase())}</text>
</svg>`;

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

window.onCardImgError = function(el, id, namaB64, wilayah) {
    el.onerror = null;
    try {
        const nama = decodeURIComponent(atob(namaB64));
        el.src = generatePlaceholder(id, nama, wilayah, false);
    } catch(e) {
        el.src = generatePlaceholder(id, 'Pusaka Banten', wilayah, false);
    }
    el.style.objectFit = 'cover';
    el.style.mixBlendMode = 'normal';
    el.style.opacity = '1';
};

window.onHeroImgError = function(el, id, namaB64, wilayah) {
    el.onerror = null;
    try {
        const nama = decodeURIComponent(atob(namaB64));
        el.src = generatePlaceholder(id, nama, wilayah, true);
    } catch(e) {
        el.src = generatePlaceholder(id, 'Pusaka Banten', wilayah, true);
    }
    el.style.objectFit = 'cover';
    el.style.mixBlendMode = 'normal';
    el.style.opacity = '1';
};
