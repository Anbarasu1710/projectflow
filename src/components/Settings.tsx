import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "./ui/simple-tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";
import { 
  Bell, 
  Moon, 
  Sun, 
  Monitor, 
  User, 
  Lock, 
  Palette, 
  Globe, 
  Mail,
  Shield,
  CreditCard,
  Key,
  AlertTriangle,
  CheckCircle2,
  Settings as SettingsIcon,
  Users,
  DollarSign,
  Zap,
  Crown,
  Info,
  Building2
} from "lucide-react";

interface SettingsProps {
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
  settings?: {
    enableResourceAllocation: boolean;
    enableBudgetAnalysis: boolean;
    enableAdvancedFeatures: boolean;
    enableEnterpriseAdmin: boolean;
    notifications: {
      email: boolean;
      push: boolean;
      desktop: boolean;
    };
    appearance: {
      theme: 'light' | 'dark' | 'system';
      sidebarCollapsed: boolean;
    };
  };
  onUpdateSettings?: (settings: any) => void;
}

export function Settings({ 
  projects, 
  tasks, 
  teamMembers, 
  onCreateProject, 
  onCreateTask, 
  onCreateMember, 
  onImportTemplate,
  onViewAnalytics, 
  onViewReports, 
  onNavigate,
  settings,
  onUpdateSettings
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState("features");

  const handleSettingsChange = (key: string, value: any) => {
    if (onUpdateSettings && settings) {
      const updatedSettings = { ...settings };
      
      // Handle nested settings
      if (key.includes('.')) {
        const [parent, child] = key.split('.');
        updatedSettings[parent as keyof typeof settings] = {
          ...updatedSettings[parent as keyof typeof settings],
          [child]: value
        };
      } else {
        (updatedSettings as any)[key] = value;
      }
      
      onUpdateSettings(updatedSettings);
    }
  };

  const handleResetSettings = () => {
    if (onUpdateSettings) {
      onUpdateSettings({
        enableResourceAllocation: false,
        enableBudgetAnalysis: false,
        enableAdvancedFeatures: false,
        enableEnterpriseAdmin: false,
        notifications: {
          email: true,
          push: true,
          desktop: false,
        },
        appearance: {
          theme: 'light',
          sidebarCollapsed: false,
        },
      });
      toast.success("Settings reset to defaults");
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-600 to-gray-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXR0aW5ncyUyMGNvbmZpZ3VyYXRpb258ZW58MXx8fHwxNzU1NTc5MDg0fDA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Settings configuration"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-xl opacity-90">Customize your ProjectFlow experience</p>
            </div>
            <div className="flex items-center gap-3">
              <SettingsIcon className="w-12 h-12 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <SimpleTabsList className="grid w-full grid-cols-4">
          <SimpleTabsTrigger value="features">Features</SimpleTabsTrigger>
          <SimpleTabsTrigger value="notifications">Notifications</SimpleTabsTrigger>
          <SimpleTabsTrigger value="appearance">Appearance</SimpleTabsTrigger>
          <SimpleTabsTrigger value="account">Account</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Feature Management
              </CardTitle>
              <CardDescription>
                Enable or disable specific features in your workspace. Some features require a Pro subscription.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resource Allocation */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Resource Allocation</h3>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        <Crown className="h-3 w-3 mr-1" />
                        Pro Feature
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Manage team member workloads, track resource utilization, and optimize team capacity across projects.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Info className="h-3 w-3" />
                      <span>Includes capacity planning, workload visualization, and resource optimization tools</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {settings?.enableResourceAllocation && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                  <Switch
                    checked={settings?.enableResourceAllocation || false}
                    onCheckedChange={(checked) => handleSettingsChange('enableResourceAllocation', checked)}
                  />
                </div>
              </div>

              {/* Budget Analysis */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Budget Analysis</h3>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        <Crown className="h-3 w-3 mr-1" />
                        Pro Feature
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Track project budgets, compare actual vs planned costs, and generate financial reports with detailed insights.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Info className="h-3 w-3" />
                      <span>Includes cost tracking, budget forecasting, and financial reporting dashboard</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {settings?.enableBudgetAnalysis && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                  <Switch
                    checked={settings?.enableBudgetAnalysis || false}
                    onCheckedChange={(checked) => handleSettingsChange('enableBudgetAnalysis', checked)}
                  />
                </div>
              </div>

              {/* Enterprise Admin */}
              <div className="flex items-center justify-between p-4 border rounded-lg border-orange-200 bg-orange-50">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Enterprise Admin Dashboard</h3>
                      <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                        <Shield className="h-3 w-3 mr-1" />
                        Enterprise
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Full enterprise administration including onboarding, purchase management, approvals, and template management.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Info className="h-3 w-3" />
                      <span>Includes dashboard, onboarding workflows, purchase orders, approval system, and template manager</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {settings?.enableEnterpriseAdmin && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Enterprise Active
                    </Badge>
                  )}
                  <Switch
                    checked={settings?.enableEnterpriseAdmin || false}
                    onCheckedChange={(checked) => handleSettingsChange('enableEnterpriseAdmin', checked)}
                  />
                </div>
              </div>

              {/* Advanced Features */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Advanced Features</h3>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                        Beta
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enable experimental features like AI project insights, automated task assignment, and predictive analytics.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Beta features may have limited functionality and could change</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {settings?.enableAdvancedFeatures && (
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      <Zap className="h-3 w-3 mr-1" />
                      Beta Active
                    </Badge>
                  )}
                  <Switch
                    checked={settings?.enableAdvancedFeatures || false}
                    onCheckedChange={(checked) => handleSettingsChange('enableAdvancedFeatures', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Upgrade to Pro</h4>
                    <p className="text-sm text-yellow-700">
                      Unlock Resource Allocation, Budget Analysis, and Enterprise Admin features with a Pro subscription.
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={() => onNavigate('billing')}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications about your projects and tasks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive project updates and important notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings?.notifications?.email || false}
                    onCheckedChange={(checked) => handleSettingsChange('notifications.email', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Get real-time updates on your mobile device
                    </p>
                  </div>
                  <Switch
                    checked={settings?.notifications?.push || false}
                    onCheckedChange={(checked) => handleSettingsChange('notifications.push', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Desktop Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Show browser notifications for urgent updates
                    </p>
                  </div>
                  <Switch
                    checked={settings?.notifications?.desktop || false}
                    onCheckedChange={(checked) => handleSettingsChange('notifications.desktop', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-blue-600" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your ProjectFlow workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Theme</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={settings?.appearance?.theme === 'light' ? 'default' : 'outline'}
                      className="h-20 flex-col"
                      onClick={() => handleSettingsChange('appearance.theme', 'light')}
                    >
                      <Sun className="h-6 w-6 mb-2" />
                      Light
                    </Button>
                    <Button
                      variant={settings?.appearance?.theme === 'dark' ? 'default' : 'outline'}
                      className="h-20 flex-col"
                      onClick={() => handleSettingsChange('appearance.theme', 'dark')}
                    >
                      <Moon className="h-6 w-6 mb-2" />
                      Dark
                    </Button>
                    <Button
                      variant={settings?.appearance?.theme === 'system' ? 'default' : 'outline'}
                      className="h-20 flex-col"
                      onClick={() => handleSettingsChange('appearance.theme', 'system')}
                    >
                      <Monitor className="h-6 w-6 mb-2" />
                      System
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sidebar Collapsed by Default</h4>
                    <p className="text-sm text-muted-foreground">
                      Start with a collapsed sidebar for more workspace
                    </p>
                  </div>
                  <Switch
                    checked={settings?.appearance?.sidebarCollapsed || false}
                    onCheckedChange={(checked) => handleSettingsChange('appearance.sidebarCollapsed', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Account Information
              </CardTitle>
              <CardDescription>
                Manage your account details and security settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage 
                    src="https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=200" 
                    alt="User" 
                  />
                  <AvatarFallback className="text-lg">SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">Sarah Chen</h3>
                  <p className="text-sm text-muted-foreground">sarah.chen@projectflow.com</p>
                  <Badge className="mt-1 bg-blue-100 text-blue-800">Project Manager</Badge>
                </div>
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Key className="h-4 w-4 mr-2" />
                  Two-Factor Authentication
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Language & Region
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-red-600">Danger Zone</h4>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-red-800">Reset All Settings</h5>
                      <p className="text-sm text-red-600">
                        This will reset all your preferences to default values.
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-red-200 text-red-600 hover:bg-red-100"
                      onClick={handleResetSettings}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}