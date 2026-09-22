import React, { useState } from "react";
import {
  Ban,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  AlertTriangle,
  Download,
  Upload,
  CheckCircle2,
  FileText,
  Globe,
  Settings,
  X,
  History,
  Lock,
} from "lucide-react";
import {
  GlobalSuppressionRecord,
  ComplianceAuditRecord,
  JurisdictionSettings,
  SuppressionReason,
} from "../../types/intelligence";

interface Props {
  suppressionList: GlobalSuppressionRecord[];
  auditLogs: ComplianceAuditRecord[];
  jurisdictionSettings: JurisdictionSettings;
  onAddSuppression: (records: GlobalSuppressionRecord[]) => void;
  onRemoveSuppression: (id: string) => void;
  onUpdateJurisdiction: (settings: JurisdictionSettings) => void;
}

export const SuppressionHubView: React.FC<Props> = ({
  suppressionList,
  auditLogs,
  jurisdictionSettings,
  onAddSuppression,
  onRemoveSuppression,
  onUpdateJurisdiction,
}) => {
  const [activeTab, setActiveTab] = useState<"list" | "audit" | "settings">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [reasonFilter, setReasonFilter] = useState<string>("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  // Add suppression form state
  const [emailsInput, setEmailsInput] = useState("");
  const [selectedReason, setSelectedReason] = useState<SuppressionReason>("Manually blocked");
  const [suppressionNotes, setSuppressionNotes] = useState("");

  const filteredList = suppressionList.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReason = reasonFilter === "ALL" || item.reason === reasonFilter;
    return matchesSearch && matchesReason;
  });

  const handleBulkAdd = () => {
    if (!emailsInput.trim()) return;

    const emails = emailsInput
      .split(/[\n,;]/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.includes("@"));

    if (emails.length === 0) return;

    const newRecords: GlobalSuppressionRecord[] = emails.map((email, idx) => ({
      id: `supp_${Date.now()}_${idx}`,
      email,
      reason: selectedReason,
      dateAdded: new Date().toISOString(),
      notes: suppressionNotes || "Manually added to suppression registry",
      addedBy: "Compliance Officer (Operator)",
    }));

    onAddSuppression(newRecords);
    setShowAddModal(false);
    setEmailsInput("");
    setSuppressionNotes("");
  };

  const getReasonBadge = (reason: SuppressionReason) => {
    switch (reason) {
      case "Unsubscribed":
        return "bg-amber-500/10 text-amber-700 border-amber-500/20";
      case "Hard bounce":
        return "bg-rose-500/10 text-rose-700 border-rose-500/20";
      case "Spam complaint":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      case "Manually blocked":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Ban className="w-5 h-5 text-rose-600" />
            Global Suppression Registry & Compliance Shield
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Strict pre-send blocklist ensuring no emails are sent to unsubscribed, bounced, or suppressed contacts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub-tab navigation */}
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Suppressed Contacts ({suppressionList.length})
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "audit" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Audit Trail ({auditLogs.length})
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "settings"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Jurisdiction Rules
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Suppression</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SUPPRESSION LIST */}
      {activeTab === "list" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="w-full sm:w-80 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search suppressed email or domain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              >
                <option value="ALL">All Suppression Reasons</option>
                <option value="Unsubscribed">Unsubscribed</option>
                <option value="Hard bounce">Hard bounce</option>
                <option value="Spam complaint">Spam complaint</option>
                <option value="Manually blocked">Manually blocked</option>
                <option value="Compliance restriction">Compliance restriction</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="py-3 px-4">Suppressed Target</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Date Added</th>
                  <th className="py-3 px-4">Context Notes</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No records found in suppression list.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">
                        {item.email}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${getReasonBadge(
                            item.reason
                          )}`}
                        >
                          {item.reason}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(item.dateAdded).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                        {item.notes || "—"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onRemoveSuppression(item.id)}
                          className="px-2.5 py-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: AUDIT TRAIL */}
      {activeTab === "audit" && (
        <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <History className="w-4 h-4 text-slate-500" />
              Compliance Event Logs
            </h3>
            <span className="text-[11px] text-slate-400">Immutable ledger</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">Event Type</th>
                <th className="py-2.5 px-4">Target Email</th>
                <th className="py-2.5 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-4 text-slate-400 font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">{log.eventType}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600">{log.email}</td>
                  <td className="py-2.5 px-4 text-slate-500">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: JURISDICTION RULES */}
      {activeTab === "settings" && (
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6 max-w-3xl">
          <h3 className="text-sm font-bold text-slate-900">Global Privacy & Compliance Frameworks</h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div>
                <span className="font-bold text-slate-900 block">CAN-SPAM Strict Compliance</span>
                <span className="text-slate-500 text-[11px]">
                  Enforce physical mailing address, clear sender ID, and 1-click opt-out.
                </span>
              </div>
              <input
                type="checkbox"
                checked={jurisdictionSettings.canSpamCompliant}
                onChange={(e) =>
                  onUpdateJurisdiction({ ...jurisdictionSettings, canSpamCompliant: e.target.checked })
                }
                className="w-4 h-4 accent-slate-900"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div>
                <span className="font-bold text-slate-900 block">GDPR & UK-GDPR B2B Legitimate Interest</span>
                <span className="text-slate-500 text-[11px]">
                  Requires verified professional role relevance and instant opt-out honoring.
                </span>
              </div>
              <input
                type="checkbox"
                checked={jurisdictionSettings.gdprCompliant}
                onChange={(e) =>
                  onUpdateJurisdiction({ ...jurisdictionSettings, gdprCompliant: e.target.checked })
                }
                className="w-4 h-4 accent-slate-900"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div>
                <span className="font-bold text-slate-900 block">Auto-Suppress on Hard Bounce</span>
                <span className="text-slate-500 text-[11px]">
                  Immediately append mail server rejection to global suppression.
                </span>
              </div>
              <input
                type="checkbox"
                checked={jurisdictionSettings.autoSuppressBounces}
                onChange={(e) =>
                  onUpdateJurisdiction({ ...jurisdictionSettings, autoSuppressBounces: e.target.checked })
                }
                className="w-4 h-4 accent-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Mandatory Physical Address Footer:
              </label>
              <textarea
                rows={2}
                value={jurisdictionSettings.physicalMailingAddress}
                onChange={(e) =>
                  onUpdateJurisdiction({
                    ...jurisdictionSettings,
                    physicalMailingAddress: e.target.value,
                  })
                }
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Add Suppression Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Ban className="w-5 h-5 text-rose-600" />
                Add to Global Suppression List
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Email Addresses (one per line or comma-separated)
                </label>
                <textarea
                  rows={4}
                  value={emailsInput}
                  onChange={(e) => setEmailsInput(e.target.value)}
                  placeholder="contact@example.com&#10;user@domain.org"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Suppression Reason</label>
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value as SuppressionReason)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                >
                  <option value="Manually blocked">Manually blocked</option>
                  <option value="Unsubscribed">Unsubscribed</option>
                  <option value="Hard bounce">Hard bounce</option>
                  <option value="Spam complaint">Spam complaint</option>
                  <option value="Invalid address format">Invalid address format</option>
                  <option value="Compliance restriction">Compliance restriction</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Notes / Context</label>
                <input
                  type="text"
                  placeholder="e.g., Requested removal via personal LinkedIn message"
                  value={suppressionNotes}
                  onChange={(e) => setSuppressionNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkAdd}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Permanently Suppress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
