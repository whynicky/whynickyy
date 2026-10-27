import {assetUrl} from './asset-url.js';
export const certificates=[
 {name:'CyberShield',kind:'Competition',date:'29 April 2026',file:'cybershield.jpg',description:'Participation in CyberShield 2026. An opportunity to work through a new challenge alongside other participants.'},
 {name:'Digital Urpaq',kind:'II degree team diploma',date:'2026',file:'digital-urpaq.jpg',description:'A second-degree team diploma at Digital Urpaq, connected to the competition-built education platform.'},
 {name:'Scientific conference',kind:'Academic participation',date:'2026',file:'conference.jpg',description:'Participation in a scientific and practical conference, alongside university studies and independent development.'},
 {name:'Neural networks',kind:'AI Center · Course completion',date:'Kozybayev University',file:'neural-networks.jpg',description:'Completion of the AI Center course in neural network development and integration at Kozybayev University.'},
 {name:'HackAlem AI',kind:'Hackathon participation',date:'14 October 2026',file:'hackalem.jpg',description:'Participation in the Agentic AI Hackathon. Another setting for exploring ideas, collaboration, and practical implementation.'}
];
const words=text=>text.split(' ').map(w=>`<span class="reveal-word">${w}</span>`).join(' ');
const mast=(label,section,name)=>`<div class="editorial-masthead"><a href="#/" class="editorial-signature">${label}<br><span>whynicky®</span></a><span>◢ ${section}</span><span>◣ ${name}</span></div>`;
const experience=(period,title,subtitle,description,style)=>`<article class="experience-entry experience-${style}" data-reveal><div class="experience-date"><i aria-hidden="true"></i>${period}</div><h3>${title}</h3><div class="experience-detail"><h4>${subtitle}</h4><p>${description}</p></div></article>`;
const certificateMarkup=()=>`<section class="certificate-section" id="certificates"><div class="editorial-section-label"><span>Certificates & recognition</span><span>03 / Five milestones</span></div><h2 class="editorial-section-title" data-reveal>Proof of progress.</h2>
<div class="certificate-archive"><nav class="certificate-index" aria-label="Choose a certificate">${certificates.map((c,i)=>`<button data-certificate="${i}" aria-pressed="${i===0}"><small>0${i+1}</small><span>${c.name}<em>${c.kind}</em></span></button>`).join('')}</nav>
<figure class="certificate-preview"><button class="certificate-open" aria-label="Enlarge CyberShield certificate"><img src="${assetUrl('certificates/'+certificates[0].file)}" alt="CyberShield — original certificate" loading="lazy"></button><figcaption><span class="certificate-date">${certificates[0].date}</span><button class="certificate-open">View document ↗</button></figcaption></figure>
<div class="certificate-copy"><span class="certificate-count">01 / 05</span><h3>${certificates[0].name}</h3><p>${certificates[0].description}</p><div class="certificate-controls"><button data-certificate-step="-1" aria-label="Previous certificate">←</button><button data-certificate-step="1" aria-label="Next certificate">→</button></div></div></div></section>
<dialog class="document-dialog" aria-label="Certificate viewer"><div class="document-toolbar"><span class="document-name">CyberShield</span><button data-document-close aria-label="Close certificate">Close ×</button></div><img src="${assetUrl('certificates/cybershield.jpg')}" alt="CyberShield certificate"><div class="document-toolbar"><button data-document-step="-1" aria-label="Previous document">← Previous</button><a class="document-original" href="${assetUrl('certificates/cybershield.jpg')}" target="_blank" rel="noopener">Open original ↗</a><button data-document-step="1" aria-label="Next document">Next →</button></div></dialog>
`;
export function aboutMarkup(){return `<article class="editorial-page about-editorial">
${mast('The person behind<br>the interface.','About','Alimzhan Galymzhan')}
<h1 class="editorial-title" data-page-title>About whynicky.</h1>
<h2 class="editorial-manifesto" data-word-reveal>${words('I’m Alimzhan. I build thoughtful interfaces for the web and mobile, with care for the code behind them.')}</h2>
<p class="about-principle" data-reveal>Design and code belong in the same conversation. From a first flow to the last interaction, I care about how a product works and how it feels.</p>
<div class="about-context">
<section class="capability-list" aria-labelledby="capability-heading"><h2 id="capability-heading">What I work on</h2><ul><li>Web interfaces <span>React / Next.js</span></li><li>Mobile applications <span>Flutter</span></li><li>Product behaviour <span>APIs / Authentication</span></li><li>Quality & delivery <span>Testing / Git</span></li></ul></section>
<div class="about-biography" data-reveal><p>I’ve worked on frontend interfaces, co-founded Chatra and built its Flutter mobile client. That work involved more than screens: user roles, authentication, notifications and the connection between a mobile app and its backend.</p><p>With Söyle, I’m exploring a web experience for family speech practice. Separate child and parent flows and adaptive practice make the relationship between interface and product logic especially important.</p><p>Alongside independent development, I study Information Systems & Management in a dual-degree program at Kozybayev University and the University of Arizona. It connects my technical work with a broader view of how products and organisations function.</p><p>I keep learning through courses, competitions and building things. Design, code, music and ideas are the interests I return to — different ways to explore how something is put together and how it makes people feel.</p></div>
</div>
<section class="experience-section"><div class="editorial-section-label"><span>Experience</span><span>Building, learning, shipping</span><a href="${assetUrl('documents/Alimzhan-Galymzhan-CV.pdf')}" target="_blank" rel="noopener">Open résumé ↗</a></div><div class="experience-path">
${experience('Jun — Dec 2025','Frontend Developer','Interface development','Built interfaces and application features for a confidential product. Integrated REST APIs, worked on frontend logic, debugged user flows and managed day-to-day delivery through Git.','beginning')}
${experience('Dec 2025 — Sep 2026','Chatra','Co-founder & Mobile Application Developer','Owned the Flutter client and coordinated FastAPI/PostgreSQL delivery: roles, authentication, notifications and automated tests.','product')}
${experience('Independent','Söyle','Family speech practice · Web product','Child and parent flows, adaptive practice, and a typed interface built with Next.js, React and FastAPI.','independent')}
</div></section>
<section class="education-records" aria-labelledby="education-heading"><div class="editorial-section-label"><span id="education-heading">Education & learning</span><span>Alongside the work</span></div>
<div class="education-row" data-reveal><span>Current · Second year</span><h2>Information Systems<br>& Management</h2><p>Kozybayev University × University of Arizona.<br>A dual-degree program connecting technology and management.</p></div>
<div class="education-row" data-reveal><span>Courses & training</span><h2>Neural networks.<br>Python foundations.</h2><p>Completed the Kozybayev University AI Center course in neural network development and integration. Continuing to learn through CS50’s Introduction to Programming with Python.</p></div>
</section>
<section class="credentials-teaser" data-reveal><span>Certificates & recognition / 05</span><h2>Learning,<br>out in the world.</h2><div><p>CyberShield, Digital Urpaq, HackAlem AI, a scientific conference and neural network training. Five milestones, with the original documents.</p><a class="underlink" href="#/credentials">Explore credentials <span>↗</span></a></div></section>
<div class="reading-next"><a href="#/process">How I work <span>↗</span></a><a href="#/contact">Start a conversation <span>↗</span></a></div>
</article>`;}
export function contactMarkup(){return `<article class="editorial-page contact-editorial">
${mast('Connect or<br>start a conversation.','Contact','Alimzhan Galymzhan')}
<h1 class="editorial-title" data-page-title>Talk to whynicky.</h1>
<div class="direct-contacts" data-reveal><a href="mailto:alimzhanart@icloud.com"><small>Email</small><span>alimzhanart@icloud.com ↗</span></a><a href="https://t.me/whynickyy" target="_blank" rel="noopener"><small>Telegram</small><span>@whynickyy ↗</span></a><i></i><i></i><i></i></div>
<div class="contact-editorial-notes"><p data-reveal>Have something in mind?<br>Send the idea, who it’s for and what you need help with.</p><p data-reveal>A new interface, a mobile product or an existing flow that needs attention. Include any design, code or references you already have.</p><div data-reveal><p>Add your preferred timeline and the best way to reach you. We can work out the next step from there.</p><a href="https://github.com/whynicky" target="_blank" rel="noopener">Find my code on GitHub ↗</a></div></div>
<div class="contact-editorial-bottom"><span>ALIMZHAN GALYMZHAN / FRONTEND DEVELOPER</span><a href="#/work">Explore projects ↗</a><span>©2026</span></div>
</article>`;}
export function mountEditorial({gsap,ScrollTrigger,reduced,lenis}){
 const root=document.querySelector('.editorial-page');if(!root)return()=>{};
 const animations=[],maskedNodes=[],revealGroups=new Map(),rules=[];
 let layoutFrame;
 const updateLayout=()=>{cancelAnimationFrame(layoutFrame);layoutFrame=requestAnimationFrame(()=>{lenis.resize();ScrollTrigger.refresh();});};
 const jumpToStep=e=>{
  const link=e.target.closest('[data-process-step]');if(!link)return;
  const target=root.querySelector(`#process-step-${link.dataset.processStep}`);if(!target)return;
  e.preventDefault();
  lenis.scrollTo(target,{offset:-24,immediate:reduced,onComplete:()=>target.focus({preventScroll:true})});
 };
 root.addEventListener('click',jumpToStep);
 root.addEventListener('toggle',updateLayout,true);
 const detailed=root.matches('.about-editorial,.contact-editorial');
 let photoTween,disposeArchive=()=>{};
 const track=animation=>{animations.push(animation);return animation;};
 const maskWords=(element,className)=>{
  if(!element)return[];
  const nodes=[],walk=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);while(walk.nextNode())nodes.push(walk.currentNode);
  const targets=[];
  nodes.forEach(node=>{const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){fragment.append(document.createTextNode(word));return;}const mask=document.createElement('span'),inner=document.createElement('span');mask.className=className;inner.textContent=word;mask.append(inner);fragment.append(mask);maskedNodes.push(mask);targets.push(inner);});node.replaceWith(fragment);});
  return targets;
 };
 const revealGroup=(element,headings=[],secondary=[])=>{
  const tokens=headings.flatMap(heading=>maskWords(heading,'editorial-text-mask'));
  const timeline=track(gsap.timeline({scrollTrigger:{trigger:element,start:'top 90%',once:true}}));
  if(tokens.length)timeline.fromTo(tokens,{yPercent:112},{yPercent:0,duration:.75,stagger:{amount:.14},ease:'power4.out'},0);
  if(secondary.length)timeline.fromTo(secondary,{y:16,opacity:0},{y:0,opacity:1,duration:.65,stagger:.06,ease:'power3.out'},tokens.length?.12:0);
  revealGroups.set(element,timeline);return timeline;
 };
 if(detailed){
  root.querySelectorAll('.editorial-section-label,.experience-independent,.learning-section,.contact-editorial-bottom').forEach(el=>{
   el.classList.add('editorial-draw-rule');
   if(el.matches('.editorial-section-label'))el.classList.add('editorial-rule-bottom');
   if(el.matches('.experience-independent,.learning-section'))el.classList.add('editorial-rule-replaces-border');
   rules.push(el);
  });
 }
 if(!reduced){
  const title=root.querySelector('[data-page-title]');
  if(title)track(gsap.fromTo(maskWords(title,'heading-token'),{yPercent:115},{yPercent:0,duration:1,stagger:.07,ease:'power4.out',delay:.18}));
  track(gsap.fromTo(root.querySelectorAll('.editorial-masthead>*'),{y:14,opacity:0},{y:0,opacity:1,duration:.7,stagger:.06,ease:'power3.out',delay:.12}));
  root.querySelectorAll('[data-reveal]').forEach(el=>{
   if(!detailed){track(gsap.fromTo(el,{y:24,opacity:0},{y:0,opacity:1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));return;}
   if(el.matches('.experience-entry'))revealGroup(el,[el.querySelector('h3')],[el.querySelector('.experience-date'),el.querySelector('.experience-detail')]);
   else if(el.matches('.degree-spread'))revealGroup(el,[el.querySelector('h3')],[el.querySelector('.degree-status'),el.querySelector('.degree-detail')]);
   else if(el.matches('.learning-marginalia article'))revealGroup(el,[el.querySelector('h3')],[el.querySelector(':scope>span'),el.querySelector(':scope>p')]);
   else if(el.matches('.editorial-section-title'))revealGroup(el,[el]);
   else if(el.matches('.direct-contacts'))revealGroup(el,[...el.querySelectorAll('a>span')],[...el.querySelectorAll('a>small')]);
   else revealGroup(el,[],el.matches('.capabilities,.contact-editorial-notes>div')?[...el.children]:[el]);
  });
  // Keep the original manifesto treatment; later reading sections reveal once.
  root.querySelectorAll('[data-word-reveal]').forEach(el=>track(gsap.fromTo(el.querySelectorAll('.reveal-word'),{opacity:.2},{opacity:1,stagger:.05,ease:'none',scrollTrigger:{trigger:el,start:'top 85%',end:'bottom 60%',scrub:.5}})));
  if(detailed){
   root.querySelectorAll('.editorial-section-label,.contact-editorial-bottom').forEach(el=>revealGroup(el,[],[...el.children]));
   root.querySelectorAll('.certificate-archive>*').forEach(el=>revealGroup(el,[],[el]));
   rules.forEach(el=>track(gsap.fromTo(el,{'--editorial-rule-scale':0},{'--editorial-rule-scale':1,duration:.9,ease:'power3.inOut',scrollTrigger:{trigger:el,start:'top 91%',once:true}})));
  }
 }
 // Keyboard users never land on an unrevealed contact or certificate control.
 const revealFocused=e=>{for(const [element,animation] of revealGroups)if(element.contains(e.target))animation.progress(1);};
 root.addEventListener('focusin',revealFocused);
 const archive=root.querySelector('.certificate-archive');
 if(archive){
  let index=0;const dialog=root.querySelector('.document-dialog');
  const set=i=>{
   index=(i+certificates.length)%certificates.length;const c=certificates[index];
   archive.querySelectorAll('[data-certificate]').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===index)));
   const photo=archive.querySelector('.certificate-preview img');photo.src=assetUrl('certificates/'+c.file);photo.alt=c.name+' — original certificate';archive.querySelector('.certificate-preview>.certificate-open').setAttribute('aria-label',`Enlarge ${c.name} certificate`);
   archive.querySelector('.certificate-date').textContent=c.date;archive.querySelector('.certificate-count').textContent=`0${index+1} / 05`;archive.querySelector('.certificate-copy h3').textContent=c.name;archive.querySelector('.certificate-copy p').textContent=c.description;
   if(!reduced){photoTween?.kill();photoTween=gsap.fromTo(photo,{clipPath:'inset(0 0 100% 0)',y:15},{clipPath:'inset(0 0 0% 0)',y:0,duration:.55,ease:'power3.out',overwrite:true});}
   dialog.querySelector('img').src=assetUrl('certificates/'+c.file);dialog.querySelector('img').alt=c.name+' — original document';dialog.querySelector('.document-name').textContent=c.name+' / '+c.date;dialog.querySelector('.document-original').href=assetUrl('certificates/'+c.file);
  };
  const click=e=>{const choose=e.target.closest('[data-certificate]'),step=e.target.closest('[data-certificate-step]'),docStep=e.target.closest('[data-document-step]');if(choose)set(Number(choose.dataset.certificate));if(step)set(index+Number(step.dataset.certificateStep));if(docStep)set(index+Number(docStep.dataset.documentStep));if(e.target.closest('.certificate-open')){set(index);dialog.showModal();lenis.stop();}if(e.target.closest('[data-document-close]'))dialog.close();};
  const closed=()=>lenis.start();
  const key=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();set(index+(e.key==='ArrowRight'?1:-1));}};
  root.addEventListener('click',click);dialog.addEventListener('close',closed);dialog.addEventListener('keydown',key);
  disposeArchive=()=>{const wasOpen=dialog.open;dialog.removeEventListener('close',closed);dialog.removeEventListener('keydown',key);root.removeEventListener('click',click);if(wasOpen){dialog.close();lenis.start();}};
 }
 return()=>{
  cancelAnimationFrame(layoutFrame);root.removeEventListener('click',jumpToStep);root.removeEventListener('toggle',updateLayout,true);
  disposeArchive();photoTween?.kill();root.removeEventListener('focusin',revealFocused);
  animations.forEach(animation=>{animation.scrollTrigger?.kill();animation.revert();});
  maskedNodes.forEach(mask=>{if(mask.isConnected)mask.replaceWith(...mask.firstChild.childNodes);});
  rules.forEach(el=>{el.classList.remove('editorial-draw-rule','editorial-rule-bottom','editorial-rule-replaces-border');el.style.removeProperty('--editorial-rule-scale');});
 };
}

