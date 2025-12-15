import { MobileLayout } from "@/components/layout/MobileLayout";
import { Search, MapPin, Battery, ChevronRight, Plus, X, Camera } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useApp } from "@/lib/appContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Cow } from "@/lib/mockData";

export default function CowList() {
  const { t, cows, addCow } = useApp();
  const [filter, setFilter] = useState<'all' | 'healthy' | 'attention'>('all');
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  // New Cow Form State
  const [newCowName, setNewCowName] = useState("");
  const [newCowId, setNewCowId] = useState("");
  const [newCowBreed, setNewCowBreed] = useState("");

  const filteredCows = cows.filter(cow => {
    const matchesSearch = cow.name.toLowerCase().includes(search.toLowerCase()) || cow.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' 
      ? true 
      : filter === 'healthy' 
        ? cow.status === 'healthy' 
        : cow.status !== 'healthy';
    return matchesSearch && matchesFilter;
  });

  const handleAddCow = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCow: Cow = {
      id: newCowId || `COW-${Math.floor(Math.random() * 10000)}`,
      name: newCowName,
      breed: newCowBreed || "Unknown",
      age: 2,
      status: "healthy",
      healthScore: 100,
      temperature: 38.0,
      heartRate: 70,
      steps: 0,
      rumination: 0,
      lastMilking: "Never",
      milkOutput: 0,
      feedIntake: 0,
      waterIntake: 0,
      stressScore: 0,
      location: "Barn 1",
      batteryLevel: 100,
      behavior: { walking: 0, resting: 0, chewing: 0 },
      risks: { mastitis: "Low", heatStress: "Low", digestive: "Low" }
    };

    addCow(newCow);
    setIsAddOpen(false);
    setNewCowName("");
    setNewCowId("");
    setNewCowBreed("");
    
    toast({
      title: "Cow Added",
      description: `${newCowName} has been added to the herd.`,
      variant: "default",
    });
  };

  return (
    <MobileLayout>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md pb-4 pt-2 z-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-heading font-bold text-foreground">{t.herd.title}</h2>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder={t.herd.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/10 rounded-xl border border-border/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-muted-foreground text-foreground transition-all"
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
                : "bg-white dark:bg-white/10 text-muted-foreground border border-border"
            )}
          >
            {t.herd.allCows}
          </button>
          <button 
            onClick={() => setFilter('attention')}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
              filter === 'attention' 
                ? "bg-red-500 text-white shadow-md shadow-red-200" 
                : "bg-white dark:bg-white/10 text-muted-foreground border border-border"
            )}
          >
            {t.herd.needsAttention}
          </button>
          <button 
            onClick={() => setFilter('healthy')}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
              filter === 'healthy' 
                ? "bg-green-500 text-white shadow-md shadow-green-200" 
                : "bg-white dark:bg-white/10 text-muted-foreground border border-border"
            )}
          >
            {t.herd.healthy}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-2 pb-20">
        {filteredCows.map((cow) => (
          <Link key={cow.id} href={`/cow/${cow.id}`}>
            <a className="block group">
              <div className="glass p-4 rounded-3xl flex items-center gap-4 transition-all hover:scale-[1.01] active:scale-[0.99] dark:bg-white/5">
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
                    "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center",
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
                             <circle cx="20" cy="20" r="16" stroke="#e2e8f0" strokeWidth="4" fill="transparent" className="dark:stroke-gray-700" />
                             <circle 
                              cx="20" cy="20" r="16" 
                              stroke={cow.healthScore > 80 ? "#22c55e" : cow.healthScore > 50 ? "#f97316" : "#ef4444"} 
                              strokeWidth="4" fill="transparent" 
                              strokeDasharray={2 * Math.PI * 16}
                              strokeDashoffset={2 * Math.PI * 16 * (1 - cow.healthScore / 100)}
                              strokeLinecap="round"
                             />
                          </svg>
                          <span className="absolute text-[10px] font-bold text-foreground">{cow.healthScore}</span>
                       </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground bg-white/50 dark:bg-white/10 px-2 py-1 rounded-md">
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

      {/* Floating Action Button for easy access */}
      <button 
        onClick={() => setIsAddOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center z-40 hover:scale-110 active:scale-95 transition-all"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Add Cow Dialog with Glassmorphism */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl border-none glass-popup p-6 text-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading text-center mb-4">Add New Cow</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddCow} className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-2xl bg-white/50 dark:bg-black/20 border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                 <Camera className="w-6 h-6 mb-1" />
                 <span className="text-[10px] uppercase font-bold">Add Photo</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Cow Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-xl py-3 px-4 font-bold text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                value={newCowName}
                onChange={e => setNewCowName(e.target.value)}
                placeholder="e.g. Bella"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Tag ID</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-xl py-3 px-4 font-medium text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                  value={newCowId}
                  onChange={e => setNewCowId(e.target.value)}
                  placeholder="e.g. COW-2025"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Breed</label>
                <input 
                  type="text" 
                  className="w-full bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-xl py-3 px-4 font-medium text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                  value={newCowBreed}
                  onChange={e => setNewCowBreed(e.target.value)}
                  placeholder="e.g. Holstein"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
            >
              Add to Herd
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
