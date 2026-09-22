export type CurrencyCode = "NGN" | "USD" | "KES" | "ZAR" | "GHS" | "EUR" | "GBP";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateToUSD: number;
}

export type BusinessModelType =
  | "B2B Services"
  | "B2C Retail & E-commerce"
  | "Food & Catering"
  | "Consulting / Professional Agency"
  | "Digital Products & Courses"
  | "Health & Beauty"
  | "Tech & SaaS"
  | "Logistics & Transport"
  | "Real Estate";

export type GrowthGoal =
  | "Get more customers"
  | "Generate leads"
  | "Sell products"
  | "Sell services"
  | "Build an online presence"
  | "Launch a startup"
  | "Build a personal brand"
  | "Grow an existing business";

export interface BrandKit {
  name: string;
  tagline: string;
  mission: string;
  vision: string;
  brandVoice: string;
  brandDescription: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  socialBios: {
    instagram: string;
    twitter: string;
    linkedin: string;
    whatsappBio: string;
  };
  logoSvg: string;
}

export interface BusinessIntelligenceProfile {
  valueProposition: string;
  targetPersona: {
    name: string;
    demographics: string;
    coreFrustration: string;
    primaryMotivator: string;
    buyingObjections: string[];
  };
  competitiveAdvantage: string;
  pricingStrategyRecommendation: string;
  growthLevers: Array<{
    title: string;
    impact: "High" | "Medium" | "Critical";
    effort: "Low" | "Medium" | "High";
    description: string;
  }>;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  africanMarketAdaptation?: {
    whatsappFunnel: string;
    paymentMethods: string[];
    localTrustSignals: string[];
  };
}

export interface BusinessProfile {
  id: string;
  name: string;
  offering: string;
  problemSolved: string;
  targetCustomer: string;
  country: string;
  city: string;
  businessModel: BusinessModelType;
  hasWebsite: boolean;
  hasDomain: boolean;
  existingDomain?: string;
  mainGoal: GrowthGoal;
  currency: CurrencyCode;
  whatsappNumber: string;
  supportEmail: string;
  brandKit: BrandKit;
  intelligence?: BusinessIntelligenceProfile;
  createdAt: string;
  updatedAt: string;
}

export type WebsiteType =
  | "ecommerce"
  | "affiliate"
  | "dropshipping"
  | "corporate"
  | "booking"
  | "restaurant";

export interface EcommerceProduct {
  id: string;
  title: string;
  slug?: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  supplierCost?: number;
  currency?: CurrencyCode;
  category: string;
  featuredImage?: string;
  images?: string[];
  galleryImages?: string[];
  shortDescription?: string;
  description: string;
  sku: string;
  stock?: number;
  inventoryCount?: number;
  rating: number;
  reviewsCount: number;
  isDropship?: boolean;
  supplierName?: string;
  supplierUrl?: string;
  source?: string;
  badge?: string;
  estimatedDeliveryDays?: string;
  importDate?: string;
  features?: string[];
}

export interface AffiliateReviewItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  rating: number;
  bestFor?: string;
  retailer?: string;
  merchant?: string;
  affiliateUrl: string;
  price?: string;
  originalPrice?: number;
  dealPrice?: number;
  featuredImage?: string;
  imageUrl?: string;
  pros: string[];
  cons: string[];
  verdict: string;
}

export interface WebsitePlugin {
  id: string;
  name: string;
  slug: string;
  version: string;
  category: "ecommerce" | "affiliate" | "seo" | "marketing" | "security" | "speed" | "builder";
  author: string;
  description: string;
  icon: string;
  installed: boolean;
  active: boolean;
  rating: number;
  downloads: string;
  isPro: boolean;
  settings?: Record<string, any>;
}

export interface SupportChatMessage {
  id: string;
  sender: "user" | "agent" | "system";
  agentName: string;
  agentAvatar: string;
  agentRole: string;
  content: string;
  timestamp: string;
  suggestedActions?: Array<{ label: string; action: string; tab?: ActiveTab }>;
  codeSnippet?: string;
}

export interface WebsiteSectionItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  icon?: string;
  badge?: string;
}

