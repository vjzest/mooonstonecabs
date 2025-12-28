import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
} from "lucide-react";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  const [openLinks, setOpenLinks] = useState(false);

  return (
    <footer
      className="relative text-white pt-12 pb-8 overflow-hidden"
      style={{
        backgroundImage: "url('/assets/footer-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]"/>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* ================= Company Info ================= */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start mb-3">
              <img
                src="/footer_logo.png"
                alt="Moonstone Cabs Logo"
                className="w-14 h-20 object-contain"
              />
              <div className="text-2xl font-bold text-primary">
                MOONSTONE CABS
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto sm:mx-0">
              Your trusted partner for luxury taxi services and premium car
              rentals in Delhi & NCR.
            </p>
          </div>

          {/* ================= Useful Links ================= */}
          <div className="text-center sm:text-left">

            {/* ---------- DESKTOP (always open) ---------- */}
            <div className="hidden sm:block">
              <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Taxi Booking", path: "/booking" },
                  { label: "Help Center", path: "/help" },
                  { label: "Privacy Policy", path: "/privacy" },
                  { label: "Terms of Use", path: "/terms" },
                  { label: "Contact Us", path: "/contact" },
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={scrollToTop}
                      className="text-gray-300 hover:text-primary transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------- MOBILE (accordion) ---------- */}
            <div className="sm:hidden">
              <button
                onClick={() => setOpenLinks(!openLinks)}
                className="w-full flex justify-between items-center mb-4"
              >
                <h3 className="text-lg font-semibold">Useful Links</h3>
                <motion.span
                  animate={{ rotate: openLinks ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>

              <AnimatePresence>
                {openLinks && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="space-y-2 text-sm overflow-hidden"
                  >
                    {[
                      { label: "Taxi Booking", path: "/booking" },
                      { label: "Help Center", path: "/help" },
                      { label: "Privacy Policy", path: "/privacy" },
                      { label: "Terms of Use", path: "/terms" },
                      { label: "Contact Us", path: "/contact" },
                    ].map((item) => (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          onClick={() => {
                            scrollToTop();
                            setOpenLinks(false);
                          }}
                          className="text-gray-300 hover:text-primary transition block"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ================= Contact Info ================= */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Office Address</h3>

            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex gap-3 items-start text-left">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span>
                  KH. NO. 45/18, Chhawla, Najafgarh, South West Delhi,
                  New Delhi – 110043
                </span>
              </li>

              <li className="flex gap-3 items-start text-left">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:contact@moonstonecabs.com" className="hover:text-primary">
                    contact@moonstonecabs.com
                  </a>
                  <a href="mailto:booking@moonstonecabs.com" className="hover:text-primary">
                    booking@moonstonecabs.com
                  </a>
                  <a href="mailto:sales@moonstonecabs.com" className="hover:text-primary">
                    sales@moonstonecabs.com
                  </a>
                </div>
              </li>

              <li className="flex gap-3 items-start text-left">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919536575768" className="hover:text-primary">
                    +91-9536575768
                  </a>
                  <a href="tel:+919990800718" className="hover:text-primary">
                    +91-9990800718
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= Bottom Bar ================= */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex gap-5">
            <a href="https://facebook.com" target="_blank" className="hover:text-primary">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-primary">
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-gray-300">
            {[
              { label: "Cancellation Policy", path: "/cancellation" },
              { label: "Refund Policy", path: "/refund" },
              { label: "Disclaimer", path: "/disclaimer" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={scrollToTop}
                className="hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="text-xs sm:text-sm text-gray-300 text-center">
            © {new Date().getFullYear()} Moonstone Cabs Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