const processSteps=[
 ['Understand','Start with the person using it.','We clarify what the product needs to do, who it is for and what already exists. A brief, a rough idea or an existing interface gives us a starting point.','A shared goal and a defined scope.'],
 ['Plan','Make the important paths clear.','I map the screens, user roles, data and states before building. This is where we identify dependencies, technical constraints and the decisions that need to be made.','User flows and an implementation plan.'],
 ['Shape','Give the interface its structure.','Layout, typography, responsive behaviour and interaction come together. If you already have a design, I work from it and clarify the details that affect implementation.','A clear direction for the interface.'],
 ['Build','Connect the interface to the product.','I implement components, application logic and API integration. Authentication, permissions, loading and error states are part of the experience, not an afterthought.','A working interface to review.'],
 ['Refine','Test the paths, then the details.','I check the key flows, responsive layouts and keyboard interaction. We review the work together and refine the details that affect clarity, reliability and feel.','Reviewed flows and resolved issues.'],
 ['Deliver','Make the next step clear.','We agree how the work will be delivered, document the setup and review anything that remains. Deployment and any further work are scoped to the project.','A handover with a clear next step.']
];
const processQuestions=[
 ['What should I send first?','A short description of the idea, who it is for, any existing design or code, and your preferred timeline. References are useful; a polished brief is not required.'],
 ['Can you work with an existing design or product?','Yes. My work includes implementing interfaces, integrating APIs and debugging existing user flows. Send the current state and what you want to improve.'],
 ['Do you build for web or mobile?','Both. My web work includes React and Next.js; I built Chatra’s mobile client with Flutter. The choice depends on the product and its existing stack.'],
 ['How are scope and timing decided?','After reviewing the requirements and dependencies. The deliverables, milestones and review points should be agreed before implementation begins.']
];
export function processMarkup(){return `<article class="editorial-page process-editorial">
${mast('From the first question<br>to the last detail.','Process','How I work')}
<h1 class="editorial-title" data-page-title>From a first idea<br>to a working interface.</h1>
<nav class="process-index" aria-label="Project stages"><span>Steps / 06</span><div>${processSteps.map(([title],i)=>`<a href="#process-step-${i+1}" data-process-step="${i+1}"><small>0${i+1}</small>${title}<span aria-hidden="true">↓</span></a>`).join('')}</div></nav>
<div class="process-records">${processSteps.map(([title,line,body,result],i)=>`<section id="process-step-${i+1}" tabindex="-1"><span class="step-number">0${i+1}</span><h2 data-reveal>${title}.</h2><div class="step-description" data-reveal><h3>${line}</h3><p>${body}</p><div class="step-result"><span>Outcome</span><p>${result}</p></div></div></section>`).join('')}</div>
<section class="process-faq"><div class="faq-heading"><h2>Questions.</h2><span>04</span></div><div>${processQuestions.map(([question,answer])=>`<details><summary>${question}<span aria-hidden="true">+</span></summary><p>${answer}</p></details>`).join('')}</div></section>
<div class="reading-next"><a href="#/contact">Discuss your idea <span>↗</span></a><a href="mailto:alimzhanart@icloud.com">Send a brief <span>↗</span></a></div>
</article>`;}
export function credentialsMarkup(){return `<article class="editorial-page credentials-editorial">${mast('Learning, in public.','Credentials','Five milestones')}<h1 class="editorial-title" data-page-title>Proof of progress.</h1><p class="credentials-intro">Courses, competitions and a few steps forward.<br>Select a milestone to see the original document.</p>${certificateMarkup()}<div class="reading-next"><a href="#/about">Back to the person <span>↗</span></a><a href="#/contact">Start a conversation <span>↗</span></a></div></article>`;}
