import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Project, Task, TeamMember } from "../data/dataStore";
import { 
  Search, 
  FolderOpen, 
  CheckSquare, 
  User, 
  Calendar, 
  Target,
  ArrowRight,
  Clock
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  tasks: Task[];
  teamMembers: TeamMember[];
  onNavigate: (view: string, id?: string) => void;
}

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  type: "project" | "task" | "member";
  icon: any;
  data: Project | Task | TeamMember;
};

export function SearchModal({ isOpen, onClose, projects, tasks, teamMembers, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Search projects
    projects.forEach(project => {
      if (
        project.name.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.category.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          id: project.id,
          title: project.name,
          subtitle: `${project.category} • ${project.progress}% complete`,
          type: "project",
          icon: FolderOpen,
          data: project
        });
      }
    });

    // Search tasks
    tasks.forEach(task => {
      if (
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm) ||
        task.phase.toLowerCase().includes(searchTerm) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      ) {
        const project = projects.find(p => p.id === task.projectId);
        searchResults.push({
          id: task.id,
          title: task.title,
          subtitle: `${project?.name || 'Unknown Project'} • ${task.status}`,
          type: "task",
          icon: CheckSquare,
          data: task
        });
      }
    });

    // Search team members
    teamMembers.forEach(member => {
      if (
        member.name.toLowerCase().includes(searchTerm) ||
        member.role.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm) ||
        member.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      ) {
        searchResults.push({
          id: member.id,
          title: member.name,
          subtitle: `${member.role} • ${member.location}`,
          type: "member",
          icon: User,
          data: member
        });
      }
    });

    setResults(searchResults.slice(0, 10)); // Limit to 10 results
    setSelectedIndex(0);
  }, [query, projects, tasks, teamMembers]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleResultClick(results[selectedIndex]);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case "project":
        onNavigate("overview"); // Navigate to projects overview
        break;
      case "task":
        onNavigate("tasks"); // Navigate to tasks view
        break;
      case "member":
        onNavigate("resources"); // Navigate to resources view
        break;
    }
    onClose();
    setQuery("");
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="flex items-center border-b px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground mr-3" />
          <Input
            placeholder="Search projects, tasks, team members..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 shadow-none"
            autoFocus
          />
        </div>

        {query && (
          <ScrollArea className="max-h-96">
            {results.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{query}"</p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => {
                  const Icon = result.icon;
                  const isSelected = index === selectedIndex;
                  
                  return (
                    <div
                      key={`${result.type}-${result.id}`}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                        isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleResultClick(result)}
                    >
                      <div className={`p-2 rounded-lg ${
                        result.type === 'project' ? 'bg-blue-100' :
                        result.type === 'task' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          result.type === 'project' ? 'text-blue-600' :
                          result.type === 'task' ? 'text-green-600' : 'text-purple-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium truncate">{result.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {result.subtitle}
                        </p>
                        
                        {/* Additional details based on type */}
                        {result.type === 'project' && (
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {(result.data as Project).progress}%
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Due {formatDate((result.data as Project).endDate)}
                            </span>
                          </div>
                        )}
                        
                        {result.type === 'task' && (
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getStatusBadgeColor((result.data as Task).status)} variant="outline">
                              {(result.data as Task).status}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Due {formatDate((result.data as Task).dueDate)}
                            </span>
                          </div>
                        )}
                        
                        {result.type === 'member' && (
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={(result.data as TeamMember).avatar} />
                              <AvatarFallback className="text-xs">
                                {(result.data as TeamMember).name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex gap-1">
                              {(result.data as TeamMember).skills.slice(0, 2).map(skill => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        )}

        {!query && (
          <div className="py-8 text-center text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Start typing to search across projects, tasks, and team members</p>
            <div className="flex justify-center gap-2 mt-4 text-xs">
              <Badge variant="outline">↑↓ Navigate</Badge>
              <Badge variant="outline">Enter Select</Badge>
              <Badge variant="outline">Esc Close</Badge>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}