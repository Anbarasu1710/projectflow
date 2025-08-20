import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "./ui/simple-tabs";
import { SimpleSelect } from "./ui/simple-select";
import { SimpleDropdown } from "./ui/simple-dropdown";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Project, Task, TeamMember } from "./data/dataStore";
import { toast } from "sonner";
import { 
  Building2, 
  Users, 
  Settings, 
  UserPlus, 
  Shield,
  Crown,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Copy,
  Mail,
  Calendar,
  MapPin,
  Globe,
  Phone,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Key,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Link,
  ExternalLink
} from "lucide-react";

interface OrganizationProps {
  projects: Project[];
  tasks: Task[];
  teamMembers: TeamMember[];
  onCreateProject: () => void;
  onCreateTask: () => void;
  onCreateMember: () => void;
  onViewAnalytics: () => void;
  onViewReports: () => void;
  onNavigate: (view: string, id?: string) => void;
}

interface OrganizationMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  avatar: string;
  status: 'active' | 'invited' | 'suspended';
  joinedAt: Date;
  lastActive: Date;
  department: string;
  permissions: string[];
}

interface Workspace {
  id: string;
  name: string;
  description: string;
  members: number;
  projects: number;
  plan: string;
  status: 'active' | 'archived';
  createdAt: Date;
}

const roles = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Full access to all organization features',
    permissions: ['manage_billing', 'manage_members', 'manage_projects', 'manage_settings', 'view_analytics'],
    color: 'bg-red-100 text-red-800'
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Can manage projects and team members',
    permissions: ['manage_members', 'manage_projects', 'view_analytics'],
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'member',
    name: 'Member',
    description: 'Can create and manage own projects',
    permissions: ['manage_projects', 'view_analytics'],
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to projects',
    permissions: ['view_projects'],
    color: 'bg-gray-100 text-gray-800'
  }
];

const permissions = [
  { id: 'manage_billing', name: 'Manage Billing', description: 'Access billing and subscription settings' },
  { id: 'manage_members', name: 'Manage Members', description: 'Invite, remove, and change member roles' },
  { id: 'manage_projects', name: 'Manage Projects', description: 'Create, edit, and delete projects' },
  { id: 'manage_settings', name: 'Manage Settings', description: 'Change organization settings' },
  { id: 'view_analytics', name: 'View Analytics', description: 'Access reports and analytics' },
  { id: 'view_projects', name: 'View Projects', description: 'Read-only access to projects' }
];

