import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone } from 'lucide-react';
import callImage from '@assets/stock_images/customer_service_rep_5ba7c750.jpg';

export default function CallUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="py-16 bg-black relative overflow-hidden mb-1"
      style={{
        clipPath: 'polygon(0 0, 100% 4%, 100% 100%, 0 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Call Us Now & Book Your Taxi!
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Quick, reliable & safe — we’re just one call away to make your next ride hassle-free.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Side - Call Vector */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/25 rounded-full blur-2xl animate-pulse" />
              <div className="relative bg-primary rounded-full p-8 shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-white text-lg mb-1">Call For Taxi</div>
              <a
                href="tel:+919990800718"
                className="text-3xl md:text-4xl font-bold text-primary hover:text-primary/80 transition-colors"
                data-testid="link-phone"
              >
                +91 9990800718
              </a>
              <div className="mt-5">
                <a href="/booking">
                  <button className="px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition">
                    Book Your Taxi
                  </button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src={callImage}
                alt="Customer Support"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Glow at Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[100px] bg-primary/20 blur-3xl rounded-full"></div>
  
    </section>
  );
}
