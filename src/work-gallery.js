import {projects} from './data.js';

const count=projects.length;
const wrap=n=>((n%count)+count)%count;
const circular=(distance,span)=>((distance+span/2)%span+span)%span-span/2;
const saved={mode:'vertical',position:0};

export function workGalleryMarkup(){return `<section class="project-gallery" data-layout="${saved.mode}" aria-label="Selected work">
<h1 class="gallery-heading">Selected work</h1>
<div class="gallery-intro"><p>Web and mobile projects.<br>Open a project to see my role,<br>the stack and implementation.</p><a href="#/contact">Discuss a project</a></div>
<nav class="gallery-index" aria-label="Choose a project. Use arrow keys to cycle.">${projects.map((p,i)=>`<button data-select-project="${i}"><span>${p.name}</span></button>`).join('')}</nav>
<div class="gallery-stage" tabindex="0" role="region" aria-label="Project gallery. Scroll, drag, swipe, or use arrow keys to explore.">
${projects.map((p,i)=>`<a class="gallery-card" href="#/work/${p.id}" data-gallery-card="${i}" aria-label="Open ${p.name}" draggable="false"><div class="gallery-image"><img src="${p.cover || p.images[0]}" alt="${p.name} - ${p.cover ? 'project cover' : 'project screenshot'}" draggable="false" decoding="async" ${i<2?'fetchpriority="high"':'loading="lazy"'}></div><div class="gallery-card-caption"><span>${p.name}</span></div></a>`).join('')}
</div>
<div class="gallery-frame" aria-hidden="true"><i></i><i></i></div>
<div class="gallery-info"><span class="gallery-category"></span><span class="gallery-focus"></span></div>
<div class="gallery-footer"><div class="gallery-modes" role="group" aria-label="Gallery layout"><button data-gallery-mode="vertical">Vertical</button><button data-gallery-mode="horizontal">Horizontal</button><button data-gallery-mode="grid">Grid</button></div></div>
<p class="sr-only" aria-live="polite" data-gallery-status></p>
</section>`;}

