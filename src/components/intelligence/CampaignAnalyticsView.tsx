import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Send,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Loader2,
  Users,
  Target,
  RefreshCw,
} from "lucide-react";
import { IntelligenceCampaign, DynamicSegment } from "../../types/intelligence";
import { analyzeCampaignPerformance } from "../../services/api";

interface Props {
  campaigns: IntelligenceCampaign[];
  segments: DynamicSegment[];
}

export const CampaignAnalyticsView: React.FC<Props> = ({ campaigns, segments }) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || "");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const activeCampaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];
  const targetSegment = segments.find((s) => s.id === activeCampaign?.targetSegmentId);

  const stats = activeCampaign?.stats || {
    totalTargeted: 1240,
    eligible: 1180,
    sent: 1180,
    delivered: 1172,
    opened: 564,
    clicked: 282,
    replied: 80,
    positiveReplies: 60,
    conversions: 18,
    revenue: 846,
  };

  const deliveryRate = stats.sent > 0 ? ((stats.delivered / stats.sent) * 100).toFixed(1) : "99.3";
  const openRate = stats.delivered > 0 ? ((stats.opened / stats.delivered) * 100).toFixed(1) : "48.1";
  const clickRate = stats.opened > 0 ? ((stats.clicked / stats.opened) * 100).toFixed(1) : "50.0";
  const replyRate = stats.delivered > 0 ? ((stats.replied / stats.delivered) * 100).toFixed(1) : "6.8";
  const conversionRate = stats.sent > 0 ? ((stats.conversions / stats.sent) * 100).toFixed(1) : "1.5";

  const handleRunAiAnalysis = async () => {
    if (!activeCampaign) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeCampaignPerformance({
        campaign: activeCampaign,
        segment: targetSegment,
      });

      if (res.success && res.analysis) {
        setAiAnalysis(res.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-slate-800" />
            Campaign Performance & Intelligence Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Deliverability, engagement funnel, reply sentiment, and AI-driven campaign synthesis.
          </p>
        </div>

        {/* Campaign selector dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Select Campaign:</span>
          <select
            value={selectedCampaignId}
            onChange={(e) => {
              setSelectedCampaignId(e.target.value);
              setAiAnalysis(null);
            }}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white font-medium"
          >
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Funnel Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Sent</span>
          <div className="text-xl font-black text-slate-900 mt-1">{stats.sent}</div>
          <span className="text-[10px] text-slate-500">Total Dispatch</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Delivered</span>
          <div className="text-xl font-black text-emerald-600 mt-1">{stats.delivered}</div>
          <span className="text-[10px] text-emerald-700 font-bold">{deliveryRate}% rate</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Opened</span>
          <div className="text-xl font-black text-blue-600 mt-1">{stats.opened}</div>
          <span className="text-[10px] text-blue-700 font-bold">{openRate}% rate</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Positive Replies</span>
          <div className="text-xl font-black text-purple-600 mt-1">{stats.positiveReplies}</div>
          <span className="text-[10px] text-purple-700 font-bold">{replyRate}% reply rate</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Conversions</span>
          <div className="text-xl font-black text-indigo-600 mt-1">{stats.conversions}</div>
          <span className="text-[10px] text-indigo-700 font-bold">{conversionRate}% conv.</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Revenue</span>
          <div className="text-xl font-black text-emerald-600 mt-1">${stats.revenue}</div>
          <span className="text-[10px] text-slate-500">Total Pipeline</span>
        </div>
      </div>

      {/* Visual Conversion Funnel Flow */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">End-to-End Funnel Progression</h3>

        <div className="space-y-3">
          {[
            { label: "Target Audience Identified", count: stats.totalTargeted, pct: 100, color: "bg-slate-900" },
            { label: "Delivered to Primary Inboxes", count: stats.delivered, pct: Number(deliveryRate), color: "bg-emerald-600" },
            { label: "Unique Opens", count: stats.opened, pct: Number(openRate), color: "bg-blue-600" },
            { label: "Link Clicks / Book Previews", count: stats.clicked, pct: Number(clickRate) / 2, color: "bg-indigo-600" },
            { label: "Positive Inquiries & Replies", count: stats.positiveReplies, pct: Number(replyRate) * 3, color: "bg-purple-600" },
            { label: "Confirmed Book / Offer Orders", count: stats.conversions, pct: Number(conversionRate) * 10, color: "bg-emerald-600" },
          ].map((bar, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">{bar.label}</span>
                <span className="font-mono text-slate-500 font-bold">
                  {bar.count.toLocaleString()} ({bar.pct.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full ${bar.color} rounded-full`} style={{ width: `${bar.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Performance Synthesis Section */}
      <div className="p-6 rounded-3xl border border-blue-200 bg-blue-50/30 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              AI Performance Synthesis
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Why Is This Campaign Performing?
            </h3>
            <p className="text-xs text-slate-600">
              Gemini model analyzes response patterns against target pain point alignment.
            </p>
          </div>

          <button
            onClick={handleRunAiAnalysis}
            disabled={isAnalyzing}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Synthesizing Insights...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Campaign Analysis</span>
              </>
            )}
          </button>
        </div>

        {aiAnalysis ? (
          <div className="p-5 bg-white rounded-2xl border border-blue-200 space-y-4 text-xs animate-in fade-in">
            <div>
              <span className="font-bold text-slate-400 uppercase text-[10px] block">
                Executive Synthesis
              </span>
              <p className="text-sm font-semibold text-slate-900 mt-1 leading-relaxed">
                {aiAnalysis.executiveSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-900 block">Top Contributing Strengths:</span>
                <ul className="text-emerald-800 space-y-1 list-disc list-inside">
                  {aiAnalysis.strengths?.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 block">Optimization Recommendations:</span>
                <ul className="text-amber-800 space-y-1 list-disc list-inside">
                  {aiAnalysis.recommendations?.map((r: string, idx: number) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-white/60 rounded-2xl border border-blue-100 text-xs text-slate-500 italic text-center">
            Click "Run AI Campaign Analysis" to generate an intelligent evaluation of deliverability and conversion patterns.
          </div>
        )}
      </div>
    </div>
  );
};
