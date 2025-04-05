"use client";

import React, { useState } from 'react';
import Image from "next/image";

// Define a type for messages
interface Message {
  text: string;
  isUser: boolean;
}

// Define a type for scenario messages
interface ScenarioMessages {
  [key: string]: Message[];
}

// Root component that combines ScenarioPanel and ChatArea
const App = () => {
  // State for managing the current scenario
  const [currentScenario, setCurrentScenario] = useState('Offer Special Promotions');

  // State for managing messages for each scenario
  const [scenarioMessages, setScenarioMessages] = useState<ScenarioMessages>({
    'Offer Special Promotions': [
      { text: "Hi! I'm an AI chatbot here to help you practice your selling skills! Get started by giving me your pitch.", isUser: false },
      { text: "Hi there! I'm thinking of upgrading my plan. What can you offer me?", isUser: true }
    ],
    'Highlight the Value': [
      { text: "Welcome! Let's discuss the value of our services.", isUser: false },
      { text: "Sure, what are the key benefits?", isUser: true }
    ]
  });

  // State for managing the visibility of the add scenario form
  const [isFormVisible, setFormVisible] = useState(false);

  // State for managing new scenario input
  const [newScenario, setNewScenario] = useState({ title: '', description: '' });

  // Function to update messages for the current scenario
  const updateMessages = (newMessage: Message) => {
    setScenarioMessages(prevMessages => ({
      ...prevMessages,
      [currentScenario]: [...prevMessages[currentScenario], newMessage]
    }));
  };

  // Function to add a new scenario
  const addNewScenario = () => {
    if (newScenario.title.trim() && newScenario.description.trim()) {
      setScenarioMessages(prevMessages => ({
        ...prevMessages,
        [newScenario.title]: [{ text: newScenario.description, isUser: false }]
      }));
      setFormVisible(false);
      setNewScenario({ title: '', description: '' });
    }
  };

  return (
    <div className="flex h-screen font-sans">
      <ScenarioPanel 
        setCurrentScenario={setCurrentScenario} 
        setFormVisible={setFormVisible} 
        scenarioMessages={scenarioMessages} 
      />
      <ChatArea 
        currentScenario={currentScenario} 
        scenarioMessages={scenarioMessages} 
        updateMessages={updateMessages} 
      />
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Scenario</h2>
            <input 
              type="text" 
              placeholder="Title" 
              value={newScenario.title} 
              onChange={(e) => setNewScenario({ ...newScenario, title: e.target.value })} 
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea 
              placeholder="Short Description" 
              value={newScenario.description} 
              onChange={(e) => setNewScenario({ ...newScenario, description: e.target.value })} 
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={addNewScenario} 
              className="w-full p-3 bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300 hover:text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Update ScenarioPanel to display the description
const ScenarioPanel = ({ setCurrentScenario, setFormVisible, scenarioMessages }: { setCurrentScenario: React.Dispatch<React.SetStateAction<string>>, setFormVisible: React.Dispatch<React.SetStateAction<boolean>>, scenarioMessages: ScenarioMessages }) => (
  <div className="w-1/4 bg-black text-white p-6 border-r border-gray-800">
    <h2 className="text-xl font-semibold mb-6 text-gray-100">Scenarios</h2>
    <div className="space-y-3">
      {Object.keys(scenarioMessages).map((scenario, index) => (
        <div 
          key={index}
          className="p-4 bg-black rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => setCurrentScenario(scenario)}
        >
          <h3 className="font-medium text-gray-200 mb-2">{scenario}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">{scenarioMessages[scenario][0].text}</p>
        </div>
      ))}
      <button 
        onClick={() => setFormVisible(true)}
        className="mt-4 p-3 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg w-full text-center text-gray-300 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md font-medium"
      >
        + Add
      </button>
    </div>
  </div>
);

// Update ChatArea to accept currentScenario, scenarioMessages, and updateMessages as props
const ChatArea = ({ currentScenario, scenarioMessages, updateMessages }: { currentScenario: string, scenarioMessages: ScenarioMessages, updateMessages: (newMessage: Message) => void }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>(scenarioMessages[currentScenario]);

  // Update messages when the current scenario changes
  React.useEffect(() => {
    setMessages(scenarioMessages[currentScenario]);
  }, [currentScenario, scenarioMessages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = { text: inputText.trim(), isUser: true };
      updateMessages(newMessage);
      setInputText('');
    }
  };

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
        {messages.map((message: Message, index: number) => (
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

export default App;
