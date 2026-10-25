import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  Copy,
  FileDown,
  FileSearch,
  FileText,
  Fingerprint,
  Gavel,
  Image as ImageIcon,
  Layers,
  ListChecks,
  MessageSquare,
  Phone,
  Scale,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Upload,
  UserCheck,
  XCircle,
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

/* ---------- Shared bits ---------- */
function SectionBadge({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 sm:mb-8">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white transition-colors duration-300 hover:bg-[#F26522] sm:h-7 sm:w-7 sm:text-[12px]">
        {num}
      </span>
      <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[12px] font-medium text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#F26522]/30 hover:bg-white/80 sm:px-4 sm:py-1.5 sm:text-[13px]">
        {label}
      </span>
    </div>
  )
}

function GlassCard({
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
      className={`group relative overflow-hidden rounded-2xl border p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 sm:p-8 ${
        accent
          ? 'border-[#F26522]/25 bg-gradient-to-br from-[#F26522]/10 to-white/60 hover:shadow-[0_20px_50px_rgba(242,101,34,0.15)]'
          : 'border-white/60 bg-gradient-to-br from-white/80 to-white/40 hover:border-[#F26522]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]'
      } ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F26522]/8 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#F26522]/15" />
      {/* 悬停光泽扫过 */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
      {children}
    </div>
  )
}

/* ---------- F2: interactive risk card demo ---------- */
const RISK_TABS = [
  {
    level: '高风险',
    color: '#DC2626',
    bg: 'bg-red-500/10',
    border: 'border-red-500/25',
    clause: '验收后 60 天付款',
    anchor: '第 4.2 条 · 付款条件与账期',
    confidence: 92,
    explain: '对方的账期比你想象的长：货交了、验收过了，钱还要再等两个月，现金流压力全在你这边。',
    suggestion: '建议复核',
  },
  {
    level: '中风险',
    color: '#D97706',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    clause: '知识产权归委托方所有',
    anchor: '第 7.1 条 · 知识产权归属',
    confidence: 78,
    explain: '你做的方案、模板、过程稿，签完就都不是你的了，下次给别家用同样的东西可能被告。',
    suggestion: '可关注',
  },
  {
    level: '低风险',
    color: '#059669',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    clause: '争议由合同签订地法院管辖',
    anchor: '第 12.3 条 · 争议管辖',
    confidence: 96,
    explain: '打官司要去对方指定的城市，差旅和律师成本会变高，但属于常见条款。',
    suggestion: '无需复核',
  },
]

function RiskCardDemo() {
  const [active, setActive] = useState(0)
  const tab = RISK_TABS[active]

  return (
    <div>
      {/* Tabs */}
      <div className="mb-4 flex gap-2">
        {RISK_TABS.map((t, i) => (
          <button
            key={t.level}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full border px-4 py-1.5 text-[13px] font-medium backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
              active === i
                ? 'border-transparent text-white shadow-lg'
                : 'border-white/70 bg-white/60 text-gray-600 shadow-sm hover:bg-white/90 hover:shadow-md'
            }`}
            style={active === i ? { backgroundColor: t.color } : undefined}
          >
            {t.level}
          </button>
        ))}
      </div>

      {/* Card */}
      <div
        key={active}
        className={`rounded-2xl border ${tab.border} bg-white/80 p-5 shadow-[0_10px_36px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:p-6`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white`}
              style={{ backgroundColor: tab.color }}
            >
              {tab.level}
            </span>
            <span className="text-[15px] font-semibold text-gray-900">
              {tab.clause}
            </span>
          </div>
          <span className="flex items-center gap-1 text-[12px] text-gray-500">
            <Fingerprint size={13} className="text-[#F26522]" />
            {tab.anchor}
          </span>
        </div>

        <p className="mt-3 text-[14px] leading-[1.75] text-gray-700">
          {tab.explain}
        </p>

        {/* Confidence bar */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[12px]">
            <span className="text-gray-500">AI 置信度</span>
            <span className="font-semibold text-gray-900">{tab.confidence}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${tab.confidence}%`, backgroundColor: tab.color }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-[12px] text-gray-400">
            {tab.suggestion === '建议复核' ? '低置信度条款将显式推送人工复核' : '该条款判断明确'}
          </span>
          {tab.suggestion === '建议复核' ? (
            <span className="flex items-center gap-1 rounded-full bg-gray-900 px-3 py-1 text-[11px] font-medium text-white">
              <Gavel size={11} />
              建议复核
            </span>
          ) : (
            <span className="text-[11px] font-medium text-emerald-600">
              {tab.suggestion}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- F4: copyable script demo ---------- */
function ScriptDemo() {
  const [copied, setCopied] = useState(false)
  const script =
    '王总，付款条款这块我们内部对账周期一般按验收后30天走，60天的话现金流压力比较大，能不能改成验收合格后30天内支付？其他条款我们没问题。'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script)
    } catch {
      /* clipboard 不可用时静默降级 */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="relative">
      {/* WeChat-style bubble */}
      <div className="rounded-2xl rounded-tl-sm border border-emerald-500/20 bg-gradient-to-br from-emerald-50/80 to-white/60 p-5 shadow-[0_10px_36px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/35 hover:shadow-[0_16px_44px_rgba(16,185,129,0.12)]">
        <div className="mb-2 flex items-center gap-2 text-[12px] text-gray-500">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
            我
          </span>
          发送给对方 · 微信 / 邮件均可
        </div>
        <p className="text-[14px] leading-[1.8] text-gray-800">{script}</p>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className={`group/copy mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
          copied
            ? 'bg-emerald-500 text-white shadow-emerald-500/30'
            : 'bg-gray-900 text-white shadow-gray-900/20 hover:bg-[#F26522] hover:shadow-[#F26522]/30'
        }`}
      >
        {copied ? (
          <>
            <Check size={16} />
            已复制，去粘贴吧
          </>
        ) : (
          <>
            <Copy size={16} className="transition-transform duration-300 group-hover/copy:-rotate-6" />
            一键复制这段话术
          </>
        )}
      </button>
    </div>
  )
}

