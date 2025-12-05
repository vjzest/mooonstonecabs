import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import fleetImage from '/assets/lamborghini.jpg';
import corporateFleet from '/assets/business_executive.jpg';
import comfortRide from '/assets/Hyundai Verna.avif';

export default function MonthlyRentals() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen">
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
            Monthly & Long-Term Rentals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Cost-effective long-term car rental solutions for extended stays and projects
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Services' }, { label: 'Monthly & Long-Term Rentals' }]} />

      {/* Section 1 - Intro & Packages */}
      <section ref={ref} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-primary text-center mb-6"
          >
            Monthly & Long-Term Rentals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto"
          >
            Cost-effective long-term car rental solutions for extended stays and projects.
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <img
                src={fleetImage}
                alt="Monthly Rentals"
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
                Our monthly and long-term rental packages are designed for individuals and businesses requiring continuous transportation services over extended periods.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're on a long project, extended business trip, or need a dedicated vehicle for regular use, our flexible rental plans offer unmatched value and convenience.
              </p>
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Package Benefits:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">Significant cost savings on monthly packages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">Dedicated vehicle and driver</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">Flexible usage hours and unlimited kilometers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">Free maintenance and insurance coverage</span>
                  </li>
                </ul>
              </div>
              <a href="/booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-book-monthly">
                  Book Monthly Rental
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 - Corporate & Business Plans */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Corporate & Business Rental Plans
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Our long-term corporate plans are ideal for startups, executives, and companies needing reliable fleet solutions without ownership hassle.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li>✓ Monthly billing and tax benefits for businesses</li>
              <li>✓ Fleet customization for staff transportation</li>
              <li>✓ 24/7 support and priority replacement service</li>
              <li>✓ Branded car options for professional events</li>
            </ul>
            <div className="mt-6">
              <a href="/contact">
              <Button  size="lg" className="bg-primary hover:bg-primary/90">
                Explore Corporate Plans
              </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={corporateFleet}
              alt="Corporate Fleet"
              className="rounded-2xl shadow-lg w-full h-[450px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Why Choose Monthly Rentals */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={comfortRide}
              alt="Comfort Ride"
              className="rounded-2xl shadow-lg w-full h-[450px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-primary">Why Choose Our Long-Term Rentals?</h2>
            <p className="text-lg text-muted-foreground">
              Avoid the costs and responsibilities of car ownership. With our monthly rental program, you get all the perks — none of the stress.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              <li className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
                <h4 className="font-semibold text-primary mb-1">No Maintenance Costs</h4>
                <p className="text-sm text-muted-foreground">We handle servicing, cleaning, and maintenance.</p>
              </li>
              <li className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
                <h4 className="font-semibold text-primary mb-1">Flexible Upgrades</h4>
                <p className="text-sm text-muted-foreground">Switch or upgrade your car anytime with ease.</p>
              </li>
              <li className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
                <h4 className="font-semibold text-primary mb-1">Unlimited KM Plans</h4>
                <p className="text-sm text-muted-foreground">Perfect for daily commutes or cross-city trips.</p>
              </li>
              <li className="bg-white border border-gray-100 rounded-lg shadow-sm p-4">
                <h4 className="font-semibold text-primary mb-1">Doorstep Pickup & Drop</h4>
                <p className="text-sm text-muted-foreground">Convenient car delivery and collection service.</p>
              </li>
            </ul>
            <div>
              <a href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get a Custom Quote
              </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
