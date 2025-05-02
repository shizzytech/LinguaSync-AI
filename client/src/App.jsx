import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home.jsx";
import Dashboard from "@/pages/dashboard";
import { useAuth } from "./context/auth-context";
import { useEffect, useState } from "react";

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isAppReady, setIsAppReady] = useState(false);
  
  // Wait for auth check before rendering routes
  useEffect(() => {
    if (!isLoading) {
      setIsAppReady(true);
    }
  }, [isLoading]);
  
  if (!isAppReady) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-gradient-bg">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    ); // Loading spinner with our new styling
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard">
        {isAuthenticated ? <Dashboard /> : <Home />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;