import { useState } from 'react';
import { Search, Heart, User, ShoppingCart, ChevronDown, X, Menu } from 'lucide-react';

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

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo + Left Links */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <img src="/b2clogo.jpg" alt="Bubble Organic" className="h-16 w-16 object-contain" />
              <span className="text-2xl font-bold text-green-800">Bubble Organic</span>
            </div>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-all font-medium hover:scale-105">
                Home
              </a>

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
                    className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-2xl p-6 transition-all duration-200 origin-top pointer-events-auto"
                    style={{ transformOrigin: 'top', zIndex: 50 }}
                  >
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {categories.map(cat => (
                        <a
                          key={cat.slug}
                          href={`#${cat.slug}`}
                          className="text-gray-700 hover:text-green-700 hover:font-semibold transition-all hover:scale-105"
                        >
                          {cat.name}
                        </a>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <a
                        href="#products"
                        className="text-green-700 font-semibold hover:text-green-800 flex items-center gap-2 transition-all hover:scale-105"
                      >
                        View All Products →
                      </a>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-3">BO SPECIAL PRODUCTS</p>
                      <a
                        href="#"
                        className="block text-green-700 font-semibold hover:text-green-800 transition-all hover:scale-105"
                      >
                        Organic Bestsellers
                      </a>
                    </div>
                  </div>
                )}
              </div>


              <a href="#about" className="text-gray-700 hover:text-green-600 transition-all font-medium hover:scale-105">
                About Us
              </a>
              <a href="#blog" className="text-gray-700 hover:text-green-600 transition-all font-medium hover:scale-105">
                Blog
              </a>
            </nav>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            {[{icon: Search, action: () => setShowSearch(!showSearch)}, 
              {icon: Heart, action: () => setShowWishlist(!showWishlist)}, 
              {icon: User, action: () => setShowLogin(!showLogin)}, 
              {icon: ShoppingCart, action: () => setShowCart(!showCart), badge: true}].map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative"
              >
                <item.icon size={22} />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                )}
              </button>
            ))}
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
          <a href="#home" className="text-gray-700 hover:text-green-600 font-medium transition-all hover:scale-105">
            Home
          </a>

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
                  <a
                    key={cat.slug}
                    href={`#${cat.slug}`}
                    className="text-gray-700 hover:text-green-700 hover:font-semibold transition-all hover:scale-105"
                  >
                    {cat.name}
                  </a>
                ))}
                <a
                  href="#products"
                  className="text-green-700 font-semibold hover:text-green-800 flex items-center gap-2 mt-2 transition-all hover:scale-105"
                >
                  View All Products →
                </a>
              </div>
            )}
          </div>

          <a href="#about" className="text-gray-700 hover:text-green-600 font-medium transition-all hover:scale-105">
            About Us
          </a>
          <a href="#blog" className="text-gray-700 hover:text-green-600 font-medium transition-all hover:scale-105">
            Blog
          </a>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 mt-4">
            {[{icon: Search, action: () => setShowSearch(!showSearch)}, 
              {icon: Heart, action: () => setShowWishlist(!showWishlist)}, 
              {icon: User, action: () => setShowLogin(!showLogin)}, 
              {icon: ShoppingCart, action: () => setShowCart(!showCart), badge: true}].map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="transform transition-all duration-300 hover:scale-110 hover:text-green-600 relative"
              >
                <item.icon size={22} />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Optional modals */}
      {showSearch && (
        <div className="absolute top-20 left-0 w-full bg-gray-100 p-4 border-t border-gray-200 z-40 animate-slide-down">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}
      {showCart && (
        <div className="absolute top-20 right-0 w-64 bg-white border border-gray-200 shadow-lg p-4 z-40 animate-slide-down">
          <p className="text-gray-700">Your cart is empty.</p>
        </div>
      )}
      {showLogin && (
        <div className="absolute top-20 right-0 w-64 bg-white border border-gray-200 shadow-lg p-4 z-40 animate-slide-down">
          <p className="text-gray-700">Login form goes here.</p>
        </div>
      )}
      {showWishlist && (
        <div className="absolute top-20 right-0 w-64 bg-white border border-gray-200 shadow-lg p-4 z-40 animate-slide-down">
          <p className="text-gray-700">Your wishlist is empty.</p>
        </div>
      )}
    </header>
  );
}
