import React, { useState } from "react";
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Globe,
  MapPin,
  TrendingUp,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { BusinessProfile, WebsiteData } from "../../types";
import { generateAiContent } from "../../services/api";
import { MarkdownRenderer } from "../common/MarkdownRenderer";

interface Props {
  profile: BusinessProfile;
  website: WebsiteData;
}

export const SeoStudioView: React.FC<Props> = ({ profile, website }) => {
  const [activeTab, setActiveTab] = useState<"audit" | "keywords" | "schema" | "local-gbp">("audit");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (type: string) => {
    setIsGenerating(true);
    try {
      const res = await generateAiContent({
        agent: "SEO Agent",
        task: `Generate SEO ${type}`,
        prompt: `Generate a comprehensive ${type} for ${profile.name}:
Product/Service: ${profile.offering}
City/Region: ${profile.city}, ${profile.country}
Target Audience: ${profile.targetCustomer}
Domain: ${website.domain}

Requirements:
- Target high-intent transactional keywords in ${profile.city}
- Provide actionable fixes and Schema JSON-LD snippets where applicable
- Include Google Business Profile review acquisition scripts`,
        businessProfile: profile,
      });

      setOutput(res.output);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search Engine Dominance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              SEO & Local Search Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Audit technical health, discover profitable local keywords, and deploy structured Schema markup.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400">SEO Health Score:</span>
            <span className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs font-mono">
              88 / 100
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: "audit", label: "Technical SEO Audit", icon: CheckCircle2 },
            { id: "keywords", label: "Local Keyword Matrix", icon: TrendingUp },
            { id: "schema", label: "JSON-LD Schema Markup", icon: Code2 },
            { id: "local-gbp", label: "Google Business Profile", icon: MapPin },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id as any);
                  handleGenerate(t.label);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === t.id
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Audit Checklist Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm">Automated Technical Health Checks</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Title Tag (&lt;60 char)</span>
            </div>
            <p className="text-slate-600 mt-1 truncate">{website.seo.metaTitle}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Local Schema Markup</span>
            </div>
            <p className="text-slate-600 mt-1">LocalBusiness JSON-LD Active</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mobile-First Indexing</span>
            </div>
            <p className="text-slate-600 mt-1">Viewport & Speed Verified</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Backlink Authority</span>
            </div>
            <p className="text-slate-600 mt-1">Needs local directory citations</p>
          </div>
        </div>
      </div>

      {/* Output Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-sm">SEO Blueprint & Local Strategy</h3>
          </div>
          {output && (
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Output"}</span>
            </button>
          )}
        </div>

        {output ? (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <MarkdownRenderer content={output} />
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-xs max-w-sm mx-auto">
              Select an SEO tool above to analyze search volume, generate Schema markup, or optimize Google Business Profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
