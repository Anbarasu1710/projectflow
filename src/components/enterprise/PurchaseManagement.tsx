import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { SimpleTabs, SimpleTabsContent, SimpleTabsList, SimpleTabsTrigger } from "../ui/simple-tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PurchaseRequestModal } from "../modals/PurchaseRequestModal";
import { PurchaseOrderModal } from "../modals/PurchaseOrderModal";
import { 
  ShoppingCart,
  Plus,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Package,
  Building2,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Send,
  Printer
} from "lucide-react";

interface PurchaseManagementProps {
  projects: any[];
  tasks: any[];
  teamMembers: any[];
  onCreateProject: () => void;
  onCreateTask: () => void;
  onCreateMember: () => void;
  onImportTemplate?: () => void;
  onViewAnalytics: () => void;
  onViewReports: () => void;
  onNavigate: (view: string, id?: string) => void;
}

interface PurchaseRequest {
  id: string;
  requestor: string;
  department: string;
  title: string;
  totalCost: number;
  status: 'pending' | 'approved' | 'rejected' | 'in_review';
  priority: 'low' | 'medium' | 'high' | 'critical';
  requestDate: string;
  requiredByDate: string;
  itemCount: number;
}

interface PurchaseOrder {
  id: string;
  vendor: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  status: 'draft' | 'sent' | 'confirmed' | 'delivered' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  itemCount: number;
  paymentTerms: string;
}

