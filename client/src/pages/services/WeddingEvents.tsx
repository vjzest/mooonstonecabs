import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CursorFollower from '@/components/CursorFollower';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import luxuryImage from '/assets/Rolls Royce Cullinan.jpg';
import coupleCar from '/assets/wedding_couple_car.jpg';
import eventFleet from '/assets/luxury_fleet_event.jpg';

export default function WeddingEvents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen">
      <CursorFollower />
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url('/assets/career-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Wedding & Special Event Rentals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Make your special day even more memorable with our luxury car rental services
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Services' }, { label: 'Wedding & Special Event Rentals' }]} />

      {/* Section 1 - Overview */}
      <section ref={ref} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-primary text-center mb-6"
          >
            Wedding & Special Event Rentals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto"
          >
            Add a touch of elegance and sophistication to your wedding or special event with our premium luxury car rental services.
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                From vintage classics to modern luxury sedans, our wedding car rental service ensures you arrive in style and make a lasting impression.
              </p>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Our Wedding Services Include:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Luxury and vintage car options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Professional chauffeur service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Car decoration and styling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Flexible booking for multiple events</span>
                  </li>
                </ul>
              </div>
              <a href="/booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Book Wedding Service
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={luxuryImage}
                alt="Wedding Luxury Car"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 - Luxury Experience */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <img
              src={coupleCar}
              alt="Couple Wedding Car"
              className="rounded-2xl shadow-lg w-full h-[450px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <h2 className="text-3xl font-bold text-primary">An Experience of Pure Luxury</h2>
            <p className="text-lg text-muted-foreground">
              Arrive like royalty with our elegant cars that redefine comfort and style. Our chauffeurs are trained for professional, polite, and punctual service — ensuring a stress-free and majestic entry to your event.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ Red carpet service for couples</li>
              <li>✓ Custom music and in-car ambiance setup</li>
              <li>✓ Fully air-conditioned luxury interiors</li>
              <li>✓ Complimentary refreshments and decor options</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Event Fleet */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-primary">Fleet for Every Occasion</h2>
            <p className="text-lg text-muted-foreground">
              Whether it’s a destination wedding, anniversary celebration, or red-carpet corporate event — our diverse fleet has the perfect vehicle to match your style and theme.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-5 shadow-md">
                <h4 className="font-semibold text-primary mb-2">Luxury Sedans</h4>
                <p className="text-sm text-muted-foreground">Mercedes, BMW, Audi for a sleek and elegant arrival.</p>
              </div>
              <div className="bg-white rounded-lg p-5 shadow-md">
                <h4 className="font-semibold text-primary mb-2">Vintage Cars</h4>
                <p className="text-sm text-muted-foreground">Classic Rolls Royce & Ambassador for timeless charm.</p>
              </div>
              <div className="bg-white rounded-lg p-5 shadow-md">
                <h4 className="font-semibold text-primary mb-2">SUVs & Limos</h4>
                <p className="text-sm text-muted-foreground">Spacious and bold — perfect for large family entries.</p>
              </div>
              <div className="bg-white rounded-lg p-5 shadow-md">
                <h4 className="font-semibold text-primary mb-2">Customized Decor</h4>
                <p className="text-sm text-muted-foreground">Floral, thematic, or minimal — we tailor it your way.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={eventFleet}
              alt="Event Fleet"
              className="rounded-2xl shadow-lg w-full h-[450px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
