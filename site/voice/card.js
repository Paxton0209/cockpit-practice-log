/* 017 Voice card. The cover is one still frame; the detail plays one exchange on a loop. */
const VOICE_SCRIPT = [
  ['listening', 'Open the rear windows halfway and set the cabin to 22°', 210, 900],
  ['thinking', 'Checking the cabin…', 0, 1700],
  ['speaking', 'Rear windows halfway, cabin at 22°.', 150, 1500],
  ['speaking', 'Open the front windows too?', 150, 2400],
];
const VOICE_STILL = 'Open the rear windows halfway and set the cabin to 22°';

const voiceOrb = () => `<span class="vc-orb" aria-hidden="true"><span class="vc-fluid"><i></i><i></i><i></i></span></span>`;

function voiceCard(cover) {
  const words = VOICE_STILL.split(' ').map(w => `<b>${w}</b>`).join(' ');
  const pill = `<div class="vc-pill"${cover ? '' : ' data-live'} data-state="listening" role="status" aria-label="Voice assistant">
      ${voiceOrb()}
      <span class="vc-view is-over" style="width:${cover ? 480 : 740}px"><span class="vc-line" style="left:auto;right:0">${words}</span></span>
    </div>`;
  return cover ? pill : `<div class="vc-stage">${pill}</div>`;
}

/* ---------- player ---------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function voicePlay(pill) {
  const view = pill.querySelector('.vc-view'), line = pill.querySelector('.vc-line');
  const MAX = 740;
  const fit = () => {
    const w = line.scrollWidth, vw = Math.min(w, MAX);
    view.style.width = vw + 'px';
    view.classList.toggle('is-over', w > MAX);
    line.style.transform = `translateX(${-Math.max(0, w - MAX)}px)`;
  };
  pill.dataset.run = '1';
  while (pill.isConnected) {
    for (const [state, text, gap, hold] of VOICE_SCRIPT) {
      if (!pill.isConnected) return;
      line.style.opacity = 0;
      await sleep(240);
      pill.dataset.state = state;
      line.textContent = '';
      line.style.left = '0'; line.style.right = 'auto';
      line.style.transform = 'none';
      line.style.opacity = 1;
      if (gap) {
        for (const [i, w] of text.split(' ').entries()) {
          if (i) line.append(' ');
          const b = document.createElement('b'); b.textContent = w; line.append(b);
          fit();
          await sleep(gap);
          if (!pill.isConnected) return;
        }
      } else { line.textContent = text; fit(); }
      await sleep(hold);
    }
  }
}
/* start any live pill that appears (detail sheet), once */
setInterval(() => {
  document.querySelectorAll('.vc-pill[data-live]:not([data-run])').forEach(p => {
    if (p.closest('[inert]') || !p.offsetParent) return;
    voicePlay(p);
  });
}, 300);

const VOICE_PROMPT = `Design a voice assistant capsule for a car screen, on an 840 × 72 px transparent canvas, light theme page.
Capsule: centred, 72 px tall, fully round (radius 36), hugging its content up to the full 840 px. Fill #1D1D1F; a 1 px inside edge in white at 6%; shadow 0 2 4 at 6% and 0 12 32 at 14%. A faint wash of the orb’s blue (#1A6BFF at 22%) fades out from the left edge over the first half of the capsule.
Inside, left to right: 8 px padding, a 56 px voice orb, 12 px, the words, 24 px padding.
Orb: a near-black sphere (#0B1030 to #03040C) holding three soft blurred blobs that drift and blend in screen mode — cyan #3FE0FF, blue #1A6BFF and indigo #2B3CFF while listening — with a glass highlight at the top left and a 1 px white rim at 10%.
Words: Inter Medium 32/44 with normal letter-spacing (0), white, one line. Show the listening state with “Open the rear windows halfway and set the cabin to 22°”: the text is longer than the 740 px window (x 76 to 816), so its last glyph ends exactly at x 816 — the latest words stay in view, the first words have scrolled off the left — and the left edge fades from transparent to opaque over 48 px.
Motion: the orb’s fluid moves continuously; each new word rises 6 px and fades in, the capsule grows with the text until it is full, then the line slides left. Thinking turns the orb violet and spinning with “Checking the cabin…” in a moving blue-to-pink gradient; speaking turns it blue-violet and calm. Nothing else on the canvas.`;

const VOICE_CARD = {
  W: 1000,
  name: 'Voice card',
  cover: 1,
  fullStage: true,
  html: (_, cover) => voiceCard(cover),
  before: voiceBefore,
  ask: 'Design a voice assistant bar for a car screen, 840 × 72 px, light theme. It shows the driver saying “Open the rear windows halfway and set the cabin to 22°”, then the assistant thinking, then replying “Rear windows halfway, cabin at 22°.” and asking “Open the front windows too?” Animate it. Nothing else.',
  prompt: VOICE_PROMPT,
  wrong: [['Text at 20 px, labels at 11', 'Too small to read from the driver’s seat; an all-caps label sits above every line.'], ['Two lines in a 72 px bar', 'The last reply sits above the new one in tiny type.'], ['A dotted placeholder icon', 'Nothing tells listening, thinking and speaking apart.']],
  notes: [['One line at 32/44', 'Latest words stay in view; older ones slide off under a 48 px fade.'], ['A fluid orb', 'Cyan when listening, violet and spinning when thinking, blue-violet when speaking.'], ['The capsule grows with the words', 'It hugs the text, then the line scrolls once it is full.']],
  testReference: 'After',
};
