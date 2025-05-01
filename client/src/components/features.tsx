import React from "react";
import {
  Brain,
  Zap,
  CheckCheck,
  Users,
  LineChart,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  iconBgColor,
}) => {
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className={`${iconBgColor} p-3 rounded-lg inline-block mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <a
          href="#"
          className="mt-4 inline-flex items-center text-primary hover:text-blue-700"
        >
          Learn more <span className="ml-2">→</span>
        </a>
      </CardContent>
    </Card>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Brain className="text-primary" size={24} />,
      title: "AI-Chat Practice",
      description:
        "Practice real conversations with our AI language partners that adapt to your proficiency level.",
      iconBgColor: "bg-blue-100",
    },
    {
      icon: <Zap className="text-orange-500" size={24} />,
      title: "Flashcards",
      description:
        "Boost your vocabulary with smart flashcards that prioritize words you need to practice.",
      iconBgColor: "bg-orange-100",
    },
    {
      icon: <CheckCheck className="text-green-500" size={24} />,
      title: "Quizzes",
      description:
        "Test your knowledge with adaptive quizzes that focus on your weak areas to maximize improvement.",
      iconBgColor: "bg-green-100",
    },
    {
      icon: <Users className="text-purple-600" size={24} />,
      title: "Social Hub",
      description:
        "Connect with fellow learners, participate in challenges, and celebrate achievements together.",
      iconBgColor: "bg-purple-100",
    },
    {
      icon: <LineChart className="text-red-500" size={24} />,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and personalized improvement recommendations.",
      iconBgColor: "bg-red-100",
    },
    {
      icon: <MessageSquare className="text-yellow-600" size={24} />,
      title: "Mentor Feedback",
      description:
        "Receive personalized feedback on your pronunciation, grammar, and vocabulary usage.",
      iconBgColor: "bg-yellow-100",
    },
  ];

  return (
    <div id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Powerful Learning Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Our AI-powered platform offers everything you need to accelerate your
            language learning journey.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgColor={feature.iconBgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
