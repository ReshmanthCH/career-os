import React from "react";

function ConversationBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-xl rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium shadow-sm ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-slate-100 text-slate-800 border border-slate-200/80 rounded-bl-none"
        }`}
      >
        <div className="flex items-center space-x-1.5 mb-1 font-bold text-[10px] opacity-70">
          <span>{isUser ? "You" : "✨ AI DSA Mentor"}</span>
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}

export default ConversationBubble;