export interface WebsiteData {
  title: string;
  theme: "modern-minimal" | "warm-luxury" | "vibrant-tech" | "earth-african" | "bold-corporate";
  websiteType?: WebsiteType;
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaText: string;
    secondaryCtaText: string;
    highlightWord: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    story: string;
    points: string[];
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    items: WebsiteSectionItem[];
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      popular: boolean;
      description: string;
      features: string[];
      ctaText: string;
    }>;
  };
  testimonials: {
    badge: string;
    title: string;
    items: Array<{
      name: string;
      role: string;
      company: string;
      quote: string;
      rating: number;
      city: string;
    }>;
  };
  faq: {
    badge: string;
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  contact: {
    headline: string;
    subheadline: string;
    email: string;
    phone: string;
    whatsappNumber: string;
    address: string;
    workingHours: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeywords: string[];
    schemaJson: string;
  };
  products?: EcommerceProduct[];
  affiliateItems?: AffiliateReviewItem[];
  plugins?: WebsitePlugin[];
}

export type CRMStage =
  | "NEW LEAD"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "CUSTOMER"
  | "REPEAT CUSTOMER"
  | "LOST";

export type LeadStage =
  | "NEW"
  | "NEW LEAD"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "PROPOSAL SENT"
  | "NEGOTIATING"
  | "CUSTOMER"
  | "REPEAT CUSTOMER"
  | "LOST";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  stage: CRMStage | LeadStage;
  dealValue: number;
  currency?: CurrencyCode;
  company?: string;
  notes: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  lastContactedAt?: string;
  lastInteraction?: string;
  city?: string;
}

export interface Campaign {
  id: string;
  title: string;
  channel: "WhatsApp" | "Instagram" | "Facebook" | "LinkedIn" | "Email" | "X / Twitter";
  type: "Lead Magnet" | "Flash Promo" | "Storytelling" | "Product Launch" | "Followup Nurture";
  status: "Draft" | "Scheduled" | "Active" | "Completed";
  scheduledDate: string;
  targetAudience: string;
  content: string;
  subjectLine?: string;
  stats?: {
    impressions: number;
    clicks: number;
    leads: number;
    conversions: number;
  };
}

export interface SEOAuditResult {
  overallScore: number;
  categories: {
    onPage: number;
    technical: number;
    mobile: number;
    speed: number;
    local: number;
  };
  findings: Array<{
    id: string;
    type: "critical" | "warning" | "good";
    title: string;
    description: string;
    recommendation: string;
    category: string;
  }>;
  targetKeywords: Array<{
    keyword: string;
    searchVolume: string;
    difficulty: "Easy" | "Medium" | "Hard";
    intent: "Informational" | "Commercial" | "Transactional";
    cpc: string;
  }>;
  sitemapXml: string;
  robotsTxt: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger: {
    type: "form_submitted" | "lead_created" | "stage_changed" | "payment_received" | "whatsapp_message";
    label: string;
    details: string;
  };
  actions: Array<{
    id: string;
    type: "send_whatsapp" | "send_email" | "update_crm" | "notify_admin" | "wait_delay";
    label: string;
    config: Record<string, string>;
  }>;
  stats: {
    runs: number;
    lastRun?: string;
  };
}

export interface DailyPriority {
  id: string;
  title: string;
  description: string;
  impact: "Critical" | "High Revenue" | "Quick Win";
  agent: AgentType;
  actionPrompt: string;
  completed: boolean;
  category: "Growth" | "Sales" | "Marketing" | "Optimization" | "Retention";
}

export interface ContentItem {
  id: string;
  title: string;
  type:
    | "Blog Article"
    | "Social Post"
    | "Ad Copy"
    | "Email Newsletter"
    | "WhatsApp Broadcast"
    | "Product Description"
    | "eBook / Lead Magnet"
    | "YouTube Script";
  content: string;
  tags: string[];
  createdAt: string;
  wordCount: number;
}

export interface ProductOrService {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: CurrencyCode;
  category: string;
  billingType: "one-time" | "recurring";
  features: string[];
  paymentLinks: {
    paystack?: string;
    flutterwave?: string;
    stripe?: string;
  };
}

export const PLATFORM_OWNER_EMAILS = [
  "ayobamitim0612@gmail.com",
  "timbest0612@gmail.com",
  "ayotim0612@gmail.com",
  "olutim0612@gmail.com",
  "olutim2204@gmail.com",
  "olufemi_timothy@yahoo.com",
] as const;

export type PlatformOwnerEmail = typeof PLATFORM_OWNER_EMAILS[number];

export function isPlatformOwnerEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return PLATFORM_OWNER_EMAILS.some((owner) => owner.toLowerCase() === normalized);
}

