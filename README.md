# AI Sales Trainer

An interactive application designed to help sales professionals improve their skills through AI-powered conversation simulations. Users can practice different sales scenarios like cold calls, coffee shop pitches, and email follow-ups, receiving realistic responses from an AI that simulates various customer personalities and situations.

## Features

- **Interactive Chat Interface**: Real-time conversation with AI-powered customers
- **Multiple Scenarios**: Practice different sales situations including:
  - Cold Call Interruption
  - Door-to-Door Sales
  - Coffee Shop Pitch
  - Email Follow-up
- **Dark Theme UI**: Modern, clean interface design
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```bash
src/
├── app/
│   ├── components/
│   │   └── features/
│   │       ├── ScenarioPanel.tsx    # Handles scenario selection
│   │       └── ChatArea.tsx         # Main chat interface
│   ├── (auth)/
│   │   └── page.tsx                 # Login page
│   └── (dashboard)/
│       └── workspace/
│           └── page.tsx             # Main training interface
└── lib/
    └── utils/
        └── api.ts                   # OpenAI API integration
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/KaiNiskanen/ai-sales-trainer..git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your OpenAI API key:
```
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- **Next.js**: React framework for production
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **OpenAI API**: For AI-powered responses
- **React**: For UI components

## Features in Development

- User authentication system
- Progress tracking
- Additional scenario types
- Performance analytics
- User profile management 