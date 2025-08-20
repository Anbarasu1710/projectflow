import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "../ui/simple-tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { SendInvitationModal } from "../modals/SendInvitationModal";
import { 
  UserCheck,
  Plus,
  Mail,
  Upload,
  CheckSquare,
  Clock,
  AlertTriangle,
  FileText,
  Building2,
  User,
  Calendar,
  Filter,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Send,
  CheckCircle2,
  XCircle
} from "lucide-react";

interface OnboardingManagementProps {
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

export function OnboardingManagement({
  projects,
  tasks,
  teamMembers,
  onNavigate
}: OnboardingManagementProps) {
  const [activeTab, setActiveTab] = useState("applications");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [invitationType, setInvitationType] = useState<'customer' | 'vendor'>('customer');

  // Mock onboarding data
  const [onboardingApplications, setOnboardingApplications] = useState([
    {
      id: "ONB-001",
      companyName: "Acme Corporation",
      contactPerson: "John Smith",
      email: "john.smith@acme.com",
      type: "vendor",
      status: "pending_documents",
      progress: 75,
      submittedDate: "2024-01-15",
      lastActivity: "2 hours ago",
      documentsRequired: 4,
      documentsSubmitted: 3,
      assignedTo: "Sarah Chen",
      priority: "high"
    },
    {
      id: "ONB-002", 
      companyName: "Tech Solutions Inc",
      contactPerson: "Emily Johnson",
      email: "emily@techsolutions.com",
      type: "customer",
      status: "under_review",
      progress: 90,
      submittedDate: "2024-01-14",
      lastActivity: "1 day ago",
      documentsRequired: 5,
      documentsSubmitted: 5,
      assignedTo: "Mike Rodriguez",
      priority: "medium"
    },
    {
      id: "ONB-003",
      companyName: "Global Logistics Ltd",
      contactPerson: "David Wilson",
      email: "d.wilson@globallogistics.com",
      type: "vendor",
      status: "approved",
      progress: 100,
      submittedDate: "2024-01-12",
      lastActivity: "3 days ago",  
      documentsRequired: 6,
      documentsSubmitted: 6,
      assignedTo: "Lisa Park",
      priority: "low"
    },
    {
      id: "ONB-004",
      companyName: "Digital Marketing Pro",
      contactPerson: "Anna Brown",
      email: "anna@digitalmarketingpro.com",
      type: "customer",
      status: "pending_info",
      progress: 45,
      submittedDate: "2024-01-13",
      lastActivity: "5 hours ago",
      documentsRequired: 3,
      documentsSubmitted: 1,
      assignedTo: "Tom Adams",
      priority: "high"
    },
    {
      id: "ONB-005",
      companyName: "Construction Partners",
      contactPerson: "Robert Davis",
      email: "robert@constructionpartners.com",
      type: "vendor",
      status: "rejected",
      progress: 65,
      submittedDate: "2024-01-10",
      lastActivity: "1 week ago",
      documentsRequired: 4,
      documentsSubmitted: 2,
      assignedTo: "Sarah Chen",
      priority: "low"
    }
  ]);

  const invitationTemplates = [
    {
      id: "TPL-001",
      name: "Standard Customer Onboarding",
      type: "customer",
      description: "Default template for new customer registration",
      usage: 145,
      lastModified: "2024-01-10",
      status: "active"
    },
    {
      id: "TPL-002", 
      name: "Vendor Registration - Basic",
      type: "vendor",
      description: "Basic vendor onboarding with essential documents",
      usage: 89,
      lastModified: "2024-01-08", 
      status: "active"
    },
    {
      id: "TPL-003",
      name: "Enterprise Customer Setup",
      type: "customer",
      description: "Comprehensive onboarding for enterprise clients",
      usage: 23,
      lastModified: "2024-01-05",
      status: "active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "under_review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending_documents":
      case "pending_info":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "under_review":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending_documents":
      case "pending_info":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredApplications = onboardingApplications.filter(app => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "pending") return ["pending_documents", "pending_info", "under_review"].includes(app.status);
    if (selectedFilter === "approved") return app.status === "approved";
    if (selectedFilter === "rejected") return app.status === "rejected";
    return true;
  });

  const handleInviteCustomer = () => {
    setInvitationType('customer');
    setShowInvitationModal(true);
  };

  const handleInviteVendor = () => {
    setInvitationType('vendor');
    setShowInvitationModal(true);
  };

  const handleSendInvitation = (invitationData: any) => {
    // Add the new invitation to our applications list
    const newApplication = {
      id: `ONB-${(onboardingApplications.length + 1).toString().padStart(3, '0')}`,
      companyName: invitationData.fullName + " Organization", // Placeholder company name
      contactPerson: invitationData.fullName,
      email: invitationData.email,
      type: invitationData.type,
      status: "pending_info",
      progress: 10,
      submittedDate: new Date().toISOString().split('T')[0],
      lastActivity: "Just sent",
      documentsRequired: invitationData.templates.length,
      documentsSubmitted: 0,
      assignedTo: "Sarah Chen",
      priority: "medium"
    };

    setOnboardingApplications(prev => [newApplication, ...prev]);
    setShowInvitationModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmJvYXJkaW5nJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NTU1NzkwODR8MA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Onboarding management"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Onboarding Management</h1>
              <p className="text-xl opacity-90">Streamline customer and vendor registration processes</p>
            </div>
            <div className="flex gap-3">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Upload className="w-5 h-5 mr-2" />
                Bulk Import
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => setShowInvitationModal(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Send Invitation
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <SimpleTabsList className="grid w-full grid-cols-4">
          <SimpleTabsTrigger value="applications">Applications</SimpleTabsTrigger>
          <SimpleTabsTrigger value="invitations">Send Invitations</SimpleTabsTrigger>
          <SimpleTabsTrigger value="templates">Templates</SimpleTabsTrigger>
          <SimpleTabsTrigger value="analytics">Analytics</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="applications" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("all")}
                  >
                    All Applications
                  </Button>
                  <Button 
                    variant={selectedFilter === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("pending")}
                  >
                    Pending
                  </Button>
                  <Button 
                    variant={selectedFilter === "approved" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("approved")}
                  >
                    Approved
                  </Button>
                  <Button 
                    variant={selectedFilter === "rejected" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("rejected")}
                  >
                    Rejected
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search applications..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {application.companyName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{application.companyName}</h3>
                          <Badge variant="outline" className="text-xs">
                            {application.type === "customer" ? <User className="h-3 w-3 mr-1" /> : <Building2 className="h-3 w-3 mr-1" />}
                            {application.type}
                          </Badge>
                          <Badge className={`${getStatusColor(application.status)} text-xs`}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1">{application.status.replace('_', ' ')}</span>
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>{application.contactPerson}</span>
                          <span>{application.email}</span>
                          <span>ID: {application.id}</span>
                          <span className={`font-medium ${getPriorityColor(application.priority)}`}>
                            {application.priority} priority
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Progress</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={application.progress} className="h-2 flex-1" />
                              <span className="text-sm font-medium">{application.progress}%</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Documents</p>
                            <p className="text-sm font-medium mt-1">
                              {application.documentsSubmitted}/{application.documentsRequired} submitted
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Assigned To</p>
                            <p className="text-sm font-medium mt-1">{application.assignedTo}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Submitted: {application.submittedDate}</span>
                          <span>Last activity: {application.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="invitations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-blue-600" />
                Send Invitations
              </CardTitle>
              <CardDescription>
                Invite new customers or vendors to begin the onboarding process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-blue-200 hover:border-blue-300 cursor-pointer transition-colors" onClick={handleInviteCustomer}>
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Customer Onboarding</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Invite new customers to register and complete their profile setup
                    </p>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Invite Customer
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 hover:border-green-300 cursor-pointer transition-colors" onClick={handleInviteVendor}>
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Vendor Registration</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Register new vendors and suppliers with required documentation
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Invite Vendor
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bulk Invitation</CardTitle>
                  <CardDescription>
                    Upload a CSV file to send multiple invitations at once
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Drop your CSV file here</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Or click to browse and select a file from your computer
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported format: CSV with columns for name, email, company, type
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Onboarding Templates
                  </CardTitle>
                  <CardDescription>
                    Manage email templates and forms for the onboarding process
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {invitationTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-100 rounded-lg">
                            <FileText className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Used {template.usage} times</span>
                              <span>Modified: {template.lastModified}</span>
                              <Badge variant="outline" className="text-xs">
                                {template.type}
                              </Badge>
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                {template.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                    <p className="text-2xl font-bold">{onboardingApplications.length}</p>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <UserCheck className="h-6 w-6 text-blue-600" />
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
                    <p className="text-xs text-green-600 mt-1">+5% from last month</p>
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
                    <p className="text-2xl font-bold">3.2 days</p>
                    <p className="text-xs text-orange-600 mt-1">+0.5 days from last month</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Document Completion</p>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-xs text-green-600 mt-1">+3% from last month</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Onboarding Performance Trends</CardTitle>
              <CardDescription>
                Monthly overview of onboarding metrics and performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Analytics charts would be displayed here</p>
                  <p className="text-sm">Integration with charting library required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>

      {/* Send Invitation Modal */}
      <SendInvitationModal
        isOpen={showInvitationModal}
        onClose={() => setShowInvitationModal(false)}
        initialType={invitationType}
        onSendInvitation={handleSendInvitation}
      />
    </div>
  );
}