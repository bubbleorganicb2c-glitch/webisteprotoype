import React from "react";
import { useFavourites } from "../../context/FavouritesContext";
import { PRODUCTS } from "../../data/products";

export const FavouritesDrawer: React.FC = () => {
    const { isOpen, closeFavourites, ids, toggleFavourite } = useFavourites();
    if (!isOpen) return null;

    const favProducts = ids
        .map(id => PRODUCTS.find(p => String(p.id) === id))
        .filter(Boolean);

    return (
        <div className="fixed inset-0 z-50 flex">
            <div className="flex-1" onClick={closeFavourites} />
            <div className="w-80 bg-white p-4 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Favourites</h3>
                    <button onClick={closeFavourites}>Close</button>
                </div>
                {favProducts.length === 0 ? (
                    <div>No favourites</div>
                ) : (
                    <ul className="space-y-3">
                        {favProducts.map(p => (
                            <li key={p!.id} className="flex items-center gap-3">
                                <img src={p!.image} alt={p!.name} className="w-12 h-12 object-cover rounded" />
                                <div className="flex-1">
                                    <div className="text-sm font-medium">{p!.name}</div>
                                    <div className="text-xs text-gray-500">₹{p!.weights[0].price}</div>
                                </div>
                                <button onClick={() => toggleFavourite(String(p!.id))} className="text-red-500 text-sm">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};