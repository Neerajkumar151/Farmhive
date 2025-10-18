import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Lightbulb } from 'lucide-react';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Community from '@/components/Community';
import AIShowcase from '@/components/AIShowcase';
// ⭐️ IMPORT CHATBOT COMPONENT ⭐️
import { ChatBot } from '@/components/ChatBot';

export const CommunityPage: React.FC = () => {
    const { t } = useTranslation();
    // ⭐️ 1. ADD STATE MANAGEMENT FOR CHATBOT VISIBILITY ⭐️
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <Layout>
            {/* ⭐️ 2. RENDER CHATBOT AND PASS STATE/SETTER ⭐️ */}
            {/* Note: The ChatBot component must accept 'isOpen' and 'setIsOpen' as props */}
            <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

            <div className="container mx-auto px-4 py-8">
                <Hero/>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Our Mission Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-6 w-6 text-primary" />
                                {t('community.mission_title', 'Our Mission')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                {t('community.mission_description', 'To build a supportive network where farmers can freely exchange knowledge, find solutions to challenges, and discover innovative practices to improve their yields and sustainability.')}
                            </p>
                        </CardContent>
                    </Card>

                    {/* What You Can Do Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="h-6 w-6 text-primary" />
                                {t('community.features_title', 'What You Can Do Here')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>{t('community.features.ask_questions', 'Ask questions and get answers from experienced peers.')}</li>
                                <li>{t('community.features.share_experiences', 'Share your own farming successes and lessons learned.')}</li>
                                <li>{t('community.features.find_solutions', 'Find practical solutions for crop management and soil health.')}</li>
                                <li>{t('community.features.stay_updated', 'Stay updated on the latest agricultural trends and technologies.')}</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Join the Conversation Card */}
                    <Card className="md:col-span-2 lg:col-span-1 bg-primary/10 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-6 w-6 text-primary" />
                                {t('community.join_title', 'Join the Conversation')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                {t('community.join_description', 'Your voice matters. Start a new discussion, reply to a topic, or introduce yourself to the community.')}
                            </p>

                            {/* THIS BUTTON IS NOW A NAVIGATIONAL LINK */}
                            <Button className="w-full" asChild>
                                <Link to="/community/chat"> {/* <-- CHANGE THIS LINK */}
                                    {t('community.join_button', 'Start a Discussion')}
                                </Link>
                            </Button>


                        </CardContent>
                    </Card>
                </div>
            </div>
            <Services/>
            {/* ⭐️ 3. PASS THE STATE SETTER TO AIShowcase ⭐️ */}
            <AIShowcase setChatOpen={setIsChatOpen}/>
            <Community/>
            <Footer/>
        </Layout>
    );
};
