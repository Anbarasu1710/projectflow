import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "./ui/simple-tabs";
import { SimpleDropdown } from "./ui/simple-dropdown";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Project, Task, TeamMember } from "./data/dataStore";
import { 
  Calendar, 
  Clock, 
  Flag, 
  MoreHorizontal, 
  Plus, 
  User,
  CheckCircle2,
  AlertCircle,
  Circle,
  Target,
  TrendingUp,
  AlertTriangle,
  Download,
  Sparkles
} from "lucide-react";

interface TaskPhaseCardsProps {
  projects: Project[];
  tasks: Task[];
  teamMembers: TeamMember[];
  onCreateProject: () => void;
  onCreateTask: () => void;
  onCreateMember: () => void;
  onImportTemplate?: () => void;
  onViewAnalytics: () => void;
  onViewReports: () => void;
  onNavigate: (view: string, id?: string) => void;
}

type TaskFilter = 'all' | 'my-tasks' | 'overdue';

const teamAvatars = {
  "Sarah Chen": "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=200",
  "Mike Johnson": "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTU1NzkwODR8MA&ixlib=rb-4.1.0&q=80&w=200",
  "Emily Davis": "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=200",
  "Alex Rodriguez": "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTU1NzkwODR8MA&ixlib=rb-4.1.0&q=80&w=200"
};

// Current user for "My Tasks" filter
const CURRENT_USER = "Sarah Chen";

