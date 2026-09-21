import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Globe,
  Palette,
  Search,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { BusinessProfile, WebsiteData, ActiveTab } from "../../types";
import { generateAiContent, checkDomainAvailability, DomainCheckResult } from "../../services/api";
import { MarkdownRenderer } from "../common/MarkdownRenderer";

interface Props {
  profile: BusinessProfile;
  website: WebsiteData;
  onUpdateProfile: (p: BusinessProfile) => void;
  onUpdateWebsite: (w: WebsiteData) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const LaunchWizardView: React.FC<Props> = ({
  profile,
  website,
  onUpdateProfile,
  onUpdateWebsite,
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Idea Analysis State
  const [analysisOutput, setAnalysisOutput] = useState<string>("");

  // Step 2: Brand Creation State
  const [brandNames, setBrandNames] = useState<string[]>([]);
  const [taglineOptions, setTaglineOptions] = useState<string[]>([]);

  // Step 3: Domain Search State
  const [domainSearchInput, setDomainSearchInput] = useState(
    profile.name.toLowerCase().replace(/[^a-z0-9]/g, "") || "mybrand"
  );
  const [domainResults, setDomainResults] = useState<DomainCheckResult[]>([]);

  // Step 5: SEO State
  const [seoOutput, setSeoOutput] = useState<string>("");

  const steps = [
    { num: 1, title: "1. Idea & Market Analysis", desc: "Competitors, positioning & pain points" },
    { num: 2, title: "2. Brand & Identity", desc: "Names, taglines, voice & mission" },
    { num: 3, title: "3. Domain Discovery", desc: "Availability & registrar checkout" },
    { num: 4, title: "4. Website Generation", desc: "Complete responsive layout" },
    { num: 5, title: "5. SEO & Schema", desc: "Meta tags, schema & sitemaps" },
  ];

  // ==========================================
  // Step 1 Generator
  // ==========================================
  const handleRunIdeaAnalysis = async () => {
    setIsLoading(true);
    try {
      const res = await generateAiContent({
        agent: "Strategy Agent",
        task: "Deep Market & Competitor Analysis",
        prompt: `Analyze the business idea for "${profile.name}".
Product/Service: ${profile.offering}
Problem Solved: ${profile.problemSolved}
Target Customer: ${profile.targetCustomer}
Country: ${profile.country} (${profile.city})
Business Model: ${profile.businessModel}

Provide:
1. Target Market Sizing & Local Consumer Psychology in ${profile.country}
2. Top Competitor Archetypes & Where They Fail
3. Customer Pain Points & Buying Friction
4. Recommended Pricing Opportunities (Starter, Core, Premium)
5. Defensible Value Positioning`,
        businessProfile: profile,
      });

      setAnalysisOutput(res.output);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // Step 2 Generator
  // ==========================================
  const handleGenerateBrandNames = async () => {
    setIsLoading(true);
    try {
      const res = await generateAiContent({
        agent: "Branding Agent",
        task: "Generate Brand Names & Taglines",
        prompt: `Suggest 6 catchy, memorable brand names and 4 high-converting taglines for:
Offering: ${profile.offering}
Market: ${profile.country} (${profile.city})
Current name: ${profile.name}`,
        businessProfile: profile,
      });

      setAnalysisOutput(res.output);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // Step 3 Domain Checker
  // ==========================================
  const handleSearchDomains = async () => {
    if (!domainSearchInput.trim()) return;
    setIsLoading(true);
    try {
      const results = await checkDomainAvailability(domainSearchInput);
      setDomainResults(results);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // Step 5 SEO Generator
  // ==========================================
  const handleGenerateSeoPackage = async () => {
    setIsLoading(true);
    try {
      const res = await generateAiContent({
        agent: "SEO Agent",
        task: "Generate Complete Technical SEO Package",
        prompt: `Create the complete technical and on-page SEO package for ${profile.name}:
- Optimized Meta Title (max 60 chars)
- Persuasive Meta Description (max 155 chars)
- 10 High-Intent Keyword Matrix with search volume & difficulty in ${profile.country}
- JSON-LD LocalBusiness Schema Markup
- XML Sitemap snippet
- robots.txt configuration`,
        businessProfile: profile,
      });

      setSeoOutput(res.output);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Wizard Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>5-Stage Autonomous Launch Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Business Launch Wizard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Guide <strong className="text-white">{profile.name}</strong> from conceptual idea to revenue-generating digital business.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 px-3">Progress:</span>
            <span className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs font-mono">
              Step {currentStep} / 5
            </span>
          </div>
        </div>

        {/* Step Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-8 pt-6 border-t border-slate-800">
          {steps.map((st) => {
            const isCurrent = currentStep === st.num;
            const isPassed = currentStep > st.num;
            return (
              <button
                key={st.num}
                onClick={() => setCurrentStep(st.num)}
                className={`p-3 rounded-2xl text-left transition-all ${
                  isCurrent
                    ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
                    : isPassed
                    ? "bg-slate-800/80 text-emerald-400 border border-emerald-500/30 font-medium"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold">0{st.num}</span>
                  {isPassed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="text-xs font-bold mt-1 truncate">{st.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: IDEA ANALYSIS */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 1: Business Idea & Market Analysis</h2>
              <p className="text-xs text-slate-500 mt-1">
                Deep analysis of market viability, competitor gaps, customer psychology, and pricing opportunities.
              </p>
            </div>
            <button
              onClick={handleRunIdeaAnalysis}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{analysisOutput ? "Re-Analyze with AI" : "Run Market Analysis"}</span>
            </button>
          </div>

          {analysisOutput ? (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <MarkdownRenderer content={analysisOutput} />
            </div>
          ) : (
            <div className="p-10 rounded-2xl border-2 border-dashed border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">No analysis run yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Click "Run Market Analysis" to generate market sizing, competitor weaknesses, and pricing strategy for {profile.name}.
              </p>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2"
            >
              <span>Next: Brand Creation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: BRAND CREATION */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 2: Brand Identity & Positioning</h2>
              <p className="text-xs text-slate-500 mt-1">
                Generate taglines, mission statements, brand voice, and visual assets.
              </p>
            </div>
            <button
              onClick={handleGenerateBrandNames}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Generate Brand Suggestions</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Palette className="w-4 h-4 text-emerald-600" />
                <span>Current Brand Attributes</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-600">Brand Tagline</label>
                <input
                  type="text"
                  value={profile.brandKit.tagline}
                  onChange={(e) =>
                    onUpdateProfile({
                      ...profile,
                      brandKit: { ...profile.brandKit, tagline: e.target.value },
                    })
                  }
                  className="w-full mt-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">Brand Voice</label>
                <input
                  type="text"
                  value={profile.brandKit.brandVoice}
                  onChange={(e) =>
                    onUpdateProfile({
                      ...profile,
                      brandKit: { ...profile.brandKit, brandVoice: e.target.value },
                    })
                  }
                  className="w-full mt-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">Mission Statement</label>
                <textarea
                  rows={3}
                  value={profile.brandKit.mission}
                  onChange={(e) =>
                    onUpdateProfile({
                      ...profile,
                      brandKit: { ...profile.brandKit, mission: e.target.value },
                    })
                  }
                  className="w-full mt-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium resize-none"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-3">AI Brand Suggestions</h3>
              {analysisOutput ? (
                <MarkdownRenderer content={analysisOutput} />
              ) : (
                <p className="text-xs text-slate-500 leading-relaxed">
                  Click "Generate Brand Suggestions" to have AI craft catchy names, punchy taglines, and social media hooks tailored to your target audience in {profile.city}.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2"
            >
              <span>Next: Domain Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DOMAIN DISCOVERY */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 3: Domain Discovery & Availability</h2>
              <p className="text-xs text-slate-500 mt-1">
                Check real-world TLD availability (.ng, .com.ng, .africa, .com, .co.za) with supported registrar links.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto flex gap-2">
            <input
              type="text"
              value={domainSearchInput}
              onChange={(e) => setDomainSearchInput(e.target.value)}
              placeholder="e.g. naijaflavors, apexlaunch..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono font-medium focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleSearchDomains}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Check Availability</span>
            </button>
          </div>

          {/* Domain Results Table */}
          {domainResults.length > 0 && (
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="p-3.5">Domain Name</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Pricing</th>
                    <th className="p-3.5 text-right">Register Via</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {domainResults.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold font-mono text-slate-900">{r.domain}</td>
                      <td className="p-3.5">
                        {r.available ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Available
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            Taken
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-700">{r.pricing.price}</td>
                      <td className="p-3.5 text-right space-x-2">
                        {r.available ? (
                          <button
                            onClick={() => onNavigate("domains")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs transition-colors"
                          >
                            <Zap className="w-3 h-3" />
                            <span>1-Click Auto-Launch</span>
                          </button>
                        ) : null}
                        {r.registrars.slice(0, 1).map((reg, idx) => (
                          <a
                            key={idx}
                            href={reg.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors"
                          >
                            <span>{reg.name}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2"
            >
              <span>Next: Website Generation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: WEBSITE GENERATION */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 4: AI Responsive Website Generation</h2>
              <p className="text-xs text-slate-500 mt-1">
                Your full responsive website is ready. Edit sections visually, modify copy, or customize themes.
              </p>
            </div>
            <button
              onClick={() => onNavigate("website-builder")}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Open Visual Website Builder</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-emerald-400">Generated Website Blueprint</span>
              <span className="text-xs text-slate-400">8 Sections Included</span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Hero Section</span>
                <p className="font-semibold text-white mt-1">{website.hero.headline} {website.hero.highlightWord}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Services / Catalog</span>
                <p className="font-semibold text-white mt-1">{website.services.items.length} Packages Configured</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Lead Capture & Contact</span>
                <p className="font-semibold text-white mt-1">WhatsApp & Paystack Ready</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2"
            >
              <span>Next: SEO & Schema</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SEO & SCHEMA */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 5: SEO & Schema Deployment</h2>
              <p className="text-xs text-slate-500 mt-1">
                Meta tags, local search keywords, JSON-LD Schema markup, and sitemaps.
              </p>
            </div>
            <button
              onClick={handleGenerateSeoPackage}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Generate Full SEO Package</span>
            </button>
          </div>

          {seoOutput ? (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <MarkdownRenderer content={seoOutput} />
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Default SEO Configuration</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <p><strong>Meta Title:</strong> {website.seo.metaTitle}</p>
                <p><strong>Meta Description:</strong> {website.seo.metaDescription}</p>
                <p><strong>Focus Keywords:</strong> {website.seo.focusKeywords.join(", ")}</p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Complete Launch & Go to Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
