import React, { useState } from "react";
import {
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  Send,
  ExternalLink,
  Zap,
  PhoneCall,
  Loader2,
  Users,
  Search,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { BusinessProfile, Lead } from "../../types";
import { generateAiContent } from "../../services/api";
import { MarkdownRenderer } from "../common/MarkdownRenderer";
import { LeadSyncService } from "../../services/leadSync";

interface Props {
  profile: BusinessProfile;
}

export const WhatsAppCenterView: React.FC<Props> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<
    "quick-replies" | "link-generator" | "broadcasts" | "lead-outreach"
  >("lead-outreach");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [outreachSearch, setOutreachSearch] = useState("");
  const [outreachBrand, setOutreachBrand] = useState(
    profile.name && profile.name !== "BizPilot" ? profile.name : "The Rest You Deserve"
  );

  const crmLeads = LeadSyncService.getCrmLeads();
  const scoutedProspects = LeadSyncService.getScoutedProspects();

  // Combine and deduplicate leads with phone numbers
  const outreachCandidates = crmLeads.filter((l) => l.phone && l.phone.trim().length > 3);

  // Link Generator State
  const [intentMessage, setIntentMessage] = useState(
    `Hello ${profile.name}! I would like to get a quote for executive corporate catering.`
  );

  const cleanPhone = profile.whatsappNumber.replace(/[^0-9]/g, "");
  const generatedWhatsAppLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(intentMessage)}`;

  const quickTemplates = [
    {
      title: "1. Instant Welcome & Menu PDF",
      body: `Hello! 👋 Welcome to *${profile.name}*. Thank you for reaching out!\n\nWe provide fresh, gourmet corporate catering and executive meals in ${profile.city}.\n\n📄 View our full menu: https://${profile.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com\n\nHow many people are you looking to cater for?`,
    },
    {
      title: "2. Bank Transfer / Paystack Checkout",
      body: `Thank you for your order! 🎉\n\nTo confirm your booking with *${profile.name}*, please pay via:\n\n💳 Paystack Link: https://paystack.com/pay/${profile.name.toLowerCase().replace(/[^a-z0-9]/g, "")}\n\nOr Bank Transfer:\nBank: Zenith Bank\nAccount: 1012345678\nName: ${profile.name} Ltd\n\nPlease reply with your payment receipt once sent!`,
    },
    {
      title: "3. Post-Delivery Feedback & Review",
      body: `Hello! 😊 This is Chef Tunde from *${profile.name}*.\n\nWe hope you enjoyed your meal today! On a scale of 1-10, how did we do? We’d appreciate a 30-second review to help us serve you even better!`,
    },
  ];

  const handleGenerateAiBroadcast = async (broadcastTopic: string) => {
    setIsGenerating(true);
    try {
      const res = await generateAiContent({
        agent: "WhatsApp Agent",
        task: "Draft High-Converting WhatsApp Broadcast",
        prompt: `Write 3 high-converting WhatsApp broadcast messages for ${profile.name}:
Goal: ${broadcastTopic}
Audience: Existing customers and leads in ${profile.city}, ${profile.country}
Currency: ${profile.currency}

Format requirements:
- Use WhatsApp markdown (*bold*, _italic_, bullet points, emojis)
- Include clear urgency and direct reply call-to-action
- Keep each message under 120 words for maximum reading completion`,
        businessProfile: profile,
      });

      setOutput(res.output);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Africa #1 Commerce Channel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              WhatsApp Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Automate WhatsApp chat triggers, order capture, quick-reply templates, and broadcast promos.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-400">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>{profile.whatsappNumber}</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: "lead-outreach", label: `Outreach Queue (${outreachCandidates.length})`, icon: Users },
            { id: "quick-replies", label: "Quick-Reply Templates", icon: MessageSquare },
            { id: "link-generator", label: "1-Click Chat Link Builder", icon: Zap },
            { id: "broadcasts", label: "AI Broadcast Drafter", icon: Send },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === t.id
                    ? "bg-emerald-500 text-slate-950 shadow-xs"
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

      {/* QUICK REPLIES TAB */}
      {activeTab === "quick-replies" && (
        <div className="grid md:grid-cols-3 gap-6">
          {quickTemplates.map((tmpl, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs space-y-4"
            >
              <div>
                <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                  {tmpl.title}
                </h3>
                <div className="mt-3 p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-xs text-slate-800 font-sans whitespace-pre-wrap leading-relaxed">
                  {tmpl.body}
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(tmpl.body);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Template</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 1-CLICK LINK GENERATOR TAB */}
      {activeTab === "link-generator" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm">Create Pre-filled WhatsApp Trigger</h3>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Customer Pre-filled Message Intent
              </label>
              <textarea
                rows={3}
                value={intentMessage}
                onChange={(e) => setIntentMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium resize-none focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-500 block">Generated wa.me URL:</span>
              <p className="text-xs font-mono text-emerald-700 break-all">{generatedWhatsAppLink}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedWhatsAppLink);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? "Link Copied!" : "Copy Share Link"}</span>
              </button>

              <a
                href={generatedWhatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Test Live</span>
              </a>
            </div>
          </div>

          {/* Phone Screen Simulator */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  WA
                </div>
                <span className="text-xs font-bold text-white">{profile.name}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">online</span>
            </div>

            <div className="my-8 space-y-3">
              <div className="p-3 bg-emerald-900/60 rounded-2xl rounded-tr-none text-xs text-white max-w-xs ml-auto border border-emerald-700/50">
                {intentMessage}
                <span className="text-[9px] text-emerald-300 block text-right mt-1 font-mono">10:42 AM ✓✓</span>
              </div>
              <div className="p-3 bg-slate-800 rounded-2xl rounded-tl-none text-xs text-slate-200 max-w-xs border border-slate-700">
                Hello! Welcome to {profile.name}. Here is our latest menu catalog and discount code.
                <span className="text-[9px] text-slate-400 block text-right mt-1 font-mono">10:42 AM</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center">
              Customer clicks your link and lands directly in chat with message pre-filled.
            </p>
          </div>
        </div>
      )}

      {/* BROADCAST DRAFTER TAB */}
      {activeTab === "broadcasts" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">AI WhatsApp Broadcast Drafter</h3>
              <p className="text-xs text-slate-500">Draft high-converting weekend specials, corporate retainer offers, and re-engagement messages.</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleGenerateAiBroadcast("Weekend Special 20% Off Corporate Group Meals")}
                disabled={isGenerating}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Generate Weekend Special</span>
              </button>
              <button
                onClick={() => handleGenerateAiBroadcast("Re-engaging Inactive Customers with Free Delivery Voucher")}
                disabled={isGenerating}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Re-Engagement Push</span>
              </button>
            </div>
          </div>

          {output ? (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <MarkdownRenderer content={output} />
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <MessageSquare className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs">Click one of the broadcast buttons above to generate AI broadcast drafts.</p>
            </div>
          )}
        </div>
      )}

      {/* LEAD OUTREACH QUEUE TAB */}
      {activeTab === "lead-outreach" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Unified WhatsApp Outreach Queue</h3>
              <p className="text-xs text-slate-500">
                Directly contact prospects and CRM pipeline leads on WhatsApp with pre-composed conversation hooks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl text-xs">
                <span className="text-slate-500 font-bold">Brand:</span>
                <input
                  type="text"
                  value={outreachBrand}
                  onChange={(e) => setOutreachBrand(e.target.value)}
                  placeholder="e.g. The Rest You Deserve"
                  className="bg-transparent font-bold text-slate-800 focus:outline-none w-36"
                  title="Sender brand name used in WhatsApp opening hooks"
                />
              </div>

              <div className="relative w-52">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={outreachSearch}
                  onChange={(e) => setOutreachSearch(e.target.value)}
                  placeholder="Search lead or phone..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              {scoutedProspects.length > 0 && (
                <button
                  onClick={() => LeadSyncService.syncProspectsToCrm(scoutedProspects, "NEW")}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Sync {scoutedProspects.length} Scouted Leads</span>
                </button>
              )}
            </div>
          </div>

          {outreachCandidates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {outreachCandidates
                .filter(
                  (l) =>
                    l.name.toLowerCase().includes(outreachSearch.toLowerCase()) ||
                    l.phone.includes(outreachSearch) ||
                    (l.company && l.company.toLowerCase().includes(outreachSearch.toLowerCase()))
                )
                .map((lead) => {
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
                  const defaultHook = `Hello ${lead.name}! Reaching out from ${outreachBrand}. We noticed your work in ${lead.company || "your sector"} and would love to share how we can support your growth. Would you have 2 minutes for a brief chat?`;
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultHook)}`;

                  return (
                    <div
                      key={lead.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{lead.name}</h4>
                            <span className="text-[11px] text-slate-500 font-medium block">
                              {lead.company || lead.source}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {lead.stage}
                          </span>
                        </div>

                        <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1">
                          <div className="text-slate-500 font-medium">WhatsApp Number:</div>
                          <div className="font-mono font-bold text-slate-900">{lead.phone}</div>
                          {lead.dealValue > 0 && (
                            <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                              Deal Size: ₦{lead.dealValue.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Open WhatsApp Chat</span>
                        </a>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(defaultHook);
                            alert("Hook message copied to clipboard!");
                          }}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                          title="Copy personalized hook"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center space-y-4">
              <PhoneCall className="w-10 h-10 text-emerald-600 mx-auto" />
              <div>
                <h4 className="font-bold text-slate-900 text-base">No Leads in Outreach Queue</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Scout up to 100,000 prospects with phone numbers from TikTok, Instagram, LinkedIn, and Facebook, or add leads in CRM.
                </p>
              </div>
              <button
                onClick={() => LeadSyncService.navigateToModule("prospect-intelligence")}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-sm"
              >
                <Compass className="w-4 h-4" />
                <span>Launch Omni-Channel Scout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
