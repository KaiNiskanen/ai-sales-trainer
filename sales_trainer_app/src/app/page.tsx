"use client";

import React, { useState } from 'react';
import Image from "next/image";

// Component that displays the list of available scenarios on the left side
const ScenarioPanel = () => (
  <div className="w-1/4 bg-black text-white p-6 border-r border-gray-800">
    <h2 className="text-xl font-semibold mb-6 text-gray-100">Scenarios</h2>
    <div className="space-y-3">
      <div className="p-4 bg-black rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md">
        <h3 className="font-medium text-gray-200 mb-2">Offer Special Promotions</h3>
        <p className="text-sm text-gray-400 leading-relaxed">Offer promotions, send more conversions, and mynically.</p>
      </div>
      <div className="p-4 bg-black rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md">
        <h3 className="font-medium text-gray-200 mb-2">Highlight the Value</h3>
        <p className="text-sm text-gray-400 leading-relaxed">Focus on ongoing to increase performance.</p>
      </div>
      <button className="mt-4 p-3 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg w-full text-center text-gray-300 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md font-medium">+ Add</button>
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
    <div className="flex-1 bg-black text-white p-6 flex flex-col">
      {/* Chat messages container with scrolling */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-4">
        {/* Initial context message */}
        <div className="mb-4 flex items-start">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xs font-medium mr-3 shadow-md">
            AI
          </div>
          <p className="bg-gray-900 p-4 rounded-2xl rounded-tl-none self-start max-w-[80%] break-words text-gray-200 shadow-sm">
            The user is an existing customer who is interested in upgrading their current plan.
          </p>
        </div>
        {/* Message list - maps through messages array and renders each message */}
        {messages.map((message, index) => (
          <div key={index} className="mb-4 flex items-start">
            {!message.isUser && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xs font-medium mr-3 shadow-md">
                AI
              </div>
            )}
            <p className={`p-4 rounded-2xl break-words shadow-sm ${
              message.isUser 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 ml-auto max-w-[80%] rounded-tr-none text-white' 
                : 'bg-gray-900 max-w-[80%] rounded-tl-none text-gray-200'
            }`}>
              {message.text}
            </p>
          </div>
        ))}
      </div>
      {/* Message input area */}
      <div className="mt-6 flex relative">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-4 pr-12 bg-gray-900 rounded-2xl text-white placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" 
          placeholder="Type a message..." 
        />
        <button 
          onClick={handleSendMessage}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Send message"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-6 h-6 rotate-45"
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
  <div className="flex h-screen font-sans">
    <ScenarioPanel />
    <ChatArea />
  </div>
);

export default App;
