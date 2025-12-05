import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function BookingForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="booking" ref={ref} className="relative py-16 overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 bg-[url('/assets/taxi-yellow.png')]
          bg-cover bg-bottom opacity-20"
        />
      </div>

      {/* Luxury Golden Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-primary/10" />

      {/* Soft Glow Lights */}
      <div className="absolute left-20 top-1/3 w-60 h-60 bg-primary/20 blur-[150px] rounded-full"></div>
      <div className="absolute right-10 top-1/4 w-52 h-52 bg-yellow-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-wide drop-shadow-lg">
            Premium Taxi Booking
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-32 h-[3px] bg-primary mx-auto mt-3 rounded-full origin-center"
          />

          <p className="text-gray-300 mt-3 text-base">
            Luxury • Comfort • Safety • 24/7 Availability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">

          {/* LEFT — IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="hidden md:flex items-end justify-center"
          >
            <img
              src="/assets/cta-men2.png"
              alt="Booking Taxi"
              className="w-[60%] max-w-xl drop-shadow-2xl rounded-xl -translate-x-20"
            />
          </motion.div>

          {/* RIGHT — PREMIUM HIGHLIGHTS */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-2xl p-6 sm:p-8 shadow-2xl text-white"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-primary drop-shadow-md">
              Why Choose Our Premium Ride?
            </h3>

            {/* FEATURE GRID */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5">

              {/* CARD 1 */}
              <div className="p-4 sm:p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-primary/20 transition-all">
                <h4 className="text-base sm:text-lg font-semibold">🚖 Instant Booking</h4>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">
                  Get your taxi confirmed within seconds.
                </p>
              </div>

              {/* CARD 2 */}
              <div className="p-4 sm:p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-primary/20 transition-all">
                <h4 className="text-base sm:text-lg font-semibold">🛡 Verified Drivers</h4>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">
                  Only trained and trusted drivers on duty.
                </p>
              </div>

              {/* CARD 3 */}
              <div className="p-4 sm:p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-primary/20 transition-all">
                <h4 className="text-base sm:text-lg font-semibold">💺 Luxury Comfort</h4>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">
                  Super-clean AC cars with smooth rides.
                </p>
              </div>

              {/* CARD 4 */}
              <div className="p-4 sm:p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-primary/20 transition-all">
                <h4 className="text-base sm:text-lg font-semibold">⏱ On-Time Guarantee</h4>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">
                  Your time matters — no delays, no excuses.
                </p>
              </div>

            </div>

            {/* BUTTON */}
            <a href="/booking">
            <Button
              className="w-full mt-8 py-3 text-lg font-bold bg-primary hover:bg-primary/90
              text-white rounded-xl shadow-xl hover:scale-[1.02] transition-all"
            >
              Book Your Taxi
            </Button>
</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
