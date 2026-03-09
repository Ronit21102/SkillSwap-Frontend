import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Zap, Star, CheckCircle, Users, BookOpen, Trophy,
  Code2, Palette, Music, Globe, Sparkles
} from 'lucide-react'
import { FloatingNav } from '@/components/aceternity/FloatingNav'
import { Spotlight } from '@/components/aceternity/SpotlightNew'
import { TextGenerateEffect } from '@/components/aceternity/TextGenerateEffect'
import { InfiniteMovingCards } from '@/components/aceternity/InfiniteMovingCards'
import { BentoGrid, BentoGridItem } from '@/components/aceternity/BentoGrid'
import { CardHoverEffect } from '@/components/aceternity/CardHoverEffect'
import { BackgroundBeams } from '@/components/aceternity/BackgroundBeams'
import { LampContainer } from '@/components/aceternity/LampEffect'
import { WobbleCard } from '@/components/aceternity/WobbleCard'
import { FlipWords } from '@/components/aceternity/FlipWords'
import { SparklesText } from '@/components/aceternity/SparklesText'
import { GlowingStarsEffect } from '@/components/aceternity/GlowingStars'
import { GridBackground } from '@/components/aceternity/GridBackground'

const NAV_ITEMS = [
  { name: 'How it works', link: '#how-it-works' },
  { name: 'Features', link: '#features' },
  { name: 'Testimonials', link: '#testimonials' },
]

const FLIP_WORDS = ['Guitar', 'Python', 'Design', 'Cooking', 'Yoga', 'Photography']

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'List your skills',
    desc: 'Tell us what you know — guitar, Python, cooking, gym training, design, anything.',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-500/20',
  },
  {
    step: '02',
    title: 'Find a match',
    desc: 'Search for the skill you want. See people who teach it and check if they need what you offer.',
    icon: Users,
    gradient: 'from-violet-500 to-purple-500',
    border: 'border-violet-500/20',
  },
  {
    step: '03',
    title: 'Swap & grow',
    desc: 'Send a swap request, chat, schedule sessions, and earn credibility endorsements.',
    icon: Trophy,
    gradient: 'from-orange-500 to-amber-500',
    border: 'border-orange-500/20',
  },
]

const SKILL_SWAPS = [
  { a: '🏋️ Gym Training', b: '🎸 Guitar', color: 'text-emerald-400' },
  { a: '🍳 Cooking', b: '🗣️ English Speaking', color: 'text-violet-400' },
  { a: '💻 Coding', b: '🎨 Photoshop', color: 'text-blue-400' },
  { a: '📸 Photography', b: '🧘 Yoga', color: 'text-orange-400' },
  { a: '🎹 Piano', b: '🌐 Web Design', color: 'text-pink-400' },
  { a: '✏️ Sketching', b: '📊 Excel', color: 'text-yellow-400' },
]

const FEATURES = [
  {
    title: 'Skill Matching',
    description: 'Our smart algorithm pairs you with people who have what you want and want what you have.',
    icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: 'Verified Badges',
    description: 'Endorsements earned after real sessions. No fake reviews, no gaming the system.',
    icon: <CheckCircle className="w-6 h-6 text-violet-400" />,
  },
  {
    title: 'Built-in Chat',
    description: 'Message your match, negotiate the swap terms, and stay connected — all in one place.',
    icon: <Globe className="w-6 h-6 text-blue-400" />,
  },
  {
    title: 'Session Scheduling',
    description: 'Book sessions with calendar integration and get reminders so you never miss a swap.',
    icon: <Trophy className="w-6 h-6 text-orange-400" />,
  },
  {
    title: '120+ Categories',
    description: 'From music and coding to cooking and yoga — every skill has a home on SkillSwap.',
    icon: <BookOpen className="w-6 h-6 text-pink-400" />,
  },
  {
    title: 'Community Driven',
    description: 'A growing network of 12,000+ skills listed by people who love to teach and learn.',
    icon: <Users className="w-6 h-6 text-yellow-400" />,
  },
]

