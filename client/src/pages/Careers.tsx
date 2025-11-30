import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CursorFollower from '@/components/CursorFollower';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { Briefcase, TrendingUp, Heart, Users } from 'lucide-react';

export default function Careers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen">
      <CursorFollower />
      <Header />
       <section
        className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url('/assets/career-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
           Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
              Build your career with Delhi NCR's most trusted taxi service provider
         </motion.p>
        </div>
      </section>
      {/* <Breadcrumb items={[{ label: 'Careers' }]} /> */}

      <section ref={ref} className="py-5 bg-background">
        <div className="max-w-7xl mx-auto px-4">
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
           Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
          >
              Build your career with Delhi NCR's most trusted taxi service provider
         </motion.p>
        </div>
      </section>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card border border-card-border rounded-lg p-6 text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Growth Opportunities</h3>
              <p className="text-muted-foreground text-sm">Clear career paths and professional development</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card border border-card-border rounded-lg p-6 text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Great Benefits</h3>
              <p className="text-muted-foreground text-sm">Competitive salary and comprehensive benefits package</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-card border border-card-border rounded-lg p-6 text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Team Culture</h3>
              <p className="text-muted-foreground text-sm">Supportive environment with collaborative teams</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-card border border-card-border rounded-lg p-6 text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Open Positions</h3>
              <p className="text-muted-foreground text-sm">Multiple roles available across departments</p>
            </motion.div>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Current Openings</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="text-xl font-bold text-primary mb-2">Professional Drivers</h3>
                <p className="text-muted-foreground mb-3">Valid license required. Experience in customer service preferred.</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>📍 Delhi NCR</span>
                  <span>⏰ Full-time</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="text-xl font-bold text-primary mb-2">Operations Manager</h3>
                <p className="text-muted-foreground mb-3">Manage daily operations and fleet coordination.</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>📍 Delhi NCR</span>
                  <span>⏰ Full-time</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="text-xl font-bold text-primary mb-2">Customer Service Representatives</h3>
                <p className="text-muted-foreground mb-3">Handle customer inquiries and booking management.</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>📍 Delhi NCR</span>
                  <span>⏰ Full-time</span>
                </div>
              </div>
            </div>
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 text-center"
          >
            <p className="text-xl text-muted-foreground mb-6">
              Interested in joining our team?
            </p>
            <a href="mailto:contact@moonstonecabs.com">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-semibold transition-colors" data-testid="button-careers-apply">
                Send Your Resume
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
