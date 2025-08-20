import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { 
  Link, 
  Copy, 
  ExternalLink, 
  User, 
  Building, 
  RefreshCw,
  Users,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Star
} from "lucide-react";

interface LinkGeneratorProps {
  onNavigate?: (view: string, id?: string) => void;
}

interface GeneratedLink {
  id: string;
  type: 'customer' | 'vendor';
  url: string;
  inviterName: string;
  companyName: string;
  createdAt: Date;
  urlType: 'query-param' | 'path-based' | 'demo';
}

export function LinkGenerator({ onNavigate }: LinkGeneratorProps) {
  const [inviterName, setInviterName] = useState("Sarah Chen");
  const [companyName, setCompanyName] = useState("ProjectFlow Solutions");
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateLink = (type: 'customer' | 'vendor', urlType: 'query-param' | 'path-based' = 'query-param') => {
    const baseUrl = window.location.origin;
    const invitationId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    let url: string;
    if (urlType === 'query-param') {
      // Query parameter-based URL (RECOMMENDED for SPA)
      url = `${baseUrl}?uid=${invitationId}&type=${type}&inviter=${encodeURIComponent(inviterName)}&company=${encodeURIComponent(companyName)}`;
    } else {
      // Traditional path-based URL (may require routing setup)
      url = `${baseUrl}/user/${type === 'customer' ? 'customerview' : 'partnerview'}?uid=${invitationId}&inviter=${encodeURIComponent(inviterName)}&company=${encodeURIComponent(companyName)}`;
    }
    
    const newLink: GeneratedLink = {
      id: invitationId,
      type,
      url,
      inviterName,
      companyName,
      createdAt: new Date(),
      urlType
    };

    setGeneratedLinks(prev => [newLink, ...prev]);
    
    toast.success(`${type === 'customer' ? 'Customer' : 'Vendor'} onboarding link generated!`, {
      description: "Link copied to clipboard and ready to use",
      duration: 4000
    });

    // Copy to clipboard
    navigator.clipboard.writeText(url);
    setCopiedId(invitationId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateDemoLink = (type: 'customer' | 'vendor') => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}?demo=onboarding&type=${type}`;
    
    const newLink: GeneratedLink = {
      id: `demo-${type}-${Date.now()}`,
      type,
      url,
      inviterName: "Demo Mode",
      companyName: "Demo Company",
      createdAt: new Date(),
      urlType: 'demo'
    };

    setGeneratedLinks(prev => [newLink, ...prev]);
    
    toast.success(`${type === 'customer' ? 'Customer' : 'Vendor'} demo link generated!`, {
      description: "Perfect for testing - works immediately",
      duration: 3000
    });

    // Copy to clipboard
    navigator.clipboard.writeText(url);
    setCopiedId(newLink.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const clearHistory = () => {
    setGeneratedLinks([]);
    toast.success("Link history cleared");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Link Generator
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate onboarding links for customers and vendors
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <Link className="h-3 w-3 mr-1" />
            Quick Links
          </Badge>
        </div>
      </div>

      {/* URL Format Guide */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Recommended URL Format
          </CardTitle>
          <CardDescription>
            Query parameter format works best in single-page applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <Star className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900">Query Parameter Format (Best Choice)</p>
                <p className="text-green-700 mb-2">✅ Works immediately in all environments • ✅ No setup required • ✅ Most reliable</p>
                <code className="text-xs bg-green-100 px-2 py-1 rounded">?uid=123&type=customer&inviter=Name&company=Company</code>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs text-blue-700">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Path-based Format</p>
                  <p>Traditional URLs, may need routing</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <RefreshCw className="h-3 w-3 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Demo Format</p>
                  <p>Quick testing with sample data</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Primary Link Generator - Query Parameter Format */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Star className="h-5 w-5 text-green-600" />
              Generate Links (Recommended)
            </CardTitle>
            <CardDescription>
              Create reliable onboarding links that work in all environments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="inviter">Inviter Name</Label>
                <Input
                  id="inviter"
                  value={inviterName}
                  onChange={(e) => setInviterName(e.target.value)}
                  placeholder="Enter inviter name"
                  className="bg-white/70"
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  className="bg-white/70"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <p className="text-sm font-medium text-green-900">Query Parameter Format (Works Everywhere)</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => generateLink('customer', 'query-param')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!inviterName.trim() || !companyName.trim()}
                >
                  <User className="h-4 w-4 mr-2" />
                  Customer Link
                </Button>
                <Button
                  onClick={() => generateLink('vendor', 'query-param')}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  disabled={!inviterName.trim() || !companyName.trim()}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Vendor Link
                </Button>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm font-medium text-yellow-900">Traditional Path Format (Advanced)</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => generateLink('customer', 'path-based')}
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50"
                  disabled={!inviterName.trim() || !companyName.trim()}
                >
                  <User className="h-4 w-4 mr-2" />
                  Customer Path
                </Button>
                <Button
                  onClick={() => generateLink('vendor', 'path-based')}
                  variant="outline"
                  className="border-green-200 hover:bg-green-50"
                  disabled={!inviterName.trim() || !companyName.trim()}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Vendor Path
                </Button>
              </div>
              <p className="text-xs text-yellow-700">⚠️ May require additional routing configuration</p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Links */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <RefreshCw className="h-5 w-5" />
              Demo Links
            </CardTitle>
            <CardDescription>
              Generate quick demo links for testing and presentations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-purple-700">
                Demo links use predefined data and work immediately - perfect for testing the onboarding flow.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => generateDemoLink('customer')}
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50"
                >
                  <User className="h-4 w-4 mr-2" />
                  Customer Demo
                </Button>
                <Button
                  onClick={() => generateDemoLink('vendor')}
                  variant="outline"
                  className="border-green-200 hover:bg-green-50"
                >
                  <Building className="h-4 w-4 mr-2" />
                  Vendor Demo
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-900">Perfect For</p>
              <div className="text-sm text-purple-700 space-y-1">
                <p>• Quick testing and validation</p>
                <p>• Sales demonstrations</p>
                <p>• Internal presentations</p>
                <p>• No setup or data required</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Links History */}
      {generatedLinks.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Generated Links
                </CardTitle>
                <CardDescription>
                  Recent links you've generated ({generatedLinks.length} total)
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearHistory}
                className="text-red-600 hover:bg-red-50"
              >
                Clear History
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge 
                        variant={link.type === 'customer' ? 'default' : 'secondary'}
                        className={link.type === 'customer' 
                          ? 'bg-blue-100 text-blue-700 border-blue-200' 
                          : 'bg-green-100 text-green-700 border-green-200'
                        }
                      >
                        {link.type === 'customer' ? (
                          <User className="h-3 w-3 mr-1" />
                        ) : (
                          <Building className="h-3 w-3 mr-1" />
                        )}
                        {link.type === 'customer' ? 'Customer' : 'Vendor'}
                      </Badge>
                      
                      <Badge 
                        variant="outline" 
                        className={
                          link.urlType === 'demo' 
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : link.urlType === 'query-param'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }
                      >
                        {link.urlType === 'demo' && <RefreshCw className="h-3 w-3 mr-1" />}
                        {link.urlType === 'query-param' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {link.urlType === 'path-based' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {link.urlType === 'demo' ? 'Demo' : 
                         link.urlType === 'query-param' ? 'Recommended' : 'Path-based'}
                      </Badge>

                      {link.urlType === 'query-param' && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Star className="h-3 w-3 mr-1" />
                          Best Choice
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {link.url}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                      <span>Inviter: {link.inviterName}</span>
                      <span>•</span>
                      <span>Company: {link.companyName}</span>
                      <span>•</span>
                      <span>{link.createdAt.toLocaleTimeString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(link.url, link.id)}
                      className={copiedId === link.id ? 'text-green-600' : ''}
                    >
                      <Copy className="h-4 w-4" />
                      {copiedId === link.id ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openLink(link.url)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Test
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Guide */}
      <Card className="border-gray-200 bg-gray-50/50">
        <CardHeader>
          <CardTitle className="text-gray-900">Link Usage Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Query Parameter Links
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• ✅ Works in all environments</li>
                <li>• ✅ No routing setup required</li>
                <li>• ✅ Most reliable format</li>
                <li>• ✅ Perfect for production use</li>
                <li>• ✅ Recommended choice</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Path-based Links
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Traditional URL format</li>
                <li>• May require routing setup</li>
                <li>• SEO-friendly URLs</li>
                <li>• Advanced configuration needed</li>
                <li>• Use with caution</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Demo Links
              </h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Quick testing and demos</li>
                <li>• No setup required</li>
                <li>• Predefined sample data</li>
                <li>• Perfect for presentations</li>
                <li>• Always reliable</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}