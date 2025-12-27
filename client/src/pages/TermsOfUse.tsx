import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfUse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative py-6 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-primary mb-2"
        >
          Terms of Use
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl text-center"
        >
          Please read these terms carefully
        </motion.p>
      </section>

      {/* ===== CONTENT ===== */}
      <section ref={ref} className="py-6">
        <div className="max-w-4xl mx-auto px-4 space-y-10">

          {/* INTRO */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground text-lg leading-relaxed text-center"
          >
            By accessing or using the services of Moonstone Cabs Private Limited,
            you agree to be bound by the following Terms of Use.
          </motion.p>

          {/* SERVICE AGREEMENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Service Agreement
            </h2>

            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>• All bookings are subject to vehicle availability at the time of confirmation.</p>
              <p>• Fare rates may vary based on distance traveled, duration, route, vehicle type, and applicable taxes.</p>
              <p>• Cancellation and modification policies apply as communicated at the time of booking.</p>
            </div>
          </motion.div>

          {/* USER RESPONSIBILITIES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              User Responsibilities
            </h2>

            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>• You agree to provide accurate and complete information while making a booking.</p>
              <p>• Users are expected to maintain respectful behavior towards drivers and to take reasonable care of vehicles.</p>
              <p>• Timely payment of fares and applicable charges is the responsibility of the user.</p>
            </div>
          </motion.div>

          {/* LIABILITY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Liability
            </h2>

            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                • Moonstone Cabs Private Limited shall not be held liable for delays
                or service interruptions caused by factors beyond reasonable control,
                including traffic conditions, weather, or force majeure events.
              </p>
              <p>
                • Any lost or forgotten items should be reported within 24 hours of
                the trip completion. While we will make reasonable efforts to assist,
                recovery cannot be guaranteed.
              </p>
            </div>
          </motion.div>

          {/* GOVERNING LAW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Governing Law & Jurisdiction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Use shall be governed by and construed in accordance
              with the laws of India. Any disputes arising shall be subject to the
              exclusive jurisdiction of the courts in Delhi.
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
