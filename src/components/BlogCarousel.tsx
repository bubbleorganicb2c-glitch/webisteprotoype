import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export default function BlogCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 🧩 Responsive cards (2 for mobile, 3 for larger screens)
  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(window.innerWidth < 768 ? 2 : 3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ➡️ Slide navigation
  const nextSlide = () => setStartIndex((prev) => (prev + 1) % blogPosts.length);
  const prevSlide = () => setStartIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);

  // 🕒 Autoplay with pause on hover
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  // 📦 Visible posts
  const visiblePosts = [];
  for (let i = 0; i < visibleCards; i++) {
    visiblePosts.push(blogPosts[(startIndex + i) % blogPosts.length]);
  }

  return (
    <div
      className="py-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-white/40 transition-all">
          <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">
            From Our Blog
          </h2>

          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-700 ease-in-out">
              {visiblePosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/50 hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-green-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {post.description}
                    </p>
                    <button className="mt-4 text-green-700 font-medium hover:text-green-900 transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/90 hover:bg-white p-2 rounded-full transition-all shadow-lg"
              aria-label="Previous blog post"
            >
              <ChevronLeft size={24} className="text-green-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/90 hover:bg-white p-2 rounded-full transition-all shadow-lg"
              aria-label="Next blog post"
            >
              <ChevronRight size={24} className="text-green-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
