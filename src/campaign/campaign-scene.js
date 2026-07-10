import { createCrtRenderer } from "../menu/crt-renderer.js";

const W = 640;
const H = 360;
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

const canvas = document.querySelector("#game");
const scene = document.createElement("canvas");
scene.width = W;
scene.height = H;
const ctx = scene.getContext("2d", { alpha: false });
ctx.imageSmoothingEnabled = false;
const crt = createCrtRenderer(canvas, scene);

const rings = Array.from({ length: 7 }, (_, i) => ({ inner: 18 + i * 19, outer: 33 + i * 19 }));
const outerRadius = rings.at(-1).outer;
const laneAngles = [-Math.PI * .75, -Math.PI * .25, Math.PI * .25, Math.PI * .75];
const pads = [];
for (let ring = 1; ring < 6; ring++) {
  const radius = (rings[ring].inner + rings[ring].outer) * .5;
  const count = 8 + ring * 2;
  for (let i = 0; i < count; i++) {
    const angle = i / count * TAU + (ring % 2 ? .13 : 0);
    const blocked = laneAngles.some(a => Math.abs(Math.atan2(Math.sin(angle-a), Math.cos(angle-a))) < .16);
    if (!blocked) pads.push({ id: `pad-${ring}-${i}`, x: Math.cos(angle)*radius, z: Math.sin(angle)*radius, radius: 5, tower: null });
  }
}

const archetypes = {
  guard: { team:"player", hp:105, speed:24, damage:12, range:12, rate:.85, size:7, color:"#7bd5c7", ranged:false },
  archer:{ team:"player", hp:66, speed:22, damage:9, range:42, rate:1.15, size:6, color:"#b9f5e8", ranged:true },
  runner:{ team:"enemy", hp:44, speed:30, damage:7, range:8, rate:.8, size:5, color:"#d46d7c", reward:6, core:1 },
  shield:{ team:"enemy", hp:120, speed:16, damage:11, range:9, rate:1.05, size:7, color:"#b75b68", reward:13, core:2 },
  zealot:{ team:"enemy", hp:65, speed:20, damage:9, range:34, rate:1.25, size:6, color:"#ee8f78", reward:9, core:1, ranged:true },
  brute:{ team:"enemy", hp:250, speed:12, damage:21, range:10, rate:1.35, size:10, color:"#9d4c5d", reward:27, core:4 },
  wraith:{ team:"enemy", hp:88, speed:34, damage:14, range:15, rate:.72, size:7, color:"#ca759c", reward:16, core:2 }
};
const towerTypes = {
  spire:{ label:"BONE SPIRE", cost:45, range:56, damage:15, rate:1.05, speed:150, color:"#a9f1ed" },
  lantern:{ label:"SOUL LANTERN", cost:65, range:48, damage:9, rate:2.3, speed:130, splash:17, color:"#f1bd6d" },
  ward:{ label:"GRAVE WARD", cost:55, range:52, damage:7, rate:1.45, speed:138, slow:.34, color:"#81cfd0" }
};
const waves = [
  [["runner",8,.72,[0,2]]],
  [["runner",7,.55,[1,3]],["shield",3,1.2,[0,2],2.5]],
  [["zealot",6,.9,[0,1,2,3]],["runner",10,.4,[0,1,2,3],1.4]],
  [["shield",6,.86,[0,2]],["brute",2,2,[1,3],3]],
  [["wraith",8,.58,[0,1,2,3]],["zealot",5,.86,[1,3],2.2]],
  [["runner",18,.26,[0,1,2,3]],["shield",8,.62,[0,1,2,3],2],["brute",4,1.5,[0,1,2,3],5]]
];

const camera = { x:0, z:0, zoom:.78, targetZoom:.78, min:.34, max:2.45, vx:0, vz:0 };
const input = { keys:new Set(), pointer:{x:0,y:0,inside:false}, drag:null, middle:false, lastX:0,lastY:0 };
let uid=1, pid=1, tid=1, last=performance.now(), accumulator=0;
const state = {
  time:0, souls:145, core:24, wave:0, waveActive:false, spawn:[], units:{}, towers:{}, projectiles:{}, effects:[],
  selected:[], selectedPad:null, towerType:"spire", paused:false, won:false, lost:false,
  message:"FORTIFY THE GRAVE RINGS · SPACE STARTS THE FIRST WAVE"
};

