import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { QRModal } from "@/components/ui/qr-modal";
import { copyToClipboard, getClipboardMessage } from "@/lib/clipboard";
import { createShareableUrl, generateProfileUrl, handleUrlError } from "@/lib/url-utils";
import { toast } from "sonner";
import {
  Shield,
  Award,
  ExternalLink,
  Calendar,
  Building,
  QrCode,
  Wallet,
  Trophy,
  BookOpen,
  Code,
  Users,
  Share,
} from "lucide-react";

// Mock data for demonstration
const mockCredentials = [
  {
    id: "1",
    title: "React Developer Certification",
    issuer: "TechAcademy",
    issuerLogo: "/placeholder.svg",
    date: "2024-01-15",
    type: "Certificate",
    description:
      "Advanced React development skills including hooks, state management, and testing",
    eventLink: "https://techacademy.com/certificates/react-dev-2024",
    metadata: {
      courseHours: "40",
      grade: "A+",
      skills: ["React", "TypeScript", "Testing"],
    },
  },
  {
    id: "2",
    title: "Blockchain Hackathon Winner",
    issuer: "CryptoHack 2024",
    issuerLogo: "/placeholder.svg",
    date: "2024-02-20",
    type: "Achievement",
    description: "First place winner for DeFi protocol innovation",
    eventLink: "https://cryptohack2024.com",
    metadata: {
      placement: "1st Place",
      team: "4 members",
      prize: "$10,000",
    },
  },
  {
    id: "3",
    title: "Full Stack Development Bootcamp",
    issuer: "CodeUniversity",
    issuerLogo: "/placeholder.svg",
    date: "2023-12-10",
    type: "Course Completion",
    description:
      "Comprehensive full-stack development program covering frontend and backend technologies",
    eventLink: "https://codeuniversity.edu/bootcamp",
    metadata: {
      duration: "12 weeks",
      grade: "Distinction",
      projects: "5 completed",
    },
  },
];

