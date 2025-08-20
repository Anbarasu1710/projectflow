export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const calculateAverageEfficiency = (teamData: Array<{ efficiency: number }>) => {
  return Math.round(teamData.reduce((sum, m) => sum + m.efficiency, 0) / teamData.length);
};

export const calculateTotalProjects = (teamData: Array<{ projects: number }>) => {
  return teamData.reduce((sum, m) => sum + m.projects, 0);
};

export const calculateAverageOnTime = (teamData: Array<{ onTime: number }>) => {
  return Math.round(teamData.reduce((sum, m) => sum + m.onTime, 0) / teamData.length);
};