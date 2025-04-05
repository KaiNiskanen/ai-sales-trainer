// This is our kitchen's "recipe book" for handling orders
// It contains all the instructions for how to process customer orders

// Define what a message looks like in our restaurant
interface Message {
  text: string;
  isUser: boolean;
}

// This is our main kitchen function - it takes orders and prepares responses
export async function processMessage(userMessage: string, currentScenario: string): Promise<string> {
  try {
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
            content: `You are an AI sales training assistant helping with the scenario: ${currentScenario}. 
                     Provide constructive feedback and guidance on sales techniques.`
          },
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