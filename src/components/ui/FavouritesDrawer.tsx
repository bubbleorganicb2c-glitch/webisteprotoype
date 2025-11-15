import React from "react";
import { useFavourites } from "../../context/FavouritesContext";
import { PRODUCTS } from "../../data/products";
import { X, Heart, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export const FavouritesDrawer: React.FC = () => {
    const { isOpen, closeFavourites, ids, toggleFavourite } = useFavourites();
    if (!isOpen) return null;

    const favProducts = ids
        .map(id => PRODUCTS.find(p => String(p.id) === id))
        .filter(Boolean);

    return (
        <div className="fixed top-20 inset-0 z-50">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeFavourites} />
            <div className="absolute top-0 right-0 w-80 sm:w-96 h-full bg-white/95 backdrop-blur-md border-l border-white/40 shadow-2xl">
                <div className="bg-green-800 text-white p-4 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Favourites</h3>
                    <button onClick={closeFavourites} className="text-white hover:text-gray-200 transition-colors">
                        ✕
                    </button>
                </div>
                <div className="p-4">
                <div className="flex-1 overflow-y-auto">
                    {favProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No favourites yet</p>
                            <p className="text-sm text-gray-400 mt-2">Heart products you love!</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {favProducts.map(p => (
                                <li key={p!.id} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:shadow-lg transition-all">
                                    <div className="flex items-center gap-4">
                                        <Link to={`/product/${p!.id}`} onClick={closeFavourites}>
                                            <img
                                                src={p!.image}
                                                alt={p!.name}
                                                className="w-16 h-16 object-cover rounded-lg hover:scale-105 transition-transform"
                                            />
                                        </Link>
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/product/${p!.id}`} onClick={closeFavourites}>
                                                <h4 className="text-sm font-semibold text-green-900 hover:text-green-700 transition-colors truncate">
                                                    {p!.name}
                                                </h4>
                                            </Link>
                                            <p className="text-xs text-gray-600 mt-1">{p!.category}</p>
                                            <p className="text-sm font-bold text-green-800 mt-1">
                                                From ₹{Math.min(...p!.weights.map(w => w.price))}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => toggleFavourite(String(p!.id))}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all transform hover:scale-110"
                                                aria-label="Remove from favourites"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <Link
                                                to={`/product/${p!.id}`}
                                                onClick={closeFavourites}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-all transform hover:scale-110"
                                                aria-label="View product"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {favProducts.length > 0 && (
                    <div className="border-t border-white/40 p-6 bg-white/30 backdrop-blur-sm">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-4">
                                {favProducts.length} favourite{favProducts.length !== 1 ? 's' : ''} saved
                            </p>
                            <Link
                                to="/#products"
                                onClick={closeFavourites}
                                className="w-full bg-green-700 text-white px-4 py-3 rounded-xl font-medium hover:bg-green-800 transition-all transform hover:scale-105 shadow-lg inline-block text-center"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};
