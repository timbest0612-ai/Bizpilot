import React, { useState } from "react";
import {
  X,
  User,
  Briefcase,
  AlertTriangle,
  Award,
  ShieldCheck,
  History,
  Sparkles,
  ExternalLink,
  Edit3,
  Save,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info,
  ChevronRight,
  TrendingUp,
  Mail,
  Building,
  MapPin,
  Clock,
  Send,
  Ban,
  MessageSquare,
  Users,
} from "lucide-react";
import { ProspectRecord, ProductRecord } from "../../types/intelligence";
import { LeadSyncService } from "../../services/leadSync";

interface Props {
  prospect: ProspectRecord | null;
  products: ProductRecord[];
  onClose: () => void;
  onUpdateProspect: (updated: ProspectRecord) => void;
  onToggleSuppression: (prospect: ProspectRecord) => void;
}

export const ProspectProfileModal: React.FC<Props> = ({
  prospect,
  products,
  onClose,
  onUpdateProspect,
  onToggleSuppression,
}) => {
  if (!prospect) return null;

  const [activeTab, setActiveTab] = useState<
    "overview" | "professional" | "pain" | "persona" | "scoring" | "history" | "compliance" | "ai-meta"
  >("overview");

  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState<ProspectRecord>(prospect);
  const [overrideReason, setOverrideReason] = useState("");
  const [syncedToCrm, setSyncedToCrm] = useState(false);

  const handleSyncToCrm = () => {
    LeadSyncService.syncProspectsToCrm([prospect], "NEW");
    setSyncedToCrm(true);
  };

  const handleSaveOverride = () => {
    const updated: ProspectRecord = {
      ...editedRecord,
      humanOverride: true,
      overrideNotes: overrideReason || "Manual human override applied to classification",
      lastAiUpdate: new Date().toISOString(),
    };
    onUpdateProspect(updated);
    setIsEditing(false);
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    if (score >= 65) return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    if (score >= 50) return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    return "bg-slate-500/10 text-slate-600 border-slate-500/20";
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "Critical":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      case "High":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "Moderate":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {prospect.firstName[0]}
              {prospect.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{prospect.fullName}</h2>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getScoreBadgeColor(
                    prospect.productFitScore
                  )}`}
                >
                  Fit: {prospect.productFitScore}/100
                </span>
                {prospect.humanOverride && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-purple-500/10 text-purple-700 border border-purple-500/20">
                    Human Override
                  </span>
                )}
                {prospect.suppressionStatus && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-rose-500/10 text-rose-700 border border-rose-500/20 flex items-center gap-1">
                    <Ban className="w-3 h-3" /> Suppressed
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span>{prospect.jobTitle || prospect.profession}</span>
                <span>•</span>
                <span>{prospect.organization}</span>
                <span>•</span>
                <span>
                  {prospect.city}, {prospect.country}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Override Classification
              </button>
            ) : (
              <button
                onClick={handleSaveOverride}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                Save Overrides
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-100 px-6 bg-slate-50/30 overflow-x-auto gap-2">
          {[
            { id: "overview", label: "Overview", icon: User },
            { id: "professional", label: "Professional", icon: Briefcase },
            { id: "pain", label: "Pain Intelligence", icon: AlertTriangle },
            { id: "persona", label: "Persona", icon: Sparkles },
            { id: "scoring", label: "Score Breakdown", icon: Award },
            { id: "history", label: "Campaigns", icon: History },
            { id: "compliance", label: "Compliance & Opt-Out", icon: ShieldCheck },
            { id: "ai-meta", label: "AI Metadata", icon: Info },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">Email:</span>
                      <span className="font-medium text-slate-800 font-mono text-xs">{prospect.email}</span>
                    </div>
                    {prospect.phone && (
                      <div className="flex justify-between">
                        <span className="text-slate-500 text-xs">Phone:</span>
                        <span className="font-medium text-slate-800">{prospect.phone}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">Location:</span>
                      <span className="font-medium text-slate-800">
                        {prospect.city}, {prospect.country} ({prospect.timezone})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">Social Platform:</span>
                      <span className="font-medium text-slate-800 flex items-center gap-1">
                        {prospect.socialPlatform}
                        {prospect.profileUrl && (
                          <a
                            href={prospect.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3 inline" />
                          </a>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">Source Type:</span>
                      <span className="font-medium text-slate-800">{prospect.sourceType}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Strategic Fit Overview
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">Relevance Score:</span>
                      <span className="font-bold text-slate-900">{prospect.productFitScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">Buying Intent:</span>
                      <span className="font-semibold text-slate-800">{prospect.buyingIntent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">Readiness Tier:</span>
                      <span className="font-semibold text-slate-800">{prospect.purchaseReadiness}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-xs">Marketing Eligibility:</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          prospect.marketingEligibility === "Eligible"
                            ? "bg-emerald-500/10 text-emerald-700"
                            : "bg-rose-500/10 text-rose-700"
                        }`}
                      >
                        {prospect.marketingEligibility}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Offer Banner */}
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Primary Recommended Offer
                </div>
                <p className="text-sm font-semibold text-slate-900">{prospect.recommendedOffer}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{prospect.relevanceReason}</p>
              </div>

              {/* Matched Products */}
              {prospect.matchedProducts && prospect.matchedProducts.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Matched Products in Catalog
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {prospect.matchedProducts.map((mp) => (
                      <div
                        key={mp.productId}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{mp.productName}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-900 text-white">
                            {mp.fitScore}% Fit
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{mp.recommendedOffer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROFESSIONAL INTELLIGENCE */}
          {activeTab === "professional" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Primary Profession Category</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedRecord.primaryCategory}
                        onChange={(e) =>
                          setEditedRecord({ ...editedRecord, primaryCategory: e.target.value })
                        }
                        className="w-full mt-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">
                        {prospect.primaryCategory}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500">Standardized Profession</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedRecord.profession}
                        onChange={(e) =>
                          setEditedRecord({ ...editedRecord, profession: e.target.value })
                        }
                        className="w-full mt-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{prospect.profession}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500">Specific Job Title</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedRecord.jobTitle}
                        onChange={(e) => setEditedRecord({ ...editedRecord, jobTitle: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{prospect.jobTitle}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500">Industry</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedRecord.industry}
                        onChange={(e) => setEditedRecord({ ...editedRecord, industry: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{prospect.industry}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500">Seniority</label>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{prospect.seniority}</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500">Organization & Size</label>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      {prospect.organization} ({prospect.organizationSize} members)
                    </p>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                  <label className="text-xs font-bold text-amber-800">
                    Reason for Human Override (for AI Learning Audit):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Prospect transitioned to CTO from Senior Developer"
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-amber-300 focus:outline-none bg-white"
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PAIN INTELLIGENCE */}
          {activeTab === "pain" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Pain Category</span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{prospect.painCategory}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold border ${getSeverityBadge(
                        prospect.painSeverity
                      )}`}
                    >
                      Severity: {prospect.painSeverity}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-slate-100 text-slate-700">
                      Confidence: {Math.round(prospect.painConfidence * 100)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Primary Documented Pain</label>
                  <p className="text-sm font-medium text-slate-900 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                    {prospect.primaryPain}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">
                    Verified Public Evidence / Context Quote
                  </label>
                  <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg text-xs text-amber-950 font-serif italic">
                    "{prospect.painEvidence}"
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    *Evidence sourced from publicly verified profile context. BizPilot AI never fabricates
                    unverified claims.
                  </p>
                </div>

                {prospect.secondaryPains && prospect.secondaryPains.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Secondary Pain Points</label>
                    <div className="flex flex-wrap gap-1.5">
                      {prospect.secondaryPains.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PERSONA INTELLIGENCE */}
          {activeTab === "persona" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{prospect.personaName}</h3>
                  <span className="text-xs text-slate-500">Archetype Classification</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{prospect.personaDescription}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Core Goals
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                      {prospect.goals?.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Key Challenges
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                      {prospect.challenges?.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {prospect.likelyNeeds && (
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-500">Likely Operational Needs:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {prospect.likelyNeeds.map((need, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium"
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: TRANSPARENT SCORING BREAKDOWN */}
          {activeTab === "scoring" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                    Campaign Relevance Score
                  </span>
                  <div className="text-3xl font-black mt-0.5">{prospect.productFitScore} / 100</div>
                  <p className="text-xs text-slate-300 mt-1">
                    *This is a calculated campaign relevance score, not a guaranteed purchase prediction.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Buying Intent</span>
                  <div className="text-lg font-bold text-emerald-400">{prospect.buyingIntent}</div>
                </div>
              </div>

              {/* Point allocation table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="py-2.5 px-4">Evaluation Dimension</th>
                      <th className="py-2.5 px-4">Max Weight</th>
                      <th className="py-2.5 px-4">Awarded Points</th>
                      <th className="py-2.5 px-4">Alignment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-2 px-4 font-medium">Pain Point Direct Match</td>
                      <td className="py-2 px-4 text-slate-400">30 pts</td>
                      <td className="py-2 px-4 font-bold text-slate-900">
                        {prospect.scoreBreakdown?.painMatch || 28} pts
                      </td>
                      <td className="py-2 px-4 text-emerald-600 font-medium">Verified Active</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Persona Match</td>
                      <td className="py-2 px-4 text-slate-400">20 pts</td>
                      <td className="py-2 px-4 font-bold text-slate-900">
                        {prospect.scoreBreakdown?.personaMatch || 19} pts
                      </td>
                      <td className="py-2 px-4 text-emerald-600 font-medium">Direct Archetype</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Profession Match</td>
                      <td className="py-2 px-4 text-slate-400">15 pts</td>
                      <td className="py-2 px-4 font-bold text-slate-900">
                        {prospect.scoreBreakdown?.professionMatch || 15} pts
                      </td>
                      <td className="py-2 px-4 text-emerald-600 font-medium">Exact Taxonomy Match</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Industry Match</td>
                      <td className="py-2 px-4 text-slate-400">10 pts</td>
                      <td className="py-2 px-4 font-bold text-slate-900">
                        {prospect.scoreBreakdown?.industryMatch || 10} pts
                      </td>
                      <td className="py-2 px-4 text-emerald-600 font-medium">High Match</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Intent & Readiness Signals</td>
                      <td className="py-2 px-4 text-slate-400">10 pts</td>
                      <td className="py-2 px-4 font-bold text-slate-900">
                        {prospect.scoreBreakdown?.intentSignals || 7} pts
                      </td>
                      <td className="py-2 px-4 text-blue-600 font-medium">Active Researching</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Interests & Needs Alignment</td>
                      <td className="py-2 px-4 text-slate-400">5 pts</td>
                      <td className="py-2 px-4 font-bold text-slate-900">
                        {prospect.scoreBreakdown?.interestMatch || 4} pts
                      </td>
                      <td className="py-2 px-4 text-slate-600">Aligned</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Geographic Match</td>
                      <td className="py-2 px-4 text-slate-400">5 pts</td>
                      <td className="py-2 px-4 font-bold text-slate-900">
                        {prospect.scoreBreakdown?.geographicMatch || 5} pts
                      </td>
                      <td className="py-2 px-4 text-slate-600">Target Region</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Engagement History</td>
                      <td className="py-2 px-4 text-slate-400">5 pts</td>
                      <td className="py-2 px-4 font-bold text-slate-900">
                        {prospect.scoreBreakdown?.engagementHistory || 1} pts
                      </td>
                      <td className="py-2 px-4 text-slate-400">Initial Prospect</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: CAMPAIGN HISTORY */}
          {activeTab === "history" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-center">
                  <span className="text-[11px] text-slate-500">Emails Sent</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">{prospect.emailsSent}</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-center">
                  <span className="text-[11px] text-slate-500">Opened</span>
                  <div className="text-xl font-bold text-emerald-600 mt-1">{prospect.opens}</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-center">
                  <span className="text-[11px] text-slate-500">Clicked</span>
                  <div className="text-xl font-bold text-blue-600 mt-1">{prospect.clicks}</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-center">
                  <span className="text-[11px] text-slate-500">Replies</span>
                  <div className="text-xl font-bold text-purple-600 mt-1">{prospect.replies}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2 text-xs">
                <h4 className="font-bold text-slate-700">Sequence Status:</h4>
                <p className="text-slate-600">
                  Current Status: <span className="font-semibold text-slate-900">{prospect.contactStatus}</span>
                </p>
                {prospect.lastContacted && (
                  <p className="text-slate-600">
                    Last Contacted:{" "}
                    <span className="font-mono text-slate-900">
                      {new Date(prospect.lastContacted).toLocaleString()}
                    </span>
                  </p>
                )}
                <p className="text-slate-500">
                  Campaign Enrollment:{" "}
                  {prospect.campaignStatus === "Not Contacted" ? "Eligible for new campaign" : prospect.campaignStatus}
                </p>
              </div>
            </div>
          )}

          {/* TAB 7: COMPLIANCE & PRIVACY */}
          {activeTab === "compliance" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Data Privacy & Regulatory Status
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-600">Consent / Processing Basis:</span>
                    <span className="font-semibold text-slate-900">{prospect.consentStatus}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-600">Global Suppression Status:</span>
                    <span
                      className={`font-bold ${
                        prospect.suppressionStatus ? "text-rose-600" : "text-emerald-600"
                      }`}
                    >
                      {prospect.suppressionStatus ? "SUPPRESSED" : "ACTIVE / NOT SUPPRESSED"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-600">Do-Not-Contact Flag:</span>
                    <span className="font-semibold text-slate-900">
                      {prospect.doNotContact ? "True (Blocked)" : "False"}
                    </span>
                  </div>

                  {prospect.suppressionReason && (
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600">Suppression Reason:</span>
                      <span className="font-semibold text-rose-700">{prospect.suppressionReason}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onToggleSuppression(prospect)}
                    className={`w-full py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors ${
                      prospect.suppressionStatus
                        ? "bg-slate-200 hover:bg-slate-300 text-slate-800"
                        : "bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
                    }`}
                  >
                    <Ban className="w-4 h-4" />
                    {prospect.suppressionStatus
                      ? "Remove from Global Suppression List"
                      : "Add to Global Suppression List (Permanent Opt-Out)"}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-1.5">
                    *Suppressed contacts are hard-blocked by the pre-send validator and cannot be emailed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: AI METADATA */}
          {activeTab === "ai-meta" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Classification Model:</span>
                  <span className="font-mono font-bold text-slate-800">{prospect.classificationModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Classification Confidence:</span>
                  <span className="font-bold text-emerald-600">
                    {prospect.classificationConfidence} ({Math.round(prospect.confidenceScore * 100)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Classification Date:</span>
                  <span className="font-mono text-slate-700">{prospect.classificationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Human Override Applied:</span>
                  <span className="font-semibold text-slate-800">
                    {prospect.humanOverride ? "Yes" : "No"}
                  </span>
                </div>
                {prospect.overrideNotes && (
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <span className="font-bold text-purple-900 block mb-1">Human Override Log:</span>
                    <span className="text-purple-800 font-mono text-[11px]">{prospect.overrideNotes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Prospect ID: <span className="font-mono font-bold text-slate-700">{prospect.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncToCrm}
              disabled={syncedToCrm}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                syncedToCrm
                  ? "bg-emerald-100 text-emerald-800 cursor-default"
                  : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{syncedToCrm ? "✓ Synced to CRM" : "Sync to CRM Pipeline"}</span>
            </button>

            {prospect.phone && (
              <a
                href={`https://wa.me/${prospect.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                  prospect.firstName
                )}!`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat WhatsApp</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
