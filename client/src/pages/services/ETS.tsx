import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CursorFollower from '@/components/CursorFollower';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Clock, Shield, Users, Zap, Building2, MapPin, Headphones } from 'lucide-react';
import businessImage from '@assets/stock_images/business_executive_t_269463ec.jpg';
import transportImage from '/assets/bus_service.jpg';


const features = [
  { icon: Clock, title: 'Punctual Service', description: 'On-time pickup and drop for employee commutes' },
  { icon: Shield, title: 'Safe & Secure', description: 'GPS tracking and verified drivers for employee safety' },
  { icon: Users, title: 'Flexible Routes', description: 'Customizable routes based on employee locations' },
  { icon: Zap, title: 'Quick Response', description: 'Fast deployment and responsive customer support' },
];

export default function ETS() {
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
            Employee Transportation Services (ETS)
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Reliable, safe, and efficient employee transportation solutions for corporate clients
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Services' }, { label: 'Employee Transportation (ETS)' }]} />

      {/* Section 1 - Introduction */}
      <section ref={ref} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-primary text-center mb-6"
          >
            Employee Transportation Services (ETS)
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto"
          >
            Reliable, safe, and efficient employee transportation solutions for corporate clients
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <img
                src={businessImage}
                alt="Employee Transportation"
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
                Our Employee Transportation Services (ETS) provide comprehensive transport solutions for organizations looking to ensure safe and timely commutes for their workforce.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We understand the importance of employee well-being and productivity, which is why we offer customizable, reliable, and professional transportation services tailored to your organization's needs.
              </p>
              <a href="/booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-book-ets">
                  Book ETS Service
                </Button>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-card border border-card-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Section 2 - Why Choose ETS */}
      <section className="relative py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Why Choose Our ETS Solutions?</h2>
            <p className="text-muted-foreground mb-6">
              We provide top-notch employee transportation management using advanced routing systems, safety protocols, and real-time monitoring.
            </p>
            <ul className="space-y-4 text-lg">
              <li>✅ Real-time vehicle tracking and route optimization</li>
              <li>✅ 24x7 customer support and emergency assistance</li>
              <li>✅ Professional drivers and well-maintained fleet</li>
              <li>✅ Monthly performance reports for corporates</li>
            </ul>
            <Button className="mt-8 bg-primary hover:bg-primary/90">Learn More</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={transportImage}
              alt="Corporate Transport"
              className="rounded-xl shadow-lg w-full h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Our Process */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-12"
          >
            Our Process
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Building2, title: 'Corporate Onboarding', desc: 'We analyze company routes, shifts, and staff locations.' },
              { icon: MapPin, title: 'Route Planning', desc: 'Our system generates efficient and safe routes for all employees.' },
              { icon: Headphones, title: 'Live Monitoring', desc: '24x7 tracking, updates, and support during all rides.' },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl shadow-md p-8 border border-primary/20"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-12">
            <a href="/booking">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Book Your Ride
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
