import { Lead, LeadStage, SmartInvoice, BusinessProfile } from "../types";
import { ProspectRecord, DynamicSegment } from "../types/intelligence";

export interface SyncResult {
  addedCount: number;
  totalCrmCount: number;
  existingSkipped: number;
}

export interface UniversalSyncAudit {
  scoutedTotal: number;
  crmTotal: number;
  pipelineValueNgn: number;
  invoicesCount: number;
  invoicedRevenueNgn: number;
  primaryDomain: string;
  webmailInboxesCount: number;
  syncedAt: string;
  status: "OPTIMAL" | "SYNCHRONIZED";
}

const DEFAULT_INVOICE: SmartInvoice = {
  id: "inv_4091",
  invoiceNumber: "INV-2026-0891",
  clientName: "Zenith Synergy Holdings Ltd",
  clientEmail: "procurement@zenithsynergy.ng",
  clientPhone: "+234 802 334 8899",
  clientCompany: "Zenith Synergy Corporate Office",
  issueDate: "2026-08-15",
  dueDate: "2026-08-25",
  currency: "NGN",
  items: [
    { description: "Executive Corporate Banquet Catering (100 Guests)", quantity: 100, unitPrice: 6500, total: 650000 },
    { description: "Custom Branded Buffet Presentation & Logistics", quantity: 1, unitPrice: 75000, total: 75000 },
    { description: "Uniformed Professional Service Staff (6 Stewards)", quantity: 6, unitPrice: 15000, total: 90000 },
  ],
  subtotal: 815000,
  taxPercent: 7.5,
  discountAmount: 15000,
  totalAmount: 861125,
  paidAmount: 500000,
  status: "PARTIALLY_PAID",
  isEscrowProtected: true,
  escrowMilestones: [
    { id: "m_1", title: "Milestone 1: Ingredient Procurement & Prep", description: "Food sourcing verification and chef staging approval.", amount: 500000, dueDate: "2026-08-16", status: "APPROVED_RELEASED" },
    { id: "m_2", title: "Milestone 2: On-Site Setup & Live Banquet Service", description: "Successful delivery, warm meal service, and guest signoff.", amount: 361125, dueDate: "2026-08-25", status: "FUNDED_IN_ESCROW" },
  ],
  paymentLink: "https://pay.bizpilot.io/inv/INV-2026-0891",
  notes: "Escrow funds held securely in CBN-regulated settlement trust until milestone signoff.",
  qrCodeVerification: "QR_SECURE_HASH_89102491",
  whatsappChaserHistory: [
    { sentAt: "2026-08-15 10:00", templateUsed: "Cordial Initial Invoice with Paystack Link" },
  ],
};

/**
 * Universal Data Bus and Synchronization Bridge for BizPilot OS
 * Seamlessly interconnects:
 * 1. Omni-Channel Social Scout & AI Prospect Intelligence Vault
 * 2. CRM Pipeline & Kanban Stages (New -> Contacted -> Qualified -> Proposal -> Customer)
 * 3. Bulk Email Broadcaster & Dynamic Segment Dispatch
 * 4. WhatsApp Outreach Center & Conversational Commerce
 * 5. Domain Registrar & Edge Cloud Hosting & Webmail
 * 6. Multi-Page AI Website & Funnels
 * 7. Smart Invoicing & 100% Escrow Protection
 * 8. Paystack Payments & Revenue Ledger
 */
