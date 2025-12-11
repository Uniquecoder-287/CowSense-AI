import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockCows } from "@/lib/mockData";
import { Search, MapPin, Battery, ChevronRight, Filter } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CowList() {
  const [filter, setFilter] = useState<'all' | 'healthy' | 'attention'>('all');
  const [search, setSearch] = useState('');

  const filteredCows = mockCows.filter(cow => {
    const matchesSearch = cow.name.toLowerCase().includes(search.toLowerCase()) || cow.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' 
      ? true 
      : filter === 'healthy' 
        ? cow.status === 'healthy' 
        : cow.status !== 'healthy';
    return matchesSearch && matchesFilter;
  });

  return (
    <MobileLayout>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md pb-4 pt-2 z-20">
        <h2 className="text-2xl font-heading font-bold mb-4">My Herd</h2>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-border/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setFilter('all')}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
              filter === 'all' 
                ? "bg-foreground text-background shadow-md" 
                : "bg-white text-muted-foreground border border-border"
            )}
          >
            All Cows
          </button>
          <button 
            onClick={() => setFilter('attention')}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
              filter === 'attention' 
                ? "bg-red-500 text-white shadow-md shadow-red-200" 
                : "bg-white text-muted-foreground border border-border"
            )}
          >
            Needs Attention
          </button>
          <button 
            onClick={() => setFilter('healthy')}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
              filter === 'healthy' 
                ? "bg-green-500 text-white shadow-md shadow-green-200" 
                : "bg-white text-muted-foreground border border-border"
            )}
          >
            Healthy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-2">
        {filteredCows.map((cow) => (
          <Link key={cow.id} href={`/cow/${cow.id}`}>
            <a className="block group">
              <div className="glass p-4 rounded-3xl flex items-center gap-4 transition-all hover:scale-[1.01] active:scale-[0.99]">
                <div className="relative">
                   {/* Avatar */}
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold bg-gradient-to-br text-white shadow-inner",
                    cow.status === 'healthy' ? "from-green-400 to-emerald-600" :
                    cow.status === 'warning' ? "from-orange-400 to-amber-600" :
                    "from-red-400 to-rose-600"
                  )}>
                    {cow.name[0]}
                  </div>
                  
                  {/* Status Indicator */}
                  <span className={cn(
                    "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center",
                    cow.status === 'healthy' ? "bg-green-500" :
                    cow.status === 'warning' ? "bg-orange-500" :
                    "bg-red-500"
                  )}>
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-foreground text-lg truncate">{cow.name}</h3>
                        <p className="text-xs text-muted-foreground">ID: {cow.id}</p>
                    </div>
                    <div className="flex flex-col items-end">
                       {/* Mini Health Score Ring */}
                       <div className="relative w-10 h-10 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                             <circle cx="20" cy="20" r="16" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
                             <circle 
                              cx="20" cy="20" r="16" 
                              stroke={cow.healthScore > 80 ? "#22c55e" : cow.healthScore > 50 ? "#f97316" : "#ef4444"} 
                              strokeWidth="4" fill="transparent" 
                              strokeDasharray={2 * Math.PI * 16}
                              strokeDashoffset={2 * Math.PI * 16 * (1 - cow.healthScore / 100)}
                              strokeLinecap="round"
                             />
                          </svg>
                          <span className="absolute text-[10px] font-bold">{cow.healthScore}</span>
                       </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground bg-white/50 px-2 py-1 rounded-md">
                      <MapPin className="w-3 h-3" /> {cow.location}
                    </span>
                  </div>
                </div>
                
                <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </MobileLayout>
  );
}