export default function StudentDashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [credentials, setCredentials] = useState(mockCredentials);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<typeof mockCredentials[0] | null>(null);

  const connectWallet = async () => {
    // Mock wallet connection - in real app would use Aptos wallet adapter
    setIsConnected(true);
    setWalletAddress("0x1234...abcd");
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
  };

  const handleGenerateQR = (credential: typeof mockCredentials[0]) => {
    setSelectedCredential(credential);
    setQrModalOpen(true);
  };

  const handleShare = async (credential: typeof mockCredentials[0]) => {
    if (!walletAddress) {
      toast.error("Share failed", {
        description: "Wallet not connected. Please connect your wallet first."
      });
      return;
    }

    try {
      const shareData = createShareableUrl(credential, walletAddress);

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          console.error('Share failed:', error);
        }
      }

      // Fallback to copying URL
      const result = await copyToClipboard(shareData.url);

      if (result.success) {
        toast.success("Ready to share!", {
          description: "Verification URL copied to clipboard. You can now paste it anywhere to share this credential."
        });
      } else {
        toast.error("Share failed", {
          description: "Please copy the verification URL manually and share it."
        });
      }
    } catch (error) {
      const errorMessage = handleUrlError(error);
      toast.error("Share Failed", {
        description: errorMessage
      });
    }
  };

  const handleShareProfile = () => {
    if (!walletAddress) {
      toast.error("Share failed", {
        description: "Wallet not connected. Please connect your wallet first."
      });
      return;
    }

    try {
      // Create a profile credential object for QR generation
      const profileCredential = {
        id: "profile",
        title: "Complete Credential Profile",
        issuer: "CredVault",
        date: new Date().toISOString(),
        type: "Profile",
        description: `Complete credential collection for wallet ${walletAddress}`,
        eventLink: generateProfileUrl(walletAddress),
        metadata: {
          totalCredentials: credentials.length,
          walletAddress: walletAddress,
          certificates: credentials.filter(c => c.type === "Certificate").length,
          achievements: credentials.filter(c => c.type === "Achievement").length,
          courses: credentials.filter(c => c.type === "Course Completion").length
        }
      };
      setSelectedCredential(profileCredential);
      setQrModalOpen(true);
    } catch (error) {
      const errorMessage = handleUrlError(error);
      toast.error("Profile Share Failed", {
        description: errorMessage
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Certificate":
        return <Award className="h-5 w-5" />;
      case "Achievement":
        return <Trophy className="h-5 w-5" />;
      case "Course Completion":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Certificate":
        return "bg-blue-100 text-blue-800";
      case "Achievement":
        return "bg-yellow-100 text-yellow-800";
      case "Course Completion":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl text-gray-900">
                  CredVault
                </span>
              </Link>
              <Badge variant="secondary" className="ml-2">
                Student
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/verify" className="text-gray-700 hover:text-primary">
                Verify
              </Link>
              <Link to="/issuer" className="text-gray-700 hover:text-primary">
                Issuer
              </Link>
              {isConnected ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{walletAddress}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={disconnectWallet}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          /* Wallet Connection Prompt */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 mb-8">
                Connect your Aptos wallet to view your credential collection and
                manage your achievements.
              </p>
              <Button
                onClick={connectWallet}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Wallet className="h-5 w-5 mr-2" />
                Connect Petra or Martian Wallet
              </Button>
            </div>
          </div>
        ) : (
          /* Dashboard Content */
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    My Credentials
                  </h1>
                  <p className="text-gray-600">Wallet: {walletAddress}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">
                          {credentials.length}
                        </p>
                        <p className="text-sm text-gray-600">
                          Total Credentials
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Award className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">
                          {
                            credentials.filter((c) => c.type === "Certificate")
                              .length
                          }
                        </p>
                        <p className="text-sm text-gray-600">Certificates</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-8 w-8 text-yellow-500" />
                      <div>
                        <p className="text-2xl font-bold">
                          {
                            credentials.filter((c) => c.type === "Achievement")
                              .length
                          }
                        </p>
                        <p className="text-sm text-gray-600">Achievements</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">
                          {
                            credentials.filter(
                              (c) => c.type === "Course Completion",
                            ).length
                          }
                        </p>
                        <p className="text-sm text-gray-600">Courses</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Credentials Grid */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Credential Collection</h2>
                <Button variant="outline" onClick={handleShareProfile}>
                  <QrCode className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
              </div>

              {credentials.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Credentials Yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start earning credentials by completing courses,
                      participating in events, or achieving certifications from
                      verified issuers.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {credentials.map((credential) => (
                    <Card
                      key={credential.id}
                      className="border-2 hover:border-primary/20 transition-colors"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={credential.issuerLogo} />
                              <AvatarFallback>
                                <Building className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-xl">
                                {credential.title}
                              </CardTitle>
                              <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                                <Building className="h-4 w-4" />
                                <span>{credential.issuer}</span>
                                <Separator
                                  orientation="vertical"
                                  className="h-4"
                                />
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(
                                    credential.date,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getTypeColor(credential.type)}>
                              {getTypeIcon(credential.type)}
                              <span className="ml-1">{credential.type}</span>
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          {credential.description}
                        </p>

                        {/* Metadata */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          {Object.entries(credential.metadata).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="bg-gray-50 p-3 rounded-lg"
                              >
                                <p className="text-sm font-medium text-gray-900 capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </p>
                                <p className="text-sm text-gray-600">{value}</p>
                              </div>
                            ),
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={credential.eventLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Details
                            </a>
                          </Button>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGenerateQR(credential)}
                            >
                              <QrCode className="h-4 w-4 mr-2" />
                              Generate QR
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShare(credential)}
                            >
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* QR Code Modal */}
      <QRModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        credential={selectedCredential}
        walletAddress={walletAddress}
      />
    </div>
  );
}
