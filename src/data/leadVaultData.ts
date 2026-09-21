import { BulkLeadRecord } from "../types";

export interface LeadSegmentStat {
  id: string;
  name: string;
  count: number;
  description: string;
  avgOpenRate: string;
  deliverability: string;
  topIndustries: string[];
}

export const LEAD_SEGMENT_STATS: LeadSegmentStat[] = [
  {
    id: "MEGA_100K_LEAD_VAULT",
    name: "Mega Outreach Master Vault",
    count: 100000,
    description: "Complete curated & syntax-verified database of high-intent African & global business decision-makers, executives, and retail shoppers.",
    avgOpenRate: "42.8%",
    deliverability: "99.4%",
    topIndustries: ["Retail & FMCG", "Fintech & Banking", "Logistics & Supply Chain", "Real Estate", "Healthcare", "Hospitality"],
  },
  {
    id: "TIER1_50K_ECOMMERCE",
    name: "Tier-1 Active eCommerce & Retail Buyers",
    count: 50000,
    description: "Frequent online shoppers, wholesale buyers, and verified consumers with recorded card transactions and repeat purchase history.",
    avgOpenRate: "51.2%",
    deliverability: "99.6%",
    topIndustries: ["Fashion & Apparel", "Consumer Electronics", "Food & Gourmet Groceries", "Beauty & Wellness"],
  },
  {
    id: "TIER2_25K_SMB",
    name: "B2B Corporate Executives & SMB Owners",
    count: 25000,
    description: "Registered company directors, procurement leads, CAC-verified business owners, and corporate partners in Nigeria, Ghana, Kenya, and UK.",
    avgOpenRate: "46.5%",
    deliverability: "99.2%",
    topIndustries: ["Corporate Services", "Construction & Engineering", "Import/Export", "Legal & Accounting"],
  },
];

export const INITIAL_LEAD_VAULT: BulkLeadRecord[] = [
  {
    id: "lead_1001",
    name: "Engr. Babatunde Adeyemi",
    email: "b.adeyemi@zenithholdings.ng",
    company: "Zenith Industrial Supplies Ltd",
    industry: "Manufacturing & Distribution",
    city: "Lagos, Nigeria",
    segment: "B2B_Wholesale",
    phone: "+234 803 124 5590",
    status: "VALID",
    score: 98,
  },
  {
    id: "lead_1002",
    name: "Hajia Amina Sanusi",
    email: "amina.sanusi@capitalprime.com.ng",
    company: "Capital Prime Investments",
    industry: "Real Estate & Asset Management",
    city: "Abuja (FCT), Nigeria",
    segment: "VIP",
    phone: "+234 802 884 9912",
    status: "VALID",
    score: 99,
  },
  {
    id: "lead_1003",
    name: "Ngozi Ezeh",
    email: "ngozi.ezeh@blissboutique.com",
    company: "Bliss Luxury Collections",
    industry: "Fashion & Retail",
    city: "Port Harcourt, Nigeria",
    segment: "Retail_Shopper",
    phone: "+234 814 330 1198",
    status: "VALID",
    score: 94,
  },
  {
    id: "lead_1004",
    name: "Kwame Mensah",
    email: "k.mensah@accralogistics.gh",
    company: "Accra Express Freight",
    industry: "Logistics & Clearing",
    city: "Accra, Ghana",
    segment: "Executive",
    phone: "+233 24 991 4402",
    status: "VALID",
    score: 96,
  },
  {
    id: "lead_1005",
    name: "Dr. Chidi Nwachukwu",
    email: "chidi.n@apexhealth.ng",
    company: "Apex Specialist Hospitals",
    industry: "Healthcare & Diagnostics",
    city: "Enugu, Nigeria",
    segment: "VIP",
    phone: "+234 806 771 2290",
    status: "VALID",
    score: 97,
  },
  {
    id: "lead_1006",
    name: "Folashade Morgan",
    email: "fola.morgan@morganfmcg.io",
    company: "Morgan Retail Brands",
    industry: "FMCG Supermarkets",
    city: "Ibadan, Nigeria",
    segment: "B2B_Wholesale",
    phone: "+234 818 200 4491",
    status: "VALID",
    score: 95,
  },
  {
    id: "lead_1007",
    name: "David O. Adeleke",
    email: "david@luminafintech.africa",
    company: "Lumina Payments Africa",
    industry: "Fintech & Software",
    city: "Lagos, Nigeria",
    segment: "Executive",
    phone: "+234 901 880 7712",
    status: "VALID",
    score: 99,
  },
  {
    id: "lead_1008",
    name: "Wanjiku Kimani",
    email: "wanjiku@safarisupply.ke",
    company: "Safari Supply Chain Co.",
    industry: "Hospitality & Tourism",
    city: "Nairobi, Kenya",
    segment: "B2B_Wholesale",
    phone: "+254 722 559 110",
    status: "VALID",
    score: 93,
  },
  {
    id: "lead_1009",
    name: "Oluwaseun Peters",
    email: "o.peters@lagosmetroproperties.com",
    company: "Metro Commercial Properties",
    industry: "Commercial Real Estate",
    city: "Lekki, Lagos",
    segment: "VIP",
    phone: "+234 809 332 9901",
    status: "VALID",
    score: 97,
  },
  {
    id: "lead_1010",
    name: "Amina Bello",
    email: "amina.bello@kandotextiles.ng",
    company: "Kano Textile Mills Ltd",
    industry: "Textiles & Wholesale",
    city: "Kano, Nigeria",
    segment: "B2B_Wholesale",
    phone: "+234 803 441 8820",
    status: "VALID",
    score: 92,
  },
  {
    id: "lead_1011",
    name: "Richard Vance",
    email: "rvance@globalimports.co.uk",
    company: "Vance UK Agro Trading",
    industry: "International Commodity Trade",
    city: "London, United Kingdom",
    segment: "Executive",
    phone: "+44 20 7946 0912",
    status: "VALID",
    score: 98,
  },
  {
    id: "lead_1012",
    name: "Chidinma Okolie",
    email: "c.okolie@trendyshoppers.ng",
    company: "Trendy Home & Decor",
    industry: "Home Furnishing & eCommerce",
    city: "Asaba, Nigeria",
    segment: "Retail_Shopper",
    phone: "+234 812 660 3381",
    status: "VALID",
    score: 95,
  },
];

