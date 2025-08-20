import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Project, Task, TeamMember } from "./data/dataStore";
import { 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  Plus,
  ArrowRight,
  Target,
  Briefcase,
  BarChart3
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ProjectOverviewProps {
  projects: Project[];
  tasks: Task[];
  teamMembers: TeamMember[];
  onCreateProject: () => void;
  onCreateTask: () => void;
  onCreateMember: () => void;
  onViewAnalytics: () => void;
  onViewReports: () => void;
  onNavigate: (view: string, id?: string) => void;
}

const recentActivity = [
  {
    id: 1,
    user: "Sarah Chen",
    action: "completed",
    target: "Design System Setup",
    time: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=200"
  },
  {
    id: 2,
    user: "Mike Johnson",
    action: "updated",
    target: "API Development progress to 85%",
    time: "4 hours ago",
    avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTU1NzkwODR8MA&ixlib=rb-4.1.0&q=80&w=200"
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "created",
    target: "Content Strategy milestone",
    time: "6 hours ago",
    avatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=200"
  },
  {
    id: 4,
    user: "Alex Rodriguez",
    action: "commented on",
    target: "Infrastructure Upgrade",
    time: "1 day ago",
    avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTU1NzkwODR8MA&ixlib=rb-4.1.0&q=80&w=200"
  }
];

const progressData = [
  { month: "Jan", completed: 12, planned: 15 },
  { month: "Feb", completed: 18, planned: 20 },
  { month: "Mar", completed: 25, planned: 28 },
  { month: "Apr", completed: 0, planned: 35 },
  { month: "May", completed: 0, planned: 42 },
  { month: "Jun", completed: 0, planned: 50 }
];

export function ProjectOverview({ 
  projects, 
  tasks, 
  teamMembers, 
  onCreateProject, 
  onCreateTask, 
  onCreateMember,
  onViewAnalytics, 
  onViewReports,
  onNavigate 
}: ProjectOverviewProps) {
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const averageProgress = projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0;

  const budgetData = [
    { name: "Development", value: 170000, color: "#8884d8" },
    { name: "Design", value: 30000, color: "#82ca9d" },
    { name: "Marketing", value: 25000, color: "#ffc658" },
    { name: "Operations", value: 75000, color: "#ff7300" }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1629787177096-9fbe3e2ef6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Team collaboration"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative px-8 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Welcome back to ProjectFlow</h1>
            <p className="text-xl mb-6 opacity-90">
              Manage your projects efficiently and track progress across your organization
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={onCreateProject}
              >
                <Plus className="w-5 h-5 mr-2" />
                Start New Project
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-[rgba(0,0,0,1)] hover:bg-white/10"
                onClick={onViewAnalytics}
              >
                View Analytics
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-[rgba(3,0,0,1)] hover:bg-white/10"
                onClick={onCreateTask}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600 font-medium">{totalProjects}</span> total projects
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">{completedTasks}/{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">{totalTasks > 0 ? Math.round((completedTasks/totalTasks)*100) : 0}%</span> completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600 font-medium">95%</span> utilization
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">${totalBudget > 0 ? (totalBudget/1000).toFixed(0) : 0}k</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">{totalBudget > 0 ? Math.round(((totalBudget - totalSpent)/totalBudget)*100) : 0}%</span> remaining
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Active Projects</h2>
            <Button variant="outline" size="sm" onClick={() => onNavigate("overview")}>
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {projects.length === 0 ? (
            <Card className="p-8 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first project.
              </p>
              <Button onClick={onCreateProject}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Project
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <div className="flex-shrink-0 w-32 h-32">
                      <ImageWithFallback
                        src={project.image || "https://images.unsplash.com/photo-1637073849640-b283dcd9a111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1NTc5MDgxfDA&ixlib=rb-4.1.0&q=80&w=400"}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        <Badge className={
                          project.priority === "high" ? "bg-red-100 text-red-800" : 
                          project.priority === "medium" ? "bg-yellow-100 text-yellow-800" : 
                          "bg-green-100 text-green-800"
                        }>
                          {project.priority}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          <span>{project.progress}% Complete</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{project.endDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{project.teamMembers.length} Members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span>${(project.spent/1000).toFixed(0)}k / ${(project.budget/1000).toFixed(0)}k</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback>
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>{' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progress Chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Progress Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="planned" stackId="1" stroke="#e2e8f0" fill="#e2e8f0" />
                    <Area type="monotone" dataKey="completed" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Budget Breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Budget Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} $${(value/1000).toFixed(0)}k`}
                      outerRadius={65}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={onCreateProject}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Project
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={onCreateTask}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Add New Task
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={onCreateMember}>
                <Users className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={onViewReports}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Section */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZCUyMGNoYXJ0c3xlbnwxfHx8fDE3NTU1NzkwODB8MA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Analytics dashboard"
          className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-20"
        />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Project Analytics</CardTitle>
              <CardDescription className="text-lg mt-2">
                Get insights into your project performance and team productivity
              </CardDescription>
            </div>
            <Button className="relative" onClick={onViewAnalytics}>
              <ArrowUpRight className="w-4 h-4 mr-2" />
              View Full Dashboard
            </Button>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{averageProgress}%</div>
              <p className="text-sm text-muted-foreground">Average Progress</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">94%</div>
              <p className="text-sm text-muted-foreground">On-Time Delivery</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">${totalBudget > 0 ? (totalBudget/1000000).toFixed(1) : 0}M</div>
              <p className="text-sm text-muted-foreground">Total Value Managed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}