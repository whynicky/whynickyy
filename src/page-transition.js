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
   gsap.set(eye,{opacity:0,scaleX:.92,scaleY:.08});
   animation=gsap.timeline();
   // A small overlap seals the centre even at fractional device pixels.
   animation.to(top,{yPercent:32,duration:.4,ease:'power3.inOut'},0)
    .to(bottom,{yPercent:-32,duration:.4,ease:'power3.inOut'},0)
    .to(eye,{opacity:1,scaleX:1,scaleY:1,duration:.24,ease:'power3.out'},.28);
   await animation;
  },
  async open(reduced){
   if(reduced)return;
   animation=gsap.timeline();
   animation.to(eye,{opacity:0,scaleX:1.12,scaleY:.04,duration:.2,ease:'power3.in'},.12)
    .to(top,{yPercent:-100,duration:.72,ease:'power3.inOut'},.26)
    .to(bottom,{yPercent:100,duration:.72,ease:'power3.inOut'},.26);
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
