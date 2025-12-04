import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import airportImage from "@assets/stock_images/airport_taxi_transpo_67d6e75c.jpg";
import businessImage from "@assets/stock_images/business_executive_t_269463ec.jpg";
import cityImage from "@assets/stock_images/city_taxi_urban_tran_4b33efc7.jpg";
import regularImage from "@assets/stock_images/luxury_black_taxi_ca_0de360db.jpg";
import luggageImage from "@assets/stock_images/modern_taxi_fleet_ca_e23bdd05.jpg";

const services = [
  { title: "Regular Transport", image: regularImage, description: "Daily commute and regular taxi services" },
  { title: "Airport Transport", image: airportImage, description: "Hassle-free airport pickup and drop" },
  { title: "Luggage Transport", image: luggageImage, description: "Safe and secure luggage transportation" },
  { title: "City Transport", image: cityImage, description: "Explore the city with our guided tours" },
  { title: "Business Transport", image: businessImage, description: "Executive travel for professionals" },
];

export default function WhatWeOffer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    } else {
      setCurrentIndex((prev) => Math.min(services.length - 1, prev + 1));
    }
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden"
    >
      {/* Soft grid background */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0084ff_1px,transparent_1px),linear-gradient(to_bottom,#0084ff_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
            What We Offer
          </h2>
          <p className="text-lg text-gray-600">
            Start your journey with Moonstone Taxi Company!
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto mt-2">
            We handle every ride with precision, reliability, and a premium travel experience.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: `-${currentIndex * (100 / Math.min(3, services.length))}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
         {services.map((service, index) => (
  <motion.div
    key={service.title}
    initial={{ opacity: 0, x: -80 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{
      duration: 0.7,
      delay: index * 0.25,
      ease: "easeOut",
    }}
    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
  >
    {/* ⭐ Premium Card */}
    <div
      className="
        bg-white/80 backdrop-blur-xl 
        border border-blue-100 
        rounded-2xl shadow-lg hover:shadow-xl 
        transition-all duration-500 
        hover:-translate-y-2 hover:border-blue-200 
        overflow-hidden
      "
    >
      <div className="h-52 overflow-hidden relative group">
        <img
          src={service.image}
          alt={service.title}
          className="
            w-full h-full object-cover 
            group-hover:scale-110 transition-transform duration-700
          "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40"></div>
      </div>

      <div className="p-7">
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  </motion.div>
))}

            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={currentIndex === 0}
              className="rounded-full border-blue-300 hover:bg-blue-100"
            >
              <ChevronLeft className="w-5 h-5 text-blue-600" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={currentIndex >= services.length - 3}
              className="rounded-full border-blue-300 hover:bg-blue-100"
            >
              <ChevronRight className="w-5 h-5 text-blue-600" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
