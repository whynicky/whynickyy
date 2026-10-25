import * as T from 'three';
import {prepareGraphics} from './graphics.js';
import {buildWorld} from './compositions.js';
import {pose} from './timeline.js';
import {bindInput} from './interactions.js';
export async function mountExperience(canvas,{signal:parentSignal,onFrame,onUnavailable,onNegative}){
 const lifecycle=new AbortController(),signal=lifecycle.signal;let disposed=false,raf=0,last=0,graphics=null,world=null,input={x:0,y:0,pressure:0,negative:0};let p=0,target=0,px=0,py=0,pressure=0,negative=0,frames=0,intro=0,time=0;
 const renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.02;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.VSMShadowMap;
 const scene=new T.Scene(),paper=new T.Color(0xe8e6de),ink=new T.Color(0x070707);scene.background=paper.clone();scene.fog=new T.Fog(paper,48,88);const camera=new T.PerspectiveCamera(38,1,.1,160),look=new T.Vector3();
 const ambient=new T.HemisphereLight(0xffffff,0x77746c,1.4);scene.add(ambient);
 const key=new T.DirectionalLight(0xffffff,2.5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-18,right:18,top:16,bottom:-16,near:1,far:80});key.shadow.normalBias=.035;key.shadow.bias=-.0001;key.shadow.radius=4;key.shadow.blurSamples=8;scene.add(key,key.target);
 const rim=new T.DirectionalLight(0xffffff,1.2);scene.add(rim,rim.target);
 const backdrop=new T.Mesh(new T.PlaneGeometry(70,70),new T.MeshStandardMaterial({color:0xe8e5dc,roughness:1}));backdrop.position.z=-99;backdrop.receiveShadow=true;scene.add(backdrop);
 function wake(){if(!raf&&!disposed&&!document.hidden){last=performance.now();raf=requestAnimationFrame(draw);}}
 function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<800?1.35:1.7));renderer.setSize(innerWidth,innerHeight,false);wake();}
 function draw(now){raf=0;if(disposed||document.hidden||!world)return;const dt=Math.min((now-last)/1000,.05);last=now;time+=dt;const d=1-Math.exp(-7*dt);p+=(target-p)*d;px+=(input.x-px)*(1-Math.exp(-5*dt));py+=(input.y-py)*(1-Math.exp(-5*dt));pressure+=(input.pressure-pressure)*d;negative+=(input.negative-negative)*d;intro+=(1-intro)*(1-Math.exp(-3.5*dt));
 const shot=pose(p,camera.aspect),parallax=p<.04?.22:p>.48&&p<.6?.4:.03;camera.position.set(shot.eye[0]+px*parallax,shot.eye[1]+py*parallax,shot.eye[2]+(1-intro)*2);look.set(...shot.look);camera.lookAt(look);camera.rotateZ(shot.roll);world.update(p,shot.portrait,px,py,pressure,negative,time);
 scene.background.copy(paper).lerp(ink,shot.dark);scene.fog.color.copy(scene.background);key.position.set(look.x-12,look.y+14,look.z+14);key.target.position.copy(look);rim.position.set(look.x+10,look.y-4,look.z+7);rim.target.position.copy(look);ambient.intensity=1.4-shot.dark*.25;backdrop.visible=p>.57&&p<.79;
 canvas.classList.toggle('is-interactive',p>.48&&p<.6);renderer.render(scene,camera);canvas.dataset.progress=p.toFixed(3);canvas.dataset.frames=++frames;canvas.dataset.negative=negative.toFixed(2);canvas.dataset.pressure=pressure.toFixed(2);onFrame(p,shot);
 if(Math.abs(p-target)>.00008||Math.abs(px-input.x)>.001||Math.abs(py-input.y)>.001||Math.abs(pressure-input.pressure)>.001||Math.abs(negative-input.negative)>.001||intro<.999)wake();
 }
 function dispose(){if(disposed)return;disposed=true;lifecycle.abort();cancelAnimationFrame(raf);const geometries=new Set(),materials=new Set(),textures=new Set(Object.values(graphics?.textures||{}));scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.customDepthMaterial)materials.add(o.customDepthMaterial);for(const m of(o.material?Array.isArray(o.material)?o.material:[o.material]:[]))materials.add(m);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());key.shadow.dispose();renderer.dispose();}
 parentSignal.addEventListener('abort',dispose,{once:true});renderer.debug.onShaderError=()=>queueMicrotask(()=>{dispose();onUnavailable();});
 try{graphics=await prepareGraphics();if(parentSignal.aborted){dispose();return null;}world=buildWorld(scene,graphics);resize();world.update(0,camera.aspect<.85,0,0,0,0,0);const shot=pose(0,camera.aspect);camera.position.set(...shot.eye);camera.lookAt(...shot.look);await renderer.compileAsync(scene,camera);if(disposed)return null;input=bindInput({canvas,signal,wake,getProgress:()=>p,onNegative});window.addEventListener('resize',resize,{signal,passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else wake();},{signal});canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();dispose();onUnavailable();},{signal});wake();return {setProgress(value){target=value;wake();},dispose};}catch(e){dispose();throw e;}
}
