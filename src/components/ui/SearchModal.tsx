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
        <div className="fixed inset-0 top-28 z-40 flex items-start justify-center p-6">
            <div className="absolute inset-0 bg-black/30" onClick={closeSearch} />
            <div className="bg-white z-50 w-full max-w-2xl max-h-[80vh] overflow-hidden rounded shadow flex flex-col">
                <div className="p-4 border-b">
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Search products..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {q && filteredProducts.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            No products found for "{query}"
                        </div>
                    ) : q && filteredProducts.length > 0 ? (
                        <div className="space-y-2">
                            {filteredProducts.slice(0, 10).map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                    onClick={handleProductClick}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-green-900">{product.name}</h3>
                                        <p className="text-sm text-green-700">{product.category}</p>
                                        <p className="text-sm text-gray-600">₹{product.weights[0].price}</p>
                                    </div>
                                </Link>
                            ))}
                            {filteredProducts.length > 10 && (
                                <div className="text-center text-gray-500 py-2">
                                    And {filteredProducts.length - 10} more results...
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            Start typing to search for products...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
