/* ---------- Typing Animation ---------- */

const words=[
" MIS Coordinator",
" Excel Expert",
" SQL",
" Power BI Developer",
" Data Analytics"
];

const typing=document.getElementById("typing");

let word=0;
let letter=0;
let deleting=false;

function type(){

const current=words[word];

if(!deleting){

typing.textContent=current.slice(0,letter++);
if(letter>current.length){
deleting=true;
setTimeout(type,1200);
return;
}

}else{

typing.textContent=current.slice(0,--letter);

if(letter===0){
deleting=false;
word=(word+1)%words.length;
}

}

setTimeout(type,deleting?45:90);

}

type();

/* ---------- Mouse Glow ---------- */

const glow=document.querySelector(".mouse-glow");

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";
glow.style.top=e.clientY+"px";

});

/* ---------- Particle Network ---------- */

const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

function resize(){

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

const particles=Array.from({length:90},()=>({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-.5)*0.22,
vy:(Math.random()-.5)*0.22,
r:Math.random()*2+1

}));

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x=(p.x+p.vx+canvas.width)%canvas.width;
p.y=(p.y+p.vy+canvas.height)%canvas.height;

ctx.beginPath();
ctx.fillStyle="rgba(56,189,248,.75)";
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fill();

});

for(let i=0;i<particles.length;i++){

for(let j=i+1;j<particles.length;j++){

const dx=particles[i].x-particles[j].x;
const dy=particles[i].y-particles[j].y;
const dist=Math.hypot(dx,dy);

if(dist<120){

ctx.strokeStyle=`rgba(56,189,248,${0.12-dist/900})`;
ctx.lineWidth=.8;
ctx.beginPath();
ctx.moveTo(particles[i].x,particles[i].y);
ctx.lineTo(particles[j].x,particles[j].y);
ctx.stroke();

}

}

}

requestAnimationFrame(animate);

}

animate();

/* ---------- Scroll Reveal ---------- */

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;
entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.15
});

document.querySelectorAll(".card,.timeline-item,.about-text").forEach(el=>{

el.style.opacity=0;
el.style.transform="translateY(30px)";
el.style.transition=".6s ease";

observer.observe(el);

});