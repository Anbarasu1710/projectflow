import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "../ui/simple-tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner";
import { 
  Database,
  Settings,
  Users,
  Shield,
  Mail,
  Globe,
  Key,
  AlertTriangle,
  CheckCircle2,
  Server,
  Plug,
  Lock,
  Bell,
  Palette,
  CheckSquare,
  Plus,
  Edit,
  Trash2,
  ArrowRight,
  UserCheck,
  ShoppingCart,
  Clock,
  DollarSign
} from "lucide-react";
import exampleImage from 'figma:asset/df3ba5f29b485d68e8dc9e4b2d9957436b4d70b0.png';

interface AdminSettingsProps {
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

interface ApprovalStep {
  id: string;
  stepNumber: number;
  title: string;
  assignee: string;
  role: string;
  timeout: string;
  minAmount?: number;
  maxAmount?: number;
}

interface ApprovalWorkflow {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'active' | 'inactive';
  steps: ApprovalStep[];
}

export function AdminSettings({
  projects,
  tasks,
  teamMembers,
  onNavigate
}: AdminSettingsProps) {
  const [activeTab, setActiveTab] = useState("system");

  const [approvalWorkflows, setApprovalWorkflows] = useState<ApprovalWorkflow[]>([
    {
      id: 'workflow-1',
      name: 'Customer Onboarding Approval',
      type: 'ONBOARDING',
      description: 'Standard approval process for customer onboarding',
      status: 'active',
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Initial Review',
          assignee: 'Sales Manager',
          role: 'Sales Manager',
          timeout: '2 days'
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Final Approval',
          assignee: 'Director',
          role: 'Director',
          timeout: '3 days'
        }
      ]
    },
    {
      id: 'workflow-2',
      name: 'Purchase Request Approval',
      type: 'PURCHASE REQUEST',
      description: 'Multi-tier approval based on amount',
      status: 'active',
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Department Head',
          assignee: 'Department Manager',
          role: 'Department Manager',
          timeout: '1 days',
          maxAmount: 50000
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Finance Review',
          assignee: 'Finance',
          role: 'Finance',
          timeout: '2 days',
          minAmount: 25000
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Director Approval',
          assignee: 'Director',
          role: 'Director',
          timeout: '3 days',
          minAmount: 100000
        }
      ]
    }
  ]);

  const handleAddStep = (workflowId: string) => {
    setApprovalWorkflows(prev => prev.map(workflow => {
      if (workflow.id === workflowId) {
        const newStep: ApprovalStep = {
          id: `step-${Date.now()}`,
          stepNumber: workflow.steps.length + 1,
          title: 'New Step',
          assignee: 'Assignee',
          role: 'Role',
          timeout: '1 days'
        };
        return {
          ...workflow,
          steps: [...workflow.steps, newStep]
        };
      }
      return workflow;
    }));
    toast.success("New approval step added");
  };

  const handleDeleteStep = (workflowId: string, stepId: string) => {
    setApprovalWorkflows(prev => prev.map(workflow => {
      if (workflow.id === workflowId) {
        return {
          ...workflow,
          steps: workflow.steps.filter(step => step.id !== stepId)
        };
      }
      return workflow;
    }));
    toast.success("Approval step removed");
  };

  const handleEditStep = (workflowId: string, stepId: string) => {
    toast.info("Edit step functionality - modal would open here");
  };

  const getWorkflowTypeColor = (type: string) => {
    switch (type) {
      case 'ONBOARDING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PURCHASE REQUEST':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWorkflowIcon = (type: string) => {
    switch (type) {
      case 'ONBOARDING':
        return <UserCheck className="h-4 w-4" />;
      case 'PURCHASE REQUEST':
        return <ShoppingCart className="h-4 w-4" />;
      default:
        return <CheckSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-600 to-gray-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG1pbiUyMHNldHRpbmdzfGVufDF8fHx8MTc1NTU3OTA4NHww&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Admin settings"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Settings</h1>
              <p className="text-xl opacity-90">Configure system settings and integrations</p>
            </div>
            <div className="flex items-center gap-3">
              <Database className="w-12 h-12 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <SimpleTabsList className="grid w-full grid-cols-6">
          <SimpleTabsTrigger value="system">System</SimpleTabsTrigger>
          <SimpleTabsTrigger value="users">User Management</SimpleTabsTrigger>
          <SimpleTabsTrigger value="security">Security</SimpleTabsTrigger>
          <SimpleTabsTrigger value="integrations">Integrations</SimpleTabsTrigger>
          <SimpleTabsTrigger value="approvals">Approvals</SimpleTabsTrigger>
          <SimpleTabsTrigger value="notifications">Notifications</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Configure core system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable maintenance mode to perform system updates
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Debug Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable detailed logging for troubleshooting
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto Backup</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup system data daily
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Performance Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Collect system performance metrics
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">System Health</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h5 className="font-medium text-green-800">Database</h5>
                    <p className="text-sm text-green-600">Healthy</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h5 className="font-medium text-green-800">API Server</h5>
                    <p className="text-sm text-green-600">Running</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h5 className="font-medium text-green-800">Storage</h5>
                    <p className="text-sm text-green-600">Available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                User Management
              </CardTitle>
              <CardDescription>
                Configure user roles, permissions, and access controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">User Management System</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced user management and role-based access control
                </p>
                <p className="text-sm text-muted-foreground">
                  This will include user roles, permissions, group management, and access control lists
                </p>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security policies and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all admin accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Session Timeout</h4>
                    <p className="text-sm text-muted-foreground">
                      Auto-logout users after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Password Policy</h4>
                    <p className="text-sm text-muted-foreground">
                      Enforce strong password requirements
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">IP Whitelisting</h4>
                    <p className="text-sm text-muted-foreground">
                      Restrict access to approved IP addresses only
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Security Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <h5 className="font-medium text-green-800">SSL Certificate</h5>
                      <p className="text-sm text-green-600">Valid until March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <h5 className="font-medium text-green-800">Firewall Status</h5>
                      <p className="text-sm text-green-600">Active and monitoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plug className="h-5 w-5 text-blue-600" />
                System Integrations
              </CardTitle>
              <CardDescription>
                Configure external system connections and APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Server className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">SAP B1 Integration</h4>
                          <p className="text-sm text-muted-foreground">ERP System Connection</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <Button variant="outline" className="w-full">Configure</Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Mail className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Email Service</h4>
                          <p className="text-sm text-muted-foreground">SMTP Configuration</p>
                        </div>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800">Not Connected</Badge>
                    </div>
                    <Button variant="outline" className="w-full">Configure</Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Globe className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Webhook API</h4>
                          <p className="text-sm text-muted-foreground">External API Endpoints</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <Button variant="outline" className="w-full">Configure</Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Lock className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">OAuth Provider</h4>
                          <p className="text-sm text-muted-foreground">Authentication Service</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <Button variant="outline" className="w-full">Configure</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="approvals" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-blue-600" />
                    Approval Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure approval workflows and business rules
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Workflow
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {approvalWorkflows.map((workflow) => (
                <div key={workflow.id} className="space-y-6">
                  {/* Workflow Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{workflow.name}</h3>
                      <Badge className={`${getWorkflowTypeColor(workflow.type)} text-xs`}>
                        {getWorkflowIcon(workflow.type)}
                        <span className="ml-1">{workflow.type}</span>
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{workflow.description}</p>

                  {/* Workflow Steps */}
                  <div className="flex items-center gap-4 overflow-x-auto pb-4">
                    {workflow.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-4 flex-shrink-0">
                        <Card className="w-64 bg-blue-50 border-blue-200 relative">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-blue-900">Step {step.stepNumber}</h4>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-blue-600 hover:text-blue-800"
                                  onClick={() => handleEditStep(workflow.id, step.id)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-red-600 hover:text-red-800"
                                  onClick={() => handleDeleteStep(workflow.id, step.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <h5 className="font-medium text-gray-900 mb-1">{step.title}</h5>
                            <p className="text-sm text-blue-700 mb-2">{step.assignee}</p>
                            
                            <div className="space-y-1 text-xs text-gray-600">
                              {step.maxAmount && (
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  <span>Max: ₹{step.maxAmount.toLocaleString()}</span>
                                </div>
                              )}
                              {step.minAmount && (
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  <span>Min: ₹{step.minAmount.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Timeout: {step.timeout}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {index < workflow.steps.length - 1 && (
                          <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                    ))}

                    {/* Add Step Button */}
                    <Button
                      variant="outline"
                      className="flex-shrink-0 h-32 w-32 border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                      onClick={() => handleAddStep(workflow.id)}
                    >
                      <div className="text-center">
                        <Plus className="h-6 w-6 mx-auto mb-2" />
                        <span className="text-sm">Add Step</span>
                      </div>
                    </Button>
                  </div>

                  {/* Divider between workflows */}
                  {workflow.id !== approvalWorkflows[approvalWorkflows.length - 1].id && (
                    <div className="border-t border-gray-200 pt-6" />
                  )}
                </div>
              ))}

              {/* Create New Workflow Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="text-center py-8">
                  <CheckSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Create Custom Workflow</h3>
                  <p className="text-muted-foreground mb-4">
                    Build custom approval workflows for your business processes
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Workflow
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure system-wide notification preferences and templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">System Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Send alerts for system errors and warnings
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for important events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Send SMS alerts for critical system events
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Slack Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Post notifications to Slack channels
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}