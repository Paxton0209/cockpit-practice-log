const vehicleImage = (name, width, height, className = '') =>
  `<img class="${className}" src="vehicle/${name}.svg"${Number.isInteger(width) && Number.isInteger(height) ? ` width="${width}" height="${height}"` : ''} alt="">`;

const vehicleThemedImage = (name, width, height, className = '') =>
  `<span class="vehicle-art ${className}" aria-hidden="true">
    ${vehicleImage(name + '-light', width, height, 'vehicle-light')}
    ${vehicleImage(name + '-dark', width, height, 'vehicle-dark')}
  </span>`;

function parkingMethod(cover) {
  const choice = cover ? 'span' : 'button';
  return `<div class="vehicle-preview vehicle-surface vehicle-parking">
    <div class="vehicle-heading">
      <h2>How to park</h2>
      <p>Hold the brake to continue.</p>
    </div>
    <div class="vehicle-offset">
      <p>Parking offset</p>
      <div class="vehicle-segment" role="group" aria-label="Parking offset">
        ${['Left', 'Center', 'Right'].map((label, i) =>
          `<${choice} ${cover ? (i === 1 ? 'class="is-selected"' : '') : `type="button" data-vehicle-offset aria-pressed="${i === 1}"`}>${label}</${choice}>`
        ).join('')}
      </div>
    </div>
    <div class="vehicle-actions">
      <span class="vehicle-primary">Park now</span>
      <span>Exit &amp; park</span>
    </div>
  </div>`;
}

function driveModes(cover) {
  const modes = [['Snow', 'snow'], ['Wet', 'wet'], ['Sand', 'sand'], ['Range saver', 'range']];
  const tile = cover ? 'div' : 'button';
  return `<div class="vehicle-preview vehicle-modes">
    ${modes.map(([label, icon]) => `
    <${tile} class="vehicle-surface vehicle-mode" ${cover ? '' : `type="button" data-vehicle-mode aria-label="${label}" aria-pressed="false"`}>
      <span class="vehicle-mode-top">
        ${vehicleThemedImage(icon, 56, 56)}
        <span class="vehicle-mode-state">OFF</span>
      </span>
      <span class="vehicle-mode-label">${label}${vehicleThemedImage('mode-info', 48, 48)}</span>
    </${tile}>`).join('')}
  </div>`;
}

/* Energy use, HeroUI v3 card anatomy: header (title + range tabs), KPI (value, unit, delta chip), then a calm full-width chart.
   One series, three faint gridlines, a dashed average and a single end point; colour follows the Colour switch. */
