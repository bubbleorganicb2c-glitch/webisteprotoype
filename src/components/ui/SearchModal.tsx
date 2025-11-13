import React from "react";
import { useSearch } from "../../context/SearchContext";

export const SearchModal: React.FC = () => {
    const { isOpen, closeSearch, query, setQuery } = useSearch();
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 top-28 z-40 flex items-start justify-center p-6">
            <div className="absolute inset-0 bg-black/30" onClick={closeSearch} />
            <div className="bg-white z-50 w-full max-w-xl p-4 rounded shadow">
                <input
                    className="w-full border p-2"
                    placeholder="Search products..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <div className="mt-2 text-sm text-gray-600">Results will be wired to product grid (use useSearch().query)</div>
            </div>
        </div>
    );
};