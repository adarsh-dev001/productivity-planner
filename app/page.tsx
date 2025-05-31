import Link from "next/link";
import { ArrowRight, BookOpen, Timer, Trophy, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Master Your Study Routine
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Your all-in-one study planner and productivity tracker for competitive exam preparation. Plan, track, and achieve your goals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/planner">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#features">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-lg overflow-hidden shadow-xl bg-card">
                <img 
                  src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg" 
                  alt="Student studying"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to excel in your competitive exam preparation
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Study Planner</CardTitle>
                <CardDescription>
                  Plan your study sessions with a drag-and-drop calendar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Organize subjects, topics, and deadlines with a color-coded interface that makes planning intuitive.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <Timer className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Pomodoro Timer</CardTitle>
                <CardDescription>
                  Study with focus using customizable Pomodoro sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Maintain focus with 25-5 minute cycles or custom durations to maximize your productivity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <Trophy className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Streak System</CardTitle>
                <CardDescription>
                  Stay motivated with daily streaks and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Build consistent study habits by maintaining your streak and competing on leaderboards.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Progress Tracking</CardTitle>
                <CardDescription>
                  Visualize your study data with detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Track your study hours, completed topics, and progress towards your goals with beautiful charts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Start Your Preparation Today</h2>
              <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                Join thousands of students achieving their academic goals with StudyTrack
              </p>
            </div>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/planner">
                Create Your Study Plan <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}