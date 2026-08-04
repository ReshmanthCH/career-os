import { useState } from "react";

function ConversationBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const isCopilot = message.sender === "copilot";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic formatting helper for markdown bold and bullet points
  const formatText = (text) => {
    if (!text) return "";
    
    // Replace **bold** with <strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Split into paragraphs/lines
    const lines = formatted.split('\n');
    
    return lines.map((line, idx) => {
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc font-medium text-slate-800 my-0.5" dangerouslySetInnerHTML={{ __html: line.replace(/^[\*\-]\s*/, '') }} />
        );
      }
      return (
        <p key={idx} className="my-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: line }} />
      );
    });
  };

  return (
    <div className={`flex flex-col ${isCopilot ? "items-start" : "items-end"} space-y-1`}>
      <div className="flex items-center space-x-2 px-1">
        <span className="text-[10px] font-bold uppercase text-gray-400">
          {isCopilot ? "✨ Career Copilot" : "You"}
        </span>
        <span className="text-[10px] text-gray-400">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div
        className={`relative max-w-2xl rounded-2xl p-4 text-xs font-medium shadow-sm leading-relaxed ${
          isCopilot
            ? "bg-white border border-gray-200 text-gray-800 rounded-tl-none space-y-1"
            : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-tr-none"
        }`}
      >
        <div className="whitespace-pre-line">{formatText(message.text)}</div>

        {isCopilot && (
          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-end space-x-2">
            <button
              onClick={handleCopy}
              className="text-[10px] font-bold text-gray-500 hover:text-indigo-600 px-2 py-0.5 rounded bg-gray-50 hover:bg-indigo-50 border border-gray-200 transition"
            >
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConversationBubble;
