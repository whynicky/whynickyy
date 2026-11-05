import {assetUrl} from './asset-url.js';

export function mountScreenshotViewer({gsap,reduced,lenis}){
 const root=document.querySelector('.mentor-case,.case-page');
 if(!root)return()=>{};
 const images=[...root.querySelectorAll('.mentor-frame img,.case-cover img,.project-image-sequence img')];
 if(!images.length)return()=>{};
 const triggers=images.map(image=>image.closest('.mentor-frame')||image);
 triggers.forEach((trigger,index)=>{
  trigger.tabIndex=0;
  trigger.setAttribute('role','button');
  trigger.setAttribute('aria-haspopup','dialog');
  trigger.setAttribute('aria-label',`Open screenshot ${index+1} of ${images.length}`);
  trigger.classList.add('screenshot-trigger');
 });
 const dialog=document.createElement('dialog');
 dialog.className='screenshot-viewer';
 dialog.setAttribute('aria-label','Screenshot viewer');
 dialog.setAttribute('data-lenis-prevent','');
 dialog.innerHTML=`<header class="screenshot-viewer-header"><a class="screenshot-viewer-brand" href="#/" aria-label="whynicky home"><img src="${assetUrl('images/eye-mark-white.png')}" alt="" width="48" height="48"></a><button type="button" data-viewer-close aria-label="Close screenshot">Close ×</button></header>
 <div class="screenshot-viewer-stage"><img class="screenshot-viewer-image" alt="" draggable="false"></div>
 <footer class="screenshot-viewer-footer"><nav aria-label="Screenshot navigation"><button type="button" data-viewer-step="-1" aria-label="Previous screenshot">Previous</button><span class="screenshot-viewer-count" role="status" aria-live="polite" aria-atomic="true"></span><button type="button" data-viewer-step="1" aria-label="Next screenshot">Next</button></nav></footer>`;
 root.append(dialog);
 const stage=dialog.querySelector('.screenshot-viewer-stage');
 const image=dialog.querySelector('.screenshot-viewer-image');
 const counter=dialog.querySelector('.screenshot-viewer-count');
 const closeButton=dialog.querySelector('[data-viewer-close]');
 let selected=0,opener=null,tween=null,closing=false,request=0,disposed=false;
 const source=()=>images[selected];
 function fit(){
  const original=source(),box=stage.getBoundingClientRect();
  const width=Number(original.getAttribute('width'))||original.naturalWidth||1;
  const height=Number(original.getAttribute('height'))||original.naturalHeight||1;
  const scale=Math.min(box.width/width,box.height/height);
  image.style.width=`${width*scale}px`;
  image.style.height=`${height*scale}px`;
 }
 function show(index){
  selected=(index+images.length)%images.length;
  const original=source(),id=++request;
  image.src=original.currentSrc||original.dataset.src||original.src;
  image.alt=original.alt;
  counter.textContent=`${String(selected+1).padStart(2,'0')} / ${String(images.length).padStart(2,'0')}`;
  fit();
  // Show the cached preview immediately, then upgrade only the open screenshot.
  const fullSource=original.dataset.src||original.src;
  if(image.src!==new URL(fullSource,document.baseURI).href){
   const fullImage=new Image();
   fullImage.onload=()=>{if(!disposed&&dialog.open&&id===request)image.src=fullSource;};
   fullImage.src=fullSource;
  }
 }
 function transformTo(rect){
  const box=image.getBoundingClientRect();
  return{x:rect.left-box.left,y:rect.top-box.top,scaleX:rect.width/box.width,scaleY:rect.height/box.height};
 }
 function open(index){
  if(dialog.open)return;
  selected=index;opener=triggers[index];closing=false;
  const from=source().getBoundingClientRect();
  dialog.showModal();lenis.stop();show(index);
  gsap.set(image,{clearProps:'transform,opacity'});
  if(!reduced){
   tween=gsap.timeline();
   tween.fromTo(dialog,{opacity:0},{opacity:1,duration:.2},0);
   tween.fromTo(image,{...transformTo(from),transformOrigin:'0 0'},{x:0,y:0,scaleX:1,scaleY:1,duration:.55,ease:'expo.out'},0);
  }
  closeButton.focus({preventScroll:true});
 }
 function close(){
  if(!dialog.open||closing)return;
  closing=true;++request;tween?.kill();
  const to=source().getBoundingClientRect();
  const returnToSource=to.width>0&&to.bottom>0&&to.top<innerHeight&&getComputedStyle(source()).visibility==='visible';
  if(reduced){dialog.close();return;}
  // Start at the current animated position, so closing can interrupt opening.
  const currentTransform={x:gsap.getProperty(image,'x'),y:gsap.getProperty(image,'y'),scaleX:gsap.getProperty(image,'scaleX'),scaleY:gsap.getProperty(image,'scaleY')};
  gsap.set(image,{x:0,y:0,scaleX:1,scaleY:1});
  const destination=returnToSource?transformTo(to):{opacity:0};
  gsap.set(image,currentTransform);
  tween=gsap.timeline({onComplete:()=>dialog.close()});
  tween.to(image,{...destination,duration:.3,ease:'power3.inOut'},0);
  tween.to(dialog,{opacity:0,duration:.22},.08);
 }
 function step(direction){
  if(closing)return;
  tween?.kill();gsap.set(dialog,{opacity:1});gsap.set(image,{clearProps:'transform,opacity'});
  show(selected+direction);
  if(!reduced)tween=gsap.fromTo(image,{opacity:.35,y:direction*12},{opacity:1,y:0,duration:.25,ease:'power2.out'});
 }
 function click(event){
  if(event.target.closest('.screenshot-viewer'))return;
  const index=triggers.indexOf(event.target.closest('.screenshot-trigger'));
  if(index>=0){event.preventDefault();open(index);}
 }
 function activate(event){
  if(dialog.open||!['Enter',' '].includes(event.key))return;
  const index=triggers.indexOf(event.target);
  if(index>=0){event.preventDefault();event.stopPropagation();open(index);}
 }
 function dialogClick(event){
  if(event.target.closest('[data-viewer-close]')||event.target===stage||event.target===dialog)close();
  const button=event.target.closest('[data-viewer-step]');
  if(button)step(Number(button.dataset.viewerStep));
 }
 function dialogKey(event){
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
   event.preventDefault();event.stopPropagation();step(event.key==='ArrowLeft'?-1:1);
  }
 }
 const cancel=event=>{event.preventDefault();close();};
 const closed=()=>{
  tween?.kill();closing=false;++request;lenis.start();
  gsap.set(dialog,{clearProps:'opacity'});gsap.set(image,{clearProps:'transform,opacity'});
  if(!disposed)opener?.focus({preventScroll:true});
 };
 const resize=()=>{if(dialog.open&&!closing){tween?.kill();gsap.set(dialog,{opacity:1});gsap.set(image,{clearProps:'transform,opacity'});fit();}};
 root.addEventListener('click',click);root.addEventListener('keydown',activate);
 dialog.addEventListener('click',dialogClick);dialog.addEventListener('keydown',dialogKey);
 dialog.addEventListener('cancel',cancel);dialog.addEventListener('close',closed);
 window.addEventListener('resize',resize);
 return()=>{
  disposed=true;++request;tween?.kill();
  root.removeEventListener('click',click);root.removeEventListener('keydown',activate);
  dialog.removeEventListener('click',dialogClick);dialog.removeEventListener('keydown',dialogKey);
  dialog.removeEventListener('cancel',cancel);dialog.removeEventListener('close',closed);
  window.removeEventListener('resize',resize);
  if(dialog.open){dialog.close();lenis.start();}
  dialog.remove();
 };
}
