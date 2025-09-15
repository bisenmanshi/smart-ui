// src/components/ChatWindow.jsx
import React, { useState } from "react";

function generateSummary(messages) {
  if (!messages || messages.length === 0) return "No messages to summarize.";
  // very simple dummy summary: take first and last messages
  const first = messages[0].text;
  const last = messages[messages.length - 1].text;
  return `Summary: ${first.split(".")[0]} ... and lastly: ${last.split(".")[0]}.`;
}

function smartReplyCandidates(lastText) {
  // simple heuristics for dummy suggestions
  if (!lastText) return ["Okay!", "Thanks!", "Can we discuss?"];
  const lower = lastText.toLowerCase();
  if (lower.includes("report") || lower.includes("update")) {
    return ["I'll update it today.", "Can I help with this?", "Let's set a deadline."];
  }
  if (lower.includes("meet") || lower.includes("meeting")) {
    return ["What time suits you?", "I can do 10 AM.", "Let's do tomorrow."];
  }
  return ["Sounds good!", "Thanks for the update!", "I'll check and reply."];
}

export default function ChatWindow({ chat, onBack, onSendMessage, onUpdateChat }) {
  const [input, setInput] = useState("");
  const [showSummary, setShowSummary] = useState("");
  const [suggestion, setSuggestion] = useState("");

  if (!chat) return <div className="text-gray-600">Select a chat to view messages.</div>;

  const lastMessage = chat.messages[chat.messages.length - 1]?.text || "";

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <button onClick={onBack} className="px-2 py-1 rounded bg-gray-200">← Back</button>
        <h2 className="text-xl font-semibold">{chat.name}</h2>
      </div>

      <div className="bg-white rounded-lg p-4 h-64 overflow-y-auto shadow-sm">
        {chat.messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.from === "You" ? "text-right" : "text-left"}`}>
            <div className="text-sm text-gray-500">{m.from}</div>
            <div className="inline-block p-2 rounded-lg mt-1 bg-gray-100">{m.text}</div>
            <div className="text-xs text-gray-400 mt-1">{m.time}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setShowSummary(generateSummary(chat.messages))}
          className="px-3 py-1 rounded bg-blue-600 text-white"
        >
          Summarize Thread
        </button>

        <button
          onClick={() => {
            const suggestions = smartReplyCandidates(lastMessage);
            setSuggestion(suggestions[0]);
          }}
          className="px-3 py-1 rounded bg-green-600 text-white"
        >
          Smart Reply Suggestion
        </button>
      </div>

      {showSummary && (
        <div className="mt-3 p-3 bg-white rounded shadow-sm">
          <h3 className="font-semibold">Summary</h3>
          <p className="text-gray-700 mt-1">{showSummary}</p>
        </div>
      )}

      {suggestion && (
        <div className="mt-3 p-3 bg-white rounded shadow-sm">
          <h3 className="font-semibold">Smart Reply</h3>
          <div className="mt-2 flex gap-2">
            <div className="flex-1 p-2 bg-gray-100 rounded">{suggestion}</div>
            <button
              onClick={() => {
                // append reply to messages locally
                const newMsg = { from: "You", text: suggestion, time: new Date().toLocaleTimeString() };
                onUpdateChat(chat.id, newMsg);
                setSuggestion("");
              }}
              className="px-3 py-1 rounded bg-indigo-600 text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded border"
          placeholder="Type a message (local only)"
        />
        <button
          onClick={() => {
            if (!input.trim()) return;
            const newMsg = { from: "You", text: input.trim(), time: new Date().toLocaleTimeString() };
            onUpdateChat(chat.id, newMsg); // pass to parent
            setInput("");
          }}
          className="px-3 py-1 rounded bg-black text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
