import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Target, 
  Lightbulb 
} from "lucide-react";

const DashboardPreview: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Your Personalized Dashboard</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Track your progress, set goals, and get personalized recommendations all in one place.
          </p>
        </div>

        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
            {/* SVG-based dashboard mockup instead of image */}
            <svg
              viewBox="0 0 1200 800"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              {/* Dashboard header */}
              <rect width="1200" height="80" fill="#f8fafc" />
              <text x="40" y="50" fontFamily="sans-serif" fontSize="28" fontWeight="bold" fill="#334155">Dashboard</text>
              
              {/* Sidebar */}
              <rect x="0" y="80" width="240" height="720" fill="#f1f5f9" />
              <rect x="20" y="120" width="200" height="50" rx="8" ry="8" fill="#3b82f6" />
              <text x="70" y="150" fontFamily="sans-serif" fontSize="16" fill="white">Home</text>
              <rect x="20" y="180" width="200" height="50" rx="8" ry="8" fill="#ffffff" />
              <text x="70" y="210" fontFamily="sans-serif" fontSize="16" fill="#64748b">Progress</text>
              <rect x="20" y="240" width="200" height="50" rx="8" ry="8" fill="#ffffff" />
              <text x="70" y="270" fontFamily="sans-serif" fontSize="16" fill="#64748b">Lessons</text>
              <rect x="20" y="300" width="200" height="50" rx="8" ry="8" fill="#ffffff" />
              <text x="70" y="330" fontFamily="sans-serif" fontSize="16" fill="#64748b">Community</text>
              
              {/* Main content */}
              <rect x="260" y="100" width="380" height="200" rx="8" ry="8" fill="#ffffff" stroke="#e2e8f0" />
              <text x="280" y="130" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#334155">Progress Summary</text>
              <rect x="280" y="150" width="340" height="130" rx="4" ry="4" fill="#f8fafc" />
              <rect x="300" y="170" width="300" height="20" rx="4" ry="4" fill="#3b82f6" />
              <rect x="300" y="200" width="180" height="20" rx="4" ry="4" fill="#10b981" />
              <rect x="300" y="230" width="250" height="20" rx="4" ry="4" fill="#f97316" />
              <text x="290" y="185" fontFamily="sans-serif" fontSize="14" fill="#64748b">Spanish</text>
              <text x="290" y="215" fontFamily="sans-serif" fontSize="14" fill="#64748b">French</text>
              <text x="290" y="245" fontFamily="sans-serif" fontSize="14" fill="#64748b">Japanese</text>
              
              {/* Recommendations */}
              <rect x="660" y="100" width="320" height="200" rx="8" ry="8" fill="#ffffff" stroke="#e2e8f0" />
              <text x="680" y="130" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#334155">Recommended Lessons</text>
              <rect x="680" y="150" width="280" height="40" rx="4" ry="4" fill="#f0f9ff" stroke="#bfdbfe" />
              <text x="700" y="175" fontFamily="sans-serif" fontSize="14" fill="#3b82f6">Spanish Conversation Practice</text>
              <rect x="680" y="200" width="280" height="40" rx="4" ry="4" fill="#f0f9ff" stroke="#bfdbfe" />
              <text x="700" y="225" fontFamily="sans-serif" fontSize="14" fill="#3b82f6">French Vocabulary Building</text>
              
              {/* Stats and metrics */}
              <rect x="260" y="320" width="220" height="180" rx="8" ry="8" fill="#ffffff" stroke="#e2e8f0" />
              <text x="280" y="350" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#334155">Daily Streak</text>
              <circle cx="370" cy="420" r="60" fill="#f0f9ff" stroke="#bfdbfe" strokeWidth="10" />
              <text x="350" y="430" fontFamily="sans-serif" fontSize="36" fontWeight="bold" fill="#3b82f6">14</text>
              <text x="335" y="460" fontFamily="sans-serif" fontSize="14" fill="#64748b">days</text>
              
              <rect x="500" y="320" width="220" height="180" rx="8" ry="8" fill="#ffffff" stroke="#e2e8f0" />
              <text x="520" y="350" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#334155">Vocabulary</text>
              <circle cx="610" cy="420" r="60" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="10" />
              <text x="580" y="430" fontFamily="sans-serif" fontSize="36" fontWeight="bold" fill="#10b981">128</text>
              <text x="570" y="460" fontFamily="sans-serif" fontSize="14" fill="#64748b">words</text>
              
              <rect x="740" y="320" width="220" height="180" rx="8" ry="8" fill="#ffffff" stroke="#e2e8f0" />
              <text x="760" y="350" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#334155">XP Points</text>
              <circle cx="850" cy="420" r="60" fill="#fff7ed" stroke="#fed7aa" strokeWidth="10" />
              <text x="820" y="430" fontFamily="sans-serif" fontSize="36" fontWeight="bold" fill="#f97316">950</text>
              <text x="830" y="460" fontFamily="sans-serif" fontSize="14" fill="#64748b">XP</text>
            </svg>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BarChart3 className="text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Track Progress</h3>
                    <p className="text-gray-600">Monitor your learning journey with detailed analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Target className="text-green-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Set Goals</h3>
                    <p className="text-gray-600">Customize your learning objectives and pace</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Lightbulb className="text-orange-500" />
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
