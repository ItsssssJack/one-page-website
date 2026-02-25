import { useCallback } from 'react'
import { AnimatePresence, motion, Reorder } from 'framer-motion'
import {
  Sparkles, Users, LayoutGrid, ListOrdered, MessageSquareQuote,
  DollarSign, HelpCircle, Mail, Send, BarChart3,
  Megaphone, PanelBottom, GripVertical, X, Plus,
  ChevronUp, ChevronDown,
} from 'lucide-react'

const sectionMeta: Record<string, { icon: React.ReactNode; desc: string }> = {
  'Hero':           { icon: <Sparkles size={15} />,           desc: 'Headline, CTA & image' },
  'Social Proof':   { icon: <Users size={15} />,              desc: 'Client logos & trust' },
  'Features':       { icon: <LayoutGrid size={15} />,         desc: 'Benefits grid' },
  'How It Works':   { icon: <ListOrdered size={15} />,        desc: '3-step process' },
  'Testimonials':   { icon: <MessageSquareQuote size={15} />, desc: 'Customer reviews' },
  'Pricing':        { icon: <DollarSign size={15} />,         desc: 'Plan comparison' },
  'FAQ':            { icon: <HelpCircle size={15} />,         desc: 'Common questions' },
  'Contact Form':   { icon: <Mail size={15} />,               desc: 'Get in touch' },
  'Newsletter':     { icon: <Send size={15} />,               desc: 'Email signup' },
  'Stats':          { icon: <BarChart3 size={15} />,          desc: 'Key numbers' },
  'CTA Banner':     { icon: <Megaphone size={15} />,          desc: 'Final push' },
  'Footer':         { icon: <PanelBottom size={15} />,        desc: 'Links & socials' },
}

const ALL_SECTIONS = Object.keys(sectionMeta)

interface Props {
  selected: string[]
  onChange: (s: string[]) => void
}

export default function SectionBuilder({ selected, onChange }: Props) {
  const available = ALL_SECTIONS.filter((s) => !selected.includes(s))

  const moveItem = useCallback((from: number, to: number) => {
    if (to < 0 || to >= selected.length) return
    const next = [...selected]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }, [selected, onChange])

  return (
    <div className="space-y-6">
      {/* ── Selected / active layout ── */}
      {selected.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3 flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 pulse" />
            Your page — drag to reorder
          </p>
          <Reorder.Group
            axis="y"
            values={selected}
            onReorder={onChange}
            className="space-y-2 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-2.5 list-none m-0"
          >
            {selected.map((name, i) => {
              const meta = sectionMeta[name] || { icon: <LayoutGrid size={15} />, desc: '' }
              return (
                <Reorder.Item
                  key={name}
                  value={name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  whileDrag={{
                    scale: 1.03,
                    boxShadow: '0 8px 32px rgba(139,108,255,0.25)',
                    zIndex: 50,
                  }}
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl select-none
                    cursor-grab active:cursor-grabbing transition-colors duration-150
                    bg-[var(--surface-raised)] border border-[var(--border)]
                    hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)]"
                >
                  <GripVertical size={14} className="text-[var(--text-dim)] shrink-0" />
                  <span className="text-[var(--accent)] shrink-0">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[14px] font-semibold text-white">{name}</span>
                    <span className="text-xs text-[var(--text-dim)] ml-2.5 hidden sm:inline">{meta.desc}</span>
                  </div>
                  {/* Mobile up/down buttons */}
                  <div className="flex flex-col gap-0.5 sm:hidden shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); moveItem(i, i - 1) }}
                      disabled={i === 0}
                      className="w-6 h-6 rounded flex items-center justify-center bg-transparent border-none
                        text-[var(--text-dim)] disabled:opacity-20 active:text-[var(--accent)] cursor-pointer"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); moveItem(i, i + 1) }}
                      disabled={i === selected.length - 1}
                      className="w-6 h-6 rounded flex items-center justify-center bg-transparent border-none
                        text-[var(--text-dim)] disabled:opacity-20 active:text-[var(--accent)] cursor-pointer"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-dim)] tabular-nums shrink-0 w-5 text-center bg-[var(--bg)] rounded-md py-0.5">{i + 1}</span>
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => { e.stopPropagation(); onChange(selected.filter((s) => s !== name)) }}
                    className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center
                      text-[var(--text-dim)] hover:text-red-400 hover:bg-red-400/10
                      transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <X size={12} />
                  </motion.button>
                </Reorder.Item>
              )
            })}
          </Reorder.Group>
        </div>
      )}

      {/* ── Available sections to add ── */}
      {available.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">
            Add sections
          </p>
          <div className="flex flex-wrap gap-2.5">
            <AnimatePresence>
              {available.map((name, i) => {
                const meta = sectionMeta[name] || { icon: <LayoutGrid size={15} />, desc: '' }
                return (
                  <motion.button
                    key={name}
                    initial={{ opacity: 0, scale: 0.85, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -6 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    whileHover={{
                      scale: 1.06,
                      y: -3,
                      transition: { type: 'spring', stiffness: 500, damping: 20 },
                    }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onChange([...selected, name])}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                      bg-[var(--surface-raised)] border border-[var(--border)]
                      text-[var(--text-muted)] text-[13px] font-medium
                      hover:border-[var(--accent)]/40 hover:text-white hover:bg-[var(--surface-hover)]
                      hover:shadow-[0_4px_20px_rgba(139,108,255,0.12)]
                      transition-all cursor-pointer"
                  >
                    <Plus size={13} className="text-[var(--accent)]" />
                    <span className="text-[var(--accent)]/70">{meta.icon}</span>
                    {name}
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}
