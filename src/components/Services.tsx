
import { Wrench, Warehouse, FlaskConical, Sprout, Bot, Users } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Smart Farming Tools',
    description:
      'Rent or book modern farming tools and machines easily. From tractors to seeders, access affordable equipment anytime through KrishiSanjivni.',
    color: 'from-green-500 to-lime-600',
  },
  {
    icon: Warehouse,
    title: 'Warehouse Booking & Storage',
    description:
      'Book secure, climate-controlled warehouses for safe crop storage. Track your warehouse bookings and manage availability online.',
    color: 'from-emerald-500 to-green-700',
  },
  {
    icon: FlaskConical,
    title: 'Soil Health & Fertility Testing',
    description:
      'Submit your soil samples for analysis and receive accurate reports on nutrients, pH, and moisture — helping you plan better crops and fertilizers.',
    color: 'from-yellow-600 to-amber-700',
  },
  {
    icon: Sprout,
    title: 'AI-Based Soil & Crop Insights',
    description:
      'Use our AI-powered Soil Check system to understand soil quality and get real-time recommendations for crop growth and sustainability.',
    color: 'from-green-600 to-teal-700',
  },
  {
    icon: Bot,
    title: 'KrishiSanjivni AI Chatbot',
    description:
      'Get 24/7 farming assistance — weather updates, government scheme information, loan eligibility, and expert advice right from your chatbot.',
    color: 'from-emerald-500 to-green-700',
  },
  {
    icon: Users,
    title: 'Farmer Community & Support',
    description:
      'Join a growing community of farmers, share experiences, and get help from agricultural experts and peers across the KrishiSanjivni network.',
    color: 'from-orange-500 to-yellow-600',
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Empowering Farmers with Smart Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            KrishiSanjivni simplifies every aspect of modern agriculture — from soil health to storage and AI assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
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
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{service.description}</p>

                <button className="mt-6 text-green-600 font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
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

