import { useState } from "react";
import { useApp } from "@/lib/appContext";
import { useLocation } from "wouter";
import { ArrowRight, Lock, Smartphone } from "lucide-react";
import bgImage from "@assets/generated_images/soft_gradient_background_for_mobile_app.png";
import { cn } from "@/lib/utils";

export default function Login() {
  const { login } = useApp();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      login(phone);
      setLoading(false);
      setLocation("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto relative overflow-hidden bg-background flex flex-col items-center justify-center p-6 font-sans">
      {/* Background */}
      <div 
        className="fixed inset-0 z-0 opacity-40 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="z-10 w-full max-w-sm">
        <div className="text-center mb-10">
           <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center text-white font-bold text-4xl shadow-2xl shadow-primary/40 animate-in zoom-in duration-500">
             C
           </div>
           <h1 className="text-3xl font-heading font-bold text-foreground mb-2">CowSense AI</h1>
           <p className="text-muted-foreground">Next-gen herd monitoring</p>
        </div>

        <div className="glass-popup p-8 rounded-3xl backdrop-blur-xl">
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Mobile Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input 
                    type="tel" 
                    placeholder="98765 43210"
                    className="w-full bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg font-bold text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/50"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={phone.length < 10 || loading}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? "Sending OTP..." : <>Get OTP <ArrowRight className="w-5 h-5" /></>}
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground">Verify OTP</h3>
                <p className="text-sm text-muted-foreground">Sent to +91 {phone}</p>
              </div>

              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    className="w-14 h-16 text-center text-2xl font-bold bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none transition-all text-foreground"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && i > 0) {
                        document.getElementById(`otp-${i-1}`)?.focus();
                      }
                    }}
                  />
                ))}
              </div>

              <button 
                onClick={handleVerify}
                disabled={otp.some(d => !d) || loading}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                 {loading ? "Verifying..." : <>Verify & Login <Lock className="w-4 h-4" /></>}
              </button>
              
              <button 
                onClick={() => setStep('phone')} 
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Change Number
              </button>
            </div>
          )}
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8 opacity-60">
          By logging in, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
