import AnnouncementBar from '../components/AnnouncementBar';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollUpButton from '../components/ScrollUpButton';
import { LoginModal } from "../components/ui/LoginModal";
import { SearchModal } from "../components/ui/SearchModal";
import React, { useEffect } from "react";
import { useFavourites } from "../context/FavouritesContext";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import { Heart, Trash2, ShoppingCart, Plus } from "lucide-react";
import { Link } from "react-router-dom";

function FavouritesPage() {
  const { ids, toggleFavourite } = useFavourites();
  const { addItem } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const favProducts = ids
    .map(id => PRODUCTS.find(p => String(p.id) === id))
    .filter(Boolean);

  const handleAddToCart = (product: any) => {
    // Add the first weight option as default
    const defaultWeight = product.weights[0];
    addItem({
      id: `${product.id}-${defaultWeight.weight}`,
      name: `${product.name} (${defaultWeight.weight})`,
      price: defaultWeight.price,
      qty: 1
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
          <h1 className="text-3xl font-bold text-green-800 mb-8">My Favourites</h1>

          {favProducts.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
              <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <p className="text-gray-500 text-xl">No favourites yet</p>
              <p className="text-sm text-gray-400 mt-2">Heart products you love to save them here!</p>
              <Link
                to="/#products"
                className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favProducts.map(p => (
                <div key={p!.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex flex-col">
                    <Link to={`/product/${p!.id}`}>
                      <img
                        src={p!.image}
                        alt={p!.name}
                        className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${p!.id}`}>
                        <h3 className="text-lg font-semibold text-green-900 hover:text-green-700 transition-colors mb-2">
                          {p!.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">{p!.category}</p>
                      <p className="text-lg font-bold text-green-800 mb-4">
                        From ₹{Math.min(...p!.weights.map(w => w.price))}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => toggleFavourite(String(p!.id))}
                          className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-all text-sm"
                          aria-label="Remove from favourites"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                        <button
                          onClick={() => handleAddToCart(p!)}
                          className="flex items-center gap-2 bg-green-700 text-white px-3 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors text-sm"
                          aria-label="Add to cart"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                      <Link
                        to={`/product/${p!.id}`}
                        className="flex items-center justify-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                        aria-label="View product"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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

export default FavouritesPage;
