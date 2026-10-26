export const chapters=['Introduction','The person','The approach','A conversation'];
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t);};
export function homeMarkup(){return `<div class="home-score"><div class="home-stage"><canvas class="print-scene" aria-hidden="true"></canvas><div class="full-frame-fallback" aria-hidden="true"><div class="fallback-band"></div></div>
<section class="home-chapter opening" data-chapter="0" aria-label="Introduction">
<div class="presence-caption"><span>INDEPENDENT DEVELOPER</span><span>INTERFACES / INTERACTION / MOTION</span></div>
<div class="presence-copy"><i aria-hidden="true"></i><h1><span class="presence-line"><span>Alimzhan Galymzhan.</span></span><span class="presence-line"><span>Code with purpose.</span></span><span class="presence-line"><span>Interfaces with character.</span></span></h1><i aria-hidden="true"></i></div>
<p class="presence-alias">You can call me whynicky.</p>
<a class="presence-cta" href="#/contact"><span>Get in touch</span><span>↗</span></a>
<button class="presence-discover" data-chapter-go="1">Discover <span>↓</span></button>
</section>
</div>
<section class="home-essay" data-chapter="1" aria-labelledby="person-heading">
<div class="section-caption"><span>THE PERSON BEHIND THE INTERFACE</span><span>ALIMZHAN GALYMZHAN</span></div>
<div class="statement-frame"><i></i><i></i><i></i><i></i><h2 id="person-heading"><span>Curiosity, made useful.</span><span>Ideas, made tangible.</span><span>Interfaces, made human.</span></h2></div>
<div class="essay-bottom"><p>I’m Alimzhan, a frontend developer.<br>I bring design and code into the same conversation.</p><a class="underlink" href="#/about">A little about me <span>↗</span></a></div>
</section>
<section class="home-method" data-chapter="2" aria-labelledby="method-heading">
<div class="section-caption"><span>FRONTEND / APPLICATION DEVELOPMENT</span><a href="#/about">Experience & education ↗</a></div>
<div class="method-overview"><h2 id="method-heading">Development.</h2><p>Web and mobile interfaces,<br>API integration and application logic.</p></div>
<div class="method-records">
<article class="method-record"><span class="method-context">Web & mobile</span><h3>Interface<br>development</h3><div><p>Interfaces built with React, Vue and Flutter. Layout, application states and separate flows for different user roles.</p><span class="method-tools">React · Vue · Flutter</span></div></article>
<article class="method-record"><span class="method-context">Data & behavior</span><h3>Product logic</h3><div><p>REST API integration, authentication and notifications. Connecting the interface to the data and permissions behind it.</p><span class="method-tools">REST APIs · FastAPI · PostgreSQL</span></div></article>
<article class="method-record"><span class="method-context">Implementation</span><h3>Delivery</h3><div><p>Debugging user flows, writing automated tests and managing day-to-day changes through Git.</p><span class="method-tools">Git · Testing · Debugging</span></div></article>
</div>
</section>
<section class="home-note" data-chapter="3" aria-labelledby="note-heading"><div class="note-label">A SMALL NOTE BEFORE YOU GO</div><h2 id="note-heading">Good work starts<br>with a <a href="#/contact">conversation<span>↗</span></a>.</h2><p>A project, a question, or an idea that won’t leave you alone.</p><a class="underlink" href="#/contact">Let’s hear it <span>↗</span></a></section></div>`;}
export function mountHome({gsap,ScrollTrigger,reduced,onProgress}){
 const root=document.querySelector('.home-score'),sections=[...root.querySelectorAll('[data-chapter]')],method=root.querySelector('.home-method');
 const triggers=[],tweens=[];
 const state=()=>{document.body.classList.toggle('past-hero',scrollY>innerHeight*.15);onProgress(0);};
 triggers.push(ScrollTrigger.create({trigger:root,start:'top top',end:'bottom bottom',onUpdate:state}));state();
 if(!reduced){
  const lines=root.querySelectorAll('.statement-frame h2>span');
  lines.forEach((line,i)=>tweens.push(gsap.fromTo(line,{opacity:.18,y:28},{opacity:1,y:0,ease:'none',scrollTrigger:{trigger:line,start:'top 82%',end:'top 53%',scrub:.6}})));
  method.querySelectorAll('.method-record').forEach(row=>tweens.push(gsap.fromTo(row.children,{y:16,opacity:0},{y:0,opacity:1,duration:.7,stagger:.055,ease:'power3.out',scrollTrigger:{trigger:row,start:'top 88%',once:true}})));
  tweens.push(gsap.fromTo('.home-note h2',{y:50,opacity:.2},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:'.home-note',start:'top 85%',end:'top 35%',scrub:.5}}));
 }
 return{go(i,lenis){lenis.scrollTo(sections[i],{duration:1.25,immediate:reduced});},destroy(){triggers.forEach(t=>t.kill());tweens.forEach(t=>{t.scrollTrigger?.kill();t.kill();});}};
}
