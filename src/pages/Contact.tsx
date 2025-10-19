import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import toast, { Toaster } from "react-hot-toast"; // ✅ import toast

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Fetch logged-in user info
  useEffect(() => {
    const getUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        setUser({
          name: currentUser.user_metadata?.full_name || "",
          email: currentUser.email || "",
        });
        setFormData((prev) => ({
          ...prev,
          name: currentUser.user_metadata?.full_name || "",
          email: currentUser.email || "",
        }));
      }
    };
    getUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      toast.error(t("toast.messageEmpty", "Message cannot be empty!")); // ✅ Wrapped
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert([{
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }]);
    setLoading(false);
    if (error) {
      toast.error(t("toast.submitFailed", "Failed to submit: ") + error.message); // ✅ Wrapped
    } else {
      toast.success(t("toast.submitSuccess", "Message submitted successfully!")); // ✅ Wrapped
      setFormData({ ...formData, message: "" });
    }
  };

  return (
    <Layout>
      {/* 🔹 Toast container */}
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* 🌾 Hero Section */}
      <section className="relative bg-gradient-to-r from-green-100 via-white to-green-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80')] opacity-20 bg-cover bg-center"></div>
        <div className="container relative mx-auto text-center px-6 max-w-3xl">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("contact.title", "Get in Touch with KrishiSanjivni")}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t("contact.subtitle", "We’re here to help you grow your success with technology and innovation.")}
          </p>
          <Button className="bg-primary text-white px-6 py-3 rounded-md text-lg hover:bg-primary/90 transition">
            {t("contact.button", "Contact Us Today")}
          </Button>
        </div>
      </section>

      {/* 🧭 Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            {/* Location */}
            <div className="group bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition">
              <MapPin className="h-10 w-10 mx-auto text-primary mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold mb-2">{t("contact.location", "Our Location")}</h3>
              <p className="text-gray-600">
                {t("contact.address", "Noida, Uttar Pradesh, India")}
              </p>
            </div>

            {/* Phone */}
            <div className="group bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition">
              <Phone className="h-10 w-10 mx-auto text-primary mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold mb-2">{t("contact.call", "Call Us")}</h3>
              <a
                href="tel:+918448275790"
                className="text-gray-600 hover:text-primary transition"
              >
                +91 84482 75790
              </a>
            </div>

            {/* Email */}
            <div className="group bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition">
              <Mail className="h-10 w-10 mx-auto text-primary mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold mb-2">{t("contact.email", "Email Us")}</h3>
              <a
                href="mailto:thakurneerajkumar17@gmail.com"
                className="text-gray-600 hover:text-primary transition"
              >
                thakurneerajkumar17@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 📩 Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card className="shadow-lg border border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center font-bold">
                {t("contact.form", "Send Us a Message")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-10">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("form.name", "Your Name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    readOnly
                    className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("form.email", "Your Email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("form.message", "Your Message")}
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder={t("form.placeholder", "Write your message...")} // ✅ Wrapped
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full text-lg py-3" disabled={loading}>
                  {t("form.submit", "Send Message")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 🗺️ Embedded Map */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <iframe
            title={t("contact.mapTitle", "KrishiSanjivni Location")} // ✅ Wrapped
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.387747729072!2d77.38970627508947!3d28.62773478422248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce59f6e2c07b5%3A0xb2e2a356b29d0487!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1697101017083!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl shadow-md"
          ></iframe>
        </div>
      </section>

      {/* 🌿 Footer */}
      <Footer />
    </Layout>
  );
};

export default Contact;