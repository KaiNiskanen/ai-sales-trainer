// This is our kitchen's "recipe book" for handling orders
// It contains all the instructions for how to process customer orders

// Define what a message looks like in our restaurant
interface Message {
  text: string;
  isUser: boolean;
}

// Maximum number of previous messages to remember
const MAX_MEMORY_MESSAGES = 10;

// This is our main kitchen function - it takes orders and prepares responses
export async function processMessage(
  userMessage: string, 
  currentScenario: string, 
  messageCount: number,
  previousMessages: Message[]
): Promise<string> {
  try {
    // Keep only recent messages to prevent memory overload
    const recentMessages = previousMessages.slice(-MAX_MEMORY_MESSAGES);
    
    // Convert messages to OpenAI format
    const conversationHistory = recentMessages.map(msg => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.text
    }));

    // Let's check if we can see our key (just showing if it exists, not the actual key)
    console.log('Do we have a key?', process.env.NEXT_PUBLIC_OPENAI_API_KEY ? 'Yes!' : 'No!');
    
    // Send the order to our AI chef (OpenAI API)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}` // Our special key to access the AI chef
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a potential customer in ${currentScenario}.
                     You have been unexpectedly approached by a salesperson.
                     
                     Conversation stage (${messageCount} messages):
                     ${messageCount <= 3 ? '- Early: Be polite but confused' :
                       messageCount <= 6 ? '- Middle: Show mild resistance' :
                       messageCount <= 10 ? '- Late: Growing impatient' :
                       '- Final: Clearly annoyed'}
                     
                     Your personality:
                     - Start skeptical and confused
                     - Ask questions showing uncertainty
                     - Use common objections like:
                       "Need to think about it"
                       "Not sure I need this"
                       "Seems expensive"
                       "Need to discuss with others"
                       "Too busy right now"
                     - Get more dismissive over time
                     - Show mild irritation at persistence`
          },
          ...conversationHistory,
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    // Get the prepared dish (AI response) from our chef
    const data = await response.json();
    console.log('Raw chef response:', data);  // Show us EVERYTHING the chef sends
    console.log('Response status:', response.status);  // Show us if the chef accepted our order
    return data.choices[0].message.content;
  } catch (error) {
    // If something goes wrong in the kitchen
    console.error('Kitchen error:', error);
    return "I apologize, but I'm having trouble processing your message right now.";
  }
} 