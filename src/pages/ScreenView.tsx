import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const ScreenView = () => {
  const { logout } = useAuth();

  return (
    <div className="h-screen bg-black text-white p-6 overflow-hidden">
        <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity">
            <Button onClick={logout} variant="destructive" size="sm">Exit Kiosk Mode</Button>
        </div>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl font-bold mb-8 animate-pulse">Now Serving</h1>
        
        <div className="grid grid-cols-2 gap-12 text-center w-full max-w-4xl">
            <div className="p-8 bg-gray-900 rounded-2xl border-2 border-green-500">
                <h2 className="text-3xl text-green-400 mb-6 uppercase tracking-wider">Ready</h2>
                <div className="space-y-4">
                    <div className="text-5xl font-mono text-white">#102</div>
                    <div className="text-5xl font-mono text-white">#105</div>
                </div>
            </div>
            
             <div className="p-8 bg-gray-900 rounded-2xl border-2 border-yellow-500">
                <h2 className="text-3xl text-yellow-400 mb-6 uppercase tracking-wider">Preparing</h2>
                <div className="space-y-4">
                    <div className="text-5xl font-mono text-white">#108</div>
                    <div className="text-5xl font-mono text-white">#109</div>
                    <div className="text-5xl font-mono text-white">#110</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenView;
