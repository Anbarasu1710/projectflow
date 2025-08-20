import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from "recharts";

interface PerformanceTabProps {
  performanceData: any[];
  satisfactionData: any[];
}

export function PerformanceTab({ performanceData, satisfactionData }: PerformanceTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Trends</CardTitle>
            <CardDescription>Track key metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="budget" stroke="#8884d8" name="Budget Efficiency %" strokeWidth={2} />
                <Line type="monotone" dataKey="onTime" stroke="#82ca9d" name="On-Time Delivery %" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Completion Rate</CardTitle>
            <CardDescription>Monthly project delivery performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projects" fill="#e2e8f0" name="Total Projects" />
                <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Satisfaction Scores</CardTitle>
          <CardDescription>Quarterly satisfaction ratings across stakeholder groups</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={satisfactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis domain={[3.5, 5]} />
              <Tooltip formatter={(value: number) => [`${value}/5`, ""]} />
              <Area type="monotone" dataKey="client" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name="Client Satisfaction" />
              <Area type="monotone" dataKey="internal" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} name="Team Satisfaction" />
              <Area type="monotone" dataKey="stakeholder" stackId="3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} name="Stakeholder Satisfaction" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}