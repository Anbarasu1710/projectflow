import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SimpleSelect } from "../ui/simple-select";
import { SimpleCalendar } from "../ui/simple-calendar";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Project } from "../data/dataStore";
import { 
  CalendarIcon, 
  DollarSign, 
  FolderPlus, 
  Target, 
  Users,
  Sparkles,
  Rocket,
  Palette
} from "lucide-react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
}

const categories = [
  { value: "development", label: "Development", icon: "💻" },
  { value: "design", label: "Design", icon: "🎨" },
  { value: "marketing", label: "Marketing", icon: "📈" },
  { value: "research", label: "Research", icon: "🔬" },
  { value: "operations", label: "Operations", icon: "⚙️" }
];

const priorities = [
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  { value: "critical", label: "Critical", color: "bg-red-100 text-red-800" }
];

const projectTemplates = [
  {
    id: "website",
    name: "Website Development",
    description: "Complete website development with modern design",
    category: "development",
    priority: "high",
    estimatedBudget: 50000,
    estimatedDuration: 12,
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1637073849640-b283dcd9a111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1NTc5MDgxfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "mobile",
    name: "Mobile App",
    description: "Cross-platform mobile application",
    category: "development",
    priority: "high",
    estimatedBudget: 120000,
    estimatedDuration: 16,
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwd29ya3NwYWNlJTIwbGFwdG9wfGVufDF8fHx8MTc1NTQ2MDg3OXww&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "marketing",
    name: "Marketing Campaign",
    description: "Comprehensive digital marketing campaign",
    category: "marketing",
    priority: "medium",
    estimatedBudget: 25000,
    estimatedDuration: 8,
    icon: Palette,
    image: "https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN1Y2Nlc3MlMjBncm93dGglMjBjaGFydHxlbnwxfHx8fDE3NTU1NTQ2MTN8MA&ixlib=rb-4.1.0&q=80&w=400"
  }
];

export function CreateProjectModal({ isOpen, onClose, onCreateProject }: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    priority: "medium" as const,
    budget: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setFormData({
      ...formData,
      name: template.name,
      description: template.description,
      category: template.category,
      priority: template.priority,
      budget: template.estimatedBudget.toString()
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.category || !formData.startDate || !formData.endDate) {
      return;
    }

    const selectedTemplateData = projectTemplates.find(t => t.id === selectedTemplate);

    onCreateProject({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      status: "planning",
      progress: 0,
      budget: parseInt(formData.budget) || 0,
      spent: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      teamMembers: [],
      image: selectedTemplateData?.image
    });

    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      priority: "medium",
      budget: "",
      startDate: undefined,
      endDate: undefined
    });
    setSelectedTemplate(null);
    setStep(1);
    onClose();
  };

  const isFormValid = formData.name && formData.description && formData.category && formData.startDate && formData.endDate;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5" />
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Set up a new project using our guided workflow or templates
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choose a Template (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projectTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <ImageWithFallback
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-1">{template.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                        <div className="flex justify-between text-xs">
                          <span>${(template.estimatedBudget / 1000).toFixed(0)}k budget</span>
                          <span>{template.estimatedDuration} weeks</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)} disabled>
                  Previous
                </Button>
                <Button onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter project name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <SimpleSelect
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    placeholder="Select category"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </SimpleSelect>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project goals and scope"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <SimpleSelect
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value as any })}
                  >
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </SimpleSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="budget"
                      type="number"
                      placeholder="50000"
                      className="pl-10"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <SimpleCalendar
                      selected={formData.startDate}
                      onSelect={(date) => setFormData({ ...formData, startDate: date })}
                      placeholder="Select start date"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <SimpleCalendar
                      selected={formData.endDate}
                      onSelect={(date) => setFormData({ ...formData, endDate: date })}
                      placeholder="Select end date"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Previous
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={!isFormValid}>
                    Create Project
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}