import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Zap,
  Globe,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Check,
  Cpu,
  Radio,
  FileText,
} from "lucide-react";
import { BusinessProfile, SslCertificateRecord, CurrencyCode } from "../../types";
import { INITIAL_SSL_CERTIFICATES } from "../../data/initialData";

interface Props {
  profile: BusinessProfile;
  currency: CurrencyCode;
}

export const SslSecurityView: React.FC<Props> = ({ profile, currency }) => {
  const [certs, setCerts] = useState<SslCertificateRecord[]>(INITIAL_SSL_CERTIFICATES);
  const [forceHttps, setForceHttps] = useState(true);
  const [tls13, setTls13] = useState(true);
  const [http3Quic, setHttp3Quic] = useState(true);
  const [wafProtection, setWafProtection] = useState(true);
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewSuccess, setRenewSuccess] = useState(false);

  const handleRenewCert = () => {
    setIsRenewing(true);
    setRenewSuccess(false);
    setTimeout(() => {
      setIsRenewing(false);
      setRenewSuccess(true);
      setTimeout(() => setRenewSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div id="ssl-security-container" className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide">
              <Lock className="w-3.5 h-3.5" />
              END-TO-END TLS 1.3 & ZERO-TRUST SECURITY
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-white">
              SSL / TLS & Web Application Firewall (WAF)
            </h1>
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              Automated Let's Encrypt Wildcard certificate renewal, HTTP/3 QUIC acceleration, HSTS preload compliance, and enterprise DDoS scrubbing.
            </p>
          </div>

          <button
            onClick={handleRenewCert}
            disabled={isRenewing}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl transition flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {isRenewing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Renewing Certificates...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" /> Force Re-Issue All SSLs
              </>
            )}
          </button>
        </div>
      </div>

      {renewSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> All SSL Certificates renewed and deployed across 320+ Anycast PoPs!
        </div>
      )}

      {/* SSL Certificates List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          Active SSL / TLS Certificates ({certs.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="border border-slate-200 rounded-2xl p-5 space-y-4 hover:border-emerald-500 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-slate-900 font-mono text-base">
                      {cert.domain}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Issued by: {cert.issuer} • Type: {cert.type}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {cert.status}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1">
                <div>
                  <span className="text-slate-400">Wildcard Coverage:</span>{" "}
                  <span className="text-emerald-700 font-bold">
                    {cert.isWildcard ? "YES (*.domain + root)" : "NO (Single Domain)"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Expires:</span>{" "}
                  <span>{new Date(cert.expiresAt).toLocaleDateString()} (Auto-Renews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Policies & Controls */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          Edge Security & Protocol Enforcement
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Force HTTPS */}
          <div className="border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-bold text-sm text-slate-900">Force Automatic HTTPS 301 Redirect</div>
              <p className="text-xs text-slate-500">
                Instantly redirect all unencrypted HTTP traffic to secure HTTPS with HSTS headers.
              </p>
            </div>
            <button
              onClick={() => setForceHttps(!forceHttps)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                forceHttps ? "bg-emerald-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  forceHttps ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* TLS 1.3 & HTTP/3 */}
          <div className="border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-bold text-sm text-slate-900">Enforce TLS 1.3 & HTTP/3 (QUIC)</div>
              <p className="text-xs text-slate-500">
                Disable insecure legacy TLS 1.0/1.1 and accelerate page loads via UDP zero-RTT handshake.
              </p>
            </div>
            <button
              onClick={() => setTls13(!tls13)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                tls13 ? "bg-emerald-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  tls13 ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* ModSecurity WAF */}
          <div className="border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-bold text-sm text-slate-900">ModSecurity Enterprise WAF</div>
              <p className="text-xs text-slate-500">
                OWASP Core Rule Set protects against SQL injection, XSS, and bad bot scrapers.
              </p>
            </div>
            <button
              onClick={() => setWafProtection(!wafProtection)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                wafProtection ? "bg-emerald-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  wafProtection ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* DDoS Scrubbing */}
          <div className="border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-bold text-sm text-slate-900">Anycast 12 Tbps DDoS Scrubbing</div>
              <p className="text-xs text-slate-500">
                Automatic mitigation of SYN floods, UDP amplification, and Layer 7 HTTP floods.
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
              ACTIVE (Always-On)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
