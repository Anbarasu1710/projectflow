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
  Download,
  Plus,
  Trash2,
  FileText,
  Image,
  Table,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  List,
  Hash,
  Settings
} from "lucide-react";

interface CreateDocumentTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTemplate?: (templateData: any) => void;
  initialData?: any;
}

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'table' | 'image' | 'list';
  required: boolean;
}

interface TemplateVariable {
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
}

export function CreateDocumentTemplateModal({ 
  isOpen, 
  onClose, 
  onCreateTemplate,
  initialData 
}: CreateDocumentTemplateModalProps) {
  const [templateName, setTemplateName] = useState(initialData?.name || "");
  const [templateCategory, setTemplateCategory] = useState(initialData?.category || "contract");
  const [description, setDescription] = useState(initialData?.description || "");
  
  const [sections, setSections] = useState<DocumentSection[]>(initialData?.sections || [
    {
      id: '1',
      title: 'Document Header',
      content: `${"{{"}company_name${"}}"}\n${"{{"}company_address${"}}"}\n\nDate: ${"{{"}current_date${"}}"}`,
      type: 'text',
      required: true
    },
    {
      id: '2',
      title: 'Introduction',
      content: `This document outlines the terms and conditions for ${"{{"}agreement_type${"}}"} between ${"{{"}party_a${"}}"} and ${"{{"}party_b${"}}"}.`,
      type: 'text',
      required: true
    }
  ]);

  const [variables, setVariables] = useState<TemplateVariable[]>(initialData?.variables || [
    { id: '1', name: 'company_name', placeholder: 'Company Name', required: true },
    { id: '2', name: 'company_address', placeholder: 'Company Address', required: true },
    { id: '3', name: 'current_date', placeholder: 'Current Date', required: true },
    { id: '4', name: 'agreement_type', placeholder: 'Agreement Type', required: true },
    { id: '5', name: 'party_a', placeholder: 'Party A', required: true },
    { id: '6', name: 'party_b', placeholder: 'Party B', required: true }
  ]);

  const categories = [
    "contract",
    "proposal",
    "invoice",
    "report",
    "letter",
    "form",
    "certificate",
    "agreement"
  ];

  const sectionTypes = [
    { value: 'text', label: 'Text Block', icon: Type },
    { value: 'table', label: 'Table', icon: Table },
    { value: 'image', label: 'Image', icon: Image },
    { value: 'list', label: 'List', icon: List }
  ];

  const defaultVariables = [
    { name: 'company_name', placeholder: 'Company Name' },
    { name: 'company_address', placeholder: 'Company Address' },
    { name: 'current_date', placeholder: 'Current Date' },
    { name: 'current_time', placeholder: 'Current Time' },
    { name: 'user_name', placeholder: 'User Name' },
    { name: 'user_title', placeholder: 'User Title' },
    { name: 'client_name', placeholder: 'Client Name' },
    { name: 'amount', placeholder: 'Amount' },
    { name: 'currency', placeholder: 'Currency' },
    { name: 'project_name', placeholder: 'Project Name' }
  ];

  const handleAddSection = () => {
    const newSection: DocumentSection = {
      id: Date.now().toString(),
      title: 'New Section',
      content: '',
      type: 'text',
      required: false
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId));
  };

  const handleSectionChange = (sectionId: string, field: keyof DocumentSection, value: any) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, [field]: value } : s
    ));
  };

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

  const insertVariable = (variableName: string, sectionId: string) => {
    const insertText = `{{${variableName}}}`;
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, content: s.content + insertText } : s
    ));
  };

  const handleSave = () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    if (sections.length === 0) {
      toast.error("Please add at least one section");
      return;
    }

    const templateData = {
      id: initialData?.id || `doc-template-${Date.now()}`,
      name: templateName,
      type: 'document',
      category: templateCategory,
      description,
      sections: sections.filter(s => s.title.trim() !== ''),
      variables: variables.filter(v => v.name.trim() !== ''),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    };

    if (onCreateTemplate) {
      onCreateTemplate(templateData);
    }

    toast.success("Document template created successfully!");
    onClose();
  };

  const handlePreview = () => {
    toast.info("Document preview - modal would show rendered document");
  };

  const handleDownload = () => {
    toast.info("Document template downloaded as PDF");
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
              <h2 className="text-xl font-semibold">Create Document Template</h2>
              <p className="text-sm text-muted-foreground">Design professional document templates with sections and variables</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter template description"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Document Sections */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Document Sections</CardTitle>
                  <Button onClick={handleAddSection} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sections.map((section, index) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Section {index + 1}</Badge>
                          {section.required && <Badge className="bg-red-100 text-red-800">Required</Badge>}
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={section.type}
                            onChange={(e) => handleSectionChange(section.id, 'type', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                          >
                            {sectionTypes.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveSection(section.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter section title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                          </label>
                          <textarea
                            value={section.content}
                            onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter section content..."
                          />
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-muted-foreground">
                              Use variables like {"{"}{"{"} variable_name {"}"}{"}"}  to make content dynamic
                            </p>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={section.required}
                                  onChange={(e) => handleSectionChange(section.id, 'required', e.target.checked)}
                                  className="rounded border-gray-300"
                                />
                                Required
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Quick Variable Insert */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm text-gray-600">Quick insert:</span>
                          {defaultVariables.slice(0, 6).map((variable) => (
                            <Button
                              key={variable.name}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => insertVariable(variable.name, section.id)}
                            >
                              <Hash className="h-3 w-3 mr-1" />
                              {variable.placeholder}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

                      <div className="flex items-end">
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

          {/* Right Sidebar */}
          <div className="w-80 border-l border-gray-200 bg-gray-50">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Template Tools</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Variables</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {defaultVariables.map((variable) => (
                      <Button
                        key={variable.name}
                        variant="outline"
                        size="sm"
                        className="justify-start text-xs"
                      >
                        <Hash className="h-3 w-3 mr-1" />
                        {variable.placeholder}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Section Types</h4>
                  <div className="space-y-2">
                    {sectionTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div key={type.value} className="flex items-center gap-2 text-sm text-gray-600">
                          <Icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Template Tips</h4>
                  <div className="text-xs text-gray-600 space-y-2">
                    <p>• Use consistent formatting throughout sections</p>
                    <p>• Mark important sections as required</p>
                    <p>• Test variable replacements before saving</p>
                    <p>• Keep sections focused and concise</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Template Stats</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Sections: {sections.length}</p>
                    <p>Variables: {variables.length}</p>
                    <p>Required: {sections.filter(s => s.required).length}</p>
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