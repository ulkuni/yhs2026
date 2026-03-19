/**
 * MealService.js - Simulated AI Meal Planner with Personalization
 */

const MEAL_POOL = {
  keto: [
    { name: '키토 스테이크와 버터 아스파라거스', calories: 650, protein: 45, fat: 50, carbs: 5, image: '🥩' },
    { name: '베이컨 에그 아보카도 보트', calories: 420, protein: 20, fat: 35, carbs: 8, image: '🥑' },
    { name: '연어 구이와 크림 시금치', calories: 550, protein: 35, fat: 42, carbs: 6, image: '🍣' },
    { name: '치즈 오믈렛과 소시지', calories: 480, protein: 25, fat: 38, carbs: 4, image: '🍳' },
    { name: '치킨 시저 샐러드 (크루통 제외)', calories: 380, protein: 30, fat: 28, carbs: 10, image: '🥗' }
  ],
  vegan: [
    { name: '구운 병아리콩 샐러드 볼', calories: 420, protein: 18, fat: 12, carbs: 60, image: '🥗' },
    { name: '두부 야채 볶음과 현미밥', calories: 450, protein: 22, fat: 10, carbs: 65, image: '🍛' },
    { name: '아보카도 퀴노아 샐러드', calories: 380, protein: 12, fat: 20, carbs: 45, image: '🥑' },
    { name: '가지 스테이크와 렌틸콩 수프', calories: 320, protein: 15, fat: 8, carbs: 50, image: '🥣' },
    { name: '템페 타코와 비건 사워크림', calories: 410, protein: 20, fat: 18, carbs: 45, image: '🌮' }
  ],
  balanced: [
    { name: '아보카도 에그 토스트', calories: 350, protein: 15, fat: 20, carbs: 30, image: '🥑' },
    { name: '닭가슴살 비빔밥', calories: 520, protein: 35, fat: 10, carbs: 70, image: '🍱' },
    { name: '구운 생선과 찐 채소', calories: 450, protein: 30, fat: 15, carbs: 40, image: '🐟' },
    { name: '그릭 요거트와 견과류', calories: 280, protein: 20, fat: 12, carbs: 25, image: '🥣' },
    { name: '소고기 야채 죽', calories: 320, protein: 18, fat: 8, carbs: 55, image: '🥘' }
  ]
};

export const mealService = {
  getWeeklyPlan: (preferences) => {
    const diet = preferences?.diet || 'balanced';
    const pool = MEAL_POOL[diet] || MEAL_POOL.balanced;
    const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
    const types = ['Breakfast', 'Lunch', 'Dinner'];

    return days.map((day, dIdx) => ({
      day,
      meals: types.map((type, tIdx) => {
        const meal = pool[(dIdx + tIdx) % pool.length];
        return {
          id: dIdx * 10 + tIdx,
          type,
          ...meal,
          time: 10 + Math.floor(Math.random() * 20)
        };
      })
    }));
  },
  
  swapMeal: (diet = 'balanced') => {
    const pool = MEAL_POOL[diet] || MEAL_POOL.balanced;
    const meal = pool[Math.floor(Math.random() * pool.length)];
    return {
      id: Date.now(),
      type: 'Any',
      ...meal,
      time: 15
    };
  }
};
