import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useAuth } from "@/context/auth-context";
import { Link } from "wouter";
import { motion } from "framer-motion";

const Hero = () => {
  const { openModal } = useAuthModal();
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-8 xs:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Animated background elements - Adjusted for tablets */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[300px] xs:w-[500px] lg:w-[600px] h-[300px] xs:h-[500px] lg:h-[600px] -top-20 xs:-top-40 lg:-top-60 -left-20 xs:-left-40 lg:-left-60 bg-blue-200 rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
        <div className="absolute w-[300px] xs:w-[500px] lg:w-[600px] h-[300px] xs:h-[500px] lg:h-[600px] -bottom-20 xs:-bottom-40 lg:-bottom-60 -right-20 xs:-right-40 lg:-right-60 bg-purple-200 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute w-[300px] xs:w-[500px] lg:w-[600px] h-[300px] xs:h-[500px] lg:h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center lg:gap-12">
          <motion.div 
            className="w-full md:w-1/2 md:pr-10 lg:pr-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-3xl xs:text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Master Languages with{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-lg transform scale-110"></span>
              </span>{" "}
              Learning
            </motion.h1>
            
            <motion.p 
              className="mt-4 xs:mt-6 text-base xs:text-lg lg:text-xl text-gray-600 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              LinguaSync AI uses advanced AI to personalize your language learning journey. Learn faster, retain more, and achieve fluency with adaptive lessons tailored just for you.
            </motion.p>

            <motion.div 
              className="mt-6 xs:mt-8 lg:mt-10 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {isAuthenticated ? (
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="group relative px-4 xs:px-6 lg:px-8 py-4 xs:py-6 text-base xs:text-lg lg:text-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    <span className="relative z-10">Go to Dashboard</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg" 
                  onClick={() => {
                    const waitlistSection = document.querySelector('#waitlist');
                    if (waitlistSection) {
                      waitlistSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group relative px-4 xs:px-6 lg:px-8 py-4 xs:py-6 text-base xs:text-lg lg:text-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-full sm:w-auto"
                >
                  <span className="relative z-10">Join Waitlist</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              )}
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto group relative px-4 xs:px-6 lg:px-8 py-4 xs:py-6 text-base xs:text-lg lg:text-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:border-primary/50"
                asChild
              >
                <a href="#features">
                  <span className="relative z-10">See Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              </Button>
            </motion.div>

            <motion.div 
              className="mt-6 lg:mt-8 flex items-center justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex -space-x-2 lg:-space-x-3">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-8 xs:w-10 lg:w-12 h-8 xs:h-10 lg:h-12 rounded-full border-2 border-white flex items-center justify-center text-white relative overflow-hidden`}
                    style={{
                      backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6'][i],
                      zIndex: 3 - i
                    }}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 xs:w-4 lg:w-5 h-3 xs:h-4 lg:h-5">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </motion.div>
                ))}
              </div>
              <p className="ml-3 lg:ml-4 text-xs xs:text-sm lg:text-base text-gray-600">Join 25,000+ LinguaSync AI learners</p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/2 mt-8 xs:mt-10 md:mt-0 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative group perspective-1000 max-w-[280px] xs:max-w-none lg:max-w-[500px] mx-auto">
              <motion.div 
                className="relative bg-white rounded-2xl shadow-2xl p-4 xs:p-6 lg:p-8 transform transition-all duration-500 group-hover:rotate-y-6 group-hover:scale-105"
                whileHover={{ rotateY: 6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                  >
                    <defs>
                      <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.05" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <rect width="200" height="200" fill="#e6efff" rx="10" ry="10" />
                    <g filter="url(#glow)">
                      <circle cx="100" cy="70" r="40" fill="#3b82f6" opacity="0.3" />
                      <circle cx="150" cy="100" r="30" fill="#10b981" opacity="0.3" />
                      <circle cx="50" cy="120" r="25" fill="#f97316" opacity="0.3" />
                    </g>
                    <rect x="40" y="50" width="120" height="15" rx="5" ry="5" fill="#3b82f6" opacity="0.7" />
                    <rect x="40" y="80" width="100" height="10" rx="5" ry="5" fill="#64748b" opacity="0.5" />
                    <rect x="40" y="100" width="80" height="10" rx="5" ry="5" fill="#64748b" opacity="0.5" />
                    <rect x="40" y="120" width="90" height="10" rx="5" ry="5" fill="#64748b" opacity="0.5" />
                    <rect x="40" y="140" width="120" height="30" rx="5" ry="5" fill="#10b981" opacity="0.7" />
                  </svg>
                </div>
              </motion.div>
              
              {/* Floating elements - Adjusted for mobile */}
              <motion.div
                className="absolute -right-2 xs:-right-4 -top-2 xs:-top-4 w-8 xs:w-12 h-8 xs:h-12 bg-blue-500 rounded-full opacity-20"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute -left-2 xs:-left-4 -bottom-2 xs:-bottom-4 w-6 xs:w-8 h-6 xs:h-8 bg-green-500 rounded-full opacity-20"
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;