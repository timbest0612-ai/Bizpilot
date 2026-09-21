import React, { useState } from "react";
import {
  ShieldCheck,
  Building2,
  FileCheck,
  Award,
  Sparkles,
  Download,
  Copy,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  UserCheck,
  Search,
  RefreshCw,
  FileText,
  Briefcase,
  HelpCircle,
  Landmark,
} from "lucide-react";
import { CacRegistrationRecord, BusinessProfile, CurrencyCode } from "../../types";

interface Props {
  profile: BusinessProfile;
  activeCurrency: CurrencyCode;
  cacRecord?: CacRegistrationRecord;
  onUpdateRecord?: (record: CacRegistrationRecord) => void;
}

export const CacComplianceView: React.FC<Props> = ({
  profile,
  activeCurrency,
  cacRecord: initialRecord,
  onUpdateRecord,
}) => {
  const [record, setRecord] = useState<CacRegistrationRecord>(
    initialRecord || {
      id: "cac_demo",
      companyName: profile.name + " Ltd",
      alternativeName: profile.name + " Enterprise",
      entityType: "PRIVATE_LIMITED",
      registrationNumber: "RC-1984210",
      status: "APPROVED_REGISTERED",
      tinNumber: "24890124-0001",
      firsStatus: "ACTIVE",
      scumlStatus: "CERTIFICATE_ISSUED",
      shareCapital: 10000000,
      registeredAddress: "Plot 14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
      directors: [
        {
          name: "Ayobami Timilehin Adeleke",
          role: "Managing Director & CEO",
          sharesPercent: 70,
          phone: "+234 812 345 6789",
          email: "ayobami@naijaflavors.com",
          bvnOrNin: "NIN-29182049182",
        },
        {
          name: "Chioma Blessing Okonkwo",
          role: "Executive Director of Operations",
          sharesPercent: 30,
          phone: "+234 803 987 6543",
          email: "chioma@naijaflavors.com",
          bvnOrNin: "NIN-84910284719",
        },
      ],
      businessObjectives: [
        `To carry on the business of commercial operations, distribution, and digital commerce in ${profile.offering || "culinary and retail services"}.`,
        "To establish, operate, manage and promote online multi-channel platforms and omnichannel sales networks.",
        "To enter into partnerships, franchises, logistics agreements and technology alliances to expand market access.",
        "To engage in domestic and international trade, value addition, processing, packaging and fulfillment.",
      ],
      timeline: [
        { step: "Name Availability & Reservation (CAC Portal)", date: "2026-08-01", completed: true, notes: "Approved in 4 hours." },
        { step: "MEMART Object Clauses Drafting (CAMA 2020 Compliant)", date: "2026-08-03", completed: true, notes: "AI Legal Drafter prepared 4 clauses." },
        { step: "FIRS Stamp Duty & Federal E-Filing", date: "2026-08-05", completed: true, notes: "Paid via Remita RRR #2910-4819-0192." },
        { step: "Issuance of Certificate of Incorporation & Status Report", date: "2026-08-08", completed: true, notes: "RC-1984210 issued with official electronic QR seal." },
        { step: "FIRS Tax Identification Number (TIN) Automated Sync", date: "2026-08-09", completed: true, notes: "TIN #24890124-0001 synchronized with TaxPro-Max." },
        { step: "SCUML AML Anti-Money Laundering Anti-Fraud Cert", date: "2026-08-12", completed: true, notes: "SCUML Certificate issued for tier-3 corporate bank account." },
      ],
    }
  );

  const [activeTab, setActiveTab] = useState<"overview" | "name-search" | "memart" | "directors" | "tax-scuml" | "global">("overview");
  const [searchQuery, setSearchQuery] = useState(profile.name || "");
  const [searchResult, setSearchResult] = useState<{
    available: boolean;
    name: string;
    similarityScore: number;
    conflicts: string[];
    recommendation: string;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [copiedObjIndex, setCopiedObjIndex] = useState<number | null>(null);
  const [customObjective, setCustomObjective] = useState("");
  const [newDirectorName, setNewDirectorName] = useState("");
  const [newDirectorRole, setNewDirectorRole] = useState("Director");
  const [newDirectorShares, setNewDirectorShares] = useState(10);
  const [newDirectorPhone, setNewDirectorPhone] = useState("");
  const [showAddDirectorModal, setShowAddDirectorModal] = useState(false);

  // Name availability checker simulation
  const handleCheckNameAvailability = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const isTaken = searchQuery.toLowerCase().includes("dangote") || searchQuery.toLowerCase().includes("first bank");
      if (isTaken) {
        setSearchResult({
          available: false,
          name: searchQuery.trim().toUpperCase(),
          similarityScore: 98,
          conflicts: ["DANGOTE GROUP PLC (RC-00192)", "FIRST BANK OF NIGERIA PLC (RC-00062)"],
          recommendation: `This name closely matches existing registered entities on CAC database. Consider adding distinctive keywords like '${searchQuery.trim()} Hub Global' or '${searchQuery.trim()} Solutions'.`,
        });
      } else {
        setSearchResult({
          available: true,
          name: searchQuery.trim().toUpperCase() + " LTD",
          similarityScore: 12,
          conflicts: [],
          recommendation: "Excellent! This proposed company name passes all CAC CAMA 2020 uniqueness algorithms. You can reserve this name with 99.8% guaranteed approval.",
        });
      }
    }, 800);
  };

  const handleAddDirector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDirectorName.trim()) return;
    const updated = {
      ...record,
      directors: [
        ...record.directors,
        {
          name: newDirectorName.trim(),
          role: newDirectorRole,
          sharesPercent: Number(newDirectorShares),
          phone: newDirectorPhone || "+234 800 000 0000",
          email: `${newDirectorName.toLowerCase().replace(/\s+/g, ".")}@${profile.name.toLowerCase().replace(/\s+/g, "")}.com`,
          bvnOrNin: "NIN-" + Math.floor(10000000000 + Math.random() * 90000000000),
        },
      ],
    };
    setRecord(updated);
    onUpdateRecord?.(updated);
    setNewDirectorName("");
    setNewDirectorPhone("");
    setShowAddDirectorModal(false);
  };

  const handleAddObjective = () => {
    if (!customObjective.trim()) return;
    const updated = {
      ...record,
      businessObjectives: [...record.businessObjectives, customObjective.trim()],
    };
    setRecord(updated);
    onUpdateRecord?.(updated);
    setCustomObjective("");
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedObjIndex(index);
    setTimeout(() => setCopiedObjIndex(null), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Legal, CAC & Compliance Hub
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% CAMA 2020 Compliant
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Official Government Incorporation, MEMART Object Clause Generator, FIRS TIN & SCUML AML Automation.
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Status */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">CAC Registration Status</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {record.registrationNumber} • APPROVED
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {[
          { id: "overview", label: "Registration Overview", icon: ShieldCheck },
          { id: "name-search", label: "CAC Name Checker", icon: Search },
          { id: "memart", label: "MEMART Object Clauses", icon: FileText },
          { id: "directors", label: "Directors & Cap Table", icon: UserCheck },
          { id: "tax-scuml", label: "FIRS TIN & SCUML AML", icon: Award },
          { id: "global", label: "US Delaware & UK Formations", icon: Building2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & STATUS STEPPER */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Status Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl" />
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Building2 className="w-5 h-5" />
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  RC: {record.registrationNumber}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{record.companyName}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Private Company Limited by Shares (LTD) • Issued Share Capital: ₦{(record.shareCapital).toLocaleString()}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">CAC Certificate Seal:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Electronic QR Verified
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <FileCheck className="w-5 h-5" />
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  TIN: {record.tinNumber}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Federal Tax & VAT Clearance</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                FIRS TaxPro-Max Gateway Linked • Automatic 7.5% VAT Automated Computation & Remittance
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">FIRS Compliance:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active & Synchronized
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                  <Award className="w-5 h-5" />
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  SCUML: CERTIFIED
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Anti-Money Laundering (AML)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                EFCC / SCUML Clearance Active for Tier-3 Corporate Commercial Bank Accounts & Forex Inflow
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">Bank Opening Ready:</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Ready
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Official Corporate Incorporation Roadmap
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  End-to-end statutory milestones completed with automated government synchronization
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-800">
                6 of 6 Milestones Completed
              </span>
            </div>

            <div className="relative border-l-2 border-emerald-500 ml-4 space-y-6">
              {record.timeline.map((step, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{step.step}</span>
                      <span className="text-xs text-slate-500 font-mono">{step.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{step.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CAC NAME CHECKER */}
      {activeTab === "name-search" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Instant CAC Name Availability & Conflict Analysis
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Check your desired business name against the Corporate Affairs Commission (CAMA 2020) name rules before booking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. NaijaFlavors Gourmet, Nexus Logistics, Apex Pay..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
              />
            </div>
            <button
              onClick={handleCheckNameAvailability}
              disabled={isSearching || !searchQuery.trim()}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Registry...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" /> Check Name Availability
                </>
              )}
            </button>
          </div>

          {searchResult && (
            <div
              className={`p-6 rounded-2xl border ${
                searchResult.available
                  ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
                  : "bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
              } space-y-4`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    searchResult.available
                      ? "bg-emerald-500 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {searchResult.available ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {searchResult.name}
                    </h4>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        searchResult.available
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                      }`}
                    >
                      {searchResult.available ? "AVAILABLE FOR RESERVATION" : "POTENTIAL CONFLICT DETECTED"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    {searchResult.recommendation}
                  </p>

                  {searchResult.conflicts.length > 0 && (
                    <div className="mt-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-amber-200 dark:border-amber-800/60">
                      <div className="text-xs font-bold text-amber-800 dark:text-amber-400">Existing Registrations with Similar Sound/Spelling:</div>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc list-inside mt-1 space-y-0.5 font-mono">
                        {searchResult.conflicts.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {searchResult.available && (
                    <div className="mt-4 flex items-center gap-3">
                      <button className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-500 shadow-sm flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> 1-Click Reserve on CAC (₦15,000)
                      </button>
                      <span className="text-xs text-slate-500">Includes 60-day name lock on official portal.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MEMART OBJECT CLAUSES */}
      {activeTab === "memart" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                AI Memorandum & Articles of Association (MEMART) Generator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Automatically draft legally enforceable Object Clauses tailored for {profile.name} under CAMA 2020.
              </p>
            </div>
            <button className="px-4 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Download className="w-3.5 h-3.5" /> Download Full MEMART Draft (PDF)
            </button>
          </div>

          <div className="space-y-4">
            {record.businessObjectives.map((clause, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 flex items-start justify-between gap-4 group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {clause}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(clause, idx)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors shrink-0"
                  title="Copy Clause"
                >
                  {copiedObjIndex === idx ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>

          {/* Add custom clause */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
              Add Custom CAMA Object Clause
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customObjective}
                onChange={(e) => setCustomObjective(e.target.value)}
                placeholder="e.g. To operate proprietary mobile payment gateways and credit brokerages..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleAddObjective}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Add Clause
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DIRECTORS & CAP TABLE */}
      {activeTab === "directors" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Shareholding Cap Table & Board of Directors
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Total Authorized Share Capital: ₦{(record.shareCapital).toLocaleString()} (10,000,000 Ordinary Shares of ₦1.00 each)
              </p>
            </div>
            <button
              onClick={() => setShowAddDirectorModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
            >
              + Add Director / Shareholder
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 text-xs uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Director / Shareholder</th>
                  <th className="py-3 px-4">Corporate Role</th>
                  <th className="py-3 px-4">Equity Shares</th>
                  <th className="py-3 px-4">Identity Verification</th>
                  <th className="py-3 px-4">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {record.directors.map((dir, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {dir.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {dir.role}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{dir.sharesPercent}%</span>
                        <span className="text-xs text-slate-400">({((record.shareCapital * dir.sharesPercent) / 100).toLocaleString()} Shares)</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {dir.bvnOrNin}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      <div>{dir.email}</div>
                      <div className="font-mono">{dir.phone}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: FIRS TAX & SCUML */}
      {activeTab === "tax-scuml" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">FIRS Tax Identification Number</h3>
                <p className="text-xs text-slate-500">Federal Inland Revenue Service TaxPro-Max System</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs text-slate-500 uppercase font-bold">Assigned Corporate TIN:</div>
              <div className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">
                {record.tinNumber}
              </div>
              <div className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized with Central Bank of Nigeria (CBN) Bank Portals
              </div>
            </div>

            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Automated 7.5% VAT invoice calculation ready.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Annual Company Income Tax (CIT) 0% rate for turnover under ₦25M.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant Withholding Tax (WHT) credit note deductions.
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">SCUML Anti-Money Laundering</h3>
                <p className="text-xs text-slate-500">Special Control Unit Against Money Laundering (EFCC)</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs text-slate-500 uppercase font-bold">SCUML Registration Status:</div>
              <div className="text-base font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-500" /> CERTIFICATE ISSUED & CLEARED
              </div>
              <div className="text-xs text-slate-500">
                Enables high-volume corporate transactions, POS merchant acquiring, and foreign currency inflows.
              </div>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200">
              💡 <strong>Why SCUML matters:</strong> Nigerian commercial banks (Access, GTBank, Zenith, FirstBank) mandate SCUML certificates to open unrestricted business domiciliary & corporate accounts.
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: GLOBAL FORMATIONS (DELAWARE / UK) */}
      {activeTab === "global" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Global Corporate Expansions (US Delaware LLC & UK LTD)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Form foreign parent entities to access Stripe USD, Mercury US Bank, and international venture capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  🇺🇸 US Delaware LLC Formation
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  $350 All-Inclusive
                </span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li>• Official Delaware State Filing & Certificate of Formation</li>
                <li>• US Employer Identification Number (EIN) from IRS</li>
                <li>• 1-Year US Registered Agent Service in Wilmington</li>
                <li>• Guaranteed Mercury / Brex US Corporate Bank Account</li>
                <li>• Stripe Global Payments Gateway activation</li>
              </ul>
              <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs">
                Launch US Delaware LLC
              </button>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  🇬🇧 UK Companies House LTD
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  £180 All-Inclusive
                </span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li>• Same-day registration with UK Companies House</li>
                <li>• London Prestige Registered Office Address</li>
                <li>• UK Corporate Bank Account (Wise Business & Revolut)</li>
                <li>• Automated HMRC Tax & VAT Registration</li>
                <li>• Fast European payment rails access</li>
              </ul>
              <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs">
                Launch UK LTD Company
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Director Modal */}
      {showAddDirectorModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Add Board Director or Shareholder
            </h3>
            <form onSubmit={handleAddDirector} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Legal Name (as on NIN/Passport)</label>
                <input
                  type="text"
                  required
                  value={newDirectorName}
                  onChange={(e) => setNewDirectorName(e.target.value)}
                  placeholder="e.g. Babatunde Fashola"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Corporate Role</label>
                  <select
                    value={newDirectorRole}
                    onChange={(e) => setNewDirectorRole(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option>Director</option>
                    <option>Executive Director</option>
                    <option>Company Secretary</option>
                    <option>Shareholder Only</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Equity Shares (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newDirectorShares}
                    onChange={(e) => setNewDirectorShares(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newDirectorPhone}
                  onChange={(e) => setNewDirectorPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddDirectorModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Save Director
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
