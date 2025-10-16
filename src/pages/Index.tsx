import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Tractor, Warehouse, TestTube, Users, Sprout, ArrowRight, Star } from 'lucide-react';
import heroImage from '@/assets/hero-farm.jpg';
// NOTE: feature images and the Footer component are assumed to be defined in your actual project
import feature1Image from '@/assets/feature1.jpg';
import feature2Image from '@/assets/feature2.jpg';
import feature3Image from '@/assets/feature3.jpg';
// import { Footer } from '@/components/layout/Footer';
import { ChatBot } from '@/components/ChatBot';

import Footer from '@/components/Footer';

// IMPORTANT LINKS IMAGES (Assumed assets)
import indiaGovLogo from '@/assets/india-gov-logo.png';
import meityLogo from '@/assets/meity-logo.png';
import azadiLogo from '@/assets/azadi-logo.png';
import landResourcesLogo from '@/assets/land-resources-logo.png';
import janSamarthLogo from '@/assets/jan-samarth-logo.png';

// TESTIMONIAL AVATARS (Assumed assets)
import avatarRavi from '@/assets/avatar-ravi.jpg';
import avatarSunita from '@/assets/avatar-sunita.jpg';
import avatarAmit from '@/assets/avatar-amit.jpg';
import avatarPriya from '@/assets/avatar-priya.jpg';
import avatarRajesh from '@/assets/avatar-rajesh.jpg';


