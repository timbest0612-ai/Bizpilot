export type ConfidenceLevel = "High" | "Medium" | "Low";

export type MarketingEligibility = "Eligible" | "Suppressed" | "Invalid" | "Needs Review";

export type ConsentBasis =
  | "Public Professional Profile (Legitimate Interest)"
  | "Direct Inquiry / Inbound Request"
  | "Verified Public Directory"
  | "Explicit Opt-in Consent"
  | "Soft Opt-in / Prior Business Relationship"
  | "Unverified / Unknown";

export type SuppressionReason =
  | "Unsubscribed"
  | "Hard bounce"
  | "Spam complaint"
  | "Invalid address"
  | "Manually blocked"
  | "Compliance restriction"
  | "Duplicate record";

export type BuyingIntentLevel = "High" | "Medium" | "Low" | "Unknown";

export interface ScoreBreakdown {
  painMatch: number;
  personaMatch: number;
  professionMatch: number;
  industryMatch: number;
  intentSignals: number;
  interestMatch: number;
  geographicMatch: number;
  engagementHistory: number;
  total: number;
  reasons: string[];
}

export interface MatchedProduct {
  productId: string;
  productName: string;
  fitScore: number;
  reasons: string[];
  recommendedOffer: string;
}

export interface ProspectRecord {
  // 1. Prospect Basics
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  stateProvince?: string;
  city: string;
  timezone: string;
  socialPlatform:
    | "LinkedIn"
    | "Twitter/X"
    | "Instagram"
    | "TikTok"
    | "YouTube"
    | "Pinterest"
    | "Facebook"
    | "Forums/Reddit"
    | "Blogs"
    | "Snapchat"
    | "GitHub"
    | "Personal Website"
    | "Public Directory"
    | string;
  profileUrl: string;
  sourceUrl: string;
  sourceType:
    | "Public Directory"
    | "Social Network"
    | "Company Website"
    | "Professional Association"
    | "Inbound Contact"
    | "Social Scout Harvester"
    | "Forum Community"
    | "Creator Channel"
    | string;
  collectionDate: string;
  niche?: string;
  subNiche?: string;

  // 2. Professional Intelligence
  primaryCategory: string;
  industry: string;
  profession: string;
  jobTitle: string;
  specialization?: string;
  seniority: "Founder / C-Level" | "Executive / Director" | "Senior Manager" | "Mid-Level Professional" | "Entry / Associate" | "Freelancer / Independent" | "Academic / Researcher";
  organization: string;
  organizationSize: "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";
  employmentType: "Self-Employed" | "Full-time" | "Contractor" | "Partner" | "Other";

  // 3. Pain Intelligence
  painCategory: string;
  primaryPain: string;
  secondaryPains: string[];
  painDescription: string;
  painEvidence: string;
  painSeverity: "Critical" | "High" | "Moderate" | "Low";
  painConfidence: number; // 0.0 - 1.0

  // 4. Persona Intelligence
  personaName: string;
  personaDescription: string;
  goals: string[];
  challenges: string[];
  interests: string[];
  likelyNeeds: string[];

  // 5. Buyer Intelligence
  productFitScore: number; // 0 - 100
  buyingIntent: BuyingIntentLevel;
  purchaseReadiness: "Immediate" | "Evaluating Options" | "Problem Aware" | "Unaware / Cold";
  relevanceReason: string;
  scoreBreakdown: ScoreBreakdown;
  matchedProducts: MatchedProduct[];
  recommendedOffer: string;

  // 6. Campaign Intelligence
  segmentId?: string;
  campaignId?: string;
  campaignStatus: "Not Contacted" | "Queued" | "Contacted" | "Engaged" | "Converted" | "Suppressed";
  contactStatus: "Eligible" | "In Active Sequence" | "Completed Sequence" | "Opted Out" | "Bounced";
  lastContacted?: string;
  nextFollowup?: string;
  emailsSent: number;
  emailsDelivered: number;
  opens: number;
  clicks: number;
  replies: number;
  positiveReplies: number;
  unsubscribed: boolean;
  bounced: boolean;
  complained: boolean;
  converted: boolean;

  // 7. Compliance
  consentStatus: ConsentBasis;
  marketingEligibility: MarketingEligibility;
  unsubscribeStatus: boolean;
  suppressionStatus: boolean;
  doNotContact: boolean;
  suppressionReason?: SuppressionReason;

