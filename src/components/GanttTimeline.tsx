import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "./ui/simple-tabs";
import { Progress } from "./ui/progress";
import { SimpleDropdown } from "./ui/simple-dropdown";
import { 
  Calendar, 
  Clock, 
  Users, 
  Play, 
  Pause, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter
} from "lucide-react";

const timelineData = [
  {
    id: 1,
    task: "Project Planning",
    project: "Website Redesign",
    assignee: "Sarah Chen",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    progress: 100,
    status: "completed",
    dependencies: [],
    milestone: false,
    duration: 14
  },
  {
    id: 2,
    task: "Design System",
    project: "Website Redesign",
    assignee: "Sarah Chen",
    startDate: "2024-01-16",
    endDate: "2024-02-05",
    progress: 100,
    status: "completed",
    dependencies: [1],
    milestone: false,
    duration: 20
  },
  {
    id: 3,
    task: "Frontend Development",
    project: "Website Redesign",
    assignee: "Mike Johnson",
    startDate: "2024-02-06",
    endDate: "2024-03-15",
    progress: 65,
    status: "in-progress",
    dependencies: [2],
    milestone: false,
    duration: 38
  },
  {
    id: 4,
    task: "Backend API",
    project: "Website Redesign",
    assignee: "Alex Rodriguez",
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    progress: 85,
    status: "in-progress",
    dependencies: [1],
    milestone: false,
    duration: 27
  },
  {
    id: 5,
    task: "Launch Milestone",
    project: "Website Redesign",
    assignee: "Team",
    startDate: "2024-03-15",
    endDate: "2024-03-15",
    progress: 0,
    status: "pending",
    dependencies: [3, 4],
    milestone: true,
    duration: 1
  },
  {
    id: 6,
    task: "App Architecture",
    project: "Mobile App",
    assignee: "Mike Johnson",
    startDate: "2024-01-15",
    endDate: "2024-02-01",
    progress: 100,
    status: "completed",
    dependencies: [],
    milestone: false,
    duration: 17
  },
  {
    id: 7,
    task: "UI Development",
    project: "Mobile App",
    assignee: "Emily Davis",
    startDate: "2024-02-02",
    endDate: "2024-04-15",
    progress: 30,
    status: "in-progress",
    dependencies: [6],
    milestone: false,
    duration: 72
  }
];

const milestones = [
  {
    id: 1,
    name: "Project Kickoff",
    date: "2024-01-01",
    project: "Website Redesign",
    status: "completed"
  },
  {
    id: 2,
    name: "Design Approval",
    date: "2024-02-05",
    project: "Website Redesign",
    status: "completed"
  },
  {
    id: 3,
    name: "Beta Release",
    date: "2024-03-01",
    project: "Website Redesign",
    status: "pending"
  },
  {
    id: 4,
    name: "Launch",
    date: "2024-03-15",
    project: "Website Redesign",
    status: "pending"
  }
];

