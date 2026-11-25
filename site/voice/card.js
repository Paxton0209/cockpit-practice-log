/* 017–019 Voice. Covers are Figma's still frames; the detail plays the state on a loop
   with the ambient glow drifting and, for the assistant, the orb's fluid turning. */
/* orb art exported from the Figma voice-orb instances at 4× */
const VO_ORB = { user: 'voice/orb-user.png', thinking: 'voice/orb-thinking.png', reply: 'voice/orb-reply.png', ask: 'voice/orb-ask.png' };
const voOrb = kind => {
  const fluid = kind !== 'user', src = VO_ORB[kind];
  return `<span class="vo-orb${fluid ? ' is-fluid' : ''} is-${kind}" aria-hidden="true"><img src="${src}" alt="" width="48" height="48">${fluid ? `<img src="${src}" alt="" width="48" height="48">` : ''}</span>`;
};
const voPill = (kind, text, textW, cover, script) =>
  `<div class="vo-pill" data-kind="${kind}"${cover ? '' : ` data-live data-script="${script}"`} role="status">
    <span class="vo-glow"></span>${voOrb(kind)}
    <span class="vo-text"><span class="vo-line">${text}</span></span>
  </div>`;
const voStage = (w, pill, cover) => cover ? pill : `<div class="vo-stage" style="width:${w}px">${pill}</div>`;

/* scripts: [kind, words, word gap ms, hold ms, append?] */
const VO_SCRIPTS = {
  user: [
    ['user', 'Open all the windows', 230, 700],
    ['user', 'and lower the rear windows halfway. Then set the cabin to 22° and turn on the seat heater.', 230, 1800, true],
  ],
  thinking: [['thinking', 'Analyzing target restaurant', 0, 4000]],
  reply: [
    ['reply', 'Opening all the windows', 170, 600],
    ['reply', 'and setting the cabin to 22°, with the rear windows halfway', 170, 1600, true],
    ['ask', 'Turn on the seat heater too?', 0, 2600],
  ],
};
const VO_MAX = 448;
const voSleep = ms => new Promise(r => setTimeout(r, ms));
async function voPlay(pill) {
  pill.dataset.run = '1';
  const box = pill.querySelector('.vo-text'), line = pill.querySelector('.vo-line'), orb = pill.querySelector('.vo-orb');
  const script = VO_SCRIPTS[pill.dataset.script];
  if (script.length === 1 && !script[0][2]) return;           /* thinking: the CSS loops carry it */
  const fit = (alignRight) => {
    const w = line.scrollWidth, over = w > VO_MAX;
    box.style.width = (alignRight ? VO_MAX : Math.min(w, VO_MAX)) + 'px';
    box.classList.toggle('is-scroll', over);
    line.style.transform = alignRight && !over ? `translateX(${VO_MAX - w}px)` : `translateX(${over ? VO_MAX - 8 - w : 0}px)`;
  };
  const alive = () => pill.isConnected;
  while (alive()) {
    for (const [kind, text, gap, hold, append] of script) {
      if (!alive()) return;
      if (!append) {
        line.style.opacity = 0;
        await voSleep(260);
        if (pill.dataset.kind !== kind) {
          pill.dataset.kind = kind;
          orb.outerHTML = voOrb(kind);
        }
        line.textContent = '';
        line.style.transform = 'none';
        box.classList.remove('is-scroll');
        line.style.opacity = '';
      }
      const orbNow = pill.querySelector('.vo-orb');
      if (gap) {
        for (const w of text.split(' ')) {
          if (line.childNodes.length) line.append(' ');
          const b = document.createElement('b'); b.textContent = w; line.append(b);
          fit(false);
          await voSleep(gap);
          if (!alive()) return;
        }
      } else { line.textContent = text; fit(kind === 'ask'); }
      await voSleep(hold);
    }
  }
}
setInterval(() => {
  document.querySelectorAll('.vo-pill[data-live]:not([data-run])').forEach(p => {
    if (p.closest('[inert]') || !p.offsetParent) return;
    voPlay(p);
  });
}, 300);

