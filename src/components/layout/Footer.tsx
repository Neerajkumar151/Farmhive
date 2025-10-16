// src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-foreground mt-20 border-t">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="bg-gradient-hero bg-clip-text text-transparent">FarmHive</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            FarmHive is your trusted platform for renting agricultural tools, managing warehouses, and checking soil health.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
            <li><Link to="/tools" className="hover:text-primary transition">Tools</Link></li>
            <li><Link to="/warehouse" className="hover:text-primary transition">Warehouse</Link></li>
            <li><Link to="/soil-check" className="hover:text-primary transition">Soil Checks</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Noida, Uttar Pradesh, India</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 8448275790</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> thakurneerajkumar17@gmail.com</li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-primary transition"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition"><Linkedin className="h-5 w-5" /></a>
          </div>
          {/* Optional newsletter */}
          <div className="mt-4">
            <label htmlFor="newsletter" className="text-sm font-medium mb-1 block">Subscribe</label>
            <div className="flex gap-2">
              <input
                id="newsletter"
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Subscribe</button>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t mt-8 py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} FarmHive. All rights reserved.
      </div>
    </footer>
  );
};
