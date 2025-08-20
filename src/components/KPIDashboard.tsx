import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "./ui/simple-tabs";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Download,
  Filter,
  CheckCircle,
  BarChart3
} from "lucide-react";
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
  PieChart, 
  Pie, 
  Cell,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area
} from "recharts";
import { 
  kpiMetrics, 
  performanceData, 
  teamPerformance, 
  projectTypeData, 
  riskData, 
  satisfactionData 
} from "./data/kpiData";
import { 
  getSeverityColor, 
  calculateAverageEfficiency, 
  calculateTotalProjects, 
  calculateAverageOnTime 
} from "./utils/kpiUtils";
import { KPIMetricsGrid } from "./kpi/KPIMetricsGrid";
import { PerformanceTab } from "./kpi/PerformanceTab";
import { TeamAnalyticsTab } from "./kpi/TeamAnalyticsTab";
import { ProjectInsightsTab } from "./kpi/ProjectInsightsTab";
import { RiskAnalysisTab } from "./kpi/RiskAnalysisTab";

export function KPIDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">KPI Dashboard & Reports</h1>
        <p className="text-muted-foreground">Monitor key performance indicators and generate insights</p>
      </div>

      <KPIMetricsGrid kpiData={kpiMetrics} />

      <SimpleTabs defaultValue="performance" className="space-y-4">
        <div className="flex justify-between items-center">
          <SimpleTabsList>
            <SimpleTabsTrigger value="performance">Performance</SimpleTabsTrigger>
            <SimpleTabsTrigger value="team">Team Analytics</SimpleTabsTrigger>
            <SimpleTabsTrigger value="projects">Project Insights</SimpleTabsTrigger>
            <SimpleTabsTrigger value="risks">Risk Analysis</SimpleTabsTrigger>
          </SimpleTabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <SimpleTabsContent value="performance">
          <PerformanceTab 
            performanceData={performanceData}
            satisfactionData={satisfactionData}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="team">
          <TeamAnalyticsTab 
            teamPerformance={teamPerformance}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="projects">
          <ProjectInsightsTab 
            projectTypeData={projectTypeData}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="risks">
          <RiskAnalysisTab 
            riskData={riskData}
            getSeverityColor={getSeverityColor}
          />
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}