"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Target,
  Lightbulb,
  AlertCircle
} from "lucide-react"

interface LeanModuleProps {
  progress: {
    completed: number
    total: number
  }
  onComplete: (index: number) => void
}

const lessons = [
  {
    id: 1,
    title: "Introduction to Lean Thinking",
    duration: "12 min",
    content: {
      overview: "Lean is a systematic approach to identifying and eliminating waste through continuous improvement. Originating from the Toyota Production System, lean thinking has transformed how organizations operate across all industries.",
      keyPoints: [
        "Lean focuses on maximizing customer value while minimizing waste",
        "The goal is to create more value with fewer resources",
        "Lean is both a philosophy and a set of practical tools",
        "Success requires cultural change, not just tool implementation"
      ],
      principles: [
        "Define Value: Understand what the customer truly values and is willing to pay for",
        "Map the Value Stream: Identify all steps in the process and eliminate non-value-adding ones",
        "Create Flow: Ensure work moves smoothly without interruptions or delays",
        "Establish Pull: Produce only what is needed, when it's needed, in the amount needed",
        "Pursue Perfection: Continuously improve toward an ideal state"
      ],
      history: [
        "1930s-1950s: Toyota develops the Toyota Production System (TPS)",
        "Taiichi Ohno and Shigeo Shingo are key architects of TPS",
        "1990: 'The Machine That Changed the World' popularizes 'lean' term",
        "Today: Lean principles applied in healthcare, software, services, and more"
      ],
      example: "A hospital applied lean thinking to their emergency department. By mapping patient flow, they identified that patients spent 70% of their time waiting. By reorganizing the process and eliminating redundant steps, they reduced average stay from 6 hours to 3 hours while improving patient satisfaction."
    }
  },
  {
    id: 2,
    title: "The 8 Wastes (TIMWOODS)",
    duration: "15 min",
    content: {
      overview: "Waste (Muda in Japanese) is any activity that consumes resources but creates no value for the customer. Lean identifies 8 types of waste, remembered by the acronym TIMWOODS. Eliminating these wastes is central to lean improvement.",
      keyPoints: [
        "Waste is anything the customer wouldn't willingly pay for",
        "Most processes contain 90-95% waste when first analyzed",
        "Some waste is necessary (like safety inspections) but should be minimized",
        "Identifying waste is the first step to eliminating it"
      ],
      wastes: [
        "T - Transportation: Unnecessary movement of materials or products between processes",
        "I - Inventory: Excess products or materials not being processed",
        "M - Motion: Unnecessary movement by people (walking, reaching, bending)",
        "W - Waiting: Idle time when resources are not in use",
        "O - Overproduction: Making more than needed, earlier than needed (worst waste)",
        "O - Overprocessing: Doing more work than necessary or using more precision than required",
        "D - Defects: Errors requiring rework, repair, or scrapping",
        "S - Skills (underutilized): Not using people's talents, ideas, and creativity"
      ],
      identification: [
        "Walk the process (Gemba walk) and observe with fresh eyes",
        "Ask 'Would the customer pay for this step?'",
        "Time how long work actually takes vs. total lead time",
        "Track inventory levels and waiting times",
        "Listen to employee frustrations - they know where waste exists"
      ],
      example: "A software company analyzed their development process and found: Transportation (code moving between teams), Inventory (undeployed features), Motion (switching between tools), Waiting (for approvals), Overproduction (building unused features), Overprocessing (excessive documentation), Defects (bugs), and underutilized Skills (developers doing manual testing instead of automating)."
    }
  },
  {
    id: 3,
    title: "5S Workplace Organization",
    duration: "12 min",
    content: {
      overview: "5S is a systematic method for organizing and standardizing the workplace. It creates a clean, organized environment that exposes problems and supports efficient work. 5S is often the first lean tool implemented because it establishes the foundation for other improvements.",
      keyPoints: [
        "5S is both a methodology and a foundation for lean culture",
        "A clean, organized workplace makes problems visible",
        "5S reduces wasted time searching for tools and materials",
        "Sustainability (the 5th S) is the most challenging aspect"
      ],
      steps: [
        "Sort (Seiri): Remove unnecessary items from the workplace. Use red tags to mark items for removal. Keep only what is needed for current work.",
        "Set in Order (Seiton): Arrange necessary items for easy access. 'A place for everything and everything in its place.' Use visual management - shadow boards, labeled locations.",
        "Shine (Seiso): Clean the workplace thoroughly. Cleaning is also inspection - you notice problems when you clean. Make cleaning part of daily routine.",
        "Standardize (Seiketsu): Create standards and procedures to maintain the first 3S. Use checklists, schedules, and visual controls. Make the standard the path of least resistance.",
        "Sustain (Shitsuke): Build discipline to maintain standards. Regular audits, management support, and continuous reinforcement. Make 5S part of the culture, not a one-time event."
      ],
      benefits: [
        "Reduced search time and frustration",
        "Improved safety (clear pathways, visible hazards)",
        "Higher quality (clean environment, organized materials)",
        "Better morale (pride in a well-organized workplace)",
        "Foundation for other lean improvements"
      ],
      example: "A machine shop implemented 5S: They removed 3 truckloads of unneeded items (Sort), created shadow boards for tools (Set in Order), established daily cleaning routines (Shine), posted visual standards (Standardize), and conducted weekly audits (Sustain). Setup time dropped 40%, and tool-related delays decreased 80%."
    }
  },
  {
    id: 4,
    title: "Value Stream Mapping",
    duration: "15 min",
    content: {
      overview: "Value Stream Mapping (VSM) is a visual tool for analyzing and designing the flow of materials and information required to bring a product to a customer. It shows both value-adding and non-value-adding steps, revealing opportunities for improvement.",
      keyPoints: [
        "A value stream includes all activities - both value-adding and waste",
        "VSM shows the current state and envisions a future state",
        "It captures both material flow and information flow",
        "VSM is done with a team to build shared understanding"
      ],
      components: [
        "Process boxes: Show each step in the process",
        "Data boxes: Capture key metrics (cycle time, changeover time, uptime)",
        "Inventory triangles: Show work-in-progress between steps",
        "Information flow: How orders and schedules move through the system",
        "Timeline: Total lead time vs. value-added time"
      ],
      steps: [
        "1. Select a product family to map",
        "2. Walk the process from end to beginning",
        "3. Draw the current state map with actual data",
        "4. Identify waste and opportunities",
        "5. Design the future state map",
        "6. Create an implementation plan"
      ],
      metrics: [
        "Lead Time: Total time from start to finish",
        "Cycle Time: Time to complete one unit",
        "Takt Time: Customer demand rate (available time / demand)",
        "Value-Added Time: Time actually transforming the product",
        "Process Cycle Efficiency: Value-Added Time / Lead Time"
      ],
      example: "A furniture manufacturer mapped their order-to-delivery value stream. Current state: 45-day lead time, only 2 hours of actual value-added time (0.2% efficiency). The map revealed: 30 days of raw material inventory, 10 days waiting between departments, excessive batch sizes. Future state design achieved 10-day lead time through pull systems and cellular manufacturing."
    }
  },
  {
    id: 5,
    title: "Kaizen - Continuous Improvement",
    duration: "12 min",
    content: {
      overview: "Kaizen (Japanese for 'change for better') is the philosophy of continuous, incremental improvement. Rather than waiting for major innovations, kaizen focuses on making small improvements every day, involving everyone in the organization.",
      keyPoints: [
        "Small improvements compound into significant gains over time",
        "Everyone has ideas for improvement - tap into this knowledge",
        "Improvement is everyone's job, not just management's",
        "Focus on process improvement, not blaming people"
      ],
      principles: [
        "Good processes bring good results",
        "Go see for yourself (Genchi Genbutsu)",
        "Speak with data, manage by facts",
        "Take action to contain and correct root causes",
        "Work as a team",
        "Kaizen is everybody's business"
      ],
      types: [
        "Point Kaizen: Quick fixes, individual ideas (suggestion systems)",
        "System Kaizen: Improve entire processes (value stream level)",
        "Kaizen Event/Blitz: Focused 3-5 day improvement project",
        "Daily Kaizen: Small improvements as part of regular work"
      ],
      implementation: [
        "Create a suggestion system - make it easy to submit ideas",
        "Recognize and reward improvement efforts",
        "Provide time for improvement activities",
        "Train everyone in problem-solving methods",
        "Celebrate progress and learn from failures"
      ],
      example: "Toyota reportedly implements over 1 million employee suggestions per year. A Toyota assembly line worker noticed that reaching for a specific part caused strain. He suggested repositioning the bin 6 inches closer. This saved 2 seconds per car. With 400,000 cars per year, this one small change saved 220 hours annually - from one simple suggestion."
    }
  },
  {
    id: 6,
    title: "Just-in-Time (JIT) Production",
    duration: "14 min",
    content: {
      overview: "Just-in-Time (JIT) is a production strategy that aligns raw material orders with production schedules to minimize inventory and waste. The goal is producing the right item, in the right quantity, at the right time.",
      keyPoints: [
        "JIT eliminates waste from overproduction and excess inventory",
        "It requires reliable processes, suppliers, and equipment",
        "JIT exposes problems by removing the buffer of inventory",
        "Success depends on level scheduling and supplier partnerships"
      ],
      elements: [
        "Pull System: Production triggered by actual demand, not forecasts",
        "Takt Time: Match production pace to customer demand",
        "One-Piece Flow: Process one item at a time through all steps",
        "Quick Changeover: Minimize setup time to enable small batches",
        "Leveled Production (Heijunka): Smooth out volume and mix variations"
      ],
      prerequisites: [
        "Reliable equipment (preventive maintenance programs)",
        "Consistent quality (problems stop the line)",
        "Flexible workforce (cross-trained employees)",
        "Supplier reliability (on-time, defect-free deliveries)",
        "Stable demand or good forecasting"
      ],
      benefits: [
        "Reduced inventory costs and space requirements",
        "Faster response to customer orders",
        "Better quality (problems found immediately)",
        "Improved cash flow",
        "Increased flexibility"
      ],
      example: "Dell revolutionized computer manufacturing with JIT. Instead of building to forecast and holding inventory, they built to order. Components arrived from suppliers just hours before being assembled into customer-specified computers. This eliminated finished goods inventory and allowed rapid response to market changes."
    }
  },
  {
    id: 7,
    title: "Kanban and Pull Systems",
    duration: "12 min",
    content: {
      overview: "Kanban is a visual scheduling system that controls production and inventory through signals (cards, bins, electronic signals). It implements 'pull' - where downstream processes signal upstream processes when more work is needed.",
      keyPoints: [
        "Kanban means 'visual signal' or 'card' in Japanese",
        "It prevents overproduction by limiting work-in-progress",
        "Visual nature makes status obvious at a glance",
        "Kanban creates flow and exposes bottlenecks"
      ],
      principles: [
        "Visualize work: Make all work visible on a board",
        "Limit WIP: Set maximum items in each stage",
        "Manage flow: Optimize the flow of work through the system",
        "Make policies explicit: Clear rules for how work moves",
        "Improve collaboratively: Use feedback to evolve the process"
      ],
      types: [
        "Production Kanban: Signal to produce more items",
        "Withdrawal Kanban: Signal to move items between areas",
        "Supplier Kanban: Signal for supplier delivery",
        "Two-Bin System: When first bin empties, reorder; use second bin meanwhile"
      ],
      implementation: [
        "Start with what you do now (don't change processes initially)",
        "Map your current workflow on a board",
        "Set initial WIP limits (can adjust later)",
        "Make work and blockers visible",
        "Measure and improve flow over time"
      ],
      example: "A software team uses a kanban board with columns: Backlog, Ready, In Development (WIP limit: 3), Code Review (WIP limit: 2), Testing (WIP limit: 2), Done. When Testing has an opening, they 'pull' from Code Review. This prevents developers from starting too much work and keeps items flowing smoothly to completion."
    }
  },
  {
    id: 8,
    title: "Standard Work",
    duration: "10 min",
    content: {
      overview: "Standard work documents the current best practice for performing a task. It ensures consistent, high-quality output and serves as the baseline for improvement. Without a standard, there can be no improvement.",
      keyPoints: [
        "Standards capture the current best known method",
        "They ensure consistent quality regardless of who does the work",
        "Standards are living documents - updated as improvements are made",
        "Workers who do the work should help create the standards"
      ],
      elements: [
        "Takt Time: The pace of production to meet customer demand",
        "Work Sequence: The specific order of operations",
        "Standard WIP: The minimum inventory needed to maintain flow",
        "Cycle Time: Time to complete one cycle of work"
      ],
      benefits: [
        "Consistent quality and output",
        "Easier training of new employees",
        "Baseline for identifying problems",
        "Foundation for continuous improvement",
        "Preservation of organizational knowledge"
      ],
      creation: [
        "Observe the current process multiple times",
        "Document each step with input from operators",
        "Include key points and reasons",
        "Use visual formats (photos, diagrams)",
        "Test and refine with the team",
        "Post at the workstation"
      ],
      example: "A hospital created standard work for patient admission. The documented process included: specific questions to ask, forms to complete, systems to update, and expected time for each step. This reduced admission errors by 60% and training time by 50%. When problems occur, they can now identify which part of the standard wasn't followed."
    }
  },
  {
    id: 9,
    title: "Root Cause Analysis and Problem Solving",
    duration: "14 min",
    content: {
      overview: "Lean problem-solving goes beyond treating symptoms to find and eliminate root causes. The goal is to prevent problems from recurring, not just fix them temporarily.",
      keyPoints: [
        "Don't jump to solutions - understand the problem first",
        "Most problems have multiple contributing causes",
        "The obvious cause is rarely the root cause",
        "Countermeasures should prevent recurrence, not just fix the symptom"
      ],
      methods: [
        "5 Whys: Ask 'why' repeatedly until you reach the root cause",
        "Fishbone Diagram: Categorize potential causes (Materials, Methods, Machines, People, Environment, Measurement)",
        "A3 Thinking: Structured problem-solving on one page",
        "PDCA Cycle: Plan-Do-Check-Act for systematic improvement"
      ],
      fiveWhys: [
        "Problem: Machine stopped",
        "Why 1: Overloaded circuit → Why?",
        "Why 2: Bearing wasn't lubricated → Why?",
        "Why 3: Oil pump not circulating → Why?",
        "Why 4: Pump shaft worn → Why?",
        "Why 5: No strainer, metal shavings got in → Root cause!",
        "Countermeasure: Add strainer to oil pump"
      ],
      a3Elements: [
        "Background: Why is this important?",
        "Current Condition: What's happening now?",
        "Goal: What do we want to achieve?",
        "Root Cause Analysis: Why is this happening?",
        "Countermeasures: What will we do?",
        "Implementation Plan: Who, what, when?",
        "Follow-up: How will we confirm results?"
      ],
      example: "A bakery had frequent burnt bread. Initial reaction: 'Replace the oven.' 5 Whys revealed: bread burnt (why?) → oven too hot (why?) → thermostat calibration off (why?) → no maintenance schedule (why?) → no one assigned responsibility. Solution: Assign quarterly thermostat calibration to maintenance lead. Cost: $0. Result: Problem eliminated."
    }
  },
  {
    id: 10,
    title: "Building a Lean Culture",
    duration: "12 min",
    content: {
      overview: "Lean tools alone don't create lasting change - culture does. A lean culture is one where continuous improvement is part of everyone's job, problems are welcomed as opportunities, and respect for people drives behavior.",
      keyPoints: [
        "Culture change is the hardest part of lean transformation",
        "Leaders must model the behaviors they want to see",
        "Respect for people is as important as continuous improvement",
        "Lean is a journey, not a destination"
      ],
      culturalElements: [
        "Go and See (Genchi Genbutsu): Leaders regularly visit where work happens",
        "Respect for People: Value employee ideas and development",
        "Challenge: Set stretch goals and support people in achieving them",
        "Teamwork: Cross-functional collaboration",
        "Long-term Thinking: Invest in people and processes"
      ],
      leadershipRole: [
        "Model continuous improvement behaviors",
        "Ask questions rather than provide answers",
        "Create safe environment for raising problems",
        "Provide resources and remove obstacles",
        "Recognize and celebrate improvement efforts",
        "Be patient - culture change takes years"
      ],
      commonPitfalls: [
        "Tool-focused vs. people-focused approach",
        "Lack of management commitment",
        "Expecting quick results",
        "Not involving front-line workers",
        "Treating lean as a project vs. way of working",
        "Blaming people instead of improving processes"
      ],
      sustaining: [
        "Tie lean to strategic objectives",
        "Build internal expertise through training",
        "Integrate lean into daily management",
        "Celebrate successes and share learnings",
        "Continuously develop people at all levels"
      ],
      example: "Virginia Mason Medical Center in Seattle adopted the Toyota Production System. After 20 years, lean is embedded in their culture. Every employee has a 'stop the line' card to raise safety concerns. Leaders do daily gemba walks. Patients design improvements alongside staff. The result: dramatic improvements in quality, safety, and efficiency - sustained over decades."
    }
  }
]

