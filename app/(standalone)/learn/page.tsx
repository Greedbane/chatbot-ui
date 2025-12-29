"use client"

import { useState, useEffect } from "react"

// ============= OPERATIONS LESSONS =============
const operationsLessons = [
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
      sections: [
        {
          title: "Core Activities",
          items: [
            "Product/Service Design: What do we offer?",
            "Quality Management: How do we ensure quality?",
            "Process Design: How do we produce it?",
            "Location Planning: Where do we produce it?",
            "Layout Design: How do we arrange our facilities?",
            "Capacity Planning: How much can we produce?",
            "Scheduling: When do we produce it?",
            "Inventory Management: How much do we keep on hand?"
          ]
        }
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
      sections: [
        {
          title: "Components",
          items: [
            "Suppliers: Provide raw materials and components",
            "Manufacturers: Transform materials into products",
            "Distributors: Move products from manufacturers to retailers",
            "Retailers: Sell products to end consumers",
            "Customers: The ultimate destination of all supply chain activities"
          ]
        },
        {
          title: "Strategies",
          items: [
            "Just-in-Time (JIT): Minimize inventory by timing deliveries precisely",
            "Vendor Managed Inventory: Suppliers manage stock levels at customer locations",
            "Cross-docking: Transfer goods directly from inbound to outbound trucks",
            "Drop shipping: Ship directly from manufacturer to customer"
          ]
        }
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
      sections: [
        {
          title: "7 Quality Tools",
          items: [
            "Pareto Analysis: Identify the vital few causes of problems (80/20 rule)",
            "Cause and Effect Diagrams: Identify root causes (Fishbone/Ishikawa)",
            "Control Charts: Monitor process performance over time",
            "Check Sheets: Collect data systematically",
            "Histograms: Show frequency distribution of data",
            "Scatter Diagrams: Show relationships between variables",
            "Flowcharts: Visualize process steps"
          ]
        }
      ],
      example: "Toyota's quality management is legendary. They use the 'Andon' system where any worker can stop the production line if they spot a defect. This prevents defects from moving downstream and emphasizes that quality is more important than meeting production quotas."
    }
  },
  {
    id: 4,
    title: "Capacity Planning",
    duration: "12 min",
    content: {
      overview: "Capacity planning is the process of determining the production capacity needed to meet changing demands for products. It involves balancing available resources with market demand.",
      keyPoints: [
        "Capacity is the maximum rate of output for a process",
        "Effective capacity is typically 85-95% of design capacity",
        "Capacity decisions have long-term implications and require significant investment",
        "There's always a trade-off between excess capacity and stockouts"
      ],
      sections: [
        {
          title: "Types of Capacity",
          items: [
            "Design Capacity: The maximum output under ideal conditions",
            "Effective Capacity: Maximum output under normal conditions",
            "Actual Output: What is actually produced",
            "Utilization = Actual Output / Design Capacity",
            "Efficiency = Actual Output / Effective Capacity"
          ]
        },
        {
          title: "Strategies",
          items: [
            "Lead Strategy: Add capacity before demand increases",
            "Lag Strategy: Add capacity after demand has increased",
            "Match Strategy: Add capacity in small increments to match demand"
          ]
        }
      ],
      example: "Airlines manage capacity through dynamic pricing, overbooking, and fleet management. During low-demand periods, they might ground aircraft or offer discounted fares. During peak travel seasons, they add flights and charge premium prices."
    }
  },
  {
    id: 5,
    title: "Inventory Management",
    duration: "15 min",
    content: {
      overview: "Inventory management involves managing the flow of goods from manufacturers to warehouses and from these facilities to point of sale. The goal is to have the right items, in the right quantity, at the right time.",
      keyPoints: [
        "Inventory ties up capital but provides buffer against uncertainty",
        "Inventory costs include holding costs, ordering costs, and shortage costs",
        "ABC analysis helps prioritize which items need closest attention",
        "Modern systems use real-time tracking and automated reordering"
      ],
      sections: [
        {
          title: "Types of Inventory",
          items: [
            "Raw Materials: Inputs waiting to be processed",
            "Work-in-Progress (WIP): Items being transformed",
            "Finished Goods: Completed products awaiting sale",
            "MRO: Maintenance, Repair, Operations supplies"
          ]
        },
        {
          title: "Key Models",
          items: [
            "Economic Order Quantity (EOQ): Minimizes total inventory costs",
            "Reorder Point (ROP): When to place an order",
            "Safety Stock: Extra inventory to protect against variability",
            "ABC Analysis: Classify items by value (A=high, B=medium, C=low)"
          ]
        }
      ],
      example: "Amazon uses sophisticated algorithms to predict demand and position inventory. High-velocity items (A) are stocked in many fulfillment centers close to customers, while slow-moving items (C) might only be in a few regional centers."
    }
  },
  {
    id: 6,
    title: "Process Design and Analysis",
    duration: "12 min",
    content: {
      overview: "Process design involves developing and optimizing the sequence of activities that produce a product or service. It determines how work flows through an organization.",
      keyPoints: [
        "Processes are collections of linked activities that create value",
        "Good process design reduces waste, time, and cost while improving quality",
        "Different products/services may require different process types",
        "Processes should be documented, measured, and continuously improved"
      ],
      sections: [
        {
          title: "Process Types",
          items: [
            "Job Shop: High variety, low volume (custom furniture)",
            "Batch: Moderate variety, moderate volume (bakery)",
            "Assembly Line: Low variety, high volume (automobiles)",
            "Continuous Flow: Standardized, very high volume (oil refinery)"
          ]
        },
        {
          title: "Analysis Tools",
          items: [
            "Process Flow Diagrams: Visual representation of process steps",
            "Value Stream Mapping: Identify value-adding vs. non-value-adding steps",
            "Bottleneck Analysis: Find the constraint limiting output",
            "Time Studies: Measure how long each step takes"
          ]
        }
      ],
      example: "McDonald's uses carefully designed processes. The burger assembly line has specific stations, each worker performs defined tasks, and the layout minimizes movement. This allows them to serve customers quickly while maintaining consistent quality."
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
        "Good scheduling requires accurate estimates and flexibility for changes",
        "Technology has greatly improved scheduling capabilities"
      ],
      sections: [
        {
          title: "Priority Rules",
          items: [
            "FCFS (First Come, First Served): Process in arrival order",
            "SPT (Shortest Processing Time): Do quickest jobs first",
            "EDD (Earliest Due Date): Prioritize by due date",
            "CR (Critical Ratio): Due date minus current date / remaining time"
          ]
        },
        {
          title: "Techniques",
          items: [
            "Gantt Charts: Visual timeline of activities and resources",
            "Critical Path Method (CPM): Identify the longest path through a project",
            "PERT: Account for uncertainty in time estimates"
          ]
        }
      ],
      example: "Hospital operating room scheduling is complex: surgeries have different durations, require different equipment and staff, and emergencies can disrupt the schedule. Effective scheduling maximizes OR utilization while ensuring patient safety."
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
      sections: [
        {
          title: "Key Metrics Categories",
          items: [
            "Quality: Defect rate, customer complaints, first-pass yield",
            "Speed/Time: Lead time, cycle time, on-time delivery",
            "Cost: Unit cost, overhead ratio, labor productivity",
            "Flexibility: Setup time, product variety, volume flexibility"
          ]
        },
        {
          title: "Frameworks",
          items: [
            "Balanced Scorecard: Financial, Customer, Process, Learning perspectives",
            "OEE: Overall Equipment Effectiveness (Availability × Performance × Quality)",
            "SCOR Model: Plan, Source, Make, Deliver, Return"
          ]
        }
      ],
      example: "A manufacturing plant might track OEE (target: 85%), on-time delivery (target: 98%), defect rate (target: <0.5%), and inventory turns (target: 12). These metrics are displayed on shop floor dashboards and reviewed daily."
    }
  }
]