const EU_LINE = 'M0.0 41.6C1.8 40.1 7.4 33.9 11.1 32.1C14.8 30.4 18.4 30.2 22.1 31.2C25.8 32.3 29.5 35.8 33.2 38.5C36.9 41.3 40.6 45.4 44.3 47.7C48.0 50.1 51.6 51.8 55.3 52.4C59.0 52.9 62.7 51.8 66.4 51.0C70.1 50.3 73.8 48.5 77.5 48.0C81.2 47.4 84.8 47.4 88.5 47.9C92.2 48.4 95.9 50.2 99.6 51.1C103.3 52.1 107.0 53.5 110.7 53.6C114.4 53.7 118.0 52.8 121.7 51.7C125.4 50.6 129.1 47.9 132.8 46.8C136.5 45.7 140.2 44.3 143.9 45.0C147.6 45.8 151.2 48.1 154.9 51.4C158.6 54.7 162.3 60.4 166.0 65.0C169.7 69.7 173.4 75.6 177.1 79.3C180.8 83.1 184.4 86.1 188.1 87.7C191.8 89.3 195.5 88.9 199.2 88.7C202.9 88.5 206.6 87.0 210.3 86.5C214.0 86.0 217.6 85.7 221.3 85.6C225.0 85.5 228.7 86.3 232.4 86.0C236.1 85.6 239.8 85.4 243.5 83.6C247.2 81.8 250.8 78.7 254.5 75.2C258.2 71.7 261.9 66.4 265.6 62.6C269.3 58.8 273.0 54.5 276.7 52.5C280.4 50.4 284.0 49.7 287.7 50.2C291.4 50.7 295.1 53.4 298.8 55.3C302.5 57.2 306.2 60.2 309.9 61.5C313.6 62.7 317.2 63.3 320.9 62.7C324.6 62.1 328.3 59.8 332.0 58.0C335.7 56.2 339.4 53.4 343.1 51.9C346.8 50.3 350.4 49.2 354.1 48.7C357.8 48.1 361.5 48.7 365.2 48.3C368.9 48.0 372.6 48.0 376.3 46.6C380.0 45.3 383.6 42.8 387.3 40.3C391.0 37.7 394.7 33.7 398.4 31.4C402.1 29.1 405.8 26.5 409.5 26.4C413.2 26.3 416.8 27.9 420.5 30.7C424.2 33.4 427.9 38.7 431.6 43.1C435.3 47.5 439.0 53.3 442.7 57.2C446.4 61.1 450.0 64.5 453.7 66.7C457.4 68.9 461.1 69.4 464.8 70.4C468.5 71.3 472.2 71.3 475.9 72.3C479.6 73.3 483.2 74.8 486.9 76.4C490.6 77.9 494.3 80.5 498.0 81.8C501.7 83.0 505.4 84.3 509.1 83.9C512.8 83.5 516.4 81.6 520.1 79.4C523.8 77.1 527.5 73.0 531.2 70.4C534.9 67.7 538.6 64.6 542.3 63.5C546.0 62.5 549.6 62.9 553.3 64.2C557.0 65.5 560.7 69.0 564.4 71.5C568.1 74.0 571.8 77.5 575.5 79.1C579.2 80.7 582.8 81.3 586.5 80.9C590.2 80.5 593.9 78.3 597.6 76.7C601.3 75.2 605.0 72.8 608.7 71.5C612.4 70.3 616.0 69.6 619.7 69.1C623.4 68.7 627.1 68.9 630.8 68.7C634.5 68.5 638.2 68.1 641.9 67.9C645.6 67.8 649.2 67.0 652.9 67.9C656.6 68.7 662.2 72.1 664.0 73.0';
const EU_LINE_100 = 'M0.0 64.0C34 59.5 68 54.0 102 58.2C136 62.4 170 72.8 204 75.6C238 78.4 272 68.0 306 61.5C340 55.0 374 52.8 408 56.4C442 60.0 476 74.2 510 78.5C544 82.8 578 80.2 612 78.4C634 77.2 652 78.0 664.0 78.1';
function energyUse(_, cover) {
  const PW = 664, PH = 146, avgY = 60.6, endY = 73.0;
  const gy = v => (PH - v / 40 * PH).toFixed(1);
  const grid = [40, 20, 0].map(v => `<line x1="0" x2="${PW}" y1="${gy(v)}" y2="${gy(v)}"/>`).join('');
  const ylab = [40, 20, 0].map(v => `<span class="eu-y" style="top:${(PH - v / 40 * PH - 16).toFixed(1)}px">${v}</span>`).join('');
  const tab = (r, lbl, on) => cover
    ? `<span${on ? ' class="is-selected"' : ''}>${lbl}</span>`
    : `<button type="button" data-eu-range="${r}"${on ? ' class="is-selected" aria-pressed="true"' : ' aria-pressed="false"'}>${lbl}</button>`;
  return `<div class="vehicle-preview vehicle-surface eu${cover ? '' : ' eu-live'}">
    <div class="eu-head">
      <h2 class="eu-title">Energy use</h2>
      <div class="vehicle-segment eu-tabs" role="group" aria-label="Displayed range">${tab('10', 'Last 10 km', true)}${tab('100', 'Last 100 km', false)}</div>
    </div>
    <div class="eu-kpi">
      <span class="eu-value">20.0</span><span class="eu-unit">kWh/100 km</span>
      <span class="eu-delta"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg><span class="eu-delta-t">15% vs 23.4 avg</span></span>
    </div>
    <div class="eu-chart" role="img" aria-label="Energy use over the last 10 km. Average 23.4, now 20.0 kilowatt-hours per 100 kilometres.">
      ${ylab}
      <svg class="eu-plot" width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}" overflow="visible" aria-hidden="true">
        <defs><linearGradient id="eu-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".14"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>
        <g class="eu-grid">${grid}</g>
        <path class="eu-area" d="${EU_LINE}L${PW} ${PH}L0 ${PH}Z" fill="url(#eu-fill)"/>
        <line class="eu-avg" x1="0" x2="${PW}" y1="${avgY}" y2="${avgY}"/>
        <path class="eu-line" d="${EU_LINE}" pathLength="1"/>
        <circle cx="${PW}" cy="${endY}" r="14" class="eu-halo"/><circle cx="${PW}" cy="${endY}" r="7" class="eu-dot"/>
      </svg>
      <span class="eu-x eu-x-start" style="left:44px">10 km</span><span class="eu-x eu-x-mid">5 km</span><span class="eu-x eu-x-end">Now</span>
    </div>
  </div>`;
}

