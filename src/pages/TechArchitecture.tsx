import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  BrainCircuit,
  ClipboardCheck,
  CloudCog,
  Container,
  Database,
  Eye,
  FileCheck,
  FileSearch,
  Fingerprint,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  ListChecks,
  Lock,
  MonitorSmartphone,
  Radio,
  Route as RouteIcon,
  Search,
  ShieldCheck,
  Workflow,
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

function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:border-[#F26522]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F26522]/8 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#F26522]/15" />
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
      {children}
    </div>
  )
}

/* ---------- 层级数据 ---------- */
interface LayerSpec {
  id: string
  num: string
  name: string
  en: string
  role: string
  color: string
}

const LAYERS: LayerSpec[] = [
  { id: 'layer-5', num: '5', name: '前端交互层', en: 'Frontend', role: '营销站 + 演示工作台双模式', color: '#F26522' },
  { id: 'layer-4', num: '4', name: '应用服务层', en: 'Application Services', role: '面向用户与业务逻辑的 API 集合', color: '#D97706' },
  { id: 'layer-3', num: '3', name: '智能体编排层', en: 'Agent Orchestration', role: 'LangGraph 有向图状态机，核心工程壁垒', color: '#7C3AED' },
  { id: 'layer-2', num: '2', name: '模型与能力层', en: 'Model & Capability', role: 'DeepSeek 多模态 + 规则引擎 + RAG', color: '#0284C7' },
  { id: 'layer-1', num: '1', name: '基础设施与安全层', en: 'Infrastructure & Security', role: '数据不出事，信任的地基', color: '#111827' },
]

/* ---------- LangGraph 节点流 ---------- */
const GRAPH_NODES = [
  { icon: FileSearch, t: '文档解析节点', d: '判断格式（PDF/图片），调用 DeepSeek 多模态完成条款结构化提取，输出带位置锚点的 JSON。' },
  { icon: ListChecks, t: '规则校验节点', d: '条款送入规则引擎，命中高风险模式库的直接打上「规则命中」标签。' },
  { icon: Search, t: 'RAG 检索节点', d: '对规则未覆盖或语义模糊的条款，并行触发法条 / 判例检索，结果与原文一起送入生成节点。' },
  { icon: BrainCircuit, t: '风险生成节点', d: '生成三级风险、白话解读与可复制话术。每条风险必须携带来源锚点（规则ID/法条条号/判例编号），不允许无来源生成。' },
  { icon: RouteIcon, t: '置信度评估与路由', d: '综合规则命中、检索相关度、输出一致性计算置信度：高于阈值直接呈现，低于阈值强制「建议复核」并路由人工池。' },
  { icon: GitBranch, t: '复核流转节点', d: '处理「申请律师复核」后的工单创建、状态跟踪与结果回写，保留完整操作轨迹。' },
]

