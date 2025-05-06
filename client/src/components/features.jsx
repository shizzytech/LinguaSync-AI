import React, { useState, useEffect } from "react";
import {
  Brain,
  Zap,
  CheckCheck,
  Users,
  LineChart,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const FeatureCard = ({
  icon,
  title,
  description,
  iconBgColor,
  benefits,
  autoFlip,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (autoFlip) {
      const flipInterval = setInterval(() => {
        setIsFlipped(prev => !prev);
      }, 10000);

      return () => clearInterval(flipInterval);
    }
  }, [autoFlip]);

  return (
    <motion.div
      className="relative h-[250px] xs:h-[300px] lg:h-[320px] perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 backface-hidden">
          <motion.div 
            className="p-4 xs:p-6 lg:p-8 h-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            }}
          >
            <motion.div
              className={`${iconBgColor} p-2 xs:p-3 lg:p-4 rounded-lg inline-block mb-3 xs:mb-4 lg:mb-6 transition-transform duration-300`}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
            >
              {React.cloneElement(icon, { 
                size: typeof window !== 'undefined' && window.innerWidth < 480 ? 20 : 
                       typeof window !== 'undefined' && window.innerWidth < 1024 ? 24 : 28 
              })}
            </motion.div>
            <motion.h3 
              className="text-lg xs:text-xl lg:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
              animate={{
                y: isHovered ? -5 : 0,
              }}
            >
              {title}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="mt-2 text-sm xs:text-base lg:text-lg text-gray-600">{description}</p>
              <a
                href="#"
                className="mt-3 xs:mt-4 lg:mt-6 inline-flex items-center text-sm xs:text-base lg:text-lg text-primary hover:text-blue-700 transition-all duration-300"
              >
                Learn more 
                <motion.span 
                  className="ml-2"
                  animate={{
                    x: isHovered ? 5 : 0,
                  }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="p-4 xs:p-6 lg:p-8 h-full bg-gradient-to-br from-primary/10 to-blue-600/10 backdrop-blur-lg border border-white/20 rounded-lg flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-primary/5"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <motion.h4 
                className="text-base xs:text-lg lg:text-xl font-semibold mb-2 lg:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 relative inline-block group"
                whileHover={{ scale: 1.05 }}
              >
                Key Benefits
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-blue-600 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.h4>
              
              <ul className="text-xs xs:text-sm lg:text-base space-y-2 lg:space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center justify-center group relative"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="relative flex items-center justify-center w-full">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-600/5 rounded-lg opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0.95 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <CheckCheck className="w-3 xs:w-4 lg:w-5 h-3 xs:h-4 lg:h-5 mr-1 xs:mr-2 lg:mr-3 text-green-500 group-hover:text-primary transition-colors duration-200" />
                      <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200 relative">
                        {benefit}
                        <motion.div
                          className="absolute -bottom-0.5 left-0 w-full h-px bg-gradient-to-r from-primary/40 to-blue-600/40"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-600/10 to-primary/10 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>
        </Card>
      </motion.div>

      {/* Floating particles */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              className="absolute -z-10 w-3 xs:w-4 lg:w-5 h-3 xs:h-4 lg:h-5 rounded-full bg-primary/20"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [-15, -30],
                y: [-15, -30],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute -z-10 w-3 xs:w-4 lg:w-5 h-3 xs:h-4 lg:h-5 rounded-full bg-blue-500/20"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [15, 30],
                y: [15, 30],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Features = () => {
  const [autoFlipIndices, setAutoFlipIndices] = useState([]);

  useEffect(() => {
    // Randomly select two different indices
    const selectRandomIndices = () => {
      const indices = new Set();
      while (indices.size < 2) {
        indices.add(Math.floor(Math.random() * 6));
      }
      setAutoFlipIndices(Array.from(indices));
    };

    // Initial selection
    selectRandomIndices();

    // Change random cards every 30 seconds
    const changeInterval = setInterval(selectRandomIndices, 30000);

    return () => clearInterval(changeInterval);
  }, []);

  const features = [
    {
      icon: <Brain className="text-primary" />,
      title: "AI-Chat Practice",
      description:
        "Practice real conversations with our AI language partners that adapt to your proficiency level.",
      iconBgColor: "bg-blue-100",
      benefits: [
        "Natural conversation flow with context awareness",
        "Accent and pronunciation feedback",
        "Cultural context and idiom explanations"
      ]
    },
    {
      icon: <Zap className="text-orange-500" />,
      title: "Flashcards",
      description:
        "Boost your vocabulary with smart flashcards that prioritize words you need to practice.",
      iconBgColor: "bg-orange-100",
      benefits: [
        "Spaced repetition learning system",
        "Context-based word associations",
        "Personalized review schedules"
      ]
    },
    {
      icon: <CheckCheck className="text-green-500" />,
      title: "Quizzes",
      description:
        "Test your knowledge with adaptive quizzes that focus on your weak areas to maximize improvement.",
      iconBgColor: "bg-green-100",
      benefits: [
        "Dynamic difficulty adjustment",
        "Comprehensive progress tracking",
        "Targeted weakness improvement"
      ]
    },
    {
      icon: <Users className="text-purple-600" />,
      title: "Social Hub",
      description:
        "Connect with fellow learners, participate in challenges, and celebrate achievements together.",
      iconBgColor: "bg-purple-100",
      benefits: [
        "Language exchange partnerships",
        "Community learning challenges",
        "Cultural exchange events"
      ]
    },
    {
      icon: <LineChart className="text-red-500" />,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and personalized improvement recommendations.",
      iconBgColor: "bg-red-100",
      benefits: [
        "Detailed performance analytics",
        "Custom learning path optimization",
        "Goal achievement tracking"
      ]
    },
    {
      icon: <MessageSquare className="text-yellow-600" />,
      title: "Mentor Feedback",
      description:
        "Receive personalized feedback on your pronunciation, grammar, and vocabulary usage.",
      iconBgColor: "bg-yellow-100",
      benefits: [
        "Expert language instructor reviews",
        "Detailed error explanations",
        "Improvement suggestions"
      ]
    },
  ];

  return (
    <div id="features" className="py-12 xs:py-16 lg:py-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 opacity-80"></div>
      
      {/* Content */}
      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Powerful Learning Features
          </h2>
          <p className="mt-3 xs:mt-4 lg:mt-6 max-w-2xl mx-auto text-sm xs:text-base lg:text-lg text-gray-600">
            Our AI-powered platform offers everything you need to accelerate your
            language learning journey.
          </p>
        </motion.div>

        <motion.div 
          className="mt-8 xs:mt-12 lg:mt-16 grid gap-4 xs:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgColor={feature.iconBgColor}
              benefits={feature.benefits}
              autoFlip={autoFlipIndices.includes(index)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Features; 