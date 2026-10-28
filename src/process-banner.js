export function mountProcessBanner({reduced}){
 const banner=document.querySelector('.process-kinetic');if(!banner)return()=>{};
 const toggle=banner.parentElement.querySelector('.kinetic-toggle');let paused=false,visible=false;
 const update=()=>{banner.dataset.running=String(visible&&!paused&&!reduced);toggle.innerHTML=paused?'<span aria-hidden="true">▷</span> Play motion':'<span aria-hidden="true">Ⅱ</span> Pause motion';toggle.setAttribute('aria-label',paused?'Play banner animation':'Pause banner animation');};
 const click=()=>{paused=!paused;update();};toggle.addEventListener('click',click);toggle.hidden=reduced;
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{threshold:.05});observer.observe(banner);update();
 return()=>{observer.disconnect();toggle.removeEventListener('click',click);};
}
