import { Lead, LeadStage } from "../types";
import { ProspectRecord, DynamicSegment } from "../types/intelligence";

export interface SyncResult {
  addedCount: number;
  totalCrmCount: number;
  existingSkipped: number;
}

/**
 * Universal Data Bus and Synchronization Bridge for BizPilot OS
 * Seamlessly connects:
 * 1. Omni-Channel Social Scout & AI Prospect Intelligence
 * 2. CRM Pipeline & Sales Stages
 * 3. Bulk Email Broadcaster & Dynamic Segments
 * 4. WhatsApp Command Center
 * 5. Smart Invoicing & Client Billing
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