export function PurchaseManagement({
  projects,
  tasks,
  teamMembers,
  onNavigate
}: PurchaseManagementProps) {
  const [activeTab, setActiveTab] = useState("requests");
  const [showPurchaseRequestModal, setShowPurchaseRequestModal] = useState(false);
  const [showPurchaseOrderModal, setShowPurchaseOrderModal] = useState(false);
  
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([
    {
      id: "PR-2024-001",
      requestor: "John Doe",
      department: "Information Technology",
      title: "IT Equipment Purchase",
      totalCost: 90000,
      status: "in_review",
      priority: "high",
      requestDate: "2024-01-15",
      requiredByDate: "2024-01-25",
      itemCount: 2
    },
    {
      id: "PR-2024-002",
      requestor: "Jane Smith",
      department: "Marketing",
      title: "Marketing Materials",
      totalCost: 25000,
      status: "approved",
      priority: "medium",
      requestDate: "2024-01-14",
      requiredByDate: "2024-01-28",
      itemCount: 5
    },
    {
      id: "PR-2024-003",
      requestor: "Mike Johnson",
      department: "Finance",
      title: "Office Furniture",
      totalCost: 150000,
      status: "pending",
      priority: "low",
      requestDate: "2024-01-13",
      requiredByDate: "2024-02-15",
      itemCount: 8
    }
  ]);

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    {
      id: "PO-2024-001",
      vendor: "Tech Solutions Ltd",
      orderDate: "2024-01-16",
      deliveryDate: "2024-01-26",
      totalAmount: 106350,
      status: "sent",
      priority: "high",
      itemCount: 2,
      paymentTerms: "Net 30"
    },
    {
      id: "PO-2024-002",
      vendor: "Office Supplies Inc",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-30",
      totalAmount: 29500,
      status: "confirmed",
      priority: "normal",
      itemCount: 5,
      paymentTerms: "Net 15"
    },
    {
      id: "PO-2024-003",
      vendor: "Furniture World",
      orderDate: "2024-01-14",
      deliveryDate: "2024-02-20",
      totalAmount: 177000,
      status: "draft",
      priority: "low",
      itemCount: 8,
      paymentTerms: "Net 45"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "confirmed":
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_review":
      case "sent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
      case "draft":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "rejected":
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
      case "urgent":
        return "text-red-600";
      case "high":
        return "text-red-600";
      case "medium":
      case "normal":
        return "text-orange-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const handleCreatePurchaseRequest = () => {
    setShowPurchaseRequestModal(true);
  };

  const handleCreatePurchaseOrder = () => {
    setShowPurchaseOrderModal(true);
  };

  const handlePurchaseRequestCreated = (requestData: any) => {
    const newRequest: PurchaseRequest = {
      id: requestData.id,
      requestor: requestData.requestor,
      department: requestData.department,
      title: `${requestData.department} Purchase Request`,
      totalCost: requestData.totalCost,
      status: 'pending',
      priority: requestData.priority.toLowerCase(),
      requestDate: requestData.requestDate,
      requiredByDate: requestData.requiredByDate,
      itemCount: requestData.items.length
    };

    setPurchaseRequests(prev => [newRequest, ...prev]);
  };

  const handlePurchaseOrderCreated = (orderData: any) => {
    const newOrder: PurchaseOrder = {
      id: orderData.poNumber,
      vendor: orderData.vendor.name,
      orderDate: orderData.orderDate,
      deliveryDate: orderData.deliveryDate,
      totalAmount: orderData.grandTotal,
      status: 'draft',
      priority: orderData.priority.toLowerCase(),
      itemCount: orderData.items.length,
      paymentTerms: orderData.paymentTerms
    };

    setPurchaseOrders(prev => [newOrder, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJjaGFzZSUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzU1NTc5MDg0fDA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Purchase management"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Purchase Management</h1>
              <p className="text-xl opacity-90">Handle purchase requests and order management</p>
            </div>
            <div className="flex gap-3">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={handleCreatePurchaseOrder}
              >
                <Package className="w-5 h-5 mr-2" />
                New Purchase Order
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={handleCreatePurchaseRequest}
              >
                <Plus className="w-5 h-5 mr-2" />
                New Purchase Request
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{purchaseRequests.length}</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                <p className="text-2xl font-bold">{purchaseOrders.length}</p>
                <p className="text-xs text-blue-600 mt-1">3 pending delivery</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spend</p>
                <p className="text-2xl font-bold">₹{(purchaseRequests.reduce((sum, req) => sum + req.totalCost, 0) + purchaseOrders.reduce((sum, ord) => sum + ord.totalAmount, 0)).toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+8% from last month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved Rate</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-blue-600 mt-1">Above target</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SimpleTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <SimpleTabsList className="grid w-full grid-cols-4">
          <SimpleTabsTrigger value="requests">Purchase Requests</SimpleTabsTrigger>
          <SimpleTabsTrigger value="orders">Purchase Orders</SimpleTabsTrigger>
          <SimpleTabsTrigger value="vendors">Vendor Management</SimpleTabsTrigger>
          <SimpleTabsTrigger value="analytics">Analytics</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="requests" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">All Requests</Button>
                  <Button variant="outline" size="sm">Pending</Button>
                  <Button variant="outline" size="sm">In Review</Button>
                  <Button variant="outline" size="sm">Approved</Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search requests..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Requests List */}
          <div className="grid grid-cols-1 gap-4">
            {purchaseRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <ShoppingCart className="h-6 w-6 text-blue-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{request.title}</h3>
                          <Badge className={`${getStatusColor(request.status)} text-xs`}>
                            {request.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(request.priority)}`}>
                            {request.priority.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>ID: {request.id}</span>
                          <span>Requestor: {request.requestor}</span>
                          <span>Department: {request.department}</span>
                          <span>{request.itemCount} items</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Total Cost</p>
                            <p className="text-sm font-medium">₹ {request.totalCost.toLocaleString()}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Request Date</p>
                            <p className="text-sm font-medium">{new Date(request.requestDate).toLocaleDateString()}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Required By</p>
                            <p className="text-sm font-medium">{new Date(request.requiredByDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={request.status === 'approved' ? 'text-blue-600 border-blue-200 hover:bg-blue-50' : 'text-green-600 border-green-200 hover:bg-green-50'}
                        onClick={request.status === 'approved' ? handleCreatePurchaseOrder : undefined}
                      >
                        {request.status === 'approved' ? 'Create PO' : request.status === 'pending' ? 'Approve' : 'Process'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="orders" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">All Orders</Button>
                  <Button variant="outline" size="sm">Draft</Button>
                  <Button variant="outline" size="sm">Sent</Button>
                  <Button variant="outline" size="sm">Confirmed</Button>
                  <Button variant="outline" size="sm">Delivered</Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Orders List */}
          <div className="grid grid-cols-1 gap-4">
            {purchaseOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Package className="h-6 w-6 text-green-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">Purchase Order - {order.id}</h3>
                          <Badge className={`${getStatusColor(order.status)} text-xs`}>
                            {order.status.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(order.priority)}`}>
                            {order.priority.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>Vendor: {order.vendor}</span>
                          <span>Payment: {order.paymentTerms}</span>
                          <span>{order.itemCount} items</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Total Amount</p>
                            <p className="text-sm font-medium">₹ {order.totalAmount.toLocaleString()}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Order Date</p>
                            <p className="text-sm font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Delivery Date</p>
                            <p className="text-sm font-medium">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-1" />
                        Print
                      </Button>
                      {order.status === 'draft' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Send
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="vendors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Vendor Management
              </CardTitle>
              <CardDescription>
                Manage vendor relationships and contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Vendor Management</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive vendor management system
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vendor
                </Button>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Purchase Analytics
              </CardTitle>
              <CardDescription>
                Analyze spending patterns and vendor performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Purchase Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced analytics and reporting for purchase management
                </p>
                <Button>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>

      {/* Purchase Request Modal */}
      <PurchaseRequestModal
        isOpen={showPurchaseRequestModal}
        onClose={() => setShowPurchaseRequestModal(false)}
        onCreateRequest={handlePurchaseRequestCreated}
      />

      {/* Purchase Order Modal */}
      <PurchaseOrderModal
        isOpen={showPurchaseOrderModal}
        onClose={() => setShowPurchaseOrderModal(false)}
        onCreateOrder={handlePurchaseOrderCreated}
      />
    </div>
  );
}