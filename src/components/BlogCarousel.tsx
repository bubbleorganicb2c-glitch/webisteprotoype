import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Benefits of Organic Turmeric',
    description: 'Discover the amazing health benefits of using organic turmeric in your daily diet.',
    image: 'https://images.pexels.com/photos/4198939/pexels-photo-4198939.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    title: 'The Power of Millets',
    description: 'Learn why ancient grains like millets are making a comeback in modern nutrition.',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    title: 'Organic vs Conventional',
    description: 'Understanding the real difference between organic and conventional farming practices.',
    image: 'https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    title: 'Spice Up Your Health',
    description: 'How traditional Indian spices can boost your immune system naturally.',
    image: 'https://images.pexels.com/photos/4198939/pexels-photo-4198939.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function BlogCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 3;

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % blogPosts.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  const visiblePosts = [];
  for (let i = 0; i < visibleCards; i++) {
    visiblePosts.push(blogPosts[(startIndex + i) % blogPosts.length]);
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-white/40">
          <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">
            From Our Blog
          </h2>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/90 hover:bg-white p-2 rounded-full transition-all shadow-lg"
            >
              <ChevronLeft size={24} className="text-green-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/90 hover:bg-white p-2 rounded-full transition-all shadow-lg"
            >
              <ChevronRight size={24} className="text-green-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
