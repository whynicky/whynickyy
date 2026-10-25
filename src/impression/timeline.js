export const clamp=x=>Math.max(0,Math.min(1,x));export const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
export const beats=[{id:'arrival',name:'Arrival',p:0},{id:'peel',name:'Unfold',p:.12},{id:'relief',name:'Relief',p:.25},{id:'raster',name:'Raster',p:.41},{id:'exposure',name:'Exposure',p:.54},{id:'fold',name:'Fold',p:.68},{id:'register',name:'Registration',p:.84},{id:'exit',name:'Exit',p:1}];
const shots=[
 [0,[0,0,20],[0,0,0],0],[.035,[0,0,19],[0,0,0],0],
 [.115,[7,3,17],[-1,0,-3],-.04],[.17,[-7,3,2],[0,0,-12],-.08],
 [.22,[-5,2,-4],[0,0,-12],-.04],[.265,[0,1,7],[0,0,-12],0],
 [.30,[3,0,1],[1,0,-12],.08],[.345,[2,1,-28],[0,0,-48],-.12],
 [.41,[0,0,-28],[0,0,-48],0],[.455,[0,0,-32],[0,0,-48],.04],
 [.51,[0,0,-33],[0,0,-54],0],[.575,[0,0,-33],[0,0,-54],0],
 [.625,[6,4,-68],[0,0,-94],-.08],[.68,[3,4,-70],[0,0,-94],.08],
 [.735,[-7,3,-76],[0,0,-94],-.06],[.78,[3,-1,-104],[0,0,-130],.15],
 [.84,[4,2,-108],[0,0,-130],-.07],[.9,[0,0,-110],[0,0,-130],0],
 [.965,[0,1,-110],[0,1,-130],0],[1,[0,1,-110],[0,1,-130],0]
];
export function pose(p,aspect){let i=shots.findIndex(k=>k[0]>=p);if(i<1)i=1;const a=shots[i-1],b=shots[i],t=smooth(a[0],b[0],p),lerp=(x,y)=>x.map((v,k)=>v+(y[k]-v)*t),eye=lerp(a[1],b[1]),look=lerp(a[2],b[2]);const portrait=aspect<.85;
 const factor=portrait?Math.max(1.1,.95/aspect):Math.max(1,1.48/aspect);eye[2]=look[2]+(eye[2]-look[2])*factor;
 const dark=smooth(.28,.36,p)*(1-smooth(.58,.63,p))+smooth(.75,.82,p);
 return {eye,look,roll:(a[3]+(b[3]-a[3])*t)*(portrait?.55:1),portrait,dark};}
