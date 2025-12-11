import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockCows, activityData } from "@/lib/mockData";
import { Activity, Thermometer, Droplets, Zap, ArrowRight, MapPin } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import avatarImage from "@assets/generated_images/futuristic_cow_avatar_for_profile.png";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const healthyCount = mockCows.filter(c => c.status === 'healthy').length;
  const criticalCount = mockCows.filter(c => c.status === 'critical').length;
  const warningCount = mockCows.filter(c => c.status === 'warning').length;

  return (
    <MobileLayout>
      {/* Welcome Section */}
      <div className="mb-8 mt-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Morning, Farmer
          </h2>
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden">
            <img src={avatarImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <p className="text-muted-foreground text-sm">Herd status is generally good today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="glass-card p-3 rounded-2xl flex flex-col items-center justify-center gap-2 text-center">
          <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xl font-bold text-foreground">{healthyCount}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Healthy</span>
          </div>
        </div>
        
        <div className="glass-card p-3 rounded-2xl flex flex-col items-center justify-center gap-2 text-center relative overflow-hidden">
          {warningCount > 0 && <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />}
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xl font-bold text-foreground">{warningCount}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Check</span>
          </div>
        </div>

        <div className="glass-card p-3 rounded-2xl flex flex-col items-center justify-center gap-2 text-center border-red-100 bg-red-50/50">
          <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xl font-bold text-red-700">{criticalCount}</span>
            <span className="text-[10px] uppercase tracking-wider text-red-400 font-semibold">Critical</span>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Herd Activity</h3>
          <select className="bg-white/50 border-none text-xs rounded-lg px-2 py-1 text-muted-foreground focus:ring-0">
            <option>Today</option>
            <option>Week</option>
          </select>
        </div>
        <div className="glass-card p-4 rounded-3xl h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(198, 85%, 55%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(198, 85%, 55%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="steps" 
                stroke="hsl(198, 85%, 55%)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSteps)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Critical Alerts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Needs Attention</h3>
          <Link href="/herd">
            <a className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3 h-3" />
            </a>
          </Link>
        </div>

        <div className="space-y-3">
          {mockCows.filter(c => c.status !== 'healthy').map(cow => (
            <Link key={cow.id} href={`/cow/${cow.id}`}>
              <a className="block group">
                <div className="glass p-4 rounded-2xl flex items-center justify-between transition-transform duration-200 active:scale-[0.98]">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm",
                      cow.status === 'critical' ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {cow.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{cow.name} <span className="text-xs font-normal text-muted-foreground ml-1">#{cow.id}</span></h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {cow.location}
                        <span className="mx-1">•</span>
                        {cow.status === 'critical' ? 'High Temp' : 'Low Activity'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                      cow.status === 'critical' ? "bg-red-500 text-white" : "bg-orange-400 text-white"
                    )}>
                      {cow.status}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {cow.temperature}°C
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
}
