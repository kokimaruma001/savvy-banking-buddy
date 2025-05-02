
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Clock, CheckCircle, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
}

const CourseDialog = ({ isOpen, onClose, course }: CourseDialogProps) => {
  if (!course) return null;

  // Sample lessons data for the selected course
  const lessons: Lesson[] = [
    {
      id: 1,
      title: `Introduction to ${course.title}`,
      duration: "30 min",
      isCompleted: course.progress >= 20,
    },
    {
      id: 2,
      title: "Key Concepts and Terminology",
      duration: "45 min",
      isCompleted: course.progress >= 40,
    },
    {
      id: 3,
      title: "Practical Applications",
      duration: "60 min",
      isCompleted: course.progress >= 60,
    },
    {
      id: 4,
      title: "Case Studies and Examples",
      duration: "45 min",
      isCompleted: course.progress >= 80,
    },
    {
      id: 5,
      title: "Final Assessment",
      duration: "30 min",
      isCompleted: course.progress >= 100,
    },
  ];

  const handleStartLesson = (lessonId: number) => {
    console.log(`Starting lesson ${lessonId} for course ${course.id}`);
    // In a real app, this would navigate to the lesson or update state
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{course.title}</DialogTitle>
          <DialogDescription>{course.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Course Progress</div>
              <div className="text-sm text-muted-foreground">{course.progress}% Complete</div>
            </div>
            <Progress value={course.progress} />
          </div>

          {/* Course Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-medium">{course.duration}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Lessons</div>
                  <div className="font-medium">{course.lessons}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center space-x-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="font-medium">{course.category}</div>
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
                      >
                        {lesson.isCompleted ? "Review" : "Start"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