/* ---------- F5: multi-agent flow ---------- */
const AGENTS = [
  { icon: BookOpen, name: '法条检索 Agent', desc: '检索法规原文，锚定具体条文' },
  { icon: Scale, name: '类案判例 Agent', desc: '检索同类纠纷裁判要旨' },
  { icon: ListChecks, name: '条款比对 Agent', desc: '对照风险规则库与陷阱模式' },
]

function MultiAgentFlow() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
      {/* 3 agents */}
      <div className="flex flex-col gap-3">
        {AGENTS.map((a, i) => (
          <div
            key={a.name}
            className="group/agent flex items-center gap-3 rounded-xl border border-white/60 bg-white/70 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F26522]/30 hover:bg-white/90 hover:shadow-md"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900/5 text-gray-700 transition-all duration-300 group-hover/agent:bg-[#F26522] group-hover/agent:text-white">
              <a.icon size={16} />
            </span>
            <div>
              <div className="text-[13.5px] font-semibold text-gray-900">{a.name}</div>
              <div className="text-[12px] text-gray-500">{a.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Connector */}
      <div className="flex items-center justify-center sm:flex-col">
        <div className="flex items-center gap-1 text-[#F26522]">
          <span className="hidden h-px w-6 animate-pulse bg-gradient-to-r from-transparent to-[#F26522] sm:block" />
          <ArrowRight size={18} className="max-sm:rotate-90" />
          <span className="hidden h-px w-6 animate-pulse bg-gradient-to-l from-transparent to-[#F26522] sm:block" />
        </div>
      </div>

      {/* Generator */}
      <div className="flex items-center rounded-xl border border-[#F26522]/25 bg-gradient-to-br from-[#F26522]/12 to-white/60 px-5 py-4 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F26522] text-white shadow-lg shadow-[#F26522]/30">
            <Sparkles size={18} />
          </span>
          <div>
            <div className="text-[14px] font-semibold text-gray-900">生成智能体</div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-gray-600">
              综合输出风险判断与话术。每条标注必须关联至少一个可查来源——原文条款、法规条文或类案要旨，不凭空生成。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Page ---------- */
export default function ProductOverview() {
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
              <ShieldCheck size={16} />
            </span>
            <span className="text-[14px] font-semibold text-gray-900">
              签安 <span className="text-gray-400">·</span> 产品概览
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
      <section className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-24">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#F26522]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-gray-900/5 blur-3xl" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {['高频合规 AI Agent', 'DeepSeek 原生多模态', '京师律所实战验证'].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[12px] font-medium text-gray-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F26522]/40 hover:bg-white/90 hover:shadow-md"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-4xl text-[clamp(1.9rem,5.5vw,3.8rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-gray-900">
              把律所级的合同审查，
              <br />
              压缩成一个<span className="text-[#F26522]">动作闭环</span>。
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-3xl text-[15px] leading-[1.85] text-gray-600 sm:text-[17px]">
              签安（SignSafe）是一款面向中小微企业的高频合规 AI Agent。它不试图替代律师，也不做泛化的法律问答，而是把律所级的合同审查能力，压缩成「上传文件 → 看懂风险 → 知道下一步怎么做 → 关键节点有人复核」的完整动作闭环。产品基于 DeepSeek 原生多模态模型构建，核心能力来自在京师律所真实业务场景中交付并运行过的系统，现在被降维重构，服务那些没有专职法务、但每天都在面对合同和用工文件的小微经营者。
            </p>
          </Reveal>

          {/* 动作 vs 知识 */}
          <Reveal delay={220}>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <GlassCard>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-400">
                  <XCircle size={15} />
                  不是「知识」问题
                </div>
                <p className="mt-3 text-[14.5px] leading-[1.8] text-gray-600">
                  小老板面对一份合同，真正卡住的往往不是「不懂法律」，而是不知道这一条签下去会发生什么、也不知道该怎么跟对方开口改。传统律所年费以万为单位计，而中小微企业的合规需求是「高频、低额、突发」。
                </p>
              </GlassCard>
              <GlassCard accent>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-[#F26522]">
                  <Check size={15} />
                  而是「动作」问题
                </div>
                <p className="mt-3 text-[14.5px] leading-[1.8] text-gray-900">
                  今天审一份劳动合同，明天看一份供应商报价单，后天要签一份租赁补充协议。签安严格卡在这个缝隙里：不生成「法律意见书」，生成<span className="font-semibold text-[#F26522]">「签字之前你能直接执行的下一步」</span>。
                </p>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* F1 多模态入口 */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionBadge num="01" label="核心功能一 · 多模态合同入口" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
            <div>
              <h2 className="text-[clamp(1.4rem,3.4vw,2.2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-gray-900">
                任何格式，直接进模型
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.85] text-gray-600">
                传统方案需要先做 OCR，再把文本送入语言模型——扫描件上错一个字，下游的条款识别和风险判断可能全盘偏移。签安走的是<span className="font-medium text-gray-900">原生多模态直通路径</span>：PDF、JPG、PNG、手机拍照的合同，图片直接送入 DeepSeek 模型，由模型同时完成版面理解、文字识别和语义提取。
              </p>
              <p className="mt-3 text-[14.5px] leading-[1.85] text-gray-600">
                DeepSeek-VL2 针对的恰是非制式合同最棘手的场景：合并单元格、跨页表格、嵌套表格、手写体混合排版。DeepSeek-OCR-2 能区分哪块是标题、哪行是签署栏、哪个框是附件清单、哪段加粗文字具有法律约束力。
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: FileText, label: 'PDF' },
                  { icon: ImageIcon, label: 'JPG / PNG' },
                  { icon: Phone, label: '手机拍照' },
                  { icon: ScanLine, label: '扫描件' },
                ].map((f) => (
                  <span
                    key={f.label}
                    className="group/chip flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-3.5 py-2 text-[13px] font-medium text-gray-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F26522]/40 hover:bg-white hover:shadow-md"
                  >
                    <f.icon size={14} className="text-[#F26522]" />
                    {f.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <GlassCard className="flex-1">
                <div className="text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-none tracking-tight text-gray-900">
                  91.09<span className="text-[18px] text-gray-400">%</span>
                </div>
                <p className="mt-2 text-[13px] font-medium text-gray-900">OmniDocBench v1.5 综合得分</p>
                <p className="mt-1 text-[12px] leading-relaxed text-gray-500">仅需 256–1120 个视觉 Token 即可覆盖一个复杂文档页面</p>
              </GlassCard>
              <GlassCard accent className="flex-1">
                <div className="text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-none tracking-tight text-[#F26522]">
                  96<span className="text-[18px] text-[#F26522]/60">%</span>
                </div>
                <p className="mt-2 text-[13px] font-medium text-gray-900">银行场景合同质检识别综合准确率</p>
                <p className="mt-1 text-[12px] leading-relaxed text-gray-600">这个量级的能力，现在被压缩到一个上传入口里：供应商微信发来一张略带倾斜的拍照合同，盖章页、手写批注、附件清单混在一起，也能直接提取结构化条款。</p>
              </GlassCard>
            </div>
          </div>
        </Reveal>
      </section>

      {/* F2 条款级结构化提取 */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionBadge num="02" label="核心功能二 · 条款级结构化提取与三级风险标注" />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <h2 className="text-[clamp(1.4rem,3.4vw,2.2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-gray-900">
                  不打模糊的整体分，
                  <br />
                  基本单位是<span className="text-[#F26522]">条款</span>
                </h2>
                <p className="mt-4 text-[14.5px] leading-[1.85] text-gray-600">
                  签安不做「整份合同的风险评分」这种模糊输出。每条被识别出的条款携带三样东西：<span className="font-medium text-gray-900">原文锚点</span>（点击回看，确认 AI 读的是哪一句）、<span className="font-medium text-gray-900">高 / 中 / 低风险等级</span>（对照风险规则库与同类条款陷阱模式，不靠模型「感觉」）、<span className="font-medium text-gray-900">AI 置信度</span>（低置信度条款不会被静默输出，而是显式推到用户面前建议复核）。
                </p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {['付款条件与账期', '违约责任与违约金', '知识产权归属', '交付与验收标准', '竞业限制范围', '争议管辖', '保密义务', '合同解除条件'].map((c) => (
                    <span
                      key={c}
                      className="flex items-center gap-1.5 rounded-lg border border-white/70 bg-white/60 px-3 py-2 text-[12.5px] font-medium text-gray-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F26522]/40 hover:bg-[#F26522]/5 hover:text-gray-900 hover:shadow-md"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#F26522]" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <RiskCardDemo />
                <p className="mt-3 text-center text-[12px] text-gray-400">可交互演示 · 点击切换高 / 中 / 低风险示例</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* F3 + F4 */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* F3 白话解读 */}
          <Reveal>
            <SectionBadge num="03" label="核心功能三 · 白话解读" />
            <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-gray-900">
              把条款翻译成「签下去会发生什么」
            </h2>
            <p className="mt-4 text-[14.5px] leading-[1.85] text-gray-600">
              风险标注告诉用户「这一条有问题」，白话解读回答的是「所以呢」。目标用户不是法学生——他们不需要理解「权利不对等」这个概念，他们需要知道这件事落到自己身上是什么后果。
            </p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/70 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300/60 hover:bg-white/80 hover:shadow-md">
                <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-gray-400">
                  <FileSearch size={14} />
                  条款原文 · 验收标准由甲方单方确认
                </div>
                <p className="text-[14px] leading-[1.75] text-gray-500 line-through decoration-gray-300">
                  该条款赋予甲方单方验收权，存在权利不对等。
                </p>
              </div>
              <div className="flex justify-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F26522]/10 text-[#F26522]">
                  <ArrowRight size={15} className="rotate-90" />
                </span>
              </div>
              <GlassCard accent>
                <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-[#F26522]">
                  <Sparkles size={14} />
                  签安白话解读
                </div>
                <p className="text-[14.5px] font-medium leading-[1.8] text-gray-900">
                  对方可以拖着不验收，你的尾款就可能一直收不到，而合同里没有给你一个说理的地方。
                </p>
              </GlassCard>
            </div>
          </Reveal>

          {/* F4 话术 */}
          <Reveal delay={120}>
            <SectionBadge num="04" label="核心功能四 · 可复制沟通话术" />
            <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-gray-900">
              从「知道」到「能开口」
            </h2>
            <p className="mt-4 text-[14.5px] leading-[1.85] text-gray-600">
              绝大多数合同 AI 的终点是一份风险清单，用户看完仍然不知道该怎么跟对方说。签安在每一条风险旁边生成一段可直接复制、粘贴到微信或邮件的确认消息——不替用户做法律主张，而是提出一个具体的、对方可以回应的修改请求。
            </p>
            <div className="mt-6">
              <ScriptDemo />
            </div>
          </Reveal>
        </div>
      </section>

      {/* F5 律师复核留痕 */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionBadge num="05" label="核心功能五 · 律师复核留痕" />
            <h2 className="max-w-3xl text-[clamp(1.3rem,3vw,2rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-gray-900">
              把合规边界做进产品流程，
              <br className="hidden sm:block" />
              而不是藏在页脚
            </h2>
            <p className="mt-4 max-w-3xl text-[14.5px] leading-[1.85] text-gray-600">
              法律 AI 最危险的不是「答错」，而是「答错了但看起来很确定」。每条风险卡片旁都有「申请律师复核」按钮：点击后系统记录时间戳、用户 ID 和 AI 标注快照，生成一条复核请求——直接回应 2026 年《法律服务领域大模型部署应用指引》「关键执业环节强制记录人工审核操作，确保执业过程可追溯、责任可认定」的要求。
            </p>

            <div className="mt-8">
              <GlassCard>
                <div className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-gray-900">
                  <Layers size={15} className="text-[#F26522]" />
                  多智能体检索增强（RAG）分工架构
                </div>
                <MultiAgentFlow />
              </GlassCard>
            </div>

            {/* Review trail timeline */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Bell, t: '发起复核', d: '风险卡片一键申请，无需切换窗口' },
                { icon: Fingerprint, t: '留痕记录', d: '时间戳 + 用户 ID + AI 标注快照' },
                { icon: UserCheck, t: '人工出口', d: 'AI 是辅助工具，关键判断有人复核' },
              ].map((s) => (
                <div
                  key={s.t}
                  className="group/step flex items-start gap-3 rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#F26522]/30 hover:shadow-lg"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900/5 text-gray-700 transition-all duration-300 group-hover/step:bg-[#F26522] group-hover/step:text-white">
                    <s.icon size={17} />
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold text-gray-900">{s.t}</div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-gray-500">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* F6 审查摘要 */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionBadge num="06" label="核心功能六 · 审查摘要与结构化导出" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-gray-900">
                一份合同，一页摘要
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.85] text-gray-600">
                不让用户在几十条风险卡片里自己汇总。摘要包含：共识别关键条款数量与高 / 中风险分布、高风险条款的类型分布，以及一条<span className="font-medium text-gray-900">优先行动建议</span>。支持导出 PDF，也可生成纯文本版本直接转发给合伙人或对方——把 AI 的离散判断收敛成一个可归档、可转发、可留痕的交付物。
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: FileDown, label: '导出 PDF' },
                  { icon: MessageSquare, label: '生成转发文本' },
                  { icon: ListChecks, label: '优先行动建议' },
                ].map((a) => (
                  <span
                    key={a.label}
                    className="flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-3.5 py-2 text-[13px] font-medium text-gray-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F26522]/40 hover:shadow-md"
                  >
                    <a.icon size={14} className="text-[#F26522]" />
                    {a.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Mock summary card */}
            <GlassCard>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-gray-900">采购合同 · 审查摘要</span>
                <span className="rounded-full bg-[#F26522]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#F26522]">示例</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { v: '18', l: '关键条款', c: 'text-gray-900' },
                  { v: '3', l: '高风险', c: 'text-red-600' },
                  { v: '5', l: '中风险', c: 'text-amber-600' },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-white/70 bg-white/60 py-3 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-md">
                    <div className={`text-[24px] font-semibold leading-none ${s.c}`}>{s.v}</div>
                    <div className="mt-1 text-[11px] text-gray-500">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-[#F26522]/20 bg-[#F26522]/5 p-4">
                <div className="text-[11px] font-semibold text-[#F26522]">优先行动建议</div>
                <p className="mt-1 text-[13px] leading-relaxed text-gray-800">
                  建议优先就「付款账期」和「知识产权归属」两条与对方沟通，其余条款可作为次要议题。
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-[12px] text-gray-400">
                <span>高风险分布：付款条件 2 条 · 知识产权 1 条</span>
                <FileDown size={14} />
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </section>

      {/* 交互流程 */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionBadge num="07" label="交互流程 · 一条完整的动作链" />
            <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-gray-900">
              不是「提问—回答」，是「上传—处理—决策—复核」
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { icon: Upload, t: '上传', d: '拖拽 PDF / 图片或手机拍照，自动判断文件类型进入对应解析路径' },
                { icon: ScanLine, t: '解析与条款提取', d: '等待界面逐条弹出进度状态，而不是空白转圈' },
                { icon: ShieldAlert, t: '风险卡片呈现', d: '原文 + 等级 + 置信度 + 白话解读 + 复制话术按钮' },
                { icon: MessageSquare, t: '决策动作', d: '复制话术去沟通、标记已处理、或申请律师复核' },
                { icon: FileDown, t: '导出摘要', d: '生成可下载 PDF 或可转发的文本版本' },
              ].map((s, i) => (
                <div
                  key={s.t}
                  className="group/flow relative rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white/85 to-white/50 p-5 shadow-sm backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F26522]/30 hover:shadow-[0_16px_40px_rgba(242,101,34,0.12)]"
                >
                  <span className="absolute right-4 top-4 text-[11px] font-semibold text-gray-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F26522]/10 text-[#F26522] transition-all duration-300 group-hover/flow:scale-110 group-hover/flow:bg-[#F26522] group-hover/flow:text-white">
                    <s.icon size={19} />
                  </span>
                  <div className="mt-4 text-[14.5px] font-semibold text-gray-900">{s.t}</div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-500">{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 明确不做什么 */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gray-900/10 bg-gradient-to-br from-gray-900 to-gray-950 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F26522]/15 blur-3xl" />
            <div className="relative">
              <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-[#F26522]">
                功能边界与能力同样重要
              </div>
              <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-white">
                签安明确不做什么
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  '不生成法律意见书',
                  '不预测诉讼结果',
                  '不替代律师的专业判断',
                  '不处理跨境合同和诉讼文书',
                  '不承诺「零幻觉」',
                ].map((item) => (
                  <div
                    key={item}
                    className="group/no flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F26522]/40 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(242,101,34,0.15)]"
                  >
                    <XCircle size={16} className="shrink-0 text-[#F26522]" />
                    <span className="text-[13.5px] font-medium text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-3xl text-[13.5px] leading-[1.85] text-gray-400">
                签安把自己定位为<span className="text-white">签字前的第一道筛查</span>——把那些「不看就会埋下隐患、但请律师看又不划算」的条款，用一个用户可以独立完成的方式过一遍。复杂问题、高价值合同、争议性条款，通过「申请律师复核」交给真人律师。这不是能力不足的退让，而是法律 AI 产品在合规框架下唯一可持续的设计逻辑。
              </p>
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal delay={100}>
          <div className="group mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-500 hover:border-[#F26522]/25 hover:shadow-[0_20px_56px_rgba(0,0,0,0.10)] sm:flex-row sm:p-10">
            <div>
              <h3 className="text-[clamp(1.2rem,2.6vw,1.7rem)] font-semibold tracking-[-0.02em] text-gray-900">
                上传你的第一份合同，免费。
              </h3>
              <p className="mt-1.5 text-[13.5px] text-gray-500">
                签字之前，先看一眼。
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
