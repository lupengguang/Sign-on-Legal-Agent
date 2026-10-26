import { useState } from 'react'
import { Check, ClipboardCopy, Languages, MessageSquare, Sparkles, Wand2 } from 'lucide-react'
import { FeatureCTA, FeatureHero, GlassCard, PageShell, Reveal, SectionTitle } from '../../components/FeatureShell'

const EXAMPLES = [
  {
    legal: '该条款属流质条款，依法应属无效，债权人不得直接取得质押物所有权。',
    plain: '如果你还不上钱，这辆车直接被对方开走，你连拍卖抵债、多退少补的机会都没有。',
    topic: '抵押 / 质押',
  },
  {
    legal: '该条款赋予甲方单方验收权，双方权利义务显著不对等。',
    plain: '对方可以拖着不验收，你的尾款就可能一直收不到，而合同里没给你一个说理的地方。',
    topic: '验收标准',
  },
  {
    legal: '乙方竞业限制义务范围过宽且未约定经济补偿，条款效力存在瑕疵。',
    plain: '离职后你几乎不能在同行任何公司上班，而对方一分钱补偿都不用给。',
    topic: '竞业限制',
  },
]

const SCRIPTS: Record<number, string> = {
  0: '王总，关于抵押那条我们内部过了一下，如果直接约定「到期不还车就归您」，我们这边财务和法务都不太好走流程，能不能改成「到期未清偿的，双方协商折价或依法拍卖，多退少补」？其他条款我们没问题。',
  1: '王总，验收这块我们内部对账一般按验收后 30 天走，另外验收标准能不能写清楚具体几项、几天内确认？不然尾款容易一直挂着。其他条款我们没问题。',
  2: '王总，竞业限制这条我们想调一下：范围收窄到与公司实际业务直接竞争的岗位，期限一年，另外按法规约定一下补偿标准。这样对双方都好落地。其他条款我们没问题。',
}

function PlainDemo() {
  const [idx, setIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SCRIPTS[idx])
    } catch {
      /* 剪贴板不可用时静默降级 */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1700)
  }

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      {/* Example tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {EXAMPLES.map((e, i) => (
          <button
            key={e.topic}
            type="button"
            onClick={() => setIdx(i)}
            className={`rounded-full border px-4 py-2 text-[13px] font-medium backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
              idx === i
                ? 'border-transparent bg-gray-900 text-white shadow-lg'
                : 'border-white/70 bg-white/60 text-gray-600 hover:bg-white/95'
            }`}
          >
            {e.topic}
          </button>
        ))}
      </div>

      {/* 法言法语 → 白话 */}
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/70 bg-white/60 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/80">
          <div className="mb-2 flex items-center gap-2 text-[11.5px] font-semibold text-gray-400">
            <Languages size={13} />
            AI 常规输出 · 法言法语
          </div>
          <p className="text-[13.5px] leading-[1.8] text-gray-400 line-through decoration-gray-300">
            {EXAMPLES[idx].legal}
          </p>
        </div>

        <div className="flex justify-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F26522]/10 text-[#F26522]">
            <Wand2 size={15} className="rotate-90" />
          </span>
        </div>

        <div className="rounded-2xl border border-[#F26522]/30 bg-gradient-to-br from-[#F26522]/10 to-white/60 p-5 shadow-[0_10px_30px_rgba(242,101,34,0.10)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(242,101,34,0.16)]">
          <div className="mb-2 flex items-center gap-2 text-[11.5px] font-semibold text-[#F26522]">
            <Sparkles size={13} />
            签安白话解读
          </div>
          <p className="text-[14.5px] font-medium leading-[1.8] text-gray-900">{EXAMPLES[idx].plain}</p>
        </div>
      </div>

      {/* 话术 */}
      <div className="mt-5">
        <div className="rounded-2xl rounded-tl-sm border border-emerald-500/20 bg-gradient-to-br from-emerald-50/85 to-white/60 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-[0_16px_44px_rgba(16,185,129,0.12)]">
          <div className="mb-2 flex items-center gap-2 text-[11.5px] text-gray-500">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
              我
            </span>
            <MessageSquare size={12} />
            可直接发给对方 · 微信 / 邮件
          </div>
          <p className="text-[13.5px] leading-[1.85] text-gray-800">{SCRIPTS[idx]}</p>
        </div>

        <button
          type="button"
          onClick={copy}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full py-3 text-[13.5px] font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
            copied
              ? 'bg-emerald-500 text-white shadow-emerald-500/30'
              : 'bg-gray-900 text-white shadow-gray-900/20 hover:bg-[#F26522] hover:shadow-[#F26522]/30'
          }`}
        >
          {copied ? <Check size={15} /> : <ClipboardCopy size={15} />}
          {copied ? '已复制到剪贴板' : '一键复制修改话术'}
        </button>
      </div>
    </div>
  )
}

const FEATURES = [
  {
    icon: Languages,
    t: '「说人话」的后果翻译',
    d: '把生涩法言法语翻译成接地气的商业后果。不说「流质条款无效」，而是说「如果你还不上钱，这辆车直接被对方开走，你连拍卖抵债的机会都没有」。',
  },
  {
    icon: MessageSquare,
    t: '一键生成「沟通话术」',
    d: '杀手级功能：不仅指出风险，还生成可直接复制发给对方的微信 / 邮件文本。话术不激化矛盾，只提出具体修改建议。',
  },
  {
    icon: Sparkles,
    t: '从「懂」到「做」的闭环',
    d: '给用户武器去谈判，而不是只给一份让他焦虑的报告。',
  },
]

export default function PlainTalkScript() {
  return (
    <PageShell title="白话解读与话术" icon={Languages} iconColor="#7C3AED">
      <FeatureHero
        badge="产品功能 03"
        title="把法律条文，"
        highlight="翻译成人话"
        subtitle="AI 给出了一堆法律分析（如「该条款显失公平」），但小老板既看不懂，也不知道该怎么跟对方去谈判修改。签安不说术语，只说后果，还给你能直接发出去的那段话。"
        value="不跟你拽法律名词，就告诉你签了会亏多少钱，还教你怎么发微信让对方改。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="核心痛点" desc="看得懂结论，不等于知道下一步做什么" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <GlassCard>
              <div className="text-[12px] font-semibold text-gray-400">普通合同 AI 的终点</div>
              <p className="mt-2.5 text-[13.5px] leading-[1.8] text-gray-600">
                输出一份风险清单：「第 4.2 条存在权利不对等」「该条款效力存疑」。用户看完，焦虑值上升，行动力为零。
              </p>
            </GlassCard>
            <GlassCard accent>
              <div className="text-[12px] font-semibold text-[#F26522]">签安的终点</div>
              <p className="mt-2.5 text-[13.5px] leading-[1.8] text-gray-800">
                一段可以粘贴进微信的话，指明改哪一句、改成什么、为什么这么改，对方能直接回应。
              </p>
            </GlassCard>
          </div>
        </Reveal>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="功能演示" desc="切换条款类型，法言法语 → 白话 → 可发话术" />
            <div className="mx-auto max-w-3xl">
              <PlainDemo />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionTitle num="3" title="三项关键能力" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <GlassCard className="h-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white">
                    <f.icon size={18} />
                  </span>
                  <h3 className="mt-4 text-[14.5px] font-semibold text-gray-900">{f.t}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-500">{f.d}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <FeatureCTA note="看得懂，还要能开口。" />
    </PageShell>
  )
}
