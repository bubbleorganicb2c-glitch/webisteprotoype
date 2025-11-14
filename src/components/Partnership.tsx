const partners = [
  { name: 'JioMart', logo: '/JioMart_logo.svg.png', url: 'https://www.jiomart.com' },
  { name: 'Amazon', logo: '/amazon.png', url: 'https://www.amazon.in' },
  { name: 'Flipkart', logo: '/flipkart.png', url: 'https://www.flipkart.com' },
  { name: 'BigBasket', logo: '/bigbasket.jpg', url: 'https://www.bigbasket.com' },
  { name: 'Dunzo', logo: '/dunzo.jpg', url: 'https://www.dunzo.com' },
  { name: 'Meesho', logo: '/meesho.png', url: 'https://www.meesho.com' },
];

export default function Partnership() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-white/40">
          <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">
            Available On
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 bg-white/60 rounded-xl overflow-hidden transition-all transform hover:scale-110 hover:bg-white/80 active:scale-110 active:bg-white/80"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-24 h-24 object-contain md:filter md:grayscale hover:grayscale-0 active:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
