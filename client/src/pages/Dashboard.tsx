import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockCows } from "@/lib/mockData";
import { Activity, Thermometer, Droplets, Zap, ArrowRight, MapPin, Heart, FileText, Brain, X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import avatarImage from "@assets/generated_images/futuristic_cow_avatar_for_profile.png";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/appContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";

export default function Dashboard() {
  const { t } = useApp();
  const { toast } = useToast();
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  const healthyCount = mockCows.filter(c => c.status === 'healthy').length;
  const avgHealthScore = Math.round(mockCows.reduce((acc, cow) => acc + cow.healthScore, 0) / mockCows.length);

  const handleFullReport = () => {
    toast({
      title: t.dashboard.fullReport,
      description: "Generating comprehensive herd analysis PDF...",
    });
    
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Herd_Analysis_2025.pdf has been downloaded.",
        variant: "default",
      });
    }, 2000);
  };

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
        <div className="glass p-4 rounded-3xl flex flex-col gap-2 dark:bg-white/5 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-default">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 flex items-center justify-center">
                <Heart className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">{t.dashboard.heartRate}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">68 <span className="text-sm font-normal text-muted-foreground">{t.dashboard.bpm}</span></p>
        </div>

        <div className="glass p-4 rounded-3xl flex flex-col gap-2 dark:bg-white/5 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-default">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center">
                <Thermometer className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">{t.dashboard.temp}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">38.5 <span className="text-sm font-normal text-muted-foreground">°C</span></p>
        </div>

        <div className="glass p-4 rounded-3xl flex flex-col gap-2 dark:bg-white/5 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-default">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center">
                <Activity className="w-4 h-4" />
             </div>
             <span className="text-xs font-bold text-muted-foreground uppercase">{t.dashboard.activity}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">High <span className="text-sm font-normal text-muted-foreground">{t.dashboard.lvl}</span></p>
        </div>

        <div className="glass p-4 rounded-3xl flex flex-col gap-2 dark:bg-white/5 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-default">
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
        <button 
          onClick={() => setIsMapOpen(true)}
          className="bg-white dark:bg-white/10 p-4 rounded-3xl shadow-sm flex items-center justify-center gap-2 font-bold text-primary hover:bg-gray-50 dark:hover:bg-white/20 transition-all active:scale-[0.98]"
        >
          <MapPin className="w-5 h-5" /> {t.dashboard.liveLocation}
        </button>
        <button 
          onClick={handleFullReport}
          className="bg-primary p-4 rounded-3xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 font-bold text-white hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          <FileText className="w-5 h-5" /> {t.dashboard.fullReport}
        </button>
      </div>

      {/* Live Location Dialog */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl border-none bg-background/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading">{t.dashboard.liveLocation}</DialogTitle>
            <DialogDescription>
              Real-time GPS tracking of your herd.
            </DialogDescription>
          </DialogHeader>
          
          <div className="h-64 bg-gray-100 rounded-2xl relative overflow-hidden mt-4">
            <div className="absolute inset-0 opacity-60 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center grayscale" />
            
            {/* Mock Pins */}
            {mockCows.slice(0, 5).map((cow, i) => (
              <div 
                key={cow.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ top: `${30 + (i * 15)}%`, left: `${20 + (i * 15)}%` }}
              >
                <div className={cn(
                  "w-3 h-3 rounded-full border-2 border-white shadow-sm",
                  cow.status === 'healthy' ? "bg-green-500" : "bg-red-500"
                )} />
                <span className="text-[10px] font-bold bg-white/80 px-1 rounded shadow-sm mt-1">{cow.name}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsMapOpen(false)}
            className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4"
          >
            Close Map
          </button>
        </DialogContent>
      </Dialog>

    </MobileLayout>
  );
}
