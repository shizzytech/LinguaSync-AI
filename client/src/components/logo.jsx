import React from "react";

const Logo = ({ size = "md", showText = true }) => {
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
    <div className="flex items-center group">
      <div 
        className={`${sizeMap[size]} rounded-lg bg-black border-2 border-secondary text-white flex items-center justify-center transition-all duration-300 glow-effect overflow-hidden`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-2/3 h-2/3 text-secondary"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M9 11h.01" />
          <path d="M13 11h.01" />
          <path d="M17 11h.01" />
        </svg>
      </div>
      {showText && (
        <div className="ml-2 overflow-hidden">
          <span className={`${textSizeMap[size]} font-bold text-white inline-block relative`}>
            <span className="inline-block relative z-10">Lingua</span>
            <span className="inline-block text-secondary relative z-10 group-hover:float-animation">Sync</span>
            <span className="relative z-10 font-light ml-1 text-primary">AI</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;