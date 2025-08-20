import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { AlertTriangle } from "lucide-react";

interface RiskAnalysisTabProps {
  riskData: Array<{
    category: string;
    projects: number;
    severity: string;
  }>;
  getSeverityColor: (severity: string) => string;
}

export function RiskAnalysisTab({ riskData, getSeverityColor }: RiskAnalysisTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Current project risks and their severity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskData.map((risk) => (
                <div key={risk.category} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`h-5 w-5 ${
                      risk.severity === "high" ? "text-red-500" :
                      risk.severity === "medium" ? "text-yellow-500" :
                      "text-green-500"
                    }`} />
                    <div>
                      <h3 className="font-medium">{risk.category}</h3>
                      <p className="text-sm text-muted-foreground">{risk.projects} projects affected</p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(risk.severity)}>
                    {risk.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Mitigation</CardTitle>
            <CardDescription>Action items and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg bg-red-50">
                <h4 className="font-medium text-red-800">High Priority Actions</h4>
                <ul className="text-sm text-red-700 mt-2 space-y-1">
                  <li>• Review budget allocation for overrun projects</li>
                  <li>• Reassign resources to resolve conflicts</li>
                  <li>• Implement scope change control process</li>
                </ul>
              </div>
              
              <div className="p-3 border rounded-lg bg-yellow-50">
                <h4 className="font-medium text-yellow-800">Medium Priority Actions</h4>
                <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                  <li>• Update project timelines</li>
                  <li>• Improve stakeholder communication</li>
                  <li>• Review resource allocation efficiency</li>
                </ul>
              </div>

              <div className="p-3 border rounded-lg bg-green-50">
                <h4 className="font-medium text-green-800">Preventive Measures</h4>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>• Regular project health checks</li>
                  <li>• Enhanced monitoring dashboards</li>
                  <li>• Team training programs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Trend Analysis</CardTitle>
          <CardDescription>Historical risk patterns and forecasting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">15</div>
              <div className="text-sm text-muted-foreground">Total Risks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <div className="text-sm text-muted-foreground">Medium Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-muted-foreground">Mitigated</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}