import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, Clock } from "lucide-react";

/* ================= FAQ DATA ================= */
const faqs = [
  {
    question: "How do I book a taxi?",
    answer:
      "You can book a taxi using our online booking form on the homepage or by calling our customer support number."
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, credit/debit cards, and popular digital payment options."
  },
  {
    question: "How can I track my ride?",
    answer:
      "All our vehicles are GPS-enabled, allowing real-time ride tracking for your convenience."
  },
  {
    question: "What if I need to cancel my booking?",
    answer:
      "Please contact our support team as soon as possible for cancellation assistance."
  }
];

/* ================= SUPPORT METHODS ================= */
const supportMethods = [
  {
    icon: Phone,
    title: "Call Us",
    content: "+91-9536575768",
    description: "Available 24/7 for immediate assistance"
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "contact@moonstonecabs.com",
    description: "Quick response from our support team"
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "24 × 7",
    description: "We’re always here to help you"
  }
];

export default function Help() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen">
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[160px] flex flex-col items-center justify-center text-center bg-background">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-primary mb-2"
        >
          Help Center
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 text-lg max-w-2xl"
        >
          We’re here to help you with booking, managing your ride, and all service-related queries.
        </motion.p>
      </section>

      {/* ================= SUPPORT METHODS ================= */}
      <section ref={ref} className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-primary text-center mb-12"
          >
            Need Immediate Assistance?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {supportMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                  <p className="text-primary font-medium mb-1">{method.content}</p>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FAQs ================= */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-primary text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
