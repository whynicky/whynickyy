import {assetUrl} from './asset-url.js';
import * as THREE from 'three';

const vertex = `
varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}
`;

// Reference mechanics: a portrait displaced by a nested, anisotropic noise
// field, followed by stochastic tonal quantization. The original site's code
// and portrait are not dependencies; this scene uses our own transparent asset.
const fragment = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPortrait;
uniform sampler2D uDetail;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uFrame;
uniform vec2 uPointer;

float hash(vec2 p){
 vec3 q=fract(vec3(p.xyx)*.1031);
 q+=dot(q,q.yzx+33.33);
 return fract((q.x+q.y)*q.z);
}
vec3 gradient(vec3 p){
 p=fract(p*vec3(.1031,.11369,.13787));
 p+=dot(p,p.yxz+19.19);
 return -1.+2.*fract(vec3((p.x+p.y)*p.z,(p.x+p.z)*p.y,(p.y+p.z)*p.x));
}
float perlin(vec3 p){
 vec3 cell=floor(p),f=fract(p),w=f*f*(3.-2.*f);
 float a=dot(gradient(cell),f);
 float b=dot(gradient(cell+vec3(1,0,0)),f-vec3(1,0,0));
 float c=dot(gradient(cell+vec3(0,1,0)),f-vec3(0,1,0));
 float d=dot(gradient(cell+vec3(1,1,0)),f-vec3(1,1,0));
 float e=dot(gradient(cell+vec3(0,0,1)),f-vec3(0,0,1));
 float g=dot(gradient(cell+vec3(1,0,1)),f-vec3(1,0,1));
 float h=dot(gradient(cell+vec3(0,1,1)),f-vec3(0,1,1));
 float j=dot(gradient(cell+vec3(1,1,1)),f-vec3(1,1,1));
 return mix(mix(mix(a,b,w.x),mix(c,d,w.x),w.y),
            mix(mix(e,g,w.x),mix(h,j,w.x),w.y),w.z);
}
float fractal(vec3 p){
 float result=0.,amplitude=.25;
 mat2 turn=mat2(.87758,.47943,-.47943,.87758);
 for(int i=0;i<8;i++){
  result+=amplitude*perlin(p);
  p.xy=p.xy*turn*2.5+100.;
  amplitude*=.659;
 }
 return result;
}
float circularEase(float x){
 x=clamp(x,0.,1.);
 return x<.5?(1.-sqrt(max(0.,1.-4.*x*x)))*.5:
             (sqrt(max(0.,1.-pow(-2.*x+2.,2.)))+1.)*.5;
}
float portraitLuma(vec3 c){return dot(c,vec3(.299,.587,.114));}
vec3 backdrop(vec2 uv){
 float aspect=uResolution.x/uResolution.y;
 vec2 halo=(uv-vec2(.5,.66))*vec2(aspect*.88,1.);
 float light=exp(-dot(halo,halo)*3.2);
 float value=.018+.66*light;
 value*=.23+.77*smoothstep(.04,.48,uv.y);
 value*=1.-.56*smoothstep(.5,1.,abs(uv.x-.5)*2.);
 return vec3(.98)-vec3(value*.10);
}

