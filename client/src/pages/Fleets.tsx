import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Car, Shield, Zap, Award } from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Modern Fleet",
    description: "50+ well-maintained vehicles including sedans, SUVs, and luxury cars",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "All vehicles equipped with GPS tracking and regular safety inspections",
  },
  {
    icon: Zap,
    title: "Quick Service",
    description: "Rapid deployment with vehicles strategically positioned across NCR",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Professional chauffeurs and luxury amenities in every vehicle",
  },
];

const cars = [
  { id: 1, name: "Mercedes", image: "/assets/Mercedes.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 2, name: "BMW", image: "/assets/BMW.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 3, name: "White BMW", image: "/assets/White BMW.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 4, name: "Chevrolet Coupe", image: "/assets/Chevrolet Coupe.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 5, name: "Ferarri Enzo", image: "/assets/Ferarri Enzo.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 6, name: "Hyundai Staria", image: "/assets/hyundai-staria.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 7, name: "Jeep Renegade", image: "/assets/Jeep Renegade.jpg", seats: "5 Seat", bags: "2 Bags", type: "4 SUV" },
  { id: 8, name: "lamborghini", image: "/assets/lamborghini.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 9, name: "Mini Cooper", image: "/assets/Mini Cooper.jpg", seats: "5 Seat", bags: "2 Bags", type: "Sedan" },
  { id: 10, name: "Porsche 911", image: "/assets/Porsche 911.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 11, name: "Range Rover", image: "/assets/range-rover.jpg", seats: "5 Seat", bags: "2 Bags", type: "Exotic Car" },
  { id: 12, name: "Rolls Royce Cullinan", image: "/assets/Rolls Royce Cullinan.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 13, name: "Skoda", image: "/assets/Skoda.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 14, name: "Toyota Crew Cab", image: "/assets/Toyota Crew Cab.jpg", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 15, name: "Toyota Rav 4", image: "/assets/toyota-rav.jpg", seats: "5 Seat", bags: "2 Bags", type: "SUV" },
  { id: 16, name: "Maruti FRONX", image: "/assets/Maruti FRONX.avif", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 17, name: "Maruti Brezza", image: "/assets/Maruti Brezza.avif", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 18, name: "Hyundai Verna", image: "/assets/Hyundai Verna.avif", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
  { id: 19, name: "Maruti Dzire", image: "/assets/Maruti Dzire.avif", seats: "4 Seat", bags: "4 Bags", type: "4 SUV" },
];

export default function Fleets() {
  // LOWER SECTIONS
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // TOP HEADING FIX
  const topRef = useRef(null);
  const topInView = useInView(topRef, { once: true, amount: 0.3 });

  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(cars.length / ITEMS_PER_PAGE);
  const paginatedCars = cars.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen">
      <Header />

      {/* TOP BANNER */}
      <section
        className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('/assets/fleet-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Our Premium Fleet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Experience comfort and luxury with our diverse range of well-maintained vehicles
          </motion.p>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section ref={ref} className="py-5 bg-background">
        <div className="max-w-7xl mx-auto px-4">

          {/* SECOND HEADING FIXED */}
          <section ref={topRef} className="text-center py-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={topInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-primary mb-3"
            >
              Our Premium Fleet
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={topInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
            >
              Experience comfort and luxury with our diverse range of well-maintained vehicles
            </motion.p>
          </section>

          {/* FEATURES */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card border border-card-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* CARS GRID */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              Our Luxury Cars
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {paginatedCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative bg-gray-100 h-56 overflow-hidden">
                    <img src={car.image} alt={car.name} className="w-full h-56 object-cover" loading="lazy" />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{car.name}</h3>

                    <div className="flex items-center justify-between text-muted-foreground text-sm gap-2">
                      <span>🚘 {car.seats}</span>
                      <span>🧳 {car.bags}</span>
                      <span>🚙 {car.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-center mt-10 gap-4">
              <button
                onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
                className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary/80 transition"
              >
                ❮
              </button>

              <div className="text-lg font-medium text-foreground">
                {currentPage + 1} / {totalPages}
              </div>

              <button
                onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
                className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary/80 transition"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
