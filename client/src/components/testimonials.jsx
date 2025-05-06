import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";
import { motion } from "framer-motion";

const Testimonial = ({
  content,
  name,
  language,
  duration,
  rating,
  avatarColor,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <motion.div
          key={`star-${i}`}
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: isHovered ? [0, 5, -5, 0] : 0 
          }}
          transition={{ 
            duration: 0.5,
            delay: i * 0.1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 1
          }}
        >
          <Star className="fill-yellow-400 text-yellow-400" size={18} />
        </motion.div>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <motion.div
          key="half-star"
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: isHovered ? [0, 5, -5, 0] : 0 
          }}
          transition={{ 
            duration: 0.5,
            delay: fullStars * 0.1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 1
          }}
        >
          <StarHalf className="fill-yellow-400 text-yellow-400" size={18} />
        </motion.div>
      );
    }

    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <motion.div
          key={`empty-star-${i}`}
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: isHovered ? [0, 5, -5, 0] : 0 
          }}
          transition={{ 
            duration: 0.5,
            delay: (fullStars + (hasHalfStar ? 1 : 0) + i) * 0.1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 1
          }}
        >
          <Star
            className="text-yellow-400 stroke-yellow-400"
            size={18}
            fill="transparent"
          />
        </motion.div>
      );
    }

    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="h-full"
      style={{ transformOrigin: 'center center' }}
    >
      <motion.div
        className="relative group h-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformOrigin: 'center center' }}
      >
        <Card className="relative bg-white border border-gray-200 h-full flex flex-col">
          {/* Glow effect container */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ transformOrigin: 'center center' }}
          />

          {/* Light reflection effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100"
            animate={{
              x: isHovered ? ["0%", "100%"] : "0%",
              opacity: isHovered ? [0, 0.5, 0] : 0,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ transformOrigin: 'center center' }}
          />

          <CardContent className="relative p-4 xs:p-6 backdrop-blur-sm flex flex-col flex-grow">
            <motion.div 
              className="flex items-center mb-3 xs:mb-4 gap-0.5 xs:gap-1"
              animate={{
                x: isHovered ? [0, 5, -5, 0] : 0,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex gap-0.5 xs:gap-1">{renderStars()}</div>
            </motion.div>

            <motion.p 
              className="text-gray-600 italic flex-grow text-sm xs:text-base"
              animate={{
                y: isHovered ? [0, 2, -2, 0] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {content}
            </motion.p>

            <motion.div 
              className="mt-4 xs:mt-6 flex items-center"
              animate={{
                x: isHovered ? [0, 3, -3, 0] : 0,
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <motion.div
                className={`w-8 xs:w-10 h-8 xs:h-10 rounded-full ${avatarColor} flex items-center justify-center text-white relative overflow-hidden`}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                {/* Avatar glow effect */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30"
                  animate={{
                    scale: isHovered ? [1, 1.5, 1] : 1,
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="relative z-10 text-sm xs:text-base">{name.charAt(0)}</span>
              </motion.div>

              <motion.div 
                className="ml-2 xs:ml-3"
                animate={{
                  y: isHovered ? [0, 2, -2, 0] : 0,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h4 className="text-xs xs:text-sm font-medium text-gray-900">{name}</h4>
                <p className="text-xs xs:text-sm text-gray-500">
                  Learning {language} • {duration}
                </p>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      content:
        "LinguaSync's AI conversation partner feels incredibly natural. It's like having a patient tutor available 24/7 who remembers everything I've learned and adjusts to my level.",
      name: "Sophia Rodriguez",
      language: "French",
      duration: "3 months",
      rating: 5,
      avatarColor: "bg-blue-500",
    },
    {
      content:
        "The personalized recommendations have accelerated my Japanese learning dramatically. The system knows exactly what I need to practice and when.",
      name: "David Chen",
      language: "Japanese",
      duration: "5 months",
      rating: 5,
      avatarColor: "bg-green-500",
    },
    {
      content:
        "As someone who's tried many language apps, LinguaSync stands out with its social features. The community challenges keep me motivated and the leaderboard adds a fun competitive element.",
      name: "Emma Johnson",
      language: "Spanish",
      duration: "2 months",
      rating: 4.5,
      avatarColor: "bg-purple-500",
    },
  ];

  return (
    <div id="testimonials" className="relative py-12 xs:py-16 bg-gradient-to-b from-white to-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl xs:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            What Our Beta Users Say
          </h2>
          <p className="mt-3 xs:mt-4 max-w-2xl mx-auto text-sm xs:text-lg text-gray-600">
            Early adopters are already experiencing the benefits of LinguaSync AI.
          </p>
        </motion.div>

        <div className="relative mt-8 xs:mt-12 grid gap-4 xs:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 