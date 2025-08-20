import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SimpleCalendar } from "../ui/simple-calendar";
import { SimplePopover } from "../ui/simple-popover";
import { CalendarIcon, Plus, X } from "lucide-react";

interface MilestonesFormProps {
  milestones: { name: string; date: Date | undefined }[];
  setMilestones: (milestones: { name: string; date: Date | undefined }[]) => void;
}

export function MilestonesForm({ milestones, setMilestones }: MilestonesFormProps) {
  const [newMilestone, setNewMilestone] = useState({ name: "", date: undefined as Date | undefined });

  const addMilestone = () => {
    if (newMilestone.name.trim() && newMilestone.date) {
      setMilestones([...milestones, newMilestone]);
      setNewMilestone({ name: "", date: undefined });
    }
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select date";
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatFullDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones</CardTitle>
        <CardDescription>Define key project milestones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input
            value={newMilestone.name}
            onChange={(e) => setNewMilestone({...newMilestone, name: e.target.value})}
            placeholder="Milestone name"
          />
          <SimplePopover
            content={
              <SimpleCalendar
                mode="single"
                selected={newMilestone.date}
                onSelect={(date) => setNewMilestone({...newMilestone, date})}
                initialFocus
              />
            }
          >
            <Button variant="outline" className="justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDate(newMilestone.date)}
            </Button>
          </SimplePopover>
          <Button type="button" onClick={addMilestone}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {milestones.length > 0 && (
          <div className="space-y-2">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <span className="font-medium">{milestone.name}</span>
                  {milestone.date && (
                    <span className="text-sm text-muted-foreground ml-2">
                      {formatFullDate(milestone.date)}
                    </span>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMilestone(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}