import * as React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-white pt-10 pb-6 md:pt-16 md:pb-8 border-t border-gray-100 font-sans text-gray-600 transition-all duration-300">
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 md:mb-12">

        {/* Column 1: Brand & Contact */}
        <div className="flex flex-col items-start">
          <a href="/" className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-emerald-200 shadow-md">M</div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-gray-900 leading-none">Mini <span className="text-emerald-600">Mart</span></span>
            </div>
          </a>
          <p className="text-sm leading-relaxed mb-6 text-gray-500 max-w-xs">
            Your friendly neighborhood convenience store online. Fresh groceries, snacks, and daily essentials delivered to your door.
          </p>
          <ul className="space-y-4 text-sm w-full">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>123 Market Street, Shopping District,<br />New York, NY 10001</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-emerald-600 flex-shrink-0" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-emerald-600 flex-shrink-0" />
              <span>support@minimart.com</span>
            </li>
          </ul>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-bold text-gray-900 text-base md:text-lg mb-4 md:mb-6">Quick Links</h4>
          <ul className="space-y-2 md:space-y-3 text-sm">
            {['About Us', 'Contact Us', 'My Account', 'Orders History', 'Track Order', 'Privacy Policy'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-emerald-600 transition-colors hover:translate-x-1 inline-block duration-200 py-1">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Categories */}
        {/* On mobile, maybe we want this column to align with adjacent ones nicely */}
        <div>
          <h4 className="font-bold text-gray-900 text-base md:text-lg mb-4 md:mb-6">Top Categories</h4>
          <ul className="space-y-2 md:space-y-3 text-sm">
            {['Beverages', 'Snacks', 'Instant Food', 'Frozen Food', 'Fresh Produce', 'Household'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-emerald-600 transition-colors hover:translate-x-1 inline-block duration-200 py-1">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="font-bold text-gray-900 text-base md:text-lg mb-4 md:mb-6">Newsletter</h4>
          <p className="text-sm text-gray-500 mb-4">Subscribe to our newsletter to get updates about our grand offers.</p>
          <div className="relative mb-6 max-w-sm">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-1.5 rounded-md hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200">
              <Send size={16} />
            </button>
          </div>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:scale-110">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p className="text-center md:text-left">© 2025 Mini Mart. All rights reserved.</p>
        <div className="flex gap-3 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <div className="h-6 w-10 bg-gray-200 rounded"></div>
          <div className="h-6 w-10 bg-gray-200 rounded"></div>
          <div className="h-6 w-10 bg-gray-200 rounded"></div>
          <div className="h-6 w-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </footer>
);

export default React.memo(Footer);