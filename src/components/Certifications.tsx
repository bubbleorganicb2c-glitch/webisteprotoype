import React from "react";

// ✅ Import your local certification images from /public or /assets
import fssaiLogo from "/logos/fssai.jpg";
import jaivikBharatLogo from "/logos/Jaivik_bharat.png";
import indiaOrganicLogo from "/logos/organic-india.jpg";
import pgsIndiaLogo from "/logos/pgs.jpg";

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
];

export default function Certifications() {
  return (
    <section className="py-20 bg-white/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          Our Certifications & Quality Assurance
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          We are committed to providing safe and genuinely organic food products,
          certified under India’s recognized food safety and organic standards.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="bg-white/70 border border-white/40 rounded-2xl p-6 w-52 h-52 flex flex-col items-center justify-center hover:shadow-xl transition-shadow"
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
      </div>
    </section>
  );
}