export function Organization({ 
  projects, 
  tasks, 
  teamMembers, 
  onCreateProject, 
  onCreateTask, 
  onCreateMember,
  onViewAnalytics, 
  onViewReports,
  onNavigate 
}: OrganizationProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  const [orgMembers] = useState<OrganizationMember[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@projectflow.com',
      role: 'owner',
      avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=200',
      status: 'active',
      joinedAt: new Date('2023-01-15'),
      lastActive: new Date(),
      department: 'Management',
      permissions: ['manage_billing', 'manage_members', 'manage_projects', 'manage_settings', 'view_analytics']
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike.johnson@projectflow.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTU1NzkwODR8MA&ixlib=rb-4.1.0&q=80&w=200',
      status: 'active',
      joinedAt: new Date('2023-02-01'),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      department: 'Engineering',
      permissions: ['manage_members', 'manage_projects', 'view_analytics']
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@projectflow.com',
      role: 'member',
      avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=200',
      status: 'active',
      joinedAt: new Date('2023-03-10'),
      lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      department: 'Design',
      permissions: ['manage_projects', 'view_analytics']
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@projectflow.com',
      role: 'member',
      avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTU1NzkwODR8MA&ixlib=rb-4.1.0&q=80&w=200',
      status: 'active',
      joinedAt: new Date('2023-04-05'),
      lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000),
      department: 'Engineering',
      permissions: ['manage_projects', 'view_analytics']
    },
    {
      id: '5',
      name: 'Jennifer Kim',
      email: 'jennifer.kim@projectflow.com',
      role: 'viewer',
      avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTQ5NzM5MXww&ixlib=rb-4.1.0&q=80&w=200',
      status: 'invited',
      joinedAt: new Date('2024-01-20'),
      lastActive: new Date('2024-01-20'),
      department: 'Marketing',
      permissions: ['view_projects']
    }
  ]);

  const [workspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'ProjectFlow HQ',
      description: 'Main workspace for core team',
      members: 12,
      projects: 8,
      plan: 'Enterprise',
      status: 'active',
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      name: 'Client Projects',
      description: 'External client work and collaborations',
      members: 6,
      projects: 15,
      plan: 'Professional',
      status: 'active',
      createdAt: new Date('2023-06-01')
    },
    {
      id: '3',
      name: 'R&D Division',
      description: 'Research and development projects',
      members: 4,
      projects: 3,
      plan: 'Professional',
      status: 'active',
      createdAt: new Date('2023-09-12')
    }
  ]);

  const filteredMembers = orgMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleInfo = (roleId: string) => {
    return roles.find(r => r.id === roleId) || roles[3];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'invited': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLastActiveText = (lastActive: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - lastActive.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Active now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return lastActive.toLocaleDateString();
  };

  const handleInviteMember = () => {
    toast.success("Invitation sent successfully!");
  };

  const handleChangeRole = (memberId: string, newRole: string) => {
    toast.success(`Role updated to ${newRole}`);
  };

  const handleRemoveMember = (memberId: string) => {
    toast.error("Member removed from organization");
  };

  const handleCreateWorkspace = () => {
    toast.success("New workspace created!");
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbml6YXRpb24lMjBtYW5hZ2VtZW50JTIwdGVhbXxlbnwxfHx8fDE3NTU1NzkwODJ8MA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Organization management"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Organization</h1>
              <p className="text-xl opacity-90">Manage your team, workspaces, and organization settings</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={handleCreateWorkspace}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Workspace
              </Button>
              <Button 
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={handleInviteMember}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <SimpleTabsList className="grid w-full grid-cols-4">
          <SimpleTabsTrigger value="overview" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Overview
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Members
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="workspaces" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Workspaces
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Total Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orgMembers.length}</div>
                <p className="text-xs text-muted-foreground">
                  {orgMembers.filter(m => m.status === 'active').length} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Workspaces
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{workspaces.length}</div>
                <p className="text-xs text-muted-foreground">
                  {workspaces.filter(w => w.status === 'active').length} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{workspaces.reduce((sum, w) => sum + w.projects, 0)}</div>
                <p className="text-xs text-muted-foreground">
                  Across all workspaces
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Plan Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">Enterprise</div>
                <p className="text-xs text-muted-foreground">
                  Unlimited features
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest organization updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <UserPlus className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Jennifer Kim invited</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">R&D Division workspace created</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Crown className="h-4 w-4 text-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Upgraded to Enterprise plan</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Roles Distribution</CardTitle>
                <CardDescription>Breakdown of user permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {roles.map((role) => {
                  const count = orgMembers.filter(m => m.role === role.id).length;
                  const percentage = (count / orgMembers.length) * 100;
                  
                  return (
                    <div key={role.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge className={role.color}>{role.name}</Badge>
                          <span className="text-sm">{count} members</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="members" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <SimpleSelect
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </SimpleSelect>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={handleInviteMember}>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredMembers.map((member) => {
                  const roleInfo = getRoleInfo(member.role);
                  
                  return (
                    <div key={member.id} className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{member.name}</span>
                            <Badge className={getStatusColor(member.status)}>
                              {member.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {member.email}
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>{member.department}</span>
                            <span>Joined {member.joinedAt.toLocaleDateString()}</span>
                            <span>{getLastActiveText(member.lastActive)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Badge className={roleInfo.color}>
                          {roleInfo.name}
                        </Badge>
                        
                        <SimpleDropdown
                          trigger={
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          }
                          items={[
                            { 
                              label: "View Profile", 
                              onClick: () => toast.info(`Viewing ${member.name}'s profile`),
                              icon: Eye
                            },
                            { 
                              label: "Edit Role", 
                              onClick: () => toast.info(`Editing ${member.name}'s role`),
                              icon: Edit
                            },
                            { 
                              label: "Resend Invitation", 
                              onClick: () => toast.success(`Invitation resent to ${member.email}`),
                              icon: Mail,
                              show: member.status === 'invited'
                            },
                            { 
                              label: "Remove Member", 
                              onClick: () => handleRemoveMember(member.id),
                              icon: Trash2,
                              className: "text-red-600"
                            }
                          ].filter(item => item.show !== false)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="workspaces" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Workspaces</h2>
              <p className="text-muted-foreground">Organize your team into different workspaces</p>
            </div>
            <Button onClick={handleCreateWorkspace}>
              <Plus className="h-4 w-4 mr-2" />
              Create Workspace
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((workspace) => (
              <Card key={workspace.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{workspace.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {workspace.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {workspace.plan}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{workspace.members} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{workspace.projects} projects</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Created {workspace.createdAt.toLocaleDateString()}
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-3 w-3 mr-1" />
                      Manage
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
                <CardDescription>Basic details about your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" value="ProjectFlow Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-domain">Domain</Label>
                  <Input id="org-domain" value="projectflow.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-website">Website</Label>
                  <Input id="org-website" value="https://projectflow.com" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure organization security policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Require 2FA for all organization members
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Enabled
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">SSO Integration</div>
                    <div className="text-sm text-muted-foreground">
                      Single sign-on with your identity provider
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">IP Restrictions</div>
                    <div className="text-sm text-muted-foreground">
                      Limit access to specific IP addresses
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>Manage API keys and integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">API Key</div>
                    <div className="text-sm text-muted-foreground font-mono">
                      pk_live_••••••••••••••••
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Key className="h-4 w-4 mr-2" />
                  Generate New Key
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Link className="h-4 w-4 mr-2" />
                  Manage Webhooks
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>Control data retention and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Organization Data
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Button>
                
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Organization
                </Button>
              </CardContent>
            </Card>
          </div>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}