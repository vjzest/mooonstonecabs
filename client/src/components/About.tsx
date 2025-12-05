import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import fleetImage1 from '@assets/stock_images/abus-pic.jpg';
import fleetImage2 from '@assets/stock_images/car-pic1.png';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-14 sm:py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center mb-10 sm:mb-14 md:mb-16"
        >
          About Our Company
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left Side Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative w-full"
          >
            {/* MAIN IMAGE (mobile optimized height) */}
            <div className="w-full overflow-hidden rounded-2xl">
              <img
                src={fleetImage1}
                alt="Taxi Fleet"
                className="w-full h-[220px] xs:h-[260px] sm:h-[300px] md:h-[340px] object-cover rounded-2xl"
              />
            </div>

            {/* SECOND IMAGE (desktop only) */}
            <div className="hidden lg:block absolute bottom-[-70px] left-4 w-[105%] shadow-xl rounded-2xl overflow-hidden">
              <img
                src={fleetImage2}
                alt="Professional Service"
                className="w-auto h-60 object-cover rounded-2xl"
              />
            </div>
          </motion.div>

          {/* Right Side Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5 sm:space-y-6 mt-4 lg:mt-0"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Moonstone Cabs Private Limited is one of the most reputable and 
              leading car rental companies in Delhi & NCR. Our growth is driven 
              by the trust and satisfaction of our valued clients.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              We provide transportation solutions for both corporate and 
              individual needs — delivering safe, reliable, and professional 
              experiences with a customer-first approach.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Our trained drivers and modern fleet support everything from 
              employee transport to executive travel and event logistics.
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
