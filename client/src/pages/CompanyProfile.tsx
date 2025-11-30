import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CursorFollower from '@/components/CursorFollower';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen">
      <CursorFollower />
      <Header />

      {/* ✅ Banner Section */}
      <section
        className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url('/assets/banner-13.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-6"
          >
            Our Company Profile
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto"
          >
            Trusted by businesses and individuals across Delhi NCR for reliable transportation services
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Company' }, { label: 'Profile' }]} />

      <section ref={ref} className="py-5 bg-background">
         <section
        className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
      >
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

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Side - Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full flex flex-col items-center">
                {/* Big Upper Image */}
                <div className="relative w-full rounded-2xl overflow-hidden">
                  <img
                    src={fleetImage1}
                    alt="Taxi Fleet"
                    className="w-auto h-auto object-cover rounded-2xl"
                  />
                </div>

                {/* Overlapping Smaller Image (slightly right shifted) */}
                <div className="absolute bottom-[-70px] left-[20px] w-[110%] overflow-hidden shadow-xl">
                  <img
                    src={fleetImage2}
                    alt="Professional Service"
                    className="w-auto h-60 object-cover rounded-2xl"
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

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Moonstone Cabs Private Limited is one of the most reputable and leading car rental company in Delhi & NCR. Our rapid growth and continued success are a true reflection of the trust, confidence, and satisfaction of our valued clients.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                We offer a comprehensive range of transportation solutions, catering to both corporate and individual requirements. Our goal is to deliver safe, reliable, and professional travel experiences backed by strong operational excellence and customer-centric values.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Our success is driven by our customer-first approach, highly trained drivers, and a modern fleet of vehicles that meet diverse travel requirements — from daily employee transportation to event logistics and executive travel.
              </motion.p>
            </motion.div>
          </div>

          {/* 🚘 NEW SECTION — Why Choose Us */}
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
                  title: 'Modern Fleet',
                  desc: 'Experience comfort with our clean, air-conditioned, and fully insured cars.',
                },
                {
                  icon: <Users className="w-10 h-10 text-primary" />,
                  title: 'Professional Drivers',
                  desc: 'All our chauffeurs are background-checked and trained for top-notch service.',
                },
                {
                  icon: <Clock className="w-10 h-10 text-primary" />,
                  title: 'On-Time Guarantee',
                  desc: 'We value your time — punctual pickups and smooth travel every time.',
                },
                {
                  icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                  title: 'Safe & Reliable',
                  desc: 'Your safety is our top priority, ensured by GPS-tracked vehicles.',
                },
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

          {/* Highlight Strip */}
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
      
       {/* 🧭 CLIENT COMPANY LOGOS CAROUSEL (Continuous Scroll) */}
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
                  We collaborate with leading organizations who rely on our luxury transport solutions for their teams and events.
                </motion.p>
      
                {/* ✅ Continuous Scrolling Logos */}
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
                        className="flex-shrink-0 w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center border border-border"
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


            <section className="relative bg-[#1d64fe] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        {/* LEFT CONTENT */}
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
          {/* FEATURES LIST */}
          <div className="mt-8 space-y-3">
            {[
              "Easy payment systems.",
              "Make safety a top priority.",
              "First and quick pickups.",
              "Access Ridek globally.",
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
        <div className="md:w-1/2 mt-10 md:mt-0   relative flex justify-center">
          <img
            src={personImage}
            alt="Ridek Taxi Service"
            className="w-full max-w-md object-cover z-10"
          />
          {/* Optional Background Shape */}
          <div className="absolute top-0 right-0 w-[120%] h-full bg-[#1d5dfe] -z-10"></div>
        </div>
      </div>
    </section>
{/* Company Growth / Vision Section */}
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
      From a small local cab service to one of the most trusted transport providers in Delhi NCR — 
      our journey has been built on reliability, customer trust, and an unwavering commitment to excellence.  
      As we move forward, our goal is to redefine urban travel with smart, sustainable, and seamless experiences.
    </motion.p>

    {/* Stats Section */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <h3 className="text-5xl font-bold text-primary mb-2">500+</h3>
        <p className="text-muted-foreground font-medium">Corporate Clients</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center"
      >
        <h3 className="text-5xl font-bold text-primary mb-2">2M+</h3>
        <p className="text-muted-foreground font-medium">Rides Completed</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col items-center"
      >
        <h3 className="text-5xl font-bold text-primary mb-2">98%</h3>
        <p className="text-muted-foreground font-medium">Customer Satisfaction</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col items-center"
      >
        <h3 className="text-5xl font-bold text-primary mb-2">24x7</h3>
        <p className="text-muted-foreground font-medium">Support Availability</p>
      </motion.div>
    </div>
  </div>

  {/* Decorative Gradient Circles */}
  <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl"></div>
</section>

      <Footer />
    </div>
  );
}
