import { useState, useEffect, useRef } from "react";
import ConversationBubble from "./ConversationBubble";

function AIChat({ chatHistory = [], onSendMessage, onClearHistory, isSending }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What should I solve today?",
    "Why am I weak in Dynamic Programming?",
    "Recommend 5 Binary Search problems.",
    "How long until I'm ready for Amazon?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isSending]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleQuickClick = (prompt) => {
    if (isSending) return;
    onSendMessage(prompt);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[520px]">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🤖</span>
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              AI DSA Mentor Assistant
            </h3>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-1">
              <span>● Online • Context Aware</span>
            </span>
          </div>
        </div>

        {chatHistory.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-[11px] font-semibold text-gray-400 hover:text-red-600 transition"
          >
            Clear Chat
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-slate-50/50">
        {chatHistory.length === 0 ? (
          <div className="text-center py-12 space-y-3 max-w-sm mx-auto">
            <span className="text-4xl block">💡</span>
            <p className="text-xs font-bold text-gray-800">Ask your AI DSA Mentor anything!</p>
            <p className="text-[11px] text-gray-500">
              Get personalized problem suggestions, algorithm pattern breakdowns, or target company preparation timelines.
            </p>
          </div>
        ) : (
          chatHistory.map((msg, idx) => <ConversationBubble key={idx} message={msg} />)
        )}

        {isSending && (
          <div className="flex justify-start mb-3">
            <div className="bg-slate-100 border border-slate-200/80 rounded-2xl rounded-bl-none px-4 py-2.5 text-xs text-slate-500 font-medium animate-pulse flex items-center space-x-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
              <span>AI Mentor is thinking & analyzing context...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-1.5 overflow-x-auto">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickClick(qp)}
            disabled={isSending}
            className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:border-indigo-200 text-gray-700 hover:text-indigo-700 text-[10px] font-semibold rounded-lg transition border border-gray-200 disabled:opacity-50 whitespace-nowrap"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask a question or request a study plan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending}
          className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default AIChat;