export function mountWorkGallery({gsap,reduced,lenis,onScrollStep=()=>{}}){
 const root=document.querySelector('.project-gallery');if(!root)return()=>{};
 const cards=[...root.querySelectorAll('.gallery-card')],indices=[...root.querySelectorAll('[data-select-project]')],modes=[...root.querySelectorAll('[data-gallery-mode]')];
 const frame=root.querySelector('.gallery-frame'),stage=root.querySelector('.gallery-stage'),indexWindow=root.querySelector('.gallery-index'),dragSurface=root;
 const gridSlots=[[0,0],[2,0],[4,0],[5,1],[1,1],[3,1],[6,1],[0,2],[3,2],[6,2]];
 let scrollSelection=false;
 let mode=saved.mode,position=saved.position,target=position,active=-1,disposed=false,layoutTween=false,layoutTimeline,settle,entryTimeline,entryDelay,entryObserver,entryPending=false;
 let width=innerWidth,height=Math.max(innerHeight,480),dimensions=[],centers=[],span=1,indexHeight=0;
 let pointer=null,touchId=null,lastPoint=0,lastTime=0,velocity=0,travel=0;
 const mobile=()=>width<700;
 const fit=(i,maxW,maxH)=>{const aspect=projects[i].coverAspect || projects[i].aspect;const w=Math.min(maxW,maxH*aspect);return{width:w,height:w/aspect};};
 const centerY=()=>height*(mobile()?.47:.50);
 const centerX=()=>width*(mobile()?.65:.5);
 const frameWidth=()=>width*(mobile()?.55:.338);
 function measure(){
  const gridMobile=mobile()&&mode==='grid';
  root.style.height=gridMobile?`${Math.ceil(count/2)*225+240}px`:'100svh';
  document.body.classList.toggle('gallery-grid-mobile',gridMobile);document.body.dataset.workLayout=mode;
  const gap=mobile()?5:6;
  dimensions=projects.map((_,i)=>fit(i,width*(mobile()?.36:mode==='horizontal'?.132:.136),height*(mobile()?.22:.245)));
  centers=[0];
  for(let i=1;i<count;i++)centers[i]=centers[i-1]+(mode==='horizontal'?(dimensions[i-1].width+dimensions[i].width):(dimensions[i-1].height+dimensions[i].height))/2+gap;
  span=centers[count-1]+(mode==='horizontal'?(dimensions[count-1].width+dimensions[0].width):(dimensions[count-1].height+dimensions[0].height))/2+gap;
  indexHeight=indexWindow.clientHeight;lenis?.resize();
 }
 // Project units drive selection; physical movement respects each image's dimensions.
 function distanceAt(value){const whole=Math.floor(value),i=wrap(whole),cycle=Math.floor(whole/count);return cycle*span+centers[i]+(value-whole)*((i===count-1?span:centers[i+1])-centers[i]);}
 function positionAt(distance){const cycle=Math.floor(distance/span),local=distance-cycle*span;let i=count-1;for(let j=0;j<count-1;j++)if(local<centers[j+1]){i=j;break;}return cycle*count+i+(local-centers[i])/((i===count-1?span:centers[i+1])-centers[i]);}
 function updateMeta(){
  const next=wrap(Math.round(position));if(next===active)return false;const previous=active;active=next;
  if(previous!==-1&&scrollSelection&&mode!=='grid'&&!layoutTween)onScrollStep();
  const p=projects[active];indices.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===active));b.tabIndex=i===active?0:-1;});
  root.querySelector('.gallery-category').textContent=p.tag;root.querySelector('.gallery-focus').textContent=p.focus;root.querySelector('[data-gallery-status]').textContent=`${p.name}. ${p.tag}.`;return true;
 }
 function coordinates(i){
  if(mode==='grid'){
   if(mobile()){const dim=fit(i,width*.40,176);return{x:width*(i%2?.74:.26),y:165+Math.floor(i/2)*225,...dim,opacity:1};}
   const [column,row]=gridSlots[i],dim=fit(i,width*.115,height*.235);
   return{x:width*(.065+column*.145),y:height*(.21+row*.29),...dim,opacity:1};
  }
  const distance=circular(centers[i]-distanceAt(position),span),d=circular(i-position,count);
  const edgeFade=Math.min(1,Math.max(0,(span*.5-Math.abs(distance))/(mode==='horizontal'?dimensions[i].width:dimensions[i].height)));
  return{x:centerX()+(mode==='horizontal'?distance:0),y:centerY()+(mode==='vertical'?distance:0),...dimensions[i],opacity:(.24+.76*Math.exp(-Math.abs(d)*1.5))*edgeFade};
 }
 function paint(transition=false,instantFrame=false){
  if(disposed)return;const changed=updateMeta();
  indices.forEach((button,i)=>{const d=circular(i-position,count);gsap.set(button,{y:indexHeight/2+d*(mobile()?24:14),yPercent:-50,opacity:i===active?1:.38});button.style.visibility=Math.abs(d)<4.8?'visible':'hidden';});
  cards.forEach((card,i)=>{
   const c=coordinates(i),distance=Math.abs(circular(i-position,count));card.style.zIndex=String(10-Math.min(9,Math.round(distance)));card.tabIndex=mode==='grid'||i===active?0:-1;
   card.classList.toggle('is-current',i===active);card.querySelector('.gallery-card-caption').style.opacity=mode==='grid'?'1':'0';
   if(transition)layoutTimeline.to(card,{...c,duration:.95,ease:'expo.inOut',overwrite:true},Math.min(distance,4)*.025);else gsap.set(card,c);
  });
  const selected=coordinates(active),frameState={width:mode==='grid'?0:frameWidth(),height:mode==='grid'?0:selected.height,opacity:mode==='grid'?0:1,y:0};
  root.style.setProperty('--active-image-bottom',`${centerY()+selected.height/2}px`);root.style.setProperty('--gallery-center-y',`${centerY()}px`);
  if(transition)layoutTimeline.to(frame,{...frameState,duration:.95,ease:'expo.inOut',overwrite:true},0);else if(reduced||instantFrame)gsap.set(frame,frameState);else if(changed)gsap.to(frame,{...frameState,duration:.42,ease:'power3.out',overwrite:true});
 }
 function choose(index,fromScroll=false){scrollSelection=fromScroll;target=index;saved.position=wrap(target);if(!layoutTween&&(reduced||mode==='grid')){position=target;paint();}}
 function movePixels(delta){choose(positionAt(distanceAt(target)+delta),true);}
 function settleSoon(delay=260){clearTimeout(settle);settle=setTimeout(()=>choose(Math.round(target),scrollSelection),delay);}
 const entryUI=[indexWindow,root.querySelector('.gallery-info'),root.querySelector('.gallery-intro'),root.querySelector('.gallery-footer')];
 function finishEntry(){
  entryPending=false;entryTimeline=null;layoutTween=false;root.classList.remove('is-entering');root.removeAttribute('aria-busy');
  gsap.set(entryUI,{clearProps:'opacity,clipPath'});gsap.set(cards,{scale:1,clipPath:'inset(0% 0% 0% 0%)'});if(mode==='grid')position=target;paint(false,true);
 }
 function cancelEntry(){if(!entryPending&&!entryDelay&&!entryTimeline)return;entryObserver?.disconnect();entryDelay?.kill();entryDelay=null;entryTimeline?.kill();finishEntry();}
 function startEntry(delay){
  entryDelay=gsap.delayedCall(delay,()=>{
   entryDelay=null;if(disposed)return;entryPending=false;
   entryTimeline=gsap.timeline({onComplete:finishEntry});
   cards.forEach((card,i)=>{const {opacity,...dest}=coordinates(i),d=Math.abs(circular(i-position,count)),offset=Math.min(d,4)*.055;entryTimeline.fromTo(card,{x:centerX(),y:centerY(),scale:.72,clipPath:'inset(18% 18% 18% 18%)'},{...dest,scale:1,clipPath:'inset(0% 0% 0% 0%)',duration:1.08,ease:'expo.inOut'},offset);entryTimeline.to(card,{opacity,duration:.25,ease:'power2.out'},Math.min(d,4)*.02);});
   if(mode!=='grid')entryTimeline.to(frame,{width:frameWidth(),height:coordinates(active).height,opacity:1,duration:.92,ease:'expo.inOut'},.16);
   if(mode!=='grid')entryTimeline.to(indexWindow,{opacity:1,clipPath:'inset(0% 0% 0% 0%)',duration:.9,ease:'power3.inOut'},.32);
   entryTimeline.to(entryUI.slice(mode==='grid'?2:1),{opacity:1,clipPath:'inset(0% 0% 0% 0%)',duration:.62,stagger:.07,ease:'power3.out'},.48);
  });
 }
 function prepareEntry(){
  if(reduced)return;entryPending=true;layoutTween=true;root.classList.add('is-entering');root.setAttribute('aria-busy','true');
  gsap.set(cards,{opacity:0});gsap.set(frame,{width:0,opacity:0});gsap.set(entryUI,{opacity:0,clipPath:'inset(50% 0% 50% 0%)'});
  if(document.querySelector('.entry-cover')){entryObserver=new MutationObserver(()=>{if(!document.querySelector('.entry-cover')){entryObserver.disconnect();startEntry(.08);}});entryObserver.observe(document.body,{childList:true});}
  else startEntry(.27);
 }
 function setMode(next){
  cancelEntry();if(next===mode)return;scrollSelection=false;clearTimeout(settle);layoutTimeline?.kill();mode=next;saved.mode=next;target=position=wrap(Math.round(position));saved.position=position;root.dataset.layout=mode;lenis?.scrollTo(0,{immediate:true,force:true});measure();
  modes.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.galleryMode===mode)));
  if(reduced){layoutTween=false;paint(false,true);return;}
  layoutTween=true;root.classList.add('is-rearranging');layoutTimeline=gsap.timeline({onComplete:()=>{layoutTween=false;root.classList.remove('is-rearranging');if(mode==='grid')position=target;paint();}});paint(true);
 }
 const onClick=e=>{cancelEntry();const select=e.target.closest('[data-select-project]'),change=e.target.closest('[data-gallery-mode]'),step=e.target.closest('[data-gallery-step]'),card=e.target.closest('[data-gallery-card]');if(select)choose(target+circular(Number(select.dataset.selectProject)-target,count));if(change)setMode(change.dataset.galleryMode);if(step)choose(Math.round(target)+Number(step.dataset.galleryStep));if(card)choose(target+circular(Number(card.dataset.galleryCard)-target,count));};
 const onWheel=e=>{if(document.body.classList.contains('menu-open')||mode==='grid')return;cancelEntry();e.preventDefault();const raw=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(e.deltaMode===1)choose(Math.round(target)+Math.sign(raw),true);else movePixels(raw*(e.deltaMode===2?height:1)*.88);settleSoon();};
 const onKey=e=>{if(document.body.classList.contains('menu-open'))return;const map={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1};if(map[e.key]){cancelEntry();e.preventDefault();choose(Math.round(target)+map[e.key]);const next=wrap(Math.round(target));if(e.target.closest('[data-select-project]'))indices[next].focus({preventScroll:true});else if(e.target===stage||e.target.closest('[data-gallery-card]'))cards[next].focus({preventScroll:true});}};
 const selectCard=card=>{if(card)choose(target+circular(Number(card.dataset.galleryCard)-target,count));};
 const onFocus=e=>{if(pointer===null)selectCard(e.target.closest('[data-gallery-card]'));};
 const onHover=e=>{if(mode==='grid'&&!layoutTween)selectCard(e.target.closest('[data-gallery-card]'));};
 const point=e=>mode==='horizontal'?e.clientX:e.clientY;
 const beginDrag=value=>{cancelEntry();lastPoint=value;lastTime=performance.now();velocity=0;travel=0;clearTimeout(settle);};
 const moveDrag=(value,event)=>{const now=performance.now(),delta=lastPoint-value,dt=Math.max(8,now-lastTime);travel+=Math.abs(delta);velocity=velocity*.55+(delta/dt)*.45;if(travel>5){event.preventDefault();root.classList.add('is-dragging');movePixels(delta);}lastPoint=value;lastTime=now;};
 const finishDrag=()=>{root.classList.remove('is-dragging');if(travel>5){movePixels(Math.max(-180,Math.min(180,velocity*130)));settleSoon(220);}};
 const onPointerDown=e=>{if(e.pointerType==='touch'&&mobile())return;if(mode==='grid'||e.button>0||layoutTween)return;pointer=e.pointerId;beginDrag(point(e));};
 const onPointerMove=e=>{if(pointer!==e.pointerId)return;moveDrag(point(e),e);if(travel>5&&!dragSurface.hasPointerCapture(e.pointerId))dragSurface.setPointerCapture(e.pointerId);};
 const endPointer=e=>{if(pointer!==e.pointerId)return;const id=pointer;pointer=null;if(dragSurface.hasPointerCapture(id))dragSurface.releasePointerCapture(id);finishDrag();};
 const cancelPointer=e=>{if(pointer!==e.pointerId)return;velocity=0;endPointer(e);};
 const findTouch=(list,id)=>[...list].find(touch=>touch.identifier===id);
 const onTouchStart=e=>{if(!mobile()||mode==='grid'||layoutTween||touchId!==null||e.touches.length!==1)return;const touch=e.touches[0];touchId=touch.identifier;beginDrag(point(touch));};
 const onTouchMove=e=>{if(touchId===null)return;const touch=findTouch(e.touches,touchId);if(touch)moveDrag(point(touch),e);};
 const endTouch=e=>{if(touchId===null||!findTouch(e.changedTouches,touchId))return;touchId=null;finishDrag();};
 const cancelTouch=e=>{if(touchId===null)return;touchId=null;velocity=0;finishDrag();};
 const suppressDragClick=e=>{if(travel>5){e.preventDefault();e.stopPropagation();travel=0;}};
 const tick=()=>{if(layoutTween||disposed)return;const start=distanceAt(position),diff=distanceAt(target)-start;if(Math.abs(diff)<.01)return;position=positionAt(start+diff*(reduced?1:1-Math.pow(.895,gsap.ticker.deltaRatio())));saved.position=wrap(position);paint();};
 const resize=()=>{cancelEntry();layoutTimeline?.kill();layoutTween=false;root.classList.remove('is-rearranging');width=innerWidth;height=Math.max(innerHeight,480);measure();paint(false,true);};
 measure();gsap.set(cards,{xPercent:-50,yPercent:-50});gsap.set(frame,{xPercent:-50,yPercent:-50,x:0,y:0});modes.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.galleryMode===mode)));paint(false,true);prepareEntry();
 root.addEventListener('click',onClick);root.addEventListener('focusin',onFocus);root.addEventListener('pointerover',onHover);root.addEventListener('wheel',onWheel,{passive:false});root.addEventListener('keydown',onKey);
 dragSurface.addEventListener('pointerdown',onPointerDown);dragSurface.addEventListener('pointermove',onPointerMove,{passive:false});dragSurface.addEventListener('pointerup',endPointer);dragSurface.addEventListener('pointercancel',cancelPointer);dragSurface.addEventListener('lostpointercapture',cancelPointer);dragSurface.addEventListener('touchstart',onTouchStart,{passive:true});dragSurface.addEventListener('touchmove',onTouchMove,{passive:false});dragSurface.addEventListener('touchend',endTouch);dragSurface.addEventListener('touchcancel',cancelTouch);dragSurface.addEventListener('click',suppressDragClick,true);window.addEventListener('resize',resize);gsap.ticker.add(tick);
 return()=>{disposed=true;clearTimeout(settle);entryObserver?.disconnect();entryDelay?.kill();entryTimeline?.kill();layoutTimeline?.kill();gsap.ticker.remove(tick);gsap.killTweensOf([...cards,...indices,...entryUI,frame]);delete document.body.dataset.workLayout;window.removeEventListener('resize',resize);root.removeEventListener('click',onClick);root.removeEventListener('focusin',onFocus);root.removeEventListener('pointerover',onHover);root.removeEventListener('keydown',onKey);root.removeEventListener('wheel',onWheel);dragSurface.removeEventListener('pointerdown',onPointerDown);dragSurface.removeEventListener('pointermove',onPointerMove);dragSurface.removeEventListener('pointerup',endPointer);dragSurface.removeEventListener('pointercancel',cancelPointer);dragSurface.removeEventListener('lostpointercapture',cancelPointer);dragSurface.removeEventListener('touchstart',onTouchStart);dragSurface.removeEventListener('touchmove',onTouchMove);dragSurface.removeEventListener('touchend',endTouch);dragSurface.removeEventListener('touchcancel',cancelTouch);dragSurface.removeEventListener('click',suppressDragClick,true);};
}
