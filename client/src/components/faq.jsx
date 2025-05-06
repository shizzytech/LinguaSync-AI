import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqItems = [
    {
      question: "How does LinguaSync AI personalize my learning?",
      answer:
        "LinguaSync analyzes your learning patterns, strengths, and weaknesses to create a tailored curriculum. Our AI adapts to your pace, focuses on areas where you need improvement, and introduces new concepts when you're ready. The more you use the platform, the more personalized it becomes.",
    },
    {
      question: "Which languages are supported?",
      answer:
        "We currently support Spanish, French, German, Japanese, Mandarin Chinese, Italian, and Portuguese. We're actively working on adding more languages based on user feedback and demand.",
    },
    {
      question: "How does the waitlist work?",
      answer:
        "After signing up for the waitlist, you'll receive a confirmation email with your position. As we roll out access, waitlist members will be invited in batches. You can move up the waitlist by referring friends or engaging with our social media channels.",
    },
    {
      question: "Is LinguaSync effective for all proficiency levels?",
      answer:
        "Yes! Whether you're a complete beginner or an advanced learner looking to refine your skills, LinguaSync adapts to your proficiency level. Our AI assessment determines your starting point and continuously adjusts as you progress.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div id="faq" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Find answers to common questions about LinguaSync AI.
          </p>
        </motion.div>

        <motion.div 
          className="mt-12 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                className="overflow-hidden"
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-xl bg-white shadow-sm data-[state=open]:shadow-md transition-all duration-300 hover:shadow-md"
                >
                  <AccordionTrigger 
                    className="px-6 py-4 text-lg font-medium text-gray-900 hover:no-underline group"
                  >
                    <span className="group-hover:text-primary transition-colors">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent 
                    className="px-6 pb-4"
                  >
                    <div className="text-gray-600 prose prose-sm max-w-none">
                      <p className="leading-relaxed">{item.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center text-primary hover:text-blue-700 transition-colors group"
          >
            Have more questions? Contact us 
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ; 