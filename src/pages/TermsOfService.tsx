import Footer from '@/components/Footer';
import { Header } from '@/components/layout/Header';
import { Shield, Users, Wrench, Warehouse, TestTube, MessageSquare, Scale, FileText, AlertCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-green-50 to-emerald-50">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-green-600 hover:shadow-xl transition-shadow duration-300">
          <p className="text-gray-700 leading-relaxed text-lg">
            Welcome to <span className="font-semibold text-green-700">KrishiSanjivni</span>, your trusted partner in modern farming solutions.
            By accessing or using our platform, you agree to these Terms of Service. Please read them carefully to understand your rights and responsibilities.
          </p>
        </div>

        {/* Section 1: Acceptance of Terms */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
              <Shield className="w-7 h-7 text-green-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <div className="space-y-3 text-gray-700">
                <p>By creating an account or using KrishiSanjivni services, you acknowledge that:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>You have read and understood these terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>You are at least 18 years old or have parental consent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>You agree to comply with all applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>You will use the platform responsibly and ethically</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: User Accounts */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
              <Users className="w-7 h-7 text-amber-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. User Accounts and Responsibilities</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-gray-900">Your Account:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Provide accurate and complete registration information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Keep your password secure and confidential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Notify us immediately of any unauthorized access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>You are responsible for all activities under your account</span>
                  </li>
                </ul>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mt-4">
                  <p className="text-sm text-amber-900">
                    <strong>Note:</strong> KrishiSanjivni reserves the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Tool Rental Terms */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
              <Wrench className="w-7 h-7 text-blue-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Tool Rental Terms</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-gray-900">Rental Process:</p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>All tool rentals are subject to availability and confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Renters must inspect equipment before use and report any damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Tools must be returned in the same condition as received</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Late returns may incur additional fees</span>
                  </li>
                </ul>
                <p className="font-semibold text-gray-900">Liability:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Renters are responsible for any damage or loss during rental period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Use tools according to manufacturer guidelines and safety standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Maintain adequate insurance coverage for high-value equipment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Warehouse Booking */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
              <Warehouse className="w-7 h-7 text-orange-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Warehouse Booking Terms</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-gray-900">Storage Guidelines:</p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Book storage space based on accurate capacity requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Only store agricultural products and approved materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Comply with all safety and health regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Access warehouse during designated operating hours</span>
                  </li>
                </ul>
                <p className="font-semibold text-gray-900">Prohibited Items:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Hazardous materials without proper permits and notification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Illegal substances or stolen goods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Perishable goods without appropriate storage arrangements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Soil Analysis Services */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
              <TestTube className="w-7 h-7 text-green-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Soil Analysis Services</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-gray-900">Service Details:</p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Soil samples must be collected according to provided instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Analysis results are provided for informational purposes only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Results typically delivered within 5-7 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Recommendations should be implemented with professional agricultural guidance</span>
                  </li>
                </ul>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-sm text-green-900">
                    <strong>Disclaimer:</strong> While we strive for accuracy, soil analysis results are advisory. Consult with agricultural experts for critical farming decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Community Forum Guidelines */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
              <MessageSquare className="w-7 h-7 text-purple-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Community Forum Guidelines</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-gray-900">Be Respectful:</p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Treat all community members with courtesy and respect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>No harassment, hate speech, or discriminatory content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Share knowledge and experiences to help fellow farmers</span>
                  </li>
                </ul>
                <p className="font-semibold text-gray-900">Prohibited Content:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Spam, advertising, or promotional content without permission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>False or misleading agricultural information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Personal attacks or inflammatory discussions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Sharing personal information of others without consent</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Intellectual Property */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-indigo-100 p-3 rounded-lg flex-shrink-0">
              <FileText className="w-7 h-7 text-indigo-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Intellectual Property</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-gray-900">KrishiSanjivni Content:</p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>All platform content, logos, and trademarks belong to KrishiSanjivni</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Users may not reproduce or distribute our content without permission</span>
                  </li>
                </ul>
                <p className="font-semibold text-gray-900">User Content:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>You retain ownership of content you post or share</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>By posting, you grant KrishiSanjivni a license to use, display, and distribute your content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>You warrant that your content does not infringe on others' rights</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Liability & Disclaimers */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
              <AlertCircle className="w-7 h-7 text-red-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Liability & Disclaimers</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-gray-900">Service Disclaimer:</p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>KrishiSanjivni is a platform connecting farmers and service providers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>We do not guarantee the quality, safety, or legality of third-party services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Users engage with other members at their own risk</span>
                  </li>
                </ul>
                <p className="font-semibold text-gray-900">Limitation of Liability:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>KrishiSanjivni is not liable for indirect, incidental, or consequential damages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Our liability is limited to the amount paid for services in the past 12 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>We are not responsible for losses due to equipment failure, weather, or acts of nature</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Modifications to Terms */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-teal-100 p-3 rounded-lg flex-shrink-0">
              <FileText className="w-7 h-7 text-teal-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Modifications to Terms</h2>
              <div className="space-y-3 text-gray-700">
                <p>KrishiSanjivni reserves the right to update these Terms of Service at any time. When we make changes:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>We will post the updated terms with a new "Last Updated" date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>For significant changes, we will notify users via email or platform notification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>Continued use of the platform after changes constitutes acceptance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>If you disagree with changes, you may terminate your account</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Governing Law */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-slate-100 p-3 rounded-lg flex-shrink-0">
              <Scale className="w-7 h-7 text-slate-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Governing Law</h2>
              <div className="space-y-3 text-gray-700">
                <p>These Terms of Service shall be governed by and construed in accordance with applicable agricultural and commercial laws. Any disputes arising from these terms or your use of KrishiSanjivni shall be resolved through:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-600 mt-1">•</span>
                    <span>Good faith negotiation between parties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-600 mt-1">•</span>
                    <span>Mediation through agricultural dispute resolution services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-600 mt-1">•</span>
                    <span>Binding arbitration if mediation is unsuccessful</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-600 mt-1">•</span>
                    <span>Litigation as a last resort in appropriate jurisdiction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Contact Information */}
        <section className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-white/10 p-3 rounded-lg flex-shrink-0 backdrop-blur-sm">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">11. Contact Information</h2>
              <div className="space-y-3">
                <p className="text-green-50">
                  Have questions about these Terms of Service? We're here to help! Reach out to our support team:
                </p>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm space-y-2">
                  <p><strong>Email:</strong> thakurneerajkumar17@gmail.com</p>
                  <p><strong>Support:</strong> support@krishisanjivni.com</p>
                  <p><strong>Phone:</strong> 8448275790</p>
                  <p><strong>Business Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 mb-8">
  <Link
    to="/contact"
    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
  >
    <Mail className="w-5 h-5" />
    Contact Support
  </Link>

  <Link
    to="/contact"
    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
  >
    <AlertCircle className="w-5 h-5" />
    Report Issue
  </Link>
</div>

        {/* Footer Note */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
          <p className="text-gray-700">
            By using KrishiSanjivni, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
          <p className="text-green-700 font-semibold mt-2">
            Thank you for being part of the KrishiSanjivni community! 🌾
          </p>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default TermsOfService;
