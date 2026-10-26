import {projects} from './data.js';

const labelled=text=>text.replace(/^(My contribution|Work shown|Cash flow|At a glance|Access & workflows|Data & contracts|CS50P|The Odin Project)\s*:?[ ]*/, '<strong>$1.</strong> ');
const sourceLabel=(url,p)=>{
 if(!url.includes('github.com'))return 'Visit the live product';
 if(p.links.filter(link=>link.includes('github.com')).length<2)return 'Explore the source';
 return url.toLowerCase().includes('backend')?'Backend source':'Frontend source';
};

export function projectPage(p){
 const index=projects.indexOf(p),next=projects[(index+1)%projects.length];
 const layout=p.portrait?'mobile':['chatra-api','learning'].includes(p.id)?'system':'screen';
 const links=p.links.map(url=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${sourceLabel(url,p)} <span aria-hidden="true">↗</span></a>`).join('');
 return `<article class="case-page case-${p.id} case-layout-${layout} project-story">
 <div class="case-top"><a href="#/work" data-back>← Back to work</a><span>${p.tag}</span></div>
 <header class="case-opening">
  <div class="case-title-block"><span class="case-kicker">${p.focus} / ${p.tag.split(' · ')[0]}</span><h1>${p.name}</h1><p class="case-deck">${p.headline}</p></div>
  <figure class="case-cover ${p.portrait?'is-portrait':''}"><img src="${p.images[0]}" alt="${p.name} — project screenshot" fetchpriority="high"><figcaption>${p.name} <span>Interface study / ${p.focus}</span></figcaption></figure>
 </header>
 <section class="project-overview"><span class="project-margin-label">The idea</span><h2>${p.description}</h2><div class="project-role"><span>My part in the work</span><p>${labelled(p.contribution)}</p></div></section>
 <section class="project-detail-spread"><div class="project-margin-label">Inside the project</div><div class="project-detail-heading"><h2>${layout==='mobile'?'A small screen.<br>A whole experience.':layout==='system'?'Behind<br>the interface.':'Built around<br>the details.'}</h2>${p.stack.length?`<div class="project-stack"><span>Built with</span><p>${p.stack.join(' · ')}</p></div>`:''}</div><div class="project-details"><ul>${p.features.map(feature=>`<li>${labelled(feature)}</li>`).join('')}</ul>${p.notes.map(note=>`<p class="project-note">${note}</p>`).join('')}${links?`<div class="project-source-links">${links}</div>`:''}</div></section>
 ${p.images.length>1?`<section class="project-image-sequence" aria-label="More of ${p.name}">${p.images.slice(1).map((src,i)=>`<figure class="${p.imageAspects[i+1]<.8?'portrait-screen':'landscape-screen'}"><img src="${src}" alt="${p.name} — ${p.id==='chatra-mobile'?'dark interface':'additional product view'}" loading="lazy"><figcaption>${p.name}<span>${p.imageAspects[i+1]<.8?'In the hand.':'In context.'}</span></figcaption></figure>`).join('')}</section>`:''}
 <a class="next-case project-next" href="#/work/${next.id}"><span>Continue exploring</span><strong>${next.name}</strong><i aria-hidden="true">↗</i></a>
 </article>`;
}
