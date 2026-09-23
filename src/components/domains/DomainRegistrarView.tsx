import React, { useState, useEffect } from "react";
import {
  Globe,
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  CreditCard,
  Layers,
  Settings,
  Mail,
  Server,
  AlertCircle,
  HelpCircle,
  Copy,
  Check,
  Cpu,
  ChevronDown,
  ArrowDownUp,
  FileText,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  Sliders,
  Plus,
  Trash2,
  Radio,
  Tag,
  Download,
} from "lucide-react";
import {
  BusinessProfile,
  DomainRegistrationRecord,
  DnsRecord,
  CurrencyCode,
  TldPricingInfo,
  DomainTransferRequest,
  DomainValuation,
  UserSubscription,
} from "../../types";
import { INITIAL_DOMAINS, CURRENCIES, TLD_CATALOG } from "../../data/initialData";
import {
  searchDomains,
  registerDomain,
  lookupWhois,
  bulkCheckDomains,
  appraiseDomain,
  initiateDomainTransfer,
  DomainSearchResultItem,
} from "../../services/api";
import { LeadSyncService } from "../../services/leadSync";

interface Props {
  profile: BusinessProfile;
  currency: CurrencyCode;
  subscription?: UserSubscription;
  onNavigateToHosting?: () => void;
  onNavigateToWebsite?: () => void;
  onUpdateProfile?: (p: BusinessProfile) => void;
}

