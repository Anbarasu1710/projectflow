import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { SimpleDropdown } from "../ui/simple-dropdown";
import { toast } from "sonner";
import { 
  Calculator,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Edit,
  Trash2,
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Package,
  Settings,
  Eye,
  Send,
  Copy,
  MoreHorizontal,
  Calendar,
  User,
  Target,
  Layers,
  BarChart3,
  ArrowUpDown,
  RefreshCw
} from "lucide-react";

interface BOQProps {
  projects?: any[];
  tasks?: any[];
  teamMembers?: any[];
  onCreateProject?: () => void;
  onCreateTask?: () => void;
  onCreateMember?: () => void;
  onImportTemplate?: () => void;
  onSendInvitation?: () => void;
  onCreatePurchaseRequest?: () => void;
  onCreatePurchaseOrder?: () => void;
  onCreateEmailTemplate?: () => void;
  onCreateDocumentTemplate?: () => void;
  onViewAnalytics?: () => void;
  onViewReports?: () => void;
  onNavigate?: (view: string, id?: string) => void;
}

interface BOQItem {
  id: string;
  itemCode: string;
  description: string;
  category: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
  laborCost: number;
  materialCost: number;
  equipmentCost: number;
  overhead: number;
  specifications: string;
  supplier?: string;
  lastUpdated: Date;
}

interface BOQ {
  id: string;
  title: string;
  projectName: string;
  projectId: string;
  description: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'in-review';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectedBy?: string;
  rejectedAt?: Date;
  rejectionReason?: string;
  items: BOQItem[];
  totalAmount: number;
  contingency: number;
  finalAmount: number;
  version: number;
  comments: string[];
  attachments: string[];
}

