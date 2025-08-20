import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Plus, X } from "lucide-react";

interface TeamManagementFormProps {
  formData: any;
  setFormData: (data: any) => void;
  teamMembers: string[];
  setTeamMembers: (members: string[]) => void;
}

export function TeamManagementForm({ formData, setFormData, teamMembers, setTeamMembers }: TeamManagementFormProps) {
  const [newMember, setNewMember] = useState("");

  const addTeamMember = () => {
    if (newMember.trim() && !teamMembers.includes(newMember.trim())) {
      setTeamMembers([...teamMembers, newMember.trim()]);
      setNewMember("");
    }
  };

  const removeTeamMember = (member: string) => {
    setTeamMembers(teamMembers.filter(m => m !== member));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Management</CardTitle>
        <CardDescription>Assign team members and lead</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="teamLead">Team Lead</Label>
          <Input
            id="teamLead"
            value={formData.teamLead}
            onChange={(e) => setFormData({...formData, teamLead: e.target.value})}
            placeholder="Enter team lead name"
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Team Members</Label>
          <div className="flex gap-2">
            <Input
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Add team member"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTeamMember())}
            />
            <Button type="button" onClick={addTeamMember} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {teamMembers.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {teamMembers.map((member) => (
                <Badge key={member} variant="secondary" className="flex items-center gap-1">
                  {member}
                  <button
                    type="button"
                    onClick={() => removeTeamMember(member)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}