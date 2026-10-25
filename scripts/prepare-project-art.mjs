import sharp from 'sharp';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const entries=[['chatra',1.13,-13],['chatra-mobile',1.1,-10],['soyle-home',1.07,-8],['soyle-plan',1.1,-12],['urpaq',1.05,0]];
await mkdir('public/art/projects',{recursive:true});
const manifest=[];
for(const [name,contrast,offset] of entries){
 const source=`docs/assets/originals/${name}.png`;
 const {data,info}=await sharp(source).greyscale().raw().toBuffer({resolveWithObject:true});
 // Fixed-seed, sub-one-level print grain. No content generation or replacement.
 let seed=719;for(let i=0;i<data.length;i++){seed=(1664525*seed+1013904223)>>>0;const grain=((seed/4294967296)-.5)*1.2;data[i]=Math.max(7,Math.min(246,Math.pow(data[i]/255,1.5)*255*contrast+offset+grain));}
 for(const [suffix,width] of [['',1440],['-small',760]])await sharp(data,{raw:info}).resize({width,withoutEnlargement:true}).webp({quality:91,effort:6}).toFile(`public/art/projects/${name}${suffix}.webp`);
 manifest.push({name,source,sha256:createHash('sha256').update(await readFile(source)).digest('hex'),sourceSize:[info.width,info.height],treatment:{grayscale:true,midtoneGamma:1.5,contrast,offset,blackPoint:7,whitePoint:246,grainAmplitude:1.2},provenance:'Unmodified original screenshot recovered from local checkpoint ce3265a; artwork and interface within the screenshot belong to the existing project.'});
}
await writeFile('docs/assets/project-provenance.json',JSON.stringify(manifest,null,2)+'\n');
console.log('Prepared 10 monochrome WebP derivatives from 5 preserved screenshots.');
