import React from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Globe,
  Sparkles,
  Bot,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { BusinessProfile, Lead, CurrencyCode } from "../../types";
import { CURRENCIES } from "../../data/initialData";

interface Props {
  profile: BusinessProfile;
  leads: Lead[];
  activeCurrency: CurrencyCode;
}

export const AnalyticsView: React.FC<Props> = ({ profile, leads, activeCurrency }) => {
  const curr = CURRENCIES[activeCurrency] || CURRENCIES.NGN;

  const totalRevenue = leads
    .filter((l) => l.stage === "CUSTOMER" || l.stage === "REPEAT CUSTOMER")
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  const formatMoney = (amount: number) => {
    if (activeCurrency === "NGN") return `₦${amount.toLocaleString()}`;
    const converted = amount / 1550;
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const funnelSteps = [
    { label: "Website Visitors", count: "3,840", percentage: "100%", color: "bg-teal-500" },
    { label: "Menu Catalog Views", count: "1,420", percentage: "36.9%", color: "bg-blue-500" },
    { label: "WhatsApp & Form Leads", count: `${leads.length || 142}`, percentage: "18.4%", color: "bg-amber-500" },
    { label: "Proposals / Quotes Sent", count: "86", percentage: "11.2%", color: "bg-purple-500" },
    { label: "Paying Customers", count: `${leads.filter((l) => l.stage === "CUSTOMER" || l.stage === "REPEAT CUSTOMER").length || 28}`, percentage: "3.7%", color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Full-Stack Business Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Business Analytics & Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Live funnel performance, attribution diagnostics, and AI growth predictions.
            </p>
          </div>
        </div>
      </div>

      {/* AI Narrative Diagnostic Banner */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 uppercase font-mono">
                AI Narrative Diagnostic
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-bold">
                Weekly Analysis
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              "Your conversion rate from <strong>WhatsApp click to Paying Customer</strong> is <strong>24.8%</strong>, outperforming industry averages for {profile.businessModel} in {profile.city}. Traffic from Instagram carousel ads has the highest deal value. We recommend boosting ad spend on the 'Corporate Lunch Box' package by ₦20,000 this weekend."
            </p>
          </div>
        </div>
      </div>

      {/* Funnel & Traffic Sources Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Conversion Funnel */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Full Conversion Funnel</h3>
            <span className="text-xs text-slate-400 font-mono">Last 30 Days</span>
          </div>

          <div className="space-y-4">
            {funnelSteps.map((step, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800">{step.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-900 font-bold">{step.count}</span>
                    <span className="text-slate-400 font-mono text-[11px]">({step.percentage})</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${step.color} rounded-full transition-all duration-500`}
                    style={{ width: step.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Channels Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Traffic Acquisition Channels</h3>
            <span className="text-xs text-slate-400 font-mono">Sources</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { source: "Instagram & Meta Ads", visitors: "1,640", pct: "42.7%", conv: "22%" },
              { source: "WhatsApp Direct Sharing", visitors: "1,120", pct: "29.1%", conv: "31%" },
              { source: "Google Local Search (SEO)", visitors: "780", pct: "20.3%", conv: "14%" },
              { source: "Direct / QR Code Menu", visitors: "300", pct: "7.9%", conv: "28%" },
            ].map((ch, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{ch.source}</span>
                  <span className="text-[11px] text-slate-500 font-mono">{ch.visitors} visits ({ch.pct})</span>
                </div>
                <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                  {ch.conv} Conv.
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
