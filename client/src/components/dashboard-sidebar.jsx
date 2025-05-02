import React from "react";
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
  PanelLeft
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="px-5 flex items-center justify-between border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2 py-3">
              <span className="font-bold text-lg">LinguaSync</span>
            </Link>
            <SidebarTrigger />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      icon={<Home className="h-4 w-4" />}
                      isCurrent={location === "/dashboard"}
                      asChild
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      icon={<Brain className="h-4 w-4" />}
                      isCurrent={location === "/dashboard/ai-chat"}
                    >
                      AI Chat
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      icon={<BookOpen className="h-4 w-4" />}
                      isCurrent={location === "/dashboard/lessons"}
                    >
                      Lessons
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      icon={<Zap className="h-4 w-4" />}
                      isCurrent={location === "/dashboard/flashcards"}
                    >
                      Flashcards
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      icon={<CheckCheck className="h-4 w-4" />}
                      isCurrent={location === "/dashboard/quizzes"}
                    >
                      Quizzes
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Progress</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      icon={<BarChart3 className="h-4 w-4" />}
                      isCurrent={location === "/dashboard/statistics"}
                    >
                      Statistics
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      icon={<Trophy className="h-4 w-4" />}
                      isCurrent={location === "/dashboard/achievements"}
                    >
                      Achievements
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Community</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      icon={<Users className="h-4 w-4" />}
                      isCurrent={location === "/dashboard/community"}
                    >
                      Community Challenges
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      icon={<MessageSquare className="h-4 w-4" />}
                      isCurrent={location === "/dashboard/messages"}
                    >
                      Messages
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 px-2">
              <Avatar>
                <AvatarFallback className="bg-primary text-white">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.username || 'User'}</span>
                <span className="text-xs text-gray-500">Language Learner</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto" 
                asChild
              >
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
};

export default DashboardSidebar;