// Cockpit layout checker — shared by the MCP server and the web playground.
// Input: { mode: 'light'|'dark', screen?: {width, split}, elements: [...] }
// Each element may carry: id, type, x, y, width, height, fontSize, opacity, state,
// radius, parentRadius, inset, context, inCard, hasSubtitle, hasLeadingIcon, shape,
// options, steps, color, labelWidth, size, columns:{container,gap,n}, children:[types]

export function checkLayout(input, rules, tokens) {
  const R = Object.fromEntries(rules.map(r => [r.id, r]));
  const mode = input.mode === 'dark' ? 'dark' : 'light';
  const out = [];
  const add = (id, el, message, fix) => out.push({
    rule: id, key: R[id]?.key, severity: R[id]?.severity || 'should',
    element: el ? (el.id || el.type) : 'screen', message, fix
  });

  // token values allowed for this mode
  const allowed = new Set();
  for (const t of Object.values(tokens.color || {})) {
    const v = t.$value; if (!v || typeof v !== 'object') continue;
    if (v[mode]) allowed.add(String(v[mode]).toLowerCase());
  }
  const accent = tokens.color['accent-fill'].$value;
  const otherAccent = String(accent[mode === 'dark' ? 'light' : 'dark']).toLowerCase();

  const s = input.screen;
  if (s && s.width && s.split != null) {
    const ratio = s.split / s.width;
    if (Math.abs(ratio - 0.3856) > 0.01)
      add('FW-04', null, `Scene/app split is ${ratio.toFixed(3)} of the width.`, `Put the seam at ${Math.round(s.width * 0.3856)} px (golden split ≈ 0.382; Figma uses 617 / 1600 and 740 / 1920).`);
  }

  const interactive = new Set(['button', 'icon-button', 'tile-button', 'chip']);
  const inlineCtl = new Set(['switch', 'checkbox', 'radio', 'chevron', 'info']);
  const topLineTypes = new Set(['speed', 'section-header', 'nav-item']);

  for (const el of input.elements || []) {
    const t = el.type;
    for (const k of ['x', 'y', 'width', 'height'])
      if (typeof el[k] === 'number' && !Number.isInteger(el[k])) {
        add('BG-01', el, `${k} = ${el[k]} is not a whole pixel.`, `Round ${k} to ${Math.round(el[k])}.`); break;
      }
    if (t === 'row' && el.height < 76) add('PR-01', el, `Row is ${el.height} px high.`, 'Rows are at least 76 px (padding 32 / 16).');
    if (inlineCtl.has(t) && el.context === 'row' && el.height > 38) add('PR-03', el, `Inline ${t} is ${el.height} px, taller than the 38 px text line.`, 'Keep inline controls ≤ 38 px (switch 52 × 32).');
    if (t === 'switch' && (el.width !== 52 || el.height !== 32) && el.width && el.height) add('CT-02', el, `Switch is ${el.width} × ${el.height}.`, 'Use 52 × 32 with a 24 knob.');
    if ((t === 'segment' || t === 'toggle-group') && el.height && el.height !== 64) add('PR-04', el, `Track is ${el.height} px.`, 'Full-width tracks are 64 (segment 56 + inset 4).');
    if (el.radius != null && el.parentRadius != null && el.inset != null && el.parentRadius - el.inset !== el.radius)
      add('PR-05', el, `Radius ${el.radius} inside ${el.parentRadius} with inset ${el.inset} is not concentric.`, `Use ${el.parentRadius - el.inset} (outer − inset).`);
    if (t === 'text' && el.inCard && el.fontSize && ![24, 26, 28, 48].includes(el.fontSize)) add('TY-01', el, `Text in a card is ${el.fontSize} px.`, 'Cards use 28 (titles, values), 26 (inside tracks), 24 (headers); 48 for readings.');
    if (t === 'row' && el.hasSubtitle) add('TY-06', el, 'Row has a subtitle.', 'Remove it; add an info icon after the title or a helper line under the control.');
    if (t === 'row' && el.inCard && el.hasLeadingIcon) add('IC-02', el, 'Settings row shows a leading icon.', 'Turn Show icon off in settings cards.');
    if (t === 'icon' && el.width && el.width !== 48) add('IC-06', el, `Icon instance is ${el.width} px.`, 'Keep icons at 48; enlarge the hit area with a 68 icon-button box instead.');
    if (t === 'icon-button' && Math.min(el.width || 99, el.height || 99) < 68) add('BC-05', el, `Touch target is ${el.width} × ${el.height}.`, 'Use a 68 × 68 icon-button box.');
    if (el.shape === 'pill' && t !== 'switch' && t !== 'chip') add('CT-02', el, `${t} uses a pill shape.`, 'Only switches are pills; use a rounded rectangle.');
    if ((t === 'choice' || t === 'toggle-group' || t === 'segment') && el.options != null && (el.options < 2 || el.options > 4)) add('CT-03', el, `${el.options} options.`, 'Choices have 2–4 options; use a chevron row to a picker for more.');
    if (t === 'button' && el.context === 'row') add('CT-04', el, 'Button placed inside a row.', 'Use a chevron row (list-row + Show chevron).');
    else if (t === 'button' && el.context && !['dialog', 'popup', 'sheet', 'banner', 'empty-state', 'list-row-action'].includes(el.context)) add('CT-06', el, `Button used in ${el.context}.`, 'Buttons belong in dialogs and popups.');
    if (t === 'button' && el.labelWidth != null) {
      const min = el.size === 'S' ? 100 : 116;
      if (el.labelWidth < min) add('BG-04', el, `Label area ${el.labelWidth} px.`, `Button ${el.size || 'M'} label needs ≥ ${min} px.`);
    }
    if (t === 'slider' && el.steps >= 3 && el.steps <= 5) add('PT-03', el, `Slider with ${el.steps} discrete steps.`, 'Use a toggle-group for 3–5 steps.');
    if (t === 'radio' && el.inCard) add('PT-07', el, 'Radio circles for presets.', 'Use rows with a trailing check (list-row Selected + check).');
    if (el.state === 'pressed' && el.opacity != null && Math.abs(el.opacity - 0.7) > 0.001) add('SC-04', el, `Pressed opacity ${el.opacity}.`, 'Pressed = default at 70%, no new color.');
    if (el.state === 'disabled' && el.opacity != null && Math.abs(el.opacity - 0.4) > 0.001) add('SC-05', el, `Disabled opacity ${el.opacity}.`, 'Disabled = default at 40%, no new color.');
    if (el.color) {
      const c = String(el.color).toLowerCase();
      if (c === otherAccent) add('SC-06', el, `Accent ${el.color} belongs to the other mode.`, `Use ${accent[mode]} in ${mode}.`);
      else if (!allowed.has(c)) add('BT-01', el, `Raw color ${el.color} is not a ${mode} token.`, 'Bind to a semantic token.');
    }
    if (el.columns) {
      const { container, gap, n } = el.columns; const w = (container - gap * (n - 1)) / n;
      if (!Number.isInteger(w)) add('BG-02', el, `${n} columns in ${container} with gap ${gap} = ${w.toFixed(2)} px each.`, 'Adjust container padding first, then the gap token.');
    }
    if (topLineTypes.has(t) && el.y != null && el.y < 96) add('FW-07', el, `${t} starts at y = ${el.y}, under the status bar.`, 'Start content at the 96 px top line.');
    if (t === 'card' && Array.isArray(el.children)) {
      const rank = { choice: 0, 'toggle-group': 0, switch: 1, chevron: 2, value: 2 };
      const seq = el.children.map(c => rank[c]).filter(v => v != null);
      if (seq.some((v, i) => i && v < seq[i - 1])) add('GS-05', el, `Card order: ${el.children.join(' → ')}.`, 'Order: choices, switches, then chevron / value rows.');
    }
  }
  const must = out.filter(v => v.severity === 'must').length;
  return { passed: out.length === 0, mode, summary: out.length ? `${out.length} issue(s), ${must} must-fix.` : 'No issues found against the cockpit rules.', violations: out };
}
