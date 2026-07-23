/*
  Gera assets rasterizados (ícones PWA + imagem de compartilhamento OG)
  a partir de SVGs de marca, usando resvg (WASM, sem binário nativo).
  Uso: npm run gen:assets
*/
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import { readFileSync, writeFileSync } from 'node:fs';

await initWasm(readFileSync('node_modules/@resvg/resvg-wasm/index_bg.wasm'));

// Fontes do próprio Windows (evita depender de download)
const fonts = ['segoeui.ttf', 'seguisb.ttf', 'arial.ttf', 'arialbd.ttf']
  .map((f) => {
    try {
      return readFileSync(`/c/Windows/Fonts/${f}`);
    } catch {
      try {
        return readFileSync(`C:/Windows/Fonts/${f}`);
      } catch {
        return null;
      }
    }
  })
  .filter(Boolean);

function png(svg, width) {
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontBuffers: fonts, defaultFontFamily: 'Segoe UI', loadSystemFonts: false },
  });
  return r.render().asPng();
}

const busGlyph = (stroke, sw) => `
  <path d="M1 12V3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9"/>
  <path d="M0 12h20"/><path d="M1 6h18"/>
  <circle cx="5" cy="14" r="1.4"/><circle cx="15" cy="14" r="1.4"/>`;

// ---- Ícone (maskable: fundo cheio + glifo centralizado na zona segura) ----
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#164a88"/>
  <g transform="translate(146 168) scale(11)" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${busGlyph()}</g>
</svg>`;

writeFileSync('public/icon-512.png', png(iconSvg, 512));
writeFileSync('public/icon-192.png', png(iconSvg, 192));

// ---- Imagem de compartilhamento (OG) 1200x630 ----
const laneDashes = Array.from(
  { length: 12 },
  (_, i) => `<rect x="${80 + i * 95}" y="588" width="55" height="6"/>`,
).join('');

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="82%" cy="-5%" r="75%">
      <stop offset="0%" stop-color="#1c5aa6" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#191d24" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#191d24"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="80" y="152" width="6" height="150" fill="#db2828"/>
  <text x="104" y="140" font-family="Segoe UI Semibold" font-size="26" fill="#ee6b6b">LINHA METROPOLITANA · BR-290</text>
  <text x="100" y="238" font-family="Segoe UI Semibold" font-size="80" fill="#ffffff">Arroio dos Ratos</text>
  <text x="100" y="330" font-family="Segoe UI Semibold" font-size="80" fill="#ffffff"><tspan fill="#ee6b6b">para</tspan> Porto Alegre</text>
  <text x="104" y="415" font-family="Segoe UI" font-size="33" fill="#c7ccd6">Horários, pontos de embarque e fretamento</text>
  <text x="104" y="545" font-family="Segoe UI Semibold" font-size="30" fill="#ffffff">EMPRESA LOUZADA <tspan fill="#9aa1ad" font-family="Segoe UI">· desde 1974</tspan></text>
  <g transform="translate(840 205) scale(13)" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.92">${busGlyph()}</g>
  <g fill="#db2828">${laneDashes}</g>
</svg>`;

writeFileSync('public/og.png', png(ogSvg, 1200));

console.log('OK: gerados public/icon-192.png, public/icon-512.png, public/og.png');
