import { readdirSync,readFileSync,existsSync,statSync } from 'node:fs';
import { resolve } from 'node:path';
const dir=resolve('dist'),errors=[];let links=0;
if(!existsSync(dir))throw new Error('Build first.');
const pages=readdirSync(dir).filter(x=>x.endsWith('.html'));
if(pages.length!==1||pages[0]!=='index.html')errors.push('Expected one experimental entry, with no legacy portfolio pages.');
const html=readFileSync(resolve(dir,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href|srcset)="([^" ]+)"/g)){
  const url=match[1];if(/^(https?:|mailto:|data:)/.test(url))continue;
  if(url.startsWith('#')){if(!html.includes(`id="${url.slice(1)}"`))errors.push(`Missing anchor: ${url}`);continue;}
  links++;if(!existsSync(resolve(dir,url)))errors.push(`Missing asset: ${url}`);
}
for(const id of ['identity','unfold','rupture','touch','exit'])if(!html.includes(`id="${id}"`))errors.push(`Missing act: ${id}`);
if(!html.includes('https://whynicky19.github.io/Portfolio/'))errors.push('Missing original portfolio exit.');
if(/\/Users\/|localhost:|127\.0\.0\.1/.test(html))errors.push('Local-only path in build.');
if(/<form|chatra\.html|contact\.html|about\.html/.test(html))errors.push('Legacy information architecture in experiment.');
const textures=['membrane.webp','membrane-mobile.webp'];
for(const file of textures)if(!existsSync(resolve(dir,'art',file)))errors.push(`Missing photographic asset ${file}`);
if(existsSync(resolve(dir,'art/membrane-source.png')))errors.push('Source image should not be shipped.');
if(errors.length)throw new Error(errors.join('\n'));
console.log(`Passed: one entry, five scene anchors, ${links} local assets, original portfolio exit, no legacy pages or local-only paths.`);
console.log(`Photographic textures: ${textures.map(f=>`${f} ${Math.round(statSync(resolve(dir,'art',f)).size/1024)} KB`).join(', ')}`);
