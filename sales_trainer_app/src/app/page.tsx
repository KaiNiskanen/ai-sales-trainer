import React from 'react';
import Image from "next/image";

const ScenarioPanel = () => (
  <div className="w-1/3 bg-gray-800 text-white p-4">
    <h2 className="text-lg font-bold mb-4">Scenarios</h2>
    <div className="space-y-2">
      <div className="p-2 bg-gray-700 rounded hover:bg-gray-600">
        <h3 className="font-semibold">Offer Special Promotions</h3>
        <p className="text-sm">Offer promotions, send more conversions, and mynically.</p>
      </div>
      <div className="p-2 bg-gray-700 rounded hover:bg-gray-600">
        <h3 className="font-semibold">Highlight the Value</h3>
        <p className="text-sm">Focus on ongoing to increase performance.</p>
      </div>
      <button className="mt-4 p-2 bg-gray-600 rounded">+ Add Scenario</button>
    </div>
  </div>
);

const ChatArea = () => (
  <div className="flex-1 bg-gray-900 text-white p-4 flex flex-col">
    <div className="flex-1 overflow-y-auto space-y-4">
      <div className="mb-4">
        <p className="bg-gray-700 p-2 rounded self-start max-w-xs">The user is an existing customer who is interested in upgrading their current plan.</p>
      </div>
      <div className="mb-4 flex flex-col space-y-2">
        <p className="bg-gray-800 p-2 rounded self-start max-w-xs">Hello</p>
        <p className="bg-gray-700 p-2 rounded self-end max-w-xs ml-auto">Hi there! I'm thinking of upgrading my plan. What can you offer me?</p>
      </div>
    </div>
    <div className="mt-4 flex">
      <input type="text" className="flex-1 p-2 bg-gray-800 rounded-l text-white" placeholder="Type a message..." />
      <button className="p-2 bg-gray-700 rounded-r">Send</button>
    </div>
  </div>
);

const App = () => (
  <div className="flex h-screen">
    <ScenarioPanel />
    <ChatArea />
  </div>
);

export default App;
