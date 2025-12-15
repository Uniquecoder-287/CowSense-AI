import { Link, useLocation } from "wouter";
import { LayoutDashboard, List, Bell, Settings, Menu, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import bgImage from "@assets/generated_images/soft_gradient_background_for_mobile_app.png";
import { useApp } from "@/lib/appContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [location] = useLocation();
  const { t, logout } = useApp();

  const navItems = [
    { icon: LayoutDashboard, label: t.nav.home, path: "/" },
    { icon: List, label: t.nav.herd, path: "/herd" },
    { icon: Bell, label: t.nav.alerts, path: "/notifications" },
    { icon: Settings, label: t.nav.settings, path: "/settings" },
  ];

  return (
    <div className="min-h-screen w-full max-w-md mx-auto relative overflow-hidden bg-background shadow-2xl flex flex-col font-sans transition-colors duration-300">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-[-1] opacity-30 pointer-events-none dark:opacity-10"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/30">
             C
           </div>
           <h1 className="text-xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400">
             CowSense AI
           </h1>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 transition-colors">
              <Menu className="w-6 h-6 text-foreground/80" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-popup border-none text-foreground mt-2 rounded-2xl">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-foreground/10" />
            <DropdownMenuItem className="cursor-pointer focus:bg-foreground/5 rounded-xl">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:bg-foreground/5 rounded-xl">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-foreground/10" />
            <DropdownMenuItem 
              onClick={logout}
              className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-900/10 cursor-pointer rounded-xl"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 pb-24 z-10 scrollbar-hide">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-white/50 dark:border-white/10 flex justify-around items-center px-2 z-20 pb-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <a className="flex flex-col items-center justify-center w-16 h-16 gap-1 group">
                <div 
                  className={cn(
                    "p-2 rounded-2xl transition-all duration-300",
                    isActive 
                      ? "bg-primary/10 dark:bg-primary/20 text-primary translate-y-[-4px] shadow-sm shadow-primary/20" 
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  <item.icon 
                    className={cn(
                      "w-6 h-6 transition-all",
                      isActive && "fill-current"
                    )} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                {isActive && (
                  <span className="text-[10px] font-medium text-primary animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {item.label}
                  </span>
                )}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
