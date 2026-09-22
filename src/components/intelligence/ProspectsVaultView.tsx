import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit3,
  CheckSquare,
  Square,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ArrowUpDown,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Ban,
  FileSpreadsheet,
  CheckCircle2,
  X,
  UploadCloud,
  FileText,
} from "lucide-react";
import { ProspectRecord, ProductRecord, MarketingEligibility } from "../../types/intelligence";

interface Props {
  prospects: ProspectRecord[];
  products: ProductRecord[];
  onSelectProspect: (prospect: ProspectRecord) => void;
  onBulkClassify: (selectedIds: string[]) => void;
  onBulkSuppress: (selectedIds: string[]) => void;
  onImportProspects: (newProspects: ProspectRecord[]) => void;
  onExportCsv: () => void;
}

export const ProspectsVaultView: React.FC<Props> = ({
  prospects,
  products,
  onSelectProspect,
  onBulkClassify,
  onBulkSuppress,
  onImportProspects,
  onExportCsv,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedPain, setSelectedPain] = useState<string>("ALL");
  const [selectedEligibility, setSelectedEligibility] = useState<string>("ALL");
  const [minFitScore, setMinFitScore] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState("");
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Filtered prospects
  const filtered = prospects.filter((p) => {
    const matchesSearch =
      searchTerm === "" ||
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "ALL" || p.primaryCategory === selectedCategory;
    const matchesPain = selectedPain === "ALL" || p.painCategory === selectedPain;
    const matchesEligibility = selectedEligibility === "ALL" || p.marketingEligibility === selectedEligibility;
    const matchesScore = p.productFitScore >= minFitScore;

    return matchesSearch && matchesCategory && matchesPain && matchesEligibility && matchesScore;
  });

  const allSelected = filtered.length > 0 && selectedIds.length === filtered.length;

  const handleToggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((p) => p.id));
    }
  };

  const handleToggleRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // CSV Import Parser
  const handleParseAndImport = () => {
    if (!importText.trim()) return;

    try {
      const lines = importText.trim().split("\n");
      const newItems: ProspectRecord[] = [];

      // Assume header: Name, Email, Profession, Industry, Country, Pain Point
      const startIndex = lines[0].toLowerCase().includes("email") ? 1 : 0;

      for (let i = startIndex; i < lines.length; i++) {
        const parts = lines[i].split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
        if (parts.length >= 2 && parts[1].includes("@")) {
          const name = parts[0] || "Prospect Lead";
          const email = parts[1];
          const profession = parts[2] || "Business Professional";
          const industry = parts[3] || "General Business";
          const country = parts[4] || "Global";
          const pain = parts[5] || "Workload & scaling friction";

          newItems.push({
            id: `prosp_imp_${Date.now()}_${i}`,
            firstName: name.split(" ")[0] || name,
            lastName: name.split(" ").slice(1).join(" ") || "",
            fullName: name,
            email,
            country,
            city: "General",
            timezone: "UTC",
            socialPlatform: "Public Directory",
            profileUrl: "",
            sourceUrl: "CSV Ingestion",
            sourceType: "Public Directory",
            collectionDate: new Date().toISOString(),
            primaryCategory: "Business & Entrepreneurship",
            industry,
            profession,
            jobTitle: profession,
            seniority: "Mid-Level Professional",
            organization: "Organization",
            organizationSize: "11-50",
            employmentType: "Full-time",
            painCategory: "Burnout & Exhaustion",
            primaryPain: pain,
            secondaryPains: [],
            painDescription: "Imported via CSV file",
            painEvidence: "CSV dataset row",
            painSeverity: "Moderate",
            painConfidence: 0.75,
            personaName: "Imported Professional",
            personaDescription: "Imported prospect awaiting detailed AI enrichment.",
            goals: ["Business productivity"],
            challenges: ["Operational bandwidth"],
            interests: ["Professional development"],
            likelyNeeds: ["Curated solutions"],
            productFitScore: 70,
            buyingIntent: "Medium",
            purchaseReadiness: "Evaluating Options",
            relevanceReason: "Ingested via CSV database import",
            scoreBreakdown: {
              painMatch: 20,
              personaMatch: 15,
              professionMatch: 15,
              industryMatch: 10,
              intentSignals: 5,
              interestMatch: 3,
              geographicMatch: 2,
              engagementHistory: 0,
              total: 70,
              reasons: ["Base qualification score"],
            },
            matchedProducts: [],
            recommendedOffer: "General Executive Briefing",
            campaignStatus: "Not Contacted",
            contactStatus: "Eligible",
            emailsSent: 0,
            emailsDelivered: 0,
            opens: 0,
            clicks: 0,
            replies: 0,
            positiveReplies: 0,
            unsubscribed: false,
            bounced: false,
            complained: false,
            converted: false,
            consentStatus: "Public Professional Profile (Legitimate Interest)",
            marketingEligibility: "Eligible",
            unsubscribeStatus: false,
            suppressionStatus: false,
            doNotContact: false,
            classificationModel: "csv-importer",
            classificationDate: new Date().toISOString(),
            classificationConfidence: "Medium",
            confidenceScore: 0.75,
            humanOverride: false,
            lastAiUpdate: new Date().toISOString(),
          });
        }
      }

      if (newItems.length > 0) {
        onImportProspects(newItems);
        setImportStatus(`Successfully ingested ${newItems.length} prospects!`);
        setTimeout(() => {
          setShowImportModal(false);
          setImportStatus(null);
          setImportText("");
        }, 1200);
      } else {
        setImportStatus("No valid rows found. Please check column format (Name, Email, Profession...).");
      }
    } catch (err) {
      setImportStatus("Error parsing CSV format. Ensure comma-separated values.");
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (score >= 65) return "text-blue-700 bg-blue-50 border-blue-200";
    if (score >= 50) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-slate-700 bg-slate-50 border-slate-200";
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-700" />
            Prospect Intelligence Vault
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured database of prospects with verified evidence, classification scoring, and eligibility.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Import CSV / Leads</span>
          </button>

          <button
            onClick={onExportCsv}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export View</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search box */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, company, profession, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Profession Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="ALL">All Categories</option>
              <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
              <option value="Executives & Management">Executives & Management</option>
              <option value="Technology">Technology</option>
              <option value="Creative & Media">Creative & Media</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Religion & Ministry">Religion & Ministry</option>
            </select>
          </div>

          {/* Pain Category Filter */}
          <div>
            <select
              value={selectedPain}
              onChange={(e) => setSelectedPain(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="ALL">All Pain Points</option>
              <option value="Burnout & Exhaustion">Burnout & Exhaustion</option>
              <option value="Sleep & Recovery">Sleep & Recovery</option>
              <option value="Business">Business Growth</option>
              <option value="Career">Career Progression</option>
              <option value="Content & Creator">Content & Monetization</option>
            </select>
          </div>

          {/* Eligibility Filter */}
          <div>
            <select
              value={selectedEligibility}
              onChange={(e) => setSelectedEligibility(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="ALL">All Eligibility</option>
              <option value="Eligible">Eligible Only</option>
              <option value="Suppressed">Suppressed</option>
              <option value="Invalid">Invalid Syntax/MX</option>
              <option value="Needs Review">Needs Review</option>
            </select>
          </div>
        </div>

        {/* Score Threshold slider & selected count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-600">Minimum Fit Score:</span>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minFitScore}
              onChange={(e) => setMinFitScore(Number(e.target.value))}
              className="w-32 accent-slate-900"
            />
            <span className="font-mono font-bold text-slate-900">{minFitScore}+</span>
          </div>

          <div className="text-slate-500">
            Showing <span className="font-bold text-slate-900">{filtered.length}</span> of{" "}
            <span className="font-bold text-slate-900">{prospects.length}</span> total records
          </div>
        </div>
      </div>

      {/* Bulk Action Bar (when rows selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-4 animate-in fade-in">
          <span className="text-xs font-semibold">
            {selectedIds.length} {selectedIds.length === 1 ? "prospect" : "prospects"} selected
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBulkClassify(selectedIds)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Re-Classify with AI
            </button>

            <button
              onClick={() => onBulkSuppress(selectedIds)}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Ban className="w-3.5 h-3.5" />
              Suppress Selected
            </button>
          </div>
        </div>
      )}

      {/* Prospects Data Table */}
      <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="py-3 px-4 w-10">
                  <button onClick={handleToggleSelectAll} className="flex items-center">
                    {allSelected ? (
                      <CheckSquare className="w-4 h-4 text-slate-900" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4">Prospect</th>
                <th className="py-3 px-4">Profession & Role</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Pain Category</th>
                <th className="py-3 px-4 text-center">Fit Score</th>
                <th className="py-3 px-4">Eligibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No prospects match the specified criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((prosp) => {
                  const isChecked = selectedIds.includes(prosp.id);
                  return (
                    <tr
                      key={prosp.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      onClick={() => onSelectProspect(prosp)}
                    >
                      <td
                        className="py-3 px-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleRow(prosp.id);
                        }}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-slate-900" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{prosp.fullName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{prosp.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{prosp.jobTitle || prosp.profession}</div>
                        <div className="text-[11px] text-slate-500">{prosp.organization}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {prosp.city}, {prosp.country}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {prosp.painCategory}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getScoreColor(
                            prosp.productFitScore
                          )}`}
                        >
                          {prosp.productFitScore}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            prosp.marketingEligibility === "Eligible"
                              ? "bg-emerald-500/10 text-emerald-700"
                              : prosp.marketingEligibility === "Suppressed"
                              ? "bg-rose-500/10 text-rose-700"
                              : "bg-amber-500/10 text-amber-700"
                          }`}
                        >
                          {prosp.marketingEligibility}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProspect(prosp);
                          }}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] transition-colors"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSV Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-600" />
                Import Prospects (CSV / TSV)
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Paste comma-separated prospect rows or import a CSV. Our engine automatically maps columns:{" "}
              <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded">
                Name, Email, Profession, Industry, Country, Pain Point
              </code>
            </p>

            <textarea
              rows={6}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder={`Name, Email, Profession, Industry, Country, Pain Point
Dr. Angela Cole, angela@colepediatrics.com, Doctor, Healthcare, United States, Clinical shift exhaustion
Femi Adekunle, femi@africafin.ng, Founder, FinTech, Nigeria, Inconsistent B2B sales cycles
Claire Dupont, c.dupont@ecovista.fr, E-commerce Owner, Retail, France, Insomnia and inventory anxiety`}
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />

            {importStatus && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  importStatus.includes("Successfully")
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {importStatus}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleParseAndImport}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                Parse & Ingest Prospects
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
