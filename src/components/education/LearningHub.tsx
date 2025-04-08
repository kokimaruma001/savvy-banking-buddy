import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Star, Clock, Search, Award, Play, CheckCircle, ChevronRight, Filter, TrendingUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const LearningHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const courses = [
    {
      id: 1,
      title: "Financial Foundations",
      description: "Master the essentials of personal finance and build a solid financial foundation.",
      level: "Beginner",
      duration: "4 hours",
      rating: 4.8,
      reviews: 245,
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300",
      progress: 0,
      category: "personal-finance",
      lessons: 12
    },
    {
      id: 2,
      title: "Investing for Beginners",
      description: "Learn how to start investing wisely with minimal risk and maximize your returns.",
      level: "Beginner",
      duration: "6 hours",
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300",
      progress: 0,
      category: "investing",
      lessons: 15
    },
    {
      id: 3,
      title: "Budgeting Mastery",
      description: "Create and maintain a budget that works for your lifestyle and financial goals.",
      level: "Intermediate",
      duration: "3 hours",
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300",
      progress: 65,
      category: "personal-finance",
      lessons: 8
    },
    {
      id: 4,
      title: "Retirement Planning",
      description: "Plan for a secure and comfortable retirement with effective savings strategies.",
      level: "Intermediate",
      duration: "5 hours",
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1527264935190-1b381c7c486a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300",
      progress: 0,
      category: "planning",
      lessons: 14
    },
    {
      id: 5,
      title: "Advanced Stock Trading",
      description: "Master complex trading strategies and analysis for the stock market.",
      level: "Advanced",
      duration: "8 hours",
      rating: 4.5,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300",
      progress: 30,
      category: "investing",
      lessons: 20
    },
    {
      id: 6,
      title: "Tax Optimization",
      description: "Learn legal strategies to minimize your tax burden and maximize your savings.",
      level: "Intermediate",
      duration: "4 hours",
      rating: 4.7,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300",
      progress: 0,
      category: "planning",
      lessons: 10
    }
  ];
  
  const articles = [
    {
      id: 1,
      title: "10 Financial Habits to Build Wealth",
      description: "Discover the key habits that can help you build lasting wealth and financial security.",
      readTime: "5 min read",
      date: "June 2, 2023",
      category: "personal-finance",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300"
    },
    {
      id: 2,
      title: "Understanding Market Volatility",
      description: "Learn how to navigate market ups and downs to make better investment decisions.",
      readTime: "8 min read",
      date: "May 28, 2023",
      category: "investing",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300"
    },
    {
      id: 3,
      title: "Emergency Fund: How Much is Enough?",
      description: "Guidelines for building an emergency fund that provides adequate financial security.",
      readTime: "6 min read",
      date: "May 20, 2023",
      category: "personal-finance",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300"
    },
    {
      id: 4,
      title: "Investing in Real Estate vs. Stocks",
      description: "A comparison of two popular investment vehicles to help you make informed decisions.",
      readTime: "10 min read",
      date: "May 15, 2023",
      category: "investing",
      image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300"
    }
  ];
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">Financial Education Hub</h1>
      <p className="text-muted-foreground mb-8">Expand your financial knowledge with our curated courses and resources</p>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search for courses and articles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          <span>Filters</span>
        </Button>
      </div>
      
      {/* Your Progress Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Current Course</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              {courses.some(course => course.progress > 0) ? (
                courses.filter(course => course.progress > 0)
                  .sort((a, b) => b.progress - a.progress)
                  .slice(0, 1)
                  .map(course => (
                    <div key={course.id} className="space-y-4">
                      <div className="flex gap-4">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Lesson {Math.round((course.progress / 100) * course.lessons)} of {course.lessons}
                          </p>
                          <div className="flex items-center gap-1">
                            <Progress value={course.progress} className="h-2 flex-grow" />
                            <span className="text-xs font-medium">{course.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full">Continue Learning</Button>
                    </div>
                  ))
              ) : (
                <div className="text-center py-4">
                  <BookOpen className="mx-auto mb-2 text-muted-foreground" size={36} />
                  <p className="mb-2">You haven't started any courses yet</p>
                  <Button variant="outline" className="mt-2">Browse Courses</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Learning Stats</CardTitle>
              <CardDescription>Your educational achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg text-center">
                  <h3 className="text-3xl font-bold mb-1">{courses.filter(c => c.progress > 0).length}</h3>
                  <p className="text-sm text-muted-foreground">Courses in Progress</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg text-center">
                  <h3 className="text-3xl font-bold mb-1">0</h3>
                  <p className="text-sm text-muted-foreground">Completed Courses</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg text-center">
                  <h3 className="text-3xl font-bold mb-1">0</h3>
                  <p className="text-sm text-muted-foreground">Certificates Earned</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg text-center">
                  <h3 className="text-3xl font-bold mb-1">0h</h3>
                  <p className="text-sm text-muted-foreground">Learning Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="courses">
        <TabsList className="mb-8">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        {/* Courses Tab */}
        <TabsContent value="courses" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Card key={course.id} className="glass overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <Badge className="bg-white text-primary hover:bg-white/90">{course.level}</Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-amber-500" />
                        <span>{course.rating} ({course.reviews})</span>
                      </div>
                    </div>
                    
                    {course.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1" />
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full">
                      {course.progress > 0 ? 'Continue' : 'Start Learning'}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Search className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h3 className="text-lg font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>Clear Search</Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Articles Tab */}
        <TabsContent value="articles" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Card key={article.id} className="glass overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                  />
                  <div className="flex-1 flex flex-col">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="mr-2">{article.category === 'investing' ? 'Investing' : 'Personal Finance'}</Badge>
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock size={14} className="mr-1" />
                          {article.readTime}
                        </span>
                        <Button variant="ghost" size="sm" className="font-medium">
                          Read Article
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <Search className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h3 className="text-lg font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>Clear Search</Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass col-span-1 md:col-span-3 bg-gradient-to-r from-primary/10 to-blue-400/10">
              <CardHeader>
                <CardTitle>Financial Tools & Calculators</CardTitle>
                <CardDescription>A suite of interactive tools to help you plan and analyze your finances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Loan Calculator", icon: <Calculator /> },
                    { name: "Retirement Planner", icon: <TrendingUp className="w-6 h-6" /> },
                    { name: "Budget Template", icon: <FileSpreadsheet /> },
                    { name: "Tax Estimator", icon: <DollarSign /> }
                  ].map((tool, idx) => (
                    <Button variant="outline" key={idx} className="h-auto py-6 flex flex-col gap-3 hover-scale">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {tool.icon}
                      </div>
                      <span>{tool.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle>eBooks & Guides</CardTitle>
                <CardDescription>Comprehensive financial guides for all levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "The Complete Guide to Personal Finance",
                    "Investing 101: Building Your Portfolio",
                    "Debt-Free Living Strategies"
                  ].map((book, idx) => (
                    <div key={idx} className="flex gap-3 items-center p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                        <BookOpen size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{book}</h4>
                        <p className="text-xs text-muted-foreground">PDF Guide</p>
                      </div>
                      <Button size="sm" variant="ghost" className="ml-auto">
                        <Download size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Resources</Button>
              </CardFooter>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Quick lessons on key financial concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Understanding Credit Scores",
                    "How to Create a Budget That Works",
                    "Stock Market Basics for Beginners"
                  ].map((video, idx) => (
                    <div key={idx} className="flex gap-3 items-center p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                        <Play size={18} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{video}</h4>
                        <p className="text-xs text-muted-foreground">5-10 min video</p>
                      </div>
                      <Button size="sm" variant="ghost" className="ml-auto">
                        <Play size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Videos</Button>
              </CardFooter>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle>Financial Dictionary</CardTitle>
                <CardDescription>Key terms and definitions in simple language</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "APR (Annual Percentage Rate)",
                    "ETF (Exchange-Traded Fund)",
                    "Compound Interest",
                    "IRA (Individual Retirement Account)"
                  ].map((term, idx) => (
                    <div key={idx} className="flex gap-3 items-center p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                        <BookOpen size={18} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{term}</h4>
                        <p className="text-xs text-muted-foreground">Financial Term</p>
                      </div>
                      <Button size="sm" variant="ghost" className="ml-auto">
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Full Dictionary</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Define components that aren't imported
const Calculator = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="16" x2="16" y1="14" y2="18" />
    <path d="M16 10h.01" />
    <path d="M12 10h.01" />
    <path d="M8 10h.01" />
    <path d="M12 14h.01" />
    <path d="M8 14h.01" />
    <path d="M12 18h.01" />
    <path d="M8 18h.01" />
  </svg>
);

const FileSpreadsheet = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13h2" />
    <path d="M8 17h2" />
    <path d="M14 13h2" />
    <path d="M14 17h2" />
  </svg>
);

const Download = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const DollarSign = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export default LearningHub;
