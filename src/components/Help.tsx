import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "./ui/simple-tabs";
import { SimpleSelect } from "./ui/simple-select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Project, Task, TeamMember } from "./data/dataStore";
import { toast } from "sonner";
import { 
  HelpCircle, 
  Book, 
  MessageSquare, 
  Lightbulb,
  Search,
  ExternalLink,
  Play,
  FileText,
  Video,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  Zap,
  Users,
  Settings,
  Shield,
  DollarSign,
  BarChart3,
  Plus,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send
} from "lucide-react";

interface HelpProps {
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

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: Date;
  updatedAt: Date;
  assignee?: string;
  responses: number;
}

interface HelpArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  views: number;
  helpful: number;
  lastUpdated: Date;
  type: 'article' | 'video' | 'tutorial';
}

const helpCategories = [
  { id: 'getting-started', name: 'Getting Started', icon: Play, color: 'bg-blue-500' },
  { id: 'projects', name: 'Projects & Tasks', icon: BarChart3, color: 'bg-green-500' },
  { id: 'team-management', name: 'Team Management', icon: Users, color: 'bg-purple-500' },
  { id: 'billing', name: 'Billing & Plans', icon: DollarSign, color: 'bg-yellow-500' },
  { id: 'integrations', name: 'Integrations', icon: Zap, color: 'bg-orange-500' },
  { id: 'security', name: 'Security & Privacy', icon: Shield, color: 'bg-red-500' },
  { id: 'settings', name: 'Settings', icon: Settings, color: 'bg-gray-500' }
];

const helpArticles: HelpArticle[] = [
  {
    id: '1',
    title: 'Getting Started with ProjectFlow',
    description: 'Learn the basics of setting up your first project',
    category: 'getting-started',
    content: 'Complete guide to getting started...',
    views: 1250,
    helpful: 45,
    lastUpdated: new Date('2024-01-15'),
    type: 'tutorial'
  },
  {
    id: '2',
    title: 'Creating and Managing Projects',
    description: 'How to create, organize, and manage your projects effectively',
    category: 'projects',
    content: 'Detailed project management guide...',
    views: 890,
    helpful: 32,
    lastUpdated: new Date('2024-01-10'),
    type: 'article'
  },
  {
    id: '3',
    title: 'Team Collaboration Best Practices',
    description: 'Tips for effective team collaboration and communication',
    category: 'team-management',
    content: 'Team collaboration strategies...',
    views: 675,
    helpful: 28,
    lastUpdated: new Date('2024-01-08'),
    type: 'video'
  },
  {
    id: '4',
    title: 'Understanding Billing and Subscriptions',
    description: 'Everything you need to know about plans, billing, and payments',
    category: 'billing',
    content: 'Billing and subscription details...',
    views: 543,
    helpful: 22,
    lastUpdated: new Date('2024-01-05'),
    type: 'article'
  },
  {
    id: '5',
    title: 'Setting Up Integrations',
    description: 'Connect ProjectFlow with your favorite tools and services',
    category: 'integrations',
    content: 'Integration setup guide...',
    views: 432,
    helpful: 18,
    lastUpdated: new Date('2024-01-03'),
    type: 'tutorial'
  }
];

const supportTickets: SupportTicket[] = [
  {
    id: 'TICK-001',
    title: 'Unable to add team members to project',
    description: 'When I try to add team members to my project, the invite button is not working.',
    status: 'in-progress',
    priority: 'high',
    category: 'team-management',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-21'),
    assignee: 'Support Team',
    responses: 3
  },
  {
    id: 'TICK-002',
    title: 'Billing discrepancy in January invoice',
    description: 'The charges on my January invoice don\'t match my plan. Please review.',
    status: 'resolved',
    priority: 'medium',
    category: 'billing',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-19'),
    assignee: 'Billing Team',
    responses: 5
  },
  {
    id: 'TICK-003',
    title: 'Feature request: Dark mode',
    description: 'Would love to have a dark mode option for the interface.',
    status: 'open',
    priority: 'low',
    category: 'feature-request',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    responses: 1
  }
];

