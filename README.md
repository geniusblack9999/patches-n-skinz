# Patches N Skinz

The Meta, Simplified. The Drip, Evaluated. — a gaming patch & skin newsletter funnel.

React + Vite + Tailwind + Framer Motion. Dark "Gaming HUD" aesthetic.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## Content

All articles live in **`src/articles.json`** — the single source of truth. The game
filters and Trending sidebar derive from it automatically; adding a story never touches
JSX. The `/pns-content` Claude Code skill ingests pasted newsletter text or researches
and writes new stories in the PNS voice, then writes to that file.

## Deploy

Netlify, continuous deploy from this repo. Build command `npm run build`, publish dir
`dist` (see `netlify.toml`). Pushing to the default branch auto-deploys — including daily
content updates committed to `articles.json`.