const BENTO_ITEMS = [
  {
    title: 'Zero cost learning',
    description: 'No subscriptions. No fees. Just two people exchanging knowledge.',
    header: (
      <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-emerald-900/50 to-teal-900/50 items-center justify-center">
        <span className="text-5xl">🌱</span>
      </div>
    ),
    icon: <Zap className="h-4 w-4 text-emerald-400" />,
    className: 'md:col-span-2',
  },
  {
    title: 'Any skill, anywhere',
    description: 'Online or in-person swaps across 120+ skill categories.',
    header: (
      <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-violet-900/50 to-purple-900/50 items-center justify-center">
        <span className="text-5xl">🌍</span>
      </div>
    ),
    icon: <Globe className="h-4 w-4 text-violet-400" />,
    className: 'md:col-span-1',
  },
  {
    title: 'Verified teachers',
    description: 'Real endorsements from real learners after completed sessions.',
    header: (
      <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-orange-900/50 to-amber-900/50 items-center justify-center">
        <span className="text-5xl">⭐</span>
      </div>
    ),
    icon: <CheckCircle className="h-4 w-4 text-orange-400" />,
    className: 'md:col-span-1',
  },
  {
    title: 'Creative & technical',
    description: 'Music, design, coding, cooking, fitness — swap across disciplines.',
    header: (
      <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-pink-900/50 to-rose-900/50 items-center justify-center gap-3">
        <Code2 className="w-8 h-8 text-pink-300" />
        <Palette className="w-8 h-8 text-rose-300" />
        <Music className="w-8 h-8 text-pink-300" />
      </div>
    ),
    icon: <Sparkles className="h-4 w-4 text-pink-400" />,
    className: 'md:col-span-2',
  },
]

const TESTIMONIALS = [
  {
    quote: 'I was paying ₹3000/month for coding classes. SkillSwap connected me with a dev who wanted dance lessons. Best deal ever.',
    name: 'Priya Sharma',
    title: 'Learned Python · Taught Kathak',
  },
  {
    quote: "Within a week I found someone to swap gym coaching for guitar. We've been learning from each other for 3 months now.",
    name: 'Rahul Verma',
    title: 'Learned Guitar · Taught Fitness',
  },
  {
    quote: 'The credibility system is genius. I only reached out to verified teachers and the quality was incredible.',
    name: 'Ananya Iyer',
    title: 'Learned UI Design · Taught Vocals',
  },
  {
    quote: 'SkillSwap saved me thousands. I taught Spanish and learned Python — both from passionate people, not tutors reading scripts.',
    name: 'Karan Mehta',
    title: 'Learned Python · Taught Spanish',
  },
  {
    quote: 'The scheduling feature is seamless. My swap partner and I have now completed 12 sessions across two continents.',
    name: 'Sofia Alvarez',
    title: 'Learned Photography · Taught Cooking',
  },
  {
    quote: 'I was skeptical at first. But after my first swap I was hooked. The community here is genuinely warm and supportive.',
    name: 'Amara Osei',
    title: 'Learned Web Design · Taught Piano',
  },
]

const STATS = [
  { value: '12,000+', label: 'Skills listed', icon: <BookOpen className="w-5 h-5" /> },
  { value: '4,800+', label: 'Swaps completed', icon: <Trophy className="w-5 h-5" /> },
  { value: '98%', label: 'Satisfaction rate', icon: <Star className="w-5 h-5" /> },
  { value: '120+', label: 'Skill categories', icon: <Globe className="w-5 h-5" /> },
]

