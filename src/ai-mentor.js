import {eyeMark} from './brand.js';
import {assetUrl} from './asset-url.js';
import './ai-mentor.css';

const screens = [
 ['landing', 'A first step into sign language', 2940, 1848],
 ['learning', 'The learning workspace', 2940, 2558],
 ['dialogues', 'Everyday conversations', 2940, 2208],
 ['features', 'A closer look at the experience', 2940, 1850],
 ['text-to-sign', 'From text to signs', 2940, 1846],
 ['sign-to-text', 'From signs to text', 2940, 1850],
 ['understanding', 'Understanding a gesture', 2940, 1846],
 ['experience', 'A guided introduction', 2940, 1846],
 ['help', 'Finding your way around', 2940, 2118],
 ['login', 'Welcome back', 2940, 1852],
 ['register', 'The start of a learning journey', 2940, 1852],
 ['faq', 'Questions & next steps', 2940, 1846],
].map(([id, title, width, height]) => ({id, title, width, height, srcWidth:1600, src:assetUrl(`/projects/ai-mentor/${id}.webp`), smallSrc:assetUrl(`/projects/ai-mentor/${id}-small.webp`)}));

export const aiMentor = {
 id:'ai-mentor', name:'AI Mentor', tag:'Education · Interface design', focus:'Design only',
 headline:'A visual language for learning sign language.',
 description:'Interface design for a sign-language learning platform.',
 contribution:'My role was design only: UI/UX and visual design. Development and AI implementation were outside my scope.',
 images:screens.map(screen=>screen.src), imageAspects:screens.map(screen=>screen.width/screen.height),
 cover:screens[0].src, coverSmall:screens[0].smallSrc, coverWidth:1600, coverAspect:2940/1848, aspect:2940/1848,
 features:[], notes:[], stack:[], links:[], portrait:false,
};

export function screenshotGalleryPage(project=aiMentor, galleryScreens=screens){
 const details=project!==aiMentor;
 const role={soyle:'Product design & development',chatra:'Frontend & product UI',forge:'Nuxt & FastAPI',portfolio:'Design & frontend','portfolio-v2':'Design & development'}[project.id] || project.focus;
 return `<article class="mentor-case" aria-labelledby="mentor-title">
  <header class="mentor-header"><a href="#/" aria-label="whynicky home">${eyeMark}</a><nav aria-label="Project navigation"><a href="#/work">Work</a><a href="#/about">About</a><a href="#/contact">Contact</a></nav></header>
  <div class="mentor-info"><h1 id="mentor-title">${project.name}</h1><div class="mentor-credit"><p>${role}</p>${details?`<a href="#/work/${project.id}/details">Project details</a>`: ''}</div></div>
  <a class="mentor-back" href="#/work">Back</a>
  <section class="mentor-gallery" tabindex="0" aria-label="${project.name} screenshots. Scroll or use arrow keys to explore.">
   ${galleryScreens.map(screen=>`<figure class="mentor-frame"><img data-src="${screen.src}" ${screen.smallSrc?`data-srcset="${screen.smallSrc} 640w, ${screen.src} ${screen.srcWidth || screen.width}w" sizes="50vw"`:''} alt="${project.name} - ${screen.title}" width="${screen.width}" height="${screen.height}" draggable="false" decoding="async"></figure>`).join('')}
  </section>
 </article>`;
}

