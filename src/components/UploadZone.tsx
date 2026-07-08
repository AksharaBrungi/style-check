import React, { useState, useRef, useEffect } from 'react';
import { Upload, ImageIcon, AlertCircle, RefreshCw, Sparkles, UserCheck, ShieldAlert, Image, Trash2 } from 'lucide-react';

interface UploadZoneProps {
  onImageSelected: (base64: string, mimeType: string) => void;
  isLoading: boolean;
}

export default function UploadZone({ onImageSelected, isLoading }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic progress steps simulation to guide user attention
  const [progress, setProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('Initializing scan...');

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const next = prev + Math.floor(Math.random() * 8) + 3;
        
        // Update text labels based on completion percent
        if (next < 25) {
          setCurrentStepText('Analyzing image metadata & lighting parameters...');
        } else if (next < 50) {
          setCurrentStepText('Running computer vision person detection algorithms...');
        } else if (next < 75) {
          setCurrentStepText('Segmenting garment boundaries & fabric folds...');
        } else if (next < 95) {
          setCurrentStepText('Invoking Gemini Pro Fashion analysis models...');
        } else {
          setCurrentStepText('Formulating style recommendations & scores...');
        }
        
        return next > 100 ? 100 : next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  const processFile = (file: File) => {
    setError(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Unsupported file format. Please upload a clear JPG, PNG, or WebP image.');
      return;
    }

    // Validate size (Max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Image file exceeds the 5MB limit. Please compress your portrait and try again.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
        onImageSelected(reader.result, file.type);
      }
    };
    reader.onerror = () => {
      setError('Failed to process image. Please choose another clear photograph.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const removeSelectedImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      
      {/* Upload Zone */}
      <div 
        id="upload-drag-area"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[360px] cursor-pointer ${
          isDragActive 
            ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10 shadow-inner' 
            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-xs'
        }`}
      >
        <input 
          id="hidden-file-input"
          ref={fileInputRef}
          type="file" 
          accept="image/jpeg,image/png,image/webp" 
          onChange={handleChange} 
          className="hidden" 
        />

        {isLoading ? (
          <div className="space-y-6 py-6 w-full max-w-md">
            {/* Spinning Radar Loader */}
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-950 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
              <Upload className="w-7 h-7 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            </div>

            {/* Progress and dynamic labels */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 font-mono">
                <span>{currentStepText}</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{progress}%</span>
              </div>
              
              {/* Outer Progress Bar */}
              <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 leading-normal font-sans italic max-w-xs mx-auto">
              Please keep your browser tab open. Running multi-layered deep computer vision scans...
            </p>
          </div>
        ) : previewUrl ? (
          <div className="space-y-6 w-full max-w-sm mx-auto">
            {/* Elegant preview container */}
            <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 aspect-3/4 max-h-[320px]">
              <img 
                src={previewUrl} 
                alt="Outfit Preview" 
                className="w-full h-full object-cover" 
              />
              
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  onClick={triggerFileInput}
                  className="bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Replace
                </button>
                <button
                  onClick={removeSelectedImage}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              Ready for analysis. Hover image to replace or remove.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Visual Icon Group */}
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto border border-indigo-100 dark:border-indigo-900/60 shadow-xs relative">
              <Upload className="w-9 h-9" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-gray-900">
                AI
              </span>
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-gray-900 dark:text-white tracking-tight">
                Upload your Outfit Silhouette
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Drag & drop your photograph here, or <span className="text-indigo-600 dark:text-indigo-400 font-bold underline">browse file system</span> to begin the smart fit analysis.
              </p>
            </div>

            {/* Instruction Badges */}
            <div className="pt-2 flex flex-wrap gap-2.5 justify-center max-w-md mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400 text-xs font-medium">
                <UserCheck className="w-3.5 h-3.5" />
                Single person only
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-indigo-850 dark:text-indigo-400 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Full-body portrait
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 text-amber-850 dark:text-amber-400 text-xs font-medium">
                <Image className="w-3.5 h-3.5" />
                Pristine lighting
              </span>
            </div>

            <div className="pt-3 text-[10.5px] text-gray-450 dark:text-gray-500 font-mono flex items-center justify-center gap-3">
              <span>JPG, PNG, WebP</span>
              <span className="w-1 h-1 rounded-full bg-gray-350 dark:bg-gray-700"></span>
              <span>Max 5 Megabytes</span>
            </div>
          </div>
        )}

        {/* Error Alert Box */}
        {error && (
          <div className="absolute bottom-6 left-6 right-6 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-rose-700 dark:text-rose-400 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-left shadow-sm">
            <ShieldAlert className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Invalid Upload Parameter</p>
              <p className="text-rose-600 dark:text-rose-450 mt-0.5">{error}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
