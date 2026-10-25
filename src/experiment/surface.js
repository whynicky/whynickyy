import * as THREE from 'three';

// Each strip is a sampled physical surface. Both the lit mesh and its shadow
// use the same deformation, including finite-difference surface normals.
const deformation = `
attribute vec2 aLocal;
attribute float aStrip;
uniform float uOpen,uCoil,uEnd,uTouch,uPressure,uTime,uIntro,uPortrait;
uniform vec2 uPointer;
const float PI=3.14159265359;
vec3 form(vec2 q,float strip){
  float u=(strip+q.x)/16.;
  float width=mix(11.,6.6,uPortrait);
  float x=(u-.5)*width;
  float y=(q.y-.5)*mix(7.2,10.,uPortrait)*(.88+.12*cos((u-.5)*PI*1.6));
  y+=(sin(u*140.)*.028+sin(u*239.)*.014)*pow(abs(q.y-.5)*2.,18.);
  float edge=sin(q.y*93.+strip*17.)*.008+sin(q.y*227.+strip)*.005;
  x+=edge;
  float local=(q.x-.5)*(width/16.-mix(.001,.026,uOpen));
  float center=(strip-7.5)*width/16.;
  float angle=uOpen*(sin(strip*.79)*.85+(q.y-.5)*.7);
  vec3 sheet=vec3(center+local*cos(angle),y,local*sin(angle));
  sheet.z+=sin(x*.55)*.55+cos(y*.7+x*.5)*.24;
  sheet.x+=uOpen*(center*.16+sin(q.y*PI+strip*.3)*.45);
  sheet.y+=uOpen*sin(strip*1.8)*.45;
  sheet.z+=uOpen*(sin(strip*.76)*1.8+sin(q.y*PI*1.45+strip*.2)*1.7);
  sheet.z+=sin(q.y*PI)*sin(uTime*.7+strip*.25)*.025;
  float a=strip/16.*PI*2.;
  float tension=uTouch*(.15+uPressure*.9);
  float theta=a+(q.y-.5)*(3.15+uPointer.x*.55*uTouch)+sin(q.y*PI)*uPointer.y*.25*uTouch;
  float r=2.7+(q.x-.5)*.76+sin(q.y*PI)*.35+tension*(.8+sin(a+q.y*PI)*.35);
  vec3 coil=vec3(cos(theta)*r,sin(theta)*r,(q.y-.5)*(5.2-tension*2.5)+sin(a)*.5);
  coil.z+=uTouch*sin(a+q.y*PI*2.+uTime*.45)*(.08+uPressure*.22);
  coil.x+=uTouch*uPointer.x*(.3+q.y*.3);
  coil.y+=uTouch*uPointer.y*(.3+q.y*.3);
  vec3 p=mix(sheet,coil,uCoil);
  vec3 end=vec3(x*.65+mix(4.,0.,uPortrait),y*.62-mix(.6,2.,uPortrait),sin(x*.65+q.y*PI)*.4+strip*.025);
  p=mix(p,end,uEnd);
  p.z+=(1.-uIntro)*(3.+sin(strip*.63)*2.);
  p.y+=(1.-uIntro)*(strip-7.5)*.16;
  return p;
}`;

