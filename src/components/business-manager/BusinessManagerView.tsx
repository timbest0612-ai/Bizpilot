import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Bot,
  Send,
  Loader2,
  Trash2,
  Download,
  Lightbulb,
  Compass,
  Globe,
  Search,
  Megaphone,
  ShoppingBag,
  Target,
  MessageSquare,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { BusinessProfile, ChatMessage, AgentType } from "../../types";
import { MarkdownRenderer } from "../common/MarkdownRenderer";
import { generateAiContent } from "../../services/api";

interface Props {
  profile: BusinessProfile;
  chatHistory: ChatMessage[];
  onSaveChat: (history: ChatMessage[]) => void;
  onNavigateToModule?: (module: string) => void;
}

export const BusinessManagerView: React.FC<Props> = ({
  profile,
  chatHistory,
  onSaveChat,
  onNavigateToModule,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistory);
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<AgentType>("Business Manager");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subAgents: { name: AgentType; icon: any; color: string }[] = [
    { name: "Business Manager", icon: Bot, color: "bg-emerald-500 text-white" },
    { name: "Strategy Agent", icon: Compass, color: "bg-blue-500 text-white" },
    { name: "Website Agent", icon: Globe, color: "bg-teal-500 text-white" },
    { name: "SEO Agent", icon: Search, color: "bg-amber-500 text-white" },
    { name: "Marketing Agent", icon: Megaphone, color: "bg-rose-500 text-white" },
    { name: "Sales Agent", icon: ShoppingBag, color: "bg-green-600 text-white" },
    { name: "Lead Generation Agent", icon: Target, color: "bg-cyan-500 text-white" },
    { name: "Analytics Agent", icon: BarChart3, color: "bg-purple-500 text-white" },
  ];

  const quickPrompts = [
    "What should I do today to grow my business?",
    "Why am I not getting more customers in our area?",
    "Create a 30-day multi-channel growth plan",
    "How can I generate 20 warm leads this week on WhatsApp?",
    "Audit my pricing strategy and recommend high-margin packages",
    "Write a persuasive sales email for corporate clients",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    onSaveChat(messages);
  }, [messages]);

  const handleSend = async (userText: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: "msg_" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateAiContent({
        agent: selectedAgent,
        task: `AI Business Consultation: ${selectedAgent}`,
        prompt: textToSend,
        businessProfile: profile,
      });

      const aiMsg: ChatMessage = {
        id: "msg_" + (Date.now() + 1),
        sender: "ai",
        agentName: selectedAgent,
        text: response.output,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages([...newMessages, aiMsg]);
    } catch (err) {
      console.error("AI error:", err);
      const errorMsg: ChatMessage = {
        id: "msg_err_" + Date.now(),
        sender: "ai",
        agentName: selectedAgent,
        text: "I encountered a momentary connection interruption. However, based on your business profile, I recommend prioritizing your WhatsApp sales funnel and running targeted Instagram video ads today.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...newMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    const initial: ChatMessage[] = [
      {
        id: "msg_init",
        sender: "ai",
        agentName: "Business Manager",
        text: `👋 Greetings! Chat reset. How can I help grow **${profile.name}** today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
    setMessages(initial);
  };

  const handleExportChat = () => {
    const transcript = messages
      .map((m) => `[${m.timestamp}] ${m.sender.toUpperCase()} (${m.agentName || "User"}):\n${m.text}\n`)
      .join("\n---\n\n");
    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bizpilot-chat-${profile.name.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
      {/* Top Header */}
      <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base text-white">AI Business Manager</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                Co-Founder Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Context loaded for <strong className="text-slate-200">{profile.name}</strong> • {profile.country} ({profile.city})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportChat}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
            title="Download Chat Transcript"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 text-xs transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Agent Selector Bar */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Route to Agent:
        </span>
        {subAgents.map((ag) => {
          const isSelected = selectedAgent === ag.name;
          const Icon = ag.icon;
          return (
            <button
              key={ag.name}
              onClick={() => setSelectedAgent(ag.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all ${
                isSelected
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{ag.name}</span>
            </button>
          );
        })}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/40">
        {messages.map((m) => {
          const isAi = m.sender === "ai";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isAi ? "justify-start" : "justify-end"}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs font-bold text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 shadow-xs ${
                  isAi
                    ? "bg-white border border-slate-200 text-slate-800"
                    : "bg-slate-900 text-white"
                }`}
              >
                {isAi && (
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100 text-[11px] font-bold text-emerald-800">
                    <span>{m.agentName || "Business Manager"}</span>
                    <span className="text-slate-400 font-normal font-mono text-[10px]">
                      {m.timestamp}
                    </span>
                  </div>
                )}

                {isAi ? (
                  <MarkdownRenderer content={m.text} />
                ) : (
                  <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                    {m.text}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>{selectedAgent} is formulating strategy with Gemini 3.7...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
          Quick Ask:
        </span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-medium text-slate-700 whitespace-nowrap transition-colors"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-4 bg-white border-t border-slate-200 flex items-center gap-3 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask ${selectedAgent} anything about launching or growing ${profile.name}...`}
          disabled={isLoading}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};
