import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { 
  X,
  Save,
  Eye,
  Send,
  Plus,
  Trash2,
  Type,
  Image,
  Link,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Hash,
  Mail
} from "lucide-react";

interface CreateEmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTemplate?: (templateData: any) => void;
  initialData?: any;
}

interface TemplateVariable {
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
}

export function CreateEmailTemplateModal({ 
  isOpen, 
  onClose, 
  onCreateTemplate,
  initialData 
}: CreateEmailTemplateModalProps) {
  const [templateName, setTemplateName] = useState(initialData?.name || "");
  const [templateCategory, setTemplateCategory] = useState(initialData?.category || "general");
  const [subject, setSubject] = useState(initialData?.subject || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [variables, setVariables] = useState<TemplateVariable[]>(initialData?.variables || [
    { id: '1', name: 'customer_name', placeholder: 'Customer Name', required: true },
    { id: '2', name: 'company_name', placeholder: 'Company Name', required: true }
  ]);

  const categories = [
    "general",
    "onboarding",
    "purchase",
    "approval",
    "notification",
    "marketing",
    "support"
  ];

  const defaultVariables = [
    { name: 'customer_name', placeholder: 'Customer Name' },
    { name: 'company_name', placeholder: 'Company Name' },
    { name: 'user_name', placeholder: 'User Name' },
    { name: 'date', placeholder: 'Current Date' },
    { name: 'time', placeholder: 'Current Time' },
    { name: 'order_number', placeholder: 'Order Number' },
    { name: 'amount', placeholder: 'Amount' },
    { name: 'status', placeholder: 'Status' }
  ];

  const handleAddVariable = () => {
    const newVariable: TemplateVariable = {
      id: Date.now().toString(),
      name: '',
      placeholder: '',
      required: false
    };
    setVariables([...variables, newVariable]);
  };

  const handleRemoveVariable = (variableId: string) => {
    setVariables(variables.filter(v => v.id !== variableId));
  };

  const handleVariableChange = (variableId: string, field: keyof TemplateVariable, value: any) => {
    setVariables(variables.map(v => 
      v.id === variableId ? { ...v, [field]: value } : v
    ));
  };

  const insertVariable = (variableName: string) => {
    const insertText = `{{${variableName}}}`;
    setContent(prev => prev + insertText);
    setSubject(prev => prev + insertText);
  };

  const handleSave = () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    if (!subject.trim()) {
      toast.error("Please enter an email subject");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter email content");
      return;
    }

    const templateData = {
      id: initialData?.id || `template-${Date.now()}`,
      name: templateName,
      type: 'email',
      category: templateCategory,
      subject,
      content,
      variables: variables.filter(v => v.name.trim() !== ''),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    };

    if (onCreateTemplate) {
      onCreateTemplate(templateData);
    }

    toast.success("Email template created successfully!");
    onClose();
  };

  const handlePreview = () => {
    toast.info("Template preview - modal would show rendered email");
  };

  const handleSendTest = () => {
    toast.info("Test email sent to your email address");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold">Create Email Template</h2>
              <p className="text-sm text-muted-foreground">Design professional email templates with variables</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={handleSendTest}>
              <Send className="h-4 w-4 mr-1" />
              Send Test
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save Template
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(95vh-80px)]">
          {/* Main Editor Area */}
          <div className="flex-1 overflow-auto p-6">
            {/* Template Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Template Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Name *
                    </label>
                    <input
                      type="text"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter template name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={templateCategory}
                      onChange={(e) => setTemplateCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Subject */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Email Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email subject line"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use variables like {"{"}{"{"} customer_name {"}"}{"}"}  to personalize the subject
                </p>
              </CardContent>
            </Card>

            {/* Email Content Editor */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Email Content</CardTitle>
                  {/* Simple Toolbar */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="outline" size="sm">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="outline" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter your email content here...

Dear ${"{{"}customer_name${"}}"}, 

Thank you for your interest in ${"{{"}company_name${"}}"}.  We are excited to work with you.

Best regards,
The ${"{{"}company_name${"}}"} Team`}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use variables in double curly braces like {"{"}{"{"} variable_name {"}"}{"}"}  to make your template dynamic
                </p>
              </CardContent>
            </Card>

            {/* Variables Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Template Variables</CardTitle>
                  <Button onClick={handleAddVariable} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Variable
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {variables.map((variable) => (
                    <div key={variable.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Variable Name
                        </label>
                        <input
                          type="text"
                          value={variable.name}
                          onChange={(e) => handleVariableChange(variable.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="variable_name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Placeholder
                        </label>
                        <input
                          type="text"
                          value={variable.placeholder}
                          onChange={(e) => handleVariableChange(variable.id, 'placeholder', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Display Name"
                        />
                      </div>

                      <div className="flex items-end">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={variable.required}
                            onChange={(e) => handleVariableChange(variable.id, 'required', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">Required</span>
                        </label>
                      </div>

                      <div className="flex items-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => insertVariable(variable.name)}
                        >
                          Insert
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveVariable(variable.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Quick Variables */}
          <div className="w-80 border-l border-gray-200 bg-gray-50">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Variables</h3>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Common Variables</h4>
                <div className="grid grid-cols-1 gap-2">
                  {defaultVariables.map((variable) => (
                    <Button
                      key={variable.name}
                      variant="outline"
                      size="sm"
                      className="justify-start text-xs"
                      onClick={() => insertVariable(variable.name)}
                    >
                      <Hash className="h-3 w-3 mr-1" />
                      {variable.placeholder}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Template Preview</h4>
                <div className="p-4 bg-white rounded-lg border text-sm">
                  <div className="mb-2">
                    <strong>Subject:</strong> {subject || "Email subject will appear here"}
                  </div>
                  <div className="text-gray-600 whitespace-pre-wrap">
                    {content || "Email content will appear here..."}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Template Tips</h4>
                <div className="text-xs text-gray-600 space-y-2">
                  <p>• Use {"{"}{"{"} variable_name {"}"}{"}"}  syntax for dynamic content</p>
                  <p>• Keep subject lines under 50 characters</p>
                  <p>• Test your template before saving</p>
                  <p>• Use clear and concise language</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}