import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import heroImage1 from "@assets/stock_images/luxury_black_taxi_ca_fdc1538a.jpg";
import heroImage2 from "@assets/stock_images/luxury_black_taxi_ca_7b032548.jpg";
import carImage from "/assets/car1.png";

const images = [heroImage1, heroImage2];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-black">

      {/* ================= Background Carousel ================= */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex]}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />

            {/* Dark overlay (prevents white flash) */}
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ================= Main Content ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              A Ride with Ease and Comfort. Try it...
            </h1>

            <p className="text-lg md:text-xl text-gray-300">
              Experience unmatched luxury, comfort, and punctuality with
              Moonstone Cabs — your trusted partner for every journey.
            </p>

            <a href="/booking">
  <Button
    className="
      bg-primary hover:bg-primary/90 text-primary-foreground
      text-base sm:text-lg
      px-4 py-2 sm:px-4 sm:py-3
      rounded-xl
      transition-all mt-8
    "
  >
    Book Your Ride Now
  </Button>
</a>

          </motion.div>

          {/* Right Car Image */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hidden lg:flex justify-center -mt-20"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-6 bg-primary/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.img
                src={carImage}
                alt="Luxury Car"
                className="relative w-[450px] xl:w-[580px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ================= Controls ================= */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">

        <button
          onClick={goToPrevious}
          className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

      </div>
    </section>
  );
}
