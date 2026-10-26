import { useState } from 'react'
import { AlertTriangle, ArrowRight, BadgeCheck, Banknote, CalendarClock, MapPin, Scale, Truck } from 'lucide-react'
import {
  FeatureCTA,
  FeatureHero,
  GlassCard,
  PageShell,
  Reveal,
  ScenarioMatrix,
  SectionTitle,
} from '../../components/FeatureShell'

function PaymentDemo() {
  const [days, setDays] = useState(60)

  const level = days >= 90 ? '高风险' : days >= 60 ? '中风险' : '低风险'
  const color = days >= 90 ? '#DC2626' : days >= 60 ? '#D97706' : '#059669'
  const pct = Math.round((days / 180) * 100)
  const script =
    days >= 60
      ? `王总，付款条款这块我们内部对账周期一般按验收后 30 天走，${days} 天的话现金流压力比较大，能不能改成验收合格后 30 天内支付？其他条款我们没问题。`
      : '王总，付款条款按验收后 30 天走，我们这边可以配合，其他条款也没问题。'

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      <div className="mb-1 flex flex-wrap items-baseline gap-2">
        <span className="text-[11.5px] font-semibold text-gray-400">合同约定账期</span>
        <span className="text-[26px] font-bold leading-none" style={{ color }}>
          {days} 天
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {level}
        </span>
        <span className="ml-auto text-[11.5px] text-gray-400">拖动滑块调整</span>
      </div>

      <input
        type="range"
        min={0}
        max={180}
        step={15}
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="mt-4 w-full cursor-pointer accent-[#F26522]"
        style={{ accentColor: color }}
      />

      <div className="mt-3 flex flex-wrap gap-1.5">
        {[0, 30, 60, 90, 120, 180].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDays(d)}
            className={`rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              days === d
                ? 'border-transparent bg-gray-900 text-white shadow-md'
                : 'border-white/70 bg-white/60 text-gray-600 hover:bg-white/95'
            }`}
          >
            {d} 天
          </button>
        ))}
      </div>

      <div className="mt-1 flex justify-between text-[10.5px] text-gray-400">
        {[0, 30, 60, 90, 120, 150, 180].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* 现金流压力条 */}
      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between text-[11.5px]">
          <span className="flex items-center gap-1 font-medium text-gray-600">
            <Banknote size={12} />
            现金流占用压力
          </span>
          <span className="font-semibold" style={{ color }}>{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(pct, 3)}%`, backgroundColor: color }}
          />
        </div>
      </div>

      {/* 生成话术 */}
      <div className="mt-5 rounded-2xl rounded-tl-sm border border-emerald-500/20 bg-gradient-to-br from-emerald-50/85 to-white/60 p-4 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
          <Scale size={11} />
          签安生成 · 可直接发给对方
        </div>
        <p className="text-[12.5px] leading-[1.8] text-gray-800">{script}</p>
      </div>

      <p className="mt-4 text-[11.5px] text-gray-400">
        说明：账期风险阈值随行业与合同类型调整，演示为通用采购场景默认值。
      </p>
    </div>
  )
}

const FEATURES = [
  {
    icon: CalendarClock,
    t: '付款与账期核查',
    d: '精准捕捉隐藏在附件中的「验收后 60 天 / 90 天付款」等霸王账期，评估现金流风险。',
  },
  {
    icon: Truck,
    t: '验收标准审查',
    d: '识别「验收标准由甲方单方决定」等绝对不对等条款，并提供修改话术。',
  },
  {
    icon: Scale,
    t: '违约责任对等',
    d: '检查双方违约金比例是否悬殊（如甲方违约赔 1%，乙方违约赔 20%）。',
  },
  {
    icon: MapPin,
    t: '争议管辖地',
    d: '提示「约定在对方所在地法院管辖」带来的异地诉讼成本。',
  },
]

export default function PurchaseSales() {
  return (
    <PageShell title="采购销售" icon={Truck} iconColor="#D97706">
      <FeatureHero
        badge="适用场景 02"
        title="货发出去了，"
        highlight="钱得收得回来"
        subtitle="对方拿劣质产品交货，却没有明确的验收标准；违约责任形同虚设，打官司连诉讼费都不够。采购销售合同是中小微企业的现金流生死线。"
        value="供应商发来一张拍照的报价单当合同，付款条款藏在模糊的扫描件里。签安通过多模态直接提取：约定交货后 180 天付款，直接标红高风险，并生成修改话术。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="核心痛点" desc="现金流生死线 · 一条条款决定几十万回款" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { t: '账期藏在附件里', d: '正文写 30 天，附件写 180 天，看漏一次就是半年现金流' },
              { t: '验收标准单方决定', d: '对方拖着不验收，尾款可以永远挂着' },
              { t: '违约责任不对等', d: '你违约赔 20%，对方违约赔 1%，条款形同虚设' },
            ].map((p) => (
              <GlassCard key={p.t} className="h-full">
                <div className="text-[13px] font-semibold text-amber-700">{p.t}</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-600">{p.d}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="账期风险演示" desc="拖动滑块，看不同账期下的风险等级与建议话术" />
            <div className="mx-auto max-w-3xl">
              <PaymentDemo />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionTitle num="3" title="签安能做什么" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 70}>
                <GlassCard className="h-full">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white">
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
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-600/20 bg-amber-500/6 p-5">
            <BadgeCheck size={18} className="mt-0.5 shrink-0 text-amber-700" />
            <p className="text-[13px] leading-[1.8] text-gray-700">
              <span className="font-semibold text-gray-900">商业价值：</span>
              直接保护企业命脉。通过修改一条付款条款，挽救的可能就是几十万的现金流。
            </p>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <div className="mx-auto mb-10 max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="group flex flex-wrap items-center gap-4 rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
              <AlertTriangle size={17} />
            </span>
            <p className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-gray-600">
              场景延伸：劳务分包、设备采购、代理服务、SaaS 订阅等以「交付 + 付款」为核心的合同，均适用同一套审查逻辑。
            </p>
            <ArrowRight size={16} className="shrink-0 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F26522]" />
          </div>
        </div>
      </Reveal>

      <ScenarioMatrix current="purchase" />
      <FeatureCTA note="改一条付款条款，救回几十万现金流。" />
    </PageShell>
  )
}
