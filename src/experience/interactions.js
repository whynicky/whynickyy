import {clamp} from './timeline.js';
export function bindInteractions({canvas,signal,wake,getProgress,onGesture}){
 let drag=null;const state={x:0,y:0,amount:0};
 const active=()=>getProgress()>.755&&getProgress()<.89;
 window.addEventListener('pointermove',e=>{state.x=(e.clientX/innerWidth-.5)*2;state.y=(.5-e.clientY/innerHeight)*2;if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dy)>Math.abs(dx)+12&&!drag.horizontal){drag=null;return;}if(Math.abs(dx)>8)drag.horizontal=true;if(drag.horizontal){state.amount=clamp(drag.amount+dx/(innerWidth*.5));onGesture(state.amount);}}wake();},{signal,passive:true});
 canvas.addEventListener('pointerdown',e=>{if(!active())return;drag={x:e.clientX,y:e.clientY,amount:state.amount,horizontal:false};canvas.setPointerCapture?.(e.pointerId);canvas.classList.add('is-dragging');},{signal});
 const release=()=>{drag=null;canvas.classList.remove('is-dragging');};window.addEventListener('pointerup',release,{signal});window.addEventListener('pointercancel',release,{signal});window.addEventListener('blur',release,{signal});
 document.querySelector('.assembly-toggle').addEventListener('click',()=>{state.amount=state.amount>.5?0:1;onGesture(state.amount);wake();},{signal});
 return state;
}
