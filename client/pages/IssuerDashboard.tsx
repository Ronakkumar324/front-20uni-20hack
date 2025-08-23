import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Award, 
  Building, 
  Send,
  CheckCircle,
  AlertCircle,
  Calendar,
  FileText,
  Users,
  Plus
} from "lucide-react";

// Mock recent issuances for demonstration
const mockRecentIssuances = [
  {
    id: "1",
    recipient: "0x1234...abcd",
    credentialTitle: "JavaScript Fundamentals",
    type: "Certificate",
    issuedAt: "2024-01-20T10:30:00Z",
    status: "confirmed"
  },
  {
    id: "2", 
    recipient: "0x5678...efgh",
    credentialTitle: "Hackathon Participation",
    type: "Achievement",
    issuedAt: "2024-01-19T15:45:00Z",
    status: "confirmed"
  },
  {
    id: "3",
    recipient: "0x9abc...ijkl",
    credentialTitle: "Data Science Bootcamp",
    type: "Course Completion",
    issuedAt: "2024-01-18T09:15:00Z",
    status: "pending"
  }
];

export default function IssuerDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(true); // Mock authorization
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientAddress: "",
    credentialTitle: "",
    credentialType: "",
    description: "",
    eventLink: "",
    issueDate: "",
    additionalMetadata: ""
  });
  const [recentIssuances] = useState(mockRecentIssuances);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMintCredential = async () => {
    setIsLoading(true);
    
    // Mock minting process - in real app would call Aptos smart contract
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate transaction
      
      // Reset form
      setFormData({
        recipientAddress: "",
        credentialTitle: "",
        credentialType: "",
        description: "",
        eventLink: "",
        issueDate: "",
        additionalMetadata: ""
      });
      
      alert("Credential minted successfully!");
    } catch (error) {
      alert("Failed to mint credential. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.recipientAddress && 
           formData.credentialTitle && 
           formData.credentialType && 
           formData.description;
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50">
        <nav className="border-b bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl text-gray-900">CredVault</span>
              </Link>
            </div>
          </div>
        </nav>
        
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized Access</h2>
          <p className="text-gray-600 mb-8">
            Only authorized institutions and verified issuers can access this dashboard. 
            Please contact the administrator to request access.
          </p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl text-gray-900">CredVault</span>
              </Link>
              <Badge variant="secondary" className="ml-2">Issuer</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/student" className="text-gray-700 hover:text-primary">Student</Link>
              <Link to="/verify" className="text-gray-700 hover:text-primary">Verify</Link>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Authorized
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Issuer Dashboard</h1>
          <p className="text-gray-600">Mint and manage soulbound credential NFTs for your students and participants.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mint Credential Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Mint New Credential</span>
                </CardTitle>
                <CardDescription>
                  Create a new soulbound NFT credential for a student or participant.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientAddress">Recipient Wallet Address *</Label>
                    <Input
                      id="recipientAddress"
                      placeholder="0x1234abcd..."
                      value={formData.recipientAddress}
                      onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="credentialType">Credential Type *</Label>
                    <Select value={formData.credentialType} onValueChange={(value) => handleInputChange("credentialType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="certificate">Certificate</SelectItem>
                        <SelectItem value="achievement">Achievement</SelectItem>
                        <SelectItem value="course_completion">Course Completion</SelectItem>
                        <SelectItem value="participation">Event Participation</SelectItem>
                        <SelectItem value="award">Award/Recognition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credentialTitle">Credential Title *</Label>
                  <Input
                    id="credentialTitle"
                    placeholder="e.g., React Developer Certification"
                    value={formData.credentialTitle}
                    onChange={(e) => handleInputChange("credentialTitle", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the achievement, skills demonstrated, or requirements met..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventLink">Event/Course Link</Label>
                    <Input
                      id="eventLink"
                      placeholder="https://..."
                      value={formData.eventLink}
                      onChange={(e) => handleInputChange("eventLink", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => handleInputChange("issueDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalMetadata">Additional Metadata (JSON)</Label>
                  <Textarea
                    id="additionalMetadata"
                    placeholder='{"grade": "A+", "hours": "40", "skills": ["React", "TypeScript"]}'
                    value={formData.additionalMetadata}
                    onChange={(e) => handleInputChange("additionalMetadata", e.target.value)}
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">
                    Optional: Add custom metadata as JSON (e.g., grades, duration, skills)
                  </p>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <Alert className="flex-1 mr-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Credentials are soulbound and cannot be transferred once minted.
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    onClick={handleMintCredential} 
                    disabled={!isFormValid() || isLoading}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                        Minting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Mint Credential
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Stats & Recent Activity */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Issuer Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Issued</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Students</span>
                  <span className="font-semibold">89</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <Badge className="bg-green-100 text-green-800">99.2%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Recent Issuances</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIssuances.map((issuance) => (
                    <div key={issuance.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{issuance.credentialTitle}</p>
                        <p className="text-xs text-gray-600">
                          {issuance.recipient}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(issuance.issuedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge 
                        className={
                          issuance.status === "confirmed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {issuance.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Bulk Import Recipients
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/verify">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify Credentials
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
