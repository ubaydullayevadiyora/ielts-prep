'use client';

import Link from "next/link";

import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { Badge } from "../../../components/ui/badge";
import { BookOpen, PenTool, Headphones, Mic, Users, BookMarked, TrendingUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";


const Courses = () => {
  const stats = [
    {
      icon: Users,
      value: "12,500+",
      label: "Active Learners",
      color: "text-primary"
    },
    {
      icon: BookMarked,
      value: "450,000+",
      label: "Lessons Completed",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      value: "1.5 bands",
      label: "Average Score Improvement",
      color: "text-primary"
    }
  ];

  // const courses = [
  //   {
  //     id: 'reading',
  //     title: 'IELTS Reading',
  //     description: 'Master reading comprehension with advanced techniques',
  //     icon: BookOpen,
  //     level: 'Intermediate',
  //     lessons: 28,
  //     duration: '4 weeks',
  //     progress: 65,
  //     color: 'bg-blue-500',
  //     progressColor: 'bg-blue-500'
  //   },
  //   {
  //     id: 'writing',
  //     title: 'IELTS Writing',
  //     description: 'Academic and General Training writing tasks',
  //     icon: PenTool,
  //     level: 'Advanced',
  //     lessons: 24,
  //     duration: '5 weeks',
  //     progress: 40,
  //     color: 'bg-purple-500',
  //     progressColor: 'bg-purple-500'
  //   },
  //   {
  //     id: 'listening',
  //     title: 'IELTS Listening',
  //     description: 'Develop listening skills for all question types',
  //     icon: Headphones,
  //     level: 'Beginner',
  //     lessons: 22,
  //     duration: '3 weeks',
  //     progress: 80,
  //     color: 'bg-green-500',
  //     progressColor: 'bg-green-500'
  //   },
  //   {
  //     id: 'speaking',
  //     title: 'IELTS Speaking',
  //     description: 'Build confidence in speaking tasks and fluency',
  //     icon: Mic,
  //     level: 'Intermediate',
  //     lessons: 30,
  //     duration: '6 weeks',
  //     progress: 25,
  //     color: 'bg-orange-500',
  //     progressColor: 'bg-orange-500'
  //   }
  // ];

  interface Course {
    id: bigint;
    title: string;
    description: string;
    level: string;
    lessons: number;
    progress: number;
    status: string;
    months_acces: number;
    duration: number;
    rating: number;
  }

  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<{ data: Course[] }>("/courses/");
        console.log(response.data.data);
        console.log('hi');
        setData(response.data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  console.log(data)
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Master Your <span className="text-primary">IELTS</span> Skills
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive lessons designed by IELTS experts to help you achieve your target band score
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {data?.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {/* <div className={`w-12 h-12 ${course.color} rounded-xl flex items-center justify-center`}> */}
                      {/* <course.icon className="w-6 h-6 text-white" /> */}
                    {/* </div> */}
                    <div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription className="mt-1">{course.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                
                <Button asChild className="w-full">
                  <Link href={`/course/${course.id}`}>Continue Learning</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-primary rounded-2xl p-12 text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to Achieve Your Target Score?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful IELTS candidates who improved their scores with our proven methodology
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
            Start Your Free Trial
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Courses;