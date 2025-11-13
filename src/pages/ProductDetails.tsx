import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { PRODUCTS, ProductModel } from '../data/products';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollUpButton from '../components/ScrollUpButton';
import { CartDrawer } from "../components/ui/CartDrawer";
import { LoginModal } from "../components/ui/LoginModal";
import { FavouritesDrawer } from "../components/ui/FavouritesDrawer";
import { SearchModal } from "../components/ui/SearchModal";
import { Link } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === parseInt(id || '0'));

  const { addItem } = useCart();
  const { ids: favouriteIds, toggleFavourite } = useFavourites();
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [animatePrice, setAnimatePrice] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen relative">
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/A3_Landscape.jpg')" }}
        />
        <Navigation />
        <div className="pt-32 pb-16 bg-[#e7efd8]/60 backdrop-blur-md min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-green-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
        <ScrollUpButton />
        <CartDrawer />
        <LoginModal />
        <FavouritesDrawer />
        <SearchModal />
      </div>
    );
  }

  const selectedWeight = product.weights[selectedWeightIndex];
  const isFav = favouriteIds.includes(String(product.id));

  const handleWeightChange = (index: number) => {
    setAnimatePrice(true);
    setSelectedWeightIndex(index);
    setTimeout(() => setAnimatePrice(false), 300);
  };

  const handleAddToCart = () => {
    const cartId = `${product.id}-${selectedWeight.label}`;
    addItem({
      id: cartId,
      name: `${product.name} (${selectedWeight.label})`,
      price: Number(selectedWeight.price),
      qty: quantity,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 800);
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/A3_Landscape.jpg')" }}
      />

      <Navigation />

      <div className="pt-32 pb-16 bg-[#e7efd8]/60 backdrop-blur-md min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="bg-white/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/50">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-green-700 mb-2">{product.category}</p>
                <h1 className="text-4xl font-bold text-green-900 mb-4">{product.name}</h1>
                <p className="text-gray-600 text-lg">
                  Premium organic {product.name.toLowerCase()} sourced directly from trusted farmers.
                  Packed with natural nutrients and free from harmful chemicals.
                </p>
              </div>

              {/* Weight Selector */}
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">Select Weight</h3>
                <div className="flex flex-wrap gap-3">
                  {product.weights.map((weight, index) => (
                    <button
                      key={weight.label}
                      onClick={() => handleWeightChange(index)}
                      className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                        selectedWeightIndex === index
                          ? "bg-green-700 text-white border-green-700 shadow-md"
                          : "border-green-400 text-green-800 hover:bg-green-100"
                      }`}
                    >
                      {weight.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-lg font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-green-200">
                <div className="flex items-center gap-4">
                  <span
                    className={`text-3xl font-bold text-green-800 transition-opacity duration-300 ${
                      animatePrice ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    ₹{selectedWeight.price}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleFavourite(String(product.id))}
                    className={`text-2xl p-3 rounded-full transition-colors ${
                      isFav ? "text-red-500" : "text-gray-400 hover:text-red-400"
                    }`}
                    aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                  >
                    {isFav ? "♥" : "♡"}
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className={`flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 ${
                      addedToCart ? "bg-green-800 scale-110 shadow-lg" : "hover:bg-green-800"
                    }`}
                  >
                    <ShoppingCart size={20} />
                    {addedToCart ? "Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>

              {/* Product Description */}
              {product.description && (
                <div className="bg-white/40 backdrop-blur-lg rounded-xl p-6 border border-white/50">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* How to Use */}
              {product.howToUse && (
                <div className="bg-white/40 backdrop-blur-lg rounded-xl p-6 border border-white/50">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">How to Use</h3>
                  <p className="text-gray-700 leading-relaxed">{product.howToUse}</p>
                </div>
              )}

              {/* YouTube Video */}
              {product.videoUrl && (
                <div className="bg-white/40 backdrop-blur-lg rounded-xl p-6 border border-white/50">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Product Video</h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={product.videoUrl}
                      title={`${product.name} video`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="bg-white/40 backdrop-blur-lg rounded-xl p-6 border border-white/50">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Product Information</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Origin:</strong> Organic farms in India</p>
                  <p><strong>Quality:</strong> 100% Organic, Chemical-free</p>
                  <p><strong>Storage:</strong> Store in a cool, dry place</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="bg-white/40 backdrop-blur-lg rounded-xl p-6 border border-white/50">
            <h3 className="text-xl font-semibold text-green-900 mb-6">Related Products</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden border border-white/50 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-green-700 mb-1">{relatedProduct.category}</p>
                    <h4 className="text-sm font-semibold text-green-900 mb-2 leading-tight">
                      {relatedProduct.name}
                    </h4>
                    <p className="text-lg font-bold text-green-800">
                      ₹{relatedProduct.weights[0].price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollUpButton />
      <CartDrawer />
      <LoginModal />
      <FavouritesDrawer />
      <SearchModal />
    </div>
  );
}

export default ProductDetails;
