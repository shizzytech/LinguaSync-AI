import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
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

  return (
    <div id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Find answers to common questions about LinguaSync AI.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mb-4 bg-white rounded-lg shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-medium text-gray-900 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <a
              href="#contact"
              className="inline-flex items-center text-primary hover:text-blue-700"
            >
              Have more questions? Contact us →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
