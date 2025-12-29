"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
  BookOpen,
  ArrowRight
} from "lucide-react"

interface QuizSectionProps {
  operationsScore: number | null
  leanScore: number | null
  onOperationsComplete: (score: number) => void
  onLeanComplete: (score: number) => void
}

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const operationsQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary goal of operations management?",
    options: [
      "Maximizing employee satisfaction",
      "Creating the highest level of efficiency while meeting quality and customer needs",
      "Minimizing all costs regardless of quality",
      "Producing the maximum quantity possible"
    ],
    correct: 1,
    explanation: "Operations management aims to maximize efficiency while ensuring quality and meeting customer needs - it's about optimizing the transformation of inputs into valuable outputs."
  },
  {
    id: 2,
    question: "In supply chain management, what does JIT stand for?",
    options: [
      "Just In Transit",
      "Joint Inventory Tracking",
      "Just-in-Time",
      "Job Integration Technology"
    ],
    correct: 2,
    explanation: "JIT (Just-in-Time) is a strategy that aligns raw material orders with production schedules to minimize inventory and waste by receiving goods only as they are needed."
  },
  {
    id: 3,
    question: "What is the 80/20 rule in quality management also known as?",
    options: [
      "Control Chart Analysis",
      "Pareto Analysis",
      "Fishbone Diagram",
      "Scatter Analysis"
    ],
    correct: 1,
    explanation: "Pareto Analysis, based on the 80/20 rule, states that roughly 80% of effects come from 20% of causes. It helps identify the 'vital few' causes that have the greatest impact."
  },
  {
    id: 4,
    question: "What is 'effective capacity' in capacity planning?",
    options: [
      "The maximum output under ideal conditions",
      "The maximum output under normal conditions",
      "The actual production output",
      "The customer demand rate"
    ],
    correct: 1,
    explanation: "Effective capacity is the maximum output achievable under normal operating conditions, accounting for realistic factors like maintenance, breaks, and setups - typically 85-95% of design capacity."
  },
  {
    id: 5,
    question: "In ABC inventory analysis, which category requires the closest attention?",
    options: [
      "Category C (low-value items)",
      "Category B (medium-value items)",
      "Category A (high-value items)",
      "All categories require equal attention"
    ],
    correct: 2,
    explanation: "Category A items (typically 20% of items representing 80% of value) require the closest attention and most sophisticated control methods due to their significant impact on inventory costs."
  },
  {
    id: 6,
    question: "What is a 'bottleneck' in process analysis?",
    options: [
      "The fastest step in a process",
      "The constraint that limits overall output",
      "A quality inspection point",
      "The starting point of production"
    ],
    correct: 1,
    explanation: "A bottleneck is the process step with the lowest capacity - it limits the entire system's output. Improving the bottleneck improves overall throughput; improving non-bottlenecks has limited impact."
  },
  {
    id: 7,
    question: "What scheduling rule prioritizes jobs with the earliest due dates?",
    options: [
      "FCFS (First Come, First Served)",
      "SPT (Shortest Processing Time)",
      "EDD (Earliest Due Date)",
      "CR (Critical Ratio)"
    ],
    correct: 2,
    explanation: "EDD (Earliest Due Date) prioritizes jobs based on when they are due, minimizing the maximum tardiness across all jobs."
  },
  {
    id: 8,
    question: "In OEE (Overall Equipment Effectiveness), what three factors are multiplied together?",
    options: [
      "Cost, Quality, and Speed",
      "Availability, Performance, and Quality",
      "Time, Materials, and Labor",
      "Input, Process, and Output"
    ],
    correct: 1,
    explanation: "OEE = Availability × Performance × Quality. It measures how effectively equipment is being used compared to its full potential, with 85% considered world-class."
  },
  {
    id: 9,
    question: "What type of process is best for high-variety, low-volume production?",
    options: [
      "Continuous flow",
      "Assembly line",
      "Job shop",
      "Batch processing"
    ],
    correct: 2,
    explanation: "Job shops are designed for high-variety, low-volume production (like custom furniture or machine shops). They have flexible equipment and skilled workers who can handle diverse jobs."
  },
  {
    id: 10,
    question: "What is the Balanced Scorecard approach used for?",
    options: [
      "Calculating inventory costs",
      "Measuring performance across multiple perspectives",
      "Scheduling production",
      "Designing facility layouts"
    ],
    correct: 1,
    explanation: "The Balanced Scorecard measures performance across four perspectives: Financial, Customer, Internal Processes, and Learning & Growth - providing a more comprehensive view than financial metrics alone."
  }
]

