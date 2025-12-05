import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin } from 'lucide-react';
import fleetImage1 from '@assets/stock_images/abus-pic.jpg';
import fleetImage2 from '@assets/stock_images/car-pic1.png';
export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center mb-12 sm:mb-16"
        >
          About Our Company
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Images with Badge */}
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

                {/* Overlapping Smaller Image - Hide on mobile, show on lg */}
                <div className="hidden lg:block absolute bottom-[-70px] left-[5px] w-[110%] overflow-hidden shadow-xl">
                  <img
                    src={fleetImage2}
                    alt="Professional Service"
                    className="w-auto h-60 object-cover rounded-2xl"
                  />
                </div>
              </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mt-8 lg:mt-0"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Moonstone Cabs Private Limited is one of the most reputable and leading car rental company in Delhi & NCR. Our rapid growth and continued success are a true reflection of the trust, confidence, and satisfaction of our valued clients. We take pride in delivering reliable, comfortable, and professional transportation solutions that meet the diverse needs of our customers across the region.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              We offer a comprehensive range of transportation solutions, catering to both corporate and individual requirements. Our goal is to deliver safe, reliable, and professional travel experiences backed by strong operational excellence and customer-centric values.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Our success is driven by our customer-first approach, highly trained drivers, and a modern fleet of vehicles that meet diverse travel requirements — from daily employee transportation to event logistics and executive travel.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
