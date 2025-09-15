import React from "react";

export default function ChatList({ chats, onSelectChat }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Chats</h2>
      <div className="space-y-3">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer"
          >
            <div className="flex justify-between">
              <div className="font-semibold">{chat.name}</div>
              <div className="text-xs text-gray-400">{chat.time}</div>
            </div>
            <div className="text-sm text-gray-600 mt-1">{chat.lastMessage}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