const leanQuestions: Question[] = [
  {
    id: 1,
    question: "What does the 'M' in TIMWOODS waste stand for?",
    options: [
      "Materials",
      "Motion",
      "Manufacturing",
      "Management"
    ],
    correct: 1,
    explanation: "M stands for Motion - unnecessary movement by people such as walking, reaching, and bending that doesn't add value to the product or service."
  },
  {
    id: 2,
    question: "In 5S methodology, what does 'Seiton' (Set in Order) mean?",
    options: [
      "Remove unnecessary items",
      "Arrange items for easy access",
      "Clean the workplace",
      "Maintain standards"
    ],
    correct: 1,
    explanation: "Seiton (Set in Order) means arranging necessary items so they are easy to find and use - 'a place for everything and everything in its place.'"
  },
  {
    id: 3,
    question: "What is the main purpose of Value Stream Mapping?",
    options: [
      "Calculate product costs",
      "Visualize and analyze the flow of materials and information",
      "Design new products",
      "Train employees"
    ],
    correct: 1,
    explanation: "Value Stream Mapping visualizes the entire flow of materials and information required to bring a product to a customer, revealing both value-adding steps and waste."
  },
  {
    id: 4,
    question: "What is 'Kaizen' in Japanese?",
    options: [
      "Perfect quality",
      "Change for better (continuous improvement)",
      "Respect for people",
      "Flow production"
    ],
    correct: 1,
    explanation: "Kaizen literally means 'change for better' and represents the philosophy of continuous, incremental improvement involving everyone in the organization."
  },
  {
    id: 5,
    question: "In a Kanban system, what triggers production?",
    options: [
      "A forecast from management",
      "A signal from a downstream process that more is needed",
      "A time-based schedule",
      "Inventory reaching maximum levels"
    ],
    correct: 1,
    explanation: "Kanban is a 'pull' system - production is triggered by signals (cards, bins, electronic signals) from downstream processes indicating they need more, preventing overproduction."
  },
  {
    id: 6,
    question: "What is considered the worst type of waste in lean thinking?",
    options: [
      "Defects",
      "Waiting",
      "Overproduction",
      "Motion"
    ],
    correct: 2,
    explanation: "Overproduction is considered the worst waste because it creates all other wastes - excess inventory, extra transportation, more defects to find, increased waiting, and wasted motion."
  },
  {
    id: 7,
    question: "What is 'Takt Time'?",
    options: [
      "The time to complete one unit of work",
      "The available production time divided by customer demand",
      "The setup time between products",
      "The total lead time for an order"
    ],
    correct: 1,
    explanation: "Takt Time is the pace of production needed to meet customer demand. It's calculated as Available Production Time / Customer Demand Rate."
  },
  {
    id: 8,
    question: "What is the purpose of the '5 Whys' technique?",
    options: [
      "Brainstorm multiple solutions",
      "Find the root cause of a problem",
      "Prioritize improvement projects",
      "Document standard work"
    ],
    correct: 1,
    explanation: "The 5 Whys technique involves asking 'why' repeatedly (typically five times) to drill down past symptoms and find the root cause of a problem."
  },
  {
    id: 9,
    question: "What is 'Genchi Genbutsu' in lean culture?",
    options: [
      "Respect for people",
      "Go and see for yourself",
      "Continuous improvement",
      "Standard work"
    ],
    correct: 1,
    explanation: "Genchi Genbutsu means 'go and see for yourself' - the principle that leaders and problem-solvers should go to where work happens to understand the real situation."
  },
  {
    id: 10,
    question: "What is the primary purpose of Standard Work?",
    options: [
      "Reduce employee wages",
      "Document the current best practice as a baseline for improvement",
      "Eliminate the need for training",
      "Automate processes"
    ],
    correct: 1,
    explanation: "Standard Work documents the current best known method for performing a task, ensuring consistency and providing a baseline for identifying problems and making improvements."
  },
  {
    id: 11,
    question: "What does 'Heijunka' mean in lean production?",
    options: [
      "Leveled production",
      "Quick changeover",
      "Visual management",
      "Error-proofing"
    ],
    correct: 0,
    explanation: "Heijunka means leveled production - smoothing out volume and product mix variations over time to create more stable, predictable production flow."
  },
  {
    id: 12,
    question: "In lean culture, how should problems be viewed?",
    options: [
      "As failures to be punished",
      "As opportunities for improvement",
      "As evidence of poor management",
      "As inevitable and unavoidable"
    ],
    correct: 1,
    explanation: "In lean culture, problems are welcomed as opportunities for improvement. A culture of continuous improvement requires a safe environment where problems can be raised without blame."
  }
]

