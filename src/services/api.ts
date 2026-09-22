import { BusinessProfile } from "../types";

export interface GenerateAiOptions {
  agent?: string;
  task?: string;
  prompt: string;
  businessProfile?: BusinessProfile | null;
  systemInstruction?: string;
  temperature?: number;
}

export interface GenerateAiResponse {
  success: boolean;
  agent: string;
  output: string;
  modelUsed: string;
  tokensEstimated: number;
  costEstimated: number;
  isFallback?: boolean;
}

export interface DomainCheckResult {
  domain: string;
  tld: string;
  available: boolean;
  pricing: { price: string; renewal: string };
  registrars: Array<{ name: string; url: string }>;
}

export async function generateAiContent(options: GenerateAiOptions): Promise<GenerateAiResponse> {
  try {
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.warn("AI generation network error, falling back locally:", error);
    return {
      success: true,
      agent: options.agent || "Business Manager",
      output: `### AI Directive for ${options.businessProfile?.name || "Your Business"}

Here is an actionable strategy tailored to your current milestone:
1. **Immediate Execution Priority:** Focus on customer acquisition and direct WhatsApp conversions.
2. **Channel Optimization:** Deploy high-converting landing copy and automated follow-up sequences.
3. **Next Step:** Select any specialized agent from the left sidebar to generate production-ready copy, code, or campaigns.`,
      modelUsed: "bizpilot-local-engine",
      tokensEstimated: 120,
      costEstimated: 0,
      isFallback: true,
    };
  }
}

export interface DomainSearchResultItem {
  domain: string;
  tld: string;
  available: boolean;
  pricing: {
    price: string;
    renewal: string;
    priceNgn: number;
    priceUsd: number;
    renewalNgn: number;
    renewalUsd: number;
  };
  badge?: string;
  category: "Popular" | "African Local" | "Tech & AI" | "Commerce";
  includedFree: string[];
}

export interface DomainSearchResponse {
  success: boolean;
  domainName: string;
  results: DomainSearchResultItem[];
  aiSuggestions?: Array<{
    domain: string;
    priceNgn: number;
    priceUsd: number;
    reason: string;
  }>;
}

export async function searchDomains(domainName: string): Promise<DomainSearchResponse> {
  try {
    const res = await fetch("/api/domain/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domainName }),
    });

    if (!res.ok) {
      throw new Error("Failed to check domain");
    }

    return await res.json();
  } catch (err) {
    console.error("Domain search error:", err);
    return {
      success: false,
      domainName,
      results: [],
      aiSuggestions: [],
    };
  }
}

export async function checkDomainAvailability(domainName: string): Promise<any[]> {
  const data = await searchDomains(domainName);
  return data.results || [];
}

export async function registerDomain(registrationData: {
  domain: string;
  periodYears?: number;
  paymentMethod?: string;
  businessName?: string;
  enableAutoRenew?: boolean;
  enablePrivacy?: boolean;
}) {
  try {
    const res = await fetch("/api/domains/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });
    return await res.json();
  } catch (err) {
    console.error("Register domain error:", err);
    return { success: false, error: "Failed to register domain" };
  }
}

export async function lookupWhois(domain: string) {
  try {
    const res = await fetch("/api/domains/whois", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    });
    return await res.json();
  } catch (err) {
    console.error("WHOIS lookup error:", err);
    return { success: false, error: "WHOIS lookup failed" };
  }
}

export async function bulkCheckDomains(domains: string[]) {
  try {
    const res = await fetch("/api/domains/bulk-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domains }),
    });
    return await res.json();
  } catch (err) {
    console.error("Bulk check error:", err);
    return { success: false, results: [] };
  }
}

export async function appraiseDomain(domain: string) {
  try {
    const res = await fetch("/api/domains/valuation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    });
    return await res.json();
  } catch (err) {
    console.error("Domain appraisal error:", err);
    return { success: false };
  }
}

export async function initiateDomainTransfer(transferData: { domain: string; authCode: string; currentRegistrar?: string }) {
  try {
    const res = await fetch("/api/domains/transfer/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transferData),
    });
    return await res.json();
  } catch (err) {
    console.error("Domain transfer error:", err);
    return { success: false, error: "Failed to initiate transfer" };
  }
}

export async function fetchHostingFiles() {
  try {
    const res = await fetch("/api/hosting/files");
    return await res.json();
  } catch (err) {
    console.error("Fetch files error:", err);
    return { success: false, files: [] };
  }
}

