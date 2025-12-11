import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockCows } from "@/lib/mockData";
import { Activity, Thermometer, Droplets, Zap, ArrowRight, MapPin, Heart, FileText, Brain } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import avatarImage from "@assets/generated_images/futuristic_cow_avatar_for_profile.png";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/appContext";

// Need dummy data here since we don't have it imported from mockData in translations
const activityData = [
  { time: "06:00", steps: 200 },
  { time: "08:00", steps: 800 },
  { time: "10:00", steps: 1500 },
  { time: "12:00", steps: 1200 },
  { time: "14:00", steps: 600 },
  { time: "16:00", steps: 900 },
];

export default function Dashboard() {
  const { t } = useApp();
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
            {t.dashboard.hello}
          </h2>
          <p className="text-muted-foreground text-sm">{t.dashboard.subtitle}</p>
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
              className="text-white/40 dark:text-white/10" 
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
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.dashboard.herdHealth}</span>
          </div>
        </div>
      </div>

      {/* Quick Vitals Cards */}
      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.dashboard.quickVitals}</h3>
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="glass p-4 rounded-3xl flex flex-col gap-2 dark:bg-white/5">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 flex items-center justify-center">
                <Heart className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">{t.dashboard.heartRate}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">68 <span className="text-sm font-normal text-muted-foreground">{t.dashboard.bpm}</span></p>
        </div>

        <div className="glass p-4 rounded-3xl flex flex-col gap-2 dark:bg-white/5">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center">
                <Thermometer className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">{t.dashboard.temp}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">38.5 <span className="text-sm font-normal text-muted-foreground">°C</span></p>
        </div>

        <div className="glass p-4 rounded-3xl flex flex-col gap-2 dark:bg-white/5">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center">
                <Activity className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">{t.dashboard.activity}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">High <span className="text-sm font-normal text-muted-foreground">{t.dashboard.lvl}</span></p>
        </div>

        <div className="glass p-4 rounded-3xl flex flex-col gap-2 dark:bg-white/5">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 text-green-500 flex items-center justify-center">
                <Droplets className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">{t.dashboard.rumination}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">450 <span className="text-sm font-normal text-muted-foreground">{t.dashboard.min}</span></p>
        </div>
      </div>

      {/* AI Predictions */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Brain className="w-5 h-5 text-purple-500" />
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t.dashboard.aiPredictions}</h3>
        </div>
        
        <div className="glass-card p-5 rounded-3xl space-y-4 dark:bg-white/5 dark:border-white/10">
          {[
            { label: t.dashboard.mastitisRisk, value: "Low", color: "text-green-500" },
            { label: t.dashboard.heatStressRisk, value: "Medium", color: "text-orange-500" },
            { label: t.dashboard.digestiveRisk, value: "Low", color: "text-green-500" },
          ].map((risk, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="font-medium text-foreground">{risk.label}</span>
              <span className={cn("font-bold text-sm bg-white/50 dark:bg-white/10 px-3 py-1 rounded-full", risk.color)}>
                {risk.value}
              </span>
            </div>
          ))}
          <div className="pt-2 border-t border-black/5 dark:border-white/10">
             <p className="text-xs text-muted-foreground text-center">{t.dashboard.aiAnalysis}</p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="bg-white dark:bg-white/10 p-4 rounded-3xl shadow-sm flex items-center justify-center gap-2 font-bold text-primary hover:bg-gray-50 dark:hover:bg-white/20 transition-colors">
          <MapPin className="w-5 h-5" /> {t.dashboard.liveLocation}
        </button>
        <button className="bg-primary p-4 rounded-3xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 font-bold text-white hover:bg-primary/90 transition-colors">
          <FileText className="w-5 h-5" /> {t.dashboard.fullReport}
        </button>
      </div>

    </MobileLayout>
  );
}
