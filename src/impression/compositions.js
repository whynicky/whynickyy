import * as T from 'three';
import {createPaper} from './paper.js';
import {createRaster} from './raster.js';
import {inkMaterial} from './graphics.js';
import {smooth} from './timeline.js';
export function buildWorld(scene,{font,textures}){
 const group=(z)=>{const g=new T.Group();g.position.z=z;scene.add(g);return g;};
 const cover=group(0),sheet=createPaper(textures.cover,textures.grain,19,11.4);cover.add(sheet.mesh);
 const relief=group(-12),letters=[],glyphs='whynicky';const advances=[...glyphs].map(c=>font.data.glyphs[c].ha*4/font.data.resolution),total=advances.reduce((a,b)=>a+b,0);let x=-total/2;
 const front=inkMaterial(textures.grain,0x151515),side=inkMaterial(textures.grain,0x77766f);side.metalness=.38;side.roughness=.38;
 [...glyphs].forEach((c,i)=>{const geometry=new T.ExtrudeGeometry(font.generateShapes(c,4),{depth:1.25,bevelEnabled:true,bevelSize:.035,bevelThickness:.04,bevelSegments:2,curveSegments:10});const m=new T.Mesh(geometry,[front,side]);m.castShadow=true;m.receiveShadow=true;m.userData.x=x;relief.add(m);letters.push(m);x+=advances[i]-.13;});
 const bed=new T.Mesh(new T.BoxGeometry(24,13,.2),new T.MeshStandardMaterial({color:0xe8e5dc,roughness:.95,bumpMap:textures.grain,bumpScale:.035}));bed.position.set(0,0,-.25);bed.receiveShadow=true;relief.add(bed);
 const raster=createRaster(textures.mask);raster.mesh.position.z=-48;scene.add(raster.mesh);
 const folded=group(-94),fold=createPaper(textures.fold,textures.grain,20,13);folded.add(fold.mesh);
 // The registration films carry the same ink impression; their offsets resolve into one print.
 const register=group(-130),films=[];for(let i=0;i<4;i++){
  const material=new T.MeshBasicMaterial({map:textures.final,transparent:true,opacity:i===3?1:.35,side:T.DoubleSide,depthWrite:i===3});
  const film=new T.Mesh(new T.PlaneGeometry(19,12),material);register.add(film);films.push(film);
 }
 let lastPortrait=null;
 function update(p,portrait,px,py,pressure,negative,time){
  if(lastPortrait!==portrait){lastPortrait=portrait;sheet.setMap(textures[portrait?'coverPortrait':'cover']);fold.setMap(textures[portrait?'foldPortrait':'fold']);raster.uniforms.uMap.value=textures[portrait?'maskPortrait':'mask'];films.forEach(f=>f.material.map=textures[portrait?'finalPortrait':'final']);}
  cover.visible=p<.24;relief.visible=p>.035&&p<.355;raster.mesh.visible=p>.295&&p<.65;folded.visible=p>.57&&p<.805;register.visible=p>.725;
  const peel=smooth(.025,.18,p);sheet.uniforms.uCurl.value=peel*.96;cover.rotation.set(peel*.13,-peel*.95,-peel*.22);cover.position.set(-smooth(.12,.23,p)*23,peel*1.6,0);sheet.mesh.scale.set(portrait?.68:1,portrait?1.6:1,1);
  const raise=smooth(.085,.23,p);let xx=0;
  letters.forEach((m,i)=>{if(portrait){const row=i<3?0:1;const rowWidth=advances.slice(row?3:0,row?8:3).reduce((a,b)=>a+b,0)-.13*(row?4:2);const before=advances.slice(row?3:0,i).reduce((a,b)=>a+b,0)-.13*(i-(row?3:0));m.position.x=before-rowWidth/2;m.position.y=row?-3.5:1;}else{m.position.x=m.userData.x;m.position.y=-1.65;}m.position.z=raise*(.25+Math.sin(i*.65)*.6);m.rotation.y=Math.sin(i)*smooth(.11,.2,p)*.055*(1-smooth(.22,.265,p));});
  relief.rotation.z=-.08*smooth(.12,.21,p)*(1-smooth(.22,.28,p));bed.scale.set(portrait?.7:1,portrait?1.35:1,1);
  const u=raster.uniforms;u.uRaster.value=1-smooth(.44,.51,p);u.uExposure.value=smooth(.475,.52,p)*(1-smooth(.58,.63,p));u.uPressure.value=pressure;u.uPointer.value.set(.5+px*.38,.5+py*.38);u.uNegative.value=negative*smooth(.47,.5,p);u.uTime.value=time;
  raster.mesh.position.z=-48-smooth(.445,.51,p)*6;raster.mesh.rotation.set(py*.06*u.uExposure.value,px*.1*u.uExposure.value,smooth(.32,.41,p)*0);raster.mesh.scale.set(portrait?.55:1,portrait?1.35:1,1);
  const opening=smooth(.59,.675,p),closing=smooth(.704,.76,p);fold.uniforms.uFold.value=1.38*(1-opening)+closing*.95;fold.uniforms.uCurl.value=smooth(.735,.79,p)*.3;folded.rotation.set(-.26-opening*.1,closing*-.7,-.1+opening*.12);folded.position.y=(1-opening)*1.2;fold.mesh.scale.set(portrait?.64:1,portrait?1.35:1,1);
  const align=smooth(.78,.925,p);films.forEach((f,i)=>{const distance=(3-i);f.position.set((1-align)*(i%2?1:-1)*(distance+1)*2,(1-align)*(i-1.5)*1.3+1.2,-distance*(1-align)*3);f.rotation.set((1-align)*(i-1.5)*.1,(1-align)*(i-1.5)*.2,(1-align)*(i-1.5)*.12);f.scale.set(portrait?.65:1,portrait?1.3:1,1);f.material.opacity=i===3?1:.35*(1-smooth(.88,.96,p));});
  register.rotation.z=(1-align)*.08;
 }
 return {update};
}
