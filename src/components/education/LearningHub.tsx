import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, PlayCircle, Bookmark, CheckCircle, TrendingUp, DollarSign, CreditCard, Shield, PiggyBank, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Fix the spinner import
const Spinner = () => <Loader2 className="h-4 w-4 animate-spin" />;

const LearningHub = () => {
  const [activeTab, setActiveTab] = useState("courses");
  
  const courses = [
    {
      id: 1,
      title: "Financial Planning Basics",
      description: "Learn the fundamentals of budgeting, saving, and investing.",
      progress: 75,
      duration: "4 hours",
      lessons: 6,
      isCompleted: false,
      category: "Personal Finance",
    },
    {
      id: 2,
      title: "Investing in Stocks",
      description: "A comprehensive guide to stock market investing for beginners.",
      progress: 30,
      duration: "6 hours",
      lessons: 8,
      isCompleted: false,
      category: "Investing",
    },
    {
      id: 3,
      title: "Debt Management Strategies",
      description: "Effective strategies to manage and eliminate debt.",
      progress: 100,
      duration: "3 hours",
      lessons: 5,
      isCompleted: true,
      category: "Debt",
    },
    {
      id: 4,
      title: "Retirement Planning",
      description: "Plan your retirement with confidence.",
      progress: 15,
      duration: "5 hours",
      lessons: 7,
      isCompleted: false,
      category: "Retirement",
    },
  ];
  
  const articles = [
    {
      id: 1,
      title: "The Power of Compound Interest",
      description: "Understand how compound interest can grow your wealth.",
      category: "Investing",
      readingTime: "5 min",
    },
    {
      id: 2,
      title: "5 Steps to Create a Budget",
      description: "A simple guide to creating and sticking to a budget.",
      category: "Personal Finance",
      readingTime: "7 min",
    },
    {
      id: 3,
      title: "Understanding Credit Scores",
      description: "Learn what affects your credit score and how to improve it.",
      category: "Credit",
      readingTime: "6 min",
    },
  ];
  
  const tools = [
    {
      id: 1,
      title: "Budget Calculator",
      description: "Calculate your monthly budget and track your spending.",
      icon: <DollarSign size={20} />,
    },
    {
      id: 2,
      title: "Investment Calculator",
      description: "Estimate the potential growth of your investments.",
      icon: <TrendingUp size={20} />,
    },
    {
      id: 3,
      title: "Debt Payoff Calculator",
      description: "Plan your debt payoff strategy.",
      icon: <CreditCard size={20} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Unlock Your Financial Potential with <span className="text-gradient">Savvy</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Explore our learning resources and tools to achieve your financial goals.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-center">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                    {course.isCompleted ? (
                      <Badge variant="outline">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="secondary">{course.category}</Badge>
                    )}
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>{course.lessons} Lessons</span>
                      </div>
                    </div>
                    <Progress value={course.progress} />
                    <span className="text-xs text-muted-foreground">
                      {course.progress}% Complete
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Course
                  </Button>
                  <Button variant="ghost">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="articles" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">{article.title}</CardTitle>
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{article.readingTime} Read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    Read Article
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tools" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card key={tool.id} className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    {tool.icon}
                    {tool.title}
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Use Tool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningHub;
