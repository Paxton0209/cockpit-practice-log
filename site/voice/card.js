/* 017–019 Voice. Covers are Figma's still frames; the detail plays the state on a loop
   with the ambient glow drifting and, for the assistant, the orb's fluid turning. */
/* orb art exported from the Figma voice-orb instances at 4× */
const VO_ORB = { user: 'voice/orb-user.png', thinking: 'voice/orb-thinking.png', reply: 'voice/orb-reply.png', ask: 'voice/orb-ask.png' };
const voOrb = kind => {
  const src = VO_ORB[kind], img = `<img src="${src}" alt="" width="48" height="48">`;
  /* base art stays still; reply/ask turn two screen-blended copies + front luminous core filament; thinking drifts three grain layers */
  const flow = kind === 'user' ? '' : `<span class="vo-flow">${img.repeat(kind === 'thinking' ? 3 : 2)}</span>`;
  const core = (kind === 'reply' || kind === 'ask') ? '<span class="vo-core"></span>' : '';
  return `<span class="vo-orb${kind === 'reply' || kind === 'ask' ? ' is-fluid' : ''} is-${kind}" aria-hidden="true">${img}${flow}${core}</span>`;
};
const voHalo = kind => (kind === 'reply' || kind === 'ask') ? `<span class="vo-halo" aria-hidden="true"><img src="${VO_ORB[kind]}" alt=""></span>` : '';
const voPill = (kind, text, textW, cover, script) =>
  `<div class="vo-pill" data-kind="${kind}"${cover ? '' : ` data-live data-script="${script}" data-text="${text}"`} role="status">
    ${voHalo(kind)}<span class="vo-glow"><i></i><i></i><i></i><i></i><i></i></span>${voOrb(kind)}
    <span class="vo-text"><span class="vo-line">${text}</span></span>
  </div>`;
const voStage = (w, pill) => `<div class="vo-stage" style="width:548px">${pill}</div>`;   /* one 548 × 72 canvas for every voice card, covers included */

