import AnnouncementBar from '../components/AnnouncementBar';
import Navigation from '../components/Navigation';
import Slideshow from '../components/Slideshow';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import BlogCarousel from '../components/BlogCarousel';
import Partnership from '../components/Partnership';
import Footer from '../components/Footer';
import Certifications from '../components/Certifications';
import ScrollUpButton from '../components/ScrollUpButton';

import { CartDrawer } from "../components/ui/CartDrawer";
import { LoginModal } from "../components/ui/LoginModal";
import { FavouritesDrawer } from "../components/ui/FavouritesDrawer";
import { SearchModal } from "../components/ui/SearchModal";

import { useState } from 'react';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  return (
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
      <Certifications />
      <Partnership />
      <Footer />
      <ScrollUpButton />
      <CartDrawer />
      <LoginModal />
      <FavouritesDrawer />
      <SearchModal />
    </div>
  );
}

export default Home;
