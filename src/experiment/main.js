import { gsap } from 'gsap';
const root=document.documentElement,canvas=document.querySelector('#artwork');
const system=matchMedia('(prefers-reduced-motion: reduce)');
let saved=null;try{saved=localStorage.getItem('whynicky-experiment-motion');}catch{}
const reduced=saved==='still'||(saved!=='motion'&&system.matches);
const toggle=document.querySelector('.motion-toggle');toggle.hidden=false;toggle.textContent=reduced?'Enable motion':'Still mode';toggle.setAttribute('aria-pressed',String(reduced));
toggle.addEventListener('click',()=>{try{localStorage.setItem('whynicky-experiment-motion',reduced?'motion':'still');}catch{}location.reload();});
const controller=new AbortController(),{signal}=controller;
let scene=null,skip=false,disposed=false,currentAct=-1;
const layers=['opening','split','void','touch','exit'].map(n=>document.querySelector(`.${n}-copy`));
const nav=[...document.querySelectorAll('.act-nav a')],names=['Identity','Beneath the surface','Afterimage','Tension','Exit'];
const clamp=x=>Math.max(0,Math.min(1,x));const smooth=(a,b,p)=>{const x=clamp((p-a)/(b-a));return x*x*(3-2*x);};
const windowed=(a,b,c,d,p)=>smooth(a,b,p)*(1-smooth(c,d,p));
function renderUI(p){
  const visibility=[1-smooth(.04,.13,p),windowed(.15,.2,.28,.34,p),windowed(.37,.43,.51,.58,p),windowed(.58,.64,.82,.88,p),smooth(.89,.95,p)];
  layers.forEach((layer,i)=>{layer.style.opacity=visibility[i];layer.classList.toggle('is-active',visibility[i]>.6);layer.inert=visibility[i]<.6;});
  layers[0].style.transform=`translateY(${-p*140}px)`;
  layers[1].style.clipPath=`inset(0 ${100*(1-visibility[1])}% 0 0)`;
  const left=layers[2].children[0],right=layers[2].children[1];
  left.style.transform=`translateX(${(p-.46)*-180}vw)`;right.style.transform=`translateX(${(p-.46)*180}vw)`;
  document.querySelector('.progress-track span').style.transform=`scaleX(${p})`;
  const act=p<.16?0:p<.35?1:p<.58?2:p<.89?3:4;
  if(act!==currentAct){currentAct=act;nav.forEach((link,i)=>i===act?link.setAttribute('aria-current','step'):link.removeAttribute('aria-current'));document.querySelector('.scene-name').textContent=names[act];document.querySelector('.scroll-instruction').innerHTML=act===3?'Move. Hold. Transform.':act===4?'The work continues ↗':'Scroll to unfold <span aria-hidden="true">↓</span>';}
}
function fallback(message='Still mode. The photographic artwork and portfolio link remain available.'){
  root.classList.remove('is-live','is-loading');root.classList.add('is-static');document.querySelector('.loading').classList.add('is-hidden');
  scene?.dispose();scene=null;document.querySelector('#experience-status').textContent=message;
  const exit=document.querySelector('.static-art>a');exit.id='static-exit';document.querySelector('.skip').href='#static-exit';document.querySelector('.signature').href='#experience';
}
const track=document.querySelector('.scroll-track');
function updateScroll(){scene?.setProgress(clamp(scrollY/Math.max(1,track.offsetHeight-innerHeight)));}
window.addEventListener('scroll',updateScroll,{signal,passive:true});window.addEventListener('resize',updateScroll,{signal,passive:true});
document.querySelector('#tension').addEventListener('input',e=>scene?.setTension(Number(e.target.value)/100),{signal});
document.querySelector('.negative-toggle').addEventListener('click',e=>{const button=e.currentTarget;const active=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(active));button.innerHTML=active?'Restore print <span aria-hidden="true">↗</span>':'Reveal negative <span aria-hidden="true">↗</span>';scene?.setNegative(active);},{signal});
document.querySelector('.replay').addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});document.querySelector('.signature').focus({preventScroll:true});},{signal});
document.querySelector('.skip-intro').addEventListener('click',()=>{skip=true;scene?.skipIntro();gsap.set('.loading',{opacity:0});document.querySelector('.loading').classList.add('is-hidden');},{signal});
async function start(){
  if(reduced){fallback();return;}
  root.classList.add('is-loading');
  const timeout=setTimeout(()=>{controller.abort();fallback('The animated scene could not load. Showing the photographic artwork.');},12000);
  try{
    const {mountExperiment}=await import('./scene.js');
    scene=await mountExperiment(canvas,{signal,onFrame:renderUI,onUnavailable:()=>fallback('WebGL is unavailable. Showing the photographic artwork.')});
    if(disposed||signal.aborted){scene?.dispose();return;}
    if(!scene){fallback();return;}
    root.classList.remove('is-static','is-loading');root.classList.add('is-live');
    const destination=document.querySelector('.scroll-track '+(location.hash&&/^#[a-z]+$/.test(location.hash)?location.hash:'#identity'));if(location.hash&&destination)destination.scrollIntoView({behavior:'instant'});
    updateScroll();if(skip)scene.skipIntro();
    gsap.to('.loading',{opacity:0,duration:skip?0:.75,ease:'power2.inOut',onComplete:()=>document.querySelector('.loading').classList.add('is-hidden')});
  }catch(error){fallback('WebGL is unavailable. Showing the photographic artwork.');console.warn('Afterimage: static artwork enabled.',error);}
  finally{clearTimeout(timeout);}
}
window.addEventListener('pagehide',e=>{if(e.persisted)return;disposed=true;controller.abort();scene?.dispose();gsap.killTweensOf('.loading');},{once:true});
system.addEventListener('change',()=>{if(!saved)location.reload();},{signal});
start();
