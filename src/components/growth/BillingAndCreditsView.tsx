import React, { useState } from "react";
import {
  CreditCard,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Crown,
  Mail,
} from "lucide-react";
import { UserSubscription, CurrencyCode, PLATFORM_OWNER_EMAILS } from "../../types";
import { CURRENCIES } from "../../data/initialData";

interface Props {
  subscription: UserSubscription;
  activeCurrency: CurrencyCode;
  onUpgradePlan: (plan: "STARTER" | "PRO" | "AGENCY") => void;
}

export const BillingAndCreditsView: React.FC<Props> = ({
  subscription,
  activeCurrency,
  onUpgradePlan,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<"STARTER" | "PRO" | "AGENCY">("PRO");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const curr = CURRENCIES[activeCurrency] || CURRENCIES.NGN;

  const handleSimulatePayment = (plan: "STARTER" | "PRO" | "AGENCY") => {
    setIsProcessing(true);
    setTimeout(() => {
      onUpgradePlan(plan);
      setIsProcessing(false);
      setSuccessMsg(`Successfully upgraded to ${plan} Plan! 5,000 AI credits added.`);
      setTimeout(() => setSuccessMsg(""), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Subscription & Credit Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Plans, Billing & Credits
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Track your 14-day free trial, manage AI token quota, and scale your business plan.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
            <div className="text-right">
              <span className="text-slate-400 block font-medium">Trial Remaining</span>
              <span className="font-bold text-amber-400 font-mono text-sm">
                {subscription.trialDaysLeft} Days Left
              </span>
            </div>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Platform Owner Master Control Panel */}
      {(subscription.tier === "OWNER_MASTER" || subscription.isOwner) && (
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
                👑
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold tracking-wide">
                  CREATOR & PLATFORM OWNER MASTER OVERRIDE ACTIVE
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Full Platform Ownership Unlimited Access
                </h2>
                <p className="text-xs text-purple-200/90 font-mono mt-0.5">
                  Universal bypass active for all 6 verified platform owner emails.
                </p>
              </div>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-purple-900/60 border border-purple-500/30 text-right">
              <span className="text-[10px] text-purple-300 font-semibold block uppercase">Owner Cost Bypass</span>
              <span className="text-emerald-400 font-black text-sm">100% Free & Unlimited</span>
            </div>
          </div>

          {/* 6 Authorized Owner Emails */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center justify-between">
              <span>Authorized Platform Owners (Unlimited Access & Free 100k Bulk Email):</span>
              <span className="text-emerald-400 font-mono text-[10px]">6 of 6 Verified</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {PLATFORM_OWNER_EMAILS.map((email) => (
                <div
                  key={email}
                  className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-slate-200 flex items-center gap-2"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-3.5">
              <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
                <Mail className="w-3 h-3 text-amber-400" />
                <span>100k Bulk Email</span>
              </div>
              <div className="text-base font-bold text-emerald-400 mt-1">100% Free ($0.00)</div>
              <div className="text-[10px] text-slate-400">Unlimited Send Quota</div>
            </div>
            <div className="bg-slate-900/80 border border-purple-500/20 rounded-2xl p-3.5">
              <div className="text-[11px] text-purple-300 font-medium">Domain Registration</div>
              <div className="text-base font-bold text-white mt-1">₦0 / $0 Free Bypass</div>
              <div className="text-[10px] text-slate-400">1-Click Namecheap Setup</div>
            </div>
            <div className="bg-slate-900/80 border border-purple-500/20 rounded-2xl p-3.5">
              <div className="text-[11px] text-purple-300 font-medium">AI Generation Credits</div>
              <div className="text-base font-bold text-emerald-400 mt-1">∞ Infinite Quota</div>
              <div className="text-[10px] text-slate-400">All 11 Sub-Agents Uncapped</div>
            </div>
            <div className="bg-slate-900/80 border border-purple-500/20 rounded-2xl p-3.5">
              <div className="text-[11px] text-purple-300 font-medium">Cloud Hosting & VPS</div>
              <div className="text-base font-bold text-blue-400 mt-1">100% Free Tier</div>
              <div className="text-[10px] text-slate-400">Root SSH & NVMe Fast Storage</div>
            </div>
            <div className="bg-slate-900/80 border border-purple-500/20 rounded-2xl p-3.5">
              <div className="text-[11px] text-purple-300 font-medium">Anycast DNS & SSL</div>
              <div className="text-base font-bold text-amber-400 mt-1">Global Active</div>
              <div className="text-[10px] text-slate-400">Sub-50ms Edge Nodes</div>
            </div>
          </div>
        </div>
      )}

      {/* Credit Usage Gauge Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">AI Generation Quota</h3>
            <p className="text-xs text-slate-500">Gemini 3.7 Flash autonomous sub-agent executions</p>
          </div>
          <span className="font-mono font-bold text-xs text-emerald-700">
            {subscription.tier === "OWNER_MASTER" || subscription.isOwner
              ? "∞ Infinite Creator Credits"
              : `${subscription.creditsRemaining} / 5,000 Credits`}
          </span>
        </div>

        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all"
            style={{
              width:
                subscription.tier === "OWNER_MASTER" || subscription.isOwner
                  ? "100%"
                  : `${(subscription.creditsRemaining / 5000) * 100}%`,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Active Tier:{" "}
            <strong className="text-slate-900">
              {subscription.tier === "OWNER_MASTER" || subscription.isOwner
                ? "👑 Platform Owner Master Plan"
                : `${subscription.plan || subscription.tier} Active`}
            </strong>
          </span>
          <span>
            Renews on:{" "}
            <strong className="text-slate-900">
              {subscription.renewalDate || "Lifetime Free Master Access"}
            </strong>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            tier: "STARTER" as const,
            price: activeCurrency === "NGN" ? "₦18,500" : "$19",
            credits: "1,500 AI Credits",
            features: [
              "Custom Domain Connection",
              "AI Website Builder",
              "Brand Identity Kit",
              "Paystack / Flutterwave Bridge",
            ],
          },
          {
            tier: "PRO" as const,
            price: activeCurrency === "NGN" ? "₦47,500" : "$49",
            credits: "5,000 AI Credits",
            popular: true,
            features: [
              "All 9 Specialized AI Agents",
              "WhatsApp-First Commerce Center",
              "Visual Automation Workflows",
              "Full CRM Pipeline",
              "AI Weekly Diagnostic",
            ],
          },
          {
            tier: "AGENCY" as const,
            price: activeCurrency === "NGN" ? "₦125,000" : "$129",
            credits: "15,000 AI Credits",
            features: [
              "Unlimited Client Workspaces",
              "White-Label Exports",
              "Custom Gemini API Key Option",
              "Dedicated Account Strategist",
            ],
          },
        ].map((p, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
              p.popular
                ? "bg-slate-900 text-white border-2 border-emerald-500 shadow-xl"
                : "bg-white text-slate-900 border border-slate-200 shadow-xs"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                RECOMMENDED
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-lg">{p.tier}</h3>
                <span className="font-mono text-xs text-emerald-400 font-bold">{p.credits}</span>
              </div>

              <div className="my-4">
                <span className="text-3xl font-black">{p.price}</span>
                <span className={`text-xs ${p.popular ? "text-slate-400" : "text-slate-500"}`}> / month</span>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                {p.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSimulatePayment(p.tier)}
              disabled={isProcessing}
              className={`w-full mt-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                p.popular
                  ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              {isProcessing ? "Processing via Paystack..." : `Upgrade to ${p.tier}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
