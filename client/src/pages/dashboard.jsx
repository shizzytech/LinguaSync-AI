import React from "react";
import { Link } from "wouter";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";
import {
  Brain,
  Zap,
  CheckCheck,
  Users,
  Trophy,
  MessageSquare,
  User,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
          Welcome back, {user?.username || 'User'}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Personalized Recommendations */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                <CardTitle className="text-lg text-primary">
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 bg-blue-50/50 p-3 rounded-xl hover:bg-blue-100/50 transition-colors">
                    <Brain size={18} className="text-primary" />
                    <span className="text-sm font-medium">AI-Chat Basics (87%)</span>
                    <Button variant="primary" size="sm" className="ml-auto hover:scale-105 transition-transform">
                      Start
                    </Button>
                  </li>
                  <li className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                    <Zap size={18} className="text-orange-500" />
                    <span className="text-sm font-medium">Travel Food Lesson</span>
                    <Button variant="outline" size="sm" className="ml-auto hover:scale-105 transition-transform">
                      Continue
                    </Button>
                  </li>
                  <li className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                    <CheckCheck size={18} className="text-green-500" />
                    <span className="text-sm font-medium">Flashcard Grammar Set</span>
                    <Button variant="outline" size="sm" className="ml-auto hover:scale-105 transition-transform">
                      Review
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Progress Stats */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                <CardTitle className="text-lg text-green-600">Your Progress (XP)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="font-bold text-3xl text-primary">15</div>
                  <div className="ml-2 text-sm text-gray-500">XP earned today</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Daily goal: 50 XP</span>
                    <span className="text-primary">15/50</span>
                  </div>
                  <Progress value={30} className="h-2.5 bg-blue-100" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center hover:bg-blue-100/50 transition-colors">
                    <span className="text-2xl font-bold text-primary block">9,245</span>
                    <span className="text-sm text-gray-600">Total XP</span>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center hover:bg-green-100/50 transition-colors">
                    <span className="text-2xl font-bold text-green-600 block">14</span>
                    <span className="text-sm text-gray-600">Day Streak</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity">
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Middle column - Feature tabs */}
          <div className="col-span-1 md:col-span-2">
            <Tabs defaultValue="ai-chat" className="space-y-4">
              <TabsList className="grid grid-cols-3 bg-white/50 backdrop-blur-sm p-1 rounded-xl">
                <TabsTrigger value="ai-chat" className="data-[state=active]:bg-white data-[state=active]:text-primary rounded-lg">
                  <Brain className="mr-2 h-4 w-4" /> AI-Chat
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="data-[state=active]:bg-white data-[state=active]:text-primary rounded-lg">
                  <Zap className="mr-2 h-4 w-4" /> Flashcards
                </TabsTrigger>
                <TabsTrigger value="quizzes" className="data-[state=active]:bg-white data-[state=active]:text-primary rounded-lg">
                  <CheckCheck className="mr-2 h-4 w-4" /> Quizzes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai-chat">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                    <CardTitle className="text-primary">Practice conversation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-600">
                      Have a natural conversation with our AI language partner. It adapts to your level and helps you improve your speaking skills.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 bg-green-50 p-3 rounded-xl">
                        <CheckCheck size={16} className="text-green-500" />
                        <span className="text-sm font-medium">Real-time pronunciation feedback</span>
                      </li>
                      <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl">
                        <CheckCheck size={16} className="text-primary" />
                        <span className="text-sm font-medium">Vocabulary suggestions</span>
                      </li>
                      <li className="flex items-center gap-3 bg-indigo-50 p-3 rounded-xl">
                        <CheckCheck size={16} className="text-indigo-500" />
                        <span className="text-sm font-medium">Grammar correction</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity">
                      Start Conversation
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="flashcards">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-xl">
                    <CardTitle className="text-orange-600">Flashcards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Add flashcards content */}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quizzes">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                    <CardTitle className="text-green-600">Quizzes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Add quizzes content */}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Mentor Feedback */}
            <Card className="mt-6 border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
                <CardTitle className="text-lg text-purple-600">Mentor Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 hover:bg-blue-100/50 transition-colors">
                  <p className="text-gray-700 italic text-sm mb-2">
                    "Your accent has greatly improved over the past 7 days. Let's focus on improving your verb conjugations."
                  </p>
                  <div className="text-right text-xs text-primary font-medium">— Lara</div>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 hover:bg-purple-100/50 transition-colors">
                  <p className="text-gray-700 italic text-sm mb-2">
                    "I've added some additional travel phrases to your next lesson that will be helpful for your trip."
                  </p>
                  <div className="text-right text-xs text-purple-600 font-medium">— Miguel</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Hub */}
        <h2 className="text-2xl font-bold my-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Social Hub
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Community Challenges */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <CardTitle className="text-lg text-indigo-600">Community Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 bg-indigo-50 p-3 rounded-xl hover:bg-indigo-100/50 transition-colors">
                  <Users size={16} className="text-indigo-600" />
                  <span className="text-sm font-medium">30 Day Streak Challenge</span>
                  <span className="text-xs text-indigo-600 ml-auto">20/30 days</span>
                </li>
                <li className="flex items-center gap-3 bg-green-50 p-3 rounded-xl hover:bg-green-100/50 transition-colors">
                  <Users size={16} className="text-green-600" />
                  <span className="text-sm font-medium">1000 Words Challenge</span>
                  <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full ml-auto font-medium">
                    Completed
                  </span>
                </li>
                <li className="flex items-center gap-3 bg-orange-50 p-3 rounded-xl hover:bg-orange-100/50 transition-colors">
                  <Users size={16} className="text-orange-600" />
                  <span className="text-sm font-medium">Weekly Vocabulary Quiz</span>
                  <Button size="sm" variant="outline" className="ml-auto hover:scale-105 transition-transform">
                    Join
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <CardTitle className="flex justify-between items-center">
                <span className="text-lg text-blue-600">Leaderboard</span>
                <Button variant="link" size="sm" className="text-primary hover:text-blue-700 transition-colors p-0">
                  View Full Leaderboard
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-colors">
                  <div className="bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    1
                  </div>
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback className="bg-blue-200">AB</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Your Rank: #365</span>
                  <span className="ml-auto font-bold text-primary">9,245 XP</span>
                </div>
                
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    2
                  </div>
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback className="bg-green-200">JD</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Alex</span>
                  <span className="ml-auto font-bold text-gray-600">10,500 XP</span>
                </div>
                
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    3
                  </div>
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback className="bg-purple-200">SC</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Priya</span>
                  <span className="ml-auto font-bold text-gray-600">10,025 XP</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;