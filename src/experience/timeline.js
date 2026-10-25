export const clamp=x=>Math.max(0,Math.min(1,x));
export const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
export const beats=[{id:'cover',name:'Cover',p:0},{id:'print',name:'Physical print',p:.115},{id:'archive',name:'Archive',p:.23},{id:'chatra',name:'Chatra',p:.365},{id:'soyle',name:'Söyle',p:.51},{id:'urpaq',name:'Digital Urpaq',p:.655},{id:'assembly',name:'Reassemble',p:.81},{id:'final',name:'Final impression',p:1}];
// Deliberate recognition holds are part of the rail, not a constantly orbiting camera.
const keys=[
 [0,[0,0,18],[0,0,0]], [.035,[0,0,18],[0,0,0]],
 [.115,[6,3,15],[-1,0,-1]], [.19,[1,1,5],[0,0,-15]],
 [.23,[-1,1,-3],[-2,0,-22]], [.285,[-4,1,-9],[-4,1,-30]],
 [.355,[-4,1,-9],[-4,1,-30]], [.385,[-4,1,-9],[-4,1,-30]],
 [.435,[1,2,-21],[-3,0,-32]], [.485,[12,3,-38],[12,0,-56]],
 [.515,[12,1,-36],[12,0,-56]], [.535,[12,1,-36],[12,0,-56]],
 [.585,[7,5,-49],[9,0,-58]], [.635,[-4,1,-60],[-4,1,-82]],
 [.67,[-4,1,-60],[-4,1,-82]], [.72,[3,2,-72],[-4,0,-82]],
 [.785,[0,1,-91],[0,0,-110]], [.85,[0,1,-91],[0,0,-110]],
 [.915,[-3,2,-114],[0,0,-137]], [.97,[0,.9,-115],[0,.9,-137]], [1,[0,.9,-115],[0,.9,-137]]
];
export function cameraPose(p,aspect){let b=keys.findIndex(k=>k[0]>=p);if(b<1)b=1;const a=keys[b-1],z=keys[b];const f=smooth(a[0],z[0],p);const mix=(x,y)=>x.map((v,i)=>v+(y[i]-v)*f);const eye=mix(a[1],z[1]),look=mix(a[2],z[2]);
 // Fit the entire installation on portrait devices; compositions also rearrange locally.
 const portrait=aspect<.85;const scale=portrait?Math.max(1.38,1.08/aspect):Math.max(1,1.44/aspect);
 eye[2]=look[2]+(eye[2]-look[2])*scale;
 return {eye,look,portrait,dark:smooth(.55,.615,p)*(1-smooth(.72,.775,p))+smooth(.89,.96,p)};
}
