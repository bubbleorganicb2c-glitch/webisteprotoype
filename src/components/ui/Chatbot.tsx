import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your Bubble Organic assistant. I can help you find products, answer questions about our organic offerings, or provide information about our services. What would you like to know?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();

    // Direct product name matching
    const productMatch = PRODUCTS.find(p =>
      message.includes(p.name.toLowerCase()) ||
      p.name.toLowerCase().split(' ').some(word => message.includes(word))
    );

    if (productMatch) {
      const weight = productMatch.weights[0];
      return `"${productMatch.name}" is available in our ${productMatch.category} collection. Price: ₹${weight.price} for ${weight.label}. ${productMatch.description || ''} ${productMatch.howToUse ? `How to use: ${productMatch.howToUse}` : ''} Would you like to know more about this product?`;
    }

    // Direct category matching
    const categories = ['spices', 'rice', 'nuts', 'masalas', 'millets', 'pulses', 'cereals', 'seeds', 'flours', 'bubble organic special products'];
    const categoryMatch = categories.find(cat =>
      message.includes(cat.toLowerCase()) ||
      message.includes(cat.replace('bubble organic special products', 'special products'))
    );

    if (categoryMatch) {
      const categoryProducts = PRODUCTS.filter(p =>
        p.category.toLowerCase() === categoryMatch ||
        (categoryMatch === 'special products' && p.category === 'Bubble Organic Special Products')
      );

      if (categoryProducts.length > 0) {
        const productList = categoryProducts.map(p => `${p.name} (₹${p.weights[0].price} for ${p.weights[0].label})`).join(', ');
        return `In our ${categoryMatch} category, we have: ${productList}. All our products are 100% organic and certified. Which one interests you?`;
      }
    }

    // Product search (existing logic)
    if (message.includes('find') || message.includes('search') || message.includes('looking for')) {
      const searchTerms = message.replace(/(find|search|looking for)/g, '').trim();
      const foundProducts = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchTerms) ||
        p.category.toLowerCase().includes(searchTerms)
      );

      if (foundProducts.length > 0) {
        const product = foundProducts[0];
        return `I found "${product.name}" in our ${product.category} collection. It's priced at ₹${product.weights[0].price} for ${product.weights[0].label}. Would you like me to show you more details?`;
      } else {
        return `I couldn't find products matching "${searchTerms}". Try searching for categories like "spices", "cereals", or specific product names.`;
      }
    }

    // Categories
    if (message.includes('categories') || message.includes('types') || message.includes('what do you sell') || message.includes('products available')) {
      return 'We offer: Spices, Cereals, Masalas, Nuts, Rice, Seeds, Millets, Flours, Pulses, and our special Bubble Organic products. Which category interests you?';
    }

    // Organic/certification
    if (message.includes('organic') || message.includes('certified') || message.includes('natural') || message.includes('chemical free')) {
      return 'All our products are 100% organic and certified. We source directly from farmers and ensure sustainable farming practices. Our products are free from chemicals and pesticides. We also have FSSAI certification and organic certifications from recognized bodies.';
    }

    // Pricing/delivery
    if (message.includes('price') || message.includes('cost') || message.includes('expensive') || message.includes('cheap')) {
      return 'Our prices vary by product and weight. Most items start from ₹50-₹200. We offer bulk discounts for larger quantities. Check individual product pages for current pricing. All prices include GST.';
    }

    if (message.includes('delivery') || message.includes('shipping') || message.includes('when will i get') || message.includes('order time')) {
      return 'We provide fast delivery across India. Orders are typically delivered within 2-5 business days. Free shipping on orders above ₹500! We also offer express delivery for urgent orders.';
    }

    // Contact/help
    if (message.includes('contact') || message.includes('help') || message.includes('support') || message.includes('call') || message.includes('email')) {
      return 'You can reach us at support@bubbleorganic.com or call +91-XXXXXXXXXX. We\'re here to help Monday-Saturday, 9 AM to 6 PM IST. You can also visit our store or use the contact form on our website.';
    }

    // Nutrition calculator
    if (message.includes('nutrition') || message.includes('calculator') || message.includes('nutrients') || message.includes('nutritional value') || message.includes('calories')) {
      return `You can use our Nutrition Calculator to see the nutritional breakdown of items in your cart! Click the "Nutrition Calculator" button on the cart page to view detailed information about calories, protein, vitamins, and minerals for all your selected products.`;
    }

    // About the company
    if (message.includes('about') || message.includes('company') || message.includes('bubble organic') || message.includes('who are you')) {
      return 'Bubble Organic is committed to providing pure, organic, and chemical-free products directly from farmers. We ensure sustainable farming practices and offer a wide range of organic spices, grains, nuts, and specialty products. Our mission is to promote healthy living through natural, nutritious food.';
    }

    // Health benefits
    if (message.includes('health') || message.includes('benefits') || message.includes('healthy') || message.includes('good for')) {
      return 'Our organic products offer numerous health benefits: improved digestion, better nutrient absorption, stronger immunity, and reduced risk of chronic diseases. Organic foods are free from harmful pesticides and contain higher levels of antioxidants and essential nutrients.';
    }

    // Farming practices
    if (message.includes('farming') || message.includes('grow') || message.includes('cultivation') || message.includes('sustainable')) {
      return 'We work directly with farmers who practice sustainable and organic farming methods. This includes natural pest control, crop rotation, composting, and avoiding synthetic fertilizers. Our farmers follow traditional methods combined with modern organic practices.';
    }

    // Quality assurance
    if (message.includes('quality') || message.includes('fresh') || message.includes('freshness') || message.includes('assurance')) {
      return 'We maintain strict quality control from farm to your doorstep. All products undergo rigorous testing for purity, freshness, and organic certification. We ensure proper packaging and storage to maintain product quality and nutritional value.';
    }

    // Returns/refunds
    if (message.includes('return') || message.includes('refund') || message.includes('exchange') || message.includes('damaged')) {
      return 'We accept returns within 7 days of delivery for damaged or incorrect products. Please contact our support team with photos of the damaged goods. Refunds are processed within 3-5 business days after verification.';
    }

    // Bulk orders
    if (message.includes('bulk') || message.includes('wholesale') || message.includes('large quantity') || message.includes('business')) {
      return 'We offer special pricing for bulk orders. Contact our sales team at sales@bubbleorganic.com for wholesale rates and custom packaging options. Minimum order quantities apply for bulk discounts.';
    }

    // Certifications
    if (message.includes('certification') || message.includes('certified') || message.includes('fssai') || message.includes('organic certificate')) {
      return 'All our products are FSSAI certified and carry organic certifications. We have certifications from recognized bodies like PGS India, Jaivik Bharat, and others. You can view our certificates on the Certifications page.';
    }

    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good evening')) {
      return 'Hello! Welcome to Bubble Organic. How can I assist you today?';
    }

    // Thanks
    if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re welcome! Is there anything else I can help you with regarding our organic products?';
    }

    // Bye
    if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
      return 'Thank you for visiting Bubble Organic! Have a great day and stay healthy with our organic products.';
    }

    // Default responses
    const defaultResponses = [
      'I\'m here to help with any questions about our organic products. What would you like to know?',
      'Feel free to ask me about our product categories, pricing, or any other questions you have!',
      'I can help you find specific products or tell you more about our organic offerings. What interests you?',
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button - Bottom Left with Hover Label */}
      {!isOpen && (
        <div
          className="fixed bottom-4 left-4 z-40 flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Open chat"
          >
            <MessageCircle size={16} />
          </button>
          <div
            className={`bg-white text-green-600 px-2 py-1 rounded-l-md shadow-lg border border-r-0 border-green-200 transition-all duration-300 ml-2 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            }`}
          >
            <span className="text-xs font-semibold whitespace-nowrap">Chat Assistant</span>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 left-4 w-72 h-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-40 flex flex-col">
          {/* Header */}
          <div className="bg-green-600 text-white p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={16} />
              <span className="font-semibold text-sm">Bubble Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-700 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-2 rounded-lg text-xs ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    {message.sender === 'bot' ? (
                      <Bot size={10} className="text-green-600" />
                    ) : (
                      <User size={10} className="text-white" />
                    )}
                    <span className="text-xs opacity-75">
                      {message.sender === 'bot' ? 'Assistant' : 'You'}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-1 rounded-lg transition-colors"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
