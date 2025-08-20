import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "../ui/simple-tabs";
import { Progress } from "../ui/progress";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { 
  ProjectTemplate, 
  TaskTemplate,
  PhaseTemplate,
  projectTemplates,
  getTemplatesByCategory 
} from "../data/templateStore";
import { Project } from "../data/dataStore";
import {
  Code,
  Megaphone,
  Rocket,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Circle,
  Flag,
  Target,
  Download,
  Eye,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface ImportTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTasks: (tasks: TaskTemplate[], selectedProject: string) => void;
  projects: Project[];
}

const iconMap = {
  Code: Code,
  Megaphone: Megaphone,
  Rocket: Rocket,
  Calendar: Calendar,
};

export function ImportTemplateModal({ 
  isOpen, 
  onClose, 
  onImportTasks, 
  projects 
}: ImportTemplateModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [selectedCategory, setSelectedCategory] = useState<string>("Development");

  const templatesByCategory = getTemplatesByCategory();
  const categories = Object.keys(templatesByCategory);

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setSelectedTemplate(template);
    setSelectedTasks(new Set()); // Reset selected tasks
    setActiveTab("preview");
  };

  const handleTaskToggle = (taskId: string, isChecked: boolean) => {
    const newSelectedTasks = new Set(selectedTasks);
    if (isChecked) {
      newSelectedTasks.add(taskId);
    } else {
      newSelectedTasks.delete(taskId);
    }
    setSelectedTasks(newSelectedTasks);
  };

  const handleSelectAllTasks = (phase: PhaseTemplate) => {
    const newSelectedTasks = new Set(selectedTasks);
    const phaseTaskIds = phase.tasks.map(task => task.id);
    const allSelected = phaseTaskIds.every(id => selectedTasks.has(id));
    
    if (allSelected) {
      phaseTaskIds.forEach(id => newSelectedTasks.delete(id));
    } else {
      phaseTaskIds.forEach(id => newSelectedTasks.add(id));
    }
    setSelectedTasks(newSelectedTasks);
  };

  const getSelectedTasksFromTemplate = () => {
    if (!selectedTemplate) return [];
    
    const allTasks = selectedTemplate.phases.flatMap(phase => phase.tasks);
    return allTasks.filter(task => selectedTasks.has(task.id));
  };

  const handleImport = () => {
    const tasksToImport = getSelectedTasksFromTemplate();
    if (tasksToImport.length > 0 && selectedProject) {
      onImportTasks(tasksToImport, selectedProject);
      onClose();
      // Reset state
      setSelectedTemplate(null);
      setSelectedTasks(new Set());
      setSelectedProject("");
      setActiveTab("browse");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  };

  const selectedTaskCount = selectedTasks.size;
  const totalEstimatedHours = getSelectedTasksFromTemplate()
    .reduce((total, task) => {
      const hours = parseInt(task.estimatedTime.replace('h', '')) || 0;
      return total + hours;
    }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Import Project Templates
          </DialogTitle>
          <DialogDescription>
            Choose from pre-built project templates to quickly set up tasks and phases for common project types.
          </DialogDescription>
        </DialogHeader>

        <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <SimpleTabsList className="grid w-full grid-cols-2">
            <SimpleTabsTrigger value="browse">Browse Templates</SimpleTabsTrigger>
            <SimpleTabsTrigger value="preview" disabled={!selectedTemplate}>
              Preview & Customize
            </SimpleTabsTrigger>
          </SimpleTabsList>

          <SimpleTabsContent value="browse" className="flex-1 flex flex-col min-h-0">
            <div className="flex gap-4 mb-4">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            <ScrollArea className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                {templatesByCategory[selectedCategory]?.map((template) => {
                  const IconComponent = iconMap[template.icon as keyof typeof iconMap] || Target;
                  const totalTasks = template.phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
                  
                  return (
                    <Card 
                      key={template.id} 
                      className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex-shrink-0">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {template.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{template.estimatedDuration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{template.teamSize}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Phases: {template.phases.length}</span>
                            <span>Tasks: {totalTasks}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {template.phases.slice(0, 3).map((phase) => (
                              <Badge key={phase.name} variant="outline" className="text-xs">
                                {phase.name}
                              </Badge>
                            ))}
                            {template.phases.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.phases.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTemplateSelect(template);
                          }}
                        >
                          <Eye className="h-3 w-3 mr-2" />
                          Preview Template
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </SimpleTabsContent>

          <SimpleTabsContent value="preview" className="flex-1 flex flex-col min-h-0">
            {selectedTemplate && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                  <div className="flex items-center gap-3 mb-2">
                    {(() => {
                      const IconComponent = iconMap[selectedTemplate.icon as keyof typeof iconMap] || Target;
                      return <IconComponent className="h-6 w-6 text-blue-600" />;
                    })()}
                    <h3 className="text-xl font-semibold">{selectedTemplate.name}</h3>
                    <Badge className="bg-blue-100 text-blue-800">{selectedTemplate.category}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{selectedTemplate.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTemplate.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTemplate.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTemplate.phases.length} phases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTemplate.phases.reduce((sum, phase) => sum + phase.tasks.length, 0)} tasks</span>
                    </div>
                  </div>
                </div>

                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-6">
                    {selectedTemplate.phases.map((phase) => {
                      const phaseTaskIds = phase.tasks.map(task => task.id);
                      const selectedPhaseTaskIds = phaseTaskIds.filter(id => selectedTasks.has(id));
                      const allSelected = phaseTaskIds.length === selectedPhaseTaskIds.length;
                      const someSelected = selectedPhaseTaskIds.length > 0;

                      return (
                        <Card key={phase.name} className="border-l-4" style={{ borderLeftColor: phase.color.replace('bg-', '#') }}>
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full ${phase.color}`} />
                                <div>
                                  <CardTitle className="text-lg">{phase.name}</CardTitle>
                                  <CardDescription>{phase.description}</CardDescription>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {selectedPhaseTaskIds.length}/{phase.tasks.length} selected
                                </Badge>
                                <Checkbox
                                  checked={allSelected}
                                  ref={(el) => {
                                    if (el) {
                                      el.indeterminate = someSelected && !allSelected;
                                    }
                                  }}
                                  onCheckedChange={() => handleSelectAllTasks(phase)}
                                />
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-3">
                            {phase.tasks.map((task) => (
                              <div 
                                key={task.id} 
                                className={`p-3 border rounded-lg transition-all ${
                                  selectedTasks.has(task.id) 
                                    ? 'border-blue-200 bg-blue-50' 
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    checked={selectedTasks.has(task.id)}
                                    onCheckedChange={(checked) => handleTaskToggle(task.id, checked === true)}
                                    className="mt-1"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                      <h4 className="font-medium text-sm">{task.title}</h4>
                                      <div className="flex items-center gap-2 flex-shrink-0">
                                        <Badge 
                                          variant="outline" 
                                          className={`text-xs ${getPriorityColor(task.priority)}`}
                                        >
                                          <Flag className="h-3 w-3 mr-1" />
                                          {task.priority}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                          <Clock className="h-3 w-3 mr-1" />
                                          {task.estimatedTime}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                                    
                                    {task.subtasks && task.subtasks.length > 0 && (
                                      <div className="text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <CheckCircle2 className="h-3 w-3" />
                                          {task.subtasks.length} subtasks included
                                        </span>
                                      </div>
                                    )}

                                    {task.dependencies && task.dependencies.length > 0 && (
                                      <div className="text-xs text-orange-600 mt-1">
                                        <span className="flex items-center gap-1">
                                          <ArrowRight className="h-3 w-3" />
                                          Depends on {task.dependencies.length} other task{task.dependencies.length > 1 ? 's' : ''}
                                        </span>
                                      </div>
                                    )}

                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {task.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                          {tag}
                                        </Badge>
                                      ))}
                                      {task.tags.length > 3 && (
                                        <Badge variant="secondary" className="text-xs">
                                          +{task.tags.length - 3}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </ScrollArea>

                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Import Summary</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedTaskCount} tasks selected • ~{totalEstimatedHours}h estimated work
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{selectedTaskCount}</p>
                      <p className="text-xs text-muted-foreground">tasks to import</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Import to Project</label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a project...</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </SimpleTabsContent>
        </SimpleTabs>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          
          {activeTab === "browse" ? (
            <Button disabled>
              Select a template to continue
            </Button>
          ) : (
            <Button 
              onClick={handleImport}
              disabled={selectedTaskCount === 0 || !selectedProject}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Import {selectedTaskCount} Tasks
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}