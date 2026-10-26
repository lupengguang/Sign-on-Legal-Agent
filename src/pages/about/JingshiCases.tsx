import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Copy, ExternalLink, FileText, Gavel, GitBranch, MessageSquare, Scale, Send, ShieldCheck, Sparkles, UserCheck } from 'lucide-react'
import {
  FeatureCTA,
  FeatureHero,
  PageShell,
  Reveal,
  SectionTitle,
} from '../../components/FeatureShell'

/* ============================================================
 * 预设对话脚本：3 条路径
 * ============================================================ */
type Risk = { level: '高风险' | '中风险' | '低风险'; text: string }
type Path = {
  key: string
  label: string
  user: string
  risks: Risk[]
  explanation: string
  script?: string
  needLawyer: boolean
  clauses: { anchor: string; text: string; highlight: string }[]
}

const PATHS: Path[] = [
  {
    key: 'labor',
    label: '劳动用工',
    user: '我们公司要招一个销售总监，合同里写了试用期 6 个月、竞业限制 2 年，但没写补偿金，有问题吗？',
    risks: [
      { level: '中风险', text: '试用期 6 个月：销售总监岗位本身不违法，但需确认劳动合同期限是否三年以上。不满三年则属违法，员工可主张赔偿。' },
      { level: '高风险', text: '竞业限制 2 年但未约定补偿金：根据劳动合同法，竞业限制必须约定经济补偿，否则员工离职后可不受约束，公司事后追究法院通常不予支持。' },
    ],
    explanation: '这两个条款组合在一起，竞业限制是更大的隐患——看似保护了公司，实际上写了等于没写。',
    script: '竞业限制条款我们保留，但需要补充一句：离职后按原工资的 30% 按月支付补偿金，支付期间竞业限制生效。如果公司停付，条款自动失效。',
    needLawyer: false,
    clauses: [
      { anchor: '第 8 条 试用期', text: '乙方试用期为 6 个月，自入职之日起计算。试用期考核不合格的，甲方有权单方解除合同。', highlight: '试用期为 6 个月' },
      { anchor: '第 15 条 竞业限制', text: '乙方离职后 2 年内不得在同行业任职，否则应向甲方支付违约金人民币 50 万元。', highlight: '2 年内不得在同行业任职（未约定补偿金）' },
    ],
  },
  {
    key: 'purchase',
    label: '采购销售',
    user: '供应商发来的合同里写"验收合格后 60 天内付款"，验收标准是"由甲方根据实际使用情况确认"，这个能签吗？',
    risks: [
      { level: '高风险', text: '"验收合格后 60 天付款"：回款周期至少 60 天起步，若甲方拖延验收，账期可能无限延长。' },
      { level: '高风险', text: '"验收标准由甲方根据实际使用情况确认"：给了对方单方面拒绝验收的权利，你没有异议或第三方检验出口。' },
    ],
    explanation: '这两个条款组合构成高风险现金流陷阱——对方可以一直拖着不验收，而你没有任何抓手迫使对方付款。',
    script: '验收标准以双方确认的技术参数为准，甲方应在收到货物后 7 个工作日内完成验收；逾期未提出书面异议的，视为验收合格。付款账期为验收合格后 30 天。',
    needLawyer: false,
    clauses: [
      { anchor: '第 6 条 付款方式', text: '甲方应于乙方交货并经甲方验收合格后 60 个自然日内，一次性支付全部款项。', highlight: '验收合格后 60 个自然日内付款' },
      { anchor: '第 5 条 验收标准', text: '验收标准由甲方根据实际使用情况确认，乙方不得提出异议。', highlight: '验收标准由甲方根据实际使用情况确认' },
    ],
  },
  {
    key: 'equity',
    label: '股权合作',
    user: '投资人要跟我们签对赌协议，说如果三年内没上市，要按年化 10% 回购，这个条款风险大吗？',
    risks: [
      { level: '高风险', text: '核心风险不在对赌本身，而在回购义务的承担主体——是公司承担还是创始人个人承担连带责任？个人连带责任一旦触发，创始人个人资产可能被追偿。' },
      { level: '高风险', text: '"三年内没上市"定义是否清晰？IPO 被否就算触发，还是需要等到某个具体日期？' },
      { level: '高风险', text: '年化 10% 是单利还是复利？复利会让回购金额膨胀数倍。' },
    ],
    explanation: '这是高复杂度、高金额条款。AI 建议的参考方向可能不足以覆盖具体情况，必须提交京师律师人工复核。',
    needLawyer: true,
    clauses: [
      { anchor: '第 3 条 对赌与回购', text: '若甲方（被投方）在 3 年内未完成 IPO，乙方（投资人）有权要求甲方或创始人按年化 10% 回购其持有的全部股权。', highlight: '3 年内未完成 IPO → 年化 10% 回购（未明确单利/复利、主体）' },
    ],
  },
]

