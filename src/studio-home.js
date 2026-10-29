import {assetUrl} from './asset-url.js';
export const chapters=['Introduction','The person','The approach','A conversation'];
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t);};
export function homeMarkup(){return `<div class="home-score"><div class="home-aperture"><div class="home-stage"><canvas class="print-scene" aria-hidden="true"></canvas><div class="full-frame-fallback" aria-hidden="true"><div class="fallback-band"><img src="${assetUrl('images/presence-faceless-v2.png')}" alt="" width="1536" height="1024"><img class="fallback-surface" src="${assetUrl('images/presence-faceless-v2.png')}" alt="" width="1536" height="1024"></div></div>
<section class="home-chapter opening" data-chapter="0" aria-label="Introduction">

<div class="presence-copy"><i aria-hidden="true"></i><h1><span class="presence-line"><span>whynicky.</span></span><span class="presence-line"><span>Frontend developer.</span></span><span class="presence-line"><span>Web & mobile applications.</span></span></h1><i aria-hidden="true"></i></div>

<a class="presence-cta" href="#/contact"><span>Get in touch</span></a>
<button class="presence-discover" data-chapter-go="1">Discover </button>
</section><div class="hero-shutter shutter-top" aria-hidden="true"></div><div class="hero-shutter shutter-bottom" aria-hidden="true"></div><div class="hero-afterimage" aria-hidden="true"><span>MEET</span><span>THE</span><span>DEVELOPER.</span><img src="${assetUrl('images/eye-mark-white.png')}" alt=""></div>
</div></div>
<section class="home-essay" data-chapter="1" aria-labelledby="person-heading">

<div class="home-person-spread"><div class="home-person-art"><div class="home-portrait-disc"><img src="${assetUrl('images/github-avatar.jpg')}" alt="whynicky’s GitHub avatar" loading="lazy"></div></div><div class="home-person-copy"><h2 id="person-heading">WEB &<br>MOBILE<br><span>DEVELOPER.</span></h2><p>I turn designs into responsive pages and build the components behind forms, navigation and application screens. I work with React, Next.js and Vue for the web, and Flutter for mobile apps.</p><a class="home-text-link" href="#/about">About me</a></div></div>
<div class="home-person-notes"><p>Information Systems & Management.<br>Dual-degree studies: Kazakh & American diplomas.</p><a href="${assetUrl('documents/whynicky-CV.pdf')}" target="_blank" rel="noopener">View résumé </a></div>
</section>
<section class="home-method" data-chapter="2" aria-labelledby="method-heading">
<div class="home-section-meta"><a href="#/process">Inside the process</a></div>
<div class="home-practice-heading"><h2 id="method-heading">WHAT<br>I <span>BUILD.</span></h2><p>Responsive interfaces,<br>reusable components<br>and interaction.</p></div>
<div class="home-practice-list">
<article class="home-practice-row"><h3>LAYOUTS</h3><p>I translate designs into responsive pages with semantic HTML, CSS Grid and Flexbox. I adapt spacing, typography and navigation for desktop and mobile, including screens between the main breakpoints.</p></article>
<article class="home-practice-row"><h3>COMPONENTS</h3><p>I build reusable forms, menus, dialogs and application screens. That includes validation, selected and disabled states, loading feedback, empty results and errors - the parts a static layout doesn’t show.</p></article>
<article class="home-practice-row"><h3>MOTION</h3><p>I use CSS and GSAP for interface feedback, page transitions and scroll animation. I account for touch input and reduced-motion preferences, so essential content stays accessible without the effects.</p></article>
<article class="home-practice-row"><h3>TESTING</h3><p>I check navigation, forms and key user flows across screen sizes. I look for clipped content, missing states and keyboard issues, debug the frontend and use automated tests where they help verify behaviour.</p></article>
</div>
<section class="home-proof" aria-labelledby="home-proof-heading"><div><h3 id="home-proof-heading">Where I’ve <br>used this.</h3></div><article><a href="#/work/soyle">Söyle</a><p>Child and parent interfaces for a speech-practice product. The frontend connects practice activities, goals and progress into separate user flows.</p></article><article><a href="#/work/chatra-mobile">Chatra mobile</a><p>A Flutter client for students and teachers, including classroom screens, sign-in, messages and notifications. Adapting the product for mobile meant working with touch input and role-based navigation.</p></article></section>
</section>
<section class="home-note" data-chapter="3" aria-labelledby="note-heading"><div class="home-conversation"><h2 id="note-heading"><span>WHAT’S</span><span>ON YOUR</span><span>MIND?</span></h2></div><div class="home-note-bottom"><p>Send a project description,<br>existing designs and your preferred timeline.</p><a class="home-text-link" href="#/contact">Contact me</a></div></section></div>`;}
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