export interface UserSubscription {
  tier: "FREE" | "STARTER" | "PRO" | "AGENCY" | "OWNER_MASTER";
  plan?: "FREE" | "STARTER" | "PRO" | "AGENCY" | "OWNER_MASTER";
  isTrial: boolean;
  trialDaysLeft: number;
  creditsRemaining: number;
  totalCredits: number;
  renewalDate: string;
  isOwner?: boolean;
  ownerEmail?: string;
  activeOwnerEmail?: string;
  bulkEmailCostBypass?: boolean;
  bulkEmail100kFreeQuota?: boolean;
  authorizedOwners?: string[];
  status?: string;
}

export type AgentType =
  | "Business Manager"
  | "Strategy Agent"
  | "Website Agent"
  | "SEO Agent"
  | "Marketing Agent"
  | "Content Agent"
  | "Sales Agent"
  | "Lead Generation Agent"
  | "Branding Agent"
  | "Analytics Agent"
  | "Customer Support Agent";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  agentName?: AgentType;
  text: string;
  timestamp: string;
  suggestedActions?: Array<{
    label: string;
    actionType: string;
    payload?: any;
  }>;
}

export type DnsRecordType = "A" | "AAAA" | "CNAME" | "ALIAS" | "MX" | "TXT" | "SPF" | "DKIM" | "DMARC" | "SRV" | "CAA" | "NS" | "PTR";

export interface DnsRecord {
  id: string;
  type: DnsRecordType;
  name: string;
  value: string;
  ttl: number;
  priority?: number;
}

export interface DomainTransferRequest {
  id: string;
  domain: string;
  authCode: string;
  currentRegistrar: string;
  status: "INITIATED" | "LOCK_CHECKED" | "EMAIL_CONFIRMED" | "TRANSFER_IN_PROGRESS" | "COMPLETED" | "FAILED";
  stepNumber: number;
  isUnlocked: boolean;
  whoisEmail: string;
  priceNgn: number;
  priceUsd: number;
  initiatedAt: string;
  estimatedCompletion: string;
}

export interface DomainForwardingConfig {
  domain: string;
  destinationUrl: string;
  type: "301_PERMANENT" | "302_TEMPORARY" | "FRAME_MASKED";
  frameTitle?: string;
  frameFavicon?: string;
  isActive: boolean;
}

export interface SubdomainRecord {
  id: string;
  subdomain: string;
  fullDomain: string;
  targetType: "HOSTING_DIRECTORY" | "URL_REDIRECT" | "EXTERNAL_IP" | "STORE_APP";
  targetValue: string;
  sslActive: boolean;
  createdAt: string;
}

export interface DnssecConfig {
  enabled: boolean;
  keyTag: number;
  algorithm: string;
  digestType: string;
  digest: string;
  dsRecord: string;
}

export interface DomainValuation {
  domain: string;
  estimatedValueNgn: number;
  estimatedValueUsd: number;
  brandabilityScore: number;
  marketDemand: "EXTREMELY HIGH" | "HIGH" | "MEDIUM" | "NICHE";
  comparableSales: Array<{ domain: string; soldPrice: string; year: string }>;
  factors: string[];
}

export interface TldPricingInfo {
  tld: string;
  category: "African Local" | "Global Popular" | "Tech & AI" | "Commerce & Retail" | "Specialized";
  registerNgn: number;
  registerUsd: number;
  renewNgn: number;
  renewUsd: number;
  transferNgn: number;
  transferUsd: number;
  graceDays: number;
  isAfrican: boolean;
  features: string[];
}

export interface DomainRegistrationRecord {
  id: string;
  domain: string;
  tld: string;
  status: "ACTIVE" | "PENDING_TRANSFER" | "EXPIRED" | "LOCKED";
  registeredAt: string;
  expiresAt: string;
  autoRenew: boolean;
  privacyEnabled: boolean;
  transferLock: boolean;
  sslStatus: "ACTIVE" | "PROVISIONING" | "ERROR";
  dnsRecords: DnsRecord[];
  nameservers: string[];
  forwarding?: DomainForwardingConfig;
  subdomains?: SubdomainRecord[];
  dnssec?: DnssecConfig;
  connectedWebsite?: string;
  connectedEmailsCount: number;
  registrationPrice: string;
  authCode?: string;
}

