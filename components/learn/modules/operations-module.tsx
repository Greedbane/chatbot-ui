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

interface OperationsModuleProps {
  progress: {
    completed: number
    total: number
  }
  onComplete: (index: number) => void
}

const lessons = [
  {
    id: 1,
    title: "Introduction to Operations Management",
    duration: "10 min",
    content: {
      overview: "Operations management is the administration of business practices to create the highest level of efficiency possible within an organization. It involves planning, organizing, and supervising processes to achieve organizational goals.",
      keyPoints: [
        "Operations management converts inputs (materials, labor, capital) into outputs (goods and services)",
        "It's concerned with managing the process that transforms inputs into outputs",
        "The goal is to maximize efficiency while ensuring quality and meeting customer needs",
        "Operations decisions affect both costs and revenues"
      ],
      coreActivities: [
        "Product/Service Design: What do we offer?",
        "Quality Management: How do we ensure quality?",
        "Process Design: How do we produce it?",
        "Location Planning: Where do we produce it?",
        "Layout Design: How do we arrange our facilities?",
        "Capacity Planning: How much can we produce?",
        "Scheduling: When do we produce it?",
        "Inventory Management: How much do we keep on hand?"
      ],
      example: "Consider a coffee shop: Operations management involves deciding the menu (product design), ensuring every drink meets quality standards, designing the workflow behind the counter (process design), choosing a high-traffic location, arranging equipment for efficiency (layout), determining how many drinks can be made per hour (capacity), scheduling staff for peak hours, and managing coffee bean inventory."
    }
  },
  {
    id: 2,
    title: "Supply Chain Management",
    duration: "15 min",
    content: {
      overview: "Supply Chain Management (SCM) encompasses the planning and management of all activities involved in sourcing, procurement, conversion, and logistics management. It also includes coordination with channel partners.",
      keyPoints: [
        "The supply chain includes everything from raw material extraction to final delivery to the customer",
        "Effective SCM can reduce costs by 25-50% and improve delivery times significantly",
        "Modern supply chains are complex networks, not simple linear chains",
        "Technology has transformed supply chain visibility and coordination"
      ],
      components: [
        "Suppliers: Provide raw materials and components",
        "Manufacturers: Transform materials into products",
        "Distributors: Move products from manufacturers to retailers",
        "Retailers: Sell products to end consumers",
        "Customers: The ultimate destination of all supply chain activities"
      ],
      strategies: [
        "Just-in-Time (JIT): Minimize inventory by timing deliveries precisely",
        "Vendor Managed Inventory: Suppliers manage stock levels at customer locations",
        "Cross-docking: Transfer goods directly from inbound to outbound trucks",
        "Drop shipping: Ship directly from manufacturer to customer"
      ],
      example: "Apple's supply chain is world-renowned. They source components from multiple countries (screens from Samsung, chips from TSMC), assemble in China (primarily Foxconn), and distribute globally. Their supply chain visibility allows them to track every component and respond quickly to demand changes."
    }
  },
  {
    id: 3,
    title: "Quality Management",
    duration: "12 min",
    content: {
      overview: "Quality management is a systematic approach to ensuring that products and services meet customer expectations and requirements. It encompasses all activities that organizations use to direct, control, and coordinate quality.",
      keyPoints: [
        "Quality is defined by the customer, not the producer",
        "Prevention is better (and cheaper) than detection",
        "Quality affects both customer satisfaction and operational costs",
        "Quality management is everyone's responsibility"
      ],
      principles: [
        "Customer Focus: Understand and meet customer requirements",
        "Leadership: Create unity of purpose and direction",
        "Engagement of People: Involve everyone at all levels",
        "Process Approach: Manage activities as processes",
        "Improvement: Continuously improve overall performance",
        "Evidence-based Decision Making: Use data and analysis",
        "Relationship Management: Manage relationships with interested parties"
      ],
      tools: [
        "Pareto Analysis: Identify the vital few causes of problems (80/20 rule)",
        "Cause and Effect Diagrams: Identify root causes (Fishbone/Ishikawa)",
        "Control Charts: Monitor process performance over time",
        "Check Sheets: Collect data systematically",
        "Histograms: Show frequency distribution of data",
        "Scatter Diagrams: Show relationships between variables",
        "Flowcharts: Visualize process steps"
      ],
      example: "Toyota's quality management is legendary. They use the 'Andon' system where any worker can stop the production line if they spot a defect. This prevents defects from moving downstream and emphasizes that quality is more important than meeting production quotas."
    }
  },
  {
    id: 4,
    title: "Capacity Planning",
    duration: "12 min",
    content: {
      overview: "Capacity planning is the process of determining the production capacity needed to meet changing demands for products. It involves balancing available resources with market demand to avoid both overcapacity (waste) and undercapacity (lost sales).",
      keyPoints: [
        "Capacity is the maximum rate of output for a process",
        "Effective capacity is typically 85-95% of design capacity",
        "Capacity decisions have long-term implications and require significant investment",
        "There's always a trade-off between excess capacity and stockouts"
      ],
      types: [
        "Design Capacity: The maximum output under ideal conditions",
        "Effective Capacity: Maximum output under normal conditions",
        "Actual Output: What is actually produced (considering inefficiencies)",
        "Utilization = Actual Output / Design Capacity",
        "Efficiency = Actual Output / Effective Capacity"
      ],
      strategies: [
        "Lead Strategy: Add capacity before demand increases (risk: overcapacity)",
        "Lag Strategy: Add capacity after demand has increased (risk: lost sales)",
        "Match Strategy: Add capacity in small increments to match demand",
        "Adjustment Strategy: Use flexible resources to match varying demand"
      ],
      considerations: [
        "Economies of Scale: Larger facilities often have lower per-unit costs",
        "Diseconomies of Scale: Very large facilities can become inefficient",
        "Flexibility: Smaller, more flexible capacity vs. large, fixed capacity",
        "Technology: How will technology affect future capacity needs?"
      ],
      example: "Airlines manage capacity through dynamic pricing, overbooking, and fleet management. During low-demand periods, they might ground aircraft or offer discounted fares. During peak travel seasons, they add flights and charge premium prices."
    }
  },
  {
    id: 5,
    title: "Inventory Management",
    duration: "15 min",
    content: {
      overview: "Inventory management is the supervision of non-capitalized assets (inventory) and stock items. It involves managing the flow of goods from manufacturers to warehouses and from these facilities to point of sale.",
      keyPoints: [
        "Inventory ties up capital but provides buffer against uncertainty",
        "The goal is to have the right items, in the right quantity, at the right time",
        "Inventory costs include holding costs, ordering costs, and shortage costs",
        "ABC analysis helps prioritize which items need closest attention"
      ],
      types: [
        "Raw Materials: Inputs waiting to be processed",
        "Work-in-Progress (WIP): Items being transformed",
        "Finished Goods: Completed products awaiting sale",
        "MRO (Maintenance, Repair, Operations): Supplies needed for production"
      ],
      models: [
        "Economic Order Quantity (EOQ): Minimizes total inventory costs",
        "Reorder Point (ROP): When to place an order (based on lead time and demand)",
        "Safety Stock: Extra inventory to protect against variability",
        "ABC Analysis: Classify items by value (A=high, B=medium, C=low)"
      ],
      metrics: [
        "Inventory Turnover: Cost of Goods Sold / Average Inventory",
        "Days of Inventory: 365 / Inventory Turnover",
        "Fill Rate: Percentage of orders fulfilled from stock",
        "Stockout Rate: Frequency of stockouts"
      ],
      example: "Amazon uses sophisticated algorithms to predict demand and position inventory. They use ABC analysis at scale: high-velocity items (A) are stocked in many fulfillment centers close to customers, while slow-moving items (C) might only be in a few regional centers."
    }
  },
  {
    id: 6,
    title: "Process Design and Analysis",
    duration: "12 min",
    content: {
      overview: "Process design involves developing and optimizing the sequence of activities that produce a product or service. It determines how work flows through an organization and directly impacts efficiency, quality, and costs.",
      keyPoints: [
        "Processes are collections of linked activities that create value",
        "Good process design reduces waste, time, and cost while improving quality",
        "Processes should be documented, measured, and continuously improved",
        "Different products/services may require different process types"
      ],
      processTypes: [
        "Job Shop: High variety, low volume (custom furniture)",
        "Batch: Moderate variety, moderate volume (bakery)",
        "Assembly Line: Low variety, high volume (automobiles)",
        "Continuous Flow: Standardized, very high volume (oil refinery)"
      ],
      analysisTools: [
        "Process Flow Diagrams: Visual representation of process steps",
        "Value Stream Mapping: Identify value-adding vs. non-value-adding steps",
        "Time Studies: Measure how long each step takes",
        "Bottleneck Analysis: Find the constraint limiting output",
        "Capacity Analysis: Determine what each step can produce"
      ],
      designPrinciples: [
        "Eliminate unnecessary steps",
        "Combine steps where possible",
        "Sequence steps for minimal movement and delay",
        "Design for parallel processing where possible",
        "Build in quality checks at appropriate points"
      ],
      example: "A fast-food restaurant like McDonald's uses carefully designed processes. The burger assembly line has specific stations, each worker performs defined tasks, and the layout minimizes movement. This allows them to serve customers quickly while maintaining consistent quality."
    }
  },
  {
    id: 7,
    title: "Scheduling and Resource Allocation",
    duration: "12 min",
    content: {
      overview: "Scheduling involves allocating resources over time to accomplish specific tasks. It's about deciding what to do when, using which resources, to meet deadlines and minimize costs.",
      keyPoints: [
        "Scheduling balances multiple objectives: time, cost, resource utilization",
        "Different environments require different scheduling approaches",
        "Technology has greatly improved scheduling capabilities",
        "Good scheduling requires accurate estimates and flexibility for changes"
      ],
      approaches: [
        "Forward Scheduling: Schedule from now forward to find completion date",
        "Backward Scheduling: Schedule backward from due date to find start date",
        "Finite Loading: Consider actual capacity limits when scheduling",
        "Infinite Loading: Schedule without considering capacity limits first"
      ],
      priorityRules: [
        "FCFS (First Come, First Served): Process in arrival order",
        "SPT (Shortest Processing Time): Do quickest jobs first",
        "EDD (Earliest Due Date): Prioritize by due date",
        "CR (Critical Ratio): Due date minus current date / remaining time"
      ],
      techniques: [
        "Gantt Charts: Visual timeline of activities and resources",
        "Critical Path Method (CPM): Identify the longest path through a project",
        "PERT: Account for uncertainty in time estimates",
        "Linear Programming: Optimize resource allocation mathematically"
      ],
      example: "Hospital operating room scheduling is complex: surgeries have different durations, require different equipment and staff, and emergencies can disrupt the schedule. Effective scheduling maximizes OR utilization while ensuring patient safety and staff well-being."
    }
  },
  {
    id: 8,
    title: "Performance Measurement and KPIs",
    duration: "10 min",
    content: {
      overview: "Performance measurement involves collecting and analyzing data to evaluate how well operations are meeting objectives. Key Performance Indicators (KPIs) are specific, measurable metrics that indicate success.",
      keyPoints: [
        "What gets measured gets managed - measurement drives behavior",
        "KPIs should be SMART: Specific, Measurable, Achievable, Relevant, Time-bound",
        "Balance leading indicators (predictive) with lagging indicators (results)",
        "Too many metrics can be as harmful as too few"
      ],
      categories: [
        "Quality: Defect rate, customer complaints, first-pass yield",
        "Speed/Time: Lead time, cycle time, on-time delivery",
        "Cost: Unit cost, overhead ratio, labor productivity",
        "Flexibility: Setup time, product variety, volume flexibility",
        "Dependability: Delivery reliability, equipment availability"
      ],
      frameworks: [
        "Balanced Scorecard: Financial, Customer, Process, Learning perspectives",
        "SCOR Model: Plan, Source, Make, Deliver, Return",
        "OEE: Overall Equipment Effectiveness (Availability × Performance × Quality)",
        "Benchmarking: Compare performance against best practices"
      ],
      implementation: [
        "Define what success looks like for your operations",
        "Identify 5-10 key metrics that matter most",
        "Establish baselines and set targets",
        "Create dashboards for visibility",
        "Review regularly and adjust as needed"
      ],
      example: "A manufacturing plant might track OEE (target: 85%), on-time delivery (target: 98%), defect rate (target: <0.5%), and inventory turns (target: 12). These metrics are displayed on shop floor dashboards and reviewed daily in management meetings."
    }
  }
]

export function OperationsModule({ progress, onComplete }: OperationsModuleProps) {
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
          <CardTitle>Operations Management</CardTitle>
          <CardDescription>
            Master the fundamentals of managing business operations effectively.
            Learn about supply chain, quality management, capacity planning, and more.
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
