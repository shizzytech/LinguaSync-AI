import React, { useState } from "react";
import { Link } from "wouter";
import { 
  Brain, 
  Zap, 
  CheckCheck, 
  Users, 
  Trophy, 
  MessageSquare, 
  User, 
  Settings,
  BookOpen,
  BarChart3,
  Home,
  PanelLeft,
  Menu
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const [location] = React.useState("/dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out bg-sidebar text-sidebar-foreground 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}>
        
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-lg">LinguaSync</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto py-4">
            {/* Navigation Section */}
            <div className="px-3 mb-6">
              <div className="text-xs font-medium text-sidebar-muted-foreground mb-2 px-2">
                Navigation
              </div>
              <nav>
                <ul className="space-y-1">
                  <li>
                    <Link href="/dashboard">
                      <div className={`flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent ${
                        location === "/dashboard" ? "bg-sidebar-selected text-sidebar-selected-foreground font-medium" : ""
                      }`}>
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent cursor-pointer">
                      <Brain className="h-4 w-4" />
                      <span>AI Chat</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent cursor-pointer">
                      <BookOpen className="h-4 w-4" />
                      <span>Lessons</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent cursor-pointer">
                      <Zap className="h-4 w-4" />
                      <span>Flashcards</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent cursor-pointer">
                      <CheckCheck className="h-4 w-4" />
                      <span>Quizzes</span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Progress Section */}
            <div className="px-3 mb-6">
              <div className="text-xs font-medium text-sidebar-muted-foreground mb-2 px-2">
                Progress
              </div>
              <ul className="space-y-1">
                <li>
                  <div className="flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent cursor-pointer">
                    <BarChart3 className="h-4 w-4" />
                    <span>Statistics</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent cursor-pointer">
                    <Trophy className="h-4 w-4" />
                    <span>Achievements</span>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Community Section */}
            <div className="px-3">
              <div className="text-xs font-medium text-sidebar-muted-foreground mb-2 px-2">
                Community
              </div>
              <ul className="space-y-1">
                <li>
                  <div className="flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent cursor-pointer">
                    <Users className="h-4 w-4" />
                    <span>Community Challenges</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-sidebar-accent cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-white">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.username || 'User'}</span>
                <span className="text-xs text-sidebar-muted-foreground">Language Learner</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto text-sidebar-muted-foreground hover:text-sidebar-foreground" 
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Main content */}
      <div className="flex-1 md:ml-0">
        {/* Mobile header with menu toggle */}
        <div className="h-16 border-b border-gray-200 flex items-center px-4 md:hidden bg-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-4 text-gray-500"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-bold">LinguaSync</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;