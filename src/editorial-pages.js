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
export function aboutMarkup(){return `<article class="editorial-page about-editorial">
${mast('The person behind<br>the pixels.','About','Alimzhan Galymzhan')}
<h1 class="editorial-title" data-page-title>About whynicky.</h1>

<h2 class="editorial-manifesto" data-word-reveal>${words('I’m Alimzhan, a frontend developer who cares about thoughtful interfaces, clean code, and real ideas that make a difference.')}</h2>
<div class="editorial-split"><p class="editorial-sublead" data-reveal>Design and code belong in the same conversation. I build interfaces with attention to both their purpose and their character.</p><div class="capabilities" data-reveal><span>Interests</span><p>Design<br>Code<br>Music<br>Ideas</p></div></div>
<section class="experience-section"><div class="editorial-section-label"><span>Experience</span><span>Where the work happens</span><a href="${assetUrl('documents/Alimzhan-Galymzhan-CV.pdf')}" target="_blank" rel="noopener">Open résumé ↗</a></div><div class="experience-path">
${experience('Jun — Dec 2025','Frontend<br>Developer','Interface development','Built interfaces and application features, integrated REST APIs, and debugged user flows for a confidential product. Worked on frontend logic and day-to-day delivery through Git.','beginning')}
${experience('Dec 2025 — Sep 2026','Chatra','Co-founder & Mobile Application Developer','Owned the Flutter mobile client and coordinated FastAPI/PostgreSQL delivery: role-based flows, authentication, notifications, and automated tests.','product')}
${experience('Independent','Söyle','Family speech practice · Web product','A family experience with separate child and parent flows, adaptive practice, and a typed web interface built with Next.js, React, and FastAPI.','independent')}
</div>
</section>
<section class="learning-section"><div class="editorial-section-label"><span>Education & learning</span><span>Always a work in progress</span></div>
<article class="degree-spread" data-reveal><p class="degree-status">Current · Second year</p><h3>Information<br>Systems <em>&</em><br>Management.</h3><div class="degree-detail"><h4>Kozybayev University<br><span>×</span><br>University of Arizona</h4><p>A dual-degree program connecting technology and management. I study alongside independent product development.</p></div></article>
<div class="learning-marginalia"><article data-reveal><span>Courses & training</span><h3>Neural networks.<br>Python. The foundations.</h3><p>Completed the AI Center course in neural network development and integration at Kozybayev University. I also learn programming foundations through CS50’s Introduction to Programming with Python.</p></article><article data-reveal><span>Beyond coursework · 2026</span><h3>Ideas, out<br>in the world.</h3><p>Participated in CyberShield and HackAlem AI, received a second-degree team diploma at Digital Urpaq, and took part in a scientific and practical conference.</p></article></div>
</section>
<section class="certificate-section" id="certificates"><div class="editorial-section-label"><span>Certificates & recognition</span><span>03 / Five milestones</span></div><h2 class="editorial-section-title" data-reveal>Proof of progress.</h2>
<div class="certificate-archive"><nav class="certificate-index" aria-label="Choose a certificate">${certificates.map((c,i)=>`<button data-certificate="${i}" aria-pressed="${i===0}"><small>0${i+1}</small><span>${c.name}<em>${c.kind}</em></span></button>`).join('')}</nav>
<figure class="certificate-preview"><button class="certificate-open" aria-label="Enlarge CyberShield certificate"><img src="${assetUrl('certificates/'+certificates[0].file)}" alt="CyberShield — original certificate" loading="lazy"></button><figcaption><span class="certificate-date">${certificates[0].date}</span><button class="certificate-open">View document ↗</button></figcaption></figure>
<div class="certificate-copy"><span class="certificate-count">01 / 05</span><h3>${certificates[0].name}</h3><p>${certificates[0].description}</p><div class="certificate-controls"><button data-certificate-step="-1" aria-label="Previous certificate">←</button><button data-certificate-step="1" aria-label="Next certificate">→</button></div></div></div></section>
<dialog class="document-dialog" aria-label="Certificate viewer"><div class="document-toolbar"><span class="document-name">CyberShield</span><button data-document-close aria-label="Close certificate">Close ×</button></div><img src="${assetUrl('certificates/cybershield.jpg')}" alt="CyberShield certificate"><div class="document-toolbar"><button data-document-step="-1" aria-label="Previous document">← Previous</button><a class="document-original" href="${assetUrl('certificates/cybershield.jpg')}" target="_blank" rel="noopener">Open original ↗</a><button data-document-step="1" aria-label="Next document">Next →</button></div></dialog>
</article>`;}
export function contactMarkup(){return `<article class="editorial-page contact-editorial">
${mast('Connect or<br>start a conversation.','Contact','Alimzhan Galymzhan')}
<h1 class="editorial-title" data-page-title>Talk to whynicky.</h1>
<div class="direct-contacts" data-reveal><a href="mailto:alimzhanart@icloud.com"><small>Email</small><span>alimzhanart@icloud.com ↗</span></a><a href="https://t.me/whynickyy" target="_blank" rel="noopener"><small>Telegram</small><span>@whynickyy ↗</span></a><i></i><i></i><i></i></div>
<div class="contact-editorial-notes"><p data-reveal>A project. A question. A first hello.<br>Send a message with what you have in mind.</p><p data-reveal>Frontend work, a collaboration, or something worth making together.</p><div data-reveal><p>Keep it direct.<br>Find the work behind the interface.</p><a href="https://github.com/whynicky19" target="_blank" rel="noopener">GitHub / whynicky19 ↗</a></div></div>
<div class="contact-editorial-bottom"><span>ALIMZHAN GALYMZHAN / FRONTEND DEVELOPER</span><a href="#/work">Explore projects ↗</a><span>©2026</span></div>
</article>`;}
export function mountEditorial({gsap,ScrollTrigger,reduced,lenis}){
 const root=document.querySelector('.editorial-page');if(!root)return()=>{};
 const animations=[],maskedNodes=[],revealGroups=new Map(),rules=[];
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
  disposeArchive();photoTween?.kill();root.removeEventListener('focusin',revealFocused);
  animations.forEach(animation=>{animation.scrollTrigger?.kill();animation.revert();});
  maskedNodes.forEach(mask=>{if(mask.isConnected)mask.replaceWith(...mask.firstChild.childNodes);});
  rules.forEach(el=>{el.classList.remove('editorial-draw-rule','editorial-rule-bottom','editorial-rule-replaces-border');el.style.removeProperty('--editorial-rule-scale');});
 };
}