export function GanttTimeline() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");

  const getMonthsInRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = [];
    const current = new Date(start.getFullYear(), start.getMonth(), 1);
    
    while (current <= end) {
      months.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }
    
    return months;
  };

  const calculatePosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const projectStart = new Date("2024-01-01");
    const projectEnd = new Date("2024-06-30");
    
    const totalDays = (projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24);
    const startDays = (start.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    
    const leftPercent = (startDays / totalDays) * 100;
    const widthPercent = (duration / totalDays) * 100;
    
    return { left: `${leftPercent}%`, width: `${widthPercent}%` };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "pending":
        return "bg-gray-400";
      case "blocked":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      "in-progress": "bg-blue-100 text-blue-800",
      blocked: "bg-red-100 text-red-800",
      pending: "bg-gray-100 text-gray-800"
    } as const;

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.pending}>
        {status.replace("-", " ")}
      </Badge>
    );
  };

  const months = getMonthsInRange("2024-01-01", "2024-06-30");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Timeline & Gantt</h1>
        <p className="text-muted-foreground">Visualize project schedules and dependencies</p>
      </div>

      <SimpleTabs defaultValue="gantt" className="space-y-4">
        <div className="flex justify-between items-center">
          <SimpleTabsList>
            <SimpleTabsTrigger value="gantt">Gantt Chart</SimpleTabsTrigger>
            <SimpleTabsTrigger value="timeline">Timeline View</SimpleTabsTrigger>
            <SimpleTabsTrigger value="milestones">Milestones</SimpleTabsTrigger>
          </SimpleTabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">Today</Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        <SimpleTabsContent value="gantt" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Gantt Chart</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                {/* Header */}
                <div className="flex mb-4">
                  <div className="w-80 flex-shrink-0 border-r pr-4">
                    <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground">
                      <span>Task</span>
                      <span>Assignee</span>
                      <span>Status</span>
                      <span>Progress</span>
                    </div>
                  </div>
                  <div className="flex-1 pl-4">
                    <div className="flex">
                      {months.map((month, index) => (
                        <div key={index} className="flex-1 text-center text-xs font-medium text-muted-foreground border-l px-2">
                          {month.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="space-y-2">
                  {timelineData.map((task) => (
                    <div key={task.id} className="flex items-center min-h-12">
                      <div className="w-80 flex-shrink-0 border-r pr-4">
                        <div className="grid grid-cols-4 gap-2 items-center">
                          <div className="flex items-center gap-2">
                            {task.milestone ? (
                              <div className="w-3 h-3 bg-yellow-500 rotate-45" />
                            ) : (
                              <div className={`w-3 h-3 rounded ${getStatusColor(task.status)}`} />
                            )}
                            <span className="text-sm font-medium truncate">{task.task}</span>
                          </div>
                          <span className="text-xs text-muted-foreground truncate">{task.assignee}</span>
                          <div>{getStatusBadge(task.status)}</div>
                          <div className="flex items-center gap-2">
                            <Progress value={task.progress} className="h-1 flex-1" />
                            <span className="text-xs text-muted-foreground">{task.progress}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 pl-4 relative h-8">
                        <div className="relative h-full">
                          {task.milestone ? (
                            <div 
                              className="absolute top-2 w-4 h-4 bg-yellow-500 rotate-45 transform -translate-x-2"
                              style={{ left: calculatePosition(task.startDate, task.endDate).left }}
                            />
                          ) : (
                            <div 
                              className={`absolute top-2 h-4 rounded ${getStatusColor(task.status)} opacity-80`}
                              style={calculatePosition(task.startDate, task.endDate)}
                            >
                              <div 
                                className={`h-full rounded ${getStatusColor(task.status)}`}
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="timeline" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>Chronological view of all tasks and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timelineData
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                    .map((task) => (
                    <div key={task.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)} mt-1`} />
                        <div className="w-px bg-border flex-1 mt-2" />
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{task.task}</h3>
                          {getStatusBadge(task.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{task.project}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{task.assignee}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={task.progress} className="h-2 flex-1" />
                          <span className="text-xs text-muted-foreground">{task.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Tasks</span>
                      <span>{timelineData.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Completed</span>
                      <span>{timelineData.filter(t => t.status === "completed").length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>In Progress</span>
                      <span>{timelineData.filter(t => t.status === "in-progress").length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pending</span>
                      <span>{timelineData.filter(t => t.status === "pending").length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Critical Path</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {timelineData
                      .filter(task => task.dependencies.length > 0 || timelineData.some(t => t.dependencies.includes(task.id)))
                      .slice(0, 4)
                      .map((task) => (
                      <div key={task.id} className="flex items-center gap-2 p-2 border rounded text-sm">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                        <span className="flex-1">{task.task}</span>
                        <span className="text-muted-foreground">{task.duration}d</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="milestones" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
                <CardDescription>Key project deliverables and checkpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-4 h-4 bg-yellow-500 rotate-45" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{milestone.name}</h3>
                          {getStatusBadge(milestone.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(milestone.date).toLocaleDateString()}</span>
                          </div>
                          <span>{milestone.project}</span>
                        </div>
                      </div>
                      <SimpleDropdown
                        trigger={
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        }
                        items={[
                          { label: "Edit Milestone", onClick: () => {} },
                          { label: "Mark Complete", onClick: () => {} },
                          { label: "Delete", onClick: () => {}, className: "text-red-600" }
                        ]}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks and milestones due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timelineData
                    .filter(task => new Date(task.endDate) > new Date())
                    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
                    .slice(0, 5)
                    .map((task) => {
                      const daysUntilDue = Math.ceil((new Date(task.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                      return (
                        <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{task.task}</h4>
                            <p className="text-xs text-muted-foreground">{task.project}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {daysUntilDue > 0 ? `${daysUntilDue} days` : 'Overdue'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(task.endDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}