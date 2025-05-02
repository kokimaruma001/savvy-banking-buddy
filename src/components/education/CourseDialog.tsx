
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Clock, CheckCircle, GraduationCap, Play, BookCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  course: any | null;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  content?: string;
}

const CourseDialog = ({ isOpen, onClose, course }: CourseDialogProps) => {
  const { toast } = useToast();
  const [courseData, setCourseData] = useState<any | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [showLessonContent, setShowLessonContent] = useState(false);
  
  // Initialize course data when dialog opens
  React.useEffect(() => {
    if (course) {
      setCourseData({ ...course });
      setActiveLessonId(null);
      setShowLessonContent(false);
    }
  }, [course]);

  if (!courseData) return null;

  // Sample lessons data for the selected course
  const lessons: Lesson[] = [
    {
      id: 1,
      title: `Introduction to ${courseData.title}`,
      duration: "30 min",
      isCompleted: courseData.progress >= 20,
      content: `Welcome to the ${courseData.title} course! In this introduction, we'll cover the basic concepts and set expectations for what you'll learn. This foundational lesson will prepare you for the rest of the course.`
    },
    {
      id: 2,
      title: "Key Concepts and Terminology",
      duration: "45 min",
      isCompleted: courseData.progress >= 40,
      content: "This lesson introduces you to the essential vocabulary and concepts you'll need throughout the course. Understanding these terms will help you navigate complex topics with confidence."
    },
    {
      id: 3,
      title: "Practical Applications",
      duration: "60 min",
      isCompleted: courseData.progress >= 60,
      content: "Now that you understand the theory, let's see how these concepts apply to real-world situations. This lesson includes case studies and practical examples that demonstrate the importance of what you're learning."
    },
    {
      id: 4,
      title: "Case Studies and Examples",
      duration: "45 min",
      isCompleted: courseData.progress >= 80,
      content: "In this lesson, we'll analyze real situations where these principles have been applied successfully or unsuccessfully. Learning from these examples will help you avoid common pitfalls and make better decisions."
    },
    {
      id: 5,
      title: "Final Assessment",
      duration: "30 min",
      isCompleted: courseData.progress >= 100,
      content: "Test your knowledge with this comprehensive assessment. Successfully completing this final test will demonstrate your mastery of the course material."
    },
  ];

  const handleStartLesson = (lessonId: number) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    setActiveLessonId(lessonId);
    setShowLessonContent(true);
    
    // If lesson wasn't already completed, mark it as completed and update progress
    if (!lesson.isCompleted) {
      const newProgress = Math.min(lessonId * 20, 100);
      
      // Only update if the new progress is higher than current progress
      if (newProgress > courseData.progress) {
        setCourseData({
          ...courseData,
          progress: newProgress
        });
        
        // Show toast notification
        toast({
          title: "Progress Updated!",
          description: `You've completed ${newProgress}% of this course.`,
        });
      }
    }
  };
  
  const handleCloseLesson = () => {
    setShowLessonContent(false);
    setActiveLessonId(null);
  };

  // Find the active lesson if there is one
  const activeLesson = activeLessonId ? lessons.find(l => l.id === activeLessonId) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{courseData.title}</DialogTitle>
          <DialogDescription>{courseData.description}</DialogDescription>
        </DialogHeader>

        {showLessonContent && activeLesson ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{activeLesson.title}</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{activeLesson.duration}</span>
              </div>
            </div>
            
            <div className="p-4 bg-secondary/20 rounded-md">
              <p>{activeLesson.content}</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="quiz">
                <AccordionTrigger>Quick Knowledge Check</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-2">
                    <p className="font-medium">What is the main focus of this lesson?</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="option1" name="quiz" className="w-4 h-4" />
                        <label htmlFor="option1">Understanding theoretical concepts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="option2" name="quiz" className="w-4 h-4" />
                        <label htmlFor="option2">Applying knowledge to real-world scenarios</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="option3" name="quiz" className="w-4 h-4" />
                        <label htmlFor="option3">Memorizing key terms</label>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCloseLesson}>
                Back to Lessons
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Completed
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Course Progress Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">Course Progress</div>
                <div className="text-sm text-muted-foreground">{courseData.progress}% Complete</div>
              </div>
              <Progress value={courseData.progress} />
            </div>

            {/* Course Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-medium">{courseData.duration}</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Lessons</div>
                    <div className="font-medium">{courseData.lessons}</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Category</div>
                    <div className="font-medium">{courseData.category}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Content Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Course Content</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lesson</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lessons.map((lesson) => (
                    <TableRow key={lesson.id}>
                      <TableCell className="font-medium">{lesson.title}</TableCell>
                      <TableCell>{lesson.duration}</TableCell>
                      <TableCell>
                        {lesson.isCompleted ? (
                          <Badge variant="secondary">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline">Not Started</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          onClick={() => handleStartLesson(lesson.id)}
                          className="gap-1"
                        >
                          {lesson.isCompleted ? (
                            <>
                              <BookCheck className="h-4 w-4" />
                              Review
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" />
                              Start
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
