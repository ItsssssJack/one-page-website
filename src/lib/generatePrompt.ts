export interface PromptInputs {
  description: string
  niche: string
  vibe: string | null
  sections: string[]
  cta: string
}

/*
  Vibe prompts — intentionally concise.
  We give the AI a *direction* not a spec sheet.
  No hex codes, no font names, no pixel values.
  Let the AI do what it's good at.
*/
const vibePrompts: Record<string, string> = {
  'clean':
    `Design style: Clean and modern. Lots of whitespace, soft shadows, light backgrounds, rounded corners. Feels like a premium SaaS product. Professional but approachable. Think Linear or Notion.`,
  'bold':
    `Design style: Bold and high-impact. Dark background with strong accent colors. Big typography, confident layout, striking contrast. Feels like a tech startup that means business. Think Vercel or Stripe.`,
  'warm':
    `Design style: Warm and inviting. Soft earth tones, cream/off-white backgrounds, rounded shapes. Feels friendly, trustworthy, and human. Think of a premium wellness or lifestyle brand.`,
  'playful':
    `Design style: Playful and colorful. Bright accent colors, rounded everything, fun micro-interactions. Feels energetic and creative without being childish. Think Figma or Notion.`,
  'luxury':
    `Design style: Elegant and luxurious. Dark or cream backgrounds, serif headings, lots of breathing room, gold or muted accent tones. Feels like a high-end editorial magazine. Think Apple or Aesop.`,
  'vibrant':
    `Design style: Vibrant with gradients. Bold color gradients on hero and CTAs, dark base, glowing accents. Feels cutting-edge and energetic. Think a modern AI startup.`,
}

const sectionPrompts: Record<string, string> = {
  'Hero':
    `Hero — Big bold headline (8 words max), one-line description underneath, and a prominent call-to-action button. Add an image, mockup, or illustration on the right side.`,
  'Social Proof':
    `Social proof — A row of 4-6 recognizable logos with a "Trusted by" label. Keep it compact and credible.`,
  'Features':
    `Features — A grid of 3-6 benefit cards. Each has an icon, short title, and one-sentence description. Focus on what the customer gets, not technical features.`,
  'How It Works':
    `How it works — 3 simple numbered steps showing the customer journey. Each step has a title and short description. Connect them visually.`,
  'Testimonials':
    `Testimonials — 2-3 customer quotes with names, titles, and photos. Make them feel real and specific.`,
  'Pricing':
    `Pricing — 2-3 pricing tiers side by side. Each shows the plan name, price, feature list, and a button. Highlight the best-value option.`,
  'FAQ':
    `FAQ — 5-6 common questions in an expandable accordion. Practical, real questions that this niche would actually get.`,
  'Contact Form':
    `Contact form — Name, email, and message fields with a submit button. Clean and simple.`,
  'Newsletter':
    `Newsletter signup — A short compelling line with an inline email input and subscribe button.`,
  'Stats':
    `Stats bar — 3-4 impressive numbers (like "10,000+ customers" or "99% satisfaction"). Big bold numbers with labels.`,
  'CTA Banner':
    `Bottom CTA — A full-width section near the end with a bold headline and the main call-to-action button. Last push before the footer.`,
  'Footer':
    `Footer — Logo, navigation links in columns, social media icons, and copyright text. Clean and organized.`,
}

export function generatePrompt(inputs: PromptInputs): string {
  const { description, niche, vibe, sections, cta } = inputs

  const vibeText = vibe && vibe in vibePrompts
    ? vibePrompts[vibe]
    : 'Choose the best design style based on the type of website described. Make it look premium and modern.'

  const sectionList = sections.length > 0
    ? sections.map((s, i) => `${i + 1}. ${sectionPrompts[s] ?? s}`).join('\n')
    : 'Choose the best sections for this type of website. Always include a hero and footer.'

  const lines: string[] = []

  lines.push(`Build me a beautiful, complete, single-page website.`)
  lines.push(``)
  lines.push(`**What it's for:** ${description || '[Describe your website/business here]'}`)
  if (niche) lines.push(`**Type of business:** ${niche}`)
  lines.push(`**Main button text:** "${cta || 'Get Started'}"`)

  lines.push(``)
  lines.push(vibeText)
  lines.push(``)
  lines.push(`Pick a color palette that feels right for this type of business. Don't overthink it — just choose colors that look great together and fit the vibe.`)

  lines.push(``)
  lines.push(`**Page sections (build them in this order):**`)
  lines.push(sectionList)

  lines.push(``)
  lines.push(`**Important:**`)
  lines.push(`- Make it fully responsive (looks great on phone and desktop)`)
  lines.push(`- Use real, realistic placeholder text — not lorem ipsum. Write copy that actually fits this business.`)
  lines.push(`- Add smooth, subtle animations (fade in on scroll, hover effects on buttons and cards)`)
  lines.push(`- The call-to-action button should appear above the fold and repeat near the bottom`)
  lines.push(`- Keep the code clean and production-ready. Single page, no routing.`)
  lines.push(`- Use React with Tailwind CSS`)

  return lines.join('\n').trim()
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}
