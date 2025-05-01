import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Logo from "./logo";
import { useAuth } from "@/context/auth-context";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { openModal } = useAuthModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-gray-900">
            Features
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900">
            Testimonials
          </a>
          <a href="#faq" className="text-gray-600 hover:text-gray-900">
            FAQ
          </a>
        </div>

        {/* Authentication Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
              <Button onClick={() => logout()}>Log Out</Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => openModal("login")}
              >
                Log In
              </Button>
              <Button
                onClick={() => openModal("signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#faq" 
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>

              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full mb-3"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/dashboard">
                        Dashboard
                      </Link>
                    </Button>
                    <Button 
                      className="w-full" 
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
                      className="w-full mb-3"
                      onClick={() => {
                        setIsMenuOpen(false);
                        openModal("login");
                      }}
                    >
                      Log In
                    </Button>
                    <Button 
                      className="w-full"
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
