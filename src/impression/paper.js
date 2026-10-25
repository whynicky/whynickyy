import * as T from 'three';
const deform=`
uniform float uCurl; uniform float uFold; uniform vec2 uSize;
vec3 deform(vec3 p){
 float t=(p.x/uSize.x+.5);float a=uCurl*2.8;
 if(abs(a)>.001){p.x=-uSize.x*.5+sin(t*a)*uSize.x/a;p.z+=(1.-cos(t*a))*uSize.x/a;}
 if(uFold>.001){float v=p.y+uSize.y*.5;float yy=0.;float zz=0.;float seg=uSize.y/6.;
 for(int i=0;i<6;i++){float part=clamp(v-float(i)*seg,0.,seg);float ang=uFold*(mod(float(i),2.)<.5?1.:-1.);yy+=cos(ang)*part;zz+=sin(ang)*part;}
 p.y=yy-uSize.y*cos(uFold)*.5;p.z+=zz;}
 return p;
}`;
export function createPaper(texture,grain,w,h){const uniforms={uCurl:{value:0},uFold:{value:0},uSize:{value:new T.Vector2(w,h)}};
 const front=new T.MeshStandardMaterial({map:texture,roughness:.93,metalness:0,bumpMap:grain,bumpScale:.018,side:T.DoubleSide});
 const edges=new T.MeshStandardMaterial({color:0xe6e2d7,roughness:1});
 const materials=[edges,edges,edges,edges,front,front];
 const patch=(shader)=>{Object.assign(shader.uniforms,uniforms);shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\n'+deform).replace('#include <beginnormal_vertex>',`vec3 objectNormal=normalize(cross(deform(position+vec3(.015,0.,0.))-deform(position-vec3(.015,0.,0.)),deform(position+vec3(0.,.015,0.))-deform(position-vec3(0.,.015,0.))));if(normal.z<0.)objectNormal=-objectNormal;`).replace('#include <begin_vertex>','vec3 transformed=deform(position);');};
 front.onBeforeCompile=patch;edges.onBeforeCompile=patch;
 const mesh=new T.Mesh(new T.BoxGeometry(w,h,.035,80,48,1),materials);mesh.castShadow=true;mesh.receiveShadow=true;
 const depth=new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking});depth.onBeforeCompile=patch;mesh.customDepthMaterial=depth;
 return {mesh,uniforms,setMap(t){front.map=t;}};
}
