import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-6 sm:py-8 bg-black overflow-hidden mb-8"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/assets/taxi-yellow.png')] bg-cover bg-center opacity-15" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT — IMAGE (HIDDEN ON MOBILE) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex justify-center"
          >
            <img
              src="/assets/cta-men2.png"
              alt="Premium Taxi Service"
              className="w-[65%] max-w-sm drop-shadow-2xl"
            />
          </motion.div>

          {/* RIGHT — CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
              Book a Taxi <br className="hidden sm:block" />
              <span className="text-white">in Minutes, Ride in Comfort</span>
            </h2>

            <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
              Reliable, luxury taxi services across Delhi & NCR.  
              Professional drivers, clean cars, on-time pickup — always.
            </p>

            {/* TRUST POINTS */}
            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-3 text-xs sm:text-sm text-gray-200">
              <span className="bg-white/10 px-3 py-1.5 rounded-full">✔ 24/7 Service</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-full">✔ Verified Drivers</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-full">✔ Premium Cars</span>
            </div>

            {/* CTA BUTTONS */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="/booking">
                <Button className="px-6 py-3 text-base font-bold bg-primary hover:bg-primary/90 rounded-lg shadow-lg">
                  Book Your Taxi
                </Button>
              </a>

              <a
                href="tel:+91-9536575768"
                className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg
                border border-primary text-primary hover:bg-primary hover:text-white
                transition font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
