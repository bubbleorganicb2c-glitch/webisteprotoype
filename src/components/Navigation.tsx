import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, User, ShoppingCart, ChevronDown, X, Menu } from 'lucide-react';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useFavourites } from "../context/FavouritesContext";
import { useSearch } from "../context/SearchContext";
import { PRODUCTS } from "../data/products";

const categories = [
  { name: 'Spices', slug: 'spices' },
  { name: 'Cereals', slug: 'cereals' },
  { name: 'Masalas', slug: 'masalas' },
  { name: 'Nuts', slug: 'nuts' },
  { name: 'Rice', slug: 'rice' },
  { name: 'Seeds', slug: 'seeds' },
  { name: 'Millets', slug: 'millets' },
  { name: 'Flours', slug: 'flours' },
  { name: 'Pulses', slug: 'pulses' },
  { name: 'Bubble Organic Special Products', slug: 'bubble-organic-special-products' },
];

export default function Navigation(props: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // UI state for dropdowns/menus only; modals/drawers are handled via context providers

  const { openCart, items } = useCart();
  const { openLogin, user } = useAuth();
  const { openFavourites, ids: favIds } = useFavourites();
  const { openSearch } = useSearch();

  const cartCount = items?.length ?? 0;
  const favouritesCount = favIds?.length ?? 0;

  // Filter products based on search query
  const filteredProducts = PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    if (p.name.toLowerCase().includes(q)) return true;
    if (p.category.toLowerCase().includes(q)) return true;
    if (p.weights.some(w => w.label.toLowerCase().includes(q))) return true;
    return false;
  });

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo + Left Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <img src="/b2clogo.jpg" alt="Bubble Organic" className="h-16 w-16 object-contain" />
              <span className="text-2xl font-bold text-green-800">Bubble Organic</span>
            </Link>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-green-600 transition-all font-medium hover:scale-105">
                Home
              </Link>

            {/* Explore Products Dropdown */}
            <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-gray-700 font-medium hover:text-green-700 transition-all hover:scale-105">
                  Explore Products
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 w-80 bg-white rounded-lg shadow-2xl p-6 transition-all duration-200 origin-top pointer-events-auto"
                    style={{ transformOrigin: 'top', zIndex: 50 }}
                  >
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {categories.map(cat => (
                        <Link
                          key={cat.slug}
                          to={`/${cat.slug}`}
                          className="text-gray-700 hover:text-green-700 hover:font-semibold transition-all hover:scale-105"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <Link
                        to="/all-products"
                        className="text-green-700 font-semibold hover:text-green-800 flex items-center gap-2 transition-all hover:scale-105"
                      >
                        View All Products →
                      </Link>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-3">BO SPECIAL PRODUCTS</p>
                      <Link
                        to="/#special"
                        className="block text-green-700 font-semibold hover:text-green-800 transition-all hover:scale-105"
                      >
                        Organic Bestsellers
                      </Link>
                    </div>
                  </div>
                )}
              </div>


              <Link to="/about-us" className="text-gray-700 hover:text-green-600 transition-all font-medium hover:scale-105">
                About Us
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-green-600 transition-all font-medium hover:scale-105">
                Blog
              </Link>
            </nav>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            {/* Animated Search Box */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative"
                aria-label="Search products"
              >
                <Search size={22} />
              </button>

              {/* Animated Search Input */}
              <div className={`absolute right-0 top-full mt-2 transition-all duration-300 ease-in-out ${
                isSearchOpen
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
              }`}>
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 max-h-96 overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search for products, categories, or weights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-3"
                    autoFocus={isSearchOpen}
                  />

                  {/* Search Suggestions */}
                  <div className="max-h-64 overflow-y-auto">
                    {searchQuery.trim() && filteredProducts.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-gray-400 text-3xl mb-2">🔍</div>
                        <p className="text-gray-500 text-sm">No products found for "{searchQuery}"</p>
                        <p className="text-xs text-gray-400 mt-1">Try searching with different keywords</p>
                      </div>
                    ) : searchQuery.trim() && filteredProducts.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-xs text-gray-600 mb-3">
                          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
                        </p>
                        {filteredProducts.slice(0, 8).map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-all border border-gray-100 hover:border-green-200 hover:shadow-sm"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-green-900 text-sm truncate">{product.name}</h3>
                              <p className="text-xs text-green-700">{product.category}</p>
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-green-800">₹{product.weights[0]?.price || 'N/A'}</span>
                                <span className="text-xs text-gray-500">({product.weights[0]?.label || 'N/A'})</span>
                              </div>
                            </div>
                            <div className="text-green-600 text-sm">
                              →
                            </div>
                          </Link>
                        ))}
                        {filteredProducts.length > 8 && (
                          <div className="text-center py-2">
                            <p className="text-gray-500 text-xs">
                              And {filteredProducts.length - 8} more results...
                            </p>
                            <Link
                              to="/all-products"
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="inline-block mt-1 text-green-700 hover:text-green-800 font-medium text-sm"
                            >
                              View all products →
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12 px-4">
                        <div className="mb-6">
                          <div className="text-4xl mb-3">🌱</div>
                          <h3 className="text-lg font-bold text-green-800 mb-2">Welcome to Bubble Organic</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Discover nature's finest organic products - from premium spices to wholesome grains,
                            all sourced sustainably for your healthy lifestyle.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="font-semibold text-green-800">100% Organic</div>
                            <div className="text-gray-600">Certified quality</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="font-semibold text-green-800">Farm Fresh</div>
                            <div className="text-gray-600">Direct from farmers</div>
                          </div>
                        </div>
                        <div className="mt-4 text-xs text-gray-500">
                          Start typing to search our premium collection...
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Link to="/favourites" className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative" aria-label="View favourites">
              <Heart size={22} />
              {favouritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favouritesCount}
                </span>
              )}
            </Link>

            <button onClick={() => openLogin()} className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative" aria-label="User account">
              <User size={22} />
            </button>

            <Link to="/cart" className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative" aria-label="Shopping cart">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-600 hover:text-green-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen p-4' : 'max-h-0 p-0'}`}>
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition-all hover:scale-105">
            Home
          </Link>

          {/* Mobile Explore Products */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex justify-between w-full px-3 py-2 text-gray-700 font-medium hover:text-green-700 transition-all hover:scale-105"
            >
              Explore Products
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="mt-2 bg-white rounded-lg shadow-lg p-4 grid grid-cols-1 gap-2 transition-all animate-slide-down">
                {categories.map(cat => (
                  <Link
                    key={cat.slug}
                    to={`/${cat.slug}`}
                    className="text-gray-700 hover:text-green-700 hover:font-semibold transition-all hover:scale-105"
                  >
                    {cat.name}
                  </Link>
                ))}
                <Link
                  to="/all-products"
                  className="text-green-700 font-semibold hover:text-green-800 flex items-center gap-2 mt-2 transition-all hover:scale-105"
                >
                  View All Products →
                </Link>
              </div>
            )}
          </div>

          <Link to="/about-us" className="text-gray-700 hover:text-green-600 font-medium transition-all hover:scale-105">
            About Us
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-green-600 font-medium transition-all hover:scale-105">
            Blog
          </Link>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 mt-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative" aria-label="Search products">
              <Search size={22} />
            </button>

            {/* Mobile Animated Search Box */}
            {isSearchOpen && (
              <div className="fixed inset-0 top-20 z-50 flex items-start justify-center p-4 sm:p-6 md:hidden">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
                <div className="bg-white/95 backdrop-blur-md z-50 w-full max-w-sm max-h-[70vh] overflow-hidden rounded-2xl border border-white/40 shadow-2xl flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      autoFocus
                    />
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    {searchQuery.trim() && filteredProducts.length === 0 ? (
                      <div className="text-center py-6">
                        <div className="text-gray-400 text-2xl mb-2">🔍</div>
                        <p className="text-gray-500 text-sm">No products found</p>
                      </div>
                    ) : searchQuery.trim() && filteredProducts.length > 0 ? (
                      <div className="space-y-2">
                        {filteredProducts.slice(0, 6).map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-all border border-gray-100"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-green-900 text-sm truncate">{product.name}</h3>
                              <p className="text-xs text-green-700">{product.category}</p>
                              <span className="text-xs font-bold text-green-800">₹{product.weights[0]?.price || 'N/A'}</span>
                            </div>
                          </Link>
                        ))}
                        {filteredProducts.length > 6 && (
                          <Link
                            to="/all-products"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="block text-center py-2 text-green-700 hover:text-green-800 font-medium text-sm"
                          >
                            View all products →
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-3xl mb-2">🌱</div>
                        <h3 className="text-base font-bold text-green-800 mb-1">Bubble Organic</h3>
                        <p className="text-xs text-gray-600">Start typing to search...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Link to="/favourites" className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative" aria-label="View favourites">
              <Heart size={22} />
              {favouritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favouritesCount}
                </span>
              )}
            </Link>

            <button onClick={() => openLogin()} className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative" aria-label="User account">
              <User size={22} />
            </button>

            <Link to="/cart" className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative" aria-label="Shopping cart">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Modals/drawers are provided globally via context and rendered in App */}
    </header>
  );
}
