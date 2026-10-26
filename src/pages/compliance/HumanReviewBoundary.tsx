import { useState } from 'react'
import { AlertTriangle, ArrowRight, BadgeCheck, FileText, Gavel, ShieldAlert, ShieldCheck, UserCheck, UserX } from 'lucide-react'
import {
  FeatureCTA,
  FeatureHero,
  GlassCard,
  PageShell,
  Reveal,
  SectionTitle,
} from '../../components/FeatureShell'

const CLAUSES = [
  { label: '标准违约金条款', note: '如"逾期付款按日 0.03% 计违约金"', conf: 0.94, kind: 'ai', aiOutput: '违约金比例常见且未超出司法保护范围（通常 0.02%–0.05%/日），建议保留。' },
  { label: '非标解除权条款', note: '如"甲方可单方解除合同且不承担任何责任"', conf: 0.62, kind: 'ai-hang', aiOutput: null, hangReason: '该条款极可能被认定为格式条款无效，AI 建议提交律师复核。' },
  { label: '股权代持协议', note: '涉及隐名股东权利与合规风险', conf: 0.21, kind: 'lawyer', aiOutput: null, hangReason: '股权代持涉及公司法、税法双重风险，AI 不具备执业资格，已自动触发律师复核。' },
  { label: '对赌回购条款', note: '涉及"对赌失败创始人兜底回购"等致命条款', conf: 0.14, kind: 'lawyer', aiOutput: null, hangReason: '回购金额可能超出创始人个人偿债能力，AI 不具备执业资格，已自动触发律师复核。' },
]

