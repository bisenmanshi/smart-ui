import "./App.css";

// src/App.jsx
import React, { useState } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import NewChat from "./components/NewChat";
import { initialChats } from "./data/dummyData";

export default function App() {
  const [screen, setScreen] = useState("list"); // 'list' | 'chat' | 'new'
  const [chats, setChats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState(null);

  const onSelectChat = (chat) => {
    setSelectedChat(chat);
    setScreen("chat");
  };

  const onCreate = (name, icebreaker) => {
    const id = Date.now();
    const newChat = {
      id,
      name,
      lastMessage: icebreaker,
      time: new Date().toLocaleDateString(),
      messages: [{ from: name, text: icebreaker, time: new Date().toLocaleTimeString() }]
    };
    setChats([newChat, ...chats]);
    setSelectedChat(newChat);
    setScreen("chat");
  };

  const onUpdateChat = (chatId, message) => {
    setChats(prev => {
      return prev.map(c => {
        if (c.id === chatId) {
          const updated = {
            ...c,
            messages: [...c.messages, message],
            lastMessage: message.text,
            time: message.time
          };
          if (selectedChat && selectedChat.id === chatId) setSelectedChat(updated);
          return updated;
        }
        return c;
      });
    });
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-4xl grid grid-cols-3 gap-6">
        {/* Left column: Chat List */}
        <div className="col-span-1">
          <div className="sticky top-6 bg-transparent">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Smart Chat</h1>
              <button onClick={() => setScreen("new")} className="px-3 py-1 rounded bg-blue-600 text-white">New</button>
            </div>
            <ChatList chats={chats} onSelectChat={onSelectChat} />
          </div>
        </div>

        {/* Middle/Right: Chat window or New chat */}
        <div className="col-span-2 bg-transparent">
          <div className="bg-white p-6 rounded-lg shadow">
            {screen === "list" && (
              <div className="text-gray-600">Select a chat from left or click New to start a chat.</div>
            )}
            {screen === "chat" && selectedChat && (
              <ChatWindow
                chat={selectedChat}
                onBack={() => setScreen("list")}
                onUpdateChat={onUpdateChat}
              />
            )}
            {screen === "new" && (
              <NewChat
                onCreate={onCreate}
                onBack={() => setScreen("list")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