const VO_BASE = `Pill: 72 px tall, corner radius 28, padding 12 px left and 28 px right, items centred with 12 px gaps, clipped. Light theme: fill #FFFFFF, a 1 px inside stroke of #1D1D1F at 5%, drop shadow 0 4 16 in rgb(28,28,46) at 12%, background blur 40.
Orb: 48 × 48 at x 12, y 12. Words: SF Pro Medium 24/32 (Inter Medium if SF Pro is unavailable), letter-spacing 0, one line, #1D1D1F.`;
const VO_GLOW = (o, stops) => `Ambient glow inside the pill, under everything: an ellipse at x −11, y 41, 18 px wider than the pill and 56 px tall, layer blur 40 (CSS blur 20 px), opacity ${o}, clipped by the pill, filled with a horizontal gradient ${stops}.`;

const VOICE_CARDS = {
  VU: {
    W: 700, before: () => voiceBefore('VU', 548), name: 'User speech', cover: 1, fullStage: true, testReference: 'Figma',
    html: (_, cover) => voStage(548, voPill('user', 'Open all the windows', 258, cover, 'user'), cover),
    ask: 'Design the user-speech bar for a car voice assistant, 548 × 72 px, light theme. It shows the driver’s words as they are recognised: “Open all the windows and lower the rear windows halfway. Then set the cabin to 22° and turn on the seat heater.” with the driver’s avatar. Animate it. Nothing else.',
    prompt: `Design the user-speech state of a car voice assistant on a 548 × 72 px canvas, pill centred.
${VO_BASE}
Orb: the driver’s round photo avatar. Words at 70% opacity: “Open all the windows”. The pill hugs its content: 12 px + 48 px orb + 12 px + the words + 28 px (358 px wide with SF Pro, whose words measure 258 px), centred on the canvas.
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
The pill hugs its content: 12 px + 48 px orb + 12 px + the words + 28 px (386 px with SF Pro). Orb: a pale, grainy glass sphere. Words: “Analyzing target restaurant”, 286 px, filled with a horizontal gradient #2E9BEA → rgb(31,143,232) at 90% (25%) → #007AFF (60%) → rgb(88,86,214) at 90% (78%) → #AF52DE (100%). No glow.
Motion: the gradient sweeps through the words in a loop and the orb’s grain turns.`,
    wrong: [['A “THINKING” label at 11 px', 'An all-caps label and three dots repeat what the orb says.'], ['Text at 17 px', 'Too small at arm’s length.'], ['A ringed blue bead', 'The orb looks like a button.']],
    notes: [['One line in a gradient', 'The sweep shows work in progress.'], ['The library’s grain orb', 'It turns faster while thinking.'], ['No glow', 'The pill stays quiet until there is an answer.']],
  },
  VA: {
    W: 700, before: () => voiceBefore('VA', 548), name: 'Assistant speech', cover: 1, fullStage: true, testReference: 'Figma',
    html: (_, cover) => voStage(548, voPill('reply', 'Opening all the windows', 258, cover, 'reply'), cover),
    ask: 'Design the assistant-speech bar for a car voice assistant, 548 × 72 px, light theme. The assistant says “Opening all the windows and setting the cabin to 22°, with the rear windows halfway”, then asks “Turn on the seat heater too?” Animate it. Nothing else.',
    prompt: `Design the assistant-speech state of a car voice assistant on a 548 × 72 px canvas, pill centred.
${VO_BASE}
Orb: a deep blue glass sphere with a bright cyan wave across it. Words: “Opening all the windows”. The pill hugs its content: 12 px + 48 px orb + 12 px + the words + 28 px (358 px wide with SF Pro, whose words measure 258 px), centred on the canvas.
${VO_GLOW('0.45', 'rgb(100,210,255) at 0% → rgb(100,210,255) at 90% (25%) → rgb(10,132,255) (60%) → rgb(94,92,230) at 90% (85%) → rgb(94,92,230) at 0%')}
Motion: the reply streams in word by word and scrolls inside a 448 px window that fades 10% at both edges; the orb’s fluid turns and the glow drifts and breathes. Then the question “Turn on the seat heater too?” appears right-aligned in a 548 px pill, the orb shifts violet and the glow turns violet (rgb(123,100,255) → rgb(100,157,255) → rgb(129,71,238) → rgb(94,92,230)).`,
    wrong: [['Text at 19 px', 'Too small at arm’s length.'], ['A blue keyword', '“windows” in blue reads like a link.'], ['An equaliser icon', 'Bars stand in for the assistant.']],
    notes: [['24/32, one line', 'Streams in and scrolls in a window that fades at both edges.'], ['The library orb', 'Its fluid turns while the assistant speaks.'], ['The glow follows the voice', 'Blue for the reply, violet for the question.']],
  },
};
