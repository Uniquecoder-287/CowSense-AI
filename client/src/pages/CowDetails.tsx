import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockCows, activityData } from "@/lib/mockData";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Heart, Thermometer, Footprints, Battery, MapPin, Clock, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

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
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-bold uppercase",
            cow.status === 'healthy' ? "bg-green-100 text-green-700" :
            cow.status === 'warning' ? "bg-orange-100 text-orange-700" :
            "bg-red-100 text-red-700"
          )}>
            {cow.status}
          </div>
        </div>

        {/* Hero Card */}
        <div className="glass-card p-6 rounded-3xl mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Heart className="w-32 h-32" />
          </div>
          
          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase font-bold tracking-wider mb-1">
                <Heart className="w-3 h-3 text-red-400" /> Heart Rate
              </div>
              <p className="text-3xl font-heading font-bold text-foreground">{cow.heartRate} <span className="text-sm font-normal text-muted-foreground">bpm</span></p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase font-bold tracking-wider mb-1">
                <Thermometer className="w-3 h-3 text-orange-400" /> Temp
              </div>
              <p className="text-3xl font-heading font-bold text-foreground">{cow.temperature}° <span className="text-sm font-normal text-muted-foreground">C</span></p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase font-bold tracking-wider mb-1">
                <Footprints className="w-3 h-3 text-blue-400" /> Activity
              </div>
              <p className="text-3xl font-heading font-bold text-foreground">{(cow.steps / 1000).toFixed(1)}k <span className="text-sm font-normal text-muted-foreground">steps</span></p>
            </div>

             <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase font-bold tracking-wider mb-1">
                <Battery className="w-3 h-3 text-green-400" /> Collar Bat
              </div>
              <p className="text-3xl font-heading font-bold text-foreground">{cow.batteryLevel}%</p>
            </div>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="mb-6">
           <h3 className="text-lg font-bold text-foreground mb-3 px-1">Daily Rhythm</h3>
           <div className="bg-white p-4 rounded-3xl shadow-sm h-40 border border-border/40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorStepsCow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152, 60%, 70%)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(152, 60%, 70%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="steps" 
                    stroke="hsl(152, 60%, 50%)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorStepsCow)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Info List */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-1 shadow-sm border border-white/60">
          <div className="p-4 border-b border-black/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase">Current Location</p>
              <p className="text-foreground font-medium">{cow.location}</p>
            </div>
          </div>
          
          <div className="p-4 border-b border-black/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase">Last Milking</p>
              <p className="text-foreground font-medium">{cow.lastMilking}</p>
            </div>
          </div>

          <div className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <History className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase">Age</p>
              <p className="text-foreground font-medium">{cow.age} years old</p>
            </div>
          </div>
        </div>

      </div>
    </MobileLayout>
  );
}