export function processMarkup(){return `<article class="editorial-page process-editorial">${mast('From the first question<br>to the last detail.','Process','Alimzhan Galymzhan')}<h1 class="editorial-title" data-page-title>Considered.<br>Then constructed.</h1><div class="process-essays">${[['Understand','Before the interface, the intention.','I start with what someone needs to do, what gets in their way, and how a product can make that simpler. Sketching a flow is a way to ask better questions.'],['Build','Make the idea work.','I build the interface and its behavior together: structure, states, data and interactions. The visual treatment follows the purpose of the product.'],['Refine','The details are the experience.','I test the paths through the product, simplify what feels unclear, and tune motion, spacing and feedback. A finished interface should be easy to use as well as interesting to look at.']].map(([title,line,body])=>`<section data-reveal><h2>${title}.</h2><div><h3>${line}</h3><p>${body}</p></div></section>`).join('')}</div><a class="underlink" href="#/work">See the work ↗</a></article>`;}
export function credentialsMarkup(){const content=aboutMarkup();return `<article class="editorial-page credentials-editorial">${mast('Learning, in public.','Credentials','Five milestones')}<h1 class="editorial-title" data-page-title>Still learning.</h1>${content.slice(content.indexOf('<section class="certificate-section"'),content.lastIndexOf('</article>'))}</article>`;}
