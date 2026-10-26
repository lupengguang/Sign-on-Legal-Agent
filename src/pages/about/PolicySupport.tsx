import { useState } from 'react'
import { Building2, Coins, Gavel, GraduationCap, Network, Scale, ShieldCheck, Sparkles } from 'lucide-react'
import {
  FeatureCTA,
  FeatureHero,
  GlassCard,
  PageShell,
  Reveal,
  SectionTitle,
} from '../../components/FeatureShell'

/* ---------- 政策卡片数据 ---------- */
const POLICIES = [
  {
    icon: Coins,
    title: '算力与模型补贴',
    tagline: '北京 OPC 专项政策 · 即用即补',
    accent: '#B45309',
    sections: [
      {
        area: '北京经开区（亦庄）',
        points: [
          '每年投放超 3 亿元算力券、数据券、模型券资金',
          '实行"即用即补"，上线全国首个"模型券"即时补贴平台',
        ],
      },
      { area: '海淀区', points: [
        'OPC 连续两年每年 5 万元创业启动资金',
        '每年最高 200 万元模型券补贴',
      ] },
      { area: '朝阳区', points: [
        '按算力/词元实际使用金额的 50% 给予支持',
        '每年最高 50 万元',
      ] },
      { area: '东城区', points: ['按实际使用费用 50% 给予最高 100 万元补贴'] },
      { area: '通州区', points: ['最高 50 万元算力券 + 30 万元模型券'] },
      { area: '丰台区', points: ['算力补贴比例 20%—30%，最高 300 万元'] },
    ],
    value: 'MVP 阶段 DeepSeek 多模态模型调用账单，有极大概率被政策全额或高比例覆盖。早期模型调用成本趋近于零。',
  },
  {
    icon: Network,
    title: '智能体产业扶持',
    tagline: '京发改〔2026〕1185 号 · 专项文件',
    accent: '#4338CA',
    sections: [
      { area: '驾驭层工程（Harness Engineering）', points: [
        '围绕上下文工程优化、任务持久化、多智能体协作夯实共性底座',
        '签安架构中的 LangGraph 编排 + 规则引擎 + RAG + 置信度路由',
        '本质上就是法律场景的驾驭层工程',
      ] },
      { area: 'Token 经济鼓励', points: [
        '支持 OPC 创新创业新模式',
        '签安按份/按订阅收费，正是 Token 经济在法律服务中的落地',
      ] },
      { area: '资金支持', points: [
        '算力部署、软件智能技改、"模型首方案"最高 3000 万元',
        '重点揭榜挂帅项目择优最高 1 亿元',
      ] },
    ],
    value: '产品叙事可以直接嵌入北京市智能体产业政策框架，是区别于"普通套壳应用"的强政策背书。',
  },
  {
    icon: ShieldCheck,
    title: '法律 AI 合规准入',
    tagline: '清晰备案通道 · 成本可控',
    accent: '#0369A1',
    sections: [
      { area: '《生成式人工智能服务管理暂行办法》', points: [
        '确立"包容审慎、分类分级监管"原则',
        '要求服务提供者承担网络信息内容生产者责任',
        '提升生成内容的准确性和可靠性',
      ] },
      { area: '备案口径优化（2025 年 1 月起）', points: [
        '仅通过 API 调用已备案底层模型（如 DeepSeek）来提供服务',
        '只需属地省级网信办登记即可上线',
        '不再需要重复走完整大模型备案流程',
        '大幅降低应用层合规时间与成本',
      ] },
      { area: '《AI 生成合成内容标识办法》', points: [
        '要求对 AI 生成内容进行显式或隐式标识',
        '签安审查摘要和风险卡片中标注"AI 辅助生成"',
        '正是对该要求的直接落实',
      ] },
    ],
    value: '合规路径是通的、成本是可控的。底层模型已备案，应用层走省级网信办登记通道，内容标识已内置于产品。',
  },
  {
    icon: GraduationCap,
    title: '职教产教融合',
    tagline: '教育部等五部门《"人工智能+教育"行动计划》',
    accent: '#15803D',
    sections: [
      { area: '传统专业升级转型', points: [
        '科学设计"人工智能+"专业体系、课程体系、教学体系',
        '提高专业设置对产业发展的适配性',
      ] },
      { area: '共建实习实训基地', points: [
        '对接国家 AI 产业发展需求',
        '联合行业企业制定人才培养方案',
        '更新课程体系，有针对性培养新兴岗位高技能人才',
      ] },
      { area: '高技能人才集群培养', points: [
        '签安在京师律所的真实案例 = 法律 AI 标注实训载体',
        '产品规模化需：合规内容运营 / 小微企业合规顾问 / 法律 AI 标注',
        '恰好对应高职毕业生能力区间 → 项目带动就业闭环',
      ] },
    ],
    value: '签安在京师的真实案例和合作院校的试用，可包装为"法律/软件专业学生参与真实法律 AI 产品开发"的产教融合实训载体。',
  },
]

