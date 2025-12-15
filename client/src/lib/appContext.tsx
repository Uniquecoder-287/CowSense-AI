import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './translations';
import { mockCows, Cow } from './mockData';

type Theme = 'light' | 'dark' | 'system';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: typeof translations.en;
  isAuthenticated: boolean;
  login: (phone: string) => void;
  logout: () => void;
  cows: Cow[];
  addCow: (cow: Cow) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cows, setCows] = useState<Cow[]>(mockCows);

  // Apply theme class to html element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const login = (phone: string) => {
    // Simple mock login
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addCow = (newCow: Cow) => {
    setCows(prev => [newCow, ...prev]);
  };

  const t = translations[language];

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      theme, setTheme, 
      t, 
      isAuthenticated, login, logout,
      cows, addCow 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
