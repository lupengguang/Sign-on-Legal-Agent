import { useState } from 'react'
import { BadgeCheck, Building2, FileCheck, Fingerprint, Gavel, ShieldCheck, X } from 'lucide-react'
import {
  FeatureCTA,
  FeatureHero,
  GlassCard,
  PageShell,
  Reveal,
  SectionTitle,
} from '../../components/FeatureShell'

const STACK = [
  {
    icon: Building2,
    t: '底层大模型层',
    badged: true,
    badge: '已备案',
    desc: '接入 DeepSeek 等国产大模型，均具备国家网信办算法备案号',
    detail: {
      title: '模型备案信息',
      issuer: '国家互联网信息办公室',
      method: '算法安全评估 + 算法备案双通过',
      id: '网信办算法备案号：XXXX-XXXX-XXXX',
      scope: '覆盖文本生成、多模态理解、推理三大能力域',
    },
  },
  {
    icon: ShieldCheck,
    t: '签安 Agent 应用层',
    badged: true,
    badge: '已备案 / 私有部署豁免',
    desc: '面向公众提供服务已完成备案；面向 B 端私有化部署享有合规豁免',
    detail: {
      title: '应用层备案信息',
      issuer: '北京市网信办（注册地备案）',
      method: '生成式 AI 服务安全评估 + 备案登记',
      id: '服务备案号：BJ-XXXX-2024-XXXX',
      scope: '合同审查类生成式 AI 服务（含 B 端私有化部署豁免路径）',
    },
  },
  {
    icon: Fingerprint,
    t: '内容水印与溯源',
    badged: true,
    badge: '已实现',
    desc: 'AI 生成的法律建议加显式/隐式水印，符合《人工智能生成合成内容标识办法》',
    detail: {
      title: '水印与溯源',
      issuer: '国家网信办《标识办法》合规',
      method: 'PDF 显性水印 + 隐式元数据签名',
      id: '溯源码示例：SA-F4E8-2024-XXXX',
      scope: '每一份 AI 审查报告均可通过溯源码验证生成主体',
    },
  },
  {
    icon: FileCheck,
    t: '内容安全过滤',
    badged: false,
    badge: '进行中',
    desc: '在模型输出层建立拦截机制，防止越界内容',
    detail: null,
  },
]

function DualFilingDemo() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-700 text-white shadow-md">
          <Gavel size={16} />
        </span>
        <div>
          <div className="text-[13px] font-semibold text-gray-900">双层合规 · 点击每一层查看备案详情</div>
          <p className="mt-0.5 text-[11.5px] text-gray-500">底层模型 + 签安应用层，双备案持证上岗</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {STACK.map((s, i) => {
          const open = openIdx === i
          return (
            <div key={s.t} className={`overflow-hidden rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${open ? 'border-sky-700/30 shadow-md' : 'border-white/60'}`}>
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : i)}
                className="flex w-full items-center gap-3 bg-white/70 px-4 py-3 text-left backdrop-blur-sm transition-colors hover:bg-white/90"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                    s.badged ? 'bg-sky-600 text-white shadow-sm' : 'bg-gray-400/20 text-gray-500'
                  }`}
                >
                  <s.icon size={17} />
                </span>
                <span className="flex-1">
                  <span className="block text-[13.5px] font-semibold text-gray-900">{s.t}</span>
                  <span className="block mt-0.5 text-[11.5px] text-gray-500">{s.desc}</span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold transition-colors duration-300 ${
                    s.badged
                      ? 'bg-sky-700 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s.badge}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-all duration-500 ${
                    open ? 'rotate-45 border-sky-600 bg-sky-600 text-white' : ''
                  }`}
                >
                  <span className="text-[18px] leading-none">+</span>
                </span>
              </button>

              {open && s.detail && (
                <div className="border-t border-sky-700/10 bg-sky-50/40 px-5 py-4 backdrop-blur-sm">
                  <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-sky-700">
                    <BadgeCheck size={12} />
                    {s.detail.title}
                  </div>
                  <ul className="space-y-1.5 text-[12px] leading-[1.7] text-gray-700">
                    <li><span className="font-medium text-gray-900">备案机构：</span>{s.detail.issuer}</li>
                    <li><span className="font-medium text-gray-900">备案方式：</span>{s.detail.method}</li>
                    <li><span className="font-medium text-gray-900">备案编号：</span><code className="rounded bg-white px-2 py-0.5 text-[11px] text-sky-700">{s.detail.id}</code></li>
                    <li><span className="font-medium text-gray-900">覆盖范围：</span>{s.detail.scope}</li>
                  </ul>
                </div>
              )}

              {open && !s.detail && (
                <div className="border-t border-gray-200 bg-gray-50 px-5 py-4 text-[11.5px] text-gray-500">
                  内容安全过滤机制正在强化中，将在下一迭代完成并同步备案。
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-xl border border-sky-700/15 bg-sky-700/4 p-3 text-[11.5px] leading-relaxed text-gray-700">
        <ShieldCheck size={13} className="mt-0.5 shrink-0 text-sky-700" />
        <span>我们不是在灰色地带跑黑车，我们是<span className="font-semibold text-gray-900">持证上岗的正规军</span>。</span>
      </div>
    </div>
  )
}

const FEATURES = [
  { icon: ShieldCheck, t: '双备案合规', d: '底层大模型备案 + 签安 Agent 应用层备案，B 端私有化部署享有合规豁免路径' },
  { icon: Fingerprint, t: '实名与溯源', d: '落实实名制；AI 生成内容加显式/隐式水印，每一份报告可溯源验证' },
  { icon: FileCheck, t: '内容安全过滤', d: '模型输出层建立拦截机制，防止违反法规、煽动性或越界内容' },
]

export default function AlgorithmFiling() {
  return (
    <PageShell title="算法备案" icon={ShieldCheck} iconColor="#0369A1">
      <FeatureHero
        badge="安全与合规 01"
        title="不是灰色地带跑黑车，"
        highlight="持证上岗的正规军"
        subtitle="2023 年《生成式人工智能服务管理暂行办法》明确要求，向公众提供生成式 AI 服务必须经过网信办的安全评估和算法备案。法律咨询属于强监管领域，如果没有备案，产品随时面临下架风险。"
        value="我们底层接入的国产大模型已具备国家网信办算法备案号，签安 Agent 应用层也已按规定完成备案。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="双层合规架构" desc="模型层 + 应用层，双备案覆盖整条链路" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { t: '底层大模型', d: 'DeepSeek 等国产模型已通过网信办算法备案，签安仅调用其商用 API', ok: true },
              { t: '签安 Agent 应用层', d: '面向公众服务完成备案登记，B 端私有化部署走合规豁免路径', ok: true },
              { t: '内容水印', d: 'PDF 显性水印 + 隐式元数据签名，符合《标识办法》', ok: true },
              { t: '内容安全', d: '输出层拦截机制正在强化中，下一迭代完成后同步备案', ok: false },
            ].map((p) => (
              <GlassCard key={p.t} className="h-full">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-white transition-transform duration-300 ${
                      p.ok ? 'bg-sky-600 group-hover:scale-110' : 'bg-gray-400'
                    }`}
                  >
                    {p.ok ? <BadgeCheck size={13} /> : <X size={13} />}
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
            <SectionTitle num="2" title="备案详情演示" desc="点击每一层查看备案号、监管机构与覆盖范围" />
            <div className="mx-auto max-w-3xl">
              <DualFilingDemo />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionTitle num="3" title="签安的合规机制" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
      </section>

      <FeatureCTA note="选合规，才能走得远。" />
    </PageShell>
  )
}
