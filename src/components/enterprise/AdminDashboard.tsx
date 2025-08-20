import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Shield,
  Users,
  ShoppingCart,
  FileText,
  CheckSquare,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  UserCheck,
  Mail,
  Database,
  BarChart3,
  Calendar
} from "lucide-react";

interface AdminDashboardProps {
  projects: any[];
  tasks: any[];
  teamMembers: any[];
  onCreateProject: () => void;
  onCreateTask: () => void;
  onCreateMember: () => void;
  onImportTemplate?: () => void;
  onViewAnalytics: () => void;
  onViewReports: () => void;
  onNavigate: (view: string, id?: string) => void;
}

export function AdminDashboard({
  projects,
  tasks,
  teamMembers,
  onNavigate
}: AdminDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  // Mock data for enterprise admin dashboard
  const dashboardStats = {
    totalUsers: 1247,
    activeOnboarding: 23,
    pendingApprovals: 15,
    monthlyRevenue: 184750,
    completedPurchases: 89,
    templatesUsed: 156
  };

  const recentActivity = [
    {
      id: 1,
      type: "onboarding",
      title: "New vendor registration",
      description: "Acme Corp completed onboarding process",
      time: "2 minutes ago",
      status: "completed",
      icon: UserCheck
    },
    {
      id: 2,
      type: "approval",
      title: "Purchase order pending",
      description: "$15,000 equipment purchase awaiting approval",
      time: "15 minutes ago",
      status: "pending",
      icon: CheckSquare
    },
    {
      id: 3,
      type: "template",
      title: "Template updated",
      description: "Customer onboarding template v2.1 published",
      time: "1 hour ago",
      status: "completed",
      icon: FileText
    },
    {
      id: 4,
      type: "purchase",
      title: "Purchase order approved",
      description: "Office supplies order #PO-2024-0156 approved",
      time: "2 hours ago",
      status: "approved",
      icon: ShoppingCart
    },
    {
      id: 5,
      type: "user",
      title: "New user invitation",
      description: "5 new team members invited to join",
      time: "3 hours ago",
      status: "completed",
      icon: Mail
    }
  ];

  const quickActions = [
    {
      title: "Send Invitations",
      description: "Invite new customers or vendors",
      icon: UserCheck,
      action: () => onNavigate("onboarding"),
      color: "bg-blue-500"
    },
    {
      title: "Review Approvals",
      description: "Process pending approvals",
      icon: CheckSquare,
      action: () => onNavigate("approvals"),
      color: "bg-orange-500",
      badge: dashboardStats.pendingApprovals
    },
    {
      title: "Create Purchase Order",
      description: "Generate new purchase request",
      icon: ShoppingCart,
      action: () => onNavigate("purchase"),
      color: "bg-green-500"
    },
    {
      title: "Manage Templates",
      description: "Update email and document templates",
      icon: FileText,
      action: () => onNavigate("templates"),
      color: "bg-purple-500"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 to-red-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwYWRtaW4lMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU1NTc5MDg0fDA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Enterprise admin dashboard"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Enterprise Admin Dashboard</h1>
              <p className="text-xl opacity-90">Comprehensive business management and administration</p>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-12 h-12 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Onboarding</p>
                <p className="text-2xl font-bold">{dashboardStats.activeOnboarding}</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+8% from last week</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold">{dashboardStats.pendingApprovals}</p>
                <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Requires attention</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <CheckSquare className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">${dashboardStats.monthlyRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+15% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Purchases</p>
                <p className="text-2xl font-bold">{dashboardStats.completedPurchases}</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+23% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <ShoppingCart className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Templates Used</p>
                <p className="text-2xl font-bold">{dashboardStats.templatesUsed}</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+7% from last week</span>
                </div>
              </div>
              <div className="p-3 bg-pink-100 rounded-full">
                <FileText className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Frequently used administrative functions for efficient workflow management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200" onClick={action.action}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${action.color} rounded-lg text-white flex-shrink-0`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{action.title}</h3>
                          {action.badge && (
                            <Badge className="bg-red-100 text-red-800 text-xs">{action.badge}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest system activities and updates</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-medium text-sm">{activity.title}</h4>
                        {getStatusIcon(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Performance Overview
            </CardTitle>
            <CardDescription>Key performance indicators for this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Onboarding Completion Rate</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <Progress value={87} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">23 of 26 applications completed</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Approval Processing Time</span>
                  <span className="text-sm font-medium">2.3 days avg</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">12% faster than last month</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Purchase Order Accuracy</span>
                  <span className="text-sm font-medium">96%</span>
                </div>
                <Progress value={96} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">4% error rate reduced</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Template Usage</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">156 templates used this month</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            System Health & Status
          </CardTitle>
          <CardDescription>
            Current system status and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-600">All Systems Operational</h3>
              <p className="text-sm text-muted-foreground mt-1">99.9% uptime this month</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-600">API Response Time</h3>
              <p className="text-sm text-muted-foreground mt-1">Average 145ms</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-600">Active Users</h3>
              <p className="text-sm text-muted-foreground mt-1">847 users online</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}