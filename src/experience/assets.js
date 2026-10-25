import * as T from 'three';
export async function loadAssets(renderer){
 const names=['chatra','chatra-mobile','soyle-home','soyle-plan','urpaq'];
 const textures={};
 try{await Promise.all(names.map(async name=>{const img=new Image();img.src=`./art/projects/${name}${innerWidth<800?'-small':''}.webp`;await img.decode();const texture=new T.Texture(img);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());texture.needsUpdate=true;textures[name]=texture;}));await document.fonts.ready;return textures;}
 catch(e){Object.values(textures).forEach(t=>t.dispose());throw e;}
}
export function printTexture(title,{inverse=false,sub='',width=2048,height=960,cover=false}={}){
 const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const c=canvas.getContext('2d');
 c.fillStyle=inverse?'#111111':'#eeede8';c.fillRect(0,0,width,height);
 if(cover){c.fillStyle='#090909';c.fillRect(50,158,width-100,height-316);}
 c.fillStyle=cover||inverse?'#f6f5ef':'#101010';c.textAlign='center';c.textBaseline='middle';
 c.font=`900 ${cover?350:Math.min(520,height*.64)}px Inter`;c.letterSpacing='-18px';if(title==='whynicky®'){
  c.font=`900 ${cover?350:height*.62}px Inter`;c.letterSpacing='-18px';const word='whynicky',tw=c.measureText(word).width;const max=width-210,ratio=Math.min(1,max/tw);c.save();c.translate((width-100)/2,height*.49);c.scale(ratio,1);c.fillText(word,0,0);c.restore();c.font=`650 ${height*.15}px Inter`;c.letterSpacing='-2px';c.fillText('®',width-102,height*.3);
 }else c.fillText(title,width/2,height*.49,width-100);
 c.letterSpacing='3px';c.font='500 24px Inter';c.textAlign='left';c.fillStyle=inverse?'#aaa9a5':'#55554f';c.fillText(sub,58,height-57);
 if(cover){c.fillText('WHYNICKY® / SELECTED DIGITAL WORK',58,70);c.textAlign='right';c.fillText('VOL. 01 — 2026',width-58,70);c.fillText('FROM SURFACE TO SPACE',width-58,height-57);}
 // Ink irregularities are attached to the printed artwork, never to the viewport.
 let seed=123;for(let i=0;i<36000;i++){seed=(seed*16807)%2147483647;const x=seed%width;seed=(seed*16807)%2147483647;const y=seed%height;c.fillStyle=i%2?'rgba(255,255,255,.055)':'rgba(0,0,0,.04)';c.fillRect(x,y,i%5===0?2:1,1);}
 const t=new T.CanvasTexture(canvas);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t;
}
