import { Link } from 'wouter';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer
      className="relative text-white pt-12 pb-8 overflow-hidden bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/footer-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" aria-hidden="true" />

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-primary mb-3">
              MOONSTONE CABS
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto sm:mx-0">
              Your trusted partner for luxury taxi services and car rentals in Delhi & NCR.
            </p>
          </div>

          
          {/* Useful Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#booking" onClick={scrollToTop} className="text-gray-400 hover:text-primary transition-colors">
                  Taxi Booking
                </Link>
              </li>
              <li>
                <Link href="/help" onClick={scrollToTop} className="text-gray-400 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" onClick={scrollToTop} className="text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" onClick={scrollToTop} className="text-gray-400 hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={scrollToTop} className="text-gray-400 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Office Address</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex flex-col sm:flex-row sm:items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                <span className="max-w-xs">KH. NO. 45/18, Chhawla, Najafgarh, South West Delhi, New Delhi – 110043</span>
              </li>
              <li className="flex gap-2 items-start">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary mt-1" />
                <div className="flex flex-col gap-1 text-sm">
                  <a href="mailto:contact@moonstonecabs.com" className="hover:text-primary transition-colors text-gray-300">
                    contact@moonstonecabs.com
                  </a>
                  <a href="mailto:booking@moonstonecabs.com" className="hover:text-primary transition-colors text-gray-300">
                    booking@moonstonecabs.com
                  </a>
                  <a href="mailto:sales@moonstonecabs.com" className="hover:text-primary transition-colors text-gray-300">
                    sales@moonstonecabs.com
                  </a>
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary mt-1" />
                <div className="flex flex-col gap-1 text-sm">
                  <a href="tel:+919536575768" className="hover:text-primary transition-colors text-gray-300">
                    +91-9536575768
                  </a>
                  <a href="tel:+919990800718" className="hover:text-primary transition-colors text-gray-300">
                    +91-9990800718
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-300 text-center md:text-left">
              © {new Date().getFullYear()} Moonstone Cabs Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <Link href="/cancellation" onClick={scrollToTop} className="hover:text-primary transition-colors text-gray-300">
                Cancellation Policy
              </Link>
              <Link href="/refund" onClick={scrollToTop} className="hover:text-primary transition-colors text-gray-300">
                Refund Policy
              </Link>
              <Link href="/disclaimer" onClick={scrollToTop} className="hover:text-primary transition-colors text-gray-300">
                Disclaimer
              </Link>
            </div>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Moonstone Cabs on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Moonstone Cabs on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