void main(){
 vec2 screen=vec2(vUv.x,1.-vUv.y);
 float aspect=uResolution.x/uResolution.y;
 // Follow the face on narrow artboards, using the same aspect-correct radius.
 vec2 centre=vec2(.5,(uFrame.z+uFrame.y*.43)/uResolution.y);
 centre+=uPointer*.008;
 vec2 metric=(screen-centre)*vec2(aspect,1.);
 float influence=circularEase(1.-length(metric)*2.24);
 float scale=3.42/((aspect+1.)*.5)*aspect;
 vec2 field=metric*scale*vec2(1.,.25);
 float phase=uTime*.18;
 vec2 drift=vec2(0.,uTime*.036);
 vec2 domain=vec2(fractal(vec3(field-drift+vec2(1.7,9.2),phase)),
                  fractal(vec3(field-drift+vec2(8.2,1.3),phase)));
 float folded=fractal(vec3(field+domain-drift,phase));
 // Move sample coordinates, including the alpha edge: real holes show paper.
 // Our cutout is narrower than the reference photo: keep its head connected.
 vec2 displacement=(vec2(folded)*.70+domain*.35)*influence*.40;
 vec2 warped=screen+displacement;
 vec2 photo=vec2((warped.x-.5)*uResolution.x/uFrame.x+.5,
                (warped.y*uResolution.y-uFrame.z)/uFrame.y);
 // Soft depth response, strongest on the head, damped by JS pointer momentum.
 float headDepth=exp(-dot((photo-vec2(.5,.42))/vec2(.18,.36),
                         (photo-vec2(.5,.42))/vec2(.18,.36)));
 photo+=uPointer*vec2(.009,.006)*headDepth;
 vec4 portrait=texture2D(uPortrait,clamp(vec2(photo.x,1.-photo.y),0.,1.));
 float inFrame=step(0.,photo.x)*step(photo.x,1.)*step(0.,photo.y)*step(photo.y,1.);
 float alpha=smoothstep(.40,.94,portrait.a)*inFrame;
 float lum=portraitLuma(portrait.rgb);
 float neck=smoothstep(.235,.34,photo.y)*(1.-smoothstep(.735,.80,photo.y));
 float skin=(1.-smoothstep(.105,.15,abs(photo.x-.494)))*neck;
 // Neutral paper tones retain the original lighting and displaced material.
 float sideLight=.20+.80*smoothstep(.018,.102,abs(photo.x-.5));
 float detail=portraitLuma(texture2D(uDetail,clamp(vec2(photo.x,1.-photo.y),0.,1.)).rgb);
 float lit=pow(max(mix(lum,detail,.88),0.),.72)*1.55;
 lit+=sideLight*.035;
 vec3 paper=vec3(.98);
 vec3 body=vec3(.004+lum*.20);
 vec3 skinColor=paper*clamp(lit,0.,1.);
 skinColor=mix(skinColor,vec3(.008),.12*(1.-sideLight));
 vec3 figure=mix(body,skinColor,skin);
 vec3 color=mix(backdrop(warped),figure,alpha);
 // Dither the complete composed scene into 0.08 tonal steps at 24 Hz.
 float tick=floor(uTime*24.);
 float dust=hash(floor(gl_FragCoord.xy)+vec2(tick*17.13,tick*9.71));
 color=floor(max(color,vec3(0.))/.08+dust)*.08;
 gl_FragColor=vec4(color,1.);
}
`;

export class PrintScene {
 constructor(canvas, reduced) {
  this.canvas=canvas;this.reduced=reduced;this.p=0;this.time=0;this.frameTime=0;
  this.pointer=new THREE.Vector2();this.pointerTarget=new THREE.Vector2();
  this.renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'low-power'});
  this.renderer.setPixelRatio(1);
  this.scene=new THREE.Scene();this.camera=new THREE.Camera();
  const loader=new THREE.TextureLoader(),waiting=[];
  const load=url=>{
   let complete;waiting.push(new Promise(resolve=>{complete=resolve;}));
   return loader.load(assetUrl(url),()=>{if(!this.disposed)this.render(0);complete();},undefined,()=>{if(!this.disposed)document.body.classList.add('no-canvas');complete();});
  };
  this.u={uPortrait:{value:load('/images/presence-faceless-v2.png')},uDetail:{value:load('/images/presence-portrait.jpg')},uTime:{value:0},uResolution:{value:new THREE.Vector2()},uFrame:{value:new THREE.Vector3()},uPointer:{value:this.pointer}};
  this.ready=Promise.all(waiting);
  this.mesh=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({uniforms:this.u,vertexShader:vertex,fragmentShader:fragment,depthTest:false,depthWrite:false}));
  this.scene.add(this.mesh);
  this.onResize=()=>this.resize();
  this.resizeObserver=new ResizeObserver(this.onResize);this.resizeObserver.observe(canvas.parentElement);
  this.resize();
  this.onPointer=event=>{
   if(this.reduced||event.pointerType==='touch')return;
   const rect=canvas.parentElement.getBoundingClientRect();
   this.pointerTarget.set((event.clientX-rect.left)/rect.width-.5,(event.clientY-rect.top)/rect.height-.5);
  };
  this.onLeave=()=>this.pointerTarget.set(0,0);
  canvas.parentElement.addEventListener('pointermove',this.onPointer);
  canvas.parentElement.addEventListener('pointerleave',this.onLeave);
  this.onLoss=event=>{event.preventDefault();document.body.classList.add('no-canvas');};
  canvas.addEventListener('webglcontextlost',this.onLoss);
 }
 resize(){
  const {width,height}=this.canvas.parentElement.getBoundingClientRect();
  this.renderer.setSize(width,height,false);
  this.u.uResolution.value.set(width,height);
  const mobile=width<=700,portraitHeight=height*(mobile?.76:.90);
  this.u.uFrame.value.set(portraitHeight*1.5,portraitHeight,height*(mobile?.25:.12));
  this.render(0);
 }
 render(dt){
  if(this.canvas.getBoundingClientRect().bottom<0)return;
  if(this.reduced&&dt>0)return;
  const delta=Math.min(.1,dt);
  this.time+=delta;this.frameTime+=delta;
  if(dt>0&&this.frameTime<1/24)return;
  this.pointer.lerp(this.pointerTarget,1.-Math.exp(-5.*this.frameTime));
  this.frameTime%=1/24;
  this.u.uTime.value=this.reduced?0:this.time;
  this.renderer.render(this.scene,this.camera);
 }
 destroy(){
  this.disposed=true;
  this.resizeObserver.disconnect();this.canvas.removeEventListener('webglcontextlost',this.onLoss);
  this.canvas.parentElement.removeEventListener('pointermove',this.onPointer);
  this.canvas.parentElement.removeEventListener('pointerleave',this.onLeave);
  this.mesh.geometry.dispose();this.mesh.material.dispose();this.u.uPortrait.value.dispose();this.u.uDetail.value.dispose();this.renderer.dispose();
 }
}
