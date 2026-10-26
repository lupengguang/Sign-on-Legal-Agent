import { useState } from 'react'
import { ArrowRight, BadgeCheck, Database, KeyRound, Lock, Network, Server, ShieldCheck, Trash2 } from 'lucide-react'
import {
  FeatureCTA,
  FeatureHero,
  GlassCard,
  PageShell,
  Reveal,
  SectionTitle,
} from '../../components/FeatureShell'

function DataFlowDemo() {
  const [privateMode, setPrivateMode] = useState(false)

  const publicSteps = [
    { icon: Lock, t: '文件上传', d: '用户浏览器 → 签安 OSS' },
    { icon: ShieldCheck, t: '前端脱敏', d: '身份证/银行账号自动遮蔽' },
    { icon: Network, t: 'API 调用', d: '企业级商用接口 · Zero Data Retention' },
    { icon: Trash2, t: '焚毁', d: '用完即焚 · 不用于训练' },
  ]

  const privateSteps = [
    { icon: Lock, t: '文件上传', d: '用户内网 → 本地 OSS' },
    { icon: ShieldCheck, t: '前端脱敏', d: '身份证/银行账号自动遮蔽' },
    { icon: Server, t: '内网模型', d: '模型跑在客户服务器 · 数据不出内网' },
    { icon: Database, t: '内网留存', d: '客户自行保管 · 签安不接触' },
  ]

  const steps = privateMode ? privateSteps : publicSteps

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      {/* 模式切换 */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 backdrop-blur-sm">
        <div>
          <div className="text-[13px] font-semibold text-gray-900">数据流向演示</div>
          <p className="mt-0.5 text-[11px] text-gray-500">切换下方开关查看两种数据路径</p>
        </div>
        <button
          type="button"
          onClick={() => setPrivateMode((v) => !v)}
          className={`flex items-center gap-3 rounded-full border px-4 py-2 text-[12px] font-medium transition-all duration-300 hover:-translate-y-0.5 ${
            privateMode
              ? 'border-emerald-600/40 bg-emerald-600 text-white shadow-md'
              : 'border-emerald-600/30 bg-white text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          <span
            className={`flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              privateMode ? 'bg-white/30' : 'bg-gray-200'
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                privateMode ? 'translate-x-[22px]' : 'translate-x-[2px]'
              }`}
            />
          </span>
          {privateMode ? '私有化部署模式' : '企业 API 模式'}
        </button>
      </div>

      {/* 流程链 */}
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={s.t} className="relative flex items-stretch gap-3">
            {i > 0 && (
              <div className="absolute -top-3 left-[22px] h-3 w-px bg-gray-300" />
            )}
            <span
              className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md transition-all duration-500 ${
                privateMode ? 'bg-emerald-700' : 'bg-emerald-600'
              }`}
            >
              <s.icon size={17} />
            </span>
            <div
              className={`flex flex-1 items-center justify-between rounded-xl border px-4 py-3 transition-all duration-500 ${
                privateMode
                  ? 'border-emerald-600/40 bg-emerald-50/70'
                  : 'border-emerald-600/25 bg-white/70'
              }`}
            >
              <div>
                <span className="block text-[13px] font-semibold text-gray-900">{s.t}</span>
                <span className="block mt-0.5 text-[11.5px] text-gray-600">{s.d}</span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight size={14} className="shrink-0 text-emerald-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 关键承诺 */}
      <div className={`mt-5 rounded-xl border p-3.5 text-[12px] leading-relaxed transition-colors duration-500 ${
        privateMode
          ? 'border-emerald-700/30 bg-emerald-50/80'
          : 'border-emerald-600/25 bg-white/80'
      }`}>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
          <BadgeCheck size={12} />
          核心承诺
        </div>
        <p className="mt-1 text-gray-700">
          {privateMode
            ? '数据全程不出企业内网。模型跑在客户自己的服务器上，签安仅提供管理界面。'
            : '企业 API 协议层保证 Zero Data Retention。您的合同，签安只看一眼给建议，看完全部忘掉。'}
        </p>
      </div>
    </div>
  )
}

const FEATURES = [
  { icon: Network, t: '企业级 API 协议', d: '采用 DeepSeek 商用 API，协议层面规定数据不用于模型训练（Zero Data Retention），用完即焚' },
  { icon: ShieldCheck, t: '前端/边缘脱敏', d: '上传前自动识别遮蔽身份证号、银行账号等敏感字段；外部调用只传脱敏文本或图像' },
  { icon: Database, t: '物理隔离 + AES-256', d: '客户原始合同与解析结果存企业专属 OSS，静态 AES-256 加密，严格限定租户权限' },
  { icon: Server, t: '私有化部署', d: '针对极度敏感客户，提供本地化私有部署选项，模型跑在客户服务器，数据不出内网' },
]

export default function DataProtection() {
  return (
    <PageShell title="数据不训练" icon={Database} iconColor="#059669">
      <FeatureHero
        badge="安全与合规 02"
        title="你的合同，"
        highlight="签安只看一眼，看完忘掉"
        subtitle='商业合同包含底价、核心客户名单、股权结构等最高级别机密。小老板最怕的是："我把合同传给你，你是不是拿去喂大模型了？转头我的竞争对手就知道了。"'
        value="签安通过企业级商用 API 调用底层大模型，协议层面保证 Zero Data Retention，用完即焚。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="四层数据防线" desc="从 API 协议到私有化部署，层层把数据留在你手里" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.slice(0, 2).map((f) => (
              <GlassCard key={f.t} className="h-full">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-700 group-hover:text-white">
                    <f.icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-[14.5px] font-semibold text-gray-900">{f.t}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-500">{f.d}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.slice(2).map((f) => (
              <GlassCard key={f.t} className="h-full accent">
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
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="数据流向演示" desc="切换到私有化部署模式，看数据如何完全留在企业内网" />
            <div className="mx-auto max-w-3xl">
              <DataFlowDemo />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionTitle num="3" title="为什么小老板不必担心" desc="四个你能立刻理解的数据安全承诺" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: KeyRound, t: 'Zero Retention', d: 'API 协议层保证数据用完即焚，签安不存调用内容' },
              { icon: ShieldCheck, t: '自动脱敏', d: '身份证/银行卡号上传前即遮蔽，外部模型看不到原始数据' },
              { icon: Database, t: '专属 OSS', d: '每个客户独立存储空间，AES-256 静态加密，互不可见' },
              { icon: Server, t: '私有化部署', d: '极致敏感的客户，模型和数据完全留在自己的内网里' },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 70}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700">
                      <f.icon size={14} />
                    </span>
                    <span className="text-[13px] font-semibold text-gray-900">{f.t}</span>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-gray-600">{f.d}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <FeatureCTA note="看一眼，就忘掉。" />
    </PageShell>
  )
}
