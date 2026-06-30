import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Users,
  Zap,
  Lock,
  Flame,
  Wallet,
  Radar,
  Sparkles,
  TrendingUp,
  MessagesSquare,
  ArrowRight,
} from 'lucide-react'
import { ARTICLES, GAMES, TRENDING } from './data'

/* ---------------------------------- Header --------------------------------- */
function SubscriberCounter() {
  const [count, setCount] = useState(48217)
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3))
    }, 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="glass hidden items-center gap-2 rounded-sm px-3 py-1.5 sm:flex">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-skin-green opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-skin-green" />
      </span>
      <Users className="h-4 w-4 text-skin-green" />
      <span className="font-heading text-sm font-semibold tabular-nums text-white">
        {count.toLocaleString()}
      </span>
      <span className="text-xs uppercase tracking-wider text-white/40">Active Operatives</span>
    </div>
  )
}

function Header({ query, setQuery }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-hud/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <a href="#" className="font-heading text-xl font-extrabold tracking-tight sm:text-2xl">
          <span className="text-patch-red">Patches</span>
          <span className="text-white/50">N</span>
          <span className="text-skin-green">Skinz</span>
        </a>

        <div className="relative ml-auto w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games, patches, skins…"
            className="glass w-full rounded-sm py-2 pl-9 pr-12 text-sm text-white placeholder-white/30 outline-none transition focus:border-patch-red/50 focus:shadow-glow-red"
          />
          <kbd className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/40 sm:block">
            ⌘K
          </kbd>
        </div>

        <SubscriberCounter />
      </div>
    </header>
  )
}

/* ----------------------------------- Hero ---------------------------------- */
const BEEHIIV_PUB_ID = 'pub_56ad93a9-4ab4-4692-875e-8db8f6e6010e'

function SignupBox({ cta = 'Join the Alpha', compact = false, accent = 'red' }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const ring = accent === 'green' ? 'focus:border-skin-green/60' : 'focus:border-patch-red/60'
  const btn =
    accent === 'green'
      ? 'border-skin-green bg-skin-green/10 text-skin-green hover:bg-skin-green hover:text-hud hover:shadow-glow-green'
      : 'border-patch-red bg-patch-red/10 text-patch-red hover:bg-patch-red hover:text-white hover:shadow-glow-red'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setLoading(true)
    // Fire subscription to Beehiiv's public subscribe endpoint (no API key needed)
    try {
      await fetch(`https://app.beehiiv.com/subscribe`, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, pub_id: BEEHIIV_PUB_ID }).toString(),
      })
    } catch {
      // Silently continue — open confirm page as fallback
    }
    // Open Beehiiv's confirm page in background so user stays on PNS
    window.open(
      `https://app.beehiiv.com/subscribe/${BEEHIIV_PUB_ID}?email=${encodeURIComponent(email)}`,
      '_blank',
      'noopener,noreferrer'
    )
    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="glass flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm text-skin-green">
        <Zap className="h-4 w-4" /> You're in. Check your inbox, Operative.
      </div>
    )
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? 'flex flex-col gap-2' : 'flex flex-col gap-2 sm:flex-row'}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="operative@email.com"
        className={`glass w-full rounded-sm px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition ${ring}`}
      />
      <button type="submit" disabled={loading} className={`hud-btn whitespace-nowrap ${btn}`}>
        {loading ? '...' : cta} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}

