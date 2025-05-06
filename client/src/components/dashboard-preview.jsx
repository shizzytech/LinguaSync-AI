import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Target, 
  Lightbulb 
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Your Personalized Dashboard
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Track your progress, set goals, and get personalized recommendations all in one place.
          </p>
        </div>

        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* SVG-based dashboard mockup instead of image */}
            <svg
              viewBox="0 0 1200 800"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              {/* Dashboard header with gradient */}
              <defs>
                <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: "#60a5fa", stopOpacity: 0.05 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="80" fill="url(#headerGradient)" />
              <text x="40" y="50" fontFamily="sans-serif" fontSize="28" fontWeight="bold" fill="#1e40af">Dashboard</text>
              
              {/* Sidebar with hover effects */}
              <rect x="0" y="80" width="240" height="720" fill="#f8fafc" />
              <rect x="20" y="120" width="200" height="50" rx="8" ry="8" fill="#3b82f6" className="hover:fill-blue-700 transition-colors" />
              <text x="70" y="150" fontFamily="sans-serif" fontSize="16" fill="white">Home</text>
              <rect x="20" y="180" width="200" height="50" rx="8" ry="8" fill="#ffffff" className="hover:fill-gray-50 transition-colors" />
              <text x="70" y="210" fontFamily="sans-serif" fontSize="16" fill="#64748b">Progress</text>
              <rect x="20" y="240" width="200" height="50" rx="8" ry="8" fill="#ffffff" className="hover:fill-gray-50 transition-colors" />
              <text x="70" y="270" fontFamily="sans-serif" fontSize="16" fill="#64748b">Lessons</text>
              <rect x="20" y="300" width="200" height="50" rx="8" ry="8" fill="#ffffff" className="hover:fill-gray-50 transition-colors" />
              <text x="70" y="330" fontFamily="sans-serif" fontSize="16" fill="#64748b">Community</text>
              
              {/* Main content with modern styling */}
              <rect x="260" y="100" width="380" height="200" rx="12" ry="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <text x="280" y="130" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#1e40af">Progress Summary</text>
              <rect x="280" y="150" width="340" height="130" rx="8" ry="8" fill="#f8fafc" />
              <rect x="300" y="170" width="300" height="20" rx="4" ry="4" fill="#3b82f6">
                <animate attributeName="width" from="0" to="300" dur="1s" />
              </rect>
              <rect x="300" y="200" width="180" height="20" rx="4" ry="4" fill="#10b981">
                <animate attributeName="width" from="0" to="180" dur="1s" delay="0.2s" />
              </rect>
              <rect x="300" y="230" width="250" height="20" rx="4" ry="4" fill="#f97316">
                <animate attributeName="width" from="0" to="250" dur="1s" delay="0.4s" />
              </rect>
              
              {/* Recommendations with hover effects */}
              <rect x="660" y="100" width="320" height="200" rx="12" ry="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <text x="680" y="130" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#1e40af">Recommended Lessons</text>
              <rect x="680" y="150" width="280" height="40" rx="8" ry="8" fill="#f0f9ff" stroke="#bfdbfe" className="hover:fill-blue-100 transition-colors" />
              <text x="700" y="175" fontFamily="sans-serif" fontSize="14" fill="#3b82f6">Spanish Conversation Practice</text>
              <rect x="680" y="200" width="280" height="40" rx="8" ry="8" fill="#f0f9ff" stroke="#bfdbfe" className="hover:fill-blue-100 transition-colors" />
              <text x="700" y="225" fontFamily="sans-serif" fontSize="14" fill="#3b82f6">French Vocabulary Building</text>
            </svg>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BarChart3 className="text-primary h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Track Progress</h3>
                    <p className="text-gray-600">Monitor your learning journey with detailed analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 shadow-sm hover:shadow-lg hover:border-green-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Target className="text-green-500 h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Set Goals</h3>
                    <p className="text-gray-600">Customize your learning objectives and pace</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 shadow-sm hover:shadow-lg hover:border-orange-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Lightbulb className="text-orange-500 h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Get Recommendations</h3>
                    <p className="text-gray-600">Receive personalized learning suggestions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview; 