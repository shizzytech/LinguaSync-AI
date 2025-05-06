import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialButton from "@/components/ui/social-button";
import { useAuth } from "@/context/auth-context";
import { loginSchema, registerSchema } from "@shared/schema";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { cn } from "@/lib/utils";

const formVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

const inputVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.2 }
  })
};

const AuthModal = () => {
  const { login, register: registerUser } = useAuth();
  const { isOpen, mode, closeModal } = useAuthModal();
  const [activeTab, setActiveTab] = useState("signup");
  const [isLoading, setIsLoading] = useState(false);

  // Login form
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle tab change
  React.useEffect(() => {
    if (mode) {
      setActiveTab(mode);
    }
  }, [mode]);

  const onLoginSubmit = async (data) => {
    try {
      setIsLoading(true);
      await login(data);
      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      setIsLoading(true);
      await registerUser(data);
      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2 text-black">
              {activeTab === "login" ? "Welcome Back!" : "Create Account"}
            </DialogTitle>
            <p className="text-center text-black text-sm">
              {activeTab === "login" 
                ? "Sign in to your account to continue"
                : "Sign up for a new account to get started"
              }
            </p>
          </DialogHeader>

          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full mt-4"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup" className="text-black">Sign Up</TabsTrigger>
              <TabsTrigger value="login" className="text-black">Log In</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {activeTab === "signup" ? (
                  <Form {...registerForm}>
                    <form
                      onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                      className="space-y-4"
                    >
                      <motion.div variants={inputVariants} custom={0}>
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">Username</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="username"
                                  className="bg-gray-50 dark:bg-gray-800 text-black placeholder-gray-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={inputVariants} custom={1}>
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">Email address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="example@example.com"
                                  className="bg-gray-50 dark:bg-gray-800 text-black placeholder-gray-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={inputVariants} custom={2}>
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password"
                                  className="bg-gray-50 dark:bg-gray-800 text-black placeholder-gray-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={inputVariants} custom={3}>
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">Confirm Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password"
                                  className="bg-gray-50 dark:bg-gray-800 text-black placeholder-gray-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={inputVariants} custom={4}>
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                ) : (
                  <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                      className="space-y-4"
                    >
                      <motion.div variants={inputVariants} custom={0}>
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">Email address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="example@example.com"
                                  className="bg-gray-50 dark:bg-gray-800 text-black placeholder-gray-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={inputVariants} custom={1}>
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password"
                                  className="bg-gray-50 dark:bg-gray-800 text-black placeholder-gray-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={inputVariants} custom={2}>
                        <div className="flex items-center justify-between">
                          <FormField
                            control={loginForm.control}
                            name="remember"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal text-black">Remember me</FormLabel>
                              </FormItem>
                            )}
                          />
                          <Button variant="link" className="px-0 text-primary" onClick={() => {}}>
                            Forgot password?
                          </Button>
                        </div>
                      </motion.div>

                      <motion.div variants={inputVariants} custom={3}>
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                )}

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-900 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <SocialButton provider="google">Google</SocialButton>
                  <SocialButton provider="github">GitHub</SocialButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;