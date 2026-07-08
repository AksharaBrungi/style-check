import React from 'react';
import { Sparkles, Camera, CheckCircle, Shield, Zap, Palette, Layers, Award } from 'lucide-react';

interface HomeViewProps {
  onStartAnalyzing: () => void;
}

export default function HomeView({ onStartAnalyzing }: HomeViewProps) {
  return (
    <div className="space-y-16 animate-fade-in text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-6 pb-2">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-xs font-bold font-mono uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
          StyleCheck Hackathon Edition
        </span>

        <h1 className="font-display font-black text-5xl sm:text-7xl text-gray-950 dark:text-white tracking-tight leading-none">
          Dress for the <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Perfect Impression
          </span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
          StyleCheck combines high-speed computer vision with advanced AI styling engines to parse your coordinate shades, evaluate outfit coherence, and deliver instant, designer-grade fashion feedback.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartAnalyzing}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 active:scale-98"
          >
            <Camera className="w-5 h-5" />
            Analyze Your Outfit
          </button>
          
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-base rounded-2xl transition-all border border-gray-200 dark:border-gray-800 text-center cursor-pointer block"
          >
            How It Works
          </a>
        </div>

        {/* Feature Highlights Row */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
          <div className="p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-850 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold">Real-time Scans</p>
              <p className="text-gray-400 mt-0.5">Results in &lt; 3 seconds</p>
            </div>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-850 flex items-start gap-2.5">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold">CV Classification</p>
              <p className="text-gray-400 mt-0.5">YOLOv8 Garment parsing</p>
            </div>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-850 flex items-start gap-2.5">
            <Palette className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold">Swatch Extraction</p>
              <p className="text-gray-400 mt-0.5">Auto HEX color swatches</p>
            </div>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-850 flex items-start gap-2.5">
            <Award className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold">Style Score</p>
              <p className="text-gray-400 mt-0.5">Interactive grading system</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="space-y-8 max-w-5xl mx-auto pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            Aesthetic Science
          </span>
          <h2 className="font-display font-extrabold text-3xl text-gray-900 dark:text-white tracking-tight">
            How StyleCheck Works
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Our multi-tiered analysis engine performs deep vision extraction in three elegant steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 space-y-4 relative overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-display font-black text-xl">
              1
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display font-bold text-lg">Portrait Capture</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-450 leading-relaxed">
                Upload a clear vertical photograph of your outfit. A single person should stand full-body with even, soft lighting.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 space-y-4 relative overflow-hidden group hover:border-purple-300 dark:hover:border-purple-700 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-display font-black text-xl">
              2
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display font-bold text-lg">Garment Indexing</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-450 leading-relaxed">
                Vision models segment fabric zones, categorize active layers (coats, trousers, footwear), and isolate primary color hex codes.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 space-y-4 relative overflow-hidden group hover:border-pink-300 dark:hover:border-pink-700 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/40 text-pink-500 dark:text-pink-400 flex items-center justify-center font-display font-black text-xl">
              3
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display font-bold text-lg">Gemini Evaluation</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-450 leading-relaxed">
                Our customized Gemini model reviews fit proportions, grades style cohesion out of 100, and lists weaknesses and footwear upgrades.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
