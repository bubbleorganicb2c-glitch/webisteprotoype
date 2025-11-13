import React, { createContext, useContext, useState, ReactNode } from "react";

type SearchContextType = {
  query: string;
  setQuery: (q: string) => void;
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);

  return (
    <SearchContext.Provider value={{ query, setQuery, isOpen, openSearch, closeSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
};