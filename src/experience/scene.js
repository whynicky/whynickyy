import * as T from 'three';
import {loadAssets} from './assets.js';
import {buildCompositions} from './compositions.js';
import {disposeWorld} from './materials.js';
import {cameraPose} from './timeline.js';
import {bindInteractions} from './interactions.js';
export async function mountExperience(canvas,{signal:parentSignal,onFrame,onUnavailable,onGesture}){
 const lifecycle=new AbortController(),signal=lifecycle.signal;let disposed=false,raf=0,last=0,assets={},world=null,input={x:0,y:0,amount:0};
 let p=0,target=0,px=0,py=0,amount=0,frames=0,intro=0;const look=new T.Vector3();
 const renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.96;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.VSMShadowMap;
 const scene=new T.Scene(),paper=new T.Color(0xe9e7df),ink=new T.Color(0x111111);scene.background=paper.clone();scene.fog=new T.Fog(paper,42,85);
 const camera=new T.PerspectiveCamera(38,1,.1,190);
 const ambient=new T.HemisphereLight(0xffffff,0x87857d,1.25);scene.add(ambient);
 const key=new T.DirectionalLight(0xffffff,1.85);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-17,right:17,top:14,bottom:-14,near:1,far:70});key.shadow.normalBias=.045;key.shadow.bias=-.0001;key.shadow.radius=4;key.shadow.blurSamples=8;scene.add(key,key.target);
 const fill=new T.DirectionalLight(0xffffff,.65);scene.add(fill,fill.target);
 const ground=new T.Mesh(new T.PlaneGeometry(240,500),new T.MeshStandardMaterial({color:0xd6d3cb,roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.set(0,-10,-65);ground.receiveShadow=true;scene.add(ground);
 function wake(){if(!raf&&!disposed&&!document.hidden){last=performance.now();raf=requestAnimationFrame(draw);}}
 function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<800?1.35:1.7));renderer.setSize(innerWidth,innerHeight,false);wake();}
 function draw(now){raf=0;if(disposed||document.hidden||!world)return;const dt=Math.min((now-last)/1000,.05);last=now;const d=1-Math.exp(-7*dt);p+=(target-p)*d;px+=(input.x-px)*d;py+=(input.y-py)*d;amount+=(input.amount-amount)*(1-Math.exp(-5*dt));intro+=(1-intro)*(1-Math.exp(-4*dt));
 const pose=cameraPose(p,camera.aspect);const pointer=p<.06?.13:p>.755&&p<.89?.35:.025;
 camera.position.set(pose.eye[0]+px*pointer,pose.eye[1]+py*pointer,pose.eye[2]+(1-intro)*1.2);look.set(...pose.look);camera.lookAt(look);
 world.update(p,pose.portrait,amount,px,py);scene.background.copy(paper).lerp(ink,pose.dark);scene.fog.color.copy(scene.background);
 key.position.set(look.x-10,look.y+13,look.z+15);key.target.position.copy(look);fill.position.set(look.x+12,look.y-2,look.z+8);fill.target.position.copy(look);ambient.intensity=1.25-pose.dark*.1;ground.material.color.copy(paper).lerp(ink,pose.dark);ground.position.y=-10-pose.dark*6;
 canvas.classList.toggle('is-interactive',p>.755&&p<.89);renderer.render(scene,camera);frames++;canvas.dataset.progress=p.toFixed(3);canvas.dataset.frames=frames;canvas.dataset.separation=amount.toFixed(2);onFrame(p,pose);
 if(Math.abs(target-p)>.00008||Math.abs(px-input.x)>.001||Math.abs(py-input.y)>.001||Math.abs(amount-input.amount)>.001||intro<.999)wake();
 }
 function dispose(){if(disposed)return;disposed=true;lifecycle.abort();cancelAnimationFrame(raf);disposeWorld(scene,assets);key.shadow.dispose();renderer.dispose();}
 parentSignal.addEventListener('abort',dispose,{once:true});
 renderer.debug.onShaderError=()=>queueMicrotask(()=>{dispose();onUnavailable();});
 try{assets=await loadAssets(renderer);if(parentSignal.aborted){dispose();return null;}world=buildCompositions(scene,assets);resize();world.update(0,camera.aspect<.85,0,0,0);const pose=cameraPose(0,camera.aspect);camera.position.set(...pose.eye);camera.lookAt(...pose.look);await renderer.compileAsync(scene,camera);if(disposed)return null;
 input=bindInteractions({canvas,signal,wake,getProgress:()=>p,onGesture});window.addEventListener('resize',resize,{signal,passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else wake();},{signal});canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();dispose();onUnavailable();},{signal});wake();return {setProgress(value){target=value;wake();},dispose};
 }catch(e){dispose();throw e;}
}
