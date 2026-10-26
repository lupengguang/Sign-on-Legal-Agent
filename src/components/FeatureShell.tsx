import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react'

/* ---------- Scroll reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

/* ---------- Glass card ---------- */
export function GlassCard({
  children,
  className = '',
  accent = false,
}: {
  children: ReactNode
  className?: string
  accent?: boolean
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 ${
        accent
          ? 'border-[#F26522]/25 bg-gradient-to-br from-[#F26522]/8 to-white/50 hover:shadow-[0_20px_50px_rgba(242,101,34,0.15)]'
          : 'border-white/60 bg-gradient-to-br from-white/80 to-white/40 hover:border-[#F26522]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]'
      } ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F26522]/8 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#F26522]/15" />
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
      {children}
    </div>
  )
}

/* ---------- Page shell ---------- */
export function PageShell({
  title,
  icon: Icon,
  iconColor = '#F26522',
  children,
}: {
  title: string
  icon: LucideIcon
  iconColor?: string
  children: ReactNode
}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
          <Link
            to="/"
            className="group flex items-center gap-2 text-[14px] font-medium text-gray-900 transition-colors duration-300 hover:text-[#F26522]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white transition-all duration-300 group-hover:-translate-x-0.5 group-hover:bg-[#F26522]">
              <ArrowLeft size={15} />
            </span>
            返回首页
          </Link>
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-md"
              style={{ backgroundColor: iconColor }}
            >
              <Icon size={16} />
            </span>
            <span className="text-[14px] font-semibold text-gray-900">
              签安 <span className="text-gray-400">·</span> {title}
            </span>
          </div>
          <Link
            to="/"
            className="hidden items-center gap-2 rounded-full bg-gray-900 py-2 pl-4 pr-2 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-[#F26522] sm:flex"
          >
            免费试用
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <ArrowRight size={12} />
            </span>
          </Link>
        </div>
      </header>
      {children}
    </main>
  )
}

/* ---------- Hero block ---------- */
export function FeatureHero({
  badge,
  title,
  highlight,
  subtitle,
  value,
}: {
  badge: string
  title: string
  highlight?: string
  subtitle: string
  value: string
}) {
  return (
    <section className="relative overflow-hidden pb-10 pt-16 sm:pb-14 sm:pt-24">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#F26522]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-gray-900/5 blur-3xl" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <span className="inline-block rounded-full border border-white/70 bg-white/60 px-4 py-1.5 text-[12.5px] font-medium text-gray-700 shadow-sm backdrop-blur-md">
            {badge}
          </span>
        </Reveal>
        <Reveal delay={70}>
          <h1 className="mt-5 max-w-4xl text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-gray-900">
            {title}
            {highlight && <span className="text-[#F26522]">{highlight}</span>}
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 max-w-3xl text-[15px] leading-[1.85] text-gray-600 sm:text-[16.5px]">
            {subtitle}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-7 flex max-w-3xl items-start gap-3 rounded-2xl border border-[#F26522]/20 bg-[#F26522]/6 p-4 backdrop-blur-md transition-all duration-300 hover:border-[#F26522]/40 hover:bg-[#F26522]/10">
            <span className="mt-0.5 text-[13px] font-bold text-[#F26522]">“</span>
            <p className="text-[14px] font-medium leading-[1.75] text-gray-800">{value}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Section title ---------- */
export function SectionTitle({
  num,
  title,
  desc,
}: {
  num: string
  title: string
  desc?: string
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11.5px] font-semibold text-white transition-colors duration-300 hover:bg-[#F26522]">
        {num}
      </span>
      <div>
        <h2 className="text-[clamp(1.25rem,2.8vw,1.85rem)] font-semibold tracking-[-0.02em] text-gray-900">
          {title}
        </h2>
        {desc && <p className="mt-1 text-[12.5px] text-gray-400">{desc}</p>}
      </div>
    </div>
  )
}

/* ---------- Bottom CTA ---------- */
export function FeatureCTA({ note }: { note: string }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
      <Reveal>
        <div className="group flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-500 hover:border-[#F26522]/25 hover:shadow-[0_20px_56px_rgba(0,0,0,0.10)] sm:flex-row sm:p-10">
          <div>
            <h3 className="text-[clamp(1.2rem,2.6vw,1.7rem)] font-semibold tracking-[-0.02em] text-gray-900">
              上传你的第一份合同，免费。
            </h3>
            <p className="mt-1.5 text-[13.5px] text-gray-500">{note}</p>
          </div>
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3 rounded-full bg-[#F26522] py-3 pl-6 pr-3 text-[14px] font-semibold text-white shadow-lg shadow-[#F26522]/30 transition-all duration-300 hover:scale-[1.03] hover:bg-[#e05a1a]"
          >
            免费上传合同
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
