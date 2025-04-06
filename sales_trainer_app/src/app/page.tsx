"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { processMessage } from '../utils/api'; // Import our kitchen function
import ScenarioPanel from './components/ScenarioPanel';
import ChatArea from './components/ChatArea';
import Landing from './components/Landing';

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
  const [currentScenario, setCurrentScenario] = useState('Cold Call Interruption');

  // State for managing messages for each scenario
  const [scenarioMessages, setScenarioMessages] = useState<ScenarioMessages>({
    'Cold Call Interruption': [
      { text: "You're a sales representative practicing cold calls. Your customer is likely busy with work.", isUser: false }
    ],
    'Door-to-Door Sales': [
      { text: "You're practicing door-to-door sales. Your customer was in the middle of dinner preparation.", isUser: false }
    ],
    'Coffee Shop Pitch': [
      { text: "You're practicing in-person sales at a coffee shop. Your customer is trying to have a quiet break.", isUser: false }
    ],
    'Email Follow-up': [
      { text: "You're practicing follow-up conversations. This customer has previously ignored several emails.", isUser: false }
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

const HomePage = () => {
  const [showLanding, setShowLanding] = useState(true);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  return showLanding ? <Landing onGetStarted={handleGetStarted} /> : <App />;
};

export default HomePage;