/* ============================================================
 * 主交互组件：分屏对话 Demo
 * ============================================================ */
function SplitChatDemo() {
  const [pathIdx, setPathIdx] = useState(0)
  const [phase, setPhase] = useState<'intro' | 'typing' | 'done'>('intro')
  const [displayedRisks, setDisplayedRisks] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showScript, setShowScript] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const path = PATHS[pathIdx]

  /* 切换路径时重置 */
  useEffect(() => {
    setPhase('intro')
    setDisplayedRisks(0)
    setShowExplanation(false)
    setShowScript(false)
    setSubmitted(false)
    if (typingRef.current) clearTimeout(typingRef.current)
  }, [pathIdx])

  /* 点击发送按钮后，AI 回复逐段出现 */
  const handleSend = () => {
    if (phase !== 'intro') return
    setPhase('typing')
    setDisplayedRisks(1)
    typingRef.current = setTimeout(() => {
      setDisplayedRisks(Math.min(path.risks.length, 2))
    }, 900)
    typingRef.current = setTimeout(() => {
      setDisplayedRisks(path.risks.length)
    }, 1600)
    typingRef.current = setTimeout(() => {
      setShowExplanation(true)
    }, 2300)
    if (!path.needLawyer) {
      typingRef.current = setTimeout(() => {
        setShowScript(true)
      }, 3000)
    }
    typingRef.current = setTimeout(() => {
      setPhase('done')
    }, path.needLawyer ? 3000 : 3700)
  }

  const handleCopy = async () => {
    if (!path.script) return
    try {
      await navigator.clipboard.writeText(path.script)
      alert('话术已复制到剪贴板 ✓')
    } catch {
      alert('复制失败，请手动选择')
    }
  }

  const levelColor = (lv: string) =>
    lv === '高风险' ? 'text-[#DC2626] bg-red-50 border-red-300/60'
    : lv === '中风险' ? 'text-[#D97706] bg-amber-50 border-amber-300/60'
    : 'text-[#059669] bg-emerald-50 border-emerald-300/60'

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:grid-cols-5">
      {/* ========== 左侧：对话区（40% 宽度） ========== */}
      <div className="border-b border-gray-200/60 bg-white/60 p-5 backdrop-blur-sm sm:col-span-2 sm:border-b-0 sm:border-r sm:p-6">
        {/* 顶部标题 */}
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E3A5F] text-white shadow-md">
            <MessageSquare size={17} />
          </span>
          <div>
            <div className="text-[13.5px] font-semibold text-gray-900">京师律师 AI 助手 · 签安</div>
            <div className="text-[10.5px] text-gray-500">由京师律所真实业务规则驱动 · AI 生成仅供参考</div>
          </div>
        </div>

        {/* 路径切换 tab */}
        <div className="mb-4 flex flex-wrap gap-1.5 border-b border-gray-200 pb-3">
          {PATHS.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPathIdx(i)}
              className={`rounded-full px-3 py-1 text-[11.5px] font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                i === pathIdx
                  ? 'bg-[#1E3A5F] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* 对话消息区 */}
        <div className="mb-4 space-y-4 min-h-[260px]">
          {/* 系统开场 */}
          <div className="flex gap-2">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] text-[10px] font-bold">AI</span>
            <div className="flex-1 rounded-xl bg-gray-50 px-3 py-2 text-[11.5px] leading-[1.8] text-gray-600">
              您好，我是签安的 AI 助手。可以把遇到的合同问题描述给我，我会结合京师律所的真实规则库帮您分析。
            </div>
          </div>

          {/* 用户消息 */}
          <div className="flex gap-2">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-[10px] font-bold">我</span>
            <div className="flex-1 rounded-xl bg-[#1E3A5F] px-3 py-2 text-[11.5px] leading-[1.8] text-white">
              {path.user}
            </div>
          </div>

          {/* AI 回复区 */}
          {(phase !== 'intro' || displayedRisks > 0) && (
            <div className="flex gap-2">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] text-[10px] font-bold">AI</span>
              <div className="flex-1 space-y-2">
                <div className="text-[11.5px] text-gray-700">
                  {phase === 'typing' && displayedRisks === 0 ? '分析中...' : '根据你描述的情况，这份合同有以下风险点：'}
                </div>

                {/* 风险列表 */}
                {path.risks.slice(0, displayedRisks).map((r, i) => (
                  <div
                    key={i}
                    className={`rounded-lg border px-3 py-1.5 text-[11.5px] leading-[1.75] ${levelColor(r.level)}`}
                  >
                    <span className="mr-1.5 inline-flex items-center rounded bg-white/70 px-1.5 py-0.5 text-[9.5px] font-bold">
                      {r.level}
                    </span>
                    {r.text}
                  </div>
                ))}

                {/* 打字机光标 */}
                {phase === 'typing' && (
                  <span className="inline-block h-3 w-[2px] animate-pulse bg-gray-400 align-middle ml-0.5" />
                )}

                {/* 白话解读 */}
                {showExplanation && (
                  <div className="rounded-xl border border-[#1E3A5F]/15 bg-[#1E3A5F]/5 px-3 py-2 text-[11.5px] leading-[1.8] text-gray-700">
                    <div className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold text-[#1E3A5F]">
                      <Sparkles size={11} /> 白话解读
                    </div>
                    {path.explanation}
                  </div>
                )}

                {/* 话术 + 律师复核入口 */}
                {showScript && path.script && (
                  <div className="rounded-xl border border-[#F26522]/25 bg-[#F26522]/6 p-3">
                    <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-[#F26522]">
                      <GitBranch size={11} /> 可复制话术
                    </div>
                    <p className="text-[11.5px] leading-[1.8] text-gray-800">{path.script}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:-translate-y-0.5"
                      >
                        <Copy size={10} /> 一键复制话术
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmitted(true)}
                        className="inline-flex items-center gap-1 rounded-full bg-[#1E3A5F] px-2.5 py-1 text-[10.5px] font-medium text-white shadow-sm transition-all hover:bg-[#F26522] hover:-translate-y-0.5"
                      >
                        <Gavel size={10} /> 申请律师复核此条款
                      </button>
                    </div>
                  </div>
                )}

                {/* 强制律师复核提示 */}
                {path.needLawyer && phase === 'done' && (
                  <div className="rounded-xl border border-gray-900/10 bg-gray-900/5 p-3">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-gray-800">
                      <ShieldCheck size={11} /> 该条款属于高复杂度 · 签安已自动触发双引擎兜底
                    </div>
                    <p className="mt-1 text-[11px] leading-[1.75] text-gray-600">
                      AI 建议的参考方向不足以覆盖具体情况，建议直接提交京师律师进行人工复核。
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(true)}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition-all hover:bg-[#F26522]"
                    >
                      <Gavel size={11} /> 提交京师律师复核
                      <ArrowRight size={10} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 输入栏 / 发送按钮 */}
        <div className="rounded-xl border border-gray-200 bg-white p-2.5 backdrop-blur-sm">
          <div className="text-[11px] text-gray-400 leading-snug mb-1.5 px-1">
            当前预设路径：{path.label}
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={phase !== 'intro'}
            className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 text-[12px] font-semibold transition-all duration-300 ${
              phase !== 'intro'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#1E3A5F] text-white shadow-md hover:bg-[#F26522] hover:-translate-y-0.5'
            }`}
          >
            {phase === 'intro' && <><Send size={13} /> 发送给 AI 助手分析</>}
            {phase === 'typing' && <>AI 正在分析中...</>}
            {phase === 'done' && <>已完成分析 · 切换其他路径试试</>}
          </button>
        </div>
      </div>

      {/* ========== 右侧：内容区（60% 宽度） ========== */}
      <div className="p-5 backdrop-blur-sm sm:col-span-3 sm:p-6">
        {submitted ? (
          /* --- 工单模拟界面 --- */
          <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#1E3A5F]/20 bg-white/80 p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E3A5F] text-white shadow-xl animate-bounce">
              <UserCheck size={28} />
            </div>
            <h4 className="text-[15px] font-semibold text-gray-900">已提交至京师律师网络</h4>
            <p className="mt-1 text-[12px] text-gray-500">预计 2 小时内响应，我们会通过邮件同步进展</p>
            <div className="mt-5 w-full max-w-sm space-y-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-[11px] text-gray-600">
              <div className="flex justify-between"><span className="text-gray-400">工单号</span><span className="font-mono text-gray-900">SA-{new Date().toISOString().slice(0, 10).replace(/-/g, '')}-{Math.floor(Math.random() * 900) + 100}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">提交时间</span><span>{new Date().toLocaleString('zh-CN', { hour12: false })}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">AI 标注快照</span><span className="text-[#1E3A5F]">已附 {path.clauses.length} 条</span></div>
              <div className="flex justify-between"><span className="text-gray-400">接收方</span><span>京师律所 · 复核中心</span></div>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-5 inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-4 py-1.5 text-[11.5px] font-medium text-gray-600 transition-all hover:border-gray-500 hover:text-gray-900 hover:-translate-y-0.5"
            >
              返回合同视图
            </button>
          </div>
        ) : (
          /* --- 脱敏合同条款 mock + AI 标注卡片 --- */
          <div className="relative">
            {/* AI 标注卡片浮层 */}
            {phase !== 'intro' && displayedRisks > 0 && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-[#F26522]/25 bg-[#F26522]/6 p-3 backdrop-blur-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F26522] text-white text-[10px] font-bold">AI</span>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold text-gray-900">AI 风险标注</div>
                  <div className="mt-0.5 text-[10.5px] leading-[1.7] text-gray-700">
                    共识别 <b className="text-[#DC2626]">{path.risks.filter((r) => r.level === '高风险').length}</b> 条高风险、
                    <b className="text-[#D97706]">{path.risks.filter((r) => r.level === '中风险').length}</b> 条中风险
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-medium text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white"
                >
                  <ExternalLink size={10} /> 查看完整审查报告
                </button>
              </div>
            )}

            {/* 合同纸张 mock */}
            <div className="rounded-2xl border border-gray-200 bg-[#FAFAF7] p-6 shadow-inner">
              {/* 合同头部 */}
              <div className="mb-5 border-b border-gray-300 pb-3 text-center">
                <div className="text-[10px] text-gray-400 leading-relaxed">脱敏示例 · 来源：京师律所真实业务库</div>
                <div className="mt-1 text-[13px] font-semibold tracking-[0.15em] text-gray-900">
                  {path.key === 'labor' ? '劳动合同' : path.key === 'purchase' ? '采购合同' : '股权投资协议'}
                </div>
              </div>

              {/* 条款列表 */}
              <div className="space-y-3 text-[11.5px] leading-[1.9] text-gray-700">
                <p>甲方：___________________（盖章）  乙方：___________________（签字）</p>
                <p>鉴于甲乙双方就合作事宜，经充分协商一致，订立本合同，双方共同遵守。</p>

                {path.clauses.map((c, i) => (
                  <div key={i} className={`transition-all duration-500 ${i < displayedRisks || phase === 'done' ? 'opacity-100' : 'opacity-40'}`}>
                    <p className="font-semibold text-gray-900">{c.anchor}</p>
                    <p>
                      {c.text.split(c.highlight)[0]}
                      <span className="relative inline-block mx-0.5 rounded bg-red-100 px-0.5 text-[#DC2626] underline decoration-[#DC2626]/60 decoration-2 underline-offset-2">
                        {c.highlight}
                      </span>
                      {c.text.split(c.highlight)[1] || ''}
                    </p>
                  </div>
                ))}

                <p className="pt-2 text-gray-400">（下略）</p>
              </div>
            </div>

            {/* 纸张水印 */}
            <div className="pointer-events-none absolute bottom-3 right-4 text-[10px] text-gray-300 font-mono">
              SENSITIVE · SIGN-SAFE MOCK
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ============================================================
 * 京师律所权威介绍板块
 * ============================================================ */
function JingshiStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        { n: '8000+', t: '专业法律服务人员', sub: '执业律师超 6800 人', icon: UserCheck },
        { n: '58', t: '国内办公室', sub: '覆盖上海/深圳等主要城市', icon: Scale },
        { n: '14', t: '海外分支', sub: '覆盖全球法律服务网络', icon: ExternalLink },
        { n: '70万+', t: '累计客户', sub: '240+ 法律服务产品', icon: FileText },
      ].map((s) => (
        <div key={s.t} className="group overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:border-[#1E3A5F]/25 hover:shadow-[0_20px_50px_rgba(30,58,95,0.10)]">
          <div className="text-[clamp(1.35rem,2.5vw,2rem)] font-bold tracking-[-0.02em] text-[#1E3A5F]">{s.n}</div>
          <div className="mt-1 text-[12px] font-semibold text-gray-900">{s.t}</div>
          <div className="mt-0.5 text-[10.5px] text-gray-500">{s.sub}</div>
        </div>
      ))}
    </div>
  )
}

