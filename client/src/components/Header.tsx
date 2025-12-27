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
<div className="bg-white border-b border-border overflow-x-hidden">
  <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-sm">
    
    {/* LEFT SIDE: Email & Phone */}
    <div className="flex items-center gap-6 text-muted-foreground">
      
      {/* Email */}
      <a
        href="mailto:booking@moonstonecabs.com"
        className="flex items-center gap-2 hover:text-primary transition-colors"
        aria-label="Email Moonstone Cabs"
      >
        <Mail className="w-4 h-4" />
        <span className="text-xs sm:text-sm leading-none truncate">
          booking@moonstonecabs.com
        </span>
      </a>

      {/* Phone (visible only on lg and above) */}
      <a
        href="tel:+919536575768"
        className="hidden lg:flex items-center gap-2 hover:text-primary transition-colors"
        aria-label="Call Moonstone Cabs"
      >
        <Phone className="w-4 h-4" />
        <span className="text-sm leading-none">
          +91-9536575768
        </span>
      </a>

    </div>

    {/* RIGHT SIDE: Social Media Icons */}
    <div className="flex gap-4">
      <a className="text-muted-foreground hover:text-primary transition-colors">
        <Facebook className="w-4 h-4" />
      </a>
      <a className="text-muted-foreground hover:text-primary transition-colors">
        <Instagram className="w-4 h-4" />
      </a>
      <a className="text-muted-foreground hover:text-primary transition-colors">
        <Linkedin className="w-4 h-4" />
      </a>
      <a className="text-muted-foreground hover:text-primary transition-colors">
        <Twitter className="w-4 h-4" />
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

  {/* ---------- LOGO + NAME + TAGLINE ---------- */}
  <Link
    href="/"
    onClick={scrollToTop}
    className="flex items-center gap-2 md:gap-3 flex-shrink-0"
    aria-label="Moonstone Cabs home"
  >
    {/* Logo Image */}
    <img
      src="logo.png"
      alt="Moonstone Cabs Logo"
      className="w-10 h-10 md:w-14 md:h-14 object-contain"
    />

   {/* Text Block */}
<div className="flex flex-col leading-tight">
  
  {/* Company Name */}
  <span className="text-xl md:text-2xl font-extrabold text-primary tracking-wide">
    MOONSTONE
  </span>

  {/* Tagline */}
  <span className="hidden md:block text-xs text-muted-foreground font-medium mt-0.5">
    Ease and Comfort
  </span>

</div>

  </Link>

  {/* ---------- DESKTOP NAVIGATION ---------- */}
  <nav className="hidden lg:flex items-center gap-8">
    <Link href="/" onClick={scrollToTop} className="hover:text-primary transition-colors">Home</Link>

    <div className="relative group">
      <button className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
        Company <ChevronDown className="w-4 h-4" />
      </button>
      <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg top-full w-56 py-2">
        {companyLinks.map((link) => (
          <Link key={link.path} href={link.path} onClick={scrollToTop}>
            <div className="px-4 py-2 text-sm hover:bg-blue-300">
              {link.label}
            </div>
          </Link>
        ))}
      </div>
    </div>

    <div className="relative group">
      <button className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
        Services <ChevronDown className="w-4 h-4" />
      </button>
      <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg top-full w-64 py-2">
        {serviceLinks.map((link) => (
          <Link key={link.path} href={link.path} onClick={scrollToTop}>
            <div className="px-4 py-2 text-sm hover:bg-blue-300">
              {link.label}
            </div>
          </Link>
        ))}
      </div>
    </div>

    <Link href="/clients" className="hover:text-primary transition-colors">Clients</Link>
    <Link href="/fleets" className="hover:text-primary transition-colors">Fleets</Link>
    <Link href="/careers" className="hover:text-primary transition-colors">Careers</Link>
    <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
  </nav>

  {/* DESKTOP CTA */}
  <div className="hidden lg:flex items-center gap-4">
    <Link href="/booking">
      <Button className="bg-primary text-white px-4 py-2 rounded-md">
        Book a Taxi
      </Button>
    </Link>
  </div>

  {/* ---------- MOBILE MENU BUTTON ---------- */}
  <button
    className="lg:hidden"
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  >
    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
  </button>

</div>


        {/* ---------- MOBILE MENU ---------- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="lg:hidden border-t border-border px-4 py-4 space-y-4 bg-white"
            >
              {/* HOME */}
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="text-sm font-medium py-2">Home</div>
              </Link>

              {/* ----- COMPANY ACCORDION ----- */}
              <div>
                <button
                  className="flex justify-between items-center w-full text-sm font-medium py-2"
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                >
                  Company
                  {mobileCompanyOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

                <AnimatePresence>
                  {mobileCompanyOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-2"
                    >
                      {companyLinks.map((link) => (
                        <Link
                          key={link.path}
                          href={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="text-sm py-1">{link.label}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ----- SERVICES ACCORDION ----- */}
              <div>
                <button
                  className="flex justify-between items-center w-full text-sm font-medium py-2"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                  {mobileServicesOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-2"
                    >
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.path}
                          href={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="text-sm py-1">{link.label}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Remaining Links */}
              <Link href="/clients">
                <div className="text-sm py-2">Clients</div>
              </Link>
              <Link href="/fleets">
                <div className="text-sm py-2">Fleets</div>
              </Link>
              <Link href="/careers">
                <div className="text-sm py-2">Careers</div>
              </Link>
              <Link href="/contact">
                <div className="text-sm py-2">Contact Us</div>
              </Link>

              {/* CTA */}
              <Link href="/booking">
                <Button className="w-full bg-primary text-white mt-3">
                  Book a Taxi
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