export interface HostingPlan {
  id: string;
  name: string;
  tagline: string;
  tier: "STARTER" | "BUSINESS_PRO" | "ENTERPRISE_EDGE" | "MANAGED_WORDPRESS" | "CLOUD_VPS";
  vCpu: string;
  ram: string;
  nvmeStorage: string;
  bandwidth: string;
  domainsAllowed: string;
  freeEmails: number;
  priceNgn: number;
  priceUsd: number;
  features: string[];
  popular?: boolean;
}

export interface FileBrowserItem {
  id: string;
  name: string;
  path: string;
  type: "file" | "directory";
  size: string;
  modified: string;
  permissions: string;
  mimeType?: string;
}

export interface DatabaseRecord {
  id: string;
  name: string;
  user: string;
  host: string;
  size: string;
  tableCount: number;
  charset: string;
  type: "PostgreSQL 16" | "MySQL 8.0" | "Redis 7";
}

export interface FtpSshAccount {
  id: string;
  username: string;
  type: "FTP" | "SFTP" | "SSH_KEY";
  directory: string;
  lastLogin: string;
  status: "ACTIVE" | "DISABLED";
  keyFingerprint?: string;
}

export interface CronJob {
  id: string;
  title: string;
  command: string;
  schedule: string;
  readableSchedule: string;
  active: boolean;
  lastRun: string;
  status: "SUCCESS" | "RUNNING" | "FAILED";
}

export interface WordPressInstallation {
  id: string;
  siteName: string;
  domain: string;
  wpVersion: string;
  phpVersion: string;
  adminEmail: string;
  adminUrl: string;
  pluginsCount: number;
  stagingExists: boolean;
  autoUpdate: boolean;
  speedScore: number;
}

export interface EmailDeliverabilityScore {
  spfStatus: boolean;
  dkimStatus: boolean;
  dmarcStatus: boolean;
  mxStatus: boolean;
  score: number;
  verdict: "EXCELLENT" | "NEEDS_IMPROVEMENT" | "POOR";
  issues: string[];
}

export interface WebmailMessage {
  id: string;
  from: string;
  fromName: string;
  to: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  unread: boolean;
  hasAttachments: boolean;
  folder: "inbox" | "sent" | "drafts" | "spam" | "trash";
}

export interface SslCertificateRecord {
  id: string;
  domain: string;
  issuer: string;
  type: "WILDCARD_LETSENCRYPT" | "COMMERCIAL_POSITIVE_SSL" | "EV_ENTERPRISE";
  validFrom: string;
  validTo: string;
  autoRenew: boolean;
  status: "ACTIVE" | "RENEWING" | "EXPIRED";
  serialNumber: string;
}

export interface InfrastructureNode {
  id: string;
  name: string;
  location: string;
  countryCode: string;
  flag: string;
  ip: string;
  pingMs: number;
  status: "OPERATIONAL" | "OPTIMAL" | "MAINTENANCE";
  uptime30d: string;
  trafficGbps: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: "DOMAIN" | "HOSTING" | "DNS" | "EMAIL" | "SSL" | "BILLING";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  lastReply: string;
  messagesCount: number;
  createdAt: string;
}

export interface CloudHostingServer {
  id: string;
  name: string;
  domain: string;
  status: "ACTIVE" | "PROVISIONING" | "RESTARTING";
  ipAddress: string;
  ipv6Address: string;
  location: string;
  regionCode: string;
  memoryUsed: string;
  memoryTotal: string;
  storageUsed: string;
  storageTotal: string;
  bandwidthUsed: string;
  bandwidthTotal: string;
  uptime: string;
  sslActive: boolean;
  http3Enabled: boolean;
  ddosProtected: boolean;
  autoBackups: boolean;
  nodeVersion: string;
  phpVersion?: string;
  lastBackupTime: string;
  databases?: DatabaseRecord[];
  ftpAccounts?: FtpSshAccount[];
  cronJobs?: CronJob[];
  wordpressSites?: WordPressInstallation[];
}

export interface BusinessEmailAccount {
  id: string;
  address: string;
  domain: string;
  mailboxUsage: string;
  quota: string;
  status: "ACTIVE" | "SUSPENDED";
  forwardTo?: string;
  aliases: string[];
  createdAt: string;
  deliverability?: EmailDeliverabilityScore;
}

