/* 017–019 Voice. Covers are Figma's still frames; the detail plays the state on a loop
   with the ambient glow drifting and, for the assistant, the orb's fluid turning. */
/* orb art exported from the Figma voice-orb instances at 4× */
const VO_ORB = { user: 'voice/orb-user.png', thinking: 'voice/orb-thinking.png', reply: 'voice/orb-reply.png', ask: 'voice/orb-ask.png' };
const voOrb = kind => {
  const src = VO_ORB[kind], img = `<img src="${src}" alt="" width="48" height="48">`;
  /* base art stays still; reply/ask turn two screen-blended copies, thinking drifts three grain layers */
  const flow = kind === 'user' ? '' : `<span class="vo-flow">${img.repeat(kind === 'thinking' ? 3 : 2)}</span>`;
  return `<span class="vo-orb${kind === 'reply' || kind === 'ask' ? ' is-fluid' : ''} is-${kind}" aria-hidden="true">${img}${flow}</span>`;
};
const voHalo = kind => (kind === 'reply' || kind === 'ask') ? `<span class="vo-halo" aria-hidden="true"><img src="${VO_ORB[kind]}" alt=""></span>` : '';
const voPill = (kind, text, textW, cover, script) =>
  `<div class="vo-pill" data-kind="${kind}"${cover ? '' : ` data-live data-script="${script}" data-text="${text}"`} role="status">
    ${voHalo(kind)}<span class="vo-glow"><i></i><i></i><i></i><i></i><i></i></span>${voOrb(kind)}
    <span class="vo-text"><span class="vo-line">${text}</span></span>
  </div>`;
