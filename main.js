/**
 * main.js - Plan-to-Plate (P2P) Core Logic (Enhanced)
 */
import { mealService } from './js/services/MealService.js';
import { pantryService } from './js/services/PantryService.js';
import { aiService } from './js/services/AIService.js';

const state = {
  currentView: 'home',
  onboarded: false,
  step: 1,
  user: {
    name: 'ulkuni',
    goal: '',
    diet: '',
    dailyTarget: 2200,
    consumed: 950,
    macros: { p: 30, f: 20, c: 50 } // Percentage
  },
  weeklyPlan: [],
  groceryList: [],
  nextMeal: null
};

// Views Definition
const views = {
  onboarding: () => {
    const steps = [
      {
        id: 'goal',
        question: '당신의 건강 목표는 무엇인가요?',
        options: ['체중 감량', '근육 증량', '건강 유지']
      },
      {
        id: 'diet',
        question: '선호하는 식단이 있으신가요?',
        options: ['일반식', '키토제닉', '비건']
      }
    ];

    const currentStep = steps[state.step - 1];
    const progress = (state.step / steps.length) * 100;

    return `
      <section class="animate-fade-in onboarding-card" style="margin-top: 40px;">
        <div class="prog-bar"><div class="prog-fill" style="width: ${progress}%"></div></div>
        <h2 style="font-size: 1.6rem; margin-bottom: var(--spacing-md);">${currentStep.question}</h2>
        <div class="option-group">
          ${currentStep.options.map(opt => `
            <button class="option-btn ${state.user[currentStep.id] === opt ? 'selected' : ''}" 
                    onclick="window.handleSelect('${currentStep.id}', '${opt}')">${opt}</button>
          `).join('')}
        </div>
        <button class="btn-primary" style="margin-top: var(--spacing-lg);" onclick="window.handleNext()">다음</button>
        <p style="text-align: center; color: var(--text-secondary); font-size: 0.8rem; margin-top: 10px; cursor: pointer;" onclick="window.handleSkip()">건너뛰기</p>
      </section>
    `;
  },

  home: () => {
    const next = state.nextMeal || (state.weeklyPlan[0]?.meals[1]); // Show Lunch as next if breakfast done
    const remaining = state.user.dailyTarget - state.user.consumed;
    const progressPerc = Math.min(100, (state.user.consumed / state.user.dailyTarget) * 100);
    
    return `
      <section class="animate-fade-in">
        <header style="margin-bottom: var(--spacing-lg);">
          <h2 style="font-size: 1.8rem; margin-bottom: 4px;">안녕하세요, ${state.user.name}님! 👋</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">오늘의 목표까지 <span style="color: hsl(var(--accent-green)); font-weight: 700;">${remaining.toLocaleString()} kcal</span> 남았습니다.</p>
        </header>

        <div class="glass-panel" style="padding: var(--spacing-lg); margin-bottom: var(--spacing-lg); position: relative; overflow: hidden;">
          <div style="position: absolute; top:0; left:0; height: 4px; width: ${progressPerc}%; background: hsl(var(--accent-green)); transition: width 1s ease;"></div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="stat-badge badge-amber">Next Meal</span>
              <h3 style="font-size: 1.4rem; margin-top: 4px;">${next ? next.name : '식단을 생성해주세요'}</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 4px;">
                조리 시간: ${next ? next.time : '-'}분 | ${next ? next.calories : '-'} kcal
              </p>
            </div>
            <button class="glass-panel" style="width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;" 
                    onclick="window.handleSwap(event)">🔄</button>
          </div>
          <div style="margin-top: var(--spacing-md); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--glass-border); background: rgba(0,0,0,0.2); height: 160px; display: flex; align-items: center; justify-content: center; font-size: 4rem;">
            ${next ? next.image : '🍽️'}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
          <div class="glass-panel" style="padding: var(--spacing-md);">
            <span style="font-size: 0.7rem; color: var(--text-secondary);">탄 / 단 / 지 %</span>
            <div style="font-size: 1rem; font-weight: 700; margin-top: 4px; display: flex; gap: 4px;">
               <span style="color: hsl(var(--accent-blue))">${state.user.macros.c}</span> / 
               <span style="color: hsl(var(--accent-green))">${state.user.macros.p}</span> / 
               <span style="color: hsl(var(--accent-amber))">${state.user.macros.f}</span>
            </div>
            <div style="display: flex; height: 4px; background: var(--glass-border); border-radius: 2px; margin-top: 8px; overflow: hidden;">
              <div style="width: ${state.user.macros.c}%; height: 100%; background: hsl(var(--accent-blue));"></div>
              <div style="width: ${state.user.macros.p}%; height: 100%; background: hsl(var(--accent-green));"></div>
              <div style="width: ${state.user.macros.f}%; height: 100%; background: hsl(var(--accent-amber));"></div>
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
    `;
  },

  planner: () => `
    <section class="animate-fade-in">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
        <h2>주간 식단 플래너</h2>
        <span class="stat-badge badge-green">${state.user.diet || '정밀'} 맞춤형</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
        ${state.weeklyPlan.map(day => `
          <div class="glass-panel" style="padding: var(--spacing-md);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
              <h4 style="margin: 0;">${day.day}</h4>
              <span style="font-size: 0.7rem; color: var(--text-secondary);">총 ${day.meals.reduce((s, m) => s + m.calories, 0)} kcal</span>
            </div>
            <div style="display: flex; gap: var(--spacing-sm); overflow-x: auto; padding-bottom: 8px;">
              ${day.meals.map(meal => `
                <div class="glass-panel" style="min-width: 140px; padding: var(--spacing-sm); font-size: 0.8rem; cursor: pointer;" onclick="window.handleMealDetail(${meal.id})">
                  <div style="font-size: 1.2rem;">${meal.image}</div>
                  <div style="font-weight: 700; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${meal.name}</div>
                  <div style="color: var(--text-secondary); margin-top: 2px;">${meal.calories} kcal</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `,

  grocery: () => {
    state.groceryList = pantryService.generateGroceryList(state.weeklyPlan);
    
    return `
      <section class="animate-fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
          <h2>스마트 장보기</h2>
          <button class="stat-badge badge-blue" onclick="window.setView('pantry')">팬트리 관리 ⚙️</button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
          ${state.groceryList.map((item, idx) => `
            <div class="glass-panel" style="padding: var(--spacing-md); display: flex; justify-content: space-between; align-items: center; ${item.needed === 0 ? 'opacity: 0.6;' : ''}">
              <div style="display: flex; align-items: center; gap: 12px;">
                 <input type="checkbox" ${item.needed === 0 ? 'checked' : ''} onchange="window.toggleGrocery(${idx})" style="width: 20px; height: 20px;">
                 <div>
                   <div style="font-weight: 700; ${item.needed === 0 ? 'text-decoration: line-through;' : ''}">${item.name} ${item.needed > 0 ? item.needed + item.unit : '(완료)'}</div>
                   <div style="font-size: 0.7rem; color: var(--text-secondary);">${item.category} ${item.pantryStatus}</div>
                 </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="glass-panel" style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: hsla(var(--accent-blue-h), var(--accent-blue-s), var(--accent-blue-l), 0.1);">
           <p style="font-size: 0.85rem;">💡 <b>ulkuni의 팁</b>: 팬트리에 있는 재료를 자동으로 제외해 낭비를 최소화했습니다!</p>
        </div>
      </section>
    `;
  },

  pantry: () => `
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
        ${pantryService.pantry.map((item, idx) => `
          <div class="glass-panel" style="padding: var(--spacing-md); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 700;">${item.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">${item.quantity}${item.unit || ''}</div>
            </div>
            <button style="background: none; border: none; font-size: 1.2rem; cursor: pointer;" onclick="window.handleRemovePantry(${idx})">🗑️</button>
          </div>
        `).join('')}
      </div>
    </section>
  `,
  
  tracker: () => `
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
  `
};

// Global Handlers
window.handleSelect = (stepId, option) => {
  state.user[stepId] = option;
  if (option === '키토제닉') state.user.macros = { p: 25, f: 70, c: 5 };
  if (option === '비건') state.user.macros = { p: 15, f: 25, c: 60 };
  if (option === '일반식') state.user.macros = { p: 30, f: 20, c: 50 };
  render();
};

window.handleNext = () => {
  if (state.step === 2) {
    state.onboarded = true;
    state.currentView = 'home';
    const dietCode = state.user.diet === '키토제닉' ? 'keto' : (state.user.diet === '비건' ? 'vegan' : 'balanced');
    state.weeklyPlan = mealService.getWeeklyPlan({ diet: dietCode });
  } else {
    state.step++;
  }
  render();
};

window.handleSkip = () => {
  state.onboarded = true;
  state.currentView = 'home';
  state.weeklyPlan = mealService.getWeeklyPlan();
  render();
};

window.handleSwap = async (event) => {
  const btn = event.currentTarget;
  const originalIcon = btn.innerText;
  btn.innerText = '⏳';
  const dietCode = state.user.diet === '키토제닉' ? 'keto' : (state.user.diet === '비건' ? 'vegan' : 'balanced');
  const suggestion = mealService.swapMeal(dietCode);
  state.nextMeal = suggestion;
  btn.innerText = originalIcon;
  render();
};

window.handlePhotoTrack = async () => {
  const container = document.getElementById('tracker-main');
  container.innerHTML = `<div class="glass-panel" style="padding: 40px;">AI 분석 중... 🔍</div>`;
  const result = await aiService.recognizeMealFromImage('dummy-file');
  state.user.consumed += result.calories;
  alert(`기록 완료: ${result.name} (${result.calories}kcal)`);
  state.currentView = 'home';
  render();
};

window.handleTextTrack = async () => {
  const input = document.getElementById('meal-input');
  const text = input.value;
  if (!text) return;
  
  const result = await aiService.parseMealText(text);
  state.user.consumed += result.calories;
  alert(`기록 완료: ${result.name} (${result.calories}kcal)`);
  state.currentView = 'home';
  render();
};

window.handleAddPantry = () => {
  const nameEl = document.getElementById('pantry-name');
  const qtyEl = document.getElementById('pantry-qty');
  if (!nameEl.value) return;
  
  pantryService.addItem({
    name: nameEl.value,
    quantity: parseInt(qtyEl.value),
    unit: '개',
    category: '기타'
  });
  render();
};

window.handleRemovePantry = (idx) => {
  pantryService.removeItem(idx);
  render();
};

window.toggleGrocery = (idx) => {
  const item = state.groceryList[idx];
  if (item.needed > 0) {
    // Treat as bought -> inform pantry
    pantryService.addItem({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category
    });
  }
  render();
};

window.setView = (view) => {
  state.currentView = view;
  render();
};

window.handleMealDetail = (id) => {
  alert(`메뉴 ID ${id}의 상세 레시피와 영양 정보를 조회합니다.`);
};

function render() {
  const mainView = document.getElementById('main-view');
  const bottomNav = document.getElementById('bottom-nav');
  
  if (!state.onboarded) {
    mainView.innerHTML = views.onboarding();
    bottomNav.style.display = 'none';
  } else {
    mainView.innerHTML = views[state.currentView]();
    bottomNav.style.display = 'flex';
    
    document.querySelectorAll('.nav-tab').forEach(tab => {
      if (tab.dataset.view === state.currentView) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }
}

function init() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.currentView = tab.dataset.view;
      render();
    });
  });
  
  state.weeklyPlan = mealService.getWeeklyPlan();
  render();
}

document.addEventListener('DOMContentLoaded', init);
