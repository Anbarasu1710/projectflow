export const projectCategories = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "marketing", label: "Marketing" },
  { value: "research", label: "Research" },
  { value: "design", label: "Design" },
  { value: "other", label: "Other" }
];

export const projectPriorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
];

export const initialFormData = {
  name: "",
  description: "",
  category: "",
  priority: "",
  budget: "",
  startDate: undefined as Date | undefined,
  endDate: undefined as Date | undefined,
  teamLead: "",
};