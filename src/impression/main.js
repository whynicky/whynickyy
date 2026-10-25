import {beats,clamp,smooth} from './timeline.js';
const root=document.documentElement,canvas=document.querySelector('#artwork'),controller=new AbortController(),{signal}=controller;
const system=matchMedia('(prefers-reduced-motion: reduce)');let saved=null;try{saved=localStorage.getItem('whynicky-impression-motion');}catch{}
const reduced=saved==='still'||(saved!=='motion'&&system.matches);const toggle=document.querySelector('.motion-toggle');toggle.hidden=false;toggle.textContent=reduced?'Enable motion':'Still edition';toggle.setAttribute('aria-pressed',String(reduced));
toggle.addEventListener('click',()=>{try{localStorage.setItem('whynicky-impression-motion',reduced?'motion':'still');}catch{}location.reload();});
let experience=null,disposed=false,current=-1;const track=document.querySelector('.scroll-track'),nav=[...document.querySelectorAll('.act-nav a')],assembly=document.querySelector('.exposure-ui'),final=document.querySelector('.exit-ui');
function ui(p,pose){document.querySelector('.progress-track span').style.transform=`scaleX(${p})`;document.querySelector('.arrival-hint').style.opacity=1-smooth(.025,.08,p);
 const values=[smooth(.485,.515,p)*(1-smooth(.575,.61,p)),smooth(.94,.975,p)];[assembly,final].forEach((el,i)=>{el.style.opacity=values[i];el.classList.toggle('is-active',values[i]>.5);el.inert=values[i]<.5;});
 const i=p<.075?0:p<.18?1:p<.32?2:p<.475?3:p<.6?4:p<.77?5:p<.93?6:7;
 if(i!==current){current=i;nav.forEach((el,k)=>k===i?el.setAttribute('aria-current','step'):el.removeAttribute('aria-current'));document.querySelector('.scene-name').textContent=beats[i].name;document.querySelector('.folio').textContent=`0${i+1} — 08`;}
}
function fallback(message='Still edition. The typographic artwork and the original portfolio remain available.'){
 experience?.dispose();experience=null;root.classList.remove('is-live','is-loading');root.classList.add('is-static');document.querySelector('.loading').classList.add('is-hidden');document.querySelector('#experience-status').textContent=message;document.querySelector('.skip').href='#static-exit';document.querySelector('.signature').href='#experience';
 if(location.hash==='#exit')document.querySelector('#static-exit').scrollIntoView();
}
const scroll=()=>experience?.setProgress(clamp(scrollY/Math.max(1,track.offsetHeight-innerHeight)));
window.addEventListener('scroll',scroll,{signal,passive:true});window.addEventListener('resize',scroll,{signal,passive:true});
document.querySelector('.replay').addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});document.querySelector('.signature').focus({preventScroll:true});},{signal});
document.querySelector('.skip-intro').addEventListener('click',()=>{controller.abort();fallback();},{signal});
async function start(){if(reduced){fallback();return;}root.classList.add('is-loading');document.querySelector('.loading').classList.remove('is-hidden');const timeout=setTimeout(()=>{controller.abort();fallback('The animated edition could not load. Showing the still publication.');},15000);
 try{const {mountExperience}=await import('./scene.js');experience=await mountExperience(canvas,{signal,onFrame:ui,onUnavailable:()=>fallback('WebGL is unavailable. Showing the still publication.'),onNegative:value=>{const b=document.querySelector('.impression-toggle');b.setAttribute('aria-pressed',String(value>.5));b.innerHTML=value>.5?'Restore the impression <span aria-hidden="true">↔</span>':'Invert the impression <span aria-hidden="true">↔</span>';}});
 if(disposed||signal.aborted){experience?.dispose();return;}if(!experience){fallback();return;}root.classList.remove('is-static','is-loading');root.classList.add('is-live');document.querySelector('.loading').classList.add('is-hidden');
 const id=location.hash.slice(1);if(beats.some(b=>b.id===id))document.getElementById(id).scrollIntoView({behavior:'instant'});scroll();
 }catch(e){fallback();console.warn('Still publication enabled:',e.message);}finally{clearTimeout(timeout);}}
window.addEventListener('pagehide',e=>{if(!e.persisted){disposed=true;controller.abort();experience?.dispose();}},{once:true});system.addEventListener('change',()=>{if(!saved)location.reload();},{signal});start();
