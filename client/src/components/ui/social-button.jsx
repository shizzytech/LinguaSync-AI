import React from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const SocialButton = ({ provider, children }) => {
  const Icon = provider === "google" ? FaGoogle : FaGithub;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="outline"
        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => {
          // Handle social login
          console.log(`Login with ${provider}`);
        }}
      >
        <Icon className="mr-2 h-4 w-4" />
        {children}
      </Button>
    </motion.div>
  );
};

export default SocialButton;