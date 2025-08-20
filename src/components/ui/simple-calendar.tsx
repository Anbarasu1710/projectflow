import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimpleCalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  mode?: "single";
  initialFocus?: boolean;
}

export function SimpleCalendar({ selected, onSelect, mode = "single" }: SimpleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date());

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectDate = (day: number) => {
    const selectedDate = new Date(year, month, day);
    onSelect?.(selectedDate);
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    const date = new Date(year, month, day);
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const date = new Date(year, month, day);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Generate calendar grid
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-8"></div>);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      <button
        key={day}
        onClick={() => selectDate(day)}
        className={`h-8 w-8 rounded-md text-sm font-normal ${
          isSelected(day)
            ? "bg-primary text-primary-foreground"
            : isToday(day)
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="font-medium">
          {monthNames[month]} {year}
        </div>
        
        <button
          onClick={nextMonth}
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((dayName) => (
          <div key={dayName} className="h-8 w-8 text-center text-sm font-medium text-muted-foreground">
            {dayName}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>
    </div>
  );
}