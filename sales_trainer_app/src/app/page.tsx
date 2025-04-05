"use client";

import React, { useState } from 'react';
import Image from "next/image";

// Component that displays the list of available scenarios on the left side
const ScenarioPanel = () => (
  <div className="w-1/4 bg-black text-white p-4 border-r border-gray-800">
    <h2 className="text-lg font-bold mb-4">Scenarios</h2>
    <div className="space-y-2">
      <div className="p-2 bg-black rounded border border-gray-800 hover:border-gray-600 transition-colors">
        <h3 className="font-semibold">Offer Special Promotions</h3>
        <p className="text-sm">Offer promotions, send more conversions, and mynically.</p>
      </div>
      <div className="p-2 bg-black rounded border border-gray-800 hover:border-gray-600 transition-colors">
        <h3 className="font-semibold">Highlight the Value</h3>
        <p className="text-sm">Focus on ongoing to increase performance.</p>
      </div>
      <button className="mt-4 p-2 bg-black rounded border border-gray-800 hover:border-gray-600 w-full text-center transition-colors">+ Add</button>
    </div>
  </div>
);

// Main chat interface component that handles messages and user input
const ChatArea = () => {
  // State for managing the input field text
  const [inputText, setInputText] = useState('');
  
  // State for managing chat messages
  // Each message has: text (content) and isUser (whether sent by user)
  const [messages, setMessages] = useState([
    { text: "Hello", isUser: false },
    { text: "Hi there! I'm thinking of upgrading my plan. What can you offer me?", isUser: true }
  ]);

  // Handler for sending new messages
  // Adds the current input text to messages and clears the input
  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText.trim(), isUser: true }]);
      setInputText('');
    }
  };

  // Enables sending messages with the Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 bg-black text-white p-4 flex flex-col">
      {/* Chat messages container with scrolling */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Initial context message */}
        <div className="mb-4">
          <p className="bg-gray-950 p-2 rounded self-start max-w-[80%] break-words">
            The user is an existing customer who is interested in upgrading their current plan.
          </p>
        </div>
        {/* Message list - maps through messages array and renders each message */}
        {messages.map((message, index) => (
          <div key={index} className="mb-4 flex">
            <p className={`p-2 rounded break-words ${
              message.isUser 
                ? 'bg-gray-950 ml-auto max-w-[80%]' // User messages aligned right
                : 'bg-gray-950 max-w-[80%]'         // Bot messages aligned left
            }`}>
              {message.text}
            </p>
          </div>
        ))}
      </div>
      {/* Message input area */}
      <div className="mt-4 flex relative">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 pr-12 bg-gray-950 rounded text-white" 
          placeholder="Type a message..." 
        />
        <button 
          onClick={handleSendMessage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Send message"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-5 h-5 rotate-45"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Root component that combines ScenarioPanel and ChatArea
const App = () => (
  <div className="flex h-screen">
    <ScenarioPanel />
    <ChatArea />
  </div>
);

export default App;
