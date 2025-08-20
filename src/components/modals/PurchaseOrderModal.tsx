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
  Send,
  Printer,
  Download,
  Plus,
  Trash2,
  Building2,
  Truck,
  FileText,
  Receipt,
  CheckCircle2,
  AlertTriangle,
  Shield
} from "lucide-react";

interface PurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder?: (orderData: any) => void;
  initialData?: any;
}

interface OrderItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
  tax: number;
  total: number;
}

interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  gstNumber: string;
  gstRegistrationType: string;
  gstStatus: string;
  panNumber: string;
  businessType: string;
  registrationDate: string;
}

export function PurchaseOrderModal({ 
  isOpen, 
  onClose, 
  onCreateOrder,
  initialData 
}: PurchaseOrderModalProps) {
  const [poNumber] = useState(`PO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`);
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliveryDate, setDeliveryDate] = useState("2024-02-15");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [shippingMethod, setShippingMethod] = useState("Standard Delivery");
  const [priority, setPriority] = useState("Normal");

  const [selectedVendor, setSelectedVendor] = useState<Vendor>({
    id: 'VEN-001',
    name: 'Tech Solutions Ltd',
    contactPerson: 'John Smith',
    email: 'john.smith@techsolutions.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, Tech City, TC 12345',
    taxId: 'TAX123456789',
    gstNumber: '27AAACT2727Q1ZS',
    gstRegistrationType: 'Regular',
    gstStatus: 'Active',
    panNumber: 'AAACT2727Q',
    businessType: 'Private Limited Company',
    registrationDate: '2018-03-15'
  });

  const [deliveryAddress, setDeliveryAddress] = useState("ProjectFlow Office\n456 Corporate Ave\nBusiness District, BD 67890");
  const [specialInstructions, setSpecialInstructions] = useState("Please deliver during business hours (9 AM - 5 PM). Contact reception at ext. 100 upon arrival.");

  const [items, setItems] = useState<OrderItem[]>([
    {
      id: '1',
      description: 'Dell Laptop XPS 13 - Intel i7, 16GB RAM, 512GB SSD',
      quantity: 5,
      unit: 'Pieces',
      unitPrice: 15000,
      discount: 5,
      tax: 18,
      total: 88650
    },
    {
      id: '2',
      description: 'Microsoft Office 365 Business Premium License - Annual',
      quantity: 5,
      unit: 'License',
      unitPrice: 3000,
      discount: 0,
      tax: 18,
      total: 17700
    }
  ]);

  const vendors = [
    {
      id: 'VEN-001',
      name: 'Tech Solutions Ltd',
      contactPerson: 'John Smith',
      email: 'john.smith@techsolutions.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Street, Tech City, TC 12345',
      taxId: 'TAX123456789',
      gstNumber: '27AAACT2727Q1ZS',
      gstRegistrationType: 'Regular',
      gstStatus: 'Active',
      panNumber: 'AAACT2727Q',
      businessType: 'Private Limited Company',
      registrationDate: '2018-03-15'
    },
    {
      id: 'VEN-002',
      name: 'Office Supplies Inc',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@officesupplies.com',
      phone: '+1 (555) 987-6543',
      address: '789 Supply Lane, Office City, OC 54321',
      taxId: 'TAX987654321',
      gstNumber: '23BBCOF9876P1YZ',
      gstRegistrationType: 'Composition',
      gstStatus: 'Active',
      panNumber: 'BBCOF9876P',
      businessType: 'Partnership Firm',
      registrationDate: '2019-07-22'
    },
    {
      id: 'VEN-003',
      name: 'Digital Marketing Pro',
      contactPerson: 'Michael Chen',
      email: 'michael@digitalmarketingpro.com',
      phone: '+1 (555) 456-7890',
      address: '321 Marketing Plaza, Digital City, DC 98765',
      taxId: 'TAX456789123',
      gstNumber: '29CCDMA3456R1AB',
      gstRegistrationType: 'Regular',
      gstStatus: 'Active',
      panNumber: 'CCDMA3456R',
      businessType: 'Sole Proprietorship',
      registrationDate: '2020-01-10'
    },
    {
      id: 'VEN-004',
      name: 'Global Logistics Partners',
      contactPerson: 'Emily Rodriguez',
      email: 'emily@globallogistics.com',
      phone: '+1 (555) 234-5678',
      address: '654 Logistics Hub, Transport City, TC 45678',
      taxId: 'TAX789123456',
      gstNumber: '06DDGLP7890T1CD',
      gstRegistrationType: 'Regular',
      gstStatus: 'Active',
      panNumber: 'DDGLP7890T',
      businessType: 'Private Limited Company',
      registrationDate: '2017-11-28'
    }
  ];

  const paymentTermsOptions = ["Net 15", "Net 30", "Net 45", "Net 60", "COD", "Advance Payment"];
  const shippingMethods = ["Standard Delivery", "Express Delivery", "Next Day", "Pickup", "Special Handling"];
  const priorities = ["Low", "Normal", "High", "Urgent"];
  const units = ["Pieces", "License", "Hours", "Months", "Each", "Set", "Box", "Package"];

  const handleAddItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unit: 'Pieces',
      unitPrice: 0,
      discount: 0,
      tax: 18,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleItemChange = (itemId: string, field: keyof OrderItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate total when relevant fields change
        if (['quantity', 'unitPrice', 'discount', 'tax'].includes(field)) {
          const subtotal = updatedItem.quantity * updatedItem.unitPrice;
          const discountAmount = (subtotal * updatedItem.discount) / 100;
          const afterDiscount = subtotal - discountAmount;
          const taxAmount = (afterDiscount * updatedItem.tax) / 100;
          updatedItem.total = afterDiscount + taxAmount;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const getTotalDiscount = () => {
    return items.reduce((sum, item) => sum + ((item.quantity * item.unitPrice * item.discount) / 100), 0);
  };

  const getTotalTax = () => {
    return items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      const afterDiscount = subtotal - ((subtotal * item.discount) / 100);
      return sum + ((afterDiscount * item.tax) / 100);
    }, 0);
  };

  const getGrandTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSave = () => {
    const orderData = {
      poNumber,
      orderDate,
      deliveryDate,
      paymentTerms,
      shippingMethod,
      priority,
      vendor: selectedVendor,
      deliveryAddress,
      specialInstructions,
      items,
      subtotal: getSubtotal(),
      totalDiscount: getTotalDiscount(),
      totalTax: getTotalTax(),
      grandTotal: getGrandTotal(),
      status: 'draft',
      createdAt: new Date()
    };

    if (onCreateOrder) {
      onCreateOrder(orderData);
    }

    toast.success("Purchase order saved successfully!");
  };

  const handleSendToVendor = () => {
    toast.success(`Purchase order sent to ${selectedVendor.name}`);
    handleSave();
    onClose();
  };

  const handlePrint = () => {
    toast.info("Preparing purchase order for printing...");
  };

  const handleDownload = () => {
    toast.info("Downloading purchase order as PDF...");
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
              <h2 className="text-xl font-semibold">Purchase Order - {poNumber}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">Vendor: {selectedVendor.name}</span>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">DRAFT</Badge>
                <Badge className={`${priority === 'High' || priority === 'Urgent' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                  {priority.toUpperCase()} PRIORITY
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm" onClick={handleSendToVendor} className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4 mr-1" />
              Send to Vendor
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(95vh-80px)]">
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Order Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Order Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PO Number
                      </label>
                      <input
                        type="text"
                        value={poNumber}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order Date
                      </label>
                      <input
                        type="date"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Delivery
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Terms
                      </label>
                      <select
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {paymentTermsOptions.map(term => (
                          <option key={term} value={term}>{term}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping Method
                      </label>
                      <select
                        value={shippingMethod}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {shippingMethods.map(method => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
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
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-green-600" />
                    Vendor Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Vendor
                      </label>
                      <select
                        value={selectedVendor.id}
                        onChange={(e) => {
                          const vendor = vendors.find(v => v.id === e.target.value);
                          if (vendor) setSelectedVendor(vendor);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {vendors.map(vendor => (
                          <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div><strong>Contact:</strong> {selectedVendor.contactPerson}</div>
                        <div><strong>Email:</strong> {selectedVendor.email}</div>
                        <div><strong>Phone:</strong> {selectedVendor.phone}</div>
                        <div><strong>Address:</strong> {selectedVendor.address}</div>
                        <div><strong>Tax ID:</strong> {selectedVendor.taxId}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Delivery Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-orange-600" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter delivery address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter special delivery instructions"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order Items</CardTitle>
                  <Button onClick={handleAddItem} size="sm">
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
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Description</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">QTY</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Unit</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Unit Price (₹)</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Discount (%)</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Tax (%)</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Total (₹)</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
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
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                              className="w-24 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              value={item.discount}
                              onChange={(e) => handleItemChange(item.id, 'discount', parseFloat(e.target.value) || 0)}
                              className="w-16 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              min="0"
                              max="100"
                              step="0.01"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              value={item.tax}
                              onChange={(e) => handleItemChange(item.id, 'tax', parseFloat(e.target.value) || 0)}
                              className="w-16 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              min="0"
                              max="100"
                              step="0.01"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <span className="font-medium">₹ {item.total.toLocaleString()}</span>
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

                {/* Totals */}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-end">
                    <div className="w-80 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹ {getSubtotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Total Discount:</span>
                        <span>- ₹ {getTotalDiscount().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Tax:</span>
                        <span>₹ {getTotalTax().toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Grand Total:</span>
                        <span>₹ {getGrandTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vendor GST Details Panel */}
          <div className="w-80 border-l border-gray-200 bg-gray-50">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-green-600" />
                  Vendor GST Details
                </h3>
                <Badge className={`${selectedVendor.gstStatus === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                  {selectedVendor.gstStatus.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-4 text-sm">
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    GST Registration Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST Number:</span>
                      <span className="font-mono font-medium">{selectedVendor.gstNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Type:</span>
                      <span className="font-medium">{selectedVendor.gstRegistrationType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">PAN Number:</span>
                      <span className="font-mono font-medium">{selectedVendor.panNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Business Type:</span>
                      <span className="font-medium">{selectedVendor.businessType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Date:</span>
                      <span className="font-medium">{new Date(selectedVendor.registrationDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium mb-3 text-blue-900">Tax Calculation Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-700">CGST (9%):</span>
                      <span className="font-medium">₹ {(getTotalTax() / 2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">SGST (9%):</span>
                      <span className="font-medium">₹ {(getTotalTax() / 2).toLocaleString()}</span>
                    </div>
                    <Separator className="bg-blue-200" />
                    <div className="flex justify-between font-medium">
                      <span className="text-blue-900">Total GST:</span>
                      <span>₹ {getTotalTax().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-medium mb-2 text-amber-900">Compliance Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">GST Registration Valid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">TDS Applicable: No</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Input Tax Credit: Eligible</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium mb-2 text-purple-900">Additional Information</h4>
                  <div className="space-y-1 text-xs text-purple-700">
                    <p>• HSN/SAC codes will be auto-filled based on item descriptions</p>
                    <p>• E-way bill required for shipments above ₹50,000</p>
                    <p>• Reverse charge mechanism: Not applicable</p>
                    <p>• Place of supply: {selectedVendor.address.split(',').pop()?.trim()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}