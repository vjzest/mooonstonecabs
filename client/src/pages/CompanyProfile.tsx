import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import { ArrowRight } from "lucide-react";
import Footer from '@/components/Footer';
import { MapPin, Clock, ShieldCheck, Users, Car } from 'lucide-react';
import fleetImage1 from '@assets/stock_images/abus-pic.jpg';
import fleetImage2 from '@assets/stock_images/car-pic1.png';
import personImage from "/assets/cta-men1.png";

const clientLogos = [
  '/assets/clients/hcl.png',
  '/assets/clients/Accenture.svg.png',
  '/assets/clients/globeop.png',
  '/assets/clients/ey.png',
  '/assets/clients/orange.png',
  '/assets/clients/smc.png',
  '/assets/clients/selectcab.jpeg'
];

export default function CompanyProfile() {
  // Lower Section Trigger
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // ⭐ FIXED — Hero Section Trigger
  const topRef = useRef(null);
  const topInView = useInView(topRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen">
      <Header />

      {/* ⭐ FIXED — HERO Section with topRef */}
      <section
        ref={topRef}
        className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('/assets/banner-13.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-6"
          >
            Our Company Profile
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto"
          >
            Trusted by businesses and individuals across Delhi NCR for reliable transportation services
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Company' }, { label: 'Profile' }]} />

      {/* ⭐ MAIN SECTION */}
      <section ref={ref} className="py-5 bg-background">

        {/* Duplicate Heading (now animated correctly with isInView) */}
        <section className="relative h-[300px] flex flex-col items-center justify-center text-center">
          <div className="relative z-10 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-primary mb-3"
            >
              Our Company Profile
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
            >
              Trusted by businesses and individuals across Delhi NCR for reliable transportation services
            </motion.p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4">

          {/* MAIN IMAGE + CONTENT BLOCK */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">

            {/* LEFT IMAGES */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full flex flex-col items-center">
                <div className="relative w-full rounded-2xl overflow-hidden">
                  <img src={fleetImage1} alt="Taxi Fleet" className="w-full h-auto rounded-2xl" />
                </div>

                <div className="absolute bottom-[-70px] left-[20px] w-[110%] overflow-hidden shadow-xl">
                  <img
                    src={fleetImage2}
                    alt="Professional Service"
                    className="w-full h-60 object-cover rounded-2xl"
                  />
                </div>
              </div>

              {/* Rotating Badge */}
              <motion.div
                className="absolute -top-8 -right-8 w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-1" />
                  <div className="text-xs font-bold text-foreground">Trusted</div>
                  <div className="text-xs text-muted-foreground">Since 2025</div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {[
                "Moonstone Cabs Private Limited is one of the most reputable and leading car rental company in Delhi & NCR. Our rapid growth and continued success reflect the trust of our valued clients.",
                "We provide a comprehensive range of transportation solutions, catering to both corporate and individual needs with complete reliability.",
                "Our customer-first approach, trained drivers, and modern fleet ensure comfort, safety & convenience across all travel categories."
              ].map((text, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 * idx }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>
          </div>

          {/* WHY CHOOSE US */}
          <section className="py-16 bg-muted/10 rounded-2xl mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center text-primary mb-12"
            >
              Why Choose Moonstone Cabs?
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
              {[
                {
                  icon: <Car className="w-10 h-10 text-primary" />,
                  title: "Modern Fleet",
                  desc: "Clean, AC, fully insured vehicles for all travel needs."
                },
                {
                  icon: <Users className="w-10 h-10 text-primary" />,
                  title: "Professional Drivers",
                  desc: "Background-checked & highly trained chauffeurs."
                },
                {
                  icon: <Clock className="w-10 h-10 text-primary" />,
                  title: "On-Time Guarantee",
                  desc: "We ensure punctual pickups every time."
                },
                {
                  icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                  title: "Safe & Reliable",
                  desc: "GPS-tracked rides with 24x7 safety monitoring."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* HIGHLIGHT STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-primary text-white text-center py-8 px-6 rounded-lg"
          >
            <p className="text-xl md:text-2xl font-semibold">
              Delivering comfort, reliability, and excellence — every mile, every ride.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LOGO CAROUSEL */}
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
            We work with leading Indian and global organizations who trust our premium travel solutions.
          </motion.p>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-16"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            >
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center border border-border"
                >
                  <img src={logo} alt={`Client ${index}`} className="w-16 h-16 object-contain" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* BLUE CTA SECTION */}
      <section className="relative bg-[#1d64fe] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">

          {/* LEFT */}
          <div className="md:w-1/2 space-y-6">
            <p className="text-sm uppercase tracking-wider font-semibold opacity-90">
              MOONSTONE TAXI SERVICES!
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Feel your journey with <br /> <span className="text-white">MoonStone!</span>
            </h2>
            <a href="/booking">
              <button className="mt-6 px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-all">
                Book a Taxi
              </button>
            </a>

            <div className="mt-8 space-y-3">
              {[
                "Easy payment systems.",
                "Make safety a top priority.",
                "First and quick pickups.",
                "Access Ridek globally."
              ].map((text, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-black p-1 rounded-sm">
                    <ArrowRight size={18} className="text-white" />
                  </div>
                  <p className="font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
            <img src={personImage} alt="Taxi Service" className="w-full max-w-md object-cover z-10" />
            <div className="absolute top-0 right-0 w-[120%] h-full bg-[#1d5dfe] -z-10"></div>
          </div>
        </div>
      </section>

      {/* COMPANY GROWTH / VISION */}
      <section className="relative py-24 bg-gradient-to-r from-orange-50 via-white to-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold mb-6 text-foreground"
          >
            Our <span className="text-primary">Journey & Vision Ahead</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed mb-16"
          >
            From a small cab service to a leading transport company in Delhi NCR —
            our journey is built on customer trust, reliability, and excellence.
            We aim to redefine urban mobility with smarter, safer, and sustainable travel.
          </motion.p>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {[
              { number: "500+", label: "Corporate Clients" },
              { number: "2M+", label: "Rides Completed" },
              { number: "98%", label: "Customer Satisfaction" },
              { number: "24x7", label: "Support Availability" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-5xl font-bold text-primary mb-2">{item.number}</h3>
                <p className="text-muted-foreground font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl"></div>
      </section>

      <Footer />
    </div>
  );
}
