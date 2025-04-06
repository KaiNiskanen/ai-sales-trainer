import React, { useState, useEffect } from 'react';
import { processMessage } from '../../utils/api';

interface Message {
  text: string;
  isUser: boolean;
}

interface ScenarioMessages {
  [key: string]: Message[];
}

const ChatArea = ({ currentScenario, scenarioMessages, updateMessages }: { currentScenario: string, scenarioMessages: ScenarioMessages, updateMessages: (newMessage: Message) => void }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>(scenarioMessages[currentScenario]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false); // New state for review mode

  // Update messages when the current scenario changes
  useEffect(() => {
    setMessages(scenarioMessages[currentScenario]);
    setIsReviewMode(false); // Reset review mode when scenario changes
  }, [currentScenario, scenarioMessages]);

  // This is like our waiter taking orders to the kitchen
  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMessage = { text: inputText.trim(), isUser: true };
      updateMessages(userMessage);
      setInputText('');
      setIsLoading(true);

      try {
        const messageCount = messages.length;
        const aiResponse = await processMessage(
          inputText, 
          currentScenario, 
          messageCount,
          messages,
          isReviewMode // Pass the review mode to the kitchen
        );
        updateMessages({ text: aiResponse, isUser: false });
      } catch (error) {
        console.error('Error:', error);
        updateMessages({ 
          text: "Sorry, I'm having trouble right now.", 
          isUser: false 
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to request a review of the conversation
  const handleRequestReview = async () => {
    setIsReviewMode(true);
    setIsLoading(true);
    
    try {
      const aiResponse = await processMessage(
        "Provide a concise, centered review (max 100 words) with rating, key points, and focused next steps.",
        currentScenario,
        messages.length,
        messages,
        true // Force review mode
      );
      updateMessages({ text: aiResponse, isUser: false });
    } catch (error) {
      console.error('Error:', error);
      updateMessages({ 
        text: "Sorry, I'm having trouble providing feedback right now.", 
        isUser: false 
      });
    } finally {
      setIsLoading(false);
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
            {scenarioMessages[currentScenario][0].text}
          </p>
        </div>
        {/* Message list - maps through messages array and renders each message */}
        {messages.slice(1).map((message: Message, index: number) => (
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
      <div className="mt-6 flex flex-col space-y-4">
        {!isReviewMode && (
          <div className="flex justify-center">
            <button
              onClick={handleRequestReview}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
            >
              End Conversation & Get Feedback
            </button>
          </div>
        )}
        <div className="flex relative">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-4 pr-12 bg-gray-900 rounded-2xl text-white placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" 
            placeholder={isReviewMode ? "Ask about the feedback..." : "Type a message..."} 
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
    </div>
  );
};

export default ChatArea; 