export function createPageTransition(gsap){
 const curtain=document.querySelector('.page-blink');
 const top=curtain.querySelector('.page-blink-top');
 const bottom=curtain.querySelector('.page-blink-bottom');
 const eye=curtain.querySelector('.page-blink-eye');
 let animation;
 return{
  async close(reduced){
   if(reduced)return;
   curtain.classList.add('is-active');
   gsap.set(curtain,{visibility:'visible'});
   gsap.set(top,{y:0,yPercent:-100});gsap.set(bottom,{y:0,yPercent:100});
   gsap.set(eye,{opacity:0,scale:.85});
   animation=gsap.timeline();
   // A small overlap seals the centre even at fractional device pixels.
   animation.to(top,{yPercent:32,duration:.4,ease:'power3.inOut'},0)
    .to(bottom,{yPercent:-32,duration:.4,ease:'power3.inOut'},0)
    .to(eye,{opacity:1,scale:1,duration:.16,ease:'power2.out'},.3);
   await animation;
  },
  async open(reduced){
   if(reduced)return;
   animation=gsap.timeline();
   animation.to(eye,{opacity:0,scale:1.08,duration:.16,ease:'power2.in'},.04)
    .to(top,{yPercent:-100,duration:.68,ease:'power3.inOut'},.1)
    .to(bottom,{yPercent:100,duration:.68,ease:'power3.inOut'},.1);
   await animation;
  },
  reset(){
   animation?.kill();
   curtain.classList.remove('is-active');
   gsap.set(curtain,{visibility:'hidden'});
   gsap.set(eye,{opacity:0});
  }
 };
}
