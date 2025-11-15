import AnnouncementBar from '../components/AnnouncementBar';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollUpButton from '../components/ScrollUpButton';
import { LoginModal } from "../components/ui/LoginModal";
import { SearchModal } from "../components/ui/SearchModal";
import React, { useEffect, useState } from "react";
import { PRODUCTS } from "../data/products";
import { Heart, ShoppingCart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import { useCart } from "../context/CartContext";

function MilletsPage() {
  const { ids, toggleFavourite } = useFavourites();
  const { addItem } = useCart();
  const [selectedWeights, setSelectedWeights] = useState<{ [key: number]: number }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milletsProducts = PRODUCTS.filter(p => p.category === 'Millets');

  const handleWeightChange = (productId: number, index: number) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: index }));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Minimum quantity is 1
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const handleAddToCart = (product: any) => {
    const selectedIndex = selectedWeights[product.id] ?? 0;
    const weightOption = product.weights[selectedIndex];
    const quantity = quantities[product.id] ?? 1;

    addItem({
      id: `${product.id}-${weightOption.label}`,
      name: `${product.name} (${weightOption.label})`,
      price: Number(weightOption.price ?? 0),
      qty: quantity,
    });
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/A3_Landscape.jpg')" }}
      />

      <AnnouncementBar />
      <Navigation />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-8">Millets</h1>

          {milletsProducts.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
              <p className="text-gray-500 text-xl">No millets available at the moment</p>
              <p className="text-sm text-gray-400 mt-2">Check back soon for our organic millet collection!</p>
              <Link
                to="/#products"
                className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
              >
                View All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {milletsProducts.map(p => {
                const selectedIndex = selectedWeights[p.id] ?? 0;
                const selectedWeight = p.weights[selectedIndex];
                const quantity = quantities[p.id] ?? 1;

                return (
                  <div
                    key={p.id}
                    className="block bg-white/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all transform hover:scale-[1.03] hover:bg-white/60"
                  >
                    <Link
                      to={`/product/${p.id}`}
                      className="block aspect-square overflow-hidden"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </Link>

                    <div className="p-4 sm:p-5">
                      <p className="text-sm text-green-700 mb-1">{p.category}</p>
                      <h3 className="text-lg font-semibold text-green-900 mb-3 leading-snug">
                        {p.name}
                      </h3>

                      {/* Weight Selector */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.weights.map((w, index) => {
                          const isActive = selectedIndex === index;
                          return (
                            <button
                              key={w.label}
                              onClick={() => handleWeightChange(p.id, index)}
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
                              onClick={() => handleQuantityChange(p.id, quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              disabled={quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-sm">{quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(p.id, quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price + Cart + Favourite */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-green-800">
                          ₹{selectedWeight.price * quantity}
                        </span>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleFavourite(String(p.id))}
                            className={`text-xl p-2 rounded-full transition-colors ${
                              ids.includes(String(p.id)) ? "text-red-500" : "text-gray-400 hover:text-red-400"
                            }`}
                            aria-label={ids.includes(String(p.id)) ? "Remove from favourites" : "Add to favourites"}
                            title={ids.includes(String(p.id)) ? "Remove from favourites" : "Add to favourites"}
                          >
                            {ids.includes(String(p.id)) ? "♥" : "♡"}
                          </button>

                          <button
                            onClick={() => handleAddToCart(p)}
                            className="bg-green-700 text-white p-2 rounded-full transition-all transform hover:scale-110 hover:bg-green-800"
                            aria-label={`Add ${p.name} to cart`}
                          >
                            <ShoppingCart size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => toggleFavourite(String(p.id))}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                              ids.includes(String(p.id))
                                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                            aria-label="Toggle favourite"
                          >
                            <Heart className={`w-4 h-4 ${ids.includes(String(p.id)) ? 'fill-current' : ''}`} />
                            {ids.includes(String(p.id)) ? 'Remove' : 'Favourite'}
                          </button>
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="flex items-center gap-2 bg-green-700 text-white px-3 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors text-sm"
                            aria-label="Add to cart"
                          >
                            <Plus className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </div>
                        <Link
                          to={`/product/${p.id}`}
                          className="flex items-center justify-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                          aria-label="View product"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ScrollUpButton />
      <LoginModal />
      <SearchModal />
    </div>
  );
}

export default MilletsPage;
