import React from 'react';

interface ScenarioMessages {
  [key: string]: { text: string; isUser: boolean; }[];
}

interface ScenarioPanelProps {
  setCurrentScenario: (scenario: string) => void;
  setFormVisible: (visible: boolean) => void;
  scenarioMessages: ScenarioMessages;
}

const ScenarioPanel = ({ setCurrentScenario, setFormVisible, scenarioMessages }: ScenarioPanelProps) => {
  return (
    <div className="w-72 bg-black p-6 flex flex-col border-r border-gray-800">
      <h2 className="text-xl font-bold text-white mb-6">Scenarios</h2>
      <div className="flex-1">
        {Object.keys(scenarioMessages).map((scenario, index) => (
          <button
            key={index}
            onClick={() => setCurrentScenario(scenario)}
            className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-900 rounded-lg mb-3 transition-all duration-200 border border-gray-800"
          >
            {scenario}
          </button>
        ))}
      </div>
      <button
        onClick={() => setFormVisible(true)}
        className="mt-4 px-4 py-3 bg-gray-900 text-gray-300 hover:text-white rounded-lg transition-all duration-200 border border-gray-800"
      >
        Add New Scenario
      </button>
    </div>
  );
};

export default ScenarioPanel; 