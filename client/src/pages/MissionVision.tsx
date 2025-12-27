import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { Target, Eye, ShieldCheck, Users, Star, Globe } from 'lucide-react';

export default function MissionVision() {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isVisionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 🔹 Banner Section */}
      <section
        className="relative h-[320px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url('/assets/fleet-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Our Mission & Vision
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Driven by trust, guided by innovation — redefining travel experiences across India.
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Company' }, { label: 'Mission & Vision' }]} />

      {/* 🔸 Mission Section */}
      <section ref={missionRef} className="py-5 bg-gradient-to-br from-background to-accent/10">
       
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Icon Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative bg-gradient-to-br from-primary/20 to-transparent rounded-full p-16 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <Target className="w-32 h-32 text-primary relative z-10" />
            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To provide safe, reliable, and comfortable travel experiences through technology-driven cab services that reflect calmness, clarity, and trust — inspired by the Moonstone gemstone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider Strip */}
      <div className="bg-primary text-white text-center py-6">
        <p className="text-lg font-semibold">
          Empowering mobility with innovation, reliability, and trust.
        </p>
      </div>

      {/* 🔹 Vision Section */}
      <section ref={visionRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To become the most preferred and trusted cab service brand in India, recognized for excellence, innovation, and customer satisfaction.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We aim to set new benchmarks in the transportation industry through technology, sustainability, and customer-first commitment.
            </p>
            <div className="bg-primary text-white p-6 rounded-lg italic text-lg">
              "We drive the future of mobility — with purpose and precision."
            </div>
          </motion.div>

          {/* Right - Icon Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative bg-gradient-to-br from-primary/20 to-transparent rounded-full p-16 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <Eye className="w-32 h-32 text-primary relative z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔸 Core Values Section */}
      <section ref={valuesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-primary mb-12"
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />,
                title: 'Safety First',
                text: 'Your safety is our topmost priority — every ride, every time.',
              },
              {
                icon: <Users className="w-10 h-10 text-primary mx-auto mb-4" />,
                title: 'Customer Centric',
                text: 'We build trust and satisfaction through personalized service.',
              },
              {
                icon: <Star className="w-10 h-10 text-primary mx-auto mb-4" />,
                title: 'Excellence',
                text: 'We continuously improve to deliver premium experiences to all.',
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition"
              >
                {value.icon}
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <Footer />
    </div>
  );
}
