# Backend API

Backend for the frontend project, built with Node.js, Express, and Supabase.

## Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create your `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Then fill in your real Supabase project values:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- (optionally) `SUPABASE_SERVICE_ROLE_KEY`

3. Run the server in development:

```bash
npm run dev
```

Or in production mode:

```bash
npm start
```

By default the server listens on `http://localhost:4000`.

## Routes

- `GET /` – simple health check for the backend itself
- `GET /api/health` – API health endpoint
- `GET /api/example/items` – example Supabase query (expects an `items` table in Supabase)

## Connecting to Supabase

This backend uses the official `@supabase/supabase-js` client.

Update `.env` with your Supabase project credentials. After that, you can use the `supabase` client in `src/supabaseClient.js` to add more queries and endpoints.

## CORS

CORS is configured using `CORS_ORIGIN` from `.env`.
Set it to the URL where your frontend runs, for example:

```env
CORS_ORIGIN=http://localhost:5173
```

or leave empty to allow all origins (not recommended for production).
