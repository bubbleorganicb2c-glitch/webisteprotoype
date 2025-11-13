import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import { useSearch } from "../context/SearchContext";
import { ShoppingCart } from "lucide-react";
import { PRODUCTS, ProductModel } from "../data/products";

interface WeightOption {
  label: string;
  price: number;
}

interface ProductGridProps {
  products?: ProductModel[];
  selectedCategory?: string; // added prop
}

// use shared PRODUCTS as the default list
export default function ProductGrid({
  products = PRODUCTS,
  selectedCategory = "All Products",
}: ProductGridProps) {
  const { addItem } = useCart();
  const { ids: favouriteIds, toggleFavourite } = useFavourites();
  const { query } = useSearch();
  const [selectedWeights, setSelectedWeights] = useState<{ [key: number]: number }>({});
  const [animatePrice, setAnimatePrice] = useState<{ [key: number]: boolean }>({});
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // filter by selectedCategory only (search is now handled in SearchModal)
  const filteredProducts = (products ?? PRODUCTS).filter((p) => {
    if (selectedCategory && selectedCategory !== "All Products" && p.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleWeightChange = (productId: number, index: number) => {
    setAnimatePrice((prev) => ({ ...prev, [productId]: true }));
    setSelectedWeights((prev) => ({ ...prev, [productId]: index }));

    setTimeout(() => {
      setAnimatePrice((prev) => ({ ...prev, [productId]: false }));
    }, 300);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Minimum quantity is 1
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const handleAddToCart = (product: ProductModel) => {
    const selectedIndex = selectedWeights[product.id] ?? 0;
    const weightOption = product.weights[selectedIndex];
    const quantity = quantities[product.id] ?? 1;

    // Use a composite id so different weight options are distinct in cart
    const cartId = `${product.id}-${weightOption.label}`;

    addItem({
      id: cartId,
      name: `${product.name} (${weightOption.label})`,
      price: Number(weightOption.price ?? 0),
      qty: quantity,
    });

    // UI feedback
    setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 800);
  };

  return (
    <div className="py-8 pb-16 bg-[#e7efd8]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const selectedIndex = selectedWeights[product.id] ?? 0;
            const selectedWeight = product.weights[selectedIndex];
            const isFav = favouriteIds.includes(String(product.id));

            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block bg-white/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all transform hover:scale-[1.03] hover:bg-white/60"
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
                              ? "bg-green-700 text-white border-green-700 shadow-md"
                              : "border-green-400 text-green-800 hover:bg-green-100"
                          }`}
                        >
                          {w.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Qty:</span>
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => handleQuantityChange(product.id, (quantities[product.id] ?? 1) - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={(quantities[product.id] ?? 1) <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-sm">{quantities[product.id] ?? 1}</span>
                        <button
                          onClick={() => handleQuantityChange(product.id, (quantities[product.id] ?? 1) + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price + Cart + Favourite */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xl font-bold text-green-800 transition-opacity duration-300 ${
                        animatePrice[product.id] ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      ₹{selectedWeight.price * (quantities[product.id] ?? 1)}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleFavourite(String(product.id))}
                        className={`text-xl p-2 rounded-full transition-colors ${
                          isFav ? "text-red-500" : "text-gray-400 hover:text-red-400"
                        }`}
                        aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                        title={isFav ? "Remove from favourites" : "Add to favourites"}
                      >
                        {isFav ? "♥" : "♡"}
                      </button>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`relative bg-green-700 text-white p-2 rounded-full transition-all transform hover:scale-110 ${
                          addedToCart[product.id] ? "bg-green-800 scale-125 shadow-lg" : "hover:bg-green-800"
                        }`}
                        aria-label={`Add ${product.name} to cart`}
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

