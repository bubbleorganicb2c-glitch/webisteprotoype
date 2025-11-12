import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/30 backdrop-blur-xl rounded-t-2xl border border-white/40 p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Customer Support */}
            <div>
              <h3 className="text-xl font-bold text-green-900 mb-4">Customer Support</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin size={18} className="text-green-700 mt-1" />
                  <span>
                    Bubble Organic Food Products Private Limited,<br />
                    No. 51, Murasoli Maran Street, Santhosh Nagar,<br />
                    Kandhanchavadi, Perungudi,<br />
                    Chennai‑600096
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone size={18} className="text-green-700" />
                  <span>Call: 9344872725</span>
                </div>
                <div className="flex flex-col gap-1 text-gray-700">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-green-700" />
                    <span>bubbleorganicb2c@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-green-700" />
                    <span>bubbleorganic555@gmail.com</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Policy Details */}
            <div>
              <h3 className="text-xl font-bold text-green-900 mb-4">Policy Details</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#privacy" className="text-gray-700 hover:text-green-700 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-gray-700 hover:text-green-700 transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#shipping" className="text-gray-700 hover:text-green-700 transition-colors">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#returns" className="text-gray-700 hover:text-green-700 transition-colors">
                    Return & Refund Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Our Location */}
            <div>
              <h3 className="text-xl font-bold text-green-900 mb-4">Our Location</h3>
              <div className="rounded-lg overflow-hidden border border-white/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1342617208006!2d80.25028019999999!3d12.9632594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525dd465022707%3A0x28e46746b3b5f3b4!2sBubble%20Organic%20Food%20Products%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1762924438398!5m2!1sen!2sin" 
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-green-900/90 backdrop-blur-sm text-white py-6 mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 Bubble Organic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
