import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { SimpleDropdown } from "./components/ui/simple-dropdown";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { toast } from "sonner";
import { 
  BarChart3, 
  Calendar, 
  DollarSign, 
  FolderPlus, 
  Home, 
  Menu, 
  PieChart, 
  Users,
  Bell,
  Search,
  Settings,
  LogOut,
  Plus,
  CreditCard,
  Building2,
  HelpCircle,
  Crown,
  Shield,
  UserCheck,
  ShoppingCart,
  CheckSquare,
  FileText,
  Database,
  Link,
  Eye,
  X,
  Calculator
} from "lucide-react";

// Components
import { LoginPage } from "./components/LoginPage";
import { ProjectOverview } from "./components/ProjectOverview";
import { ProjectCreation } from "./components/ProjectCreation";
import { TaskPhaseCards } from "./components/TaskPhaseCards";
import { ResourceAllocation } from "./components/ResourceAllocation";
import { BudgetComparison } from "./components/BudgetComparison";
import { GanttTimeline } from "./components/GanttTimeline";
import { KPIDashboard } from "./components/KPIDashboard";
import { Settings as SettingsPage } from "./components/Settings";
import { Billing } from "./components/Billing";
import { Organization } from "./components/Organization";
import { Help } from "./components/Help";

// Enterprise Admin Components
import { AdminDashboard } from "./components/enterprise/AdminDashboard";
import { OnboardingManagement } from "./components/enterprise/OnboardingManagement";
import { BOQManagement } from "./components/enterprise/BOQManagement";
import { PurchaseManagement } from "./components/enterprise/PurchaseManagement";
import { ApprovalSystem } from "./components/enterprise/ApprovalSystem";
import { TemplateManager } from "./components/enterprise/TemplateManager";
import { AdminSettings } from "./components/enterprise/AdminSettings";
import { LinkGenerator } from "./components/enterprise/LinkGenerator";

// Onboarding Component
import { OnboardingLanding } from "./components/OnboardingLanding";

// Modals
import { CreateProjectModal } from "./components/modals/CreateProjectModal";
import { CreateTaskModal } from "./components/modals/CreateTaskModal";
import { CreateMemberModal } from "./components/modals/CreateMemberModal";
import { NotificationsPanel } from "./components/modals/NotificationsPanel";
import { SearchModal } from "./components/modals/SearchModal";
import { ImportTemplateModal } from "./components/modals/ImportTemplateModal";
import { SendInvitationModal } from "./components/modals/SendInvitationModal";
import { PurchaseRequestModal } from "./components/modals/PurchaseRequestModal";
import { PurchaseOrderModal } from "./components/modals/PurchaseOrderModal";
import { CreateEmailTemplateModal } from "./components/modals/CreateEmailTemplateModal";
import { CreateDocumentTemplateModal } from "./components/modals/CreateDocumentTemplateModal";

// Data
import { 
  Project, 
  Task, 
  TeamMember, 
  Notification,
  initialProjects, 
  initialTasks, 
  initialTeamMembers, 
  initialNotifications 
} from "./components/data/dataStore";

// Template Data
import { TaskTemplate } from "./components/data/templateStore";

// Authentication state
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

// Settings interface
interface AppSettings {
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
}

const defaultSettings: AppSettings = {
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
};

const baseNavigationItems = [
  { id: "overview", label: "Project Overview", icon: Home },
  { id: "create", label: "Create Project", icon: FolderPlus },
  { id: "tasks", label: "Tasks & Phases", icon: Calendar },
  { id: "timeline", label: "Timeline & Gantt", icon: BarChart3 },
  { id: "kpi", label: "KPI & Reports", icon: PieChart },
];

const optionalNavigationItems = [
  { id: "resources", label: "Resource Allocation", icon: Users, setting: "enableResourceAllocation" },
  { id: "budget", label: "Budget Analysis", icon: DollarSign, setting: "enableBudgetAnalysis" },
];

