import { 
  Target, 
  DollarSign, 
  Users, 
  Clock 
} from "lucide-react";

export const kpiMetrics = [
  {
    title: "Project Completion Rate",
    value: 85,
    target: 90,
    trend: 5.2,
    period: "This Quarter",
    icon: Target,
    color: "text-green-600"
  },
  {
    title: "Budget Efficiency",
    value: 92,
    target: 95,
    trend: -2.1,
    period: "This Month",
    icon: DollarSign,
    color: "text-blue-600"
  },
  {
    title: "Team Productivity",
    value: 78,
    target: 80,
    trend: 8.5,
    period: "This Week",
    icon: Users,
    color: "text-purple-600"
  },
  {
    title: "On-Time Delivery",
    value: 88,
    target: 95,
    trend: 3.2,
    period: "Last 30 Days",
    icon: Clock,
    color: "text-orange-600"
  }
];

export const performanceData = [
  { month: "Jan", projects: 12, completed: 10, budget: 95, onTime: 83 },
  { month: "Feb", projects: 15, completed: 13, budget: 88, onTime: 87 },
  { month: "Mar", projects: 18, completed: 16, budget: 92, onTime: 89 },
  { month: "Apr", projects: 14, completed: 12, budget: 96, onTime: 86 },
  { month: "May", projects: 16, completed: 14, budget: 91, onTime: 88 },
  { month: "Jun", projects: 20, completed: 17, budget: 94, onTime: 90 }
];

export const teamPerformance = [
  { name: "Sarah Chen", efficiency: 95, projects: 8, onTime: 100 },
  { name: "Mike Johnson", efficiency: 88, projects: 12, onTime: 92 },
  { name: "Emily Davis", efficiency: 92, projects: 6, onTime: 83 },
  { name: "Alex Rodriguez", efficiency: 97, projects: 10, onTime: 90 },
  { name: "Lisa Wang", efficiency: 89, projects: 7, onTime: 86 }
];

export const projectTypeData = [
  { type: "Web Development", count: 15, budget: 580000, color: "#8884d8" },
  { type: "Mobile Apps", count: 8, budget: 420000, color: "#82ca9d" },
  { type: "Marketing", count: 12, budget: 180000, color: "#ffc658" },
  { type: "Infrastructure", count: 5, budget: 320000, color: "#ff7300" },
  { type: "Research", count: 3, budget: 150000, color: "#387908" }
];

export const riskData = [
  { category: "Budget Overrun", projects: 3, severity: "high" },
  { category: "Timeline Delays", projects: 5, severity: "medium" },
  { category: "Resource Conflicts", projects: 2, severity: "high" },
  { category: "Scope Creep", projects: 4, severity: "medium" },
  { category: "Technical Issues", projects: 1, severity: "low" }
];

export const satisfactionData = [
  { quarter: "Q1", internal: 4.2, client: 4.5, stakeholder: 4.1 },
  { quarter: "Q2", internal: 4.3, client: 4.4, stakeholder: 4.3 },
  { quarter: "Q3", internal: 4.5, client: 4.6, stakeholder: 4.4 },
  { quarter: "Q4", internal: 4.4, client: 4.7, stakeholder: 4.5 }
];