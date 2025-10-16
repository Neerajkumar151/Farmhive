import { Users, MessageCircle, BookOpen, Award} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Users,
    title: 'Expert Network',
    description: 'Connect with agricultural experts, agronomists, and successful farmers from around the world.',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: MessageCircle,
    title: 'Community Forums',
    description: 'Participate in discussions, ask questions, and share your farming experiences with peers.',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: BookOpen,
    title: 'Knowledge Library',
    description: 'Access thousands of articles, guides, and research papers on modern farming techniques.',
    image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: Award,
    title: 'Success Stories',
    description: 'Get inspired by real farmers who transformed their operations using our platform.',
    image: 'https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function Community() {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Join Our Thriving Community
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect, learn, and grow with thousands of farmers and agricultural professionals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <button className="text-green-600 font-semibold hover:text-green-700 transition-colors flex items-center gap-2 group/btn">
                    Explore Now
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Farming?
          </h3>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already benefiting from our community and resources.
          </p>
          <Link to="/auth"><button  className="bg-white hover:bg-gray-50 text-green-700 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Get Started Today
          </button></Link>
        </div>
      </div>
    </section>
  );
}