function unit(type,x,z,extra={}) { const a=archetypes[type]; const id=`u${uid++}`; state.units[id]={id,type,x,z,hp:a.hp,maxHp:a.hp,cool:0,frame:0,anim:0,action:"idle",target:null,move:null,selected:false,...a,...extra}; return state.units[id]; }
[[-18,-8,"guard"],[-10,18,"guard"],[18,8,"guard"],[10,-18,"guard"],[-25,0,"archer"],[25,0,"archer"]].forEach(v=>unit(v[2],v[0],v[1]));

function iso(x,z){ return { x:(x-z)*.72, y:(x+z)*.36 }; }
function worldToScreen(p){ const q=iso(p.x-camera.x,p.z-camera.z); return { x:W/2+q.x*camera.zoom, y:H/2+30+q.y*camera.zoom }; }
function screenToWorld(s){ const ix=(s.x-W/2)/camera.zoom, iy=(s.y-H/2-30)/camera.zoom; return { x:camera.x + iy/0.72 + ix/1.44, z:camera.z + iy/0.72 - ix/1.44 }; }
function nearest(list, source, max=Infinity){ let out=null,b=max; for(const v of list){const d=dist(v,source); if(d<b){b=d;out=v;}} return out; }
function enemies(){ return Object.values(state.units).filter(u=>u.team==="enemy"); }
function allies(){ return Object.values(state.units).filter(u=>u.team==="player"); }
function effect(x,z,color,life=.4,size=8){ state.effects.push({x,z,color,life,age:0,size}); }
function damage(target, amount){ if(!target||!state.units[target.id])return; target.hp-=amount; effect(target.x,target.z,target.team==="enemy"?"#ff8793":"#8fffe3",.25,7); if(target.hp<=0){ delete state.units[target.id]; state.selected=state.selected.filter(id=>id!==target.id); if(target.team==="enemy") state.souls+=target.reward||0; } }
function projectile(source,target,spec){ const id=`p${pid++}`; state.projectiles[id]={id,x:source.x,z:source.z,target:target.id,team:source.team||"player",damage:spec.damage,speed:spec.speed||120,splash:spec.splash||0,slow:spec.slow||0,color:spec.color||"#bffff2",age:0}; }

function startWave(){ if(state.waveActive||state.won||state.lost||state.wave>=waves.length)return; const queue=[]; waves[state.wave].forEach(([type,count,cadence,lanes,delay=0])=>{ for(let i=0;i<count;i++) queue.push({type,t:delay+i*cadence,lane:lanes[i%lanes.length]}); }); queue.sort((a,b)=>a.t-b.t); state.spawn=queue; state.waveActive=true; state.message=`WAVE ${state.wave+1} · THE DEAD APPROACH`; }
function spawnEnemy(e){ const angle=laneAngles[e.lane], r=outerRadius+20; unit(e.type,Math.cos(angle)*r,Math.sin(angle)*r,{lane:e.lane}); effect(Math.cos(angle)*r,Math.sin(angle)*r,"#d8768a",.55,13); }

