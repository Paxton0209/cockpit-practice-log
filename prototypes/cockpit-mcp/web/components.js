// Cockpit components as SVG, drawn from the Figma Guideline specs (px at cockpit scale).
// Every component returns a standalone <svg> string, so the same markup previews on the page
// and pastes into Figma as editable vectors.

const PAL = {
  light: { fg:'#1d1d1f', mut:'rgba(29,29,31,0.65)', ter:'rgba(29,29,31,0.4)', card:'#ffffff', track:'#f2f2f2', seg:'#ffffff', screen:'#e4e7ec', panel:'#f5f5f7', acc:'#007AFF', edge:'#409CFF', line:'rgba(29,29,31,0.08)', tile:'#494951', pop:'#ffffff', shadow:'rgba(0,0,0,0.12)',
    sky1:'#f3f4f6', sky2:'#d8dce2', road:'#55595f', lane:'rgba(255,255,255,0.85)', mapBase:'#f5f6f8', mapRoad:'#ffffff', park:'#dcebdf', water:'#c9dcef', traveled:'#9aa0a9', route:'#007aff' },
  dark:  { fg:'#ffffff', mut:'rgba(255,255,255,0.6)', ter:'rgba(255,255,255,0.4)', card:'#1c1c1e', track:'#2c2c2e', seg:'#48484a', screen:'#000000', panel:'#0e0e10', acc:'#0C6FD2', edge:'#0A84FF', line:'rgba(255,255,255,0.08)', tile:'#494951', pop:'#141416', shadow:'rgba(0,0,0,0.32)',
    sky1:'#1d1e21', sky2:'#0b0b0c', road:'#2b2d31', lane:'rgba(255,255,255,0.7)', mapBase:'#1d1f23', mapRoad:'#2f333a', park:'#121a17', water:'#0f1a26', traveled:'#5a5e66', route:'#0a84ff' }
};
const FONT = 'Inter, -apple-system, sans-serif';
const svg = (w, h, body, defs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" font-family="${FONT}">${defs ? `<defs>${defs}</defs>` : ''}${body}</svg>`;
const txt = (x, y, s, size, fill, weight = 400, anchor = 'start', extra = '') => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" ${extra}>${s}</text>`;
const op = (state) => state === 'pressed' ? 0.7 : state === 'disabled' ? 0.4 : 1;
const shadowDef = (id, c) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${c}"/></filter>`;

// line icons, 48 box, stroke 2 (scaled where noted)
const ICON = {
  search: (c, sw = 3) => `<circle cx="21" cy="21" r="11" stroke="${c}" stroke-width="${sw}"/><path d="M29.5 29.5 37 37" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`,
  bolt: c => `<path d="M26 8 13 27h10l-2 13 13-19H24l2-13Z" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>`,
  route: c => `<path d="M14 36c0-6 20-6 20-12s-20-6-20-12" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/><circle cx="14" cy="12" r="3.5" stroke="${c}" stroke-width="2.5"/><circle cx="34" cy="36" r="3.5" stroke="${c}" stroke-width="2.5"/>`,
  volume: c => `<path d="M10 20h6l8-7v22l-8-7h-6z" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/><path d="M30 18c2.5 3 2.5 9 0 12M34 14c5 5.5 5 14.5 0 20" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>`,
  chevron: c => `<path d="m19 13 11 11-11 11" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  chevL: c => `<path d="m29 13-11 11 11 11" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  close: c => `<path d="m16 16 16 16M32 16 16 32" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>`,
  check: c => `<path d="m14 25 7 7 13-15" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  info: c => `<circle cx="24" cy="24" r="13" stroke="${c}" stroke-width="2.5"/><path d="M24 22v9" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="17" r="1.6" fill="${c}"/>`,
  trunk: c => `<path d="M10 30h28l-3-10H13l-3 10Zm2 0v6h24v-6" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 14l6-5 6 5" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  plug: c => `<path d="M18 10v8M30 10v8M14 18h20v6a10 10 0 0 1-20 0v-6ZM24 34v6" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  car: c => `<path d="M10 30v-6l4-9h20l4 9v6H10Z" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="16" cy="31" r="3" stroke="${c}" stroke-width="2.5"/><circle cx="32" cy="31" r="3" stroke="${c}" stroke-width="2.5"/>`,
  map: c => `<path d="M8 14l10-4 12 4 10-4v24l-10 4-12-4-10 4V14Z" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 10v24M30 14v24" stroke="${c}" stroke-width="2.5"/>`,
  music: c => `<path d="M20 34V14l16-4v20" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="16" cy="34" r="4" stroke="${c}" stroke-width="2.5"/><circle cx="32" cy="30" r="4" stroke="${c}" stroke-width="2.5"/>`,
  phone: c => `<path d="M14 9h6l3 8-4 3a20 20 0 0 0 9 9l3-4 8 3v6a3 3 0 0 1-3 3C21 37 11 27 11 12a3 3 0 0 1 3-3Z" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>`,
  grid: c => `<rect x="11" y="11" width="10" height="10" rx="3" stroke="${c}" stroke-width="2.5"/><rect x="27" y="11" width="10" height="10" rx="3" stroke="${c}" stroke-width="2.5"/><rect x="11" y="27" width="10" height="10" rx="3" stroke="${c}" stroke-width="2.5"/><rect x="27" y="27" width="10" height="10" rx="3" stroke="${c}" stroke-width="2.5"/>`,
  arrowUp: c => `<path d="M24 38V12M13 22l11-11 11 11" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  turnRight: c => `<path d="M14 40V26a8 8 0 0 1 8-8h14M28 10l8 8-8 8" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`
};
const icon = (name, x, y, c, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${ICON[name](c)}</g>`;

const switchShape = (x, y, on, p) => `<rect x="${x}" y="${y}" width="52" height="32" rx="16" fill="${on ? p.acc : p.track}"/><circle cx="${x + (on ? 36 : 16)}" cy="${y + 16}" r="12" fill="#ffffff"/>`;
const segTrack = (x, y, w, labels, sel, p) => {
  const n = labels.length, sw = (w - 8) / n;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="16" fill="${p.track}"/>` +
    `<rect x="${x + 4 + sw * sel}" y="${y + 4}" width="${sw}" height="56" rx="12" fill="${p.seg}" ${p.seg === '#ffffff' ? 'filter="url(#segsh)"' : ''}/>` +
    labels.map((l, i) => txt(x + 4 + sw * i + sw / 2, y + 41, l, 26, i === sel ? p.fg : p.mut, i === sel ? 500 : 400, 'middle')).join('');
};
const segDef = `<filter id="segsh" x="-10%" y="-20%" width="120%" height="160%"><feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="rgba(0,0,0,0.12)"/></filter>`;

const COMP = {
  switch: { name: 'Switch', cat: 'Controls', size: '52 × 32', rules: ['CT-02', 'PR-03', 'SC-04', 'SC-05'], states: ['on', 'off', 'pressed', 'disabled'],
    draw: (m, st = 'on') => { const p = PAL[m]; return svg(52, 32, `<g opacity="${op(st)}">${switchShape(0, 0, st !== 'off', p)}</g>`); } },
  'list-row': { name: 'List row', cat: 'Controls', size: '786 × 76', rules: ['PR-01', 'TY-03', 'TY-04', 'IC-03', 'CP-02'], states: ['switch', 'value', 'chevron', 'disabled'],
    draw: (m, st = 'switch') => { const p = PAL[m]; let tr = '';
      if (st === 'switch' || st === 'disabled') tr = switchShape(702, 22, true, p);
      if (st === 'value') tr = txt(706, 47, 'km', 28, p.mut, 400, 'end') + icon('chevron', 716, 14, p.ter, 1);
      if (st === 'chevron') tr = icon('chevron', 716, 14, p.ter, 1);
      const title = st === 'value' ? 'Units' : st === 'chevron' ? 'Mirror adjust' : 'Window lock';
      return svg(786, 76, `<g opacity="${op(st)}"><rect width="786" height="76" fill="${p.card}"/>${txt(32, 48, title, 28, p.fg, 500)}${tr}</g>`); } },
  'toggle-group': { name: 'Toggle group', cat: 'Controls', size: '722 × 64', rules: ['PR-04', 'PR-05', 'TY-05', 'PT-03', 'SC-08'], states: ['Off', 'Left', 'Right', 'Both'],
    draw: (m, st = 'Left') => { const p = PAL[m], L = ['Off', 'Left', 'Right', 'Both']; return svg(722, 64, segTrack(0, 0, 722, L, Math.max(0, L.indexOf(st)), p), segDef); } },
  'choice-row': { name: 'Choice row', cat: 'Controls', size: '786 × 150', rules: ['CT-03', 'TY-03', 'TY-05'], states: ['stacked'],
    draw: (m) => { const p = PAL[m]; return svg(786, 150, `<rect width="786" height="150" fill="${p.card}"/>${txt(32, 48, 'Child lock', 28, p.fg, 500)}${segTrack(32, 70, 722, ['Off', 'Left', 'Right', 'Both'], 3, p)}`, segDef); } },
  button: { name: 'Button', cat: 'Controls', size: 'M 141 × 56 · L 187 × 72', rules: ['CT-06', 'CT-08', 'BG-04', 'SC-03', 'SC-11'], states: ['primary', 'secondary', 'pressed', 'disabled'],
    draw: (m, st = 'primary') => { const p = PAL[m], prim = st !== 'secondary';
      return svg(187, 72, `<g opacity="${op(st)}"><rect x="1" y="1" width="185" height="70" rx="16" fill="${prim ? p.acc : p.track}" stroke="${prim ? p.edge : 'none'}" stroke-width="2"/>${txt(93.5, 46, prim ? 'Confirm' : 'Cancel', 28, prim ? '#ffffff' : p.fg, 500, 'middle')}</g>`); } },
  'tile-button': { name: 'Tile button', cat: 'Controls', size: '250 × 160', rules: ['CT-07', 'IC-05', 'SC-11'], states: ['default', 'selected', 'pressed', 'disabled'],
    draw: (m, st = 'default') => { const p = PAL[m], sel = st === 'selected', c = sel ? '#ffffff' : p.fg;
      return svg(250, 160, `<g opacity="${op(st)}"><rect x="1" y="1" width="248" height="158" rx="20" fill="${sel ? p.acc : p.card}" stroke="${sel ? p.edge : p.line}" stroke-width="2"/>${icon('trunk', 89, 24, c, 1.5)}${txt(125, 132, 'Trunk', 28, c, 500, 'middle')}</g>`); } },
  stepper: { name: 'Stepper', cat: 'Controls', size: 'chevron 64 · value 44', rules: ['FW-11'], states: ['default', 'disabled'],
    draw: (m, st = 'default') => { const p = PAL[m]; return svg(260, 64, `<g opacity="${op(st)}">${icon('chevL', 0, 0, p.mut, 1.333)}${txt(130, 47, '22.0', 44, p.fg, 500, 'middle')}${icon('chevron', 196, 0, p.mut, 1.333)}</g>`); } },
  search: { name: 'Search field', cat: 'Controls', size: '560 × 76', rules: ['BC-04'], states: ['empty', 'typing'],
    draw: (m, st = 'empty') => { const p = PAL[m]; const t = st === 'typing' ? txt(80, 48, 'Robo Base', 28, p.fg) + `<rect x="219" y="22" width="2" height="32" rx="1" fill="${p.acc}"/>` : txt(80, 48, 'Search destination', 28, p.mut);
      return svg(560, 76, `<rect width="560" height="76" rx="20" fill="${p.card}"/>${icon('search', 18, 14, p.fg, 1)}${t}`); } },
  'list-card': { name: 'List card', cat: 'Surfaces', size: '786 × 300', rules: ['GS-01', 'GS-03', 'GS-05', 'TY-02', 'CP-03'], states: ['default'],
    draw: (m) => { const p = PAL[m];
      return svg(786, 312, `${txt(32, 26, 'Locks', 24, p.mut)}<rect y="44" width="786" height="268" rx="20" fill="${p.card}"/>` +
        `<g transform="translate(0 56)">${txt(32, 48, 'Window lock', 28, p.fg, 500)}${switchShape(702, 22, true, p)}</g>` +
        `<g transform="translate(0 132)">${txt(32, 48, 'Auto lock on walk-away', 28, p.fg, 500)}${switchShape(702, 22, false, p)}</g>` +
        `<g transform="translate(0 208)">${txt(32, 48, 'Unlock mode', 28, p.fg, 500)}${txt(706, 47, 'All doors', 28, p.mut, 400, 'end')}${icon('chevron', 716, 14, p.ter)}</g>`); } },
  'side-nav': { name: 'Side nav', cat: 'Surfaces', size: '300 × 640', rules: ['GS-06', 'SC-08', 'SC-10'], states: ['default'],
    draw: (m) => { const p = PAL[m]; const items = [['Vehicle', 'car'], ['Driving', 'route'], ['Charging', 'plug'], ['Display', 'grid'], null, ['Sound', 'volume'], ['Navigation', 'map'], ['Phone', 'phone'], ['Media', 'music']]; let y = 0, b = '';
      items.forEach((it, i) => { if (!it) { y += 38; return; } if (i === 0) b += `<rect x="0" y="${y}" width="300" height="68" rx="16" fill="${p.track}"/>`;
        b += icon(it[1], 18, y + 10, i === 0 ? p.fg : p.mut, 1) + txt(80, y + 44, it[0], 28, i === 0 ? p.fg : p.mut, i === 0 ? 500 : 400); y += 72; });
      return svg(300, y, b); } },
  toast: { name: 'Toast', cat: 'Feedback', size: '399 × 72', rules: [], states: ['success', 'info'],
    draw: (m, st = 'success') => { const p = PAL[m];
      return svg(415, 92, `<rect x="8" y="4" width="399" height="72" rx="36" fill="${p.pop}" filter="url(#tsh)"/><circle cx="48" cy="40" r="18" fill="${st === 'success' ? '#1f9d3a' : p.acc}"/>${icon(st === 'success' ? 'check' : 'info', 33, 25, '#ffffff', 0.625)}${txt(80, 49, st === 'success' ? 'Charging started' : 'Software update ready', 26, p.fg, 500)}`, shadowDef('tsh', p.shadow)); } },
  'voice-card': { name: 'Voice card', cat: 'Feedback', size: '547 × 72', rules: [], states: ['ASR', 'Thinking', 'TTS'],
    draw: (m, st = 'ASR') => { const p = PAL[m]; const t = { ASR: 'Set temperature to 22 degrees', Thinking: 'Thinking…', TTS: 'Temperature set to 22°' }[st];
      return svg(563, 92, `<rect x="8" y="4" width="547" height="72" rx="36" fill="${p.pop}" filter="url(#vsh)"/><circle cx="48" cy="40" r="22" fill="url(#orb)"/>${txt(86, 49, t, 26, st === 'Thinking' ? p.mut : p.fg, 500)}`,
        shadowDef('vsh', p.shadow) + `<radialGradient id="orb" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="${p.edge}"/><stop offset="1" stop-color="${p.acc}"/></radialGradient>`); } },
  'nav-maneuver': { name: 'Maneuver card', cat: 'Navigation', size: '360 × 168', rules: [], states: ['straight', 'right'],
    draw: (m, st = 'right') => { const p = PAL[m];
      return svg(360, 168, `<clipPath id="mc"><rect width="360" height="168" rx="20"/></clipPath><g clip-path="url(#mc)"><rect width="360" height="168" fill="#248a3d"/><rect y="120" width="360" height="48" fill="#1b6b30"/></g>` +
        icon(st === 'right' ? 'turnRight' : 'arrowUp', 22, 28, '#ffffff', 1.3) + txt(104, 62, '300 m', 40, '#ffffff', 500) + txt(104, 94, 'Main Street', 22, 'rgba(255,255,255,0.8)') +
        txt(22, 152, 'Then  ↱ 150 m', 22, '#ffffff', 500) + txt(338, 152, 'Arrive 10:48', 22, 'rgba(255,255,255,0.8)', 400, 'end')); } },
  'nav-eta': { name: 'ETA bar', cat: 'Navigation', size: '416 × 82', rules: [], states: ['default'],
    draw: (m) => { const p = PAL[m]; const col = (x, a, b) => txt(x, 36, a, 26, p.fg, 500) + txt(x, 62, b, 20, p.mut);
      return svg(432, 102, `<rect x="8" y="4" width="416" height="82" rx="41" fill="${p.pop}" filter="url(#esh)"/><g transform="translate(8 4)">${col(32, '10:48', 'Arrival')}${col(140, '18 min', 'Time left')}${col(256, '12 km', 'Distance')}<circle cx="372" cy="41" r="24" fill="${p.track}"/>${icon('close', 358, 27, p.fg, 0.58)}</g>`, shadowDef('esh', p.shadow)); } },
  'map-controls': { name: 'Map controls', cat: 'Navigation', size: '72 × 252', rules: ['IC-06', 'IC-07'], states: ['vertical'],
    draw: (m) => { const p = PAL[m]; return svg(88, 272, `<rect x="8" y="4" width="72" height="252" rx="36" fill="${p.pop}" filter="url(#msh)"/>${['search', 'bolt', 'route', 'volume'].map((n, i) => icon(n, 20, 20 + i * 58, p.fg, 1)).join('')}`, shadowDef('msh', p.shadow)); } },
  'app-tile': { name: 'App tiles', cat: 'System', size: '54 icon · radius 14', rules: ['IC-05'], states: ['default'],
    draw: (m) => { const p = PAL[m]; const apps = [['car', '#494951'], ['map', '#2f7d4a'], ['music', '#e5484d'], ['phone', '#30a46c'], ['grid', '#494951']];
      return svg(5 * 54 + 4 * 24, 54, apps.map(([n, c], i) => `<rect x="${i * 78}" width="54" height="54" rx="14" fill="${c}"/>${icon(n, i * 78 + 7, 7, '#ffffff', 0.83)}`).join('')); } }
};

// ── Screens ──
function statusBar(p, w, split) {
  return txt(40, 50, 'P  R  N  <tspan font-weight="600">D</tspan>', 22, p.mut, 500, 'start', 'letter-spacing="2"') +
    txt(split + (w - split) * 0.28, 50, '10:32', 24, p.fg, 500, 'middle') + txt(w - 92, 50, '18°', 24, p.fg, 500, 'end') + `<circle cx="${w - 56}" cy="42" r="16" fill="${p.mut}" opacity="0.5"/>`;
}
function dock(p, w, h, split) {
  const cx = split + (w - split) * 0.26, apps = [['car', '#494951'], ['map', '#2f7d4a'], ['music', '#e5484d'], ['phone', '#30a46c'], ['grid', '#494951']];
  const x0 = cx - (5 * 54 + 4 * 24) / 2, y = h - 73;
  return apps.map(([n, c], i) => `<rect x="${x0 + i * 78}" y="${y}" width="54" height="54" rx="14" fill="${c}"/>${icon(n, x0 + i * 78 + 7, y + 7, '#ffffff', 0.83)}`).join('') +
    icon('chevL', 34, h - 70, p.mut, 1) + txt(132, h - 33, '22.0', 32, p.fg, 500, 'middle') + icon('chevron', 182, h - 70, p.mut, 1) +
    icon('chevL', w - 230, h - 70, p.mut, 1) + txt(w - 132, h - 33, '22.0', 32, p.fg, 500, 'middle') + icon('chevron', w - 82, h - 70, p.mut, 1);
}
function scene(p, w, h, id, speed = true) {
  const cx = w / 2;
  return `<linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky1}"/><stop offset="1" stop-color="${p.sky2}"/></linearGradient>` +
    `<rect width="${w}" height="${h}" fill="url(#${id}sky)"/>` +
    `<path d="M${cx - 30} ${h * 0.38} L${cx + 30} ${h * 0.38} L${w + 60} ${h} L-60 ${h} Z" fill="${p.road}"/>` +
    [-1, 1].map(s => `<path d="M${cx + s * 10} ${h * 0.4} L${cx + s * w * 0.22} ${h}" stroke="${p.lane}" stroke-width="5" stroke-dasharray="26 30"/>`).join('') +
    `<rect x="${cx - 46}" y="${h * 0.66}" width="92" height="132" rx="30" fill="#f4f5f7"/><rect x="${cx - 34}" y="${h * 0.66 + 22}" width="68" height="34" rx="12" fill="#b9bec6"/>` +
    (speed ? txt(cx, 212, '80', 96, p.fg, 500, 'middle') + txt(cx, 252, 'km/h', 24, p.mut, 400, 'middle') : '');
}
function mapLayer(p, x, w, h) {
  return `<rect x="${x}" width="${w}" height="${h}" fill="${p.mapBase}"/>` +
    `<rect x="${x + 90}" y="300" width="240" height="160" rx="24" fill="${p.park}"/><ellipse cx="${x + 760}" cy="250" rx="70" ry="48" fill="${p.water}"/><ellipse cx="${x + 640}" cy="560" rx="40" ry="60" fill="${p.water}"/>` +
    [[0, 180, w, 210], [0, 520, w, 480], [120, 0, 260, h], [w - 260, 0, w - 160, h], [0, 760, w, 700]].map(([a, b, c, d]) => `<path d="M${x + a} ${b} L${x + c} ${d}" stroke="${p.mapRoad}" stroke-width="14"/>`).join('') +
    `<path d="M${x + 590} ${h} L${x + 600} 560 Q${x + 610} 470 ${x + 640} 380 L${x + 700} 0" stroke="${p.route}" stroke-width="10" stroke-linecap="round"/>` +
    `<path d="M${x + 590} ${h} L${x + 600} 560" stroke="${p.traveled}" stroke-width="10" stroke-linecap="round"/>` +
    `<circle cx="${x + 600}" cy="560" r="26" fill="#ffffff" filter="url(#puck)"/><path d="M${x + 600} 544 L${x + 612} 572 L${x + 600} 566 L${x + 588} 572 Z" fill="${p.route}"/>`;
}
const SCREENS = {
  'key-screen': { name: 'Key screen · Map', cat: 'Screens', size: '1600 × 900', rules: ['FW-01', 'FW-04', 'FW-06', 'FW-07'], states: ['default'],
    draw: (m) => { const p = PAL[m], W = 1600, H = 900, S = 617;
      const fade = `<linearGradient id="kbar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.65)'}"/><stop offset="1" stop-color="${m === 'dark' ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)'}"/></linearGradient>`;
      return svg(W, H, `<clipPath id="ksc"><rect width="${S}" height="${H}"/></clipPath><g clip-path="url(#ksc)">${scene(p, S, H, 'k')}</g>${mapLayer(p, S, W - S, H)}` +
        `<g transform="translate(650 104)">${COMP['nav-maneuver'].draw(m).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>` +
        `<g transform="translate(${W - 104} 100)">${COMP['map-controls'].draw(m).replace(/^<svg[^>]*>|<\/svg>$/g, '').replace(/msh/g, 'kmsh')}</g>` +
        `<g transform="translate(642 690)">${COMP['nav-eta'].draw(m).replace(/^<svg[^>]*>|<\/svg>$/g, '').replace(/esh/g, 'kesh')}</g>` +
        `<rect width="${W}" height="96" fill="url(#kbar)"/>${statusBar(p, W, S)}<rect y="${H - 92}" width="${W}" height="92" fill="url(#kbar)" transform="rotate(180 ${W / 2} ${H - 46})"/>${dock(p, W, H, S)}`,
        fade + `<filter id="puck" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="rgba(0,0,0,0.18)"/></filter>`); } },
  settings: { name: 'Settings · Locks', cat: 'Screens', size: '1920 × 1200', rules: ['FW-01', 'FW-02', 'FW-03', 'GS-06', 'PT-01'], states: ['default'],
    draw: (m) => { const p = PAL[m], W = 1920, H = 1200, S = 740; const inner = id => COMP[id].draw(m).replace(/^<svg[^>]*>|<\/svg>$/g, '');
      return svg(W, H, `<clipPath id="ssc"><rect width="${S}" height="${H}"/></clipPath><g clip-path="url(#ssc)">${scene(p, S, H, 's', false)}</g>` +
        `<rect x="${S}" width="${W - S}" height="${H}" fill="${p.panel}"/>` +
        `<g transform="translate(${S + 40} 120)">${inner('side-nav')}</g>` +
        `<g transform="translate(${S + 380} 96)">${txt(0, 44, 'Vehicle', 36, p.fg, 500)}</g>` +
        `<g transform="translate(${S + 360} 170)" >${inner('list-card')}</g>` +
        `<g transform="translate(${S + 360} 530)">${txt(32, 26, 'Rear doors', 24, p.mut)}<rect y="44" width="786" height="174" rx="20" fill="${p.card}"/><g transform="translate(0 56)">${inner('choice-row').replace(/<rect width="786" height="150" fill="[^"]+"\/>/, '')}</g></g>` +
        txt(S / 2, 140, 'Locked', 36, p.fg, 500, 'middle') + txt(S / 2, 180, 'All doors and windows', 24, p.mut, 400, 'middle') +
        statusBar(p, W, S) + dock(p, W, H, S), segDef); } }
};