export interface ProviderPricingMetric {
  provider: "AMAZON_SES" | "RESEND" | "SENDGRID" | "MAILGUN" | "SMTP";
  name: string;
  costFor100kUsd: number;
  costPer1kUsd: number;
  speedLimit: string;
  recommendedFor100k: boolean;
  highlight: string;
}

export const PROVIDER_PRICING: Record<string, ProviderPricingMetric> = {
  AMAZON_SES: {
    provider: "AMAZON_SES",
    name: "Amazon Simple Email Service (SES)",
    costFor100kUsd: 10.0,
    costPer1kUsd: 0.1,
    speedLimit: "Up to 500 emails/sec (Production Access)",
    recommendedFor100k: true,
    highlight: "Industry #1 for 100,000+ volume: Only $10 for 100k emails. Rock-solid AWS infrastructure.",
  },
  RESEND: {
    provider: "RESEND",
    name: "Resend Enterprise Batch API",
    costFor100kUsd: 80.0,
    costPer1kUsd: 0.8,
    speedLimit: "100 emails per batch request",
    recommendedFor100k: false,
    highlight: "Modern developer ergonomics with React Email component styling.",
  },
  SENDGRID: {
    provider: "SENDGRID",
    name: "SendGrid Pro / Marketing Campaigns",
    costFor100kUsd: 89.95,
    costPer1kUsd: 0.9,
    speedLimit: "10,000 emails per list upload batch",
    recommendedFor100k: false,
    highlight: "Twilio global routing network with dedicated IP addresses included in Pro plan.",
  },
  MAILGUN: {
    provider: "MAILGUN",
    name: "Mailgun Foundation & Scale",
    costFor100kUsd: 75.0,
    costPer1kUsd: 0.75,
    speedLimit: "1,000 emails per API batch",
    recommendedFor100k: false,
    highlight: "Advanced inbound email routing and IP warm-up automations.",
  },
  SMTP: {
    provider: "SMTP",
    name: "Custom Self-Hosted SMTP / PowerMTA",
    costFor100kUsd: 15.0,
    costPer1kUsd: 0.15,
    speedLimit: "Hardware & VPS bandwidth dependent",
    recommendedFor100k: false,
    highlight: "Private cloud VPS with dedicated rDNS and reverse PTR records.",
  },
};

export const SAMPLE_CSV_EXPORT = `Name,Email,Company,Industry,City,Segment,Phone
"Babatunde Adeyemi","b.adeyemi@zenithholdings.ng","Zenith Industrial Supplies Ltd","Manufacturing & Distribution","Lagos, Nigeria","B2B_Wholesale","+234 803 124 5590"
"Amina Sanusi","amina.sanusi@capitalprime.com.ng","Capital Prime Investments","Real Estate & Asset Management","Abuja (FCT), Nigeria","VIP","+234 802 884 9912"
"Ngozi Ezeh","ngozi.ezeh@blissboutique.com","Bliss Luxury Collections","Fashion & Retail","Port Harcourt, Nigeria","Retail_Shopper","+234 814 330 1198"
"Kwame Mensah","k.mensah@accralogistics.gh","Accra Express Freight","Logistics & Clearing","Accra, Ghana","Executive","+233 24 991 4402"
"Dr. Chidi Nwachukwu","chidi.n@apexhealth.ng","Apex Specialist Hospitals","Healthcare & Diagnostics","Enugu, Nigeria","VIP","+234 806 771 2290"
"Folashade Morgan","fola.morgan@morganfmcg.io","Morgan Retail Brands","FMCG Supermarkets","Ibadan, Nigeria","B2B_Wholesale","+234 818 200 4491"
"David O. Adeleke","david@luminafintech.africa","Lumina Payments Africa","Fintech & Software","Lagos, Nigeria","Executive","+234 901 880 7712"
"Wanjiku Kimani","wanjiku@safarisupply.ke","Safari Supply Chain Co.","Hospitality & Tourism","Nairobi, Kenya","B2B_Wholesale","+254 722 559 110"`;