function ClauseRouterDemo() {
  const [idx, setIdx] = useState(0)
  const c = CLAUSES[idx]
  const pct = Math.round(c.conf * 100)
  const color = c.conf >= 0.85 ? '#059669' : c.conf >= 0.5 ? '#D97706' : '#DC2626'

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F26522] text-white shadow-md">
          <Gavel size={16} />
        </span>
        <div>
          <div className="text-[13px] font-semibold text-gray-900">置信度路由 · 切换条款类型看分流结果</div>
          <p className="mt-0.5 text-[11px] text-gray-500">高置信度 → AI 直出；低置信度 → 自动挂起 · 强制律师复核</p>
        </div>
      </div>

      {/* 条款类型选择 */}
      <div className="mb-4 flex flex-wrap gap-2">
        {CLAUSES.map((cl, i) => (
          <button
            key={cl.label}
            type="button"
            onClick={() => setIdx(i)}
            className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
              idx === i
                ? 'border-transparent bg-gray-900 text-white shadow-md'
                : 'border-white/70 bg-white/60 text-gray-600 hover:bg-white/95'
            }`}
          >
            {cl.label}
          </button>
        ))}
      </div>

      {/* 置信度条 */}
      <div className="rounded-xl border border-white/70 bg-white/70 p-4 backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-gray-500">AI 置信度评估</span>
          <span className="text-[14px] font-bold" style={{ color }}>{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>
        <div className="mt-1.5 text-[11px] text-gray-500">{c.note}</div>
      </div>

      {/* 路由结果 */}
      <div className="mt-3 overflow-hidden rounded-xl border border-white/70 backdrop-blur-sm transition-all duration-500">
        {c.kind === 'ai' && c.aiOutput && (
          <div className="border-l-4 border-emerald-600 bg-emerald-50/60 p-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
              <ShieldCheck size={12} />
              路由：AI 直出（高置信度）
            </div>
            <p className="text-[12.5px] leading-[1.8] text-gray-700">{c.aiOutput}</p>
            <div className="mt-2 flex items-center gap-1 text-[10.5px] text-emerald-700">
              <ArrowRight size={10} />
              结果可直接用于内部审阅 · 如需正式法律意见仍需律师介入
            </div>
          </div>
        )}

        {c.kind === 'ai-hang' && (
          <div className="border-l-4 border-amber-500 bg-amber-50/60 p-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-amber-700">
              <AlertTriangle size={12} />
              路由：AI 挂起（中等置信度）
            </div>
            <p className="text-[12.5px] leading-[1.8] text-gray-700">{c.hangReason}</p>
            <button
              type="button"
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-3.5 py-1.5 text-[11.5px] font-medium text-white shadow-sm transition-all duration-300 hover:bg-[#F26522] hover:-translate-y-0.5"
            >
              <Gavel size={12} />
              申请律师复核
            </button>
          </div>
        )}

        {c.kind === 'lawyer' && (
          <div className="border-l-4 border-[#F26522] bg-[#F26522]/6 p-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#F26522]">
              <ShieldAlert size={12} />
              路由：自动触发律师复核（低置信度）· 双引擎兜底
            </div>
            <p className="text-[12.5px] leading-[1.8] text-gray-700">{c.hangReason}</p>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="rounded-full bg-[#F26522] px-2.5 py-0.5 text-[10.5px] font-semibold text-white">
                双引擎兜底
              </span>
              <span className="text-[10.5px] text-gray-500">京师律所真人律师接单 · 全程留痕</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const FEATURES = [
  { icon: Gavel, t: '置信度路由', d: '每条输出都附带置信度评估；低于阈值自动挂起，强制引导律师复核' },
  { icon: FileText, t: '工具定位与免责声明', d: '产品显著位置声明"辅助审查与初筛"，不构成正式法律意见' },
  { icon: BadgeCheck, t: '全过程留痕', d: 'AI 标注快照 → 用户操作日志 → 律师复核意见，形成完整证据链' },
]

export default function HumanReviewBoundary() {
  return (
    <PageShell title="人工复核边界" icon={Gavel} iconColor="#F26522">
      <FeatureHero
        badge="安全与合规 03"
        title="AI 做它擅长的看字，"
        highlight="律师做他擅长的判断"
        subtitle='AI 最大的风险是"幻觉"——它可能非常自信地给出一个错误的条款建议。完全依赖 AI 风险极高，全部靠人成本又降不下来。如何界定 AI 和人的责任？'
        value="AI 帮你省下几百块的初筛费，律师在你遇到大坑时帮你兜底。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="三层边界机制" desc="从置信度评估到责任划分，签安把 AI 和人各司其职写进产品骨架" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Gavel, t: '置信度路由', d: '高置信度条款 AI 直出；低置信度自动挂起强制转律师', ok: true },
              { icon: UserX, t: '工具定位', d: '显著位置声明"辅助审查"，不提供正式法律意见', ok: true },
              { icon: UserCheck, t: '全程留痕', d: 'AI 快照 → 用户操作 → 律师意见，形成证据链', ok: true },
            ].map((p) => (
              <GlassCard key={p.t} className="h-full">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F26522] text-white">
                    <BadgeCheck size={13} />
                  </span>
                  <span className="text-[13px] font-semibold text-gray-900">{p.t}</span>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-600">{p.d}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="置信度路由演示" desc="切换条款类型，看系统如何自动分流" />
            <div className="mx-auto max-w-3xl">
              <ClauseRouterDemo />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionTitle num="3" title="签安的边界机制" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 70}>
                <GlassCard className="h-full">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F26522]/10 text-[#F26522] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F26522] group-hover:text-white">
                      <f.icon size={18} />
                    </span>
                    <div>
                      <h3 className="text-[14.5px] font-semibold text-gray-900">{f.t}</h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-500">{f.d}</p>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-6 rounded-2xl border border-gray-900/10 bg-gray-900/5 p-5">
            <div className="mb-3 text-[11.5px] font-semibold text-gray-700">《法律服务领域大模型部署应用指引》对照</div>
            <div className="space-y-2 text-[12px] leading-relaxed text-gray-700">
              <p>签安遵循"人机协同"原则：AI 负责初筛与标注以提升效率，律师对低置信度、重大利益、非标条款的审查意见承担最终责任。全过程留痕满足纠纷追溯要求。</p>
            </div>
          </div>
        </Reveal>
      </section>

      <FeatureCTA note="AI 省钱，律师兜底，双引擎让专业不贵。" />
    </PageShell>
  )
}
