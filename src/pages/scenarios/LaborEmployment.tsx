import { useState } from 'react'
import { AlertTriangle, BadgeCheck, BookOpen, ChevronDown, Clock, Gavel, ShieldCheck, Users } from 'lucide-react'
import {
  FeatureCTA,
  FeatureHero,
  GlassCard,
  PageShell,
  Reveal,
  ScenarioMatrix,
  SectionTitle,
} from '../../components/FeatureShell'

type Status = '违规' | '高风险' | '合规'

const STATUS_STYLE: Record<Status, { bg: string; text: string; ring: string }> = {
  违规: { bg: 'bg-red-600', text: 'text-white', ring: 'border-red-500/40' },
  高风险: { bg: 'bg-amber-500', text: 'text-white', ring: 'border-amber-500/40' },
  合规: { bg: 'bg-emerald-600', text: 'text-white', ring: 'border-emerald-500/40' },
}

const CHECKS = [
  {
    no: '3.1',
    title: '试用期约定为 6 个月，劳动合同期限 1 年',
    status: '违规' as Status,
    why: '《劳动合同法》第 19 条：合同期限一年以上不满三年的，试用期不得超过二个月。此处属于绝对违法条款，员工可主张已履行的超期部分按转正工资赔偿。',
    action: '将试用期改为 2 个月，或把合同期限调整为 3 年。',
  },
  {
    no: '4.5',
    title: '试用期不缴纳社会保险，转正后补缴',
    status: '违规' as Status,
    why: '社保为强制性法定义务，任何「转正后补缴」的约定均无效。员工可据此被迫解除并主张经济补偿。',
    action: '删除该条，入职当月即办理参保。',
  },
  {
    no: '7.2',
    title: '员工离职后 3 年内不得从事同行业工作，未约定补偿',
    status: '违规' as Status,
    why: '竞业限制期限不得超过 2 年，且必须按月支付经济补偿。无补偿的竞业限制条款对员工不产生约束力，还可能被反诉限制就业权。',
    action: '期限改为不超过 2 年，并明确按月补偿标准。',
  },
  {
    no: '9.1',
    title: '公司可因「业绩不达标」随时解除劳动合同',
    status: '高风险' as Status,
    why: '「业绩不达标」不属于法定解除情形。直接据此辞退可能构成违法解除，需支付 2N 赔偿金。',
    action: '补充「不能胜任工作 → 培训或调岗 → 仍不胜任」的完整流程。',
  },
  {
    no: '12.3',
    title: '员工手册经全体职工讨论后公示',
    status: '合规' as Status,
    why: '已履行民主程序并公示告知，符合《劳动合同法》第 4 条对规章制度生效要件的要求。',
    action: '保留讨论记录与公示签收凭证即可。',
  },
]

function LaborDemo() {
  const [open, setOpen] = useState(0)
  const violations = CHECKS.filter((c) => c.status === '违规').length
  const warns = CHECKS.filter((c) => c.status === '高风险').length

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      {/* Score bar */}
      <div className="mb-5 grid grid-cols-3 gap-2.5">
        {[
          { l: '绝对违规', v: violations, c: '#DC2626' },
          { l: '高风险', v: warns, c: '#D97706' },
          { l: '合规', v: CHECKS.length - violations - warns, c: '#059669' },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-xl border border-white/70 bg-white/70 py-2.5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-[20px] font-bold leading-none" style={{ color: s.c }}>{s.v}</div>
            <div className="mt-1 text-[11px] text-gray-500">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {CHECKS.map((c, i) => {
          const st = STATUS_STYLE[c.status]
          const isOpen = open === i
          return (
            <div
              key={c.no}
              className={`overflow-hidden rounded-xl border bg-white/70 backdrop-blur-sm transition-all duration-300 ${
                isOpen ? st.ring : 'border-white/70'
              } hover:border-gray-300/60`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
              >
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${st.bg} ${st.text}`}>
                  {c.status}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-gray-900">
                    <span className="mr-1.5 text-[11px] text-gray-400">第 {c.no} 条</span>
                    {c.title}
                  </span>
                </span>
                <ChevronDown
                  size={14}
                  className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-gray-100 px-4 py-3">
                    <p className="text-[12.5px] leading-[1.8] text-gray-600">{c.why}</p>
                    <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-[#F26522]/6 px-3 py-2">
                      <Gavel size={12} className="mt-0.5 shrink-0 text-[#F26522]" />
                      <p className="text-[12px] font-medium leading-relaxed text-gray-800">建议：{c.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const FEATURES = [
  {
    icon: Clock,
    t: '试用期与薪酬合规',
    d: '自动比对《劳动合同法》，识别「超长试用期」「试用期不交社保」等绝对违法条款。',
  },
  {
    icon: AlertTriangle,
    t: '解除与辞退条件',
    d: '审查辞退条款，指出哪些表述会导致企业面临违法解除赔偿（2N）。',
  },
  {
    icon: ShieldCheck,
    t: '竞业限制与保密',
    d: '识别「全员竞业」或「无补偿金的竞业限制」——此类条款在法律上无效。',
  },
  {
    icon: BookOpen,
    t: '规章制度体检',
    d: '审查员工手册、考勤制度，确保其经过民主程序且具备法律效力。',
  },
]

export default function LaborEmployment() {
  return (
    <PageShell title="劳动用工" icon={Users}>
      <FeatureHero
        badge="适用场景 01"
        title="劳动合同与规章制度，"
        highlight="先体检再签"
        subtitle="小微企业人员流动大，HR 往往缺乏专业法律知识。试用期条款乱写、辞退理由不当、竞业限制不给补偿金，极易引发劳动仲裁——一旦败诉，面临双倍工资赔偿或高额补偿。"
        value="招了个销售，合同里写「离职后 3 年内不得从事同行业」，但没写给多少补偿金。签安提示：该条款无效，且可能被员工反诉限制就业权。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="核心痛点" desc="高频维权重灾区 · 一次败诉抵一年订阅费" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { t: '双倍工资', d: '未签书面合同、试用期违规，员工可主张二倍工资差额' },
              { t: '违法解除 2N', d: '辞退理由表述不当，直接构成违法解除赔偿' },
              { t: '竞业条款反噬', d: '无补偿的竞业限制无效，还可能被反诉限制就业权' },
            ].map((p) => (
              <GlassCard key={p.t} className="h-full">
                <div className="text-[13px] font-semibold text-red-600">{p.t}</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-600">{p.d}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="合同体检演示" desc="点击任一条款，展开违法依据与修改建议" />
            <div className="mx-auto max-w-3xl">
              <LaborDemo />
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
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#F26522]/25 bg-[#F26522]/6 p-5">
            <BadgeCheck size={18} className="mt-0.5 shrink-0 text-[#F26522]" />
            <p className="text-[13px] leading-[1.8] text-gray-700">
              <span className="font-semibold text-gray-900">商业价值：</span>
              刚需、高频。帮老板省下一次劳动仲裁的律师费，就够付一年的软件订阅费。
            </p>
          </div>
        </Reveal>
      </section>

      <ScenarioMatrix current="labor" />
      <FeatureCTA note="省下一次仲裁，抵一年订阅。" />
    </PageShell>
  )
}