export function LeanModule({ progress, onComplete }: LeanModuleProps) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const currentLesson = selectedLesson !== null ? lessons[selectedLesson] : null

  const handleNext = () => {
    if (selectedLesson !== null && selectedLesson < lessons.length - 1) {
      onComplete(selectedLesson)
      setSelectedLesson(selectedLesson + 1)
    } else if (selectedLesson === lessons.length - 1) {
      onComplete(selectedLesson)
      setSelectedLesson(null)
    }
  }

  const handlePrevious = () => {
    if (selectedLesson !== null && selectedLesson > 0) {
      setSelectedLesson(selectedLesson - 1)
    }
  }

  if (selectedLesson !== null && currentLesson) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedLesson(null)}>
            <ChevronLeft className="mr-2 size-4" />
            Back to lessons
          </Button>
          <Badge variant="outline">
            Lesson {selectedLesson + 1} of {lessons.length}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{currentLesson.title}</CardTitle>
                <CardDescription className="mt-2">
                  {currentLesson.duration} read
                </CardDescription>
              </div>
              {progress.completed > selectedLesson && (
                <Badge className="bg-green-500">
                  <CheckCircle2 className="mr-1 size-3" /> Completed
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {/* Overview */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                    <BookOpen className="size-5" /> Overview
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentLesson.content.overview}
                  </p>
                </div>

                {/* Key Points */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                    <Target className="size-5" /> Key Points
                  </h3>
                  <ul className="space-y-2">
                    {currentLesson.content.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-green-500" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dynamic Content Sections */}
                {Object.entries(currentLesson.content).map(([key, value]) => {
                  if (["overview", "keyPoints", "example"].includes(key)) return null
                  if (!Array.isArray(value)) return null

                  const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

                  return (
                    <div key={key}>
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                        <Lightbulb className="size-5" /> {title}
                      </h3>
                      <ul className="space-y-2">
                        {value.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ChevronRight className="mt-1 size-4 shrink-0 text-primary" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}

                {/* Example */}
                {currentLesson.content.example && (
                  <div className="bg-primary/5 border-primary/20 rounded-lg border p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                      <AlertCircle className="size-5" /> Real-World Example
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentLesson.content.example}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={selectedLesson === 0}
          >
            <ChevronLeft className="mr-2 size-4" />
            Previous Lesson
          </Button>
          <Button onClick={handleNext}>
            {selectedLesson === lessons.length - 1 ? (
              <>
                Complete Module
                <CheckCircle2 className="ml-2 size-4" />
              </>
            ) : (
              <>
                Next Lesson
                <ChevronRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lean Process Principles</CardTitle>
          <CardDescription>
            Master lean methodologies for continuous improvement. Learn about waste elimination,
            5S, value stream mapping, kaizen, and building a lean culture.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {lessons.map((lesson, index) => {
          const isCompleted = progress.completed > index
          const isNext = progress.completed === index

          return (
            <Card
              key={lesson.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isNext ? "ring-primary ring-2" : ""
              }`}
              onClick={() => setSelectedLesson(index)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 className="size-6 text-green-500" />
                    ) : (
                      <Circle className="text-muted-foreground size-6" />
                    )}
                    <div>
                      <CardTitle className="text-base">{lesson.title}</CardTitle>
                      <CardDescription>{lesson.duration}</CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="text-muted-foreground size-5" />
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
