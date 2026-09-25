const form=document.getElementById('registrationForm');
const success=document.getElementById('successMessage');
const toggle=document.getElementById('menuToggle');
const nav=document.getElementById('navLinks');

toggle.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

function setError(id,message){document.getElementById(id+'Error').textContent=message;}
function clearErrors(){['name','regNo','department','year','email','mobile','event'].forEach(id=>setError(id,''));}

form.addEventListener('submit',(e)=>{
  e.preventDefault(); clearErrors(); success.classList.remove('show');
  const data=Object.fromEntries(new FormData(form));
  let valid=true;
  if(!data.name.trim()){setError('name','Name is required.');valid=false;}
  if(!data.regNo.trim()){setError('regNo','Register number is required.');valid=false;}
  if(!data.department.trim()){setError('department','Department is required.');valid=false;}
  if(!data.year){setError('year','Please select your year.');valid=false;}
  const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!email.test(data.email)){setError('email','Enter a valid email address.');valid=false;}
  if(!/^\d{10}$/.test(data.mobile)){setError('mobile','Enter a valid 10-digit mobile number.');valid=false;}
  if(!data.event){setError('event','Please select an event.');valid=false;}
  if(!valid)return;

  const registrations=JSON.parse(localStorage.getItem('technovaRegistrations')||'[]');
  const record={...data,id:Date.now(),registeredAt:new Date().toLocaleString()};
  registrations.push(record);
  localStorage.setItem('technovaRegistrations',JSON.stringify(registrations));
  success.textContent='🎉 Registration successful! Your details have been saved on this device.';
  success.classList.add('show');
  form.reset();
  success.scrollIntoView({behavior:'smooth',block:'center'});
});
