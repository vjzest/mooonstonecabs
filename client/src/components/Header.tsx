import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      {/* ================= TOP HEADER ================= */}
      <div className="bg-white border-b">
        <div className="max-w-8xl mx-auto px-5 py-2 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="mailto:booking@moonstonecabs.com" className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              booking@moonstonecabs.com
            </a>
            <a href="tel:+919536575768" className="hidden md:flex items-center gap-1">
              <Phone className="w-4 h-4" />
              +91-9536575768
            </a>
          </div>

          <div className="hidden sm:flex gap-3">
            <Facebook className="w-4 h-4 cursor-pointer hover:text-primary" />
            <Instagram className="w-4 h-4 cursor-pointer hover:text-primary" />
            <Linkedin className="w-4 h-4 cursor-pointer hover:text-primary" />
            <Twitter className="w-4 h-4 cursor-pointer hover:text-primary" />
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <motion.header
        className={`sticky top-0 z-40 bg-white border-b transition-all ${
          isScrolled ? "shadow-sm bg-white/95 backdrop-blur" : ""
        }`}
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-8xl mx-auto px-5 py-3 flex justify-between items-center">

          {/* LOGO */}
          <Link href="/" onClick={scrollToTop} className="flex items-center gap-2">
            <img src="/logo.png" alt="Moonstone Cabs" className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="font-extrabold text-primary text-base sm:text-lg lg:text-2xl">
                MOONSTONE CABS
              </span>
              <span className="hidden lg:block text-xs text-muted-foreground">
                A Ride with Ease and Comfort. Try it...
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/">Home</Link>

            <div className="relative group">
              <button className="flex items-center gap-1">
                Company <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow rounded mt-2 w-48">
                {companyLinks.map((l) => (
                  <Link key={l.path} href={l.path}>
                    <div className="px-4 py-2 hover:bg-primary/10">{l.label}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow rounded mt-2 w-64">
                {serviceLinks.map((l) => (
                  <Link key={l.path} href={l.path}>
                    <div className="px-4 py-2 hover:bg-primary/10">{l.label}</div>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/clients">Clients</Link>
            <Link href="/fleets">Fleets</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:block">
            <Link href="/booking">
              <Button className="bg-primary text-white">Book a Taxi</Button>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t px-4 py-4 space-y-1"
            >
              {/* HOME */}
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="block py-2 px-2 border-b">Home</div>
              </Link>

              {/* COMPANY */}
              <button
                className="flex justify-between w-full py-2 px-2 border-b"
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
              >
                Company <ChevronDown />
              </button>
              {mobileCompanyOpen &&
                companyLinks.map((l) => (
                  <Link key={l.path} href={l.path}>
                    <div className="pl-6 py-2 border-b">{l.label}</div>
                  </Link>
                ))}

              {/* SERVICES */}
              <button
                className="flex justify-between w-full py-2 px-2 border-b"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services <ChevronDown />
              </button>
              {mobileServicesOpen &&
                serviceLinks.map((l) => (
                  <Link key={l.path} href={l.path}>
                    <div className="pl-6 py-2 border-b">{l.label}</div>
                  </Link>
                ))}

              {/* FIXED REMAINING LINKS */}
              <Link href="/clients"><div className="block py-2 px-2 border-b">Clients</div></Link>
              <Link href="/fleets"><div className="block py-2 px-2 border-b">Fleets</div></Link>
              <Link href="/careers"><div className="block py-2 px-2 border-b">Careers</div></Link>
              <Link href="/contact"><div className="block py-2 px-2 border-b">Contact</div></Link>

              <Link href="/booking">
                <Button className="w-full mt-3 bg-primary text-white">
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