export default function JingshiCases() {
  return (
    <PageShell title="京师案例" icon={Scale} iconColor="#1E3A5F">
      <FeatureHero
        badge="关于我们 · 战略合作伙伴"
        title="京师律所 × 签安，"
        highlight="法律 + AI 双引擎的真实验证场"
        subtitle="北京市京师律师事务所（JINGSH LAW FIRM）创设于 1994 年，是中国最早设立的合伙制律师事务所之一。连续五年被评为北京地区规模最大律师事务所，ALB 最大 30 家中国本土律所榜单位列第三。"
        value="京师是签安的实战检验场——产品的核心规则库和风险标注逻辑来自京师真实业务场景的打磨；更是律师复核双引擎的真人兜底方。"
      />

      {/* 京师权威数据 */}
      <section className="mx-auto max-w-[1440px] px-5 pb-6 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="京师实力一览" desc="30 余年发展 · 单体最大 · 全球网络" />
          <JingshiStats />
        </Reveal>
      </section>

      {/* 定位声明 */}
      <section className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-12">
        <Reveal>
          <div className="rounded-2xl border border-[#1E3A5F]/20 bg-[#1E3A5F]/6 p-5 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A5F] text-white shadow-md">
                <Sparkles size={17} />
              </span>
              <div>
                <div className="text-[12px] font-semibold text-[#1E3A5F] mb-1">京师在签安中的定位</div>
                <p className="text-[13px] leading-[1.9] text-gray-700">
                  <b>实战检验场</b>：产品的核心规则库和风险标注逻辑来自京师真实业务场景的打磨；
                  <b>双引擎兜底方</b>：低置信度或高价值条款通过签安流转至京师律师网络人工复核，形成「AI 初筛 + 律师把关」的服务闭环。
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 核心交互：分屏 AI 对话 Demo */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="体验一次合同风险问诊" desc="点开即可与京师律师 AI 助手对话 · 预设三条典型路径" />
            <SplitChatDemo />
          </Reveal>
        </div>
      </section>

      {/* 技术实现说明 */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionTitle num="3" title="技术实现" desc="复用签安 LangGraph 编排 · 不重复造轮子" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { t: '前端', points: ['流式输出（SSE）AI 回复逐字出现', '对话历史保留在当前会话', '左侧对话 → 右侧合同同步联动'] },
              { t: '后端', points: ['复用风险生成节点', '上下文限定为条款片段', 'RAG 调用法条库（china-law-mcp）'] },
              { t: '合规护栏', points: ['不提供正式法律意见', '不预测诉讼结果', '强制引导律师复核'] },
            ].map((col, i) => (
              <Reveal key={col.t} delay={i * 70}>
                <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#1E3A5F]/20 hover:shadow-[0_20px_56px_rgba(0,0,0,0.08)]">
                  <div className="text-[12px] font-semibold text-[#1E3A5F] mb-2 flex items-center gap-1.5">
                    <GitBranch size={12} /> {col.t}
                  </div>
                  <ul className="space-y-1.5">
                    {col.points.map((p) => (
                      <li key={p} className="flex gap-2 text-[11.5px] leading-[1.75] text-gray-600">
                        <Check size={12} className="mt-[3px] shrink-0 text-[#1E3A5F]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <FeatureCTA note="京师律师在这头，AI 在那头，签安在中间牵线。" />
    </PageShell>
  )
}