const enterpriseAdminItems = [
  { id: "admin-dashboard", label: "Admin Dashboard", icon: Shield },
  { id: "onboarding", label: "Onboarding Management", icon: UserCheck },
  { id: "link-generator", label: "Link Generator", icon: Link },
  { id: "boq", label: "BOQ Management", icon: Calculator },
  { id: "purchase", label: "Purchase Management", icon: ShoppingCart },
  { id: "approvals", label: "Approval System", icon: CheckSquare },
  { id: "templates", label: "Template Manager", icon: FileText },
  { id: "admin-settings", label: "Admin Settings", icon: Database },
];

const organizationItems = [
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "help", label: "Help & Support", icon: HelpCircle },
];

// Function to detect onboarding URL patterns
function detectOnboardingURL(): {
  isOnboarding: boolean;
  params: {
    uid?: string;
    type?: 'customer' | 'vendor';
    inviter?: string;
    company?: string;
  };
} {
  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const fullUrl = window.location.href;
  
  console.log('🔍 Detecting onboarding URL...');
  console.log('Current URL:', fullUrl);
  console.log('Pathname:', pathname);
  console.log('Search params:', Object.fromEntries(urlParams.entries()));

  // Method 1: Direct query parameter detection (RECOMMENDED - most reliable)
  const uid = urlParams.get('uid');
  const type = urlParams.get('type');
  
  if (uid && (type === 'customer' || type === 'vendor')) {
    console.log('✅ Onboarding detected via query parameters (METHOD 1)');
    return {
      isOnboarding: true,
      params: {
        uid,
        type,
        inviter: urlParams.get('inviter') || 'Sarah Chen',
        company: urlParams.get('company') || 'ProjectFlow Solutions'
      }
    };
  }

  // Method 2: Demo mode detection
  const demoMode = urlParams.get('demo');
  if (demoMode === 'onboarding') {
    console.log('✅ Onboarding detected via demo mode (METHOD 2)');
    return {
      isOnboarding: true,
      params: {
        uid: '9614c046-257c-4217-9b17-19f9ab437db3',
        type: urlParams.get('type') as 'customer' | 'vendor' || 'customer',
        inviter: 'Sarah Chen',
        company: 'ProjectFlow Solutions'
      }
    };
  }

  // Method 3: Path-based detection (for traditional URLs)
  if (uid && (pathname.includes('/user/partnerview') || pathname.includes('/user/customerview'))) {
    console.log('✅ Onboarding detected via path-based URL (METHOD 3)');
    return {
      isOnboarding: true,
      params: {
        uid,
        type: pathname.includes('partnerview') ? 'vendor' : 'customer',
        inviter: urlParams.get('inviter') || 'Sarah Chen',
        company: urlParams.get('company') || 'ProjectFlow Solutions'
      }
    };
  }

  // Method 4: Full URL pattern detection (fallback for SPA environments)
  if (uid && (fullUrl.includes('/user/partnerview') || fullUrl.includes('/user/customerview'))) {
    console.log('✅ Onboarding detected via full URL pattern (METHOD 4)');
    return {
      isOnboarding: true,
      params: {
        uid,
        type: fullUrl.includes('partnerview') ? 'vendor' : 'customer',
        inviter: urlParams.get('inviter') || 'Sarah Chen',
        company: urlParams.get('company') || 'ProjectFlow Solutions'
      }
    };
  }

  // Method 5: View parameter detection (alternative method)
  const view = urlParams.get('view');
  if (uid && (view === 'customerview' || view === 'partnerview')) {
    console.log('✅ Onboarding detected via view parameter (METHOD 5)');
    return {
      isOnboarding: true,
      params: {
        uid,
        type: view === 'partnerview' ? 'vendor' : 'customer',
        inviter: urlParams.get('inviter') || 'Sarah Chen',
        company: urlParams.get('company') || 'ProjectFlow Solutions'
      }
    };
  }

  // Method 6: Detect any URL with "onboard" in it (very broad fallback)
  if (fullUrl.toLowerCase().includes('onboard') && uid) {
    console.log('✅ Onboarding detected via broad pattern (METHOD 6)');
    // Try to determine type from any available hints
    let detectedType: 'customer' | 'vendor' = 'customer';
    if (fullUrl.toLowerCase().includes('vendor') || fullUrl.toLowerCase().includes('partner')) {
      detectedType = 'vendor';
    }
    
    return {
      isOnboarding: true,
      params: {
        uid,
        type: type as 'customer' | 'vendor' || detectedType,
        inviter: urlParams.get('inviter') || 'Sarah Chen',
        company: urlParams.get('company') || 'ProjectFlow Solutions'
      }
    };
  }

  console.log('❌ No onboarding URL pattern detected');
  return {
    isOnboarding: false,
    params: {}
  };
}