function updateUnit(u,dt){ u.cool=Math.max(0,u.cool-dt); u.anim+=dt; u.frame=Math.floor(u.anim*(u.action==="walk"?8:u.action==="attack"?10:5))%4; let target=u.target&&state.units[u.target]; if(!target||target.team===u.team) target=null;
  if(u.team==="player" && !target) target=nearest(enemies(),u,u.range+20);
  if(u.team==="enemy" && !target) target=nearest(allies(),u,Math.max(15,u.range+6));
  if(target){ const d=dist(u,target); u.target=target.id; if(d<=u.range){ u.action="attack"; if(u.cool<=0){u.cool=1/u.rate; if(u.ranged)projectile(u,target,{damage:u.damage,speed:105,color:"#ef8a83"}); else damage(target,u.damage);} return;} if(u.team==="player"&&!u.move){moveToward(u,target,dt,Math.max(2,u.range*.75)); return;} }
  if(u.team==="enemy"){ if(moveToward(u,{x:0,z:0},dt,7)){ state.core-=u.core||1; delete state.units[u.id]; effect(0,0,"#f2bd66",.8,22); if(state.core<=0){state.core=0;state.lost=true;state.message="THE SANCTUM HAS FALLEN · R RESTARTS";} } return; }
  if(u.move){ if(moveToward(u,u.move,dt,1.2))u.move=null; } else u.action="idle";
}
function moveToward(u,t,dt,stop=0){ const dx=t.x-u.x,dz=t.z-u.z,d=Math.hypot(dx,dz); if(d<=stop)return true; const step=Math.min(d-stop,u.speed*dt); u.x+=dx/d*step;u.z+=dz/d*step;u.action="walk"; return d-step<=stop+.01; }
function updateTowers(dt){ for(const t of Object.values(state.towers)){t.cool=Math.max(0,t.cool-dt);t.frame=Math.floor(state.time*5+t.index)%4;const spec=towerTypes[t.type],target=nearest(enemies(),t,spec.range);if(target&&t.cool<=0){t.cool=1/spec.rate;projectile({...t,team:"player"},target,spec);} } }
function updateProjectiles(dt){ for(const p of Object.values(state.projectiles)){p.age+=dt;const t=state.units[p.target];if(!t||p.age>5){delete state.projectiles[p.id];continue;}const dx=t.x-p.x,dz=t.z-p.z,d=Math.hypot(dx,dz),step=p.speed*dt;if(d<=step+t.size*.3){const hits=p.splash?enemies().filter(e=>dist(e,t)<=p.splash):[t];hits.forEach(h=>damage(h,p.damage*(p.splash?clamp(1-dist(h,t)/p.splash,.35,1):1)));effect(t.x,t.z,p.color,.35,p.splash||9);delete state.projectiles[p.id];}else{p.x+=dx/d*step;p.z+=dz/d*step;}} }
function update(dt){ if(state.paused||state.won||state.lost)return;state.time+=dt;if(state.waveActive){state.spawn.forEach(s=>s.t-=dt);while(state.spawn[0]?.t<=0)spawnEnemy(state.spawn.shift());}Object.values(state.units).forEach(u=>updateUnit(u,dt));updateTowers(dt);updateProjectiles(dt);state.effects.forEach(e=>e.age+=dt);state.effects=state.effects.filter(e=>e.age<e.life);if(state.waveActive&&!state.spawn.length&&!enemies().length){state.waveActive=false;state.wave++;state.souls+=20+state.wave*8;if(state.wave>=waves.length){state.won=true;state.message="THE GRAVE RINGS HOLD · CAMPAIGN NODE COMPLETE";try{localStorage.setItem("phantomCommand.save",JSON.stringify({scene:"grave-ring",souls:state.souls,wave:state.wave}));}catch{}}else state.message=`WAVE ${state.wave} CLEARED · BUILD BEFORE THE NEXT PROCESSION`;}}

function build(){ const pad=pads.find(p=>p.id===state.selectedPad);const spec=towerTypes[state.towerType];if(!pad||pad.tower||state.souls<spec.cost)return;const id=`t${tid++}`;pad.tower=id;state.souls-=spec.cost;state.towers[id]={id,type:state.towerType,x:pad.x,z:pad.z,cool:0,index:tid,frame:0};effect(pad.x,pad.z,"#8fffe3",.7,18);state.message=`${spec.label} RAISED`;}
function selectAt(w,add=false){ const u=nearest(allies(),w,7);if(u){if(!add)state.selected=[];if(add&&state.selected.includes(u.id))state.selected=state.selected.filter(id=>id!==u.id);else if(!state.selected.includes(u.id))state.selected.push(u.id);state.selectedPad=null;return;}const pad=nearest(pads.filter(p=>!p.tower),w,7);if(pad){if(state.selectedPad===pad.id)build();else state.selectedPad=pad.id;state.selected=[];return;}if(!add){state.selected=[];state.selectedPad=null;} }
function order(w){if(!state.selected.length)return;const e=nearest(enemies(),w,8);state.selected.forEach((id,i)=>{const u=state.units[id];if(!u)return;u.target=e?.id||null;u.move=e?null:{x:w.x+((i%3)-1)*7,z:w.z+Math.floor(i/3)*7};});effect(w.x,w.z,e?"#ef7684":"#79e2d3",.55,11);}

