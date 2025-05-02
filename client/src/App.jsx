import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
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
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>; // Loading spinner
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