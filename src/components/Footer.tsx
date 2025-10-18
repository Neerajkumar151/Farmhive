// src/components/Footer.tsx - Complete

import { Sprout, Mail, Phone, MapPin, Feather, Users, Github, Camera, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    const CONTACT_INFO = {
        location: t('contact.location'),
        phone: '+91 8448275790',
        email: 'thakurneerajkumar17@gmail.com'
    };

    // Social Links using Lucide icons
    const SOCIAL_LINKS = [
        { icon: Feather, url: 'https://x.com/neerajkumar1715', color: 'hover:text-sky-400' },
        { icon: Users, url: 'https://www.linkedin.com/in/neerajkumar1517/', color: 'hover:text-blue-500' },
        { icon: Github, url: 'https://github.com/Neerajkumar151', color: 'hover:text-gray-200' },
        { icon: Camera, url: 'https://instagram.com', color: 'hover:text-pink-500' },
        { icon: Code, url: 'https://leetcode.com/u/neerajkumar17/', color: 'hover:text-yellow-400' }
    ];

    const FOOTER_NAV_LINKS = [
        { key: 'footer.service_equipment', route: '/tools' },
        { key: 'footer.service_warehouse', route: '/warehouse' },
        { key: 'footer.service_soil', route: '/soil-check' },
        { key: 'footer.service_community', route: '/community' },
        { key: 'footer.service_contact', route: '/contact' },
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
                                <div className="text-xs text-green-400">{t('logo.tagline')}</div>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            {t('footer.tagline_p')}
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
                        <h3 className="font-bold text-lg mb-6 text-white">{t('footer.contact_title')}</h3>
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
                        <h3 className="font-bold text-lg mb-6 text-white">{t('footer.services_title')}</h3>
                        <ul className="space-y-3">
                            {FOOTER_NAV_LINKS.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.route}
                                        className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        {t(item.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 4: Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">{t('footer.newsletter_title')}</h3>
                        <p className="text-gray-300 mb-4">
                            {t('footer.newsletter_p')}
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder={t('footer.email_placeholder')}
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
                            {t('footer.copyright_base')}
                            <span className="text-white font-medium ml-1">Neeraj Kumar</span>.
                        </p>
                        <div className="flex gap-6">
                            <Link to="/privacy-policy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                                {t('footer.privacy_policy')}
                            </Link>
                            <Link to="/terms-of-service" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                                {t('footer.terms_of_service')}
                            </Link>
                            <Link to="/cookie-policy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                                {t('footer.cookie_policy')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}