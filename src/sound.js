export function mountSound(){
 let ctx,master,enabled=false,noise,lastTap=0,lastHover=0,lastGallery=0;
 const button=document.querySelector('[data-sound]');
 const control=target=>target instanceof Element?target.closest('button,a,[role="button"]'):null;
 const available=item=>item&&!item.matches(':disabled,[aria-disabled="true"]')&&!item.closest('[inert]');
 function update(){
  button.setAttribute('aria-pressed',String(enabled));
  button.setAttribute('aria-label',enabled?'Mute sound':'Enable button sounds');
  button.querySelector('span').textContent=enabled?'Sound on':'Sound off';
  document.body.classList.toggle('sound-on',enabled);
 }
 function init(){
  ctx=new AudioContext();master=ctx.createGain();master.gain.value=1;master.connect(ctx.destination);
  noise=ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate);
  const data=noise.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;

 }
 const audible=()=>enabled&&ctx?.state==='running'&&!document.hidden;
 function fade(value,duration){
  const now=ctx.currentTime;
  master.gain.cancelAndHoldAtTime(now);
  master.gain.linearRampToValueAtTime(value,now+duration);
 }
 // Air, impact and ratchet use different envelopes and sound sources.
 function air(){
  if(!audible())return;
  const now=ctx.currentTime,source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
  source.buffer=noise;filter.type='bandpass';filter.Q.value=.8;
  filter.frequency.setValueAtTime(2600,now);filter.frequency.exponentialRampToValueAtTime(1300,now+.075);
  gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.026,now+.018);gain.gain.exponentialRampToValueAtTime(.0001,now+.075);
  source.connect(filter);filter.connect(gain);gain.connect(master);source.start(now,Math.random()*3);source.stop(now+.08);
  source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
 }
 function impact({frequency,end,duration,volume,type='sine',delay=0,attack=.002}){
  if(!audible())return;
  const now=ctx.currentTime+delay,source=ctx.createOscillator(),gain=ctx.createGain();
  source.type=type;source.frequency.setValueAtTime(frequency,now);source.frequency.exponentialRampToValueAtTime(end,now+duration);
  gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(volume,now+attack);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
  source.connect(gain);gain.connect(master);source.start(now);source.stop(now+duration+.005);
  source.onended=()=>{source.disconnect();gain.disconnect();};
 }
 function press(){
  // Muted low knock: no sustained electronic beep.
  impact({frequency:330,end:110,duration:.07,volume:.055});
  impact({frequency:690,end:260,duration:.016,volume:.014,type:'triangle'});
 }
 async function unlock(){
  if(!enabled||document.hidden)return;
  try{if(!ctx)init();if(ctx.state!=='running')await ctx.resume();}catch{}
 }
 function toggle(){
  enabled=!enabled;
  if(ctx)fade(enabled?1:0,.015);
  update();
  if(enabled)void unlock().then(press);
 }
 async function click(e){
  const item=control(e.target);
  if(!enabled||!available(item)||item===button)return;
  await unlock();
  if(!audible())return;
  const now=performance.now();if(now-lastTap<100)return;lastTap=now;
  press();
 }
 function hover(e){
  if(!audible()||e.pointerType==='touch')return;
  const item=e.target instanceof Element?e.target.closest('button,[role="button"]'):null;
  if(!available(item)||(e.relatedTarget instanceof Node&&item.contains(e.relatedTarget)))return;
  const now=performance.now();if(now-lastHover<120)return;lastHover=now;
  air();
 }
 button.addEventListener('click',toggle);
 document.addEventListener('pointerdown',unlock,{capture:true,passive:true});
 document.addEventListener('keydown',unlock,{capture:true});
 document.addEventListener('click',click);
 document.addEventListener('pointerover',hover,{passive:true});
 document.addEventListener('visibilitychange',async()=>{
  if(!ctx)return;
  try{
   if(document.hidden){await ctx.suspend();}
   else if(enabled){await ctx.resume();fade(1,.8);}
  }catch{}
 });
 update();
 function galleryStep(){
  if(!audible())return;
  const now=performance.now();if(now-lastGallery<90)return;lastGallery=now;
  // Soft rounded detent: lower pitch, sine timbre and a gentler attack.
  impact({frequency:520,end:310,duration:.045,volume:.016,attack:.008});
 }
 return{galleryStep,get enabled(){return enabled;}};
}
