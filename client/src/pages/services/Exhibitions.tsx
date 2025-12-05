import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import businessImage from '/assets/business_executive.jpg';
import fleetSedan from '/assets/fleet_sedan.jpg';
import fleetMiniCoach from '/assets/Mercedes.jpg';
import fleetBus from '/assets/Rolls Royce Cullinan.jpg';
import coordinationImage from '/assets/event_coordination.jpg';
import brandsImage from '/assets/clients_showcase.jpg';

export default function Exhibitions() {
  // REF for lower sections
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // NEW REF for HERO section so hero animations trigger correctly
  const topRef = useRef(null);
  const topInView = useInView(topRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section (now uses topRef/topInView) */}
      <section
        ref={topRef}
        className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url('/assets/career-banner.jpg')",
        }}
        aria-label="Events & Exhibitions hero"
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Events & Exhibitions Transportation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Comprehensive transportation solutions for corporate events, exhibitions, and conferences
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Services' }, { label: 'Events & Exhibitions' }]} />

      {/* Main Section */}
      <section ref={ref} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-primary text-center mb-6"
          >
            Events & Exhibitions Transportation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto"
          >
            Comprehensive transportation solutions for corporate events, exhibitions, and conferences
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <img
                src={businessImage}
                alt="Attendees boarding shuttle"
                loading="lazy"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Managing logistics for large-scale events and exhibitions requires precision and reliability. Our specialized event transportation services ensure seamless mobility for your attendees, speakers, and VIP guests.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With experience handling corporate conferences, trade shows, and international exhibitions, we provide end-to-end transportation management tailored to your event's unique requirements.
              </p>

              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Event Services Include:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">Shuttle services for large groups</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">VIP and executive transportation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">Airport pickup and drop services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">On-site event coordination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">Real-time tracking and updates</span>
                  </li>
                </ul>
              </div>

              <a href="/booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-book-event">
                  Book Event Transportation
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Our Event Transportation?</h2>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li>✅ Experienced event logistics experts</li>
              <li>✅ Dedicated on-site coordinators</li>
              <li>✅ Luxury and comfortable vehicle options</li>
              <li>✅ Flexible scheduling for multiple venues</li>
              <li>✅ 24/7 support throughout your event</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={coordinationImage}
              alt="Onsite event coordination"
              loading="lazy"
              className="rounded-lg shadow-xl w-full h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 3: Fleet Options */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-10"
          >
            Our Fleet Options for Events
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Luxury Sedans', desc: 'Ideal for VIP and executive guests', img: fleetSedan },
              { title: 'Rang Rover', desc: 'Perfect for small to medium groups', img: fleetMiniCoach },
              { title: 'Rolls Royce', desc: 'For large delegations and groups', img: fleetBus },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-card border border-card-border rounded-lg p-8 shadow-lg"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="rounded-lg mb-4 h-48 w-full object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Trusted by Leading Brands */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-8"
          >
            Trusted by Leading Brands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-3xl mx-auto mb-10"
          >
            We proudly serve top organizations, corporate clients, and global event planners ensuring every transport runs on schedule.
          </motion.p>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={brandsImage}
            alt="Client Brands"
            loading="lazy"
            className="mx-auto rounded-lg shadow-lg w-full max-w-4xl object-cover"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
