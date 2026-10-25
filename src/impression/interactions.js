export function bindInput({canvas,signal,wake,getProgress,onNegative}){
 const state={x:0,y:0,pressure:0,negative:0};let held=false;
 const active=()=>getProgress()>.475&&getProgress()<.6;
 window.addEventListener('pointermove',e=>{state.x=(e.clientX/innerWidth-.5)*2;state.y=(.5-e.clientY/innerHeight)*2;state.pressure=held?1:.24;wake();},{signal,passive:true});
 canvas.addEventListener('pointerdown',e=>{if(!active())return;held=true;state.pressure=1;state.x=(e.clientX/innerWidth-.5)*2;state.y=(.5-e.clientY/innerHeight)*2;wake();},{signal,passive:true});
 const release=()=>{held=false;state.pressure=.24;wake();};window.addEventListener('pointerup',release,{signal});window.addEventListener('pointercancel',release,{signal});window.addEventListener('blur',release,{signal});
 document.querySelector('.impression-toggle').addEventListener('click',()=>{state.negative=1-state.negative;onNegative(state.negative);wake();},{signal});return state;
}
