import React, { useState } from "react";
import {
  Megaphone,
  Sparkles,
  Calendar,
  Layers,
  Copy,
  Check,
  Loader2,
  Share2,
  DollarSign,
  Target,
  BarChart,
  Eye,
} from "lucide-react";
import { BusinessProfile } from "../../types";
import { generateAiContent } from "../../services/api";
import { MarkdownRenderer } from "../common/MarkdownRenderer";

interface Props {
  profile: BusinessProfile;
}

export const MarketingAndAdsView: React.FC<Props> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<"calendar" | "meta-ads" | "google-ads" | "campaign">("meta-ads");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [campaignTopic, setCampaignTopic] = useState("Valentine Corporate Lunch Packages & Group Catering");
  const [adBudget, setAdBudget] = useState("5000");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (type: string) => {
    setIsGenerating(true);
    try {
      const res = await generateAiContent({
        agent: "Marketing Agent",
        task: `Generate ${type}`,
        prompt: `Create high-converting ${type} for:
Business: ${profile.name}
Product/Offering: ${profile.offering}
Campaign Focus: ${campaignTopic}
Target Audience: ${profile.targetCustomer} in ${profile.city}, ${profile.country}
Currency/Budget: ${profile.currency} ${adBudget}

Include:
1. Compelling Hooks & Primary Ad Copy with emojis
2. Visual Creative Suggestions (Carousel & Video Storyboards)
3. Call-to-Action with WhatsApp Direct-Chat Link
4. Precise Meta Ads Audience Targeting parameters (Interests, Demographics, Exclusions)`,
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
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-2">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Multi-Channel Growth Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Marketing & Ad Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Autonomous ad copy, high-converting social campaigns, and 30-day content calendars.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleGenerate("30-Day Omnichannel Content Calendar")}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>30-Day Calendar</span>
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: "meta-ads", label: "Meta & Instagram Ads", icon: Megaphone },
            { id: "google-ads", label: "Google Search Ads Copy", icon: Target },
            { id: "calendar", label: "30-Day Content Calendar", icon: Calendar },
            { id: "campaign", label: "Seasonal Campaign Launcher", icon: Sparkles },
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
                    ? "bg-rose-600 text-white shadow-xs"
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

      {/* Control Input Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-xs">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Campaign / Offer Focus
            </label>
            <input
              type="text"
              value={campaignTopic}
              onChange={(e) => setCampaignTopic(e.target.value)}
              placeholder="e.g. 20% discount on first corporate catering order..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-rose-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Target Daily Budget ({profile.currency})
            </label>
            <input
              type="text"
              value={adBudget}
              onChange={(e) => setAdBudget(e.target.value)}
              placeholder="5000"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono font-medium focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => handleGenerate(activeTab)}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Generate High-Converting Ad Creative</span>
          </button>
        </div>
      </div>

      {/* Output Results Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <h3 className="font-bold text-slate-900 text-sm">Generated Ad Blueprint & Assets</h3>
          </div>
          {output && (
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied to Clipboard" : "Copy Output"}</span>
            </button>
          )}
        </div>

        {output ? (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <MarkdownRenderer content={output} />
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Megaphone className="w-6 h-6" />
            </div>
            <p className="text-xs max-w-sm mx-auto">
              Click generate to produce Meta Instagram ad copy, carousel storyboards, and WhatsApp conversion hooks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
