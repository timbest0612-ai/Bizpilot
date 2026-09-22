import React, { useState } from "react";
import {
  Send,
  Sparkles,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  ChevronRight,
  Info,
  Calendar,
  Sliders,
  Play,
  Pause,
  ArrowRight,
  Users,
  Package,
  Mail,
  Loader2,
  Ban,
  Check,
} from "lucide-react";
import {
  IntelligenceCampaign,
  DynamicSegment,
  ProductRecord,
  ProspectRecord,
  SequenceStep,
} from "../../types/intelligence";
import { personalizeOutreachEmail } from "../../services/api";

interface Props {
  campaigns: IntelligenceCampaign[];
  segments: DynamicSegment[];
  products: ProductRecord[];
  prospects: ProspectRecord[];
  onCreateCampaign: (newCampaign: IntelligenceCampaign) => void;
  onUpdateCampaign: (campaign: IntelligenceCampaign) => void;
}

export const CampaignBuilderView: React.FC<Props> = ({
  campaigns,
  segments,
  products,
  prospects,
  onCreateCampaign,
  onUpdateCampaign,
}) => {
  const [viewMode, setViewMode] = useState<"list" | "create">("list");

  // Campaign creation wizard state
  const [campaignName, setCampaignName] = useState("");
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>(segments[0]?.id || "");
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || "");
  const [senderName, setSenderName] = useState("Tim Best");
  const [senderEmail, setSenderEmail] = useState("tim@bizpilotos.com");
  const [dailyLimit, setDailyLimit] = useState(250);
  const [hourlyLimit, setHourlyLimit] = useState(40);
  const [warmupEnabled, setWarmupEnabled] = useState(true);

  // Sequences
  const [sequenceSteps, setSequenceSteps] = useState<SequenceStep[]>([
    {
      id: "step_1",
      stepNumber: 1,
      title: "Contextual Observation & Value Framing",
      delayDays: 0,
      subjectLine: "Quick reflection on {{organization}} & sustainable leadership bandwidth",
      bodyTemplate: `Hi {{firstName}},

I came across your profile and work with {{organization}}. Leading teams in {{industry}} usually brings immense demand with little room to catch your breath.

{{ai_personalized_opening}}

I recently released a short framework on recovering mental clarity and deep rest for leaders navigating heavy operational loads. 

Would you be open to me sending over the executive summary?

Best regards,
{{senderName}}`,
      aiPromptContext: "Reference industry leadership pressures respectfully without assuming medical diagnosis.",
    },
    {
      id: "step_2",
      stepNumber: 2,
      title: "Actionable Perspective & Framework Insight",
      delayDays: 3,
      subjectLine: "Re: Sustainable pacing in {{industry}}",
      bodyTemplate: `Hi {{firstName}},

Following up briefly on my earlier note. One of the common patterns we notice among {{profession}}s is that endurance often disguises creeping fatigue until focus begins to slip.

The core principle behind '{{productName}}' is that rest isn't the reward for finishing all tasks—it's the fuel that protects your strategic judgment.

If this aligns with what you're navigating right now, here is a direct link to explore the protocol:
{{productUrl}}

Warmly,
{{senderName}}`,
    },
    {
      id: "step_3",
      stepNumber: 3,
      title: "Final Non-Intrusive Follow-Up",
      delayDays: 5,
      subjectLine: "Final thought on {{organization}}",
      bodyTemplate: `Hi {{firstName}},

I won't clutter your inbox further. If the timing isn't right, please feel free to ignore this note.

Wishing you and the team at {{organization}} continued success and clarity this quarter.

Best regards,
{{senderName}}`,
    },
  ]);

  // AI Personalization Test state
  const [testProspectId, setTestProspectId] = useState<string>(prospects[0]?.id || "");
  const [isGeneratingAiSample, setIsGeneratingAiSample] = useState(false);
  const [generatedAiOpening, setGeneratedAiOpening] = useState<string | null>(null);

  // Pre-Send Delivery Safeguards Modal
  const [showSafeguardsModal, setShowSafeguardsModal] = useState(false);

  const selectedSegment = segments.find((s) => s.id === selectedSegmentId) || segments[0];
  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const testProspect = prospects.find((p) => p.id === testProspectId) || prospects[0];

  // Safeguards math calculation
  const totalAudience = selectedSegment?.prospectCount || 1000;
  const suppressedCount = Math.round(totalAudience * 0.04);
  const invalidFormatCount = Math.round(totalAudience * 0.015);
  const cleanSendable = totalAudience - suppressedCount - invalidFormatCount;

  const handleTestPersonalization = async () => {
    if (!testProspect || !selectedProduct) return;
    setIsGeneratingAiSample(true);
    try {
      const res = await personalizeOutreachEmail({
        prospect: testProspect,
        product: selectedProduct,
        stepNumber: 1,
        senderName,
      });

      if (res.success && res.result) {
        setGeneratedAiOpening(res.result.personalizedOpening);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAiSample(false);
    }
  };

  const handleSaveCampaign = () => {
    if (!campaignName.trim()) {
      alert("Please provide a campaign name.");
      return;
    }

    const newCamp: IntelligenceCampaign = {
      id: `camp_${Date.now()}`,
      name: campaignName,
      targetSegmentId: selectedSegmentId,
      targetSegmentName: selectedSegment?.name || "Target Segment",
      productId: selectedProductId,
      productName: selectedProduct?.name || "Target Product",
      status: "QUEUED",
      senderProfile: {
        fromName: senderName,
        fromEmail: senderEmail,
        replyToEmail: senderEmail,
        dailySendLimit: dailyLimit,
        hourlySendLimit: hourlyLimit,
        warmupEnabled,
      },
      sequence: sequenceSteps,
      stopConditions: [
        "Recipient Replies",
        "Recipient Converts",
        "Unsubscribe Clicked",
        "Hard Bounce Detected",
        "Manual Block Triggered",
      ],
      deliverabilityShield: {
        preSendVerificationEnabled: true,
        suppressionListActive: true,
        mxRecordChecked: true,
        spamTriggerWordFilter: true,
        physicalAddressIncluded: true,
      },
      stats: {
        recipients: cleanSendable,
        eligible: cleanSendable,
        suppressed: suppressedCount,
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        replied: 0,
        positiveReplies: 0,
        bounced: 0,
        unsubscribed: 0,
        complaints: 0,
        conversions: 0,
        revenue: 0,
      },
      createdAt: new Date().toISOString(),
    };

    onCreateCampaign(newCamp);
    setShowSafeguardsModal(false);
    setViewMode("list");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-slate-800" />
            Campaign Sequences & Deliverability Safeguards
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Deliver multi-step outreach sequences with automatic reply stop conditions and verified recipient safeguards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === "list" ? (
            <button
              onClick={() => {
                setCampaignName(`${selectedSegment?.name || "Dynamic Segment"} — Outreach`);
                setViewMode("create");
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Campaign</span>
            </button>
          ) : (
            <button
              onClick={() => setViewMode("list")}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
            >
              Back to Campaigns
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: CAMPAIGNS LIST */}
      {viewMode === "list" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
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
                    <span className="text-xs font-semibold text-slate-400">
                      {camp.sequence.length} Steps
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900">{camp.name}</h3>
                  <p className="text-xs text-slate-500">
                    Product: <strong className="text-slate-700">{camp.productName}</strong>
                  </p>
                  <p className="text-xs text-slate-500">
                    Target Segment: <strong className="text-slate-700">{camp.targetSegmentName}</strong>
                  </p>
                </div>

                {/* Campaign Stats Matrix */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Sent</span>
                    <span className="font-bold text-slate-900">{camp.stats.sent}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Delivered</span>
                    <span className="font-bold text-slate-900">{camp.stats.delivered}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Positive Replies</span>
                    <span className="font-bold text-purple-700">{camp.stats.positiveReplies}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Revenue: <strong className="text-emerald-700">${camp.stats.revenue}</strong></span>
                  <span className="font-semibold text-slate-700">
                    {camp.senderProfile.dailySendLimit} / day
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: CAMPAIGN CREATION WIZARD */}
      {viewMode === "create" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Setup Steps & Sequences */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Core Configuration */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Campaign Core Target & Parameters
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700 block mb-1">Campaign Title</label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Target Dynamic Segment</label>
                    <select
                      value={selectedSegmentId}
                      onChange={(e) => setSelectedSegmentId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                    >
                      {segments.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.prospectCount.toLocaleString()} leads)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Target Product</label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.currency} {p.price})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Sender Details & Rate Limits */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Sender Profile & Throttling Limits
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Sender Name</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">From / Reply-To Email</label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Daily Send Limit</label>
                    <input
                      type="number"
                      value={dailyLimit}
                      onChange={(e) => setDailyLimit(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Recommended: 150 - 300 / day to maintain domain reputation
                    </span>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Hourly Burst Cap</label>
                    <input
                      type="number"
                      value={hourlyLimit}
                      onChange={(e) => setHourlyLimit(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Randomized dispatch intervals (30-90s between sends)
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 3: Multi-Step Sequence Flow */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    Multi-Step Outreach Sequence ({sequenceSteps.length} Steps)
                  </h3>

                  <button
                    onClick={() => {
                      const nextNum = sequenceSteps.length + 1;
                      setSequenceSteps([
                        ...sequenceSteps,
                        {
                          id: `step_${Date.now()}`,
                          stepNumber: nextNum,
                          title: `Follow-up Step ${nextNum}`,
                          delayDays: 4,
                          subjectLine: `Following up on {{organization}}`,
                          bodyTemplate: `Hi {{firstName}},\n\nWanted to check if you had a chance to look at my previous note.\n\nBest,\n{{senderName}}`,
                        },
                      ]);
                    }}
                    className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Step
                  </button>
                </div>

                <div className="space-y-4">
                  {sequenceSteps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                            {step.stepNumber}
                          </span>
                          <span className="font-bold text-xs text-slate-900">{step.title}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            Delay:
                          </span>
                          <input
                            type="number"
                            value={step.delayDays}
                            onChange={(e) => {
                              const updated = [...sequenceSteps];
                              updated[idx].delayDays = Number(e.target.value);
                              setSequenceSteps(updated);
                            }}
                            className="w-14 px-2 py-0.5 text-xs rounded border border-slate-200 bg-white"
                          />
                          <span className="text-xs text-slate-500">days</span>

                          {sequenceSteps.length > 1 && (
                            <button
                              onClick={() => {
                                setSequenceSteps(sequenceSteps.filter((s) => s.id !== step.id));
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 ml-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="text-slate-500 block mb-0.5">Subject Line</label>
                          <input
                            type="text"
                            value={step.subjectLine}
                            onChange={(e) => {
                              const updated = [...sequenceSteps];
                              updated[idx].subjectLine = e.target.value;
                              setSequenceSteps(updated);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium"
                          />
                        </div>

                        <div>
                          <label className="text-slate-500 block mb-0.5">
                            Email Body Template (Variables:{" "}
                            <code>{"{{firstName}}, {{organization}}, {{ai_personalized_opening}}"}</code>)
                          </label>
                          <textarea
                            rows={5}
                            value={step.bodyTemplate}
                            onChange={(e) => {
                              const updated = [...sequenceSteps];
                              updated[idx].bodyTemplate = e.target.value;
                              setSequenceSteps(updated);
                            }}
                            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: AI Personalization Simulator & Launch Safeguard Review */}
            <div className="lg:col-span-1 space-y-6">
              {/* AI Personalization Preview Simulator */}
              <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/40 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    AI Personalization Tester
                  </h3>
                  <span className="text-[10px] text-blue-600 font-semibold">Live Preview</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Verify how the AI personalizes outreach openings based on exact public context quotes.
                </p>

                <div className="space-y-2 text-xs">
                  <label className="font-semibold text-slate-700 block">Select Sample Prospect:</label>
                  <select
                    value={testProspectId}
                    onChange={(e) => {
                      setTestProspectId(e.target.value);
                      setGeneratedAiOpening(null);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-blue-200 bg-white focus:outline-none"
                  >
                    {prospects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.fullName} ({p.profession} • {p.painCategory})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleTestPersonalization}
                  disabled={isGeneratingAiSample}
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  {isGeneratingAiSample ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>Generate Test Opening</span>
                </button>

                {generatedAiOpening && (
                  <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1.5 animate-in fade-in">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                      Generated Sample Opening:
                    </span>
                    <p className="text-xs text-slate-800 italic leading-relaxed">
                      "{generatedAiOpening}"
                    </p>
                  </div>
                )}
              </div>

              {/* Launch Campaign Summary Card */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Pre-Flight Review</h3>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Target Segment:</span>
                    <strong className="text-slate-900">{selectedSegment?.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Audience Reach:</span>
                    <strong className="text-slate-900">{totalAudience.toLocaleString()} leads</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Safe Delivery Shield:</span>
                    <strong className="text-emerald-600">Enforced</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Unsubscribe Footer:</span>
                    <strong className="text-emerald-600">Compliant (1-Click)</strong>
                  </div>
                </div>

                <button
                  onClick={() => setShowSafeguardsModal(true)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Review Safeguards & Launch</span>
                </button>
              </div>
            </div>
          </div>

          {/* PRE-SEND DELIVERY SAFEGUARDS MODAL */}
          {showSafeguardsModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Pre-Send Deliverability Safeguards Check
                    </h3>
                    <p className="text-xs text-slate-500">
                      Automated audit running before sequence activation.
                    </p>
                  </div>
                </div>

                {/* Audit breakdown numbers */}
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between font-bold text-slate-700">
                    <span>Audience Pipeline Status</span>
                    <span>Count</span>
                  </div>
                  <div className="p-3 flex justify-between text-slate-600 border-b border-slate-100">
                    <span>Total Segment Leads</span>
                    <span className="font-bold text-slate-900">{totalAudience}</span>
                  </div>
                  <div className="p-3 flex justify-between text-rose-700 bg-rose-50/30 border-b border-slate-100">
                    <span>Global Suppression List (Hard Block)</span>
                    <span className="font-bold">-{suppressedCount}</span>
                  </div>
                  <div className="p-3 flex justify-between text-amber-700 bg-amber-50/30 border-b border-slate-100">
                    <span>Syntax / MX Invalidation</span>
                    <span className="font-bold">-{invalidFormatCount}</span>
                  </div>
                  <div className="p-3 flex justify-between bg-emerald-50/50 font-bold text-emerald-800">
                    <span>Clean Verified Sendable</span>
                    <span>{cleanSendable} Contacts</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Rate throttled at {hourlyLimit} emails/hr with randomized human jitter.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Automatic stop conditions on Reply, Conversion, or Unsubscribe.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Clear opt-out link & sender physical address included.</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowSafeguardsModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCampaign}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    Confirm & Activate Sequence
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
