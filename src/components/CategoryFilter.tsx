import { useState } from 'react';

const categories = [
  'All Products', 'Spices', 'Cereals', 'Masalas', 'Nuts', 'Rice',
  'Seeds', 'Millets', 'Flours', 'Pulses', 'Bubble Organic Special Products'
];

interface CategoryFilterProps {
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ onSelectCategory }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const handleClick = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-white/40">
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
            Explore Our Products
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleClick(category)}
                className={`px-6 py-2 rounded-full border-2 transition-all transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-green-700 text-white border-green-700'
                    : 'bg-white/50 text-green-800 border-green-600/40 hover:bg-white/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
