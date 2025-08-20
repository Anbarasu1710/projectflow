import { useState } from "react";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "planning" | "active" | "completed" | "on-hold";
  progress: number;
  budget: number;
  spent: number;
  startDate: Date;
  endDate: Date;
  teamMembers: string[];
  createdAt: Date;
  updatedAt: Date;
  image?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  priority: "low" | "medium" | "high" | "critical";
  progress: number;
  assignee: string;
  projectId: string;
  phase: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  timeSpent: number;
  estimatedTime: number;
  tags: string[];
  subtasks: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  skills: string[];
  capacity: number;
  allocated: number;
  efficiency: number;
  location: string;
  rating: number;
  availability: "available" | "busy" | "overloaded";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Initial mock data
export const initialProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design and improved UX",
    category: "development",
    priority: "high",
    status: "active",
    progress: 68,
    budget: 50000,
    spent: 32000,
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-03-15"),
    teamMembers: ["Sarah Chen", "Mike Johnson", "Emily Davis"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-02-15"),
    image: "https://images.unsplash.com/photo-1637073849640-b283dcd9a111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1NTc5MDgxfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Cross-platform mobile application for iOS and Android",
    category: "development",
    priority: "high",
    status: "active",
    progress: 35,
    budget: 120000,
    spent: 28000,
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-06-30"),
    teamMembers: ["Mike Johnson", "Alex Rodriguez", "Lisa Wang"],
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-02-15"),
    image: "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwd29ya3NwYWNlJTIwbGFwdG9wfGVufDF8fHx8MTc1NTQ2MDg3OXww&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Q1 digital marketing campaign across all channels",
    category: "marketing",
    priority: "medium",
    status: "active",
    progress: 85,
    budget: 25000,
    spent: 22500,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-02-29"),
    teamMembers: ["Emily Davis", "Sarah Chen"],
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2024-02-15"),
    image: "https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN1Y2Nlc3MlMjBncm93dGglMjBjaGFydHxlbnwxfHx8fDE3NTU1NTQ2MTN8MA&ixlib=rb-4.1.0&q=80&w=400"
  }
];

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design System Setup",
    description: "Create a comprehensive design system with components and guidelines",
    status: "completed",
    priority: "high",
    progress: 100,
    assignee: "Sarah Chen",
    projectId: "1",
    phase: "Design",
    dueDate: new Date("2024-02-20"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-02-18"),
    timeSpent: 24,
    estimatedTime: 20,
    tags: ["Design", "Components", "Guidelines"],
    subtasks: [
      { id: "1", title: "Color palette definition", completed: true },
      { id: "2", title: "Typography system", completed: true },
      { id: "3", title: "Component library", completed: true },
      { id: "4", title: "Documentation", completed: true }
    ]
  },
  {
    id: "2",
    title: "User Authentication",
    description: "Implement secure user login and registration system",
    status: "in-progress",
    priority: "high",
    progress: 65,
    assignee: "Mike Johnson",
    projectId: "2",
    phase: "Development",
    dueDate: new Date("2024-02-28"),
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-15"),
    timeSpent: 18,
    estimatedTime: 28,
    tags: ["Backend", "Security", "OAuth"],
    subtasks: [
      { id: "1", title: "Login form", completed: true },
      { id: "2", title: "Registration form", completed: true },
      { id: "3", title: "Password reset", completed: false },
      { id: "4", title: "Two-factor authentication", completed: false },
      { id: "5", title: "OAuth integration", completed: false }
    ]
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=400",
    skills: ["Design", "Prototyping", "User Research"],
    capacity: 40,
    allocated: 35,
    efficiency: 95,
    location: "San Francisco, CA",
    rating: 4.9,
    availability: "available"
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Full Stack Developer",
    avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTU1NzkwODR8MA&ixlib=rb-4.1.0&q=80&w=400",
    skills: ["React", "Node.js", "Database Design"],
    capacity: 40,
    allocated: 42,
    efficiency: 88,
    location: "Austin, TX",
    rating: 4.7,
    availability: "overloaded"
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Content Strategist",
    avatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=400",
    skills: ["Content Writing", "SEO", "Strategy"],
    capacity: 40,
    allocated: 28,
    efficiency: 92,
    location: "New York, NY",
    rating: 4.8,
    availability: "available"
  }
];

export const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Project Deadline Approaching",
    message: "Website Redesign project deadline is in 3 days",
    type: "warning",
    read: false,
    createdAt: new Date("2024-02-16"),
    actionUrl: "/projects/1"
  },
  {
    id: "2", 
    title: "New Task Assigned",
    message: "You have been assigned to User Authentication task",
    type: "info",
    read: false,
    createdAt: new Date("2024-02-15"),
    actionUrl: "/tasks/2"
  },
  {
    id: "3",
    title: "Budget Alert",
    message: "Marketing Campaign is approaching budget limit",
    type: "warning",
    read: true,
    createdAt: new Date("2024-02-14"),
    actionUrl: "/budget"
  }
];