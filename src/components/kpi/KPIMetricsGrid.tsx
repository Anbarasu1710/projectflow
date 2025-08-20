import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPIMetricsGridProps {
  kpiData: Array<{
    title: string;
    value: number;
    target: number;
    trend: number;
    period: string;
    icon: any;
    color: string;
  }>;
}

export function KPIMetricsGrid({ kpiData }: KPIMetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon;
        const isPositiveTrend = kpi.trend > 0;
        const achievesTarget = kpi.value >= kpi.target;
        
        return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{kpi.title}</CardTitle>
              <Icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{kpi.value}%</span>
                  <span className="text-sm text-muted-foreground">/ {kpi.target}%</span>
                </div>
                
                <div className="space-y-1">
                  <Progress value={(kpi.value / kpi.target) * 100} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{kpi.period}</span>
                    <span className={achievesTarget ? "text-green-600" : "text-red-600"}>
                      {achievesTarget ? "On Target" : "Below Target"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  {isPositiveTrend ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={isPositiveTrend ? "text-green-600" : "text-red-600"}>
                    {isPositiveTrend ? "+" : ""}{kpi.trend}%
                  </span>
                  <span className="text-muted-foreground">vs last period</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}