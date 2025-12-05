import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Briefcase, Users, Star } from "lucide-react";

const clientTypes = [
  {
    icon: Building2,
    title: "Corporate Clients",
    description:
      "Leading companies trust us for employee transportation and executive travel",
    count: "50+",
  },
  {
    icon: Briefcase,
    title: "Business Professionals",
    description:
      "Entrepreneurs and executives rely on our premium services",
    count: "200+",
  },
  {
    icon: Users,
    title: "Event Organizers",
    description:
      "Major events and exhibitions choose our logistics expertise",
    count: "100+",
  },
  {
    icon: Star,
    title: "Individual Customers",
    description:
      "Thousands of satisfied customers for personal transportation",
    count: "5000+",
  },
];

const clientLogos = [
  "/assets/clients/hcl.png",
  "/assets/clients/Accenture.svg.png",
  "/assets/clients/globeop.png",
  "/assets/clients/ey.png",
  "/assets/clients/orange.png",
  "/assets/clients/smc.png",
  "/assets/clients/selectcab.jpeg",
];

export default function Clients() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // 🔥 NEW REF FOR TOP SECTION
  const topRef = useRef(null);
  const topInView = useInView(topRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen">
      <Header />

      {/* TOP BANNER SECTION */}
      <section
        className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('/assets/client-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Our Valued Clients
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Trusted by businesses and individuals across Delhi NCR for reliable transportation services
          </motion.p>
        </div>
      </section>

      {/* MID SECTION with duplicate heading – NOW FIXED */}
      <section className="py-5 bg-background">
        <section
          ref={topRef}
          className="relative flex flex-col items-center justify-center text-center"
        >
          <div className="relative z-10 px-4 py-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={topInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-primary mb-3"
            >
              Our Valued Clients
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={topInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
            >
              Trusted by businesses and individuals across Delhi NCR for reliable transportation services
            </motion.p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="/assets/luxury-ride.jpg"
              alt="Luxury Ride"
              className="rounded-2xl shadow-lg w-full h-[350px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold">
              10+ Years of Excellence
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Experience the Future of Premium Travel
            </h2>
            <p className="text-muted-foreground mb-6">
              We redefine luxury on wheels with our modern fleet, professional chauffeurs, and unmatched comfort.
            </p>

            <ul className="space-y-3 text-muted-foreground">
              <li>✅ Certified Chauffeurs with 5-star ratings</li>
              <li>✅ 24x7 Support & On-Time Guarantee</li>
              <li>✅ GPS-tracked vehicles for safety</li>
              <li>✅ Custom corporate transport plans</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CLIENT TYPES SECTION */}
      <section ref={ref} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientTypes.map((client, index) => {
              const Icon = client.icon;
              return (
                <motion.div
                  key={client.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-card border border-card-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{client.count}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{client.title}</h3>
                  <p className="text-muted-foreground text-sm">{client.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-xl text-muted-foreground mb-8">
              Join our growing list of satisfied customers and experience premium transportation services
            </p>
            <a href="/booking">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-semibold">
                Book Your Ride
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* LOGO SCROLLER SECTION */}
      <section className="py-16 bg-muted/20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-foreground mb-6"
          >
            Our Trusted Partners
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            We work with leading companies who rely on our premium transport solutions.
          </motion.p>

          {/* Continuous Logo Scroll */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-16"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 35,
                ease: "linear",
              }}
            >
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center border"
                >
                  <img
                    src={logo}
                    alt={`Client ${index}`}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
