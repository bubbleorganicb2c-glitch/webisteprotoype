import React from "react";
import { useCart } from "../../context/CartContext";
import { PRODUCTS } from "../../data/products";

export const CartDrawer: React.FC = () => {
    const { isOpen, closeCart, items, removeItem, clear } = useCart();
    if (!isOpen) return null;

    const getProductForItem = (itemId: string) => {
        const parts = itemId.split("-");
        const baseId = parts[0];
        return PRODUCTS.find(p => String(p.id) === baseId);
    };

    const total = items.reduce((sum, it) => sum + (Number(it.price ?? 0) * (it.qty ?? 1)), 0);

    return (
        <div className="fixed top-20 inset-0 z-50">
            <div className="absolute inset-0 bg-black/20" onClick={closeCart} />
            <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-xl border-l border-gray-200">
                <div className="bg-green-800 text-white p-4 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Shopping Cart</h3>
                    <button onClick={closeCart} className="text-white hover:text-gray-200 transition-colors">
                        ✕
                    </button>
                </div>
                <div className="p-4">
                {items.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">Your cart is empty</div>
                ) : (
                    <>
                        <ul className="space-y-3">
                            {items.map(it => {
                                const prod = getProductForItem(it.id);
                                const lineTotal = (Number(it.price ?? 0) * (it.qty ?? 1));
                                return (
                                    <li key={it.id} className="flex items-center gap-3">
                                        <img
                                            src={prod?.image ?? "/products/placeholder.jpg"}
                                            alt={it.name ?? prod?.name ?? it.id}
                                            className="w-14 h-14 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">{it.name ?? prod?.name ?? it.id}</div>
                                            <div className="text-xs text-gray-500">
                                                ₹{Number(it.price ?? 0)} x {it.qty} = ₹{lineTotal}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <button onClick={() => removeItem(it.id)} className="text-sm text-red-500 hover:text-red-700 transition-colors">
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-4 border-t pt-3">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">Total</div>
                                <div className="font-semibold">₹{total}</div>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <button onClick={clear} className="text-sm text-red-600 hover:text-red-700 transition-colors">Clear</button>
                                <button className="ml-auto bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors">Checkout</button>
                            </div>
                        </div>
                    </>
                )}
                </div>
            </div>
        </div>
    );
};