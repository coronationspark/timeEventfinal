import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Plane } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded text-white">
                <Plane className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-xl">TIME EVENT</span>
            </div>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              Creating unforgettable memories through curated travel experiences. Your journey begins with us.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link href="/packages/domestic" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">Domestic Packages</Link>
              </li>
              <li>
                <Link href="/packages/international" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">International Packages</Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-secondary-foreground/70">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Travel Lane, Adventure City, India - 751024</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/70">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/70">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>admin@timeevent.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Admin Details</h3>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-sm font-medium text-white">Rakesh Das</p>
              <p className="text-xs text-secondary-foreground/60 mt-1">Manager & Founder</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-secondary-foreground/60 italic">
                  "Dedicated to making your dream vacation a reality."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-secondary-foreground/50">
            © {new Date().getFullYear()} Time Event. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-secondary-foreground/50">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
