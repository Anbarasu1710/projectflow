import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "../ui/simple-tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  CheckSquare,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Filter,
  Search,
  Eye,
  ThumbsUp,
  ThumbsDown,
  TrendingUp
} from "lucide-react";

interface ApprovalSystemProps {
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

export function ApprovalSystem({
  projects,
  tasks,
  teamMembers,
  onNavigate
}: ApprovalSystemProps) {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-teal-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHByb3ZhbCUyMHN5c3RlbXxlbnwxfHx8fDE3NTU1NzkwODR8MA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Approval system"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Approval System</h1>
              <p className="text-xl opacity-90">Review and process approval workflows</p>
            </div>
            <div className="flex gap-3">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                <CheckSquare className="w-5 h-5 mr-2" />
                Bulk Actions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-orange-600 mt-1">Requires attention</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-green-600 mt-1">+8% from yesterday</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Processing Time</p>
                <p className="text-2xl font-bold">2.3d</p>
                <p className="text-xs text-green-600 mt-1">12% faster</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approval Rate</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-green-600 mt-1">+3% this month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <CheckSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <SimpleTabsList className="grid w-full grid-cols-4">
          <SimpleTabsTrigger value="pending">Pending</SimpleTabsTrigger>
          <SimpleTabsTrigger value="approved">Approved</SimpleTabsTrigger>
          <SimpleTabsTrigger value="rejected">Rejected</SimpleTabsTrigger>
          <SimpleTabsTrigger value="workflow">Workflow Config</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Pending Approvals
                  </CardTitle>
                  <CardDescription>
                    Items waiting for your review and approval
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search approvals..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Approval System</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced approval workflow management system
                </p>
                <p className="text-sm text-muted-foreground">
                  This will include multi-tier approvals, workflow automation, and bulk processing capabilities
                </p>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="approved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Approved Items
              </CardTitle>
              <CardDescription>
                Recently approved items and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Approved Items</h3>
                <p className="text-muted-foreground mb-4">
                  Track and manage approved requests
                </p>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="rejected" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Rejected Items
              </CardTitle>
              <CardDescription>
                Items that were rejected and their reasons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <XCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Rejected Items</h3>
                <p className="text-muted-foreground mb-4">
                  Review rejected requests and feedback
                </p>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="workflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-blue-600" />
                Workflow Configuration
              </CardTitle>
              <CardDescription>
                Configure approval workflows and rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CheckSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Workflow Configuration</h3>
                <p className="text-muted-foreground mb-4">
                  Set up custom approval workflows and business rules
                </p>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}