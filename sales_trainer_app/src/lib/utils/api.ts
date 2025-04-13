// This is our kitchen's "recipe book" for handling orders
// It contains all the instructions for how to process customer orders

// Define what a message looks like in our restaurant
interface Message {
  text: string;
  isUser: boolean;
}

// Maximum number of previous messages to remember
const MAX_MEMORY_MESSAGES = 10;

// Chef's internal instructions for each scenario
const chefInstructions: { [key: string]: string } = {
  'Cold Call Interruption': 
    `You are a busy professional interrupted by a cold call during an important work deadline.
     - Initially: Sound rushed and distracted
     - If they persist: Show growing frustration at the interruption
     - Common phrases: "I'm in the middle of something", "This isn't a good time", "I have a deadline"`,
  
  'Door-to-Door Sales':
    `You are a person interrupted during dinner preparation at home.
     - Initially: Sound surprised and slightly annoyed at the unexpected visit
     - If they persist: Express clearer irritation about dinner getting cold
     - Common phrases: "I'm cooking right now", "This isn't a good time", "My dinner's getting cold"`,
  
  'Coffee Shop Pitch':
    `You are trying to enjoy a peaceful coffee break.
     - Initially: Be polite but clearly wanting to be left alone
     - If they persist: Show increasing annoyance at your break being disturbed
     - Common phrases: "I just want to enjoy my coffee", "I came here for some quiet time", "Please let me have my break"`,
  
  'Email Follow-up':
    `You've received multiple unwanted follow-up emails about a product demo.
     - Initially: Reference previous lack of interest
     - If they persist: Show frustration at repeated contact
     - Common phrases: "I already said no", "Please stop contacting me", "I'm not interested"`
};

// Sales trainer's review instructions with structured feedback format
const reviewInstructions = `You are an experienced sales trainer reviewing a conversation.
Keep your feedback concise (max 100 words total) and centered:

                    ━━━━━━━━━━ PERFORMANCE RATING ━━━━━━━━━━

                    Rate overall performance (0-4 stars):
                    ⭐ = Poor    ⭐⭐ = Fair    ⭐⭐⭐ = Good    ⭐⭐⭐⭐ = Excellent

                    Your Rating: [X] stars
                    [One sentence explanation]

                    ━━━━━━━━━━ CONVERSATION ANALYSIS ━━━━━━━━━━

                    • Best moment: [Brief point]
                    • Needs work: [Brief point]
                    • Key interaction: [Brief point]

                    ━━━━━━━━━━ IMPROVEMENT TIPS ━━━━━━━━━━

                    1. [Technique] - One-line implementation
                    2. [Technique] - One-line implementation
                    3. [Technique] - One-line implementation

                    ━━━━━━━━━━ KEY FOCUS ━━━━━━━━━━

                    [Single technique to master]
                    • Why: One-line reason
                    • How: Two-step guide

Remember: Be direct and specific. Reference actual moments.`;

// This is our main kitchen function - it takes orders and prepares responses
export async function processMessage(
  userMessage: string, 
  currentScenario: string, 
  messageCount: number,
  previousMessages: Message[],
  isReviewMode: boolean = false // New parameter to switch between customer and trainer modes
): Promise<string> {
  try {
    // Keep only recent messages to prevent memory overload
    const recentMessages = previousMessages.slice(-MAX_MEMORY_MESSAGES);
    
    // Convert messages to OpenAI format
    const conversationHistory = recentMessages.map(msg => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.text
    }));

    // Choose the right persona based on mode
    const systemMessage = isReviewMode ? reviewInstructions : 
      `You are a potential customer in this scenario: ${chefInstructions[currentScenario]}
       
       Conversation stage (${messageCount} messages):
       ${messageCount <= 3 ? '- Early: Be polite but confused' :
         messageCount <= 6 ? '- Middle: Show mild resistance' :
         messageCount <= 10 ? '- Late: Growing impatient' :
         '- Final: Clearly annoyed'}`;

    // Let's check if we can see our key (just showing if it exists, not the actual key)
    console.log('Do we have a key?', process.env.NEXT_PUBLIC_OPENAI_API_KEY ? 'Yes!' : 'No!');
    
    // Send the order to our AI chef (OpenAI API)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemMessage
          },
          ...conversationHistory,
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

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