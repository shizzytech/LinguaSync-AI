import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";

interface TestimonialProps {
  content: string;
  name: string;
  language: string;
  duration: string;
  rating: number;
  avatarColor: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  content,
  name,
  language,
  duration,
  rating,
  avatarColor,
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" size={18} />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400" size={18} />);
    }

    // Add empty stars to make 5 total
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-star-${i}`}
          className="text-yellow-400 stroke-yellow-400"
          size={18}
          fill="transparent"
        />
      );
    }

    return stars;
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">{renderStars()}</div>
        </div>
        <p className="text-gray-600 italic">{content}</p>
        <div className="mt-6 flex items-center">
          <div
            className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white`}
          >
            {name.charAt(0)}
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">
              Learning {language} • {duration}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials: React.FC = () => {
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
    <div id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Beta Users Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Early adopters are already experiencing the benefits of LinguaSync
            AI.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
