import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { TrendingUp, BarChart3, CheckCircle } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";
import { calculateAverageEfficiency, calculateTotalProjects, calculateAverageOnTime } from "../utils/kpiUtils";

interface TeamAnalyticsTabProps {
  teamPerformance: Array<{
    name: string;
    efficiency: number;
    projects: number;
    onTime: number;
  }>;
}

export function TeamAnalyticsTab({ teamPerformance }: TeamAnalyticsTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Individual team member metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member) => (
                <div key={member.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{member.name}</span>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{member.projects} projects</span>
                      <span>{member.onTime}% on-time</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Efficiency</span>
                      <span>{member.efficiency}%</span>
                    </div>
                    <Progress value={member.efficiency} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Efficiency Distribution</CardTitle>
            <CardDescription>Team efficiency visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={teamPerformance}>
                <RadialBar dataKey="efficiency" cornerRadius={10} fill="#8884d8" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg Team Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calculateAverageEfficiency(teamPerformance)}%
            </div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calculateTotalProjects(teamPerformance)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {teamPerformance.length} team members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calculateAverageOnTime(teamPerformance)}%
            </div>
            <p className="text-xs text-muted-foreground">
              On-time delivery rate
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}