function drawDiamond(x,y,rx,ry,fill,stroke){ctx.beginPath();ctx.moveTo(x,y-ry);ctx.lineTo(x+rx,y);ctx.lineTo(x,y+ry);ctx.lineTo(x-rx,y);ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}}
function drawWorld(){ctx.fillStyle="#081016";ctx.fillRect(0,0,W,H);const center=worldToScreen({x:0,z:0});for(let i=rings.length-1;i>=0;i--){const r=rings[i],ro=r.outer*camera.zoom*.72,ri=r.inner*camera.zoom*.72;ctx.save();ctx.translate(center.x,center.y);ctx.scale(1,.5);ctx.beginPath();ctx.arc(0,0,ro,0,TAU);ctx.arc(0,0,ri,0,TAU,true);ctx.fillStyle=i%2?"#30383b":"#252d31";ctx.fill("evenodd");ctx.strokeStyle="#11181c";ctx.lineWidth=2;ctx.stroke();ctx.restore();}
  laneAngles.forEach(a=>{ctx.strokeStyle="#3a675f";ctx.lineWidth=Math.max(1,5*camera.zoom);ctx.beginPath();const a0=worldToScreen({x:Math.cos(a)*8,z:Math.sin(a)*8}),a1=worldToScreen({x:Math.cos(a)*(outerRadius+20),z:Math.sin(a)*(outerRadius+20)});ctx.moveTo(a0.x,a0.y);ctx.lineTo(a1.x,a1.y);ctx.stroke();});
  pads.forEach(p=>{const s=worldToScreen(p);drawDiamond(s.x,s.y,6*camera.zoom,3*camera.zoom,p.tower?"#22292c":state.selectedPad===p.id?"#77cfc0":"#4c5556","#11191b");});
  for(let i=0;i<130;i++){const a=(i*2.399)%TAU,r=35+((i*47)%125),p=worldToScreen({x:Math.cos(a)*r,z:Math.sin(a)*r});ctx.fillStyle=i%3?"#394145":"#485055";ctx.fillRect(Math.round(p.x),Math.round(p.y-5*camera.zoom),Math.max(1,2*camera.zoom),Math.max(1,5*camera.zoom));}
  const items=[...Object.values(state.towers).map(v=>({...v,kind:"tower"})),...Object.values(state.units).map(v=>({...v,kind:"unit"}))].sort((a,b)=>(a.x+a.z)-(b.x+b.z));items.forEach(drawEntity);Object.values(state.projectiles).forEach(p=>{const s=worldToScreen(p);ctx.fillStyle=p.color;ctx.fillRect(s.x-1,s.y-4,3,3);});state.effects.forEach(e=>{const s=worldToScreen(e),q=1-e.age/e.life;ctx.globalAlpha=q;ctx.strokeStyle=e.color;ctx.beginPath();ctx.ellipse(s.x,s.y,e.size*q*camera.zoom,e.size*.45*q*camera.zoom,0,0,TAU);ctx.stroke();ctx.globalAlpha=1;});drawSanctum(center);}
