import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Plane, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Domestic", href: "/packages/domestic" },
    { name: "International", href: "/packages/international" },
    { name: "About", href: "/about" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location !== "/") return false;
    return location.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg text-white transform group-hover:rotate-12 transition-transform duration-300">
            <Plane className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-bold text-xl leading-none ${isScrolled ? "text-secondary" : "text-white"}`}>
              TIME EVENT
            </span>
            <span className={`text-xs font-medium tracking-widest ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}>
              TRAVELS
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                isActive(link.href)
                  ? "text-primary font-semibold"
                  : isScrolled
                  ? "text-secondary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
            onClick={() => window.location.href = "mailto:admin@timeevent.com"}
          >
            <Phone className="w-4 h-4 mr-2" />
            Contact Us
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? "text-secondary" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <div className="flex flex-col gap-8 mt-10">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-lg font-medium p-2 rounded-md transition-colors ${
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-secondary hover:bg-muted"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t pt-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Contact</h4>
                  <p className="text-secondary font-medium">Rakesh Das</p>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  <p className="text-sm text-muted-foreground">admin@timeevent.com</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