export const DomainRegistrarView: React.FC<Props> = ({
  profile,
  currency,
  subscription,
  onNavigateToHosting,
  onNavigateToWebsite,
  onUpdateProfile,
}) => {
  const isOwner = subscription?.tier === "OWNER_MASTER" || subscription?.isOwner || true;
  const [activeDomainTab, setActiveDomainTab] = useState<
    "search" | "bulk" | "transfers" | "appraisal" | "portfolio" | "tld-catalog" | "whois"
  >("search");

  // Single Search State
  const [searchQuery, setSearchQuery] = useState(
    profile.name ? profile.name.toLowerCase().replace(/[^a-z0-9]/g, "") : "naijaflavors"
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<DomainSearchResultItem[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<Array<{ domain: string; priceNgn: number; priceUsd: number; reason: string }>>([]);
  const [selectedFilter, setSelectedFilter] = useState<"All" | "African Local" | "Popular" | "Tech & AI" | "Commerce">("All");

  // Bulk Search State
  const [bulkInput, setBulkInput] = useState("mycompany\nsmartstore\nafricangrowth\nlagosbites\ntechtalent");
  const [bulkTlds, setBulkTlds] = useState<string[]>([".com.ng", ".ng", ".com", ".africa"]);
  const [isBulkChecking, setIsBulkChecking] = useState(false);
  const [bulkResults, setBulkResults] = useState<any[]>([]);
  const [bulkBundleTotal, setBulkBundleTotal] = useState<any | null>(null);

  // Transfer State
  const [transferDomain, setTransferDomain] = useState("");
  const [transferAuthCode, setTransferAuthCode] = useState("");
  const [transferRegistrar, setTransferRegistrar] = useState("GoDaddy / Namecheap");
  const [isTransferring, setIsTransferring] = useState(false);
  const [activeTransfers, setActiveTransfers] = useState<DomainTransferRequest[]>([
    {
      id: "trf_sample",
      domain: "naijagourmet.com",
      authCode: "EPP-****-9102",
      currentRegistrar: "GoDaddy LLC",
      status: "TRANSFER_IN_PROGRESS",
      stepNumber: 3,
      isUnlocked: true,
      whoisEmail: "admin@naijagourmet.com",
      priceNgn: 17500,
      priceUsd: 11.29,
      initiatedAt: "2026-08-18",
      estimatedCompletion: "24-48 Hours (Free 1-Year Added)",
    },
  ]);

  // Appraisal State
  const [appraisalQuery, setAppraisalQuery] = useState("paynaija.ng");
  const [isAppraising, setIsAppraising] = useState(false);
  const [valuationData, setValuationData] = useState<DomainValuation | null>({
    domain: "paynaija.ng",
    brandabilityScore: 94,
    estimatedValueNgn: 2850000,
    estimatedValueUsd: 1840,
    marketDemand: "EXTREMELY HIGH",
    factors: [
      "High-intent fintech & payments keyword prefix in Africa's largest digital economy",
      "Short 8-character length (Superior mobile recall & word-of-mouth)",
      ".ng official country code extension trust with local banking partners",
      "Exact-match commercial search volume across Lagos, Abuja & Port Harcourt",
    ],
    comparableSales: [
      { domain: "payafrica.com", soldPrice: "$14,500", year: "2024" },
      { domain: "naijapay.ng", soldPrice: "₦4,200,000", year: "2025" },
      { domain: "payfast.co.za", soldPrice: "$22,000", year: "2023" },
    ],
  });

  // Portfolio State
  const [myDomains, setMyDomains] = useState<DomainRegistrationRecord[]>(INITIAL_DOMAINS);
  const [selectedDomainForDns, setSelectedDomainForDns] = useState<DomainRegistrationRecord | null>(INITIAL_DOMAINS[0]);
  const [portfolioSubTab, setPortfolioSubTab] = useState<"dns" | "dnssec" | "subdomains" | "forwarding" | "security">("dns");

  // New DNS Record Form State
  const [newDnsType, setNewDnsType] = useState<"A" | "CNAME" | "MX" | "TXT" | "AAAA">("A");
  const [newDnsName, setNewDnsName] = useState("");
  const [newDnsValue, setNewDnsValue] = useState("");
  const [newDnsTtl, setNewDnsTtl] = useState(3600);
  const [newDnsPriority, setNewDnsPriority] = useState(10);

  // New Subdomain Form State
  const [newSubPrefix, setNewSubPrefix] = useState("");
  const [newSubTargetType, setNewSubTargetType] = useState<"HOSTING_DIRECTORY" | "URL_REDIRECT" | "EXTERNAL_IP" | "STORE_APP">("HOSTING_DIRECTORY");
  const [newSubTargetValue, setNewSubTargetValue] = useState("/public_html/");

  // Checkout Modal State
  const [checkoutDomain, setCheckoutDomain] = useState<DomainSearchResultItem | null>(null);
  const [registrationYears, setRegistrationYears] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<"Paystack" | "Flutterwave" | "Naira Card" | "USSD / Bank Transfer" | "Apple Pay / Stripe">("Paystack");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<any | null>(null);

  // WHOIS Query State
  const [whoisQuery, setWhoisQuery] = useState("naijaflavors.ng");
  const [whoisLoading, setWhoisLoading] = useState(false);
  const [whoisResult, setWhoisResult] = useState<any | null>(null);

  // Copy helper
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Run initial search
  useEffect(() => {
    handleSearch(searchQuery);
  }, []);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;
    setIsSearching(true);
    try {
      const res = await searchDomains(term);
      if (res.results && res.results.length > 0) {
        setSearchResults(res.results);
      }
      if (res.aiSuggestions) {
        setAiSuggestions(res.aiSuggestions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBulkCheck = async () => {
    const rawLines = bulkInput
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    if (rawLines.length === 0) return;

    setIsBulkChecking(true);
    const domainListToCheck: string[] = [];
    rawLines.forEach((name) => {
      bulkTlds.forEach((tld) => {
        const cleanName = name.replace(/[^a-z0-9-]/gi, "").toLowerCase();
        domainListToCheck.push(`${cleanName}${tld}`);
      });
    });

    try {
      const res = await bulkCheckDomains(domainListToCheck);
      if (res.results) {
        setBulkResults(res.results);
        setBulkBundleTotal(res.bundleTotal);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsBulkChecking(false);
    }
  };

  const handleAppraise = async () => {
    if (!appraisalQuery.trim()) return;
    setIsAppraising(true);
    try {
      const res = await appraiseDomain(appraisalQuery.trim());
      if (res.valuation) {
        setValuationData(res.valuation);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAppraising(false);
    }
  };

  const handleInitiateTransfer = async () => {
    if (!transferDomain.trim() || !transferAuthCode.trim()) return;
    setIsTransferring(true);
    try {
      const res = await initiateDomainTransfer({
        domain: transferDomain.trim(),
        authCode: transferAuthCode.trim(),
        currentRegistrar: transferRegistrar,
      });
      if (res.transfer) {
        setActiveTransfers([res.transfer, ...activeTransfers]);
        setTransferDomain("");
        setTransferAuthCode("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTransferring(false);
    }
  };

  const handleRegisterExecution = async () => {
    if (!checkoutDomain) return;
    setIsRegistering(true);
    try {
      const res = await registerDomain({
        domain: checkoutDomain.domain,
        periodYears: registrationYears,
        paymentMethod,
        businessName: profile.name,
        enableAutoRenew: true,
        enablePrivacy: true,
      });

      if (res.success && res.domainRecord) {
        setRegistrationSuccess(res);
        setMyDomains([res.domainRecord, ...myDomains]);
        setSelectedDomainForDns(res.domainRecord);
        const updatedProf = { ...profile, domain: res.domainRecord.domain };
        onUpdateProfile?.(updatedProf);
        LeadSyncService.syncDomainToEcosystem(res.domainRecord.domain, updatedProf);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleWhoisLookup = async (dom: string) => {
    if (!dom.trim()) return;
    setWhoisLoading(true);
    try {
      const res = await lookupWhois(dom.trim());
      setWhoisResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setWhoisLoading(false);
    }
  };

  // Add DNS Record handler
  const handleAddDnsRecord = () => {
    if (!selectedDomainForDns || !newDnsName || !newDnsValue) return;
    const newRecord: DnsRecord = {
      id: "dns_" + Date.now(),
      type: newDnsType,
      name: newDnsName,
      value: newDnsValue,
      ttl: newDnsTtl,
      priority: newDnsType === "MX" ? newDnsPriority : undefined,
    };

    const updatedDomains = myDomains.map((d) => {
      if (d.id === selectedDomainForDns.id) {
        const updated = { ...d, dnsRecords: [...d.dnsRecords, newRecord] };
        setSelectedDomainForDns(updated);
        return updated;
      }
      return d;
    });
    setMyDomains(updatedDomains);
    setNewDnsName("");
    setNewDnsValue("");
  };

  // Delete DNS Record handler
  const handleDeleteDnsRecord = (recId: string) => {
    if (!selectedDomainForDns) return;
    const updatedDomains = myDomains.map((d) => {
      if (d.id === selectedDomainForDns.id) {
        const updated = {
          ...d,
          dnsRecords: d.dnsRecords.filter((r) => r.id !== recId),
        };
        setSelectedDomainForDns(updated);
        return updated;
      }
      return d;
    });
    setMyDomains(updatedDomains);
  };

  // 1-Click DNS Presets
  const applyDnsPreset = (preset: "google" | "microsoft" | "zoho" | "shopify") => {
    if (!selectedDomainForDns) return;
    let presetRecords: DnsRecord[] = [];

    if (preset === "google") {
      presetRecords = [
        { id: "g_1", type: "MX", name: "@", value: "ASPMX.L.GOOGLE.COM", ttl: 3600, priority: 1 },
        { id: "g_2", type: "MX", name: "@", value: "ALT1.ASPMX.L.GOOGLE.COM", ttl: 3600, priority: 5 },
        { id: "g_3", type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", ttl: 3600 },
      ];
    } else if (preset === "microsoft") {
      presetRecords = [
        { id: "m_1", type: "MX", name: "@", value: `${selectedDomainForDns.domain.replace(/\./g, "-")}.mail.protection.outlook.com`, ttl: 3600, priority: 0 },
        { id: "m_2", type: "TXT", name: "@", value: "v=spf1 include:spf.protection.outlook.com -all", ttl: 3600 },
        { id: "m_3", type: "CNAME", name: "autodiscover", value: "autodiscover.outlook.com", ttl: 3600 },
      ];
    } else if (preset === "zoho") {
      presetRecords = [
        { id: "z_1", type: "MX", name: "@", value: "mx.zoho.com", ttl: 3600, priority: 10 },
        { id: "z_2", type: "MX", name: "@", value: "mx2.zoho.com", ttl: 3600, priority: 20 },
        { id: "z_3", type: "TXT", name: "@", value: "v=spf1 include:zoho.com ~all", ttl: 3600 },
      ];
    } else if (preset === "shopify") {
      presetRecords = [
        { id: "sh_1", type: "A", name: "@", value: "23.227.38.65", ttl: 3600 },
        { id: "sh_2", type: "CNAME", name: "www", value: "shops.myshopify.com", ttl: 3600 },
      ];
    }

    const updatedDomains = myDomains.map((d) => {
      if (d.id === selectedDomainForDns.id) {
        const updated = {
          ...d,
          dnsRecords: [...d.dnsRecords.filter((r) => !presetRecords.some((pr) => pr.name === r.name && pr.type === r.type)), ...presetRecords],
        };
        setSelectedDomainForDns(updated);
        return updated;
      }
      return d;
    });
    setMyDomains(updatedDomains);
  };

  // Add Subdomain
  const handleAddSubdomain = () => {
    if (!selectedDomainForDns || !newSubPrefix) return;
    const cleanPrefix = newSubPrefix.toLowerCase().replace(/[^a-z0-9-]/g, "");
    const newSub = {
      id: "sub_" + Date.now(),
      subdomain: cleanPrefix,
      fullDomain: `${cleanPrefix}.${selectedDomainForDns.domain}`,
      targetType: newSubTargetType,
      targetValue: newSubTargetValue,
      sslActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updatedDomains = myDomains.map((d) => {
      if (d.id === selectedDomainForDns.id) {
        const updated = {
          ...d,
          subdomains: [...(d.subdomains || []), newSub],
        };
        setSelectedDomainForDns(updated);
        return updated;
      }
      return d;
    });
    setMyDomains(updatedDomains);
    setNewSubPrefix("");
  };

  // Toggle Transfer Lock
  const handleToggleTransferLock = (domId: string) => {
    const updated = myDomains.map((d) => {
      if (d.id === domId) {
        return { ...d, transferLock: !d.transferLock };
      }
      return d;
    });
    setMyDomains(updated);
    if (selectedDomainForDns?.id === domId) {
      setSelectedDomainForDns({
        ...selectedDomainForDns,
        transferLock: !selectedDomainForDns.transferLock,
      });
    }
  };

  // Toggle Privacy
  const handleTogglePrivacy = (domId: string) => {
    const updated = myDomains.map((d) => {
      if (d.id === domId) {
        return { ...d, privacyEnabled: !d.privacyEnabled };
      }
      return d;
    });
    setMyDomains(updated);
    if (selectedDomainForDns?.id === domId) {
      setSelectedDomainForDns({
        ...selectedDomainForDns,
        privacyEnabled: !selectedDomainForDns.privacyEnabled,
      });
    }
  };

  const filteredSearchResults = searchResults.filter((item) => {
    if (selectedFilter === "All") return true;
    return item.category === selectedFilter;
  });

  return (
    <div id="domain-registrar-container" className="space-y-8 pb-16">
      {/* Top Banner & Paradigm Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              NEXT-GEN REGISTRAR & INFRASTRUCTURE CLOUD
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-white">
              Domain Registrar & Anycast DNS Engine
            </h1>
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              Register African ccTLDs (<span className="text-emerald-300 font-semibold">.ng, .com.ng, .africa, .co.za</span>) & global extensions with <span className="text-white font-semibold">zero markups</span>, free lifetime WHOIS privacy, 1-click Paystack checkout, and automatic Edge Cloud deployment.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 flex-1 sm:w-36">
              <div className="text-xs text-slate-400 font-medium">Active Domains</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{myDomains.length}</div>
              <div className="text-[11px] text-slate-400">100% SSL & DNSSEC</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 flex-1 sm:w-36">
              <div className="text-xs text-slate-400 font-medium">Activation Speed</div>
              <div className="text-2xl font-bold text-blue-400 mt-1">1.2s</div>
              <div className="text-[11px] text-slate-400">NiRA Instant API</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 flex-1 sm:w-36">
              <div className="text-xs text-slate-400 font-medium">Renewal Surcharge</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">₦0</div>
              <div className="text-[11px] text-slate-400">Zero Price Spikes</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-800 scrollbar-none">
          {[
            { id: "search", label: "Domain Search", icon: Search },
            { id: "bulk", label: "Bulk Registration", icon: Layers },
            { id: "transfers", label: "Domain Transfers", icon: ArrowDownUp },
            { id: "appraisal", label: "AI Valuation", icon: TrendingUp },
            { id: "portfolio", label: "My Domains & DNS", icon: Globe },
            { id: "tld-catalog", label: "TLD Pricing Hub", icon: Tag },
            { id: "whois", label: "WHOIS & Privacy", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDomainTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDomainTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SINGLE DOMAIN SEARCH & 1-CLICK INSTANT PROVISIONING */}
      {/* ========================================================================= */}
      {activeDomainTab === "search" && (
        <div className="space-y-8">
          {/* Main Search Input */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div className="max-w-3xl mx-auto text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Find Your Ideal Domain Name
              </h2>
              <p className="text-slate-600 text-sm">
                Type your brand, project, or business name. We check official registries instantly with real local & global rates.
              </p>
            </div>

            {/* Platform Owner Master Banner */}
            {isOwner && (
              <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/40 rounded-2xl text-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-lg">
                    👑
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-300 text-xs">
                        Platform Owner Master Account
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                        100% Free Access Active
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Configured for <strong className="text-white">timbest0612@gmail.com</strong>. You can search, register, and deploy any domain with ₦0 payment bypass.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchQuery);
              }}
              className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. naijaflavors, afrolink, lagosboutique"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-slate-900 text-base font-medium outline-none transition"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50 whitespace-nowrap"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Checking Registries...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Check Availability
                  </>
                )}
              </button>
            </form>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {(["All", "African Local", "Popular", "Tech & AI", "Commerce"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    selectedFilter === filter
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* AI Creative Domain Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg">
                      AI High-Converting Brand Recommendations
                    </h3>
                    <p className="text-xs text-slate-300">
                      Generated by Gemini AI based on keyword memorability and commercial click-through rates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {aiSuggestions.map((sug, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/60 rounded-2xl p-4 flex flex-col justify-between transition group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-emerald-400 font-bold text-sm">
                          {sug.domain}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold">
                          AVAILABLE
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">{sug.reason}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        ₦{sug.priceNgn.toLocaleString()}/yr
                      </span>
                      <button
                        onClick={() => {
                          setCheckoutDomain({
                            domain: sug.domain,
                            tld: "." + sug.domain.split(".").slice(1).join("."),
                            available: true,
                            pricing: {
                              price: `₦${sug.priceNgn.toLocaleString()}/yr ($${sug.priceUsd})`,
                              renewal: `₦${sug.priceNgn.toLocaleString()}/yr`,
                              priceNgn: sug.priceNgn,
                              priceUsd: sug.priceUsd,
                              renewalNgn: sug.priceNgn,
                              renewalUsd: sug.priceUsd,
                            },
                            includedFree: [
                              "Free Lifetime Privacy Shield",
                              "Free Edge Cloud Hosting (10GB NVMe)",
                              "Free 5 Custom Business Emails",
                              "Free Let's Encrypt Wildcard SSL",
                            ],
                          } as any);
                        }}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1"
                      >
                        Claim <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Results Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Registry Search Results ({filteredSearchResults.length} Extensions)
              </h3>
              <span className="text-xs text-slate-500">
                Transparent flat pricing • No surprise renewal markups
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSearchResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`border rounded-3xl p-5 sm:p-6 transition flex flex-col justify-between ${
                    result.available
                      ? "bg-white border-slate-200 hover:border-emerald-500 hover:shadow-md"
                      : "bg-slate-50 border-slate-200 opacity-75"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-mono">
                            {result.domain}
                          </h4>
                          {result.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {result.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">{result.category}</span>
                      </div>

                      <div>
                        {result.available ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold">
                            <XCircle className="w-3.5 h-3.5" /> Taken
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Inclusions */}
                    {result.available && (
                      <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Free WHOIS Privacy
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Free Wildcard SSL
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> 5 Free Business Emails
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> 10GB Edge Cloud Hosting
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {result.available ? (
                        <div>
                          <div className="text-lg font-bold text-slate-900">
                            {result.pricing.price}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Renews at same flat rate: {result.pricing.renewal}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveDomainTab("whois");
                            setWhoisQuery(result.domain);
                            handleWhoisLookup(result.domain);
                          }}
                          className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
                        >
                          View Public WHOIS Record <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {result.available ? (
                      <div className="flex items-center gap-2">
                        {isOwner && (
                          <button
                            onClick={() => {
                              setCheckoutDomain(result);
                            }}
                            className="px-4 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-amber-300 font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 shadow-sm border border-purple-400/40"
                            title="Instant 1-Click Free Provisioning for Platform Owner"
                          >
                            <span>👑</span>
                            <span>Owner Free (₦0)</span>
                          </button>
                        )}
                        <button
                          onClick={() => setCheckoutDomain(result)}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 shadow-sm"
                        >
                          Register & Deploy
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveDomainTab("transfers");
                          setTransferDomain(result.domain);
                        }}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition"
                      >
                        Transfer Here
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: BULK DOMAIN SEARCH & BUNDLE REGISTRATION */}
      {/* ========================================================================= */}
      {activeDomainTab === "bulk" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                <Layers className="w-3.5 h-3.5" /> BULK ENGINE WITH 10% DISCOUNT
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Bulk Domain Availability & Mass Registration
              </h2>
              <p className="text-slate-600 text-sm">
                Enter multiple domain names (one per line). Select the target extensions to evaluate and register your entire portfolio in one mass checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Area */}
              <div className="lg:col-span-2 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Domain Names (One per line, up to 50 names)
                </label>
                <textarea
                  rows={6}
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="mybusiness&#10;lagosshop&#10;africantech&#10;growthpilot"
                  className="w-full p-4 rounded-2xl border border-slate-300 font-mono text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                />
              </div>

              {/* TLD Selection Checkboxes */}
              <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select TLD Extensions
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[".com.ng", ".ng", ".com", ".africa", ".store", ".ai", ".org", ".co.za"].map((tld) => {
                    const isChecked = bulkTlds.includes(tld);
                    return (
                      <label
                        key={tld}
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer font-mono font-medium transition ${
                          isChecked
                            ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                            : "bg-white border-slate-200 text-slate-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setBulkTlds(bulkTlds.filter((t) => t !== tld));
                            } else {
                              setBulkTlds([...bulkTlds, tld]);
                            }
                          }}
                          className="rounded text-emerald-600 focus:ring-emerald-500"
                        />
                        {tld}
                      </label>
                    );
                  })}
                </div>

                <button
                  onClick={handleBulkCheck}
                  disabled={isBulkChecking || bulkTlds.length === 0}
                  className="w-full mt-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md disabled:opacity-50"
                >
                  {isBulkChecking ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Checking Registry...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" /> Run Bulk Check
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Results Table */}
          {bulkResults.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Bulk Results Summary ({bulkResults.length} domains evaluated)
                  </h3>
                  <p className="text-xs text-slate-500">
                    {bulkResults.filter((r) => r.available).length} available for immediate claim
                  </p>
                </div>

                {bulkBundleTotal && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-4">
                    <div>
                      <div className="text-[11px] font-bold text-emerald-800 uppercase">
                        Bundle Total (10% Bulk Discount Applied)
                      </div>
                      <div className="text-xl font-bold text-emerald-950 font-mono">
                        ₦{(bulkBundleTotal.totalNgn - bulkBundleTotal.discountNgn).toLocaleString()}{" "}
                        <span className="text-xs text-slate-500 font-normal">
                          (${(bulkBundleTotal.totalUsd - bulkBundleTotal.discountUsd).toFixed(2)})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const firstAvail = bulkResults.find((r) => r.available);
                        if (firstAvail) {
                          setCheckoutDomain({
                            domain: firstAvail.domain,
                            tld: "." + firstAvail.domain.split(".").slice(1).join("."),
                            available: true,
                            pricing: {
                              price: `₦${(bulkBundleTotal.totalNgn - bulkBundleTotal.discountNgn).toLocaleString()}`,
                              renewal: `₦${bulkBundleTotal.totalNgn.toLocaleString()}`,
                              priceNgn: bulkBundleTotal.totalNgn - bulkBundleTotal.discountNgn,
                              priceUsd: +(bulkBundleTotal.totalUsd - bulkBundleTotal.discountUsd).toFixed(2),
                              renewalNgn: bulkBundleTotal.totalNgn,
                              renewalUsd: bulkBundleTotal.totalUsd,
                            },
                            includedFree: [
                              "Free Lifetime Privacy Shield",
                              "Free Edge Cloud Hosting (10GB NVMe)",
                              "Free 5 Custom Business Emails",
                            ],
                          } as any);
                        }
                      }}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow"
                    >
                      Mass Register Available
                    </button>
                  </div>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                      <th className="py-3 px-4">Domain Name</th>
                      <th className="py-3 px-4">Availability</th>
                      <th className="py-3 px-4">Price (Naira)</th>
                      <th className="py-3 px-4">Price (USD)</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bulkResults.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">{r.domain}</td>
                        <td className="py-3 px-4">
                          {r.available ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                              Available
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold text-[11px]">
                              Taken
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          ₦{r.priceNgn.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-slate-600">${r.priceUsd}</td>
                        <td className="py-3 px-4 text-right">
                          {r.available && (
                            <button
                              onClick={() => {
                                setCheckoutDomain({
                                  domain: r.domain,
                                  tld: "." + r.domain.split(".").slice(1).join("."),
                                  available: true,
                                  pricing: {
                                    price: `₦${r.priceNgn.toLocaleString()}`,
                                    renewal: `₦${r.renewalNgn.toLocaleString()}`,
                                    priceNgn: r.priceNgn,
                                    priceUsd: r.priceUsd,
                                    renewalNgn: r.renewalNgn,
                                    renewalUsd: r.renewalUsd,
                                  },
                                  includedFree: ["Free Privacy", "Free SSL", "Free Cloud"],
                                } as any);
                              }}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs"
                            >
                              Register
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DOMAIN TRANSFERS (IN & OUT) */}
      {/* ========================================================================= */}
      {activeDomainTab === "transfers" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
                <ArrowDownUp className="w-3.5 h-3.5" /> ZERO DOWNTIME MIGRATION
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Transfer Domains to HostPilot
              </h2>
              <p className="text-slate-600 text-sm">
                Consolidate your domains from GoDaddy, Namecheap, Whogohost, or Google Domains. All transfers include a <span className="text-emerald-700 font-semibold">Free 1-Year Registration Extension</span> and Free Lifetime WHOIS Privacy.
              </p>
            </div>

            {/* Transfer Steps Infographic */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3">
              {[
                { step: "1", title: "Unlock Domain", desc: "Unlock transfer lock at your current registrar" },
                { step: "2", title: "Get Auth / EPP Code", desc: "Copy the authorization key from registrar panel" },
                { step: "3", title: "Initiate Transfer", desc: "Enter EPP key below & checkout at cost price" },
                { step: "4", title: "Instant DNS Mirror", desc: "Zero downtime with seamless Anycast routing" },
              ].map((st) => (
                <div key={st.step} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                    {st.step}
                  </div>
                  <div className="text-xs font-bold text-slate-900">{st.title}</div>
                  <div className="text-[11px] text-slate-500">{st.desc}</div>
                </div>
              ))}
            </div>

            {/* Transfer Initiation Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleInitiateTransfer();
              }}
              className="bg-slate-900 rounded-2xl p-6 text-white space-y-4"
            >
              <h3 className="font-bold text-base text-white">Start New Domain Transfer</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1">
                    Domain Name to Transfer
                  </label>
                  <input
                    type="text"
                    value={transferDomain}
                    onChange={(e) => setTransferDomain(e.target.value)}
                    placeholder="e.g. mybusiness.com or store.com.ng"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1">
                    EPP / Authorization Code
                  </label>
                  <input
                    type="password"
                    value={transferAuthCode}
                    onChange={(e) => setTransferAuthCode(e.target.value)}
                    placeholder="e.g. EPP-9821-XP..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1">
                    Current Registrar (Optional)
                  </label>
                  <input
                    type="text"
                    value={transferRegistrar}
                    onChange={(e) => setTransferRegistrar(e.target.value)}
                    placeholder="e.g. GoDaddy, Namecheap"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isTransferring}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isTransferring ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Auth Code...
                    </>
                  ) : (
                    <>
                      <ArrowDownUp className="w-4 h-4" /> Transfer Domain (Includes Free +1 Year)
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Active Transfers Tracker */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Active Transfers & Status Tracker ({activeTransfers.length})
            </h3>

            <div className="space-y-4">
              {activeTransfers.map((trf) => (
                <div key={trf.id} className="border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-slate-900">
                          {trf.domain}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                          {trf.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Losing Registrar: {trf.currentRegistrar} • Auth Code Verified
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-semibold text-emerald-700">
                        {trf.estimatedCompletion}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Initiated on {trf.initiatedAt}
                      </div>
                    </div>
                  </div>

                  {/* Progress Step Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(trf.stepNumber / 4) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>1. Lock Checked</span>
                    <span>2. Auth Verified</span>
                    <span className="text-emerald-700 font-bold">3. Registry Transfer in Flight</span>
                    <span>4. Auto-Provisioned</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: AI DOMAIN VALUATION & APPRAISAL */}
      {/* ========================================================================= */}
      {activeDomainTab === "appraisal" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
                <TrendingUp className="w-3.5 h-3.5" /> AI MARKET APPRAISAL & VALUATION
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                AI Domain Valuation & Investment Appraisal
              </h2>
              <p className="text-slate-600 text-sm">
                Estimate the fair secondary market value of any domain name based on keyword demand, character length, pronounceability, and historic comparable sales.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={appraisalQuery}
                onChange={(e) => setAppraisalQuery(e.target.value)}
                placeholder="e.g. paynaija.ng, africafresh.com"
                className="flex-1 px-4 py-3.5 rounded-2xl border border-slate-300 font-mono text-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none"
              />
              <button
                onClick={handleAppraise}
                disabled={isAppraising}
                className="px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2 text-sm shadow-md disabled:opacity-50"
              >
                {isAppraising ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Calculating Appraisal...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" /> Appraise Domain Worth
                  </>
                )}
              </button>
            </div>

            {/* Appraisal Report Result */}
            {valuationData && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                      Appraisal Target Domain
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                      {valuationData.domain}
                    </div>
                  </div>

                  <div className="bg-purple-950/80 border border-purple-800/80 rounded-2xl p-4 text-right">
                    <div className="text-xs text-purple-300 font-medium">Estimated Market Value</div>
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono mt-0.5">
                      ₦{valuationData.estimatedValueNgn.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">
                      Approx. ${valuationData.estimatedValueUsd.toLocaleString()} USD
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/80 rounded-2xl p-4 space-y-1">
                    <div className="text-xs text-slate-400 font-medium">Brandability Score</div>
                    <div className="text-2xl font-bold text-purple-400">
                      {valuationData.brandabilityScore} / 100
                    </div>
                    <div className="text-[11px] text-slate-400">High brand recall & speech clarity</div>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-4 space-y-1">
                    <div className="text-xs text-slate-400 font-medium">Market Demand Index</div>
                    <div className="text-2xl font-bold text-emerald-400">
                      {valuationData.marketDemand}
                    </div>
                    <div className="text-[11px] text-slate-400">Active commercial buyer inquiries</div>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-4 space-y-1">
                    <div className="text-xs text-slate-400 font-medium">Type-in Traffic Potential</div>
                    <div className="text-2xl font-bold text-blue-400">Top 5%</div>
                    <div className="text-[11px] text-slate-400">Direct navigation without ads</div>
                  </div>
                </div>

                {/* Valuation Factors */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Key Value Drivers
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                    {valuationData.factors.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-800/50 p-3 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparable Historical Sales */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Comparable Historical Sales
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {valuationData.comparableSales.map((sale, i) => (
                      <div key={i} className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 flex justify-between items-center text-xs">
                        <span className="font-mono text-white font-bold">{sale.domain}</span>
                        <div className="text-right">
                          <span className="text-emerald-400 font-bold">{sale.soldPrice}</span>
                          <span className="text-[10px] text-slate-400 block">{sale.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: MY DOMAINS PORTFOLIO & ADVANCED DNS ZONE EDITOR */}
      {/* ========================================================================= */}
      {activeDomainTab === "portfolio" && (
        <div className="space-y-8">
          {/* Domain Selector Chips */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Domain Portfolio & Zone Management
                </h3>
                <p className="text-xs text-slate-500">
                  Select a domain to manage DNS records, DNSSEC cryptographic keys, subdomains, and forwarding rules.
                </p>
              </div>
              <button
                onClick={() => setActiveDomainTab("search")}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" /> Register New Domain
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {myDomains.map((dom) => {
                const isSelected = selectedDomainForDns?.id === dom.id;
                return (
                  <div
                    key={dom.id}
                    onClick={() => setSelectedDomainForDns(dom)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? "bg-slate-900 border-slate-900 text-white shadow-md"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-900"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-base">{dom.domain}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isSelected ? "bg-emerald-500 text-slate-950" : "bg-emerald-100 text-emerald-800"
                        }`}>
                          {dom.status}
                        </span>
                      </div>
                      <div className={`text-xs mt-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                        Expires: {new Date(dom.expiresAt).toLocaleDateString()} • {dom.dnsRecords.length} DNS Records
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {selectedDomainForDns && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
              {/* Selected Domain Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-slate-900 font-mono">
                      {selectedDomainForDns.domain}
                    </h3>
                    {profile.domain === selectedDomainForDns.domain ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Primary OS Domain
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          const updated = { ...profile, domain: selectedDomainForDns.domain };
                          onUpdateProfile?.(updated);
                          LeadSyncService.syncDomainToEcosystem(selectedDomainForDns.domain, updated);
                        }}
                        className="px-3 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition flex items-center gap-1"
                        title="Set this domain as the primary domain across Cloud Hosting, Webmail, Website, and Email Broadcaster"
                      >
                        <Zap className="w-3.5 h-3.5 text-indigo-600" />
                        Set as Primary Domain
                      </button>
                    )}
                    <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Anycast Edge DNS Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Nameservers: {selectedDomainForDns.nameservers.join(", ")}
                  </p>
                </div>

                {/* Sub-tabs within domain manager */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto">
                  {[
                    { id: "dns", label: "DNS Records", icon: Layers },
                    { id: "dnssec", label: "DNSSEC", icon: ShieldCheck },
                    { id: "subdomains", label: "Subdomains", icon: Sliders },
                    { id: "forwarding", label: "Forwarding", icon: ArrowDownUp },
                    { id: "security", label: "Security & Locks", icon: Lock },
                  ].map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = portfolioSubTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setPortfolioSubTab(sub.id as any)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                          isSubActive
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <SubIcon className="w-3.5 h-3.5" />
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Tab 1: DNS Zone Editor */}
              {portfolioSubTab === "dns" && (
                <div className="space-y-6">
                  {/* 1-Click DNS Presets */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        1-Click Popular DNS Presets
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Automatically adds verified MX and SPF records
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => applyDnsPreset("google")}
                        className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-xs font-semibold text-slate-800 transition flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-600" /> Google Workspace
                      </button>
                      <button
                        onClick={() => applyDnsPreset("microsoft")}
                        className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-xs font-semibold text-slate-800 transition flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-500" /> Microsoft 365
                      </button>
                      <button
                        onClick={() => applyDnsPreset("zoho")}
                        className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-xs font-semibold text-slate-800 transition flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 text-amber-600" /> Zoho Mail
                      </button>
                      <button
                        onClick={() => applyDnsPreset("shopify")}
                        className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-xs font-semibold text-slate-800 transition flex items-center gap-1.5"
                      >
                        <Globe className="w-3.5 h-3.5 text-emerald-600" /> Shopify Store
                      </button>
                    </div>
                  </div>

                  {/* Add Record Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="sm:col-span-1">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Type</label>
                      <select
                        value={newDnsType}
                        onChange={(e) => setNewDnsType(e.target.value as any)}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold outline-none"
                      >
                        <option value="A">A (IPv4)</option>
                        <option value="AAAA">AAAA (IPv6)</option>
                        <option value="CNAME">CNAME (Alias)</option>
                        <option value="MX">MX (Mail)</option>
                        <option value="TXT">TXT (SPF/DKIM)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Name (Host)</label>
                      <input
                        type="text"
                        value={newDnsName}
                        onChange={(e) => setNewDnsName(e.target.value)}
                        placeholder="@ or sub"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Value (Destination)</label>
                      <input
                        type="text"
                        value={newDnsValue}
                        onChange={(e) => setNewDnsValue(e.target.value)}
                        placeholder="102.134.42.88 or host.com"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono outline-none"
                      />
                    </div>

                    <div className="sm:col-span-1 flex items-end">
                      <button
                        onClick={handleAddDnsRecord}
                        disabled={!newDnsName || !newDnsValue}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>

                  {/* DNS Table */}
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Value / Target</th>
                          <th className="py-3 px-4">TTL</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {selectedDomainForDns.dnsRecords.map((rec) => (
                          <tr key={rec.id} className="hover:bg-slate-50 transition">
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[11px]">
                                {rec.type}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-900">{rec.name}</td>
                            <td className="py-3 px-4 text-slate-700 max-w-xs truncate">{rec.value}</td>
                            <td className="py-3 px-4 text-slate-500">{rec.ttl}s</td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => handleDeleteDnsRecord(rec.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: DNSSEC */}
              {portfolioSubTab === "dnssec" && (
                <div className="space-y-6">
                  <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6 text-white space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        <div>
                          <h4 className="font-bold text-base">DNSSEC Cryptographic Signing</h4>
                          <p className="text-xs text-slate-300">
                            Protects your domain against DNS spoofing and cache poisoning attacks.
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-full">
                        ACTIVE & SIGNED
                      </span>
                    </div>

                    {selectedDomainForDns.dnssec && (
                      <div className="bg-slate-900/90 rounded-xl p-4 font-mono text-xs space-y-2 border border-slate-800">
                        <div>
                          <span className="text-slate-400">Key Tag:</span>{" "}
                          <span className="text-emerald-400 font-bold">{selectedDomainForDns.dnssec.keyTag}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Algorithm:</span>{" "}
                          <span className="text-white">{selectedDomainForDns.dnssec.algorithm}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Digest:</span>{" "}
                          <span className="text-slate-300 break-all">{selectedDomainForDns.dnssec.digest}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-800">
                          <span className="text-slate-400 block mb-1">DS Record for Root Registry:</span>
                          <div className="bg-slate-950 p-2.5 rounded-lg text-emerald-300 text-[11px] break-all flex items-center justify-between">
                            <span>{selectedDomainForDns.dnssec.dsRecord}</span>
                            <button
                              onClick={() => handleCopy(selectedDomainForDns.dnssec?.dsRecord || "")}
                              className="p-1 hover:text-white"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Subdomains */}
              {portfolioSubTab === "subdomains" && (
                <div className="space-y-6">
                  {/* Create Subdomain Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Subdomain Prefix</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={newSubPrefix}
                          onChange={(e) => setNewSubPrefix(e.target.value)}
                          placeholder="api, store, portal"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-l-xl text-xs font-mono outline-none"
                        />
                        <span className="p-2.5 bg-slate-200 text-slate-600 text-xs font-mono rounded-r-xl border border-l-0 border-slate-300">
                          .{selectedDomainForDns.domain}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Target Type</label>
                      <select
                        value={newSubTargetType}
                        onChange={(e) => setNewSubTargetType(e.target.value as any)}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold outline-none"
                      >
                        <option value="HOSTING_DIRECTORY">Hosting Directory</option>
                        <option value="URL_REDIRECT">URL Redirection</option>
                        <option value="EXTERNAL_IP">External IP / Server</option>
                        <option value="STORE_APP">Commerce Store App</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Target Value</label>
                      <input
                        type="text"
                        value={newSubTargetValue}
                        onChange={(e) => setNewSubTargetValue(e.target.value)}
                        placeholder="/public_html/sub or URL"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono outline-none"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={handleAddSubdomain}
                        disabled={!newSubPrefix}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" /> Create Subdomain
                      </button>
                    </div>
                  </div>

                  {/* Subdomains List */}
                  <div className="space-y-3">
                    {(selectedDomainForDns.subdomains || []).map((sub) => (
                      <div
                        key={sub.id}
                        className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-slate-900">
                              {sub.fullDomain}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              SSL ACTIVE
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Routes to: <span className="font-mono text-slate-700">{sub.targetValue}</span> ({sub.targetType})
                          </div>
                        </div>

                        <a
                          href={`https://${sub.fullDomain}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-slate-500 hover:text-emerald-600 rounded-lg"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 4: Forwarding */}
              {portfolioSubTab === "forwarding" && (
                <div className="space-y-6">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                    <h4 className="font-bold text-base text-slate-900">Domain & URL Forwarding</h4>
                    <p className="text-xs text-slate-600">
                      Redirect visitors of <span className="font-mono font-bold">{selectedDomainForDns.domain}</span> to any external URL, social link, or Paystack store.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Destination URL</label>
                        <input
                          type="url"
                          defaultValue="https://instagram.com/mybrand"
                          className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Redirect Type</label>
                        <select className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold outline-none bg-white">
                          <option>301 Permanent Redirect</option>
                          <option>302 Temporary Redirect</option>
                          <option>Frame Masking (URL stays visible)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl">
                        Save Forwarding Rule
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 5: Security & Locks */}
              {portfolioSubTab === "security" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Transfer Lock */}
                    <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Lock className="w-5 h-5 text-emerald-600" />
                          <h4 className="font-bold text-sm text-slate-900">Registrar Transfer Lock</h4>
                        </div>
                        <button
                          onClick={() => handleToggleTransferLock(selectedDomainForDns.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                            selectedDomainForDns.transferLock
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedDomainForDns.transferLock ? "LOCKED (Protected)" : "UNLOCKED"}
                        </button>
                      </div>
                      <p className="text-xs text-slate-500">
                        Prevents unauthorized domain hijacking or accidental transfers to other registrars.
                      </p>
                    </div>

                    {/* WHOIS Privacy */}
                    <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-blue-600" />
                          <h4 className="font-bold text-sm text-slate-900">WHOIS Privacy Shield</h4>
                        </div>
                        <button
                          onClick={() => handleTogglePrivacy(selectedDomainForDns.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                            selectedDomainForDns.privacyEnabled
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {selectedDomainForDns.privacyEnabled ? "MASKED (Free Forever)" : "EXPOSED"}
                        </button>
                      </div>
                      <p className="text-xs text-slate-500">
                        Hides your phone number, physical address, and private email from spam harvesters.
                      </p>
                    </div>
                  </div>

                  {/* Auth / EPP Code Generator */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Domain Authorization (EPP) Code
                      </span>
                      <button
                        onClick={() => handleCopy(selectedDomainForDns.authCode || "EPP-9842-NFNG-2026")}
                        className="text-xs text-emerald-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Key
                      </button>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
                      {selectedDomainForDns.authCode || "EPP-9842-NFNG-2026"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: TLD PRICING & EXTENSION CATALOG */}
      {/* ========================================================================= */}
      {activeDomainTab === "tld-catalog" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
                <Tag className="w-3.5 h-3.5" /> FLAT RATE GUARANTEE
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Official TLD Pricing & Extension Hub
              </h2>
              <p className="text-slate-600 text-sm">
                Transparent registration, renewal, and transfer fees for over 20 top local and global domain extensions.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-3 px-4">Extension (TLD)</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Register (1 Yr)</th>
                    <th className="py-3 px-4">Renewal (1 Yr)</th>
                    <th className="py-3 px-4">Transfer Fee</th>
                    <th className="py-3 px-4">Grace Period</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TLD_CATALOG.map((tldInfo, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 text-sm">
                        {tldInfo.tld}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          tldInfo.isAfrican ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                        }`}>
                          {tldInfo.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        ₦{tldInfo.registerNgn.toLocaleString()}{" "}
                        <span className="text-slate-400 font-normal">(${tldInfo.registerUsd})</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        ₦{tldInfo.renewNgn.toLocaleString()}{" "}
                        <span className="text-slate-400">(${tldInfo.renewUsd})</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        ₦{tldInfo.transferNgn.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-500">{tldInfo.graceDays} Days</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setActiveDomainTab("search");
                            setSearchQuery(profile.name.toLowerCase().replace(/[^a-z0-9]/g, ""));
                          }}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs"
                        >
                          Search
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: WHOIS LOOKUP & PRIVACY MASKING TOOL */}
      {/* ========================================================================= */}
      {activeDomainTab === "whois" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" /> ICANN / NiRA WHOIS DIRECT LOOKUP
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Live WHOIS Registry & Privacy Inspector
              </h2>
              <p className="text-slate-600 text-sm">
                Query official domain registry records to check ownership data, nameservers, DNSSEC status, and verify privacy shielding.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={whoisQuery}
                onChange={(e) => setWhoisQuery(e.target.value)}
                placeholder="e.g. naijaflavors.ng"
                className="flex-1 px-4 py-3.5 rounded-2xl border border-slate-300 font-mono text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
              />
              <button
                onClick={() => handleWhoisLookup(whoisQuery)}
                disabled={whoisLoading}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2 text-sm shadow-md disabled:opacity-50"
              >
                {whoisLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Querying Registry...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" /> Query WHOIS
                  </>
                )}
              </button>
            </div>

            {whoisResult && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="text-emerald-400 font-bold text-base">
                    WHOIS Record for: {whoisResult.domain}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    {whoisResult.whoisPrivacy}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Registrar:</span>
                    <span className="text-white font-semibold">{whoisResult.registrar}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Registration Status:</span>
                    <span className="text-emerald-400 font-semibold">{whoisResult.status}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Created / Registered Date:</span>
                    <span>{new Date(whoisResult.registeredAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Expiry Date:</span>
                    <span>{new Date(whoisResult.expiresAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-500 block mb-1">Nameservers:</span>
                  <div className="space-y-1 text-slate-400">
                    {(whoisResult.nameservers || []).map((ns: string, i: number) => (
                      <div key={i}>• {ns}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHECKOUT MODAL: 1-CLICK AUTONOMOUS SETUP */}
      {/* ========================================================================= */}
      {checkoutDomain && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 lg:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setCheckoutDomain(null);
                setRegistrationSuccess(null);
              }}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-full bg-slate-100"
            >
              <XCircle className="w-5 h-5" />
            </button>

            {!registrationSuccess ? (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> 1-CLICK AUTONOMOUS SETUP
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Register {checkoutDomain.domain}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Instant activation with NiRA / ICANN registry and automatic Edge Cloud provisioning.
                  </p>
                </div>

                {/* Free Inclusions Box */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-950">
                    Included with Registration (Zero Extra Cost):
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Free WHOIS Privacy Guard
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Free Wildcard SSL (HTTPS)
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Free 10GB NVMe Cloud Host
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> 5 Free Custom Emails
                    </div>
                  </div>
                </div>

                {/* Years & Pricing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Registration Period</label>
                    <select
                      value={registrationYears}
                      onChange={(e) => setRegistrationYears(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold bg-white outline-none"
                    >
                      <option value={1}>1 Year (Recommended)</option>
                      <option value={2}>2 Years (Save 5%)</option>
                      <option value={3}>3 Years (Save 10%)</option>
                      <option value={5}>5 Years (Long-Term Lock)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Total Amount</label>
                    <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 font-mono font-bold text-base text-slate-900 flex items-center justify-between">
                      {isOwner ? (
                        <>
                          <span className="text-emerald-700 font-black">₦0 (100% Owner Free)</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold">
                            👑 CREATOR BYPASS
                          </span>
                        </>
                      ) : (
                        <span>₦{(checkoutDomain.pricing.priceNgn * registrationYears).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Channels */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {isOwner ? "Payment Method (Owner Bypass Active)" : "Payment Method"}
                  </label>
                  {isOwner ? (
                    <div className="p-3.5 bg-gradient-to-r from-purple-950 to-indigo-950 border border-purple-500/40 rounded-xl text-amber-300 flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <span>👑</span>
                        <span>Platform Creator Master Billing Override (timbest0612@gmail.com)</span>
                      </div>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {(["Paystack", "Flutterwave", "Naira Card", "USSD / Bank Transfer"] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`p-3 rounded-xl border font-semibold text-left transition flex items-center justify-between ${
                            paymentMethod === method
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span>{method}</span>
                          {paymentMethod === method && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Checkout Submit */}
                <button
                  onClick={handleRegisterExecution}
                  disabled={isRegistering}
                  className={`w-full py-4 text-white font-bold text-sm rounded-2xl transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 ${
                    isOwner
                      ? "bg-gradient-to-r from-purple-700 via-indigo-700 to-emerald-600 hover:from-purple-600 hover:to-emerald-500 shadow-purple-900/30"
                      : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                  }`}
                >
                  {isRegistering ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Provisioning Registry & DNS...
                    </>
                  ) : isOwner ? (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" /> 👑 1-Click Free Provision (₦0 / $0 Owner Bypass)
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" /> Complete Registration & Deploy (₦{(checkoutDomain.pricing.priceNgn * registrationYears).toLocaleString()})
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Success State */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Domain Registered & Live!
                  </h3>
                  <p className="text-sm text-slate-600">
                    <span className="font-mono font-bold text-slate-900">{checkoutDomain.domain}</span> has been provisioned on Anycast Edge DNS with active SSL.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs space-y-2 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-emerald-700">ACTIVE & SECURED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Edge Node:</span>
                    <span className="font-bold text-slate-900">Lagos Rack Centre MDXi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Business Emails:</span>
                    <span className="font-bold text-slate-900">info@{checkoutDomain.domain} Ready</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCheckoutDomain(null);
                      setRegistrationSuccess(null);
                      setActiveDomainTab("portfolio");
                    }}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                  >
                    Manage DNS & Settings
                  </button>
                  {onNavigateToHosting && (
                    <button
                      onClick={() => {
                        setCheckoutDomain(null);
                        setRegistrationSuccess(null);
                        onNavigateToHosting();
                      }}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                    >
                      Open Server Cockpit
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
