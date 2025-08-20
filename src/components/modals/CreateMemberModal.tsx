import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SimpleSelect } from "../ui/simple-select";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TeamMember } from "../data/dataStore";
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Star,
  Plus,
  X
} from "lucide-react";
import { unsplash_tool } from "../../tools/unsplash";

interface CreateMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMember: (member: Omit<TeamMember, "id">) => void;
}

const roles = [
  { value: "frontend-developer", label: "Frontend Developer" },
  { value: "backend-developer", label: "Backend Developer" },
  { value: "fullstack-developer", label: "Full Stack Developer" },
  { value: "ui-ux-designer", label: "UI/UX Designer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "project-manager", label: "Project Manager" },
  { value: "devops-engineer", label: "DevOps Engineer" },
  { value: "qa-engineer", label: "QA Engineer" },
  { value: "data-analyst", label: "Data Analyst" },
  { value: "marketing-specialist", label: "Marketing Specialist" },
  { value: "content-strategist", label: "Content Strategist" },
  { value: "business-analyst", label: "Business Analyst" }
];

const locations = [
  "San Francisco, CA",
  "New York, NY", 
  "Austin, TX",
  "Seattle, WA",
  "Los Angeles, CA",
  "Chicago, IL",
  "Boston, MA",
  "Denver, CO",
  "Remote",
  "Hybrid"
];

const availabilityOptions = [
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "overloaded", label: "Overloaded" }
];

const commonSkills = [
  "React", "Vue.js", "Angular", "JavaScript", "TypeScript", "Node.js", 
  "Python", "Java", "C#", "PHP", "Ruby", "Go", "Rust",
  "HTML", "CSS", "SASS", "Tailwind CSS", "Bootstrap",
  "UI Design", "UX Research", "Prototyping", "Figma", "Sketch", "Adobe Creative Suite",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Jenkins",
  "MySQL", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST APIs",
  "Git", "Agile", "Scrum", "Testing", "Jest", "Cypress", "Selenium"
];

export function CreateMemberModal({ isOpen, onClose, onCreateMember }: CreateMemberModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    location: "",
    capacity: "40",
    availability: "available" as const,
    skills: [] as string[]
  });
  const [newSkill, setNewSkill] = useState("");
  const [generatingAvatar, setGeneratingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleAddSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleAddCustomSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const generateAvatar = async () => {
    setGeneratingAvatar(true);
    try {
      // Use a professional headshot query based on the role
      const query = `professional headshot ${formData.role.replace('-', ' ')} person`;
      const response = await unsplash_tool({ query });
      setAvatarUrl(response);
    } catch (error) {
      console.error("Failed to generate avatar:", error);
      // Fallback to a default professional avatar
      setAvatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTU1NzkwODB8MA&ixlib=rb-4.1.0&q=80&w=400");
    }
    setGeneratingAvatar(false);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.role || !formData.location) {
      return;
    }

    onCreateMember({
      name: formData.name,
      email: formData.email,
      role: roles.find(r => r.value === formData.role)?.label || formData.role,
      avatar: avatarUrl,
      skills: formData.skills,
      capacity: parseInt(formData.capacity) || 40,
      allocated: 0,
      efficiency: Math.floor(Math.random() * 20) + 80, // Random efficiency between 80-100%
      location: formData.location,
      rating: Math.floor(Math.random() * 10) / 10 + 4, // Random rating between 4.0-5.0
      availability: formData.availability
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      role: "",
      location: "",
      capacity: "40",
      availability: "available",
      skills: []
    });
    setNewSkill("");
    setAvatarUrl("");
    onClose();
  };

  const isFormValid = formData.name && formData.email && formData.role && formData.location;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Add Team Member
          </DialogTitle>
          <DialogDescription>
            Add a new team member to your organization
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={avatarUrl} alt="Preview" />
                  <AvatarFallback>
                    {formData.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'NM'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateAvatar}
                    disabled={generatingAvatar || !formData.role}
                  >
                    {generatingAvatar ? "Generating..." : "Generate Avatar"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    {!formData.role ? "Select a role first" : "Generate a professional headshot"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <SimpleSelect
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                placeholder="Select role"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </SimpleSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <SimpleSelect
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
                placeholder="Select location"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </SimpleSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Weekly Capacity (hours)</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="40"
                min="1"
                max="80"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <SimpleSelect
                value={formData.availability}
                onValueChange={(value) => setFormData({ ...formData, availability: value as any })}
              >
                {availabilityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SimpleSelect>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-3">
            <Label>Skills & Expertise</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {commonSkills.map((skill) => (
                <Button
                  key={skill}
                  type="button"
                  variant={formData.skills.includes(skill) ? "default" : "outline"}
                  size="sm"
                  className="justify-start h-auto py-2"
                  onClick={() => formData.skills.includes(skill) ? handleRemoveSkill(skill) : handleAddSkill(skill)}
                >
                  {skill}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add custom skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSkill()}
              />
              <Button type="button" onClick={handleAddCustomSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.skills.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {formData.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground" 
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      {skill}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Member Preview */}
          {formData.name && formData.role && (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={avatarUrl} alt={formData.name} />
                    <AvatarFallback>
                      {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{formData.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {roles.find(r => r.value === formData.role)?.label}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {formData.email}
                      </span>
                      {formData.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {formData.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!isFormValid}>
              Add Team Member
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}