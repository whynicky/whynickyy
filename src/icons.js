const angles={'→':0,'↗':-45,'↑':-90,'←':180,'↓':90,'↘':45,'↙':135,'↖':-135};
// Use paths, not Unicode arrows: iOS must not substitute an emoji font.
export function replaceArrows(root){
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
 while(walker.nextNode()){
  const node=walker.currentNode;
  if(/[→↗↑←↓↘↙↖]/u.test(node.data)&&!node.parentElement.closest('script,style,svg,textarea'))nodes.push(node);
 }
 for(const node of nodes){
  const fragment=document.createDocumentFragment();
  for(const part of node.data.split(/([→↗↑←↓↘↙↖])\uFE0F?/u)){
   if(!(part in angles)){fragment.append(document.createTextNode(part));continue;}
   const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
   svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','icon-arrow');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
   const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d','M4 12h16M13 5l7 7-7 7');path.setAttribute('transform',`rotate(${angles[part]} 12 12)`);svg.append(path);fragment.append(svg);
  }
  node.replaceWith(fragment);
 }
}
