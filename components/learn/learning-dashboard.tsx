"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { OperationsModule } from "./modules/operations-module"
import { LeanModule } from "./modules/lean-module"
import { QuizSection } from "./quiz/quiz-section"
import {
  BookOpen,
  Target,
  TrendingUp,
  Award,
  ArrowLeft,
  BarChart3,
  Layers,
  Zap,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

interface ModuleProgress {
  operations: {
    completed: number
    total: number
    quizScore: number | null
  }
  lean: {
    completed: number
    total: number
    quizScore: number | null
  }
}

export function LearningDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [progress, setProgress] = useState<ModuleProgress>({
    operations: { completed: 0, total: 8, quizScore: null },
    lean: { completed: 0, total: 10, quizScore: null }
  })

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("learningProgress")
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  // Save progress to localStorage
  const updateProgress = (newProgress: ModuleProgress) => {
    setProgress(newProgress)
    localStorage.setItem("learningProgress", JSON.stringify(newProgress))
  }

  const markLessonComplete = (module: "operations" | "lean", lessonIndex: number) => {
    const newProgress = { ...progress }
    const newCompleted = Math.max(newProgress[module].completed, lessonIndex + 1)
    newProgress[module].completed = newCompleted
    updateProgress(newProgress)
  }

  const updateQuizScore = (module: "operations" | "lean", score: number) => {
    const newProgress = { ...progress }
    newProgress[module].quizScore = score
    updateProgress(newProgress)
  }

  const overallProgress = Math.round(
    ((progress.operations.completed + progress.lean.completed) /
      (progress.operations.total + progress.lean.total)) *
      100
  )

  const resetProgress = () => {
    const newProgress = {
      operations: { completed: 0, total: 8, quizScore: null },
      lean: { completed: 0, total: 10, quizScore: null }
    }
    updateProgress(newProgress)
  }

  return (
    <div className="bg-background flex h-full w-full flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 size-4" />
                Back to Chat
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary size-6" />
              <h1 className="text-2xl font-bold">Operations & Lean Learning Center</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Overall Progress: {overallProgress}%
            </div>
            <Progress value={overallProgress} className="w-32" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="size-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center gap-2">
              <Layers className="size-4" />
              Operations
            </TabsTrigger>
            <TabsTrigger value="lean" className="flex items-center gap-2">
              <Zap className="size-4" />
              Lean Process
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Target className="size-4" />
              Assessments
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
                  <TrendingUp className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overallProgress}%</div>
                  <Progress value={overallProgress} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Operations</CardTitle>
                  <Layers className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {progress.operations.completed}/{progress.operations.total}
                  </div>
                  <p className="text-muted-foreground text-xs">lessons completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lean Process</CardTitle>
                  <Zap className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {progress.lean.completed}/{progress.lean.total}
                  </div>
                  <p className="text-muted-foreground text-xs">lessons completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quiz Scores</CardTitle>
                  <Award className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {progress.operations.quizScore !== null || progress.lean.quizScore !== null
                      ? `${Math.round(
                          ((progress.operations.quizScore || 0) + (progress.lean.quizScore || 0)) /
                            (progress.operations.quizScore !== null && progress.lean.quizScore !== null ? 2 : 1)
                        )}%`
                      : "N/A"}
                  </div>
                  <p className="text-muted-foreground text-xs">average score</p>
                </CardContent>
              </Card>
            </div>

            {/* Course Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg" onClick={() => setActiveTab("operations")}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <Layers className="size-6" />
                    </div>
                    <div>
                      <CardTitle>Operations Management</CardTitle>
                      <CardDescription>
                        Learn the fundamentals of managing business operations
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>{progress.operations.completed} of {progress.operations.total} lessons</span>
                      <span>{Math.round((progress.operations.completed / progress.operations.total) * 100)}%</span>
                    </div>
                    <Progress value={(progress.operations.completed / progress.operations.total) * 100} />
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">Supply Chain</span>
                      <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">Quality Management</span>
                      <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">Capacity Planning</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer transition-shadow hover:shadow-lg" onClick={() => setActiveTab("lean")}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <Zap className="size-6" />
                    </div>
                    <div>
                      <CardTitle>Lean Process Principles</CardTitle>
                      <CardDescription>
                        Master lean methodologies for continuous improvement
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>{progress.lean.completed} of {progress.lean.total} lessons</span>
                      <span>{Math.round((progress.lean.completed / progress.lean.total) * 100)}%</span>
                    </div>
                    <Progress value={(progress.lean.completed / progress.lean.total) * 100} />
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">5S</span>
                      <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">Kaizen</span>
                      <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">Value Stream</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button onClick={() => setActiveTab("operations")}>
                  Continue Operations
                </Button>
                <Button onClick={() => setActiveTab("lean")} variant="secondary">
                  Continue Lean
                </Button>
                <Button onClick={() => setActiveTab("quiz")} variant="outline">
                  Take Assessment
                </Button>
                <Button onClick={resetProgress} variant="ghost" className="text-destructive">
                  Reset Progress
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operations Module Tab */}
          <TabsContent value="operations">
            <OperationsModule
              progress={progress.operations}
              onComplete={(index) => markLessonComplete("operations", index)}
            />
          </TabsContent>

          {/* Lean Module Tab */}
          <TabsContent value="lean">
            <LeanModule
              progress={progress.lean}
              onComplete={(index) => markLessonComplete("lean", index)}
            />
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            <QuizSection
              operationsScore={progress.operations.quizScore}
              leanScore={progress.lean.quizScore}
              onOperationsComplete={(score) => updateQuizScore("operations", score)}
              onLeanComplete={(score) => updateQuizScore("lean", score)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
