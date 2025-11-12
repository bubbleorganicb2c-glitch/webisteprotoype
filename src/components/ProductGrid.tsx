import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';


interface WeightOption {
  label: string;
  price: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  weights: WeightOption[];
}

interface CartItem {
  id: number;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Black Sesame Seeds',
    category: 'Spices',
    image: '/products/BlackSesameseed.jpg',
    weights: [
      { label: '100g', price: 95 },
      { label: '200g', price: 180 },
    ],
  },
  {
    id: 2,
    name: 'Idli Rice',
    category: 'Rice',
    image:
      '/products/Idli-rice.jpg',
    weights: [
        { label: '1kg', price: 140 },
      { label: '2kg', price: 275 },
    ],
  },
  {
    id: 3,
    name: 'Almond',
    category: 'Nuts',
    image:
      '/products/Almond.jpg',
    weights: [
      { label: '100g', price: 189 },
    ],
  },
  {
    id: 4,
    name: 'Organic Red Chilli Powder',
    category: 'Masalas',
    image:
      '/products/Red-chilli-powder.jpg',
    weights: [
      { label: '100g', price: 140 },
      { label: '200g', price: 275 },
    ],
  },
    {
    id: 5,
    name: 'Organic Fox Tail Millet',
    category: 'Millets',
    image:
      '/products/Foxtail-millet.jpg',
    weights: [
      { label: '500g', price: 110 },
      { label: '1Kg', price: 215 },
    ],
  },
    {
    id: 6,
    name: 'Toor Dal',
    category: 'Pulses',
    image:
      '/products/Toor-dal.jpg',
    weights: [
      { label: '500g', price: 175 },
      { label: '1Kg', price: 275 },
    ],
  },
    {
    id: 7,
    name: 'Green Gram',
    category: 'Cereals',
    image:
      '/products/Green-gram.jpg',
    weights: [
      { label: '500g', price: 160 },
      { label: '1Kg', price: 295 },
    ],
  },
    {
    id: 8,
    name: 'Pumpkin Seeds',
    category: 'Seeds',
    image:
      '/products/Pumpkin-seed.jpg',
    weights: [
      { label: '100g', price: 115 },
    ],
  },
  {
    id: 9,
    name: 'Wheat Flour',
    category: 'Flours',
    image:
      '/products/Wheat-flour.jpg',
    weights: [
      { label: '1Kg', price: 80 },
    ],
  },
  {
    id: 10,
    name: 'Himalayan Pink Salt Crystal',
    category: 'Bubble Organic Special Products',
    image:
      '/products/pink-salt-crystal.jpg',
    weights: [
      { label: '500g', price: 95 },
    ],
  },
];

interface ProductGridProps {
  selectedCategory: string;
}

export default function ProductGrid({ selectedCategory }: ProductGridProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<{ [key: number]: number }>({});
  const [animatePrice, setAnimatePrice] = useState<{ [key: number]: boolean }>({});
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});

  const filteredProducts =
    selectedCategory === 'All Products'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleWeightChange = (productId: number, index: number) => {
    setAnimatePrice((prev) => ({ ...prev, [productId]: true }));
    setSelectedWeights((prev) => ({ ...prev, [productId]: index }));

    setTimeout(() => {
      setAnimatePrice((prev) => ({ ...prev, [productId]: false }));
    }, 300);
  };

  const handleAddToCart = (product: Product) => {
    const selectedIndex = selectedWeights[product.id] ?? 0;
    const weightOption = product.weights[selectedIndex];

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.weight === weightOption.label
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          weight: weightOption.label,
          price: weightOption.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });

    // Show temporary feedback animation
    setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 800);
  };

  return (
    <div className="py-8 pb-16 bg-[#e7efd8]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const selectedIndex = selectedWeights[product.id] ?? 0;
            const selectedWeight = product.weights[selectedIndex];

            return (
              <div
                key={product.id}
                className="bg-white/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all transform hover:scale-[1.03] hover:bg-white/60"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-sm text-green-700 mb-1">{product.category}</p>
                  <h3 className="text-lg font-semibold text-green-900 mb-3 leading-snug">
                    {product.name}
                  </h3>

                  {/* Weight Selector */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.weights.map((w, index) => {
                      const isActive = selectedIndex === index;
                      return (
                        <button
                          key={w.label}
                          onClick={() => handleWeightChange(product.id, index)}
                          className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
                            isActive
                              ? 'bg-green-700 text-white border-green-700 shadow-md'
                              : 'border-green-400 text-green-800 hover:bg-green-100'
                          }`}
                        >
                          {w.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Price + Cart */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xl font-bold text-green-800 transition-opacity duration-300 ${
                        animatePrice[product.id] ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      ₹{selectedWeight.price}
                    </span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`relative bg-green-700 text-white p-2 rounded-full transition-all transform hover:scale-110 ${
                        addedToCart[product.id]
                          ? 'bg-green-800 scale-125 shadow-lg'
                          : 'hover:bg-green-800'
                      }`}
                    >
                      <ShoppingCart size={20} />
                      {addedToCart[product.id] && (
                        <span className="absolute -top-2 -right-2 bg-white text-green-800 text-xs font-bold px-1.5 py-0.5 rounded-full">
                          +
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

