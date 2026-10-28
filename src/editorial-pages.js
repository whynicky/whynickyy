import {assetUrl} from './asset-url.js';
export const certificates=[
 {name:'CyberShield',kind:'Competition',date:'29 April 2026',file:'cybershield.jpg',description:'Participation certificate for CyberShield 2026 at Kozybayev University.'},
 {name:'Digital Urpaq',kind:'II degree team diploma',date:'2026',file:'digital-urpaq.jpg',description:'Second-degree team diploma for the Digital Urpaq competition.'},
 {name:'Scientific conference',kind:'Academic participation',date:'2026',file:'conference.jpg',description:'Participation certificate for a scientific and practical conference at Kozybayev University.'},
 {name:'Neural networks',kind:'AI Center · Course completion',date:'Kozybayev University',file:'neural-networks.jpg',description:'Completion of the AI Center course in neural network development and integration at Kozybayev University.'},
 {name:'HackAlem AI',kind:'Hackathon participation',date:'14 October 2026',file:'hackalem.jpg',description:'Participation certificate for the Agentic AI Hackathon on 14 October 2026.'}
];
const words=text=>text.split(' ').map(w=>`<span class="reveal-word">${w}</span>`).join(' ');
const mast=(label,section,name)=>`<div class="editorial-masthead"><a href="#/" class="editorial-signature">${label}<br><span>whynicky®</span></a><span>◢ ${section}</span><span>◣ ${name}</span></div>`;
const experience=(period,title,subtitle,description,style)=>`<article class="experience-entry experience-${style}" data-reveal><div class="experience-date"><i aria-hidden="true"></i>${period}</div><h3>${title}</h3><div class="experience-detail"><h4>${subtitle}</h4><p>${description}</p></div></article>`;
const certificateMarkup=()=>`<section class="certificate-section" id="certificates"><div class="editorial-section-label"><span>Certificates & recognition</span><span>03 / Five milestones</span></div><h2 class="editorial-section-title" data-reveal>Proof of progress.</h2>
<div class="certificate-archive"><nav class="certificate-index" aria-label="Choose a certificate">${certificates.map((c,i)=>`<button data-certificate="${i}" aria-pressed="${i===0}"><small>0${i+1}</small><span>${c.name}<em>${c.kind}</em></span></button>`).join('')}</nav>
<figure class="certificate-preview"><button class="certificate-open" aria-label="Enlarge CyberShield certificate"><img src="${assetUrl('certificates/'+certificates[0].file)}" alt="CyberShield - original certificate" loading="lazy"></button><figcaption><span class="certificate-date">${certificates[0].date}</span><button class="certificate-open">View document ↗</button></figcaption></figure>
<div class="certificate-copy"><span class="certificate-count">01 / 05</span><h3>${certificates[0].name}</h3><p>${certificates[0].description}</p><div class="certificate-controls"><button data-certificate-step="-1" aria-label="Previous certificate">←</button><button data-certificate-step="1" aria-label="Next certificate">→</button></div></div></div></section>
<dialog class="document-dialog" aria-label="Certificate viewer"><div class="document-toolbar"><span class="document-name">CyberShield</span><button data-document-close aria-label="Close certificate">Close ×</button></div><img src="${assetUrl('certificates/cybershield.jpg')}" alt="CyberShield certificate"><div class="document-toolbar"><button data-document-step="-1" aria-label="Previous document">← Previous</button><a class="document-original" href="${assetUrl('certificates/cybershield.jpg')}" target="_blank" rel="noopener">Open original ↗</a><button data-document-step="1" aria-label="Next document">Next →</button></div></dialog>
`;
export function aboutMarkup(){return `<article class="editorial-page about-studio">
<nav class="about-nav" aria-label="About navigation"><div><a href="#/about" aria-current="page">about</a><a href="#/contact">contact</a></div><a href="#/" class="about-wordmark" aria-label="whynicky home">whynicky®</a><div><a href="#/work">selected work</a><a href="https://github.com/whynicky" target="_blank" rel="noopener">github ↗</a></div></nav>
<div class="about-composition">
<aside class="about-side" aria-label="At a glance">
<div class="about-orbit" aria-hidden="true"><span class="about-disc disc-name"><img src="${assetUrl('images/github-avatar.jpg')}" alt="" width="86" height="86"><small>( AG )</small></span><span class="about-disc disc-design"><img src="${assetUrl('images/eye-mark-white.png')}" alt="" width="86" height="86"><small>( DESIGN )</small></span></div>
<div class="about-facts"><div><strong>( WEB )</strong><span>React<br>Next.js</span></div><div><strong>( APP )</strong><span>Flutter<br>Mobile interfaces</span></div><div><strong>( STUDY )</strong><span>Information Systems<br>& Management</span></div></div>
<div class="about-social"><a href="https://github.com/whynicky" target="_blank" rel="noopener">github ↗</a><a href="https://t.me/whynickyy" target="_blank" rel="noopener">telegram ↗</a><a href="${assetUrl('documents/Alimzhan-Galymzhan-CV.pdf')}" target="_blank" rel="noopener">résumé ↗</a></div>
</aside>
<section class="about-intro" aria-labelledby="about-heading"><span class="about-margin-label">( ABOUT ME )</span><h1 id="about-heading">I’m Alimzhan.<br>I build interfaces<br>for web and mobile.</h1><p>Responsive layouts,<br>application logic<br>and API integration.</p></section>
<div class="about-marginalia"><p>I co-founded Chatra and built its Flutter client:<br>user roles, authentication and notifications.</p><p>Söyle is a family speech-practice product.<br>I work on its child and parent interfaces<br>with Next.js, React and FastAPI.</p><p>I study Information Systems & Management<br>in the Kozybayev University<br>and University of Arizona dual-degree program.</p></div>
</div>
<details class="about-dossier"><summary><span>A little more about me</span><span class="dossier-caption">EXPERIENCE / EDUCATION / RECOGNITION</span><span class="dossier-toggle" aria-hidden="true">+</span></summary><div class="about-dossier-body"><section class="experience-section"><div class="editorial-section-label"><span>Experience</span><span>Roles & responsibilities</span><a href="${assetUrl('documents/Alimzhan-Galymzhan-CV.pdf')}" target="_blank" rel="noopener">Open résumé ↗</a></div><div class="experience-path">
${experience('Jun - Dec 2025','Frontend Developer','Interface development','Built interfaces and application features for a confidential product. Integrated REST APIs, worked on frontend logic, debugged user flows and managed day-to-day delivery through Git.','beginning')}
${experience('Dec 2025 - Sep 2026','Chatra','Co-founder & Mobile Application Developer','Owned the Flutter client and coordinated FastAPI/PostgreSQL delivery: roles, authentication, notifications and automated tests.','product')}
${experience('Independent','Söyle','Family speech practice · Web product','Child and parent flows, adaptive practice, and a typed interface built with Next.js, React and FastAPI.','independent')}
</div></section>
<section class="education-records" aria-labelledby="education-heading"><div class="editorial-section-label"><span id="education-heading">Education & learning</span><span>Alongside the work</span></div>
<div class="education-row"><span>Current · Second year</span><h2>Information Systems<br>& Management</h2><p>Kozybayev University × University of Arizona.<br>A dual-degree program connecting technology and management.</p></div>
<div class="education-row"><span>Courses & training</span><h2>Neural networks.<br>Python foundations.</h2><p>Completed the Kozybayev University AI Center course in neural network development and integration. Continuing to learn through CS50’s Introduction to Programming with Python.</p></div>
</section>
<section class="credentials-teaser"><span>Certificates & recognition / 05</span><h2>Certificates<br>& diplomas.</h2><div><p>CyberShield, Digital Urpaq, HackAlem AI, a scientific conference and neural network training. Original documents available to view.</p><a class="underlink" href="#/credentials">Explore credentials </a></div></section>
</div></details>
<footer class="about-invitation"><p class="about-invitation-link"><span>FRONTEND,</span><span>BUT MAKE IT</span><span>WEIRD.</span></p><div class="about-colophon"><span>© ${new Date().getFullYear()} whynicky</span><a href="#/contact">Get in touch</a><a href="#/process">How I work</a></div></footer>
</article>`;}
export function contactMarkup(){return `<article class="editorial-page contact-studio">
<div class="contact-mast"><span>( CONTACT )</span><a href="#/" aria-label="whynicky home">whynicky®</a><span>WEB & MOBILE DEVELOPMENT</span></div>
<div class="contact-spread"><header class="contact-poster"><h1>SOMETHING<br>ON YOUR<br><span>MIND?</span></h1><div class="contact-eye"><img src="${assetUrl('images/eye-mark-white.png')}" alt="" width="220" height="140"></div><p>Send your project requirements,<br>existing designs or a question.</p></header>
<section class="contact-letter" aria-labelledby="letter-heading"><div class="contact-letter-heading"><h2 id="letter-heading">A NOTE TO ALIMZHAN</h2></div>
<form class="contact-form"><div class="contact-field"><label for="contact-name"><span>( 01 )</span> Your name</label><input id="contact-name" name="name" autocomplete="name" placeholder="Your name" required maxlength="100"></div><div class="contact-field"><label for="contact-email"><span>( 02 )</span> Email address</label><input id="contact-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required maxlength="180"></div><div class="contact-field"><label for="contact-message"><span>( 03 )</span> Project or question</label><textarea id="contact-message" name="message" placeholder="What do you need built or changed?" required rows="4" maxlength="5000"></textarea></div><div class="contact-form-end"><p>This opens a draft in your email app.<br>You can review it before sending.</p><button type="submit">Open email draft <span aria-hidden="true">↗</span></button></div><p class="contact-status" role="status" aria-live="polite"></p></form>
</section></div>
<section class="contact-direct" aria-label="Other ways to connect"><span class="contact-direct-label">DIRECT<br>CONTACTS</span><a href="mailto:alimzhanart@icloud.com"><small>( EMAIL )</small><span>alimzhanart<br>@icloud.com</span></a><a href="https://t.me/whynickyy" target="_blank" rel="noopener"><small>( TELEGRAM )</small><span>@whynickyy ↗</span></a></section>
<footer class="contact-colophon"><span>ALIMZHAN GALYMZHAN / KAZAKHSTAN</span><a href="https://github.com/whynicky" target="_blank" rel="noopener">GitHub ↗</a><span>© ${new Date().getFullYear()} WHYNICKY</span></footer></article>`;}
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
   const photo=archive.querySelector('.certificate-preview img');photo.src=assetUrl('certificates/'+c.file);photo.alt=c.name+' - original certificate';archive.querySelector('.certificate-preview>.certificate-open').setAttribute('aria-label',`Enlarge ${c.name} certificate`);
   archive.querySelector('.certificate-date').textContent=c.date;archive.querySelector('.certificate-count').textContent=`0${index+1} / 05`;archive.querySelector('.certificate-copy h3').textContent=c.name;archive.querySelector('.certificate-copy p').textContent=c.description;
   if(!reduced){photoTween?.kill();photoTween=gsap.fromTo(photo,{clipPath:'inset(0 0 100% 0)',y:15},{clipPath:'inset(0 0 0% 0)',y:0,duration:.55,ease:'power3.out',overwrite:true});}
   dialog.querySelector('img').src=assetUrl('certificates/'+c.file);dialog.querySelector('img').alt=c.name+' - original document';dialog.querySelector('.document-name').textContent=c.name+' / '+c.date;dialog.querySelector('.document-original').href=assetUrl('certificates/'+c.file);
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
const studioFoot=()=>`<footer class="studio-reading-foot"><span>© ${new Date().getFullYear()} whynicky</span><a href="#/contact">Contact me</a></footer>`;
const kineticLines=['THE CLOCK FORGOT ITS PURPOSE. A ROOM WITHOUT A NAME KEEPS COLLECTING AFTERNOONS. SOMEWHERE BETWEEN ARRIVAL AND DEPARTURE, AN UNFINISHED THOUGHT LEANS AGAINST THE WALL AND WAITS FOR SOMEBODY TO NOTICE ITS SHADOW.', 'NOTHING HAPPENS IN EXACTLY THE SAME WAY TWICE. A FAMILIAR CORNER LOOKS DIFFERENT AFTER MIDNIGHT. EVEN THE QUIETEST OBJECT CARRIES A SMALL DISTURBANCE, A SECRET ANGLE, AN UNEXPECTED POSSIBILITY OF BECOMING SOMETHING ELSE.', 'LOOK AGAIN BEFORE YOU DECIDE WHAT YOU SAW. THE DISTANCE BETWEEN TWO MOMENTS IS NOT ALWAYS MEASURABLE. THERE ARE DAYS WHEN AN ORDINARY WINDOW BECOMES AN ENTRANCE TO A PLACE THAT HAS NEVER EXISTED ON ANY MAP.', 'A SLIGHTLY WRONG TURN CAN BE A PERFECT BEGINNING. FOLLOW THE MARK THAT DOES NOT BELONG HERE. LET THE STRANGER FINISH THEIR SENTENCE. CURIOSITY HAS A HABIT OF HIDING INSIDE DETAILS THAT EVERYBODY ELSE HAS ALREADY DISMISSED.', 'THE FUTURE ARRIVED WEARING YESTERDAY’S COAT. IT LEFT A NOTE ON THE KITCHEN TABLE AND DISAPPEARED BEFORE BREAKFAST. NOBODY REMEMBERS THE HANDWRITING, BUT EVERYONE AGREES THAT THE ROOM FELT LARGER AFTERWARDS.', 'SOME PATTERNS ONLY EXIST BECAUSE WE KEEP LOOKING FOR THEM. OTHERS APPEAR THE INSTANT WE STOP. A COINCIDENCE MAY BE A DOOR LEFT OPEN BY ACCIDENT, OR SIMPLY THE WORLD CLEARING ITS THROAT IN THE MIDDLE OF A CONVERSATION.', 'THERE IS NO CORRECT WAY TO REMEMBER A DREAM. THE STAIRS CHANGE THEIR DIRECTION WHILE YOU ARE STILL CLIMBING. A FACE BECOMES A LANDSCAPE. A DISTANT SOUND BORROWS YOUR NAME AND RETURNS IT WITH A DIFFERENT MEANING.', 'AN EMPTY SPACE IS NEVER COMPLETELY EMPTY. LIGHT TAKES ITS TIME CROSSING THE FLOOR. DUST REHEARSES A SMALL WEATHER SYSTEM. THE AIR HOLDS EVERY MOVEMENT FOR AN INSTANT BEFORE PRETENDING THAT NOTHING HAS BEEN DISTURBED.', 'WE HAVE MISPLACED THE INSTRUCTIONS FOR BEING ORDINARY. PLEASE LEAVE ANY EXPECTATIONS AT THE ENTRANCE. SOMETHING UNCLASSIFIED IS HAPPENING JUST OUTSIDE THE FRAME, AND IT DOES NOT SEEM PARTICULARLY INTERESTED IN EXPLAINING ITSELF.', 'THE MIRROR IS RUNNING A FEW SECONDS LATE. YOUR REFLECTION CONTINUES A GESTURE AFTER YOU HAVE STOPPED. FOR A MOMENT THE TWO OF YOU LOOK LIKE PEOPLE WHO ONCE KNEW EACH OTHER BUT CANNOT REMEMBER WHERE THEY FIRST MET.', 'COLLECT THE QUESTIONS THAT HAVE NO USEFUL ANSWERS. KEEP THE RECEIPT FROM AN IMAGINARY JOURNEY. SAVE THE SCRAP OF PAPER WITH THE UNRECOGNISABLE DRAWING. ONE DAY THESE UNRELATED THINGS MAY RECOGNISE EACH OTHER.', 'OUTSIDE THE WINDOW, THE CITY CHANGES ITS MIND. A STREETLIGHT BLINKS AT AN EMPTY CROSSING. THE LAST TRAIN TAKES THE LONG WAY HOME. EVERY SMALL DELAY MAKES ROOM FOR A STORY THAT WOULD OTHERWISE HAVE PASSED UNNOTICED.', 'CERTAINTY IS AN INTERESTING OPTICAL ILLUSION. STEP TO THE LEFT AND THE WHOLE ARRANGEMENT SHIFTS. WHAT SEEMED LIKE A BOUNDARY BECOMES A FOLD, WHAT LOOKED LIKE A MISTAKE BEGINS TO FEEL LIKE THE ONLY HONEST PART OF THE PICTURE.', 'ALLOW A LITTLE STATIC INTO THE PERFECT RECEPTION. KEEP ONE EDGE UNFINISHED. LEAVE A QUESTION MARK WHERE THE FULL STOP WAS SUPPOSED TO GO. SOMETIMES A CLEARER PICTURE APPEARS ONLY AFTER THE LENS HAS FALLEN SLIGHTLY OUT OF FOCUS.', 'AT NINETEEN MINUTES PAST AN UNRECORDED HOUR, SOMEBODY MOVED THE HORIZON. THE CHANGE WAS TOO SMALL TO CAUSE ALARM. ONLY A PERSON WAITING FOR NOTHING IN PARTICULAR NOTICED THAT THE SKY HAD ACQUIRED A DIFFERENT WEIGHT.', 'THE MOST INTERESTING THING IN THE ROOM MIGHT BE THE THING YOU CANNOT DESCRIBE. IT HAS NO TITLE, NO APPARENT FUNCTION, NO CONVENIENT PLACE IN THE CONVERSATION. STILL, YOUR ATTENTION RETURNS TO IT LONG AFTER EVERYTHING ELSE IS FORGOTTEN.', 'FOLLOW AN IDEA UNTIL IT LOSES ITS GOOD MANNERS. LET IT INTERRUPT THE SILENCE AND TAKE UP MORE SPACE THAN IT WAS OFFERED. WHEN THE FAMILIAR BEGINS TO FEEL UNFAMILIAR, RESIST THE TEMPTATION TO PUT EVERYTHING BACK WHERE IT BELONGS.', 'A MAP OF NOWHERE STILL CONTAINS DIRECTIONS. AN UNREAD LETTER STILL HOLDS A VOICE. AN UNOPENED DOOR STILL CHANGES THE SHAPE OF A CORRIDOR. POSSIBILITY DOES NOT NEED AN AUDIENCE TO CONTINUE MAKING ITS SMALL ADJUSTMENTS.', 'PLEASE DO NOT STRAIGHTEN THE CROOKED PICTURE. ITS ANGLE IS THE ONLY EVIDENCE THAT SOMETHING HAPPENED HERE. A PERFECTLY ORDERED WALL TELLS YOU VERY LITTLE ABOUT THE PEOPLE WHO PASSED THROUGH THE ROOM AND LEFT WITHOUT SAYING GOODBYE.', 'TODAY’S OBSERVATION: THE SHADOW OF A TREE CAN RESEMBLE A THOUGHT YOU HAVE NOT HAD YET. THE WIND REARRANGES THE BRANCHES. THE THOUGHT DISAPPEARS. YOU STAND THERE A LITTLE LONGER, HOPING THAT THE NEXT MOVEMENT WILL BRING IT BACK.', 'STRANGENESS DOES NOT ALWAYS ANNOUNCE ITSELF. SOMETIMES IT SITS BESIDE YOU QUIETLY, USES A FAMILIAR VOICE, AND ASKS A PERFECTLY REASONABLE QUESTION. YOU ONLY REALISE SOMETHING HAS CHANGED WHEN THE ANSWER LEADS SOMEWHERE YOU DID NOT EXPECT.', 'TAKE NOTHING FOR GRANTED, INCLUDING THE FLOOR BENEATH THIS SENTENCE. WORDS ARE TEMPORARY ARRANGEMENTS OF DISTANCE. MEANING IS WHAT HAPPENS WHILE THEY ARE MOVING. THERE MAY BE ANOTHER READING WAITING JUST BEYOND THE EDGE OF YOUR ATTENTION.', 'THE ARCHIVE OF SMALL ACCIDENTS REMAINS OPEN. A WRONG ADDRESS, AN UNPLANNED MEETING, A NAME OVERHEARD THROUGH A WALL. NONE OF THESE EVENTS PROMISED TO MATTER. ALL OF THEM HAVE QUIETLY ALTERED THE ROUTE YOU TOOK TO GET HERE.', 'LEAVE BEFORE THE ENDING BECOMES TOO OBVIOUS. RETURN WHEN YOU HAVE FORGOTTEN WHAT YOU EXPECTED TO FIND. THE PLACE WILL BE THE SAME, MORE OR LESS. THE LIGHT WILL HAVE MOVED. YOU WILL HAVE CHANGED ENOUGH TO SEE SOMETHING THAT WAS ALWAYS THERE.'];
export function processMarkup(){return `<article class="editorial-page process-studio">
<header class="process-opening"><span class="studio-micro">( THE WAY I WORK )<br>ONE IDEA / SIX STAGES</span><h1>From brief<br>to handover.</h1><p>Requirements, planning, design,<br>implementation, testing and delivery.</p></header>
<figure class="process-visual"><h2 class="process-visual-title"><span>FROM</span><span>AN IDEA</span><span>TO</span><span>SOMETHING</span><span>REAL.</span></h2><div class="process-kinetic" role="img" aria-label="Experimental black and white composition: a bold number 19 over moving fragments about time, perception, dreams and coincidence"><div class="kinetic-type" aria-hidden="true">${kineticLines.map((line,i)=>`<div class="kinetic-row" style="--row-duration:${3+i%5*.4}s;--row-offset:-${i%5*19}px"><span>${line}</span></div>`).join('')}</div><span class="kinetic-number" aria-hidden="true">19</span></div><figcaption><span>PERCEPTION / 19</span><button class="kinetic-toggle" type="button" aria-label="Pause banner animation"><span aria-hidden="true">Ⅱ</span> Pause motion</button></figcaption></figure>
<section class="process-board" aria-labelledby="process-board-title"><div class="process-board-label"><span class="studio-micro">01 - 06</span><h2 id="process-board-title">PROCESS</h2><span class="studio-micro">SELECT A STAGE TO EXPLORE</span></div><div class="process-stage-grid">${[0,3].map(start=>`<div>${processSteps.slice(start,start+3).map(([title,line,body,result],j)=>`<details class="process-stage"><summary><span class="studio-micro">0${start+j+1}</span><h3>${title}</h3><span class="stage-plus" aria-hidden="true">+</span></summary><div class="stage-body"><p class="stage-lead">${line}</p><p>${body}</p><div class="stage-outcome"><span class="studio-micro">WHAT WE LEAVE WITH</span><p>${result}</p></div></div></details>`).join('')}</div>`).join('')}</div></section>
<section class="process-side-note"><span class="studio-micro">( A SHARED PROCESS )</span><p>I share working builds for review and agree changes before moving to the next stage.</p><a href="#/work">View projects</a></section>
<section class="studio-questions"><div><span class="studio-micro">( FAQ )</span><h2>Before<br>we start.</h2></div><div>${processQuestions.map(([q,a])=>`<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></section>
${studioFoot()}</article>`;}
const credentialTypes=['competition','competition','academic','learning','competition'];
export function credentialsMarkup(){return `<article class="editorial-page credentials-studio credentials-paper">
<div class="credentials-mast"><span>( CREDENTIALS )</span><a href="#/about">ABOUT ME</a><span>05 ORIGINAL DOCUMENTS</span></div>
<div class="archive-sheets credentials-wall" data-view="paper"><header class="credentials-manifesto"><span class="studio-micro">EDUCATION / COMPETITIONS</span><h1>CERTIFICATES<br>&<br><span>DIPLOMAS.</span></h1><p>Documents from competitions,<br>a university course<br>and an academic conference.</p></header>
${certificates.map((c,i)=>`<button class="archive-sheet paper-document paper-${i}" data-archive-document="${i}" data-kind="${credentialTypes[i]}" aria-label="Open ${c.name} certificate"><span class="paper-overline"><span>( 0${i+1} / 05 )</span><span>OPEN ORIGINAL</span></span><figure><img src="${assetUrl('certificates/'+c.file)}" alt="${c.name} certificate" loading="${i<2?'eager':'lazy'}"></figure><div class="paper-caption"><strong>${c.name}</strong><span class="paper-kind">${c.kind}</span><span class="paper-date">${c.date}</span><p>${c.description}</p></div></button>`).join('')}</div>

<dialog class="document-dialog archive-dialog" aria-label="Certificate viewer"><div class="document-toolbar"><span class="document-name"></span><button data-archive-close aria-label="Close certificate">Close ×</button></div><img class="archive-dialog-image" alt=""><div class="document-toolbar"><button data-archive-step="-1">← Previous</button><a class="document-original" target="_blank" rel="noopener">Open original ↗</a><button data-archive-step="1">Next →</button></div></dialog>
${studioFoot()}</article>`;}