// ============= LEAN LESSONS =============
const leanLessons = [
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
      sections: [
        {
          title: "5 Lean Principles",
          items: [
            "Define Value: Understand what the customer truly values",
            "Map the Value Stream: Identify all steps and eliminate non-value-adding ones",
            "Create Flow: Ensure work moves smoothly without interruptions",
            "Establish Pull: Produce only what is needed, when it's needed",
            "Pursue Perfection: Continuously improve toward an ideal state"
          ]
        }
      ],
      example: "A hospital applied lean thinking to their emergency department. By mapping patient flow, they identified that patients spent 70% of their time waiting. By reorganizing the process, they reduced average stay from 6 hours to 3 hours while improving patient satisfaction."
    }
  },
  {
    id: 2,
    title: "The 8 Wastes (TIMWOODS)",
    duration: "15 min",
    content: {
      overview: "Waste (Muda in Japanese) is any activity that consumes resources but creates no value for the customer. Lean identifies 8 types of waste, remembered by the acronym TIMWOODS.",
      keyPoints: [
        "Waste is anything the customer wouldn't willingly pay for",
        "Most processes contain 90-95% waste when first analyzed",
        "Overproduction is considered the worst waste as it creates all others",
        "Identifying waste is the first step to eliminating it"
      ],
      sections: [
        {
          title: "TIMWOODS",
          items: [
            "T - Transportation: Unnecessary movement of materials or products",
            "I - Inventory: Excess products or materials not being processed",
            "M - Motion: Unnecessary movement by people (walking, reaching)",
            "W - Waiting: Idle time when resources are not in use",
            "O - Overproduction: Making more than needed, earlier than needed",
            "O - Overprocessing: Doing more work than necessary",
            "D - Defects: Errors requiring rework or scrapping",
            "S - Skills (underutilized): Not using people's talents and ideas"
          ]
        }
      ],
      example: "A software company analyzed their development process and found all 8 wastes: Transportation (code moving between teams), Inventory (undeployed features), Motion (switching between tools), Waiting (for approvals), Overproduction (building unused features), Overprocessing (excessive documentation), Defects (bugs), and underutilized Skills (developers doing manual testing)."
    }
  },
  {
    id: 3,
    title: "5S Workplace Organization",
    duration: "12 min",
    content: {
      overview: "5S is a systematic method for organizing and standardizing the workplace. It creates a clean, organized environment that exposes problems and supports efficient work.",
      keyPoints: [
        "5S is both a methodology and a foundation for lean culture",
        "A clean, organized workplace makes problems visible",
        "5S reduces wasted time searching for tools and materials",
        "Sustainability (the 5th S) is the most challenging aspect"
      ],
      sections: [
        {
          title: "The 5S Steps",
          items: [
            "Sort (Seiri): Remove unnecessary items. Keep only what is needed.",
            "Set in Order (Seiton): Arrange items for easy access. A place for everything.",
            "Shine (Seiso): Clean the workplace thoroughly. Cleaning is inspection.",
            "Standardize (Seiketsu): Create standards to maintain the first 3S.",
            "Sustain (Shitsuke): Build discipline to maintain standards long-term."
          ]
        }
      ],
      example: "A machine shop implemented 5S: They removed 3 truckloads of unneeded items (Sort), created shadow boards for tools (Set in Order), established daily cleaning routines (Shine), posted visual standards (Standardize), and conducted weekly audits (Sustain). Setup time dropped 40%."
    }
  },
  {
    id: 4,
    title: "Value Stream Mapping",
    duration: "15 min",
    content: {
      overview: "Value Stream Mapping (VSM) is a visual tool for analyzing the flow of materials and information required to bring a product to a customer. It shows both value-adding and non-value-adding steps.",
      keyPoints: [
        "A value stream includes all activities - both value-adding and waste",
        "VSM shows the current state and envisions a future state",
        "It captures both material flow and information flow",
        "VSM is done with a team to build shared understanding"
      ],
      sections: [
        {
          title: "Key Metrics",
          items: [
            "Lead Time: Total time from start to finish",
            "Cycle Time: Time to complete one unit",
            "Takt Time: Customer demand rate",
            "Value-Added Time: Time actually transforming the product",
            "Process Cycle Efficiency: Value-Added Time / Lead Time"
          ]
        },
        {
          title: "Steps",
          items: [
            "1. Select a product family to map",
            "2. Walk the process from end to beginning",
            "3. Draw the current state map",
            "4. Identify waste and opportunities",
            "5. Design the future state map",
            "6. Create an implementation plan"
          ]
        }
      ],
      example: "A furniture manufacturer mapped their order-to-delivery value stream. Current state: 45-day lead time, only 2 hours of value-added time (0.2% efficiency). The map revealed 30 days of raw material inventory and 10 days waiting between departments. Future state achieved 10-day lead time."
    }
  },
  {
    id: 5,
    title: "Kaizen - Continuous Improvement",
    duration: "12 min",
    content: {
      overview: "Kaizen (Japanese for 'change for better') is the philosophy of continuous, incremental improvement. Rather than waiting for major innovations, kaizen focuses on making small improvements every day.",
      keyPoints: [
        "Small improvements compound into significant gains over time",
        "Everyone has ideas for improvement - tap into this knowledge",
        "Improvement is everyone's job, not just management's",
        "Focus on process improvement, not blaming people"
      ],
      sections: [
        {
          title: "Types of Kaizen",
          items: [
            "Point Kaizen: Quick fixes, individual ideas",
            "System Kaizen: Improve entire processes",
            "Kaizen Event/Blitz: Focused 3-5 day improvement project",
            "Daily Kaizen: Small improvements as part of regular work"
          ]
        },
        {
          title: "Implementation",
          items: [
            "Create a suggestion system - make it easy to submit ideas",
            "Recognize and reward improvement efforts",
            "Provide time for improvement activities",
            "Train everyone in problem-solving methods"
          ]
        }
      ],
      example: "Toyota implements over 1 million employee suggestions per year. A worker noticed reaching for a part caused strain. He suggested repositioning the bin 6 inches closer. This saved 2 seconds per car. With 400,000 cars per year, this saved 220 hours annually - from one simple suggestion."
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
      sections: [
        {
          title: "Key Elements",
          items: [
            "Pull System: Production triggered by actual demand",
            "Takt Time: Match production pace to customer demand",
            "One-Piece Flow: Process one item at a time",
            "Quick Changeover: Minimize setup time for small batches",
            "Leveled Production (Heijunka): Smooth out volume variations"
          ]
        },
        {
          title: "Prerequisites",
          items: [
            "Reliable equipment (preventive maintenance)",
            "Consistent quality (problems stop the line)",
            "Flexible workforce (cross-trained employees)",
            "Supplier reliability (on-time, defect-free deliveries)"
          ]
        }
      ],
      example: "Dell revolutionized computer manufacturing with JIT. Instead of building to forecast, they built to order. Components arrived just hours before assembly. This eliminated finished goods inventory and allowed rapid response to market changes."
    }
  },
  {
    id: 7,
    title: "Kanban and Pull Systems",
    duration: "12 min",
    content: {
      overview: "Kanban is a visual scheduling system that controls production through signals. It implements 'pull' - where downstream processes signal upstream when more work is needed.",
      keyPoints: [
        "Kanban means 'visual signal' or 'card' in Japanese",
        "It prevents overproduction by limiting work-in-progress",
        "Visual nature makes status obvious at a glance",
        "Kanban creates flow and exposes bottlenecks"
      ],
      sections: [
        {
          title: "Kanban Principles",
          items: [
            "Visualize work: Make all work visible on a board",
            "Limit WIP: Set maximum items in each stage",
            "Manage flow: Optimize the flow of work",
            "Make policies explicit: Clear rules for how work moves",
            "Improve collaboratively: Use feedback to evolve"
          ]
        },
        {
          title: "Types",
          items: [
            "Production Kanban: Signal to produce more items",
            "Withdrawal Kanban: Signal to move items between areas",
            "Two-Bin System: When first bin empties, reorder"
          ]
        }
      ],
      example: "A software team uses a kanban board with columns: Backlog, Ready, In Development (WIP limit: 3), Code Review (WIP limit: 2), Testing (WIP limit: 2), Done. This prevents developers from starting too much work and keeps items flowing to completion."
    }
  },
  {
    id: 8,
    title: "Standard Work",
    duration: "10 min",
    content: {
      overview: "Standard work documents the current best practice for performing a task. It ensures consistent, high-quality output and serves as the baseline for improvement.",
      keyPoints: [
        "Standards capture the current best known method",
        "They ensure consistent quality regardless of who does the work",
        "Standards are living documents - updated as improvements are made",
        "Workers who do the work should help create the standards"
      ],
      sections: [
        {
          title: "Elements",
          items: [
            "Takt Time: The pace of production",
            "Work Sequence: The specific order of operations",
            "Standard WIP: The minimum inventory needed",
            "Cycle Time: Time to complete one cycle"
          ]
        },
        {
          title: "Benefits",
          items: [
            "Consistent quality and output",
            "Easier training of new employees",
            "Baseline for identifying problems",
            "Foundation for continuous improvement"
          ]
        }
      ],
      example: "A hospital created standard work for patient admission. The documented process included specific questions to ask, forms to complete, and expected time for each step. This reduced admission errors by 60% and training time by 50%."
    }
  },
  {
    id: 9,
    title: "Root Cause Analysis",
    duration: "14 min",
    content: {
      overview: "Lean problem-solving goes beyond treating symptoms to find and eliminate root causes. The goal is to prevent problems from recurring, not just fix them temporarily.",
      keyPoints: [
        "Don't jump to solutions - understand the problem first",
        "Most problems have multiple contributing causes",
        "The obvious cause is rarely the root cause",
        "Countermeasures should prevent recurrence"
      ],
      sections: [
        {
          title: "5 Whys Example",
          items: [
            "Problem: Machine stopped",
            "Why 1: Overloaded circuit → Why?",
            "Why 2: Bearing wasn't lubricated → Why?",
            "Why 3: Oil pump not circulating → Why?",
            "Why 4: Pump shaft worn → Why?",
            "Why 5: No strainer, metal shavings got in → Root cause!",
            "Solution: Add strainer to oil pump"
          ]
        },
        {
          title: "Methods",
          items: [
            "5 Whys: Ask 'why' repeatedly until root cause",
            "Fishbone Diagram: Categorize potential causes",
            "A3 Thinking: Structured problem-solving on one page",
            "PDCA Cycle: Plan-Do-Check-Act for improvement"
          ]
        }
      ],
      example: "A bakery had frequent burnt bread. Initial reaction: 'Replace the oven.' 5 Whys revealed: no maintenance schedule, no one assigned responsibility. Solution: Assign quarterly thermostat calibration. Cost: $0. Result: Problem eliminated."
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
      sections: [
        {
          title: "Cultural Elements",
          items: [
            "Go and See (Genchi Genbutsu): Leaders visit where work happens",
            "Respect for People: Value employee ideas and development",
            "Challenge: Set stretch goals and support achievement",
            "Teamwork: Cross-functional collaboration",
            "Long-term Thinking: Invest in people and processes"
          ]
        },
        {
          title: "Common Pitfalls",
          items: [
            "Tool-focused vs. people-focused approach",
            "Lack of management commitment",
            "Expecting quick results",
            "Not involving front-line workers",
            "Treating lean as a project vs. way of working"
          ]
        }
      ],
      example: "Virginia Mason Medical Center adopted Toyota Production System. After 20 years, lean is embedded in their culture. Every employee has a 'stop the line' card for safety concerns. Leaders do daily gemba walks. Result: dramatic improvements in quality and efficiency - sustained over decades."
    }
  }
]

