import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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
      {/* ---------- TOP HEADER (unchanged desktop) ---------- */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="text-base font-bold hidden md:block text-primary -translate-x-6">
            A Ride with Ease and Comfort. Try it...
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/help"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Help
            </Link>
            <Link
              href="/support"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Support
            </Link>
            <Link
              href="/faq"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              FAQ
            </Link>

            <div className="flex gap-3">
              <a className="text-muted-foreground hover:text-primary">
                <Facebook className="w-4 h-4" />
              </a>
              <a className="text-muted-foreground hover:text-primary">
                <Instagram className="w-4 h-4" />
              </a>
              <a className="text-muted-foreground hover:text-primary">
                <Linkedin className="w-4 h-4" />
              </a>
              <a className="text-muted-foreground hover:text-primary">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
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
  className="flex items-center gap-2 md:-ml-10"
>

  {/* Logo Image */}
  <img
    src="logo.png"   // <-- your logo path
    alt="Moonstone Cabs Logo"
    className="w-12 h-12 md:w-16 md:h-16 object-contain"
  />

  {/* Text Block */}
  <div className="flex flex-col leading-tight">
    
    {/* Company Name */}
    <span className="text-xl md:text-2xl font-bold text-primary">
      MOONSTONE CABS
    </span>

    {/* Tagline — visible only on desktop */}
    <span className="hidden md:block text-xs text-primary font-semibold">
      A Ride with Ease and Comfort. Try it...
    </span>
  </div>

</Link>


          {/* ---------- DESKTOP NAVIGATION (unchanged) ---------- */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              onClick={scrollToTop}
              className={`text-sm font-medium ${
                location === "/" ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>

            {/* Company Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium flex items-center gap-1">
                Company <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-2 w-56 py-2">
                {companyLinks.map((link) => (
                  <Link key={link.path} href={link.path} onClick={scrollToTop}>
                    <div className="px-4 py-2 text-sm hover:bg-accent">
                      {link.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium flex items-center gap-1">
                Services <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-2 w-64 py-2">
                {serviceLinks.map((link) => (
                  <Link key={link.path} href={link.path} onClick={scrollToTop}>
                    <div className="px-4 py-2 text-sm hover:bg-accent">
                      {link.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/clients">Clients</Link>
            <Link href="/fleets">Fleets</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/booking">
              <Button className="bg-primary text-white">Book a Taxi</Button>
            </Link>

            <a href="tel:+919536575768" className="flex items-center gap-2 text-primary">
              <Phone className="w-5 h-5" />
              +91-9536575768
            </a>
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
