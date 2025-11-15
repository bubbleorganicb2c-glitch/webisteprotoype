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

    // Product search
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
    if (message.includes('categories') || message.includes('types')) {
      return 'We offer: Spices, Cereals, Masalas, Nuts, Rice, Seeds, Millets, Flours, Pulses, and our special Bubble Organic products. Which category interests you?';
    }

    // Organic/certification
    if (message.includes('organic') || message.includes('certified')) {
      return 'All our products are 100% organic and certified. We source directly from farmers and ensure sustainable farming practices. Our products are free from chemicals and pesticides.';
    }

    // Pricing/delivery
    if (message.includes('price') || message.includes('cost')) {
      return 'Our prices vary by product and weight. Most items start from ₹50-₹200. We offer bulk discounts for larger quantities. Check individual product pages for current pricing.';
    }

    if (message.includes('delivery') || message.includes('shipping')) {
      return 'We provide fast delivery across India. Orders are typically delivered within 2-5 business days. Free shipping on orders above ₹500!';
    }

    // Contact/help
    if (message.includes('contact') || message.includes('help') || message.includes('support')) {
      return 'You can reach us at support@bubbleorganic.com or call +91-XXXXXXXXXX. We\'re here to help Monday-Saturday, 9 AM to 6 PM IST.';
    }

    // Nutrition calculator
    if (message.includes('nutrition') || message.includes('calculator') || message.includes('nutrients')) {
      return `You can use our Nutrition Calculator to see the nutritional breakdown of items in your cart! Click the "Nutrition Calculator" button on the cart page to view detailed information about calories, protein, vitamins, and minerals for all your selected products.`;
    }

    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to Bubble Organic. How can I assist you today?';
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
