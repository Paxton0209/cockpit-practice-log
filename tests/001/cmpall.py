import asyncio,re,glob,os
from playwright.async_api import async_playwright
site=open('/home/claude/cockpit-practice-log/site/index.html').read()
ff=''.join(re.findall(r'@font-face\{[^}]*\}',site))
TURN='<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M35.084 44.3237C34.6548 40.7367 33.0203 37.3792 30.4185 34.8194L17.1977 21.8123" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke="#1D1D1F" stroke-opacity="0.5"/><path d="M64.4434 11.7525L60.3184 31.1981C60.133 32.0726 58.9806 32.2828 58.4982 31.5301L52.8497 22.7133C52.7729 22.5933 52.6713 22.4912 52.5519 22.4138L43.4559 16.5128C42.7082 16.0276 42.9206 14.8805 43.7926 14.6956L63.2576 10.5666C63.9654 10.4165 64.5935 11.0446 64.4434 11.7525Z" fill="#1D1D1F"/><path d="M35.1993 67.8123L35.1982 47.1466C35.198 43.0444 36.7733 39.0988 39.599 36.1249L53.1978 21.8123" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke="#1D1D1F"/></svg>'
NEXTP='<path d="M17.6234 19.5497C17.3077 18.08 16.4805 16.7524 15.2658 15.819L10.166 11.8999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#B6B6B7"/><path d="M18.1014 4.41589L22.4347 11.0827C22.6297 11.3825 22.3631 11.7679 22.0138 11.6914L17.9224 10.7953C17.8667 10.7831 17.8091 10.7829 17.7535 10.7948L13.5117 11.6985C13.163 11.7727 12.8986 11.3882 13.093 11.0893L17.4306 4.41588C17.5884 4.17321 17.9437 4.17322 18.1014 4.41589Z" fill="#1D1D1F"/><path d="M17.7664 27.1L17.7662 9.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#1D1D1F"/>'
NEXT=f'<svg width="32" height="32" viewBox="0 0 32 32" fill="none">{NEXTP}</svg>'
NEXTS=f'<svg width="32" height="32" viewBox="0 0 32 32" fill="none" style="flex:none;display:block;">{NEXTP}</svg>'
TURNC=TURN.replace('<svg ','<svg class="np-icon" ',1)
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome')
    for f in sorted(glob.glob('/tmp/acc/runs/*.html')):
      h=open(f).read().replace('{TURNC}',TURNC).replace('{TURNA}',TURN.replace('<svg ','<svg class="nvp-icon" ',1)).replace('{NEXTA}',NEXT.replace('<svg ','<svg class="nvp-nicon" ',1)).replace('{TURN}',TURN).replace('{NEXTS}',NEXTS).replace('{NEXT}',NEXT)
      pg=await b.new_page(viewport={'width':600,'height':340},device_scale_factor=2)
      await pg.set_content(f'<style>{ff}body{{margin:0;background:#f3f3f3;padding:40px 60px}}</style>'+h);await pg.wait_for_timeout(400)
      await pg.screenshot(path=f[:-5]+'.png',clip=dict(x=40,y=20,width=520,height=254));await pg.close()
    await b.close()
asyncio.run(m())
from skimage.metrics import structural_similarity as ssim
from skimage import io,color
import numpy as np
ref=color.rgb2gray(io.imread('/tmp/acc/ref.png')[...,:3])
for f in sorted(glob.glob('/tmp/acc/runs/*.png')):
  a=color.rgb2gray(io.imread(f)[...,:3]);d=np.abs(a-ref)
  print(os.path.basename(f),'SSIM',round(ssim(a,ref,data_range=1),4),'within2%',round((d<0.02).mean()*100,1))
