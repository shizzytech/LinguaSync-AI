import React from "react";
import { Button } from "@/components/ui/button";
import { SiGoogle, SiGithub } from "react-icons/si";

const SocialButton = ({ provider, className }) => {
  const getProviderDetails = () => {
    switch (provider) {
      case "google":
        return {
          icon: <SiGoogle className="mr-2 h-4 w-4 text-secondary" />,
          label: "Google",
        };
      case "github":
        return {
          icon: <SiGithub className="mr-2 h-4 w-4 text-accent" />,
          label: "GitHub",
        };
      default:
        return {
          icon: null,
          label: provider,
        };
    }
  };

  const { icon, label } = getProviderDetails();

  const handleClick = () => {
    // This would be where you implement actual OAuth flow
    console.log(`Sign in with ${provider}`);
  };

  return (
    <Button
      variant="outline"
      className={`w-full flex items-center justify-center border-gray-700 bg-gray-900 text-white hover:bg-gray-800 transition-colors ${className}`}
      onClick={handleClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

export default SocialButton;