import React from 'react';

interface ScenarioMessages {
  [key: string]: { text: string; isUser: boolean }[];
}

const ScenarioPanel = ({ setCurrentScenario, setFormVisible, scenarioMessages }: { setCurrentScenario: React.Dispatch<React.SetStateAction<string>>, setFormVisible: React.Dispatch<React.SetStateAction<boolean>>, scenarioMessages: ScenarioMessages }) => (
  <div className="w-1/4 bg-black text-white p-6 border-r border-gray-800">
    <h2 className="text-xl font-semibold mb-6 text-gray-100">Scenarios</h2>
    {/* Scrollable container for scenarios with hidden scrollbar */}
    <div className="space-y-3 overflow-y-auto scrollbar-hide max-h-[calc(100vh-12rem)]">
      {Object.keys(scenarioMessages).map((scenario, index) => (
        <div 
          key={index}
          className="p-4 bg-black rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
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

export default ScenarioPanel; 