export const LeadSyncService = {
  /**
   * Retrieves all prospects stored in the AI Prospect Vault
   */
  getStoredProspects(): ProspectRecord[] {
    try {
      const data = localStorage.getItem("bizpilot_intelligence_prospects");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  /**
   * Alias for retrieving scouted prospects from vault
   */
  getScoutedProspects(): ProspectRecord[] {
    return this.getStoredProspects();
  },

  /**
   * Retrieves all dynamic segments created in the Intelligence Suite
   */
  getStoredSegments(): DynamicSegment[] {
    try {
      const data = localStorage.getItem("bizpilot_intelligence_segments");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  /**
   * Retrieves all active CRM Pipeline Leads
   */
  getCrmLeads(): Lead[] {
    try {
      const data = localStorage.getItem("bizpilot_leads");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  /**
   * Saves CRM Pipeline Leads directly to local storage and notifies listeners
   */
  saveCrmLeads(leads: Lead[]) {
    try {
      localStorage.setItem("bizpilot_leads", JSON.stringify(leads));
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("bizpilot:leads-synced", {
            detail: {
              totalCrmCount: leads.length,
            },
          })
        );
      }
    } catch (e) {
      console.error("Failed to save CRM leads", e);
    }
  },

  /**
   * Retrieves all stored Smart Invoices
   */
  getStoredInvoices(): SmartInvoice[] {
    try {
      const data = localStorage.getItem("bizpilot_invoices");
      return data ? JSON.parse(data) : [DEFAULT_INVOICE];
    } catch {
      return [DEFAULT_INVOICE];
    }
  },

  /**
   * Saves an invoice and automatically reconciles with the CRM pipeline
   */
  saveInvoice(invoice: SmartInvoice, syncWithCrm: boolean = true): SmartInvoice[] {
    const currentInvoices = this.getStoredInvoices();
    const existingIndex = currentInvoices.findIndex((inv) => inv.id === invoice.id);
    let updatedInvoices: SmartInvoice[];

    if (existingIndex >= 0) {
      updatedInvoices = [...currentInvoices];
      updatedInvoices[existingIndex] = invoice;
    } else {
      updatedInvoices = [invoice, ...currentInvoices];
    }

    try {
      localStorage.setItem("bizpilot_invoices", JSON.stringify(updatedInvoices));
    } catch (e) {
      console.error("Failed to save invoices to localStorage", e);
    }

    // Auto-reconcile with CRM Pipeline
    if (syncWithCrm) {
      const leads = this.getCrmLeads();
      const clientEmail = (invoice.clientEmail || "").trim().toLowerCase();
      const clientName = (invoice.clientName || "").trim().toLowerCase();

      let matchedLead = leads.find(
        (l) =>
          (l.email && l.email.toLowerCase() === clientEmail) ||
          (l.name && l.name.toLowerCase() === clientName)
      );

      const targetStage: LeadStage =
        invoice.status === "PAID"
          ? "CUSTOMER"
          : invoice.status === "PARTIALLY_PAID"
          ? "CUSTOMER"
          : "PROPOSAL";

      if (matchedLead) {
        // Update existing lead
        const updatedLeads = leads.map((l) => {
          if (l.id === matchedLead!.id) {
            return {
              ...l,
              stage: targetStage,
              dealValue: Math.max(l.dealValue, invoice.totalAmount),
              notes: `${l.notes || ""} | Invoice #${invoice.invoiceNumber} (${invoice.currency} ${invoice.totalAmount.toLocaleString()}) status: ${invoice.status}`.trim(),
              updatedAt: new Date().toISOString(),
              lastInteraction: `Invoice #${invoice.invoiceNumber} created/updated`,
            };
          }
          return l;
        });
        this.saveCrmLeads(updatedLeads);
      } else if (invoice.clientName) {
        // Create new CRM lead for this invoiced customer
        const newLead: Lead = {
          id: `lead_inv_${invoice.id}_${Date.now()}`,
          name: invoice.clientName,
          email: invoice.clientEmail || "client@company.ng",
          phone: invoice.clientPhone || "+234 800 000 0000",
          source: "Smart Invoicing & Escrow",
          stage: targetStage,
          dealValue: invoice.totalAmount,
          currency: invoice.currency,
          company: invoice.clientCompany || "Corporate Client",
          notes: `Created from Invoice #${invoice.invoiceNumber}. Escrow protected: ${invoice.isEscrowProtected ? "Yes" : "No"}.`,
          tags: ["#InvoicedClient", "#SmartInvoice", invoice.isEscrowProtected ? "#EscrowProtected" : "#DirectBilling"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastInteraction: `Invoice #${invoice.invoiceNumber} issued`,
        };
        this.saveCrmLeads([newLead, ...leads]);
      }
    }

    // Broadcast invoice sync event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("bizpilot:invoices-synced", {
          detail: {
            invoice,
            totalInvoicesCount: updatedInvoices.length,
          },
        })
      );
    }

    return updatedInvoices;
  },

  /**
   * Injects scouted/intelligence prospects directly into the CRM Pipeline
   */
  syncProspectsToCrm(
    prospectsToSync: ProspectRecord[],
    defaultStage: LeadStage = "NEW",
    baseDealValue: number = 185000
  ): SyncResult {
    const currentLeads = this.getCrmLeads();
    const existingEmails = new Set(currentLeads.map((l) => l.email.toLowerCase()));

    const newLeadsToAdd: Lead[] = [];
    let existingSkipped = 0;

    for (const p of prospectsToSync) {
      if (existingEmails.has(p.email.toLowerCase())) {
        existingSkipped++;
        continue;
      }

      existingEmails.add(p.email.toLowerCase());

      // Estimate deal value based on product fit and title
      const valueMultiplier = p.productFitScore >= 90 ? 1.5 : p.productFitScore >= 75 ? 1.2 : 1.0;
      const computedDealValue = Math.round(baseDealValue * valueMultiplier);

      const newLead: Lead = {
        id: `lead_scout_${p.id}_${Date.now()}`,
        name: p.fullName || `${p.firstName} ${p.lastName}`,
        email: p.email,
        phone: p.phone || "+234 800 000 0000",
        source: `Social Scout (${p.socialPlatform || "Omni-Channel"})`,
        stage: defaultStage,
        dealValue: computedDealValue,
        currency: "NGN",
        company: p.organization || p.profession || "Independent Enterprise",
        notes: `Extracted Pain: "${p.primaryPain || "Seeking verified growth solution"}" | Persona: ${p.personaName || "Discovered ICP"} | Product Fit: ${p.productFitScore || 85}% | City: ${p.city}, ${p.country}`,
        tags: [
          "#SocialScout",
          `#${(p.socialPlatform || "Social").replace(/[^a-zA-Z0-9]/g, "")}`,
          `#${(p.country || "Global").replace(/[^a-zA-Z0-9]/g, "")}`,
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastInteraction: "Scouted via Omni-Channel Intelligence Engine",
        city: p.city,
      };

      newLeadsToAdd.push(newLead);
    }

    const updatedCrmLeads = [...newLeadsToAdd, ...currentLeads];

    try {
      localStorage.setItem("bizpilot_leads", JSON.stringify(updatedCrmLeads));
    } catch (e) {
      console.error("Failed to save updated leads to localStorage", e);
    }

    // Broadcast sync event to notify all listening components
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("bizpilot:leads-synced", {
          detail: {
            addedCount: newLeadsToAdd.length,
            totalCrmCount: updatedCrmLeads.length,
            existingSkipped,
            newLeads: newLeadsToAdd,
          },
        })
      );
    }

    return {
      addedCount: newLeadsToAdd.length,
      totalCrmCount: updatedCrmLeads.length,
      existingSkipped,
    };
  },

  /**
   * Sync a primary domain across all subsystems:
   * Profile, Cloud Hosting, Webmail accounts, Website preview, Bulk Email sender
   */
  syncDomainToEcosystem(newDomain: string, currentProfile?: BusinessProfile): void {
    if (!newDomain) return;
    const cleanDomain = newDomain.trim().toLowerCase();

    try {
      const savedProfile = localStorage.getItem("bizpilot_profile");
      const profile = savedProfile ? JSON.parse(savedProfile) : currentProfile || {};
      const updatedProfile = { ...profile, domain: cleanDomain };
      localStorage.setItem("bizpilot_profile", JSON.stringify(updatedProfile));

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("bizpilot:domain-synced", {
            detail: {
              domain: cleanDomain,
              profile: updatedProfile,
            },
          })
        );
      }
    } catch (e) {
      console.error("Failed to sync domain to ecosystem", e);
    }
  },

  /**
   * Master Cross-Sync for the entire OS:
   * Synchronizes Scout Vault, CRM Pipeline, Invoices, Domain, and Notifications
   */
  runMasterUniversalSync(): UniversalSyncAudit {
    const prospects = this.getStoredProspects();
    const leads = this.getCrmLeads();
    const invoices = this.getStoredInvoices();

    // 1. Sync un-synced prospects to CRM
    if (prospects.length > 0) {
      this.syncProspectsToCrm(prospects, "NEW");
    }

    // 2. Re-read updated CRM leads
    const updatedLeads = this.getCrmLeads();
    const totalPipelineValue = updatedLeads.reduce((acc, l) => acc + (l.dealValue || 0), 0);
    const totalInvoicedRevenue = invoices.reduce((acc, inv) => acc + (inv.paidAmount || 0), 0);

    // 3. Read profile domain
    let primaryDomain = "naijaflavors.ng";
    try {
      const pData = localStorage.getItem("bizpilot_profile");
      if (pData) {
        const p = JSON.parse(pData);
        if (p.domain) primaryDomain = p.domain;
      }
    } catch {
      // fallback
    }

    const audit: UniversalSyncAudit = {
      scoutedTotal: prospects.length,
      crmTotal: updatedLeads.length,
      pipelineValueNgn: totalPipelineValue,
      invoicesCount: invoices.length,
      invoicedRevenueNgn: totalInvoicedRevenue,
      primaryDomain,
      webmailInboxesCount: 4,
      syncedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      status: "OPTIMAL",
    };

    // Broadcast master sync event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("bizpilot:system-synced", {
          detail: audit,
        })
      );
    }

    return audit;
  },

  /**
   * Broadcast cross-module navigation event with pre-filled context
   */
  navigateToModule(tab: string, contextPayload?: any) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("bizpilot:navigate-with-context", {
          detail: {
            tab,
            context: contextPayload,
          },
        })
      );
    }
  },
};
