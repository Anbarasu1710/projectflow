import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { 
  X,
  RefreshCw,
  Save,
  MoreHorizontal,
  Plus,
  Trash2,
  Calendar,
  Building2,
  User,
  Clock,
  CheckCircle2,
  Circle
} from "lucide-react";
import exampleImage from 'figma:asset/faf97cb3d4387e7a6ae5d835c027affd52b5e5f6.png';

interface PurchaseRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRequest?: (requestData: any) => void;
}

interface RequestItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
  justification: string;
}

interface ApprovalStep {
  id: string;
  title: string;
  assignee: string;
  timestamp: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

export function PurchaseRequestModal({ 
  isOpen, 
  onClose, 
  onCreateRequest 
}: PurchaseRequestModalProps) {
  const [requestId] = useState(`PR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`);
  const [requestor, setRequestor] = useState("John Doe");
  const [department, setDepartment] = useState("Information Technology");
  const [requestDate, setRequestDate] = useState(new Date().toISOString().split('T')[0]);
  const [requiredByDate, setRequiredByDate] = useState("2024-01-25");
  const [priority, setPriority] = useState("High");
  const [budgetCode, setBudgetCode] = useState("IT-2024-001");

  const [items, setItems] = useState<RequestItem[]>([
    {
      id: '1',
      description: 'Dell Laptop XPS 13',
      quantity: 5,
      unit: 'Pieces',
      estimatedCost: 75000,
      justification: 'High performance laptops needed for development team'
    },
    {
      id: '2',
      description: 'Microsoft Office License',
      quantity: 5,
      unit: 'License',
      estimatedCost: 15000,
      justification: 'Required software licenses for productivity'
    }
  ]);

  const [approvalSteps] = useState<ApprovalStep[]>([
    {
      id: '1',
      title: 'Request Submitted',
      assignee: 'John Doe',
      timestamp: '2024-01-15 09:30 AM',
      description: 'Purchase request submitted for IT equipment',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Department Review',
      assignee: 'Jane Smith (IT Manager)',
      timestamp: '2024-01-15 02:15 PM',
      description: 'Approved by department head. Budget allocation verified.',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Finance Review',
      assignee: 'Mike Johnson (Finance)',
      timestamp: '2024-01-16 10:00 AM',
      description: 'Under finance team review for budget compliance',
      status: 'current'
    },
    {
      id: '4',
      title: 'Director Approval',
      assignee: 'Sarah Wilson (Director)',
      timestamp: '',
      description: '',
      status: 'pending'
    }
  ]);

  const departments = [
    "Information Technology",
    "Human Resources",
    "Finance",
    "Marketing",
    "Operations",
    "Legal"
  ];

  const priorities = ["Low", "Medium", "High", "Critical"];
  const units = ["Pieces", "License", "Hours", "Months", "Each", "Set"];

  const handleAddItem = () => {
    const newItem: RequestItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unit: 'Pieces',
      estimatedCost: 0,
      justification: ''
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleItemChange = (itemId: string, field: keyof RequestItem, value: any) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, [field]: value } : item
    ));
  };

  const getTotalCost = () => {
    return items.reduce((total, item) => total + (item.quantity * item.estimatedCost), 0);
  };

  const handleSave = () => {
    const requestData = {
      id: requestId,
      requestor,
      department,
      requestDate,
      requiredByDate,
      priority,
      budgetCode,
      items,
      totalCost: getTotalCost(),
      status: 'pending',
      createdAt: new Date()
    };

    if (onCreateRequest) {
      onCreateRequest(requestData);
    }

    toast.success("Purchase request saved successfully!");
    onClose();
  };

  const handleRefresh = () => {
    toast.info("Data refreshed");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold">Purchase Request - {requestId}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">Requestor: {requestor}</span>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">PENDING</Badge>
                <Badge className="bg-red-100 text-red-800 border-red-200">HIGH PRIORITY</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              Actions
              <MoreHorizontal className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(95vh-80px)]">
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Request Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Request Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-red-500">*</span> Requestor
                    </label>
                    <input
                      type="text"
                      value={requestor}
                      onChange={(e) => setRequestor(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-red-500">*</span> Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-red-500">*</span> Request Date
                    </label>
                    <input
                      type="date"
                      value={requestDate}
                      onChange={(e) => setRequestDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-red-500">*</span> Required By Date
                    </label>
                    <input
                      type="date"
                      value={requiredByDate}
                      onChange={(e) => setRequiredByDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-red-500">*</span> Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {priorities.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Code
                    </label>
                    <input
                      type="text"
                      value={budgetCode}
                      onChange={(e) => setBudgetCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items/Services Requested */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Items/Services Requested</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">Items</Badge>
                    <Badge variant="outline">Services</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Description</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">QTY</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Unit</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Estimated Cost (₹)</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Justification</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-3 px-2">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Enter description"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              min="1"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <select
                              value={item.unit}
                              onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                              className="w-24 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              {units.map(unit => (
                                <option key={unit} value={unit}>{unit}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-1">₹</span>
                              <input
                                type="number"
                                value={item.estimatedCost}
                                onChange={(e) => handleItemChange(item.id, 'estimatedCost', parseFloat(e.target.value) || 0)}
                                className="w-24 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                min="0"
                                step="0.01"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="text"
                              value={item.justification}
                              onChange={(e) => handleItemChange(item.id, 'justification', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Justification"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={handleAddItem}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Row
                  </Button>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Estimated Cost</p>
                    <p className="text-lg font-semibold text-gray-900">₹ {getTotalCost().toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Approval Timeline */}
          <div className="w-80 border-l border-gray-200 bg-gray-50">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Approval Timeline</h3>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">PENDING</Badge>
              </div>

              <div className="space-y-6">
                {approvalSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    {index < approvalSteps.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.status === 'completed' 
                          ? 'bg-green-100 text-green-600' 
                          : step.status === 'current'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium ${
                          step.status === 'current' ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600">{step.assignee}</p>
                        {step.timestamp && (
                          <p className="text-xs text-gray-500 mt-1">{step.timestamp}</p>
                        )}
                        {step.description && (
                          <p className="text-sm text-gray-700 mt-2">{step.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}