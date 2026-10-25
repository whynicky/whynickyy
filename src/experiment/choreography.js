import { MathUtils } from 'three';
export const smooth=(a,b,v)=>{const x=MathUtils.clamp((v-a)/(b-a),0,1);return x*x*(3-2*x);};
const lerp=MathUtils.lerp;
const cameraStops=[
  [0,0,.2,14.6, 0,0,0],
  [.10,.6,.1,13, 0,0,0],
  [.24,6.5,1.5,9, 1.6,0,0],
  [.34,1.2,.2,4.1, 0,0,-1],
  [.43,-5,1,-7, 0,0,0],
  [.51,-2,1,-10, 0,0,0],
  [.57,8,2,2, 0,0,0],
  [.62,5,2,12, 1,0,0],
  [.66,4,1.5,12.2, 1.3,0,0],
  [.82,-2,1.2,12, 1.5,0,0],
  [1,0,0,16, 0,0,0],
];
export function compose(progress,aspect){
  const p=MathUtils.clamp(progress,0,1);let i=0;
  while(i<cameraStops.length-2&&p>cameraStops[i+1][0])i++;
  const a=cameraStops[i],b=cameraStops[i+1],t=smooth(a[0],b[0],p);
  const values=a.slice(1).map((n,j)=>lerp(n,b[j+1],t));
  const portrait=aspect<.85;
  if(portrait){const scale=lerp(1.5,1.45,smooth(.16,.6,p));values[0]*=.55;values[2]*=scale;values[3]*=.5;}
  return {camera:values.slice(0,3),look:values.slice(3),
    open:smooth(.025,.30,p),coil:smooth(.24,.43,p),end:smooth(.85,.99,p),
    dark:smooth(.31,.43,p)*(1-smooth(.77,.9,p)),
    touch:smooth(.54,.65,p)*(1-smooth(.82,.9,p)),
    print:1-smooth(.07,.20,p)+smooth(.91,.99,p),
    rotation:[lerp(.08,.2,smooth(.08,.3,p)),lerp(-.12,.2,smooth(.1,.35,p)),lerp(-.075,.18,smooth(.1,.28,p))*(1-smooth(.38,.55,p))],
  };
}
