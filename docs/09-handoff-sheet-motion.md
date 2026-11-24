# Handoff: entry sheet open/close motion

Repo `Paxton0209/cockpit-practice-log`, branch `sheet-motion` (not merged). Everything is in `site/index.html`. Published artifact slug `186c7d5a-b563-4fe1-9a3e-38cb905a2568`.

## Goal
Make it work like Dashline's inspector (`Paxton0209/Dashline`, `index.html`, `springDialog` / `closeInsp`, around lines 2318–2410):
- **Open**: the home cover (`.thumb.cov`, the After panel on a gradient) grows into the sheet's stage (`.hero3.cov`, 16:9, the same picture). The white surface grows with it. Title, columns and prompt fade in. Nothing scales except the picture.
- **Close**: click the backdrop or press Esc (there's no close button). The picture flies back and lands exactly on the cover. The surface shrinks with it; the other content fades out first. If the sheet is on Before, it fades to After on the way.

## What's wrong now
On a real Mac, frames stutter and the parts drift apart mid-flight: the shell (`#sc`), the sheet clip (`#sheet2`) and the stage transform (`.hero3`) don't stay locked. The screenshot showed the title and content outside the white surface while opening.

Current approach: three separate Web Animations, one each on `#sc` (clip-path), `#sheet2` (clip-path) and `.hero3` (transform), plus the content fades. They now share `startTime`, but they can still end up on different threads (compositor vs main).

## Suggested fix
Copy Dashline's structure 1:1 instead of patching:
1. One element owns the motion. Draw the surface as `#sheet2::before` with `opacity: var(--dialog-surface-opacity)`, the way Dashline does. Drop `#sc`.
2. Two springs only: the sheet (`dialogStyle`) and the stage (`lensPose` → transform), both created with the same keyframe sampling and the same `startTime`.
3. Content opacity is driven from the same spring progress (Dashline's `--dialog-copy-opacity`), not from separate fades.
4. Keep these rules: open on After; the stage is 16:9 so the cover and the stage match exactly (cover `.cs` width 95.24%); while flying, the sheet must not clip the stage (overflow visible).

## How to check
- Sample per frame with `requestAnimationFrame`: the surface rect and the stage rect must stay aligned on every frame.
- Freeze at 10%, 30% and 60% (`getAnimations()`, pause, set `currentTime`) on both open and close, then screenshot.
- Check on a real browser: headless Chrome here renders at about 20–30 fps and hides thread-split issues.

## Don't break
- Before/After toggle: After plays the scan line (`scan()`); Before fades over the old picture in 300 ms (`fadeTo()`).
- The page blur behind the sheet (`body.dim .shell`).
- Light theme first.

## Dashline reference code (copied from Paxton0209/Dashline index.html)

Use this if the Dashline repo can’t be attached in your session.

```css
@property --dialog-surface-opacity{syntax:"<number>";inherits:true;initial-value:1}
@property --dialog-copy-opacity{syntax:"<number>";inherits:true;initial-value:1}
.veil{position:fixed;inset:0;z-index:40;background:rgba(0,0,0,.15);opacity:0;pointer-events:none}
:root[data-theme=dark] .veil{background:rgba(0,0,0,.55)}
body.modal .veil{opacity:1;pointer-events:auto;touch-action:none}
.sheet{position:fixed;z-index:42;left:50%;top:calc(50% - 24px);width:min(880px,calc(100vw - 48px));height:min(600px,calc(100dvh - 96px));transform:translate(-50%,-50%);transform-origin:top left;display:none;grid-template-columns:minmax(0,1fr) minmax(285px,36%);outline:none;isolation:isolate;border-radius:var(--ds-radius-panel);will-change:transform,filter}
.sheet::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:var(--panel);border-radius:inherit;box-shadow:0 16px 52px rgba(0,0,0,.12);opacity:var(--dialog-surface-opacity)}
.sheet .sr,.sheet .keys{opacity:var(--dialog-surface-opacity)}
.sheet .acts2{opacity:var(--dialog-copy-opacity)}
.sheet[data-closing]{pointer-events:none}
```

```js
function lensAnimate(el,frames,options){
  const a=el.animate(frames,{fill:'both',...options});lensMotion.push(a);return a;
}
// Sample the reference spring (mass 1, stiffness 500, damping 38) into native keyframes.
function lensSpring(el,from,to,format,stiffness=500,damping=38){
  const decay=damping/2,delta=stiffness-decay*decay;
  const omega=Math.sqrt(Math.abs(delta));
  const slowRate=delta<0?decay-omega:decay;
  const duration=Math.ceil(1000*Math.log(1000)/slowRate);
  const count=Math.ceil(duration*120/1000);
  return lensAnimate(el,Array.from({length:count+1},(_,i)=>{
    const t=duration*i/(count*1000);
    // Support under-, critically- and over-damped springs, including compact close.
    const response=Math.abs(delta)<1e-8?1+decay*t:delta>0?
      Math.cos(omega*t)+decay/omega*Math.sin(omega*t):
      Math.cosh(omega*t)+decay/omega*Math.sinh(omega*t);
    const p=i===count?1:1-Math.exp(-decay*t)*response;
    return format(from.map((v,k)=>v+(to[k]-v)*p));
  }),{duration});
}
function cardPose(rect,rest){
  return [rect.left-rest.left,rect.top-rest.top,rect.width/rest.width,rect.height/rest.height];
}
const dialogStyle=([x,y,sx,sy])=>({transform:`translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) scale(${sx},${sy})`});
function lensPose(r,target){
  return [r.left+r.width/2-target.left-target.width/2,r.top+r.height/2-target.top-target.height/2,r.width/target.width];
}
const artworkStyle=([x,y,s])=>({transform:`translate(${x}px,${y}px) scale(${s})`});
function sourceFor(n,el){
  if(!el?.isConnected || (el.dataset.n||el.dataset.inspect)!==n)return null;
  const glyph=el.querySelector('.ic')?.getBoundingClientRect(),cell=el.getBoundingClientRect();
  if(!glyph?.width||cell.bottom<=0||cell.top>=innerHeight||cell.right<=0||cell.left>=innerWidth)return null;
  return {glyph,cell};
}
// The dialog surface and right-side controls ride the same spring.
// Counter-scale only the artwork to preserve its original uniform tile-to-preview path.
function springDialog(fromCard,toCard,fromArt,toArt,restCard,restArt,fromSurface=1,toSurface=1){
  const from=[...cardPose(fromCard,restCard),...lensPose(fromArt,restArt),fromSurface];
  const to=[...cardPose(toCard,restCard),...lensPose(toArt,restArt),toSurface];
  const cx=restArt.left+restArt.width/2-restCard.left;
  const cy=restArt.top+restArt.height/2-restCard.top;
  const closing=toSurface<fromSurface;
  const initialBlur=parseFloat(getComputedStyle(sheet).filter.match(/blur\(([\d.]+)px\)/)?.[1]||'0');
  const surface=lensSpring(sheet,from,to,v=>{
    const alpha=Math.max(0,Math.min(1,v[7]));
    const progress=closing?Math.max(0,Math.min(1,(fromSurface-v[7])/(fromSurface-toSurface))):0;
    // Copy clears early, while the spring and the returning glyph finish naturally.
    const copy=closing?Math.pow(Math.max(0,1-progress/.65),2):1;
    const blur=closing?initialBlur*(1-progress)+4*Math.sin(Math.PI*progress):0;
    return {...dialogStyle(v),'--dialog-surface-opacity':alpha,'--dialog-copy-opacity':copy,filter:`blur(${blur}px)`};
  });
  const artwork=lensSpring(stage,from,to,([x,y,sx,sy,gx,gy,g])=>({
    transform:`translate(${(cx+gx-x)/sx-cx}px,${(cy+gy-y)/sy-cy}px) scale(${g/sx},${g/sy})`
  }));
  const start=document.timeline.currentTime;
  surface.startTime=start;artwork.startTime=start;
  return surface;
}
function selectedTile(n){return AP().querySelector(`.t[data-n="${n}"]`);}
function markTile(tile){$('.t.sel')?.classList.remove('sel');if(tile)tile.classList.add('sel');}
function select(n,trigger){
  const o=by[n];
  if(!o||lensState==='closing')return;
  const tile=selectedTile(n);
  if(lensState==='open'){
    sel=n;markTile(tile);fill(o);
    $('#iname').focus({preventScroll:true});
    return;
  }
  lensAnchor=trigger||tile;
  trail.length=0;preview=null;clearMorph();say('');updateBack();
  const source=sourceFor(n,lensAnchor);
  sel=n;markTile(tile);fill(o);
  lensState='open';
  document.body.classList.add('modal');
  sheet.setAttribute('aria-hidden','false');
  app.inert=true;
  sheet.focus({preventScroll:true});
  const end=sheet.getBoundingClientRect(),art=stage.getBoundingClientRect();
  layoutLeads();
  if(lensReduced.matches)return;
  grid.classList.add('draw');
  lensAnimate(veil,[{opacity:0},{opacity:1}],{duration:220,easing:lensEase});
  if(lensCompact.matches){
    lensSpring(sheet,[100],[0],([y])=>({transform:`translateY(${y}%)`}),420,40);
  }else if(source){
    springDialog(source.cell,end,source.glyph,art,end,art,0,1);
  }else{
    lensAnimate(sheet,[{opacity:0},{opacity:1}],{duration:200,easing:lensEase});
  }
}
function finishLens(){
  stopLens();
  grid.classList.remove('draw');
  document.body.classList.remove('modal');
  sheet.setAttribute('aria-hidden','true');
  sheet.removeAttribute('data-closing');
  resetSvgCopy();clearPreviewMotion();
  markTile(null);app.inert=false;
  const focus=lensAnchor?.isConnected?lensAnchor:selectedTile(sel);
  lensState='closed';sel=null;lensAnchor=null;trail.length=0;preview=null;clearMorph();say('');updateBack();leads.replaceChildren();
  if(focus&&!focus.closest('#sheet'))focus.focus({preventScroll:true});
}
function closeInsp(){
  if(lensState!=='open')return;
  lensState='closing';sheet.setAttribute('data-closing','');
  clearTimeout(previewT);clearTimeout(leadsT);
  // Freeze the visible copy result, hover state, and inner transitions until hidden.
  // Resetting Copied to Copy SVG here would flash during the shrinking motion.
  freezeCopyForClose();
  sheet.getAnimations({subtree:true}).filter(a=>!lensMotion.includes(a)).forEach(a=>a.pause());
  if(lensReduced.matches){finishLens();return;}
  const tileName=by[sel]?.lineOf||sel,source=sourceFor(tileName,lensAnchor)||sourceFor(tileName,selectedTile(tileName));
  const currentSheet=sheet.getBoundingClientRect(),currentArt=stage.getBoundingClientRect();
  const backdrop=Number(getComputedStyle(veil).opacity),sheetOpacity=Number(getComputedStyle(sheet).opacity);
  const surfaceOpacity=Number(getComputedStyle(sheet).getPropertyValue('--dialog-surface-opacity'));
  stopLens();
  lensAnimate(veil,[{opacity:backdrop},{opacity:0}],{duration:180,easing:'ease-in'});
  let end;
  if(lensCompact.matches){
    const rest=sheet.getBoundingClientRect();
    end=lensSpring(sheet,[100*(currentSheet.top-rest.top)/rest.height],[100],([y])=>({transform:`translateY(${y}%)`}),420,42);
  }else if(source){
    const rest=sheet.getBoundingClientRect(),art=stage.getBoundingClientRect();
    end=springDialog(currentSheet,source.cell,currentArt,source.glyph,rest,art,surfaceOpacity,0);
  }else{
    end=lensAnimate(sheet,[{opacity:sheetOpacity},{opacity:0}],{duration:150,easing:'ease-in'});
  }
  end.onfinish=finishLens;
```
