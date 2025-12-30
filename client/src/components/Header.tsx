import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Phone,
} from "lucide-react";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile accordion states
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const companyLinks = [
    { label: "Profile", path: "/company/profile" },
    { label: "Mission & Vision", path: "/company/mission-vision" },
    { label: "Milestones", path: "/company/milestones" },
  ];

  const serviceLinks = [
    { label: "Employee Transportation (ETS)", path: "/services/ets" },
    { label: "Spot Rentals", path: "/services/spot-rentals" },
    { label: "Monthly & Long-Term Rentals", path: "/services/monthly-rentals" },
    { label: "Wedding & Events", path: "/services/wedding-events" },
    { label: "Events & Exhibitions", path: "/services/exhibitions" },
  ];

  return (
    <>
      {/* ---------- TOP HEADER ---------- */}
      <div className="bg-white border-b border-border">
        <div className="max-w-8xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 flex justify-between items-center text-xs sm:text-sm">
          
          {/* LEFT SIDE: Email & Phone */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-muted-foreground min-w-0 flex-1">
            
            {/* Email */}
            <a
              href="mailto:booking@moonstonecabs.com"
              className="flex items-center gap-1 sm:gap-1.5 md:gap-2 hover:text-primary transition-colors min-w-0"
              aria-label="Email Moonstone Cabs"
            >
              <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
              <span className="text-xs sm:text-xs md:text-sm leading-none truncate">
                booking@moonstonecabs.com
              </span>
            </a>

            {/* Phone (visible only on md and above) */}
            <a
              href="tel:+919536575768"
              className="hidden md:flex items-center gap-1.5 md:gap-2 hover:text-primary transition-colors"
              aria-label="Call Moonstone Cabs"
            >
              <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
              <span className="text-xs md:text-sm leading-none">
                +91-9536575768
              </span>
            </a>

          </div>

          {/* RIGHT SIDE: Social Media Icons (hidden on mobile) */}
          <div className="hidden sm:flex gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 flex-shrink-0 ml-2">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors p-0.5 sm:p-1 hover:bg-slate-100 rounded"
              aria-label="Facebook"
            >
              <Facebook className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors p-0.5 sm:p-1 hover:bg-slate-100 rounded"
              aria-label="Instagram"
            >
              <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors p-0.5 sm:p-1 hover:bg-slate-100 rounded"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors p-0.5 sm:p-1 hover:bg-slate-100 rounded"
              aria-label="Twitter"
            >
              <Twitter className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ---------- MAIN HEADER ---------- */}
      <motion.header
        className={`sticky top-0 z-40 bg-white border-b border-border transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : ""
        }`}
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-8xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3.5 sm:py-4 lg:py-5 flex justify-between items-center gap-2 sm:gap-3 md:gap-4">

          {/* ---------- LOGO + NAME + TAGLINE ---------- */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0 min-w-0"
            aria-label="Moonstone Cabs home"
          >
            {/* Logo Image */}
            <img
              src="/logo.png"
              alt="Moonstone Cabs Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain flex-shrink-0"
            />

            {/* Text Block */}
            <div className="flex flex-col leading-tight min-w-0">
              
              {/* Company Name */}
              <span className="text-sm sm:text-base md:text-lg lg:text-2xl font-extrabold text-primary tracking-wide truncate">
                MOONSTONE CABS
              </span>

              {/* Tagline */}
              <span className="hidden md:block text-xs text-muted-foreground font-medium mt-0.5 truncate">
                A Ride with Ease and Comfort. Try it...
              </span>

            </div>

          </Link>

          {/* ---------- DESKTOP NAVIGATION ---------- */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 flex-1 justify-center px-2">
            <Link 
              href="/" 
              onClick={scrollToTop} 
              className="text-xs xl:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap px-2 py-1"
            >
              Home
            </Link>

            <div className="relative group">
              <button className="text-xs xl:text-sm font-medium flex items-center gap-0.5 xl:gap-1 hover:text-primary transition-colors whitespace-nowrap px-2 py-1">
                Company <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4 flex-shrink-0" />
              </button>
              <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg top-full left-0 w-56 py-2 z-50">
                {companyLinks.map((link) => (
                  <Link key={link.path} href={link.path} onClick={scrollToTop}>
                    <div className="px-4 py-2.5 text-xs xl:text-sm hover:bg-primary/40 transition-colors">
                      {link.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="text-xs xl:text-sm font-medium flex items-center gap-0.5 xl:gap-1 hover:text-primary transition-colors whitespace-nowrap px-2 py-1">
                Services <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4 flex-shrink-0" />
              </button>
              <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg top-full left-0 w-72 py-2 z-50">
                {serviceLinks.map((link) => (
                  <Link key={link.path} href={link.path} onClick={scrollToTop}>
                    <div className="px-4 py-2.5 text-xs xl:text-sm hover:bg-primary/40 transition-colors">
                      {link.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              href="/clients" 
              className="text-xs xl:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap px-2 py-1"
            >
              Clients
            </Link>
            <Link 
              href="/fleets" 
              className="text-xs xl:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap px-2 py-1"
            >
              Fleets
            </Link>
            <Link 
              href="/careers" 
              className="text-xs xl:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap px-2 py-1"
            >
              Careers
            </Link>
            <Link 
              href="/contact" 
              className="text-xs xl:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap px-2 py-1"
            >
              Contact Us
            </Link>
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link href="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-white px-4 lg:px-5 py-2 rounded-md text-xs lg:text-sm font-medium">
                Book a Taxi
              </Button>
            </Link>
          </div>


          {/* ---------- MOBILE MENU BUTTON ---------- */}
          <button
            className="lg:hidden flex-shrink-0 p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

        </div>


        {/* ---------- MOBILE MENU ---------- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border px-3 sm:px-4 py-3 space-y-1.5 bg-white max-h-[calc(100vh-120px)] overflow-y-auto"
            >
              {/* HOME */}
              <Link href="/" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                <div className="text-sm sm:text-base font-medium py-2.5 px-3 hover:bg-slate-50 hover:text-primary transition-colors rounded">Home</div>
              </Link>

              {/* ----- COMPANY ACCORDION ----- */}
              <div className="border-b border-slate-100 pb-1.5">
                <button
                  className="flex justify-between items-center w-full text-sm sm:text-base font-medium py-2.5 px-3 hover:bg-slate-50 hover:text-primary transition-colors rounded"
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                >
                  Company
                  <motion.div
                    animate={{ rotate: mobileCompanyOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {mobileCompanyOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-6 space-y-1 py-2"
                    >
                      {companyLinks.map((link) => (
                        <Link
                          key={link.path}
                          href={link.path}
                          onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}
                        >
                          <div className="text-sm py-2.5 px-3 hover:bg-slate-50 hover:text-primary transition-colors rounded">
                            {link.label}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ----- SERVICES ACCORDION ----- */}
              <div className="border-b border-slate-100 pb-1.5">
                <button
                  className="flex justify-between items-center w-full text-sm sm:text-base font-medium py-2.5 px-3 hover:bg-slate-50 hover:text-primary transition-colors rounded"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                  <motion.div
                    animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-6 space-y-1 py-2"
                    >
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.path}
                          href={link.path}
                          onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}
                        >
                          <div className="text-sm py-2.5 px-3 hover:bg-slate-50 hover:text-primary transition-colors rounded">
                            {link.label}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Remaining Links */}
              <Link href="/clients" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                <div className="text-sm sm:text-base font-medium py-2.5 px-3 hover:bg-slate-50 hover:text-primary transition-colors rounded border-b border-slate-100">Clients</div>
              </Link>
              <Link href="/fleets" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                <div className="text-sm sm:text-base font-medium py-2.5 px-3 hover:bg-slate-50 hover:text-primary transition-colors rounded border-b border-slate-100">Fleets</div>
              </Link>
              <Link href="/careers" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                <div className="text-sm sm:text-base font-medium py-2.5 px-3 hover:bg-slate-50 hover:text-primary transition-colors rounded border-b border-slate-100">Careers</div>
              </Link>
              <Link href="/contact" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                <div className="text-sm sm:text-base font-medium py-2.5 px-3 hover:bg-slate-50 hover:text-primary transition-colors rounded border-b border-slate-100">Contact Us</div>
              </Link>

              {/* CTA */}
              <div className="pt-2">
                <Link href="/booking" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 text-sm sm:text-base font-medium">
                    Book a Taxi
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
