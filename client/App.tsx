import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import IssuerDashboard from "./pages/IssuerDashboard";
import VerificationPage from "./pages/VerificationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/issuer" element={<IssuerDashboard />} />
            <Route path="/verify" element={<VerificationPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// Initialize React app
const container = document.getElementById("root")!;

// Store root in a global variable to prevent recreation during HMR
declare global {
  var __reactRoot: ReturnType<typeof createRoot> | undefined;
}

// Create root only once, reuse during HMR
let root = globalThis.__reactRoot;
if (!root) {
  root = globalThis.__reactRoot = createRoot(container);
}

// Render the app
root.render(<App />);
