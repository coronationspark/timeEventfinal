import { useParams } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PackageCard } from "@/components/PackageCard";
import { usePackages } from "@/hooks/use-packages";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PackagesListProps {
  category?: 'domestic' | 'international';
}

export default function PackagesList({ category }: PackagesListProps) {
  // If no category prop, check params (wouter passes params differently, but we'll adapt)
  // For this implementation, we will pass category as prop from the router
  
  const { data: packages, isLoading, error } = usePackages(category);
  
  const title = category === 'domestic' ? 'Domestic Packages' : 'International Packages';
  const subtitle = category === 'domestic' 
    ? 'Discover the hidden gems of India' 
    : 'Explore breathtaking destinations across the globe';
  
  // Unsplash Header Images
  const headerImage = category === 'domestic' 
    ? "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop" // India/Taj Mahal
    : "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"; // Paris/Eiffel Tower

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={headerImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/70 backdrop-blur-[2px]" />
        </div>
        <div className="container-custom relative z-10 text-center text-white pt-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow py-16 bg-muted/10">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-destructive mb-2">Something went wrong</h3>
              <p className="text-muted-foreground">Failed to load packages. Please try again later.</p>
            </div>
          ) : packages && packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <PackageCard key={pkg.id} pkg={pkg} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-border">
              <h3 className="text-xl font-bold text-secondary mb-2">No Packages Found</h3>
              <p className="text-muted-foreground">
                We are currently updating our {category} tour packages. Please check back soon!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
