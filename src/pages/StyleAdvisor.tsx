import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Upload, FileText, Image as ImageIcon, CheckCircle, RefreshCw, Star, Download, Play, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const StyleAdvisor: React.FC = () => {
  const { products, setView, addToCart } = useApp();

  // Form states
  const [outfitDescription, setOutfitDescription] = useState('');
  const [outfitImage, setOutfitImage] = useState<string | null>(null);
  const [occasion, setOccasion] = useState('Daily Commute');
  const [style, setStyle] = useState('Minimalist');
  const [gender, setGender] = useState('Unisex');
  const [budget, setBudget] = useState('3000');

  // File drag states
  const [isDragActive, setIsDragActive] = useState(false);

  // AI loading and result states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [result, setResult] = useState<any>(null);

  const loadingPhrases = [
    'Tracing color patterns in your outfit...',
    'Matching outfit style with Pooja and Neha’s fashion library...',
    'Consulting our 35 years of bag design heritage...',
    'Verifying leather grain and fabric compatibility...',
    'Sizing the optimal carryall for your occasion...',
    'Generating styling report & matching bag recommendations...'
  ];

  // Convert uploaded file to base64
  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOutfitImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleGenerateAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setResult(null);

    // Stagger loading messages beautifully
    let currentPhraseIdx = 0;
    setLoadingMessage(loadingPhrases[currentPhraseIdx]);
    const timer = setInterval(() => {
      currentPhraseIdx = (currentPhraseIdx + 1) % loadingPhrases.length;
      setLoadingMessage(loadingPhrases[currentPhraseIdx]);
    }, 2000);

    try {
      const res = await fetch('/api/style-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outfitDescription,
          outfitImage,
          occasion,
          style,
          gender,
          budget
        })
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      clearInterval(timer);
      setIsAnalyzing(false);
    }
  };

  const handleDownloadReport = () => {
    if (!result) return;
    const report = result.report;
    const content = `=========================================
THE BIG BAGS - AI STYLE ADVISOR REPORT
=========================================
ID: ${report.id}
Date: ${report.date}
Occasion: ${report.occasion}
Fashion Style: ${report.style}
Gender Category: ${report.gender}

OUTFIT ANALYZED:
"${report.outfitDescription}"

-----------------------------------------
RECOMMENDATIONS:
- Ideal Bag Category: ${report.bestCategory}
- Ideal Bag Color: ${report.bestColor}
- Ideal Bag Size: ${report.bestSize}
- Ideal Material: ${report.bestMaterial}

STYLE COMPATIBILITY SCORE: ${report.styleScore}/100

-----------------------------------------
EXPERT FASHION ADVICE FROM POOJA & NEHA:
"${result.adviceText}"

-----------------------------------------
STYLING TIPS:
${report.tips.map((tip: string, idx: number) => `${idx + 1}. ${tip}`).join('\n')}

-----------------------------------------
MATCHING BAG PRODUCTS:
${report.recs.join('\n')}

Thank you for consulting The Big Bags. 
Handcrafted Excellence Since 1991.
=========================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TheBigBags_Style_Report_${report.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const matchedBags = result 
    ? products.filter(p => result.report.recs.some((name: string) => p.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(p.name.toLowerCase())))
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Title Header */}
      <div className="text-center space-y-2 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream border border-brand-gold/30 text-brand-gold rounded-xs text-xs font-bold tracking-wider uppercase">
          <Sparkles className="h-3.5 w-3.5 fill-brand-gold animate-pulse text-brand-gold" />
          <span>Generative AI Fashion Assistant</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl tracking-tight uppercase">AI Style Advisor</h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          Upload an image of your outfit or describe it, and let Pooja and Neha’s heritage AI matching engine recommend the ultimate bag.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* 1. INPUT FORM COLUMN */}
        <div className="md:col-span-5">
          <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-xs space-y-6">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-black border-b border-gray-50 pb-2">Style Inputs</h3>
            
            <form onSubmit={handleGenerateAdvisor} className="space-y-4">
              
              {/* Image Upload box (supports Drag & Drop) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Outfit Image (Optional)</label>
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xs p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all h-36 relative ${outfitImage ? 'border-brand-gold bg-brand-cream' : isDragActive ? 'border-brand-gold bg-brand-cream/80' : 'border-gray-100 hover:border-gray-200 bg-[#FAFAFA]'}`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {outfitImage ? (
                    <div className="flex flex-col items-center gap-1 w-full h-full relative justify-center">
                      <img src={outfitImage} alt="Uploaded Outfit preview" className="h-16 w-16 rounded object-cover shadow-sm" />
                      <span className="text-[10px] font-bold text-brand-gold">Outfit Image Loaded</span>
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setOutfitImage(null); }}
                        className="text-[9px] text-red-500 hover:underline font-bold mt-1 z-10"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <Upload className="h-6 w-6 text-gray-400 mx-auto" />
                      <p className="text-[10px] text-gray-600 font-bold">Drag &amp; Drop outfit picture here</p>
                      <span className="text-[9px] text-gray-400">or click to browse local files</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Text description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Describe Outfit Details</label>
                <textarea
                  value={outfitDescription}
                  onChange={(e) => setOutfitDescription(e.target.value)}
                  placeholder="e.g. Navy blue formal linen suit, crisp white linen shirt, tan leather shoes, gold wrist watch."
                  rows={3}
                  className="w-full text-xs p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold"
                />
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Occasion</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-gray-200 rounded-lg focus:outline-none"
                  >
                    <option>Daily Commute</option>
                    <option>Casual Outing</option>
                    <option>Hiking &amp; Outdoors</option>
                    <option>Formal/Wedding</option>
                    <option>Gym &amp; Fitness</option>
                    <option>School/College</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Theme Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-gray-200 rounded-lg focus:outline-none"
                  >
                    <option>Minimalist</option>
                    <option>Classic/Heritage</option>
                    <option>Bold/Vibrant</option>
                    <option>Sporty</option>
                    <option>Streetwear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Ideal Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-gray-200 rounded-lg focus:outline-none"
                  >
                    <option>Unisex</option>
                    <option>Women</option>
                    <option>Men</option>
                    <option>Kids</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Max Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-gray-200 rounded-lg focus:outline-none"
                  >
                    <option value="2000">Under ₹2,000</option>
                    <option value="3000">Under ₹3,000</option>
                    <option value="4500">Under ₹4,500</option>
                    <option value="6000">Under ₹6,000</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-3 bg-brand-black hover:bg-brand-gold text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:scale-105 active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer flex items-center justify-center gap-1.5 shadow"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isAnalyzing ? 'Analyzing Outfit...' : 'Generate Styling Advice'}</span>
              </button>

            </form>
          </div>
        </div>

        {/* 2. RESULTS DISPLAY COLUMN */}
        <div className="md:col-span-7 flex flex-col justify-start">
          
          <AnimatePresence mode="wait">
            {/* Loading Thinking state */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-100 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-6 shadow-sm min-h-[350px]"
              >
                <div className="h-12 w-12 rounded-full border-4 border-brand-gold/20 border-t-brand-gold animate-spin" />
                <p className="text-xs text-gray-500 font-bold max-w-sm leading-relaxed animate-pulse">
                  {loadingMessage}
                </p>
                <span className="text-[10px] text-gray-300 font-mono">Generative reasoning might take 2-4 seconds</span>
              </motion.div>
            )}

            {/* Empty state when no report generated */}
            {!isAnalyzing && !result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-dashed border-gray-200 rounded-sm p-16 text-center space-y-4 min-h-[350px] flex flex-col items-center justify-center"
              >
                <div className="p-4 bg-brand-cream text-brand-gold rounded-full">
                  <Sparkles className="h-8 w-8 animate-pulse" />
                </div>
                <h3 className="font-display font-black text-lg text-brand-black uppercase">Awaiting Your Outfit Context</h3>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed mx-auto">
                  Provide your daily outfit colors or upload a mirror selfie, select your target budget, and Pooja and Neha’s heritage style algorithm will diagnose your perfect match.
                </p>
              </motion.div>
            )}

            {/* Result Report Card loaded */}
            {!isAnalyzing && result && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Main Diagnosis block */}
                <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-xs space-y-6">
                  
                  {/* Top report header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-50 pb-4 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 font-medium">Report Code: {result.report.id}</span>
                      <h3 className="font-display font-bold text-base text-brand-black">Style Match Summary</h3>
                    </div>
                    <button
                      onClick={handleDownloadReport}
                      className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-xs text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Style Report</span>
                    </button>
                  </div>

                  {/* Score & recommendation grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    {/* Style score radial gauge */}
                    <div className="sm:col-span-4 flex flex-col items-center text-center p-4 bg-brand-cream border border-brand-gold/15 rounded-xs">
                      <div className="relative h-24 w-24 flex items-center justify-center">
                        {/* Circle path */}
                        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="#FAF9F6" strokeWidth="8" fill="transparent" />
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            stroke="#9A8B7A" 
                            strokeWidth="8" 
                            fill="transparent" 
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * result.report.styleScore) / 100}
                          />
                        </svg>
                        <span className="font-display font-black text-2xl text-brand-black">{result.report.styleScore}%</span>
                      </div>
                      <span className="text-[10px] font-bold text-brand-gold tracking-wider uppercase mt-3">Compatibility Score</span>
                    </div>

                    {/* Spec badges */}
                    <div className="sm:col-span-8 grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-400">Recommended Category:</span>
                        <p className="font-bold text-brand-black mt-0.5">{result.report.bestCategory}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-400">Recommended Color:</span>
                        <p className="font-bold text-brand-black mt-0.5">{result.report.bestColor}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-400">Recommended Size:</span>
                        <p className="font-bold text-brand-black mt-0.5">{result.report.bestSize}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-400">Recommended Material:</span>
                        <p className="font-bold text-brand-black mt-0.5">{result.report.bestMaterial}</p>
                      </div>
                    </div>
                  </div>

                  {/* Chatbox style response */}
                  <div className="p-4 bg-brand-cream border border-brand-gold/15 rounded-xl space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-brand-gold flex items-center justify-center text-[9px] font-bold text-brand-black">NP</div>
                      <span className="text-xs font-bold text-gray-800">Pooja &amp; Neha’s Styling Advice:</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed italic font-sans pl-8">
                      &quot;{result.adviceText}&quot;
                    </p>
                  </div>

                  {/* Styling Tips */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Styling &amp; Coordination Tips:</h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {result.report.tips.map((tip: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle className="h-4 w-4 text-brand-gold flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Recommended Bags Products */}
                {matchedBags.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-l-2 border-brand-gold pl-2">
                      Handcrafted Bag Matches from Our Factory
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {matchedBags.map((p) => (
                        <div 
                          key={p.id}
                          className="bg-white border border-gray-100 rounded-xl p-3 flex gap-4 items-center hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setView('detail', p.id)}
                        >
                          <img src={p.images[0]} alt="" className="h-16 w-16 rounded object-cover shadow-sm bg-gray-50 flex-shrink-0" referrerPolicy="no-referrer" />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] text-brand-gold uppercase font-mono font-bold">{p.category}</span>
                            <h4 className="text-xs font-bold text-gray-800 truncate">{p.name}</h4>
                            <span className="text-xs font-black text-brand-black block mt-0.5">₹{p.price.toLocaleString('en-IN')}</span>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); addToCart(p.id, 1, p.colors[0]); }}
                            className="px-3 py-1.5 bg-brand-black hover:bg-brand-gold text-white text-[10px] font-bold rounded"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};
