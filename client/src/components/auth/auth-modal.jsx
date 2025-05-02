import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { useAuthModal, AUTH_MODES } from "@/hooks/use-auth-modal";

const AuthModal = () => {
  const { login, register: registerUser } = useAuth();
  const { isOpen, mode, closeModal } = useAuthModal();
  const [activeTab, setActiveTab] = useState(AUTH_MODES.SIGNUP);

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
  useEffect(() => {
    if (mode) {
      setActiveTab(mode);
    }
  }, [mode]);

  const onLoginSubmit = async (data) => {
    try {
      await login(data);
      closeModal();
    } catch (error) {
      // Don't close modal on error
      console.error("Login error:", error.message);
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      await registerUser(data);
      closeModal();
    } catch (error) {
      // Don't close modal on error
      console.error("Registration error:", error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md bg-black border border-secondary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {activeTab === AUTH_MODES.LOGIN ? "Log In" : "Sign Up"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            {activeTab === AUTH_MODES.LOGIN ? "Log in to your LinguaSync account" : "Create a new LinguaSync account"}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-900">
            <TabsTrigger 
              value={AUTH_MODES.SIGNUP}
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Sign Up
            </TabsTrigger>
            <TabsTrigger 
              value={AUTH_MODES.LOGIN}
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Log In
            </TabsTrigger>
          </TabsList>

          <TabsContent value={AUTH_MODES.SIGNUP}>
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email address</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white glow-effect transition-all duration-300">
                  Create Account
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value={AUTH_MODES.LOGIN}>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email address</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white glow-effect transition-all duration-300">
                  Log In
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialButton provider="google" />
          <SocialButton provider="github" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;