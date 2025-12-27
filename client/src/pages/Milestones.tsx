import { motion } from "framer-motion";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import { Calendar, Award, Users, Car } from "lucide-react";

const milestones = [
  {
    year: "2021",
    title: "Company Founded",
    description:
      "Moonstone Cabs Private Limited was established in Delhi NCR with a vision to revolutionize taxi services.",
    icon: Calendar,
  },
  {
    year: "2022",
    title: "1000+ Happy Customers",
    description:
      "Achieved our first major milestone with over 1000 satisfied customers across Delhi & NCR.",
    icon: Users,
  },
  {
    year: "2023",
    title: "Fleet Expansion",
    description:
      "Expanded our fleet to 50+ premium vehicles including sedans, SUVs, and luxury cars.",
    icon: Car,
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description:
      "Recognized as one of the most trusted cab service providers in Delhi NCR region.",
    icon: Award,
  },
];

export default function Milestones() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white">
      <Header />

      {/* ================= HERO ================= */}
      <section
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/assets/milestones-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Our Milestones
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            A timeline of growth, innovation, and trust.
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Company" }, { label: "Milestones" }]} />

      {/* ================= TIMELINE ================= */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,90,29,0.08),transparent)]" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary/30 hidden md:block" />

            <div className="space-y-16">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                const Icon = milestone.icon;

                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className={`relative flex ${
                      isLeft ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <div
                      className={`w-full md:w-[45%] bg-white rounded-xl p-6 shadow-md ${
                        isLeft ? "md:mr-[55%]" : "md:ml-[55%]"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xl font-bold text-primary">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Dot */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-[#1d64fe] to-[#012166] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-3"
          >
            Ready to Experience the Best Ride of Your Life?
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-orange-100 mb-6"
          >
            We make every journey smooth, safe, and memorable.
          </motion.p>

          <a href="/booking">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white text-primary font-semibold px-8 py-3 rounded-md shadow-md hover:scale-105 transition"
            >
              Book Your Ride Now
            </motion.button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
