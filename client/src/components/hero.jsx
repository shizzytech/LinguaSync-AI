import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useAuth } from "@/context/auth-context";
import { Link } from "wouter";

const Hero = () => {
  const { openModal } = useAuthModal();
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/40 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-secondary/40 blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block">EASY <span className="text-secondary">&amp; BEST</span></span>
              <span className="block mt-1">WAY <span className="inline-block bg-secondary/20 rounded-full p-2">
                <span className="text-secondary">TO</span>
              </span></span>
              <span className="block mt-1">LEARNING</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Advanced AI to personalize your language journey. Learn faster, retain more, and achieve fluency with adaptive lessons.
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-700 p-4 bg-black/40 backdrop-blur-sm">
                <p className="font-medium text-gray-400 text-sm">Average User Success</p>
                <div className="flex items-end mt-1">
                  <span className="text-3xl font-bold text-accent">18.6%</span>
                  <span className="text-gray-400 ml-2 mb-1">Faster Learning</span>
                </div>
              </div>
              
              <div className="rounded-lg border border-gray-700 p-4 bg-black/40 backdrop-blur-sm">
                <p className="font-medium text-gray-400 text-sm">Total Active Users</p>
                <div className="flex items-end mt-1">
                  <span className="text-3xl font-bold text-accent">25,000+</span>
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
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="relative bg-primary rounded-blob w-full aspect-square flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path fill="#000000" d="M40.9,-49.2C52.4,-40.1,60.9,-26.7,66.1,-10.9C71.3,4.9,73.3,23.1,65.8,35.8C58.3,48.4,41.2,55.6,23.7,62C6.2,68.5,-11.7,74.3,-30.7,71.1C-49.7,67.9,-69.7,55.8,-76.3,38.5C-82.9,21.2,-76.1,-1.2,-67.9,-21.1C-59.6,-41,-49.9,-58.3,-36.3,-66.6C-22.8,-74.8,-5.3,-74.1,9,-68.8C23.3,-63.6,29.4,-58.2,40.9,-49.2Z" transform="translate(100 100)" />
                    </svg>
                  </div>
                  
                  {/* User images (circles) */}
                  <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full overflow-hidden border-2 border-white">
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gray-600">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full overflow-hidden border-2 border-white">
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gray-600">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Connecting line between the user circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-0.5 bg-white transform rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature text */}
            <div className="mt-8 text-center text-white">
              <p className="text-lg font-medium uppercase tracking-wider">
                EASY DIGITAL LEARNING THAT <br/>
                INCLUDES ACCOUNT AND <br/>
                SECURITY FEATURES
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;