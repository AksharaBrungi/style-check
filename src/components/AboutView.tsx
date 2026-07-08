import React from 'react';
import { Shield, Sparkles, Cpu, Code, HelpCircle } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 py-6 animate-fade-in text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Title */}
      <div className="space-y-3 text-center sm:text-left">
        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
          Behind StyleCheck
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-950 dark:text-white tracking-tight leading-none">
          Fashion Analytics at the Edge
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
          Learn about our mission to merge advanced Computer Vision models with personal styling AI.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-xs space-y-3">
          <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h4 className="font-display font-bold text-gray-900 dark:text-white text-base">Gemini Pro Integration</h4>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-450 leading-relaxed">
            By utilizing server-side Gemini 2.5 models, StyleCheck performs deep contextual styling reviews, evaluating look proportions, fabric synergy, and occasion parameters.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-xs space-y-3">
          <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h4 className="font-display font-bold text-gray-900 dark:text-white text-base">Full-Stack Architecture</h4>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-450 leading-relaxed">
            Engineered with React 19, Vite, and an Express proxy layer to securely protect secrets. Features instant local image compressions and seamless base64 transmission tunnels.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <section className="space-y-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-8">
        <h3 className="font-display font-extrabold text-lg text-gray-900 dark:text-white flex items-center gap-2">
          <Shield className="w-4.5 h-4.5 text-indigo-500" />
          Privacy & Image Ethics
        </h3>
        <p>
          At StyleCheck, your privacy is our primary engineering requirement. We do not store, index, or sell your personal portrait images on cloud servers. Images uploaded to the Outfit Analyzer are fully processed in ephemeral RAM, transformed into secure base64 byte fragments, proxy-delivered to Google Gemini's safety-guarded endpoints, and immediately cleared.
        </p>
        <p>
          No cookies, permanent user logs, or facial data trackers are kept, making StyleCheck completely free to use without requiring logins or registrations.
        </p>
      </section>

      {/* FAQ Accordion or Quick list */}
      <section className="space-y-4 border-t border-gray-100 dark:border-gray-800 pt-8">
        <h3 className="font-display font-extrabold text-lg text-gray-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-4.5 h-4.5 text-indigo-500" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <p className="font-bold text-gray-800 dark:text-gray-200">What makes a good outfit photo?</p>
            <p className="text-gray-500 dark:text-gray-450">Stand centered in front of a neutral backdrop. Ensure your entire body is captured clearly under bright, natural daylight or crisp indoor lighting, and verify that there are no overlapping shadows or other persons near you.</p>
          </div>
          
          <div className="space-y-1">
            <p className="font-bold text-gray-800 dark:text-gray-200">How is the Style Score calculated?</p>
            <p className="text-gray-500 dark:text-gray-450">The overall Style Score out of 100 combines garment coordination, color palette contrast theory, fitting silhouettes, and how appropriate the coordinate choices are for your target occasion.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
