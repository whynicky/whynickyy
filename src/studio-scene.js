import * as THREE from 'three';

const vertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
const fragment=`
varying vec2 vUv;
uniform sampler2D uHuman;
uniform float uProgress,uTime;
uniform vec2 uResolution;
float hash(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
float fbm(vec2 p){float v=0.,amp=.57;for(int i=0;i<3;i++){v+=amp*noise(p);p=mat2(.8,-.6,.6,.8)*p*2.1+7.3;amp*=.48;}return v;}
float ease(float a,float b,float t){float x=clamp((t-a)/(b-a),0.,1.);return x*x*(3.-2.*x);}
vec2 crop(vec2 uv,float aspect){return (uv-.5)*vec2(min(1.,aspect/1.5),min(1.,1.5/aspect))+.5;}
float gray(vec3 c){return dot(c,vec3(.299,.587,.114));}
void main(){
 vec2 uv=vUv;float aspect=uResolution.x/uResolution.y;
 float a=ease(.18,.98,uProgress),b=ease(1.4,2.04,uProgress),c=ease(2.55,3.18,uProgress);
 float grain=(hash(gl_FragCoord.xy)-.5)*.055;
 vec3 paper=vec3(.87)+grain,ink=vec3(.025)+grain*.2;
 // The silhouette stays completely still; only its surface effect evolves.
 float t=uTime;
 vec2 photo=(crop(uv,aspect)-.5)*1.40+.5-vec2(0.,.06);
 float head=1.-smoothstep(.90,1.12,length((photo-vec2(.5,.55))/vec2(.19,.33)));
 float shoulders=1.-smoothstep(.993,1.007,length((photo-vec2(.5,-.24))/vec2(.49,.56)));
 float basePortrait=gray(texture2D(uHuman,clamp(photo,0.,1.)).rgb);
 shoulders*=mix(1.-smoothstep(.09,.18,basePortrait),1.,1.-smoothstep(.02,.10,photo.y));
 float hairCore=1.-smoothstep(.86,1.,length((photo-vec2(.5,.755))/vec2(.12,.09)));
 float subject=max(head*(1.-smoothstep(.18,.42,basePortrait)),hairCore);
 basePortrait=min(basePortrait*.25,.045);
 float background=.06+.68*pow(1.-uv.y,.72)+.23*exp(-pow((uv.x-.5)*2.7,2.)-pow((uv.y-.38)*1.5,2.));
 background*=1.-.88*pow(abs(uv.x-.5)*2.,2.0);
 vec3 hero=mix(vec3(background)+grain,vec3(basePortrait)+grain*.10,subject);
 hero=mix(hero,vec3(.008)+grain*.06,shoulders);
 // The photographic silhouette is fixed. A separate displaced surface supplies the face.
 float faceMask=(1.-smoothstep(.12,.16,abs(photo.x-.5)))*smoothstep(.18,.27,photo.y)*(1.-smoothstep(.62,.71,photo.y));
 float erasedFace=(1.-smoothstep(.88,1.07,length((photo-vec2(.5,.445))/vec2(.205,.295))))*smoothstep(.36,.40,photo.y)*(1.-smoothstep(.61,.71,photo.y));
 hero=mix(hero,vec3(background)+grain,erasedFace);
 float blackPixels=hash(floor(gl_FragCoord.xy/1.05)+vec2(floor(t*14.)*13.7,floor(t*14.)*7.9));
 hero*=mix(.68,1.,smoothstep(.025,.065,blackPixels));
 float firstEdge=a*1.2-.1+sin(uv.x*3.14159)*sin(a*3.14159)*.08;
 vec3 base=mix(hero,paper,1.-smoothstep(firstEdge-.004,firstEdge+.004,uv.y));
 float channel=floor(uv.x*10.);
 float scan=1.-smoothstep(b*1.4-.2+sin(channel*1.73)*.055-.05,b*1.4-.2+sin(channel*1.73)*.055+.05,1.-uv.y);
 base=mix(base,ink,scan);
 float edge=uv.y+sin(uv.x*7.)*.018;
 float reveal=1.-smoothstep(c*1.2-.16,c*1.2-.04,edge);

 vec3 last=paper;
 gl_FragColor=vec4(mix(base,last,reveal),1.);
}`;
const faceVertex=`
precision highp float;
uniform float uTime;uniform vec2 uResolution;uniform sampler2D uDetail;
varying vec3 vColor;varying float vAlpha;varying float vMass;
float hash(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
void main(){
 vec2 f=uv*2.-1.;float t=uTime;
 float random=hash(vec3(f*713.,9.));
 // Slow coherent fragments, with faster grain along their torn edges.
 float broad=noise(vec3(f*vec2(4.8,2.1),t*.36));
 float middle=noise(vec3(f*vec2(17.,5.5)+vec2(broad*2.,-t*.20),t*.52));
 float fine=noise(vec3(f*vec2(71.,20.),t*.72));
 float flow=broad*.63+middle*.29+fine*.08;
 float edge=(1.-smoothstep(.82,1.,abs(f.x)))*(1.-smoothstep(.82,1.,abs(f.y)));
 float jaw=mix(.57,1.,smoothstep(-1.,.1,f.y));
 float lobe=.93+.08*sin(f.y*4.1+t*.65)+.06*sin(f.y*7.3-t*.41);
 float bend=.055*sin(t*.58+f.y*2.6)+.028*sin(t*.94-f.y*5.);
 float oval=1.-smoothstep(.78,1.06,length(vec2(f.x,f.y*.61)));
 vec2 drift=vec2((broad-.5)*.15+(middle-.5)*.055,(flow-.5)*.30)*edge;
 vec2 source=vec2(.5+f.x*.14,.435+f.y*.225);
 source+=vec2((middle-.5)*.016,(broad-.5)*.045);
 float lum=dot(texture2D(uDetail,source).rgb,vec3(.299,.587,.114));
 float fragmented=smoothstep(.35,.58,middle*.65+broad*.35+fine*.12);
 // Preserve a connected facial core while letting cheeks and temples dissolve.
 float core=(1.-smoothstep(.26,.68,abs(f.x+.035*sin(f.y*3.+t*.35))))*(1.-smoothstep(.80,1.,abs(f.y)));
 fragmented=max(fragmented,core*.96);
 float detail=pow(clamp(lum*3.5,0.,1.),.80);
 float light=clamp(detail*.57+fine*.14,0.,1.);
 vec3 shadow=vec3(.006,.015,.045),blue=vec3(.12,.31,.92),chrome=vec3(.62,.73,.95);
 vColor=mix(shadow,blue,smoothstep(.06,.66,light));
 vColor=mix(vColor,chrome,smoothstep(.73,.98,light)*.66);
 vColor*=.55+middle*.65;
 float crown=1.-smoothstep(.50+broad*.23,.89+middle*.14,f.y);
 vMass=edge*oval*max(fragmented,.72);
 vAlpha=edge*oval*fragmented*crown*(.65+.35*smoothstep(.025,.19,detail));
 float dust=noise(vec3(f*vec2(180.,75.),t*.9));
 vAlpha*=smoothstep(.22,.55,dust);
 if(random>fragmented*.72)vAlpha=0.;
 vec2 silhouette=vec2(f.x*jaw*lobe+bend+drift.x,f.y+drift.y+.10*sin(f.x*4.+t*.51));
 float yaw=.35*sin(t*.37);
 float depth=sqrt(max(0.,1.-f.x*f.x))*.48;
 silhouette.x=silhouette.x*cos(yaw)+(depth-.22)*sin(yaw);
 vec2 photo=vec2(.5+silhouette.x*.171,.465+silhouette.y*.29);
 // Fine scatter is localized; the hair, shoulders and framing never move.
 photo+=vec2(random-.5,hash(vec3(f*921.,1.))-.5)*(.0012+(1.-fragmented)*.007);
 float aspect=uResolution.x/uResolution.y;
 vec2 scale=vec2(min(1.,aspect/1.5),min(1.,1.5/aspect));
 vec2 screen=(photo-.5+vec2(0.,.06))/1.40/scale+.5;
 gl_Position=vec4(screen*2.-1.,0.,1.);
 gl_PointSize=clamp(uResolution.y/850.,.9,2.)*(.8+random*.7);
}`;
const faceFragment=`
precision highp float;
varying vec3 vColor;varying float vAlpha;varying float vMass;
void main(){if(vAlpha<.08)discard;gl_FragColor=vec4(vColor,vAlpha);}
`;
const massFragment=`
precision highp float;
varying vec3 vColor;varying float vAlpha;varying float vMass;
void main(){if(vMass<.12)discard;float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);gl_FragColor=vec4(vec3(.008,.01,.018)+vColor*.065,1.);}
`;
export class PrintScene{
 constructor(canvas,reduced){
  this.canvas=canvas;this.reduced=reduced;this.p=0;this.time=0;
  this.renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'high-performance'});
  this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));this.scene=new THREE.Scene();this.camera=new THREE.Camera();
  const loader=new THREE.TextureLoader(),waiting=[];
  const texture=url=>{let resolve;waiting.push(new Promise(r=>resolve=r));return loader.load(url,()=>resolve(),undefined,()=>{document.body.classList.add('no-canvas');resolve();});};
  this.u={uProgress:{value:0},uTime:{value:0},uResolution:{value:new THREE.Vector2()},uHuman:{value:texture('/images/presence-silhouette.jpg')},uDetail:{value:texture('/images/presence-portrait.jpg')}};
  this.ready=Promise.all(waiting);
  this.mesh=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({uniforms:this.u,vertexShader:vertex,fragmentShader:fragment,depthTest:false,depthWrite:false}));this.scene.add(this.mesh);
  this.face=new THREE.Points(new THREE.PlaneGeometry(2,2,innerWidth<700?220:290,innerWidth<700?290:380),new THREE.ShaderMaterial({uniforms:this.u,vertexShader:faceVertex,fragmentShader:faceFragment,transparent:true,depthTest:false,depthWrite:false}));this.face.renderOrder=2;this.scene.add(this.face);
  this.mass=new THREE.Mesh(this.face.geometry,new THREE.ShaderMaterial({uniforms:this.u,vertexShader:faceVertex,fragmentShader:massFragment,side:THREE.DoubleSide,depthTest:false,depthWrite:false}));this.mass.renderOrder=1;this.scene.add(this.mass);
  this.onResize=()=>this.resize();window.addEventListener('resize',this.onResize);this.resize();
  this.onLoss=e=>{e.preventDefault();document.body.classList.add('no-canvas');};canvas.addEventListener('webglcontextlost',this.onLoss);
 }
 resize(){this.w=innerWidth;this.h=innerHeight;this.renderer.setSize(this.w,this.h);this.u.uResolution.value.set(this.w*this.renderer.getPixelRatio(),this.h*this.renderer.getPixelRatio());}
 render(dt){if(this.canvas.getBoundingClientRect().bottom<0)return;this.time+=Math.min(.05,dt);this.u.uProgress.value=this.p;this.u.uTime.value=this.reduced?0:this.time;this.renderer.render(this.scene,this.camera);}
 destroy(){window.removeEventListener('resize',this.onResize);this.canvas.removeEventListener('webglcontextlost',this.onLoss);this.mesh.geometry.dispose();this.mesh.material.dispose();this.u.uHuman.value.dispose();this.u.uDetail.value.dispose();this.face.geometry.dispose();this.face.material.dispose();this.mass.material.dispose();this.renderer.dispose();}
}