export default function App() {
  // Authentication state
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('projectflow-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Navigation state
  const [activeView, setActiveView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check for onboarding URL parameters
  const [isOnboardingMode, setIsOnboardingMode] = useState(false);
  const [onboardingParams, setOnboardingParams] = useState<{
    uid?: string;
    type?: 'customer' | 'vendor';
    inviter?: string;
    company?: string;
  }>({});

  // Manual onboarding trigger state
  const [manualOnboardingMode, setManualOnboardingMode] = useState(false);
  const [manualOnboardingType, setManualOnboardingType] = useState<'customer' | 'vendor'>('customer');

  // Settings state
  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem('projectflow-settings');
    return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
  });

  // Data state
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  // Modal state
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showCreateMember, setShowCreateMember] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showImportTemplate, setShowImportTemplate] = useState(false);
  const [showSendInvitation, setShowSendInvitation] = useState(false);
  const [showPurchaseRequest, setShowPurchaseRequest] = useState(false);
  const [showPurchaseOrder, setShowPurchaseOrder] = useState(false);
  const [showCreateEmailTemplate, setShowCreateEmailTemplate] = useState(false);
  const [showCreateDocumentTemplate, setShowCreateDocumentTemplate] = useState(false);

  // Authentication functions
  const handleLogin = async (credentials: { email: string; password: string; rememberMe: boolean }) => {
    setIsLoggingIn(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication - in real app, this would be an API call
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Sarah Chen',
        role: 'Project Manager',
        avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=200'
      };
      
      setUser(mockUser);
      
      // Save to localStorage if remember me is checked
      if (credentials.rememberMe) {
        localStorage.setItem('projectflow-user', JSON.stringify(mockUser));
      }
      
      toast.success(`Welcome back, ${mockUser.name}!`);
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('projectflow-user');
    toast.success('You have been signed out successfully');
  };

  // Check URL parameters for onboarding - runs on every URL change
  useEffect(() => {
    const checkOnboardingURL = () => {
      const detection = detectOnboardingURL();
      
      if (detection.isOnboarding) {
        console.log('🎯 Activating onboarding mode with params:', detection.params);
        setIsOnboardingMode(true);
        setOnboardingParams(detection.params);
      } else {
        setIsOnboardingMode(false);
        setOnboardingParams({});
      }
    };

    // Check on initial load
    checkOnboardingURL();

    // Also check when the URL changes (for SPA navigation)
    const handlePopState = () => {
      checkOnboardingURL();
    };

    window.addEventListener('popstate', handlePopState);
    
    // Also check when hash changes (additional fallback)
    const handleHashChange = () => {
      checkOnboardingURL();
    };
    
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Persist settings to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('projectflow-settings', JSON.stringify(settings));
  }, [settings]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            setShowSearch(true);
            break;
          case 'n':
            e.preventDefault();
            setShowCreateProject(true);
            break;
          case 't':
            e.preventDefault();
            setShowCreateTask(true);
            break;
          case 'm':
            e.preventDefault();
            setShowCreateMember(true);
            break;
          case 'i':
            e.preventDefault();
            setShowImportTemplate(true);
            break;
          case 'e':
            e.preventDefault();
            setShowSendInvitation(true);
            break;
          case 'p':
            e.preventDefault();
            setShowPurchaseRequest(true);
            break;
          case 'o':
            e.preventDefault();
            setShowPurchaseOrder(true);
            break;
          case 'r':
            e.preventDefault();
            setShowCreateEmailTemplate(true);
            break;
          case 'd':
            e.preventDefault();
            setShowCreateDocumentTemplate(true);
            break;
          case ',':
            e.preventDefault();
            setActiveView("settings");
            break;
          case 'b':
            e.preventDefault();
            setActiveView("billing");
            break;
          case 'h':
            e.preventDefault();
            setActiveView("help");
            break;
          case 'l':
            e.preventDefault();
            if (settings.enableEnterpriseAdmin) {
              setActiveView("link-generator");
            }
            break;
          case 'u':
            e.preventDefault();
            handlePreviewOnboarding('customer');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [settings.enableEnterpriseAdmin]);

  // Handle manual onboarding preview
  const handlePreviewOnboarding = (type: 'customer' | 'vendor' = 'customer') => {
    setManualOnboardingType(type);
    setManualOnboardingMode(true);
    toast.success(`Opening ${type} onboarding preview`, {
      description: "Click the close button to return to the main app",
      duration: 3000
    });
    console.log('🚀 Manual onboarding mode activated:', type);
  };

  const handleCloseManualOnboarding = () => {
    setManualOnboardingMode(false);
    toast.info("Returned to main application");
    console.log('📱 Manual onboarding mode closed');
  };

  // Handle settings update
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    toast.success("Settings updated successfully!");
  };

  // Generate dynamic navigation items based on settings
  const getNavigationItems = () => {
    const enabledOptionalItems = optionalNavigationItems.filter(item => 
      settings[item.setting as keyof AppSettings] === true
    );

    // Insert optional items at specific positions
    const items = [...baseNavigationItems];
    
    // Insert resources after tasks (index 2)
    const resourceItem = enabledOptionalItems.find(item => item.id === "resources");
    if (resourceItem) {
      items.splice(3, 0, resourceItem);
    }
    
    // Insert budget after resources or tasks
    const budgetItem = enabledOptionalItems.find(item => item.id === "budget");
    if (budgetItem) {
      const insertIndex = resourceItem ? 4 : 3;
      items.splice(insertIndex, 0, budgetItem);
    }

    return items;
  };

  // Handle project creation
  const handleCreateProject = (projectData: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setProjects(prev => [newProject, ...prev]);
    
    // Add success notification
    const notification: Notification = {
      id: Date.now().toString(),
      title: "Project Created",
      message: `${projectData.name} has been successfully created`,
      type: "success",
      read: false,
      createdAt: new Date(),
      actionUrl: `/projects/${newProject.id}`
    };
    setNotifications(prev => [notification, ...prev]);
    
    toast.success("Project created successfully!");
  };

  // Handle task creation
  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTasks(prev => [newTask, ...prev]);
    
    // Add success notification
    const project = projects.find(p => p.id === taskData.projectId);
    const notification: Notification = {
      id: Date.now().toString(),
      title: "Task Created",
      message: `${taskData.title} has been added to ${project?.name || 'project'}`,
      type: "success",
      read: false,
      createdAt: new Date(),
      actionUrl: `/tasks/${newTask.id}`
    };
    setNotifications(prev => [notification, ...prev]);
    
    toast.success("Task created successfully!");
  };

  // Handle template import
  const handleImportTasks = (templateTasks: TaskTemplate[], selectedProjectId: string) => {
    const project = projects.find(p => p.id === selectedProjectId);
    if (!project) {
      toast.error("Selected project not found");
      return;
    }

    // Convert template tasks to regular tasks
    const newTasks: Task[] = templateTasks.map((templateTask, index) => ({
      id: `${Date.now()}-${index}`,
      title: templateTask.title,
      description: templateTask.description,
      status: "pending" as const,
      priority: templateTask.priority,
      progress: 0,
      assignee: "Unassigned", // Can be updated later
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 1 week from now
      phase: templateTask.phase,
      projectId: selectedProjectId,
      timeSpent: "0h",
      estimatedTime: templateTask.estimatedTime,
      tags: templateTask.tags,
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      subtasks: templateTask.subtasks || []
    }));

    // Add all new tasks
    setTasks(prev => [...newTasks, ...prev]);

    // Create success notification
    const notification: Notification = {
      id: Date.now().toString(),
      title: "Tasks Imported Successfully",
      message: `${newTasks.length} tasks have been imported to ${project.name}`,
      type: "success",
      read: false,
      createdAt: new Date(),
      actionUrl: `/projects/${selectedProjectId}`
    };
    setNotifications(prev => [notification, ...prev]);

    toast.success(`Successfully imported ${newTasks.length} tasks to ${project.name}!`);
  };

  // Handle team member creation
  const handleCreateMember = (memberData: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...memberData,
      id: Date.now().toString(),
    };
    
    setTeamMembers(prev => [newMember, ...prev]);
    
    // Add success notification
    const notification: Notification = {
      id: Date.now().toString(),
      title: "Team Member Added",
      message: `${memberData.name} has been added to the team`,
      type: "success",
      read: false,
      createdAt: new Date(),
      actionUrl: `/team/${newMember.id}`
    };
    setNotifications(prev => [notification, ...prev]);
    
    toast.success("Team member added successfully!");
  };

  // Handle invitation sending - Updated to use query parameter format by default
  const handleSendInvitation = (invitationData: any) => {
    // Generate invitation URL based on type - using query parameter format for better SPA compatibility
    const baseUrl = window.location.origin;
    const invitationId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const invitationUrl = `${baseUrl}?uid=${invitationId}&type=${invitationData.type}&inviter=${encodeURIComponent(invitationData.inviterName || 'Sarah Chen')}&company=${encodeURIComponent('ProjectFlow Solutions')}`;
    
    // Add success notification for invitation
    const notification: Notification = {
      id: Date.now().toString(),
      title: "Invitation Sent",
      message: `Invitation sent to ${invitationData.fullName} (${invitationData.email})`,
      type: "success",
      read: false,
      createdAt: new Date(),
      actionUrl: `/onboarding`
    };
    setNotifications(prev => [notification, ...prev]);
    
    // Show the invitation URL in a toast (in a real app, this would be sent via email)
    toast.success(`${invitationData.type === 'customer' ? 'Customer' : 'Vendor'} invitation sent successfully!`, {
      description: `Invitation URL: ${invitationUrl}`,
      duration: 10000
    });
    
    console.log(`Generated invitation URL: ${invitationUrl}`);
  };

  // Handle purchase request creation
  const handleCreatePurchaseRequest = (requestData: any) => {
    // Add success notification for purchase request
    const notification: Notification = {
      id: Date.now().toString(),
      title: "Purchase Request Created",
      message: `Purchase request ${requestData.id} has been submitted for approval`,
      type: "success",
      read: false,
      createdAt: new Date(),
      actionUrl: `/purchase/${requestData.id}`
    };
    setNotifications(prev => [notification, ...prev]);
    
    toast.success("Purchase request created successfully!");
  };

  // Handle purchase order creation
  const handleCreatePurchaseOrder = (orderData: any) => {
    // Add success notification for purchase order
    const notification: Notification = {
      id: Date.now().toString(),
      title: "Purchase Order Created",
      message: `Purchase order ${orderData.poNumber} has been created for ${orderData.vendor.name}`,
      type: "success",
      read: false,
      createdAt: new Date(),
      actionUrl: `/purchase-orders/${orderData.poNumber}`
    };
    setNotifications(prev => [notification, ...prev]);
    
    toast.success("Purchase order created successfully!");
  };

  // Handle template creation
  const handleCreateEmailTemplate = (templateData: any) => {
    // Add success notification for email template
    const notification: Notification = {
      id: Date.now().toString(),
      title: "Email Template Created",
      message: `Email template "${templateData.name}" has been created successfully`,
      type: "success",
      read: false,
      createdAt: new Date(),
      actionUrl: `/templates/${templateData.id}`
    };
    setNotifications(prev => [notification, ...prev]);
    
    toast.success("Email template created successfully!");
  };

  const handleCreateDocumentTemplate = (templateData: any) => {
    // Add success notification for document template
    const notification: Notification = {
      id: Date.now().toString(),
      title: "Document Template Created",
      message: `Document template "${templateData.name}" has been created successfully`,
      type: "success",
      read: false,
      createdAt: new Date(),
      actionUrl: `/templates/${templateData.id}`
    };
    setNotifications(prev => [notification, ...prev]);
    
    toast.success("Document template created successfully!");
  };

  // Handle notification actions
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Handle navigation
  const handleNavigate = (view: string, id?: string) => {
    // Check if the view is accessible based on settings
    if (view === "resources" && !settings.enableResourceAllocation) {
      toast.error("Resource Allocation is disabled. Enable it in Settings.");
      setActiveView("settings");
      return;
    }
    
    if (view === "budget" && !settings.enableBudgetAnalysis) {
      toast.error("Budget Analysis is disabled. Enable it in Settings.");
      setActiveView("settings");
      return;
    }

    // Check enterprise admin access
    const enterpriseViews = enterpriseAdminItems.map(item => item.id);
    if (enterpriseViews.includes(view) && !settings.enableEnterpriseAdmin) {
      toast.error("Enterprise Admin features are disabled. Enable them in Settings.");
      setActiveView("settings");
      return;
    }
    
    setActiveView(view);
  };

  // Handle quick actions
  const handleQuickCreateProject = () => {
    setShowCreateProject(true);
  };

  const handleQuickCreateTask = () => {
    setShowCreateTask(true);
  };

  const handleQuickCreateMember = () => {
    setShowCreateMember(true);
  };

  const handleImportTemplate = () => {
    setShowImportTemplate(true);
  };

  const handleSendInvitationModal = () => {
    setShowSendInvitation(true);
  };

  const handlePurchaseRequestModal = () => {
    setShowPurchaseRequest(true);
  };

  const handlePurchaseOrderModal = () => {
    setShowPurchaseOrder(true);
  };

  const handleCreateEmailTemplateModal = () => {
    setShowCreateEmailTemplate(true);
  };

  const handleCreateDocumentTemplateModal = () => {
    setShowCreateDocumentTemplate(true);
  };

  const handleViewAnalytics = () => {
    setActiveView("kpi");
    toast.info("Navigating to analytics dashboard");
  };

  const handleViewReports = () => {
    setActiveView("kpi");
    toast.info("Generating comprehensive report");
  };

  // Handle settings navigation
  const handleOpenSettings = () => {
    setActiveView("settings");
  };

  const navigationItems = getNavigationItems();

  const renderActiveView = () => {
    const viewProps = {
      projects,
      tasks,
      teamMembers,
      onCreateProject: handleQuickCreateProject,
      onCreateTask: handleQuickCreateTask,
      onCreateMember: handleQuickCreateMember,
      onImportTemplate: handleImportTemplate,
      onSendInvitation: handleSendInvitationModal,
      onCreatePurchaseRequest: handlePurchaseRequestModal,
      onCreatePurchaseOrder: handlePurchaseOrderModal,
      onCreateEmailTemplate: handleCreateEmailTemplateModal,
      onCreateDocumentTemplate: handleCreateDocumentTemplateModal,
      onViewAnalytics: handleViewAnalytics,
      onViewReports: handleViewReports,
      onNavigate: handleNavigate
    };

    switch (activeView) {
      case "overview":
        return <ProjectOverview {...viewProps} />;
      case "create":
        return <ProjectCreation {...viewProps} />;
      case "tasks":
        return <TaskPhaseCards {...viewProps} />;
      case "resources":
        if (!settings.enableResourceAllocation) {
          setActiveView("settings");
          return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
        }
        return <ResourceAllocation {...viewProps} />;
      case "budget":
        if (!settings.enableBudgetAnalysis) {
          setActiveView("settings");
          return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
        }
        return <BudgetComparison {...viewProps} />;
      case "timeline":
        return <GanttTimeline {...viewProps} />;
      case "kpi":
        return <KPIDashboard {...viewProps} />;
      case "settings":
        return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
      case "billing":
        return <Billing {...viewProps} />;
      case "organization":
        return <Organization {...viewProps} />;
      case "help":
        return <Help {...viewProps} />;
      
      // Enterprise Admin Views
      case "admin-dashboard":
        if (!settings.enableEnterpriseAdmin) {
          setActiveView("settings");
          return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
        }
        return <AdminDashboard {...viewProps} />;
      case "onboarding":
        if (!settings.enableEnterpriseAdmin) {
          setActiveView("settings");
          return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
        }
        return <OnboardingManagement {...viewProps} />;
      case "link-generator":
        if (!settings.enableEnterpriseAdmin) {
          setActiveView("settings");
          return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
        }
        return <LinkGenerator {...viewProps} />;
      case "boq":
        if (!settings.enableEnterpriseAdmin) {
          setActiveView("settings");
          return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
        }
        return <BOQManagement {...viewProps} />;
      case "purchase":
        if (!settings.enableEnterpriseAdmin) {
          setActiveView("settings");  
          return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
        }
        return <PurchaseManagement {...viewProps} />;
      case "approvals":
        if (!settings.enableEnterpriseAdmin) {
          setActiveView("settings");
          return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
        }
        return <ApprovalSystem {...viewProps} />;
      case "templates":
        if (!settings.enableEnterpriseAdmin) {
          setActiveView("settings");
          return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
        }
        return <TemplateManager {...viewProps} />;
      case "admin-settings":
        if (!settings.enableEnterpriseAdmin) {
          setActiveView("settings");
          return <SettingsPage {...viewProps} settings={settings} onUpdateSettings={handleUpdateSettings} />;
        }
        return <AdminSettings {...viewProps} />;
      
      default:
        return <ProjectOverview {...viewProps} />;
    }
  };

  const getPageTitle = () => {
    if (activeView === "settings") return "Settings";
    if (activeView === "billing") return "Billing & Plans";
    if (activeView === "organization") return "Organization";
    if (activeView === "help") return "Help & Support";
    
    // Check enterprise admin items
    const enterpriseItem = enterpriseAdminItems.find(item => item.id === activeView);
    if (enterpriseItem) return enterpriseItem.label;
    
    const item = navigationItems.find(item => item.id === activeView);
    return item?.label || "ProjectFlow";
  };

  const getPageDescription = () => {
    switch (activeView) {
      case "settings": return "Customize your ProjectFlow experience";
      case "billing": return "Manage your subscription and billing preferences";
      case "organization": return "Manage your team, workspaces, and organization settings";
      case "help": return "Get help and support for using ProjectFlow";
      case "admin-dashboard": return "Enterprise administration and system overview";
      case "onboarding": return "Manage customer and vendor onboarding processes";
      case "link-generator": return "Generate onboarding links for customers and vendors";
      case "boq": return "Manage Bills of Quantity for projects and cost estimation";
      case "purchase": return "Handle purchase requests and order management";
      case "approvals": return "Review and process approval workflows";
      case "templates": return "Manage document and email templates";
      case "admin-settings": return "Configure system settings and integrations";
      default: return new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // CHECK FOR ONBOARDING MODE FIRST
  if (isOnboardingMode || manualOnboardingMode) {
    const params = isOnboardingMode ? onboardingParams : {
      uid: 'preview-' + Date.now(),
      type: manualOnboardingType,
      inviter: 'Sarah Chen',
      company: 'ProjectFlow Solutions'
    };

    console.log('🚀 Rendering onboarding landing page with params:', params);
    
    return (
      <div className="relative">
        {/* Close button for manual onboarding mode */}
        {manualOnboardingMode && (
          <Button
            onClick={handleCloseManualOnboarding}
            variant="ghost"
            size="icon"
            className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white shadow-lg"
            title="Close Preview"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        
        <OnboardingLanding
          invitationId={params.uid}
          invitationType={params.type}
          inviterName={params.inviter}
          companyName={params.company}
        />
      </div>
    );
  }

  // CHECK FOR AUTHENTICATION
  if (!user) {
    return <LoginPage onLogin={handleLogin} isLoading={isLoggingIn} />;
  }

  // MAIN APP RENDER
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 border-r border-border bg-card flex flex-col`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 flex-shrink-0"
            >
              <Menu className="h-4 w-4" />
            </Button>
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PF</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ProjectFlow
                  </h1>
                  <p className="text-xs text-muted-foreground">Project Management</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {sidebarOpen && (
          <div className="p-4 space-y-2">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleQuickCreateProject}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full"
                onClick={handleQuickCreateTask}
              >
                <Plus className="h-3 w-3 mr-1" />
                Task
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full"
                onClick={handleQuickCreateMember}
              >
                <Plus className="h-3 w-3 mr-1" />
                Member
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          <nav className="space-y-2">
            {sidebarOpen && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Workspace</p>}
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${!sidebarOpen && 'px-2'} ${
                    isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''
                  }`}
                  onClick={() => setActiveView(item.id)}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              );
            })}
          </nav>

          {/* Enterprise Admin Section */}
          {settings.enableEnterpriseAdmin && (
            <nav className="space-y-2">
              {sidebarOpen && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Enterprise Admin</p>}
              {enterpriseAdminItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${!sidebarOpen && 'px-2'} ${
                      isActive ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' : ''
                    }`}
                    onClick={() => setActiveView(item.id)}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Button>
                );
              })}
            </nav>
          )}

          {/* Organization Section */}
          <nav className="space-y-2">
            {sidebarOpen && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Organization</p>}
            {organizationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${!sidebarOpen && 'px-2'} ${
                    isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''
                  }`}
                  onClick={() => setActiveView(item.id)}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                  {item.id === 'billing' && sidebarOpen && (
                    <Crown className="h-3 w-3 ml-auto text-yellow-500" />
                  )}
                </Button>
              );
            })}
          </nav>
        </div>

        {/* User Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.role}</p>
              </div>
            </div>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`w-full justify-start gap-2 ${activeView === 'settings' ? 'bg-gray-100' : ''}`}
                onClick={handleOpenSettings}
              >
                <Settings className="h-3 w-3" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-3 w-3" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50/50 flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-sm text-muted-foreground">
                {getPageDescription()}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Preview Onboarding Button */}
              <SimpleDropdown
                trigger={
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 border-green-200"
                    title="Preview Onboarding (Cmd+U)"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Onboarding
                  </Button>
                }
                items={[
                  { 
                    label: "Customer Onboarding", 
                    onClick: () => handlePreviewOnboarding('customer'),
                    icon: UserCheck
                  },
                  { 
                    label: "Vendor Onboarding", 
                    onClick: () => handlePreviewOnboarding('vendor'),
                    icon: Building2
                  }
                ]}
              />

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSearch(true)}
                title="Search (Cmd+K)"
              >
                <Search className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium p-0 min-w-[20px]">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </Badge>
                )}
              </Button>
              
              <SimpleDropdown
                trigger={
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                }
                items={[
                  { label: "Settings", onClick: handleOpenSettings, icon: Settings },
                  { label: "Sign Out", onClick: handleLogout, icon: LogOut }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {renderActiveView()}
        </div>

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full opacity-30 blur-3xl" />
        </div>
      </main>

      {/* Modals */}
      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        onCreateProject={handleCreateProject}
      />
      
      <CreateTaskModal
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onCreateTask={handleCreateTask}
        projects={projects}
        teamMembers={teamMembers}
      />
      
      <CreateMemberModal
        isOpen={showCreateMember}
        onClose={() => setShowCreateMember(false)}
        onCreateMember={handleCreateMember}
      />

      <ImportTemplateModal
        isOpen={showImportTemplate}
        onClose={() => setShowImportTemplate(false)}
        onImportTasks={handleImportTasks}
        projects={projects}
      />

      <SendInvitationModal
        isOpen={showSendInvitation}
        onClose={() => setShowSendInvitation(false)}
        onSendInvitation={handleSendInvitation}
      />

      <PurchaseRequestModal
        isOpen={showPurchaseRequest}
        onClose={() => setShowPurchaseRequest(false)}
        onCreateRequest={handleCreatePurchaseRequest}
      />

      <PurchaseOrderModal
        isOpen={showPurchaseOrder}
        onClose={() => setShowPurchaseOrder(false)}
        onCreateOrder={handleCreatePurchaseOrder}
      />

      <CreateEmailTemplateModal
        isOpen={showCreateEmailTemplate}
        onClose={() => setShowCreateEmailTemplate(false)}
        onCreateTemplate={handleCreateEmailTemplate}
      />

      <CreateDocumentTemplateModal
        isOpen={showCreateDocumentTemplate}
        onClose={() => setShowCreateDocumentTemplate(false)}
        onCreateTemplate={handleCreateDocumentTemplate}
      />
      
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkNotificationAsRead}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onDeleteNotification={handleDeleteNotification}
        onNavigate={handleNavigate}
      />
      
      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        projects={projects}
        tasks={tasks}
        teamMembers={teamMembers}
        onNavigate={handleNavigate}
      />
    </div>
  );
}