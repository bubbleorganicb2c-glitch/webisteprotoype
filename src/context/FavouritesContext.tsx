import React, { createContext, useContext, useState } from "react";

type FavouritesContextType = {
    ids: string[];
    toggleFavourite: (id: string) => void;
    isOpen: boolean;
    openFavourites: () => void;
    closeFavourites: () => void;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ids, setIds] = useState<string[]>([]);
    const [isOpen, setOpen] = useState(false);

    const toggleFavourite = (id: string) => {
        setIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    };
    const openFavourites = () => setOpen(true);
    const closeFavourites = () => setOpen(false);

    return (
        <FavouritesContext.Provider value={{ ids, toggleFavourite, isOpen, openFavourites, closeFavourites }}>
            {children}
        </FavouritesContext.Provider>
    );
};

export const useFavourites = () => {
    const ctx = useContext(FavouritesContext);
    if (!ctx) throw new Error("useFavourites must be used within FavouritesProvider");
    return ctx;
};