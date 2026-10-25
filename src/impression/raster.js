import * as T from 'three';
export function createRaster(texture){
 const uniforms={uMap:{value:texture},uRaster:{value:0},uPressure:{value:0},uPointer:{value:new T.Vector2(.5,.5)},uExposure:{value:0},uTime:{value:0},uNegative:{value:0}};
 const material=new T.ShaderMaterial({uniforms,side:T.DoubleSide,vertexShader:`varying vec2 vUv;varying float vShade;uniform float uRaster,uPressure;uniform vec2 uPointer;
 void main(){vUv=uv;vec3 p=position;float d=distance(uv,uPointer);p.z+=sin(uv.x*3.14159)*sin(uv.y*3.14159)*uRaster*2.;p.z+=exp(-d*d*18.)*uPressure*1.2;vShade=1.-uRaster*.18*abs(cos(uv.x*3.14159));gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
 fragmentShader:`varying vec2 vUv;varying float vShade;uniform sampler2D uMap;uniform float uRaster,uPressure,uExposure,uTime,uNegative;uniform vec2 uPointer;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 void main(){vec2 uv=vUv;float d=distance(uv,uPointer);uv.x+=sin(uv.y*12.+uPressure)*exp(-d*d*9.)*uPressure*.025;
 float image=texture2D(uMap,uv).r;vec2 grid=vec2(180.,110.);vec2 cell=floor(uv*grid);vec2 local=fract(uv*grid)-.5;float ink=texture2D(uMap,(cell+.5)/grid).r;float radius=mix(.08,.47,ink);float dotInk=1.-smoothstep(radius-.04,radius+.01,length(local));float print=mix(image,dotInk,uRaster);
 float light=exp(-distance(uv,uPointer)*distance(uv,uPointer)*5.);float exposed=mix(.12+image*.15,print,light);print=mix(print,exposed,uExposure);print=mix(print,1.-print,uNegative);float grain=(hash(gl_FragCoord.xy)-.5)*.055;
 vec3 color=mix(vec3(.025),vec3(.91,.90,.86),clamp(print*vShade+grain,0.,1.));gl_FragColor=vec4(color,1.);
 #include <colorspace_fragment>
 }`});
 const mesh=new T.Mesh(new T.PlaneGeometry(23,14,80,48),material);return {mesh,uniforms};
}
