# Pinterest Clone

This repository contains a React/Vite frontend and a Node.js/Express backend.

## Run Locally

1. Install all dependencies from the repository root: `npm install`
2. Start both the API and frontend: `npm run dev`

Open the frontend at `http://localhost:5173`. The API runs separately on `http://localhost:4000`.

The backend creates its SQLite database in `Backend/data` and stores uploaded images in `Backend/uploads`.

Demo account: `demo@pinterest.local` / `password123`

Set `JWT_SECRET`, `PORT`, and `CLIENT_ORIGIN` in a root `.env` file for local configuration. The frontend accepts an optional `VITE_API_URL` environment variable and defaults to `http://localhost:4000/api`.
