import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";
import logo from "/logo.png";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-32 pb-20 container-custom flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6">About Time In Event</h1>
            <p className="text-lg text-muted-foreground">Your trusted partner in creating unforgettable travel memories.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-4">
                Founded with a passion for exploration, <span className="text-primary font-bold">Time In Event</span> is a premier travel agency dedicated to showcasing the beauty of the world to our clients.
              </p>
              <p className="mb-4">
                Under the leadership of <span className="font-semibold text-secondary">Time In Event Management</span>, we have curated exceptional travel experiences for thousands of happy travelers. We specialize in both domestic explorations of India's rich heritage and international adventures to exotic destinations.
              </p>
              <p>
                Our mission is simple: To provide hassle-free, safe, and memorable journeys that fit your budget and exceed your expectations.
              </p>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3" />
              <img 
                src={logo}
                alt="Time In Event Logo" 
                className="relative rounded-2xl shadow-xl z-10 w-64 h-auto object-contain bg-white p-6"
              />
            </div>
          </div>

          <div className="bg-secondary text-white rounded-3xl p-8 md:p-12 mb-20">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">Why Choose Us?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Personalized Itineraries tailored to your preferences",
                "24/7 Customer Support during your trip",
                "Best Price Guarantee with no hidden costs",
                "Expert Local Guides for authentic experiences",
                "Secure & Flexible Booking options",
                "Handpicked Hotels & Accommodations"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">Ready to plan your next adventure? Contact our team today.</p>
            
            <div className="mx-auto w-full max-w-2xl grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-start gap-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-border text-left">
              <div className="text-left">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Email Us</p>
                <a
                  href="mailto:admin@timeinevent.com"
                  className="text-base sm:text-lg font-bold text-primary hover:underline break-all"
                >
                  admin@timeinevent.com
                </a>
              </div>
              <div className="hidden sm:block w-px bg-border self-stretch" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Call / WhatsApp</p>
                <p className="text-base sm:text-lg font-bold text-primary mb-3">+91 7363029492</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+917363029492"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors min-w-[110px]"
                  >
                    Call
                  </a>
                  <a
                    href="https://wa.me/917363029492?text=Hi%20I%20want%20to%20book%20a%20tour"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors min-w-[110px]"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