  // 8. AI Metadata
  classificationModel: string;
  classificationDate: string;
  classificationConfidence: ConfidenceLevel;
  confidenceScore: number; // 0.0 - 1.0
  humanOverride: boolean;
  overrideNotes?: string;
  lastAiUpdate: string;
}

export interface ProductRecord {
  id: string;
  name: string;
  tagline: string;
  description: string;
  targetAudience: string[] | string;
  targetProfessions: string[];
  targetIndustries?: string[];
  painPointsSolved?: string[];
  targetPainCategories?: string[];
  targetPersonas?: string[];
  keywords?: string[];
  geography?: string[];
  price: number;
  currency: string;
  productType?: "Digital Product / Course" | "SaaS / Software" | "Consulting / Service" | "Physical Product" | "Mastermind / Community" | string;
  landingPage?: string;
  ctaText?: string;
  status?: "active" | "inactive";
  deliveryFormat?: string;
  isActive?: boolean;
  keyFeatures?: string[];
  createdAt?: string;
  scoreWeights?: {
    painWeight: number;
    personaWeight: number;
    professionWeight: number;
    industryWeight: number;
  };
}

export interface SegmentFilterCriteria {
  countries?: string[];
  primaryCategories?: string[];
  professions?: string[];
  industries?: string[];
  painCategories?: string[];
  minProductFit?: number;
  maxProductFit?: number;
  buyingIntents?: BuyingIntentLevel[];
  seniorities?: string[];
  eligibilityStatus?: MarketingEligibility[];
  personas?: string[];
  searchQuery?: string;
  productId?: string;
}

export interface DynamicSegment {
  id: string;
  name: string;
  description: string;
  filters: SegmentFilterCriteria;
  prospectCount: number;
  averageProductFit: number;
  topLocations: string[];
  topProfessions: string[];
  topPainPoints: string[];
  assignedProductId?: string;
  assignedProductName?: string;
  campaignStatus: "No Active Campaign" | "Active Campaign Running" | "Campaign Completed";
  createdAt: string;
  updatedAt: string;
}

export interface SmartSegmentTemplate {
  id: string;
  name: string;
  description: string;
  targetProductSuggestion: string;
  category: "Burnout & Recovery" | "Business & Sales" | "Career & Mobility" | "Creator & Media" | "Leadership & Mission";
  defaultFilters: SegmentFilterCriteria;
  estimatedAudienceSize: string;
}

export interface SequenceStep {
  stepNumber: number;
  title: string;
  delayDays: number;
  subject: string;
  previewText?: string;
  bodyTemplate: string;
  ctaText: string;
  ctaUrl: string;
  stopConditions: {
    onReply: boolean;
    onConversion: boolean;
    onUnsubscribe: boolean;
    onBounce: boolean;
    onComplaint: boolean;
    onManualSuppression: boolean;
  };
}

