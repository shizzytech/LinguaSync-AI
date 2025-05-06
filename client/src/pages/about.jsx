import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Sparkles, Zap, Globe, Users } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Active Users", value: "25K+", icon: Users },
    { label: "Languages", value: "45+", icon: Globe },
    { label: "AI Conversations", value: "1M+", icon: Sparkles },
    { label: "Learning Hours", value: "500K+", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section with Animated Background */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          {/* Animated background circles */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-blue-200 rounded-full mix-blend-multiply opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] -bottom-48 -right-48 bg-purple-200 rounded-full mix-blend-multiply opacity-20"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 pb-1 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Revolutionizing Language Learning
              </motion.h1>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <motion.div
                        className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <Icon className="w-8 h-8 text-primary" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="space-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.section
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-blue-600">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                At LinguaSync AI, we're revolutionizing language learning through the power of artificial intelligence. 
                Our mission is to make language learning more accessible, personalized, and effective for everyone, 
                breaking down language barriers and connecting people across cultures.
              </p>
            </motion.section>

            <motion.section
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-purple-600">What Sets Us Apart</h2>
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-6"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-white p-4 rounded-2xl shadow-md">
                    <Sparkles className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">AI-Powered Personalization</h3>
                    <p className="text-gray-700">Our advanced AI algorithms adapt to your learning style, pace, and goals, creating a truly personalized learning experience.</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-6"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-white p-4 rounded-2xl shadow-md">
                    <Zap className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Real-Time Feedback</h3>
                    <p className="text-gray-700">Get instant, accurate feedback on pronunciation, grammar, and vocabulary usage to accelerate your learning progress.</p>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            <motion.section
              className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 md:p-12 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-green-600">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                We envision a world where language barriers no longer limit human connection and opportunity. 
                Through innovative technology and continuous improvement, we're building a future where anyone 
                can master a new language efficiently and confidently.
              </p>
            </motion.section>

            <motion.section
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 md:p-12 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-orange-600">Join Our Journey</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                We're at the forefront of educational technology, constantly innovating to provide the best 
                language learning experience. Join our growing community of learners and be part of the 
                future of language education.
              </p>
            </motion.section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About; 