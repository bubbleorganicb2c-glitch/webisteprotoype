import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { SearchProvider } from "./context/SearchContext";
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import FavouritesPage from './pages/FavouritesPage';

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
              </Routes>
            </CartProvider>
          </FavouritesProvider>
        </AuthProvider>
      </SearchProvider>
    </Router>
  );
}

export default App;
