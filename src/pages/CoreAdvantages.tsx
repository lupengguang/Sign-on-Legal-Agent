import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  ClipboardCopy,
  Clock3,
  Fingerprint,
  Gavel,
  Layers,
  Scale,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Zap,
} from 'lucide-react'

/* ---------- Scroll reveal ---------- */
function Reveal({
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
      { threshold: 0.12 },
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

function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:border-[#F26522]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] sm:p-8 ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F26522]/8 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#F26522]/15" />
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
      {children}
    </div>
  )
}

/* ---------- 配图1：双引擎协同架构图 ---------- */
const INTERCEPT_CLAUSES = ['付款账期', '交付验收', '保密义务', '违约责任']
const PASS_CLAUSES = ['股权对赌', '跨境条款']

function EngineDiagram() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-10">
      {/* Flow lane */}
      <div className="pointer-events-none absolute left-6 right-6 top-[58%] hidden h-10 sm:block">
        {INTERCEPT_CLAUSES.map((c, i) => (
          <span
            key={c}
            className="absolute top-1/2 flex h-7 -translate-y-1/2 items-center whitespace-nowrap rounded-full border border-gray-300/70 bg-white/90 px-2.5 text-[11px] font-medium text-gray-600 shadow-sm"
            style={{
              animation: `clause-intercept 6s linear infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            {c}
          </span>
        ))}
        {PASS_CLAUSES.map((c, i) => (
          <span
            key={c}
            className="absolute top-1/2 flex h-7 -translate-y-1/2 items-center whitespace-nowrap rounded-full border border-red-300/70 bg-red-50/90 px-2.5 text-[11px] font-semibold text-red-600 shadow-sm"
            style={{
              animation: `clause-pass 8s linear infinite`,
              animationDelay: `${2.5 + i * 4}s`,
            }}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-8">
        {/* 大模型引擎 */}
        <div className="group/engine1 rounded-2xl border border-[#F26522]/25 bg-gradient-to-br from-[#F26522]/10 to-white/60 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(242,101,34,0.15)]">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F26522] text-white shadow-lg shadow-[#F26522]/30 transition-transform duration-500 group-hover/engine1:rotate-6 group-hover/engine1:scale-110">
              <BrainCircuit size={22} />
            </span>
            <div>
              <div className="text-[15px] font-semibold text-gray-900">大模型引擎</div>
              <div className="text-[12px] text-[#F26522]">效率与广度</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['10 秒读完一份合同', '多模态解析', '成本几分钱'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[11.5px] font-medium text-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-[#F26522]/40 hover:bg-white"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-gray-500">
            海量常规条款在这里被拦截并即时处理
          </p>
        </div>

        {/* 阈值线 */}
        <div className="relative hidden w-16 flex-col items-center justify-center sm:flex">
          <div
            className="h-full w-px bg-gradient-to-b from-transparent via-[#F26522] to-transparent"
            style={{ animation: 'threshold-pulse 2.4s ease-in-out infinite' }}
          />
          <span className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#F26522]/30 bg-white/90 px-2.5 py-1 text-[10.5px] font-semibold text-[#F26522] shadow-sm backdrop-blur-sm">
            置信度阈值线
          </span>
        </div>
        <div className="flex items-center justify-center sm:hidden">
          <span className="rounded-full border border-[#F26522]/30 bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#F26522] shadow-sm">
            —— 置信度阈值线 ——
          </span>
        </div>

        {/* 律师引擎 */}
        <div className="group/engine2 rounded-2xl border border-gray-900/15 bg-gradient-to-br from-gray-900/8 to-white/60 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-lg shadow-gray-900/25 transition-transform duration-500 group-hover/engine2:-rotate-6 group-hover/engine2:scale-110">
              <Scale size={22} />
            </span>
            <div>
              <div className="text-[15px] font-semibold text-gray-900">律师专业引擎</div>
              <div className="text-[12px] text-gray-500">精度与兜底</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['京师律所背书', '兜底责任', '疑难会诊'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[11.5px] font-medium text-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-gray-900/30 hover:bg-white"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-gray-500">
            少数高风险、低置信度条款穿透接管
          </p>
        </div>
      </div>

      {/* 底部标语 */}
      <div className="relative mt-8 text-center">
        <span className="inline-block rounded-full bg-gray-900 px-6 py-2.5 text-[14px] font-semibold tracking-wide text-white shadow-lg transition-transform duration-300 hover:scale-105">
          AI 负责效率，律师负责底线。
        </span>
      </div>
    </div>
  )
}

/* ---------- 引擎详情卡 ---------- */
const ENGINE_1 = {
  icon: Zap,
  name: '引擎一 · 大模型引擎',
  role: '负责「效率与广度」',
  tags: ['极速处理', '多模态识别', '成本极低'],
  accent: true,
  features: [
    { icon: ScanLine, t: '多模态直读', d: '基于 DeepSeek 原生多模态，合同扫描件、拍照件直接读，不需要先转文字。' },
    { icon: Clock3, t: '秒级初筛', d: '1M 上下文，几十页合同连附件一次性送入，5 秒内输出结构化条款。' },
    { icon: Layers, t: '规则库比对', d: '内置数万条高频风险规则（如「验收后60天付款」「竞业限制全行业」），瞬间标红。' },
    { icon: Sparkles, t: '白话解读与话术', d: '不仅指出问题，还生成可直接发给对方修改的沟通话术。' },
  ],
}

const ENGINE_2 = {
  icon: Gavel,
  name: '引擎二 · 律师专业引擎',
  role: '负责「精度与兜底」',
  tags: ['京师背书', '人工复核', '责任可溯'],
  accent: false,
  features: [
    { icon: ShieldCheck, t: '京师律所实战打磨', d: '核心逻辑源自京师律所的真实交付案例，不是实验室凭空想出来的。' },
    { icon: UserCheck, t: '低置信度人工接管', d: '当 AI 置信度低于设定阈值，或遇到复杂条款（如股权对赌、跨境条款），自动流转至人工复核池。' },
    { icon: Gavel, t: '一键申请复核', d: '用户对任何一条 AI 标注存疑，都可一键呼叫真人律师。' },
    { icon: Fingerprint, t: '留痕与追溯', d: '关键决策记录时间戳和操作快照，符合《法律服务领域大模型部署应用指引》的合规要求。' },
  ],
}

function EnginePanel({ engine }: { engine: typeof ENGINE_1 }) {
  return (
    <GlassCard className="h-full">
      <div className="relative">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110 ${
              engine.accent
                ? 'bg-[#F26522] shadow-[#F26522]/30'
                : 'bg-gray-900 shadow-gray-900/25'
            }`}
          >
            <engine.icon size={22} />
          </span>
          <div>
            <h3 className="text-[17px] font-semibold text-gray-900">{engine.name}</h3>
            <p className="text-[12.5px] text-gray-500">{engine.role}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {engine.tags.map((t) => (
            <span
              key={t}
              className={`rounded-full px-3 py-1 text-[11.5px] font-semibold transition-transform duration-300 hover:scale-105 ${
                engine.accent
                  ? 'bg-[#F26522]/10 text-[#F26522]'
                  : 'bg-gray-900/8 text-gray-700'
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {engine.features.map((f) => (
            <div
              key={f.t}
              className="group/feat flex items-start gap-3 rounded-xl border border-white/60 bg-white/60 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F26522]/30 hover:bg-white/90 hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900/5 text-gray-600 transition-all duration-300 group-hover/feat:bg-[#F26522] group-hover/feat:text-white">
                <f.icon size={16} />
              </span>
              <div>
                <div className="text-[14px] font-semibold text-gray-900">{f.t}</div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-gray-500">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

/* ---------- 配图2：产品界面双引擎证据（可交互 mock） ---------- */
function EvidenceMock() {
  const [copied, setCopied] = useState(false)
  const [reviewRequested, setReviewRequested] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        '王总，这一条竞业限制范围覆盖全行业，对我们限制过大，能不能收窄到与公司实际业务相竞争的范围？其他条款我们没问题。',
      )
    } catch {
      /* 静默降级 */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-10">
      <div className="mx-auto max-w-2xl">
        {/* 浏览器框 */}
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50/80 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3 text-[11px] text-gray-400">signsafe.ai / 合同审查</span>
          </div>
          <div className="p-5 sm:p-6">
            {/* 高风险条款卡 */}
            <div className="rounded-xl border-2 border-red-500/40 bg-red-50/50 p-4 transition-all duration-300 hover:border-red-500/60 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  高风险
                </span>
                <span className="text-[14.5px] font-semibold text-gray-900">
                  竞业限制范围覆盖全行业
                </span>
                <span className="ml-auto flex items-center gap-1 text-[11.5px] text-gray-500">
                  <Fingerprint size={12} className="text-[#F26522]" />
                  第 9.2 条
                </span>
              </div>
              <p className="mt-2.5 text-[13px] leading-[1.75] text-gray-700">
                这意味着离职后你几乎不能在同行业任何地方工作，范围远超合理边界。
              </p>
              {/* 双引擎按钮 */}
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`group/btn flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-[13px] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                    copied
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-[#F26522] text-white shadow-lg shadow-[#F26522]/25 hover:bg-[#e05a1a]'
                  }`}
                >
                  {copied ? <Check size={15} /> : <ClipboardCopy size={15} className="transition-transform duration-300 group-hover/btn:-rotate-6" />}
                  {copied ? '已复制话术' : '一键复制修改话术'}
                </button>
                <button
                  type="button"
                  onClick={() => setReviewRequested(true)}
                  disabled={reviewRequested}
                  className={`group/btn flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-[13px] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                    reviewRequested
                      ? 'cursor-default bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 hover:bg-gray-800'
                  }`}
                >
                  {reviewRequested ? <Check size={15} /> : <Gavel size={15} />}
                  {reviewRequested ? '已进入律师复核队列' : '申请律师复核'}
                  {!reviewRequested && (
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-[14px] font-medium text-gray-700">
          每一个风险点，都有<span className="text-[#F26522]">双重解法</span>。
        </p>
      </div>
    </div>
  )
}

/* ---------- 配图3：成本 × 专业度坐标图 ---------- */
function CostMatrix() {
  const points = [
    {
      x: 18,
      y: 78,
      label: '免费通用大模型',
      desc: '成本低 · 专业度低 · 无责任兜底',
      color: '#9CA3AF',
      highlight: false,
    },
    {
      x: 18,
      y: 18,
      label: '传统律所年费 / 专聘法务',
      desc: '专业度高 · 成本极高',
      color: '#374151',
      highlight: false,
    },
    {
      x: 80,
      y: 16,
      label: '签安双引擎',
      desc: '专业度高 · 成本极低',
      color: '#F26522',
      highlight: true,
    },
  ]

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-10">
      <div className="relative mx-auto max-w-3xl">
        <svg viewBox="0 0 600 400" className="w-full">
          {/* Grid */}
          {[100, 180, 260, 340].map((y) => (
            <line key={y} x1="60" y1={y} x2="560" y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 6" />
          ))}
          {[180, 300, 420, 540].map((x) => (
            <line key={x} x1={x} y1="40" x2={x} y2="340" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 6" />
          ))}

          {/* Axes */}
          <line x1="60" y1="340" x2="560" y2="340" stroke="#111827" strokeWidth="2" />
          <line x1="60" y1="340" x2="60" y2="40" stroke="#111827" strokeWidth="2" />
          <polygon points="560,340 548,335 548,345" fill="#111827" />
          <polygon points="60,40 55,52 65,52" fill="#111827" />

          {/* Axis labels */}
          <text x="300" y="378" textAnchor="middle" fontSize="13" fill="#6b7280" fontWeight="600">
            成本（左：极高 → 右：极低）
          </text>
          <text x="30" y="190" textAnchor="middle" fontSize="13" fill="#6b7280" fontWeight="600" transform="rotate(-90 30 190)">
            专业度 / 可靠性
          </text>

          {/* 最佳商业区间 */}
          <rect x="360" y="48" width="190" height="120" rx="16" fill="#F26522" fillOpacity="0.07" stroke="#F26522" strokeOpacity="0.3" strokeDasharray="5 5" />
          <text x="455" y="68" textAnchor="middle" fontSize="11.5" fill="#F26522" fontWeight="700">
            最佳商业区间
          </text>

          {points.map((p) => {
            const cx = 60 + (p.x / 100) * 500
            const py = 40 + (p.y / 100) * 300
            return (
              <g key={p.label} className="cursor-default">
                {p.highlight && (
                  <circle cx={cx} cy={py} r="26" fill={p.color} fillOpacity="0.15">
                    <animate attributeName="r" values="20;30;20" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={cx} cy={py} r={p.highlight ? 11 : 8} fill={p.color} />
                <text
                  x={cx}
                  y={py - (p.highlight ? 26 : 18)}
                  textAnchor="middle"
                  fontSize={p.highlight ? 14 : 12.5}
                  fontWeight={p.highlight ? 700 : 600}
                  fill={p.highlight ? '#F26522' : '#374151'}
                >
                  {p.label}
                </text>
                <text x={cx} y={py + (p.highlight ? 30 : 24)} textAnchor="middle" fontSize="11" fill="#6b7280">
                  {p.desc}
                </text>
              </g>
            )
          })}
        </svg>
        <p className="mt-4 text-center text-[13px] text-gray-500">
          横轴成本（越靠右越低），纵轴专业度 —— 签安占据右上：专业度高、成本极低。
        </p>
      </div>
    </div>
  )
}

/* ---------- Page ---------- */
export default function CoreAdvantages() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      {/* Top glass nav */}
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
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F26522] text-white shadow-md shadow-[#F26522]/30">
              <Zap size={16} />
            </span>
            <span className="text-[14px] font-semibold text-gray-900">
              签安 <span className="text-gray-400">·</span> 核心优势
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

      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-16 sm:pb-16 sm:pt-24">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#F26522]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-48 h-80 w-80 rounded-full bg-gray-900/5 blur-3xl" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <span className="inline-block rounded-full border border-white/70 bg-white/60 px-4 py-1.5 text-[12.5px] font-medium text-gray-700 shadow-sm backdrop-blur-md">
              核心优势
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-4xl text-[clamp(1.9rem,5.5vw,3.8rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-gray-900">
              大模型 + 律师
              <span className="text-[#F26522]">双引擎</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-3xl text-[15px] leading-[1.85] text-gray-600 sm:text-[17px]">
              为什么中小微企业敢用签安？因为我们把 AI 的速度和真人的责任结合在了一起。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 配图1：协同架构图 */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12">
        <Reveal>
          <EngineDiagram />
        </Reveal>
      </section>

      {/* 双引擎详情 */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <EnginePanel engine={ENGINE_1} />
          </Reveal>
          <Reveal delay={120}>
            <EnginePanel engine={ENGINE_2} />
          </Reveal>
        </div>
      </section>

      {/* 配图2：界面证据 */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mb-8 text-center">
              <h2 className="text-[clamp(1.4rem,3.4vw,2.2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-gray-900">
                在产品里，双引擎长这样
              </h2>
              <p className="mt-3 text-[14px] text-gray-500">
                真实操作界面 · 两个按钮都可点击体验
              </p>
            </div>
            <EvidenceMock />
          </Reveal>
        </div>
      </section>

      {/* 配图3：成本 × 专业度 */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <div className="mb-8 text-center">
            <h2 className="text-[clamp(1.4rem,3.4vw,2.2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-gray-900">
              成本与专业度的最佳区间
            </h2>
          </div>
          <CostMatrix />
        </Reveal>

        {/* Bottom CTA */}
        <Reveal delay={100}>
          <div className="group mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-500 hover:border-[#F26522]/25 hover:shadow-[0_20px_56px_rgba(0,0,0,0.10)] sm:flex-row sm:p-10">
            <div>
              <h3 className="text-[clamp(1.2rem,2.6vw,1.7rem)] font-semibold tracking-[-0.02em] text-gray-900">
                上传你的第一份合同，免费。
              </h3>
              <p className="mt-1.5 text-[13.5px] text-gray-500">
                AI 负责效率，律师负责底线。
              </p>
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
    </main>
  )
}
