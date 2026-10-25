import * as T from 'three';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
export async function prepareGraphics(){await document.fonts.ready;const response=await fetch('./type/identity.json');if(!response.ok)throw new Error('Identity outlines unavailable');const font=new FontLoader().parse(await response.json());
 const textures={cover:art('cover'),mask:art('mask'),fold:art('fold'),final:art('final'),coverPortrait:art('cover',true),maskPortrait:art('mask',true),foldPortrait:art('fold',true),finalPortrait:art('final',true),grain:grain()};return {font,textures};}
function word(c,text,x,y,size,max,color='#101010'){c.fillStyle=color;c.font=`900 ${size}px Inter`;c.textAlign='center';c.textBaseline='middle';c.letterSpacing=`${-size*.075}px`;c.fillText(text,x,y,max);}
function art(kind,portrait=false){const c=document.createElement('canvas');c.width=portrait?1536:2560;c.height=portrait?2048:1536;const g=c.getContext('2d'),w=c.width,h=c.height;
 const dark=kind==='mask'||kind==='final';g.fillStyle=dark?'#090909':'#e8e6de';g.fillRect(0,0,w,h);
 if(kind==='cover'){
  if(portrait){word(g,'why',w*.5,h*.32,740,w*.93);word(g,'nicky',w*.5,h*.61,610,w*.94);g.fillStyle='#111';g.fillRect(w*.065,h*.82,w*.87,20);}
  else {word(g,'whynicky',w*.49,h*.47,660,w*.93);g.fillStyle='#101010';g.fillRect(w*.05,h*.72,w*.9,26);}
  g.fillStyle='#171717';g.font=`600 ${portrait?42:36}px Inter`;g.letterSpacing='2px';g.textAlign='left';g.fillText('®',w*.91,h*.21);
 }else if(kind==='fold'){
  for(let i=0;i<3;i++){g.fillStyle=i%2?'#111':'#e8e6de';g.fillRect(0,i*h/3,w,h/3);word(g,i===1?'nicky':'why',w*.5,(i+.52)*h/3,portrait?540:600,w*.92,i%2?'#ebe9e0':'#111');}
 }else{
  const color='#eeeae0';if(portrait||kind==='final'){word(g,'why',w*.5,h*.29,portrait?700:850,w*.89,color);word(g,'nicky',w*.5,h*.66,portrait?560:740,w*.92,color);}else word(g,'whynicky',w*.49,h*.5,670,w*.94,color);
 }
 if(kind!=='mask'){
  let seed=49;for(let i=0;i<150000;i++){seed=(seed*16807)%2147483647;const x=seed%w;seed=(seed*16807)%2147483647;const y=seed%h;g.fillStyle=i%3===0?'rgba(255,255,255,.08)':'rgba(0,0,0,.1)';g.fillRect(x,y,i%7===0?3:1,1);}
 }
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t;
}
function grain(){const size=256,data=new Uint8Array(size*size*4);let seed=111;for(let i=0;i<size*size;i++){seed=(seed*16807)%2147483647;const v=140+(seed%80);data.set([v,v,v,255],i*4);}const t=new T.DataTexture(data,size,size);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(5,5);t.needsUpdate=true;return t;}
export function inkMaterial(grain,color=0x151515){return new T.MeshStandardMaterial({color,roughness:.6,metalness:.16,bumpMap:grain,bumpScale:.025});}
