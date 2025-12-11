import { MobileLayout } from "@/components/layout/MobileLayout";
import { Settings as SettingsIcon, Moon, Sun, Monitor, Smartphone, Cloud, HelpCircle, ChevronRight, RefreshCw, Battery } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/appContext";

export default function Settings() {
  const { theme, setTheme, language, setLanguage, t } = useApp();

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
                  "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all",
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
                  "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
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
            <div className="p-4 flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors">
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

            <div className="p-4 flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors">
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
              { label: t.settings.healthAlerts, desc: 'Temperature, Rumination', default: true },
              { label: t.settings.geoFence, desc: 'Location breaches', default: true },
              { label: t.settings.lowActivity, desc: 'Possible illness', default: false },
              { label: t.settings.criticalSos, desc: 'Urgent attention needed', default: true },
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
              <Switch defaultChecked />
            </div>
            <div className="p-4 flex items-center justify-center text-primary font-medium text-sm hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors">
              {t.settings.exportReport}
            </div>
          </div>
        </section>

         {/* Support */}
        <section className="mb-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{t.settings.support}</h3>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-gray-100 dark:divide-white/10 dark:bg-white/5">
             <div className="p-4 flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors">
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
            <div className="p-4 flex items-center justify-center text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors">
              {t.settings.contactVet}
            </div>
          </div>
        </section>

      </div>
    </MobileLayout>
  );
}
