import { MobileLayout } from "@/components/layout/MobileLayout";
import { mockNotifications } from "@/lib/mockData";
import { Bell, AlertTriangle, Info, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Notifications() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <MobileLayout>
      <div className="pt-2 pb-6">
        <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6 text-primary" /> Notifications
        </h2>

        <div className="space-y-4">
          {mockNotifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "rounded-3xl overflow-hidden border transition-all duration-300",
                notif.type === 'critical' ? "bg-red-50/80 border-red-200" :
                notif.type === 'warning' ? "bg-orange-50/80 border-orange-200" :
                "bg-blue-50/80 border-blue-200"
              )}
            >
              <div 
                className="p-5 flex gap-4 cursor-pointer"
                onClick={() => toggleExpand(notif.id)}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0",
                  notif.type === 'critical' ? "bg-red-100 text-red-600" :
                  notif.type === 'warning' ? "bg-orange-100 text-orange-600" :
                  "bg-blue-100 text-blue-600"
                )}>
                  {notif.type === 'critical' ? <AlertTriangle className="w-6 h-6" /> :
                   notif.type === 'warning' ? <Info className="w-6 h-6" /> :
                   <CheckCircle className="w-6 h-6" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-foreground text-base">{notif.title}</h3>
                    <span className="text-[10px] text-muted-foreground font-medium">{notif.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-snug">{notif.message}</p>
                </div>

                <div className="flex items-center justify-center">
                  {expandedId === notif.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === notif.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-white/40 px-5 pb-5 pt-0 text-sm"
                  >
                    <div className="h-px w-full bg-black/5 mb-4" />
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1 text-xs uppercase tracking-wide opacity-70">Analysis</h4>
                        <p className="text-muted-foreground">{notif.explanation}</p>
                      </div>

                      {notif.action && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wide opacity-70">Recommended Actions</h4>
                          <ul className="space-y-1">
                            {notif.action.map((act, i) => (
                              <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {act}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {notif.firstAid && (
                        <div className="bg-white/60 rounded-xl p-3 border border-white/50">
                          <h4 className="font-bold text-red-500 mb-2 text-xs uppercase tracking-wide flex items-center gap-1">
                            <span className="text-lg">⛑️</span> First Aid
                          </h4>
                          <ul className="space-y-1">
                            {notif.firstAid.map((aid, i) => (
                              <li key={i} className="flex items-center gap-2 text-foreground font-medium text-xs">
                                <CheckCircle className="w-3 h-3 text-green-500" /> {aid}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
