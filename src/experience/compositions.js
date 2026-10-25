import * as T from 'three';
import {plate,cropped,leaf,paper} from './materials.js';
import {printTexture} from './assets.js';
import {smooth} from './timeline.js';
export function buildCompositions(scene,assets){
 const make=(x,y,z)=>{const g=new T.Group();g.position.set(x,y,z);scene.add(g);return g;};
 const label=(parent,text,w,y,{inverse=false,sub=''}={})=>{const p=plate(printTexture(text,{inverse,sub,height:600}),w,w*600/2048,{margin:0,depth:.07,edge:inverse?0x151515:0xd8d6cf});p.position.set(0,y,.1);parent.add(p);return p;};
 const coverTexture=printTexture('whynicky®',{cover:true,sub:'01 / AN INTERACTIVE PUBLICATION'});
 const cover=make(0,0,0),binding=leaf(coverTexture,16,7.5);binding.position.x=-8;cover.add(binding);
 const coverInserts=[];
 ['chatra','soyle-home','urpaq'].forEach((n,i)=>{const p=plate(assets[n],14,8.75,{depth:.08,margin:.35});p.position.set(.1*i,-.08*i,-.25-i*.13);cover.add(p);coverInserts.push(p);});
 // A designed archival overlap: no evenly spaced gallery grid.
 const archive=make(0,0,-19),arch=[];
 const placements=[['chatra',10,6.25,-4,1.4,-4,-.09],['soyle-home',7,4.375,4.5,2.4,0,.15],['urpaq',9,5.625,2,-3.4,3,-.12],['chatra-mobile',2.4,5.2,-8,-2,4,.13]];
 placements.forEach(([n,w,h,x,y,z,r])=>{const p=plate(assets[n],w,h,{margin:.2});p.position.set(x,y,z);p.rotation.set(.08*(z-1),-.05*z,r);archive.add(p);arch.push(p);});
 const archiveMark=label(archive,'SELECTED',9,5.5,{sub:'CHATRA / SÖYLE / DIGITAL URPAQ'});archiveMark.position.x=-2;archiveMark.position.z=-5;
 const chatra=make(-5,0,-30);label(chatra,'Chatra',10.5,5.1,{sub:'01 / WEB + MOBILE'});
 const cw=12.3,ch=7.68,navW=cw*.134,headH=ch*.16;
 const navigation=cropped(assets.chatra,navW,ch,[0,0,.134,1],{margin:0});navigation.position.set(-cw/2+navW/2,0,0);
 const heading=cropped(assets.chatra,cw-navW,headH,[.134,.84,.866,.16],{margin:0});heading.position.set(navW/2,ch/2-headH/2,0);
 const courses=cropped(assets.chatra,cw-navW,ch-headH,[.134,0,.866,.84],{margin:0});courses.position.set(navW/2,-headH/2,0);
 chatra.add(navigation,heading,courses);
 const mobile=plate(assets['chatra-mobile'],3.2,6.933,{margin:.13,edge:0x111111,depth:.15});mobile.position.set(8.35,-.6,1);mobile.rotation.y=-.13;chatra.add(mobile);
 const soyle=make(12,0,-56);label(soyle,'Söyle',9.5,5.2,{sub:'02 / COMMUNICATION & PRACTICE'});
 const book=new T.Group();book.rotation.set(-.32,-.12,-.035);soyle.add(book);
 const home=leaf(assets['soyle-home'],7.6,4.75),plan=leaf(assets['soyle-plan'],7.6,5.278);home.position.set(-7.65,0,.05);plan.position.set(0,0,.12);book.add(home,plan);
 const bookCover=leaf(printTexture('Söyle',{inverse:true,sub:'COMMUNICATION & PRACTICE',height:1422}),7.6,5.278);bookCover.position.set(0,0,.22);book.add(bookCover);
 for(let i=0;i<7;i++){const stack=plate(null,15.25,5.34,{depth:.035,margin:0,edge:i%2?0xaaa8a0:0xe1dfd6});stack.position.set(-.025,0,-.07-i*.055);book.add(stack);}
 const spine=new T.Mesh(new T.BoxGeometry(.16,5.4,.62),paper(null,{color:0x171717}));spine.position.set(-.04,0,-.16);book.add(spine);
 const urpaq=make(-4,0,-82);label(urpaq,'Digital Urpaq',14,5.1,{inverse:true,sub:'03 / DISCOVERY & EDUCATION'});
 const slabs=[];const uh=8.13,uw=13;
 // Image partitions retain the original full screenshot, including navigation and footer.
 const ranges=[[.935,1],[.1,.935],[0,.1]];
 ranges.forEach(([lo,hi],i)=>{const h=(hi-lo)*uh;const m=cropped(assets.urpaq,uw,h,[0,lo,1,hi-lo],{edge:0x292929,depth:.26,margin:0});m.userData.y=(-.5+(lo+hi)/2)*uh;m.position.y=m.userData.y;urpaq.add(m);slabs.push(m);});
 const assembly=make(0,0,-110);const assemblyBrand=label(assembly,'whynicky®',14,3.8,{inverse:true,sub:'DRAG TO SEPARATE / RELEASE TO SETTLE'});
 const prints=[];['chatra','soyle-home','urpaq'].forEach((n,i)=>{const p=plate(assets[n],7.2,4.5,{margin:.18,depth:.07});p.position.set((i-1)*3.8,(i===1?-1.2:-.3),.3+i*.35);p.rotation.z=(i-1)*-.08;assembly.add(p);prints.push(p);});
 const final=make(0,0,-137),finalBrand=label(final,'whynicky®',16,2,{inverse:true,sub:'FROM SURFACE TO SPACE — SELECTED WORK, 2026'});
 const finalPrints=[];['chatra','soyle-home','urpaq'].forEach((n,i)=>{const p=plate(assets[n],6.7,4.18,{margin:.18,depth:.07});final.add(p);finalPrints.push(p);});
 const groups=[cover,archive,chatra,soyle,urpaq,assembly,final];
 function update(p,portrait,gesture,px,py){
  cover.visible=p<.235;archive.visible=p>.085&&p<.36;chatra.visible=p>.16&&p<.485;soyle.visible=p>.37&&p<.63;urpaq.visible=p>.54&&p<.78;assembly.visible=p>.69&&p<.94;final.visible=p>.85;
  const open=smooth(.025,.16,p);binding.rotation.y=-open*2.15;binding.userData.bend(Math.sin(open*Math.PI)*.27);cover.rotation.z=-open*.045;
  coverInserts.forEach((m,i)=>{m.position.set(open*(i-1)*2,open*(1-i)*1.25,-.25-i*.13-open*i*1.1);m.rotation.z=open*(i-1)*.12;m.scale.setScalar(.76+open*.24);});
  const float=smooth(.13,.29,p);arch.forEach((m,i)=>{m.position.z=placements[i][5]+Math.sin(float*Math.PI)*(i%2?1:-1)*1.3;});
  const split=smooth(.386,.44,p);navigation.position.x=-cw/2+navW/2-split*1.6;navigation.position.z=split*3;navigation.rotation.y=-split*.25;heading.position.z=split*1.4;heading.position.y=ch/2-headH/2+split*.5;courses.position.z=-split*1.2;
  mobile.position.set(portrait?4.3:8.35,portrait?-4.2:-.6,portrait?2:1+split*2);mobile.rotation.z=portrait?-.065:0;mobile.scale.setScalar(portrait?.82:1);
  const unfold=smooth(.452,.508,p);bookCover.rotation.y=-unfold*Math.PI;bookCover.userData.bend(Math.sin(unfold*Math.PI)*.42);bookCover.visible=unfold<.995;
  plan.rotation.y=(1-unfold)*.5;plan.userData.bend((1-unfold)*.3);home.rotation.y=-smooth(.545,.593,p)*.65;home.userData.bend(smooth(.545,.593,p)*.5);
  book.rotation.z=-.035+smooth(.54,.59,p)*.08;
  const arrival=1-smooth(.59,.642,p),departure=smooth(.684,.731,p);slabs.forEach((m,i)=>{m.position.x=(arrival*2+departure*1.5)*(i-1);m.position.y=m.userData.y+(i===0?1:i===2?-1:0)*(arrival+departure)*1.7;m.position.z=arrival*(i-1)*3+departure*(i-1)*4;m.rotation.y=arrival*(i-1)*.13+departure*(i-1)*.15;});
  assembly.rotation.set(py*.035,px*.06,0);assemblyBrand.position.y=3.8+gesture*.8;
  prints.forEach((m,i)=>{m.position.set((i-1)*(3.8+gesture*1.3),(i===1?-1.2:-.3)+gesture*(i-1)*1.5,.3+i*.35+gesture*(i-1)*2.4);m.rotation.set(gesture*(i-1)*.08,gesture*(i-1)*.23,(i-1)*(-.08-gesture*.1));});
  const resolve=smooth(.895,.97,p);finalBrand.position.y=2.7+(1-resolve)*2;finalBrand.rotation.z=(1-resolve)*-.1;
  finalPrints.forEach((m,i)=>{m.position.set((i-1)*(4.4+(1-resolve)*4),-.5+(i===1?-.45:.2)+(1-resolve)*(i-1)*2,-.5-i*.2-(1-resolve)*i*2);m.rotation.set(0,(1-resolve)*(i-1)*.5,(i-1)*-.12);});
  // Portrait framing remains a deliberate vertical composition, rather than cropping the sides.
  chatra.scale.setScalar(portrait?.9:1);assembly.scale.setScalar(portrait?.88:1);
 }
 return {update,groups};
}
