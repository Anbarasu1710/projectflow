import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BasicInfoForm } from "./forms/BasicInfoForm";
import { TimelineForm } from "./forms/TimelineForm";
import { TeamManagementForm } from "./forms/TeamManagementForm";
import { MilestonesForm } from "./forms/MilestonesForm";
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Send,
  Lightbulb,
  Target,
  Users,
  Calendar
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Basic Information",
    description: "Project name, description, and key details",
    icon: Lightbulb
  },
  {
    id: 2,
    title: "Timeline",
    description: "Set project start and end dates",
    icon: Calendar
  },
  {
    id: 3,
    title: "Team Management",
    description: "Assign team members and roles",
    icon: Users
  },
  {
    id: 4,
    title: "Milestones",
    description: "Define key project milestones",
    icon: Target
  }
];

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "research", label: "Research" },
  { value: "operations", label: "Operations" }
];

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
];

const projectTemplates = [
  {
    id: 1,
    name: "Website Development",
    description: "Complete website development with modern design and functionality",
    category: "development",
    estimatedDuration: "12 weeks",
    teamSize: "4-6 members",
    image: "https://images.unsplash.com/photo-1637073849640-b283dcd9a111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1NTc5MDgxfDA&ixlib=rb-4.1.0&q=80&w=400",
    tags: ["Frontend", "Backend", "Design"]
  },
  {
    id: 2,
    name: "Mobile App",
    description: "Cross-platform mobile application for iOS and Android",
    category: "development",
    estimatedDuration: "16 weeks",
    teamSize: "6-8 members",
    image: "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwd29ya3NwYWNlJTIwbGFwdG9wfGVufDF8fHx8MTc1NTQ2MDg3OXww&ixlib=rb-4.1.0&q=80&w=400",
    tags: ["React Native", "iOS", "Android"]
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Comprehensive digital marketing campaign across multiple channels",
    category: "marketing",
    estimatedDuration: "8 weeks",
    teamSize: "3-4 members",
    image: "https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN1Y2Nlc3MlMjBncm93dGglMjBjaGFydHxlbnwxfHx8fDE3NTU1NTQ2MTN8MA&ixlib=rb-4.1.0&q=80&w=400",
    tags: ["Digital Marketing", "Analytics", "Content"]
  }
];

export function ProjectCreation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    priority: "",
    budget: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined
  });
  const [teamMembers, setTeamMembers] = useState<Array<{name: string; role: string; email: string}>>([]);
  const [milestones, setMilestones] = useState<Array<{name: string; date: Date | undefined}>>([]);

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.description && formData.category;
      case 2:
        return formData.startDate && formData.endDate;
      case 3:
        return teamMembers.length > 0;
      case 4:
        return true; // Milestones are optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Project data:", { formData, teamMembers, milestones });
    // Handle project creation
  };

  const useTemplate = (template: any) => {
    setSelectedTemplate(template.id);
    setFormData({
      ...formData,
      name: template.name,
      description: template.description,
      category: template.category
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoForm
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            priorities={priorities}
          />
        );
      case 2:
        return <TimelineForm formData={formData} setFormData={setFormData} />;
      case 3:
        return <TeamManagementForm teamMembers={teamMembers} setTeamMembers={setTeamMembers} />;
      case 4:
        return <MilestonesForm milestones={milestones} setMilestones={setMilestones} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1649478680984-01586ce84ac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMHBsYW5uaW5nJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU1NzkwODF8MA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Project planning meeting"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
          <p className="text-xl opacity-90">Set up your project with our guided workflow</p>
        </div>
      </div>

      {/* Project Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Templates</CardTitle>
          <CardDescription>
            Choose from pre-configured project templates to get started quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectTemplates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => useTemplate(template)}
              >
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{template.estimatedDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Team Size:</span>
                      <span>{template.teamSize}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Step Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Project Setup</CardTitle>
              <CardDescription>Follow these steps to create your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isValid = isStepValid(step.id);
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      isCurrent 
                        ? 'bg-blue-50 border border-blue-200' 
                        : isCompleted 
                        ? 'bg-green-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isCurrent 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-sm font-medium ${
                        isCurrent ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-700'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {step.description}
                      </p>
                      {isCurrent && !isValid && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-3 space-y-6">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                
                {currentStep === steps.length ? (
                  <Button onClick={handleSubmit}>
                    <Send className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Progress Indicator */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of {steps.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}