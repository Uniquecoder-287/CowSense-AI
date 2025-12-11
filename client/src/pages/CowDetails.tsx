import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockCows, activityData } from "@/lib/mockData";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Heart, Thermometer, Footprints, Battery, MapPin, Droplets, Utensils, Brain, Share2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis } from 'recharts';

export default function CowDetails() {
  const [match, params] = useRoute("/cow/:id");
  const cow = mockCows.find(c => c.id === params?.id);

  if (!cow) return <div className="p-10 text-center">Cow not found</div>;

  return (
    <MobileLayout>
      <div className="pt-2 pb-6">
        {/* Nav Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/herd">
            <a className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-foreground hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-heading font-bold text-foreground">{cow.name}</h1>
            <p className="text-xs text-muted-foreground">ID: {cow.id} • {cow.breed}</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
             <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Vitals History */}
        <section className="mb-6">
           <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Vitals History</h3>
           <div className="glass-card p-5 rounded-3xl mb-4">
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white/50 p-3 rounded-2xl text-center">
                    <Thermometer className="w-4 h-4 mx-auto mb-1 text-orange-500" />
                    <span className="block text-lg font-bold">{cow.temperature}°</span>
                    <span className="text-[10px] text-muted-foreground">Temp</span>
                </div>
                <div className="bg-white/50 p-3 rounded-2xl text-center">
                    <Heart className="w-4 h-4 mx-auto mb-1 text-red-500" />
                    <span className="block text-lg font-bold">{cow.heartRate}</span>
                    <span className="text-[10px] text-muted-foreground">BPM</span>
                </div>
                <div className="bg-white/50 p-3 rounded-2xl text-center">
                    <Footprints className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                    <span className="block text-lg font-bold">{(cow.steps/1000).toFixed(1)}k</span>
                    <span className="text-[10px] text-muted-foreground">Steps</span>
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
            <div className="glass p-4 rounded-3xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Droplets className="w-4 h-4" /></div>
                    <span className="text-xs font-bold uppercase text-muted-foreground">Rumination</span>
                </div>
                <p className="text-2xl font-bold mb-2">{cow.rumination} <span className="text-xs font-normal text-muted-foreground">min</span></p>
                <div className="h-12">
                   <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <Bar dataKey="rumination" fill="hsl(152, 60%, 70%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>

            <div className="glass p-4 rounded-3xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Utensils className="w-4 h-4" /></div>
                    <span className="text-xs font-bold uppercase text-muted-foreground">Milk Output</span>
                </div>
                <p className="text-2xl font-bold mb-2">{cow.milkOutput} <span className="text-xs font-normal text-muted-foreground">L</span></p>
                <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full inline-block">
                    +2.4L vs Avg
                </div>
            </div>
        </div>

        {/* Behavior Insights */}
        <section className="mb-6">
             <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Behavior Insights</h3>
             <div className="glass p-5 rounded-3xl space-y-4">
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>Resting</span>
                        <span className="font-bold">{cow.behavior.resting}h</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 rounded-full" style={{ width: `${(cow.behavior.resting/24)*100}%` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>Walking</span>
                        <span className="font-bold">{cow.behavior.walking}h</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(cow.behavior.walking/24)*100}%` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>Chewing</span>
                        <span className="font-bold">{cow.behavior.chewing}h</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 rounded-full" style={{ width: `${(cow.behavior.chewing/24)*100}%` }}></div>
                    </div>
                </div>
             </div>
        </section>

        {/* AI Disease Patterns */}
        <section className="mb-6">
             <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">AI Disease Patterns</h3>
             <div className="bg-white/60 p-5 rounded-3xl border border-white space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="font-medium">Stress Score</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5,6,7,8,9,10].map(n => (
                                <div key={n} className={cn("w-1 h-3 rounded-full", n <= cow.stressScore ? "bg-red-400" : "bg-gray-200")} />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">{cow.stressScore}/10</span>
                    </div>
                </div>
             </div>
        </section>
        
        {/* GPS Map Placeholder */}
        <section className="mb-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Live Location</h3>
            <div className="h-40 bg-gray-200 rounded-3xl relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center grayscale" />
                 <div className="z-10 bg-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-xs">{cow.location}</span>
                 </div>
            </div>
        </section>

        <button className="w-full bg-foreground text-background py-4 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-lg">
            <Download className="w-5 h-5" /> Download Health Report
        </button>

      </div>
    </MobileLayout>
  );
}
