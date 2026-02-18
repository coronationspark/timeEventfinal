import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PackageCard } from "@/components/PackageCard";
import { usePackages } from "@/hooks/use-packages";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck, Headphones } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const { data: packages, isLoading } = usePackages();
  
  // Filter featured packages or take first 3
  const featuredPackages = packages?.filter(p => p.featured).slice(0, 3) || packages?.slice(0, 3) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash image of scenic travel landscape */}
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
            alt="Beautiful landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 leading-tight">
              Explore the World with <br />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-400">
                Time Event
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light">
              Discover breathtaking destinations, curated experiences, and unforgettable journeys tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages/domestic">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 py-6 rounded-full w-full sm:w-auto">
                  Domestic Tours
                </Button>
              </Link>
              <Link href="/packages/international">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white hover:text-secondary font-semibold text-lg px-8 py-6 rounded-full w-full sm:w-auto">
                  International Tours
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full z-0" />
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Unsplash image of happy travelers */}
                <img 
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1000&auto=format&fit=crop" 
                  alt="Travelers" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-6">
                Welcome to <span className="text-primary">Time Event</span>
              </h2>
              <div className="prose text-muted-foreground mb-8">
                <p className="mb-4">
                  At Time Event, we believe that travel is not just about visiting new places, but about collecting experiences that last a lifetime. Managed by Rakesh Das, our agency is dedicated to providing you with the most seamless and memorable travel experiences.
                </p>
                <p>
                  Whether you're looking for a relaxing beach getaway, a thrilling mountain adventure, or a cultural exploration, we have the perfect package for you. Our expert team handles all the details so you can focus on making memories.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3 text-primary">
                    <Star className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-secondary mb-1">Top Rated</h4>
                  <p className="text-xs text-muted-foreground">Best-in-class service quality</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3 text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-secondary mb-1">Secure</h4>
                  <p className="text-xs text-muted-foreground">100% secure bookings</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3 text-primary">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-secondary mb-1">24/7 Support</h4>
                  <p className="text-xs text-muted-foreground">Always here to help you</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-3">Featured Packages</h2>
              <p className="text-muted-foreground">Handpicked destinations for your next adventure</p>
            </div>
            <Link href="/packages/domestic">
              <Button variant="ghost" className="hidden sm:flex text-primary hover:text-primary/80 hover:bg-primary/10">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] bg-gray-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg, idx) => (
                <PackageCard key={pkg.id} pkg={pkg} index={idx} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center sm:hidden">
            <Link href="/packages/domestic">
              <Button className="w-full">
                View All Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
