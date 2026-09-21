import React, { useState } from "react";
import {
  ShoppingBag,
  Sparkles,
  CreditCard,
  CheckCircle2,
  DollarSign,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  QrCode,
  Zap,
  Loader2,
} from "lucide-react";
import { BusinessProfile, CurrencyCode } from "../../types";
import { CURRENCIES } from "../../data/initialData";
import { generateAiContent } from "../../services/api";
import { MarkdownRenderer } from "../common/MarkdownRenderer";

interface Props {
  profile: BusinessProfile;
  activeCurrency: CurrencyCode;
}

export const SalesStudioView: React.FC<Props> = ({ profile, activeCurrency }) => {
  const [activeTab, setActiveTab] = useState<"offer-stack" | "payment-links" | "abandoned-recovery">("offer-stack");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // Payment Link Generator State
  const [linkTitle, setLinkTitle] = useState("Corporate Lunch Box Subscription (Monthly)");
  const [linkAmount, setLinkAmount] = useState("120000");
  const [linkGateway, setLinkGateway] = useState<"Paystack" | "Flutterwave" | "Stripe">("Paystack");
  const [generatedLink, setGeneratedLink] = useState("");

  const curr = CURRENCIES[activeCurrency] || CURRENCIES.NGN;

  const handleGenerateAi = async (type: string) => {
    setIsGenerating(true);
    try {
      const res = await generateAiContent({
        agent: "Sales Agent",
        task: `Craft ${type}`,
        prompt: `Create a high-converting ${type} for ${profile.name}:
Product: ${profile.offering}
Target Market: ${profile.targetCustomer} in ${profile.city}, ${profile.country}
Currency: ${profile.currency}

Provide:
1. The Grand Slam Offer Stack (Core + 3 Irresistible Bonuses + Stated Value)
2. Risk Reversal & Ironclad Guarantee tailored for African market skepticism
3. Scarcity & Fast-Action Incentive
4. Direct WhatsApp closing pitch for high-ticket buyers`,
        businessProfile: profile,
      });

      setOutput(res.output);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreatePaymentLink = () => {
    const slug = linkTitle.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const sampleUrl = `https://paystack.com/pay/${slug || "bizpilot-order"}`;
    setGeneratedLink(sampleUrl);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Revenue & Monetization Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Sales & Payment Links
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Engineer irresistible value stacks, generate Paystack/Flutterwave checkout links, and recover abandoned chats.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: "offer-stack", label: "Grand Slam Offer Stack", icon: Sparkles },
            { id: "payment-links", label: "Payment Link Generator", icon: CreditCard },
            { id: "abandoned-recovery", label: "WhatsApp Abandoned Order Recovery", icon: MessageSquare },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id as any);
                  if (t.id !== "payment-links") handleGenerateAi(t.label);
                }}
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

      {/* Payment Link Generator Tab */}
      {activeTab === "payment-links" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span>Generate Instant Checkout Link</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Payment Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Paystack", "Flutterwave", "Stripe"] as const).map((gw) => (
                  <button
                    key={gw}
                    type="button"
                    onClick={() => setLinkGateway(gw)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      linkGateway === gw
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {gw}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Product / Invoice Title
              </label>
              <input
                type="text"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder="e.g. VIP Catering Deposit"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Amount ({profile.currency})
              </label>
              <input
                type="text"
                value={linkAmount}
                onChange={(e) => setLinkAmount(e.target.value)}
                placeholder="120000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono font-medium"
              />
            </div>

            <button
              onClick={handleCreatePaymentLink}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>Create Live Payment Link</span>
            </button>
          </div>

          {/* Payment Link Card Simulator */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-bold">{linkGateway} Secure Checkout</span>
                <span className="text-xs text-slate-400">Instant Settlement</span>
              </div>

              <div className="my-6 text-center space-y-2">
                <span className="text-xs text-slate-400 font-medium">{linkTitle}</span>
                <div className="text-3xl font-black text-white">
                  {profile.currency === "NGN" ? `₦${Number(linkAmount || 0).toLocaleString()}` : `$${linkAmount}`}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Merchant:</span>
                  <span className="font-bold text-white">{profile.name}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Accepted Channels:</span>
                  <span className="font-semibold text-emerald-400">Card, USSD, Bank Transfer</span>
                </div>
              </div>
            </div>

            {generatedLink ? (
              <div className="mt-6 p-3.5 bg-emerald-950/60 border border-emerald-500 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-bold">Link Active:</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLink);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-[11px] text-white underline font-mono"
                  >
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
                <input
                  readOnly
                  value={generatedLink}
                  className="w-full bg-slate-950 text-white font-mono text-[11px] p-2 rounded-lg border border-slate-800 truncate"
                />
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center mt-6">
                Click "Create Live Payment Link" to preview shareable Paystack URL.
              </p>
            )}
          </div>
        </div>
      )}

      {/* AI Offer Stack / Abandoned Order Output */}
      {activeTab !== "payment-links" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Generated Sales Strategy</h3>
            </div>
            {output && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
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
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-xs max-w-sm mx-auto">
                Select an option above to generate an offer stack or WhatsApp recovery sequence.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
