import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import cityImage from '@assets/stock_images/city_taxi_urban_tran_4b33efc7.jpg';
import fastIcon from '/assets/icons/fast.png';
import reliableIcon from '/assets/icons/reliable.png';
import secureIcon from '/assets/icons/secure.png';

export default function SpotRentals() {
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
            Spot Rentals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Flexible on-demand taxi services for your immediate transportation needs
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Services' }, { label: 'Spot Rentals' }]} />

      {/* Main Section */}
      <section ref={ref} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-primary text-center mb-6"
          >
            Spot Rentals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto"
          >
            Flexible on-demand taxi services for your immediate transportation needs
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our Spot Rental service offers you the flexibility to book a taxi exactly when you need it. Perfect for quick trips, urgent meetings, or spontaneous travel plans within Delhi NCR.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With our extensive fleet and strategic positioning across the city, we ensure minimal waiting time and maximum convenience for all your spot booking requirements.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <span className="text-muted-foreground">Quick 15-minute response time</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <span className="text-muted-foreground">No advance booking required</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <span className="text-muted-foreground">Transparent pricing with no hidden charges</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <span className="text-muted-foreground">Wide range of vehicles to choose from</span>
                </li>
              </ul>
              <a href="/booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-book-spot">
                  Book Spot Rental
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={cityImage}
                alt="Spot Rentals"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 - Why Choose Us */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-12"
          >
            Why Choose Our Spot Rentals?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: fastIcon, title: 'Instant Booking', desc: 'Book your ride in just a few taps and get a taxi instantly.' },
              { icon: reliableIcon, title: 'Reliable Drivers', desc: 'All drivers are verified, trained, and punctual for every ride.' },
              { icon: secureIcon, title: 'Safe & Secure', desc: '24x7 tracking and customer support to ensure your safety.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition"
              >
                <img src={item.icon} alt={item.title} className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* Section 3 - How It Works (with Wave Path Background) */}
<section className="relative py-24 bg-background overflow-hidden">
  {/* Top curved shape */}
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
    <svg
      className="relative block w-[calc(100%+1.3px)] h-[120px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44C189.6,75.46,64,99.3,0,120H1200V0C1130.93,22.72,958.26,58.38,785.88,54.11,617.57,49.96,452.81,37.42,321.39,56.44Z"
        className="fill-primary/10"
      ></path>
    </svg>
  </div>

  <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-primary mb-12"
    >
      How It Works
    </motion.h2>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          step: '1',
          title: 'Choose Pickup Point',
          desc: 'Enter your pickup location and confirm your ride instantly.',
        },
        {
          step: '2',
          title: 'Select Your Car',
          desc: 'Pick from sedans, SUVs, or luxury cars as per your need.',
        },
        {
          step: '3',
          title: 'Ride & Pay',
          desc: 'Enjoy your smooth ride and pay securely via multiple options.',
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl shadow-md p-8 border border-primary/20"
        >
          <div className="text-4xl font-bold text-primary mb-4">{item.step}</div>
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-muted-foreground">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Bottom curved shape */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
    <svg
      className="relative block w-[calc(100%+1.3px)] h-[120px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44C189.6,75.46,64,99.3,0,120H1200V0C1130.93,22.72,958.26,58.38,785.88,54.11,617.57,49.96,452.81,37.42,321.39,56.44Z"
        className="fill-primary/10"
      ></path>
    </svg>
  </div>
</section>


      <Footer />
    </div>
  );
}
