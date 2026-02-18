import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-32 pb-20 container-custom flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6">About Time Event</h1>
            <p className="text-lg text-muted-foreground">Your trusted partner in creating unforgettable travel memories.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-4">
                Founded with a passion for exploration, <span className="text-primary font-bold">Time Event</span> is a premier travel agency dedicated to showcasing the beauty of the world to our clients.
              </p>
              <p className="mb-4">
                Under the leadership of <span className="font-semibold text-secondary">Mr. Rakesh Das</span>, we have curated exceptional travel experiences for thousands of happy travelers. We specialize in both domestic explorations of India's rich heritage and international adventures to exotic destinations.
              </p>
              <p>
                Our mission is simple: To provide hassle-free, safe, and memorable journeys that fit your budget and exceed your expectations.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3" />
              {/* Using screenshot provided by user or similar office/team image */}
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Team" 
                className="relative rounded-2xl shadow-xl z-10 w-full h-auto"
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
            
            <div className="inline-flex flex-col sm:flex-row gap-8 bg-white p-8 rounded-2xl shadow-sm border border-border">
              <div className="text-left">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Email Us</p>
                <a href="mailto:admin@timeevent.com" className="text-lg font-bold text-primary hover:underline">admin@timeevent.com</a>
              </div>
              <div className="hidden sm:block w-px bg-border" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Call / WhatsApp</p>
                <a href="tel:+919876543210" className="text-lg font-bold text-primary hover:underline">+91 98765 43210</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
