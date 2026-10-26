import { useState } from 'react'
import { Check, Clock, Fingerprint, Gavel, Link2, Lock, ShieldCheck, UserCheck } from 'lucide-react'
import { FeatureCTA, FeatureHero, GlassCard, PageShell, Reveal, SectionTitle } from '../../components/FeatureShell'

const TRAIL_BASE = [
  { t: '14:02:11', label: '合同上传', who: '用户 · u_8f21', hash: 'a3f9…c81d', color: '#6B7280' },
  { t: '14:02:24', label: 'AI 标注快照生成', who: '编排层 · 6 条风险', hash: '7e0b…24aa', color: '#7C3AED' },
  { t: '14:03:02', label: '用户复制话术', who: '用户 · u_8f21 · 条款 4.2', hash: 'd1c4…90ef', color: '#0284C7' },
]

const TRAIL_AFTER = [
  { t: '14:03:10', label: '申请律师复核', who: '用户 · u_8f21 · 条款 9.2', hash: '55a2…b7c3', color: '#F26522' },
  { t: '14:41:37', label: '律师复核完成', who: '京师 · 王律师 · 建议维持高风险', hash: '9bd8…3f21', color: '#059669' },
]

function TrailDemo() {
  const [requested, setRequested] = useState(false)
  const trail = requested ? [...TRAIL_BASE, ...TRAIL_AFTER] : TRAIL_BASE

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* 左：复核申请 */}
        <div>
          <div className="mb-2 text-[11.5px] font-semibold text-gray-400">风险卡片 · 底部入口</div>
          <div className="rounded-xl border-2 border-red-500/40 bg-red-50/40 p-4 transition-all duration-300 hover:border-red-500/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">高风险</span>
              <span className="text-[14px] font-semibold text-gray-900">竞业限制范围覆盖全行业</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-gray-600">
              置信度 78% · 低置信度条款将强制进入人工复核池
            </p>
            <button
              type="button"
              onClick={() => setRequested(true)}
              disabled={requested}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[13px] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                requested
                  ? 'cursor-default bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 hover:bg-[#F26522]'
              }`}
            >
              {requested ? <Check size={15} /> : <Gavel size={15} />}
              {requested ? '已流转至京师律师' : '申请律师复核'}
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {[
              { icon: Lock, t: '强制人工干预', d: '低置信度或命中高危词汇时，系统强制挂起，不直接给结论' },
              { icon: UserCheck, t: '双引擎兜底', d: '复杂疑难条款无缝流转至京师律所真人律师网络' },
              { icon: ShieldCheck, t: '监管对齐', d: '严格对齐《法律服务领域大模型部署应用指引》' },
            ].map((r) => (
              <div
                key={r.t}
                className="group/rule flex items-start gap-2.5 rounded-lg border border-white/60 bg-white/60 px-3 py-2.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-900/5 text-gray-600 transition-colors duration-300 group-hover/rule:bg-[#F26522] group-hover/rule:text-white">
                  <r.icon size={13} />
                </span>
                <div>
                  <div className="text-[12.5px] font-semibold text-gray-900">{r.t}</div>
                  <div className="text-[11.5px] leading-relaxed text-gray-500">{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右：审计留痕时间线 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11.5px] font-semibold text-gray-400">审计日志 · 不可篡改</span>
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Link2 size={11} />
              链式哈希
            </span>
          </div>
          <div className="rounded-xl border border-gray-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="relative">
              <span className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-transparent" />
              {trail.map((s, i) => (
                <div
                  key={i}
                  className="relative flex gap-3 pb-4 last:pb-0"
                  style={{ animation: 'none' }}
                >
                  <span
                    className="relative z-10 mt-1 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border-2 border-white shadow-sm transition-transform duration-300 hover:scale-125"
                    style={{ backgroundColor: s.color }}
                  />
                  <div className="min-w-0 flex-1 rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-gray-50">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-[12.5px] font-semibold text-gray-900">{s.label}</span>
                      <span className="flex items-center gap-0.5 font-mono text-[10.5px] text-gray-400">
                        <Clock size={9} />
                        {s.t}
                      </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-gray-500">{s.who}</span>
                      <span className="flex items-center gap-1 rounded bg-gray-900/5 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">
                        <Fingerprint size={8} />
                        {s.hash}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-2.5 text-center text-[11px] text-gray-400">
            上传 · AI 快照 · 用户操作 · 律师意见，全部落链留痕
          </p>
        </div>
      </div>
    </div>
  )
}

const FEATURES = [
  {
    icon: Gavel,
    t: '双引擎兜底',
    d: '每条风险提示旁都设有「申请律师复核」入口。复杂、疑难、高价值条款，无缝流转至背后的京师律所真人律师网络。',
  },
  {
    icon: Lock,
    t: '强制人工干预机制',
    d: '当 AI 遇到置信度极低的条款，或识别到特定高危词汇时，系统强制挂起，等待人工介入，避免 AI 直接给出误导性结论。',
  },
  {
    icon: Fingerprint,
    t: '全过程合规留痕',
    d: '每一次上传解析、AI 生成结果快照、用户操作（复制话术、标记已处理）、律师复核意见，全部通过区块链或不可篡改日志记录时间戳。',
  },
  {
    icon: ShieldCheck,
    t: '满足监管要求',
    d: '严格对齐《法律服务领域大模型部署应用指引》等政策，确保执业过程可追溯、责任可认定，实现真正的安全合规。',
  },
]

export default function LawyerReview() {
  return (
    <PageShell title="律师复核留痕" icon={Gavel} iconColor="#111827">
      <FeatureHero
        badge="产品功能 04"
        title="AI 打头阵，"
        highlight="真律师兜底"
        subtitle="涉及重大利益（股权、大额采购）的合同，用户对纯 AI 还是不放心；同时法律 AI 必须符合合规监管要求，不能越俎代庖。签安把人工复核嵌进流程，而不是藏在页脚免责声明里。"
        value="AI 打头阵图个快，真遇到大问题，有真律师在后面给你兜底，出了问题能查得清清楚楚。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="核心痛点" desc="不只是「答错」，而是「答错了但看起来很确定」" />
          <GlassCard accent>
            <p className="text-[13.5px] leading-[1.85] text-gray-700">
              纯 AI 的危险不在于会出错，而在于出错时语气同样自信。签安从产品第一层就把人工复核嵌入流程：低置信度条款强制挂起、关键决策留痕可追溯、责任边界清晰可认定。
            </p>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {[
                { k: '强制挂起', v: '低置信度不直接输出' },
                { k: '真人接管', v: '京师律师网络兜底' },
                { k: '全程留痕', v: '时间戳 + 操作快照' },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-white/60 bg-white/70 px-3 py-2.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">
                  <div className="text-[12px] font-bold text-[#F26522]">{s.k}</div>
                  <div className="text-[11.5px] text-gray-600">{s.v}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="功能演示" desc="点击「申请律师复核」，观察审计日志如何追加" />
            <TrailDemo />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionTitle num="3" title="四项关键能力" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 70}>
                <GlassCard className="h-full">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900/6 text-gray-800 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-900 group-hover:text-white">
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
      </section>

      <FeatureCTA note="关键判断有人复核，出了问题能查清。" />
    </PageShell>
  )
}
