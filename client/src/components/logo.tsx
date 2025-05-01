import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "md", showText = true }) => {
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const textSizeMap = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center">
      <div className={`${sizeMap[size]} rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-2/3 h-2/3"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M9 11h.01" />
          <path d="M13 11h.01" />
          <path d="M17 11h.01" />
        </svg>
      </div>
      {showText && (
        <span className={`ml-2 ${textSizeMap[size]} font-bold text-gray-800`}>
          LinguaSync AI
        </span>
      )}
    </div>
  );
};

export default Logo;
