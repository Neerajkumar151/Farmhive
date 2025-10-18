import { Sprout, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaXTwitter, FaLinkedin, FaGithub, FaInstagram, FaCode } from "react-icons/fa6"; // using react-icons for X, GitHub, LeetCode

export default function Footer() {
  // Hardcoded contact information
  const CONTACT_INFO = {
    location: 'Noida, Uttar Pradesh, India',
    phone: '+91 8448275790',
    email: 'thakurneerajkumar17@gmail.com'
  };

  // Social Links
  const SOCIAL_LINKS = [
    { icon: FaXTwitter, url: 'https://x.com/neerajkumar1715', color: 'hover:text-sky-400' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/neerajkumar1517/', color: 'hover:text-blue-500' },
    { icon: FaGithub, url: 'https://github.com/Neerajkumar151', color: 'hover:text-gray-200' },
    { icon: FaInstagram, url: 'https://instagram.com', color: 'hover:text-pink-500' },
    { icon: FaCode, url: 'https://leetcode.com/u/neerajkumar17/', color: 'hover:text-yellow-400' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white pt-5 pb-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* COLUMN 1: Logo, Description & Socials */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-lg">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl">KrishiSanjivni</div>
                <div className="text-xs text-green-400">Growing Together</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Empowering farmers with cutting-edge technology, expert knowledge, and a supportive community to achieve sustainable success.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, url, color }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-white/10 ${color} flex items-center justify-center transition-all duration-300 hover:scale-110`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{CONTACT_INFO.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-green-400 transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-green-400 transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Services */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {[
                { key: 'Farming Equipment', route: '/tools' },
                { key: 'Warehouse Solutions', route: '/warehouse' },
                { key: 'Soil Testing', route: '/soil-check' },
                { key: 'Community', route: '/community' },
                { key: 'Contact Us', route: '/contact' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.route}
                    className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    {item.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Get weekly farming tips and updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 p-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white font-medium ml-1">
              © 2025 KrishiSanjivni. All rights reserved By
              <span className="text-white font-medium ml-1">Neeraj Kumar</span>.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