export function QuizSection({
  operationsScore,
  leanScore,
  onOperationsComplete,
  onLeanComplete
}: QuizSectionProps) {
  const [activeQuiz, setActiveQuiz] = useState<"operations" | "lean" | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])

  const questions = activeQuiz === "operations" ? operationsQuestions : leanQuestions
  const question = questions[currentQuestion]

  const startQuiz = (type: "operations" | "lean") => {
    setActiveQuiz(type)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setCorrectAnswers(0)
    setAnswers([])
  }

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (answerIndex === question.correct) {
      setCorrectAnswers(correctAnswers + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // Quiz complete
      const finalCorrect = correctAnswers + (selectedAnswer === question.correct ? 0 : 0)
      const score = Math.round((finalCorrect / questions.length) * 100)

      if (activeQuiz === "operations") {
        onOperationsComplete(score)
      } else {
        onLeanComplete(score)
      }
    }
  }

  const finishQuiz = () => {
    const score = Math.round((correctAnswers / questions.length) * 100)
    if (activeQuiz === "operations") {
      onOperationsComplete(score)
    } else {
      onLeanComplete(score)
    }
    setActiveQuiz(null)
  }

  if (activeQuiz && currentQuestion < questions.length) {
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline">
            {activeQuiz === "operations" ? "Operations Management" : "Lean Process"} Quiz
          </Badge>
          <span className="text-muted-foreground text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <Progress value={progressPercent} />

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.options.map((option, idx) => {
              let className = "cursor-pointer rounded-lg border p-4 transition-all hover:border-primary"

              if (showExplanation) {
                if (idx === question.correct) {
                  className = "rounded-lg border-2 border-green-500 bg-green-500/10 p-4"
                } else if (idx === selectedAnswer && idx !== question.correct) {
                  className = "rounded-lg border-2 border-red-500 bg-red-500/10 p-4"
                } else {
                  className = "rounded-lg border p-4 opacity-50"
                }
              } else if (selectedAnswer === idx) {
                className = "rounded-lg border-2 border-primary bg-primary/10 p-4"
              }

              return (
                <div
                  key={idx}
                  className={className}
                  onClick={() => handleAnswer(idx)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-sm ${
                      showExplanation && idx === question.correct
                        ? "border-green-500 bg-green-500 text-white"
                        : showExplanation && idx === selectedAnswer
                          ? "border-red-500 bg-red-500 text-white"
                          : ""
                    }`}>
                      {showExplanation && idx === question.correct ? (
                        <CheckCircle2 className="size-4" />
                      ) : showExplanation && idx === selectedAnswer && idx !== question.correct ? (
                        <XCircle className="size-4" />
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              )
            })}

            {showExplanation && (
              <div className="bg-muted mt-4 rounded-lg p-4">
                <p className="text-sm font-medium">Explanation:</p>
                <p className="text-muted-foreground mt-1 text-sm">{question.explanation}</p>
              </div>
            )}

            {showExplanation && (
              <div className="flex justify-end">
                {currentQuestion < questions.length - 1 ? (
                  <Button onClick={handleNext}>
                    Next Question
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                ) : (
                  <Button onClick={finishQuiz}>
                    Finish Quiz
                    <Trophy className="ml-2 size-4" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-muted-foreground text-center text-sm">
          Current score: {correctAnswers} / {currentQuestion + (showExplanation ? 1 : 0)} correct
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Assessments</CardTitle>
          <CardDescription>
            Test your understanding of operations management and lean process principles.
            Complete the modules first for the best results.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Operations Quiz Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary rounded-lg p-2">
                <Target className="size-6" />
              </div>
              <div>
                <CardTitle>Operations Management Quiz</CardTitle>
                <CardDescription>10 questions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {operationsScore !== null ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{operationsScore}%</span>
                  <Badge className={operationsScore >= 70 ? "bg-green-500" : "bg-yellow-500"}>
                    {operationsScore >= 70 ? "Passed" : "Needs Review"}
                  </Badge>
                </div>
                <Progress value={operationsScore} />
                <Button
                  onClick={() => startQuiz("operations")}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="mr-2 size-4" />
                  Retake Quiz
                </Button>
              </div>
            ) : (
              <Button onClick={() => startQuiz("operations")} className="w-full">
                <BookOpen className="mr-2 size-4" />
                Start Quiz
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Lean Quiz Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary rounded-lg p-2">
                <Target className="size-6" />
              </div>
              <div>
                <CardTitle>Lean Process Quiz</CardTitle>
                <CardDescription>12 questions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {leanScore !== null ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{leanScore}%</span>
                  <Badge className={leanScore >= 70 ? "bg-green-500" : "bg-yellow-500"}>
                    {leanScore >= 70 ? "Passed" : "Needs Review"}
                  </Badge>
                </div>
                <Progress value={leanScore} />
                <Button
                  onClick={() => startQuiz("lean")}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="mr-2 size-4" />
                  Retake Quiz
                </Button>
              </div>
            ) : (
              <Button onClick={() => startQuiz("lean")} className="w-full">
                <BookOpen className="mr-2 size-4" />
                Start Quiz
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Overall Results */}
      {operationsScore !== null && leanScore !== null && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="size-5 text-yellow-500" />
              Overall Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {Math.round((operationsScore + leanScore) / 2)}%
                </p>
                <p className="text-muted-foreground">Average Score</p>
              </div>
              <div className="text-right">
                {Math.round((operationsScore + leanScore) / 2) >= 80 ? (
                  <Badge className="bg-green-500">Excellent Understanding</Badge>
                ) : Math.round((operationsScore + leanScore) / 2) >= 70 ? (
                  <Badge className="bg-blue-500">Good Understanding</Badge>
                ) : (
                  <Badge className="bg-yellow-500">Review Recommended</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
