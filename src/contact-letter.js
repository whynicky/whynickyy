export function mountContactLetter(){
 const form=document.querySelector('.contact-form');if(!form)return()=>{};
 const submit=event=>{
  event.preventDefault();
  const values=new FormData(form),name=String(values.get('name')).trim(),email=String(values.get('email')).trim(),message=String(values.get('message')).trim();
  if(!name||!message){form.querySelector('.contact-status').textContent='Please add your name and a message.';return;}
  const subject=`A note from ${name}`;
  const body=`Hi whynicky,\n\n${message}\n\n${name}\nReply to: ${email}`;
  const link=document.createElement('a');link.href=`mailto:whynicky777@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;link.click();
  form.querySelector('.contact-status').textContent='Your email app can open the draft. If it doesn’t, email whynicky777@gmail.com or find me on Telegram below.';
 };
 form.addEventListener('submit',submit);return()=>form.removeEventListener('submit',submit);
}