// ============= QUIZ QUESTIONS =============
const operationsQuiz = [
  { q: "What is the primary goal of operations management?", options: ["Maximizing employee satisfaction", "Creating efficiency while meeting quality and customer needs", "Minimizing all costs", "Producing maximum quantity"], correct: 1 },
  { q: "In supply chain management, what does JIT stand for?", options: ["Just In Transit", "Joint Inventory Tracking", "Just-in-Time", "Job Integration Technology"], correct: 2 },
  { q: "What is the 80/20 rule in quality management called?", options: ["Control Chart Analysis", "Pareto Analysis", "Fishbone Diagram", "Scatter Analysis"], correct: 1 },
  { q: "What is 'effective capacity'?", options: ["Maximum output under ideal conditions", "Maximum output under normal conditions", "Actual production output", "Customer demand rate"], correct: 1 },
  { q: "In ABC inventory analysis, which category needs closest attention?", options: ["Category C", "Category B", "Category A", "All equal"], correct: 2 },
  { q: "What is a 'bottleneck'?", options: ["Fastest step in a process", "Constraint limiting overall output", "Quality inspection point", "Starting point of production"], correct: 1 },
  { q: "What scheduling rule prioritizes earliest due dates?", options: ["FCFS", "SPT", "EDD", "CR"], correct: 2 },
  { q: "In OEE, what three factors are multiplied?", options: ["Cost, Quality, Speed", "Availability, Performance, Quality", "Time, Materials, Labor", "Input, Process, Output"], correct: 1 },
]