function QuickFilters({ active, setActive }) {
  const tags = ['All', ...GAMES]
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => setActive(tag)}
          className={`hud-btn shrink-0 px-3 py-1.5 text-xs ${
            active === tag
              ? 'border-white/60 bg-white/10 text-white'
              : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

function Hero({ gameFilter, setGameFilter }) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-patch-red/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-skin-green/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/50">
            <Sparkles className="h-3 w-3 text-skin-green" /> Patch & Drip intel, daily
          </div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            The Meta, <span className="text-patch-red">Simplified.</span>
            <br />
            The Drip, <span className="text-skin-green">Evaluated.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50 sm:text-lg">
            High-yield breakdowns of every balance patch and cosmetic drop. Skim the vibe in
            seconds — unlock the full meta implications and Wallet Verdicts inside.
          </p>
          <div className="mx-auto mt-8 max-w-lg">
            <SignupBox cta="Join the Alpha" />
            <p className="mt-2 text-xs text-white/30">
              Free. No spam. Unsubscribe anytime, soldier.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <QuickFilters active={gameFilter} setActive={setGameFilter} />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------- Feed toggle ------------------------------- */
function FeedToggle({ feed, setFeed }) {
  return (
    <div className="glass mx-auto flex w-full max-w-xs items-center rounded-sm p-1">
      {[
        { key: 'patch', label: 'Patches', sub: 'Balance Radar', Icon: Radar, accent: 'patch-red' },
        { key: 'skin', label: 'Skinz', sub: 'Cosmetics Check', Icon: Sparkles, accent: 'skin-green' },
      ].map(({ key, label, sub, Icon, accent }) => {
        const on = feed === key
        return (
          <button
            key={key}
            onClick={() => setFeed(key)}
            className="relative flex-1 rounded-sm px-3 py-2 text-center"
          >
            {on && (
              <motion.span
                layoutId="feed-pill"
                className={`absolute inset-0 rounded-sm ${
                  accent === 'patch-red' ? 'bg-patch-red/15' : 'bg-skin-green/15'
                } border ${accent === 'patch-red' ? 'border-patch-red/40' : 'border-skin-green/40'}`}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative flex items-center justify-center gap-2">
              <Icon className={`h-4 w-4 ${on ? `text-${accent}` : 'text-white/40'}`} />
              <span
                className={`font-heading text-sm font-semibold uppercase tracking-wide ${
                  on ? 'text-white' : 'text-white/40'
                }`}
              >
                {label}
              </span>
            </span>
            <span className="relative mt-0.5 block text-[10px] uppercase tracking-wider text-white/30">
              {sub}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* -------------------------- Teaser card + the gate ------------------------- */
function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 36e5
  if (diff < 1) return `${Math.max(1, Math.round(diff * 60))}m ago`
  if (diff < 24) return `${Math.round(diff)}h ago`
  return `${Math.round(diff / 24)}d ago`
}

function ArticleCard({ article, index }) {
  const isPatch = article.type === 'patch'
  const accentText = isPatch ? 'text-patch-red' : 'text-skin-green'
  const accentBorder = isPatch ? 'border-l-patch-red' : 'border-l-skin-green'
  const accentGlow = isPatch ? 'hover:shadow-glow-red' : 'hover:shadow-glow-green'
  const verdict = article.gated_content.wallet_verdict

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={`glass overflow-hidden rounded-sm border-l-2 ${accentBorder} transition-shadow duration-300 ${accentGlow}`}
    >
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
          <span
            className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-heading font-semibold ${
              isPatch
                ? 'border-patch-red/40 text-patch-red'
                : 'border-skin-green/40 text-skin-green'
            }`}
          >
            {isPatch ? <Radar className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
            {isPatch ? 'Patch' : 'Skin'}
          </span>
          <span className="text-white/40">{article.game}</span>
          <span className="ml-auto text-white/30">{timeAgo(article.timestamp)}</span>
        </div>

        <h3 className="font-heading text-lg font-bold leading-snug text-white">
          {article.title}
        </h3>

        {/* The Vibe TL;DR — always visible */}
        <div className="mt-3">
          <div className={`mb-1 text-[11px] font-semibold uppercase tracking-widest ${accentText}`}>
            The Vibe TL;DR
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            {article.public_content.vibe_tldr}
          </p>
        </div>

        {/* The Big Deal — always visible */}
        <div className="mt-4">
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-white/40">
            The Big Deal
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            {article.public_content.the_big_deal}
          </p>
        </div>

        {/* ---------- The Gate ---------- */}
        <div className="relative mt-4 min-h-[260px]">
          {/* gated content peeking through the blur */}
          <div
            className="pointer-events-none min-h-[200px] select-none space-y-3 blur-[6px]"
            aria-hidden="true"
          >
            <div>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                The Breakdown
              </div>
              <ul className="space-y-1.5">
                {article.gated_content.breakdown.map((b) => (
                  <li key={b.label} className="text-sm leading-relaxed text-white/55">
                    <span className="mr-1">{b.icon}</span>
                    <span className="font-semibold text-white/80">{b.label}:</span> {b.text}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                {isPatch ? 'The Meta Shift' : 'Meta Implications'}
              </div>
              <p className="text-sm leading-relaxed text-white/50">
                {article.gated_content.meta_implications}
              </p>
            </div>
            {verdict.rating > 0 && (
              <div>
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-skin-green" />
                  <span className="font-heading font-bold text-white">
                    Wallet Verdict: {verdict.rating}/10
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-white/50">{verdict.summary}</p>
              </div>
            )}
          </div>

          {/* gradient + signup overlay */}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-hud via-hud/90 to-transparent">
            <div className="glass w-full max-w-sm rounded-sm border-white/10 p-4 text-center shadow-2xl">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 bg-white/5">
                <Lock className={`h-4 w-4 ${accentText}`} />
              </div>
              <p className="font-heading text-sm font-semibold text-white">
                Unlock the full breakdown
              </p>
              <p className="mb-3 mt-0.5 text-xs text-white/40">
                Meta implications, the Wallet Verdict & deep-dive analysis —{' '}
                <span className="text-white/70">free for Operatives.</span>
              </p>
              <SignupBox compact cta="Unlock" accent={isPatch ? 'red' : 'green'} />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ------------------------------- Dual feed --------------------------------- */
function DualFeed({ feed, setFeed, articles }) {
  return (
    <div>
      <FeedToggle feed={feed} setFeed={setFeed} />
      <AnimatePresence mode="wait">
        <motion.div
          key={feed}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {articles.length === 0 ? (
            <p className="col-span-full py-12 text-center text-sm text-white/30">
              No {feed === 'patch' ? 'patches' : 'skins'} match that filter. Try another game.
            </p>
          ) : (
            articles.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* -------------------------------- Sidebar ---------------------------------- */
function Sidebar() {
  return (
    <aside className="sticky top-20 space-y-5">
      {/* Persistent lead gen */}
      <div className="glass rounded-sm p-5">
        <div className="mb-1 flex items-center gap-2">
          <Zap className="h-4 w-4 text-patch-red" />
          <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Get the Drop
          </h4>
        </div>
        <p className="mb-3 text-xs leading-relaxed text-white/40">
          Daily patch & skin intel, straight to your inbox. Join 48K+ Operatives.
        </p>
        <SignupBox compact cta="Subscribe" />
      </div>

      {/* Trending now */}
      <div className="glass rounded-sm p-5">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-skin-green" />
          <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Trending Now
          </h4>
        </div>
        <ul className="space-y-3">
          {TRENDING.map((t) => (
            <li key={t.game} className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-white/5 font-heading text-xs font-bold text-white/70">
                {t.game.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">{t.game}</div>
                <div className="truncate text-xs text-white/40">{t.activity}</div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-patch-red">
                <Flame className="h-3 w-3" /> {t.heat}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Community bridge */}
      <a
        href="#"
        className="glass group flex items-center justify-between rounded-sm p-5 transition hover:border-skin-green/40 hover:shadow-glow-green"
      >
        <div className="flex items-center gap-2">
          <MessagesSquare className="h-4 w-4 text-skin-green" />
          <div>
            <div className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Community Hub
            </div>
            <div className="text-xs text-white/40">Join the squad on Discord</div>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-skin-green" />
      </a>
    </aside>
  )
}

/* --------------------------------- Footer ---------------------------------- */
function Footer() {
  return (
    <footer className="mt-16 border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-white/30 sm:flex-row sm:px-6">
        <span className="font-heading">
          <span className="text-patch-red">Patches</span>
          <span className="text-white/40">N</span>
          <span className="text-skin-green">Skinz</span> © 2026
        </span>
        <span>The Meta, Simplified. The Drip, Evaluated.</span>
      </div>
    </footer>
  )
}

/* ----------------------------------- App ----------------------------------- */
export default function App() {
  const [feed, setFeed] = useState('patch')
  const [gameFilter, setGameFilter] = useState('All')
  const [query, setQuery] = useState('')

  const articles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ARTICLES.filter((a) => a.type === feed)
      .filter((a) => gameFilter === 'All' || a.game === gameFilter)
      .filter(
        (a) =>
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.game.toLowerCase().includes(q) ||
          a.public_content.vibe_tldr.toLowerCase().includes(q)
      )
  }, [feed, gameFilter, query])

  return (
    <div className="min-h-screen">
      <Header query={query} setQuery={setQuery} />
      <Hero gameFilter={gameFilter} setGameFilter={setGameFilter} />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
        <DualFeed feed={feed} setFeed={setFeed} articles={articles} />
        <Sidebar />
      </main>

      <Footer />
    </div>
  )
}
