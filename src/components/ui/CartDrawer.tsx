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
        <div className="fixed inset-0 z-50 flex">
            <div className="flex-1" onClick={closeCart} />
            <div className="w-80 bg-white p-4 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Cart</h3>
                    <button onClick={closeCart}>Close</button>
                </div>

                {items.length === 0 ? (
                    <div>No items</div>
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
                                            <button onClick={() => removeItem(it.id)} className="text-sm text-red-500">
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
                                <button onClick={clear} className="text-sm text-red-600">Clear</button>
                                <button className="ml-auto bg-green-700 text-white px-3 py-1 rounded text-sm">Checkout</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};