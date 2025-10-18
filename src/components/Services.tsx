import { Wrench, Warehouse, FlaskConical, Sprout, Bot, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Import useTranslation

// Define service features using translation keys
const servicesKeys = [
    {
        key: 'smart_tools',
        icon: Wrench,
        color: 'from-green-500 to-lime-600',
    },
    {
        key: 'warehouse_booking',
        icon: Warehouse,
        color: 'from-emerald-500 to-green-700',
    },
    {
        key: 'soil_testing',
        icon: FlaskConical,
        color: 'from-yellow-600 to-amber-700',
    },
    {
        key: 'ai_insights',
        icon: Sprout,
        color: 'from-green-600 to-teal-700',
    },
    {
        key: 'ai_chatbot',
        icon: Bot,
        color: 'from-emerald-500 to-green-700',
    },
    {
        key: 'farmer_community',
        icon: Users,
        color: 'from-orange-500 to-yellow-600',
    },
];

export default function Services() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        {t('services_section.title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('services_section.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesKeys.map((service, index) => {
                        const Icon = service.icon;
                        const titleKey = `services_section.features.${service.key}_title`;
                        const descriptionKey = `services_section.features.${service.key}_description`;
                        const buttonKey = 'services_section.learn_more';

                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-2"
                            >
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                                >
                                    <Icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                                    {t(titleKey)}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">{t(descriptionKey)}</p>

                                <button className="mt-6 text-green-600 font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {t(buttonKey)}
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}