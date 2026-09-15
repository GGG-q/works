const projects=[
{title:'无界共生',en:'TOD / URBAN COMMERCE',type:'城市综合体 / 2026',ratio:'4/5',img:'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=85',desc:'围绕TOD连接、商业流线、功能复合与公共体验展开的城市综合体设计。'},
{title:'塔子沟',en:'TAZIGOU / RURAL TOURISM',type:'乡村旅游研究',ratio:'3/2',img:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85',desc:'通过区位、人群、案例与问卷调研，探索吸引人群、延长停留与丰富体验的乡村旅游策略。'},
{title:'从创意到屏幕',en:'FROM IDEA TO SCREEN',type:'Moving Image / 2025',ratio:'4/6',img:'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=85',desc:'在大连广播电视中心完成12条视频剪辑，其中4条发布至平台。'},
{title:'场地阅读',en:'SITE & CONTEXT',type:'Research / Diagram',ratio:'5/4',img:'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=85',desc:'以区位、交通、人群、业态和案例分析建立项目研究基础。'},
{title:'信息图面',en:'ARCHITECTURAL DIAGRAM',type:'Visual System',ratio:'3/4',img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',desc:'将交通、功能、绿色策略与空间结构组织为统一的建筑分析图面。'},
{title:'空间视觉',en:'SPATIAL VISUAL',type:'Rendering / Editorial',ratio:'4/3',img:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',desc:'建筑效果图、空间叙事与作品集编辑排版的视觉练习。'}
];
const masonry=document.querySelector('#masonry');
projects.forEach((p,i)=>{
 const card=document.createElement('article');card.className='work-card';card.tabIndex=0;card.innerHTML=`<div class="image" style="aspect-ratio:${p.ratio}"><img src="${p.img}" alt="${p.title}项目预览" loading="lazy"></div><div class="meta"><small>${String(i+1).padStart(2,'0')}</small><h3>${p.title}<br><small>${p.en}</small></h3><p>${p.type}</p></div>`;card.onclick=()=>openProject(i);card.onkeydown=e=>{if(e.key==='Enter')openProject(i)};masonry.append(card);
});
const trail=document.querySelector('#trail');const nodes=[];const trailProjects=[...projects,...projects];
trailProjects.forEach((p,i)=>{const el=document.createElement('div');el.className='trail-card';el.style.zIndex=i+1;el.innerHTML=`<img src="${p.img}" alt="" draggable="false">`;el.onclick=()=>openProject(i%projects.length);trail.append(el);nodes.push(el)});
let phase=0,targetPhase=0,wheelStep=0,wheelLocked=false,mouseX=.5,mouseY=.5;addEventListener('pointermove',e=>{mouseX=e.clientX/innerWidth;mouseY=e.clientY/innerHeight});
const hero=document.querySelector('.hero');
hero.addEventListener('wheel',e=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const direction=Math.sign(e.deltaY);
 if(!direction||wheelLocked)return;
 if((direction>0&&wheelStep>=nodes.length)||(direction<0&&wheelStep<=0))return;
 e.preventDefault();
 wheelStep+=direction;
 targetPhase+=direction/nodes.length;
 wheelLocked=true;
 setTimeout(()=>wheelLocked=false,360);
},{passive:false});
function animate(){
 phase+=(targetPhase-phase)*.075;
 const mobile=innerWidth<760;
 nodes.forEach((el,i)=>{
  const angle=(phase+i/nodes.length)*Math.PI*2-Math.PI/2;
  const centerX=mobile?66:82,centerY=mobile?69:65;
  const radiusX=mobile?47:31,radiusY=mobile?14:18;
  const rotation=(mobile?-18:-28)*Math.PI/180;
  const ellipseX=Math.cos(angle)*radiusX,ellipseY=Math.sin(angle)*radiusY;
  const x=centerX+ellipseX*Math.cos(rotation)-ellipseY*Math.sin(rotation);
  const y=centerY+ellipseX*Math.sin(rotation)+ellipseY*Math.cos(rotation);
  const front=(Math.sin(angle)+1)/2;
  const focus=Math.pow(front,6);
  const dx=x/100-mouseX,dy=y/100-mouseY;
  const proximity=Math.max(0,1-Math.hypot(dx,dy)*5.2);
  const scale=.66+focus*.42+proximity*.22;
  const tilt=-13+Math.cos(angle)*5;
  el.style.left=`${x}%`;el.style.top=`${y}%`;
  el.style.zIndex=String(2+Math.round(front*5)+Math.round(proximity*2));
  el.style.transform=`translate(-50%,-50%) scale(${scale}) rotate(${tilt}deg)`;
  el.style.filter=`grayscale(${Math.max(0,.82-focus-proximity)}) brightness(${.74+focus*.3+proximity*.18}) saturate(${.72+focus*.42+proximity*.25})`;
  el.style.opacity=String(.68+focus*.3+proximity*.08);
 });
 requestAnimationFrame(animate)
}animate();
const dialog=document.querySelector('#project-dialog');function openProject(i){const p=projects[i];document.querySelector('#dialog-image').src=p.img;document.querySelector('#dialog-image').alt=p.title;document.querySelector('#dialog-no').textContent=`PROJECT ${String(i+1).padStart(2,'0')}`;document.querySelector('#dialog-title').innerHTML=`${p.title}<br><small>${p.en}</small>`;document.querySelector('#dialog-type').textContent=p.type;document.querySelector('#dialog-desc').textContent=p.desc;dialog.showModal();document.body.classList.add('dialog-open');history.replaceState(null,'',`#project-${i+1}`)}
function closeProject(){dialog.close();document.body.classList.remove('dialog-open');history.replaceState(null,'','#projects')}document.querySelector('.close').onclick=closeProject;dialog.addEventListener('click',e=>{if(e.target===dialog)closeProject()});
function updateClock(){document.querySelector('#clock').textContent=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())}updateClock();setInterval(updateClock,30000);
addEventListener('load',()=>{const m=location.hash.match(/project-(\d+)/);if(m&&projects[m[1]-1])openProject(m[1]-1)});
