import { Bot, Sparkles, MessageSquare, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ⭐️ ADD PROPS INTERFACE ⭐️
interface AIShowcaseProps {
    setChatOpen: (open: boolean) => void;
}

const sampleQuestions = [
    "What's the best time to plant corn in my region?",
    "How do I improve soil nitrogen levels?",
    "What are the signs of wheat rust disease?",
    "When should I irrigate my tomato crops?"
];

// ⭐️ UPDATE COMPONENT SIGNATURE TO ACCEPT PROPS ⭐️
export default function AIShowcase({ setChatOpen }: AIShowcaseProps) {
    const [selectedQuestion, setSelectedQuestion] = useState(0);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-800">AI-Powered Intelligence</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Your Personal Farming
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">
                                AI Assistant
                            </span>
                        </h2>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Get instant, expert-level answers to your farming questions 24/7. Our AI chatbot is trained
                            on decades of agricultural knowledge and best practices.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                { icon: Zap, title: 'Instant Responses', desc: 'Get answers in seconds, not hours' },
                                { icon: Bot, title: 'Expert Knowledge', desc: 'Trained on agricultural best practices' },
                                { icon: MessageSquare, title: 'Natural Conversations', desc: 'Chat naturally like with a human expert' }
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="flex items-start gap-4 bg-green-50 p-4 rounded-xl hover:bg-green-100 transition-colors">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ⭐️ MODIFIED BUTTON: Removed <Link> and added onClick ⭐️ */}
                        <button
                            onClick={() => setChatOpen(true)}
                            className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                        >
                            <Bot className="w-5 h-5" />
                            Try AI Assistant Now
                        </button>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-2xl border border-green-100">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">KrishiSanjivni Assistant</div>
                                        <div className="text-xs text-green-100 flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></div>
                                            Online
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4 h-96 overflow-y-auto bg-gray-50">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-xs">
                                            <p className="text-gray-700">
                                                Hello! I'm your AI farming assistant. I can help with soil testing, crop management,
                                                pest control, and much more. What would you like to know?
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 justify-end">
                                        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl rounded-tr-none p-4 shadow-sm max-w-xs">
                                            <p>{sampleQuestions[selectedQuestion]}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-sm">
                                            <p className="text-gray-700 mb-3">
                                                Great question! Based on your location and current soil conditions, I'd recommend...
                                            </p>
                                            <div className="bg-green-50 rounded-lg p-3 text-sm text-gray-700">
                                                <strong className="text-green-700">Pro Tip:</strong> Consider conducting a soil test
                                                first to get the most accurate recommendations for your specific conditions.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-white border-t border-gray-200">
                                    <div className="flex gap-2 mb-3">
                                        {sampleQuestions.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedQuestion(index)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                                    selectedQuestion === index
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                Q{index + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Ask me anything about farming..."
                                            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <button className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-3 rounded-full hover:from-green-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg">
                                            <MessageSquare className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}