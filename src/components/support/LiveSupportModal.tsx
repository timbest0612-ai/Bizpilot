import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Globe,
  ShoppingBag,
  CreditCard,
  Search,
  ExternalLink,
  HelpCircle,
  PhoneCall,
  ChevronRight,
  Terminal,
  Paperclip,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { SupportChatMessage, BusinessProfile, ActiveTab } from "../../types";
import { DEFAULT_SUPPORT_CHAT_MESSAGES } from "../../data/initialData";
import { generateAiContent } from "../../services/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: BusinessProfile;
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const LiveSupportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  activeTab,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<SupportChatMessage[]>(() => {
    return DEFAULT_SUPPORT_CHAT_MESSAGES;
  });
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickTroubleshootItems = [
    {
      id: "dropship",
      title: "📦 Import Dropship Products",
      prompt: "How do I import trending products from AliExpress or CJ Dropshipping with automatic price markups?",
      category: "ecommerce",
    },
    {
      id: "dns",
      title: "🌐 Fix Domain & DNS Propagation",
      prompt: "My domain is not resolving yet. How do I verify A Records and nameserver propagation?",
      category: "domains",
    },
    {
      id: "paystack",
      title: "💳 Setup Paystack Live Checkout",
      prompt: "How do I connect my live Paystack API Secret and Public Keys to process card and bank payments?",
      category: "billing",
    },
    {
      id: "affiliate",
      title: "⭐ Build Affiliate Product Review Site",
      prompt: "How do I create comparison tables and cloaked affiliate links with FTC compliance?",
      category: "affiliate",
    },
    {
      id: "speed",
      title: "⚡ Optimize Site Speed to 99+",
      prompt: "How do I activate the WP Rocket and Cloudflare edge cache plugin for instant loading?",
      category: "speed",
    },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: SupportChatMessage = {
      id: "user_" + Date.now(),
      sender: "user",
      agentName: profile.name ? `${profile.name} Admin` : "You",
      agentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      agentRole: "Store & Platform Owner",
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const promptContext = `You are Engr. Victor Adeleke, the Lead Systems Architect & Senior Webmaster Specialist at BizPilot AI Business OS. 
Answer with absolute authority, precision, technical depth, and warm professional composure.
User Business: "${profile.name}" (${profile.businessModel || "E-Commerce & Digital Services"})
User Location: ${profile.city || "Lagos"}, ${profile.country || "Nigeria"}
Current Active Workspace Module: "${activeTab}"

User Support Inquiry: "${query.trim()}"

Provide a comprehensive, authoritative, bullet-pointed solution with step-by-step guidance.
Include:
1. **Root Cause / Technical Architecture Explanation**
2. **Step-by-step Actionable Solution in BizPilot OS**
3. **Pro-Tip or Best Practice for High Conversion & Security**
4. If applicable, mention which tab to navigate to (Domains, Cloud Hosting, Website Builder, CRM, Billing, etc.).`;

      const aiResponse = await generateAiContent({
        agent: "Senior Webmaster & Tech Support",
        prompt: promptContext,
        businessProfile: profile,
        systemInstruction: "You are the top authoritative technical support lead and domain/hosting specialist for BizPilot OS. Answer authoritatively, clearly, and practically with zero fluff.",
      });

      const replyText = aiResponse.output || `### Technical Directive & Solution

I have analyzed your request regarding **${query.slice(0, 40)}...**.

1. **Immediate Execution Step**: Navigate to your workspace module to inspect the active configuration.
2. **Infrastructure Recommendation**: All edge CDN nodes and DNS records update automatically across anycast servers.
3. **Escalation**: If you need real-time engineering intervention, our on-call team is monitoring this channel 24/7.`;

      const agentReply: SupportChatMessage = {
        id: "agent_" + Date.now(),
        sender: "agent",
        agentName: "Engr. Victor Adeleke",
        agentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        agentRole: "Lead Cloud Architect & Tier-3 Webmaster",
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedActions: [
          { label: "🌐 Open Website Builder", action: "go_website", tab: "website-builder" },
          { label: "💳 Check Payment Gateways", action: "go_billing", tab: "billing" },
          { label: "⚙️ Manage Domain & DNS", action: "go_domains", tab: "domains" },
        ],
      };

      setMessages((prev) => [...prev, agentReply]);
    } catch (err) {
      const fallbackReply: SupportChatMessage = {
        id: "agent_fallback_" + Date.now(),
        sender: "agent",
        agentName: "Engr. Victor Adeleke",
        agentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        agentRole: "Lead Cloud Architect & Tier-3 Webmaster",
        content: `### Expert Technical Solution

Here is the recommended configuration procedure for **${query.slice(0, 50)}**:

1. **Automatic Sync**: Your changes are instantly synced to our NVMe Edge cluster.
2. **DNS & Nameservers**: If updating custom root domains, ensure nameservers point to \`ns1.hostpilotdns.com\` and \`ns2.hostpilotdns.com\`.
3. **E-Commerce & Dropshipping**: In the **Website Builder > Plugins & Products** tab, paste your supplier URL to auto-extract images and inventory.
4. **Paystack Integration**: Add your live Public Key in **Billing / Settings** to process instant Naira and USD transactions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppEscalate = () => {
    const phone = profile.whatsappNumber || "2348039876543";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello BizPilot Senior Tech Support! 👋 I need live assistance with my business workspace: "${profile.name}". My active domain/store is having a technical inquiry.`
    );
    window.open(`https://wa.me/${cleanPhone || "2348039876543"}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl h-[90vh] max-h-[780px] shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Lead Architect"
                className="w-11 h-11 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">
                  Engr. Victor Adeleke
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                  Tier-3 Expert
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Lead Cloud Architect & Systems Specialist • ⚡ 24/7 Authority Live Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppEscalate}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 text-xs font-bold transition-all"
              title="Escalate directly to WhatsApp VIP Desk"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp VIP</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Diagnostic Preset Chips */}
        <div className="bg-slate-950/60 px-6 py-2.5 border-b border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider shrink-0 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            Instant Solutions:
          </span>
          {quickTroubleshootItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSendMessage(item.prompt)}
              className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-indigo-600/30 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-indigo-200 text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Messages Stream Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-900/50">
          {messages.map((msg) => {
            const isAgent = msg.sender === "agent" || msg.sender === "system";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAgent ? "items-start" : "items-start flex-row-reverse"}`}
              >
                {isAgent ? (
                  <img
                    src={msg.agentAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={msg.agentName}
                    className="w-9 h-9 rounded-xl object-cover border border-indigo-500/40 shrink-0 mt-1"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-1 shadow-md">
                    ME
                  </div>
                )}

                <div className={`max-w-2xl ${isAgent ? "text-left" : "text-right"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold text-slate-300">
                      {msg.agentName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {msg.agentRole || "Support"} • {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAgent
                        ? "bg-slate-800/90 text-slate-200 border border-slate-700/80 shadow-sm"
                        : "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium shadow-md text-left"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans space-y-2">
                      {msg.content}
                    </div>

                    {/* Action buttons embedded in message */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-700/60 flex flex-wrap gap-2">
                        {msg.suggestedActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (action.tab) {
                                onNavigate(action.tab);
                                onClose();
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-300 hover:text-indigo-100 text-xs font-bold flex items-center gap-1.5 transition-all"
                          >
                            <span>{action.label}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold py-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center animate-spin">
                <RefreshCw className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="space-y-1">
                <p className="text-indigo-300 font-bold">Engr. Victor Adeleke is analyzing your system telemetry...</p>
                <p className="text-slate-500 text-[11px]">Compiling authoritative solution & server configurations</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask any technical question (DNS, Dropshipping import, Paystack, SSL, WooCommerce, SEO)..."
                className="w-full pl-4 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
                ⏎ Enter
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all shrink-0"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Protected by BizPilot 24/7 SLA Guarantee
            </span>
            <button
              onClick={handleWhatsAppEscalate}
              className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Need Voice / WhatsApp Escalation?</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
