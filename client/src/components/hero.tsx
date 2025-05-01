import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useAuth } from "@/context/auth-context";
import { Link } from "wouter";

const Hero: React.FC = () => {
  const { openModal } = useAuthModal();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Master Languages with <span className="text-primary">AI-Powered</span> Learning
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              LinguaSync uses advanced AI to personalize your language learning journey. Learn faster, retain more, and achieve fluency with adaptive lessons tailored just for you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button size="lg" className="px-6 py-6 text-lg">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg" 
                  onClick={() => openModal("signup")}
                  className="px-6 py-6 text-lg"
                >
                  Join Waitlist
                </Button>
              )}
              <Button 
                variant="outline" 
                size="lg"
                className="px-6 py-6 text-lg"
                asChild
              >
                <a href="#features">See Demo</a>
              </Button>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex -space-x-2">
                {/* User avatars - using SVG instead of images */}
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              <p className="ml-3 text-sm text-gray-600">Join 25,000+ language learners</p>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              {/* SVG illustration instead of actual image */}
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto rounded-lg shadow-xl"
              >
                <rect width="200" height="200" fill="#e6efff" rx="10" ry="10" />
                <circle cx="100" cy="70" r="40" fill="#3b82f6" opacity="0.3" />
                <circle cx="150" cy="100" r="30" fill="#10b981" opacity="0.3" />
                <circle cx="50" cy="120" r="25" fill="#f97316" opacity="0.3" />
                <rect x="40" y="50" width="120" height="15" rx="5" ry="5" fill="#3b82f6" opacity="0.7" />
                <rect x="40" y="80" width="100" height="10" rx="5" ry="5" fill="#64748b" opacity="0.5" />
                <rect x="40" y="100" width="80" height="10" rx="5" ry="5" fill="#64748b" opacity="0.5" />
                <rect x="40" y="120" width="90" height="10" rx="5" ry="5" fill="#64748b" opacity="0.5" />
                <rect x="40" y="140" width="120" height="30" rx="5" ry="5" fill="#10b981" opacity="0.7" />
                <text x="100" y="160" textAnchor="middle" fill="white" fontWeight="bold">Get Started</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