export function createPhotographicSurface(image, { anisotropy=4 }={}) {
  const geometry=new THREE.BufferGeometry();
  const positions=[],uvs=[],locals=[],strips=[],indices=[];
  const across=5,along=88;
  for(let i=0;i<16;i++){
    const base=positions.length/3;
    for(let y=0;y<=along;y++)for(let x=0;x<=across;x++){
      positions.push(((i+x/across)/16-.5)*11,(y/along-.5)*7.2,0);
      uvs.push((i+x/across)/16,y/along);locals.push(x/across,y/along);strips.push(i);
    }
    for(let y=0;y<along;y++)for(let x=0;x<across;x++){
      const n=base+y*(across+1)+x;indices.push(n,n+1,n+across+2,n,n+across+2,n+across+1);
    }
  }
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
  geometry.setAttribute('aLocal',new THREE.Float32BufferAttribute(locals,2));
  geometry.setAttribute('aStrip',new THREE.Float32BufferAttribute(strips,1));
  geometry.setIndex(indices);geometry.computeVertexNormals();
  const texture=new THREE.Texture(image);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=anisotropy;texture.needsUpdate=true;
  const inkCanvas=document.createElement('canvas');inkCanvas.width=2048;inkCanvas.height=1340;
  const ink=inkCanvas.getContext('2d');ink.fillStyle='#f0eee7';ink.font='850 330px Inter, sans-serif';ink.textAlign='center';ink.textBaseline='middle';
  ink.letterSpacing='-22px';ink.fillText('whynicky',980,710,1810);ink.letterSpacing='0px';ink.font='500 66px Inter, sans-serif';ink.fillText('®',1920,605);
  const inkMap=new THREE.CanvasTexture(inkCanvas);inkMap.colorSpace=THREE.SRGBColorSpace;
  const portraitCanvas=document.createElement('canvas');portraitCanvas.width=1024;portraitCanvas.height=1536;const pg=portraitCanvas.getContext('2d');pg.translate(512,768);pg.rotate(-Math.PI/2);pg.fillStyle='#f0eee7';pg.font='850 270px Inter';pg.textAlign='center';pg.textBaseline='middle';pg.letterSpacing='-18px';pg.fillText('whynicky',0,0,1380);pg.font='500 55px Inter';pg.fillText('®',695,-100);const portraitInk=new THREE.CanvasTexture(portraitCanvas);portraitInk.colorSpace=THREE.SRGBColorSpace;
  const uniforms={uPortrait:{value:0},uPortraitInk:{value:portraitInk},uOpen:{value:0},uCoil:{value:0},uEnd:{value:0},uTouch:{value:0},uPressure:{value:.15},uTime:{value:0},uIntro:{value:1},uPointer:{value:new THREE.Vector2()},uInk:{value:inkMap},uNegative:{value:0},uPrint:{value:1}};
  const material=new THREE.MeshStandardMaterial({map:texture,side:THREE.DoubleSide,bumpMap:texture,bumpScale:.018,roughness:.87,metalness:.025,color:0xffffff});
  material.onBeforeCompile=shader=>{
    Object.assign(shader.uniforms,uniforms);
    shader.vertexShader=deformation+"\n"+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>',`vec3 du=form(aLocal+vec2(.002,0.),aStrip)-form(aLocal-vec2(.002,0.),aStrip);vec3 dv=form(aLocal+vec2(0.,.002),aStrip)-form(aLocal-vec2(0.,.002),aStrip);vec3 objectNormal=normalize(cross(du,dv));`);
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','vec3 transformed=form(aLocal,aStrip);');
    shader.fragmentShader='uniform sampler2D uInk,uPortraitInk;uniform float uPortrait,uNegative,uPrint,uTouch,uPressure;uniform vec2 uPointer;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`vec2 photoUV=vec2(mix(vMapUv.x,(vMapUv.x-.5)*.44+.5,uPortrait),vMapUv.y);float influence=exp(-distance(photoUV,uPointer*.3+.5)*5.);photoUV.x+=sin(photoUV.y*55.)*influence*uPressure*uTouch*.009;vec4 photographic=texture2D(map,photoUV);vec4 lettering=mix(texture2D(uInk,vMapUv),texture2D(uPortraitInk,vMapUv),uPortrait);photographic.rgb=mix(photographic.rgb,vec3(.89),lettering.a*uPrint);photographic.rgb=mix(photographic.rgb,pow(vec3(1.)-pow(clamp(photographic.rgb,0.,1.),vec3(1./2.2)),vec3(2.2)),uNegative);if(!gl_FrontFacing){photographic.rgb=photographic.rgb*.55+vec3(.12);}diffuseColor*=photographic;`);
  };
  const depthMaterial=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking,side:THREE.DoubleSide});
  depthMaterial.onBeforeCompile=shader=>{Object.assign(shader.uniforms,uniforms);shader.vertexShader=deformation+"\n"+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','vec3 transformed=form(aLocal,aStrip);');};
  const mesh=new THREE.Mesh(geometry,material);mesh.frustumCulled=false;mesh.castShadow=true;mesh.receiveShadow=true;mesh.customDepthMaterial=depthMaterial;
  return {mesh,uniforms,dispose(){geometry.dispose();material.dispose();depthMaterial.dispose();texture.dispose();inkMap.dispose();portraitInk.dispose();}};
}
