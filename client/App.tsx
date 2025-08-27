import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import IssuerDashboard from "./pages/IssuerDashboard";
import VerificationPage from "./pages/VerificationPage";
import Registration from "./pages/Registration";
import StudentRegistration from "./pages/StudentRegistration";
import StaffRegistration from "./pages/StaffRegistration";
import IssuerRegistration from "./pages/IssuerRegistration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/issuer" element={<IssuerDashboard />} />
              <Route path="/verify" element={<VerificationPage />} />

              {/* Registration Routes */}
              <Route path="/register" element={<Registration />} />
              <Route path="/register/student" element={<StudentRegistration />} />
              <Route path="/register/staff" element={<StaffRegistration />} />
              <Route path="/register/issuer" element={<IssuerRegistration />} />

              {/* Staff Dashboard */}
              <Route path="/staff" element={<StaffDashboard />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
