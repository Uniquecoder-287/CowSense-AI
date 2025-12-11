import { MobileLayout } from "@/components/layout/MobileLayout";
import { Settings as SettingsIcon, Moon, Sun, Monitor, Globe, Smartphone, Bell, Cloud, HelpCircle, ChevronRight, RefreshCw, Battery } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');

  return (
    <MobileLayout>
      <div className="pt-2 pb-6">
        <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-primary" /> Settings
        </h2>

        {/* Appearance */}
        <section className="mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Appearance</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', icon: Sun, label: 'Light' },
              { id: 'dark', icon: Moon, label: 'Dark' },
              { id: 'system', icon: Monitor, label: 'System' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id as any)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all",
                  theme === opt.id 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                    : "bg-white border-transparent text-muted-foreground hover:bg-white/80"
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
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Language</h3>
          <div className="glass p-1 rounded-2xl flex">
            {[
              { id: 'mr', label: 'मराठी' },
              { id: 'hi', label: 'हिन्दी' },
              { id: 'en', label: 'English' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setLang(opt.id as any)}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                  lang === opt.id 
                    ? "bg-white text-primary shadow-sm" 
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
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Device & Sensors</h3>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between hover:bg-white/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Pair New Collar</p>
                  <p className="text-xs text-muted-foreground">Scan QR or NFC</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-white/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                  <Battery className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Sensor Battery</p>
                  <p className="text-xs text-green-600 font-medium">All Good (Avg 85%)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-white/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Firmware Update</p>
                  <p className="text-xs text-muted-foreground">v2.4 Available</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                Update
              </div>
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Notifications</h3>
          <div className="glass rounded-3xl p-5 space-y-5">
            {[
              { label: 'Health Alerts', desc: 'Temperature, Rumination', default: true },
              { label: 'Geo-fence', desc: 'Location breaches', default: true },
              { label: 'Low Activity', desc: 'Possible illness', default: false },
              { label: 'Critical SOS', desc: 'Urgent attention needed', default: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.default} />
              </div>
            ))}
          </div>
        </section>

        {/* Data & Cloud */}
        <section className="mb-8">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Data & Cloud</h3>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-gray-100">
             <div className="p-4 flex items-center justify-between hover:bg-white/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Cloud Sync</p>
                  <p className="text-xs text-muted-foreground">Last synced: 2 mins ago</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="p-4 flex items-center justify-center text-primary font-medium text-sm hover:bg-white/50 cursor-pointer transition-colors">
              Export Health Report (PDF)
            </div>
          </div>
        </section>

         {/* Support */}
        <section className="mb-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Support</h3>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-gray-100">
             <div className="p-4 flex items-center justify-between hover:bg-white/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Help Center / FAQ</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="p-4 flex items-center justify-center text-red-500 font-bold text-sm hover:bg-red-50 cursor-pointer transition-colors">
              Contact Vet
            </div>
          </div>
        </section>

      </div>
    </MobileLayout>
  );
}