export function TaskPhaseCards({ 
  projects, 
  tasks, 
  teamMembers, 
  onCreateProject, 
  onCreateTask, 
  onCreateMember,
  onImportTemplate,
  onViewAnalytics, 
  onViewReports,
  onNavigate 
}: TaskPhaseCardsProps) {
  const [activeTab, setActiveTab] = useState("tasks");
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all');

  // Use the real tasks from props, but fallback to mock data if empty for demo purposes
  const displayTasks = tasks.length > 0 ? tasks : [
    {
      id: "1",
      title: "Design System Setup",
      description: "Create a comprehensive design system with components and guidelines for consistent UI across all platforms",
      status: "completed" as const,
      priority: "high" as const,
      progress: 100,
      assignee: "Sarah Chen",
      dueDate: new Date("2024-01-15"), // Past date to show as overdue (completed)
      phase: "Design",
      projectId: "1",
      timeSpent: "24h",
      estimatedTime: "20h",
      tags: ["Design", "Components", "Guidelines"],
      startDate: new Date("2024-02-01"),
      createdAt: new Date(),
      updatedAt: new Date(),
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
      description: "Implement secure user login and registration system with OAuth integration",
      status: "in-progress" as const,
      priority: "high" as const,
      progress: 65,
      assignee: "Mike Johnson",
      dueDate: new Date("2024-12-15"), // Past date to show as overdue
      phase: "Development",
      projectId: "2",
      timeSpent: "18h",
      estimatedTime: "28h",
      tags: ["Backend", "Security", "OAuth"],
      startDate: new Date("2024-02-01"),
      createdAt: new Date(),
      updatedAt: new Date(),
      subtasks: [
        { id: "1", title: "Login form", completed: true },
        { id: "2", title: "Registration form", completed: true },
        { id: "3", title: "Password reset", completed: false },
        { id: "4", title: "Two-factor authentication", completed: false },
        { id: "5", title: "OAuth integration", completed: false }
      ]
    },
    {
      id: "3",
      title: "Content Strategy",
      description: "Develop comprehensive content strategy and create initial content pieces for launch",
      status: "pending" as const,
      priority: "medium" as const,
      progress: 0,
      assignee: "Emily Davis",
      dueDate: new Date("2024-12-10"), // Past date to show as overdue
      phase: "Planning",
      projectId: "3",
      timeSpent: "0h",
      estimatedTime: "16h",
      tags: ["Content", "Strategy", "Marketing"],
      startDate: new Date("2024-02-01"),
      createdAt: new Date(),
      updatedAt: new Date(),
      subtasks: [
        { id: "1", title: "Content audit", completed: false },
        { id: "2", title: "Content calendar", completed: false },
        { id: "3", title: "Blog posts creation", completed: false },
        { id: "4", title: "Social media content", completed: false }
      ]
    },
    {
      id: "4",
      title: "API Integration",
      description: "Integrate third-party APIs for payment processing and external service connections",
      status: "blocked" as const,
      priority: "critical" as const,
      progress: 30,
      assignee: "Alex Rodriguez",
      dueDate: new Date("2025-02-25"), // Future date
      phase: "Development",
      projectId: "1",
      timeSpent: "12h",
      estimatedTime: "32h",
      tags: ["API", "Integration", "Payments"],
      startDate: new Date("2024-02-01"),
      createdAt: new Date(),
      updatedAt: new Date(),
      subtasks: [
        { id: "1", title: "Payment gateway setup", completed: true },
        { id: "2", title: "API authentication", completed: false },
        { id: "3", title: "Error handling", completed: false },
        { id: "4", title: "Testing", completed: false }
      ]
    },
    {
      id: "5",
      title: "Mobile App Design",
      description: "Design mobile application interface and user experience flows",
      status: "in-progress" as const,
      priority: "medium" as const,
      progress: 45,
      assignee: "Sarah Chen",
      dueDate: new Date("2025-03-01"), // Future date
      phase: "Design",
      projectId: "2",
      timeSpent: "15h",
      estimatedTime: "25h",
      tags: ["Mobile", "UI/UX", "Design"],
      startDate: new Date("2024-02-01"),
      createdAt: new Date(),
      updatedAt: new Date(),
      subtasks: [
        { id: "1", title: "Wireframes", completed: true },
        { id: "2", title: "High-fidelity designs", completed: false },
        { id: "3", title: "Prototyping", completed: false }
      ]
    },
    {
      id: "6",
      title: "Database Migration",
      description: "Migrate legacy database to new cloud infrastructure",
      status: "pending" as const,
      priority: "high" as const,
      progress: 0,
      assignee: "Sarah Chen",
      dueDate: new Date("2024-12-20"), // Past date to show as overdue
      phase: "Development",
      projectId: "1",
      timeSpent: "0h",
      estimatedTime: "40h",
      tags: ["Database", "Migration", "Cloud"],
      startDate: new Date("2024-02-01"),
      createdAt: new Date(),
      updatedAt: new Date(),
      subtasks: [
        { id: "1", title: "Data backup", completed: false },
        { id: "2", title: "Schema migration", completed: false },
        { id: "3", title: "Testing", completed: false }
      ]
    }
  ];

  // Helper function to check if a task is overdue
  const isTaskOverdue = (task: Task) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate < today && task.status !== 'completed';
  };

  // Filter tasks based on the active filter
  const getFilteredTasks = () => {
    switch (taskFilter) {
      case 'my-tasks':
        return displayTasks.filter(task => task.assignee === CURRENT_USER);
      case 'overdue':
        return displayTasks.filter(task => isTaskOverdue(task));
      default:
        return displayTasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  const phases = [
    { 
      name: "Planning", 
      tasks: filteredTasks.filter(t => t.phase === "Planning"), 
      color: "bg-blue-500",
      description: "Project planning and research phase"
    },
    { 
      name: "Design", 
      tasks: filteredTasks.filter(t => t.phase === "Design"), 
      color: "bg-purple-500",
      description: "UI/UX design and prototyping"
    },
    { 
      name: "Development", 
      tasks: filteredTasks.filter(t => t.phase === "Development"), 
      color: "bg-green-500",
      description: "Coding and implementation"
    },
    { 
      name: "Testing", 
      tasks: filteredTasks.filter(t => t.phase === "Testing"), 
      color: "bg-orange-500",
      description: "Quality assurance and testing"
    },
    { 
      name: "Deployment", 
      tasks: filteredTasks.filter(t => t.phase === "Deployment"), 
      color: "bg-red-500",
      description: "Launch and deployment"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "blocked":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800 border-green-200",
      "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
      blocked: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-gray-100 text-gray-800 border-gray-200"
    } as const;

    return (
      <Badge className={`${variants[status as keyof typeof variants] || variants.pending} border`}>
        {status.replace("-", " ")}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border-l-red-500 bg-red-50";
      case "high":
        return "border-l-orange-500 bg-orange-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      default:
        return "border-l-green-500 bg-green-50";
    }
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || "Unknown Project";
  };

  // Get overdue count for badge display
  const overdueCount = displayTasks.filter(task => isTaskOverdue(task)).length;
  const myTasksCount = displayTasks.filter(task => task.assignee === CURRENT_USER).length;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1629787155650-9ce3697dcb38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwb2ZmaWNlJTIwZW52aXJvbm1lbnR8ZW58MXx8fHwxNzU1NTExODQ0fDA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Team working"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tasks & Phases</h1>
              <p className="text-xl opacity-90">Manage project tasks and track phase progress</p>
            </div>
            <div className="flex gap-3">
              {onImportTemplate && (
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  onClick={onImportTemplate}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Import Template
                </Button>
              )}
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={onCreateTask}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Task
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex justify-between items-center">
          <SimpleTabsList>
            <SimpleTabsTrigger value="tasks">Task Cards</SimpleTabsTrigger>
            <SimpleTabsTrigger value="phases">Phase Overview</SimpleTabsTrigger>
          </SimpleTabsList>
        </div>

        <SimpleTabsContent value="tasks" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className={taskFilter === 'all' ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
                variant={taskFilter === 'all' ? "default" : "outline"}
                onClick={() => setTaskFilter('all')}
              >
                All Tasks
                <Badge className="ml-2 bg-white/20 text-white">{displayTasks.length}</Badge>
              </Button>
              <Button 
                size="sm"
                variant={taskFilter === 'my-tasks' ? "default" : "outline"}
                className={taskFilter === 'my-tasks' ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
                onClick={() => setTaskFilter('my-tasks')}
              >
                My Tasks
                <Badge className={`ml-2 ${taskFilter === 'my-tasks' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'}`}>
                  {myTasksCount}
                </Badge>
              </Button>
              <Button 
                size="sm"
                variant={taskFilter === 'overdue' ? "default" : "outline"}
                className={taskFilter === 'overdue' ? "bg-gradient-to-r from-red-600 to-orange-600" : overdueCount > 0 ? "border-red-200 text-red-700 hover:bg-red-50" : ""}
                onClick={() => setTaskFilter('overdue')}
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Overdue
                <Badge className={`ml-2 ${taskFilter === 'overdue' ? 'bg-white/20 text-white' : overdueCount > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                  {overdueCount}
                </Badge>
              </Button>
            </div>
            <div className="flex gap-2">
              {onImportTemplate && (
                <Button 
                  variant="outline" 
                  className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                  onClick={onImportTemplate}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Import Template
                </Button>
              )}
              <Button className="bg-gradient-to-r from-green-600 to-blue-600" onClick={onCreateTask}>
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <Card className="p-8 text-center">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {taskFilter === 'overdue' ? 'No Overdue Tasks' : 
                 taskFilter === 'my-tasks' ? 'No Tasks Assigned to You' : 
                 'No Tasks Yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {taskFilter === 'overdue' ? 'Great job! All your tasks are on track.' :
                 taskFilter === 'my-tasks' ? 'You don\'t have any tasks assigned yet.' :
                 'Get started by creating your first task or importing from a template.'}
              </p>
              <div className="flex gap-3 justify-center">
                {taskFilter === 'all' && (
                  <>
                    <Button onClick={onCreateTask}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Task
                    </Button>
                    {onImportTemplate && (
                      <Button variant="outline" onClick={onImportTemplate}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Browse Templates
                      </Button>
                    )}
                  </>
                )}
                {taskFilter !== 'all' && (
                  <Button variant="outline" onClick={() => setTaskFilter('all')}>
                    View All Tasks
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredTasks.map((task) => {
                const isOverdue = isTaskOverdue(task);
                
                return (
                  <Card key={task.id} className={`border-l-4 ${getPriorityColor(task.priority)} hover:shadow-lg transition-all duration-200 flex flex-col ${isOverdue ? 'ring-1 ring-red-200' : ''}`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {getStatusIcon(task.status)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg truncate">{task.title}</CardTitle>
                              {isOverdue && (
                                <Badge className="bg-red-100 text-red-800 border-red-200 text-xs flex-shrink-0">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Overdue
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {getProjectName(task.projectId)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {task.phase}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <SimpleDropdown
                          trigger={
                            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          }
                          items={[
                            { label: "Edit Task", onClick: () => {} },
                            { label: "Duplicate", onClick: () => {} },
                            { label: "Move to Phase", onClick: () => {} },
                            { label: "Delete", onClick: () => {}, className: "text-red-600" }
                          ]}
                        />
                      </div>
                      <CardDescription className="mt-2">{task.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(task.status)}
                          <Badge variant="outline" className="text-xs">
                            <Flag className="h-3 w-3 mr-1" />
                            {task.priority}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            Progress
                          </span>
                          <span className="font-medium">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7 flex-shrink-0">
                            <AvatarImage src={teamAvatars[task.assignee as keyof typeof teamAvatars]} />
                            <AvatarFallback className="text-xs">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{task.assignee}</p>
                            <p className="text-xs text-muted-foreground">Assignee</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm truncate ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
                              {task.dueDate.toLocaleDateString()}
                            </p>
                            <p className="text-xs">Due date</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{task.timeSpent} / {task.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{task.subtasks?.filter(st => st.completed).length || 0} / {task.subtasks?.length || 0} subtasks</span>
                        </div>
                      </div>

                      {task.subtasks && task.subtasks.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Subtasks:</p>
                          <div className="space-y-1">
                            {task.subtasks.slice(0, 3).map((subtask) => (
                              <div key={subtask.id} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                                {subtask.completed ? (
                                  <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                                ) : (
                                  <Circle className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                )}
                                <span className={`flex-1 min-w-0 ${subtask.completed ? "line-through text-muted-foreground" : ""}`}>
                                  {subtask.title}
                                </span>
                              </div>
                            ))}
                            {task.subtasks.length > 3 && (
                              <p className="text-xs text-muted-foreground pl-5">
                                +{task.subtasks.length - 3} more subtasks
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 pt-2 border-t">
                        {task.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </SimpleTabsContent>

        <SimpleTabsContent value="phases" className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Track progress across different project phases
              {taskFilter !== 'all' && (
                <span className="ml-2">
                  (Filtered: {taskFilter === 'my-tasks' ? 'My Tasks' : 'Overdue Tasks'})
                </span>
              )}
            </p>
            <div className="flex gap-2">
              {onImportTemplate && (
                <Button variant="outline" onClick={onImportTemplate}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Import Template
                </Button>
              )}
              <Button variant="outline" onClick={onCreateTask}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600" onClick={onCreateTask}>
                <Plus className="h-4 w-4 mr-2" />
                New Phase
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
            {phases.map((phase) => (
              <Card key={phase.name} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 rounded-full ${phase.color} flex-shrink-0`} />
                    <CardTitle className="text-lg">{phase.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {phase.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 flex-shrink-0" />
                    <span>{phase.tasks.length} {phase.tasks.length === 1 ? 'task' : 'tasks'}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 flex-1">
                  {phase.tasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Circle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No tasks in this phase</p>
                      <div className="flex gap-1 justify-center mt-3">
                        <Button variant="outline" size="sm" onClick={onCreateTask}>
                          <Plus className="h-3 w-3 mr-1" />
                          Add Task
                        </Button>
                        {onImportTemplate && (
                          <Button variant="outline" size="sm" onClick={onImportTemplate}>
                            <Sparkles className="h-3 w-3 mr-1" />
                            Import
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {phase.tasks.map((task) => {
                        const isOverdue = isTaskOverdue(task);
                        
                        return (
                          <div key={task.id} className={`p-3 border rounded-lg space-y-3 hover:bg-gray-50 transition-colors ${isOverdue ? 'border-red-200 bg-red-50/30' : ''}`}>
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-sm leading-tight flex-1 min-w-0 pr-2">{task.title}</h4>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {isOverdue && (
                                  <AlertTriangle className="h-3 w-3 text-red-500" />
                                )}
                                {getStatusIcon(task.status)}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6 flex-shrink-0">
                                <AvatarImage src={teamAvatars[task.assignee as keyof typeof teamAvatars]} />
                                <AvatarFallback className="text-xs">
                                  {task.assignee.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground flex-1 min-w-0 truncate">{task.assignee}</span>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-1" />
                            </div>

                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span className={`flex-1 min-w-0 truncate ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
                                Due: {task.dueDate.toLocaleDateString()}
                              </span>
                              <Badge variant="outline" className="text-xs flex-shrink-0 ml-2">
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}