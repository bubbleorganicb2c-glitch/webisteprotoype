import React from "react";
import { useSearch } from "../../context/SearchContext";
import { PRODUCTS } from "../../data/products";
import { Link } from "react-router-dom";

export const SearchModal: React.FC = () => {
    const { isOpen, closeSearch, query, setQuery } = useSearch();

    if (!isOpen) return null;

    // Filter products based on search query
    const q = (query ?? "").trim().toLowerCase();
    const filteredProducts = PRODUCTS.filter((p) => {
        if (!q) return false; // Don't show all products when no query
        if (p.name.toLowerCase().includes(q)) return true;
        if (p.category.toLowerCase().includes(q)) return true;
        if (p.weights.some(w => w.label.toLowerCase().includes(q))) return true;
        return false;
    });

    const handleProductClick = () => {
        closeSearch(); // Close modal when navigating to product
    };

    return (
        <div className="fixed inset-0 top-20 z-50 flex items-start justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeSearch} />
            <div className="bg-white/95 backdrop-blur-md z-50 w-full max-w-2xl max-h-[75vh] overflow-hidden rounded-2xl border border-white/40 shadow-2xl flex flex-col">
                <div className="p-6 border-b border-gray-200 bg-green-800 text-white rounded-t-2xl">
                    <h2 className="text-xl font-bold mb-4">Search Products</h2>
                    <input
                        className="w-full border border-white/30 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 bg-white/20 text-white placeholder-white/70"
                        placeholder="Search for products, categories, or weights..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    {q && filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-4xl mb-4">🔍</div>
                            <p className="text-gray-500 text-lg">No products found for "{query}"</p>
                            <p className="text-sm text-gray-400 mt-2">Try searching with different keywords</p>
                        </div>
                    ) : q && filteredProducts.length > 0 ? (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-600 mb-4">
                                Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} for "{query}"
                            </p>
                            {filteredProducts.slice(0, 10).map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                    onClick={handleProductClick}
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition-all border border-gray-100 hover:border-green-200 hover:shadow-md"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-green-900 text-lg">{product.name}</h3>
                                        <p className="text-sm text-green-700 mb-1">{product.category}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-green-800">₹{product.weights[0].price}</span>
                                            <span className="text-sm text-gray-500">({product.weights[0].label})</span>
                                        </div>
                                    </div>
                                    <div className="text-green-600">
                                        →
                                    </div>
                                </Link>
                            ))}
                            {filteredProducts.length > 10 && (
                                <div className="text-center py-4">
                                    <p className="text-gray-500">
                                        And {filteredProducts.length - 10} more results...
                                    </p>
                                    <Link
                                        to="/all-products"
                                        onClick={handleProductClick}
                                        className="inline-block mt-2 text-green-700 hover:text-green-800 font-medium"
                                    >
                                        View all products →
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-300 text-6xl mb-4">🔍</div>
                            <p className="text-gray-500 text-lg">Start typing to search for products</p>
                            <p className="text-sm text-gray-400 mt-2">Search by name, category, or weight</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