function GraphFlow() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GRAPH_NODES.map((n, i) => (
          <div key={n.t} className="relative">
            <div className="group/node h-full rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7C3AED]/40 hover:bg-white/90 hover:shadow-[0_12px_30px_rgba(124,58,237,0.12)]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED]/10 text-[#7C3AED] transition-all duration-300 group-hover/node:bg-[#7C3AED] group-hover/node:text-white">
                  <n.icon size={16} />
                </span>
                <div className="text-[13.5px] font-semibold text-gray-900">
                  <span className="mr-1.5 text-[11px] font-bold text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                  {n.t}
                </div>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-gray-500">{n.d}</p>
            </div>
            {i < GRAPH_NODES.length - 1 && (
              <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 text-[#7C3AED]/60 lg:block">
                <ArrowRight size={14} className="animate-pulse" />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#7C3AED]/20 bg-[#7C3AED]/5 p-4">
        <Database size={16} className="mt-0.5 shrink-0 text-[#7C3AED]" />
        <p className="text-[12.5px] leading-relaxed text-gray-600">
          <span className="font-semibold text-gray-900">Checkpointer 机制</span>：整个审查过程的状态可持久化，服务重启后工作流从断点恢复，也便于在路演中展示「每一步做了什么」的可视化轨迹。
        </p>
      </div>
    </div>
  )
}

/* ---------- 置信度分支 ---------- */
function ConfidenceBranch() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
      <div className="rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-center backdrop-blur-sm">
        <div className="text-[12.5px] font-semibold text-gray-900">综合置信度计算</div>
        <div className="mt-0.5 text-[11px] text-gray-500">规则命中 · 检索相关度 · 输出一致性</div>
      </div>
      <span className="hidden items-center text-gray-300 sm:flex"><ArrowRight size={15} /></span>
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-50/60 px-4 py-3 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <div className="text-[12.5px] font-semibold text-emerald-700">高于阈值</div>
        <div className="mt-0.5 text-[11px] text-gray-600">直接呈现给用户</div>
      </div>
      <span className="hidden items-center text-gray-300 sm:flex"><ArrowDown size={15} /></span>
      <div className="rounded-xl border border-[#F26522]/25 bg-[#F26522]/8 px-4 py-3 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <div className="text-[12.5px] font-semibold text-[#F26522]">低于阈值</div>
        <div className="mt-0.5 text-[11px] text-gray-600">强制「建议复核」→ 人工复核池</div>
      </div>
    </div>
  )
}

/* ---------- Page ---------- */
export default function TechArchitecture() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const jumpTo = (id: string) => {
    setActiveLayer(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900 text-white shadow-md">
              <Layers size={16} />
            </span>
            <span className="text-[14px] font-semibold text-gray-900">
              签安 <span className="text-gray-400">·</span> 技术架构
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
      <section className="relative overflow-hidden pb-10 pt-16 sm:pb-14 sm:pt-24">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#7C3AED]/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-[#F26522]/8 blur-3xl" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <span className="inline-block rounded-full border border-white/70 bg-white/60 px-4 py-1.5 text-[12.5px] font-medium text-gray-700 shadow-sm backdrop-blur-md">
              技术架构
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-4xl text-[clamp(1.9rem,5.5vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-gray-900">
              五层架构，
              <br />
              自底向上构建<span className="text-[#F26522]">信任</span>。
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-3xl text-[15px] leading-[1.85] text-gray-600 sm:text-[17px]">
              法律 AI 产品的信任感首先来自「数据不出事」。签安从基础设施到前端交互分为五层，每层职责单一、可独立伸缩。点击任意层级查看详情。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 层级堆栈图（可点击导航） */}
      <section className="mx-auto max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-10">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-gray-900">核心架构分层 · 自底向上</h2>
              <span className="text-[11.5px] text-gray-400">点击层级跳转详情</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {LAYERS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => jumpTo(l.id)}
                  className={`group/layer flex items-center gap-4 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-5 ${
                    activeLayer === l.id
                      ? 'border-transparent bg-gray-900 text-white shadow-lg'
                      : 'border-white/60 bg-white/60 hover:bg-white/90'
                  }`}
                  style={activeLayer === l.id ? undefined : undefined}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[15px] font-bold text-white shadow-md transition-transform duration-300 group-hover/layer:scale-110"
                    style={{ backgroundColor: l.color }}
                  >
                    {l.num}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[14.5px] font-semibold ${activeLayer === l.id ? 'text-white' : 'text-gray-900'}`}>
                      {l.name}
                      <span className={`ml-2 text-[11.5px] font-normal ${activeLayer === l.id ? 'text-gray-300' : 'text-gray-400'}`}>{l.en}</span>
                    </span>
                    <span className={`mt-0.5 block truncate text-[12px] ${activeLayer === l.id ? 'text-gray-300' : 'text-gray-500'}`}>
                      {l.role}
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    className={`shrink-0 transition-all duration-300 group-hover/layer:translate-x-1 ${
                      activeLayer === l.id ? 'text-[#F26522]' : 'text-gray-300 group-hover/layer:text-[#F26522]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 第一层 */}
      <section id="layer-1" className="scroll-mt-24 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900 text-[13px] font-bold text-white">1</span>
              <div>
                <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-gray-900">基础设施与安全层</h2>
                <p className="text-[12.5px] text-gray-400">Infrastructure & Security · 所有上层服务的地基</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <GlassCard>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white"><Container size={18} /></span>
                  <h3 className="text-[15px] font-semibold text-gray-900">云原生底座</h3>
                </div>
                <p className="mt-3 text-[13px] leading-[1.8] text-gray-600">
                  Kubernetes 容器编排，前后端分离部署。核心服务拆分，便于独立伸缩与故障隔离。
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['API 网关', '合同解析服务', '审查编排服务', 'RAG 检索服务', '复核流转服务'].map((s) => (
                    <span key={s} className="rounded-lg border border-gray-200/70 bg-gray-50/60 px-2.5 py-1 text-[11.5px] font-medium text-gray-700 transition-all duration-300 hover:border-gray-900/30 hover:bg-gray-900 hover:text-white">
                      {s}
                    </span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F26522] text-white"><Lock size={18} /></span>
                  <h3 className="text-[15px] font-semibold text-gray-900">数据安全与隔离</h3>
                </div>
                <ul className="mt-3 space-y-2 text-[13px] leading-[1.75] text-gray-600">
                  <li className="flex gap-2"><ShieldCheck size={14} className="mt-1 shrink-0 text-[#F26522]" />合同存储于对象存储（OSS/S3），启用服务端加密（SSE）</li>
                  <li className="flex gap-2"><ShieldCheck size={14} className="mt-1 shrink-0 text-[#F26522]" />合同文件<span className="font-semibold text-gray-900">不进入任何模型训练流程</span></li>
                  <li className="flex gap-2"><ShieldCheck size={14} className="mt-1 shrink-0 text-[#F26522]" />敏感字段（身份证号/银行账号/金额）在送入模型前由前端或边缘服务完成脱敏</li>
                  <li className="flex gap-2"><ShieldCheck size={14} className="mt-1 shrink-0 text-[#F26522]" />预留私有化部署出口（可替换为本地开源模型）</li>
                </ul>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white"><Fingerprint size={18} /></span>
                  <h3 className="text-[15px] font-semibold text-gray-900">审计与留痕</h3>
                </div>
                <p className="mt-3 text-[13px] leading-[1.8] text-gray-600">
                  所有关键操作写入<span className="font-semibold text-gray-900">不可篡改的审计日志</span>：时间戳、用户 ID、操作类型、AI 输出快照。满足《法律服务领域大模型部署应用指引》「执业过程可追溯、责任可认定」。
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['上传', 'AI 标注生成', '复制话术', '申请复核', '复核完成'].map((s, i) => (
                    <span key={s} className="flex items-center gap-1 rounded-full bg-gray-900/5 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                      <span className="text-[9px] font-bold text-[#F26522]">{i + 1}</span>{s}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 第二层 */}
      <section id="layer-2" className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0284C7] text-[13px] font-bold text-white">2</span>
              <div>
                <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-gray-900">模型与能力层</h2>
                <p className="text-[12.5px] text-gray-400">Model & Capability · 三个异构组件各司其职</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <GlassCard>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0284C7] text-white"><Eye size={18} /></span>
                  <h3 className="text-[15px] font-semibold text-gray-900">多模态视觉理解引擎</h3>
                </div>
                <p className="mt-1 text-[11.5px] font-medium text-[#0284C7]">DeepSeek · deepseek-v4-flash-vision-exp</p>
                <p className="mt-3 text-[13px] leading-[1.8] text-gray-600">
                  文本 Agent 能力与 V4-Flash 持平，多模态 Agent 基准（ApexBench 等）显著优于纯文本版本。直接「看」合同，完成版面理解与条款结构化提取，绕过「先 OCR 再文本模型」的两段式链路。
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['base64 传入', '外部 URL', 'Files API', '每张图片 ≤ 384 tokens'].map((s) => (
                    <span key={s} className="rounded-lg border border-[#0284C7]/20 bg-[#0284C7]/5 px-2.5 py-1 text-[11.5px] font-medium text-[#0284C7]">{s}</span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white"><ListChecks size={18} /></span>
                  <h3 className="text-[15px] font-semibold text-gray-900">规则引擎</h3>
                </div>
                <p className="mt-1 text-[11.5px] font-medium text-gray-400">确定性校验层 · 不依赖模型</p>
                <p className="mt-3 text-[13px] leading-[1.8] text-gray-600">
                  DeepSeek 提取的条款与内置高风险条款模式库精确 / 模糊匹配（如「验收后60天付款」「竞业限制覆盖全行业」）。输出确定性、可枚举，为 LLM 语义判断提供<span className="font-semibold text-gray-900">「硬校验」锚点</span>。腾讯合同智审同样采用「规则引擎 + 人机协同」弥补纯大模型对动态规则的不足。
                </p>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0284C7] text-white"><Search size={18} /></span>
                  <h3 className="text-[15px] font-semibold text-gray-900">RAG 检索增强引擎</h3>
                </div>
                <p className="mt-3 text-[13px] leading-[1.8] text-gray-600">
                  维护法律知识向量库（法条原文、司法解释、类案裁判要旨）。条款被识别为潜在风险时，检索最相关片段作为<span className="font-semibold text-gray-900">「来源锚点」</span>注入生成上下文。
                </p>
                <div className="mt-4 rounded-xl border border-[#0284C7]/15 bg-[#0284C7]/5 p-3">
                  <div className="mb-2 text-[11px] font-semibold text-[#0284C7]">双路召回 + 重排序</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                    <span className="rounded-md bg-white/80 px-2 py-1 shadow-sm">原条款召回</span>
                    <span className="text-gray-300">+</span>
                    <span className="rounded-md bg-white/80 px-2 py-1 shadow-sm">改写查询召回</span>
                    <ArrowRight size={11} className="text-gray-400" />
                    <span className="rounded-md bg-white/80 px-2 py-1 shadow-sm">Rerank 精排</span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-gray-500">低于相关度阈值的片段不进入上下文，降低噪声引发的幻觉。</p>
                </div>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 第三层 */}
      <section id="layer-3" className="scroll-mt-24 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#7C3AED] text-[13px] font-bold text-white">3</span>
              <div>
                <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-gray-900">智能体编排层</h2>
                <p className="text-[12.5px] text-gray-400">Agent Orchestration · 区别于「直接调 API」的核心工程壁垒</p>
              </div>
            </div>
            <p className="mb-6 max-w-3xl text-[14px] leading-[1.85] text-gray-600">
              法律合同审查是多步骤、有状态、需要回退和人工介入的工作流，而不是一次问答。采用 <span className="font-semibold text-gray-900">LangGraph</span>（或等价图编排框架）构建有向图状态机，将审查拆解为可追踪的节点：
            </p>
            <GlassCard>
              <GraphFlow />
            </GlassCard>
            <div className="mt-5">
              <GlassCard>
                <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-gray-900">
                  <Workflow size={15} className="text-[#7C3AED]" />
                  置信度路由 · 双分支
                </div>
                <ConfidenceBranch />
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 第四层 */}
      <section id="layer-4" className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D97706] text-[13px] font-bold text-white">4</span>
              <div>
                <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-gray-900">应用服务层</h2>
                <p className="text-[12.5px] text-gray-400">Application Services · FastAPI / Spring Boot · RESTful 或流式接口</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { icon: CloudCog, t: '上传与解析服务', d: '文件接收、格式校验、脱敏预处理、临时存储，触发编排层工作流。' },
                { icon: FileCheck, t: '审查结果服务', d: '查询完整审查结果（条款列表、风险卡片、摘要），支持分页和过滤。' },
                { icon: ClipboardCheck, t: '话术与导出服务', d: '复制话术的格式化输出、审查摘要 PDF 与纯文本摘要生成。' },
                { icon: GitBranch, t: '复核工单服务', d: '创建复核请求、记录时间戳、更新复核状态、回写律师反馈。' },
                { icon: KeyRound, t: '用户与权限服务', d: '多租户 / 用户管理：体验版免登录或轻登录，订阅版完整账号体系。' },
              ].map((s) => (
                <div key={s.t} className="group/svc rounded-2xl border border-white/60 bg-gradient-to-br from-white/85 to-white/50 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#D97706]/40 hover:shadow-[0_14px_36px_rgba(217,119,6,0.12)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D97706]/10 text-[#D97706] transition-all duration-300 group-hover/svc:bg-[#D97706] group-hover/svc:text-white">
                    <s.icon size={17} />
                  </span>
                  <div className="mt-3 text-[14px] font-semibold text-gray-900">{s.t}</div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-gray-500">{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 第五层 */}
      <section id="layer-5" className="scroll-mt-24 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F26522] text-[13px] font-bold text-white">5</span>
              <div>
                <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-gray-900">前端交互层</h2>
                <p className="text-[12.5px] text-gray-400">Frontend · 两个截然不同的任务，对应双模式</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <GlassCard>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white"><Globe size={18} /></span>
                  <h3 className="text-[15px] font-semibold text-gray-900">营销站</h3>
                  <span className="rounded-full bg-gray-900/5 px-2.5 py-0.5 text-[11px] font-medium text-gray-500">Next.js / React</span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.8] text-gray-600">
                  首页、功能页、场景页、安全合规页、定价页、关于我们。静态生成（SSG）或增量静态再生（ISR），保证首屏速度和 SEO。
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['SSG', 'ISR', '首屏速度', 'SEO'].map((s) => (
                    <span key={s} className="rounded-lg border border-gray-200/70 bg-gray-50/60 px-2.5 py-1 text-[11.5px] font-medium text-gray-700">{s}</span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F26522] text-white"><MonitorSmartphone size={18} /></span>
                  <h3 className="text-[15px] font-semibold text-gray-900">演示工作台</h3>
                  <span className="rounded-full bg-[#F26522]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#F26522]">/demo · 免登录</span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.8] text-gray-600">
                  拖拽上传合同，前端通过<span className="font-semibold text-gray-900">流式传输（SSE / WebSocket）</span>接收审查进度和逐条弹出的风险卡片，实时展示「当前进行到哪一步」，而不是空白转圈。风险卡片支持展开 / 收起、一键复制话术、点击「申请复核」弹出确认层。路演直接在此演示，零摩擦。
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {['解析中', '条款提取', '风险匹配', '生成话术'].map((s, i) => (
                    <span key={s} className="flex items-center gap-1.5">
                      <span className="flex items-center gap-1 rounded-full border border-[#F26522]/25 bg-[#F26522]/5 px-2.5 py-1 text-[11px] font-medium text-gray-700">
                        <Radio size={10} className="animate-pulse text-[#F26522]" />
                        {s}
                      </span>
                      {i < 3 && <ArrowRight size={11} className="text-gray-300" />}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <div className="group flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-500 hover:border-[#F26522]/25 hover:shadow-[0_20px_56px_rgba(0,0,0,0.10)] sm:flex-row sm:p-10">
            <div>
              <h3 className="text-[clamp(1.2rem,2.6vw,1.7rem)] font-semibold tracking-[-0.02em] text-gray-900">
                上传你的第一份合同，免费。
              </h3>
              <p className="mt-1.5 text-[13.5px] text-gray-500">
                五层架构，为每一次签字兜底。
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
