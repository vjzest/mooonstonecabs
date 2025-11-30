import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X, Facebook, Instagram, Phone, Mail, Linkedin, Twitter } from 'lucide-react';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const companyLinks = [
    { label: 'Profile', path: '/company/profile' },
    { label: 'Mission & Vision', path: '/company/mission-vision' },
    { label: 'Milestones', path: '/company/milestones' },
  ];

  const serviceLinks = [
    { label: 'Employee Transportation (ETS)', path: '/services/ets' },
    { label: 'Spot Rentals', path: '/services/spot-rentals' },
    { label: 'Monthly & Long-Term Rentals', path: '/services/monthly-rentals' },
    { label: 'Wedding & Events', path: '/services/wedding-events' },
    { label: 'Events & Exhibitions', path: '/services/exhibitions' },
  ];

  return (
    <>
      {/* Top Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="text-base font-bold hidden md:block text-primary -translate-x-6">
            A Ride with Ease and Comfort. Try it... 
          </div>
          <div className="flex items-center gap-6">
            <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-help">
              Help
            </Link>
            <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-support">
              Support
            </Link>
            <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-faq">
              FAQ
            </Link>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-instagram">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-instagram">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-40 bg-white border-b border-border transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
         <Link href="/" onClick={scrollToTop} className="flex flex-col items-start gap-1" data-testid="link-home">
  <div className="text-2xl font-bold text-primary -translate-x-6">
    MOONSTONE CABS
  </div>

  {/* NEW LINE ADDED */}
  <div className="text-xs text-primary font-semibold self-end translate-x-6">
    A Ride with Ease and Comfort. Try it...
  </div>
</Link>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" onClick={scrollToTop} className={`text-sm font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary' : 'text-foreground'}`} data-testid="link-nav-home">
              Home
            </Link>

            {/* Company Dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('company')} onMouseLeave={() => setOpenDropdown(null)}>
              <button className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 ${location.startsWith('/company') ? 'text-primary' : 'text-foreground'}`} data-testid="button-nav-company">
                Company <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {openDropdown === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-md shadow-lg py-2"
                  >
                    {companyLinks.map((link) => (
                      <Link key={link.path} href={link.path} onClick={scrollToTop}>
                        <a className="block px-4 py-2 text-sm hover:bg-accent transition-colors" data-testid={`link-company-${link.path.split('/').pop()}`}>
                          {link.label}
                        </a>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('services')} onMouseLeave={() => setOpenDropdown(null)}>
              <button className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 ${location.startsWith('/services') ? 'text-primary' : 'text-foreground'}`} data-testid="button-nav-services">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {openDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white border border-border rounded-md shadow-lg py-2"
                  >
                    {serviceLinks.map((link) => (
                      <Link key={link.path} href={link.path} onClick={scrollToTop}>
                        <a className="block px-4 py-2 text-sm hover:bg-accent transition-colors" data-testid={`link-service-${link.path.split('/').pop()}`}>
                          {link.label}
                        </a>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/clients" onClick={scrollToTop} className={`text-sm font-medium hover:text-primary transition-colors ${location === '/clients' ? 'text-primary' : 'text-foreground'}`} data-testid="link-nav-clients">
              Clients
            </Link>
            <Link href="/fleets" onClick={scrollToTop} className={`text-sm font-medium hover:text-primary transition-colors ${location === '/fleets' ? 'text-primary' : 'text-foreground'}`} data-testid="link-nav-fleets">
              Fleets
            </Link>
            <Link href="/careers" onClick={scrollToTop} className={`text-sm font-medium hover:text-primary transition-colors ${location === '/careers' ? 'text-primary' : 'text-foreground'}`} data-testid="link-nav-careers">
              Careers
            </Link>
            <Link href="/contact" onClick={scrollToTop} className={`text-sm font-medium hover:text-primary transition-colors ${location === '/contact' ? 'text-primary' : 'text-foreground'}`} data-testid="link-nav-contact">
              Contact Us
            </Link>
          </nav>

          {/* CTA Button */}
          {/* CTA Button + Phone */}
<div className="hidden lg:flex items-center gap-6">

 

  {/* Book Taxi Button */}
  <Link href="/booking" onClick={scrollToTop}>
    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-book-taxi">
      Book a Taxi
    </Button>
  </Link>
 {/* Phone Number */}
  <a
    href="tel:+919536575768"
    className="flex items-center gap-2 text-primary font-semibold whitespace-nowrap"
  >
    <Phone className="w-5 h-5" />
    <span>+91-9536575768 <hr />+91-9990800718</span>
  </a>
</div>


          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border"
            >
              <div className="px-4 py-4 space-y-4">
                <Link href="/" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                  <div className="text-sm font-medium py-2" data-testid="link-mobile-home">Home</div>
                </Link>
                <div>
                  <div className="text-sm font-medium py-2 text-muted-foreground">Company</div>
                  <div className="pl-4 space-y-2">
                    {companyLinks.map((link) => (
                      <Link key={link.path} href={link.path} onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                        <div className="text-sm py-1" data-testid={`link-mobile-company-${link.path.split('/').pop()}`}>{link.label}</div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium py-2 text-muted-foreground">Services</div>
                  <div className="pl-4 space-y-2">
                    {serviceLinks.map((link) => (
                      <Link key={link.path} href={link.path} onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                        <div className="text-sm py-1" data-testid={`link-mobile-service-${link.path.split('/').pop()}`}>{link.label}</div>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/clients" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                  <div className="text-sm font-medium py-2" data-testid="link-mobile-clients">Clients</div>
                </Link>
                <Link href="/fleets" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                  <div className="text-sm font-medium py-2" data-testid="link-mobile-fleets">Fleets</div>
                </Link>
                <Link href="/careers" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                  <div className="text-sm font-medium py-2" data-testid="link-mobile-careers">Careers</div>
                </Link>
                <Link href="/contact" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                  <div className="text-sm font-medium py-2" data-testid="link-mobile-contact">Contact Us</div>
                </Link>
                <Link href="/booking" onClick={() => { setIsMobileMenuOpen(false); scrollToTop(); }}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-mobile-book">
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
