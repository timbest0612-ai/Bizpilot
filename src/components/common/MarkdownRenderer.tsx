import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<Props> = ({ content, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format markdown-like text nicely
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-lg font-bold text-slate-900 mt-4 mb-2">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-xl font-bold text-slate-900 mt-5 mb-2 pb-1 border-b border-slate-200">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-2xl font-black text-slate-900 mt-6 mb-3">
            {line.replace("# ", "")}
          </h1>
        );
      }
      // Horizontal Rule
      if (line.trim() === "---") {
        return <hr key={idx} className="my-4 border-slate-200" />;
      }
      // Blockquotes
      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={idx}
            className="border-l-4 border-emerald-500 bg-emerald-50/60 pl-3 py-1.5 my-2 text-sm text-slate-700 italic rounded-r"
          >
            {line.replace("> ", "")}
          </blockquote>
        );
      }
      // List items
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const itemText = line.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-sm text-slate-700 my-1 leading-relaxed">
            {formatInline(itemText)}
          </li>
        );
      }
      // Numbered items
      if (/^\d+\.\s/.test(line)) {
        const numMatch = line.match(/^(\d+\.)\s(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start space-x-2 my-1 text-sm text-slate-700 leading-relaxed">
              <span className="font-semibold text-emerald-700 shrink-0">{numMatch[1]}</span>
              <span>{formatInline(numMatch[2])}</span>
            </div>
          );
        }
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      // Paragraph
      return (
        <p key={idx} className="text-sm text-slate-700 my-1.5 leading-relaxed">
          {formatInline(line)}
        </p>
      );
    });
  };

  const formatInline = (text: string) => {
    // Replace **bold** and `code`
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 bg-slate-100 text-emerald-700 text-xs font-mono rounded">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className={`relative group ${className}`}>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs"
        title="Copy text"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-600 font-medium">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
      <div className="prose-sm max-w-none">{renderFormattedText(content)}</div>
    </div>
  );
};