const Index: React.FC = () => {
    const { t } = useTranslation();
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    // The redirect hook has been permanently removed as per previous instructions.

    // ✅ CORRECTED: Define Feature Data with raw translation keys (titleKey, descriptionKey).
    const features = [
        { icon: Tractor, titleKey: 'tools.title', descriptionKey: 'tools.subtitle', image: feature1Image, link: '/tools' },
        { icon: Warehouse, titleKey: 'warehouse.title', descriptionKey: 'warehouse.subtitle', image: feature2Image, link: '/warehouse' },
        { icon: TestTube, titleKey: 'soil.title', descriptionKey: 'soil.subtitle', image: feature3Image, link: '/soil-check' }
    ];

    // ✅ NEW: Define Testimonial Data using only raw translation keys.
    const rawTestimonialData = [
        // Keys for the testimonials you provided:
        { nameKey: 'testimonial.amit_name', roleKey: 'testimonial.amit_role', feedbackKey: 'testimonial.amit_feedback', avatar: avatarAmit, rating: 5 },
        { nameKey: 'testimonial.sunita_name', roleKey: 'testimonial.sunita_role', feedbackKey: 'testimonial.sunita_feedback', avatar: avatarSunita, rating: 5 },
        { nameKey: 'testimonial.ravi_name', roleKey: 'testimonial.ravi_role', feedbackKey: 'testimonial.ravi_feedback', avatar: avatarRavi, rating: 5 },
        { nameKey: 'testimonial.priya_name', roleKey: 'testimonial.priya_role', feedbackKey: 'testimonial.priya_feedback', avatar: avatarPriya, rating: 4 },
        { nameKey: 'testimonial.rajesh_name', roleKey: 'testimonial.rajesh_role', feedbackKey: 'testimonial.rajesh_feedback', avatar: avatarRajesh, rating: 5 }
    ];
    
    // Re-integrated Important Links Data (unchanged)
    const importantLinks = [
        { src: indiaGovLogo, alt: 'India Government National Portal', href: 'https://www.india.gov.in/' },
        { src: meityLogo, alt: 'Ministry of Electronics and Information Technology', href: 'https://www.meity.gov.in/' },
        { src: azadiLogo, alt: 'Azadi Ka Amrit Mahotsav', href: 'https://amritmahotsav.nic.in/' },
        { src: landResourcesLogo, alt: 'Department of Land Resources', href: 'https://dolr.gov.in/' },
        { src: janSamarthLogo, alt: 'Jan Samarth', href: 'https://www.jansamarth.in/' },
        // Duplicates for seamless scroll
        { src: indiaGovLogo, alt: 'India Government National Portal', href: 'https://www.india.gov.in/' },
        { src: meityLogo, alt: 'Ministry of Electronics and Information Technology', href: 'https://www.meity.gov.in/' },
        { src: azadiLogo, alt: 'Azadi Ka Amrit Mahotsav', href: 'https://amritmahotsav.nic.in/' },
        { src: landResourcesLogo, alt: 'Department of Land Resources', href: 'https://dolr.gov.in/' },
        { src: janSamarthLogo, alt: 'Jan Samarth', href: 'https://www.jansamarth.in/' },
    ];

    return (
        <Layout>
            <ChatBot/>
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${heroImage})` }}
                >
                    <div className="absolute inset-0 bg-black/20" />
                </div>
                
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* Conditional Button Logic */}
                            <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-700 hover:bg-primary/90 text-primary-foreground shadow-strong transition">
                                <Link to={user ? '/tools' : '/auth'}>
                                    {t('hero.getStarted')}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/30 transition">
                                <Link to="/tools">{t('hero.learnMore')}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. RE-INTEGRATED SECTION: VALUE PROPOSITION / ABOUT FARMHIVE */}
            <section className="py-20 bg-card">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className=" h-16 text-4xl font-bold mb-0 text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-emerald-700">
                            {t('valueProp.section_title')}
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            {t('valueProp.section_subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 text-center">
                        {/* Value Prop 1: Resource Sharing */}
                        <div className="p-6 bg-secondary/30 rounded-lg shadow-medium">
                            <Tractor className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold mb-2 text-foreground">{t('valueProp.resource_sharing_title')}</h3>
                            <p className="text-muted-foreground">
                                {t('valueProp.resource_sharing_text')}
                            </p>
                        </div>

                        {/* Value Prop 2: Data & Intelligence */}
                        <div className="p-6 bg-secondary/30 rounded-lg shadow-medium">
                            <TestTube className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold mb-2 text-foreground">{t('valueProp.soil_insights_title')}</h3>
                            <p className="text-muted-foreground">
                                {t('valueProp.soil_insights_text')}
                            </p>
                        </div>

                        {/* Value Prop 3: Community */}
                        <div className="p-6 bg-secondary/30 rounded-lg shadow-medium">
                            <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold mb-2 text-foreground">{t('valueProp.community_title')}</h3>
                            <p className="text-muted-foreground">
                                {t('valueProp.community_text')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section className="py-20 bg-gradient-earth">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-foreground">
                            {t('index.features_title')} 
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t('index.features_subtitle')} 
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur">
                                
                                <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                                    <img src={feature.image} alt={t(feature.titleKey)} className="w-full h-48 object-cover group-hover:scale-105 transition-transform"/>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                                        <feature.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold">
                                        {t(feature.titleKey)}
                                    </CardTitle>
                                    <CardDescription className="mb-6 text-base">
                                        {t(feature.descriptionKey)}
                                    </CardDescription>
                                    <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <Link to={feature.link}>
                                            {t('index.explore')} 
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {/* Stat 1: Active Farmers */}
                        <div className="group">
                            <div className="mb-4 p-4 bg-accent/20 rounded-full w-fit mx-auto group-hover:bg-accent/30 transition-colors">
                                <Users className="h-12 w-12 text-accent-foreground" />
                            </div>
                            <h3 className="text-3xl font-bold text-foreground mb-2">1000+</h3>
                            <p className="text-muted-foreground">{t('index.active_farmers')}</p> 
                        </div>
                        {/* Stat 2: Tools Available */}
                        <div className="group">
                            <div className="mb-4 p-4 bg-primary/20 rounded-full w-fit mx-auto group-hover:bg-primary/30 transition-colors">
                                <Tractor className="h-12 w-12 text-primary" />
                            </div>
                            <h3 className="text-3xl font-bold text-foreground mb-2">500+</h3>
                            <p className="text-muted-foreground">{t('index.tools_available')}</p> 
                        </div>
                        {/* Stat 3: Success Rate */}
                        <div className="group">
                            <div className="mb-4 p-4 bg-secondary/40 rounded-full w-fit mx-auto group-hover:bg-secondary/50 transition-colors">
                                <Sprout className="h-12 w-12 text-secondary-foreground" />
                            </div>
                            <h3 className="text-3xl font-bold text-foreground mb-2">95%</h3>
                            <p className="text-muted-foreground">{t('index.success_rate')}</p> 
                        </div>
                    </div>
                </div>
            </section>
            
            {/* 3. RE-INTEGRATED SECTION: Testimonials */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        {/* ✅ CORRECTED: Testimonial Header/Subtitle Keys */}
                        <h2 className="text-4xl font-bold mb-4 text-foreground">{t('testimonial.section_title')}</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('testimonial.section_subtitle')}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {rawTestimonialData.slice(0, 3).map((item, i) => ( // Use rawTestimonialData
                            <Card key={i} className="group p-6 text-center relative overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
                                <div className="flex justify-center mb-4">
                                    {[...Array(item.rating)].map((_, starIndex) => <Star key={starIndex} className="h-6 w-6 text-yellow-400 fill-current"/>)}
                                    {[...Array(5 - item.rating)].map((_, starIndex) => <Star key={starIndex + item.rating} className="h-6 w-6 text-gray-300"/>)}
                                </div>
                                <img src={item.avatar} alt={t(item.nameKey)} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20 group-hover:border-primary transition-all duration-300"/>
                                <p className="text-muted-foreground mb-4 text-sm italic">"{t(item.feedbackKey)}"</p>
                                {/* Hover overlay for name and role */}
                                <div className="absolute inset-x-0 bottom-0 bg-primary/80 text-white py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                    <h4 className="text-lg font-semibold">{t(item.nameKey)}</h4>
                                    <span className="text-sm opacity-90">{t(item.roleKey)}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto"> {/* Bottom 2 testimonials */}
                        {rawTestimonialData.slice(3, 5).map((item, i) => ( // Use rawTestimonialData
                            <Card key={i + 3} className="group p-6 text-center relative overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
                                <div className="flex justify-center mb-4">
                                    {[...Array(item.rating)].map((_, starIndex) => <Star key={starIndex} className="h-6 w-6 text-yellow-400 fill-current"/>)}
                                    {[...Array(5 - item.rating)].map((_, starIndex) => <Star key={starIndex + item.rating} className="h-6 w-6 text-gray-300"/>)}
                                </div>
                                <img src={item.avatar} alt={t(item.nameKey)} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20 group-hover:border-primary transition-all duration-300"/>
                                <p className="text-muted-foreground mb-4 text-sm italic">"{t(item.feedbackKey)}"</p>
                                {/* Hover overlay for name and role */}
                                <div className="absolute inset-x-0 bottom-0 bg-primary/80 text-white py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                    <h4 className="text-lg font-semibold">{t(item.nameKey)}</h4>
                                    <span className="text-sm opacity-90">{t(item.roleKey)}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* 4. RE-INTEGRATED SECTION: Marquee and Footer */}
            <section
                className="py-10 overflow-hidden border-t-10 border-b-20 border-white/20"
                style={{
                    background: "transparent linear-gradient(90deg, #B8D721 0%, #6CBE03 100%) 0% 0% no-repeat padding-box"
                }}
            >
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-white tracking-wider">{t('index.links_title')}</h2> {/* ✅ CORRECTED: Marquee Title */}
                </div>
                <div className="relative w-full overflow-hidden">
                    <div className="marquee-content flex space-x-20 justify-start">
                        {importantLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-item flex-shrink-0 flex items-center h-20 p-0 transition-opacity hover:opacity-100"
                            >
                                <img
                                    src={link.src}
                                    alt={link.alt}
                                    className="h-full object-contain w-auto max-w-none"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. RE-INTEGRATED SECTION: Footer */}
            <Footer />

            {/* Note: Ensure the required CSS for the .marquee-content and .link-item is in your global stylesheet */}
            
        </Layout>
    );
};

export default Index;