export function Help({ 
  projects, 
  tasks, 
  teamMembers, 
  onCreateProject, 
  onCreateTask, 
  onCreateMember,
  onViewAnalytics, 
  onViewReports,
  onNavigate 
}: HelpProps) {
  const [activeTab, setActiveTab] = useState("documentation");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    category: 'general',
    priority: 'medium'
  });

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'tutorial': return <Play className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleSubmitTicket = () => {
    if (!ticketForm.title || !ticketForm.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Support ticket submitted successfully!");
    setTicketForm({ title: '', description: '', category: 'general', priority: 'medium' });
  };

  const handleRateArticle = (articleId: string, helpful: boolean) => {
    toast.success(helpful ? "Thanks for your feedback!" : "Feedback recorded");
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwJTIwc3VwcG9ydCUyMGN1c3RvbWVyJTIwc2VydmljZXxlbnwxfHx8fDE3NTU1NzkwODJ8MA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Help and support"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
            <p className="text-xl opacity-90 mb-6">
              Get the help you need to make the most of ProjectFlow
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for help articles, guides, and tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-gray-900 bg-white/90 backdrop-blur-sm border-0"
              />
            </div>
          </div>
        </div>
      </div>

      <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <SimpleTabsList className="grid w-full grid-cols-4">
          <SimpleTabsTrigger value="documentation" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            Documentation
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Support
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contact
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="feedback" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Feedback
          </SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="documentation" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Documentation</h2>
              <p className="text-muted-foreground">Browse our comprehensive guides and tutorials</p>
            </div>
            <SimpleSelect
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <option value="all">All Categories</option>
              {helpCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </SimpleSelect>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {helpCategories.map((category) => {
              const Icon = category.icon;
              const articlesCount = helpArticles.filter(a => a.category === category.id).length;
              
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {articlesCount} article{articlesCount !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Articles List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {selectedCategory === 'all' ? 'All Articles' : 
               helpCategories.find(c => c.id === selectedCategory)?.name || 'Articles'}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(article.type)}
                        <Badge variant="outline" className="text-xs">
                          {article.type}
                        </Badge>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {helpCategories.find(c => c.id === article.category)?.name}
                      </Badge>
                    </div>
                    
                    <h4 className="font-semibold mb-2">{article.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{article.views} views</span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {article.helpful}
                        </span>
                      </div>
                      <span>Updated {article.lastUpdated.toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Read More
                      </Button>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRateArticle(article.id, true)}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRateArticle(article.id, false)}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submit New Ticket */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Support Request</CardTitle>
                <CardDescription>
                  Describe your issue and we'll help you resolve it quickly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ticket-title">Subject</Label>
                  <Input
                    id="ticket-title"
                    placeholder="Brief description of your issue"
                    value={ticketForm.title}
                    onChange={(e) => setTicketForm({...ticketForm, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticket-category">Category</Label>
                    <SimpleSelect
                      value={ticketForm.category}
                      onValueChange={(value) => setTicketForm({...ticketForm, category: value})}
                    >
                      <option value="general">General Question</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing & Account</option>
                      <option value="feature-request">Feature Request</option>
                      <option value="bug-report">Bug Report</option>
                    </SimpleSelect>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ticket-priority">Priority</Label>
                    <SimpleSelect
                      value={ticketForm.priority}
                      onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </SimpleSelect>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ticket-description">Description</Label>
                  <Textarea
                    id="ticket-description"
                    placeholder="Please provide as much detail as possible about your issue..."
                    rows={6}
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                  />
                </div>
                
                <Button onClick={handleSubmitTicket} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </CardContent>
            </Card>

            {/* Existing Tickets */}
            <Card>
              <CardHeader>
                <CardTitle>Your Support Tickets</CardTitle>
                <CardDescription>
                  Track the status of your submitted requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{ticket.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {ticket.description.substring(0, 100)}...
                          </p>
                        </div>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>{ticket.id}</span>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <span>{ticket.responses} responses</span>
                        </div>
                        <span>Updated {ticket.updatedAt.toLocaleDateString()}</span>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Get help via email. We typically respond within 24 hours.
                </p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>General Support:</strong><br />
                    support@projectflow.com
                  </div>
                  <div className="text-sm">
                    <strong>Billing Issues:</strong><br />
                    billing@projectflow.com
                  </div>
                  <div className="text-sm">
                    <strong>Technical Issues:</strong><br />
                    tech@projectflow.com
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Chat with our support team in real-time.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Available: Mon-Fri, 9AM-6PM PST</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average response time: 2-3 minutes
                  </div>
                </div>
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Call us for urgent issues or complex problems.
                </p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>US & Canada:</strong><br />
                    +1 (555) 123-4567
                  </div>
                  <div className="text-sm">
                    <strong>International:</strong><br />
                    +1 (555) 123-4568
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Available for Enterprise customers only
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support Hours & Response Times</CardTitle>
              <CardDescription>When you can expect to hear from us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Email Support</h4>
                  <p className="text-sm text-muted-foreground">
                    24 hours response time<br />
                    Monday - Friday
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">
                    2-3 minutes response time<br />
                    9 AM - 6 PM PST
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Phone Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Immediate assistance<br />
                    Enterprise customers only
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Requests</CardTitle>
                <CardDescription>
                  Suggest new features or improvements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feature-title">Feature Title</Label>
                  <Input
                    id="feature-title"
                    placeholder="What feature would you like to see?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feature-description">Description</Label>
                  <Textarea
                    id="feature-description"
                    placeholder="Describe how this feature would help you..."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feature-priority">How important is this to you?</Label>
                  <SimpleSelect>
                    <option value="nice-to-have">Nice to have</option>
                    <option value="important">Important</option>
                    <option value="critical">Critical for my workflow</option>
                  </SimpleSelect>
                </div>
                
                <Button className="w-full">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Submit Feature Request
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General Feedback</CardTitle>
                <CardDescription>
                  Share your thoughts about ProjectFlow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>How would you rate your overall experience?</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button key={rating} variant="outline" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback-category">Category</Label>
                  <SimpleSelect>
                    <option value="general">General feedback</option>
                    <option value="ui-ux">User interface & experience</option>
                    <option value="performance">Performance</option>
                    <option value="features">Features & functionality</option>
                    <option value="support">Customer support</option>
                  </SimpleSelect>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback-message">Your feedback</Label>
                  <Textarea
                    id="feedback-message"
                    placeholder="Tell us what you think..."
                    rows={4}
                  />
                </div>
                
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Community Resources</CardTitle>
              <CardDescription>
                Connect with other ProjectFlow users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="p-4 h-auto flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">Community Forum</div>
                    <div className="text-xs text-muted-foreground">
                      Ask questions and share tips
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="p-4 h-auto flex-col gap-2">
                  <Video className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">Video Tutorials</div>
                    <div className="text-xs text-muted-foreground">
                      Learn with step-by-step guides
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="p-4 h-auto flex-col gap-2">
                  <ExternalLink className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">API Documentation</div>
                    <div className="text-xs text-muted-foreground">
                      For developers and integrations
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}