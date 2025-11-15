import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { SearchProvider } from "./context/SearchContext";
import Chatbot from './components/ui/Chatbot';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import FavouritesPage from './pages/FavouritesPage';
import AllProductsPage from './pages/AllProductsPage';
import SpicesPage from './pages/SpicesPage';
import CerealsPage from './pages/CerealsPage';
import MasalasPage from './pages/MasalasPage';
import NutsPage from './pages/NutsPage';
import RicePage from './pages/RicePage';
import SeedsPage from './pages/SeedsPage';
import MilletsPage from './pages/MilletsPage';
import FloursPage from './pages/FloursPage';
import PulsesPage from './pages/PulsesPage';
import SpecialProductsPage from './pages/SpecialProductsPage';

function App() {
  return (
    <Router>
      <SearchProvider>
        <AuthProvider>
          <FavouritesProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="/all-products" element={<AllProductsPage />} />
                <Route path="/spices" element={<SpicesPage />} />
                <Route path="/cereals" element={<CerealsPage />} />
                <Route path="/masalas" element={<MasalasPage />} />
                <Route path="/nuts" element={<NutsPage />} />
                <Route path="/rice" element={<RicePage />} />
                <Route path="/seeds" element={<SeedsPage />} />
                <Route path="/millets" element={<MilletsPage />} />
                <Route path="/flours" element={<FloursPage />} />
                <Route path="/pulses" element={<PulsesPage />} />
                <Route path="/bubble-organic-special-products" element={<SpecialProductsPage />} />
              </Routes>
              <Chatbot />
            </CartProvider>
          </FavouritesProvider>
        </AuthProvider>
      </SearchProvider>
    </Router>
  );
}

export default App;
