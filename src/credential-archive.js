import {certificates} from './editorial-pages.js';
import {assetUrl} from './asset-url.js';
export function mountCredentialArchive({lenis}){
 const root=document.querySelector('.credentials-studio');if(!root)return()=>{};
 const dialog=root.querySelector('.archive-dialog');
 const cards=[...root.querySelectorAll('[data-archive-document]')];let selected=0,opener;
 const visible=()=>cards.filter(c=>!c.hidden).map(c=>Number(c.dataset.archiveDocument));
 const show=index=>{selected=index;const c=certificates[index];dialog.querySelector('.document-name').textContent=`${c.name} / ${c.date}`;const img=dialog.querySelector('.archive-dialog-image');img.src=assetUrl('certificates/'+c.file);img.alt=c.name+' - original certificate';dialog.querySelector('.document-original').href=img.src;};
 const step=direction=>{const ids=visible();show(ids[(ids.indexOf(selected)+direction+ids.length)%ids.length]);};
 const click=e=>{
  const card=e.target.closest('[data-archive-document]');if(card){opener=card;show(Number(card.dataset.archiveDocument));dialog.showModal();lenis.stop();}
  if(e.target.closest('[data-archive-close]'))dialog.close();
  const next=e.target.closest('[data-archive-step]');if(next)step(Number(next.dataset.archiveStep));
 };
 const close=()=>{lenis.start();opener?.focus({preventScroll:true});};
 const key=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();step(e.key==='ArrowRight'?1:-1);}};
 root.addEventListener('click',click);dialog.addEventListener('close',close);dialog.addEventListener('keydown',key);
 return()=>{root.removeEventListener('click',click);dialog.removeEventListener('close',close);dialog.removeEventListener('keydown',key);if(dialog.open){dialog.close();lenis.start();}};
}
