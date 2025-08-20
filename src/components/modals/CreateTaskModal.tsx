import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SimpleSelect } from "../ui/simple-select";
import { SimpleCalendar } from "../ui/simple-calendar";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Task, Project, TeamMember } from "../data/dataStore";
import { 
  CalendarIcon, 
  Clock, 
  Flag, 
  Plus, 
  Target, 
  User,
  CheckSquare
} from "lucide-react";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  projects: Project[];
  teamMembers: TeamMember[];
}

const taskStatuses = [
  { value: "pending", label: "Pending", color: "bg-gray-100 text-gray-800" },
  { value: "in-progress", label: "In Progress", color: "bg-blue-100 text-blue-800" },
  { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
  { value: "blocked", label: "Blocked", color: "bg-red-100 text-red-800" }
];

const taskPriorities = [
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  { value: "critical", label: "Critical", color: "bg-red-100 text-red-800" }
];

const taskPhases = [
  "Planning",
  "Design", 
  "Development",
  "Testing",
  "Deployment",
  "Review"
];

const commonTags = [
  "Frontend", "Backend", "Design", "Testing", "API", "Database", 
  "Security", "Performance", "Mobile", "Documentation", "Research"
];

export function CreateTaskModal({ isOpen, onClose, onCreateTask, projects, teamMembers }: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending" as const,
    priority: "medium" as const,
    assignee: "",
    projectId: "",
    phase: "",
    dueDate: undefined as Date | undefined,
    estimatedTime: "",
    tags: [] as string[]
  });
  const [subtasks, setSubtasks] = useState<Array<{ title: string; completed: boolean }>>([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, { title: newSubtask.trim(), completed: false }]);
      setNewSubtask("");
    }
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleAddTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleAddCustomTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.projectId || !formData.assignee || !formData.dueDate) {
      return;
    }

    onCreateTask({
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      progress: 0,
      assignee: formData.assignee,
      projectId: formData.projectId,
      phase: formData.phase || "Planning",
      dueDate: formData.dueDate,
      timeSpent: 0,
      estimatedTime: parseInt(formData.estimatedTime) || 8,
      tags: formData.tags,
      subtasks: subtasks.map((st, index) => ({ 
        id: (index + 1).toString(), 
        title: st.title, 
        completed: st.completed 
      }))
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      assignee: "",
      projectId: "",
      phase: "",
      dueDate: undefined,
      estimatedTime: "",
      tags: []
    });
    setSubtasks([]);
    setNewSubtask("");
    setNewTag("");
    onClose();
  };

  const isFormValid = formData.title && formData.description && formData.projectId && formData.assignee && formData.dueDate;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Create New Task
          </DialogTitle>
          <DialogDescription>
            Add a new task to your project and assign it to a team member
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what needs to be done"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <SimpleSelect
                value={formData.projectId}
                onValueChange={(value) => setFormData({ ...formData, projectId: value })}
                placeholder="Select project"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </SimpleSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <SimpleSelect
                value={formData.assignee}
                onValueChange={(value) => setFormData({ ...formData, assignee: value })}
                placeholder="Select assignee"
              >
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name} - {member.role}
                  </option>
                ))}
              </SimpleSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phase">Phase</Label>
              <SimpleSelect
                value={formData.phase}
                onValueChange={(value) => setFormData({ ...formData, phase: value })}
                placeholder="Select phase"
              >
                {taskPhases.map((phase) => (
                  <option key={phase} value={phase}>
                    {phase}
                  </option>
                ))}
              </SimpleSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <SimpleSelect
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as any })}
              >
                {taskPriorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </SimpleSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <SimpleSelect
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
              >
                {taskStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </SimpleSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <SimpleCalendar
                  selected={formData.dueDate}
                  onSelect={(date) => setFormData({ ...formData, dueDate: date })}
                  placeholder="Select due date"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedTime">Estimated Hours</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="estimatedTime"
                  type="number"
                  placeholder="8"
                  className="pl-10"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-3">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => (
                <Button
                  key={tag}
                  variant={formData.tags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => formData.tags.includes(tag) ? handleRemoveTag(tag) : handleAddTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
              />
              <Button onClick={handleAddCustomTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Subtasks Section */}
          <div className="space-y-3">
            <Label>Subtasks</Label>
            <div className="space-y-2">
              {subtasks.map((subtask, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1">{subtask.title}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSubtask(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add subtask"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
              />
              <Button onClick={handleAddSubtask} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!isFormValid}>
              Create Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}