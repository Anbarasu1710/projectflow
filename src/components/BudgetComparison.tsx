import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "./ui/simple-tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar,
  Download,
  Filter
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
  Area,
  AreaChart
} from "recharts";

const budgetData = [
  {
    project: "Website Redesign",
    budgeted: 50000,
    actual: 32000,
    remaining: 18000,
    status: "on-track",
    progress: 65,
    category: "Development",
    timeline: [
      { month: "Jan", budgeted: 10000, actual: 8500 },
      { month: "Feb", budgeted: 20000, actual: 18000 },
      { month: "Mar", budgeted: 35000, actual: 32000 }
    ]
  },
  {
    project: "Mobile App Development",
    budgeted: 120000,
    actual: 18000,
    remaining: 102000,
    status: "under-budget",
    progress: 15,
    category: "Development",
    timeline: [
      { month: "Jan", budgeted: 15000, actual: 12000 },
      { month: "Feb", budgeted: 25000, actual: 18000 },
      { month: "Mar", budgeted: 40000, actual: 18000 }
    ]
  },
  {
    project: "Marketing Campaign",
    budgeted: 25000,
    actual: 22500,
    remaining: 2500,
    status: "over-budget",
    progress: 90,
    category: "Marketing",
    timeline: [
      { month: "Jan", budgeted: 8000, actual: 9000 },
      { month: "Feb", budgeted: 15000, actual: 16500 },
      { month: "Mar", budgeted: 23000, actual: 22500 }
    ]
  },
  {
    project: "Infrastructure Upgrade",
    budgeted: 75000,
    actual: 68000,
    remaining: 7000,
    status: "on-track",
    progress: 85,
    category: "Operations",
    timeline: [
      { month: "Jan", budgeted: 20000, actual: 18000 },
      { month: "Feb", budgeted: 45000, actual: 42000 },
      { month: "Mar", budgeted: 70000, actual: 68000 }
    ]
  }
];

const monthlyComparison = [
  { month: "Jan", budgeted: 53000, actual: 47500, variance: -5500 },
  { month: "Feb", budgeted: 105000, actual: 94500, variance: -10500 },
  { month: "Mar", budgeted: 168000, actual: 140500, variance: -27500 },
  { month: "Apr", budgeted: 200000, actual: 0, variance: 0 },
  { month: "May", budgeted: 240000, actual: 0, variance: 0 },
  { month: "Jun", budgeted: 270000, actual: 0, variance: 0 }
];

const categoryBreakdown = [
  { category: "Development", budget: 170000, actual: 50000, color: "#8884d8" },
  { category: "Marketing", budget: 25000, actual: 22500, color: "#82ca9d" },
  { category: "Operations", budget: 75000, actual: 68000, color: "#ffc658" },
  { category: "Design", budget: 30000, actual: 12000, color: "#ff7300" }
];

const costCenters = [
  { name: "Personnel", budgeted: 180000, actual: 95000 },
  { name: "Software/Tools", budgeted: 45000, actual: 28000 },
  { name: "Marketing", budgeted: 35000, actual: 32500 },
  { name: "Infrastructure", budgeted: 40000, actual: 38000 }
];

export function BudgetComparison() {
  const totalBudgeted = budgetData.reduce((sum, project) => sum + project.budgeted, 0);
  const totalActual = budgetData.reduce((sum, project) => sum + project.actual, 0);
  const totalRemaining = totalBudgeted - totalActual;
  const totalVariance = ((totalActual - totalBudgeted) / totalBudgeted) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800";
      case "over-budget":
        return "bg-red-100 text-red-800";
      case "under-budget":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-red-600";
    if (variance < -5) return "text-green-600";
    return "text-yellow-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Budget Analysis</h1>
        <p className="text-muted-foreground">Track budget vs actual spending across projects</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Allocated across {budgetData.length} projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Actual Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalActual.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((totalActual / totalBudgeted) * 100)}% of budget used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Remaining</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRemaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Available for allocation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Variance</CardTitle>
            {totalVariance >= 0 ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getVarianceColor(totalVariance)}`}>
              {totalVariance > 0 ? '+' : ''}{totalVariance.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Budget variance
            </p>
          </CardContent>
        </Card>
      </div>

      <SimpleTabs defaultValue="projects" className="space-y-4">
        <div className="flex justify-between items-center">
          <SimpleTabsList>
            <SimpleTabsTrigger value="projects">Project Breakdown</SimpleTabsTrigger>
            <SimpleTabsTrigger value="trends">Spending Trends</SimpleTabsTrigger>
            <SimpleTabsTrigger value="categories">Category Analysis</SimpleTabsTrigger>
          </SimpleTabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <SimpleTabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {budgetData.map((project) => {
              const spentPercentage = (project.actual / project.budgeted) * 100;
              const variance = ((project.actual - project.budgeted) / project.budgeted) * 100;
              
              return (
                <Card key={project.project}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.project}</CardTitle>
                        <CardDescription>{project.category}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Budgeted</p>
                        <p className="font-semibold">${project.budgeted.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Actual</p>
                        <p className="font-semibold">${project.actual.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Remaining</p>
                        <p className="font-semibold">${project.remaining.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Used</span>
                        <span>{spentPercentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={spentPercentage} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Project Progress</span>
                      <span>{project.progress}%</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Variance</span>
                      <span className={getVarianceColor(variance)}>
                        {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                      </span>
                    </div>

                    {project.status === "over-budget" && (
                      <div className="flex items-center gap-2 p-2 bg-red-50 rounded text-sm text-red-800">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Project is over budget</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending Trends</CardTitle>
              <CardDescription>Budget vs actual spending over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Area type="monotone" dataKey="budgeted" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Budgeted" />
                  <Area type="monotone" dataKey="actual" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="Actual" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Cost Centers</CardTitle>
                <CardDescription>Budget allocation by cost center</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costCenters.map((center) => {
                    const percentage = (center.actual / center.budgeted) * 100;
                    return (
                      <div key={center.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{center.name}</span>
                          <span>${center.actual.toLocaleString()} / ${center.budgeted.toLocaleString()}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {percentage.toFixed(1)}% utilized
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variance Analysis</CardTitle>
                <CardDescription>Monthly budget variance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyComparison.slice(0, 3)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="variance" fill="#ff7300" name="Variance" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget by Category</CardTitle>
                <CardDescription>Planned vs actual spending by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="budget" fill="#e2e8f0" name="Budget" />
                    <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Budget allocation across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, budget }) => `${category} ($${(budget/1000).toFixed(0)}k)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="budget"
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Detailed breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.map((category) => {
                  const utilization = (category.actual / category.budget) * 100;
                  const variance = ((category.actual - category.budget) / category.budget) * 100;
                  
                  return (
                    <div key={category.category} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{category.category}</h3>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            ${category.actual.toLocaleString()} / ${category.budget.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Utilization</span>
                          <span>{utilization.toFixed(1)}%</span>
                        </div>
                        <Progress value={utilization} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Variance</span>
                          <span className={getVarianceColor(variance)}>
                            {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}