import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const SuperAdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>
      <div className="grid gap-6">
        <div className="p-6 bg-white rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}</h2>
          <p className="text-gray-600">You have full access to all system settings.</p>
        </div>
        {/* Placeholder for admin stats/controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-900">Total Restaurants</h3>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg border border-green-100">
            <h3 className="font-semibold text-green-900">Active Screens</h3>
            <p className="text-2xl font-bold text-green-600">45</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="font-semibold text-purple-900">System Status</h3>
            <p className="text-2xl font-bold text-purple-600">Healthy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
