import { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { SiWhatsapp, SiBlogger } from 'react-icons/si';

export default function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Enquiry from ${name || 'Website Visitor'}`;
    const body = `Name: ${name || '—'}%0D%0AEmail: ${email || '—'}%0D%0A%0D%0A${message || 'Please write your enquiry here.'}`;
    window.location.href = `mailto:bubbleorganicb2c@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <footer className="mt-10 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/30 backdrop-blur-xl rounded-t-2xl border border-white/40 p-4 sm:p-8">
          {/* make first two columns auto width so Policy sits closer to Customer Support,
              map takes remaining space */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr] gap-4 md:gap-6 items-start">

            {/* Customer Support */}
            <div className="text-xs sm:text-sm">
              <h3 className="text-sm font-semibold text-green-900 mb-2">Customer Support</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-green-700 mt-1" />
                  <span className="leading-tight">
                    Bubble Organic Food Products Pvt Ltd,<br />
                    No. 51, Murasoli Maran Street, Santhosh Nagar,<br />
                    Kandhanchavadi, Perungudi,<br />
                    Chennai - 600096
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-green-700" />
                  <span>Call: 9344872725</span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-green-700" />
                    <a href="mailto:bubbleorganicb2c@gmail.com" className="hover:underline">bubbleorganicb2c@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-green-700" />
                    <a href="mailto:bubbleorganic555@gmail.com" className="hover:underline">bubbleorganic555@gmail.com</a>
                  </div>
                </div>

                {/* Social icons next to contact — slightly smaller and animated */}
                <div className="mt-5 flex items-center gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center justify-center transform transition-transform duration-200 hover:scale-110">
                    <Instagram className="w-7 h-7 text-pink-600" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center justify-center transform transition-transform duration-200 hover:scale-110">
                    <Facebook className="w-7 h-7 text-blue-600" />
                  </a>
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex items-center justify-center transform transition-transform duration-200 hover:scale-110">
                    <SiWhatsapp className="w-7 h-7  text-green-600" />
                  </a>
                  <a href="https://blogger.com" target="_blank" rel="noopener noreferrer" aria-label="Blogger" className="inline-flex items-center justify-center transform transition-transform duration-200 hover:scale-110">
                    <SiBlogger className="w-7 h-7 text-orange-600" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="inline-flex items-center justify-center transform transition-transform duration-200 hover:scale-110">
                    <Youtube className="w-7 h-7 text-red-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Middle column: Policy Details + Enquiry (kept compact so it sits close to Customer Support) */}
            <div className="text-xs sm:text-sm">
              <div className="flex flex-col md:flex-row md:items-start gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-green-900 mb-2">Policy Details</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li><a href="#privacy" className="hover:text-green-700">Privacy Policy</a></li>
                    <li><a href="#terms" className="hover:text-green-700">Terms &amp; Conditions</a></li>
                    <li><a href="#shipping" className="hover:text-green-700">Shipping Policy</a></li>
                    <li><a href="#returns" className="hover:text-green-700">Return &amp; Refund Policy</a></li>
                  </ul>
                </div>

                <div className="w-full md:w-64 self-start">
                  <h3 className="text-xs sm:text-sm font-semibold text-green-900 mb-2">Enquiry</h3>
                  <div className="bg-white border border-white/40 rounded-md p-2">
                    <form onSubmit={handleSubmit} className="space-y-2 text-xs">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full rounded-md border border-gray-200 px-2 py-1 text-xs"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full rounded-md border border-gray-200 px-2 py-1 text-xs"
                      />
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message"
                        rows={3}
                        className="w-full rounded-md border border-gray-200 px-2 py-1 text-xs"
                      />
                      <div className="flex items-center justify-between">
                        <button type="submit" className="bg-green-700 text-white px-3 py-1 rounded-md text-xs hover:opacity-90">
                          Email Us
                        </button>
                        <a href="mailto:bubbleorganicb2c@gmail.com" className="text-xs text-green-700 hover:underline">Direct mail</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Location (static map) */}
            <div className="text-xs sm:text-sm">
              <h3 className="text-sm font-semibold text-green-900 mb-2">Our Location</h3>
              <div className="rounded-lg overflow-hidden border border-white/50 shadow-sm relative">
                <iframe
                  className="w-full h-40 sm:h-52 block"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1342617208006!2d80.25028019999999!3d12.9632594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525dd465022707%3A0x28e46746b3b5f3b4!2sBubble%20Organic%20Food%20Products%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1762924438398!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-2 right-2 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-green-900/90 backdrop-blur-sm text-white py-3 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="text-[11px] hidden sm:inline">© 2025 Bubble Organic. All rights reserved.</span>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-[11px] sm:hidden">© 2025 Bubble Organic. All rights reserved.</span>
            <p className="text-[11px] sm:text-xs">Designed with care · <a href="mailto:bubbleorganicb2c@gmail.com" className="underline">bubbleorganicb2c@gmail.com</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
