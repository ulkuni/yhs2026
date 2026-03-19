/**
 * PantryService.js - Persistent Grocery List & Pantry Management
 */

const STORAGE_KEY = 'p2p_pantry_data';

export const pantryService = {
  // Initial default pantry
  pantry: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    { name: '계란', unit: '구', quantity: 6, category: '유제품' },
    { name: '대파', unit: '대', quantity: 1, category: '농산물' },
    { name: '우유', unit: 'ml', quantity: 500, category: '유제품' }
  ],

  savePantry: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pantryService.pantry));
  },

  addItem: (item) => {
    pantryService.pantry.push(item);
    pantryService.savePantry();
  },

  removeItem: (index) => {
    pantryService.pantry.splice(index, 1);
    pantryService.savePantry();
  },

  updateQuantity: (index, quantity) => {
    pantryService.pantry[index].quantity = quantity;
    pantryService.savePantry();
  },

  generateGroceryList: (mealPlan) => {
    // In a real app, we would parse all ingredients from the mealPlan JSON.
    // For this prototype, we simulate a list of required ingredients based on the plan's existence.
    const requiredItems = [
      { name: '계란', unit: '구', quantity: 12, category: '유제품' },
      { name: '닭가슴살', unit: 'g', quantity: 500, category: '육류' },
      { name: '브로콜리', unit: '개', quantity: 2, category: '농산물' },
      { name: '아보카도', unit: '개', quantity: 3, category: '농산물' }
    ];

    return requiredItems.map(item => {
      const inPantry = pantryService.pantry.find(p => p.name === item.name);
      const pantryQty = inPantry ? inPantry.quantity : 0;
      const neededQty = Math.max(0, item.quantity - pantryQty);
      
      return {
        ...item,
        alreadyHave: pantryQty >= item.quantity,
        needed: neededQty,
        pantryStatus: inPantry ? `(고 안에 ${pantryQty}${item.unit} 있음)` : '(재고 없음)'
      };
    }).sort((a, b) => a.category.localeCompare(b.category));
  }
};
