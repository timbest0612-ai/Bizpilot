import {
  BusinessProfile,
  WebsiteData,
  Lead,
  Campaign,
  AutomationWorkflow,
  DailyPriority,
  ContentItem,
  ProductOrService,
  UserSubscription,
  ChatMessage,
  CurrencyCode,
} from "../types";
import {
  DEFAULT_BUSINESS_PROFILE,
  DEFAULT_WEBSITE_DATA,
  INITIAL_LEADS,
  INITIAL_CAMPAIGNS,
  INITIAL_AUTOMATIONS,
  INITIAL_DAILY_PRIORITIES,
  INITIAL_PRODUCTS,
  INITIAL_CONTENT_ITEMS,
  DEFAULT_USER_SUBSCRIPTION,
} from "../data/initialData";

const KEYS = {
  PROFILE: "bizpilot_profile_v1",
  WEBSITE: "bizpilot_website_v1",
  LEADS: "bizpilot_leads_v1",
  CAMPAIGNS: "bizpilot_campaigns_v1",
  AUTOMATIONS: "bizpilot_automations_v1",
  PRIORITIES: "bizpilot_priorities_v1",
  PRODUCTS: "bizpilot_products_v1",
  CONTENT: "bizpilot_content_v1",
  SUBSCRIPTION: "bizpilot_subscription_v1",
  CHAT: "bizpilot_chat_v1",
  ONBOARDED: "bizpilot_onboarded_v1",
};

export const StorageService = {
  getProfile(): BusinessProfile {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_BUSINESS_PROFILE;
    } catch {
      return DEFAULT_BUSINESS_PROFILE;
    }
  },

  saveProfile(profile: BusinessProfile) {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  },

  getWebsite(): WebsiteData {
    try {
      const data = localStorage.getItem(KEYS.WEBSITE);
      return data ? JSON.parse(data) : DEFAULT_WEBSITE_DATA;
    } catch {
      return DEFAULT_WEBSITE_DATA;
    }
  },

  saveWebsite(website: WebsiteData) {
    try {
      localStorage.setItem(KEYS.WEBSITE, JSON.stringify(website));
    } catch (e) {
      console.error(e);
    }
  },

  getLeads(): Lead[] {
    try {
      const data = localStorage.getItem(KEYS.LEADS);
      return data ? JSON.parse(data) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  },

  saveLeads(leads: Lead[]) {
    try {
      localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  },

  getCampaigns(): Campaign[] {
    try {
      const data = localStorage.getItem(KEYS.CAMPAIGNS);
      return data ? JSON.parse(data) : INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  },

  saveCampaigns(campaigns: Campaign[]) {
    try {
      localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    } catch (e) {
      console.error(e);
    }
  },

  getAutomations(): AutomationWorkflow[] {
    try {
      const data = localStorage.getItem(KEYS.AUTOMATIONS);
      return data ? JSON.parse(data) : INITIAL_AUTOMATIONS;
    } catch {
      return INITIAL_AUTOMATIONS;
    }
  },

  saveAutomations(automations: AutomationWorkflow[]) {
    try {
      localStorage.setItem(KEYS.AUTOMATIONS, JSON.stringify(automations));
    } catch (e) {
      console.error(e);
    }
  },

  getPriorities(): DailyPriority[] {
    try {
      const data = localStorage.getItem(KEYS.PRIORITIES);
      return data ? JSON.parse(data) : INITIAL_DAILY_PRIORITIES;
    } catch {
      return INITIAL_DAILY_PRIORITIES;
    }
  },

  savePriorities(priorities: DailyPriority[]) {
    try {
      localStorage.setItem(KEYS.PRIORITIES, JSON.stringify(priorities));
    } catch (e) {
      console.error(e);
    }
  },

  getProducts(): ProductOrService[] {
    try {
      const data = localStorage.getItem(KEYS.PRODUCTS);
      return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  },

  saveProducts(products: ProductOrService[]) {
    try {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  },

  getContentItems(): ContentItem[] {
    try {
      const data = localStorage.getItem(KEYS.CONTENT);
      return data ? JSON.parse(data) : INITIAL_CONTENT_ITEMS;
    } catch {
      return INITIAL_CONTENT_ITEMS;
    }
  },

  saveContentItems(items: ContentItem[]) {
    try {
      localStorage.setItem(KEYS.CONTENT, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  },

  getSubscription(): UserSubscription {
    try {
      const data = localStorage.getItem(KEYS.SUBSCRIPTION);
      return data ? JSON.parse(data) : DEFAULT_USER_SUBSCRIPTION;
    } catch {
      return DEFAULT_USER_SUBSCRIPTION;
    }
  },

  saveSubscription(sub: UserSubscription) {
    try {
      localStorage.setItem(KEYS.SUBSCRIPTION, JSON.stringify(sub));
    } catch (e) {
      console.error(e);
    }
  },

  getChatHistory(): ChatMessage[] {
    try {
      const data = localStorage.getItem(KEYS.CHAT);
      return data
        ? JSON.parse(data)
        : [
            {
              id: "msg_init",
              sender: "ai",
              agentName: "Business Manager",
              text: `👋 Greetings! I am your **AI Business Manager**. I understand your entire business model, target audience, and growth goals. 

How can I help you accelerate today? You can ask me to:
- *"Create a 30-day customer acquisition campaign"*
- *"Improve our website's conversion rate & copy"*
- *"Draft a WhatsApp broadcast for this weekend's promotion"*
- *"Find and fix SEO gaps to outrank competitors"*`,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ];
    } catch {
      return [];
    }
  },

  saveChatHistory(history: ChatMessage[]) {
    try {
      localStorage.setItem(KEYS.CHAT, JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  },

  isOnboarded(): boolean {
    return localStorage.getItem(KEYS.ONBOARDED) === "true";
  },

  setOnboarded(value: boolean) {
    localStorage.setItem(KEYS.ONBOARDED, value ? "true" : "false");
  },

  resetToDefault() {
    localStorage.clear();
    localStorage.setItem(KEYS.ONBOARDED, "true");
  },
};

export function getStoredState<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function saveStoredState<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to persist ${key}`, e);
  }
}
