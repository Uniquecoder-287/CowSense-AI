import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockCows } from "@/lib/mockData";
import { Search, Filter, MapPin, Battery } from "lucide-react";
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

      <div className="space-y-3 mt-2">
        {filteredCows.map((cow) => (
          <Link key={cow.id} href={`/cow/${cow.id}`}>
            <a className="block group">
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white flex items-center gap-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.01]">
                <div className="relative">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold bg-gradient-to-br text-white shadow-inner",
                    cow.status === 'healthy' ? "from-green-400 to-emerald-600" :
                    cow.status === 'warning' ? "from-orange-400 to-amber-600" :
                    "from-red-400 to-rose-600"
                  )}>
                    {cow.name[0]}
                  </div>
                  {cow.status !== 'healthy' && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <span className={cn("w-2.5 h-2.5 rounded-full", cow.status === 'critical' ? "bg-red-500 animate-pulse" : "bg-orange-500")} />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-foreground text-base truncate">{cow.name}</h3>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase",
                      cow.status === 'healthy' ? "bg-green-100 text-green-700" :
                      cow.status === 'warning' ? "bg-orange-100 text-orange-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {cow.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">ID: {cow.id} • {cow.breed}</p>
                  
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary/20 px-2 py-1 rounded-md">
                      <MapPin className="w-3 h-3" /> {cow.location}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground bg-gray-100 px-2 py-1 rounded-md">
                      <Battery className="w-3 h-3" /> {cow.batteryLevel}%
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </MobileLayout>
  );
}
