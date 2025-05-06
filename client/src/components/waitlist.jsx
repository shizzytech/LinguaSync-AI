import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, ChevronRight } from "lucide-react";

const waitlistFormSchema = insertWaitlistEntrySchema.extend({
  email: z.string().email("Please enter a valid email address"),
});

const Waitlist = () => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const form = useForm({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: "",
      referralSource: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data) => {
      const res = await apiRequest("POST", "/api/waitlist", data);
      return res.json();
    },
    onSuccess: (data) => {
      if (data.alreadyRegistered) {
        toast({
          title: "Already on the waitlist",
          description: "You're already on our waitlist! We'll notify you when access is available.",
          variant: "default",
        });
        form.reset();
        return;
      }
      
      toast({
        title: "Successfully joined the waitlist!",
        description: "Check your email for confirmation.",
      });
      form.reset();
    },
    onError: (error) => {
      const errorMessage = error.message || "Please try again later";
      
      toast({
        title: "Error joining waitlist",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data) {
    waitlistMutation.mutate(data);
  }

  return (
    <div className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      </div>
      
      {/* Animated Blobs */}
      <motion.div
        className="absolute -left-20 -top-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -right-20 -bottom-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="container relative mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 lg:p-12 relative group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Add glowing effect behind the card */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
          
          <div className="text-center mb-10">
            <motion.div 
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Limited Early Access</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join Our Exclusive Waitlist
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Be among the first to experience the future of language learning.
              Sign up for early access and receive exclusive benefits.
            </motion.p>
          </div>

          <motion.div 
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your email address"
                            {...field}
                            className="h-14 pl-6 pr-36 rounded-xl bg-white/50 border-white/20 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-300"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Button
                              type="submit"
                              className="relative group/btn h-10 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                              disabled={waitlistMutation.isPending}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              {/* Button glow effect */}
                              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-lg transform scale-110" />
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-hover/btn:opacity-30 animate-pulse transition-opacity duration-500" />
                              </div>

                              <AnimatePresence mode="wait">
                                {waitlistMutation.isPending ? (
                                  <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative z-10 flex items-center gap-2 px-4"
                                  >
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span className="text-white">Joining...</span>
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="default"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative z-10 flex items-center gap-2 px-4"
                                  >
                                    <span className="text-white">Join Now</span>
                                    <motion.div
                                      animate={{ 
                                        x: isHovered ? 5 : 0,
                                        rotate: isHovered ? 45 : 0 
                                      }}
                                      transition={{ 
                                        duration: 0.2,
                                        type: "spring",
                                        stiffness: 300
                                      }}
                                    >
                                      <ChevronRight className="w-4 h-4 text-white" />
                                    </motion.div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 ml-1 mt-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referralSource"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger className="h-14 rounded-xl bg-white/50 border-white/20 backdrop-blur-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-300">
                            <SelectValue placeholder="How did you hear about us?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="friend">Friend or Colleague</SelectItem>
                          <SelectItem value="search">Search Engine</SelectItem>
                          <SelectItem value="blog">Blog or Article</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 ml-1 mt-2" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </motion.div>

          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              We'll notify you as soon as early access is available
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Section with enhanced cards */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          {[
            { label: "People on waitlist", value: "25,000+" },
            { label: "Average wait time", value: "2 weeks" },
            { label: "Early access discount", value: "50% off" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group/card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {/* Card glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover/card:opacity-50 blur transition-all duration-500 animate-glow" />
              
              {/* Sparkle effects */}
              <motion.div
                className="absolute -inset-4 opacity-0 group-hover/card:opacity-100"
                initial={false}
                animate={isHovered ? {
                  background: [
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative bg-white/80 backdrop-blur-xl rounded-xl p-6 text-center border border-white/20 h-full transform transition-transform duration-300 group-hover/card:scale-[1.02]">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                  whileHover={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                
                <motion.p 
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.value}
                </motion.p>
                <motion.p 
                  className="text-gray-600 mt-1 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  {stat.label}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Waitlist;