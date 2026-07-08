import React from 'react';
import { Sparkles, Sun, Moon, Home, Upload, Info } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'analyze' | 'about';
  setActiveTab: (tab: 'home' | 'analyze' | 'about') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel dark:dark-glass-panel border-b border-gray-100/80 dark:border-gray-800/80 py-3.5 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          id="brand-logo-container"
        >
          <div className="bg-indigo-600 dark:bg-indigo-500 text-white p-2 rounded-xl shadow-md group-hover:scale-105 transition-all duration-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white transition-colors">
              StyleCheck
            </span>
            <span className="block text-[10px] text-gray-400 dark:text-gray-500 font-mono tracking-wider uppercase font-medium leading-none">
              Fashion AI Agent
            </span>
          </div>
        </div>

        {/* Minimal Navigation Links */}
        <nav className="flex items-center bg-gray-100/70 dark:bg-gray-800/60 p-1 rounded-xl border border-gray-200/40 dark:border-gray-700/40">
          <button
            id="nav-home"
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'home'
                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-xs font-semibold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </button>
          
          <button
            id="nav-upload"
            onClick={() => setActiveTab('analyze')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'analyze'
                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-xs font-semibold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Outfit Analyzer</span>
          </button>
          
          <button
            id="nav-about"
            onClick={() => setActiveTab('about')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'about'
                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-xs font-semibold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">About</span>
          </button>
        </nav>

        {/* Right Actions: Dark Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            id="dark-mode-toggle"
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2.5 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            {isDarkMode ? (
              <Sun className="w-4.5 h-4.5 text-amber-500" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-indigo-600" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
