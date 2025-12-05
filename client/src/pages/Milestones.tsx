import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { Calendar, Award, Users, Car } from 'lucide-react';

const milestones = [
  {
    year: '2021',
    title: 'Company Founded',
    description: 'Moonstone Cabs Private Limited was established in Delhi NCR with a vision to revolutionize taxi services.',
    icon: Calendar,
  },
  {
    year: '2022',
    title: '1000+ Happy Customers',
    description: 'Achieved our first major milestone with over 1000 satisfied customers across Delhi & NCR.',
    icon: Users,
  },
  {
    year: '2023',
    title: 'Fleet Expansion',
    description: 'Expanded our fleet to 50+ premium vehicles including sedans, SUVs, and luxury cars.',
    icon: Car,
  },
  {
    year: '2024',
    title: 'Industry Recognition',
    description: 'Recognized as one of the most trusted cab service providers in Delhi NCR region.',
    icon: Award,
  },
];

export default function Milestones() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white">
      <Header />
       <section
              className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
              style={{
                backgroundImage: "url('/assets/milestones-banner.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="relative z-10 px-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-3"
                >
                  Our Milestones
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
                >
               A timeline of growth, innovation, and trust.  </motion.p>
              </div>
            </section>
      <Breadcrumb items={[{ label: 'Company' }, { label: 'Milestones' }]} />

      <section ref={ref} className="py-5 relative overflow-hidden">
         <section
        className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
      >
        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-3"
          >
          Our Milestones
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
          >
            A timeline of growth, innovation, and trust.
          </motion.p>
        </div>
      </section>
        {/* Subtle background effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,90,29,0.08),transparent)]"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
        
          {/* Timeline Line */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-orange-300/40 to-primary/40 hidden md:block"></div>

            <div className="space-y-14 md:space-y-16">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                const Icon = milestone.icon;

                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`relative flex flex-col md:flex-row items-center ${
                      isLeft ? 'md:justify-start' : 'md:justify-end'
                    }`}
                  >
                    {/* Card */}
                    <div
                      className={`w-full md:w-[45%] bg-white/90 backdrop-blur-sm border border-orange-100 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${
                        isLeft ? 'md:mr-[55%]' : 'md:ml-[55%]'
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
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-[5px] border-white shadow-[0_0_15px_rgba(254,90,29,0.6)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
       <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,90,29,0.05),transparent)]"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-6"
          >
            Our Journey Ahead
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12"
          >
            We continue to move forward with innovation, safety, and sustainability at our core.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Vision 2030',
                desc: 'Expanding operations across 15+ Indian cities with top-notch fleet and tech-driven rides.',
                icon: Calendar,
              },
              {
                title: 'Customer Expansion',
                desc: 'Serving 1 million+ satisfied customers through personalized travel experiences.',
                icon: Users,
              },
              {
                title: 'Smart Technology',
                desc: 'Integrating AI, predictive routing, and real-time analytics for efficient journeys.',
                icon: Car,
              },
              {
                title: 'Sustainability Goals',
                desc: 'Transitioning to a 70% EV fleet to promote greener travel solutions by 2030.',
                icon: Award,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ===== New Section: About Our Journey ===== */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
    {/* Left Image */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="rounded-2xl overflow-hidden shadow-lg"
    >
      <img
        src="/assets/range-rover.jpg"
        alt="Our Journey"
        className="w-full h-[350px] object-cover"
      />
    </motion.div>

    {/* Right Content */}
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Driving Excellence Every Mile
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        From our humble beginnings to becoming one of Delhi NCR’s most trusted taxi service
        providers, Moonstone Cabs has always focused on comfort, punctuality, and safety.
        Our professional drivers, premium vehicles, and transparent pricing set us apart.
      </p>
      <a href="/booking">
      <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300">
        Book Your Ride
      </button>
      </a>
    </motion.div>
  </div>
</section>

{/* ===== CTA Section Below ===== */}
<section className="py-14 bg-gradient-to-r from-[#1d64fe] to-[#012166] text-white text-center">
  <div className="max-w-4xl mx-auto px-6">
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-2xl md:text-3xl font-bold mb-3"
    >
      Ready to Experience the Best Ride of Your Life?
    </motion.h3>
    <p className="text-lg text-orange-100 mb-6">
      Whether it's daily travel or special occasions, we make every journey smooth and memorable.
    </p>
    <a href="/booking">
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-primary font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
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