export function BOQManagement({ 
  projects = [], 
  onNavigate = () => {},
  onCreatePurchaseRequest = () => {}
}: BOQProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBOQ, setSelectedBOQ] = useState<BOQ | null>(null);
  const [showCreateBOQ, setShowCreateBOQ] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Mock BOQ data
  const [boqs, setBOQs] = useState<BOQ[]>([
    {
      id: 'BOQ-2024-001',
      title: 'Office Renovation Phase 1',
      projectName: 'Corporate Office Upgrade',
      projectId: 'PROJ-001',
      description: 'Complete renovation of 1st floor including electrical, plumbing, and interior work',
      status: 'approved',
      priority: 'high',
      createdBy: 'John Doe',
      createdAt: new Date('2024-01-15'),
      lastModified: new Date('2024-01-20'),
      approvedBy: 'Sarah Chen',
      approvedAt: new Date('2024-01-20'),
      items: [
        {
          id: '1',
          itemCode: 'ELE-001',
          description: 'Electrical wiring and fixtures',
          category: 'Electrical',
          unit: 'sq ft',
          quantity: 2500,
          rate: 25,
          amount: 62500,
          laborCost: 35000,
          materialCost: 20000,
          equipmentCost: 5000,
          overhead: 2500,
          specifications: 'Standard electrical wiring with LED fixtures',
          supplier: 'ElectroTech Solutions',
          lastUpdated: new Date('2024-01-18')
        },
        {
          id: '2',
          itemCode: 'PLB-001',
          description: 'Plumbing and water fixtures',
          category: 'Plumbing',
          unit: 'points',
          quantity: 15,
          rate: 850,
          amount: 12750,
          laborCost: 7500,
          materialCost: 4250,
          equipmentCost: 750,
          overhead: 250,
          specifications: 'Modern water-efficient fixtures',
          supplier: 'AquaFlow Systems',
          lastUpdated: new Date('2024-01-17')
        },
        {
          id: '3',
          itemCode: 'INT-001',
          description: 'Interior design and furnishing',
          category: 'Interior',
          unit: 'sq ft',
          quantity: 2500,
          rate: 45,
          amount: 112500,
          laborCost: 62500,
          materialCost: 37500,
          equipmentCost: 7500,
          overhead: 5000,
          specifications: 'Modern office interior with ergonomic furniture',
          supplier: 'DesignCraft Interiors',
          lastUpdated: new Date('2024-01-19')
        }
      ],
      totalAmount: 187750,
      contingency: 18775, // 10%
      finalAmount: 206525,
      version: 2,
      comments: [
        'Initial review completed - approved with minor modifications',
        'Updated electrical specifications per safety requirements'
      ],
      attachments: ['floor_plan.pdf', 'electrical_layout.dwg']
    },
    {
      id: 'BOQ-2024-002',
      title: 'Data Center Infrastructure',
      projectName: 'IT Infrastructure Upgrade',
      projectId: 'PROJ-002',
      description: 'Complete data center setup with cooling, power, and network infrastructure',
      status: 'in-review',
      priority: 'critical',
      createdBy: 'Mike Johnson',
      createdAt: new Date('2024-01-22'),
      lastModified: new Date('2024-01-25'),
      items: [
        {
          id: '4',
          itemCode: 'NET-001',
          description: 'Network infrastructure and cabling',
          category: 'Network',
          unit: 'ports',
          quantity: 200,
          rate: 125,
          amount: 25000,
          laborCost: 15000,
          materialCost: 8000,
          equipmentCost: 1500,
          overhead: 500,
          specifications: 'Cat6A cabling with fiber backbone',
          supplier: 'NetworkPro Solutions',
          lastUpdated: new Date('2024-01-24')
        },
        {
          id: '5',
          itemCode: 'PWR-001',
          description: 'Power distribution and UPS systems',
          category: 'Power',
          unit: 'units',
          quantity: 8,
          rate: 3500,
          amount: 28000,
          laborCost: 12000,
          materialCost: 14000,
          equipmentCost: 1500,
          overhead: 500,
          specifications: 'Redundant power with 30min UPS backup',
          supplier: 'PowerTech Systems',
          lastUpdated: new Date('2024-01-25')
        }
      ],
      totalAmount: 53000,
      contingency: 5300,
      finalAmount: 58300,
      version: 1,
      comments: [
        'Under review by IT security team',
        'Pending approval from facilities management'
      ],
      attachments: ['network_diagram.pdf']
    },
    {
      id: 'BOQ-2024-003',
      title: 'Security System Installation',
      projectName: 'Building Security Upgrade',
      projectId: 'PROJ-003',
      description: 'Installation of access control, CCTV, and alarm systems',
      status: 'draft',
      priority: 'medium',
      createdBy: 'Lisa Wang',
      createdAt: new Date('2024-01-28'),
      lastModified: new Date('2024-01-30'),
      items: [
        {
          id: '6',
          itemCode: 'SEC-001',
          description: 'Access control system',
          category: 'Security',
          unit: 'doors',
          quantity: 25,
          rate: 450,
          amount: 11250,
          laborCost: 6250,
          materialCost: 4000,
          equipmentCost: 750,
          overhead: 250,
          specifications: 'Card-based access with biometric backup',
          supplier: 'SecureAccess Ltd',
          lastUpdated: new Date('2024-01-29')
        }
      ],
      totalAmount: 11250,
      contingency: 1125,
      finalAmount: 12375,
      version: 1,
      comments: [],
      attachments: []
    }
  ]);

  // Filter BOQs based on search and filters
  const filteredBOQs = boqs.filter(boq => {
    const matchesSearch = boq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         boq.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         boq.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || boq.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || boq.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Calculate summary statistics
  const totalBOQs = boqs.length;
  const approvedBOQs = boqs.filter(b => b.status === 'approved').length;
  const pendingBOQs = boqs.filter(b => b.status === 'in-review' || b.status === 'submitted').length;
  const draftBOQs = boqs.filter(b => b.status === 'draft').length;
  const totalValue = boqs.reduce((sum, boq) => sum + boq.finalAmount, 0);

  // Recalculate BOQ totals
  const recalculateBOQTotals = (items: BOQItem[]) => {
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const contingency = totalAmount * 0.1; // 10% contingency
    const finalAmount = totalAmount + contingency;
    
    return { totalAmount, contingency, finalAmount };
  };

  // Handle adding new item
  const handleAddItem = () => {
    if (!selectedBOQ) return;

    const newItem: BOQItem = {
      id: Date.now().toString(),
      itemCode: `ITEM-${String(selectedBOQ.items.length + 1).padStart(3, '0')}`,
      description: '',
      category: 'General',
      unit: 'pieces',
      quantity: 1,
      rate: 0,
      amount: 0,
      laborCost: 0,
      materialCost: 0,
      equipmentCost: 0,
      overhead: 0,
      specifications: '',
      supplier: '',
      lastUpdated: new Date()
    };

    const updatedItems = [...selectedBOQ.items, newItem];
    const { totalAmount, contingency, finalAmount } = recalculateBOQTotals(updatedItems);

    const updatedBOQ: BOQ = {
      ...selectedBOQ,
      items: updatedItems,
      totalAmount,
      contingency,
      finalAmount,
      lastModified: new Date()
    };

    // Update the BOQ in the list
    setBOQs(prevBOQs => 
      prevBOQs.map(boq => 
        boq.id === selectedBOQ.id ? updatedBOQ : boq
      )
    );

    // Update the selected BOQ
    setSelectedBOQ(updatedBOQ);

    toast.success('New item added to BOQ');
  };

  // Handle item changes
  const handleItemChange = (itemId: string, field: keyof BOQItem, value: any) => {
    if (!selectedBOQ) return;

    const updatedItems = selectedBOQ.items.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value, lastUpdated: new Date() };
        
        // Recalculate amount when quantity or rate changes
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        
        return updatedItem;
      }
      return item;
    });

    const { totalAmount, contingency, finalAmount } = recalculateBOQTotals(updatedItems);

    const updatedBOQ: BOQ = {
      ...selectedBOQ,
      items: updatedItems,
      totalAmount,
      contingency,
      finalAmount,
      lastModified: new Date()
    };

    // Update the BOQ in the list
    setBOQs(prevBOQs => 
      prevBOQs.map(boq => 
        boq.id === selectedBOQ.id ? updatedBOQ : boq
      )
    );

    // Update the selected BOQ
    setSelectedBOQ(updatedBOQ);
  };

  // Handle item deletion
  const handleDeleteItem = (itemId: string) => {
    if (!selectedBOQ) return;

    const updatedItems = selectedBOQ.items.filter(item => item.id !== itemId);
    const { totalAmount, contingency, finalAmount } = recalculateBOQTotals(updatedItems);

    const updatedBOQ: BOQ = {
      ...selectedBOQ,
      items: updatedItems,
      totalAmount,
      contingency,
      finalAmount,
      lastModified: new Date()
    };

    // Update the BOQ in the list
    setBOQs(prevBOQs => 
      prevBOQs.map(boq => 
        boq.id === selectedBOQ.id ? updatedBOQ : boq
      )
    );

    // Update the selected BOQ
    setSelectedBOQ(updatedBOQ);

    toast.success('Item removed from BOQ');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'submitted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCreateBOQ = () => {
    const newBOQ: BOQ = {
      id: `BOQ-2024-${String(boqs.length + 1).padStart(3, '0')}`,
      title: 'New BOQ',
      projectName: 'Select Project',
      projectId: '',
      description: '',
      status: 'draft',
      priority: 'medium',
      createdBy: 'Current User',
      createdAt: new Date(),
      lastModified: new Date(),
      items: [],
      totalAmount: 0,
      contingency: 0,
      finalAmount: 0,
      version: 1,
      comments: [],
      attachments: []
    };
    
    setBOQs([newBOQ, ...boqs]);
    setSelectedBOQ(newBOQ);
    setActiveTab('details');
    toast.success('New BOQ created successfully!');
  };

  const handleSubmitForApproval = (boqId: string) => {
    setBOQs(boqs.map(boq => 
      boq.id === boqId 
        ? { ...boq, status: 'submitted' as const, lastModified: new Date() }
        : boq
    ));
    toast.success('BOQ submitted for approval!');
  };

  const handleApproveBOQ = (boqId: string) => {
    setBOQs(boqs.map(boq => 
      boq.id === boqId 
        ? { 
            ...boq, 
            status: 'approved' as const, 
            approvedBy: 'Sarah Chen',
            approvedAt: new Date(),
            lastModified: new Date() 
          }
        : boq
    ));
    toast.success('BOQ approved successfully!');
  };

  const handleCreatePR = (boq: BOQ) => {
    // This would typically create a purchase request based on the BOQ
    onCreatePurchaseRequest();
    toast.success(`Purchase request created from BOQ ${boq.id}`);
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total BOQs</p>
                <p className="text-2xl font-bold">{totalBOQs}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedBOQs}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingBOQs}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BOQ List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Bill of Quantities</CardTitle>
              <CardDescription>Manage and track all project BOQs</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import BOQ
              </Button>
              <Button onClick={handleCreateBOQ}>
                <Plus className="h-4 w-4 mr-2" />
                Create BOQ
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search BOQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="in-review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* BOQ Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">BOQ ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Project</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBOQs.map((boq) => (
                  <tr key={boq.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-blue-600">{boq.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{boq.title}</p>
                        <p className="text-sm text-gray-600">{boq.description.substring(0, 60)}...</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{boq.projectName}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(boq.status)}>
                        {boq.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getPriorityColor(boq.priority)}>
                        {boq.priority.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium">₹{boq.finalAmount.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {boq.createdAt.toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <SimpleDropdown
                        trigger={
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        }
                        items={[
                          { 
                            label: "View Details", 
                            onClick: () => {
                              setSelectedBOQ(boq);
                              setActiveTab('details');
                            },
                            icon: Eye
                          },
                          { 
                            label: "Edit BOQ", 
                            onClick: () => {
                              setSelectedBOQ(boq);
                              setActiveTab('details');
                            },
                            icon: Edit
                          },
                          ...(boq.status === 'draft' || boq.status === 'rejected' ? [{
                            label: "Submit for Approval",
                            onClick: () => handleSubmitForApproval(boq.id),
                            icon: Send
                          }] : []),
                          ...(boq.status === 'submitted' || boq.status === 'in-review' ? [{
                            label: "Approve BOQ",
                            onClick: () => handleApproveBOQ(boq.id),
                            icon: CheckCircle2
                          }] : []),
                          ...(boq.status === 'approved' ? [{
                            label: "Create Purchase Request",
                            onClick: () => handleCreatePR(boq),
                            icon: Target
                          }] : []),
                          { 
                            label: "Duplicate", 
                            onClick: () => toast.info(`Duplicating BOQ ${boq.id}`),
                            icon: Copy
                          },
                          { 
                            label: "Export PDF", 
                            onClick: () => toast.info(`Exporting BOQ ${boq.id} to PDF`),
                            icon: Download
                          }
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDetailsTab = () => {
    if (!selectedBOQ) {
      return (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No BOQ Selected</h3>
            <p className="text-gray-600 mb-4">Select a BOQ from the overview to view details</p>
            <Button onClick={() => setActiveTab('overview')}>
              Go to Overview
            </Button>
          </CardContent>
        </Card>
      );
    }

    const categories = ['General', 'Electrical', 'Plumbing', 'Interior', 'Network', 'Security', 'Power', 'HVAC', 'Construction', 'Equipment'];
    const units = ['pieces', 'sq ft', 'points', 'ports', 'units', 'hours', 'months', 'each', 'set', 'box', 'package', 'meters', 'liters'];

    return (
      <div className="space-y-6">
        {/* BOQ Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold">{selectedBOQ.title}</h2>
                  <Badge className={getStatusColor(selectedBOQ.status)}>
                    {selectedBOQ.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <Badge className={getPriorityColor(selectedBOQ.priority)}>
                    {selectedBOQ.priority.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">{selectedBOQ.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">BOQ ID:</span>
                    <span className="ml-2 font-medium">{selectedBOQ.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Project:</span>
                    <span className="ml-2 font-medium">{selectedBOQ.projectName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Created By:</span>
                    <span className="ml-2 font-medium">{selectedBOQ.createdBy}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Version:</span>
                    <span className="ml-2 font-medium">v{selectedBOQ.version}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                {selectedBOQ.status === 'approved' && (
                  <Button size="sm" onClick={() => handleCreatePR(selectedBOQ)}>
                    <Target className="h-4 w-4 mr-2" />
                    Create PR
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* BOQ Items */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>BOQ Items ({selectedBOQ.items.length})</CardTitle>
              <Button size="sm" onClick={handleAddItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Item Code</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Description</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Category</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Qty</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Unit</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Rate (₹)</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Amount (₹)</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBOQ.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          value={item.itemCode}
                          onChange={(e) => handleItemChange(item.id, 'itemCode', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter description"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <select
                          value={item.category}
                          onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <select
                          value={item.unit}
                          onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                          className="w-24 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {units.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className="w-28 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toast.info(`Editing item ${item.itemCode}`)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedBOQ.items.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No items added to this BOQ yet</p>
                <Button onClick={handleAddItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Item
                </Button>
              </div>
            )}

            {/* BOQ Summary */}
            {selectedBOQ.items.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-80 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{selectedBOQ.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contingency (10%):</span>
                      <span>₹{selectedBOQ.contingency.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Final Amount:</span>
                      <span>₹{selectedBOQ.finalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workflow Section */}
        <Card>
          <CardHeader>
            <CardTitle>Scope of the Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Step 1: BOQ Creation & HOD Approval</h4>
                <p className="text-blue-700 text-sm">
                  User department raises the BOQ and it should be approved by their HOD's.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Step 2: Purchase Request Creation</h4>
                <p className="text-green-700 text-sm">
                  Based on BOQ Approval, the requester should create the PR in the Application.
                </p>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${selectedBOQ.status === 'approved' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm">BOQ Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-sm">PR Created</span>
                  </div>
                </div>
                
                {selectedBOQ.status === 'approved' && (
                  <Button onClick={() => handleCreatePR(selectedBOQ)}>
                    <Target className="h-4 w-4 mr-2" />
                    Create Purchase Request
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">BOQ Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Approved</span>
                <span className="font-medium">{approvedBOQs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending</span>
                <span className="font-medium">{pendingBOQs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Draft</span>
                <span className="font-medium">{draftBOQs}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average BOQ Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                ₹{Math.round(totalValue / totalBOQs).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-2">Per BOQ</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {Math.round((approvedBOQs / totalBOQs) * 100)}%
              </p>
              <p className="text-sm text-gray-600 mt-2">BOQs Approved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent BOQ Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {boqs.slice(0, 5).map((boq) => (
              <div key={boq.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(boq.status).includes('green') ? 'bg-green-500' : getStatusColor(boq.status).includes('blue') ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                  <div>
                    <p className="font-medium">{boq.title}</p>
                    <p className="text-sm text-gray-600">{boq.projectName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{boq.finalAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{boq.lastModified.toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">BOQ Management</h1>
          <p className="text-gray-600 mt-1">Manage Bills of Quantity for all projects</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleCreateBOQ}>
            <Plus className="h-4 w-4 mr-2" />
            Create BOQ
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'details', label: 'BOQ Details', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'details' && renderDetailsTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
    </div>
  );
}