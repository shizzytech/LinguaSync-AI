import React, { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useAuth } from "@/context/auth-context";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <motion.a
      href={href}
      className="relative px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-blue-600"
        initial={{ width: isActive ? "100%" : "0%" }}
        animate={{ width: isActive || isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.2 }}
      />

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-blue-600/10 opacity-0"
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      if (document?.body) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "#faq" },
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "nav-scrolled" : ""
      }`}
    >
      {/* Glassmorphism background */}
      <motion.div
        className="absolute inset-0 bg-white/80 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/">
              <Logo />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button asChild>
                  <a href="/dashboard" className="relative group">
                    <span className="relative z-10">Dashboard</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-20 rounded-lg blur"
                      initial={false}
                      animate={{ scale: [0.95, 1.05, 0.95] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </a>
                </Button>
              </motion.div>
            ) : location !== "/about" && (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="ghost"
                    onClick={() => openModal("login")}
                    className="relative group"
                  >
                    <span className="relative z-10">Login</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 rounded-lg"
                      initial={false}
                      animate={{ scale: [0.95, 1.05, 0.95] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    onClick={() => openModal("signup")}
                    className="relative group"
                  >
                    <span className="relative z-10">Join Waitlist</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-20 rounded-lg blur"
                      initial={false}
                      animate={{ scale: [0.95, 1.05, 0.95] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  variants={itemVariants}
                  className="block py-3 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div variants={itemVariants} className="mt-4 space-y-2">
                {isAuthenticated ? (
                  <Button asChild className="w-full">
                    <a href="/dashboard">Dashboard</a>
                  </Button>
                ) : location !== "/about" && (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        openModal("login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        openModal("signup");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Join Waitlist
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;