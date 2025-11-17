import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Import your local certification images from /public or /assets
import fssaiLogo from "/logos/fssai.jpg";
import jaivikBharatLogo from "/logos/Jaivik_bharat.png";
import indiaOrganicLogo from "/logos/organic-india.jpg";
import pgsIndiaLogo from "/logos/pgs.jpg";
import usdaOrganicLogo from "/logos/usda-organic.jpg";
import glutenFreeLogo from "/logos/gluten-free.png";
import pesticidesFreeLogo from "/logos/pesticides-free.png";
import gmoFreeLogo from "/logos/gmo-free.png";

const certifications = [
  {
    name: "FSSAI Licensed",
    logo: fssaiLogo,
    description: "Food Safety and Standards Authority of India",
    url: "#", // you can add real page link later if needed
    // license: "License No: 12345678901234", // replace with your actual license
  },
  {
    name: "Jaivik Bharat",
    logo: jaivikBharatLogo,
    description: "Certified Organic under FSSAI (Jaivik Bharat)",
    url: "#",
  },
  {
    name: "India Organic (NPOP)",
    logo: indiaOrganicLogo,
    description: "Certified Organic under NPOP by APEDA",
    url: "#",
  },
  {
    name: "PGS-India Organic",
    logo: pgsIndiaLogo,
    description: "Participatory Guarantee System (PGS-India) Certified",
    url: "#",
  },
  {
    name: "USDA Organic",
    logo: usdaOrganicLogo,
    description: "United States Department of Agriculture Organic Certified",
    url: "#",
  },
  {
    name: "Gluten Free",
    logo: glutenFreeLogo,
    description: "Certified Gluten Free Product",
    url: "#",
  },
  {
    name: "Pesticides Free",
    logo: pesticidesFreeLogo,
    description: "Free from harmful pesticides and chemicals",
    url: "#",
  },
  {
    name: "GMO Free",
    logo: gmoFreeLogo,
    description: "Genetically Modified Organism Free",
    url: "#",
  },
];

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = window.innerWidth < 768 ? 2 : 4; // 2 items on mobile, 4 on larger screens
  const totalSlides = Math.ceil(certifications.length / itemsPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000); // Auto-advance every 4 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const visibleCertifications = certifications.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white/40 backdrop-blur-lg rounded-xl p-6 border border-white/50">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          Our Certifications & Quality Assurance
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          We are committed to providing safe and genuinely organic food products,
          certified under India’s recognized food safety and organic standards.
        </p>

        <div className="relative">
          <div className="flex justify-center items-center gap-8">
            {visibleCertifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-white/70 border border-white/40 rounded-2xl p-6 w-52 h-52 flex flex-col items-center justify-center hover:shadow-xl transition-shadow flex-shrink-0"
              >
                <img
                  src={cert.logo}
                  alt={cert.name}
                  className="w-20 h-20 object-contain mb-3"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                aria-label="Previous certifications"
              >
                <ChevronLeft size={24} className="text-green-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                aria-label="Next certifications"
              >
                <ChevronRight size={24} className="text-green-700" />
              </button>
            </>
          )}

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-green-700' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
