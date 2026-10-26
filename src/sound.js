// Recording: “Chill lofi inspired” by omfgdude, CC0. See docs/AUDIO-LICENSE.md.
export function mountSound(){
 let ctx,enabled=false,lastHover=0;
 const button=document.querySelector('[data-sound]');
 const music=document.createElement('audio');music.src='/audio/lofi.mp3';music.preload='none';music.loop=true;music.volume=.22;music.hidden=true;music.dataset.backgroundMusic='';document.body.append(music);
 function update(){button.setAttribute('aria-pressed',String(enabled));button.setAttribute('aria-label',enabled?'Mute sound':'Enable lo-fi sound');button.querySelector('span').textContent=enabled?'Sound on':'Sound off';document.body.classList.toggle('sound-on',enabled);}
 const audible=()=>enabled&&ctx?.state==='running'&&!document.hidden;
 function tone(frequency,volume,duration,delay=0){
  if(!audible())return;const now=ctx.currentTime+delay,o=ctx.createOscillator(),g=ctx.createGain();
  o.type='sine';o.frequency.value=frequency;g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(volume,now+.006);g.gain.exponentialRampToValueAtTime(.0001,now+duration);o.connect(g);g.connect(ctx.destination);o.start(now);o.stop(now+duration+.01);o.onended=()=>{o.disconnect();g.disconnect();};
 }
 function tap(){tone(880,.026,.085);tone(1760,.008,.045,.008);}
 async function toggle(){
  if(enabled){enabled=false;music.pause();update();return;}
  try{await music.play();enabled=true;ctx??=new AudioContext();await ctx.resume();update();tap();}catch{enabled=false;update();button.querySelector('span').textContent='Try sound again';}
 }
 function click(e){if(!audible()||e.target.closest('[data-sound]')||!e.target.closest('button,a'))return;
  // Internal navigation gets its own transition cue, without stacking a click.
  const route=e.target.closest('a[href^="#/"]');if(route&&route.hash!==location.hash)return;tap();
 }
 function hover(e){
  if(!audible()||e.pointerType==='touch')return;
  const item=e.target.closest('.directory a,.dock a,.topline a,.menu-toggle');
  if(!item||item.contains(e.relatedTarget))return;
  const now=performance.now();if(now-lastHover<85)return;lastHover=now;tone(1320,.014,.045);
 }
 function route(){
  if(!audible())return;
  // A short, high-passed air cue: no low-frequency impact at the end.
  const now=ctx.currentTime,duration=.28,buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*duration),ctx.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
  const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();source.buffer=buffer;filter.type='bandpass';filter.frequency.value=1900;filter.Q.value=.75;
  gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.07,now+.055);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);source.start(now);source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
  tone(660,.015,.16,.035);tone(990,.009,.13,.065);
 }
 music.addEventListener('timeupdate',()=>{if(music.currentTime>119.25)music.currentTime=0;});
 button.addEventListener('click',toggle);document.addEventListener('click',click);document.addEventListener('pointerover',hover);
 document.addEventListener('focusin',e=>{if(e.target.matches('.directory a,.dock a,.topline a'))tone(1320,.014,.045);});
 document.addEventListener('visibilitychange',()=>{if(!enabled)return;if(document.hidden)music.pause();else music.play().catch(()=>{enabled=false;update();});});
 return{route,get enabled(){return enabled;}};
}
