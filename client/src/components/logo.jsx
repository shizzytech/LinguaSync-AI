import React, { useState } from "react";
import { motion } from "framer-motion";

const Logo = ({ size = "md", showText = true }) => {
  const [isHovered, setIsHovered] = useState(false);

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
    <motion.div 
      className="flex items-center"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={`
          ${sizeMap[size]} 
          relative rounded-lg 
          bg-gradient-to-br from-blue-500 to-blue-600 
          text-white flex items-center justify-center
          shadow-lg
          before:absolute before:inset-0 
          before:rounded-lg before:bg-gradient-to-br 
          before:from-blue-400/50 before:to-blue-600/50 
          before:opacity-0 before:transition-opacity
          hover:before:opacity-100
          after:absolute after:inset-0 
          after:rounded-lg after:bg-gradient-to-br 
          after:from-white/10 after:to-transparent 
          after:opacity-0 after:transition-opacity
          hover:after:opacity-100
          backdrop-blur-sm
        `}
        animate={{
          rotateY: isHovered ? 15 : 0,
          rotateX: isHovered ? -15 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          animate={{
            boxShadow: isHovered 
              ? "0 0 20px 2px rgba(59, 130, 246, 0.5)" 
              : "0 0 0px 0px rgba(59, 130, 246, 0)"
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-2/3 h-2/3 relative z-10"
          animate={{
            rotate: isHovered ? [0, -5, 5, 0] : 0,
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 1],
          }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M9 11h.01" />
          <path d="M13 11h.01" />
          <path d="M17 11h.01" />
        </motion.svg>
      </motion.div>

      {showText && (
        <motion.div
          className={`
            ml-2 ${textSizeMap[size]} font-bold
            relative
          `}
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        >
          <motion.span
            className="inline-block bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent"
            animate={{
              y: isHovered ? [-1, 1, -1] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Lingua
          </motion.span>
          <motion.span
            className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent"
            animate={{
              y: isHovered ? [1, -1, 1] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Sync
          </motion.span>
          <motion.span
            className="inline-block ml-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 bg-clip-text text-transparent"
            animate={{
              y: isHovered ? [-1, 1, -1] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            AI
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;