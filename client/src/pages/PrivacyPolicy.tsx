import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye } from "lucide-react";

/* ===== SIMPLE POLICY SECTIONS (POINTS) ===== */
const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    points: [
      "Personal information such as your name, phone number, and email address for booking and communication purposes",
      "Location data to facilitate accurate pickup and drop-off services",
      "Payment information to securely process transactions"
    ]
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    points: [
      "Provide, operate, and improve our services",
      "Process bookings, payments, and related transactions",
      "Communicate with you regarding your rides, bookings, or service updates",
      "Comply with applicable legal and regulatory requirements"
    ]
  },
  {
    icon: Shield,
    title: "Data Security",
    points: [
      "We implement industry-standard technical and organizational security measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction"
    ]
  }
];

export default function PrivacyPolicy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative py-4 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-primary mb-2"
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl text-center"
        >
          Your privacy is important to us
        </motion.p>
      </section>

      {/* ===== CONTENT ===== */}
      <section ref={ref} className="py-6">
        <div className="max-w-4xl mx-auto px-4">

          {/* INTRO */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground text-lg leading-relaxed mb-12 text-center"
          >
            Moonstone Cabs Private Limited is committed to safeguarding your privacy
            and protecting your personal information.
          </motion.p>

          {/* SECTIONS WITH POINTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {section.title}
                  </h3>

                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm leading-relaxed">
                    {section.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground mb-2">
              If you have any questions or concerns regarding our privacy practices,
              please contact us at:
            </p>
            <p className="text-muted-foreground font-medium">
              📧 contact@moonstonecabs.com
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