export async function createHostingDatabase(data: { dbName: string; dbUser: string; dbType?: string }) {
  try {
    const res = await fetch("/api/hosting/database/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Create DB error:", err);
    return { success: false };
  }
}

export async function createHostingCronJob(data: { title: string; command: string; schedule: string; readableSchedule?: string }) {
  try {
    const res = await fetch("/api/hosting/cron/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Create Cron error:", err);
    return { success: false };
  }
}

export async function installWordPressSite(data: { domain: string; siteTitle: string; adminEmail: string; adminUsername?: string }) {
  try {
    const res = await fetch("/api/hosting/wordpress/install", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Install WordPress error:", err);
    return { success: false };
  }
}

export async function checkEmailDeliverability(domain: string) {
  try {
    const res = await fetch("/api/email/diagnostics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    });
    return await res.json();
  } catch (err) {
    console.error("Email diagnostics error:", err);
    return { success: false };
  }
}

export async function fetchInfraNodes() {
  try {
    const res = await fetch("/api/infra/nodes");
    return await res.json();
  } catch (err) {
    console.error("Infra nodes fetch error:", err);
    return { success: false, nodes: [] };
  }
}

export async function fetchServerTelemetry() {
  try {
    const res = await fetch("/api/hosting/server-telemetry");
    return await res.json();
  } catch (err) {
    console.error("Server telemetry error:", err);
    return null;
  }
}

export async function submitLeadCapture(leadData: {
  name: string;
  email?: string;
  phone?: string;
  source?: string;
  message?: string;
}) {
  try {
    const res = await fetch("/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });
    return await res.json();
  } catch (err) {
    console.error("Lead capture error:", err);
    return { success: false };
  }
}

export interface AdminMetrics {
  activeBusinesses: number;
  totalWebsitesCreated: number;
  monthlyTokensUsed: number;
  monthlyAiCostUsd: number;
}

export async function fetchAdminMetrics(): Promise<AdminMetrics | null> {
  try {
    const res = await fetch("/api/admin/metrics");
    return await res.json();
  } catch (err) {
    console.error("Admin metrics fetch error:", err);
    return null;
  }
}

export const getAdminMetrics = fetchAdminMetrics;

// ==========================================
// AI Prospect Segmentation & Intelligence Engine Client API
// ==========================================

export async function classifyProspectsAi(prospects: any[], products: any[]) {
  try {
    const res = await fetch("/api/intelligence/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prospects, products }),
    });
    if (!res.ok) throw new Error("Classification request failed");
    return await res.json();
  } catch (err) {
    console.warn("Classification client call failed, using fallback:", err);
    return { success: false, results: [] };
  }
}

export async function parseNaturalSegmentQuery(query: string) {
  try {
    const res = await fetch("/api/intelligence/natural-segment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error("Natural segment query failed");
    return await res.json();
  } catch (err) {
    console.warn("Natural segment parse error:", err);
    return { success: false, result: null };
  }
}

export async function personalizeOutreachEmail(params: {
  prospect: any;
  product: any;
  stepNumber?: number;
  senderName?: string;
}) {
  try {
    const res = await fetch("/api/intelligence/personalize-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Personalize email request failed");
    return await res.json();
  } catch (err) {
    console.warn("Personalize email error:", err);
    return { success: false, result: null };
  }
}

export async function analyzeCampaignPerformance(params: {
  campaign: any;
  segment?: any;
}) {
  try {
    const res = await fetch("/api/intelligence/analyze-campaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Campaign analysis request failed");
    return await res.json();
  } catch (err) {
    console.warn("Campaign analysis error:", err);
    return { success: false, analysis: null };
  }
}

export async function discoverNichesAndPersonasAi(industryOrKeyword: string) {
  try {
    const res = await fetch("/api/intelligence/discover-niches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ industryOrKeyword }),
    });
    if (!res.ok) throw new Error("Niche discovery request failed");
    return await res.json();
  } catch (err) {
    console.warn("Niche discovery error:", err);
    return { success: false, niches: [], painPoints: [], personas: [] };
  }
}

export async function scoutSocialLeadsAi(params: {
  platforms: string[];
  countries: string[];
  targetVolume: number;
  industry?: string;
  niche?: string;
  subNiche?: string;
  painKeywords?: string[];
}) {
  try {
    const res = await fetch("/api/intelligence/scout-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Social scout request failed");
    return await res.json();
  } catch (err) {
    console.warn("Social scout API error:", err);
    return { success: false, sampleProspects: [], metrics: null };
  }
}


