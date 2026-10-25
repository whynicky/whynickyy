import * as T from 'three';
export function paper(map,options={}){return new T.MeshStandardMaterial({map,color:0xffffff,roughness:.92,metalness:0,side:T.DoubleSide,...options});}
export function plate(texture,w,h,{edge=0xbdbbb3,depth=.055,margin=.12}={}){
 const g=new T.Group();
 const base=new T.Mesh(new T.BoxGeometry(w+margin*2,h+margin*2,depth),paper(null,{color:edge}));base.castShadow=true;base.receiveShadow=true;g.add(base);
 const face=new T.Mesh(new T.PlaneGeometry(w,h),paper(texture));face.position.z=depth/2+.004;face.castShadow=true;face.receiveShadow=true;g.add(face);g.userData.face=face;return g;
}
export function cropped(texture,w,h,uv,opts){const g=plate(texture,w,h,opts);const a=g.userData.face.geometry.attributes.uv;for(let i=0;i<a.count;i++)a.setXY(i,uv[0]+a.getX(i)*uv[2],uv[1]+a.getY(i)*uv[3]);return g;}
// Two surfaces, closed edges and a real hinge. Curl follows the local binding axis.
export function leaf(texture,w,h,{back=0xd7d5cc}={}){
 const group=new T.Group(),geometry=new T.BoxGeometry(w,h,.045,48,1,1);geometry.translate(w/2,0,0);
 const side=paper(null,{color:back}),front=paper(texture),mesh=new T.Mesh(geometry,[side,side,side,side,front,side]);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
 const source=geometry.attributes.position.array.slice();let previous=NaN;
 group.userData.bend=(amount)=>{if(Math.abs(previous-amount)<.001)return;previous=amount;const a=geometry.attributes.position;
 for(let i=0;i<a.count;i++){const x=source[i*3],u=x/w;const angle=amount*u;const nx=Math.abs(amount)<.001?x:Math.sin(angle)*w/amount;const z=Math.abs(amount)<.001?0:(1-Math.cos(angle))*w/amount;a.setXYZ(i,nx,source[i*3+1],source[i*3+2]+z);}
 a.needsUpdate=true;geometry.computeVertexNormals();geometry.computeBoundingSphere();};return group;
}
export function disposeWorld(scene,textures){const geometries=new Set(),materials=new Set(),maps=new Set(Object.values(textures));scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of(o.material?Array.isArray(o.material)?o.material:[o.material]:[])){materials.add(m);if(m.map)maps.add(m.map);}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());maps.forEach(t=>t.dispose());}
