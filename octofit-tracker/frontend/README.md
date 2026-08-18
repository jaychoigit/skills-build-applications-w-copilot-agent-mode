# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## API configuration

Define `VITE_CODESPACE_NAME` in `.env.local` when running in Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the frontend calls:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When it is unset, the frontend safely falls back to `http://localhost:8000/api`.

## Commands

```bash
npm run dev -- --host 0.0.0.0 --port 5173
npm run build
npm run lint
```
