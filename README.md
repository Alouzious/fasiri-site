# Fasiri Demo - African Language Translator

A Next.js chatbot that translates English to 19+ African languages using the Fasiri API.

## Features

- Translate to Luganda, Yoruba, Swahili, Twi, Acholi, and 15+ more languages
- Text-to-Speech for Ugandan languages (powered by Sunbird AI)
- Live code snippet showing how to replicate with the Fasiri SDK
- Provider badge showing which AI model served each translation
- Quality score and latency for every translation

## Getting Started

1. Clone this repo
2. Copy the env file and add your Fasiri API key:

   cp .env.local.example .env.local

3. Get a free API key:

   curl -X POST https://fasiri-bu9u.onrender.com/api/v1/auth/keys \
     -H "Content-Type: application/json" \
     -d '{"name": "demo"}'

4. Install and run:

   npm install
   npm run dev

Open http://localhost:3000

## Deploy to Vercel

1. Push to GitHub
2. Import at vercel.com/new
3. Add FASIRI_API_KEY as an environment variable
4. Deploy

## Built with

- Next.js 15 (App Router)
- Tailwind CSS
- Fasiri API (https://fasiri-bu9u.onrender.com)
- Sunbird AI, Khaya AI, HuggingFace
