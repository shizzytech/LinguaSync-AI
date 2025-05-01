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

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Personalized Recommendations */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
                    <Brain size={18} className="text-primary" />
                    <span className="text-sm">AI-Chat Basics (87%)</span>
                    <Button variant="primary" size="sm" className="ml-auto">
                      Start
                    </Button>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap size={18} className="text-orange-500" />
                    <span className="text-sm">Travel Food Lesson</span>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Continue
                    </Button>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCheck size={18} className="text-green-500" />
                    <span className="text-sm">Flashcard Grammar Set Cards</span>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Review
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Progress Stats */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Progress (XP)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <div className="font-bold text-2xl text-primary">15</div>
                  <div className="ml-2 text-sm text-gray-500">today's earned</div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span>Daily goal: 50 XP</span>
                    <span>15/50</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div className="mt-4 flex justify-between text-sm font-medium">
                  <div className="flex flex-col items-center">
                    <span className="text-xl text-primary font-bold">9,245</span>
                    <span className="text-gray-500">Total XP</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl text-primary font-bold">14</span>
                    <span className="text-gray-500">Day Streak</span>
                  </div>
                </div>
                <Button className="w-full mt-4">Continue Learning</Button>
              </CardContent>
            </Card>
          </div>

          {/* Middle column - Feature tabs */}
          <div className="col-span-1 md:col-span-2">
            <Tabs defaultValue="ai-chat">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="ai-chat" className="flex items-center">
                  <Brain className="mr-2 h-4 w-4" /> AI-Chat
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="flex items-center">
                  <Zap className="mr-2 h-4 w-4" /> Flashcards
                </TabsTrigger>
                <TabsTrigger value="quizzes" className="flex items-center">
                  <CheckCheck className="mr-2 h-4 w-4" /> Quizzes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai-chat">
                <Card className="border-t-4 border-t-primary">
                  <CardHeader>
                    <CardTitle>Practice conversation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Have a natural conversation with our AI language partner. It adapts to your level and helps you improve your speaking skills.
                    </p>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCheck size={16} className="text-green-500" />
                        <span className="text-sm">Real-time pronunciation feedback</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCheck size={16} className="text-green-500" />
                        <span className="text-sm">Vocabulary suggestions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCheck size={16} className="text-green-500" />
                        <span className="text-sm">Grammar correction</span>
                      </li>
                    </ul>
                    <Button className="w-full">Start Conversation</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="flashcards">
                <Card className="border-t-4 border-t-orange-500">
                  <CardHeader>
                    <CardTitle>Build your vocabulary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Review and learn new words with our smart flashcard system. Cards are prioritized based on what you need to practice most.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="border p-4 rounded-md text-center bg-gray-50">
                        <span className="block text-lg font-medium mb-2">Basic Set</span>
                        <span className="text-sm text-gray-500">64 cards</span>
                      </div>
                      <div className="border p-4 rounded-md text-center bg-gray-50">
                        <span className="block text-lg font-medium mb-2">Travel Set</span>
                        <span className="text-sm text-gray-500">48 cards</span>
                      </div>
                    </div>
                    <Button className="w-full">Practice Flashcards</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quizzes">
                <Card className="border-t-4 border-t-green-500">
                  <CardHeader>
                    <CardTitle>Test your knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Take quizzes to test your language skills and track your progress. Each quiz adapts to focus on your weak areas.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <span>Beginner Grammar Quiz</span>
                        <span className="text-sm text-gray-500">10 questions</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <span>Food Vocabulary Quiz</span>
                        <span className="text-sm text-gray-500">15 questions</span>
                      </div>
                    </div>
                    <Button className="w-full">Take Quiz</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Feedback Card */}
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mentor Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-3">
                  <p className="text-gray-700 italic text-sm mb-2">
                    "Your accent has greatly improved over the past 7 days. Let's focus on improving your verb conjugations."
                  </p>
                  <div className="text-right text-xs text-gray-500">— Lara</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-gray-700 italic text-sm mb-2">
                    "I've added some additional travel phrases to your next lesson that will be helpful for your trip."
                  </p>
                  <div className="text-right text-xs text-gray-500">— Miguel</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Hub */}
        <h2 className="text-xl font-bold my-6">Social Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Community Challenges */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Community Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Users size={16} className="text-primary" />
                  <span className="text-sm">30 Day Streak Challenge</span>
                  <span className="text-xs text-gray-500 ml-auto">20/30 days</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users size={16} className="text-primary" />
                  <span className="text-sm">1000 Words Challenge</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full ml-auto">
                    Completed
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Users size={16} className="text-primary" />
                  <span className="text-sm">Weekly Vocabulary Quiz</span>
                  <Button size="sm" variant="outline" className="ml-auto">
                    Join
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span className="text-lg">Leaderboard</span>
                <Button variant="link" size="sm" className="p-0">
                  View Full Leaderboard
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-blue-50 rounded-md">
                  <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                    1
                  </div>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-blue-200">AB</AvatarFallback>
                  </Avatar>
                  <span>Your Rank: #365</span>
                  <span className="ml-auto font-bold">9,245</span>
                </div>
                
                <div className="flex items-center p-2">
                  <div className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                    2
                  </div>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-green-200">JD</AvatarFallback>
                  </Avatar>
                  <span>Alex</span>
                  <span className="ml-auto font-bold">10,500 Points</span>
                </div>
                
                <div className="flex items-center p-2">
                  <div className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                    3
                  </div>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-purple-200">SC</AvatarFallback>
                  </Avatar>
                  <span>Priya</span>
                  <span className="ml-auto font-bold">10,025 Points</span>
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
