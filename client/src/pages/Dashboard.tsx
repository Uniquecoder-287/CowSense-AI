import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockCows } from "@/lib/mockData";
import { Activity, Thermometer, Zap, Brain, MapPin, FileText, ChevronRight, Droplets, Heart } from "lucide-react";
import avatarImage from "@assets/generated_images/futuristic_cow_avatar_for_profile.png";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const healthyCount = mockCows.filter(c => c.status === 'healthy').length;
  const criticalCount = mockCows.filter(c => c.status === 'critical').length;
  const warningCount = mockCows.filter(c => c.status === 'warning').length;
  const avgHealthScore = Math.round(mockCows.reduce((acc, cow) => acc + cow.healthScore, 0) / mockCows.length);

  return (
    <MobileLayout>
      {/* Welcome Section */}
      <div className="mb-6 mt-2 flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-heading font-semibold text-foreground">
            Hello, Farmer
          </h2>
          <p className="text-muted-foreground text-sm">Here's your herd overview</p>
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
          <img src={avatarImage} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Main Health Score Ring (Aggregate) */}
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          
          {/* Ring SVG */}
          <svg className="w-full h-full transform -rotate-90">
             <circle 
              cx="96" cy="96" r="80" 
              stroke="currentColor" strokeWidth="12" fill="transparent" 
              className="text-white/40" 
             />
             <circle 
              cx="96" cy="96" r="80" 
              stroke="currentColor" strokeWidth="12" fill="transparent" 
              strokeDasharray={2 * Math.PI * 80}
              strokeDashoffset={2 * Math.PI * 80 * (1 - avgHealthScore / 100)}
              strokeLinecap="round"
              className={cn(
                "transition-all duration-1000 ease-out",
                avgHealthScore > 80 ? "text-primary" : avgHealthScore > 50 ? "text-orange-400" : "text-red-500"
              )} 
             />
          </svg>
          
          <div className="absolute text-center">
            <span className="text-5xl font-heading font-bold text-foreground block">{avgHealthScore}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Herd Health</span>
          </div>
        </div>
      </div>

      {/* Quick Vitals Cards */}
      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Quick Vitals (Avg)</h3>
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="glass p-4 rounded-3xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <Heart className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">Heart Rate</span>
          </div>
          <p className="text-2xl font-bold text-foreground">68 <span className="text-sm font-normal text-muted-foreground">bpm</span></p>
        </div>

        <div className="glass p-4 rounded-3xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                <Thermometer className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">Temp</span>
          </div>
          <p className="text-2xl font-bold text-foreground">38.5 <span className="text-sm font-normal text-muted-foreground">°C</span></p>
        </div>

        <div className="glass p-4 rounded-3xl flex flex-col gap-2">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                <Activity className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">Activity</span>
          </div>
          <p className="text-2xl font-bold text-foreground">High <span className="text-sm font-normal text-muted-foreground">lvl</span></p>
        </div>

        <div className="glass p-4 rounded-3xl flex flex-col gap-2">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                <Droplets className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">Rumination</span>
          </div>
          <p className="text-2xl font-bold text-foreground">450 <span className="text-sm font-normal text-muted-foreground">min</span></p>
        </div>
      </div>

      {/* AI Predictions */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Brain className="w-5 h-5 text-purple-500" />
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">AI Predictions</h3>
        </div>
        
        <div className="glass-card p-5 rounded-3xl space-y-4">
          {[
            { label: "Mastitis Risk", value: "Low", color: "text-green-500" },
            { label: "Heat Stress Risk", value: "Medium", color: "text-orange-500" },
            { label: "Digestive Disorder", value: "Low", color: "text-green-500" },
          ].map((risk, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="font-medium text-foreground">{risk.label}</span>
              <span className={cn("font-bold text-sm bg-white/50 px-3 py-1 rounded-full", risk.color)}>
                {risk.value}
              </span>
            </div>
          ))}
          <div className="pt-2 border-t border-black/5">
             <p className="text-xs text-muted-foreground text-center">AI Analysis based on last 24h of sensor data.</p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-center gap-2 font-bold text-primary hover:bg-gray-50 transition-colors">
          <MapPin className="w-5 h-5" /> Live Location
        </button>
        <button className="bg-primary p-4 rounded-3xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 font-bold text-white hover:bg-primary/90 transition-colors">
          <FileText className="w-5 h-5" /> Full Report
        </button>
      </div>

    </MobileLayout>
  );
}
