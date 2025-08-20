import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "../ui/simple-tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CreateEmailTemplateModal } from "../modals/CreateEmailTemplateModal";
import { CreateDocumentTemplateModal } from "../modals/CreateDocumentTemplateModal";
import { toast } from "sonner";
import { 
  FileText,
  Plus,
  Mail,
  FileImage,
  Download,
  Upload,
  Edit,
  Trash2,
  Copy,
  Eye,
  Search,
  Filter,
  TrendingUp,
  MoreVertical,
  Calendar,
  User,
  Star,
  StarOff,
  Archive,
  RefreshCw
} from "lucide-react";

interface TemplateManagerProps {
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

interface Template {
  id: string;
  name: string;
  type: 'email' | 'document';
  category: string;
  description?: string;
  subject?: string;
  content?: string;
  sections?: any[];
  variables: any[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  status: 'active' | 'draft' | 'archived';
  usageCount: number;
  favorite: boolean;
}

export function TemplateManager({
  projects,
  tasks,
  teamMembers,
  onNavigate
}: TemplateManagerProps) {
  const [activeTab, setActiveTab] = useState("email");
  const [showCreateEmailModal, setShowCreateEmailModal] = useState(false);
  const [showCreateDocumentModal, setShowCreateDocumentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 'email-1',
      name: 'Welcome Email',
      type: 'email',
      category: 'onboarding',
      description: 'Welcome new customers to the platform',
      subject: 'Welcome to {{company_name}}!',
      content: 'Dear {{customer_name}},\n\nWelcome to {{company_name}}! We are excited to have you on board.',
      variables: [
        { id: '1', name: 'customer_name', placeholder: 'Customer Name', required: true },
        { id: '2', name: 'company_name', placeholder: 'Company Name', required: true }
      ],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      createdBy: 'Sarah Chen',
      status: 'active',
      usageCount: 125,
      favorite: true
    },
    {
      id: 'email-2',
      name: 'Purchase Approval',
      type: 'email',
      category: 'approval',
      description: 'Notify users about purchase request approval',
      subject: 'Purchase Request {{request_id}} - {{status}}',
      content: 'Your purchase request {{request_id}} has been {{status}}.',
      variables: [
        { id: '1', name: 'request_id', placeholder: 'Request ID', required: true },
        { id: '2', name: 'status', placeholder: 'Status', required: true }
      ],
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-18'),
      createdBy: 'John Doe',
      status: 'active',
      usageCount: 89,
      favorite: false
    },
    {
      id: 'doc-1',
      name: 'Service Agreement',
      type: 'document',
      category: 'contract',
      description: 'Standard service agreement template',
      sections: [
        { id: '1', title: 'Agreement Terms', content: 'This agreement between {{client_name}} and {{company_name}}...', type: 'text', required: true }
      ],
      variables: [
        { id: '1', name: 'client_name', placeholder: 'Client Name', required: true },
        { id: '2', name: 'company_name', placeholder: 'Company Name', required: true }
      ],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-22'),
      createdBy: 'Mike Johnson',
      status: 'active',
      usageCount: 34,
      favorite: true
    },
    {
      id: 'doc-2',
      name: 'Invoice Template',
      type: 'document',
      category: 'invoice',
      description: 'Professional invoice template',
      sections: [
        { id: '1', title: 'Invoice Header', content: 'Invoice #{{invoice_number}}', type: 'text', required: true }
      ],
      variables: [
        { id: '1', name: 'invoice_number', placeholder: 'Invoice Number', required: true }
      ],
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-15'),
      createdBy: 'Sarah Chen',
      status: 'active',
      usageCount: 156,
      favorite: false
    }
  ]);

  const categories = [
    'all',
    'onboarding',
    'approval',
    'purchase',
    'notification',
    'marketing',
    'contract',
    'invoice',
    'proposal',
    'report'
  ];

  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const emailTemplates = filteredTemplates.filter(t => t.type === 'email');
  const documentTemplates = filteredTemplates.filter(t => t.type === 'document');

