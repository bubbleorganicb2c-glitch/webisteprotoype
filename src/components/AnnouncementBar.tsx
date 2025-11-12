import { Instagram, Facebook, Youtube, Gift } from 'lucide-react';
import { SiBlogger, SiWhatsapp } from 'react-icons/si';

export default function AnnouncementBar() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-0 py-2 text-sm text-green-900 relative">
          
          {/* Centered text */}
          <div className="flex items-center gap-2 text-center justify-center">
            <Gift className="w-5 h-5 text-green-700 flex-shrink-0" />
            <p className="text-sm md:text-base font-medium whitespace-nowrap">
              Welcome Offer for New Users!
            </p>
          </div>

          {/* Icons – stacked below text on mobile */}
          <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-4 mt-1 sm:mt-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transform transition-all duration-300 hover:scale-110 hover:opacity-80"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transform transition-all duration-300 hover:scale-110 hover:opacity-80"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transform transition-all duration-300 hover:scale-110 hover:opacity-80"
            >
              <SiWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </a>
            <a
              href="https://blogger.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blogger"
              className="transform transition-all duration-300 hover:scale-110 hover:opacity-80"
            >
              <SiBlogger className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transform transition-all duration-300 hover:scale-110 hover:opacity-80"
            >
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
