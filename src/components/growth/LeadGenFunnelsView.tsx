import React, { useState } from "react";
import {
  Target,
  Sparkles,
  HelpCircle,
  FileCheck,
  Zap,
  Copy,
  Check,
  Loader2,
  Share2,
} from "lucide-react";
import { BusinessProfile } from "../../types";
import { generateAiContent } from "../../services/api";
import { MarkdownRenderer } from "../common/MarkdownRenderer";

interface Props {
  profile: BusinessProfile;
}

export const LeadGenFunnelsView: React.FC<Props> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<"lead-magnet" | "quiz-funnel" | "landing-copy">("lead-magnet");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (type: string) => {
    setIsGenerating(true);
    try {
      const res = await generateAiContent({
        agent: "Lead Generation Agent",
        task: `Generate ${type}`,
        prompt: `Create a high-converting ${type} for:
Business: ${profile.name}
Offering: ${profile.offering}
Target Audience: ${profile.targetCustomer} in ${profile.city}, ${profile.country}

Provide:
1. Catchy headline that makes people stop scrolling
2. Irresistible hook & value proposition
3. Exact opt-in fields (Name, WhatsApp Number, Company Size)
4. Follow-up automated WhatsApp message with instant delivery link`,
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Customer Acquisition Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Lead Generation & Funnels
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Construct high-converting lead magnets, interactive quizzes, and frictionless opt-in funnels.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: "lead-magnet", label: "Lead Magnet Blueprint", icon: FileCheck },
            { id: "quiz-funnel", label: "Interactive Quiz Funnel", icon: HelpCircle },
            { id: "landing-copy", label: "High-Converting Squeeze Page", icon: Target },
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
                    ? "bg-cyan-600 text-white shadow-xs"
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

      {/* Output Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <h3 className="font-bold text-slate-900 text-sm">Generated Lead Acquisition Funnel</h3>
          </div>
          {output && (
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          )}
        </div>

        {output ? (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <MarkdownRenderer content={output} />
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto">
              <Target className="w-6 h-6" />
            </div>
            <p className="text-xs max-w-sm mx-auto">
              Select a funnel builder above to craft your irresistible lead magnet or diagnostic quiz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
