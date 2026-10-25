import * as THREE from 'three';
import { createPhotographicSurface } from './surface.js';
import { compose, smooth } from './choreography.js';

export async function mountExperiment(canvas,{onFrame,onUnavailable,signal:parentSignal}){
  const lifecycle=new AbortController(),signal=lifecycle.signal;
  if(parentSignal.aborted)return null;
  parentSignal.addEventListener('abort',()=>{lifecycle.abort();dispose();},{once:true});
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.VSMShadowMap;
  const scene=new THREE.Scene(),paper=new THREE.Color(0xe5e2db),black=new THREE.Color(0x090a09);scene.background=paper.clone();
  const camera=new THREE.PerspectiveCamera(38,1,.08,80);
  const ambient=new THREE.HemisphereLight(0xffffff,0x5d5d56,2);scene.add(ambient);
  const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(-6,7,9);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-10,right:10,top:10,bottom:-10,near:.1,far:35});key.shadow.radius=4;key.shadow.blurSamples=8;key.shadow.bias=-.0003;key.shadow.normalBias=.045;scene.add(key);
  const rim=new THREE.DirectionalLight(0xffffff,2.8);rim.position.set(4,-1,-4);scene.add(rim);
  const backdrop=new THREE.Mesh(new THREE.PlaneGeometry(150,150),new THREE.ShadowMaterial({color:0x000000,opacity:.18}));backdrop.position.z=-8;backdrop.receiveShadow=true;scene.add(backdrop);
  const words=[];
  function makeWord(text,italic){const c=document.createElement('canvas');c.width=2048;c.height=640;const g=c.getContext('2d');g.fillStyle='#efede6';g.textAlign='center';g.textBaseline='middle';g.font=italic?'italic 560px Georgia':'850 580px Inter';g.fillText(text,1024,340,1990);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const material=new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:THREE.DoubleSide});const mesh=new THREE.Mesh(new THREE.PlaneGeometry(7.2,2.25),material);scene.add(mesh);words.push(mesh);}
  let surface=null,disposed=false,raf=0,last=0,time=0,progress=0,target=0,px=0,py=0,tx=0,ty=0,pressure=.15,targetPressure=.15,negative=0,targetNegative=0,pinnedNegative=0,intro=0,targetIntro=1,frames=0,slow=0,dpr=1;
  let frameCount=0,shaderFailed=false;const look=new THREE.Vector3();
  renderer.debug.onShaderError=()=>{shaderFailed=true;queueMicrotask(()=>{dispose();onUnavailable();});};
  const resize=()=>{const w=innerWidth,h=innerHeight;camera.aspect=w/h;camera.updateProjectionMatrix();dpr=Math.min(devicePixelRatio||1,w<700?1.35:1.7);renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);wake();};
  const wake=()=>{if(!raf&&!disposed&&!document.hidden){last=performance.now();raf=requestAnimationFrame(draw);}};
  function draw(now){
    raf=0;if(disposed||document.hidden||!surface)return;
    const delta=Math.min((now-last)/1000,.05);last=now;time+=delta;const damping=1-Math.exp(-6.5*delta);
    progress+=(target-progress)*damping;px+=(tx-px)*damping;py+=(ty-py)*damping;pressure+=(targetPressure-pressure)*damping;negative+=(targetNegative-negative)*damping;intro+=(targetIntro-intro)*(1-Math.exp(-3.5*delta));
    const pose=compose(progress,camera.aspect),u=surface.uniforms;
    u.uPortrait.value=camera.aspect<.85?1:0;u.uOpen.value=pose.open;u.uCoil.value=pose.coil;u.uEnd.value=pose.end;u.uTouch.value=pose.touch;u.uPressure.value=pressure;u.uNegative.value=negative*pose.touch;u.uPrint.value=pose.print;u.uIntro.value=intro;u.uTime.value=time;u.uPointer.value.set(px,py);
    surface.mesh.rotation.set(pose.rotation[0]+py*pose.touch*.2,pose.rotation[1]+px*pose.touch*.32,pose.rotation[2]);
    camera.position.set(pose.camera[0]+px*(.28+pose.touch*2.2),pose.camera[1]+py*(.18+pose.touch*1.6),pose.camera[2]);look.set(...pose.look);camera.lookAt(look);
    scene.background.copy(paper).lerp(black,pose.dark);backdrop.material.opacity=.18*(1-pose.dark);backdrop.visible=progress<.33||progress>.51;
    key.intensity=3-pose.dark*.9;ambient.intensity=2-pose.dark*1.1;rim.intensity=2.8+pose.dark*2;key.position.x=-6+px*4+pose.coil*7;key.position.y=7+py*3;
    words.forEach((word,i)=>{word.visible=progress>.34&&progress<.61;word.material.opacity=smooth(.34,.40,progress)*(1-smooth(.54,.61,progress));word.position.set((i?1:-1)*(progress-.46)*10,i?-1.1:1.1,0);word.quaternion.copy(camera.quaternion);});
    renderer.render(scene,camera);frameCount++;
    canvas.dataset.progress=progress.toFixed(3);canvas.dataset.frames=String(frameCount);canvas.dataset.tension=pressure.toFixed(2);canvas.dataset.negative=negative.toFixed(2);
    onFrame(progress,pose);
    frames++;if(delta>.034)slow++;if(frames===100&&slow>45&&dpr>1){dpr=1;renderer.setPixelRatio(1);}
    const moving=Math.abs(progress-target)>.0001||Math.abs(px-tx)>.001||Math.abs(py-ty)>.001||Math.abs(pressure-targetPressure)>.001||Math.abs(negative-targetNegative)>.001||intro<.999;
    // A slow living surface in the exploration act; all other scenes settle.
    if(moving||(progress>.56&&progress<.86))wake();
  }
  function dispose(){if(disposed)return;disposed=true;lifecycle.abort();cancelAnimationFrame(raf);surface?.dispose();words.forEach(w=>{w.geometry.dispose();w.material.map.dispose();w.material.dispose();});backdrop.geometry.dispose();backdrop.material.dispose();key.shadow.dispose();renderer.dispose();}
  try{
    const image=new Image();image.src=innerWidth<700?'./art/membrane-mobile.webp':'./art/membrane.webp';await image.decode();await document.fonts.ready;
    if(signal.aborted){dispose();return null;}
    makeWord('NOT',false);makeWord('STILL.',true);
    surface=createPhotographicSurface(image,{anisotropy:Math.min(8,renderer.capabilities.getMaxAnisotropy())});scene.add(surface.mesh);
    resize();const initial=compose(0,camera.aspect);camera.position.set(...initial.camera);camera.lookAt(0,0,0);
    await renderer.compileAsync(scene,camera);if(shaderFailed)throw new Error('The photographic shader could not compile.');if(signal.aborted){dispose();return null;}
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();dispose();onUnavailable();},{signal});
    window.addEventListener('resize',resize,{signal,passive:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else wake();},{signal});
    window.addEventListener('pointermove',e=>{if(e.target.closest('input'))return;tx=(e.clientX/innerWidth-.5)*2;ty=(.5-e.clientY/innerHeight)*2;wake();},{signal,passive:true});
    window.addEventListener('pointerdown',e=>{if(progress<.57||progress>.86||e.target.closest('a,button,input'))return;targetNegative=1;targetPressure=1;wake();},{signal,passive:true});
    const release=()=>{targetNegative=pinnedNegative;targetPressure=Number(document.querySelector('#tension').value)/100;wake();};
    window.addEventListener('pointerup',release,{signal});window.addEventListener('pointercancel',release,{signal});window.addEventListener('blur',release,{signal});
    wake();return {setProgress(p){target=p;wake();},setTension(p){targetPressure=p;wake();},setNegative(value){pinnedNegative=targetNegative=value?1:0;wake();},skipIntro(){intro=targetIntro=1;wake();},dispose};
  }catch(error){dispose();throw error;}
}
