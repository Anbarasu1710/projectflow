import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SimpleSelect } from "../ui/simple-select";

interface BasicInfoFormProps {
  formData: any;
  setFormData: (data: any) => void;
  categories: Array<{ value: string; label: string }>;
  priorities: Array<{ value: string; label: string }>;
}

export function BasicInfoForm({ formData, setFormData, categories, priorities }: BasicInfoFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Essential project details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <SimpleSelect
              value={formData.category}
              onValueChange={(value) => setFormData({...formData, category: value})}
              placeholder="Select category"
              options={categories}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Describe the project goals and scope"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <SimpleSelect
              value={formData.priority}
              onValueChange={(value) => setFormData({...formData, priority: value})}
              placeholder="Select priority"
              options={priorities}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget ($)</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              placeholder="Enter budget amount"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}