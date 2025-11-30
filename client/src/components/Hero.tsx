import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage1 from '@assets/stock_images/luxury_black_taxi_ca_fdc1538a.jpg';
import heroImage2 from '@assets/stock_images/luxury_black_taxi_ca_7b032548.jpg';
import carImage from '/assets/car1.png';

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
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">

      {/* Background Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex]}
              alt="Hero background"
              className="w-full h-full object-cover"
            />

            {/* Soft dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 h-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full">

          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              A Ride with Ease and Comfort. Try it... 
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-300"
            >
              Experience luxury, comfort, and punctuality with Moonstone Cabs — 
              your reliable partner for every journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a href="/booking">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-5 py-4"
                >
                  Book Your Ride Now
                </Button>
              </a>
            </motion.div>
          </motion.div>

         
        <motion.div
  initial={{ opacity: 0, x: 300 }}   // right se bahar
  animate={{ opacity: 1, x: 0 }}     // smooth slide in
  transition={{
    duration: 1.2,
    delay: 0.3,
    ease: [0.25, 0.1, 0.25, 1],      // smooth easing
  }}
  className="hidden lg:flex justify-center items-center"
>
  <div className="relative">
    <motion.div
      className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.img
      src={carImage}
      alt="Luxury Rolls Royce"
       className="relative w-[550px] xl:w-[620px] drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    />
  </div>
</motion.div>


        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        <button
          onClick={goToPrevious}
          className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2 items-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-black/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

    </section>
  );
}