export function mountScreenshotGallery({gsap,reduced}){
 const root=document.querySelector('.mentor-case');if(!root)return()=>{};
 const gallery=root.querySelector('.mentor-gallery'),frames=[...root.querySelectorAll('.mentor-frame')];
 let width=0,height=0,widths=[],heights=[],maxHeight=0,cycle=0,current=0,target=0,initialized=false;
 let disposed=false,drag=null,observer=null,entry=null,delay=null,suppressClick=false;
 const entrance=frames.map(()=>({x:0}));
 const visible=new Set();
 const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
 function paint(){
  if(!cycle)return;
  visible.clear();
  // Stack images without gutters. Their distance from the middle controls scale;
  // the right edge stays fixed as each image grows into and leaves the centre.
  let top=((-current%cycle)+cycle)%cycle-cycle;
  for(let slot=0;slot<frames.length*5;slot++){
   const index=slot%frames.length,base=heights[index];
   const scale=clamp(1-Math.abs(top+base/2-height/2)/height*.3,.85,1);
   const renderedHeight=base*scale;
   if(!visible.has(index)&&top+renderedHeight>-renderedHeight&&top<height+renderedHeight){
    visible.add(index);
    frames[index].style.visibility='visible';
    frames[index].style.transform=`translate3d(${width-widths[index]*scale+entrance[index].x}px,${top}px,0) scale(${scale})`;
    // All frames share the same CSS origin, so native lazy loading fetches the entire stack.
    const image=frames[index].firstElementChild;
    if(!image.hasAttribute('src')){
     if(top+renderedHeight>0 && top<height)image.fetchPriority='high';
     if(image.dataset.srcset)image.srcset=image.dataset.srcset;
     image.src=image.dataset.src;
    }
   }
   top+=renderedHeight;
   if(top>height+maxHeight)break;
  }
  frames.forEach((frame,index)=>{if(!visible.has(index))frame.style.visibility='hidden';});
 }
 function measure(){
  const oldWidth=width;
  width=gallery.clientWidth;height=gallery.clientHeight;
  widths=frames.map(frame=>{
   const image=frame.firstElementChild;
   const imageWidth=Number(image.getAttribute('width'));
   const aspect=Number(image.getAttribute('height'))/imageWidth;
   // Fit portrait screens within the viewport and avoid enlarging mobile captures.
   const frameWidth=aspect>1?Math.min(width,imageWidth,height*.7/aspect):width;
   frame.style.width=`${frameWidth}px`;
   image.sizes=`${frameWidth}px`;
   return frameWidth;
  });
  heights=frames.map((frame,index)=>{
   const image=frame.firstElementChild;
   return widths[index]*Number(image.getAttribute('height'))/Number(image.getAttribute('width'));
  });
  maxHeight=Math.max(...heights);
  cycle=heights.reduce((sum,h)=>sum+h,0)*.85;
  if(!initialized){current=target=-(height-heights[0])/2;initialized=true;}
  else if(oldWidth){current*=width/oldWidth;target*=width/oldWidth;}
  paint();
 }
 function reveal(){
  if(disposed||reduced)return;
  entry?.kill();
   paint();
   const indices=[...visible];
   indices.forEach(i=>entrance[i].x=width);
   paint();
   entry=gsap.timeline();
   // Opposite ends enter together, followed by the inner images.
   indices.forEach((index,order)=>entry.to(entrance[index],{x:0,duration:1.2,ease:'expo.out',onUpdate:paint},Math.min(order,indices.length-1-order)*.08));
 }
 function queueReveal(){
  if(reduced)return;
  if(document.querySelector('.entry-cover')){
   entrance.forEach(item=>item.x=width);paint();
   observer=new MutationObserver(()=>{if(!document.querySelector('.entry-cover')){observer.disconnect();entrance.forEach(item=>item.x=0);reveal();}});
   observer.observe(document.body,{childList:true});
  }else delay=gsap.delayedCall(.2,reveal);
 }
 const move=delta=>{target+=delta;if(reduced){current=target;paint();}};
 const wheel=e=>{
  if(document.body.classList.contains('menu-open')||root.querySelector('dialog[open]')||e.ctrlKey||e.target.closest('a'))return;
  e.preventDefault();e.stopPropagation();
  move(e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?height:1));
 };
 const key=e=>{
  if(e.target.closest('a,button,dialog')||(['Enter',' '].includes(e.key)&&e.target.closest('[role=button]')))return;
  const steps={ArrowDown:100,ArrowUp:-100,PageDown:height*.8,PageUp:-height*.8,' ':height*.8};
  if(e.key in steps){e.preventDefault();move(steps[e.key]*(e.key===' '&&e.shiftKey?-1:1));}
  if(e.key==='Home'){e.preventDefault();target=-(height-heights[0])/2;if(reduced){current=target;paint();}}
 };
 const down=e=>{
  if(e.button!==0||e.target.closest('a')||drag)return;
  target=current;suppressClick=false;
  drag={id:e.pointerId,x:e.clientX,y:e.clientY,travel:0,time:performance.now(),velocity:0,touch:e.pointerType==='touch'};
 };
 const pointerMove=e=>{
  if(!drag||drag.id!==e.pointerId)return;
  const now=performance.now(),delta=drag.y-e.clientY;
  drag.travel+=Math.hypot(delta,drag.x-e.clientX);
  if(drag.travel>6){
   suppressClick=true;
   if(!gallery.hasPointerCapture(e.pointerId))gallery.setPointerCapture(e.pointerId);
   gallery.classList.add('is-dragging');
   drag.velocity=drag.velocity*.5+delta/Math.max(8,now-drag.time)*.5;
   move(delta);
  }
  drag.x=e.clientX;drag.y=e.clientY;drag.time=now;
 };
 const up=e=>{
  if(e.type==='lostpointercapture'&&e.target!==gallery)return;
  if(!drag||drag.id!==e.pointerId)return;
  const gesture=drag;drag=null;
  if(gallery.hasPointerCapture(e.pointerId))gallery.releasePointerCapture(e.pointerId);
  gallery.classList.remove('is-dragging');
  if(e.type==='pointerup'&&gesture.travel>6&&gesture.touch&&!reduced&&performance.now()-gesture.time<100)move(clamp(gesture.velocity*160,-height*.7,height*.7));
 };
 const tick=()=>{
  if(disposed||root.querySelector('dialog[open]'))return;
  const difference=target-current;
  if(Math.abs(difference)<.01)return;
  current=Math.abs(difference)<.5?target:current+difference*(1-Math.pow(.91,gsap.ticker.deltaRatio()));
  paint();
 };
 const preventDragClick=e=>{if(suppressClick){e.preventDefault();e.stopPropagation();}};
 const resize=()=>{entry?.kill();entrance.forEach(item=>item.x=0);measure();};
 measure();queueReveal();gsap.ticker.add(tick);
 root.addEventListener('wheel',wheel,{passive:false,capture:true});root.addEventListener('keydown',key);
 gallery.addEventListener('click',preventDragClick,true);gallery.addEventListener('pointerdown',down);gallery.addEventListener('pointermove',pointerMove);gallery.addEventListener('pointerup',up);gallery.addEventListener('pointercancel',up);gallery.addEventListener('lostpointercapture',up);window.addEventListener('resize',resize);
 return()=>{disposed=true;observer?.disconnect();delay?.kill();entry?.kill();gsap.ticker.remove(tick);root.removeEventListener('wheel',wheel,true);root.removeEventListener('keydown',key);gallery.removeEventListener('click',preventDragClick,true);gallery.removeEventListener('pointerdown',down);gallery.removeEventListener('pointermove',pointerMove);gallery.removeEventListener('pointerup',up);gallery.removeEventListener('pointercancel',up);gallery.removeEventListener('lostpointercapture',up);window.removeEventListener('resize',resize);};
}
