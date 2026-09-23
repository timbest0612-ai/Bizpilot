import React, { useState, useEffect } from "react";
import {
  FileText,
  ShieldCheck,
  CreditCard,
  Send,
  Plus,
  Trash2,
  Printer,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  DollarSign,
  QrCode,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Lock,
  Users,
  Zap,
} from "lucide-react";
import { SmartInvoice, EscrowMilestone, CurrencyCode, BusinessProfile, Lead } from "../../types";
import { LeadSyncService } from "../../services/leadSync";

interface Props {
  profile: BusinessProfile;
  activeCurrency: CurrencyCode;
  invoices?: SmartInvoice[];
  onAddInvoice?: (inv: SmartInvoice) => void;
  onUpdateInvoice?: (inv: SmartInvoice) => void;
}

export const SmartInvoicingView: React.FC<Props> = ({
  profile,
  activeCurrency,
  invoices: initialInvoices,
  onAddInvoice,
  onUpdateInvoice,
}) => {
  const [invoices, setInvoices] = useState<SmartInvoice[]>(() => {
    if (initialInvoices && initialInvoices.length > 0) return initialInvoices;
    return LeadSyncService.getStoredInvoices();
  });

  const [availableLeads, setAvailableLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  useEffect(() => {
    const leads = LeadSyncService.getCrmLeads();
    setAvailableLeads(leads);
  }, []);

  const [activeTab, setActiveTab] = useState<"invoices-list" | "create-invoice" | "escrow-vault">("invoices-list");
  const [selectedInvoice, setSelectedInvoice] = useState<SmartInvoice | null>(invoices[0] || null);

  // New Invoice Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [dueDate, setDueDate] = useState("2026-08-30");
  const [invCurrency, setInvCurrency] = useState<CurrencyCode>(activeCurrency || "NGN");
  const [itemsList, setItemsList] = useState<Array<{ description: string; quantity: number; unitPrice: number }>>([
    { description: "Professional Services & Deliverables", quantity: 1, unitPrice: 150000 },
  ]);
  const [taxRate, setTaxRate] = useState(7.5);
  const [discountVal, setDiscountVal] = useState(0);
  const [enableEscrow, setEnableEscrow] = useState(true);

  // Milestone State for new invoice
  const [milestones, setMilestones] = useState<Array<{ title: string; amountPercent: number; dueDate: string }>>([
    { title: "Deposit / Milestone 1: Kickoff & Material Acquisition", amountPercent: 50, dueDate: "2026-08-22" },
    { title: "Milestone 2: Final Delivery & Customer Signoff", amountPercent: 50, dueDate: "2026-08-30" },
  ]);

  const handleSelectLeadToAutoFill = (leadId: string) => {
    setSelectedLeadId(leadId);
    if (!leadId) return;
    const targetLead = availableLeads.find((l) => l.id === leadId);
    if (targetLead) {
      setClientName(targetLead.company ? `${targetLead.company} (${targetLead.name})` : targetLead.name);
      setClientEmail(targetLead.email || "");
      setClientPhone(targetLead.phone || "");
      if (targetLead.dealValue && targetLead.dealValue > 0) {
        setItemsList([
          {
            description: targetLead.notes ? `Enterprise Solution: ${targetLead.notes.slice(0, 45)}...` : "Custom Business Package",
            quantity: 1,
            unitPrice: targetLead.dealValue,
          },
        ]);
      }
    }
  };

  const handleAddItemRow = () => {
    setItemsList([...itemsList, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItemRow = (idx: number) => {
    setItemsList(itemsList.filter((_, i) => i !== idx));
  };

  const subtotal = itemsList.reduce((s, it) => s + (it.quantity * it.unitPrice || 0), 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = Math.max(0, subtotal + taxAmount - discountVal);

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const newInv: SmartInvoice = {
      id: "inv_" + Date.now(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: clientName || "Corporate Client",
      clientEmail: clientEmail || "client@company.com",
      clientPhone: clientPhone || "+234 800 000 0000",
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: dueDate,
      currency: invCurrency,
      items: itemsList.map((it) => ({
        description: it.description || "Service Item",
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        total: it.quantity * it.unitPrice,
      })),
      subtotal,
      taxPercent: taxRate,
      discountAmount: discountVal,
      totalAmount: total,
      paidAmount: 0,
      status: "SENT",
      isEscrowProtected: enableEscrow,
      escrowMilestones: enableEscrow
        ? milestones.map((m, i) => ({
            id: "m_" + i,
            title: m.title,
            description: "Verified delivery signoff required.",
            amount: (total * m.amountPercent) / 100,
            dueDate: m.dueDate,
            status: i === 0 ? "PENDING_FUNDING" : "PENDING_FUNDING",
          }))
        : undefined,
      paymentLink: `https://pay.bizpilot.io/inv/INV-${Math.floor(1000 + Math.random() * 9000)}`,
      notes: enableEscrow
        ? "Secured by BizPilot CBN-Regulated Milestone Escrow Vault."
        : "Standard direct invoice payment.",
      qrCodeVerification: "QR_HASH_" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      whatsappChaserHistory: [],
    };

    const updated = LeadSyncService.saveInvoice(newInv, true);
    setInvoices(updated);
    setSelectedInvoice(newInv);
    onAddInvoice?.(newInv);
    setSyncFeedback(`✓ Invoice #${newInv.invoiceNumber} saved & synced to CRM Pipeline as Proposal!`);
    setTimeout(() => setSyncFeedback(null), 4000);
    setActiveTab("invoices-list");
  };

  const handleSendWhatsAppChaser = (inv: SmartInvoice, tone: "cordial" | "urgent" | "final") => {
    let msg = "";
    if (tone === "cordial") {
      msg = `Hello ${inv.clientName}! 👋 This is a friendly note regarding Invoice #${inv.invoiceNumber} (${inv.currency} ${inv.totalAmount.toLocaleString()}) from ${profile.name}. You can review and complete secure payment here: ${inv.paymentLink}`;
    } else if (tone === "urgent") {
      msg = `Dear ${inv.clientName}, payment for Invoice #${inv.invoiceNumber} (${inv.currency} ${inv.totalAmount.toLocaleString()}) is due on ${inv.dueDate}. Please click here to settle: ${inv.paymentLink}. Thank you!`;
    } else {
      msg = `URGENT NOTICE: Invoice #${inv.invoiceNumber} (${inv.currency} ${inv.totalAmount.toLocaleString()}) is now overdue. Please remit payment immediately via ${inv.paymentLink} to avoid service pause.`;
    }

    const cleanPhone = inv.clientPhone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Smart Invoicing, Escrow & Contracts Studio
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> CBN-Regulated Escrow Trust
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Issue verified invoices, lock client funds in milestone escrow, and dispatch 1-touch WhatsApp payment chasers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("create-invoice")}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Create New Smart Invoice
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {[
          { id: "invoices-list", label: "Invoices & WhatsApp Chasers", icon: FileText },
          { id: "create-invoice", label: "Invoice & Escrow Builder", icon: Plus },
          { id: "escrow-vault", label: "Milestone Escrow Vault", icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Cross-Module Sync Toast */}
      {syncFeedback && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syncFeedback}</span>
        </div>
      )}

      {/* TAB 1: INVOICES & WHATSAPP CHASERS */}
      {activeTab === "invoices-list" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Invoice list (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Invoices</h3>
            {invoices.map((inv) => (
              <div
                key={inv.id}
                onClick={() => setSelectedInvoice(inv)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedInvoice?.id === inv.id
                    ? "border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 shadow-xs"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">
                    {inv.invoiceNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      inv.status === "PAID"
                        ? "bg-emerald-100 text-emerald-800"
                        : inv.status === "PARTIALLY_PAID"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {inv.status.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                  {inv.clientName}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500">Total: <strong className="text-slate-900 dark:text-white">{inv.currency} {inv.totalAmount.toLocaleString()}</strong></span>
                  {inv.isEscrowProtected && (
                    <span className="text-[11px] text-teal-600 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Escrow Protected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Selected Invoice Preview & 1-Click Chaser (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {selectedInvoice ? (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                {/* Top Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-teal-600">{selectedInvoice.invoiceNumber}</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white">{selectedInvoice.clientName}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print / PDF
                    </button>
                    <button
                      onClick={() => {
                        LeadSyncService.saveInvoice(selectedInvoice, true);
                        setSyncFeedback(`✓ Invoice #${selectedInvoice.invoiceNumber} successfully synced into CRM Pipeline!`);
                        setTimeout(() => setSyncFeedback(null), 3500);
                      }}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-lg flex items-center gap-1.5"
                      title="Sync client details and invoice amount directly into CRM deals"
                    >
                      <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Sync CRM
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedInvoice.paymentLink)}
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Payment Link
                    </button>
                  </div>
                </div>

                {/* WhatsApp Chaser Actions */}
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-600" /> 1-Click WhatsApp Payment Chaser
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{selectedInvoice.clientPhone}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => handleSendWhatsAppChaser(selectedInvoice, "cordial")}
                      className="px-3 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                    >
                      🤝 Send Friendly Note
                    </button>
                    <button
                      onClick={() => handleSendWhatsAppChaser(selectedInvoice, "urgent")}
                      className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-lg hover:bg-amber-600"
                    >
                      ⏰ Due Date Reminder
                    </button>
                    <button
                      onClick={() => handleSendWhatsAppChaser(selectedInvoice, "final")}
                      className="px-3 py-1 bg-rose-600 text-white text-xs font-medium rounded-lg hover:bg-rose-700"
                    >
                      ⚠️ Overdue Final Notice
                    </button>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-3">Item Description</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Unit Price</th>
                        <th className="p-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedInvoice.items.map((it, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{it.description}</td>
                          <td className="p-3 text-center">{it.quantity}</td>
                          <td className="p-3 text-right">{selectedInvoice.currency} {it.unitPrice.toLocaleString()}</td>
                          <td className="p-3 text-right font-bold">{selectedInvoice.currency} {it.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-64 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal:</span>
                      <span>{selectedInvoice.currency} {selectedInvoice.subtotal.toLocaleString()}</span>
                    </div>
                    {selectedInvoice.taxPercent > 0 && (
                      <div className="flex justify-between text-slate-500">
                        <span>VAT ({selectedInvoice.taxPercent}%):</span>
                        <span>{selectedInvoice.currency} {((selectedInvoice.subtotal * selectedInvoice.taxPercent) / 100).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span>Total Due:</span>
                      <span className="text-teal-600">{selectedInvoice.currency} {selectedInvoice.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">Select an invoice to preview.</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CREATE INVOICE */}
      {activeTab === "create-invoice" && (
        <form onSubmit={handleSaveInvoice} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create New Smart Invoice with Escrow</h3>
              <p className="text-xs text-slate-500">Set payment milestones, tax rates, and client contact details.</p>
            </div>

            {availableLeads.length > 0 && (
              <div className="flex items-center gap-2 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 px-3 py-1.5 rounded-xl">
                <Users className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span className="text-[11px] font-bold text-teal-900 dark:text-teal-200 shrink-0">Auto-fill Lead:</span>
                <select
                  value={selectedLeadId}
                  onChange={(e) => handleSelectLeadToAutoFill(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-teal-900 dark:text-teal-100 focus:outline-none cursor-pointer max-w-[200px] truncate"
                >
                  <option value="">Select CRM Lead / Deal...</option>
                  {availableLeads.map((l) => (
                    <option key={l.id} value={l.id} className="text-slate-900 bg-white">
                      {l.name} ({l.company || l.source}) - {l.currency} {l.dealValue.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Client Full Name / Company</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Dangote Cement Plc"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Client WhatsApp Phone</label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Invoice Currency</label>
              <select
                value={invCurrency}
                onChange={(e) => setInvCurrency(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="NGN">NGN (₦ Nigerian Naira)</option>
                <option value="USD">USD ($ US Dollar)</option>
                <option value="EUR">EUR (€ Euro)</option>
                <option value="GBP">GBP (£ British Pound)</option>
                <option value="KES">KES (KSh Kenyan Shilling)</option>
                <option value="ZAR">ZAR (R South African Rand)</option>
                <option value="GHS">GHS (GH₵ Ghanaian Cedi)</option>
              </select>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Itemized Line Items</label>
              <button
                type="button"
                onClick={handleAddItemRow}
                className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Item Line
              </button>
            </div>

            {itemsList.map((it, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Service / Product Description"
                  value={it.description}
                  onChange={(e) => {
                    const copy = [...itemsList];
                    copy[idx].description = e.target.value;
                    setItemsList(copy);
                  }}
                  className="flex-3 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Qty"
                  value={it.quantity}
                  onChange={(e) => {
                    const copy = [...itemsList];
                    copy[idx].quantity = Number(e.target.value);
                    setItemsList(copy);
                  }}
                  className="w-20 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Unit Price"
                  value={it.unitPrice}
                  onChange={(e) => {
                    const copy = [...itemsList];
                    copy[idx].unitPrice = Number(e.target.value);
                    setItemsList(copy);
                  }}
                  className="w-32 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
                {itemsList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItemRow(idx)}
                    className="p-2 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Milestone Escrow Toggle */}
          <div className="p-4 bg-teal-50/50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enableEscrow}
                onChange={(e) => setEnableEscrow(e.target.checked)}
                className="rounded-sm text-teal-600 focus:ring-teal-500"
              />
              <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-teal-600" /> Enable Milestone-Based Escrow Protection (50% Deposit / 50% Signoff)
              </span>
            </label>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Buyer funds are safely locked in an escrow account and released only when deliverables are verified by client.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab("invoices-list")}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Generate & Issue Smart Invoice (Total: {invCurrency} {total.toLocaleString()})
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: ESCROW VAULT */}
      {activeTab === "escrow-vault" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              CBN-Regulated Milestone Escrow Vault
            </h3>
            <p className="text-xs text-slate-500">
              Protect your business and high-ticket clients with neutral third-party settlement escrow holding funds until work milestones are signed off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="text-xs text-slate-500 font-bold uppercase">Funds Currently in Escrow Trust</div>
              <div className="text-2xl font-black text-teal-600">₦361,125</div>
              <div className="text-xs text-slate-400">Locked for Invoice #INV-2026-0891 (Milestone 2)</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="text-xs text-slate-500 font-bold uppercase">Total Released Escrow Payouts</div>
              <div className="text-2xl font-black text-emerald-600">₦500,000</div>
              <div className="text-xs text-slate-400">Auto-settled into corporate bank account</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
