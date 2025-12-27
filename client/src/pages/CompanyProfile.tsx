import { motion } from "framer-motion";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Users,
  Car
} from "lucide-react";

import fleetImage1 from "@assets/stock_images/car-image.jpg";


/* ================= ANIMATION VARIANTS ================= */
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const fadeLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};

const fadeRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};

export default function CompanyProfile() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* ================= HERO ================= */}
      <section
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/assets/banner-13.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our Company Profile
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-200 max-w-3xl mx-auto"
          >
            Trusted by businesses and individuals across Delhi NCR for reliable
            transportation services
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Company" }, { label: "Profile" }]} />

      {/* ================= MAIN CONTENT ================= */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4">

          {/* IMAGE + TEXT */}
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">

            {/* LEFT IMAGES */}
            <motion.div
              {...fadeLeft}
              viewport={{ once: true, amount: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={fleetImage1}
                  alt="Fleet"
                  className="w-full rounded-2xl"
                />
              </div>

            
              {/* BADGE */}
              <motion.div
                className="absolute -top-8 -right-8 w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-1" />
                  <div className="text-xs font-bold">Trusted</div>
                  <div className="text-xs text-muted-foreground">Since 2023</div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT TEXT */}
            <motion.div
              {...fadeRight}
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Moonstone Cabs Private Limited is one of the most reputable and
                leading car rental companies in Delhi & NCR. Our growth reflects
                the trust of our valued clients.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                We provide a comprehensive range of transportation solutions for
                corporate and individual needs with complete reliability.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Our trained drivers and modern fleet ensure comfort, safety, and
                convenience across all travel categories.
              </p>
            </motion.div>
          </div>

          {/* ================= WHY CHOOSE US ================= */}
          <section className="py-16 bg-muted/10 rounded-2xl">
            <motion.h2
              {...fadeUp}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-primary mb-12"
            >
              Why Choose Moonstone Cabs?
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
              {[
                {
                  icon: <Car className="w-10 h-10 text-primary" />,
                  title: "Modern Fleet",
                  desc: "Clean, AC, fully insured vehicles."
                },
                {
                  icon: <Users className="w-10 h-10 text-primary" />,
                  title: "Professional Drivers",
                  desc: "Verified & trained chauffeurs."
                },
                {
                  icon: <Clock className="w-10 h-10 text-primary" />,
                  title: "On-Time Pickup",
                  desc: "Punctual service guaranteed."
                },
                {
                  icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                  title: "Safe & Reliable",
                  desc: "GPS-enabled & monitored rides."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
                >
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </section>

      <Footer />
    </div>
  );
}
