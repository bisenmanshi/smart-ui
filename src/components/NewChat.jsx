import React, { useState } from "react";

const sampleIcebreakers = [
  "Hey! Happy to connect — how's your week going?",
  "Hi! Quick intro: I handle frontend tasks for the project.",
  "Hello! Any blockers I can help with today?"
];

export default function NewChat({ onCreate, onBack }) {
  const [name, setName] = useState("");
  const [icebreaker, setIcebreaker] = useState("");

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <button onClick={onBack} className="px-2 py-1 rounded bg-gray-200">← Back</button>
        <h2 className="text-xl font-semibold">New Chat</h2>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <label className="block mb-2 font-medium">Participant name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="Enter name"
        />

        <div className="flex gap-2">
          <button
            onClick={() => {
              const picked = sampleIcebreakers[Math.floor(Math.random() * sampleIcebreakers.length)];
              setIcebreaker(picked);
            }}
            className="px-3 py-1 rounded bg-purple-600 text-white"
          >
            Generate Icebreaker
          </button>

          <button
            onClick={() => {
              if (!name.trim()) return alert("Enter a participant name.");
              onCreate(name.trim(), icebreaker || "Hi there!");
            }}
            className="px-3 py-1 rounded bg-green-600 text-white"
          >
            Create Chat
          </button>
        </div>

        {icebreaker && (
          <div className="mt-3 p-2 bg-gray-100 rounded">
            <strong>Suggestion:</strong>
            <div className="mt-1">{icebreaker}</div>
          </div>
        )}
      </div>
    </div>
  );
}
