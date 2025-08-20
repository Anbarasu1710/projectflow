import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { 
  X,
  Mail,
  User,
  Eye,
  Upload,
  FileText,
  Send,
  Plus,
  Edit,
  Trash2,
  Calendar,
  CheckSquare
} from "lucide-react";
import exampleImage from 'figma:asset/60218b733cc30749bf1794c634338265b3ef4051.png';

interface SendInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'customer' | 'vendor';
  onSendInvitation?: (invitationData: any) => void;
}

interface TemplateSection {
  id: string;
  name: string;
  description: string;
  selected: boolean;
  type: 'document' | 'form' | 'communication';
}

interface Invitation {
  id: string;
  recipient: string;
  email: string;
  type: 'customer' | 'vendor';
  status: 'sent' | 'accepted' | 'pending' | 'expired';
  sentDate: string;
  sentBy: string;
  reminders: number;
  expire: string;
}

export function SendInvitationModal({ 
  isOpen, 
  onClose, 
  initialType = 'customer',
  onSendInvitation 
}: SendInvitationModalProps) {
  const [selectedType, setSelectedType] = useState<'customer' | 'vendor'>(initialType);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [activeTab, setActiveTab] = useState<'form' | 'invitations'>('form');

  const [templateSections, setTemplateSections] = useState<TemplateSection[]>([
    {
      id: 'sales_contact',
      name: 'SALES CONTACT',
      description: 'Sales Contact',
      selected: false,
      type: 'form'
    },
    {
      id: 'nda',
      name: 'NDA',
      description: 'NDA Document',
      selected: false,
      type: 'document'
    },
    {
      id: 'communication',
      name: 'COMMUNICATION',
      description: 'Quarterly Price List Change',
      selected: false,
      type: 'communication'
    },
    {
      id: 'test',
      name: 'TEST',
      description: 'Test',
      selected: false,
      type: 'form'
    },
    {
      id: 'welcome_note',
      name: 'WELCOME NOTE',
      description: 'A Welcome Form To Onboard Partners.',
      selected: true,
      type: 'communication'
    }
  ]);

  // Mock invitation data
  const [invitations] = useState<Invitation[]>([
    {
      id: 'INV-2024-001',
      recipient: 'John Smith',
      email: 'john.smith@techcorp.com',
      type: 'vendor',
      status: 'sent',
      sentDate: '20/01/2024',
      sentBy: 'Sarah Wilson',
      reminders: 0,
      expire: '20/02'
    },
    {
      id: 'INV-2024-002',
      recipient: 'Maria Garcia',
      email: 'maria@solutions.com',
      type: 'customer',
      status: 'accepted',
      sentDate: '18/01/2024',
      sentBy: 'John Doe',
      reminders: 1,
      expire: '18/02'
    }
  ]);

  const handleTemplateToggle = (templateId: string) => {
    setTemplateSections(prev => prev.map(template => 
      template.id === templateId 
        ? { ...template, selected: !template.selected }
        : template
    ));
  };

  const handleSendInvitation = () => {
    if (!email || !fullName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const selectedTemplates = templateSections.filter(t => t.selected);
    if (selectedTemplates.length === 0) {
      toast.error("Please select at least one template");
      return;
    }

    const invitationData = {
      email,
      fullName,
      type: selectedType,
      templates: selectedTemplates,
      id: `INV-${Date.now()}`,
      sentDate: new Date().toLocaleDateString(),
      status: 'sent'
    };

    if (onSendInvitation) {
      onSendInvitation(invitationData);
    }

    toast.success(`${selectedType === 'customer' ? 'Customer' : 'Vendor'} invitation sent successfully!`);
    
    // Reset form
    setEmail("");
    setFullName("");
    setTemplateSections(prev => prev.map(t => ({ ...t, selected: false })));
  };

  const handleBulkUpload = () => {
    toast.info("Bulk upload functionality will be available soon");
  };

  const handleFromExcel = () => {
    toast.info("Excel import functionality will be available soon");
  };

  const handleFromERP = () => {
    toast.info("ERP import functionality will be available soon");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">New Request</h2>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleFromExcel}>
              From Excel
            </Button>
            <Button size="sm" onClick={handleFromERP}>
              From ERP
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {/* Type Selection */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedType('customer')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedType === 'customer' 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedType === 'customer' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {selectedType === 'customer' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    Customer
                  </button>
                  <button
                    onClick={() => setSelectedType('vendor')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedType === 'vendor' 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedType === 'vendor' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {selectedType === 'vendor' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    Vendor
                  </button>
                </div>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              {/* Template Sections */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {templateSections.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      template.selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleTemplateToggle(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-gray-900 mb-1">
                            {template.name}
                          </h3>
                          <p className="text-xs text-gray-600">{template.description}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          {template.selected && (
                            <CheckSquare className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Button variant="outline">
                    More
                  </Button>
                  <Button variant="outline">
                    <CheckSquare className="w-4 h-4 mr-2" />
                    Check List
                  </Button>
                  <Button variant="outline" onClick={handleBulkUpload}>
                    <Upload className="w-4 h-4 mr-2" />
                    Bulk Upload
                  </Button>
                </div>
                <Button onClick={handleSendInvitation} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>

              {/* Invitations Table */}
              <div className="mt-8">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Recent Invitations</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invitation</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent By</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reminders</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expire</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {invitations.map((invitation) => (
                          <tr key={invitation.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{invitation.id}</td>
                            <td className="px-4 py-3">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{invitation.recipient}</div>
                                <div className="text-sm text-gray-500">{invitation.email}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge 
                                className={`text-xs ${
                                  invitation.type === 'vendor' 
                                    ? 'bg-purple-100 text-purple-800 border-purple-200' 
                                    : 'bg-blue-100 text-blue-800 border-blue-200'
                                }`}
                              >
                                {invitation.type.toUpperCase()}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge className={`text-xs ${getStatusColor(invitation.status)}`}>
                                {invitation.status.toUpperCase()}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{invitation.sentDate}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{invitation.sentBy}</td>
                            <td className="px-4 py-3">
                              <span className={`text-sm ${invitation.reminders > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
                                {invitation.reminders} sent
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{invitation.expire}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button className="p-1 text-gray-400 hover:text-blue-600">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-green-600">
                                  <Send className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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