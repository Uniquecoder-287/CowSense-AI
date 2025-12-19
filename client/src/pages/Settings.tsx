import { MobileLayout } from "@/components/layout/MobileLayout";
import { Settings as SettingsIcon, Moon, Sun, Monitor, Smartphone, Cloud, HelpCircle, ChevronRight, RefreshCw, Battery, Scan } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/appContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

export default function Settings() {
  const { theme, setTheme, language, setLanguage, t } = useApp();
  const { toast } = useToast();
  const [pairingOpen, setPairingOpen] = useState(false);
  
  // Local state for toggles to make them feel responsive
  const [toggles, setToggles] = useState({
    health: true,
    geo: true,
    activity: false,
    sos: true,
    cloud: true
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Settings Saved",
      description: "Preference updated successfully.",
      duration: 1500,
    });
  };

  const handlePairing = () => {
    setPairingOpen(true);
    // Simulate pairing process
    setTimeout(() => {
      setPairingOpen(false);
      toast({
        title: "Device Paired",
        description: "Collar #X7-99 successfully linked to herd.",
        variant: "default",
      });
    }, 3000);
  };

  const handleFirmwareUpdate = () => {
    toast({ title: "Checking for updates...", description: "Connecting to update server..." });
    setTimeout(() => {
      toast({ 
        title: "Update Started", 
        description: "Downloading firmware v2.4 (45MB). Please keep devices in range.",
        duration: 3000 
      });
    }, 1500);
  };

  const handleExport = () => {
    toast({ title: "Exporting Data", description: "Preparing CSV export of last 30 days..." });
    setTimeout(() => {
      toast({ title: "Export Complete", description: "File 'Herd_Data_Export.csv' ready." });
    }, 2000);
  };

  const handleSupport = () => {
    window.open("https://support.example.com", "_blank");
    toast({ title: "Opening Support", description: "Redirecting to help center..." });
  };

  const handleCallVet = () => {
    window.location.href = "tel:911"; // Or a vet number
    toast({ title: "Calling Vet", description: "Dialing Dr. Patil..." });
  };

  return (
    <MobileLayout>
      <div className="pt-2 pb-6">
        <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2 text-foreground">
          <SettingsIcon className="w-6 h-6 text-primary" /> {t.settings.title}
        </h2>

        {/* Appearance */}
        <section className="mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.settings.appearance}</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', icon: Sun, label: t.settings.light },
              { id: 'dark', icon: Moon, label: t.settings.dark },
              { id: 'system', icon: Monitor, label: t.settings.system },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id as any)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all active:scale-95",
                  theme === opt.id 
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                    : "bg-card border-transparent text-muted-foreground hover:bg-card/80 dark:bg-white/5"
                )}
              >
                <opt.icon className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Language */}
        <section className="mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.settings.language}</h3>
          <div className="glass p-1 rounded-2xl flex dark:bg-white/5">
            {[
              { id: 'mr', label: 'मराठी' },
              { id: 'hi', label: 'हिन्दी' },
              { id: 'en', label: 'English' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setLanguage(opt.id as any)}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-xl transition-all active:scale-95",
                  language === opt.id 
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* Device Settings */}
        <section className="mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.settings.deviceSensors}</h3>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-gray-100 dark:divide-white/10 dark:bg-white/5">
            <div 
              onClick={handlePairing}
              className="p-4 flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors active:bg-white/80"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t.settings.pairNewCollar}</p>
                  <p className="text-xs text-muted-foreground">{t.settings.scanQr}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 text-green-500 flex items-center justify-center">
                  <Battery className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t.settings.sensorBattery}</p>
                  <p className="text-xs text-green-600 font-medium">{t.settings.allGood}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <div 
              onClick={handleFirmwareUpdate}
              className="p-4 flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors active:bg-white/80"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-500 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t.settings.firmwareUpdate}</p>
                  <p className="text-xs text-muted-foreground">{t.settings.updateAvailable}</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                {t.settings.update}
              </div>
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.settings.notifications}</h3>
          <div className="glass rounded-3xl p-5 space-y-5 dark:bg-white/5">
            {[
              { id: 'health', label: t.settings.healthAlerts, desc: 'Temperature, Rumination' },
              { id: 'geo', label: t.settings.geoFence, desc: 'Location breaches' },
              { id: 'activity', label: t.settings.lowActivity, desc: 'Possible illness' },
              { id: 'sos', label: t.settings.criticalSos, desc: 'Urgent attention needed' },
            ].map((item, i) => (
              <div key={i} className=" flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground ">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch 
                  checked={(toggles as any)[item.id]} 
                  onCheckedChange={() => handleToggle(item.id as any)} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Data & Cloud */}
        <section className="mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.settings.dataCloud}</h3>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-gray-100 dark:divide-white/10 dark:bg-white/5">
             <div className="p-4 flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-500 flex items-center justify-center">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t.settings.cloudSync}</p>
                  <p className="text-xs text-muted-foreground">{t.settings.lastSynced}</p>
                </div>
              </div>
              <Switch checked={toggles.cloud} onCheckedChange={() => handleToggle('cloud')} />
            </div>
            <div 
              onClick={handleExport}
              className="p-4 flex items-center justify-center text-primary font-medium text-sm hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors active:bg-white/80"
            >
              {t.settings.exportReport}
            </div>
          </div>
        </section>

         {/* Support */}
        <section className="mb-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.settings.support}</h3>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-gray-100 dark:divide-white/10 dark:bg-white/5">
             <div 
               onClick={handleSupport}
               className="p-4 flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors active:bg-white/80"
             >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t.settings.helpCenter}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div 
              onClick={handleCallVet}
              className="p-4 flex items-center justify-center text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors active:bg-red-100"
            >
              {t.settings.contactVet}
            </div>
          </div>
        </section>

        {/* Pairing Dialog */}
        <Dialog open={pairingOpen} onOpenChange={setPairingOpen}>
          <DialogContent className="sm:max-w-md rounded-3xl bg-background/95 backdrop-blur-xl border-none">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-heading">{t.settings.pairNewCollar}</DialogTitle>
              <DialogDescription className="text-center">
                Scanning for nearby BLE devices...
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center relative">
                 <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                 <Scan className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Keep the collar close to your phone</p>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </MobileLayout>
  );
}
