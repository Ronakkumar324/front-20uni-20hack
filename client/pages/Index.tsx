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
import { Shield, Award, Users, QrCode, Lock, CheckCircle } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-900">CredVault</span>
              <Badge variant="secondary" className="ml-2">
                Aptos
              </Badge>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/student" className="text-gray-700 hover:text-primary">
                Student
              </Link>
              <Link to="/issuer" className="text-gray-700 hover:text-primary">
                Issuer
              </Link>
              <Link to="/verify" className="text-gray-700 hover:text-primary">
                Verify
              </Link>
              <Button className="bg-primary hover:bg-primary/90">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-blockchain-100 text-blockchain-800 border-blockchain-200">
              Powered by Aptos Blockchain
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Academic Achievements,
              <span className="block text-primary">Forever Verified</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              CredVault uses soulbound NFTs on Aptos to create tamper-proof,
              permanently verifiable academic credentials. Certificates, course
              completions, and achievements that follow you everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link to="/student">View My Credentials</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/verify">Verify Credentials</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Trust and Permanence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leveraging blockchain technology to ensure your credentials are
              secure, verifiable, and yours forever.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Soulbound & Secure</CardTitle>
                <CardDescription>
                  Non-transferable NFTs that are permanently bound to your
                  wallet, preventing fraud and unauthorized transfers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Award className="h-12 w-12 text-credential-500 mb-4" />
                <CardTitle>Instant Verification</CardTitle>
                <CardDescription>
                  Anyone can verify your credentials instantly using your wallet
                  address or by scanning a QR code.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle>Trusted Issuers</CardTitle>
                <CardDescription>
                  Only verified institutions and organizations can mint
                  credentials, ensuring authenticity and trust.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How CredVault Works
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Earn Achievement</h3>
              <p className="text-gray-600">
                Complete a course, win a hackathon, or earn a certificate from
                an accredited institution.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-credential-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-credential-600">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Receive Credential</h3>
              <p className="text-gray-600">
                Authorized issuers mint a soulbound NFT directly to your wallet
                with all relevant metadata.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Share & Verify</h3>
              <p className="text-gray-600">
                Share your credentials with employers or institutions who can
                instantly verify their authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-credential-500/5">
            <CardContent className="pt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Secure Your Credentials?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of students and institutions using CredVault to
                issue, store, and verify academic achievements on the
                blockchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link to="/student">Get Started as Student</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/issuer">Register as Issuer</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">CredVault</span>
              </div>
              <p className="text-gray-600 mb-4">
                Secure, verifiable academic credentials powered by Aptos
                blockchain technology.
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-credential-500" />
                <span className="text-sm text-gray-600">
                  Deployed on Aptos Testnet
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link to="/student" className="hover:text-primary">
                    Student Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/issuer" className="hover:text-primary">
                    Issuer Portal
                  </Link>
                </li>
                <li>
                  <Link to="/verify" className="hover:text-primary">
                    Verify Credentials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-primary">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Smart Contract
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 CredVault. Built with Move on Aptos.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
