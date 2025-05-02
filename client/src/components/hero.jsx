import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useAuth } from "@/context/auth-context";
import { Link } from "wouter";

const Hero = () => {
  const { openModal } = useAuthModal();
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden py-16 md:py-24 animated-gradient-bg">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/60 blur-3xl"></div>
        <div className="absolute top-60 right-1/4 h-60 w-60 rounded-full bg-accent/40 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-secondary/60 blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight relative z-10">
              <span className="block">EASY <span className="text-secondary glow-effect-text">& BEST</span></span>
              <span className="block mt-1">WAY <span className="inline-block bg-secondary/20 rounded-full p-2 ml-2">
                <span className="text-secondary font-black">TO</span>
              </span></span>
              <span className="block mt-1">LEARNING <span className="text-primary">LANGUAGES</span></span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 relative">
              <span className="before:content-[''] before:w-1 before:h-full before:bg-secondary before:absolute before:-left-4 before:top-0"></span>
              Advanced AI to personalize your language journey. Learn faster, retain more, and achieve fluency with 
              <span className="text-white font-medium"> adaptive lessons powered by AI.</span>
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-primary/30 p-5 bg-black/40 backdrop-blur-sm hover:border-primary/70 transition-all duration-300 group">
                <p className="font-medium text-gray-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                  Average User Success
                </p>
                <div className="flex items-end mt-2">
                  <span className="text-3xl font-bold text-accent group-hover:text-accent/90 transition-colors">18.6%</span>
                  <span className="text-gray-400 ml-2 mb-1 group-hover:text-gray-300 transition-colors">Faster Learning</span>
                </div>
              </div>
              
              <div className="rounded-lg border border-secondary/30 p-5 bg-black/40 backdrop-blur-sm hover:border-secondary/70 transition-all duration-300 group">
                <p className="font-medium text-gray-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2"></span>
                  Total Active Users
                </p>
                <div className="flex items-end mt-2">
                  <span className="text-3xl font-bold text-accent group-hover:text-accent/90 transition-colors">25,000+</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button size="lg" className="px-6 py-6 text-lg bg-primary hover:bg-primary/90 glow-effect">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg" 
                  onClick={() => openModal("signup")}
                  className="px-6 py-6 text-lg bg-primary hover:bg-primary/90 glow-effect"
                >
                  Sign Up Free
                </Button>
              )}
              <Button 
                variant="outline" 
                size="lg"
                className="px-6 py-6 text-lg border-secondary text-secondary hover:bg-secondary/20"
                asChild
              >
                <a href="#features">See Features</a>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-16 md:mt-0">
            <div className="relative float-animation">
              {/* Feature image inspired by the design with the purple blob and profiles */}
              <div className="w-full h-full max-w-lg mx-auto relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl"></div>
                <div className="relative bg-primary/80 rounded-blob w-full aspect-square flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path fill="#000000" d="M40.9,-49.2C52.4,-40.1,60.9,-26.7,66.1,-10.9C71.3,4.9,73.3,23.1,65.8,35.8C58.3,48.4,41.2,55.6,23.7,62C6.2,68.5,-11.7,74.3,-30.7,71.1C-49.7,67.9,-69.7,55.8,-76.3,38.5C-82.9,21.2,-76.1,-1.2,-67.9,-21.1C-59.6,-41,-49.9,-58.3,-36.3,-66.6C-22.8,-74.8,-5.3,-74.1,9,-68.8C23.3,-63.6,29.4,-58.2,40.9,-49.2Z" transform="translate(100 100)" />
                    </svg>
                  </div>
                  
                  {/* Language bubbles */}
                  <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg float-animation" style={{animationDelay: '0.5s'}}>
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <span className="font-bold text-xl text-secondary">EN</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg float-animation" style={{animationDelay: '1s'}}>
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <span className="font-bold text-lg text-accent">FR</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/3 right-1/4 w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg float-animation" style={{animationDelay: '1.5s'}}>
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <span className="font-bold text-lg text-primary">ES</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1/4 left-1/3 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg float-animation" style={{animationDelay: '2s'}}>
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <span className="font-bold text-sm text-white">JP</span>
                    </div>
                  </div>
                  
                  {/* Connecting lines between the language bubbles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-0.5 bg-white/40 transform rotate-45"></div>
                    <div className="w-2/3 h-0.5 bg-white/40 transform -rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature text */}
            <div className="mt-10 text-center">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg border border-white/10">
                <p className="text-lg font-medium uppercase tracking-wider text-white">
                  <span className="block text-secondary">AI-POWERED</span> 
                  LANGUAGE LEARNING WITH <br/>
                  <span className="text-primary">SECURITY & ANALYTICS</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;