function smartComfort(cover) {
  const settings = [
    ['Auto rear climate', 'Adjusts rear climate based on seat occupancy.', true],
    ['Auto mirror heating', 'Turns on based on wiper activity.', false]
  ];
  const toggle = cover ? 'span' : 'button';
  return `<div class="vehicle-preview vehicle-surface vehicle-comfort">
    <div class="vehicle-comfort-tabs">${['Climate', 'Seats', 'Lighting', 'Audio'].map(label => `<span>${label}</span>`).join('')}</div>
    <div class="vehicle-comfort-body">
      <h2>Smart comfort</h2>
      <div class="vehicle-comfort-rows">
        ${settings.map(([label, description, on]) => `<div class="vehicle-comfort-row">
          <div class="vehicle-comfort-copy"><p>${label}</p><small>${description}</small></div>
          <${toggle} class="vehicle-switch" ${cover ? `data-active="${on}"` : `type="button" role="switch" aria-label="${label}" aria-checked="${on}"`}>
            ${vehicleThemedImage('switch-on', 60, 32, 'vehicle-on vehicle-colour')}
            ${vehicleThemedImage('switch-off', 60, 32, 'vehicle-off')}
          </${toggle}>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

const VEHICLE_CARDS = {
  PM: {W:960,H:538,wrong:[['Text at 18 px','The hint and the three choices are hard to read at a glance.'],['An all-caps 14 px label','“PARKING OFFSET” is the smallest text on the card.'],['An outlined secondary','A grey border, and a new blue, #0A63E8, beside it.']],notes:[['Text at 24 px','Hint, label and choices at 24/32 under a 28/40 title.'],['A sentence-case label','“Parking offset” reads like the hint above it.'],['Library buttons','Filled primary and tinted secondary, 280 × 68 each.']],name:'Parking method',html:(_, cover)=>parkingMethod(cover),prompt:`Design a 640 × 384 px parking method card in Inter Medium. Use 32 px card padding, 20 px corners and a faint 1 px inside stroke.
Header: “How to park” in 28/40. Set “Hold the brake to continue.” in secondary 24/32, 4 px below.
Leave 32 px before “Parking offset” (24/32, secondary). Place Left, Center and Right in a 64 px segmented row (track #1D1D1F at 11%, 4 px padding), Center selected. Leave 40 px before two 280 × 68 px actions, 16 px apart. Use primary blue #007AFF for Park now and #1D1D1F at 8% for Exit & park, both radius 16 with 28/40 labels.`},
  DM: {W:1100,H:617,wrong:[['A pill for every state','Four grey OFF badges compete with the names.'],['Icons in grey wells','A 72 px tinted square around a 40 px icon.'],['Info floats in the corner','A 26 px icon, detached from the mode it explains.']],notes:[['OFF as plain text','Semibold 24/32 at the top right; ON turns it blue.'],['56 px icons, no wells','A 2.75 px line at 65%, same tone as the info icon.'],['Info beside the name','A 48 px target right after Snow, Wet, Sand.']],name:'Drive modes',html:(_, cover)=>driveModes(cover),prompt:`Design four drive mode tiles for a car screen, 772 × 320 px, light theme, in Inter Medium.
A 2 × 2 grid of 378 × 152 px tiles, 16 px apart. Each tile is white, radius 20, a 1 px inside stroke at #1D1D1F 10%, a soft shadow, and 16 px top and bottom, 20 px side padding.
Top row of each tile: a 56 px outline icon (2.75 px line, round ends, #1D1D1F at 65%) on the left; on the right, “OFF” in Inter Semibold 24/32, #1D1D1F, letter-spacing 2%.
Below, 16 px down: the name in 28/40 (Snow, Wet, Sand, Range saver) and, 4 px after it, a 48 px outline info icon (2 px line) at the same 65%.
Icons: a snowflake, a water drop with a curve beside it, a cactus, a leaf with a plus.`},
  EU: {W:1144,H:642,wrong:[['A 64 px bold reading','The number shouts over the chart it summarises.'],['A green badge','“3.4 below” in a tinted pill, a colour nothing else uses.'],['Bars without a scale','Ten bars and an “Avg” line with no values.']],notes:[['Reading at 48/56','Paired with its unit on one baseline.'],['“15% vs 23.4 avg” in grey','Right-aligned on the same baseline, no badge.'],['A line with a scale','40 · 20 · 0, a dashed average line and a dot at Now.']],name:'Energy use',html:energyUse,prompt:`Design a 772 × 430 px energy use card in Inter Medium, 32 px padding, radius 20.
Header, 64 px: “Energy use” in 28/40 at left; a two-option range control at right (Last 10 km selected), 344 × 64 px, 4 px inner padding, radius 16, labels in 24/32, track #1D1D1F at 11%, the selected option white (radius 12) with a soft shadow.
20 px below, the reading: “20.0” in 48/56 and “kWh/100 km” in 24/32 at 65% on one baseline, and, right-aligned on the same baseline, a down arrow and “15% vs 23.4 avg” in 24/32 at 65%.
32 px below, the chart: a 664 × 146 px plot flush right (44 px in from the left), with 40, 20 and 0 in 24/32 at 65% right-aligned in the 32 px to its left, each centred on its gridline (40 on the plot’s top edge, 0 on its bottom), three 1 px gridlines, one smooth 3 px #1D1D1F line that wanders between 16 and 33 through roughly 28.6, 26.0, 27.2, 15.7, 22.8, 24.1, 31.4, 20.7, 20.7, 19.0 and 20.0 at each km from 10 km to Now, with small wiggles between, with an area fill from 14% to nothing; a dashed 2 px average line at 23.4 with no inline label inside the plot; one point at Now: a 7 px white dot with a 3 px ring and a 14 px halo at 14%. 12 px under the plot, “10 km” (left edge of the plot), “5 km” (centred) and “Now” (right edge) in 24/32 at 65%.`},
  SC: {W:912,H:480,name:'Smart comfort',html:(_, cover)=>smartComfort(cover),prompt:`Design a 772 × 428 px smart comfort panel with 32 px card padding. Put Climate, Seats, Lighting and Audio on one row, with a short accent underline under Climate.
Leave 32 px between the tabs and the Smart comfort heading. Start the settings group immediately after the heading and use 16 px of vertical padding in each row. Show Auto rear climate (on) and Auto mirror heating (off). Use “Adjusts rear climate based on seat occupancy.” and “Turns on based on wiper activity.” as secondary text. Align each 60 × 32 px switch to the same right edge.`}
};

const VEHICLE_BEFORE = {
  PM: `<div class="pkb-card" role="dialog" aria-labelledby="pkb-title" aria-describedby="pkb-desc">
  <style>

    .pkb-card {
      --pkb-bg: #ffffff;
      --pkb-ink: #0f1419;
      --pkb-ink-2: #545b66;
      --pkb-ink-3: #7a828e;
      --pkb-track: #eef0f3;
      --pkb-line: #dfe2e7;
      --pkb-accent: #0a63e8;
      --pkb-accent-press: #0852c2;

      box-sizing: border-box;
      width: 640px;
      height: 384px;
      padding: 32px 36px 32px;
      display: flex;
      flex-direction: column;
      background: var(--pkb-bg);
      border-radius: 28px;
      box-shadow: 0 1px 2px rgba(15, 20, 25, .06), 0 12px 32px rgba(15, 20, 25, .10);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: var(--pkb-ink);
      -webkit-font-smoothing: antialiased;
      font-feature-settings: 'cv11', 'ss01';
    }
    .pkb-card *, .pkb-card *::before, .pkb-card *::after { box-sizing: border-box; }

    .pkb-title {
      margin: 0;
      font-size: 30px;
      line-height: 36px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .pkb-desc {
      margin: 8px 0 0;
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
      color: var(--pkb-ink-2);
    }

    .pkb-offset {
      margin: 30px 0 0;
      padding: 0;
      border: 0;
      min-width: 0;
    }
    .pkb-offset legend {
      padding: 0;
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--pkb-ink-3);
    }
    .pkb-seg {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      padding: 4px;
      height: 64px;
      background: var(--pkb-track);
      border-radius: 16px;
    }
    .pkb-seg input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
    .pkb-seg label {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      font-size: 18px;
      font-weight: 500;
      color: var(--pkb-ink-2);
      cursor: pointer;
      user-select: none;
      transition: background-color .18s ease, color .18s ease, box-shadow .18s ease;
    }
    .pkb-seg input:checked + label {
      background: #ffffff;
      color: var(--pkb-ink);
      font-weight: 600;
      box-shadow: 0 1px 2px rgba(15, 20, 25, .08), 0 2px 8px rgba(15, 20, 25, .08);
    }
    .pkb-seg input:focus-visible + label {
      outline: 3px solid var(--pkb-accent);
      outline-offset: 2px;
    }

    .pkb-actions {
      margin-top: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .pkb-btn {
      height: 68px;
      border-radius: 16px;
      border: 0;
      font-family: inherit;
      font-size: 19px;
      font-weight: 600;
      letter-spacing: -0.005em;
      cursor: pointer;
      transition: background-color .15s ease, transform .1s ease;
    }
    .pkb-btn:active { transform: scale(.985); }
    .pkb-btn:focus-visible { outline: 3px solid var(--pkb-accent); outline-offset: 3px; }
    .pkb-btn--primary {
      background: var(--pkb-accent);
      color: #ffffff;
    }
    .pkb-btn--primary:active { background: var(--pkb-accent-press); }
    .pkb-btn--secondary {
      background: #ffffff;
      color: var(--pkb-ink);
      box-shadow: inset 0 0 0 1.5px var(--pkb-line);
    }
    .pkb-btn--secondary:active { background: var(--pkb-track); }
  </style>

  <h2 class="pkb-title" id="pkb-title">How to park</h2>
  <p class="pkb-desc" id="pkb-desc">Hold the brake to continue.</p>

  <fieldset class="pkb-offset">
    <legend>Parking offset</legend>
    <div class="pkb-seg">
      <input type="radio" name="pkb-offset" id="pkb-left" value="left">
      <label for="pkb-left">Left</label>
      <input type="radio" name="pkb-offset" id="pkb-center" value="center" checked>
      <label for="pkb-center">Center</label>
      <input type="radio" name="pkb-offset" id="pkb-right" value="right">
      <label for="pkb-right">Right</label>
    </div>
  </fieldset>

  <div class="pkb-actions">
    <button type="button" class="pkb-btn pkb-btn--primary">Park now</button>
    <button type="button" class="pkb-btn pkb-btn--secondary">Exit &amp; park</button>
  </div>
</div>`,
  DM: `<div class="dmb-root">
<style>
.dmb-root{
  --bg:#EEF1F5;--tile:#FFFFFF;--line:#DDE2E9;--ink:#141A22;--muted:#5D6775;
  --icon-bg:#F1F4F8;--off-bg:#E7EBF0;--focus:#1F6FEB;
  width:772px;height:320px;box-sizing:border-box;padding:16px;
  background:var(--bg);font-family:'Inter',system-ui,sans-serif;color:var(--ink);
  display:grid;grid-template-columns:repeat(4,1fr);gap:12px;
  -webkit-font-smoothing:antialiased;
}
.dmb-root *{box-sizing:border-box}
.dmb-tile{position:relative;height:100%;border-radius:20px;background:var(--tile);
  border:1px solid var(--line);box-shadow:0 1px 2px rgba(20,26,34,.04),0 4px 12px rgba(20,26,34,.04)}
.dmb-toggle{all:unset;box-sizing:border-box;cursor:pointer;width:100%;height:100%;
  border-radius:20px;padding:20px 18px 20px;display:flex;flex-direction:column;justify-content:space-between}
.dmb-toggle:active{background:#F7F9FB}
.dmb-toggle:focus-visible,.dmb-info:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
.dmb-icon{width:72px;height:72px;border-radius:18px;background:var(--icon-bg);
  display:grid;place-items:center;color:#3A4452}
.dmb-icon svg{width:40px;height:40px}
.dmb-text{display:flex;flex-direction:column;gap:12px}
.dmb-name{font-size:22px;font-weight:600;line-height:1.15;letter-spacing:-.01em}
.dmb-state{align-self:flex-start;font-size:15px;font-weight:600;letter-spacing:.08em;
  color:var(--muted);background:var(--off-bg);border-radius:999px;padding:7px 14px;line-height:1}
.dmb-info{all:unset;box-sizing:border-box;cursor:pointer;position:absolute;top:12px;right:12px;
  width:48px;height:48px;border-radius:50%;display:grid;place-items:center;color:var(--muted)}
.dmb-info:active{background:var(--icon-bg)}
.dmb-info svg{width:26px;height:26px}
</style>

<div class="dmb-tile">
  <button class="dmb-toggle" role="switch" aria-checked="false" aria-label="Snow mode, off">
    <span class="dmb-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5M3.6 10.3L7 9.4 6.1 6M17.9 18l-.9-3.4 3.4-.9M3.6 13.7L7 14.6 6.1 18M17.9 6l-.9 3.4 3.4.9"/></svg>
    </span>
    <span class="dmb-text"><span class="dmb-name">Snow</span><span class="dmb-state">OFF</span></span>
  </button>
  <button class="dmb-info" aria-label="About Snow mode">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r=".6" fill="currentColor"/></svg>
  </button>
</div>

<div class="dmb-tile">
  <button class="dmb-toggle" role="switch" aria-checked="false" aria-label="Wet mode, off">
    <span class="dmb-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3.5S4.5 8 4.5 10.5a3.5 3.5 0 0 0 7 0C11.5 8 8 3.5 8 3.5z"/><path d="M16.5 9.5s-3.5 4.5-3.5 7a3.5 3.5 0 0 0 7 0c0-2.5-3.5-7-3.5-7z"/></svg>
    </span>
    <span class="dmb-text"><span class="dmb-name">Wet</span><span class="dmb-state">OFF</span></span>
  </button>
  <button class="dmb-info" aria-label="About Wet mode">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r=".6" fill="currentColor"/></svg>
  </button>
</div>

<div class="dmb-tile">
  <button class="dmb-toggle" role="switch" aria-checked="false" aria-label="Sand mode, off">
    <span class="dmb-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="6" r="2.5"/><path d="M2 17c3-4.5 6.5-6 10-4.5"/><path d="M2 20.5c4-3.5 8.5-5 13-3.5 2.4.8 4.6 1.6 7 1.5"/></svg>
    </span>
    <span class="dmb-text"><span class="dmb-name">Sand</span><span class="dmb-state">OFF</span></span>
  </button>
  <button class="dmb-info" aria-label="About Sand mode">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r=".6" fill="currentColor"/></svg>
  </button>
</div>

<div class="dmb-tile">
  <button class="dmb-toggle" role="switch" aria-checked="false" aria-label="Range saver mode, off">
    <span class="dmb-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="17" height="10" rx="2.5"/><path d="M22 10.5v3"/><path d="M8 14.5c0-3 2.2-4.8 6-5-.2 3.8-2 6-5 6"/><path d="M8 14.5l2.5-2.5"/></svg>
    </span>
    <span class="dmb-text"><span class="dmb-name">Range saver</span><span class="dmb-state">OFF</span></span>
  </button>
  <button class="dmb-info" aria-label="About Range saver mode">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r=".6" fill="currentColor"/></svg>
  </button>
</div>
</div>`,
  EU: `<div class="eub-card" role="region" aria-labelledby="eub-title">
  <style>
    .eub-card{width:772px;height:430px;box-sizing:border-box;padding:28px 28px 24px;background:#FFFFFF;border-radius:24px;box-shadow:0 1px 2px rgba(15,23,42,.06),0 8px 24px rgba(15,23,42,.08);font-family:'Inter',system-ui,sans-serif;color:#0F172A;display:flex;flex-direction:column;-webkit-font-smoothing:antialiased}
    .eub-card *{box-sizing:border-box;margin:0}
    .eub-head{display:flex;align-items:center;justify-content:space-between;height:52px}
    .eub-title{font-size:26px;font-weight:600;letter-spacing:-.01em}
    .eub-seg{display:flex;padding:4px;background:#F1F5F9;border-radius:14px;gap:4px}
    .eub-seg button{font:inherit;font-size:17px;font-weight:500;color:#475569;background:transparent;border:0;border-radius:10px;height:44px;padding:0 20px;cursor:pointer}
    .eub-seg button[aria-pressed="true"]{background:#FFFFFF;color:#0F172A;font-weight:600;box-shadow:0 1px 3px rgba(15,23,42,.14)}
    .eub-reading{margin-top:18px;display:flex;align-items:baseline;gap:10px}
    .eub-value{font-size:64px;font-weight:700;line-height:1;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
    .eub-unit{font-size:22px;font-weight:500;color:#64748B}
    .eub-compare{margin-top:12px;display:inline-flex;align-items:center;gap:8px;align-self:flex-start;height:34px;padding:0 14px 0 10px;border-radius:17px;background:#E6F5EE;color:#0B6B43;font-size:17px;font-weight:500}
    .eub-compare svg{flex:none}
    .eub-compare b{font-weight:600}
    .eub-chart{margin-top:auto}
    .eub-chart svg{display:block}
    .eub-axis{display:flex;justify-content:space-between;margin-top:8px;font-size:15px;font-weight:500;color:#64748B;font-variant-numeric:tabular-nums}
  </style>

  <div class="eub-head">
    <h2 class="eub-title" id="eub-title">Energy use</h2>
    <div class="eub-seg" role="group" aria-label="Range">
      <button type="button" aria-pressed="true">Last 10 km</button>
      <button type="button" aria-pressed="false">Last 100 km</button>
    </div>
  </div>

  <div class="eub-reading">
    <span class="eub-value">20.0</span>
    <span class="eub-unit">kWh/100 km</span>
  </div>

  <p class="eub-compare">
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 3v11M4 9.5 9 14.5l5-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span><b>3.4 below</b> your 23.4 average</span>
  </p>

  <div class="eub-chart">
    <svg width="716" height="160" viewBox="0 0 716 160" role="img" aria-label="Energy use per kilometre over the last 10 km, average 20.0 kWh/100 km, compared with 23.4 average">
      <g fill="#CBD5E1">
        <rect x="13.8" y="67" width="44" height="93" rx="6"/>
        <rect x="85.4" y="50.5" width="44" height="109.5" rx="6"/>
        <rect x="157" y="34" width="44" height="126" rx="6"/>
        <rect x="228.6" y="63" width="44" height="97" rx="6"/>
        <rect x="300.2" y="76" width="44" height="84" rx="6"/>
        <rect x="371.8" y="47.5" width="44" height="112.5" rx="6"/>
        <rect x="443.4" y="55" width="44" height="105" rx="6"/>
        <rect x="515" y="69" width="44" height="91" rx="6"/>
        <rect x="586.6" y="61.5" width="44" height="98.5" rx="6"/>
      </g>
      <rect x="658.2" y="56.5" width="44" height="103.5" rx="6" fill="#0F766E"/>
      <line x1="0" y1="159" x2="716" y2="159" stroke="#E2E8F0" stroke-width="2"/>
      <line x1="0" y1="41" x2="716" y2="41" stroke="#475569" stroke-width="2" stroke-dasharray="6 6"/>
      <text x="716" y="31" text-anchor="end" font-family="Inter, sans-serif" font-size="15" font-weight="600" fill="#475569">Avg</text>
    </svg>
    <div class="eub-axis" aria-hidden="true">
      <span>10 km ago</span>
      <span>5 km</span>
      <span>Now</span>
    </div>
  </div>
</div>`
};
const VEHICLE_ASK = {"PM": "Design a parking card for a car screen, 640 × 384 px, light theme. Content, exactly: the title “How to park”, the line “Hold the brake to continue.”, a “Parking offset” choice of Left, Center or Right with Center selected, and two actions, Park now and Exit & park. Nothing else.", "DM": "Design drive mode toggles for a car screen, 772 × 320 px, light theme. Content, exactly: four modes, Snow, Wet, Sand and Range saver, each with its icon, its state OFF and an info button. Nothing else.", "EU": "Design an energy use card for a car screen, 772 × 430 px, light theme. Content, exactly: the title “Energy use”, a range choice of Last 10 km or Last 100 km with Last 10 km selected, the current reading 20.0 kWh/100 km, how it compares with the 23.4 average, and a chart of the last 10 km. Nothing else."};
for (const [k, card] of Object.entries(VEHICLE_CARDS)) Object.assign(card, {cover:1,fullStage:true,vehicle:true}, VEHICLE_BEFORE[k]?{before:()=>VEHICLE_BEFORE[k],ask:VEHICLE_ASK[k]}:{afterOnly:true});

function wireVehiclePreview(stage) {
  const preview = stage.querySelector('.vehicle-preview');
  if (!preview) return;

  // DriveScene stretching spring pill indicator for interactive segmented controls (014 Parking method, 016 Energy use)
  preview.querySelectorAll('.vehicle-segment').forEach(seg => {
    const btns = [...seg.querySelectorAll('button')];
    if (!btns.length) return;
    const init = seg.querySelector('[aria-pressed="true"], .is-selected') || btns[0];
    requestAnimationFrame(() => window.dnMorphSegment && window.dnMorphSegment(seg, init, 'veh-ind', true));
    seg._place = (b) => window.dnMorphSegment && window.dnMorphSegment(seg, b, 'veh-ind', false);
  });
  if (window.dnAttachTouchBloom) {
    preview.querySelectorAll('.vehicle-actions span').forEach(el => window.dnAttachTouchBloom(el, !el.classList.contains('vehicle-primary')));
  }
  if (window.dnAttachColorWash) {
    preview.querySelectorAll('button.vehicle-mode').forEach(el => window.dnAttachColorWash(el));
  }

  preview.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;

    if (button.hasAttribute('data-vehicle-offset')) {
      for (const choice of preview.querySelectorAll('[data-vehicle-offset]')) {
        choice.setAttribute('aria-pressed', String(choice === button));
      }
      button.closest('.vehicle-segment')?._place?.(button);
    }
    if (button.hasAttribute('data-vehicle-mode')) {
      const prevBg = getComputedStyle(button).backgroundColor;
      const on = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(on));
      const nextBg = getComputedStyle(button).backgroundColor;
      if (window.dnTriggerColorWash) window.dnTriggerColorWash(button, prevBg, nextBg, on ? 580 : 540);
      const st = button.querySelector('.vehicle-mode-state');
      if (window.dnBlurSwap) window.dnBlurSwap(st, on ? 'ON' : 'OFF', on ? 1 : -1);
      else st.textContent = on ? 'ON' : 'OFF';
    }
    if (button.hasAttribute('data-eu-range')) {
      const is100 = button.dataset.euRange === '100';
      if (button.getAttribute('aria-pressed') === 'true') return;
      for (const tab of preview.querySelectorAll('[data-eu-range]')) {
        const active = tab === button;
        tab.setAttribute('aria-pressed', String(active));
        tab.classList.toggle('is-selected', active);
      }
      button.closest('.vehicle-segment')?._place?.(button);
      const val = preview.querySelector('.eu-value');
      const dlt = preview.querySelector('.eu-delta-t');
      const xs = preview.querySelector('.eu-x-start');
      const xm = preview.querySelector('.eu-x-mid');
      const line = preview.querySelector('.eu-line');
      const area = preview.querySelector('.eu-area');
      const dot = preview.querySelector('.eu-dot');
      const halo = preview.querySelector('.eu-halo');
      const dir = is100 ? 1 : -1;
      if (window.dnBlurDigits) window.dnBlurDigits(val, is100 ? '18.6' : '20.0', dir);
      else val.textContent = is100 ? '18.6' : '20.0';
      if (window.dnBlurSwap) {
        window.dnBlurSwap(dlt, is100 ? '20% vs 23.4 avg' : '15% vs 23.4 avg', dir);
        window.dnBlurSwap(xs, is100 ? '100 km' : '10 km', dir);
        window.dnBlurSwap(xm, is100 ? '50 km' : '5 km', dir);
      } else {
        dlt.textContent = is100 ? '20% vs 23.4 avg' : '15% vs 23.4 avg';
        xs.textContent = is100 ? '100 km' : '10 km';
        xm.textContent = is100 ? '50 km' : '5 km';
      }
      if (line && area) {
        const path = is100 ? EU_LINE_100 : EU_LINE;
        const ey = is100 ? '78.1' : '73.0';
        line.setAttribute('d', path);
        area.setAttribute('d', `${path}L664 146L0 146Z`);
        if (dot) dot.setAttribute('cy', ey);
        if (halo) halo.setAttribute('cy', ey);
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
          line.style.animation = 'none'; line.getBoundingClientRect();
          line.style.animation = 'eu-draw .72s cubic-bezier(.22, 1, .36, 1) forwards';
          area.style.animation = 'none'; area.getBoundingClientRect();
          area.style.animation = 'eu-fade .45s ease .12s forwards';
          if (halo) { halo.style.animation = 'none'; halo.getBoundingClientRect(); halo.style.animation = 'eu-ping .65s cubic-bezier(.22, 1, .36, 1) .28s forwards'; }
        }
      }
    }
    if (button.matches('.vehicle-switch')) {
      button.setAttribute('aria-checked', String(button.getAttribute('aria-checked') !== 'true'));
    }
  });
}
