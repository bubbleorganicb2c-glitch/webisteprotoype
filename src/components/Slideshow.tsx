import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { image: '/slide1.jpg' },
  { image: '/slide2.jpg' },
  { image: '/slide3.jpg' },
];

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // ✅ Add types for event and info
  const handleSwipe = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      prevSlide();
    } else if (info.offset.x < -100) {
      nextSlide();
    }
  };

  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden select-none">
      <AnimatePresence>
        <motion.img
          key={slides[currentSlide].image}
          src={slides[currentSlide].image}
          alt={`Slide ${currentSlide + 1}`}
          initial={{ opacity: 0, scale: 1.05, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 1.05, x: -50 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleSwipe}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-grab active:cursor-grabbing"
        />
      </AnimatePresence>

      {/* Navigation and dots remain unchanged */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full transition-all shadow-md"
      >
        <ChevronLeft size={24} className="text-green-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full transition-all shadow-md"
      >
        <ChevronRight size={24} className="text-green-800" />
      </button>

      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-green-700 w-6 sm:w-8' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