  const handleCreateEmailTemplate = (templateData: any) => {
    const newTemplate: Template = {
      ...templateData,
      createdBy: 'Current User',
      usageCount: 0,
      favorite: false
    };
    setTemplates(prev => [newTemplate, ...prev]);
    
    toast.success(`Email template "${templateData.name}" created successfully!`);
  };

  const handleCreateDocumentTemplate = (templateData: any) => {
    const newTemplate: Template = {
      ...templateData,
      createdBy: 'Current User',
      usageCount: 0,
      favorite: false
    };
    setTemplates(prev => [newTemplate, ...prev]);
    
    toast.success(`Document template "${templateData.name}" created successfully!`);
  };

  const handleEditTemplate = (template: Template) => {
    if (template.type === 'email') {
      setShowCreateEmailModal(true);
    } else {
      setShowCreateDocumentModal(true);
    }
    // Pass template data as initialData to modal
    toast.info(`Edit ${template.type} template functionality`);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    toast.success("Template deleted successfully!");
  };

  const handleDuplicateTemplate = (template: Template) => {
    const duplicatedTemplate: Template = {
      ...template,
      id: `${template.type}-${Date.now()}`,
      name: `${template.name} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0,
      favorite: false
    };
    setTemplates(prev => [duplicatedTemplate, ...prev]);
    toast.success("Template duplicated successfully!");
  };

  const handleToggleFavorite = (templateId: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, favorite: !t.favorite } : t
    ));
  };

  const handleArchiveTemplate = (templateId: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, status: 'archived' } : t
    ));
    toast.success("Template archived successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      onboarding: 'bg-blue-100 text-blue-800',
      approval: 'bg-green-100 text-green-800',
      purchase: 'bg-purple-100 text-purple-800',
      notification: 'bg-yellow-100 text-yellow-800',
      marketing: 'bg-pink-100 text-pink-800',
      contract: 'bg-indigo-100 text-indigo-800',
      invoice: 'bg-orange-100 text-orange-800',
      proposal: 'bg-teal-100 text-teal-800',
      report: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const renderTemplateCard = (template: Template) => (
    <Card key={template.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`p-3 rounded-lg ${template.type === 'email' ? 'bg-blue-100' : 'bg-purple-100'}`}>
              {template.type === 'email' ? (
                <Mail className={`h-6 w-6 ${template.type === 'email' ? 'text-blue-600' : 'text-purple-600'}`} />
              ) : (
                <FileText className={`h-6 w-6 ${template.type === 'email' ? 'text-blue-600' : 'text-purple-600'}`} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg truncate">{template.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleToggleFavorite(template.id)}
                >
                  {template.favorite ? (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  ) : (
                    <StarOff className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${getCategoryColor(template.category)} text-xs`}>
                  {template.category}
                </Badge>
                <Badge className={`${getStatusColor(template.status)} text-xs`}>
                  {template.status}
                </Badge>
              </div>

              {template.description && (
                <p className="text-sm text-muted-foreground mb-3">
                  {template.description}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {template.createdAt.toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Created By</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {template.createdBy}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Usage Count</p>
                  <p className="text-sm font-medium">{template.usageCount} times</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Variables: {template.variables.length}</span>
                {template.type === 'document' && template.sections && (
                  <span>• Sections: {template.sections.length}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDuplicateTemplate(template)}>
              <Copy className="h-4 w-4 mr-1" />
              Duplicate
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDeleteTemplate(template.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGF0ZSUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzU1NTc5MDg0fDA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Template management"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Template Manager</h1>
              <p className="text-xl opacity-90">Manage document and email templates</p>
            </div>
            <div className="flex gap-3">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Upload className="w-5 h-5 mr-2" />
                Import Templates
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => setShowCreateEmailModal(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Template
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
                <p className="text-sm font-medium text-muted-foreground">Total Templates</p>
                <p className="text-2xl font-bold">{templates.length}</p>
                <p className="text-xs text-blue-600 mt-1">{templates.filter(t => t.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length} created this month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email Templates</p>
                <p className="text-2xl font-bold">{emailTemplates.length}</p>
                <p className="text-xs text-green-600 mt-1">+15% usage</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Document Templates</p>
                <p className="text-2xl font-bold">{documentTemplates.length}</p>
                <p className="text-xs text-purple-600 mt-1">{documentTemplates.filter(t => t.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} new this week</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FileImage className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold">{templates.reduce((sum, t) => sum + t.usageCount, 0)}</p>
                <p className="text-xs text-green-600 mt-1">+23% this month</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Download className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <SimpleTabsList className="grid w-full grid-cols-4">
          <SimpleTabsTrigger value="email">Email Templates</SimpleTabsTrigger>
          <SimpleTabsTrigger value="document">Document Templates</SimpleTabsTrigger>
          <SimpleTabsTrigger value="create">Create Template</SimpleTabsTrigger>
          <SimpleTabsTrigger value="analytics">Usage Analytics</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="email" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline" size="sm">Active</Button>
                  <Button variant="outline" size="sm">Favorites</Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search email templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Templates List */}
          <div className="grid grid-cols-1 gap-4">
            {emailTemplates.map(renderTemplateCard)}
            {emailTemplates.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Email Templates Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'Create your first email template to get started'
                    }
                  </p>
                  <Button onClick={() => setShowCreateEmailModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Email Template
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="document" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline" size="sm">Active</Button>
                  <Button variant="outline" size="sm">Favorites</Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search document templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Templates List */}
          <div className="grid grid-cols-1 gap-4">
            {documentTemplates.map(renderTemplateCard)}
            {documentTemplates.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Document Templates Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'Create your first document template to get started'
                    }
                  </p>
                  <Button onClick={() => setShowCreateDocumentModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Document Template
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                Create New Template
              </CardTitle>
              <CardDescription>
                Build new email and document templates with rich editor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-blue-200 hover:border-blue-300 cursor-pointer transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Email Template</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create professional email templates with variables and styling
                    </p>
                    <Button className="w-full" onClick={() => setShowCreateEmailModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Email Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 hover:border-purple-300 cursor-pointer transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <FileImage className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Document Template</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Build document templates for contracts and forms
                    </p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setShowCreateDocumentModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Document Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Template Usage Analytics
              </CardTitle>
              <CardDescription>
                Track template performance and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Most Used Templates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Most Used Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {templates
                        .sort((a, b) => b.usageCount - a.usageCount)
                        .slice(0, 5)
                        .map((template) => (
                          <div key={template.id} className="flex items-center justify-between">
                            <span className="text-sm truncate">{template.name}</span>
                            <span className="text-sm font-medium">{template.usageCount}</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Template Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">By Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(
                        templates.reduce((acc: Record<string, number>, template) => {
                          acc[template.category] = (acc[template.category] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{category}</span>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Template Types */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">By Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Templates</span>
                        <span className="text-sm font-medium">{emailTemplates.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Document Templates</span>
                        <span className="text-sm font-medium">{documentTemplates.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Templates</span>
                        <span className="text-sm font-medium">{templates.filter(t => t.status === 'active').length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>

      {/* Create Email Template Modal */}
      <CreateEmailTemplateModal
        isOpen={showCreateEmailModal}
        onClose={() => setShowCreateEmailModal(false)}
        onCreateTemplate={handleCreateEmailTemplate}
      />

      {/* Create Document Template Modal */}
      <CreateDocumentTemplateModal
        isOpen={showCreateDocumentModal}
        onClose={() => setShowCreateDocumentModal(false)}
        onCreateTemplate={handleCreateDocumentTemplate}
      />
    </div>
  );
}