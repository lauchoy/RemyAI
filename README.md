# FoodieAI

## Setup Instructions

1. Create a `.env` file in the root directory
2. Copy the contents from `.env.example` to `.env`
3. Replace the Supabase credentials with your actual project values:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase project anon/public key

You can find these values in your Supabase project dashboard under Project Settings > API.

## Development

```bash
npm install
npm run dev
```