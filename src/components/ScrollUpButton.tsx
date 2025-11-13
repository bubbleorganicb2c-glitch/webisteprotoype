import { useEffect, useState } from 'react';

export default function ScrollUpButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={
        `fixed z-50 right-4 sm:right-6 bottom-4 sm:bottom-6 bg-green-700 text-white 
         p-2.5 sm:p-3 rounded-full shadow-lg ring-0 focus:outline-none focus:ring-2 
         focus:ring-green-300 transition-transform duration-200 ease-out transform 
         ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`.replace(/\s+/g, ' ')
      }
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}