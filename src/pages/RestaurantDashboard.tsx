import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { callService, Call } from "@/services/callService";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Clock, LogOut, Phone, CheckCircle2 } from "lucide-react";

const RestaurantDashboard = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  const fetchCalls = async () => {
    try {
      const data = await callService.getCalls();
      setCalls(data);
    } catch (error) {
      console.error("Failed to fetch calls", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
    const interval = setInterval(fetchCalls, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (id: string) => {
    await callService.acceptCall(id);
    fetchCalls();
  };

  const handleEnd = async (id: string) => {
    await callService.endCall(id);
    fetchCalls();
  };

  const handleCreateDummyCall = async () => {
    await callService.createDummyCall();
    fetchCalls();
  };

  const activeCalls = calls.filter(c => c.status === 'ACTIVE');
  const pendingCalls = calls.filter(c => c.status === 'PENDING');
  const completedCalls = calls.filter(c => c.status === 'COMPLETED').slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">KioskConnect</h1>
              <p className="text-sm text-blue-200">Welcome, {user?.name}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleCreateDummyCall} 
              variant="outline" 
              className="bg-yellow-500/20 border-yellow-500/50 text-yellow-200 hover:bg-yellow-500/30 backdrop-blur-sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              Test Call
            </Button>
            <Button 
              onClick={logout} 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-lg">Loading calls...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Active Calls Section */}
            {activeCalls.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  Active Calls
                </h2>
                <div className="grid gap-4">
                  {activeCalls.map((call) => (
                    <Card 
                      key={call.id} 
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 shadow-xl shadow-green-500/20 backdrop-blur-sm"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <Phone className="w-6 h-6 text-green-400" />
                              <h3 className="text-2xl font-bold text-white">{call.screenName}</h3>
                              <Badge className="bg-green-600 hover:bg-green-700 text-white">
                                IN PROGRESS
                              </Badge>
                            </div>
                            <p className="text-sm text-green-200 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Started: {call.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          <Button 
                            onClick={() => handleEnd(call.id)} 
                            size="lg"
                            className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
                          >
                            End Call
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Pending Calls Section */}
            {pendingCalls.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  Incoming Calls
                </h2>
                <div className="grid gap-4">
                  {pendingCalls.map((call) => (
                    <Card 
                      key={call.id} 
                      className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500 shadow-xl shadow-yellow-500/20 backdrop-blur-sm hover:scale-[1.02] transition-transform"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <Phone className="w-6 h-6 text-yellow-400 animate-bounce" />
                              <h3 className="text-2xl font-bold text-white">{call.screenName}</h3>
                              <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white">
                                PENDING
                              </Badge>
                            </div>
                            <p className="text-sm text-yellow-200 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Received: {call.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          <Button 
                            onClick={() => handleAccept(call.id)} 
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                          >
                            Accept Call
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* No Active/Pending Calls */}
            {activeCalls.length === 0 && pendingCalls.length === 0 && (
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center p-16 text-center">
                  <CheckCircle2 className="w-20 h-20 text-green-400 mb-4 opacity-50" />
                  <h3 className="text-2xl font-bold text-white mb-2">All Clear!</h3>
                  <p className="text-blue-200">No active or pending calls at the moment.</p>
                </CardContent>
              </Card>
            )}

            {/* Recent Completed Calls */}
            {completedCalls.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white/70 mb-3">Recent History</h2>
                <div className="grid gap-2">
                  {completedCalls.map((call) => (
                    <Card 
                      key={call.id} 
                      className="bg-white/5 border-white/10 backdrop-blur-sm"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-gray-400" />
                            <span className="text-white/70">{call.screenName}</span>
                            <Badge variant="outline" className="border-white/20 text-white/50">
                              COMPLETED
                            </Badge>
                          </div>
                          <p className="text-sm text-white/50">
                            {call.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboard;
