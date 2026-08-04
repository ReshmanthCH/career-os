import { useState } from "react";

function HistoryCard({ history, onSelectConversation, onTogglePin, onDeleteConversation }) {
  const [search, setSearch] = useState("");

  const filtered = history.filter((h) =>
    (h.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">Conversation History & Saved Sessions</h3>
          <p className="text-xs text-gray-500">
            Pin or resume past Copilot advisory conversations.
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conversations..."
          className="px-3 py-2 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="p-8 text-center text-xs text-gray-500">
          No matching conversation history found.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="p-4 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-gray-200 transition flex items-center justify-between gap-4 group"
            >
              <div
                onClick={() => onSelectConversation(item._id)}
                className="flex-1 cursor-pointer space-y-1"
              >
                <div className="flex items-center space-x-2">
                  {item.isPinned && (
                    <span className="text-xs" title="Pinned Conversation">
                      📌
                    </span>
                  )}
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[11px] text-gray-500">
                  {item.messages?.length || 0} messages • Last active:{" "}
                  {new Date(item.lastMessageAt || item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onTogglePin(item._id)}
                  className={`p-2 rounded-lg text-xs font-bold transition border ${
                    item.isPinned
                      ? "bg-amber-100 text-amber-800 border-amber-300"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                  title={item.isPinned ? "Unpin Conversation" : "Pin Conversation"}
                >
                  {item.isPinned ? "📌 Pinned" : "Pin"}
                </button>

                <button
                  onClick={() => onDeleteConversation(item._id)}
                  className="p-2 bg-white text-gray-400 hover:text-red-600 border border-gray-200 hover:bg-red-50 rounded-lg text-xs transition"
                  title="Delete Conversation"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryCard;
