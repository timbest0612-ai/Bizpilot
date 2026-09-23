import React, { useState } from "react";
import {
  Clock,
  Send,
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  Copy,
  Mail,
  MessageSquare,
  ShieldCheck,
  Zap,
  Target,
  ChevronRight,
  Filter,
  Eye,
  RefreshCw,
  Sliders,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { BusinessProfile, CurrencyCode } from "../../types";
import { ProspectRecord } from "../../types/intelligence";

interface Props {
  profile: BusinessProfile;
  activeCurrency: CurrencyCode;
  scoutedProspects?: ProspectRecord[];
}

interface FollowUpStep {
  day: number;
  hours: number;
  label: string;
  theme: string;
  subjectTemplate: string;
  previewTemplate: string;
  bodyTemplate: string;
  channel: "EMAIL" | "WHATSAPP" | "MULTI_CHANNEL";
  recommendedSendTime: string;
}

export const SevenDayFollowUpSequenceView: React.FC<Props> = ({
  profile,
  activeCurrency,
  scoutedProspects = [],
}) => {
  // Segmentation by Profession
  const [selectedProfession, setSelectedProfession] = useState<string>("ALL");
  // Segmentation by Personality Persona
  const [selectedPersona, setSelectedPersona] = useState<
    "SKEPTICAL_PRAGMATIST" | "URGENT_SOLVER" | "ANALYTICAL_ROI" | "HIGH_ACHIEVER"
  >("SKEPTICAL_PRAGMATIST");

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isActivating, setIsActivating] = useState(false);
  const [testEmail, setTestEmail] = useState(profile.supportEmail || "ayobamitim0612@gmail.com");
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const [isSequenceActive, setIsSequenceActive] = useState(true);

  // Available Professions from Scouted Leads
  const professionsList = React.useMemo(() => {
    const set = new Set<string>();
    scoutedProspects.forEach((p) => {
      if (p.profession) set.add(p.profession);
    });
    return Array.from(set);
  }, [scoutedProspects]);

  // Product Name
  const productName = profile.name ? `${profile.name} Solution` : "The Rest You Deserve Blueprint";

  // Dynamic Follow-Up Sequence adapted to Persona
  const sequenceSteps: FollowUpStep[] = [
    {
      day: 1,
      hours: 24,
      label: "Day 1 (24 Hours)",
      theme: "Empathy, Validation & Deep Pain-Point Hook",
      channel: "EMAIL",
      recommendedSendTime: "09:00 AM (Next Day)",
      subjectTemplate: "Quick question about {{primary_pain}}, {{first_name}}?",
      previewTemplate: "I noticed this keeps coming up among {{profession}}s in Nigeria and Africa.",
      bodyTemplate: `Hi {{first_name}},

Yesterday, when you visited our page for {{product_name}}, I couldn't help but notice that you might be dealing with {{primary_pain}}.

As a {{profession}}, your daily focus is constantly demanded by clients, operations, and team deadlines. When {{primary_pain}} creeps in, it silently drains your energy, momentum, and profit margins.

I wanted to send a quick note because you don't have to keep wrestling with this alone.

We designed {{product_name}} specifically so you can break free from {{primary_pain}} in as little as 3 days without upending your existing schedule.

Here is the direct link to review the details and start today:
{{checkout_link}}

Warmly,
{{sender_name}}
CEO, {{company_name}}`,
    },
    {
      day: 2,
      hours: 48,
      label: "Day 2 (48 Hours)",
      theme: "Proof, Case Study & Peer Transformation",
      channel: "EMAIL",
      recommendedSendTime: "11:30 AM",
      subjectTemplate: "How someone in {{profession}} solved {{primary_pain}} in 72 hours",
      previewTemplate: "Real verified transformation without risking time or endless trial and error.",
      bodyTemplate: `Hello {{first_name}},

When you're dealing with {{primary_pain}}, the biggest question is always: "Has this actually worked for someone in my exact shoes?"

Let me share a quick story:

A fellow {{profession}} based in Lagos was facing the exact same {{primary_pain}}. They had tried several alternatives, but nothing produced sustainable results.

Within just 48 hours of implementing {{product_name}}:
• They eliminated 80% of the friction and stress caused by {{primary_pain}}.
• They reclaimed an estimated 14 hours every single week.
• Their operations became completely streamlined and automated.

${
  selectedPersona === "ANALYTICAL_ROI"
    ? "The data is clear: our clients record an average 340% return on their investment within the first 14 days."
    : selectedPersona === "SKEPTICAL_PRAGMATIST"
    ? "Every single order is backed by our 100% CBN-regulated escrow protection and a 30-day money-back guarantee. You take zero financial risk."
    : "If you are ready for the same rapid transformation, you can secure your access right now."
}

Secure your package here:
{{checkout_link}}

To your accelerated success,
{{sender_name}}`,
    },
    {
      day: 4,
      hours: 96,
      label: "Day 4 (96 Hours)",
      theme: "Skepticism & Objection Crusher (WhatsApp + Email)",
      channel: "MULTI_CHANNEL",
      recommendedSendTime: "02:15 PM",
      subjectTemplate: '"Will this really work for me?" (Answered honestly)',
      previewTemplate: "Answering the top 3 questions we received from {{profession}}s this week.",
      bodyTemplate: `Hi {{first_name}},

It's completely normal to be cautious before investing in a new solution. You've probably seen plenty of flashy promises that failed to deliver.

Here are the 3 blunt questions we get asked most often:

Q1: "How much time does this take to set up?"
Answer: Less than 15 minutes. It is plug-and-play, engineered specifically for busy {{profession}}s.

Q2: "What if it doesn't solve {{primary_pain}} for me?"
Answer: You are protected by our 100% Money-Back Guarantee. If it doesn't deliver the exact results promised, you get an immediate full refund.

Q3: "Can I pay with local Naira debit card or bank transfer?"
Answer: Yes! We accept instant Paystack, bank transfers, and international cards seamlessly.

Don't let {{primary_pain}} cost you another week of frustration:
{{checkout_link}}

Or if you'd prefer to chat 1-on-1 with our team on WhatsApp, tap here:
https://wa.me/2348000000000?text=Hi%20{{sender_name}},%20I%20have%20a%20question%20about%20{{product_name}}

Best regards,
{{sender_name}}`,
    },
    {
      day: 6,
      hours: 144,
      label: "Day 6 (144 Hours)",
      theme: "Urgent Fast-Action Bonus & Scarcity Incentive",
      channel: "EMAIL",
      recommendedSendTime: "08:00 AM",
      subjectTemplate: "{{first_name}}, your exclusive fast-action bonus expires in 24 hours",
      previewTemplate: "We added a VIP implementation kit (value: ₦75,000) that expires tomorrow.",
      bodyTemplate: `Good morning {{first_name}},

Because we know how urgent it is to conquer {{primary_pain}}, we're adding a special Fast-Action Bonus for the next 24 hours only.

When you complete your order today, you'll also receive:
✓ The VIP Fast-Track Implementation Guide (Free, usually ₦35,000)
✓ 1-on-1 Priority WhatsApp Onboarding Support (Free, usually ₦40,000)
✓ Lifetime access to all future updates and templates

This bonus package will be removed from your link tomorrow at midnight:
{{checkout_link}}

Lock in your bonus before it expires:
{{checkout_link}}

Warm regards,
{{sender_name}}`,
    },
    {
      day: 7,
      hours: 168,
      label: "Day 7 (168 Hours)",
      theme: "Final Call & Sequence Completion Notice",
      channel: "EMAIL",
      recommendedSendTime: "07:00 PM (Final Evening)",
      subjectTemplate: "Final notice: closing down your access to {{product_name}} tonight",
      previewTemplate: "This is our last email to you regarding {{primary_pain}}.",
      bodyTemplate: `Hi {{first_name}},

This is our final email to you about {{product_name}}.

We don't believe in endless spam. If the timing isn't right for you, we respect that completely.

However, if you are still waking up tomorrow facing {{primary_pain}}, nothing will change unless you take decisive action.

By this time tomorrow:
• The fast-action bonus will be gone.
• The current introductory pricing will increase.
• You'll still be spending hours dealing with avoidable headaches.

If you are ready to put an end to {{primary_pain}} once and for all, here is your final opportunity:
{{checkout_link}}

Either way, thank you for checking out what we're building. We wish you massive growth in your work as a {{profession}}.

Warmest regards,
{{sender_name}}
CEO, {{company_name}}`,
    },
  ];

  const currentStep = sequenceSteps[activeStepIndex];

  // Substitute variables for preview
  const getRenderedContent = (text: string) => {
    return text
      .replace(/{{first_name}}/g, "Amina")
      .replace(/{{name}}/g, "Amina Bello")
      .replace(/{{profession}}/g, selectedProfession === "ALL" ? "Executive Leader" : selectedProfession)
      .replace(/{{primary_pain}}/g, "burnout & inconsistent client pipeline")
      .replace(/{{product_name}}/g, productName)
      .replace(/{{checkout_link}}/g, `https://${profile.domain || "bizpilot.io"}/checkout?ref=7day_followup`)
      .replace(/{{company_name}}/g, profile.name || "BizPilot OS")
      .replace(/{{sender_name}}/g, profile.name || "Timi Ayobami");
  };

  const handleSendTest = () => {
    setFeedbackToast(`✓ Test email for "${currentStep.label}" sent to ${testEmail}!`);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const handleCopyClipboard = () => {
    const content = `SUBJECT: ${getRenderedContent(currentStep.subjectTemplate)}\n\n${getRenderedContent(
      currentStep.bodyTemplate
    )}`;
    navigator.clipboard.writeText(content);
    setFeedbackToast(`✓ Copied "${currentStep.label}" to clipboard!`);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleToggleSequence = () => {
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      setIsSequenceActive(!isSequenceActive);
      setFeedbackToast(
        !isSequenceActive
          ? "✓ 7-Day Autonomous Follow-Up Engine is now ACTIVE for all non-buyers!"
          : "PAUSED: 7-Day follow-up dispatch has been paused."
      );
      setTimeout(() => setFeedbackToast(null), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 mb-2">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>7-Day Drip & Non-Buyer Conversion Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              7-Day Automated Multi-Touch Follow-Up
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Nurture non-buyers across 7 days with empathy, proof, objection-handling, and scarcity.
              Automatically stops dispatching the moment a customer makes a purchase or pays an invoice.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleSequence}
              disabled={isActivating}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs transition flex items-center gap-2 shadow-lg ${
                isSequenceActive
                  ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              }`}
            >
              <Zap className={`w-4 h-4 ${isSequenceActive ? "fill-current" : ""}`} />
              <span>{isSequenceActive ? "Sequence: RUNNING (Autonomous)" : "Sequence: PAUSED"}</span>
            </button>
          </div>
        </div>

        {/* Smart Stop Guarantee */}
        <div className="p-3 bg-emerald-950/70 border border-emerald-800/80 rounded-2xl flex items-center gap-3 text-xs text-emerald-200">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Smart Reputational Protection:</strong> When a prospect completes a Paystack checkout,
            pays an invoice, or is moved to &apos;Customer&apos; in CRM, all remaining follow-up emails are
            cancelled immediately to prevent awkward redundant emails.
          </span>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackToast && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Segmentation Bar (Profession + Personality) */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Dynamic Lead Segmentation & Adaptation
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-500">
            Adapts copy tone to specific career & buyer psychological profile
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Profession Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              1. Target Profession / Niche Segment:
            </label>
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="ALL">All Professions (General ICP)</option>
              <option value="Tech Founder / CTO">Tech Founders & Software Leaders</option>
              <option value="Corporate Executive / CEO">Corporate Executives & Managing Directors</option>
              <option value="Medical Doctor / Healthcare Specialist">Medical Doctors & Healthcare Directors</option>
              <option value="Real Estate Broker / Developer">Real Estate Brokers & Property Investors</option>
              <option value="E-Commerce Merchant / Importer">E-Commerce Merchants & Importers</option>
              <option value="Legal Practitioner / Partner">Legal Practitioners & Managing Partners</option>
              {professionsList.map((prof) => (
                <option key={prof} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
          </div>

          {/* Personality / Persona Profile */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              2. Buyer Personality & Psychology Angle:
            </label>
            <select
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="SKEPTICAL_PRAGMATIST">Skeptical Pragmatist (Highlights Guarantees, Escrow, Zero Risk)</option>
              <option value="URGENT_SOLVER">Urgent Problem Solver (Direct, Rapid 72-Hour Relief, Action Steps)</option>
              <option value="ANALYTICAL_ROI">Analytical / ROI Driven (Statistics, 340% Returns, Hard Numbers)</option>
              <option value="HIGH_ACHIEVER">High-Achiever / VIP (Status, Delegation, Reclaiming 14 hrs/week)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main 7-Day Timeline & Preview Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Timeline Steps (5 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              5 Drip Milestones (7 Days)
            </span>
          </div>

          {sequenceSteps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <div
                key={step.day}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        isSelected
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-black text-xs text-slate-900 dark:text-white">
                      {step.label}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      step.channel === "MULTI_CHANNEL"
                        ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                        : "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                    }`}
                  >
                    {step.channel}
                  </span>
                </div>

                <div className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300 leading-snug">
                  {step.theme}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Send time: {step.recommendedSendTime}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-indigo-600" : "text-slate-400"}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Step Preview & Controls (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          {/* Header of Active Step */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Step {activeStepIndex + 1} of 5
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {currentStep.theme}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                {currentStep.label} - Personalized Copy
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyClipboard}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Copy</span>
              </button>

              <button
                onClick={handleSendTest}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Test</span>
              </button>
            </div>
          </div>

          {/* Subject Line & Preview */}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Rendered Subject Line:
              </label>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white font-mono">
                {getRenderedContent(currentStep.subjectTemplate)}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Rendered Pre-Header / Preview Text:
              </label>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                {getRenderedContent(currentStep.previewTemplate)}
              </div>
            </div>
          </div>

          {/* Email Body Preview */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Email Body (With Dynamic Personalization):
            </label>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 font-sans text-xs leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
              {getRenderedContent(currentStep.bodyTemplate)}
            </div>
          </div>

          {/* Test Email Input Row */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="font-bold text-slate-500 shrink-0">Send Test To:</span>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white w-full sm:w-64"
              />
            </div>

            <span className="text-[11px] text-slate-400">
              Dispatched via Amazon SES / Resend / Webmail Node
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
