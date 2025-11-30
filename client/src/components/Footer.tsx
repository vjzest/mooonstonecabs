import { Link } from 'wouter';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer
      className=" text-white pt-20  overflow-hidden bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/footer-bg.jpg')", // 👈 apni image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: '0',
        padding: '0',
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 "></div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-primary mb-4">
              MOONSTONE CABS
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for luxury taxi services and car rentals in Delhi & NCR.
            </p>
          </div>

          
          {/* Useful Links */}
          <div>
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
          <div >
            <h3 className="text-lg font-semibold mb-4">Office Address</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex  gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                <span >KH. NO. 45/18, Chhawla, Najafgarh, South West Delhi, New Delhi – 110043</span>
              </li>
              <li className="flex  gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:contact@moonstonecabs.com" className="hover:text-primary transition-colors">
                    contact@moonstonecabs.com
                  </a>
                  <a href="mailto:booking@moonstonecabs.com" className="hover:text-primary transition-colors">
                    booking@moonstonecabs.com
                  </a>
                   <a href="mailto:sales@moonstonecabs.com" className="hover:text-primary transition-colors">
                  sales@moonstonecabs.com
                  </a>
                </div>
              </li>
              <li className="flex  gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                <div className="flex flex-col  gap-1">
                  <a href="tel:+919536575768" className="hover:text-primary transition-colors">
                    +91-9536575768
                  </a>
                  <a href="tel:+919990800718" className="hover:text-primary transition-colors">
                    +91-9990800718
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Moonstone Cabs Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/cancellation" onClick={scrollToTop} className="hover:text-primary transition-colors">
                Cancellation Policy
              </Link>
              <Link href="/refund" onClick={scrollToTop} className="hover:text-primary transition-colors">
                Refund Policy
              </Link>
              <Link href="/disclaimer" onClick={scrollToTop} className="hover:text-primary transition-colors">
                Disclaimer
              </Link>
            </div>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
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
