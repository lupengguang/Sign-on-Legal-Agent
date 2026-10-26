import { useState } from 'react'
import { BadgeCheck, Building2, Check, CircleDollarSign, KeyRound, RotateCcw, Wrench, X } from 'lucide-react'
import {
  FeatureCTA,
  FeatureHero,
  GlassCard,
  PageShell,
  Reveal,
  ScenarioMatrix,
  SectionTitle,
} from '../../components/FeatureShell'

const ITEMS = [
  {
    icon: CircleDollarSign,
    t: '押金退还条件',
    bad: '退租时扣除全部押金作为折旧费',
    good: '押金于退租验收后 7 日内退还，仅扣除实际损坏维修费用',
  },
  {
    icon: Building2,
    t: '买卖不破租赁',
    bad: '未约定房屋出售后租赁合同继续有效',
    good: '明确「租赁期内房屋所有权变动不影响本合同效力」',
  },
  {
    icon: Wrench,
    t: '维修责任划分',
    bad: '所有维修费用一律由承租方承担',
    good: '自然老化与主体结构由出租方维修，人为损坏由承租方承担',
  },
  {
    icon: KeyRound,
    t: '转租与免租期',
    bad: '装修期照收租金，转租一律禁止且无例外',
    good: '装修免租期 45 天，转租需书面同意但不得无理由拒绝',
  },
]

function LeaseDemo() {
  const [fixed, setFixed] = useState<boolean[]>([false, false, false, false])
  const count = fixed.filter(Boolean).length
  const score = Math.round((count / ITEMS.length) * 100)
  const color = score >= 75 ? '#059669' : score >= 50 ? '#D97706' : '#DC2626'

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="text-[11.5px] font-semibold text-gray-400">租赁合同风险覆盖度</span>
        <div className="flex min-w-[140px] flex-1 items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(score, 2)}%`, backgroundColor: color }}
            />
          </div>
          <span className="text-[14px] font-bold" style={{ color }}>{score}%</span>
        </div>
        <span className="text-[11px] text-gray-400">点击卡片补齐条款</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ITEMS.map((it, i) => {
          const on = fixed[i]
          return (
            <button
              key={it.t}
              type="button"
              onClick={() => setFixed((prev) => prev.map((v, j) => (j === i ? !v : v)))}
              className={`group/item rounded-xl border p-4 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                on
                  ? 'border-emerald-500/40 bg-emerald-50/60 shadow-md'
                  : 'border-red-500/30 bg-red-50/30 hover:border-red-500/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${
                    on ? 'bg-emerald-600 text-white' : 'bg-red-500/10 text-red-600 group-hover/item:scale-110'
                  }`}
                >
                  <it.icon size={15} />
                </span>
                <span className="text-[13.5px] font-semibold text-gray-900">{it.t}</span>
                <span className="ml-auto">
                  {on ? (
                    <Check size={15} className="text-emerald-600" />
                  ) : (
                    <X size={15} className="text-red-500" />
                  )}
                </span>
              </div>
              <p className={`mt-2.5 text-[12px] leading-[1.7] ${on ? 'text-gray-700' : 'text-gray-500'}`}>
                {on ? it.good : it.bad}
              </p>
              <div className="mt-2 flex items-center gap-1 text-[10.5px] font-medium text-gray-400">
                <RotateCcw size={9} className="transition-transform duration-500 group-hover/item:-rotate-180" />
                {on ? '已补齐 · 点击还原' : '点击查看补齐后的表述'}
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-4 rounded-lg bg-gray-900/4 px-3 py-2 text-center text-[11.5px] text-gray-500">
        {score === 100
          ? '四项关键条款均已明确，合同基础风险已覆盖。'
          : `仍有 ${ITEMS.length - count} 项条款未明确，退租时可能被对方主张。`}
      </div>
    </div>
  )
}

const FEATURES = [
  {
    icon: CircleDollarSign,
    t: '押金退还条件',
    d: '审查是否存在「退租时扣除全部押金作为折旧费」等不合理约定。',
  },
  {
    icon: Building2,
    t: '解除权与违约金',
    d: '防范房东单方面提前解约，确保「买卖不破租赁」的权益被写进合同。',
  },
  {
    icon: Wrench,
    t: '维修责任划分',
    d: '明确房屋漏水、设备自然老化时的维修义务与费用承担方。',
  },
  {
    icon: KeyRound,
    t: '转租与免租期',
    d: '审查转租限制，以及装修期间的免租期是否清晰。',
  },
]

export default function LeaseService() {
  return (
    <PageShell title="租赁服务" icon={Building2} iconColor="#0284C7">
      <FeatureHero
        badge="适用场景 03"
        title="押金、解约、维修，"
        highlight="每一条都算成本"
        subtitle="开实体店、租厂房、租设备，常常遇到房东突然卖房赶人、押金找借口不退、设备损坏赔偿金额天价等问题。租赁合同的坑，往往在退租那天才浮现。"
        value="租厂房开加工厂，合同没约定房东违约的赔偿。刚干了半年房东要卖地，签安提示：缺少违约责任约束，你的搬迁和设备损耗成本将无人买单。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="核心痛点" desc="重资产运营的暗礁 · 一次被迫搬迁可能直接倒闭" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { t: '押金找借口不退', d: '「折旧费」「清洁费」条款模糊，退租时全部扣掉' },
              { t: '房东中途卖房', d: '未写「买卖不破租赁」，新业主直接要求搬离' },
              { t: '维修责任全推给你', d: '房屋漏水、设备老化也算承租方责任' },
            ].map((p) => (
              <GlassCard key={p.t} className="h-full">
                <div className="text-[13px] font-semibold text-sky-700">{p.t}</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-600">{p.d}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="条款覆盖度演示" desc="点击卡片切换条款状态，观察覆盖度变化" />
            <div className="mx-auto max-w-3xl">
              <LeaseDemo />
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-700 group-hover:text-white">
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
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sky-700/20 bg-sky-500/6 p-5">
            <BadgeCheck size={18} className="mt-0.5 shrink-0 text-sky-700" />
            <p className="text-[13px] leading-[1.8] text-gray-700">
              <span className="font-semibold text-gray-900">商业价值：</span>
              防范突发性经营中断。小微企业抗风险能力弱，一次被迫搬迁可能导致直接倒闭。
            </p>
          </div>
        </Reveal>
      </section>

      <ScenarioMatrix current="lease" />
      <FeatureCTA note="退租那天，你会感谢当初多看了这一眼。" />
    </PageShell>
  )
}
