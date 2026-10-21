# Mykhailo Habor — portfolio

Local portfolio built as a conventional Node.js application:

- Express serves the REST API and the production build.
- Vite serves the React client in development.
- `src/main.jsx` is the browser entry point.
- Client-side navigation fetches the next page through REST and animates the transition without a full reload.

## Run locally

Requirements: Node.js 22.13 or newer.

```powershell
npm install
npm run dev
```

Open <http://localhost:5173>.

## Production mode

```powershell
npm run build
npm start
```

## REST API

- `GET /api/health`
- `GET /api/pages/home`
- `GET /api/pages/projects`
- `GET /api/profile`
- `GET /api/projects`
- `GET /api/projects/:slug`

The previous implementation remains in `portfolio/` as a rollback copy. It is not used by the root Node.js application.
