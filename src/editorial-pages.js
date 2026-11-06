import {eyeMark} from './brand.js';
import {assetUrl} from './asset-url.js';
export const certificates=[
 {name:'CyberShield',kind:'Competition',date:'29 April 2026',file:'cybershield.jpg',description:'Participation certificate for CyberShield 2026.'},
 {name:'Scientific conference',kind:'Academic participation',date:'2026',file:'conference.jpg',description:'Participation certificate for a scientific and practical conference.'},
 {name:'Neural networks',kind:'AI Center · Course completion',date:'Course completion',file:'neural-networks.jpg',description:'Completion of the AI Center course in neural network development and integration.'},
 {name:'HackAlem AI',kind:'Hackathon participation',date:'14 October 2026',file:'hackalem.jpg',description:'Participation certificate for the Agentic AI Hackathon on 14 October 2026.'},
 {name:'AI-SANA',kind:'Course completion · Stage 2',date:'8 July 2026',file:'ai-sana.webp',description:'Completed Stage 2 of AI-SANA, Intellectual Technologies and Entrepreneurial Thinking, covering 135 academic hours.'},
 {name:'Digital Urpaq diploma',kind:'Hackathon · Second place',date:'2026',file:'digital-urpaq.jpg',description:'Second-place diploma awarded to the team at the Digital Urpaq hackathon, part of the Children in the World of Science festival in Petropavl.'}
];
const credentialCount=String(certificates.length).padStart(2,'0');
const words=text=>text.split(' ').map(w=>`<span class="reveal-word">${w}</span>`).join(' ');
const mast=(label,section,name)=>`<div class="editorial-masthead"><a href="#/" class="editorial-signature" aria-label="whynicky home">${eyeMark}</a><span>◢ ${section}</span><span>◣ ${name}</span></div>`;
const experience=(period,title,subtitle,description,style)=>`<article class="experience-entry experience-${style}" data-reveal><div class="experience-date"><i aria-hidden="true"></i>${period}</div><h3>${title}</h3><div class="experience-detail"><h4>${subtitle}</h4><p>${description}</p></div></article>`;
const certificateMarkup=()=>`<section class="certificate-section" id="certificates"><div class="editorial-section-label"><span>Certificates & recognition</span><span>Selected documents</span></div><h2 class="editorial-section-title" data-reveal>Proof of progress.</h2>
<div class="certificate-archive"><nav class="certificate-index" aria-label="Choose a certificate">${certificates.map((c,i)=>`<button data-certificate="${i}" aria-pressed="${i===0}"><small>0${i+1}</small><span>${c.name}<em>${c.kind}</em></span></button>`).join('')}</nav>
<figure class="certificate-preview"><button class="certificate-open" aria-label="Enlarge CyberShield certificate"><img src="${assetUrl('certificates/'+certificates[0].file)}" alt="CyberShield - certificate" loading="lazy"></button><figcaption><span class="certificate-date">${certificates[0].date}</span><button class="certificate-open">View document </button></figcaption></figure>
<div class="certificate-copy"><span class="certificate-count">01 / ${credentialCount}</span><h3>${certificates[0].name}</h3><p>${certificates[0].description}</p><div class="certificate-controls"><button data-certificate-step="-1" aria-label="Previous certificate">Previous</button><button data-certificate-step="1" aria-label="Next certificate">Next</button></div></div></div></section>
<dialog class="document-dialog" aria-label="Certificate viewer"><div class="document-toolbar"><span class="document-name">CyberShield</span><button data-document-close aria-label="Close certificate">Close ×</button></div><img src="${assetUrl('certificates/cybershield.jpg')}" alt="CyberShield certificate"><div class="document-toolbar"><button data-document-step="-1" aria-label="Previous document"> Previous</button><a class="document-original" href="${assetUrl('certificates/cybershield.jpg')}" target="_blank" rel="noopener">Open document </a><button data-document-step="1" aria-label="Next document">Next </button></div></dialog>
`;
export function aboutMarkup(){return `<article class="editorial-page about-studio">
<nav class="about-nav" aria-label="About navigation"><div><a href="#/about" aria-current="page">about</a><a href="#/contact">contact</a></div><a href="#/" class="about-wordmark" aria-label="whynicky home">${eyeMark}</a><div><a href="#/work">selected work</a><a href="https://github.com/whynicky" target="_blank" rel="noopener">github </a></div></nav>
<div class="about-composition">
<aside class="about-side" aria-label="At a glance">
<div class="about-orbit" aria-hidden="true"><span class="about-disc disc-name"><img src="${assetUrl('images/github-avatar.jpg')}" alt="" width="86" height="86"></span></div>
<div class="about-facts"><div><strong>( WEB )</strong><span>React<br>Next.js</span></div><div><strong>( APP )</strong><span>Flutter<br>Mobile interfaces</span></div><div><strong>( STUDY )</strong><span>Information Systems<br>& Management</span></div></div>
<div class="about-social"><a href="https://github.com/whynicky" target="_blank" rel="noopener">github </a><a href="https://t.me/whynickyy" target="_blank" rel="noopener">telegram </a><a href="${assetUrl('documents/whynicky-CV.pdf')}" target="_blank" rel="noopener">résumé </a></div>
</aside>
<section class="about-intro" aria-labelledby="about-heading"><h1 id="about-heading">I’m whynicky.<br>I build interfaces<br>for web and mobile.</h1><p>Responsive layouts,<br>application logic<br>and API integration.</p></section>
<div class="about-marginalia"><p>I co-founded Chatra and built its Flutter client:<br>user roles, authentication and notifications.</p><p>Söyle is a family speech-practice product.<br>I work on its child and parent interfaces<br>with Next.js, React and FastAPI.</p><p>I study Information Systems & Management<br>towards two diplomas:<br>one Kazakh and one American.</p></div>
</div>
<section class="about-focus" aria-labelledby="about-focus-heading"><div class="about-focus-heading"><h2 id="about-focus-heading">What I focus on<br>as a developer.</h2></div><div class="about-focus-notes"><article><h3>From design to components</h3><p>I break a screen into reusable elements and build the layout around the content. Shared controls, spacing and type styles help keep related screens consistent as the interface grows.</p></article><article><h3>Beyond the static screen</h3><p>I work through what happens when a visitor submits a form, opens a menu or waits for a result. Validation, loading, empty and error states belong in the frontend alongside the main screen.</p></article><article><h3>Reviewing the actual build</h3><p>I check the interface in the browser, adapt it for smaller screens and review keyboard and touch interaction. Testing in the browser helps me catch problems that are easy to miss in a static design.</p></article></div></section>
<details class="about-dossier"><summary><span>Experience & education</span><span class="dossier-toggle" aria-hidden="true">+</span></summary><div class="about-dossier-body"><section class="experience-section"><div class="editorial-section-label"><span>Experience</span><span>Roles & responsibilities</span><a href="${assetUrl('documents/whynicky-CV.pdf')}" target="_blank" rel="noopener">Open résumé </a></div><div class="experience-path">
${experience('Jun - Dec 2025','Frontend Developer','Interface development','Built interfaces and application features for a confidential product. Integrated REST APIs, worked on frontend logic, debugged user flows and managed day-to-day delivery through Git.','beginning')}
${experience('Dec 2025 - Sep 2026','Chatra','Co-founder & Mobile Application Developer','Owned the Flutter client and coordinated FastAPI/PostgreSQL delivery: roles, authentication, notifications and automated tests.','product')}
${experience('Independent','Söyle','Family speech practice · Web product','Child and parent flows, adaptive practice, and a typed interface built with Next.js, React and FastAPI.','independent')}
</div></section>
<section class="education-records" aria-labelledby="education-heading"><div class="editorial-section-label"><span id="education-heading">Education & learning</span><span>Alongside the work</span></div>
<div class="education-row"><span>Current · Second year</span><h2>Information Systems<br>& Management</h2><p>A dual-degree program leading to two diplomas:<br>one Kazakh and one American.</p></div>
<div class="education-row"><span>Courses & training</span><h2>Neural networks.<br>Python foundations.</h2><p>Completed the AI Center course in neural network development and integration. Continuing to learn through CS50’s Introduction to Programming with Python.</p></div>
</section>
<section class="credentials-teaser"><span>Certificates & recognition / ${credentialCount}</span><h2>Certificates<br>& diplomas.</h2><div><p>Hackathon awards, course certificates and academic participation.</p><a class="underlink" href="#/credentials">Explore credentials </a></div></section>
</div></details>
<footer class="about-invitation"><div class="about-colophon"><span>© ${new Date().getFullYear()} whynicky</span><a href="#/contact">Get in touch</a><a href="${assetUrl('documents/whynicky-CV.pdf')}" target="_blank" rel="noopener">View résumé</a></div></footer>
</article>`;}
export function contactMarkup(){return `<article class="editorial-page contact-studio">
<div class="contact-mast"><a href="#/" aria-label="whynicky home">${eyeMark}</a></div>
<div class="contact-spread"><header class="contact-poster"><h1>LET’S<br><span>CONNECT.</span></h1><p>Say hello on Telegram,<br>or send me an email.</p></header>
<section class="contact-letter" aria-labelledby="letter-heading"><div class="contact-letter-heading"><h2 id="letter-heading">FIND ME HERE</h2></div>
<div class="contact-profiles">
<a class="contact-profile-link" href="mailto:whynicky777@gmail.com"><span><small>Email</small>whynicky777@gmail.com</span><span aria-hidden="true">↗</span></a>
<a class="contact-profile-link" href="https://t.me/whynickyy" target="_blank" rel="noopener"><span><small>Telegram</small>@whynickyy</span><span aria-hidden="true">↗</span></a>
<a class="contact-profile-link" href="https://github.com/whynicky" target="_blank" rel="noopener"><span><small>GitHub</small>whynicky</span><span aria-hidden="true">↗</span></a>
<a class="contact-profile-link" href="${assetUrl('documents/whynicky-CV.pdf')}" target="_blank" rel="noopener"><span><small>Experience & education</small>View résumé <small class="contact-file-type">PDF</small></span><span aria-hidden="true">↗</span></a>
</div></section></div>
<footer class="contact-colophon"><a href="#/about">About me</a><span>© ${new Date().getFullYear()} WHYNICKY</span></footer></article>`;}
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
  if(root.querySelector('.editorial-masthead'))track(gsap.fromTo(root.querySelectorAll('.editorial-masthead>*'),{y:14,opacity:0},{y:0,opacity:1,duration:.7,stagger:.06,ease:'power3.out',delay:.12}));
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
   const photo=archive.querySelector('.certificate-preview img');photo.src=assetUrl('certificates/'+c.file);photo.alt=c.name+' - certificate';archive.querySelector('.certificate-preview>.certificate-open').setAttribute('aria-label',`Enlarge ${c.name} certificate`);
   archive.querySelector('.certificate-date').textContent=c.date;archive.querySelector('.certificate-count').textContent=`${String(index+1).padStart(2,'0')} / ${credentialCount}`;archive.querySelector('.certificate-copy h3').textContent=c.name;archive.querySelector('.certificate-copy p').textContent=c.description;
   if(!reduced){photoTween?.kill();photoTween=gsap.fromTo(photo,{clipPath:'inset(0 0 100% 0)',y:15},{clipPath:'inset(0 0 0% 0)',y:0,duration:.55,ease:'power3.out',overwrite:true});}
   dialog.querySelector('img').src=assetUrl('certificates/'+c.file);dialog.querySelector('img').alt=c.name+' - document';dialog.querySelector('.document-name').textContent=c.name+' / '+c.date;dialog.querySelector('.document-original').href=assetUrl('certificates/'+c.file);
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
 ['Structure','Start with the way a screen is used.','I think through navigation, content and the different states a screen can have. This helps me understand how the interface fits together before writing components.','Screens, states and the connections between them.'],
 ['Components','Keep repeated behaviour consistent.','I build shared controls for forms, menus and dialogs. A component should cover its loading, empty, disabled and error states as well as its default appearance.','Reusable elements with explicit states.'],
 ['Layout','Make room for the content.','I use semantic HTML, CSS Grid and Flexbox to build responsive layouts. I pay attention to line breaks, spacing and what happens between the main breakpoints.','Layouts that adapt to different screen sizes.'],
 ['Data','Connect the screen to what happens behind it.','My frontend work includes API integration, authentication and permissions. I account for requests that take time, return no results or fail.','Application logic and visible feedback.'],
 ['Motion','Give interaction a sense of continuity.','I use CSS and GSAP for transitions and interface feedback. I consider where movement starts, how it ends and how the same interaction works with reduced motion.','Motion that supports navigation and feedback.'],
 ['Testing','Use the interface, then look again.','I check key flows with keyboard and touch input, inspect layouts at different widths and debug unexpected states. I use automated tests where they help verify behaviour.','A habit of checking the working interface.']
];
const processQuestions=[
 ['What do I use for web development?','React, Next.js and Vue, alongside HTML, CSS and JavaScript. My work includes responsive interfaces, reusable components and API integration.'],
 ['What do I use for mobile development?','Flutter. My experience includes application screens, authentication, notifications and navigation for different user roles.'],
 ['What am I studying?','Information Systems & Management in a dual-degree program leading to Kazakh and American diplomas.'],
 ['What else am I learning?','I completed the AI Center course in neural network development and integration, and I’m continuing to learn Python through CS50.']
];
const studioFoot=()=>`<footer class="studio-reading-foot"><span>© ${new Date().getFullYear()} whynicky</span><a href="#/contact">Contact me</a></footer>`;
export function processMarkup(){return `<article class="editorial-page process-studio">
<nav class="process-mast" aria-label="Notes navigation"><a href="#/" aria-label="whynicky home">${eyeMark}</a><a href="#/work">Work</a></nav>
<header class="process-opening"><h1>Notes on<br>development.</h1><p>How I think about interfaces,<br>interaction and frontend code.</p></header>
<figure class="process-visual"><h2 class="process-visual-title"><span>FROM</span><span>AN IDEA</span><span>TO</span><span>SOMETHING</span><span>REAL.</span></h2><div class="process-photo"><img src="${assetUrl('images/process-amber-blur.webp')}" alt="Abstract amber light with soft, blurred lines and deep shadows" width="1800" height="2700" decoding="async"></div><figcaption><a href="https://unsplash.com/photos/abstract-orange-and-brown-light-blur-BRjxBeI3F-g" target="_blank" rel="noopener">PHOTO - GERONIMO GIQUEAUX </a></figcaption></figure>
<section class="process-board" aria-labelledby="process-board-title"><div class="process-board-label"><h2 id="process-board-title">MY APPROACH</h2></div><div class="process-stage-grid">${[0,3].map(start=>`<div>${processSteps.slice(start,start+3).map(([title,line,body,result],j)=>`<details class="process-stage"><summary><h3>${title}</h3><span class="stage-plus" aria-hidden="true">+</span></summary><div class="stage-body"><p class="stage-lead">${line}</p><p>${body}</p><div class="stage-outcome"><p>${result}</p></div></div></details>`).join('')}</div>`).join('')}</div></section>
<section class="process-side-note"><p>I learn by building, checking the result and revisiting the details. Each interface gives me something new to understand.</p><a href="#/work">View projects</a></section>
<section class="studio-questions"><div><h2>A little<br>background.</h2></div><div>${processQuestions.map(([q,a])=>`<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></section>
${studioFoot()}</article>`;}
export function credentialsMarkup(){return `<article class="editorial-page credentials-studio credentials-desk">
<nav class="credentials-nav" aria-label="Credentials navigation"><a href="#/" aria-label="whynicky home">${eyeMark}</a><a href="#/work">Work</a><a href="#/contact">Get in touch </a></nav>
<header class="credentials-introduction"><section><h1>Credentials</h1><p>${certificates.length} documents from hackathons, courses and academic events.</p></section><section><h2>Courses</h2><ul><li>AI-SANA · Stage 2</li><li>AI Center · Neural networks</li></ul></section><section><h2>Competitions & events</h2><ul><li>Digital Urpaq · Second place</li><li>CyberShield and HackAlem AI</li><li>Scientific conference</li></ul></section></header>
<div class="credentials-composition">
${certificates.map((c,i)=>`<button class="credential-leaf-sheet" data-archive-document="${i}" aria-label="Open ${c.name}"><span class="credential-leaf-caption"><strong>${c.name}</strong><small>${c.kind}</small></span><span class="credential-leaf-paper"><img src="${assetUrl('certificates/'+c.file)}" alt="" loading="${i<2?'eager':'lazy'}" decoding="async"></span></button>`).join('')}
</div>
<dialog class="document-dialog archive-dialog" aria-label="Credential viewer"><div class="document-toolbar"><span class="document-name"></span><button data-archive-close aria-label="Close document" autofocus>Close ×</button></div><img class="archive-dialog-image" alt=""><p class="document-description"></p><div class="document-toolbar"><button data-archive-step="-1" aria-label="Previous document"> Previous</button><a class="document-original" target="_blank" rel="noopener">Open document </a><button data-archive-step="1" aria-label="Next document">Next </button></div></dialog>
${studioFoot()}</article>`;}
