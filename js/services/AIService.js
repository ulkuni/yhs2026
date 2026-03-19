/**
 * AIService.js - AI simulation for P2P
 */
export const aiService = {
  /**
   * Simulates image recognition for meal tracking
   */
  async recognizeMealFromImage(imageFile) {
    console.log('Recognizing meal from image...', imageFile);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: '아보카도 연어 샐러드',
          calories: 450,
          macros: { p: 25, f: 30, c: 15 },
          confidence: 0.95
        });
      }, 1500);
    });
  },

  /**
   * Simulates NLP for text/voice meal logging
   */
  async parseMealText(text) {
    console.log('Parsing meal text...', text);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple logic simulation
        if (text.includes('치즈 버거')) {
          resolve({
            name: '치즈 버거',
            calories: 600,
            macros: { p: 30, f: 35, c: 45 }
          });
        } else {
          resolve({
            name: '기록된 식사',
            calories: 300,
            macros: { p: 15, f: 10, c: 20 }
          });
        }
      }, 1000);
    });
  },

  /**
   * Simulates AI meal swap suggestion
   */
  async getSwapSuggestion(currentMeal) {
    console.log('Getting swap suggestion for...', currentMeal);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: '닭가슴살 아스파라거스 구이',
          calories: 380,
          macros: { p: 40, f: 12, c: 10 },
          image: '🥗'
        });
      }, 1200);
    });
  }
};
