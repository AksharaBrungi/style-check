import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Camera, CheckCircle2, ShieldAlert, RefreshCw, HelpCircle, Sun, Moon 
} from 'lucide-react';

import Header from './components/Header';
import HomeView from './components/HomeView';
import UploadZone from './components/UploadZone';
import ReportView from './components/ReportView';
import AboutView from './components/AboutView';

import { AnalysisReport } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'analyze' | 'about'>('home');
  const [activeReport, setActiveReport] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Notifications
  const [toasts, setToasts] = useState<{ id: string; text: string; type: 'success' | 'info' | 'error' }[]>([]);

  // 1. Dark Mode initialization & side effect
  useEffect(() => {
    const savedTheme = localStorage.getItem('stylecheck_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('stylecheck_theme', 'dark');
        triggerToast("Switched to dark mode. Eye-safety active.", "success");
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('stylecheck_theme', 'light');
        triggerToast("Switched to light mode.", "success");
      }
      return next;
    });
  };

  const triggerToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // 2. Core Outfit Analyzer Selected Handler
  const handleOutfitSelected = async (data: string, mimeType: string) => {
    setIsLoading(true);

    // REAL PHYSICAL UPLOAD INTERACTION
    try {
      const response = await fetch('/api/analyze-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: data,
          mimeType,
          userSelectedOccasion: null
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Unable to analyze this image. Please try again.");
      }

      const reportData = await response.json();
      
      const newReport: AnalysisReport = {
        ...reportData,
        id: `report-${Date.now()}`,
        imageUrl: data,
        createdAt: new Date().toISOString()
      };

      setActiveReport(newReport);
      triggerToast("StyleCheck fashion score generated!", "success");

    } catch (err: any) {
      console.error("Outfit scanning failure:", err);
      triggerToast(err.message || "Unable to analyze this image. Please try again.", "error");
      setActiveReport(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 flex flex-col font-sans text-gray-950 dark:text-gray-100 antialiased transition-colors duration-300 pb-16">
      
      {/* Toast notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2 pointer-events-none w-full max-w-xs sm:max-w-sm">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`p-3.5 rounded-2xl border shadow-lg flex items-start gap-2.5 text-xs font-semibold bg-white dark:bg-gray-900 pointer-events-auto animate-slide-in ${
              t.type === 'success' ? 'border-emerald-100 dark:border-emerald-950/40 text-emerald-800 dark:text-emerald-400' :
              t.type === 'error' ? 'border-rose-100 dark:border-rose-950/40 text-rose-800 dark:text-rose-400' : 
              'border-indigo-100 dark:border-indigo-950/40 text-indigo-800 dark:text-indigo-400'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />}
            {t.type === 'error' && <ShieldAlert className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />}
            {t.type === 'info' && <RefreshCw className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5 animate-spin" />}
            <span>{t.text}</span>
          </div>
        ))}
      </div>

      {/* Main minimal header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // If moving between main navigation tabs, clear report views to let users upload fresh
          if (tab !== 'analyze') {
            setActiveReport(null);
          }
        }}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
        
        {/* Router tabs */}
        <div className="space-y-12">
          
          {/* TAB 1: HOME */}
          {activeTab === 'home' && (
            <HomeView onStartAnalyzing={() => setActiveTab('analyze')} />
          )}

          {/* TAB 2: ANALYZE */}
          {activeTab === 'analyze' && (
            <div className="max-w-4xl mx-auto">
              {activeReport ? (
                <ReportView 
                  report={activeReport}
                  onReset={() => setActiveReport(null)}
                />
              ) : (
                <div className="space-y-8">
                  {/* Subtle contextual header */}
                  <div className="text-center space-y-2 max-w-lg mx-auto">
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-gray-950 dark:text-white">
                      Outfit Element Analyzer
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Upload your high-definition full portrait image. Our system extracts coordinate items and returns custom recommendations instantly.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900/60 rounded-3xl border border-gray-150 dark:border-gray-850 p-6 sm:p-10 shadow-xs">
                    <UploadZone 
                      onImageSelected={handleOutfitSelected}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === 'about' && (
            <AboutView />
          )}

        </div>
      </main>

    </div>
  );
}
