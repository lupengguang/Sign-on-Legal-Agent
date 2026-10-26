import { useState } from 'react'
import { BookMarked, Filter, Gavel, Layers, ShieldAlert, ShieldCheck } from 'lucide-react'
import { FeatureCTA, FeatureHero, GlassCard, PageShell, Reveal, SectionTitle } from '../../components/FeatureShell'

type Level = '高' | '中' | '低'

const LEVEL_STYLE: Record<Level, { color: string; bg: string; border: string; dot: string }> = {
  高: { color: '#DC2626', bg: 'bg-red-500/15', border: 'border-red-500/40', dot: 'bg-red-500' },
  中: { color: '#D97706', bg: 'bg-amber-500/15', border: 'border-amber-500/40', dot: 'bg-amber-500' },
  低: { color: '#059669', bg: 'bg-emerald-500/15', border: 'border-emerald-500/40', dot: 'bg-emerald-500' },
}

interface Clause {
  id: number
  no: string
  text: string
  level: Level
  title: string
  source: string
  confidence: number
  rule: string
}

const CLAUSES: Clause[] = [
  {
    id: 0,
    no: '4.2',
    text: '甲方应在货物验收合格后 60 日内支付全部合同价款。',
    level: '高',
    title: '付款账期过长',
    source: '《民法典》第 626 条 · 买受人付款义务',
    confidence: 92,
    rule: '命中规则库 #F-0142「验收后账期 ≥ 60 天」',
  },
  {
    id: 1,
    no: '9.2',
    text: '乙方离职后两年内不得在任何与本行业相关的企业任职。',
    level: '高',
    title: '竞业限制无补偿且范围过宽',
    source: '《劳动合同法》第 23、24 条',
    confidence: 88,
    rule: '命中规则库 #L-0037「竞业限制无补偿」',
  },
  {
    id: 2,
    no: '11.5',
    text: '乙方逾期交付的，每日按合同总额的 1% 支付违约金。',
    level: '中',
    title: '违约金比例畸高',
    source: '《民法典》第 585 条 · 违约金调整',
    confidence: 76,
    rule: '命中规则库 #P-0088「日违约金 > 0.5%」',
  },
  {
    id: 3,
    no: '12.3',
    text: '因本合同产生争议，由甲方所在地人民法院管辖。',
    level: '低',
    title: '管辖地偏向对方',
    source: '《民事诉讼法》第 35 条 · 协议管辖',
    confidence: 94,
    rule: '未命中高风险规则 · 常见商务条款',
  },
]