/* ── Component ────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ── Floating Nav ── */}
      <FloatingNav navItems={NAV_ITEMS} />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16">
        <GridBackground />
        <Spotlight className="-top-40 left-0 md:left-60" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              No money needed · just skills
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4"
          >
            <SparklesText
              className="text-5xl sm:text-6xl md:text-7xl font-black"
            >
              Learn Anything
            </SparklesText>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
          >
            by teaching{' '}
            <FlipWords words={FLIP_WORDS} className="text-emerald-400" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-10 max-w-2xl mx-auto"
          >
            <TextGenerateEffect
              words="SkillSwap is a community where people exchange knowledge no fees, no courses. Just two people helping each other grow."
              className="text-white/60 text-lg md:text-xl leading-relaxed"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base transition-colors shadow-lg shadow-emerald-500/25"
              >
                Start swapping free <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link to="/explore">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold text-base transition-all backdrop-blur-sm"
              >
                Browse skills
              </motion.button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-white/40 text-sm"
          >
            Joined by <strong className="text-white/70">4,800+ learners</strong> from 50+ cities
          </motion.p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-14 px-4 border-y border-white/5 bg-white/2">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="flex justify-center mb-2 text-white/30 group-hover:text-emerald-400 transition-colors">
                {icon}
              </div>
              <p className="text-4xl font-black text-white">{value}</p>
              <p className="text-white/50 text-sm mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">How it works</p>
            <h2 className="text-4xl md:text-5xl font-black">Three steps to your first swap</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon, gradient, border }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className={`relative p-6 rounded-2xl border ${border} bg-white/3 backdrop-blur-sm overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <span className="absolute top-4 right-4 text-5xl font-black text-white/5 select-none">{step}</span>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${gradient} mb-5`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Swap Ticker ── */}
      <section className="py-14 border-y border-white/5 overflow-hidden bg-black">
        <p className="text-center text-white/30 text-xs tracking-widest uppercase mb-6">Swaps happening right now</p>
        <div className="flex gap-6 animate-scroll whitespace-nowrap">
          {[...SKILL_SWAPS, ...SKILL_SWAPS, ...SKILL_SWAPS].map(({ a, b, color }, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm shrink-0"
            >
              <span className={`font-semibold ${color}`}>{a}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/30" />
              <span className={`font-semibold ${color}`}>{b}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Bento Grid Features ── */}
      <section id="features" className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-black">Everything you need to swap</h2>
          </motion.div>

          <BentoGrid className="max-w-4xl mx-auto">
            {BENTO_ITEMS.map((item) => (
              <BentoGridItem
                key={item.title}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* ── Card Hover Features ── */}
      <section className="py-16 px-4 bg-white/2 border-y border-white/5">
        <div className="mx-auto max-w-5xl">
          <CardHoverEffect items={FEATURES} />
        </div>
      </section>

      {/* ── Wobble Cards – Credibility ── */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">Trust & Safety</p>
            <h2 className="text-4xl md:text-5xl font-black">Built on real credibility</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <WobbleCard containerClassName="col-span-1 md:col-span-2 min-h-[200px] bg-linear-to-br from-emerald-900 to-teal-900">
              <h3 className="text-2xl font-bold mb-3">Verified Skill Badges</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Endorsements unlock only after completed sessions. One per person per skill — no gaming, no fake reviews. Earn 3+ and get a Verified badge shown in search.
              </p>
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 min-h-[200px] bg-linear-to-br from-violet-900 to-purple-900">
              <h3 className="text-xl font-bold mb-3">Safe Scheduling</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Built-in calendar, session reminders, and structured swap agreements keep both parties accountable.
              </p>
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 min-h-[200px] bg-linear-to-br from-orange-900 to-amber-900">
              <h3 className="text-xl font-bold mb-3">Community Reports</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Users can flag bad actors. Our moderation team reviews every report within 24 hours.
              </p>
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 md:col-span-2 min-h-[200px] bg-linear-to-br from-pink-900 to-rose-900">
              <h3 className="text-2xl font-bold mb-3">Zero Financial Risk</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                No money changes hands on SkillSwap. You trade time and knowledge — so there's nothing to lose and everything to gain.
              </p>
            </WobbleCard>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-black">Real people, real swaps</h2>
        </motion.div>

        <InfiniteMovingCards
          items={TESTIMONIALS.slice(0, 3)}
          direction="left"
          speed="slow"
          className="mb-4"
        />
        <InfiniteMovingCards
          items={TESTIMONIALS.slice(3)}
          direction="right"
          speed="slow"
        />
      </section>

      {/* ── Lamp CTA ── */}
      <LampContainer>
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 80 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="mt-8 bg-linear-to-br from-slate-100 to-slate-400 bg-clip-text text-center text-4xl font-black tracking-tight text-transparent md:text-6xl"
        >
          Ready to start <br /> your first swap?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 80 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/50 text-center text-lg mt-6"
        >
          Join thousands of learners growing without spending a rupee.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 80 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center mt-8"
        >
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-10 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg transition-colors shadow-2xl shadow-emerald-500/30"
            >
              Join the community <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </LampContainer>

      {/* ── Final CTA with Beams ── */}
      <section className="relative py-32 px-4 overflow-hidden bg-black">
        <GlowingStarsEffect />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <SparklesText
            className="text-5xl md:text-7xl font-black mb-6"
          >
            Start today.
          </SparklesText>
          <p className="text-white/50 text-xl mb-10">
            Your next teacher is already on SkillSwap  waiting to learn from you.
          </p>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-12 py-5 rounded-xl bg-white text-black font-black text-lg hover:bg-white/90 transition-colors"
            >
              Get started free <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
        <BackgroundBeams />
      </section>

      {/* ── Footer ── */}
      <footer className="bg-black border-t border-white/5 text-white/40 text-sm py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </span>
            SkillSwap
          </div>
          <nav className="flex items-center gap-6 text-white/40 text-sm">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <Link to="/login" className="hover:text-white transition-colors">Log in</Link>
          </nav>
          <p>© {new Date().getFullYear()} SkillSwap</p>
        </div>
      </footer>
    </div>
  )
}
