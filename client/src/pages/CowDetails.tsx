import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockCows, activityData } from "@/lib/mockData";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Heart, Thermometer, Footprints, Battery, MapPin, Droplets, Utensils, Brain, Share2, Download, Clock, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useApp } from "@/lib/appContext";
import { useToast } from "@/hooks/use-toast";

export default function CowDetails() {
  const [match, params] = useRoute("/cow/:id");
  const cow = mockCows.find(c => c.id === params?.id);
  const { t } = useApp();
  const { toast } = useToast();

  if (!cow) return <div className="p-10 text-center text-foreground">Cow not found</div>;

  const handleShare = () => {
    // Simulate share
    if (navigator.share) {
      navigator.share({
        title: `Cow Profile: ${cow.name}`,
        text: `Check out the health stats for ${cow.name} (ID: ${cow.id}). Health Score: ${cow.healthScore}.`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      toast({
        title: "Link Copied",
        description: `Profile link for ${cow.name} copied to clipboard.`,
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Downloading...",
      description: `Health report for ${cow.name} is being generated.`,
    });
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${cow.name}_Health_Report.pdf saved to device.`,
        variant: "default",
      });
    }, 1500);
  };

  return (
    <MobileLayout>
      <div className="pt-2 pb-6">
        {/* Nav Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/herd">
            <a className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-foreground hover:bg-gray-50 dark:hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-heading font-bold text-foreground">{cow.name}</h1>
            <p className="text-xs text-muted-foreground">ID: {cow.id} • {cow.breed}</p>
          </div>
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center active:scale-95 transition-transform"
          >
             <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Vitals History */}
        <section className="mb-6">
           <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.details.vitalsHistory}</h3>
           <div className="glass-card p-5 rounded-3xl mb-4 dark:bg-white/5 dark:border-white/10">
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white/50 dark:bg-white/10 p-3 rounded-2xl text-center">
                    <Thermometer className="w-4 h-4 mx-auto mb-1 text-orange-500" />
                    <span className="block text-lg font-bold text-foreground">{cow.temperature}°</span>
                    <span className="text-[10px] text-muted-foreground">{t.dashboard.temp}</span>
                </div>
                <div className="bg-white/50 dark:bg-white/10 p-3 rounded-2xl text-center">
                    <Heart className="w-4 h-4 mx-auto mb-1 text-red-500" />
                    <span className="block text-lg font-bold text-foreground">{cow.heartRate}</span>
                    <span className="text-[10px] text-muted-foreground">{t.dashboard.bpm}</span>
                </div>
                <div className="bg-white/50 dark:bg-white/10 p-3 rounded-2xl text-center">
                    <Footprints className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                    <span className="block text-lg font-bold text-foreground">{(cow.steps/1000).toFixed(1)}k</span>
                    <span className="text-[10px] text-muted-foreground">{t.details.steps}</span>
                </div>
              </div>
              
              {/* Activity Chart */}
              <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(198, 85%, 55%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(198, 85%, 55%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="steps" stroke="hsl(198, 85%, 55%)" strokeWidth={2} fill="url(#colorAct)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>
        </section>

        {/* Rumination & Milk */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass p-4 rounded-3xl dark:bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center"><Droplets className="w-4 h-4" /></div>
                    <span className="text-xs font-bold uppercase text-muted-foreground">{t.dashboard.rumination}</span>
                </div>
                <p className="text-2xl font-bold mb-2 text-foreground">{cow.rumination} <span className="text-xs font-normal text-muted-foreground">{t.dashboard.min}</span></p>
                <div className="h-12">
                   <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <Bar dataKey="rumination" fill="hsl(152, 60%, 70%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>

            <div className="glass p-4 rounded-3xl dark:bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center"><Utensils className="w-4 h-4" /></div>
                    <span className="text-xs font-bold uppercase text-muted-foreground">{t.details.milkOutput}</span>
                </div>
                <p className="text-2xl font-bold mb-2 text-foreground">{cow.milkOutput} <span className="text-xs font-normal text-muted-foreground">L</span></p>
                <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full inline-block">
                    +2.4L vs Avg
                </div>
            </div>
        </div>

        {/* Behavior Insights */}
        <section className="mb-6">
             <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.details.behaviorInsights}</h3>
             <div className="glass p-5 rounded-3xl space-y-4 dark:bg-white/5">
                <div>
                    <div className="flex justify-between text-xs mb-1 text-foreground">
                        <span>{t.details.resting}</span>
                        <span className="font-bold">{cow.behavior.resting}h</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 rounded-full" style={{ width: `${(cow.behavior.resting/24)*100}%` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs mb-1 text-foreground">
                        <span>{t.details.walking}</span>
                        <span className="font-bold">{cow.behavior.walking}h</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(cow.behavior.walking/24)*100}%` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs mb-1 text-foreground">
                        <span>{t.details.chewing}</span>
                        <span className="font-bold">{cow.behavior.chewing}h</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 rounded-full" style={{ width: `${(cow.behavior.chewing/24)*100}%` }}></div>
                    </div>
                </div>
             </div>
        </section>

        {/* AI Disease Patterns */}
        <section className="mb-6">
             <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.dashboard.aiPredictions}</h3>
             <div className="bg-white/60 dark:bg-white/5 p-5 rounded-3xl border border-white dark:border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">{t.details.stressScore}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5,6,7,8,9,10].map(n => (
                                <div key={n} className={cn("w-1 h-3 rounded-full", n <= cow.stressScore ? "bg-red-400" : "bg-gray-200 dark:bg-gray-700")} />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">{cow.stressScore}/10</span>
                    </div>
                </div>
             </div>
        </section>

         {/* Info List */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-3xl p-1 shadow-sm border border-white/60 dark:border-white/10 mb-6">
          <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase">{t.details.currentLocation}</p>
              <p className="text-foreground font-medium">{cow.location}</p>
            </div>
          </div>
          
          <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase">{t.details.lastMilking}</p>
              <p className="text-foreground font-medium">{cow.lastMilking}</p>
            </div>
          </div>

          <div className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-500">
              <History className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase">{t.details.age}</p>
              <p className="text-foreground font-medium">{cow.age} {t.details.yearsOld}</p>
            </div>
          </div>
        </div>
        
        {/* GPS Map Placeholder */}
        <section className="mb-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.dashboard.liveLocation}</h3>
            <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-3xl relative overflow-hidden flex items-center justify-center group cursor-pointer" onClick={() => toast({ title: "Opening Map", description: "Loading high-resolution pasture map..." })}>
                 <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center grayscale group-hover:scale-105 transition-transform duration-700" />
                 <div className="z-10 bg-white dark:bg-gray-900 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-xs text-foreground">{cow.location}</span>
                 </div>
            </div>
        </section>

        <button 
          onClick={handleDownload}
          className="w-full bg-foreground text-background py-4 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity active:scale-[0.99]"
        >
            <Download className="w-5 h-5" /> {t.details.downloadReport}
        </button>

      </div>
    </MobileLayout>
  );
}
