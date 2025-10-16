import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute"; // We will create this
import { Spinner } from "./components/ui/spinner"; // Assuming you have a spinner
import { CommunityPage } from "./pages/CommunityPage";
import { ChatPage } from "./pages/ChatPage";

// Import all your page components
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Tools from "./pages/Tools";
import Warehouse from "./pages/Warehouse";
import SoilCheck from "./pages/SoilCheck";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PaymentHistory from "./pages/PaymentHistory";

// import ChatBot from "./components/ChatBot";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminTools } from "./pages/admin/AdminTools";
import { AdminWarehouses } from "./pages/admin/AdminWarehouses";
import { AdminSoilChecks } from "./pages/admin/AdminSoilChecks";
import { AdminUsers } from "./pages/admin/AdminUsers";
import AdminToolBookings from "./pages/admin/AdminToolBookings";
import AdminWarehouseBookings from "./pages/admin/AdminWarehouseBookings";
import "./lib/i18n";

const queryClient = new QueryClient();

// This component contains the routing logic and can access the auth context
const AppRoutes = () => {
  const { loading } = useAuth();

  // Show a global spinner while the app determines the user's auth state
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/warehouse" element={<Warehouse />} />
      <Route path="/soil-check" element={<SoilCheck />} />
      <Route path="/community" element={<CommunityPage/>}/>
      <Route path="/community/chat" element={<ChatPage />} /> {/* <-- ADD THIS NEW ROUTE */}


      {/* <Route path="/community/discussion" element={<DiscussionPage />} /> {/* <-- Main discussion list */}
      {/* <Route path="/community/post/:postId" element={<PostDetailPage />} /> <-- Single post view */}
      {/* <Route path="/community/create-post" element={<CreatePostPage />} /> <-- Form to create post */} 


      <Route path="/contact" element={<Contact />} />
      
      {/* Routes that require a user to be logged in (but not necessarily an admin) */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/payment-history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
      
      {/* Admin Routes - requires user to be an admin */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="tools" element={<AdminTools />} />
        <Route path="warehouses" element={<AdminWarehouses />} />
        <Route path="soil-checks" element={<AdminSoilChecks />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="tool-bookings" element={<AdminToolBookings />} />
              <Route path="warehouse-bookings" element={<AdminWarehouseBookings />} />

      </Route>
      
      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// The main App component now focuses on setting up providers
const App = () => (
  <BrowserRouter> {/* 👈 Router is now the outermost component */}
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider> {/* 👈 AuthProvider is now inside the Router */}
          <Toaster />
          <Sonner />
          <AppRoutes /> {/* 👈 The component with routing logic */}
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;