import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import Logo from "./logo";
import { useAuth } from "@/context/auth-context";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { openModal } = useAuthModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Nav items
  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <nav 
      className={`py-4 px-6 sticky top-0 z-30 transition-all duration-300 ${
        scrolled 
          ? "bg-black border-b border-secondary/20 shadow-lg backdrop-blur-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="nav-item text-white hover:text-secondary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Authentication Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button 
                variant="outline" 
                asChild
                className="border-secondary text-secondary hover:bg-secondary/20 hover:text-white transition-all duration-300"
              >
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
              <Button 
                onClick={() => logout()}
                className="bg-primary hover:bg-primary/90 text-white glow-effect transition-all duration-300"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => openModal("login")}
                className="border-secondary text-secondary hover:bg-secondary/20 hover:text-white transition-all duration-300"
              >
                Log In
              </Button>
              <Button
                onClick={() => openModal("signup")}
                className="bg-primary hover:bg-primary/90 text-white glow-effect transition-all duration-300"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="animated-gradient-bg border-l border-secondary/30">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="text-white hover:text-secondary transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              <div className="pt-4 border-t border-white/10">
                {isAuthenticated ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full mb-3 border-secondary text-secondary hover:bg-secondary/20"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/dashboard">
                        Dashboard
                      </Link>
                    </Button>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white" 
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full mb-3 border-secondary text-secondary hover:bg-secondary/20"
                      onClick={() => {
                        setIsMenuOpen(false);
                        openModal("login");
                      }}
                    >
                      Log In
                    </Button>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      onClick={() => {
                        setIsMenuOpen(false);
                        openModal("signup");
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;