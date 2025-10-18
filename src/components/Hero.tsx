import { ArrowRight, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

export default function Hero() {
    const { t } = useTranslation(); // Initialize the hook

    // Define stats using translation keys for both number and label
    const statsKeys = [
        { numKey: 'hero_section.stats.farmers_count', labelKey: 'hero_section.stats.farmers_label' },
        { numKey: 'hero_section.stats.advisors_count', labelKey: 'hero_section.stats.advisors_label' },
        { numKey: 'hero_section.stats.success_count', labelKey: 'hero_section.stats.success_label' },
        { numKey: 'hero_section.stats.ai_support_count', labelKey: 'hero_section.stats.ai_support_label' }
    ];

    return (
        <section className="relative bg-gradient-to-br from-emerald-50 via-amber-50 to-green-50 pt-0 pb-32">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMTZhMzRhIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-40"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-8 animate-fade-in">
                        <Sprout className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">{t('hero_section.tag')}</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-0 leading-tight animate-slide-up">
                        {t('hero_section.title_part1')}
                        <span 
                            className=" h-32 block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700"
                        >
                            {t('hero_section.title_part2')}
                        </span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-gray-700 mb-10 mt-0 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay">
                        {t('hero_section.subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay">
                        <Link to="/community/chat">
                            <button className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                                {t('hero_section.button_join')}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link to="/">
                            <button className="bg-white hover:bg-gray-50 text-green-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-green-600">
                                {t('hero_section.button_explore')}
                            </button>
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
                        {statsKeys.map((stat, index) => (
                            <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-3xl font-bold text-green-700 mb-1">{t(stat.numKey)}</div>
                                <div className="text-sm text-gray-600 font-medium">{t(stat.labelKey)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}