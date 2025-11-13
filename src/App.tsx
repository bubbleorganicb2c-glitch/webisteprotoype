import { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navigation from './components/Navigation';
import Slideshow from './components/Slideshow';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import BlogCarousel from './components/BlogCarousel';
import Partnership from './components/Partnership';
import Footer from './components/Footer';
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { SearchProvider } from "./context/SearchContext";

import { CartDrawer } from "./components/ui/CartDrawer";
import { LoginModal } from "./components/ui/LoginModal";
import { FavouritesDrawer } from "./components/ui/FavouritesDrawer";
import { SearchModal } from "./components/ui/SearchModal";

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  return (
    <SearchProvider>
      <AuthProvider>
        <FavouritesProvider>
          <CartProvider>
            <div className="min-h-screen relative">
              <div
                className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/A3_Landscape.jpg')" }}
              />

              <AnnouncementBar />
              <Navigation />
              <Slideshow />
              <CategoryFilter onSelectCategory={setSelectedCategory} />
              <ProductGrid selectedCategory={selectedCategory} />
              <BlogCarousel />
              <Partnership />
              <Footer />
              <CartDrawer />
              <LoginModal />
              <FavouritesDrawer />
              <SearchModal />
            </div>
          </CartProvider>
        </FavouritesProvider>
        </AuthProvider>
        </SearchProvider>
    );
}

export default App;
