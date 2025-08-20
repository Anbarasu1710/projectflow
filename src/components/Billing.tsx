import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "./ui/simple-tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Project, Task, TeamMember } from "./data/dataStore";
import { toast } from "sonner";
import { 
  CreditCard, 
  Download, 
  Calendar, 
  Users, 
  Database,
  Zap,
  Crown,
  Shield,
  Rocket,
  Check,
  X,
  AlertTriangle,
  Clock,
  TrendingUp,
  DollarSign,
  FileText,
  Settings,
  Plus,
  ExternalLink
} from "lucide-react";

interface BillingProps {
  projects: Project[];
  tasks: Task[];
  teamMembers: TeamMember[];
  onCreateProject: () => void;
  onCreateTask: () => void;
  onCreateMember: () => void;
  onViewAnalytics: () => void;
  onViewReports: () => void;
  onNavigate: (view: string, id?: string) => void;
}

interface BillingInfo {
  currentPlan: 'starter' | 'professional' | 'enterprise';
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: Date;
  totalSpent: number;
  usage: {
    projects: { used: number; limit: number };
    teamMembers: { used: number; limit: number };
    storage: { used: number; limit: number };
    apiCalls: { used: number; limit: number };
  };
  paymentMethod: {
    type: 'card';
    last4: string;
    brand: string;
    expiry: string;
  };
}

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Zap,
    price: { monthly: 29, yearly: 290 },
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 10 projects',
      'Up to 5 team members',
      '10GB storage',
      'Basic reporting',
      'Email support',
      'Mobile app access'
    ],
    limits: {
      projects: 10,
      teamMembers: 5,
      storage: 10,
      apiCalls: 1000
    },
    color: 'bg-blue-500'
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Crown,
    price: { monthly: 59, yearly: 590 },
    description: 'For growing teams that need advanced features',
    features: [
      'Up to 50 projects',
      'Up to 25 team members',
      '100GB storage',
      'Advanced reporting & analytics',
      'Priority support',
      'Custom integrations',
      'Time tracking',
      'Gantt charts'
    ],
    limits: {
      projects: 50,
      teamMembers: 25,
      storage: 100,
      apiCalls: 10000
    },
    color: 'bg-purple-500',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Shield,
    price: { monthly: 149, yearly: 1490 },
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited projects',
      'Unlimited team members',
      '1TB storage',
      'Custom reporting',
      '24/7 phone support',
      'SSO integration',
      'Advanced security',
      'API access',
      'Custom branding',
      'Dedicated account manager'
    ],
    limits: {
      projects: -1,
      teamMembers: -1,
      storage: 1000,
      apiCalls: 100000
    },
    color: 'bg-emerald-500'
  }
];

const invoices = [
  {
    id: 'INV-2024-001',
    date: new Date('2024-01-15'),
    amount: 590,
    status: 'paid',
    plan: 'Professional',
    period: 'Jan 2024 - Dec 2024'
  },
  {
    id: 'INV-2023-012',
    date: new Date('2023-12-15'),
    amount: 59,
    status: 'paid',
    plan: 'Professional',
    period: 'Dec 2023'
  },
  {
    id: 'INV-2023-011',
    date: new Date('2023-11-15'),
    amount: 59,
    status: 'paid',
    plan: 'Professional',
    period: 'Nov 2023'
  }
];

