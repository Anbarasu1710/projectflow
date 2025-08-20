import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";
import { 
  CheckCircle2,
  ArrowRight,
  Building2,
  Users,
  Shield,
  Zap,
  Globe,
  Star,
  Clock,
  Mail,
  Phone,
  MapPin,
  User,
  Briefcase,
  CreditCard,
  FileText,
  Settings,
  Rocket,
  Heart,
  Award,
  Target,
  TrendingUp,
  Handshake,
  Calculator,
  Plus,
  Trash2,
  Edit,
  Upload,
  Download,
  DollarSign,
  Package,
  AlertCircle
} from "lucide-react";

interface OnboardingLandingProps {
  invitationId?: string;
  invitationType?: 'customer' | 'vendor';
  inviterName?: string;
  companyName?: string;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
}

interface BOQItem {
  id: string;
  itemCode: string;
  description: string;
  category: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications: string;
  leadTime: string;
}

export function OnboardingLanding({ 
  invitationId = "9614c046-257c-4217-9b17-19f9ab437db3",
  invitationType = "customer",
  inviterName = "Sarah Chen",
  companyName = "ProjectFlow Solutions"
}: OnboardingLandingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    
    // Company Information
    organizationName: "",
    organizationSize: "",
    industry: "",
    website: "",
    address: "",
    
    // Additional Details
    primaryUse: "",
    expectedVolume: "",
    specialRequirements: "",

    // Vendor BOQ Information
    quotationNumber: "",
    validityPeriod: "30",
    paymentTerms: "Net 30",
    warrantyPeriod: "",
    additionalTerms: ""
  });

  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // BOQ Items state
  const [boqItems, setBOQItems] = useState<BOQItem[]>([
    {
      id: "1",
      itemCode: "ITEM-001",
      description: "",
      category: "Materials",
      unit: "pieces",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      specifications: "",
      leadTime: "2 weeks"
    }
  ]);

  // File uploads state
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const customerSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome",
      description: "Get started with ProjectFlow",
      icon: Heart,
      completed: false
    },
    {
      id: "personal",
      title: "Personal Info",
      description: "Tell us about yourself",
      icon: User,
      completed: false
    },
    {
      id: "company",
      title: "Company Details",
      description: "Your organization information",
      icon: Building2,
      completed: false
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Customize your experience",
      icon: Settings,
      completed: false
    },
    {
      id: "complete",
      title: "All Set!",
      description: "You're ready to go",
      icon: Rocket,
      completed: false
    }
  ];

  const vendorSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome Partner",
      description: "Join our vendor network",
      icon: Handshake,
      completed: false
    },
    {
      id: "personal",
      title: "Contact Info",
      description: "Primary contact details",
      icon: User,
      completed: false
    },
    {
      id: "business",
      title: "Business Profile",
      description: "Your company capabilities",
      icon: Briefcase,
      completed: false
    },
    {
      id: "services",
      title: "Services & Terms",
      description: "What you offer",
      icon: FileText,
      completed: false
    },
    {
      id: "boq",
      title: "BOQ Submission",
      description: "Submit your quotation",
      icon: Calculator,
      completed: false
    },
    {
      id: "complete",
      title: "Partnership Active",
      description: "Welcome to our network",
      icon: Award,
      completed: false
    }
  ];

  const steps = invitationType === 'customer' ? customerSteps : vendorSteps;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBOQItemChange = (itemId: string, field: keyof BOQItem, value: any) => {
    setBOQItems(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          // Recalculate total price when quantity or unit price changes
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.totalPrice = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleAddBOQItem = () => {
    const newItem: BOQItem = {
      id: Date.now().toString(),
      itemCode: `ITEM-${String(boqItems.length + 1).padStart(3, '0')}`,
      description: "",
      category: "Materials",
      unit: "pieces",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      specifications: "",
      leadTime: "2 weeks"
    };
    setBOQItems(prev => [...prev, newItem]);
  };

  const handleRemoveBOQItem = (itemId: string) => {
    setBOQItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleFileUpload = (fileName: string) => {
    setUploadedFiles(prev => [...prev, fileName]);
    toast.success(`${fileName} uploaded successfully`);
  };

  const getTotalBOQValue = () => {
    return boqItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, steps[currentStep].id]);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCompleteOnboarding = () => {
    setCompletedSteps(prev => [...prev, steps[currentStep].id]);
    
    // For vendors, also save the BOQ data
    if (invitationType === 'vendor' && boqItems.length > 0) {
      const boqData = {
        quotationNumber: formData.quotationNumber,
        vendorName: formData.organizationName,
        contactPerson: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        items: boqItems,
        totalValue: getTotalBOQValue(),
        validityPeriod: formData.validityPeriod,
        paymentTerms: formData.paymentTerms,
        warrantyPeriod: formData.warrantyPeriod,
        additionalTerms: formData.additionalTerms,
        attachments: uploadedFiles,
        submittedAt: new Date(),
        status: 'submitted'
      };
      
      // In a real app, this would be sent to the BOQ management system
      console.log('BOQ Submitted:', boqData);
      toast.success("BOQ submitted successfully and will be reviewed by our team!");
    }
    
    toast.success(`${invitationType === 'customer' ? 'Customer' : 'Vendor'} onboarding completed successfully!`);
  };

  const isStepCompleted = (stepId: string) => {
    return completedSteps.includes(stepId);
  };

  const canProceedToNext = () => {
    switch (steps[currentStep]?.id) {
      case "personal":
        return formData.fullName && formData.email && formData.jobTitle;
      case "company":
      case "business":
        return formData.organizationName && formData.industry;
      case "preferences":
      case "services":
        return formData.primaryUse;
      case "boq":
        return formData.quotationNumber && boqItems.length > 0 && boqItems.every(item => item.description && item.quantity > 0);
      default:
        return true;
    }
  };

  const renderWelcomeStep = () => (
    <div className="text-center space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          {invitationType === 'customer' ? (
            <Heart className="h-12 w-12 text-white" />
          ) : (
            <Handshake className="h-12 w-12 text-white" />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {invitationType === 'customer' ? 'Welcome to ProjectFlow!' : 'Welcome, New Partner!'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {inviterName} from {companyName} has invited you to join our platform. 
          {invitationType === 'customer' 
            ? ' Get ready to streamline your project management and boost productivity!'
            : ' We\'re excited to have you as part of our vendor network!'
          }
        </p>
      </div>

      <Card className="max-w-md mx-auto border-2 border-blue-200 bg-blue-50/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">{companyName}</h3>
              <p className="text-sm text-muted-foreground">Invited by {inviterName}</p>
              <Badge className="bg-green-100 text-green-800 border-green-200 mt-1">
                Verified Invitation
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center space-y-3">
          <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto">
            <Zap className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold">Quick Setup</h3>
          <p className="text-sm text-muted-foreground">Get started in just a few minutes</p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold">Secure & Trusted</h3>
          <p className="text-sm text-muted-foreground">Enterprise-grade security</p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto">
            <Globe className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="font-semibold">Global Platform</h3>
          <p className="text-sm text-muted-foreground">Used by teams worldwide</p>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfoStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-muted-foreground">
          Tell us a bit about yourself to personalize your experience
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Project Manager, CEO"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCompanyStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          {invitationType === 'customer' ? 'Company Details' : 'Business Profile'}
        </h2>
        <p className="text-muted-foreground">
          {invitationType === 'customer' 
            ? 'Help us understand your organization' 
            : 'Tell us about your business capabilities'
          }
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {invitationType === 'customer' ? 'Organization Name' : 'Business Name'} *
              </label>
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your organization name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select
                value={formData.organizationSize}
                onChange={(e) => handleInputChange('organizationSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="consulting">Consulting</option>
                <option value="education">Education</option>
                <option value="construction">Construction</option>
                <option value="engineering">Engineering</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://your-website.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, Country"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPreferencesStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          {invitationType === 'customer' ? 'Your Preferences' : 'Services & Terms'}
        </h2>
        <p className="text-muted-foreground">
          {invitationType === 'customer' 
            ? 'Help us customize your experience' 
            : 'Define your service offerings'
          }
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {invitationType === 'customer' ? 'Primary Use Case' : 'Primary Services'} *
            </label>
            <select
              value={formData.primaryUse}
              onChange={(e) => handleInputChange('primaryUse', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select primary use</option>
              {invitationType === 'customer' ? (
                <>
                  <option value="project-management">Project Management</option>
                  <option value="team-collaboration">Team Collaboration</option>
                  <option value="resource-planning">Resource Planning</option>
                  <option value="client-management">Client Management</option>
                  <option value="workflow-automation">Workflow Automation</option>
                </>
              ) : (
                <>
                  <option value="consulting">Consulting Services</option>
                  <option value="development">Software Development</option>
                  <option value="design">Design Services</option>
                  <option value="marketing">Marketing Services</option>
                  <option value="operations">Operations Support</option>
                  <option value="construction">Construction Services</option>
                  <option value="engineering">Engineering Services</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {invitationType === 'customer' ? 'Expected Volume' : 'Capacity'}
            </label>
            <select
              value={formData.expectedVolume}
              onChange={(e) => handleInputChange('expectedVolume', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select volume</option>
              <option value="small">Small (1-5 projects)</option>
              <option value="medium">Medium (6-20 projects)</option>
              <option value="large">Large (21-50 projects)</option>
              <option value="enterprise">Enterprise (50+ projects)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requirements or Notes
            </label>
            <textarea
              value={formData.specialRequirements}
              onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any specific requirements or additional information..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBOQStep = () => (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">BOQ Submission</h2>
        <p className="text-muted-foreground">
          Submit your detailed quotation for review
        </p>
      </div>

      {/* BOQ Header Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            Quotation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quotation Number *
              </label>
              <input
                type="text"
                value={formData.quotationNumber}
                onChange={(e) => handleInputChange('quotationNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="QUO-2024-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Validity Period (Days)
              </label>
              <input
                type="number"
                value={formData.validityPeriod}
                onChange={(e) => handleInputChange('validityPeriod', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="30"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Terms
              </label>
              <select
                value={formData.paymentTerms}
                onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Net 60">Net 60</option>
                <option value="COD">Cash on Delivery</option>
                <option value="Advance">Advance Payment</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Warranty Period
              </label>
              <input
                type="text"
                value={formData.warrantyPeriod}
                onChange={(e) => handleInputChange('warrantyPeriod', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1 year, 6 months"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Terms
              </label>
              <textarea
                value={formData.additionalTerms}
                onChange={(e) => handleInputChange('additionalTerms', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional terms and conditions..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BOQ Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-600" />
              Line Items ({boqItems.length})
            </CardTitle>
            <Button onClick={handleAddBOQItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {boqItems.map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Item #{index + 1}</h4>
                  {boqItems.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveBOQItem(item.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Code
                    </label>
                    <input
                      type="text"
                      value={item.itemCode}
                      onChange={(e) => handleBOQItemChange(item.id, 'itemCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ITEM-001"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleBOQItemChange(item.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter item description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={item.category}
                      onChange={(e) => handleBOQItemChange(item.id, 'category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Materials">Materials</option>
                      <option value="Labor">Labor</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Services">Services</option>
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleBOQItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit
                    </label>
                    <select
                      value={item.unit}
                      onChange={(e) => handleBOQItemChange(item.id, 'unit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pieces">Pieces</option>
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                      <option value="sq ft">Square Feet</option>
                      <option value="meters">Meters</option>
                      <option value="kg">Kilograms</option>
                      <option value="liters">Liters</option>
                      <option value="each">Each</option>
                      <option value="set">Set</option>
                      <option value="lot">Lot</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleBOQItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Price (₹)
                    </label>
                    <input
                      type="number"
                      value={item.totalPrice}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lead Time
                    </label>
                    <input
                      type="text"
                      value={item.leadTime}
                      onChange={(e) => handleBOQItemChange(item.id, 'leadTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 2 weeks"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specifications
                    </label>
                    <input
                      type="text"
                      value={item.specifications}
                      onChange={(e) => handleBOQItemChange(item.id, 'specifications', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Technical specs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOQ Summary */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-end">
              <div className="w-80 space-y-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total BOQ Value:</span>
                  <span className="text-green-600">₹{getTotalBOQValue().toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Taxes and additional charges as applicable
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Attachments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-purple-600" />
            Supporting Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">
                Upload supporting documents (optional)
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Technical specifications, certifications, product catalogs, etc.
              </p>
              <Button
                variant="outline"
                onClick={() => handleFileUpload(`Document-${Date.now()}.pdf`)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Uploaded Files:</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{file}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submission Notice */}
      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-900">Review Before Submission</h4>
              <p className="text-sm text-orange-700 mt-1">
                Please review all information carefully. Once submitted, your BOQ will be reviewed by our procurement team and you'll receive feedback within 2-3 business days.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="text-center space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="relative bg-gradient-to-r from-green-600 to-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          {invitationType === 'customer' ? (
            <Rocket className="h-12 w-12 text-white" />
          ) : (
            <Award className="h-12 w-12 text-white" />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          {invitationType === 'customer' ? 'Welcome Aboard!' : 'Partnership Activated!'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {invitationType === 'customer' 
            ? 'Your account has been set up successfully. You\'re now ready to start managing projects with ProjectFlow!'
            : 'Welcome to our vendor network! Your BOQ has been submitted and you can now start collaborating with our teams.'
          }
        </p>
      </div>

      <Card className="max-w-md mx-auto border-2 border-green-200 bg-green-50/50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <span className="font-medium">Account Created</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <span className="font-medium">Profile Completed</span>
            </div>
            {invitationType === 'vendor' && (
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <span className="font-medium">BOQ Submitted</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <span className="font-medium">Access Granted</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BOQ Summary for Vendor */}
      {invitationType === 'vendor' && boqItems.length > 0 && (
        <Card className="max-w-md mx-auto border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 justify-center">
                <Calculator className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">BOQ Summary</h4>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ₹{getTotalBOQValue().toLocaleString()}
                </div>
                <div className="text-sm text-blue-700">
                  {boqItems.length} items • {formData.quotationNumber}
                </div>
              </div>
              <div className="text-xs text-blue-600">
                Your quotation is under review
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <Card className="border-2 hover:border-blue-300 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center space-y-3">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold">Explore Dashboard</h4>
              <p className="text-sm text-muted-foreground">
                Get familiar with your new workspace
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-purple-300 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center space-y-3">
              <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold">
                {invitationType === 'customer' ? 'Invite Team Members' : 'Connect with Teams'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {invitationType === 'customer' 
                  ? 'Add your team to start collaborating'
                  : 'Begin collaborating with project teams'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
        <Rocket className="h-5 w-5 mr-2" />
        {invitationType === 'customer' ? 'Go to Dashboard' : 'View Opportunities'}
      </Button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (steps[currentStep]?.id) {
      case "welcome":
        return renderWelcomeStep();
      case "personal":
        return renderPersonalInfoStep();
      case "company":
      case "business":
        return renderCompanyStep();
      case "preferences":
      case "services":
        return renderPreferencesStep();
      case "boq":
        return renderBOQStep();
      case "complete":
        return renderCompleteStep();
      default:
        return renderWelcomeStep();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PF</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ProjectFlow
                </h1>
                <p className="text-xs text-muted-foreground">
                  {invitationType === 'customer' ? 'Customer Onboarding' : 'Vendor Partnership'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Step {currentStep + 1} of {steps.length}
              </Badge>
              <div className="text-sm text-muted-foreground">
                Invitation ID: {invitationId?.slice(-8)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = isStepCompleted(step.id);
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-colors
                      ${isCompleted ? 'bg-green-500 text-white' : 
                        isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="hidden md:block">
                      <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          {steps[currentStep]?.id !== "complete" && (
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
              
              {currentStep === steps.length - 2 ? (
                <Button 
                  onClick={handleCompleteOnboarding}
                  disabled={!canProceedToNext()}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  Complete Setup
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleNextStep}
                  disabled={!canProceedToNext()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full opacity-30 blur-3xl" />
      </div>
    </div>
  );
}