function drawEntity(v){const s=worldToScreen(v);if(v.kind==="tower"){const spec=towerTypes[v.type];ctx.fillStyle="#101719";drawDiamond(s.x,s.y,8*camera.zoom,4*camera.zoom,"#161d20");ctx.fillStyle=spec.color;ctx.fillRect(s.x-3*camera.zoom,s.y-14*camera.zoom,6*camera.zoom,13*camera.zoom);ctx.fillStyle="#e7fff8";ctx.fillRect(s.x-1*camera.zoom,s.y-17*camera.zoom,2*camera.zoom,4*camera.zoom);return;}const bob=[0,-1,0,1][v.frame]*camera.zoom,sz=v.size*camera.zoom;ctx.fillStyle="rgba(0,0,0,.45)";ctx.beginPath();ctx.ellipse(s.x,s.y,sz*.7,sz*.28,0,0,TAU);ctx.fill();ctx.fillStyle=v.color;ctx.fillRect(Math.round(s.x-sz*.35),Math.round(s.y-sz-bob),Math.max(2,sz*.7),Math.max(3,sz));ctx.fillStyle=v.team==="enemy"?"#ffe1db":"#e7fff9";ctx.fillRect(Math.round(s.x-sz*.18),Math.round(s.y-sz*.82-bob),Math.max(1,sz*.36),Math.max(1,sz*.22));if(state.selected.includes(v.id)){ctx.strokeStyle="#9ffff0";ctx.beginPath();ctx.ellipse(s.x,s.y,sz,sz*.42,0,0,TAU);ctx.stroke();}if(v.hp<v.maxHp){ctx.fillStyle="#111";ctx.fillRect(s.x-sz,s.y-sz-5,sz*2,2);ctx.fillStyle=v.team==="enemy"?"#df6573":"#73d8c8";ctx.fillRect(s.x-sz,s.y-sz-5,sz*2*(v.hp/v.maxHp),2);}}
function drawSanctum(s){ctx.fillStyle="#101419";drawDiamond(s.x,s.y,16*camera.zoom,8*camera.zoom,"#1b2026","#638b82");ctx.fillStyle="#273036";ctx.fillRect(s.x-8*camera.zoom,s.y-23*camera.zoom,16*camera.zoom,20*camera.zoom);ctx.fillStyle="#a8fff0";ctx.fillRect(s.x-2*camera.zoom,s.y-27*camera.zoom,4*camera.zoom,8*camera.zoom);}
function text(t,x,y,size=10,color="#e9f6f3",align="left"){ctx.font=`bold ${size}px monospace`;ctx.textAlign=align;ctx.fillStyle="#000";ctx.fillText(t,x+1,y+1);ctx.fillStyle=color;ctx.fillText(t,x,y);}
function drawUI(){ctx.fillStyle="rgba(4,7,9,.9)";ctx.fillRect(8,8,260,56);ctx.strokeStyle="#657673";ctx.strokeRect(8.5,8.5,260,56);text("PHANTOM COMMAND · GRAVE RING",18,24,12,"#baffef");text(`SOULS ${state.souls}   SANCTUM ${state.core}/24   WAVE ${Math.min(state.wave+1,6)}/6`,18,40,9);text(state.message,18,56,8,"#aab9b6");ctx.fillStyle="rgba(4,7,9,.9)";ctx.fillRect(8,H-48,330,40);Object.entries(towerTypes).forEach(([id,t],i)=>{const x=18+i*104;ctx.strokeStyle=state.towerType===id?"#9ffff0":"#4c5a59";ctx.strokeRect(x,H-39,96,24);text(`${i+1} ${t.label}`,x+4,H-25,7,state.souls>=t.cost?"#dffcf4":"#786d6f");text(`${t.cost}`,x+82,H-14,7,"#e7bf73","right");});text("WASD PAN · WHEEL ZOOM · DRAG SELECT · RMB ORDER · SPACE WAVE",W-8,H-10,7,"#9cada9","right");drawMinimap();if(state.paused||state.won||state.lost){ctx.fillStyle="rgba(0,0,0,.6)";ctx.fillRect(0,0,W,H);text(state.won?"GRAVE RING SECURED":state.lost?"SANCTUM LOST":"PAUSED",W/2,H/2,22,state.won?"#a8fff0":"#ef7c88","center");}if(input.drag){const a=input.drag,b=input.pointer;ctx.strokeStyle="#a6fff0";ctx.strokeRect(Math.min(a.x,b.x),Math.min(a.y,b.y),Math.abs(a.x-b.x),Math.abs(a.y-b.y));}}
function drawMinimap(){const x=W-104,y=8,w=96,h=70;ctx.fillStyle="rgba(3,5,7,.9)";ctx.fillRect(x,y,w,h);ctx.strokeStyle="#5f716d";ctx.strokeRect(x+.5,y+.5,w-1,h-1);const scale=.22;ctx.save();ctx.translate(x+w/2,y+h/2);ctx.scale(scale,scale*.55);ctx.strokeStyle="#4b5d59";rings.forEach(r=>{ctx.beginPath();ctx.arc(0,0,r.outer,0,TAU);ctx.stroke();});Object.values(state.units).forEach(u=>{ctx.fillStyle=u.team==="enemy"?"#e36c7c":"#7de0d0";ctx.fillRect(u.x-2,u.z-2,4,4);});ctx.fillStyle="#fff";ctx.fillRect(-3,-3,6,6);ctx.restore();}
function render(){drawWorld();drawUI();crt.render(performance.now()/1000,{crt:true,grain:"low",fade:0});}

