import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Calculator, X, TrendingUp, AlertCircle } from 'lucide-react';

// Nutritional data per 100g for common products
const NUTRITION_DATA: Record<string, {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins?: Record<string, number>;
  minerals?: Record<string, number>;
}> = {
  "Black Sesame Seeds": {
    calories: 573,
    protein: 17.7,
    carbs: 23.4,
    fat: 49.7,
    fiber: 11.8,
    vitamins: { vitaminE: 0.25, vitaminB6: 0.79 },
    minerals: { calcium: 975, iron: 14.6, magnesium: 351 }
  },
  "Idli Rice": {
    calories: 343,
    protein: 6.6,
    carbs: 79.8,
    fat: 0.5,
    fiber: 1.3,
    vitamins: { vitaminB1: 0.07, vitaminB3: 1.6 },
    minerals: { manganese: 1.1, selenium: 15.1 }
  },
  "Almond": {
    calories: 579,
    protein: 21.2,
    carbs: 21.6,
    fat: 49.9,
    fiber: 12.5,
    vitamins: { vitaminE: 25.6, vitaminB2: 1.1 },
    minerals: { magnesium: 270, calcium: 269, iron: 3.7 }
  },
  "Organic Red Chilli Powder": {
    calories: 282,
    protein: 13.5,
    carbs: 49.7,
    fat: 17.3,
    fiber: 34.8,
    vitamins: { vitaminA: 21877, vitaminC: 0 },
    minerals: { potassium: 2014, iron: 17.3 }
  },
  "Organic Fox Tail Millet": {
    calories: 351,
    protein: 11.2,
    carbs: 63.2,
    fat: 4.3,
    fiber: 6.7,
    vitamins: { vitaminB1: 0.42, vitaminB6: 0.59 },
    minerals: { magnesium: 81, phosphorus: 290, iron: 2.8 }
  },
  "Toor Dal": {
    calories: 343,
    protein: 22.3,
    carbs: 63.1,
    fat: 1.4,
    fiber: 18.3,
    vitamins: { vitaminB1: 0.27, vitaminB6: 0.28 },
    minerals: { folate: 156, iron: 4.6, magnesium: 138 }
  },
  "Green Gram": {
    calories: 347,
    protein: 24.0,
    carbs: 62.6,
    fat: 1.2,
    fiber: 16.3,
    vitamins: { vitaminB1: 0.62, vitaminB6: 0.38 },
    minerals: { folate: 625, iron: 5.9, magnesium: 189 }
  },
  "Pumpkin Seeds": {
    calories: 574,
    protein: 30.2,
    carbs: 10.7,
    fat: 49.1,
    fiber: 6.5,
    vitamins: { vitaminK: 7.3, vitaminE: 2.2 },
    minerals: { magnesium: 592, zinc: 7.8, iron: 8.8 }
  },
  "Wheat Flour": {
    calories: 361,
    protein: 12.6,
    carbs: 76.3,
    fat: 1.5,
    fiber: 12.2,
    vitamins: { vitaminB1: 0.5, vitaminB3: 5.0 },
    minerals: { manganese: 4.1, selenium: 33.9 }
  },
  "Himalayan Pink Salt Crystal": {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    minerals: { sodium: 39337, potassium: 8, calcium: 24, magnesium: 1 }
  }
};

interface NutritionCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const NutritionCalculator: React.FC<NutritionCalculatorProps> = ({ isOpen, onClose }) => {
  const { items } = useCart();
  const [servingSize, setServingSize] = useState(100); // grams

