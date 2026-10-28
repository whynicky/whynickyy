import './studio.css';
import './editorial-pages.css';
import './presence-v2.css';
import './repertoire.css';
import './chrome.css';
import './method-revision.css';
import './mobile.css';
import './presence-hero.css';
import './reading-pages.css';
import './mobile-work.css';
import './about-studio.css';
import './studio-reading.css';
import './entry-intro.css';
import {mountProcessBanner} from './process-banner.js';
import {mountCredentialArchive} from './credential-archive.js';
import {replaceArrows} from './icons.js';
import {projectPage} from './case-page.js';
import {footerMarkup} from './site-footer.js';
import {mountSound} from './sound.js';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {projects} from './data.js';
import {homeMarkup,mountHome} from './studio-home.js';
import {PrintScene} from './studio-scene.js';
import {workGalleryMarkup,mountWorkGallery} from './work-gallery.js';
import {aboutMarkup,contactMarkup,processMarkup,credentialsMarkup,mountEditorial} from './editorial-pages.js';
gsap.registerPlugin(ScrollTrigger);
history.scrollRestoration='manual';
const params=new URLSearchParams(location.search);
let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||params.get('motion')==='reduce';
try{if(sessionStorage.getItem('quiet-motion')==='true')reduced=true;}catch{}
const email='alimzhanart@icloud.com';
const main=document.querySelector('main'),menu=document.querySelector('#site-menu'),toggle=document.querySelector('.menu-toggle');
const lenis=new Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:!reduced,anchors:false});
lenis.on('scroll',ScrollTrigger.update);
let route='/',homeController,scene,transitioning=false,pendingChapter=null,menuOpen=false,restoreFocus,disposeRoute=()=>{};
const positions=new Map();
replaceArrows(document.body);
const entranceTemplate=document.querySelector('.entry-cover').outerHTML;
const sound=mountSound();
gsap.ticker.add(t=>{lenis.raf(t*1000);if(!document.hidden)scene?.render(gsap.ticker.deltaRatio()/60);});
gsap.ticker.lagSmoothing(0);
function closeMenu(focus=false){menuOpen=false;document.body.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open directory');menu.inert=true;main.inert=false;document.querySelector('.topline').inert=false;document.querySelector('.dock-links').inert=false;lenis.start();if(focus)(restoreFocus||toggle).focus();}
function openMenu(){menuOpen=true;restoreFocus=document.activeElement;document.body.classList.add('menu-open');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close directory');menu.inert=false;main.inert=true;document.querySelector('.topline').inert=true;document.querySelector('.dock-links').inert=true;lenis.stop();menu.querySelector('a').focus();}
function draw(restore=false){
 disposeRoute();scene?.destroy();scene=null;homeController?.destroy();homeController=null;ScrollTrigger.getAll().forEach(t=>t.kill());
 route=location.hash.slice(1)||'/';if(route==='/practice'){history.replaceState(null,'','#/about');route='/about';}
 const project=projects.find(p=>route===`/work/${p.id}`);
 document.body.className=`${sound.enabled?'sound-on ':''}${reduced?'quiet ':''}route-${route==='/'?'home':project?'case':route.slice(1)}`;
 document.body.dataset.chapter=0;
 main.innerHTML=route==='/'?homeMarkup():route==='/work'?workGalleryMarkup():route==='/about'?aboutMarkup():route==='/contact'?contactMarkup():route==='/process'?processMarkup():route==='/credentials'?credentialsMarkup():project?projectPage(project):`<section class="not-found"><h1>Wrong turn.</h1><a href="#/">Back to the beginning ↗</a></section>`;
 if(['/'].includes(route))main.insertAdjacentHTML('beforeend',footerMarkup());
 replaceArrows(main);
 document.title=`${project?project.name:route==='/'?'Frontend & Creative Developer':route.slice(1).replace(/^./,c=>c.toUpperCase())} — whynicky®`;
 document.querySelector('.current-page').textContent=route==='/'?'Introduction':project?'Project':route.slice(1);
 document.querySelectorAll('.dock a,.menu-grid a,.inner-nav a,.header-directory a').forEach(a=>{a.hash===`#${route}`?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');});
 lenis.scrollTo(0,{immediate:true,force:true});
 if(route==='/'){
  if(params.get('webgl')!=='off'){try{scene=new PrintScene(document.querySelector('.print-scene'),reduced);}catch(e){document.body.classList.add('no-canvas');console.warn('Using the static portrait presentation.',e.message);}}else document.body.classList.add('no-canvas');
  homeController=mountHome({gsap,ScrollTrigger,reduced,onProgress:p=>{if(scene)scene.p=p;}});
 }
 bindRoute();
 const footer=main.querySelector('.grand-footer');if(footer){ScrollTrigger.create({trigger:footer,start:'top 65%',onToggle:self=>document.body.classList.toggle('at-footer',self.isActive)});if(!reduced)gsap.fromTo(footer.querySelector('.footer-wordmark>span'),{yPercent:35},{yPercent:0,ease:'none',scrollTrigger:{trigger:footer.querySelector('.footer-wordmark'),start:'top bottom',end:'top 75%',scrub:true}});}
 lenis.resize();ScrollTrigger.refresh();
 if(restore&&positions.has(route))lenis.scrollTo(positions.get(route),{immediate:true,force:true});
 const focusHeading=main.querySelector('h1');if(focusHeading){focusHeading.tabIndex=-1;}
 if(import.meta.env.DEV&&route==='/'&&params.has('at')){const at=Math.min(1,Math.max(0,Number(params.get('at'))||0));lenis.scrollTo(at*(document.querySelector('.home-score').offsetHeight-innerHeight),{immediate:true,force:true});}
}
function bindRoute(){
 const disposeGallery=route==='/work'?mountWorkGallery({gsap,reduced,lenis}):()=>{};
 const disposeEditorial=mountEditorial({gsap,ScrollTrigger,reduced,lenis});
 const disposeCredentials=mountCredentialArchive({lenis});
 const disposeBanner=mountProcessBanner({reduced});
 const rows=[...document.querySelectorAll('[data-work]')];rows.forEach(row=>{const active=()=>{rows.forEach(r=>r.classList.toggle('active',r===row));document.querySelectorAll('[data-work-art]').forEach(a=>a.classList.toggle('active',a.dataset.workArt===row.dataset.work));};row.addEventListener('pointerenter',active);row.addEventListener('focus',active);});
 const cover=document.querySelector('.case-cover');if(cover&&!reduced)gsap.fromTo(cover,{rotate:2,y:30},{rotate:0,y:0,duration:1,ease:'power3.out'});
 disposeRoute=()=>{disposeGallery();disposeEditorial();disposeCredentials();disposeBanner();};
}
async function navigate(){
 if(transitioning)return;transitioning=true;positions.set(route,window.scrollY);closeMenu();sound.route();
 const curtain=document.querySelector('.page-turn'),panels=[...curtain.querySelectorAll('i')],turnTitle=curtain.querySelector('.turn-title');
 const requested=location.hash.slice(1)||'/';const restore=requested==='/work'&&route.startsWith('/work/');
 main.inert=true;lenis.stop();
 if(!reduced){
  const sheetColor=requested==='/'?'#08090b':requested==='/work'?'#f5f6f8':'#dcdedc';
  gsap.set(curtain,{visibility:'visible',opacity:1,backgroundColor:sheetColor,clipPath:'polygon(0 100%,100% 100%,100% 100%,0 100%)'});
  await gsap.to(curtain,{clipPath:'polygon(0 -24%,100% 0%,100% 100%,0 100%)',duration:.72,ease:'power4.inOut'});
 }
 draw(restore);main.focus({preventScroll:true});
 if(!reduced){
  if(route==='/')await scene?.ready;
  const reveal=gsap.timeline();
  reveal.to(curtain,{opacity:0,duration:.28,ease:'power2.out'});
  if(route==='/'){
   reveal.fromTo('.presence-line>span',{yPercent:115},{yPercent:0,duration:.85,stagger:.08,ease:'power4.out'},.12);
   reveal.fromTo('.topline>*',{y:15,opacity:0},{y:0,opacity:1,duration:.6,stagger:.045,ease:'power3.out'},.15);
  }
  await reveal;gsap.set(curtain,{visibility:'hidden'});
 }
 main.inert=false;lenis.start();
 if(route==='/'&&pendingChapter!==null){homeController?.go(pendingChapter,lenis);pendingChapter=null;}
 transitioning=false;if((location.hash.slice(1)||'/')!==route)navigate();
}
window.addEventListener('hashchange',navigate);
document.addEventListener('click',e=>{
 const chapterLink=e.target.closest('[data-chapter-link]');if(chapterLink){if(route==='/')homeController?.go(Number(chapterLink.dataset.chapterLink),lenis);else{pendingChapter=Number(chapterLink.dataset.chapterLink);location.hash='/';}return;}
 const chapter=e.target.closest('[data-chapter-go]');if(chapter){homeController?.go(Number(chapter.dataset.chapterGo),lenis);return;}
 if(e.target.closest('.menu-toggle')){menuOpen?closeMenu(true):openMenu();return;}
 if(e.target===menu){closeMenu(true);return;}
 if(e.target.closest('[data-top]')){lenis.scrollTo(0,{immediate:reduced});return;}
 if(e.target.closest('.skip')){e.preventDefault();main.focus({preventScroll:true});return;}
 if(e.target.closest('[data-motion]')){reduced=!reduced;lenis.options.smoothWheel=!reduced;try{sessionStorage.setItem('quiet-motion',String(reduced));}catch{};document.querySelector('[data-motion]').setAttribute('aria-pressed',String(!reduced));document.querySelector('[data-motion]').textContent=`Motion ${reduced?'off':'on'}`;closeMenu();draw();return;}
 const a=e.target.closest('a[href^="#/"]');if(a&&a.hash===(location.hash||'#/')){e.preventDefault();closeMenu();lenis.scrollTo(0,{immediate:reduced});}
});
document.addEventListener('keydown',e=>{
 if(!menuOpen)return;
 if(e.key==='Escape'){e.preventDefault();closeMenu(true);}
 if(e.key==='Tab'){
  const elements=[...menu.querySelectorAll('a,button'),toggle],i=elements.indexOf(document.activeElement);
  if(e.shiftKey&&i===0){e.preventDefault();elements.at(-1).focus();}else if(!e.shiftKey&&i===elements.length-1){e.preventDefault();elements[0].focus();}
 }
});
document.querySelector('[data-motion]').setAttribute('aria-pressed',String(!reduced));document.querySelector('[data-motion]').textContent=`Motion ${reduced?'off':'on'}`;
const clock=document.querySelector('.header-clock time');
function updateClock(){clock.textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date());}
updateClock();setInterval(updateClock,1000);
draw();
async function playEntrance(){
 let cover=document.querySelector('.entry-cover');if(!cover){document.body.insertAdjacentHTML('beforeend',entranceTemplate);cover=document.querySelector('.entry-cover');}
 const topline=document.querySelector('.topline'),dock=document.querySelector('.dock');
 let completed=false,entry,bailout;
 const done=()=>{if(completed)return;completed=true;window.__portfolioBootReady?.();document.body.classList.add('ready');cover.remove();main.inert=false;topline.inert=false;dock.inert=false;lenis.start();if(route==='/')gsap.set('.topline>*,.presence-line>span,.presence-alias,.presence-cta,.presence-discover,.presence-caption',{clearProps:'transform,opacity'});};
 main.inert=true;topline.inert=true;dock.inert=true;lenis.stop();document.body.classList.remove('ready');
 try{
  await Promise.race([Promise.all([document.fonts.ready,scene?.ready||Promise.resolve()]),new Promise(resolve=>setTimeout(resolve,2500))]);
  if(reduced){done();return;}
  const glyphs=[...cover.querySelectorAll('.entry-glyph>span')];
  const eye=cover.querySelector('.entry-eye'),identity=cover.querySelector('.entry-identity');
  const imageReady=eye.decode?.().catch(()=>{});
  await Promise.race([imageReady||Promise.resolve(),new Promise(resolve=>setTimeout(resolve,700))]);
  gsap.set(cover,{'--cut-w':'0vw','--cut-h':'0vh'});
  gsap.set(cover.querySelectorAll('.entry-shutter'),{yPercent:0});
  gsap.set(identity,{opacity:1,y:0});
  entry=gsap.timeline({onComplete:done});
  const scatterY=[-.12,.1,-.06,.15,-.11,.04,.11,-.08],scatterRotation=[-14,9,-7,12,-11,5,15,-9];
  const eyeBounds=eye.getBoundingClientRect();
  entry.fromTo('.entry-meta,.entry-colophon',{opacity:0},{opacity:1,duration:.3,ease:'none'},0)
   .fromTo(eye,{opacity:0,scale:1.5,rotation:-18,clipPath:'inset(44% 0 44% 0)'},{opacity:1,scale:1,rotation:-6,clipPath:'inset(0% 0 0% 0)',duration:.55,ease:'power4.out'},.05)
   .fromTo(glyphs,{opacity:0,x:i=>(i-3.5)*innerWidth*.022,y:i=>scatterY[i]*innerHeight,rotation:i=>scatterRotation[i],scaleX:i=>i%2?.75:1.2},{opacity:1,duration:.15,stagger:{each:.055,from:'random'},ease:'none'},.12)
   .to(glyphs,{x:0,y:0,rotation:0,scaleX:1,duration:.65,stagger:.025,ease:'power4.inOut'},.58)
   .fromTo(cover.querySelector('.entry-logo>sup'),{opacity:0},{opacity:1,duration:.2},1.0)
   .fromTo('.entry-tagline',{opacity:0},{opacity:1,duration:.25},1.1)
   .to(glyphs,{x:i=>(i-3.5)*innerWidth*.12,y:i=>i%2?innerHeight*.06:-innerHeight*.05,rotation:i=>i%2?7:-7,duration:1.1,stagger:.018,ease:'power4.inOut'},1.6)
   .to(eye,{x:innerWidth*.5-eyeBounds.left-eyeBounds.width*.5,y:innerHeight*.5-eyeBounds.top-eyeBounds.height*.5,scale:.8,rotation:0,duration:.8,ease:'power4.inOut'},1.5)
   .to(identity,{opacity:0,duration:.3},2.45)
   .to('.entry-meta,.entry-colophon',{opacity:0,duration:.2},1.9)
   .to(cover,{'--cut-w':innerWidth<=700?'48vw':'24vw','--cut-h':innerWidth<=700?'28vh':'32vh',duration:.75,ease:'power3.inOut'},2.05)
   .to(cover,{'--cut-w':'100vw','--cut-h':'100vh',duration:1.15,ease:'power4.inOut'},2.75);
  if(route==='/'){
   entry.fromTo('.topline>*',{opacity:0,y:12},{opacity:1,y:0,duration:.55,stagger:.04,ease:'power3.out'},3.05);
   entry.fromTo('.presence-line>span',{yPercent:110},{yPercent:0,duration:.7,stagger:.07,ease:'power3.out'},2.8);
   entry.fromTo('.presence-alias,.presence-cta,.presence-discover,.presence-caption',{opacity:0},{opacity:1,duration:.5,stagger:.04,ease:'power2.out'},3.0);
  }
  // The critical cover is released only after CSS, assets and the first animation frame are prepared.
  window.__portfolioBootReady?.();
  await Promise.race([entry,new Promise(resolve=>{bailout=setTimeout(resolve,6500);})]);
 }finally{clearTimeout(bailout);entry?.kill();done();}
}
transitioning=true;playEntrance().then(()=>{transitioning=false;if((location.hash.slice(1)||'/')!==route)navigate();});
