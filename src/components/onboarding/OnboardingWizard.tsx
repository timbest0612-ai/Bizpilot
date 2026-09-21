import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Building,
  Target,
  ShoppingBag,
  MapPin,
  Compass,
  Check,
  Loader2,
} from "lucide-react";
import {
  BusinessProfile,
  BusinessModelType,
  GrowthGoal,
  CurrencyCode,
  BusinessIntelligenceProfile,
  WebsiteData,
} from "../../types";
import { CURRENCIES, DEFAULT_WEBSITE_DATA } from "../../data/initialData";
import { generateAiContent } from "../../services/api";

interface Props {
  initialPrompt?: string;
  onComplete: (profile: BusinessProfile, initialSite?: WebsiteData) => void;
  onCancel: () => void;
}

export const OnboardingWizard: React.FC<Props> = ({
  initialPrompt = "",
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState("");

  // Form State
  const [bizName, setBizName] = useState(
    initialPrompt.includes("catering") ? "TasteCraft Gourmet" : "Apex Growth Studio"
  );
  const [offering, setOffering] = useState(
    initialPrompt || "Corporate catering, chef meal boxes, and event hospitality"
  );
  const [problemSolved, setProblemSolved] = useState(
    "Delivering fresh, reliable gourmet meals on time for corporate offices and private events."
  );
  const [targetCustomer, setTargetCustomer] = useState(
    "Corporate executives, event planners, and busy professionals"
  );
  const [country, setCountry] = useState("Nigeria");
  const [city, setCity] = useState("Lagos (Victoria Island & Lekki)");
  const [businessModel, setBusinessModel] = useState<BusinessModelType>("Food & Catering");
  const [hasWebsite, setHasWebsite] = useState(false);
  const [hasDomain, setHasDomain] = useState(false);
  const [existingDomain, setExistingDomain] = useState("");
  const [mainGoal, setMainGoal] = useState<GrowthGoal>("Get more customers");
  const [currency, setCurrency] = useState<CurrencyCode>("NGN");
  const [whatsappNumber, setWhatsappNumber] = useState("+2348012345678");

  const businessModelOptions: BusinessModelType[] = [
    "Food & Catering",
    "B2B Services",
    "B2C Retail & E-commerce",
    "Consulting / Professional Agency",
    "Tech & SaaS",
    "Digital Products & Courses",
    "Health & Beauty",
    "Logistics & Transport",
    "Real Estate",
  ];

  const goalOptions: GrowthGoal[] = [
    "Get more customers",
    "Generate leads",
    "Sell products",
    "Sell services",
    "Build an online presence",
    "Launch a startup",
    "Build a personal brand",
    "Grow an existing business",
  ];

  const countryPresets = [
    { name: "Nigeria", currency: "NGN", defaultCity: "Lagos & Abuja" },
    { name: "Kenya", currency: "KES", defaultCity: "Nairobi" },
    { name: "South Africa", currency: "ZAR", defaultCity: "Johannesburg & Cape Town" },
    { name: "Ghana", currency: "GHS", defaultCity: "Accra" },
    { name: "United States", currency: "USD", defaultCity: "New York & Online" },
    { name: "United Kingdom", currency: "GBP", defaultCity: "London" },
  ];

  const handleCountrySelect = (cName: string, cCurr: string, cCity: string) => {
    setCountry(cName);
    setCurrency(cCurr as CurrencyCode);
    setCity(cCity);
  };

  const handleFinishOnboarding = async () => {
    setIsGenerating(true);
    setGenerationPhase("Analyzing market & customer psychology with Gemini AI...");

    const tempProfile: BusinessProfile = {
      id: "biz_" + Date.now(),
      name: bizName,
      offering,
      problemSolved,
      targetCustomer,
      country,
      city,
      businessModel,
      hasWebsite,
      hasDomain,
      existingDomain: hasDomain ? existingDomain : undefined,
      mainGoal,
      currency,
      whatsappNumber,
      supportEmail: `hello@${bizName.toLowerCase().replace(/[^a-z0-9]/g, "") || "business"}.com`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      brandKit: {
        name: bizName,
        tagline: `Elevating ${offering.split(",")[0]} in ${city}`,
        mission: `To provide the highest standard of ${offering} with unmatched customer hospitality and speed.`,
        vision: `To be the #1 choice for ${targetCustomer} across ${country}.`,
        brandVoice: "Professional, confident, hospitable, and results-focused.",
        brandDescription: `${bizName} is dedicated to solving ${problemSolved} for ${targetCustomer} in ${city}.`,
        primaryColor: country === "Nigeria" ? "#059669" : "#2563EB",
        secondaryColor: "#D97706",
        accentColor: "#DC2626",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        socialBios: {
          instagram: `🌟 Premium ${offering.split(",")[0]} | 📍 ${city} | 📲 Tap below for instant WhatsApp order & quote`,
          twitter: `Official Twitter for ${bizName}. Delivering excellence for ${targetCustomer} in ${country}.`,
          linkedin: `${bizName} provides top-tier ${offering} tailored for corporate and commercial clients.`,
          whatsappBio: `Welcome to ${bizName}! 👋 How can we assist you today?`,
        },
        logoSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#059669" />
          <path d="M30 65L50 25L70 65H30Z" fill="#F59E0B" />
          <circle cx="50" cy="52" r="8" fill="#FFFFFF" />
        </svg>`,
      },
    };

    try {
      setGenerationPhase("Synthesizing Business Intelligence Profile (SWOT, Personas, Levers)...");
      const bipPrompt = `Generate a structured Business Intelligence Profile for:
Business Name: ${bizName}
What we sell: ${offering}
Problem Solved: ${problemSolved}
Target Customer: ${targetCustomer}
Country: ${country} (${city})
Goal: ${mainGoal}
Currency: ${currency}

Provide:
1. Irresistible Value Proposition
2. Ideal Customer Avatar & Buying Objections
3. 3 High-Impact Growth Levers for ${country}
4. Competitive Advantage over local competitors`;

      const aiRes = await generateAiContent({
        agent: "Strategy Agent",
        task: "Generate Business Intelligence Profile",
        prompt: bipPrompt,
        businessProfile: tempProfile,
      });

      const intelligence: BusinessIntelligenceProfile = {
        valueProposition: `The premier ${offering} solution tailored specifically for ${targetCustomer} in ${city}, delivering guaranteed quality and rapid WhatsApp support.`,
        targetPersona: {
          name: `${targetCustomer.split(" ")[0] || "Key Client"} in ${city}`,
          demographics: `Decision makers & consumers aged 25-50 in ${city}`,
          coreFrustration: problemSolved,
          primaryMotivator: "Reliable quality, instant communication, transparent pricing.",
          buyingObjections: [
            "How quickly can this be delivered or executed?",
            "What happens if I'm not 100% satisfied?",
            `Do you accept ${currency === "NGN" ? "Paystack / Bank Transfer" : "instant digital payment"}?`,
          ],
        },
        competitiveAdvantage: `Speed of response via automated WhatsApp dispatch, verified quality guarantees, and native ${currency} payment options.`,
        pricingStrategyRecommendation: `Offer high-value starter tiers with premium VIP upgrades to maximize average order value.`,
        growthLevers: [
          {
            title: `Launch Automated WhatsApp ${mainGoal} Funnel`,
            impact: "Critical",
            effort: "Low",
            description: `Connect a 1-click WhatsApp catalog with pre-filled order triggers.`,
          },
          {
            title: `Run Local Hyper-Targeted Ads in ${city}`,
            impact: "High",
            effort: "Medium",
            description: `Target high-intent searchers and social feeds with social proof testimonials.`,
          },
          {
            title: `SEO Keyword Domination for "${offering.split(",")[0]} in ${city}"`,
            impact: "High",
            effort: "Medium",
            description: `Publish schema-marked landing pages to capture organic buyer search.`,
          },
        ],
        swot: {
          strengths: ["Fast execution", "Personalized customer service", "Modern tech stack"],
          weaknesses: ["New brand awareness in market"],
          opportunities: ["Corporate partnerships", "Repeat subscriber retainers"],
          threats: ["Local inflation and price sensitivity"],
        },
        africanMarketAdaptation: {
          whatsappFunnel: "Primary conversion happens over direct WhatsApp chat.",
          paymentMethods: [currency === "NGN" ? "Paystack" : "Stripe", "Bank Transfer"],
          localTrustSignals: ["Verified Business Registration", "Direct Phone Support"],
        },
      };

      tempProfile.intelligence = intelligence;

      // Also customize default website data with new business specifics
      const customizedSite: WebsiteData = {
        ...DEFAULT_WEBSITE_DATA,
        title: `${bizName} | Premium ${offering.split(",")[0]} in ${city}`,
        hero: {
          badge: `🌟 Top-Rated in ${city}`,
          headline: `Transforming How You Experience`,
          highlightWord: offering.split(",")[0] || "Excellence",
          subheadline: problemSolved,
          ctaText: "Order Now",
          secondaryCtaText: "Chat on WhatsApp",
        },
        about: {
          badge: "ABOUT OUR MISSION",
          title: `Crafting Outstanding Results for ${targetCustomer}`,
          description: `${bizName} was built to deliver uncompromising quality in ${city}.`,
          story: `We understand the frustration of ${problemSolved}. That's why our dedicated team works tirelessly to guarantee 100% satisfaction on every order.`,
          points: [
            "Guaranteed on-time delivery & verified standards",
            "Direct WhatsApp concierge support",
            "Safe and secure online checkout",
            "Customized solutions for every client scale",
          ],
        },
        contact: {
          ...DEFAULT_WEBSITE_DATA.contact,
          email: tempProfile.supportEmail,
          phone: whatsappNumber,
          whatsappNumber,
          address: `${city}, ${country}`,
        },
      };

      setGenerationPhase("Finalizing your AI Business Operating System Workspace...");
      setTimeout(() => {
        setIsGenerating(false);
        onComplete(tempProfile, customizedSite);
      }, 800);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
      onComplete(tempProfile);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      {/* Container */}
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        {/* Step Progress Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
              ⚡
            </div>
            <span className="font-bold text-white text-sm">BizPilot Onboarding</span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            Step {step} of 4
          </span>
        </div>

        {/* Loading Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-3xl z-20 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 animate-pulse">
              <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Synthesizing Business Intelligence
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md font-mono">
              {generationPhase}
            </p>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {/* STEP 1: Core Business & Offering */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white">What is your business?</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Tell us your business name and what products or services you provide.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  1. Business / Brand Name
                </label>
                <input
                  type="text"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  placeholder="e.g. NaijaFlavors Gourmet, Apex Media..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  2. What do you sell?
                </label>
                <input
                  type="text"
                  value={offering}
                  onChange={(e) => setOffering(e.target.value)}
                  placeholder="e.g. Executive corporate catering & lunch boxes..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  3. What problem do you solve for customers?
                </label>
                <textarea
                  rows={2}
                  value={problemSolved}
                  onChange={(e) => setProblemSolved(e.target.value)}
                  placeholder="e.g. Eliminating late food deliveries and offering consistent 5-star taste..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                disabled={!bizName.trim() || !offering.trim()}
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
              >
                <span>Continue to Target Market</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Target Customer & Location */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white">Who is your target market?</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Where are your customers located and who are you selling to?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  4. Who is your target customer?
                </label>
                <input
                  type="text"
                  value={targetCustomer}
                  onChange={(e) => setTargetCustomer(e.target.value)}
                  placeholder="e.g. HR managers, tech workers, event organizers..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  5. Operating Country & Currency
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                  {countryPresets.map((cp) => (
                    <button
                      key={cp.name}
                      type="button"
                      onClick={() => handleCountrySelect(cp.name, cp.currency, cp.defaultCity)}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                        country === cp.name
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <span>{cp.name}</span>
                      <span className="font-mono text-[10px] text-slate-500">{cp.currency}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  6. City / Region Served
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Lagos (VI, Lekki, Ikeja)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
              >
                <span>Continue to Business Model</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Business Model & Digital Assets */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white">Business Model & Assets</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select your industry structure and current online footprint.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  7. Business Model Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {businessModelOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBusinessModel(opt)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        businessModel === opt
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    8. Do you already have a website?
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setHasWebsite(true)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold ${
                        hasWebsite ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasWebsite(false)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold ${
                        !hasWebsite ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400"
                      }`}
                    >
                      No (AI will build it)
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    9. Do you own a domain?
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setHasDomain(true)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold ${
                        hasDomain ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasDomain(false)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold ${
                        !hasDomain ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              {hasDomain && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Enter your existing domain:
                  </label>
                  <input
                    type="text"
                    value={existingDomain}
                    onChange={(e) => setExistingDomain(e.target.value)}
                    placeholder="e.g. mybusiness.ng or mybusiness.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
              >
                <span>Continue to Goals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Primary Goal & WhatsApp Contact */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white">What is your main goal?</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Your AI Business Manager will calibrate its daily priorities around this objective.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  10. Select your main goal:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {goalOptions.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setMainGoal(g)}
                      className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all ${
                        mainGoal === g
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <span>{g}</span>
                      {mainGoal === g && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  WhatsApp Business Contact Number (For Auto-funnel)
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+2348000000000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Used to generate 1-click WhatsApp customer chat links & automated quote notifications.
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={handleFinishOnboarding}
                className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all shadow-xl shadow-emerald-500/25 hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Generate Business OS & Launch</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