// ============================================================================
// GAP 1: LEGAL, CAC & COMPLIANCE HUB TYPES
// ============================================================================
export interface CacRegistrationRecord {
  id: string;
  companyName: string;
  alternativeName: string;
  entityType: "BUSINESS_NAME" | "PRIVATE_LIMITED" | "INCORPORATED_TRUSTEE" | "DELAWARE_LLC" | "UK_LTD";
  registrationNumber?: string;
  status: "NAME_RESERVATION" | "DOCUMENT_UPLOAD" | "PAYMENT_CONFIRMED" | "SUBMITTED_TO_CAC" | "APPROVED_REGISTERED";
  tinNumber?: string;
  firsStatus: "PENDING" | "ACTIVE" | "EXEMPT";
  scumlStatus: "NOT_REQUIRED" | "APPLICATION_PENDING" | "CERTIFICATE_ISSUED";
  directors: Array<{
    name: string;
    role: string;
    sharesPercent: number;
    phone: string;
    email: string;
    bvnOrNin: string;
  }>;
  shareCapital: number;
  registeredAddress: string;
  businessObjectives: string[];
  certificateUrl?: string;
  memartUrl?: string;
  timeline: Array<{
    step: string;
    date: string;
    completed: boolean;
    notes: string;
  }>;
}

// ============================================================================
// GAP 2: OMNI-CHANNEL INVENTORY & POS SYNC TYPES
// ============================================================================
export interface OmniStockLocation {
  channel: "Online Store" | "WhatsApp Catalog" | "Jumia Mall" | "Konga" | "Physical Store POS" | "Amazon";
  stockCount: number;
  syncStatus: "SYNCED" | "UPDATING" | "DISCONNECTED";
  lastSyncTime: string;
}

export interface OmniInventoryItem {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  totalStock: number;
  lowStockThreshold: number;
  channels: OmniStockLocation[];
  imageUrl: string;
  supplierName: string;
  reorderQuantity: number;
  autoReorderEnabled: boolean;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}

export interface PosCartItem {
  item: OmniInventoryItem;
  quantity: number;
}

export interface PosReceipt {
  id: string;
  receiptNumber: string;
  cashierName: string;
  customerName?: string;
  customerPhone?: string;
  items: Array<{
    name: string;
    sku: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: "CASH" | "POS_CARD" | "BANK_TRANSFER" | "PAYSTACK_USSD";
  timestamp: string;
}

// ============================================================================
// GAP 3: MULTI-CARRIER LOGISTICS & SAME-DAY DISPATCH TYPES
// ============================================================================
export interface LogisticsCarrierQuote {
  carrierId: string;
  carrierName: string;
  carrierLogo: string;
  serviceType: "SAME_DAY_BIKE" | "EXPRESS_INTERSTATE" | "STANDARD_ROAD" | "INTERNATIONAL_AIR";
  estimatedHours: string;
  cost: number;
  rating: number;
  insuranceCovered: boolean;
  trackingReliability: string;
}

export interface ShipmentDispatch {
  id: string;
  trackingNumber: string;
  carrier: string;
  customerName: string;
  customerPhone: string;
  destinationAddress: string;
  destinationCity: string;
  itemDescription: string;
  packageWeightKg: number;
  shippingFee: number;
  codAmount: number;
  isCod: boolean;
  status: "ORDER_PLACED" | "RIDER_ASSIGNED" | "PICKED_UP" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";
  riderName?: string;
  riderPhone?: string;
  pickupTime: string;
  estimatedDeliveryTime: string;
  trackingEvents: Array<{
    time: string;
    location: string;
    event: string;
  }>;
}

// ============================================================================
// GAP 4: SMART INVOICING, ESCROW & MILESTONE CONTRACTS TYPES
// ============================================================================
export interface EscrowMilestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "PENDING_FUNDING" | "FUNDED_IN_ESCROW" | "WORK_SUBMITTED" | "APPROVED_RELEASED" | "DISPUTED";
  deliverableFileUrl?: string;
}

export interface SmartInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany?: string;
  issueDate: string;
  dueDate: string;
  currency: CurrencyCode;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  taxPercent: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  status: "DRAFT" | "SENT" | "PARTIALLY_PAID" | "PAID" | "OVERDUE";
  isEscrowProtected: boolean;
  escrowMilestones?: EscrowMilestone[];
  paymentLink: string;
  notes: string;
  qrCodeVerification: string;
  whatsappChaserHistory: Array<{
    sentAt: string;
    templateUsed: string;
  }>;
}

