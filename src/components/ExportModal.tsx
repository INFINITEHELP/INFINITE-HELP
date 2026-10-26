import React, { useState } from 'react';
import { getStandaloneSingleFileHtml } from '../utils/standaloneHtmlGenerator';
import { X, Copy, Check, Download, FileCode, Smartphone } from 'lucide-react';

interface ExportModalProps {
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const standaloneHtml = getStandaloneSingleFileHtml();

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Single-file HTML Export Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl bg-[#052918] border-2 border-[#D4AF37] rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#0A5C36] border-b-2 border-[#D4AF37] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#052918] border border-[#D4AF37] text-[#D4AF37]">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-urdu text-lg font-bold text-white">
                سنگل فائل HTML کوڈ (100% Offline Standalone)
              </h2>
              <p className="text-xs text-emerald-200 font-ui">
                Single-file HTML, CSS & JavaScript for Android WebApp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="بند کریں"
            className="p-1.5 rounded-lg bg-[#052918]/60 text-emerald-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content explanation */}
        <div className="p-4 bg-[#0A5C36]/20 border-b border-[#0A5C36] flex items-center justify-between gap-3">
          <div className="text-xs text-emerald-200 font-urdu leading-relaxed">
            یہ ایک مکمل سنگل فائل ہے جس میں HTML، CSS اور JavaScript سب ایک ہی فائل میں شامل ہیں۔ آپ اسے براہِ راست <code className="text-[#D4AF37] font-mono">index.html</code> کے طور پر محفوظ کر کے Android Studio یا WebView میں استعمال کر سکتے ہیں۔
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-[#0A5C36] hover:bg-[#08482a] border border-[#D4AF37] text-[#D4AF37] hover:text-white font-ui font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'کاپی ہوگیا!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-[#0A5C36] font-ui font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download HTML</span>
            </button>
          </div>
        </div>

        {/* Code Preview Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-black/60 font-mono text-[11px] text-emerald-300/90 whitespace-pre leading-relaxed select-all">
          {standaloneHtml.slice(0, 3000)}
          {'\n\n/* ... (Full code ready for copy or download above) ... */'}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#052918] border-t border-[#0A5C36] flex justify-between items-center text-xs text-emerald-300">
          <span>سائز: ~18 KB • کسی اضافی سرور یا فریم ورک کی ضرورت نہیں</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]/50 font-bold hover:bg-[#0A5C36]/80 cursor-pointer"
          >
            بند کریں
          </button>
        </div>
      </div>
    </div>
  );
};