/* ---------- 政策卡片交互组件 ---------- */
function PolicyGrid() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {POLICIES.map((p, i) => {
        const open = openIdx === i
        return (
          <div
            key={p.title}
            className={`group relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              open
                ? 'border-white/60 bg-gradient-to-br from-white/90 to-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:col-span-2'
                : 'border-white/60 bg-gradient-to-br from-white/80 to-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:border-white/80 hover:shadow-[0_20px_56px_rgba(0,0,0,0.10)]'
            }`}
          >
            {/* 顶部条 */}
            <button
              type="button"
              onClick={() => setOpenIdx(open ? null : i)}
              className="flex w-full items-start gap-4 px-5 py-5 text-left"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md transition-all duration-300 group-hover:scale-110`}
                style={{ backgroundColor: p.accent }}
              >
                <p.icon size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-0.5 text-[11.5px] font-medium" style={{ color: p.accent }}>
                  {p.tagline}
                </p>
                {!open && (
                  <p className="mt-1.5 text-[12px] leading-relaxed text-gray-500 line-clamp-2">
                    {p.sections.length} 个政策板块 · 点击展开详情
                  </p>
                )}
              </div>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-gray-500 transition-all duration-500 ${
                  open ? 'rotate-45 border-gray-900 bg-gray-900 text-white' : 'border-gray-300 group-hover:border-gray-600'
                }`}
              >
                <span className="text-[18px] leading-none">+</span>
              </span>
            </button>

            {/* 展开详情 */}
            {open && (
              <div className="border-t border-gray-200/60 bg-white/40 px-5 py-5">
                {p.sections.map((sec) => (
                  <div key={sec.area} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
                      <span className="text-[12.5px] font-semibold text-gray-900">{sec.area}</span>
                    </div>
                    <ul className="mt-1.5 space-y-1 pl-3.5">
                      {sec.points.map((pt) => (
                        <li key={pt} className="relative text-[12px] leading-[1.75] text-gray-600">
                          <span
                            className="absolute -left-3.5 top-[7px] h-1 w-1 rounded-full"
                            style={{ backgroundColor: p.accent, opacity: 0.7 }}
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* 对签安的价值 */}
                <div
                  className="mt-4 rounded-xl border p-3.5 transition-colors duration-500"
                  style={{ borderColor: `${p.accent}33`, backgroundColor: `${p.accent}0A` }}
                >
                  <div className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-semibold" style={{ color: p.accent }}>
                    <Sparkles size={11} />
                    对签安的价值
                  </div>
                  <p className="text-[12px] leading-[1.8] text-gray-700">{p.value}</p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ---------- 政策地图（快速总览） ---------- */
function PolicyMap() {
  const allAreas = [
    { area: '北京经开区（亦庄）', amount: '≥ 3 亿', note: '算力券/模型券即用即补', accent: '#B45309' },
    { area: '海淀区', amount: '200 万/年', note: 'OPC + 模型券', accent: '#B45309' },
    { area: '朝阳区', amount: '50 万/年', note: '算力 50% 补贴', accent: '#B45309' },
    { area: '东城区', amount: '100 万', note: '费用 50% 补贴', accent: '#B45309' },
    { area: '通州区', amount: '50 + 30 万', note: '算力券 + 模型券', accent: '#B45309' },
    { area: '丰台区', amount: '300 万', note: '20%—30% 算力补贴', accent: '#B45309' },
  ]

  return (
    <GlassCard>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B45309]/10 text-[#B45309]">
          <Building2 size={14} />
        </span>
        <span className="text-[13.5px] font-semibold text-gray-900">北京市各区 OPC 算力/模型补贴速查</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {allAreas.map((a) => (
          <div
            key={a.area}
            className="rounded-xl border border-[#B45309]/15 bg-[#B45309]/5 px-3 py-2 transition-all duration-300 hover:bg-white hover:shadow-md"
          >
            <div className="text-[10.5px] font-medium text-gray-400">{a.area}</div>
            <div className="mt-0.5 text-[13px] font-bold text-[#B45309]">{a.amount}</div>
            <div className="mt-0.5 text-[10px] text-gray-500 leading-snug">{a.note}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

export default function PolicySupport() {
  return (
    <PageShell title="政策支持" icon={Scale} iconColor="#B45309">
      <FeatureHero
        badge="关于我们 · 政策背书"
        title="有政策撑腰，"
        highlight="MVP 模型账单趋近于零"
        subtitle='法律大模型的算力和 Token 成本是早期最大支出。北京市及各区在 2026 年密集出台面向"一人公司（OPC）/超级个体"的真金白银补贴——签安可以直接申请用于覆盖 DeepSeek API 调用费用。'
        value="项目已具备申请北京 OPC 算力/模型券补贴的资格，早期模型调用成本趋近于零。"
      />

      {/* 总览条 */}
      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12">
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Coins, t: '6 区覆盖', d: '北京经开区/海淀/朝阳/东城/通州/丰台', c: '#B45309' },
              { icon: Network, t: '专项文件', d: '京发改〔2026〕1185 号智能体措施', c: '#4338CA' },
              { icon: ShieldCheck, t: '备案路径', d: '省级网信办登记 · 不需重复备案', c: '#0369A1' },
              { icon: GraduationCap, t: '产教融合', d: '教育部"AI+教育"行动计划接口', c: '#15803D' },
            ].map((s) => (
              <GlassCard key={s.t} className="h-full">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
                    style={{ backgroundColor: s.c }}
                  >
                    <s.icon size={14} />
                  </span>
                  <div>
                    <span className="block text-[12.5px] font-semibold text-gray-900 leading-tight">{s.t}</span>
                    <span className="block text-[10.5px] text-gray-500 leading-snug mt-0.5">{s.d}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 政策地图 */}
      <section className="mx-auto max-w-[1440px] px-5 pb-4 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="算力补贴速查" desc="6 个区 · 真金白银 · 即用即补" />
          <PolicyMap />
        </Reveal>
      </section>

      {/* 四大板块可展开 */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="四大政策板块" desc="点击每个板块查看详细条款和对签安的价值" />
            <PolicyGrid />
          </Reveal>
        </div>
      </section>

      {/* 路演话术 */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionTitle num="3" title="路演怎么说" desc="评委和投资人爱听的政策叙事" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Coins,
                t: '早期成本趋近于零',
                d: '我们有资格申请北京 OPC 算力/模型券补贴，MVP 阶段的模型调用账单，极大概率被政策全额或高比例覆盖。',
              },
              {
                icon: Sparkles,
                t: '不是普通套壳应用',
                d: '产品叙事直接嵌入北京市《智能体引领发展若干措施》框架，LangGraph 编排 + 规则引擎 + 置信度路由就是驾驭层工程。',
              },
              {
                icon: Gavel,
                t: '合规路径是通的',
                d: '底层模型已备案，应用层走省级网信办登记通道——2025 年 1 月起备案口径大幅简化，合规成本可控。',
              },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 80}>
                <GlassCard className="h-full">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B45309]/10 text-[#B45309] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#B45309] group-hover:text-white">
                      <p.icon size={16} />
                    </span>
                    <div>
                      <h3 className="text-[14px] font-semibold text-gray-900">{p.t}</h3>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-gray-600">{p.d}</p>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <FeatureCTA note="有政策撑腰，大胆干。" />
    </PageShell>
  )
}