// ============================================================================
// GAP 5: COMPETITOR SPY & PRICE INTELLIGENCE TYPES
// ============================================================================
export interface CompetitorPriceTracker {
  id: string;
  productName: string;
  mySku: string;
  myPrice: number;
  competitors: Array<{
    competitorName: string;
    platform: "Jumia" | "Konga" | "Amazon" | "Shopify Store" | "Instagram Vendor";
    price: number;
    inStock: boolean;
    productUrl: string;
    priceDifference: number; // percentage
  }>;
  recommendedPrice: number;
  suggestedAction: "LOWER_PRICE" | "INCREASE_MARGIN" | "HOLD_PRICE" | "BUNDLE_OFFER";
  intelligenceSummary: string;
  autoRepriceRule?: string;
}

export interface CompetitorAdInsight {
  id: string;
  brandName: string;
  platform: "Facebook & Instagram" | "TikTok Ads" | "Google Search" | "YouTube Shorts";
  headline: string;
  creativeType: "Video Hook" | "Carousel" | "Direct Offer";
  estimatedSpend: string;
  runningDays: number;
  adHookScript: string;
  targetAudience: string;
  keyTakeaway: string;
}

export interface GoogleAuthUser {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  source: "google_oauth" | "captured_lead" | "admin";
  capturedAt: string;
  tags: string[];
  status: "ACTIVE" | "SUBSCRIBED" | "UNSUBSCRIBED";
  campaignHistoryCount: number;
}

export interface EmailSubscriber {
  id: string;
  name: string;
  email: string;
  tag: string;
  dateAdded: string;
  status: "ACTIVE" | "BOUNCED" | "UNSUBSCRIBED";
  lastOpened?: string;
}

export interface EmailCampaignBroadcast {
  id: string;
  subject: string;
  previewText: string;
  senderName: string;
  senderEmail: string;
  bodyHtml: string;
  bodyText: string;
  targetAudience:
    | "ALL_CAPTURED_USERS"
    | "NEWSLETTER_SUBSCRIBERS"
    | "HIGH_VALUE_LEADS"
    | "CUSTOM_LIST"
    | "CUSTOM_COUNT"
    | "MEGA_100K_LEAD_VAULT"
    | "TIER1_50K_ECOMMERCE"
    | "TIER2_25K_SMB"
    | "CSV_IMPORT_LIST"
    | "IMPORTED_FILE_CONTACTS"
    | string;
  recipientCount: number;
  provider: "AMAZON_SES" | "RESEND" | "SENDGRID" | "MAILGUN" | "SMTP";
  status: "DRAFT" | "QUEUED" | "SENDING" | "SENT" | "SCHEDULED" | "PAUSED";
  sentAt?: string;
  scheduledFor?: string;
  batchConfig?: {
    batchSize: number;
    workers: number;
    sendRatePerSec: number;
    currentBatch: number;
    totalBatches: number;
    warmupMode: boolean;
    dedicatedIpPool?: string;
    costEstimateUsd: number;
  };
  stats: {
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
}

export interface BulkLeadRecord {
  id: string;
  name: string;
  email: string;
  company?: string;
  industry?: string;
  city?: string;
  segment: "VIP" | "B2B_Wholesale" | "Retail_Shopper" | "Executive" | "Imported";
  phone?: string;
  status: "VALID" | "FLAGGED_SYNTAX" | "DISPOSABLE_REMOVED" | "SUPPRESSED";
  score: number;
}

export type ActiveTab =
  | "dashboard"
  | "prospect-intelligence"
  | "domains"
  | "hosting"
  | "webmail"
  | "ssl-security"
  | "domain-comparison"
  | "infra-status"
  | "business-manager"
  | "launch-wizard"
  | "website-builder"
  | "branding"
  | "content-factory"
  | "marketing"
  | "email-broadcaster"
  | "seo"
  | "leads"
  | "crm"
  | "sales"
  | "automations"
  | "whatsapp"
  | "analytics"
  | "daily-coach"
  | "cac-compliance"
  | "omni-inventory"
  | "logistics"
  | "smart-invoicing"
  | "competitor-spy"
  | "integrations"
  | "billing"
  | "admin";

export type HostingFileItem = FileBrowserItem;
export type DatabaseInstance = DatabaseRecord;
export type CronJobItem = CronJob;
export type WordPressSiteInstance = WordPressInstallation;
