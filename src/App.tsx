import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import ScreenView from "./pages/ScreenView";
import Unauthorized from "./pages/Unauthorized";
import { AdminProvider } from "./contexts/AdminContext";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminScreens from "./pages/admin/AdminScreens";
import ScreenAssignment from "./pages/admin/ScreenAssignment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Public Routes */}
            <Route path="/" element={<Index />} />

            {/* Super Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <AdminProvider>
                    <SuperAdminDashboard />
                  </AdminProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/restaurants"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <AdminProvider>
                    <AdminRestaurants />
                  </AdminProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/screens"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <AdminProvider>
                    <AdminScreens />
                  </AdminProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/screens/:id"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <AdminProvider>
                    <ScreenAssignment />
                  </AdminProvider>
                </ProtectedRoute>
              }
            />

            {/* Restaurant Admin Routes */}
            <Route
              path="/restaurant"
              element={
                <ProtectedRoute allowedRoles={['RESTAURANT']}>
                  <RestaurantDashboard />
                </ProtectedRoute>
              }
            />

            {/* Screen Routes */}
            <Route
              path="/screen"
              element={
                <ProtectedRoute allowedRoles={['SCREEN', 'SUPER_ADMIN']}>
                  <AdminProvider>
                    <ScreenView />
                  </AdminProvider>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
