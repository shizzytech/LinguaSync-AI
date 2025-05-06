import React from "react";
import { motion } from "framer-motion";
import Logo from "@/components/logo";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "wouter";

const FooterLink = ({ href, children }) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, x: 5 }}
    transition={{ duration: 0.2 }}
  >
    <a 
      href={href} 
      className="text-gray-400 hover:text-white transition-colors relative group"
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-lg opacity-0 group-hover:opacity-100 -z-10 blur-lg"
        initial={false}
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </a>
  </motion.li>
);

const FooterSection = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative"
  >
    <motion.h3 
      className="text-lg font-semibold mb-4 text-white relative inline-block"
      whileHover={{ scale: 1.05 }}
    >
      {title}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-lg opacity-0 group-hover:opacity-100 -z-10 blur-lg"
        initial={false}
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.h3>
    <ul className="space-y-2">
      {children}
    </ul>
  </motion.div>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 relative overflow-hidden">
      {/* 3D Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-1"
          >
            <Link href="/">
              <div className="mb-4 transform hover:scale-105 transition-transform cursor-pointer">
                <Logo size="lg" />
              </div>
            </Link>
            <motion.p 
              className="text-gray-400 max-w-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Empowering language learners with AI-driven personalized learning experiences.
            </motion.p>
          </motion.div>

          <FooterSection title="Company">
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Press</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
          </FooterSection>

          <FooterSection title="Resources">
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Language Guides</FooterLink>
            <FooterLink href="#">Community</FooterLink>
            <FooterLink href="#">API</FooterLink>
          </FooterSection>

          <FooterSection title="Legal">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterSection>
        </div>

        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center space-x-6 mb-4">
            {/* Social Media Icons with glow effect */}
            {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social, index) => (
              <motion.a
                key={social}
                href="#"
                className="relative group"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors">
                  {social}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-lg opacity-0 group-hover:opacity-100 -z-10 blur-lg"
                  initial={false}
                  animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.a>
            ))}
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm"
          >
            © {new Date().getFullYear()} LinguaSync AI. All rights reserved.
          </motion.p>
        </motion.div>

        {/* Animated corner decorations */}
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-blue-600/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>
    </footer>
  );
};

export default Footer; 