const leanQuiz = [
  { q: "What does the 'M' in TIMWOODS stand for?", options: ["Materials", "Motion", "Manufacturing", "Management"], correct: 1 },
  { q: "In 5S, what does 'Seiton' (Set in Order) mean?", options: ["Remove unnecessary items", "Arrange items for easy access", "Clean the workplace", "Maintain standards"], correct: 1 },
  { q: "What is the main purpose of Value Stream Mapping?", options: ["Calculate costs", "Visualize flow of materials and information", "Design products", "Train employees"], correct: 1 },
  { q: "What is 'Kaizen'?", options: ["Perfect quality", "Continuous improvement", "Respect for people", "Flow production"], correct: 1 },
  { q: "In Kanban, what triggers production?", options: ["Forecast from management", "Signal from downstream process", "Time-based schedule", "Maximum inventory levels"], correct: 1 },
  { q: "What is considered the worst type of waste?", options: ["Defects", "Waiting", "Overproduction", "Motion"], correct: 2 },
  { q: "What is 'Takt Time'?", options: ["Time to complete one unit", "Available time divided by demand", "Setup time between products", "Total lead time"], correct: 1 },
  { q: "What is the purpose of '5 Whys'?", options: ["Brainstorm solutions", "Find root cause", "Prioritize projects", "Document work"], correct: 1 },
  { q: "What is 'Genchi Genbutsu'?", options: ["Respect for people", "Go and see for yourself", "Continuous improvement", "Standard work"], correct: 1 },
  { q: "What is the primary purpose of Standard Work?", options: ["Reduce wages", "Document best practice as baseline for improvement", "Eliminate training", "Automate processes"], correct: 1 },
]