export interface IntelligenceCampaign {
  id: string;
  name: string;
  productId: string;
  productName: string;
  targetSegmentId: string;
  targetSegmentName: string;
  senderName?: string;
  senderEmail?: string;
  subject?: string;
  sequenceSteps?: SequenceStep[];
  senderProfile?: any;
  sequence?: any;
  stopConditions?: any;
  deliverabilityShield?: any;
  scheduleType?: "One-time broadcast" | "Multi-step sequence" | "Follow-up drip" | string;
  scheduleDate?: string;
  sendingRatePerMinute?: number;
  dailySendingLimit?: number;
  timezone?: string;
  status: "DRAFT" | "QUEUED" | "SENDING" | "PAUSED" | "COMPLETED";
  safeguardsSummary?: {
    totalTargeted: number;
    suppressedCount: number;
    invalidCount: number;
    alreadyContactedCount: number;
    eligibleCount: number;
    checksPassed: boolean;
  };
  stats: {
    recipients: number;
    eligible: number;
    suppressed: number;
    sent: number;
    delivered: number;
    bounced: number;
    opened: number;
    clicked: number;
    replied: number;
    positiveReplies: number;
    unsubscribed: number;
    complaints: number;
    conversions: number;
    revenue: number;
  };
  aiPerformanceObservations?: string[];
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface GlobalSuppressionRecord {
  id: string;
  email: string;
  reason: SuppressionReason;
  source?: string;
  campaignId?: string;
  addedDate?: string;
  dateAdded?: string;
  notes: string;
  canRemove?: boolean;
  addedBy?: string;
}

export interface ComplianceAuditLog {
  id: string;
  timestamp: string;
  action?: "SUPPRESSED_AUTO" | "SUPPRESSED_MANUAL" | "UNSUBSCRIBE_PROCESSED" | "HARD_BOUNCE_BLOCKED" | "COMPLAINT_REGISTERED" | "DUPLICATE_MERGED" | "ELIGIBILITY_CHANGED";
  eventType?: string;
  targetEmail?: string;
  email?: string;
  performedBy?: string;
  details: string;
}

// Aliases for convenience
export type ComplianceAuditRecord = ComplianceAuditLog;
export type JurisdictionSettings = ComplianceJurisdictionSettings;

export interface TaxonomyCategoryItem {
  id: string;
  name: string;
  description?: string;
  subItems: string[];
  enabled: boolean;
  isCustom?: boolean;
}

export interface ScoringWeightsConfig {
  painMatch: number; // default 30
  personaMatch: number; // default 20
  professionMatch: number; // default 15
  industryMatch: number; // default 10
  intentSignals: number; // default 10
  interestMatch: number; // default 5
  geographicMatch: number; // default 5
  engagementHistory: number; // default 5
}

export interface ComplianceJurisdictionSettings {
  targetMarket: "Global (Standard)" | "European Union (GDPR Strict)" | "United States (CAN-SPAM)" | "United Kingdom (UK-GDPR)" | "Nigeria / Africa (NDPR)";
  defaultConsentBasis: ConsentBasis;
  mandatoryUnsubscribeInFooter: boolean;
  includePhysicalMailingAddress: boolean;
  physicalAddressText: string;
  autoSuppressHardBounce: boolean;
  autoSuppressComplaint: boolean;
  preventReimportSuppressed: boolean;
  requireDoubleOptinForOutreach: boolean;
  maxEmailFrequencyPerWeek: number;
}

// =======================================================
// SOCIAL SCOUT, OMNI-CHANNEL & NICHE DISCOVERY TYPES
// =======================================================

export type ScoutSocialPlatformId =
  | "linkedin"
  | "x"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "pinterest"
  | "facebook"
  | "forums"
  | "blogs"
  | "snapchat";

export interface ScoutSocialChannelConfig {
  id: ScoutSocialPlatformId;
  name: string;
  category: "Professional" | "Microblogging" | "Visual & Lifestyle" | "Video & Creators" | "Communities & Forums";
  description: string;
  badgeColor: string;
  sourceTargetTypes: string[];
  estimatedGlobalActiveUsers: string;
}

export interface DiscoveredSubNiche {
  id: string;
  name: string;
  parentNiche: string;
  audienceSizeEstimate: string;
  primaryPainPreview: string;
  targetProfession: string;
  monetizationFit: "Very High" | "High" | "Moderate";
}

export interface DiscoveredNiche {
  id: string;
  name: string;
  industry: string;
  subNiches: DiscoveredSubNiche[];
  topKeywords: string[];
  painSummary: string;
}

export interface DiscoveredPainPoint {
  id: string;
  title: string;
  category: string;
  verbatimQuote: string;
  severity: "Critical" | "High" | "Moderate";
  emotionalTrigger: string;
  platformsObserved: string[];
  frequencyScore: number; // 0 - 100
}

export interface DiscoveredPersona {
  id: string;
  name: string;
  archetype: string;
  profession: string;
  industry: string;
  coreFrustration: string;
  dreamOutcome: string;
  purchasingPower: "Enterprise" | "High" | "Medium" | "Emerging";
  bestOutreachHook: string;
  recommendedTone: string;
}

export interface ScoutSessionConfig {
  platforms: ScoutSocialPlatformId[];
  countries: string[];
  targetVolume: number; // up to 100,000
  industry: string;
  niche: string;
  subNiche?: string;
  painCategory?: string;
  painKeywords: string[];
  targetPersonas: string[];
  requireCorporateEmailOnly: boolean;
  minConfidenceThreshold: number;
}

export interface ScoutHarvestMetrics {
  totalHarvested: number;
  validEmailsFound: number;
  painPointsExtracted: number;
  avgConfidence: number;
  platformsQueried: number;
  dedupedCount: number;
}

