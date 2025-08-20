import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "./ui/simple-tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Project, Task, TeamMember } from "./data/dataStore";
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Plus,
  BarChart3,
  Star,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ResourceAllocationProps {
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

const resourceData = (teamMembers: TeamMember[]) => teamMembers.map(member => ({
  name: member.name.split(' ')[0],
  allocated: member.allocated,
  capacity: member.capacity,
  utilization: Math.round((member.allocated / member.capacity) * 100)
}));

const skillsData = [
  { skill: "Frontend", count: 8, color: "#8884d8" },
  { skill: "Backend", count: 6, color: "#82ca9d" },
  { skill: "Design", count: 4, color: "#ffc658" },
  { skill: "QA", count: 3, color: "#ff7300" },
  { skill: "DevOps", count: 2, color: "#387908" }
];

export function ResourceAllocation({ 
  projects, 
  tasks, 
  teamMembers, 
  onCreateProject, 
  onCreateTask, 
  onCreateMember, 
  onViewAnalytics, 
  onViewReports,
  onNavigate 
}: ResourceAllocationProps) {
  const totalCapacity = teamMembers.reduce((sum, member) => sum + member.capacity, 0);
  const totalAllocated = teamMembers.reduce((sum, member) => sum + member.allocated, 0);
  const averageUtilization = totalCapacity > 0 ? Math.round((totalAllocated / totalCapacity) * 100) : 0;
  const overloadedMembers = teamMembers.filter(member => member.allocated > member.capacity).length;

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800";
      case "busy":
        return "bg-yellow-100 text-yellow-800";
      case "overloaded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "border-l-green-500 bg-green-50";
      case "busy":
        return "border-l-yellow-500 bg-yellow-50";
      case "overloaded":
        return "border-l-red-500 bg-red-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Hero Image */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-blue-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1650784854945-264d5b0b6b07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU1NDg2MDA2fDA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Team collaboration"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resource Allocation</h1>
              <p className="text-xl opacity-90">Monitor team capacity and workload distribution</p>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100"
              onClick={onCreateMember}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Team Member
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Team Utilization</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageUtilization}%</div>
            <p className="text-xs text-muted-foreground">
              {totalAllocated}h / {totalCapacity}h this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              Active team members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Overloaded</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overloadedMembers}</div>
            <p className="text-xs text-muted-foreground">
              Members over capacity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.length > 0 
                ? Math.round(teamMembers.reduce((sum, m) => sum + m.efficiency, 0) / teamMembers.length)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Team performance
            </p>
          </CardContent>
        </Card>
      </div>

      <SimpleTabs defaultValue="team" className="space-y-4">
        <SimpleTabsList>
          <SimpleTabsTrigger value="team">Team Overview</SimpleTabsTrigger>
          <SimpleTabsTrigger value="workload">Workload Chart</SimpleTabsTrigger>
          <SimpleTabsTrigger value="skills">Skills Matrix</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="team" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Team member allocation and availability</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCreateTask}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
              <Button onClick={onCreateMember}>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>

          {teamMembers.length === 0 ? (
            <Card className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Team Members Yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first team member to the project.
              </p>
              <Button onClick={onCreateMember}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Team Member
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className={`border-l-4 ${getPriorityColor(member.availability)} hover:shadow-lg transition-all duration-200`}>
                  <div className="relative">
                    <div className="h-24 bg-gradient-to-r from-blue-100 to-purple-100" />
                    <Avatar className="absolute -bottom-6 left-6 w-12 h-12 border-4 border-white">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <CardHeader className="pt-8 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span>{member.role}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{member.rating}</span>
                          </span>
                        </CardDescription>
                      </div>
                      <Badge className={getAvailabilityColor(member.availability)}>
                        {member.availability}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{member.location}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{member.email}</span>
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Weekly Allocation</span>
                        <span>{member.allocated}h / {member.capacity}h</span>
                      </div>
                      <Progress 
                        value={(member.allocated / member.capacity) * 100} 
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground">
                        {Math.round((member.allocated / member.capacity) * 100)}% utilized
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between text-sm pt-2 border-t">
                      <span className="text-muted-foreground">Efficiency Rate:</span>
                      <span className="font-medium text-green-600">{member.efficiency}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </SimpleTabsContent>

        <SimpleTabsContent value="workload" className="space-y-4">
          {teamMembers.length === 0 ? (
            <Card className="p-8 text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Workload Data</h3>
              <p className="text-muted-foreground mb-4">
                Add team members to see workload distribution charts.
              </p>
              <Button onClick={onCreateMember}>
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Team Workload Distribution</CardTitle>
                  <CardDescription>Weekly allocation vs capacity across team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={resourceData(teamMembers)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="capacity" fill="#e2e8f0" name="Capacity" />
                      <Bar dataKey="allocated" fill="#3b82f6" name="Allocated" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Utilization Rates</CardTitle>
                    <CardDescription>Individual team member utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {resourceData(teamMembers).map((member) => (
                        <div key={member.name} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{member.name}</span>
                            <span>{member.utilization}%</span>
                          </div>
                          <Progress value={member.utilization} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Capacity Planning</CardTitle>
                    <CardDescription>Weekly capacity overview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Total Capacity</span>
                        <p className="text-2xl font-bold">{totalCapacity}h</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Allocated</span>
                        <p className="text-2xl font-bold">{totalAllocated}h</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Available</span>
                        <p className="text-2xl font-bold">{totalCapacity - totalAllocated}h</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Utilization</span>
                        <p className="text-2xl font-bold">{averageUtilization}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </SimpleTabsContent>

        <SimpleTabsContent value="skills" className="space-y-4">
          {teamMembers.length === 0 ? (
            <Card className="p-8 text-center">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Skills Data</h3>
              <p className="text-muted-foreground mb-4">
                Add team members to see skills distribution and expertise mapping.
              </p>
              <Button onClick={onCreateMember}>
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Distribution</CardTitle>
                  <CardDescription>Team expertise across different areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={skillsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ skill, count }) => `${skill} (${count})`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {skillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills Matrix</CardTitle>
                  <CardDescription>Team member expertise mapping</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium text-sm">{member.name}</span>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 ml-11">
                          {member.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}