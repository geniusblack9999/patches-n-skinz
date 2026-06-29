// Content lives in articles.json — the ONLY file you edit to add stories.
// GAMES (quick-filter tags) and TRENDING (sidebar) are derived automatically,
// so dropping a new article in is the entire workflow. The /pns-content skill
// writes to that JSON for you.
import articlesRaw from './articles.json'

// Newest first — drives feed order and "trending" recency.
export const ARTICLES = [...articlesRaw].sort(
  (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
)

// Quick-filter tags: every game we currently cover, newest-first, de-duped.
export const GAMES = [...new Set(ARTICLES.map((a) => a.game))]

// Trending sidebar: most recent distinct games, heat ranked by recency.
export const TRENDING = (() => {
  const seen = new Set()
  const out = []
  for (const a of ARTICLES) {
    if (seen.has(a.game)) continue
    seen.add(a.game)
    out.push({
      game: a.game,
      activity:
        a.trending_blurb || (a.type === 'patch' ? 'New patch live' : 'New skin drop'),
      heat: 96 - out.length * 6,
    })
    if (out.length >= 5) break
  }
  return out
})()
