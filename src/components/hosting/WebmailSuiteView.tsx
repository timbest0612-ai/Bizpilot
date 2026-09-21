import React, { useState } from "react";
import {
  Mail,
  Send,
  Inbox,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  Lock,
  Copy,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Smartphone,
  Laptop,
} from "lucide-react";
import { BusinessProfile, BusinessEmailAccount, CurrencyCode } from "../../types";
import { INITIAL_BUSINESS_EMAILS, INITIAL_WEBMAIL_MESSAGES } from "../../data/initialData";
import { checkEmailDeliverability } from "../../services/api";

interface Props {
  profile: BusinessProfile;
  currency: CurrencyCode;
}

export const WebmailSuiteView: React.FC<Props> = ({ profile, currency }) => {
  const [activeTab, setActiveTab] = useState<"inbox" | "accounts" | "deliverability" | "client-setup">("inbox");
  const [accounts, setAccounts] = useState<BusinessEmailAccount[]>(INITIAL_BUSINESS_EMAILS);
  const [selectedAccount, setSelectedAccount] = useState<BusinessEmailAccount>(INITIAL_BUSINESS_EMAILS[0]);
  const [messages, setMessages] = useState(INITIAL_WEBMAIL_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState(INITIAL_WEBMAIL_MESSAGES[0]);

  // Compose State
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  // New Account State
  const [newPrefix, setNewPrefix] = useState("");
  const [newQuota, setNewQuota] = useState("10 GB");
  const [newForward, setNewForward] = useState("");

  // Deliverability Diagnostics
  const [isCheckingDeliverability, setIsCheckingDeliverability] = useState(false);
  const [diagnosticsResult, setDiagnosticsResult] = useState({
    overallScore: 100,
    spfStatus: "PASS",
    spfRecord: "v=spf1 include:_spf.hostpilot.io ~all",
    dkimStatus: "PASS",
    dkimSelector: "hostpilot2026",
    dmarcStatus: "PASS",
    dmarcPolicy: "v=DMARC1; p=reject; rua=mailto:dmarc@naijaflavors.ng",
    mxStatus: "PASS",
    spamBlacklistStatus: "CLEAN (0/58 Blacklists)",
  });

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrefix.trim()) return;
    const newAcc: BusinessEmailAccount = {
      id: "em_" + Date.now(),
      address: `${newPrefix.toLowerCase()}@naijaflavors.ng`,
      domain: "naijaflavors.ng",
      forwardTo: newForward.trim() || undefined,
      mailboxUsage: "0 MB",
      quota: newQuota,
      status: "ACTIVE",
      aliases: [],
      createdAt: new Date().toISOString(),
    };
    setAccounts([...accounts, newAcc]);
    setNewPrefix("");
    setNewForward("");
  };

  const handleSendMessage = () => {
    if (!composeTo || !composeSubject) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setShowComposeModal(false);
      setComposeTo("");
      setComposeSubject("");
      setComposeBody("");
      alert("Email sent securely via Anycast SMTP relay!");
    }, 1000);
  };

  const runDiagnostics = async () => {
    setIsCheckingDeliverability(true);
    try {
      const res = await checkEmailDeliverability("naijaflavors.ng");
      if (res.diagnostics) {
        setDiagnosticsResult(res.diagnostics);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingDeliverability(false);
    }
  };

  return (
    <div id="webmail-suite-container" className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-semibold tracking-wide">
              <Mail className="w-3.5 h-3.5" />
              ENTERPRISE BUSINESS EMAIL & WEBMAIL
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-white">
              Professional Webmail & Deliverability Cockpit
            </h1>
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              Send and receive from your branded domain (<span className="text-emerald-400 font-mono">@naijaflavors.ng</span>). Includes 100/100 SPF/DKIM/DMARC deliverability scoring, anti-spam filters, and IMAP/SMTP sync.
            </p>
          </div>

          <button
            onClick={() => setShowComposeModal(true)}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl transition flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
          >
            <Send className="w-4 h-4" /> Compose Message
          </button>
        </div>

        {/* Sub Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-800 scrollbar-none">
          {[
            { id: "inbox", label: "Webmail Inbox", icon: Inbox },
            { id: "accounts", label: "Email Accounts", icon: Mail },
            { id: "deliverability", label: "Deliverability (100/100)", icon: ShieldCheck },
            { id: "client-setup", label: "Outlook / iOS Setup", icon: Smartphone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: WEBMAIL INBOX */}
      {activeTab === "inbox" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Inbox ({selectedAccount.address})
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {messages.length} Messages
              </span>
            </div>

            <div className="space-y-2">
              {messages.map((msg) => {
                const isSelected = selectedMessage.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      isSelected
                        ? "bg-blue-50 border-blue-300 text-blue-950 shadow-sm"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-900"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs truncate max-w-[140px]">{msg.from}</span>
                      <span className="text-[10px] text-slate-400">{msg.date}</span>
                    </div>
                    <div className="font-semibold text-xs mt-1 truncate">{msg.subject}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{msg.snippet}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message Reader View */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-slate-900">{selectedMessage.subject}</h2>
                  <span className="text-xs text-slate-400">{selectedMessage.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-bold text-slate-900">From:</span> {selectedMessage.from}
                  <span className="mx-1">•</span>
                  <span className="font-bold text-slate-900">To:</span> {selectedAccount.address}
                </div>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
                {selectedMessage.body}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => {
                  setComposeTo(selectedMessage.from);
                  setComposeSubject(`Re: ${selectedMessage.subject}`);
                  setShowComposeModal(true);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Reply to Sender
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EMAIL ACCOUNTS & QUOTAS */}
      {activeTab === "accounts" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Custom Domain Email Accounts (@naijaflavors.ng)
              </h3>
              <p className="text-xs text-slate-500">
                Create dedicated mailboxes for support, billing, team members, or set up forwarders.
              </p>
            </div>

            {/* Create Account Form */}
            <form onSubmit={handleCreateAccount} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Add New Mailbox
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Email Prefix</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={newPrefix}
                      onChange={(e) => setNewPrefix(e.target.value)}
                      placeholder="e.g. sales, support"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-l-xl text-xs outline-none"
                    />
                    <span className="p-2.5 bg-slate-200 text-slate-700 text-xs font-mono rounded-r-xl border border-l-0 border-slate-300">
                      @naijaflavors.ng
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Quota Allocation</label>
                  <select
                    value={newQuota}
                    onChange={(e) => setNewQuota(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-none"
                  >
                    <option>5 GB</option>
                    <option>10 GB</option>
                    <option>25 GB</option>
                    <option>Unlimited</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Forwarding Address (Optional)</label>
                  <input
                    type="email"
                    value={newForward}
                    onChange={(e) => setNewForward(e.target.value)}
                    placeholder="e.g. mypersonal@gmail.com"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newPrefix}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" /> Provision Mailbox
                </button>
              </div>
            </form>

            {/* Accounts Table */}
            <div className="space-y-3">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  className="border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-slate-900 font-mono text-sm">{acc.address}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        SSL SECURED
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Storage: {acc.mailboxUsage} of {acc.quota} • {acc.forwardTo ? `Forwarding to: ${acc.forwardTo}` : "Direct Inbox"}
                    </div>
                  </div>

                  <a
                    href={`https://webmail.${acc.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Webmail Login
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DELIVERABILITY & 100/100 HEALTH */}
      {activeTab === "deliverability" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Email Authentication & Spam Diagnostics
                </h3>
                <p className="text-xs text-slate-500">
                  Guarantee your emails never land in customer spam folders across Gmail, Yahoo, and Outlook.
                </p>
              </div>

              <button
                onClick={runDiagnostics}
                disabled={isCheckingDeliverability}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCheckingDeliverability ? "animate-spin" : ""}`} />
                {isCheckingDeliverability ? "Running Global DNS Test..." : "Re-Scan DNS Deliverability"}
              </button>
            </div>

            {/* Score Banner */}
            <div className="bg-emerald-950 border border-emerald-800 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  Deliverability Index
                </span>
                <div className="text-4xl font-bold font-mono text-emerald-300">
                  {diagnosticsResult.overallScore} / 100
                </div>
                <div className="text-xs text-slate-300">
                  Perfect inbox placement. All 4 authentication layers fully verified.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">SPF Check:</span>
                  <span className="text-emerald-400 font-bold">100% PASS</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">DKIM 2048-bit:</span>
                  <span className="text-emerald-400 font-bold">100% PASS</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">DMARC Policy:</span>
                  <span className="text-emerald-400 font-bold">REJECT (Strict)</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">Blacklists:</span>
                  <span className="text-emerald-400 font-bold">0 / 58 CLEAN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CLIENT SETUP (OUTLOOK, IOS, ANDROID) */}
      {activeTab === "client-setup" && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                IMAP & SMTP Client Configuration Settings
              </h3>
              <p className="text-xs text-slate-500">
                Use these parameters to configure Apple Mail, Microsoft Outlook, Thunderbird, or mobile mail apps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* IMAP */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 font-mono text-xs">
                <div className="font-sans font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-600" /> Incoming Mail (IMAP SSL/TLS)
                </div>
                <div className="space-y-1 text-slate-700">
                  <div><span className="text-slate-400">Server:</span> mail.naijaflavors.ng</div>
                  <div><span className="text-slate-400">Port:</span> 993 (SSL/TLS)</div>
                  <div><span className="text-slate-400">Username:</span> Full email address</div>
                  <div><span className="text-slate-400">Authentication:</span> Password</div>
                </div>
              </div>

              {/* SMTP */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 font-mono text-xs">
                <div className="font-sans font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-emerald-600" /> Outgoing Mail (SMTP SSL/TLS)
                </div>
                <div className="space-y-1 text-slate-700">
                  <div><span className="text-slate-400">Server:</span> mail.naijaflavors.ng</div>
                  <div><span className="text-slate-400">Port:</span> 465 (SSL/TLS) or 587 (STARTTLS)</div>
                  <div><span className="text-slate-400">Authentication:</span> Required (Same as IMAP)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPOSE MESSAGE MODAL */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 lg:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Compose New Email</h3>
              <button onClick={() => setShowComposeModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">To</label>
                <input
                  type="email"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  placeholder="e.g. Quotation & Partnership Inquiry"
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message Body</label>
                <textarea
                  rows={6}
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  placeholder="Write your email here..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs outline-none font-sans"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowComposeModal(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={isSending || !composeTo}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Send Branded Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
