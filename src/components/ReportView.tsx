import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, AlertTriangle, RefreshCw, Palette, 
  Download, Shirt, Sparkles, Compass, Flame, ChevronRight 
} from 'lucide-react';
import { AnalysisReport } from '../types';

interface ReportViewProps {
  report: AnalysisReport;
  onReset: () => void;
}

export default function ReportView({ report, onReset }: ReportViewProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate the Style Score count-up on mount
  useEffect(() => {
    const duration = 1200; // ms
    const stepTime = Math.max(Math.floor(duration / (report.styleScore || 1)), 15);
    let current = 0;
    
    const timer = setInterval(() => {
      current += 1;
      if (current >= report.styleScore) {
        setAnimatedScore(report.styleScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [report.styleScore]);

  const copyColorToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  // Score styling parameters
  const score = report.styleScore;
  let scoreRangeName = "Needs Improvement";
  let scoreColorClass = "text-rose-500 dark:text-rose-400 stroke-rose-500 dark:stroke-rose-400 bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/35";

  if (score >= 90) {
    scoreRangeName = "Excellent styling choices!";
    scoreColorClass = "text-emerald-500 dark:text-emerald-400 stroke-emerald-500 dark:stroke-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/35";
  } else if (score >= 75) {
    scoreRangeName = "Good coordinate look";
    scoreColorClass = "text-indigo-500 dark:text-indigo-400 stroke-indigo-500 dark:stroke-indigo-400 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/35";
  } else if (score >= 50) {
    scoreRangeName = "Average casual fit";
    scoreColorClass = "text-amber-500 dark:text-amber-400 stroke-amber-500 dark:stroke-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/35";
  }

  // Radial calculations for style score circle
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Print Report
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in print:bg-white print:p-0 dark:text-gray-200">
      
      {/* 1. TOP STATS BAR */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800/80 p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden shadow-xs">
        
        {/* Subtle glowing ambient card ring */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Circular Progress score */}
        <div className="flex flex-col items-center shrink-0 space-y-3 select-none">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-gray-100 dark:stroke-gray-800"
                strokeWidth="11"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                className={`transition-all duration-1000 ease-out ${
                  score >= 90 ? 'stroke-emerald-500' :
                  score >= 75 ? 'stroke-indigo-500' :
                  score >= 50 ? 'stroke-amber-500' : 'stroke-rose-500'
                }`}
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display font-black text-4xl text-gray-900 dark:text-white tracking-tight leading-none">
                {animatedScore}
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mt-1.5">
                Style Score
              </span>
            </div>
          </div>

          <span className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-colors ${scoreColorClass}`}>
            {scoreRangeName}
          </span>
        </div>

        {/* Vibe and General analysis overview */}
        <div className="flex-1 space-y-3.5 text-center lg:text-left">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
              Core Look Classification
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
              {report.styleCategory}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-xl border border-gray-150/40 dark:border-gray-750">
              <Compass className="w-4 h-4 text-indigo-500" />
              Occasion: {report.occasion}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-xl border border-gray-150/40 dark:border-gray-750">
              <Flame className="w-4 h-4 text-orange-500" />
              Confidence: {report.confidence}%
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
            {report.summary}
          </p>
        </div>

        {/* Minimal Actions Panel */}
        <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800/80 lg:pl-6 print:hidden">
          <button
            id="print-pdf-report"
            onClick={handlePrint}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          
          <button
            id="report-reset-trigger"
            onClick={onReset}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-755 text-gray-800 dark:text-gray-200 px-5 py-3 rounded-xl text-xs font-bold transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700 cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-4 h-4 text-indigo-500" />
            Scan Another
          </button>
        </div>
      </div>

      {/* 2. CORE LAYOUT GRID: IMAGE + VISION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Uploaded Image (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800/80 p-4 shadow-xs">
          <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-3">
            Uploaded Portrait Image
          </span>
          <div className="relative rounded-2xl overflow-hidden shadow-xs aspect-3/4 max-h-[380px]">
            <img 
              src={report.imageUrl} 
              alt="Uploaded Outfit Snapshot" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* CV garments breakdown table (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800/80 p-6 space-y-4 shadow-xs">
          <div>
            <h3 className="font-display font-extrabold text-gray-900 dark:text-white text-base">
              Computer Vision Scan & Element Classification
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              GARMENT SEGMENTATION ENGINE • SEGMENT INDICES
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-950/60 border-b border-gray-100 dark:border-gray-800 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 font-mono tracking-wider">
                  <th className="py-3.5 px-4">Garment Category</th>
                  <th className="py-3.5 px-4">Detected Shade</th>
                  <th className="py-3.5 px-4">Coordinate Vibe</th>
                  <th className="py-3.5 px-4 text-right">Detection Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
                {report.clothingItems && report.clothingItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-850 dark:text-gray-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400 font-medium">
                      {item.color}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 italic">
                      {item.style}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {Math.round(item.confidence * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. COLOR PALETTE EXTRACTOR */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800/80 p-6 space-y-4 shadow-xs">
        <div>
          <h3 className="font-display font-extrabold text-gray-900 dark:text-white text-base">
            Extracted Colors & Swatch Harmony
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
            Hexadecimal tones parsed from active garment pixel channels
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {report.dominantColors && report.dominantColors.map((hex, idx) => (
            <div 
              key={idx}
              onClick={() => copyColorToClipboard(hex)}
              className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent hover:border-gray-100 dark:hover:border-gray-750 cursor-pointer transition-all duration-200 group select-none"
              title="Click to copy hex values"
            >
              <div 
                className="w-10 h-10 rounded-xl shadow-xs border border-gray-200/50 dark:border-gray-700/50 shrink-0 group-hover:scale-105 transition-transform" 
                style={{ backgroundColor: hex }}
              ></div>
              <div className="text-left overflow-hidden">
                <span className="block text-xs font-mono font-bold text-gray-800 dark:text-gray-250 truncate">
                  {hex}
                </span>
                <span className="block text-[10px] text-gray-400 dark:text-gray-500 font-medium font-mono uppercase">
                  {copiedColor === hex ? 'Copied!' : `Tone #${idx + 1}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BENTO GRID: STRENGTHS & WEAKNESSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/70 dark:border-emerald-900/40 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h4 className="font-display font-extrabold text-emerald-950 dark:text-emerald-300 text-base">
              Look Strengths
            </h4>
          </div>
          <ul className="space-y-3.5">
            {report.strengths && report.strengths.map((str, i) => (
              <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 leading-relaxed items-start">
                <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-rose-50/40 dark:bg-rose-950/10 border border-rose-100/70 dark:border-rose-900/40 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            <h4 className="font-display font-extrabold text-rose-950 dark:text-rose-300 text-base">
              Areas of Improvement
            </h4>
          </div>
          <ul className="space-y-3.5">
            {report.weaknesses && report.weaknesses.map((weak, i) => (
              <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-rose-900 dark:text-rose-300 leading-relaxed items-start">
                <ChevronRight className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. RECOMMENDATIONS & STYLE UPGRADES */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-gray-100 dark:border-gray-850 pb-4">
          <h3 className="font-display font-extrabold text-gray-900 dark:text-white text-lg">
            Styling Upgrades & Recommendations
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">
            CREATIVE OUTFIT DESIGN • FASHION DESIGN PRINCIPLES
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Recommended Improvements */}
          <div className="bg-gray-50/60 dark:bg-gray-950/20 p-5 rounded-2xl border border-gray-100/50 dark:border-gray-850 space-y-3 shadow-xs">
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
              Outfit Layering Upgrades
            </span>
            <ul className="space-y-2.5">
              {report.recommendations && report.recommendations.map((item, i) => (
                <li key={i} className="text-xs sm:text-sm text-gray-650 dark:text-gray-300 leading-relaxed flex gap-2 items-start">
                  <span className="font-bold text-indigo-500 shrink-0 select-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footwear suggestions */}
          <div className="bg-gray-50/60 dark:bg-gray-950/20 p-5 rounded-2xl border border-gray-100/50 dark:border-gray-850 space-y-3 shadow-xs">
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
              Footwear Swaps
            </span>
            <ul className="space-y-2.5">
              {report.footwear && report.footwear.map((item, i) => (
                <li key={i} className="text-xs sm:text-sm text-gray-650 dark:text-gray-300 leading-relaxed flex gap-2 items-start">
                  <span className="font-bold text-indigo-500 shrink-0 select-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Accessory additions */}
          <div className="bg-gray-50/60 dark:bg-gray-950/20 p-5 rounded-2xl border border-gray-100/50 dark:border-gray-850 space-y-3 shadow-xs">
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
              Accessory Additions
            </span>
            <ul className="space-y-2.5">
              {report.accessories && report.accessories.map((item, i) => (
                <li key={i} className="text-xs sm:text-sm text-gray-650 dark:text-gray-300 leading-relaxed flex gap-2 items-start">
                  <span className="font-bold text-indigo-500 shrink-0 select-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>

      {/* Restart Analysis Button */}
      <div className="text-center pt-4 print:hidden">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2.5 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 px-7 py-3.5 rounded-xl text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
        >
          <RefreshCw className="w-4 h-4 text-indigo-500" />
          Analyze Another Image
        </button>
      </div>

    </div>
  );
}
