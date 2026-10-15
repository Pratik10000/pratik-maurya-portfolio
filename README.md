# Pratik Maurya — Developer Portfolio

A responsive dark portfolio built with **React + Vite**, **Node.js + Express**, and an optional **MongoDB** contact-message store. Includes subtle motion, responsive navigation, project links, education, SWAYAM certificates, live GitHub profile stats, and a contact form with a `mailto:` fallback.

## Requirements
- Node.js 18+ (20+ recommended)
- npm
- MongoDB local instance or MongoDB Atlas only if you want contact messages saved by the API

## Run locally

1. Extract this project and open the folder in a terminal.
2. Install packages:

   ```bash
   npm install
   ```

3. Create `.env` from `.env.example` and set `MONGODB_URI` if you want database-backed contact messages. If not configured, the form falls back to opening the visitor's email application.

4. Start both the Express server and Vite dev server:

   ```bash
   npm run dev
   ```

5. Open **http://localhost:5173**.

The Vite dev server is configured to proxy `/api` requests to Express at `http://localhost:5000`, so the contact endpoint works during development too.

## Add your resume
Copy your latest resume PDF into the `public` folder and name it exactly:

```text
public/resume.pdf
```

The hero's **View resume** link points to `/resume.pdf`. If the file is missing, the rest of the portfolio still works.

## Build and test production locally

```bash
npm run build
npm start
```

Open **http://localhost:5000**.

## Deploy

### Option A — Render (single web service)
1. Push the project to your GitHub repository.
2. Create a **Web Service** on Render and connect the repo.
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variables in Render:
   - `MONGODB_URI` — your MongoDB Atlas connection string (optional)
   - `CLIENT_ORIGIN` — your deployed website URL (for example `https://your-site.onrender.com`)
   - `PORT` is provided by Render automatically.
6. Deploy. Express serves the built React site and the `/api/contact` endpoint.

### Option B — Split frontend/backend
- Deploy the frontend as a static site with build command `npm install && npm run build`, publish directory `dist`.
- Deploy `server/index.js` as a Node web service with `npm start`.
- Set `VITE_API_BASE_URL` support in `src/App.jsx` before using a separate API domain, and configure CORS. The current default is intended for the single-service setup.

## Personalization checklist
- Check all personal details and course scores before publishing.
- Add `public/resume.pdf`.
- Replace or add project cards when you have more work to show.
- Review certificate links; two certificates use the general SWAYAM site because a direct verification URL was not available.
- The GitHub activity grid is intentionally labelled as decorative; profile repository count is fetched from the public GitHub API.

## Notes
- ParkEase is presented as a team project and the contribution bullets reflect the project information supplied for this portfolio. Adjust any bullet that does not accurately represent your individual work.
- The contact form validates in the browser and server. Do not expose database credentials in frontend code.