function RiskDemo() {
  const [filter, setFilter] = useState<'全部' | Level>('全部')
  const [selected, setSelected] = useState(0)
  const shown = CLAUSES.filter((c) => filter === '全部' || c.level === filter)
  const active = CLAUSES[selected]
  const st = LEVEL_STYLE[active.level]

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      {/* Filter */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-gray-400">
          <Filter size={13} />
          风险等级
        </span>
        {(['全部', '高', '中', '低'] as const).map((lv) => (
          <button
            key={lv}
            type="button"
            onClick={() => setFilter(lv)}
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
              filter === lv
                ? 'border-transparent bg-gray-900 text-white shadow-md'
                : 'border-white/70 bg-white/60 text-gray-600 hover:bg-white/95'
            }`}
          >
            {lv}
          </button>
        ))}
        <span className="ml-auto text-[11.5px] text-gray-400">
          {shown.length} 条标注
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* 合同原文 + 高亮色块 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11.5px] font-semibold text-gray-400">合同原文 · 高亮定位</span>
            <span className="text-[11px] text-gray-400">点击查看详情</span>
          </div>
          <div className="rounded-xl border border-gray-200/70 bg-white/80 p-4 leading-[2.15] shadow-sm backdrop-blur-sm">
            <p className="text-[13px] text-gray-700">
              第一条　合同标的与价款 <br />
              第二条　交付与验收 <br />
              第三条　知识产权归属 <br />
            </p>
            {CLAUSES.map((c) => {
              const s = LEVEL_STYLE[c.level]
              const dimmed = filter !== '全部' && c.level !== filter
              return (
                <p key={c.id} className="text-[13px] text-gray-700">
                  <span className="text-gray-400">第 {c.no} 条　</span>
                  <button
                    type="button"
                    onClick={() => setSelected(c.id)}
                    className={`cursor-pointer rounded px-0.5 text-left transition-all duration-300 ${s.bg} ${
                      selected === c.id ? 'ring-2 ring-offset-1' : ''
                    } ${dimmed ? 'opacity-25' : 'opacity-100 hover:brightness-[0.97]'}`}
                    style={
                      selected === c.id
                        ? ({ '--tw-ring-color': s.color } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <span className="underline decoration-2 underline-offset-2" style={{ textDecorationColor: s.color }}>
                      {c.text}
                    </span>
                  </button>
                </p>
              )
            })}
            <p className="text-[13px] text-gray-700">第十三条　保密义务 <br />第十四条　合同解除</p>
          </div>
        </div>

        {/* 悬浮风险卡 */}
        <div>
          <div className="mb-2 text-[11.5px] font-semibold text-gray-400">风险卡片</div>
          <div
            key={active.id}
            className={`rounded-xl border-2 ${st.border} bg-white/85 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.10)] backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
                style={{ backgroundColor: st.color }}
              >
                {active.level}风险
              </span>
              <span className="text-[14px] font-semibold text-gray-900">{active.title}</span>
            </div>
            <p className="mt-2 text-[12px] text-gray-500">
              <span className="font-medium text-gray-700">第 {active.no} 条</span> · {active.rule}
            </p>

            <div className="mt-3 rounded-lg bg-gray-50/80 p-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                <BookMarked size={12} />
                来源溯源
              </div>
              <p className="mt-1 text-[12px] font-medium text-gray-800">{active.source}</p>
            </div>

            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-[11.5px]">
                <span className="text-gray-500">AI 置信度</span>
                <span className="font-semibold" style={{ color: st.color }}>{active.confidence}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${active.confidence}%`, backgroundColor: st.color }}
                />
              </div>
            </div>

            {active.confidence < 90 && (
              <div className="mt-3 flex items-center justify-between rounded-lg border border-gray-900/10 bg-gray-900/5 px-3 py-2">
                <span className="text-[11.5px] font-medium text-gray-600">该条款判断存在不确定性</span>
                <span className="flex items-center gap-1 rounded-full bg-gray-900 px-2.5 py-0.5 text-[10.5px] font-semibold text-white">
                  <Gavel size={10} />
                  建议人工复核
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const FEATURES = [
  {
    icon: ShieldCheck,
    t: '「规则引擎 + 大模型」双重校验',
    d: '大模型负责语义理解，底层规则库负责确定性拦截。内置基于京师律所实务经验沉淀的数千条高频陷阱规则（竞业限制无补偿、违约金畸高、付款账期过长）。',
  },
  {
    icon: ShieldAlert,
    t: '三级风险标注',
    d: '自动将条款划分为高、中、低三个等级，高风险条款在界面中直接标红高亮。',
  },
  {
    icon: BookMarked,
    t: '精准定位与来源溯源',
    d: '不只告诉你「有问题」，还高亮原合同中具体位置，并关联对应法条或裁判规则，做到「有理有据」，降低 AI 幻觉。',
  },
  {
    icon: Gavel,
    t: '置信度提示',
    d: 'AI 对拿不准的条款会显示较低置信度，并打上「建议人工复核」标签，不装懂、不误导。',
  },
]

export default function RiskAnnotation() {
  return (
    <PageShell title="条款风险标注" icon={ShieldAlert} iconColor="#DC2626">
      <FeatureHero
        badge="产品功能 02"
        title="高风险条款，"
        highlight="自动高亮"
        subtitle="小老板看合同像看天书，不知道哪句话是坑，往往被隐藏在附件里的「管辖法院」或「验收标准」背刺。签安按条款而不是按整份合同给你答案。"
        value="帮你揪出那些藏在字里行间的「霸王条款」，让你知道哪里会吃亏。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="核心痛点" desc="坑不在明面，藏在附件和脚注里" />
          <GlassCard>
            <div className="flex flex-wrap items-center gap-2">
              {['隐藏的管辖法院', '模糊的验收标准', '无补偿的竞业限制', '畸高的违约金'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-red-500/20 bg-red-500/6 px-3 py-1.5 text-[12.5px] font-medium text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500/12"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[13.5px] leading-[1.85] text-gray-600">
              这些条款单独看都不显眼，签下去才发现代价。签安把每一条拆开、标级、定位、溯源——把「看不懂」变成「看得见」。
            </p>
          </GlassCard>
        </Reveal>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="功能演示" desc="点击原文色块或筛选风险等级" />
            <RiskDemo />
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/8 text-red-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-900 group-hover:text-white">
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

        <Reveal delay={120}>
          <div className="mt-6 flex items-center gap-3 overflow-hidden rounded-2xl border border-gray-900/10 bg-gradient-to-r from-gray-900 to-gray-950 p-5">
            <Layers size={18} className="shrink-0 text-[#F26522]" />
            <p className="text-[13px] leading-relaxed text-gray-300">
              <span className="font-semibold text-white">为什么是双重校验：</span>纯大模型对动态规则适应性不足，规则引擎的输出是确定性、可枚举的，为 LLM 的语义判断提供「硬校验」锚点。
            </p>
          </div>
        </Reveal>
      </section>

      <FeatureCTA note="每一条风险，都能点回原文那一句。" />
    </PageShell>
  )
}
