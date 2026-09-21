import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  Video,
  Mail,
  Linkedin,
  Twitter,
  BookOpen,
  Copy,
  Check,
  Download,
  Loader2,
} from "lucide-react";
import { BusinessProfile } from "../../types";
import { generateAiContent } from "../../services/api";
import { MarkdownRenderer } from "../common/MarkdownRenderer";

interface Props {
  profile: BusinessProfile;
}

export const ContentFactoryView: React.FC<Props> = ({ profile }) => {
  const [contentType, setContentType] = useState<
    "blog" | "social" | "video-script" | "newsletter" | "lead-magnet"
  >("blog");
  const [topic, setTopic] = useState(
    "How to Choose the Best Corporate Catering in Lagos for Board Meetings"
  );
  const [tone, setTone] = useState("Authoritative, Engaging & Localized");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (typeOverride?: string) => {
    const selected = typeOverride || contentType;
    setIsGenerating(true);
    try {
      const res = await generateAiContent({
        agent: "Content Factory",
        task: `Produce ${selected} Content`,
        prompt: `Generate a publication-ready ${selected} for ${profile.name}.
Topic/Title: ${topic}
Tone: ${tone}
Industry: ${profile.businessModel}
Target Reader: ${profile.targetCustomer} in ${profile.city}, ${profile.country}

Requirements:
- High depth, practical takeaways, and compelling hooks
- If social: include platform emojis, hashtags, and CTA
- If video script: include visual cue, timing (0:00-0:60), audio dialogue, and text-on-screen
- If blog: include H1, H2, bullet takeaways, and WhatsApp quote request CTA`,
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

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.name.toLowerCase().replace(/\s+/g, "-")}-${contentType}.md`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>AI Content Production Factory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Content Factory
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Produce high-converting blog posts, viral video scripts, newsletters, and lead magnets.
            </p>
          </div>
        </div>

        {/* Format Selector Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: "blog", label: "SEO Blog Article", icon: BookOpen },
            { id: "social", label: "LinkedIn & X Posts", icon: Linkedin },
            { id: "video-script", label: "Reels / TikTok Script", icon: Video },
            { id: "newsletter", label: "Email Newsletter", icon: Mail },
            { id: "lead-magnet", label: "Lead Magnet Guide", icon: FileText },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setContentType(t.id as any);
                  handleGenerate(t.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  contentType === t.id
                    ? "bg-purple-600 text-white shadow-xs"
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

      {/* Input Parameters Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-xs">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Topic or Headline Idea
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 5 Mistakes Companies Make When Ordering Corporate Lunches..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Tone & Voice
            </label>
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder="e.g. Informative, witty, luxury..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Generate Publication Draft</span>
          </button>
        </div>
      </div>

      {/* Output Content Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-slate-900 text-sm">Generated Publication Content</h3>
          </div>
          {output && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Markdown</span>
              </button>
            </div>
          )}
        </div>

        {output ? (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <MarkdownRenderer content={output} />
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-xs max-w-sm mx-auto">
              Select your content format above and generate publication-ready assets with Gemini AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
