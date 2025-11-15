import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, User, ShoppingCart, ChevronDown, X, Menu } from 'lucide-react';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useFavourites } from "../context/FavouritesContext";
import { useSearch } from "../context/SearchContext";

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
  // UI state for dropdowns/menus only; modals/drawers are handled via context providers

  const { openCart, items } = useCart();
  const { openLogin, user } = useAuth();
  const { openFavourites, ids: favIds } = useFavourites();
  const { openSearch } = useSearch();

  const cartCount = items?.length ?? 0;
  const favouritesCount = favIds?.length ?? 0;

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


              <Link to="/#about" className="text-gray-700 hover:text-green-600 transition-all font-medium hover:scale-105">
                About Us
              </Link>
              <Link to="/#blog" className="text-gray-700 hover:text-green-600 transition-all font-medium hover:scale-105">
                Blog
              </Link>
            </nav>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => openSearch()} className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative" aria-label="Search products">
              <Search size={22} />
            </button>

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

          <Link to="/#about" className="text-gray-700 hover:text-green-600 font-medium transition-all hover:scale-105">
            About Us
          </Link>
          <Link to="/#blog" className="text-gray-700 hover:text-green-600 font-medium transition-all hover:scale-105">
            Blog
          </Link>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 mt-4">
            <button onClick={() => openSearch()} className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative" aria-label="Search products">
              <Search size={22} />
            </button>

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
