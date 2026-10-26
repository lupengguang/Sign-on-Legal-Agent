import { useState } from 'react'
import { AlertTriangle, BadgeCheck, Gavel, Handshake, Landmark, PieChart, Split, Users } from 'lucide-react'
import {
  FeatureCTA,
  FeatureHero,
  GlassCard,
  PageShell,
  Reveal,
  ScenarioMatrix,
  SectionTitle,
} from '../../components/FeatureShell'

const STRUCTURES = [
  { label: '50 : 50', note: '两名股东完全平分', deadlock: true },
  { label: '51 : 49', note: '一方相对控股', deadlock: false, edge: true },
  { label: '67 : 33', note: '一方拥有绝对多数', deadlock: false, edge: false },
]

function EquityDemo() {
  const [idx, setIdx] = useState(0)
  const [vesting, setVesting] = useState(false)
  const [dualClass, setDualClass] = useState(false)
  const s = STRUCTURES[idx]

  const risks = [
    s.deadlock && '股权 50:50，重大事项无法形成决议，公司易陷入僵局',
    s.edge && '51:49 结构下，修改章程等特别决议仍需 2/3 以上通过，控股并不稳固',
    !vesting && '缺少分期成熟（Vesting）条款，不参与经营的股东可能永久分走利润',
    !dualClass && '未约定「同股不同权」，出资比例直接等于表决权比例',
  ].filter(Boolean) as string[]

  const needLawyer = s.deadlock || risks.length >= 3

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      {/* 股权结构选择 */}
      <div className="mb-5">
        <div className="mb-2 text-[11.5px] font-semibold text-gray-400">选择股权结构</div>
        <div className="flex flex-wrap gap-2">
          {STRUCTURES.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setIdx(i)}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
                idx === i
                  ? 'border-transparent bg-gray-900 text-white shadow-lg'
                  : 'border-white/70 bg-white/60 text-gray-600 hover:bg-white/95'
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-[11px] ${idx === i ? 'text-gray-300' : 'text-gray-400'}`}>{t.note}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 两个关键条款开关 */}
      <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {[
          { on: vesting, set: setVesting, t: '分期成熟（Vesting）', d: '股权按服务年限分批归属' },
          { on: dualClass, set: setDualClass, t: '同股不同权', d: '表决权与出资比例分离' },
        ].map((k) => (
          <button
            key={k.t}
            type="button"
            onClick={() => k.set(!k.on)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${
              k.on ? 'border-emerald-500/40 bg-emerald-50/60' : 'border-white/70 bg-white/60 hover:bg-white/90'
            }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold text-white transition-all duration-300 ${
                k.on ? 'bg-emerald-600' : 'bg-gray-400'
              }`}
            >
              {k.on ? '✓' : '×'}
            </span>
            <span>
              <span className="block text-[12.5px] font-semibold text-gray-900">{k.t}</span>
              <span className="block text-[11px] text-gray-500">{k.d}</span>
            </span>
          </button>
        ))}
      </div>

      {/* 风险输出 */}
      <div className="rounded-xl border border-white/70 bg-white/70 p-4 backdrop-blur-sm">
        <div className="mb-2 flex items-center gap-1.5 text-[11.5px] font-semibold text-gray-500">
          <PieChart size={12} />
          签安识别到的结构风险
        </div>
        {risks.length === 0 ? (
          <p className="text-[12.5px] font-medium text-emerald-700">当前结构未识别到高风险项，建议保留书面股东协议。</p>
        ) : (
          <ul className="space-y-1.5">
            {risks.map((r) => (
              <li key={r} className="flex items-start gap-2 text-[12.5px] leading-[1.7] text-gray-700">
                <AlertTriangle size={12} className="mt-1 shrink-0 text-[#F26522]" />
                {r}
              </li>
            ))}
          </ul>
        )}

        {needLawyer && (
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-gray-900/10 bg-gray-900/5 px-3 py-2">
            <Gavel size={13} className="text-gray-900" />
            <span className="text-[11.5px] font-medium text-gray-700">该合同涉及重大利益，签安已自动触发律师复核</span>
            <span className="ml-auto rounded-full bg-gray-900 px-2.5 py-0.5 text-[10.5px] font-semibold text-white">
              双引擎兜底
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

const FEATURES = [
  {
    icon: Split,
    t: '决策权与分红权',
    d: '审查表决权机制（如一票否决权），避免「五五开」造成的公司僵局。',
  },
  {
    icon: Handshake,
    t: '退出机制（防兄弟反目）',
    d: '审查股东中途退出时，股权回购价格是否合理，防止合伙人拿了钱不干活。',
  },
  {
    icon: Landmark,
    t: '对赌与回购条款',
    d: '针对投资人进入的条款，标明无限连带责任的致命风险。',
  },
  {
    icon: Users,
    t: '股权代持风险',
    d: '提示代持协议中的合规与税务风险。',
  },
]

export default function EquityCooperation() {
  return (
    <PageShell title="股权合作" icon={Handshake} iconColor="#7C3AED">
      <FeatureHero
        badge="适用场景 04"
        title="谈钱不伤感情，"
        highlight="先写清规则"
        subtitle="和朋友合伙开店、开公司，往往「谈钱伤感情」，股权平分（50:50）导致决策僵局；不懂对赌协议，盲目融资导致创始人被踢出局。此类合同极难依靠纯 AI 解决。"
        value="三个合伙人出资，两人不参与经营只拿分红。签安提示：缺少「同股不同权」或「分期成熟」（Vesting）条款，不干活的股东可能永远分走利润。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="核心痛点" desc="高客单价、高风险区 · 出问题往往就是掀桌子" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { t: '50:50 决策僵局', d: '任何重大事项都需双方一致，公司可能彻底停摆' },
              { t: '对赌无限连带', d: '个人为公司回购义务兜底，一次失败可能倾家荡产' },
              { t: '干活的养不干活的', d: '无 Vesting 条款，出资即永久分利' },
            ].map((p) => (
              <GlassCard key={p.t} className="h-full">
                <div className="text-[13px] font-semibold text-violet-700">{p.t}</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-600">{p.d}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="股权结构演示" desc="切换股权比例与条款开关，观察风险与复核触发" />
            <div className="mx-auto max-w-3xl">
              <EquityDemo />
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-700 group-hover:text-white">
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
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-violet-700/20 bg-violet-500/6 p-5">
            <BadgeCheck size={18} className="mt-0.5 shrink-0 text-violet-700" />
            <p className="text-[13px] leading-[1.8] text-gray-700">
              <span className="font-semibold text-gray-900">商业价值：</span>
              虽然发生频率低于采购和用工，但一旦出问题就是「掀桌子」的大雷。此类合同<b>极难依靠纯 AI 解决</b>，签安会自动触发「律师复核」兜底，展现双引擎价值。
            </p>
          </div>
        </Reveal>
      </section>

      <ScenarioMatrix current="equity" />
      <FeatureCTA note="规则写清楚，合伙才走得远。" />
    </PageShell>
  )
}
