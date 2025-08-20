import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SimpleCalendar } from "../ui/simple-calendar";
import { SimplePopover } from "../ui/simple-popover";
import { CalendarIcon } from "lucide-react";

interface TimelineFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function TimelineForm({ formData, setFormData }: TimelineFormProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select date";
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
        <CardDescription>Project start and end dates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <SimplePopover
              content={
                <SimpleCalendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) => setFormData({...formData, startDate: date})}
                  initialFocus
                />
              }
            >
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(formData.startDate)}
              </Button>
            </SimplePopover>
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <SimplePopover
              content={
                <SimpleCalendar
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) => setFormData({...formData, endDate: date})}
                  initialFocus
                />
              }
            >
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(formData.endDate)}
              </Button>
            </SimplePopover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}