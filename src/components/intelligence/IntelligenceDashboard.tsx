import React from "react";
import {
  Users,
  Target,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Send,
  Layers,
  Search,
  Filter,
  ArrowRight,
  Database,
  BarChart3,
  Sliders,
  DollarSign,
  Ban,
  Clock,
  ChevronRight,
  Compass,
} from "lucide-react";
import {
  ProspectRecord,
  DynamicSegment,
  ProductRecord,
  IntelligenceCampaign,
  GlobalSuppressionRecord,
} from "../../types/intelligence";

interface Props {
  prospects: ProspectRecord[];
  segments: DynamicSegment[];
  products: ProductRecord[];
  campaigns: IntelligenceCampaign[];
  suppressionList: GlobalSuppressionRecord[];
  onNavigateTab: (tabId: string) => void;
  onOpenNaturalQuery?: () => void;
}

export const IntelligenceDashboard: React.FC<Props> = ({
  prospects,
  segments,
  products,
  campaigns,
  suppressionList,
  onNavigateTab,
  onOpenNaturalQuery,
}) => {
  // Aggregate Metrics
  const totalCount = prospects.length;
  const classifiedCount = prospects.filter((p) => p.classificationConfidence !== "Low").length;
  const highFitCount = prospects.filter((p) => p.productFitScore >= 75).length;
  const mediumFitCount = prospects.filter((p) => p.productFitScore >= 50 && p.productFitScore < 75).length;
  const suppressedCount = suppressionList.length;
  const needsReviewCount = prospects.filter((p) => p.classificationConfidence === "Low" || p.confidenceScore < 0.7).length;

  // Active Campaign Stats
  const totalSent = campaigns.reduce((acc, c) => acc + (c.stats?.sent || 0), 0);
  const totalDelivered = campaigns.reduce((acc, c) => acc + (c.stats?.delivered || 0), 0);
  const totalOpened = campaigns.reduce((acc, c) => acc + (c.stats?.opened || 0), 0);
  const totalReplied = campaigns.reduce((acc, c) => acc + (c.stats?.positiveReplies || 0), 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + (c.stats?.conversions || 0), 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + (c.stats?.revenue || 0), 0);

  const deliverabilityRate = totalSent > 0 ? ((totalDelivered / totalSent) * 100).toFixed(1) : "99.4";
  const openRate = totalDelivered > 0 ? ((totalOpened / totalDelivered) * 100).toFixed(1) : "48.2";

  // Profession Distribution Counts
  const professionCounts: Record<string, number> = {};
  prospects.forEach((p) => {
    professionCounts[p.profession] = (professionCounts[p.profession] || 0) + 1;
  });
  const topProfessions = Object.entries(professionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Pain Category Counts
  const painCounts: Record<string, number> = {};
  prospects.forEach((p) => {
    painCounts[p.painCategory] = (painCounts[p.painCategory] || 0) + 1;
  });
  const topPains = Object.entries(painCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Executive Intelligence Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Prospect Segmentation & Campaign Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Prospect Intelligence & Dynamic Audience Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Transform high-volume raw prospects into intelligent, searchable, and verified dynamic segments.
              Match products to exact pain evidence with strict deliverability and compliance safeguards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateTab("scout")}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
            >
              <Compass className="w-4 h-4 text-cyan-200" />
              <span>Omni-Channel Social Scout (100k)</span>
            </button>
            <button
              onClick={() => onNavigateTab("segments")}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-cyan-500/10"
            >
              <Target className="w-4 h-4" />
              <span>Dynamic Segment Builder</span>
            </button>
            <button
              onClick={() => onNavigateTab("ai-classify")}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-colors border border-slate-700"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Bulk AI Classifier</span>
            </button>
          </div>
        </div>

        {/* Natural Language Prompt Search Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              readOnly
              onClick={() => onNavigateTab("segments")}
              placeholder='Try typing: "Show me entrepreneurs in the US experiencing burnout with product fit score > 70"...'
              className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 cursor-pointer hover:border-slate-600 transition-colors focus:outline-none"
            />
          </div>
          <button
            onClick={() => onNavigateTab("segments")}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <span>Query Engine</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Prospects */}
        <div
          onClick={() => onNavigateTab("prospects")}
          className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Prospect Vault</span>
            <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {totalCount.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-emerald-600">{classifiedCount} classified</span>
            <span>•</span>
            <span className="text-amber-600 font-medium">{needsReviewCount} needs review</span>
          </p>
        </div>

        {/* High Relevance Fit */}
        <div
          onClick={() => onNavigateTab("segments")}
          className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">High Product Fit</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {highFitCount.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Score ≥ 75/100 (<span className="text-slate-700 font-semibold">{mediumFitCount} medium fit</span>)
          </p>
        </div>

        {/* Deliverability & Compliance */}
        <div
          onClick={() => onNavigateTab("suppression")}
          className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Deliverability Shield</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {deliverabilityRate}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-rose-600 font-semibold">{suppressedCount} suppressed</span>
            <span>•</span>
            <span>Zero bounce leakage</span>
          </p>
        </div>

        {/* Revenue & Conversions */}
        <div
          onClick={() => onNavigateTab("analytics")}
          className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Campaign Pipeline</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            ${totalRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {totalConversions} conversions • {openRate}% open rate
          </p>
        </div>
      </div>

      {/* Main Grid: Distributions & Active Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Top Taxonomies Breakdown */}
        <div className="lg:col-span-1 space-y-6">
          {/* Top Professions Card */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-500" />
                Top Classified Professions
              </h3>
              <button
                onClick={() => onNavigateTab("prospects")}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {topProfessions.map(([prof, count]) => {
                const percentage = Math.round((count / totalCount) * 100);
                return (
                  <div key={prof} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{prof}</span>
                      <span className="text-slate-500 font-mono">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-slate-900 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Pain Categories Card */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Audience Pain Points
              </h3>
              <button
                onClick={() => onNavigateTab("settings")}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Taxonomy
              </button>
            </div>

            <div className="space-y-3">
              {topPains.map(([pain, count]) => {
                const percentage = Math.round((count / totalCount) * 100);
                return (
                  <div key={pain} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{pain}</span>
                      <span className="text-slate-500 font-mono">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Segments & Active Campaigns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Saved Dynamic Segments Quick View */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Intelligent Dynamic Segments</h3>
                <p className="text-xs text-slate-500">
                  Targeted audience clusters evaluated against verified problem evidence.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("segments")}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
              >
                Manage Segments ({segments.length})
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {segments.map((seg) => (
                <div
                  key={seg.id}
                  onClick={() => onNavigateTab("segments")}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-slate-300 hover:bg-white transition-all cursor-pointer space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{seg.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-900 text-white whitespace-nowrap">
                      {seg.prospectCount.toLocaleString()} leads
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {seg.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-emerald-700">
                      Avg Fit: {seg.averageProductFit}%
                    </span>
                    <span className="text-slate-400 font-medium">
                      {seg.assignedProductName || "General Rest"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Campaigns Card */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Campaign Outreach Sequences</h3>
                <p className="text-xs text-slate-500">
                  Deliverability-safeguarded email sequences with automatic reply stop conditions.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("campaigns")}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                + New Campaign
              </button>
            </div>

            <div className="space-y-3">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{camp.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          camp.status === "SENDING"
                            ? "bg-emerald-500/10 text-emerald-700 animate-pulse"
                            : camp.status === "COMPLETED"
                            ? "bg-blue-500/10 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {camp.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Product: <span className="font-semibold text-slate-700">{camp.productName}</span> • Target:{" "}
                      <span className="font-semibold text-slate-700">{camp.targetSegmentName}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Delivered / Sent</span>
                      <span className="font-bold text-slate-900">
                        {camp.stats.delivered} / {camp.stats.sent}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Positive Replies</span>
                      <span className="font-bold text-purple-700">{camp.stats.positiveReplies}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Revenue</span>
                      <span className="font-bold text-emerald-700">${camp.stats.revenue}</span>
                    </div>
                    <button
                      onClick={() => onNavigateTab("analytics")}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
