import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include', // Include cookies in the request
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) {
          if (res.status === 401) {
            // Not authenticated - this is a normal state
            setUser(null);
            return;
          }
          throw new Error(`Auth check failed with status: ${res.status}`);
        }
        
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Login failed');
      }
      
      return res.json();
    },
    onSuccess: (data) => {
      setUser(data.user);
      toast({
        title: "Logged in successfully",
        description: "Welcome back to LinguaSync AI!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
    onError: (error) => {
      const errorMessage = error.message || "Please check your credentials and try again";
      
      // Display user-friendly error message
      let title = "Login failed";
      let description = errorMessage;
      
      if (errorMessage.includes("Invalid credentials")) {
        description = "The email or password you entered is incorrect. Please try again.";
      }
      
      toast({
        title,
        description,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      const res = await apiRequest('POST', '/api/auth/register', data);
      return res.json();
    },
    onSuccess: (data) => {
      setUser(data.user);
      toast({
        title: "Registration successful",
        description: "Welcome to LinguaSync AI!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
    onError: (error) => {
      const errorMessage = error.message || "Please check your information and try again";
      
      // Display user-friendly error message
      let title = "Registration failed";
      let description = errorMessage;
      
      if (errorMessage.includes("Email already in use")) {
        description = "This email is already registered. Please use a different email or try logging in.";
      }
      
      toast({
        title,
        description,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/auth/logout', {});
      return res.json();
    },
    onSuccess: () => {
      setUser(null);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
    onError: () => {
      toast({
        title: "Logout failed",
        description: "There was a problem logging out",
        variant: "destructive",
      });
    },
  });

  const login = async (credentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const register = async (data) => {
    await registerMutation.mutateAsync(data);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Separate export for useAuth to avoid Fast Refresh issues
function useAuthInternal() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const useAuth = useAuthInternal;