  const nutritionTotals = useMemo(() => {
    let totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      vitamins: {} as Record<string, number>,
      minerals: {} as Record<string, number>
    };

    items.forEach(item => {
      const parts = item.id.split("-");
      const baseId = parts[0];
      const product = PRODUCTS.find(p => String(p.id) === baseId);

      if (product && NUTRITION_DATA[product.name]) {
        const nutrition = NUTRITION_DATA[product.name];
        const weightLabel = parts[1];
        let weightInGrams = 100; // default

        // Convert weight label to grams
        if (weightLabel.includes('kg')) {
          weightInGrams = parseFloat(weightLabel) * 1000;
        } else if (weightLabel.includes('g')) {
          weightInGrams = parseFloat(weightLabel.replace('g', ''));
        }

        const multiplier = (weightInGrams * item.qty) / 100; // per 100g to actual weight

        totals.calories += nutrition.calories * multiplier;
        totals.protein += nutrition.protein * multiplier;
        totals.carbs += nutrition.carbs * multiplier;
        totals.fat += nutrition.fat * multiplier;
        totals.fiber += nutrition.fiber * multiplier;

        // Aggregate vitamins and minerals
        if (nutrition.vitamins) {
          Object.entries(nutrition.vitamins).forEach(([key, value]) => {
            totals.vitamins[key] = (totals.vitamins[key] || 0) + value * multiplier;
          });
        }

        if (nutrition.minerals) {
          Object.entries(nutrition.minerals).forEach(([key, value]) => {
            totals.minerals[key] = (totals.minerals[key] || 0) + value * multiplier;
          });
        }
      }
    });

    return totals;
  }, [items]);

  const getNutritionPerServing = (total: number) => {
    return (total * servingSize) / 100;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator size={24} />
            <h2 className="text-2xl font-bold">Nutrition Calculator</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-green-700 p-2 rounded-full transition-colors"
            aria-label="Close calculator"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Serving Size Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serving Size (grams)
            </label>
            <input
              type="number"
              value={servingSize}
              onChange={(e) => setServingSize(Number(e.target.value))}
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="1"
              max="1000"
            />
          </div>

          {/* Cart Items Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Cart Items</h3>
            <div className="space-y-2">
              {items.map(item => {
                const parts = item.id.split("-");
                const baseId = parts[0];
                const product = PRODUCTS.find(p => String(p.id) === baseId);
                return (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">x{item.qty}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {product && NUTRITION_DATA[product.name] ? '✓ Nutritional data available' : '⚠ No data available'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nutrition Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Macronutrients */}
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Macronutrients (per {servingSize}g serving)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Calories</span>
                  <span className="font-semibold text-green-800">{Math.round(getNutritionPerServing(nutritionTotals.calories))} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Protein</span>
                  <span className="font-semibold text-green-800">{getNutritionPerServing(nutritionTotals.protein).toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Carbohydrates</span>
                  <span className="font-semibold text-green-800">{getNutritionPerServing(nutritionTotals.carbs).toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Fat</span>
                  <span className="font-semibold text-green-800">{getNutritionPerServing(nutritionTotals.fat).toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Fiber</span>
                  <span className="font-semibold text-green-800">{getNutritionPerServing(nutritionTotals.fiber).toFixed(1)}g</span>
                </div>
              </div>
            </div>

            {/* Vitamins & Minerals */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Key Vitamins & Minerals (per {servingSize}g serving)
              </h3>
              <div className="space-y-3">
                {Object.keys(nutritionTotals.vitamins).length > 0 && (
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Vitamins</h4>
                    {Object.entries(nutritionTotals.vitamins).map(([vitamin, amount]) => (
                      <div key={vitamin} className="flex justify-between text-sm">
                        <span className="text-gray-700 capitalize">{vitamin.replace('vitamin', 'Vitamin ')}</span>
                        <span className="font-semibold text-blue-800">{getNutritionPerServing(amount).toFixed(2)}mg</span>
                      </div>
                    ))}
                  </div>
                )}

                {Object.keys(nutritionTotals.minerals).length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-blue-800 mb-2">Minerals</h4>
                    {Object.entries(nutritionTotals.minerals).map(([mineral, amount]) => (
                      <div key={mineral} className="flex justify-between text-sm">
                        <span className="text-gray-700 capitalize">{mineral}</span>
                        <span className="font-semibold text-blue-800">{getNutritionPerServing(amount).toFixed(1)}mg</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Daily Value Reference */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Daily Value Reference (2,000 calorie diet)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>Protein: 50g</div>
              <div>Carbs: 300g</div>
              <div>Fiber: 25g</div>
              <div>Fat: 65g</div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              * Values are approximate and based on USDA nutritional data. Individual needs may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionCalculator;