// ============= MAIN COMPONENT =============
export default function LearnPage() {
  const [tab, setTab] = useState<"overview" | "operations" | "lean" | "quiz">("overview")
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [module, setModule] = useState<"operations" | "lean">("operations")
  const [progress, setProgress] = useState({ operations: 0, lean: 0, opsQuiz: null as number | null, leanQuiz: null as number | null })

  // Quiz state
  const [quizType, setQuizType] = useState<"operations" | "lean" | null>(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("learnProgress")
    if (saved) setProgress(JSON.parse(saved))
  }, [])

  const saveProgress = (p: typeof progress) => {
    setProgress(p)
    localStorage.setItem("learnProgress", JSON.stringify(p))
  }

  const lessons = module === "operations" ? operationsLessons : leanLessons
  const currentLesson = selectedLesson !== null ? lessons[selectedLesson] : null
  const quizQuestions = quizType === "operations" ? operationsQuiz : leanQuiz

  const handleAnswer = (idx: number) => {
    if (showResult) return
    setQuizAnswer(idx)
    setShowResult(true)
    if (idx === quizQuestions[quizIndex].correct) {
      setQuizScore(s => s + 1)
    }
  }

  const nextQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(i => i + 1)
      setQuizAnswer(null)
      setShowResult(false)
    } else {
      const score = Math.round((quizScore / quizQuestions.length) * 100)
      const newProgress = { ...progress }
      if (quizType === "operations") newProgress.opsQuiz = score
      else newProgress.leanQuiz = score
      saveProgress(newProgress)
      setQuizType(null)
      setQuizIndex(0)
      setQuizScore(0)
      setShowResult(false)
    }
  }

  const startQuiz = (type: "operations" | "lean") => {
    setQuizType(type)
    setQuizIndex(0)
    setQuizAnswer(null)
    setQuizScore(0)
    setShowResult(false)
  }

  const markComplete = () => {
    if (selectedLesson === null) return
    const key = module === "operations" ? "operations" : "lean"
    const newProgress = { ...progress, [key]: Math.max(progress[key], selectedLesson + 1) }
    saveProgress(newProgress)
    if (selectedLesson < lessons.length - 1) {
      setSelectedLesson(selectedLesson + 1)
    } else {
      setSelectedLesson(null)
    }
  }

  // Quiz Mode
  if (quizType) {
    const q = quizQuestions[quizIndex]
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-zinc-400">{quizType === "operations" ? "Operations" : "Lean"} Quiz</span>
            <span className="text-zinc-400">Question {quizIndex + 1} of {quizQuestions.length}</span>
          </div>
          <div className="bg-zinc-800 h-2 rounded mb-8">
            <div className="bg-blue-500 h-2 rounded" style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} />
          </div>
          <h2 className="text-xl font-semibold mb-6">{q.q}</h2>
          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-lg border transition ${
                  showResult
                    ? idx === q.correct
                      ? "border-green-500 bg-green-500/20"
                      : idx === quizAnswer
                        ? "border-red-500 bg-red-500/20"
                        : "border-zinc-700 opacity-50"
                    : quizAnswer === idx
                      ? "border-blue-500 bg-blue-500/20"
                      : "border-zinc-700 hover:border-zinc-500"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {showResult && (
            <button onClick={nextQuestion} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold">
              {quizIndex < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
          )}
          <p className="text-center mt-4 text-zinc-400">Score: {quizScore} / {quizIndex + (showResult ? 1 : 0)}</p>
        </div>
      </div>
    )
  }

  // Lesson View
  if (currentLesson) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setSelectedLesson(null)} className="text-zinc-400 hover:text-white mb-6">
            ← Back to lessons
          </button>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
              <p className="text-zinc-400">{currentLesson.duration} read</p>
            </div>
            {progress[module] > selectedLesson! && (
              <span className="bg-green-600 px-3 py-1 rounded text-sm">Completed</span>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-zinc-300">{currentLesson.content.overview}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Key Points</h3>
              <ul className="space-y-2">
                {currentLesson.content.keyPoints.map((point, i) => (
                  <li key={i} className="flex gap-2 text-zinc-300">
                    <span className="text-green-500">✓</span> {point}
                  </li>
                ))}
              </ul>
            </div>

            {currentLesson.content.sections?.map((section, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-zinc-300">
                      <span className="text-blue-500">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {currentLesson.content.example && (
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Real-World Example</h3>
                <p className="text-zinc-300">{currentLesson.content.example}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => selectedLesson > 0 && setSelectedLesson(selectedLesson - 1)}
              disabled={selectedLesson === 0}
              className="px-6 py-2 border border-zinc-600 rounded-lg disabled:opacity-50"
            >
              ← Previous
            </button>
            <button onClick={markComplete} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
              {selectedLesson === lessons.length - 1 ? "Complete Module" : "Next Lesson →"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main View
  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-800 p-6">
        <h1 className="text-2xl font-bold">Operations & Lean Learning Center</h1>
        <p className="text-zinc-400">Master operations management and lean process principles</p>
      </header>

      <div className="p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(["overview", "operations", "lean", "quiz"] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); if (t === "operations" || t === "lean") setModule(t) }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${tab === t ? "bg-blue-600" : "bg-zinc-800 hover:bg-zinc-700"}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-zinc-400 text-sm">Overall Progress</p>
                <p className="text-2xl font-bold">{Math.round(((progress.operations + progress.lean) / 18) * 100)}%</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-zinc-400 text-sm">Operations</p>
                <p className="text-2xl font-bold">{progress.operations}/8</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-zinc-400 text-sm">Lean</p>
                <p className="text-2xl font-bold">{progress.lean}/10</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-zinc-400 text-sm">Quiz Average</p>
                <p className="text-2xl font-bold">
                  {progress.opsQuiz !== null || progress.leanQuiz !== null
                    ? `${Math.round(((progress.opsQuiz || 0) + (progress.leanQuiz || 0)) / ((progress.opsQuiz !== null ? 1 : 0) + (progress.leanQuiz !== null ? 1 : 0)))}%`
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div onClick={() => { setTab("operations"); setModule("operations") }} className="bg-zinc-800 rounded-lg p-6 cursor-pointer hover:bg-zinc-750">
                <h2 className="text-xl font-bold mb-2">Operations Management</h2>
                <p className="text-zinc-400 mb-4">8 lessons • Supply chain, quality, capacity, inventory</p>
                <div className="bg-zinc-700 h-2 rounded">
                  <div className="bg-blue-500 h-2 rounded" style={{ width: `${(progress.operations / 8) * 100}%` }} />
                </div>
              </div>
              <div onClick={() => { setTab("lean"); setModule("lean") }} className="bg-zinc-800 rounded-lg p-6 cursor-pointer hover:bg-zinc-750">
                <h2 className="text-xl font-bold mb-2">Lean Process Principles</h2>
                <p className="text-zinc-400 mb-4">10 lessons • 5S, Kaizen, Value Stream, Kanban</p>
                <div className="bg-zinc-700 h-2 rounded">
                  <div className="bg-green-500 h-2 rounded" style={{ width: `${(progress.lean / 10) * 100}%` }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => saveProgress({ operations: 0, lean: 0, opsQuiz: null, leanQuiz: null })}
              className="text-zinc-500 hover:text-zinc-300 text-sm"
            >
              Reset Progress
            </button>
          </div>
        )}

        {(tab === "operations" || tab === "lean") && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{tab === "operations" ? "Operations Management" : "Lean Process Principles"}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(idx)}
                  className={`bg-zinc-800 rounded-lg p-4 cursor-pointer hover:bg-zinc-750 ${progress[module] === idx ? "ring-2 ring-blue-500" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${progress[module] > idx ? "bg-green-600" : "bg-zinc-700"}`}>
                      {progress[module] > idx ? "✓" : idx + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <p className="text-zinc-400 text-sm">{lesson.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "quiz" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Knowledge Assessments</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-800 rounded-lg p-6">
                <h3 className="font-bold mb-2">Operations Management Quiz</h3>
                <p className="text-zinc-400 mb-4">8 questions</p>
                {progress.opsQuiz !== null ? (
                  <div>
                    <p className="text-2xl font-bold mb-2">{progress.opsQuiz}%</p>
                    <button onClick={() => startQuiz("operations")} className="w-full border border-zinc-600 py-2 rounded-lg">Retake</button>
                  </div>
                ) : (
                  <button onClick={() => startQuiz("operations")} className="w-full bg-blue-600 py-2 rounded-lg">Start Quiz</button>
                )}
              </div>
              <div className="bg-zinc-800 rounded-lg p-6">
                <h3 className="font-bold mb-2">Lean Process Quiz</h3>
                <p className="text-zinc-400 mb-4">10 questions</p>
                {progress.leanQuiz !== null ? (
                  <div>
                    <p className="text-2xl font-bold mb-2">{progress.leanQuiz}%</p>
                    <button onClick={() => startQuiz("lean")} className="w-full border border-zinc-600 py-2 rounded-lg">Retake</button>
                  </div>
                ) : (
                  <button onClick={() => startQuiz("lean")} className="w-full bg-blue-600 py-2 rounded-lg">Start Quiz</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
