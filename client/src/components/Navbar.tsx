import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Mail, Menu, MessageCircle, Phone } from "lucide-react";
import logo from "/logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CONTACT_PHONE_DISPLAY = "+91 7363029492";
const CONTACT_PHONE_TEL = "tel:+917363029492";
const CONTACT_WHATSAPP = `https://wa.me/917363029492?text=${encodeURIComponent("Hi, I want to book a tour with Time In Event.")}`;
const CONTACT_EMAIL = "mailto:admin@timeinevent.com";

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
          <div className="bg-white p-0.5 rounded-lg shadow-sm transform group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center">
            <img src={logo} alt="Time In Event" className="h-9 w-auto object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-bold text-xl leading-none ${isScrolled ? "text-secondary" : "text-white"}`}>
              TIME IN EVENT
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-5 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 gap-1.5"
              >
                <Phone className="w-4 h-4 shrink-0" />
                Contact Us
                <ChevronDown className="w-4 h-4 shrink-0 opacity-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2 shadow-xl border-border/80">
              <DropdownMenuLabel className="px-3 py-2 font-normal">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reach us</p>
                <p className="mt-1 text-sm font-semibold text-secondary">{CONTACT_PHONE_DISPLAY}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Instant call or WhatsApp chat</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg p-0 focus:bg-muted/80">
                <a
                  href={CONTACT_PHONE_TEL}
                  className="flex items-center gap-3 px-3 py-3 outline-none"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-secondary">Call</span>
                    <span className="text-xs text-muted-foreground">Open dialer with this number</span>
                  </span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg p-0 focus:bg-muted/80 mt-1">
                <a
                  href={CONTACT_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-3 outline-none"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-secondary">WhatsApp</span>
                    <span className="text-xs text-muted-foreground">Chat with our travel desk</span>
                  </span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg p-0 focus:bg-muted/80">
                <a href={CONTACT_EMAIL} className="flex items-center gap-3 px-3 py-2.5 outline-none">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-secondary">Email</span>
                    <span className="text-xs text-primary truncate">admin@timeinevent.com</span>
                  </span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                <div className="border-t pt-6 space-y-4">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contact</h4>
                  <p className="text-secondary font-medium">Time In Event Management</p>
                  <p className="text-sm text-muted-foreground">{CONTACT_PHONE_DISPLAY}</p>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-full justify-center gap-2 rounded-xl bg-primary font-semibold shadow-md shadow-primary/20"
                      asChild
                    >
                      <a href={CONTACT_PHONE_TEL} onClick={() => setIsOpen(false)}>
                        <Phone className="h-4 w-4" />
                        Call now
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-center gap-2 rounded-xl border-emerald-600/40 text-emerald-800 hover:bg-emerald-50 font-semibold"
                      asChild
                    >
                      <a href={CONTACT_WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-center gap-2 text-secondary" asChild>
                      <a href={CONTACT_EMAIL} onClick={() => setIsOpen(false)}>
                        <Mail className="h-4 w-4" />
                        admin@timeinevent.com
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