/* scripts: [kind, words, word gap ms (0 = whole line at once), hold ms, continues the previous line?] */
const VO_SCRIPTS = {
  user: [
    ['user', 'Open all the windows', 230, 700],
    ['user', 'and lower the rear windows halfway. Then set the cabin to 22° and turn on the seat heater.', 230, 1800, true],
  ],
  thinking: [
    ['thinking', 'Analyzing target restaurant', 0, 2200],
    ['thinking', 'Understanding your request', 0, 2200],
    ['thinking', 'Finding related features', 0, 2200],
    ['thinking', 'Browsing your history', 0, 2200],
  ],
  reply: [
    ['reply', 'Opening all the windows', 170, 600],
    ['reply', 'and setting the cabin to 22°, with the rear windows halfway', 170, 2200, true],
  ],
  /* proactive: the assistant starts the conversation, so the pill grows out of the orb and then waits */
  ask: [['ask', 'Would you like to open the windows?', 200, 3600, false, 'enter']],
};
/* thinking palettes, one per step of the work, all inside the assistant's blue–violet family */
const VO_THINK = {
  light: [
    ['#2e9bea, #00b7ff 22%, #007aff 45%, #4f6bff 70%, #2e9bea', 'rgb(0 60 255 / .35)'],     /* analysing: clear blue */
    ['#5b5bff, #7b61ff 25%, #af52de 50%, #6e5bff 75%, #5b5bff', 'rgb(90 0 200 / .3)'],      /* understanding: indigo → violet */
    ['#af52de, #e055c8 25%, #ff5fa2 50%, #a35bff 75%, #af52de', 'rgb(200 0 120 / .28)'],    /* finding: violet → pink */
    ['#00a0b8, #00b7ff 25%, #2e9bea 50%, #3a7bff 75%, #00a0b8', 'rgb(0 110 160 / .32)'],    /* browsing history: teal → blue */
  ],
  dark: [
    ['#c2edff, #64d2ff 22%, #50a7ff 45%, #7d8cff 70%, #c2edff', 'rgb(255 255 255 / .95)'],
    ['#b9b4ff, #8f86ff 25%, #c35ce6 50%, #9b8cff 75%, #b9b4ff', 'rgb(255 255 255 / .95)'],
    ['#e7a8ff, #ff7ab8 25%, #ff9ad0 50%, #c38cff 75%, #e7a8ff', 'rgb(255 255 255 / .95)'],
    ['#9ff3ff, #5ee0f0 25%, #64d2ff 50%, #6fa8ff 75%, #9ff3ff', 'rgb(255 255 255 / .95)'],
  ],
};
const voTint = (el, i) => {
  const [g, hi] = VO_THINK[document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'][i % 4];
  el.style.setProperty('--vo-tg', `linear-gradient(90deg, ${g})`);
  el.style.setProperty('--vo-tg-hi', hi);
};
const VO_MAX = 448, VO_EASE = 'cubic-bezier(.33, 0, .2, 1)';
const voSleep = ms => new Promise(r => setTimeout(r, ms));
/* group appended segments into runs: one sentence, one schedule */
const voRuns = script => script.reduce((runs, seg) => { if (seg[4] && runs.length) runs[runs.length - 1].push(seg); else runs.push([seg]); return runs; }, []);
function voSetKind(pill, kind) {
  if (pill.dataset.kind === kind) return;
  pill.dataset.kind = kind;
  pill.querySelector('.vo-orb').outerHTML = voOrb(kind);
  const h = pill.querySelector('.vo-halo'), nh = voHalo(kind);
  if (h) h.outerHTML = nh; else if (nh) pill.insertAdjacentHTML('afterbegin', nh);
}
/* ---------- speech engine ----------
   Visuals follow a simulated voice, not a timer: every word becomes syllable pulses (vowel groups),
   stressed words (numbers, capitals, long words) push harder, pitch drifts down through a statement
   and lifts on a question. The level drives the glow slices, the orb's flow and halo; a spring drives width. */
const voSyllables = w => Math.max(1, (w.toLowerCase().match(/[aeiouy]+/g) || []).length);
const voStress = w => /\d/.test(w) ? 1 : /^[A-Z]/.test(w) ? .85 : w.length > 6 ? .7 : w.length < 4 ? .3 : .5;
function voEngine(pill) {
  const box = pill.querySelector('.vo-text'), line = pill.querySelector('.vo-line');
  const E = { think: 0, pulses: [], wT: line.offsetWidth, w: line.offsetWidth, vw: 0, xT: 0, x: 0, vx: 0, lv: 0, pitch: .5, rot: 0, waiting: false, t0: performance.now() };
  /* words: [{w, at(ms from now), dur}]; question lifts pitch at the end */
  E.speak = (words, question) => {
    const now = performance.now();
    words.forEach(({ w, at, dur }, i) => {
      const n = voSyllables(w), st = voStress(w), last = i === words.length - 1;
      const decl = 1 - i / Math.max(words.length, 1) * .5;          /* declination through the sentence */
      for (let k = 0; k < n; k++) {
        const pitch = Math.min(1, Math.max(0, .35 * decl + st * .3 + (question && last ? .35 * (k + 1) / n : 0)));
        E.pulses.push({ t: now + at + k * dur / n, a: .25 + .75 * st * (k === 0 ? 1 : .6), p: pitch, len: dur / n });
      }
      if (/[,.]$/.test(w)) E.pulses.push({ t: now + at + dur, a: 0, p: .3, len: 260 });   /* a breath after punctuation */
    });
  };
  let last = performance.now(), raf;
  const tick = now => {
    if (!pill.isConnected) return;
    const dt = Math.min(50, now - last) / 1000; last = now;
    if (!pill.closest('[data-closing]')) {
      /* raw level and pitch from active syllables: fast attack, decaying tail */
      let raw = 0, pit = E.pitch;
      for (const p of E.pulses) {
        const u = now - p.t; if (u < 0 || u > p.len + 220) continue;
        const env = u < 40 ? u / 40 : Math.exp(-(u - 40) / 120);
        if (p.a * env > raw) { raw = p.a * env; pit = p.p; }
      }
      E.pulses = E.pulses.filter(p => now - p.t < p.len + 400);
      if (E.waiting) raw = Math.max(raw, .1 + .08 * Math.sin((now - E.t0) / 900));
      const tau = raw > E.lv ? .06 : .22;                       /* attack 60 ms, release 220 ms */
      E.lv += (raw - E.lv) * (1 - Math.exp(-dt / tau));
      E.pitch += (pit - E.pitch) * (1 - Math.exp(-dt / .18));
      E.rot += dt * (8 + 102 * E.lv);                             /* the fluid turns with the voice, nearly still in silence */
      /* glow: energy centred where the pitch sits (low pitch left, high pitch right) */
      const c = .2 + .6 * E.pitch;
      for (let j = 0; j < 5; j++) {
        const d = j / 4 - c, g = .82 + E.lv * .85 * Math.exp(-(d * d) / .09);
        pill.style.setProperty('--g' + (j + 1), g.toFixed(3));
      }
      pill.style.setProperty('--lv', E.lv.toFixed(3));
      pill.style.setProperty('--rot', E.rot.toFixed(1));
      /* width and scroll: a soft, critically damped spring (no overshoot) toward the words spoken so far */
      const k = 210, cdamp = 2 * Math.sqrt(k);
      E.vw += (k * (E.wT - E.w) - cdamp * E.vw) * dt; E.w += E.vw * dt;
      E.vx += (k * (E.xT - E.x) - cdamp * E.vx) * dt; E.x += E.vx * dt;
      box.style.width = E.w.toFixed(2) + 'px';
      line.style.transform = `translateX(${E.x.toFixed(2)}px)`;
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return E;
}

async function voPlay(pill) {
  pill.dataset.run = '1';
  const box = pill.querySelector('.vo-text'), line = pill.querySelector('.vo-line');
  const runs = voRuns(VO_SCRIPTS[pill.dataset.script]);
  const alive = () => pill.isConnected && !pill.closest('[data-closing]');
  const E = voEngine(pill);
  const fade = (to, ms) => line.animate([{ opacity: to ? 0 : 1, filter: `blur(${to ? 10 : 0}px)` }, { opacity: to, filter: `blur(${to ? 0 : 10}px)` }], { duration: ms, easing: to ? 'cubic-bezier(.2, .6, .2, 1)' : 'cubic-bezier(.4, 0, 1, 1)', fill: 'forwards' });
  let firstThink = true;
  while (alive()) {
    for (const r of runs) {
      if (!alive()) return;
      /* On initial open of Thinking, the first phrase is already visible on screen — hold it calmly instead of flashing/re-entering it. */
      if (firstThink && r[0][0] === 'thinking' && !r[0][2] && line.textContent.trim() === r[0][1]) {
        firstThink = false;
        voTint(line, runs.indexOf(r));
        E.wT = Math.min(Math.ceil(line.scrollWidth) + 2, VO_MAX);
        await voSleep(r[0][3]);
        continue;
      }
      firstThink = false;
      /* thinking → thinking: words hand over in place (see below); everything else fades the old line first */
      const handover = r[0][0] === 'thinking' && pill.dataset.kind === 'thinking' && line.textContent.trim();
      /* a streamed line that follows another: the old words lift away as a ghost while the pill folds to the new first word (never empty) */
      const crossfold = !handover && r[0][2] && !r[0][5] && line.textContent.trim();
      if (crossfold) {
        const ghost = line.cloneNode(true); ghost.classList.add('vo-ghost'); box.appendChild(ghost);
        ghost.animate([{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(10px)' }], { duration: 360, easing: 'cubic-bezier(.4, 0, 1, 1)', fill: 'forwards' }).finished.then(() => ghost.remove(), () => ghost.remove());
        line.classList.remove('vo-write');
      } else if (!handover) { await fade(0, 360).finished.catch(() => {}); line.classList.remove('vo-write'); }
      if (!alive()) return;
      voSetKind(pill, r[0][0]);
      box.classList.remove('is-scroll');
      E.xT = 0;
      if (!r[0][2]) {
        const [kind, text, , hold, , enter] = r[0];
        if (enter) {                                   /* proactive: fold to the orb, a soft ping, then unfold */
          E.wT = 0; await voSleep(900); if (!alive()) return;
          pill.querySelector('.vo-orb').animate([{ scale: 1 }, { scale: 1.1 }, { scale: 1 }], { duration: 800, easing: 'cubic-bezier(.3, 0, .2, 1)' });
          await voSleep(420);
        }
        if (handover) {
          /* the old status lifts softly away while the new one sweeps in with a wider light mask;
             the grain orb gives a subtle breath in sync with the thought shift so orb + text feel unified. */
          const ghost = line.cloneNode(true);
          ghost.classList.add('vo-ghost');
          box.appendChild(ghost);
          ghost.animate(
            [{ opacity: 1, filter: 'blur(0)', transform: ghost.style.transform || 'none' },
             { opacity: 0, filter: 'blur(5px)', transform: `${ghost.style.transform || ''} translateY(-5px)` }],
            { duration: 380, easing: 'cubic-bezier(.4, 0, .6, 1)', fill: 'forwards' }
          ).finished.then(() => ghost.remove(), () => ghost.remove());
          pill.querySelector('.vo-orb')?.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.045)' }, { transform: 'scale(1)' }],
            { duration: 680, easing: 'cubic-bezier(.25, .6, .2, 1)' }
          );
          line.getAnimations().forEach(a => a.cancel());
          line.textContent = text;
          voTint(line, runs.indexOf(r));
          line.classList.add('vo-write');
          E.wT = Math.min(Math.ceil(line.scrollWidth) + 2, VO_MAX);
          line.animate([
            { opacity: 0, filter: 'blur(5px)', transform: `translate(${E.x}px, 5px)`, maskPosition: '100% 0', webkitMaskPosition: '100% 0' },
            { opacity: 1, filter: 'blur(0)', transform: `translate(${E.x}px, 0)`, maskPosition: '0% 0', webkitMaskPosition: '0% 0' }],
            { duration: 740, delay: 80, easing: 'cubic-bezier(.22, .68, .2, 1)', fill: 'both' });
          await voSleep(80 + 740 + hold);
          continue;
        }
        if (kind === 'thinking') voTint(line, runs.indexOf(r));
        line.innerHTML = text.split(' ').map(w => `<b class="vo-still">${w}</b>`).join(' '); line.style.transform = `translateX(${E.x}px)`;
        E.wT = Math.min(Math.ceil(line.scrollWidth) + 2, VO_MAX);
        fade(1, 640);
        if (kind !== 'thinking') E.speak(text.split(' ').map((w, i) => ({ w, at: 120 + i * 190, dur: 190 })), /\?$/.test(text));
        if (enter) { await voSleep(640 + text.split(' ').length * 190); E.waiting = true; await voSleep(hold); E.waiting = false; }
        else await voSleep(640 + hold);
        continue;
      }
      const enter = r[0][5] === 'enter';
      if (enter) {                                       /* proactive entrance: fold to the first word, a soft ping, then speak on */
        const first = r[0][1].split(' ')[0];
        line.getAnimations().forEach(a => a.cancel()); line.style.opacity = 1; line.style.filter = '';
        line.innerHTML = `<b class="vo-still">${first}</b>`;
        E.wT = Math.ceil(line.scrollWidth) + 2; await voSleep(520); if (!alive()) return;
        pill.querySelector('.vo-orb').animate([{ scale: 1 }, { scale: 1.1 }, { scale: 1 }], { duration: 640, easing: 'cubic-bezier(.3, 0, .2, 1)' });
        await voSleep(160);
      }
      /* streamed: lay out every word with its own reveal delay; targets follow the words as they are spoken */
      const words = [], times = [], gaps = [];
      /* the first word is already on screen (folded to it), so speech starts right away */
      let t = 0;
      r.forEach(([, text, gap, hold], si) => { text.split(' ').forEach(w => { words.push(w); times.push(t); gaps.push(gap); t += gap; }); t += (si < r.length - 1 ? hold : 0); });
      line.innerHTML = words.map((w, i) => i === 0 ? `<b class="vo-${enter ? 'still' : 'first'}">${w}</b>` : `<b style="animation-delay:${times[i]}ms">${w}</b>`).join(' ');
      line.style.transform = 'translateX(0px)'; E.x = 0; E.vx = 0;
      line.getAnimations().forEach(a => a.cancel()); line.style.opacity = 1; line.style.filter = '';
      const rights = [...line.children].map(b => b.offsetLeft + b.offsetWidth + 2);
      E.speak(words.map((w, i) => ({ w, at: times[i], dur: gaps[i] })), /\?$/.test(words[words.length - 1]));
      const start = performance.now();
      for (let i = 0; i < words.length; i++) {
        const wait = times[i] - 120 - (performance.now() - start); if (wait > 0) await voSleep(wait);   /* lead the reveal a little so the pill opens before the word lands */
        if (!alive()) return;
        E.wT = Math.min(rights[i], VO_MAX);
        E.xT = rights[i] > VO_MAX ? VO_MAX - 8 - rights[i] : 0;
        if (rights[i] > VO_MAX) box.classList.add('is-scroll');
      }
      if (r[0][5] === 'enter') { await voSleep(gaps[gaps.length - 1] + 500); E.waiting = true; await voSleep(r[0][3]); E.waiting = false; }
      else await voSleep(gaps[gaps.length - 1] + r[r.length - 1][3]);
    }
  }
}
/* on close, put the pill back to its cover frame (quick fade) so the morph lands on what the cover shows */
function voReset(pill) {
  if (pill.dataset.reset) return; pill.dataset.reset = '1';
  const line = pill.querySelector('.vo-line'), box = pill.querySelector('.vo-text');
  const first = VO_SCRIPTS[pill.dataset.script][0][0];
  line.style.transition = 'opacity .12s ease'; line.style.opacity = 0;
  setTimeout(() => {
    voSetKind(pill, first);
    box.getAnimations().concat(line.getAnimations()).forEach(a => a.cancel()); line.style.filter = ''; ['--lv','--rot','--g1','--g2','--g3','--g4','--g5'].forEach(v => pill.style.removeProperty(v));
    box.style.width = ''; box.classList.remove('is-scroll');
    line.style.transform = 'none'; line.textContent = pill.dataset.text; line.style.opacity = 1;
  }, 120);
}
new MutationObserver(ms => { for (const m of ms) if (m.target.hasAttribute && m.target.hasAttribute('data-closing')) m.target.querySelectorAll('.vo-pill[data-live]').forEach(voReset); })
  .observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['data-closing'] });
setInterval(() => {
  document.querySelectorAll('.vo-pill[data-live]:not([data-run])').forEach(p => {
    if (p.closest('[inert]') || !p.offsetParent) return;
    voPlay(p);
  });
}, 300);

const VO_BASE = `Pill: 72 px tall, fully round (radius 36), padding 12 px left and 28 px right, items centred with 12 px gaps, clipped. Light theme: fill #FFFFFF, a 1 px inside stroke of #1D1D1F at 9%, drop shadow 0 4 16 in rgb(28,28,46) at 12%, background blur 40.
Orb: 48 × 48 at x 12, y 12. Words: Inter Medium 24/32, letter-spacing 0, one line, #1D1D1F.`;
const VO_GLOW = (o, stops) => `Ambient glow inside the pill, under everything: an ellipse at x −11, y 41, 18 px wider than the pill and 56 px tall, layer blur 40 (CSS blur 20 px), opacity ${o}, clipped by the pill, filled with a horizontal gradient ${stops}.`;

const VOICE_CARDS = {
  VU: {
    W: 700, before: () => voiceBefore('VU', 548), name: 'User speech', cover: 1, fullStage: true, testReference: 'Figma',
    html: (_, cover) => voStage(548, voPill('user', 'Open all the windows', 258, cover, 'user'), cover),
    ask: 'Design the user-speech bar for a car voice assistant, 548 × 72 px, light theme. It shows the driver’s words as they are recognised: “Open all the windows and lower the rear windows halfway. Then set the cabin to 22° and turn on the seat heater.” with the driver’s avatar. Animate it. Nothing else.',
    prompt: `Design the user-speech state of a car voice assistant on a 548 × 72 px canvas, pill centred.
${VO_BASE}
Orb: the driver’s round photo avatar. Words at 70% opacity: “Open all the windows”. The pill hugs its content: 12 px + 48 px orb + 12 px + the words + 28 px, centred on the canvas.
${VO_GLOW('0.4', 'of neutral greys: rgb(161,181,189) at 0% → rgb(170,178,181) at 90% (25%) → rgb(139,142,144) (60%) → rgb(111,111,113) at 90% (85%) → rgb(211,211,214) at 0%')}
Motion: words appear one by one, each rising 6 px as it fades in; the pill grows with them up to a 448 px text window, then the line scrolls left so the newest word stays in view, and the window fades 10% at both edges. The glow drifts along the pill and breathes.`,
    wrong: [['Text at 15 px', 'Too small to read from the driver’s seat.'], ['A cartoon avatar', 'A generic figure stands in for the driver.'], ['A blinking cursor', 'Recognised speech reads like a text field.']],
    notes: [['24/32 at 70%', 'The driver’s words sit back from the assistant’s.'], ['The driver’s photo', 'The library’s 48 px avatar.'], ['A grey glow that drifts', 'The pill breathes while the mic is open.']],
  },
  VT: {
    W: 700, before: () => voiceBefore('VT', 548), name: 'Thinking', cover: 1, fullStage: true, testReference: 'Figma',
    html: (_, cover) => voStage(548, voPill('thinking', 'Analyzing target restaurant', 286, cover, 'thinking'), cover),
    ask: 'Design the thinking state for a car voice assistant, 548 × 72 px, light theme. It shows the assistant working on “Analyzing target restaurant”. Animate it. Nothing else.',
    prompt: `Design the thinking state of a car voice assistant on a 548 × 72 px canvas, pill centred.
${VO_BASE}
The pill hugs its content: 12 px + 48 px orb + 12 px + the words + 28 px (412 px with Inter). Orb: a pale, grainy glass sphere. Words: “Analyzing target restaurant”, filled with a horizontal gradient #2E9BEA → rgb(31,143,232) at 90% (25%) → #007AFF (60%) → rgb(88,86,214) at 90% (78%) → #AF52DE (100%). No glow.
Motion: a gradient flows through the words in a loop, and each status has its own palette (clear blue; indigo to violet; violet to pink; teal to blue); the line cycles “Understanding your request”, “Finding related features”, “Browsing your history”, each fading out and in with a short blur while the pill eases to the new width; inside the orb the grain drifts and flickers irregularly (no spinning).`,
    wrong: [['“THINKING” label at 11 px', 'An all-caps label and three dots repeat what the orb says.'], ['Text at 20 px, label at 12', 'A “Thinking…” label sits above the line.'], ['A ringed blue bead', 'The orb looks like a button.']],
    notes: [['One line in a gradient', 'The sweep shows work in progress.'], ['The library’s grain orb', 'It turns faster while thinking.'], ['No glow', 'The pill stays quiet until there is an answer.']],
  },
  VA: {
    W: 700, before: () => voiceBefore('VA', 548), name: 'Assistant speech', cover: 1, fullStage: true, testReference: 'Figma',
    html: (_, cover) => voStage(548, voPill('reply', 'Opening all the windows', 258, cover, 'reply'), cover),
    ask: 'Design the assistant-speech bar for a car voice assistant, 548 × 72 px, light theme. The assistant says “Opening all the windows and setting the cabin to 22°, with the rear windows halfway”. Animate it. Nothing else.',
    prompt: `Design the assistant-speech state of a car voice assistant on a 548 × 72 px canvas, pill centred.
${VO_BASE}
Orb: a 48 × 48 px deep-sapphire optical glass sphere with three internal depth layers (dark core, counter-drifting cyan fluid ribbons, and a bright horizontal energy filament that pulses with speech), topped with a crisp specular Fresnel rim and grounded by a soft tinted contact shadow beneath it; behind it sits a clean cyan-blue radial wash (no dark blur mud). Words: “Opening all the windows”. The pill hugs its content: 12 px + 48 px orb + 12 px + the words + 28 px, centred on the canvas.
${VO_GLOW('0.45', 'rgb(100,210,255) at 0% → rgb(100,210,255) at 90% (25%) → rgb(10,132,255) (60%) → rgb(94,92,230) at 90% (85%) → rgb(94,92,230) at 0%')}
Motion: the reply streams in word by word, each word fading in from a short motion blur, and the line slides on inside a 448 px window that fades 10% at both edges; the orb’s fluid turns and the glow under the words rises and falls like a voice level.`,
    wrong: [['Text at 15.5 px, two lines', 'The reply wraps inside a 72 px bar.'], ['Keywords in blue', '“all the windows” and “22°” read like links.'], ['An equaliser icon', 'Bars stand in for the assistant.']],
    notes: [['24/32, one line', 'Words condense from a blur; the line slides in a window that fades at both edges.'], ['The library orb', 'Its fluid turns while the assistant speaks.'], ['Glow moves like a voice', 'Five slices of the blue glow rise and fall under the words.']],
  },
  VP: {
    W: 700, before: () => voiceBefore('VP', 548), name: 'Proactive', cover: 1, fullStage: true, testReference: 'Figma',
    html: (_, cover) => voStage(548, voPill('ask', 'Would you like to open the windows?', 0, cover, 'ask'), cover),
    ask: 'Design a proactive suggestion from a car voice assistant, 548 × 72 px, light theme: unprompted, the assistant asks “Would you like to open the windows?” and waits for an answer. Animate it. Nothing else.',
    prompt: `Design the proactive state of a car voice assistant on a 548 × 72 px canvas, pill centred.
${VO_BASE}
Orb: a 48 × 48 px deep-indigo optical glass sphere with three internal depth layers (dark core, soft violet-lavender aurora swirl, and a calm breathing luminous center), topped with a crisp specular Fresnel rim and grounded by a soft violet-tinted contact shadow beneath it; behind it sits a clean violet radial wash. Words: “Would you like to open the windows?”. The pill hugs its content: 12 px + 48 px orb + 12 px + the words + 28 px.
${VO_GLOW('0.45', 'rgb(123,100,255) at 0% → rgb(100,157,255) at 90% (25%) → rgb(129,71,238) (60%) → rgb(94,92,230) at 90% (85%) → rgb(94,92,230) at 0%')}
Motion: because the assistant starts the conversation, the pill first folds down to the orb and its first word, “Would”, and the orb gives a soft ping; then the question is spoken word by word like any reply, each word condensing from a short blur as the pill grows with it. While it waits for an answer the violet glow breathes slowly instead of moving like speech.`,
    wrong: [['“SUGGESTION” label at 11 px', 'An all-caps label says what the moment already shows.'], ['A mic pill on the right', 'An extra control competes with the question.'], ['Text at 20 px, label at 12', 'A “Thinking…” label sits above the line.']],
    notes: [['It grows out of the orb', 'The pill folds to the orb, pings, then unfolds with the question.'], ['The violet orb and glow', 'Proactive has its own colour, apart from replies.'], ['A slow breath while waiting', 'The glow stops moving like speech once the question is asked.']],
  },
};
