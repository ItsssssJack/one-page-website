import { useState, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import VibeCard, {
  CleanMockup, BoldMockup, WarmMockup,
  PlayfulMockup, LuxuryMockup, VibrantMockup,
} from './components/VibeCard'
import SectionBuilder from './components/SectionBuilder'
import PromptOutput from './components/PromptOutput'
import { generatePrompt } from './lib/generatePrompt'

/* ── Data ── */
const niches = [
  { label: 'Web Design Agency', emoji: '🎨' },
  { label: 'AI / Automation', emoji: '🤖' },
  { label: 'Dentist', emoji: '🦷' },
  { label: 'SaaS Product', emoji: '💻' },
  { label: 'Real Estate', emoji: '🏠' },
  { label: 'Personal Trainer', emoji: '💪' },
  { label: 'Restaurant', emoji: '🍽️' },
  { label: 'E-commerce', emoji: '🛒' },
  { label: 'Photographer', emoji: '📷' },
  { label: 'Law Firm', emoji: '⚖️' },
  { label: 'Marketing Agency', emoji: '📈' },
  { label: 'Coaching', emoji: '🎯' },
]

const vibes = [
  { id: 'clean', label: 'Clean & Modern', mockup: <CleanMockup /> },
  { id: 'bold', label: 'Bold & Dark', mockup: <BoldMockup /> },
  { id: 'warm', label: 'Warm & Earthy', mockup: <WarmMockup /> },
  { id: 'playful', label: 'Playful & Soft', mockup: <PlayfulMockup /> },
  { id: 'luxury', label: 'Luxury & Elegant', mockup: <LuxuryMockup /> },
  { id: 'vibrant', label: 'Vibrant & Gradient', mockup: <VibrantMockup /> },
]

/* ── Animation variants ── */
const sectionVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

/* ── Step header ── */
function Step({ n, title, sub }: { n: number; title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <span className="rainbow-border flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--surface-raised)] text-[var(--accent)] text-sm font-bold shrink-0">
          {n}
        </span>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      {sub && <p className="text-sm text-[var(--text-muted)] ml-11 mt-1">{sub}</p>}
    </div>
  )
}

function Divider() {
  return (
    <div className="divider-glow">
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </div>
  )
}

/* ── Floating orb component for hero ── */
function Orb({ size, color, x, y, delay, duration }: {
  size: number; color: string; x: string; y: string; delay: number; duration: number
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: x, top: y,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${size * 0.4}px)`,
      }}
      animate={{
        x: [0, 20, -15, 10, 0],
        y: [0, -25, 10, -10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.6, 0.9, 0.5, 0.8, 0.6],
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/* ── App ── */
export default function App() {
  const [desc, setDesc] = useState('')
  const [niche, setNiche] = useState('')
  const [customNiche, setCustomNiche] = useState('')
  const [vibe, setVibe] = useState<string | null>(null)
  const [sections, setSections] = useState<string[]>(['Hero', 'Social Proof', 'Features', 'Footer'])
  const [cta, setCta] = useState('')

  const formRef = useRef<HTMLDivElement>(null)
  const effectiveNiche = customNiche || niche

  const prompt = useMemo(
    () =>
      generatePrompt({
        description: desc + (effectiveNiche ? ` (${effectiveNiche})` : ''),
        niche: effectiveNiche,
        vibe,
        sections,
        cta,
      }),
    [desc, effectiveNiche, vibe, sections, cta],
  )

  return (
    <div className="min-h-screen">

      {/* ════════════════════════════════════════════
          HERO — full-width with animated orbs
          ════════════════════════════════════════════ */}
      <header className="relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <Orb size={400} color="rgba(139,108,255,0.15)" x="10%" y="-10%" delay={0} duration={18} />
          <Orb size={300} color="rgba(168,85,247,0.12)" x="65%" y="5%" delay={2} duration={22} />
          <Orb size={200} color="rgba(99,102,241,0.10)" x="80%" y="60%" delay={4} duration={16} />
          <Orb size={250} color="rgba(139,108,255,0.08)" x="-5%" y="50%" delay={1} duration={20} />

          {/* Grid overlay for texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(var(--accent) 1px, transparent 1px),
                linear-gradient(90deg, var(--accent) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Bottom fade into page bg */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-24 pb-20 px-5">
          <div className="max-w-xl mx-auto text-center">
            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 300 }}
              className="mx-auto mb-6 w-20 h-20 rounded-full overflow-hidden ring-2 ring-[var(--accent)]/50 shadow-[0_0_40px_rgba(139,108,255,0.2)]"
            >
              <img src="/images/profile-main.png" alt="Jack Roberts" className="w-full h-full object-cover" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5"
            >
              <span className="text-white">Build your</span>
              <br />
              <span
                className="shimmer-text bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #8b6cff, #c084fc, #f472b6, #fb923c, #c084fc, #8b6cff)',
                  backgroundSize: '200% auto',
                }}
              >
                perfect website
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-base sm:text-lg text-[var(--text-muted)] max-w-md mx-auto leading-relaxed mb-10"
            >
              Choose your style. Pick your sections.
              <br className="hidden sm:block" />
              Get a ready-to-paste prompt for any AI builder.
            </motion.p>

          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          FORM
          ════════════════════════════════════════════ */}
      <main ref={formRef} className="max-w-xl mx-auto px-5 pb-24">
        <div className="space-y-14">

          {/* 1 — Describe */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
          >
            <Step n={1} title="What's the website for?" />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. A landing page for my dental practice in Manchester that offers teeth whitening and cosmetic dentistry..."
              rows={3}
              className="input-glow"
            />
          </motion.section>

          <Divider />

          {/* 2 — Niche */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
          >
            <Step n={2} title="What type of business?" sub="Pick one or type your own below" />
            <div className="flex flex-wrap gap-2.5 mb-4">
              {niches.map((n, i) => {
                const isSelected = niche === n.label
                return (
                  <motion.button
                    key={n.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.025 * i }}
                    onClick={() => { setNiche(n.label); setCustomNiche('') }}
                    whileHover={{
                      y: -3,
                      scale: 1.04,
                      transition: { type: 'spring', stiffness: 500, damping: 20 },
                    }}
                    whileTap={{ scale: 0.93 }}
                    className={`
                      flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium
                      cursor-pointer transition-all duration-200
                      ${isSelected
                        ? 'bg-[var(--accent)]/15 border-[var(--accent)]/50 text-white shadow-[0_0_28px_rgba(139,108,255,0.15)]'
                        : 'bg-[var(--surface-raised)] border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]'
                      }
                    `}
                  >
                    <motion.span
                      className="text-base"
                      animate={isSelected ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {n.emoji}
                    </motion.span>
                    {n.label}
                  </motion.button>
                )
              })}
            </div>
            <input
              type="text"
              value={customNiche}
              onChange={(e) => { setCustomNiche(e.target.value); setNiche('') }}
              placeholder="Or type something else..."
              className="input-glow"
            />
          </motion.section>

          <Divider />

          {/* 3 — Vibe */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
          >
            <Step n={3} title="Pick a style" sub="This shapes the whole look and feel" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {vibes.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 20, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.07 * i, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <VibeCard
                    id={v.id}
                    label={v.label}
                    selected={vibe === v.id}
                    onClick={() => setVibe(v.id)}
                  >
                    {v.mockup}
                  </VibeCard>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <Divider />

          {/* 4 — Sections */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
          >
            <Step n={4} title="Build your page" sub="Add sections and drag to reorder them" />
            <SectionBuilder selected={sections} onChange={setSections} />
          </motion.section>

          <Divider />

          {/* 5 — CTA */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
          >
            <Step n={5} title="What should the button say?" sub="The main action you want visitors to take" />
            <input
              type="text"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              placeholder="e.g. Book a Free Consultation, Get a Quote, Start Free Trial"
              className="input-glow"
            />
          </motion.section>

          <Divider />

          {/* Output */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
          >
            <PromptOutput prompt={prompt} />
          </motion.section>

          {/* ── Paste hint + rainbow transition strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 py-4"
          >
            <p className="text-base text-[var(--text-muted)] font-medium">
              Paste into <span className="text-white">Lovable</span>, <span className="text-white">Bolt</span>, <span className="text-white">AntiGravity AI Studio</span>, <span className="text-white">v0</span>, or any AI builder
            </p>

            {/* Rainbow glow strip */}
            <div className="rainbow-strip mx-auto w-4/5" />

            <p className="text-xs text-[var(--text-dim)] uppercase tracking-[0.2em] font-semibold">
              Keep scrolling
            </p>

            {/* Animated down arrow */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Go Deeper — Skool CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="text-center pt-4 pb-2"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Go Deeper</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6 max-w-sm mx-auto">
              Join the community for AI systems, automations, and website builds that actually work.
            </p>
            <a
              href="https://www.skool.com/aiautomationsbyjack/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block rounded-2xl overflow-hidden border-2 border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,108,255,0.15)]"
            >
              <img
                src="/images/skool-thumbnail.png"
                alt="AI Automations by Jack — Skool Community"
                className="w-full max-w-md transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </a>
            <div className="mt-5">
              <a
                href="https://www.skool.com/aiautomationsbyjack/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm hover:brightness-110 transition-all duration-200 shadow-[0_4px_24px_rgba(139,108,255,0.3)] hover:shadow-[0_6px_32px_rgba(139,108,255,0.45)]"
              >
                Join the Community
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </a>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center pt-6 pb-10"
          >
            <p className="text-sm text-[var(--text-dim)]">
              Made with <span className="text-cyan-400">&#x1F499;</span> by Jack
            </p>
          </motion.footer>
        </div>
      </main>
    </div>
  )
}
