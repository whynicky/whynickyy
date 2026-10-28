import {assetUrl} from './asset-url.js';
export const chapters=['Introduction','The person','The approach','A conversation'];
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t);};
export function homeMarkup(){return `<div class="home-score"><div class="home-aperture"><div class="home-stage"><canvas class="print-scene" aria-hidden="true"></canvas><div class="full-frame-fallback" aria-hidden="true"><div class="fallback-band"><img src="${assetUrl('images/presence-faceless-v2.png')}" alt="" width="1536" height="1024"><img class="fallback-surface" src="${assetUrl('images/presence-faceless-v2.png')}" alt="" width="1536" height="1024"></div></div>
<section class="home-chapter opening" data-chapter="0" aria-label="Introduction">
<div class="presence-caption"><span>INDEPENDENT DEVELOPER</span><span>INTERFACES / INTERACTION / MOTION</span></div>
<div class="presence-copy"><i aria-hidden="true"></i><h1><span class="presence-line"><span>Alimzhan Galymzhan.</span></span><span class="presence-line"><span>Code with purpose.</span></span><span class="presence-line"><span>Interfaces with character.</span></span></h1><i aria-hidden="true"></i></div>
<p class="presence-alias">You can call me whynicky.</p>
<a class="presence-cta" href="#/contact"><span>Get in touch</span></a>
<button class="presence-discover" data-chapter-go="1">Discover <span>↓</span></button>
</section><div class="hero-shutter shutter-top" aria-hidden="true"></div><div class="hero-shutter shutter-bottom" aria-hidden="true"></div><div class="hero-afterimage" aria-hidden="true"><span>THERE’S</span><span>ANOTHER</span><span>SIDE.</span><img src="${assetUrl('images/eye-mark-white.png')}" alt=""></div>
</div></div>
<section class="home-essay" data-chapter="1" aria-labelledby="person-heading">
<div class="home-section-meta"><span>( 01 - THE PERSON )</span><span>ALIMZHAN GALYMZHAN / WHYNICKY</span></div>
<div class="home-person-spread"><div class="home-person-art"><div class="home-portrait-disc"><img src="${assetUrl('images/github-avatar.jpg')}" alt="Alimzhan’s GitHub avatar" loading="lazy"></div><span class="home-art-caption">CURIOUS<br>BY NATURE.</span></div><div class="home-person-copy"><h2 id="person-heading">A LITTLE<br>CURIOUS.<br>A LITTLE<br><span>UNUSUAL.</span></h2><p>I’m Alimzhan. I build web and mobile interfaces, and care just as much about how they feel as how they work.</p><a class="home-text-link" href="#/about">Meet the person </a></div></div>
<div class="home-person-notes"><span>BASED IN KAZAKHSTAN</span><p>Design and development.<br>Two ways of asking the same question:<br>what could this become?</p><a href="${assetUrl('documents/Alimzhan-Galymzhan-CV.pdf')}" target="_blank" rel="noopener">Experience on paper ↗</a></div>
</section>
<section class="home-method" data-chapter="2" aria-labelledby="method-heading">
<div class="home-section-meta"><span>( 02 - THE PRACTICE )</span><a href="#/process">Inside the process</a></div>
<div class="home-practice-heading"><h2 id="method-heading">THOUGHT<br>INTO <span>FORM.</span></h2><p>From the first question<br>to the final interaction.<br>Here’s where I get involved.</p></div>
<div class="home-practice-list">
<article class="home-practice-row"><span class="practice-no">( 01 )</span><h3>INTERFACES</h3><p>Web & mobile.<br>Responsive, considered, alive.</p><span class="practice-tools">REACT / VUE / FLUTTER</span></article>
<article class="home-practice-row"><span class="practice-no">( 02 )</span><h3>CONNECTIONS</h3><p>Data, roles and flows.<br>The logic behind the surface.</p><span class="practice-tools">REST API / FASTAPI / POSTGRESQL</span></article>
<article class="home-practice-row"><span class="practice-no">( 03 )</span><h3>EXPLORATION</h3><p>Learning through building.<br>New questions, better answers.</p><span class="practice-tools">EXPERIMENTS / HACKATHONS / STUDY</span></article>
</div></section>
<section class="home-note" data-chapter="3" aria-labelledby="note-heading"><div class="home-section-meta"><span>( 03 - YOUR TURN )</span><span>AN IDEA IS ENOUGH TO START.</span></div><div class="home-conversation"><h2 id="note-heading"><span>WHAT’S</span><span>ON YOUR</span><span>MIND?</span></h2></div><div class="home-note-bottom"><p>A project. A question.<br>Something that doesn’t fit a brief yet.</p><a class="home-text-link" href="#/contact">Let’s talk </a></div></section></div>`;}
export function mountHome({gsap,ScrollTrigger,reduced,onProgress}){
 const root=document.querySelector('.home-score'),sections=[...root.querySelectorAll('[data-chapter]')];
 const animations=[];
 const state=()=>{document.body.classList.toggle('past-hero',scrollY>innerHeight*.15);onProgress(0);};
 const tracker=ScrollTrigger.create({trigger:root,start:'top top',end:'bottom bottom',onUpdate:state});state();
 if(!reduced){
  const fold=gsap.timeline({scrollTrigger:{trigger:root.querySelector('.home-aperture'),start:'top top',end:'bottom bottom',scrub:.65,onUpdate:self=>{root.querySelector('.opening').inert=self.progress>.4;}}});
  fold.to('.hero-shutter',{scaleY:1,ease:'none',duration:1},0).to('.opening',{opacity:0,ease:'none',duration:.35},0).fromTo('.hero-afterimage',{opacity:0},{opacity:1,duration:.3},.55).fromTo('.hero-afterimage>span',{xPercent:i=>i%2?15:-15},{xPercent:0,duration:.6,ease:'power2.out'},.4);
  animations.push(fold);
  root.querySelectorAll('.home-person-copy h2,.home-practice-heading h2,.home-conversation h2').forEach(el=>animations.push(gsap.fromTo(el,{y:45},{y:0,ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 45%',scrub:.5}})));
  animations.push(gsap.fromTo('.home-portrait-disc',{rotation:-12},{rotation:9,ease:'none',scrollTrigger:{trigger:'.home-person-spread',start:'top bottom',end:'bottom top',scrub:.8}}));
  root.querySelectorAll('.home-practice-row').forEach(el=>animations.push(gsap.fromTo(el,{'--rule-scale':0},{'--rule-scale':1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}})));
 }
 return{go(i,lenis){lenis.scrollTo(sections[i],{duration:1.25,immediate:reduced});},destroy(){tracker.kill();animations.forEach(t=>{t.scrollTrigger?.kill();t.revert();});}};
}
