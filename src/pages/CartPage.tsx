import AnnouncementBar from '../components/AnnouncementBar';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollUpButton from '../components/ScrollUpButton';
import { LoginModal } from "../components/ui/LoginModal";
import { SearchModal } from "../components/ui/SearchModal";
import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";

function CartPage() {
  const { items, removeItem, clear } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getProductForItem = (itemId: string) => {
    const parts = itemId.split("-");
    const baseId = parts[0];
    return PRODUCTS.find(p => String(p.id) === baseId);
  };

  const total = items.reduce((sum, it) => sum + (Number(it.price ?? 0) * (it.qty ?? 1)), 0);

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/A3_Landscape.jpg')" }}
      />

      <AnnouncementBar />
      <Navigation />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
              <div className="text-gray-500 text-lg">Your cart is empty</div>
              <p className="text-sm text-gray-400 mt-2">Add some products to get started!</p>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <ul className="space-y-4 mb-6">
                {items.map(it => {
                  const prod = getProductForItem(it.id);
                  const lineTotal = (Number(it.price ?? 0) * (it.qty ?? 1));
                  return (
                    <li key={it.id} className="flex items-center gap-4 p-4 bg-white/50 rounded-lg">
                      <img
                        src={prod?.image ?? "/products/placeholder.jpg"}
                        alt={it.name ?? prod?.name ?? it.id}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-green-900">{it.name ?? prod?.name ?? it.id}</div>
                        <div className="text-sm text-gray-600">
                          ₹{Number(it.price ?? 0)} x {it.qty} = ₹{lineTotal}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(it.id)}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors px-3 py-1 border border-red-200 rounded hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg text-gray-700">Total</div>
                  <div className="text-2xl font-bold text-green-800">₹{total}</div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={clear}
                    className="px-6 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button className="ml-auto bg-green-700 hover:bg-green-800 text-white px-8 py-2 rounded-lg font-medium transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
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

export default CartPage;
