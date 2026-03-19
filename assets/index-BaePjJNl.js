(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const d={keto:[{name:"키토 스테이크와 버터 아스파라거스",calories:650,protein:45,fat:50,carbs:5,image:"🥩"},{name:"베이컨 에그 아보카도 보트",calories:420,protein:20,fat:35,carbs:8,image:"🥑"},{name:"연어 구이와 크림 시금치",calories:550,protein:35,fat:42,carbs:6,image:"🍣"},{name:"치즈 오믈렛과 소시지",calories:480,protein:25,fat:38,carbs:4,image:"🍳"},{name:"치킨 시저 샐러드 (크루통 제외)",calories:380,protein:30,fat:28,carbs:10,image:"🥗"}],vegan:[{name:"구운 병아리콩 샐러드 볼",calories:420,protein:18,fat:12,carbs:60,image:"🥗"},{name:"두부 야채 볶음과 현미밥",calories:450,protein:22,fat:10,carbs:65,image:"🍛"},{name:"아보카도 퀴노아 샐러드",calories:380,protein:12,fat:20,carbs:45,image:"🥑"},{name:"가지 스테이크와 렌틸콩 수프",calories:320,protein:15,fat:8,carbs:50,image:"🥣"},{name:"템페 타코와 비건 사워크림",calories:410,protein:20,fat:18,carbs:45,image:"🌮"}],balanced:[{name:"아보카도 에그 토스트",calories:350,protein:15,fat:20,carbs:30,image:"🥑"},{name:"닭가슴살 비빔밥",calories:520,protein:35,fat:10,carbs:70,image:"🍱"},{name:"구운 생선과 찐 채소",calories:450,protein:30,fat:15,carbs:40,image:"🐟"},{name:"그릭 요거트와 견과류",calories:280,protein:20,fat:12,carbs:25,image:"🥣"},{name:"소고기 야채 죽",calories:320,protein:18,fat:8,carbs:55,image:"🥘"}]},p={getWeeklyPlan:e=>{const t=(e==null?void 0:e.diet)||"balanced",n=d[t]||d.balanced,s=["월요일","화요일","수요일","목요일","금요일","토요일","일요일"],i=["Breakfast","Lunch","Dinner"];return s.map((r,c)=>({day:r,meals:i.map((v,g)=>{const f=n[(c+g)%n.length];return{id:c*10+g,type:v,...f,time:10+Math.floor(Math.random()*20)}})}))},swapMeal:(e="balanced")=>{const t=d[e]||d.balanced,n=t[Math.floor(Math.random()*t.length)];return{id:Date.now(),type:"Any",...n,time:15}}},m="p2p_pantry_data",o={pantry:JSON.parse(localStorage.getItem(m))||[{name:"계란",unit:"구",quantity:6,category:"유제품"},{name:"대파",unit:"대",quantity:1,category:"농산물"},{name:"우유",unit:"ml",quantity:500,category:"유제품"}],savePantry:()=>{localStorage.setItem(m,JSON.stringify(o.pantry))},addItem:e=>{o.pantry.push(e),o.savePantry()},removeItem:e=>{o.pantry.splice(e,1),o.savePantry()},updateQuantity:(e,t)=>{o.pantry[e].quantity=t,o.savePantry()},generateGroceryList:e=>[{name:"계란",unit:"구",quantity:12,category:"유제품"},{name:"닭가슴살",unit:"g",quantity:500,category:"육류"},{name:"브로콜리",unit:"개",quantity:2,category:"농산물"},{name:"아보카도",unit:"개",quantity:3,category:"농산물"}].map(n=>{const s=o.pantry.find(c=>c.name===n.name),i=s?s.quantity:0,r=Math.max(0,n.quantity-i);return{...n,alreadyHave:i>=n.quantity,needed:r,pantryStatus:s?`(고 안에 ${i}${n.unit} 있음)`:"(재고 없음)"}}).sort((n,s)=>n.category.localeCompare(s.category))},u={async recognizeMealFromImage(e){return console.log("Recognizing meal from image...",e),new Promise(t=>{setTimeout(()=>{t({name:"아보카도 연어 샐러드",calories:450,macros:{p:25,f:30,c:15},confidence:.95})},1500)})},async parseMealText(e){return console.log("Parsing meal text...",e),new Promise(t=>{setTimeout(()=>{e.includes("치즈 버거")?t({name:"치즈 버거",calories:600,macros:{p:30,f:35,c:45}}):t({name:"기록된 식사",calories:300,macros:{p:15,f:10,c:20}})},1e3)})},async getSwapSuggestion(e){return console.log("Getting swap suggestion for...",e),new Promise(t=>{setTimeout(()=>{t({name:"닭가슴살 아스파라거스 구이",calories:380,macros:{p:40,f:12,c:10},image:"🥗"})},1200)})}},a={currentView:"home",onboarded:!1,step:1,user:{name:"ulkuni",goal:"",diet:"",dailyTarget:2200,consumed:950,macros:{p:30,f:20,c:50}},weeklyPlan:[],groceryList:[],nextMeal:null},y={onboarding:()=>{const e=[{id:"goal",question:"당신의 건강 목표는 무엇인가요?",options:["체중 감량","근육 증량","건강 유지"]},{id:"diet",question:"선호하는 식단이 있으신가요?",options:["일반식","키토제닉","비건"]}],t=e[a.step-1];return`
      <section class="animate-fade-in onboarding-card" style="margin-top: 40px;">
        <div class="prog-bar"><div class="prog-fill" style="width: ${a.step/e.length*100}%"></div></div>
        <h2 style="font-size: 1.6rem; margin-bottom: var(--spacing-md);">${t.question}</h2>
        <div class="option-group">
          ${t.options.map(s=>`
            <button class="option-btn ${a.user[t.id]===s?"selected":""}" 
                    onclick="window.handleSelect('${t.id}', '${s}')">${s}</button>
          `).join("")}
        </div>
        <button class="btn-primary" style="margin-top: var(--spacing-lg);" onclick="window.handleNext()">다음</button>
        <p style="text-align: center; color: var(--text-secondary); font-size: 0.8rem; margin-top: 10px; cursor: pointer;" onclick="window.handleSkip()">건너뛰기</p>
      </section>
    `},home:()=>{var s;const e=a.nextMeal||((s=a.weeklyPlan[0])==null?void 0:s.meals[1]),t=a.user.dailyTarget-a.user.consumed,n=Math.min(100,a.user.consumed/a.user.dailyTarget*100);return`
      <section class="animate-fade-in">
        <header style="margin-bottom: var(--spacing-lg);">
          <h2 style="font-size: 1.8rem; margin-bottom: 4px;">안녕하세요, ${a.user.name}님! 👋</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">오늘의 목표까지 <span style="color: hsl(var(--accent-green)); font-weight: 700;">${t.toLocaleString()} kcal</span> 남았습니다.</p>
        </header>

        <div class="glass-panel" style="padding: var(--spacing-lg); margin-bottom: var(--spacing-lg); position: relative; overflow: hidden;">
          <div style="position: absolute; top:0; left:0; height: 4px; width: ${n}%; background: hsl(var(--accent-green)); transition: width 1s ease;"></div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="stat-badge badge-amber">Next Meal</span>
              <h3 style="font-size: 1.4rem; margin-top: 4px;">${e?e.name:"식단을 생성해주세요"}</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 4px;">
                조리 시간: ${e?e.time:"-"}분 | ${e?e.calories:"-"} kcal
              </p>
            </div>
            <button class="glass-panel" style="width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;" 
                    onclick="window.handleSwap(event)">🔄</button>
          </div>
          <div style="margin-top: var(--spacing-md); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--glass-border); background: rgba(0,0,0,0.2); height: 160px; display: flex; align-items: center; justify-content: center; font-size: 4rem;">
            ${e?e.image:"🍽️"}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
          <div class="glass-panel" style="padding: var(--spacing-md);">
            <span style="font-size: 0.7rem; color: var(--text-secondary);">탄 / 단 / 지 %</span>
            <div style="font-size: 1rem; font-weight: 700; margin-top: 4px; display: flex; gap: 4px;">
               <span style="color: hsl(var(--accent-blue))">${a.user.macros.c}</span> / 
               <span style="color: hsl(var(--accent-green))">${a.user.macros.p}</span> / 
               <span style="color: hsl(var(--accent-amber))">${a.user.macros.f}</span>
            </div>
            <div style="display: flex; height: 4px; background: var(--glass-border); border-radius: 2px; margin-top: 8px; overflow: hidden;">
              <div style="width: ${a.user.macros.c}%; height: 100%; background: hsl(var(--accent-blue));"></div>
              <div style="width: ${a.user.macros.p}%; height: 100%; background: hsl(var(--accent-green));"></div>
              <div style="width: ${a.user.macros.f}%; height: 100%; background: hsl(var(--accent-amber));"></div>
            </div>
          </div>
          <div class="glass-panel" style="padding: var(--spacing-md);">
            <span style="font-size: 0.7rem; color: var(--text-secondary);">물 섭취량</span>
            <div style="font-size: 1.2rem; font-weight: 700; margin-top: 4px;">1.5 / 2.5L</div>
            <div style="height: 4px; background: var(--glass-border); border-radius: 2px; margin-top: 8px;">
              <div style="width: 60%; height: 100%; background: hsl(var(--accent-blue)); border-radius: 2px;"></div>
            </div>
          </div>
        </div>

        <button class="btn-primary" onclick="window.setView('planner')">주간 식단 전체보기</button>
      </section>
    `},planner:()=>`
    <section class="animate-fade-in">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
        <h2>주간 식단 플래너</h2>
        <span class="stat-badge badge-green">${a.user.diet||"정밀"} 맞춤형</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
        ${a.weeklyPlan.map(e=>`
          <div class="glass-panel" style="padding: var(--spacing-md);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
              <h4 style="margin: 0;">${e.day}</h4>
              <span style="font-size: 0.7rem; color: var(--text-secondary);">총 ${e.meals.reduce((t,n)=>t+n.calories,0)} kcal</span>
            </div>
            <div style="display: flex; gap: var(--spacing-sm); overflow-x: auto; padding-bottom: 8px;">
              ${e.meals.map(t=>`
                <div class="glass-panel" style="min-width: 140px; padding: var(--spacing-sm); font-size: 0.8rem; cursor: pointer;" onclick="window.handleMealDetail(${t.id})">
                  <div style="font-size: 1.2rem;">${t.image}</div>
                  <div style="font-weight: 700; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t.name}</div>
                  <div style="color: var(--text-secondary); margin-top: 2px;">${t.calories} kcal</div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `,grocery:()=>(a.groceryList=o.generateGroceryList(a.weeklyPlan),`
      <section class="animate-fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
          <h2>스마트 장보기</h2>
          <button class="stat-badge badge-blue" onclick="window.setView('pantry')">팬트리 관리 ⚙️</button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
          ${a.groceryList.map((e,t)=>`
            <div class="glass-panel" style="padding: var(--spacing-md); display: flex; justify-content: space-between; align-items: center; ${e.needed===0?"opacity: 0.6;":""}">
              <div style="display: flex; align-items: center; gap: 12px;">
                 <input type="checkbox" ${e.needed===0?"checked":""} onchange="window.toggleGrocery(${t})" style="width: 20px; height: 20px;">
                 <div>
                   <div style="font-weight: 700; ${e.needed===0?"text-decoration: line-through;":""}">${e.name} ${e.needed>0?e.needed+e.unit:"(완료)"}</div>
                   <div style="font-size: 0.7rem; color: var(--text-secondary);">${e.category} ${e.pantryStatus}</div>
                 </div>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="glass-panel" style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: hsla(var(--accent-blue-h), var(--accent-blue-s), var(--accent-blue-l), 0.1);">
           <p style="font-size: 0.85rem;">💡 <b>ulkuni의 팁</b>: 팬트리에 있는 재료를 자동으로 제외해 낭비를 최소화했습니다!</p>
        </div>
      </section>
    `),pantry:()=>`
    <section class="animate-fade-in">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: var(--spacing-lg);">
        <button class="glass-panel" style="padding: 4px 12px;" onclick="window.setView('grocery')">←</button>
        <h2 style="margin: 0;">나의 팬트리</h2>
      </div>

      <div class="glass-panel" style="padding: var(--spacing-md); margin-bottom: var(--spacing-lg);">
        <h4 style="margin-bottom: 12px;">재고 추가</h4>
        <div style="display: grid; grid-template-columns: 1fr 60px 44px; gap: 8px;">
          <input type="text" id="pantry-name" placeholder="재료명" class="glass-panel" style="padding: 8px; font-size: 0.9rem;">
          <input type="number" id="pantry-qty" value="1" class="glass-panel" style="padding: 8px; font-size: 0.9rem;">
          <button class="btn-primary" style="padding: 0; display: flex; align-items: center; justify-content: center;" onclick="window.handleAddPantry()">+</button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
        ${o.pantry.map((e,t)=>`
          <div class="glass-panel" style="padding: var(--spacing-md); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 700;">${e.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">${e.quantity}${e.unit||""}</div>
            </div>
            <button style="background: none; border: none; font-size: 1.2rem; cursor: pointer;" onclick="window.handleRemovePantry(${t})">🗑️</button>
          </div>
        `).join("")}
      </div>
    </section>
  `,tracker:()=>`
    <section class="animate-fade-in" style="text-align: center;">
      <h2 style="margin-bottom: var(--spacing-lg);">식사 기록</h2>
      <div id="tracker-main">
        <div class="glass-panel" style="padding: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
          <div style="width: 80px; height: 80px; background: hsla(var(--accent-green-h), var(--accent-green-s), var(--accent-green-l), 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-md);">
            <span style="font-size: 2rem;">📸</span>
          </div>
          <p style="margin-bottom: var(--spacing-md);">오늘 무엇을 드셨나요?</p>
          <button class="btn-primary" onclick="window.handlePhotoTrack()">사진으로 기록하기</button>
        </div>
        <div class="glass-panel" style="padding: var(--spacing-md);">
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 12px;">또는 음성/텍스트로 입력하세요</p>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="meal-input" placeholder="예: 치즈 버거 1개 먹었어" class="glass-panel" style="flex: 1; padding: 12px; border: 1px solid var(--glass-border); color: white;">
            <button class="glass-panel" style="padding: 0 16px;" onclick="window.handleTextTrack()">입력</button>
          </div>
        </div>
      </div>
    </section>
  `};window.handleSelect=(e,t)=>{a.user[e]=t,t==="키토제닉"&&(a.user.macros={p:25,f:70,c:5}),t==="비건"&&(a.user.macros={p:15,f:25,c:60}),t==="일반식"&&(a.user.macros={p:30,f:20,c:50}),l()};window.handleNext=()=>{if(a.step===2){a.onboarded=!0,a.currentView="home";const e=a.user.diet==="키토제닉"?"keto":a.user.diet==="비건"?"vegan":"balanced";a.weeklyPlan=p.getWeeklyPlan({diet:e})}else a.step++;l()};window.handleSkip=()=>{a.onboarded=!0,a.currentView="home",a.weeklyPlan=p.getWeeklyPlan(),l()};window.handleSwap=async e=>{const t=e.currentTarget,n=t.innerText;t.innerText="⏳";const s=a.user.diet==="키토제닉"?"keto":a.user.diet==="비건"?"vegan":"balanced",i=p.swapMeal(s);a.nextMeal=i,t.innerText=n,l()};window.handlePhotoTrack=async()=>{const e=document.getElementById("tracker-main");e.innerHTML='<div class="glass-panel" style="padding: 40px;">AI 분석 중... 🔍</div>';const t=await u.recognizeMealFromImage("dummy-file");a.user.consumed+=t.calories,alert(`기록 완료: ${t.name} (${t.calories}kcal)`),a.currentView="home",l()};window.handleTextTrack=async()=>{const t=document.getElementById("meal-input").value;if(!t)return;const n=await u.parseMealText(t);a.user.consumed+=n.calories,alert(`기록 완료: ${n.name} (${n.calories}kcal)`),a.currentView="home",l()};window.handleAddPantry=()=>{const e=document.getElementById("pantry-name"),t=document.getElementById("pantry-qty");e.value&&(o.addItem({name:e.value,quantity:parseInt(t.value),unit:"개",category:"기타"}),l())};window.handleRemovePantry=e=>{o.removeItem(e),l()};window.toggleGrocery=e=>{const t=a.groceryList[e];t.needed>0&&o.addItem({name:t.name,quantity:t.quantity,unit:t.unit,category:t.category}),l()};window.setView=e=>{a.currentView=e,l()};window.handleMealDetail=e=>{alert(`메뉴 ID ${e}의 상세 레시피와 영양 정보를 조회합니다.`)};function l(){const e=document.getElementById("main-view"),t=document.getElementById("bottom-nav");a.onboarded?(e.innerHTML=y[a.currentView](),t.style.display="flex",document.querySelectorAll(".nav-tab").forEach(n=>{n.dataset.view===a.currentView?n.classList.add("active"):n.classList.remove("active")})):(e.innerHTML=y.onboarding(),t.style.display="none")}function h(){document.querySelectorAll(".nav-tab").forEach(e=>{e.addEventListener("click",()=>{a.currentView=e.dataset.view,l()})}),a.weeklyPlan=p.getWeeklyPlan(),l()}document.addEventListener("DOMContentLoaded",h);
