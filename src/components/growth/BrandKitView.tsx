import React, { useState } from "react";
import {
  Palette,
  Sparkles,
  Copy,
  Check,
  Download,
  Instagram,
  Linkedin,
  Twitter,
  MessageSquare,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { BusinessProfile } from "../../types";
import { generateAiContent } from "../../services/api";

interface Props {
  profile: BusinessProfile;
  onUpdateProfile: (p: BusinessProfile) => void;
}

export const BrandKitView: React.FC<Props> = ({ profile, onUpdateProfile }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isRegeneratingLogo, setIsRegeneratingLogo] = useState(false);

  const brand = profile.brandKit;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRegenerateLogoSvg = () => {
    setIsRegeneratingLogo(true);
    setTimeout(() => {
      const colors = ["#059669", "#2563EB", "#7C3AED", "#DC2626", "#D97706"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const newSvg = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="28" fill="${randomColor}" />
        <path d="M32 70L50 30L68 70H32Z" fill="#FFFFFF" />
        <circle cx="50" cy="56" r="6" fill="#F59E0B" />
      </svg>`;

      onUpdateProfile({
        ...profile,
        brandKit: {
          ...brand,
          logoSvg: newSvg,
          primaryColor: randomColor,
        },
      });
      setIsRegeneratingLogo(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>Visual Identity & Brand Kit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Brand Identity Kit
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Cohesive color schemes, vector logo assets, typography, and formatted social profiles.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Logo & Colors */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Logo Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Vector Logo Emblem</h3>
              <button
                onClick={handleRegenerateLogoSvg}
                disabled={isRegeneratingLogo}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                {isRegeneratingLogo ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Regenerate Vector</span>
              </button>
            </div>

            <div className="my-6 flex justify-center">
              <div
                className="w-32 h-32 rounded-3xl shadow-lg flex items-center justify-center p-2"
                dangerouslySetInnerHTML={{ __html: brand.logoSvg }}
              />
            </div>

            <p className="text-xs text-slate-500 text-center font-medium">
              Scalable SVG vector icon optimized for favicons, website headers, and social avatars.
            </p>
          </div>

          <button
            onClick={() => handleCopy(brand.logoSvg, "logo")}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            {copiedKey === "logo" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === "logo" ? "SVG Copied!" : "Copy SVG Code"}</span>
          </button>
        </div>

        {/* Color Palette Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
            Brand Color Palette
          </h3>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                Primary Brand
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brand.primaryColor}
                  onChange={(e) =>
                    onUpdateProfile({
                      ...profile,
                      brandKit: { ...brand, primaryColor: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={brand.primaryColor}
                  onChange={(e) =>
                    onUpdateProfile({
                      ...profile,
                      brandKit: { ...brand, primaryColor: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                Secondary Accent
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brand.secondaryColor}
                  onChange={(e) =>
                    onUpdateProfile({
                      ...profile,
                      brandKit: { ...brand, secondaryColor: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={brand.secondaryColor}
                  onChange={(e) =>
                    onUpdateProfile({
                      ...profile,
                      brandKit: { ...brand, secondaryColor: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                High-Contrast Accent
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brand.accentColor}
                  onChange={(e) =>
                    onUpdateProfile({
                      ...profile,
                      brandKit: { ...brand, accentColor: e.target.value },
                    })
                  }
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={brand.accentColor}
                  onChange={(e) =>
                    onUpdateProfile({
                      ...profile,
                      brandKit: { ...brand, accentColor: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 block">Typography Hierarchy</span>
            <p className="text-xs text-slate-600 font-mono">Font: Plus Jakarta Sans / Inter / Display Serif</p>
          </div>
        </div>
      </div>

      {/* Social Bios Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
          Formatted Social Bios & Hooks
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                <Instagram className="w-4 h-4 text-rose-500" />
                <span>Instagram Profile Bio</span>
              </div>
              <button
                onClick={() => handleCopy(brand.socialBios.instagram, "ig")}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                {copiedKey === "ig" ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {brand.socialBios.instagram}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Business Status Bio</span>
              </div>
              <button
                onClick={() => handleCopy(brand.socialBios.whatsappBio, "wa")}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                {copiedKey === "wa" ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {brand.socialBios.whatsappBio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
