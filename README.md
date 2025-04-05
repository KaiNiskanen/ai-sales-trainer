# AI Sales Trainer

A modern web application for AI-powered sales training, built with Next.js, TypeScript, and Tailwind CSS.

## Project Overview

This project is an AI Sales Trainer application that provides an interactive platform for sales training and development. Built with modern web technologies, it offers a robust foundation for implementing AI-driven sales training features.

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Quality**: ESLint
- **Package Manager**: npm

## Project Structure

```
sales_trainer_app/
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   │   ├── layout.tsx    # Root layout component
│   │   └── page.tsx      # Home page component
│   └── ...
├── public/               # Static assets
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration for Tailwind
└── package.json          # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KaiNiskanen/ai-sales-trainer.git
   cd ai-sales-trainer/sales_trainer_app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Create a production build
- `npm start`: Run the production build
- `npm run lint`: Run ESLint for code quality checks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- TypeScript for the type safety 