const voStage = (w, pill, cover) => cover ? pill : `<div class="vo-stage" style="width:${w}px">${pill}</div>`;

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
  ask: [['ask', 'Would you like to open the windows?', 0, 3600, false, 'enter']],
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
async function voPlay(pill) {
  pill.dataset.run = '1';
  const box = pill.querySelector('.vo-text'), line = pill.querySelector('.vo-line');
  const runs = voRuns(VO_SCRIPTS[pill.dataset.script]);
  const alive = () => pill.isConnected && !pill.closest('[data-closing]');
  let curW = box.offsetWidth;
  const anims = [];
  /* finished animations are committed to inline style and dropped, so nothing depends on fill-forwards (which the browser may discard) */
  const run = (el, kf, opt) => { const a = el.animate(kf, { fill: 'forwards', ...opt }); a.onfinish = () => { try { a.commitStyles(); } catch (e) {} a.cancel(); }; anims.push(a); return a; };
  const swapOut = async () => { await run(line, [{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(10px)' }], { duration: 360, easing: 'cubic-bezier(.4, 0, 1, 1)' }).finished.catch(() => {}); };
  while (alive()) {
    for (const r of runs) {
      if (!alive()) return;
      await swapOut();
      if (!alive()) return;
      anims.splice(0).forEach(a => a.cancel());
      line.style.opacity = ''; line.style.filter = ''; line.style.transform = 'none';
      voSetKind(pill, r[0][0]);
      box.classList.remove('is-scroll');
      if (!r[0][2]) {
        /* whole line: cross-fade with blur, pill width eases to fit */
        const [kind, text, , hold, , enter] = r[0];
        if (enter) {
          /* fold to the orb, a soft ping, then unfold with the words */
          run(box, [{ width: curW + 'px' }, { width: '0px' }], { duration: 420, easing: VO_EASE });
          curW = 0;
          await voSleep(700);
          if (!alive()) return;
          pill.querySelector('.vo-orb').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 700, easing: 'cubic-bezier(.3, 0, .2, 1)' });
          await voSleep(380);
        }
        line.textContent = text;
        const w = Math.ceil(line.getBoundingClientRect().width / ((line.getBoundingClientRect().width / line.offsetWidth) || 1)) + 2, right = false;
        const toW = Math.min(w, VO_MAX);
        run(box, [{ width: curW + 'px' }, { width: toW + 'px' }], { duration: 520, easing: VO_EASE });
        run(line, [{ opacity: 0, filter: 'blur(8px)', transform: `translateX(${right ? VO_MAX - w + 10 : 10}px)` }, { opacity: 1, filter: 'blur(0)', transform: `translateX(${right ? VO_MAX - w : 0}px)` }], { duration: 520, easing: VO_EASE });
        curW = toW;
        if (enter) { await voSleep(520); pill.classList.add('is-waiting'); await voSleep(hold); pill.classList.remove('is-waiting'); }
        else await voSleep(520 + hold);
        continue;
      }
      /* streamed words: every word is laid out up front with its own delay; one continuous animation scrolls the line */
      const words = [], times = [];
      let t = 260;   /* the pill eases to the first word while the previous line fades */
      r.forEach(([, text, gap, hold], si) => { text.split(' ').forEach((w, i) => { words.push(w); times.push(t); t += gap; }); t += (si < r.length - 1 ? hold : 0); });
      const T = t, lastHold = r[r.length - 1][3];
      line.innerHTML = words.map((w, i) => `<b style="animation-delay:${times[i]}ms">${w}</b>`).join(' ');
      const bs = [...line.children], rights = bs.map(b => b.offsetLeft + b.offsetWidth + 2);
      const kfW = [], kfX = [];
      rights.forEach((rx, i) => {
        const off = times[i] / (T + 400);
        kfW.push({ offset: off, width: Math.min(rx, VO_MAX) + 'px', easing: VO_EASE });
        kfX.push({ offset: off, transform: `translateX(${rx > VO_MAX ? VO_MAX - 8 - rx : 0}px)`, easing: VO_EASE });
      });
      kfW.unshift({ offset: 0, width: curW + 'px', easing: VO_EASE }); kfX.unshift({ offset: 0, transform: 'none', easing: VO_EASE });
      /* hold the last position to the end (a missing offset-1 frame would ease back to the underlying style) */
      kfW.push({ ...kfW[kfW.length - 1], offset: 1 }); kfX.push({ ...kfX[kfX.length - 1], offset: 1 });
      run(line, [{ opacity: 1 }, { opacity: 1 }], { duration: 1 });
      run(box, kfW, { duration: T + 400 });
      run(line, kfX, { duration: T + 400 });
      const firstOver = rights.findIndex(rx => rx > VO_MAX);
      if (firstOver >= 0) setTimeout(() => alive() && box.classList.add('is-scroll'), times[firstOver]);
      curW = Math.min(rights[rights.length - 1], VO_MAX);
      await voSleep(T + 400 + lastHold);
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
    box.getAnimations().concat(line.getAnimations()).forEach(a => a.cancel()); line.style.filter = '';
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

const VO_BASE = `Pill: 72 px tall, corner radius 28, padding 12 px left and 28 px right, items centred with 12 px gaps, clipped. Light theme: fill #FFFFFF, a 1 px inside stroke of #1D1D1F at 5%, drop shadow 0 4 16 in rgb(28,28,46) at 12%, background blur 40.
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
    W: 700, before: () => voiceBefore('VT', 386), name: 'Thinking', cover: 1, fullStage: true, testReference: 'Figma',
    html: (_, cover) => voStage(386, voPill('thinking', 'Analyzing target restaurant', 286, cover, 'thinking'), cover),
    ask: 'Design the thinking state for a car voice assistant, 386 × 72 px, light theme. It shows the assistant working on “Analyzing target restaurant”. Animate it. Nothing else.',
    prompt: `Design the thinking state of a car voice assistant on a 386 × 72 px canvas.
${VO_BASE}
The pill hugs its content: 12 px + 48 px orb + 12 px + the words + 28 px. Orb: a pale, grainy glass sphere. Words: “Analyzing target restaurant”, filled with a horizontal gradient #2E9BEA → rgb(31,143,232) at 90% (25%) → #007AFF (60%) → rgb(88,86,214) at 90% (78%) → #AF52DE (100%). No glow.
Motion: a richer gradient (cyan, blue, violet, pink) flows through the words in a loop; the line cycles “Understanding your request”, “Finding related features”, “Browsing your history”, each fading out and in with a short blur while the pill eases to the new width; inside the orb the grain drifts and flickers irregularly (no spinning).`,
    wrong: [['A “THINKING” label at 11 px', 'An all-caps label and three dots repeat what the orb says.'], ['Text at 17 px', 'Too small at arm’s length.'], ['A ringed blue bead', 'The orb looks like a button.']],
    notes: [['One line in a gradient', 'The sweep shows work in progress.'], ['The library’s grain orb', 'It turns faster while thinking.'], ['No glow', 'The pill stays quiet until there is an answer.']],
  },
  VA: {
    W: 700, before: () => voiceBefore('VA', 548), name: 'Assistant speech', cover: 1, fullStage: true, testReference: 'Figma',
    html: (_, cover) => voStage(548, voPill('reply', 'Opening all the windows', 258, cover, 'reply'), cover),
    ask: 'Design the assistant-speech bar for a car voice assistant, 548 × 72 px, light theme. The assistant says “Opening all the windows and setting the cabin to 22°, with the rear windows halfway”. Animate it. Nothing else.',
    prompt: `Design the assistant-speech state of a car voice assistant on a 548 × 72 px canvas, pill centred.
${VO_BASE}
Orb: a deep blue glass sphere with a bright cyan wave across it, and behind it, under the glow, a 96 px copy of the orb, concentric with it, at 16% opacity and blurred 18 px (Figma layer blur 36), clipped by the pill. Words: “Opening all the windows”. The pill hugs its content: 12 px + 48 px orb + 12 px + the words + 28 px, centred on the canvas.
${VO_GLOW('0.45', 'rgb(100,210,255) at 0% → rgb(100,210,255) at 90% (25%) → rgb(10,132,255) (60%) → rgb(94,92,230) at 90% (85%) → rgb(94,92,230) at 0%')}
Motion: the reply streams in word by word, each word fading in from a short motion blur, and the line slides on inside a 448 px window that fades 10% at both edges; the orb’s fluid turns and the glow under the words rises and falls like a voice level.`,
    wrong: [['Text at 15.5 px, two lines', 'The reply wraps inside a 72 px bar.'], ['Keywords in blue', '“all the windows” and “22°” read like links.'], ['An equaliser icon', 'Bars stand in for the assistant.']],
    notes: [['24/32, one line', 'Words condense from a blur; the line slides in a window that fades at both edges.'], ['The library orb', 'Its fluid turns while the assistant speaks.'], ['A glow that moves like a voice', 'Five slices of the blue glow rise and fall under the words.']],
  },
  VP: {
    W: 700, before: () => voiceBefore('VP', 548), name: 'Proactive', cover: 1, fullStage: true, testReference: 'Figma',
    html: (_, cover) => voStage(548, voPill('ask', 'Would you like to open the windows?', 0, cover, 'ask'), cover),
    ask: 'Design a proactive suggestion from a car voice assistant, 548 × 72 px, light theme: unprompted, the assistant asks “Would you like to open the windows?” and waits for an answer. Animate it. Nothing else.',
    prompt: `Design the proactive state of a car voice assistant on a 548 × 72 px canvas, pill centred.
${VO_BASE}
Orb: a violet glass sphere with a deep indigo swirl, and behind it, under the glow, a 96 px copy of the orb, concentric with it, at 16% opacity and blurred 18 px, clipped by the pill. Words: “Would you like to open the windows?”. The pill hugs its content: 12 px + 48 px orb + 12 px + the words + 28 px.
${VO_GLOW('0.45', 'rgb(123,100,255) at 0% → rgb(100,157,255) at 90% (25%) → rgb(129,71,238) (60%) → rgb(94,92,230) at 90% (85%) → rgb(94,92,230) at 0%')}
Motion: because the assistant starts the conversation, the pill first folds down to the orb, the orb gives a soft ping, then the pill unfolds and the question fades in from a short blur. While it waits for an answer the violet glow breathes slowly instead of moving like speech.`,
    wrong: [['A “SUGGESTION” label at 11 px', 'An all-caps label says what the moment already shows.'], ['A mic pill on the right', 'An extra control competes with the question.'], ['Text at 18 px', 'Too small at arm’s length.']],
    notes: [['It grows out of the orb', 'The pill folds to the orb, pings, then unfolds with the question.'], ['The violet orb and glow', 'Proactive has its own colour, apart from replies.'], ['A slow breath while waiting', 'The glow stops moving like speech once the question is asked.']],
  },
};
