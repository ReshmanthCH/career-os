import { useState, useRef, useEffect } from "react";
import ConversationBubble from "./ConversationBubble";
import SuggestionCard from "./SuggestionCard";

function ChatWindow({ messages, onSendMessage, isSending, onSelectPrompt }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-[640px] bg-slate-50/60 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.length <= 1 && (
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl shadow-sm space-y-1">
              <h3 className="text-sm font-extrabold flex items-center space-x-2">
                <span>🤖 AI Career Copilot Active</span>
              </h3>
              <p className="text-xs text-indigo-100 font-medium">
                I am connected to your complete CareerOS profile (Resume score, DSA solved, GitHub repos, Company readiness, & Sync history). Ask me anything!
              </p>
            </div>
            <SuggestionCard onSelectPrompt={onSelectPrompt} />
          </div>
        )}

        {messages.map((msg, idx) => (
          <ConversationBubble key={msg._id || idx} message={msg} />
        ))}

        {isSending && (
          <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xs bg-white p-3 rounded-2xl border border-indigo-100 w-fit shadow-sm animate-pulse">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></div>
            <span>Career Copilot is reasoning over your CareerOS data...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Area */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-white border-t border-gray-200 flex items-center space-x-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Ask Copilot (e.g. 'Am I ready for Amazon?', 'Analyze my resume', 'What project to build?')..."
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
        />

        <button
          type="submit"
          disabled={!input.trim() || isSending}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs rounded-xl shadow transition disabled:opacity-50 flex items-center space-x-1"
        >
          <span>Send</span>
          <span>&rarr;</span>
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
