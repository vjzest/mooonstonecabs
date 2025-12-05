import { Link } from "wouter";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
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
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* ---------- Company Info ---------- */}
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-primary mb-3">MOONSTONE CABS</div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto sm:mx-0">
              Your trusted partner for luxury taxi services and car rentals in Delhi & NCR.
            </p>
          </div>

          {/* ---------- Useful Links ---------- */}
          <div className="text-center sm:text-left">
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
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Contact Info ---------- */}
<div className="text-center sm:text-left">
  <h3 className="text-lg font-semibold mb-4">Office Address</h3>

  <ul className="space-y-4 text-sm text-gray-300">

    {/* Address */}
    <li className="flex gap-3 items-start text-left">
      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
      <span className="block leading-relaxed">
        KH. NO. 45/18, Chhawla, Najafgarh, South West Delhi, New Delhi – 110043
      </span>
    </li>

    {/* Emails */}
    <li className="flex gap-3 items-start text-left">
      <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
      <div className="flex flex-col gap-1">
        <a href="mailto:contact@moonstonecabs.com" className="hover:text-primary transition">
          contact@moonstonecabs.com
        </a>
        <a href="mailto:booking@moonstonecabs.com" className="hover:text-primary transition">
          booking@moonstonecabs.com
        </a>
        <a href="mailto:sales@moonstonecabs.com" className="hover:text-primary transition">
          sales@moonstonecabs.com
        </a>
      </div>
    </li>

    {/* Phone Numbers */}
    <li className="flex gap-3 items-start text-left">
      <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
      <div className="flex flex-col gap-1">
        <a href="tel:+919536575768" className="hover:text-primary transition">
          +91-9536575768
        </a>
        <a href="tel:+919990800718" className="hover:text-primary transition">
          +91-9990800718
        </a>
      </div>
    </li>

  </ul>
</div>

        </div>

        {/* ---------- Bottom Bar ---------- */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Social Icons */}
          <div className="flex gap-5">
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-gray-300 hover:text-primary transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-gray-300 hover:text-primary transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Policies */}
          <div className="flex flex-wrap justify-center gap-4 text-gray-300 text-xs sm:text-sm">
            {[
              { label: "Cancellation Policy", path: "/cancellation" },
              { label: "Refund Policy", path: "/refund" },
              { label: "Disclaimer", path: "/disclaimer" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={scrollToTop}
                className="hover:text-primary transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-gray-300 text-xs sm:text-sm text-center">
            © {new Date().getFullYear()} Moonstone Cabs Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