export function Billing({ 
  projects, 
  tasks, 
  teamMembers, 
  onCreateProject, 
  onCreateTask, 
  onCreateMember,
  onViewAnalytics, 
  onViewReports,
  onNavigate 
}: BillingProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  
  const [billingInfo] = useState<BillingInfo>({
    currentPlan: 'professional',
    billingCycle: 'yearly',
    nextBillingDate: new Date('2025-01-15'),
    totalSpent: 1298,
    usage: {
      projects: { used: projects.length, limit: 50 },
      teamMembers: { used: teamMembers.length, limit: 25 },
      storage: { used: 23.5, limit: 100 },
      apiCalls: { used: 2850, limit: 10000 }
    },
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/26'
    }
  });

  const currentPlan = plans.find(p => p.id === billingInfo.currentPlan);
  const currentPrice = currentPlan?.price[billingInfo.billingCycle] || 0;

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handlePlanChange = (planId: string) => {
    toast.success(`Upgrading to ${planId} plan...`);
  };

  const handleUpdatePaymentMethod = () => {
    toast.info("Redirecting to secure payment portal...");
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Downloading invoice ${invoiceId}...`);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWxsaW5nJTIwZmluYW5jZSUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTU1NzkwODJ8MA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Billing dashboard"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
              <p className="text-xl opacity-90">Manage your subscription and billing preferences</p>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Current Plan</div>
              <div className="text-2xl font-bold">{currentPlan?.name}</div>
              <div className="text-lg">${currentPrice}/{billingInfo.billingCycle === 'yearly' ? 'year' : 'month'}</div>
            </div>
          </div>
        </div>
      </div>

      <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <SimpleTabsList className="grid w-full grid-cols-4">
          <SimpleTabsTrigger value="overview" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Overview
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="plans" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Plans
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="usage" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Usage
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Invoices
          </SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Plan Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentPlan?.icon && <currentPlan.icon className="h-5 w-5" />}
                  Current Subscription
                </CardTitle>
                <CardDescription>Your active plan and billing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                  <div>
                    <h3 className="text-lg font-semibold">{currentPlan?.name} Plan</h3>
                    <p className="text-sm text-muted-foreground">{currentPlan?.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Next billing: {billingInfo.nextBillingDate.toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        {billingInfo.paymentMethod.brand} •••• {billingInfo.paymentMethod.last4}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${currentPrice}</div>
                    <div className="text-sm text-muted-foreground">
                      per {billingInfo.billingCycle === 'yearly' ? 'year' : 'month'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => setActiveTab("plans")}>
                    <Rocket className="h-4 w-4 mr-2" />
                    Change Plan
                  </Button>
                  <Button variant="outline" onClick={handleUpdatePaymentMethod}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update Payment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${billingInfo.totalSpent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Usage This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Projects</span>
                      <span>{billingInfo.usage.projects.used}/{billingInfo.usage.projects.limit}</span>
                    </div>
                    <Progress value={getUsagePercentage(billingInfo.usage.projects.used, billingInfo.usage.projects.limit)} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Team Members</span>
                      <span>{billingInfo.usage.teamMembers.used}/{billingInfo.usage.teamMembers.limit}</span>
                    </div>
                    <Progress value={getUsagePercentage(billingInfo.usage.teamMembers.used, billingInfo.usage.teamMembers.limit)} className="h-1" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Next Invoice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">${currentPrice}</div>
                  <p className="text-xs text-muted-foreground">
                    Due {billingInfo.nextBillingDate.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="plans" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Choose Your Plan</h2>
              <p className="text-muted-foreground">Upgrade or downgrade your subscription anytime</p>
            </div>
            <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
              <Button
                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly
                <Badge className="ml-2 bg-green-100 text-green-800">Save 17%</Badge>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan = plan.id === billingInfo.currentPlan;
              const price = plan.price[billingCycle];
              
              return (
                <Card key={plan.id} className={`relative ${plan.popular ? 'border-purple-200 shadow-lg' : ''} ${isCurrentPlan ? 'ring-2 ring-purple-500' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  {isCurrentPlan && (
                    <div className="absolute -top-3 right-4">
                      <Badge className="bg-purple-500 text-white">Current Plan</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <div className="text-3xl font-bold">${price}</div>
                      <div className="text-sm text-muted-foreground">
                        per {billingCycle === 'yearly' ? 'year' : 'month'}
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="text-xs text-green-600">
                          Save ${(plan.price.monthly * 12) - plan.price.yearly} annually
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full" 
                      variant={isCurrentPlan ? "outline" : plan.popular ? "default" : "outline"}
                      disabled={isCurrentPlan}
                      onClick={() => handlePlanChange(plan.id)}
                    >
                      {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Usage</CardTitle>
              <CardDescription>Monitor your plan limits and usage across all features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(billingInfo.usage).map(([key, usage]) => {
                  const percentage = getUsagePercentage(usage.used, usage.limit);
                  const isUnlimited = usage.limit === -1;
                  
                  return (
                    <div key={key} className="space-y-3 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {key === 'projects' && <Database className="h-4 w-4" />}
                          {key === 'teamMembers' && <Users className="h-4 w-4" />}
                          {key === 'storage' && <Database className="h-4 w-4" />}
                          {key === 'apiCalls' && <Zap className="h-4 w-4" />}
                          <span className="font-medium capitalize">
                            {key === 'teamMembers' ? 'Team Members' : 
                             key === 'apiCalls' ? 'API Calls' : key}
                          </span>
                        </div>
                        <span className={`text-sm font-medium ${getUsageColor(percentage)}`}>
                          {usage.used}{isUnlimited ? '' : `/${usage.limit}`}
                          {key === 'storage' && ' GB'}
                        </span>
                      </div>
                      
                      {!isUnlimited && (
                        <>
                          <Progress value={percentage} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{percentage.toFixed(1)}% used</span>
                            <span>{usage.limit - usage.used} remaining</span>
                          </div>
                        </>
                      )}
                      
                      {isUnlimited && (
                        <div className="text-xs text-green-600 font-medium">✓ Unlimited</div>
                      )}
                      
                      {percentage >= 80 && !isUnlimited && (
                        <div className="flex items-center gap-1 text-xs text-yellow-600">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Approaching limit - consider upgrading</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="invoices" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Billing History</h2>
              <p className="text-muted-foreground">Download invoices and view payment history</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{invoice.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.plan} - {invoice.period}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {invoice.date.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">${invoice.amount}</div>
                        <Badge variant={invoice.status === 'paid' ? 'default' : 'destructive'}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}