function setPointer(e){const p=crt.screenToSource(e.clientX,e.clientY);input.pointer={x:p.x,y:p.y,inside:p.inside};}
canvas.addEventListener("pointermove",e=>{setPointer(e);if(input.middle){const dx=input.pointer.x-input.lastX,dy=input.pointer.y-input.lastY;camera.x-=dx/(camera.zoom*.72);camera.z+=dx/(camera.zoom*.72);camera.x-=dy/(camera.zoom*.72);camera.z-=dy/(camera.zoom*.72);input.lastX=input.pointer.x;input.lastY=input.pointer.y;}});
canvas.addEventListener("pointerdown",e=>{setPointer(e);if(e.button===1){input.middle=true;input.lastX=input.pointer.x;input.lastY=input.pointer.y;return;}if(e.button===0)input.drag={x:input.pointer.x,y:input.pointer.y,shift:e.shiftKey};if(e.button===2){e.preventDefault();order(screenToWorld(input.pointer));}});
canvas.addEventListener("pointerup",e=>{setPointer(e);if(e.button===1){input.middle=false;return;}if(e.button!==0||!input.drag)return;const d=input.drag,dx=Math.abs(input.pointer.x-d.x),dy=Math.abs(input.pointer.y-d.y);if(dx<5&&dy<5)selectAt(screenToWorld(input.pointer),d.shift);else{const a=screenToWorld({x:Math.min(d.x,input.pointer.x),y:Math.min(d.y,input.pointer.y)}),b=screenToWorld({x:Math.max(d.x,input.pointer.x),y:Math.max(d.y,input.pointer.y)});state.selected=allies().filter(u=>u.x>=Math.min(a.x,b.x)&&u.x<=Math.max(a.x,b.x)&&u.z>=Math.min(a.z,b.z)&&u.z<=Math.max(a.z,b.z)).map(u=>u.id);}input.drag=null;});
canvas.addEventListener("contextmenu",e=>e.preventDefault());
canvas.addEventListener("wheel",e=>{e.preventDefault();setPointer(e);const before=screenToWorld(input.pointer);camera.targetZoom=clamp(camera.targetZoom*Math.exp(-e.deltaY*.0012),camera.min,camera.max);const after=screenToWorld(input.pointer);camera.x+=before.x-after.x;camera.z+=before.z-after.z;},{passive:false});
addEventListener("keydown",e=>{const k=e.key.toLowerCase();input.keys.add(k);if(k===" "){e.preventDefault();startWave();}if(k==="1")state.towerType="spire";if(k==="2")state.towerType="lantern";if(k==="3")state.towerType="ward";if(k==="p")state.paused=!state.paused;if(k==="r")location.reload();if(k==="escape")location.href="./";if(k==="f"){const sel=state.selected.map(id=>state.units[id]).filter(Boolean);const target=sel.length?sel.reduce((a,u)=>({x:a.x+u.x/sel.length,z:a.z+u.z/sel.length}),{x:0,z:0}):{x:0,z:0};camera.x=target.x;camera.z=target.z;camera.targetZoom=1.35;}});addEventListener("keyup",e=>input.keys.delete(e.key.toLowerCase()));addEventListener("blur",()=>{input.keys.clear();input.middle=false;input.drag=null;});

function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;const mx=(input.keys.has("d")||input.keys.has("arrowright")?1:0)-(input.keys.has("a")||input.keys.has("arrowleft")?1:0),mz=(input.keys.has("s")||input.keys.has("arrowdown")?1:0)-(input.keys.has("w")||input.keys.has("arrowup")?1:0);const speed=150/camera.zoom;camera.vx+=(mx*speed-camera.vx)*(1-Math.exp(-10*dt));camera.vz+=(mz*speed-camera.vz)*(1-Math.exp(-10*dt));camera.x=clamp(camera.x+camera.vx*dt,-outerRadius,outerRadius);camera.z=clamp(camera.z+camera.vz*dt,-outerRadius,outerRadius);camera.zoom+=(camera.targetZoom-camera.zoom)*(1-Math.exp(-12*dt));accumulator+=dt;while(accumulator>=1/60){update(1/60);accumulator-=1/60;}render();requestAnimationFrame(frame);}requestAnimationFrame(frame);

window.GameHost={state, camera, startWave, build, getState:()=>structuredClone({wave:state.wave,waveActive:state.waveActive,souls:state.souls,core:state.core,units:Object.values(state.units).length,towers:Object.values(state.towers).length,won:state.won,lost:state.lost,zoom:camera.zoom}), setZoom:z=>camera.targetZoom=clamp(z,camera.min,camera.max)};
